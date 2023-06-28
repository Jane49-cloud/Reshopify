import express from "express";
import { registerUser, LoginUser } from "./controllers.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", LoginUser);

export default router;
