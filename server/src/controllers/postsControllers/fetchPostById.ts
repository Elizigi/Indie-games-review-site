import { pool } from "../../server";

export async function fetchPostsByGameId(req: any, res: any) {
    try {
      const { game_id } = req.params;
  
      if (!game_id) {
        return res.status(400).json({ success: false, message: "Game ID is required." });
      }
  
      const [posts] = await pool.execute(
        `SELECT p.*, u.user_name
         FROM posts p
         JOIN post_user_join_table pujt ON p.post_id = pujt.post_id
         JOIN users u ON pujt.user_id = u.user_id
         WHERE pujt.game_id = ?`,
        [game_id]
      );
  
      if ((posts as any[]).length === 0) {
        return res.status(404).json({ success: false, message: "No posts found for this game." });
      }
  
      res.status(200).json({ success: true, posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ success: false, message: "An error occurred while fetching posts." });
    }
}

export default fetchPostsByGameId;