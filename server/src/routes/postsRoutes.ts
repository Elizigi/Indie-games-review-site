import express from "express";
import { addPost } from "../controllers/postsControllers/addPosts";
import fetchPostsByGameId from "../controllers/postsControllers/fetchPostById";

const router = express.Router();

router.post("/add-post", addPost);
router.get("/fetch-posts-by-game/:game_id",fetchPostsByGameId)

export default router;
