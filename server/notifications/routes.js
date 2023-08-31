import express from "express";
import {
  addNotification,
  getNotifications,
  readAllNotifications,
} from "./controller.js";
import authMiddleware from "../users/middleware/auth.js";

const router = express.Router();

router.post("/notify", authMiddleware, addNotification);
router.get("/all", authMiddleware, getNotifications);
router.put("/read_all", authMiddleware, readAllNotifications);
router.delete("/:id");

export default router;
