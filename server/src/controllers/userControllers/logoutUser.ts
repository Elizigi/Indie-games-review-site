import { Request, Response } from "express";

function logoutUser(req: Request, res: Response) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // Set to true if you're using HTTPS
    sameSite: "lax", // Adjust based on your needs
  });
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
}

export default logoutUser;
