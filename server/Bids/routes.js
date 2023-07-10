import express from "express";
import authMiddeleware from "../users/middleware/auth.js";
import { createBid, getBids } from "./controller.js";

const router = express.Router();

router.post("/new-bid", authMiddeleware, createBid);
router.post("/", authMiddeleware, getBids);

export default router;
