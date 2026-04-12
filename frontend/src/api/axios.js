import axios from "axios";
import { getAuthToken, removeAuthToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://ps003-capstoneproject-production.up.railway.app/api",
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeAuthToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;