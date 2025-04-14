import jwt from "jwt-simple";
import { pool, secret } from "../../server";
import { QueryResult } from "mysql2";

export async function userCheckRoleAccess(req: any, res: any) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided." });
    }

    const decoded = jwt.decode(token, secret);
    const [rows]: [QueryResult, any] = await pool.execute("SELECT user_role FROM users WHERE user_id = ?", [decoded.user_id]);
    const user = (rows as { user_role: string }[])[0];

    if (user) {
      res.status(200).json({ success: true, role: user.user_role });
    } else {
      res.status(401).json({ success: false, message: "Authentication failed." });
    }
  } catch (error) {
    console.error("Error checking role:", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
}
