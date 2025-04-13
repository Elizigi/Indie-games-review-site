import { Request, Response } from "express";
import { pool } from "../../server";

async function addGame(req: Request, res: Response) {
  try {
    const {
      game_name,
      game_developer,
      game_release_date,
      game_genre,
      game_description,
      game_main_img_url,
      game_rating_combined,
      game_rating_users,
    } = req.body;

    if (
      !game_name ||
      !game_developer ||
      !game_release_date ||
      !game_genre ||
      !game_description ||
      !game_main_img_url
    ) {
      res.status(400).json({ message: "Missing required game fields" });
      return;
    }

    const allowedGenres = [
      "action",
      "adventure",
      "rpg",
      "shooter",
      "platformer",
      "simulation",
      "strategy",
      "sports",
      "racing",
      "puzzle",
      "horror",
      "sandbox",
      "fighting",
    ];

    if (!allowedGenres.includes(game_genre)) {
      res.status(400).json({ message: "Invalid genre provided" });
      return;
    }
    const [result] = await pool.execute(
      `INSERT INTO games (
            game_name, game_developer, game_release_date, game_genre,
            game_description, game_main_img_url, game_rating_combined, game_rating_users
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        game_name,
        game_developer,
        game_release_date,
        game_genre,
        game_description,
        game_main_img_url,
        game_rating_combined ?? null,
        game_rating_users ?? null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Game added successfully",
      gameId: (result as any).insertId,
    });
    return;
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
    return;
  }
}

export default addGame;
