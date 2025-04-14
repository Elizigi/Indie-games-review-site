import express from "express";
import loginUser from "../controllers/userControllers/userLogin";
import registerUser from "../controllers/userControllers/userRegister";
import { userCheckRoleAccess } from "../controllers/userControllers/userCheckRoleAccess";
const router = express.Router();

router.post("/register",registerUser );
router.get("/check-role", userCheckRoleAccess)
router.post("/login",loginUser);

export default router;
