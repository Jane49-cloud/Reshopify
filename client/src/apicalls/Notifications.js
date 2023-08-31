import { axiosService } from "./helpers";

export const addNotification = async (data) => {
  try {
    const response = await axiosService.post("/notifications/notify", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await axiosService.get("/notifications/all");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteNotification = async (id) => {
  try {
    const response = await axiosService.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const readAllNotifications = async () => {
  try {
    const response = await axiosService.put("/notifications/read_all");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
