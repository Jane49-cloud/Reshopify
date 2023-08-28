import express from "express";
import { addNotification, getNotifications } from "./controller.js";
import authMiddleware from "../users/middleware/auth.js";

const router = express.Router();

router.post("/notify", authMiddleware, addNotification);
router.get("/notifications", authMiddleware, addNotification);

export default router;
