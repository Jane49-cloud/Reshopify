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
    const { seller, categories = [], age = [] } = req.body;
    let filters = {};
    if (seller) {
      filters.seller = seller;
    }
    const products = await Product.find(filters)
      .populate("seller")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      products,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(error);
  }
};

//get Product by id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("seller");
    res.send({
      data: product,
      success: true,
      message: "Product fetched successfully...",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
    console.log(error);
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

//update status

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { status });
    res.send({
      success: true,
      message: "Status updated successfully...",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

// Update to add images via cloudinary

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post(
  "/upload",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Reshopify",
      });
      const productId = req.body.productId;
      await Product.findByIdAndUpdate(productId, {
        $push: { images: result.secure_url },
      });
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
      console.log(error);
    }
  }
);

export default router;
