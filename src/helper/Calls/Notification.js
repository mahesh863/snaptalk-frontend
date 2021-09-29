import axios from "axios";
import { API } from "../API";

export const getAllNotification = (userId, token) => {
  return axios({
    url: `${API}/${userId}/all/notification`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
