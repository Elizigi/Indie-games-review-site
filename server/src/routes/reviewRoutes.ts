import express from "express";
import fetchAllReviews from "../controllers/reviewControllers/fetchAllReviews";
import fetchLimitedReviews from "../controllers/reviewControllers/fetchLimitedReviews";
import authMiddleware from "../controllers/userControllers/userAuth";
import rateGame from "../controllers/gameControllers/rateGame";

const router = express.Router();

router.post("/get-reviews-limit", fetchLimitedReviews );
router.get("get-all-reviews/:game_id",fetchAllReviews)
router.post("/rate-game", authMiddleware, rateGame );

export default router;
