import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    age: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      default: "other",
    },
    images: {
      type: Array,
      default: [],
      required: true,
    },
    billAvailable: {
      type: Boolean,
      default: false,
    },
    boxAvailable: {
      type: Boolean,
      default: false,
    },
    warrantAvailable: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
