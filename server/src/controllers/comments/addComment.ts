import { pool, secret } from "../../server";
import jwt from "jwt-simple";

export async function addComment(req: any, res: any) {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Missing access token" });

    const decoded = jwt.decode(token, secret);
    const user_id = decoded.user_id;

    const { post_id, comment_description, comment_responding_to } = req.body;
    console.log(post_id)
    if (!post_id || !comment_description)
      return res.status(400).json({ success: false, message: "Post ID and comment description are required." });

    const [postRows] = await pool.execute(
      "SELECT * FROM posts WHERE post_id = ?",
      [post_id]
    );

    if ((postRows as any[]).length === 0)
      return res.status(404).json({ success: false, message: "Post not found." });

    const [commentResult] = await pool.execute(
      "INSERT INTO comments (comment_description, post_id, comment_responding_to) VALUES (?, ?, ?)",
      [
        comment_description,
        post_id,
        comment_responding_to ?? null 
      ]
    );

    const comment_id = (commentResult as any).insertId;

    await pool.execute(
      "INSERT INTO comment_user_join_table (user_id, comment_id, post_id) VALUES (?, ?, ?)",
      [user_id, comment_id, post_id]
    );
    res.status(200).json({ success: true, message: "Comment added successfully." });
  } catch (error) {
    console.error("Error adding comment to post:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}

export async function getComments(req: any, res: any) {
  try {
    const { post_id } = req.params;
    if (!post_id)
      return res
        .status(400)
        .json({ success: false, message: "Post ID is required." });

    const [comments] = await pool.execute(
      `SELECT c.comment_id, c.comment_description, u.user_name 
       FROM comments c
       JOIN comment_user_join_table cujt ON cujt.comment_id = c.comment_id
       JOIN users u ON cujt.user_id = u.user_id
     WHERE c.comment_responding_to IS NULL AND c.post_id = ?`,
      [post_id]
    );
    if ((comments as any[]).length === 0)
      return res
        .status(404)
        .json({ success: false, message: "No comments found for this post." });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}
