import express from "express";
import addGame from "../controllers/gameControllers/addGame";
import fetchGames from "../controllers/gameControllers/fetchGames";
import authMiddleware from "../controllers/userControllers/userAuth";
const router = express.Router();

router.post("/add-game", authMiddleware, addGame );
router.get("/fetch-games",fetchGames);

export default router;
