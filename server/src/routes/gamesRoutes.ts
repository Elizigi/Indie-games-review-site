import express from "express";
import addGame from "../controllers/gameControllers/addGame";
import fetchGames from "../controllers/gameControllers/fetchGames";
const router = express.Router();

router.post("/add-game",addGame );
router.get("/fetch-games",fetchGames);

export default router;
