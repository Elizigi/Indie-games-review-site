import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { pool, secret } from "../../server";
const jwt = require("jwt-simple");

async function loginUser(req:Request,res:Response) {
    try {
        const { email, password } = req.body;
    
        // Basic validation
        if (!email || !password) {
          res.status(400).json({ message: "Email and password are required" });
          return;
        }
    
        // Find user by email
        const [rows] = await pool.execute(
          "SELECT * FROM users WHERE user_email = ?",
          [email]
        );
        const users = rows as any[];
    
    
        if (users.length === 0) {
          res.status(401).json({ message: "Invalid credentials" });
          return;
        }
    
        const user = users[0];
    
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.user_password);
        if (!isMatch) {
          res.status(401).json({ message: "Invalid credentials" });
          return;
        }
    
        //create cookie
        const token = jwt.encode({ user_id: user.user_id }, secret);
        res.cookie("token", token, { httpOnly: true, secure: false });
    
        res.status(200).json({
          success: true,
          message: "Login successful",
        });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
          success: false,
          message: "Error during login",
          error: (error as Error).message,
        });
      }
}
export default loginUser;