import express from "express";
import {getComments, addComment } from "../controllers/postsControllers/addComment";
import { addPost } from "../controllers/postsControllers/addPosts";
import fetchPostsByGameId from "../controllers/postsControllers/fetchPosts";

const router = express.Router();

router.post("/add-post", addPost);
router.get("/get-comments/:post_id", getComments);
router.post("/add-comment", addComment);
router.get("/fetch-posts-by-game/:game_id",fetchPostsByGameId)
export default router;
