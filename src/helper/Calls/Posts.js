import axios from "axios";
import { API } from "../API";

export const likePhoto = (token, userId, postId) => {
  return axios({
    url: `${API}/like/post/${userId}/${postId}`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const unlikePhoto = (token, userId, postId) => {
  return axios({
    url: `${API}/unlike/post/${userId}/${postId}`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
