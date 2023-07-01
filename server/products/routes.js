import express from "express";
import authMiddleware from "../users/middleware/auth.js";
import {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,
} from "./controller.js";

const router = express.Router();

router.post("/", authMiddleware, createProduct);
router.get("/", getProducts);
router.put("/:id", authMiddleware, editProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
