import express from "express";
import loginUser from "../controllers/userControllers/userLogin";
import registerUser from "../controllers/userControllers/userRegister";
import { userCheckRoleAccess } from "../controllers/userControllers/userCheckRoleAccess";
import logoutUser from "../controllers/userControllers/logoutUser";
const router = express.Router();

router.post("/register",registerUser );
router.get("/check-role", userCheckRoleAccess)
router.post("/login",loginUser);
router.post("/logout",logoutUser);
export default router;
