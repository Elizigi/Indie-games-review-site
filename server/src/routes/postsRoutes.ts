import express from "express";
import {getComments, addComment } from "../controllers/postsControllers/commentController";
import { addPost } from "../controllers/postsControllers/postscontroller";

const router = express.Router();

router.post("/add-post", addPost);
router.get("/get-comments/:post_id", getComments);
router.post("/add-comment", addComment);

export default router;
