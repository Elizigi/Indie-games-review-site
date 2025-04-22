import { pool, secret } from "../../server";
import jwt from "jwt-simple";

async function rateGame(req: any, res: any) {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Missing access token" });
    const decoded = jwt.decode(token, secret);
    const userId = decoded.user_id;
    const { game_id, review_description, review_rating } = req.body;
    if (!game_id || !review_description || typeof review_rating !== "number") {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }
    if (review_rating < 1 || review_rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const [existing]: any = await pool.execute(
      `SELECT review_rating FROM review_join_table WHERE user_id = ? AND game_id = ?`,
      [userId, game_id]
    );

    if (existing.length > 0) {
      const oldRating = existing[0].review_rating;

      await pool.execute(
        `UPDATE review_join_table 
         SET review_description = ?, review_rating = ?
         WHERE user_id = ? AND game_id = ?`,
        [review_description, review_rating, userId, game_id]
      );

      await pool.execute(
        `UPDATE games
         SET game_rating_combined = game_rating_combined - ? + ?
         WHERE game_id = ?`,
        [oldRating, review_rating, game_id]
      );

      return res
        .status(200)
        .json({ success: true, message: "Rating updated successfully" });
    } else {
      await pool.execute(
        `INSERT INTO review_join_table (user_id, game_id, review_description, review_rating)
         VALUES (?, ?, ?, ?)`,
        [userId, game_id, review_description, review_rating]
      );

      await pool.execute(
        `UPDATE games
         SET game_rating_combined = game_rating_combined + ?, game_rating_users = game_rating_users + 1
         WHERE game_id = ?`,
        [review_rating, game_id]
      );

      return res
        .status(200)
        .json({ success: true, message: "Rating submitted successfully" });
    }
  } catch (error) {
    console.error("Error rating game:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}

export default rateGame;
