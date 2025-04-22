import { Request, Response } from "express";
import { pool } from "../../server";

async function fetchAllReviews(req: Request, res: Response) {
    try {
      const { game_id } = req.params;
  
      const [rows] = await pool.execute(
        `SELECT 
           r._id AS review_id,
           r.review_description,
           r.review_rating,
           g.game_id,
           g.game_name,
           g.game_added_date,
           u.user_id,
           u.user_name
         FROM review_join_table r
         JOIN games g ON r.game_id = g.game_id
         JOIN users u ON r.user_id = u.user_id
         WHERE r.game_id = ?
         ORDER BY g.game_added_date DESC`,
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
  
  export default fetchAllReviews;