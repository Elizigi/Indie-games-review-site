import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const cookieParser = require("cookie-parser");
// Create the Express application
const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PASSWORD = "";
export const secret = "xxx";
//password From .env file With your local mysql password

// Create MySQL connection pool
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "mini_steam",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Define route handlers with the correct type

// routes
import userRoutes from "./routes/userRoutes";
app.use("/api/users", userRoutes);

import gameRoutes from "./routes/gamesRoutes";
app.use("/api/games", gameRoutes);

// Start the server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
