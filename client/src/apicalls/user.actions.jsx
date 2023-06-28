// user.actions.js
import { axiosService } from "./helpers";

export const registerUser = async (payload) => {
  try {
    const response = await axiosService.post("/users/register", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosService.post("/users/login", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

//get current user

export const getUser = async (req, res) => {
  try {
    const response = await axiosService.get("/users/current-user");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
