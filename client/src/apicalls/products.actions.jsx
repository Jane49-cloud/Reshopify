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

export const getProducts = async (filters) => {
  try {
    const response = await axiosService.post("/products/filter", filters);
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
//get a product

export const getProduct = async (id) => {
  try {
    const response = await axiosService.get(`/products/${id}`);
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

// Edit product status

export const editProductStatus = async (id, status) => {
  try {
    const response = await axiosService.put(`/products/status/${id}`, {
      status,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const placeBid = async (payload) => {
  try {
    const response = await axiosService.post("/bids/new-bid", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

//get products

export const getBids = async (filters) => {
  try {
    const response = await axiosService.post("/bids", {
      product: filters.product,
    });

    return response.data;
  } catch (error) {
    return error.message;
  }
};
