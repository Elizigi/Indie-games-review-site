import express from "express";
import fetchAllReviews from "../controllers/reviewControllers/fetchAllReviews";
import fetchLimitedReviews from "../controllers/reviewControllers/fetchLimitedReviews";

const router = express.Router();

router.post("/get-reviews-limit", fetchLimitedReviews );
router.get("get-all-reviews/:game_id",fetchAllReviews)

export default router;
