import axios from "axios";
import { API } from "../API";

export const sendFollowRequest = (currentUserId, firendsId) => {
  return axios({
    method: "GET",
    url: `${API}/add/friend/${currentUserId}/${firendsId}`,
  });
};

export const cancelFollowRequest = (currentUserId, firendsId) => {
  return axios({
    method: "GET",
    url: `${API}/delete/friend/${currentUserId}/${firendsId}`,
  });
};

export const acceptFollowRequest = (currentUserId, firendsId) => {
  return axios({
    method: "GET",
    url: `${API}/accept/friend/${currentUserId}/${firendsId}`,
  });
};

export const rejectFollowRequest = (currentUserId, firendsId) => {
  return axios({
    method: "GET",
    url: `${API}/reject/friend/${currentUserId}/${firendsId}`,
  });
};

export const getAllInteractions = (authToken, currentUserId) => {
  axios({
    method: "GET",
    url: `${API}/${currentUserId}/get/friends`,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};
