import { pool } from "../../server";

export async function addComment(req: any, res: any) {
  try {
    const { user_id, post_id, comment_description, post_img_url } = req.body;

    if (!user_id || !post_id || !comment_description || !post_img_url) return res.status(400).json({ success: false, message: "All fields are required." });

    const [postRows] = await pool.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);

    if ((postRows as any[]).length === 0) return res.status(404).json({ success: false, message: "Post not found." });

    const [commentResult] = await pool.execute( "INSERT INTO comments (comment_description, post_img_url) VALUES (?, ?)",[comment_description, post_img_url]);

    const comment_id = (commentResult as any).insertId;

    await pool.execute("INSERT INTO comment_user_join_table (user_id, comment_id) VALUES (?, ?)", [user_id, comment_id]);

    res.status(200).json({ success: true, message: "Comment added successfully." });
  } catch (error) {
    console.error("Error adding comment to post:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}

export async function getComments(req: any, res: any) {
  try {
    const { post_id } = req.params;

    if (!post_id) return res.status(400).json({ success: false, message: "Post ID is required." });

    const [comments] = await pool.execute(
      `SELECT c.comment_id, c.comment_description, c.post_img_url, u.user_name 
       FROM comments c 
       JOIN comment_user_join_table cujt ON cujt.comment_id = c.comment_id 
       JOIN users u ON cujt.user_id = u.user_id 
       WHERE c.comment_responding_to = 0 AND c.comment_id IN (
         SELECT comment_responding_to FROM comments WHERE post_id = ?
       )`,
      [post_id]
);

    if ((comments as any[]).length === 0) return res.status(404).json({ success: false, message: "No comments found for this post." });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}
