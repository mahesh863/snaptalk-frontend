import axios from "axios";
import { API } from "../API";

//Get User Data
export const getProfile = (userId, token) => {
  return axios({
    method: "GET",
    url: `${API}/${userId}/view/profile`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//Edit User Data
export const updateProfile = (userId, userData, token) => {
  return axios({
    method: "PUT",
    url: `${API}/${userId}/edit/profile`,
    data: userData,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//Delete User Data
export const deleteProfile = (userId, token) => {
  return axios({
    method: "DELETE",
    url: `${API}/${userId}/delete/profile`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//Get All Post

export const getAllPost = (userId, token) => {
  return axios({
    url: `${API}/${userId}/get/post`,
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
