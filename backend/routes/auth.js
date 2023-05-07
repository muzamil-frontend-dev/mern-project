import express from "express";
import { login, register, updateUser } from "../controllers/auth.js";
import { authHandler } from "../middleware/authHandler.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.put("/updateUser/:id", authHandler, updateUser);

export default router;
