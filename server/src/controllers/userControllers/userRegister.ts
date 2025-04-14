import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { pool } from "../../server";

async function registerUser(req: any, res: any) {
  try {
    const { username, email, password, user_role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const validRoles = ["user", "developer", "admin"];
    const roleToInsert = validRoles.includes(user_role) ? user_role : 'user';

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO users (user_name, user_email, user_password, user_role) VALUES (?, ?, ?, ?)',
      [username, email, hashedPassword, roleToInsert]
    );

    const insertResult = result as mysql.ResultSetHeader;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: insertResult.insertId
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
      error: (error as Error).message
    });
  }
}

export default registerUser;
