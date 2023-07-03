import express from "express";
import authMiddleware from "../users/middleware/auth.js";
import {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
  updateStatus,
  getProduct,
} from "./controller.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.post("/filter", getProducts);
router.put("/:id", authMiddleware, editProduct);
router.get("/:id", authMiddleware, getProduct);
router.put("/status/:id", authMiddleware, updateStatus);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
