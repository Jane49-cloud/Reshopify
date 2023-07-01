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
