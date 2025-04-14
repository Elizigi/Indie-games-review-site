import { pool } from "../../server";

export async function addPost(req: any, res: any) {
  try {
    const { game_id, post_id } = req.body;

    if (!game_id || !post_id) {
      return res.status(400).json({ success: false, message: "Game ID and Post ID are required." });
    }

    const [gameRows] = await pool.execute("SELECT * FROM games WHERE game_id = ?", [game_id]);
    const [postRows] = await pool.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);

    if ((gameRows as any[]).length === 0 || (postRows as any[]).length === 0) return res.status(404).json({ success: false, message: "Game or Post not found." });

    await pool.execute( "INSERT INTO post_user_join_table (user_id, post_id) VALUES (?, ?)", [game_id, post_id]);

    res.status(200).json({ success: true, message: "Post added to game successfully." });
  } catch (error) {
    console.error("Error adding post to game:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}
