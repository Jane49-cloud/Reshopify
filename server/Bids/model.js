import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    bidMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);

export default Bid;
