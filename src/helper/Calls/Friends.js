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
  return axios({
    method: "GET",
    url: `${API}/${currentUserId}/get/friends`,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
};

export const suggestedFriends = () => {
  return axios({
    method: "GET",
    url: `${API}/suggested`,
  });
};

export const viewUserProfile = (userId) => {
  return axios({
    url: `${API}/view/user`,
    data: {
      userId: userId,
    },
    method: "POST",
  });
};
