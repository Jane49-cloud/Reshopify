import axios from "axios";

export const axiosService = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
