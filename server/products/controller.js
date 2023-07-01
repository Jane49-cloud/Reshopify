import Product from "./models.js";

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
