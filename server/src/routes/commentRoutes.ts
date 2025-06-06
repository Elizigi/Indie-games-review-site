import express from "express";
import { addComment, getComments } from "../controllers/commentControllers/addComment";

const router = express.Router();

router.post("/add-comment", addComment);
router.get("/get-comments/:post_id", getComments);

export default router;