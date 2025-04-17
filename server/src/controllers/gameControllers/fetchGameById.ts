import { Request, Response } from "express";
import { pool } from "../../server";


async function fetchGameById(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const [gameRows]: any = await pool.execute(
      "SELECT * FROM games WHERE game_id = ?",
      [id]
    );
    if ((gameRows).length === 0) {
       res
        .status(404)
        .json({ success: false, message: "Game not found" });
        return;
    }

    res.status(200).json({ success: true, game: gameRows[0] });
  } catch (error) {
    console.error("Error fetching game by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch game",
      error: (error as Error).message,
    });
  }
}

export default fetchGameById;