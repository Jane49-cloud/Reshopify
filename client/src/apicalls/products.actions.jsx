import { axiosService } from "./helpers";

// add new product

export const addProduct = async (payload) => {
  try {
    const response = await axiosService.post("/products", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

//get products

export const getProducts = async () => {
  try {
    const response = await axiosService("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Edit product

export const editProduct = async (id, payload) => {
  try {
    const response = await axiosService.put(`/products/${id}`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//Delete a product

export const deleteProduct = async (id) => {
  try {
    const response = await axiosService.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Upload Images

export const uploadImages = async (payload) => {
  try {
    const response = await axiosService.post(`/products/upload`, payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
