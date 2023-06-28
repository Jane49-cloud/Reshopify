import { axiosService } from "./helpers";

//register user

export const registerUser = async (payload) => {
  try {
    const response = await axiosService.post("/users/register", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosService.post("/users/login", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
