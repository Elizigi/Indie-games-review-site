import { Request, Response } from "express";
import { pool } from "../../server";

async function fetchLimitedReviews(req: Request, res: Response) {
  try {
    const { game_id, limit } = req.body;
    
    if (!game_id || isNaN(game_id)) {
     res.status(400).json({ success: false, message: "Invalid game_id." });
     return;
    }

    if (!limit || isNaN(limit)) {
       res.status(400).json({ success: false, message: "Invalid limit value." });
       return;
    }

    const [rows] = await pool.execute(
      `SELECT 
         r._id AS review_id,
         r.review_description,
         r.review_rating,
         u.user_name,
         g.game_name,
         g.game_added_date
       FROM review_join_table r
       JOIN games g ON r.game_id = g.game_id
       JOIN users u ON r.user_id = u.user_id
       WHERE r.game_id = ?
       ORDER BY r._id DESC  -- Order by review ID or another field for proper review sorting
       LIMIT ${parseInt(limit)}`,
      [game_id]  
    );

    res.status(200).json({ success: true, reviews: rows });
    
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: (error as Error).message,
    });
  }
}

export default fetchLimitedReviews;
