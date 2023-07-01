import Product from "./models.js";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import express from "express";
import authMiddleware from "../users/middleware/auth.js";

const router = express();

//create new product

export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.send({
      success: true,
      message: "Product created successfully...",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

// get all products

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

//Edit product

export const editProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "Product updated successfully...",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "Product deleted successfully...",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

// Update to add images via cloudinary

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + this.file.originalname);
  },
});

router.post(
  "/upload",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.upload(req.file.path);
      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId);
      res.send({
        success: true,
        message: "image uploaded successfully...",
        result,
      });
    } catch (error) {
      res.send({
        success: false,
        message: "Error uploading images...",
        result,
      });
    }
  }
);

export default router;
