import { pool, secret } from "../../server";
import jwt from "jwt-simple";

interface User {
  user_id: number;
}

export async function authMiddleware(req: any, res: any, next: any) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication token not found." });
    }

    const decoded = jwt.decode(token, secret);

    const [rows] = await pool.execute("SELECT * FROM users WHERE user_id = ?", [decoded.user_id]);
    const users = rows as User[];

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed."
      });
    }

    next();

  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication."
    });
  }
};

export default authMiddleware;
