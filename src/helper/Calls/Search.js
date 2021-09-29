import axios from "axios";
import { API } from "../API";

export const search = (searchTerm) => {
  return axios({
    method: "POST",
    url: `${API}/search/`,
    data: {
      userName: searchTerm,
    },
  });
};
