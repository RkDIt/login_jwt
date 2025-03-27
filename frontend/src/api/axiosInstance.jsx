import axios from "axios";
import {API} from "../utils/Api"
import localStorageUtil from "../utils/localStorage";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}${API.API_VER}`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorageUtil.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      localStorageUtil.remove("token");
      session;
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
