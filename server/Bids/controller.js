import Bid from "./model.js";

export const createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();
    res.send({ success: true, message: "Bid Placed.." });
  } catch (error) {
    res.send({ success: false, message: error.message });
    console.log(error);
  }
};

export const getBids = async (req, res) => {
  try {
    const { product, seller } = req.body;
    let filters = {};

    if (product) {
      filters.product = product;
    }

    if (seller) {
      filters.seller = seller;
    }

    const bids = await Bid.find(filters).populate("product").populate("seller");
    // .populate("buyer");

    res.send({ success: true, data: bids });
  } catch (error) {
    res.send({ success: false, message: error.message });
    console.log(error);
  }
};
