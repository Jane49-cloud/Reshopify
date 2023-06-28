import express from "express";
import { registerUser, loginUser, currentUser } from "./controllers.js";
import authMiddleware from "./middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authMiddleware, currentUser);

export default router;
