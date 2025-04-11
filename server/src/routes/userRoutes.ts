import express from "express";
import loginUser from "../controllers/userControllers/userLogin";
import registerUser from "../controllers/userControllers/userRegister";
const router = express.Router();

router.post("/register",registerUser );
router.post("/login",loginUser );

export default router;
