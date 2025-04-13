import { Request, Response } from "express";
import { pool } from "../../server";

async function fetchGames(req: Request, res: Response) {
  try {
    const [rows] = await pool.execute(
      "SELECT * FROM games ORDER BY game_added_date DESC"
    );
    res.status(200).json({ success: true, games: rows });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch games",
      error: (error as Error).message,
    });
  }
}

export default fetchGames;
