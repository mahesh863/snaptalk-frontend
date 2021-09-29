import axios from "axios";
import { API } from "../API";

export const emailSignin = (email, password) => {
  return axios({
    method: "POST",
    url: `${API}/auth/signin`,
    data: {
      email: email,
      password: password,
    },
  });
};

export const googleSignin = (tokenId) => {
  return axios({
    method: "POST",
    url: "http://localhost:8000/api/auth/google",
    data: {
      token: tokenId,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const signOut = () => {
  return axios({
    method: "GET",
    url: `${API}/signout`,
  });
};
