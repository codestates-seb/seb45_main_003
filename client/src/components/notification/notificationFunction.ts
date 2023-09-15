import { authInstance } from "../../interceptors/interceptors";
import axios from "axios";

export const getUnReadCount = async () => {
  try {
    const res = await authInstance.get(`/notifications/count`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        console.log(error);
      }
    }
  }
};

export const getNotifications = async () => {
  try {
    const res = await authInstance.get(`/notifications`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log(error);
      }
    }
  }
};

export const removeReadNotifications = async () => {
  try {
    const res = await authInstance.delete(`/notifications/delete`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
};
