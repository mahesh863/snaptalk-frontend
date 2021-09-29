import axios from "axios";
import { API } from "../API";

export const generateFeeds = (userId, authToken) => {
  return axios({
    method: "GET",
    url: `${API}/feeds/generate/${userId}`,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};
