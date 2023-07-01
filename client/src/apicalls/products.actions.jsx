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

export const getProducts = async () => {
  try {
    const response = await axiosService("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};
