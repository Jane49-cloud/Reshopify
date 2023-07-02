import express from "express";
import {
  registerUser,
  loginUser,
  currentUser,
  getUsers,
  updateStatus,
} from "./controllers.js";
import authMiddleware from "./middleware/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current-user", authMiddleware, currentUser);
router.get("/all-users", authMiddleware, getUsers);
router.put("/status/:id", authMiddleware, updateStatus);

export default router;
