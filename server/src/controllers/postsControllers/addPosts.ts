import { pool, secret } from "../../server";
import jwt from "jwt-simple";

export async function addPost(req: any, res: any) {
  try {
    const token = req.cookies.token;

    const { game_id, post_title, post_description, post_img_url } = req.body;
    console.log(token)
    if (!token)
      return res.status(401).json({ message: "Missing access token" });

    const decoded = jwt.decode(token, secret);

    const user_id = decoded.user_id;
    if (!user_id || !post_title || !post_description) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }
    const aa = "aaa";
    // Insert into posts table
    const [postResult]: any = await pool.execute(
      "INSERT INTO posts (post_title, post_description, post_img_url) VALUES (?, ?, ?)",
      [post_title, post_description, post_img_url ?? aa]
    );

    const post_id = postResult.insertId;

    // Link post to user
    await pool.execute(
      "INSERT INTO post_user_join_table (user_id, post_id, game_id) VALUES (?, ?, ?)",
      [user_id, post_id, game_id]
    );

    res
      .status(200)
      .json({ success: true, message: "Post added successfully." });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}
