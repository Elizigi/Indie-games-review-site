import express from "express";
import addGame from "../controllers/gameControllers/addGame";
import fetchGames from "../controllers/gameControllers/fetchGames";
import authMiddleware from "../controllers/userControllers/userAuth";
import fetchGameById from "../controllers/gameControllers/fetchGameById";
const router = express.Router();

router.post("/add-game", authMiddleware, addGame );
router.get("/fetch-games",fetchGames);
router.get("/fetch-game/:id",fetchGameById);

export default router;
