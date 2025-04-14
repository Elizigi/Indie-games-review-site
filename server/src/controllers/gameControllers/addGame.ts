import { pool, secret } from "../../server";
import jwt from "jwt-simple";


async function addGame(req: any, res: any) {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Missing access token" });

    const decoded = jwt.decode(token, secret);
    const userId = decoded.user_id;

    const [userRows]: any = await pool.execute(
      "SELECT user_role FROM users WHERE user_id = ?",
      [userId]
    );

    if (!userRows.length) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRole = userRows[0].user_role;

    if (userRole !== "admin" && userRole !== "developer") {
      return res.status(403).json({ message: "You do not have permission to add games" });
    }

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
      return res.status(400).json({ message: "Missing required game fields" });
    }

    const allowedGenres = [
      "action", "adventure", "rpg", "shooter", "platformer",
      "simulation", "strategy", "sports", "racing",
      "puzzle", "horror", "sandbox", "fighting"
    ];

    if (!allowedGenres.includes(game_genre)) {
      return res.status(400).json({ message: "Invalid genre provided" });
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
    
    return res.status(201).json({
      success: true,
      message: "Game added successfully",
      gameId: (result as any).insertId,
    });

  } catch (error) {
    console.error("Error adding game:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
}

export default addGame;
