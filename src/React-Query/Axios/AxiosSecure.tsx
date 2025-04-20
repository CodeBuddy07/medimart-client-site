"use client";

import axios from "axios";
import { toast } from "sonner";

const axiosSecure = axios.create({
  //baseURL: 'http://localhost:5000/api',
  baseURL: "https://medimart-server-site.vercel.app/api", // Deployed API URL
  withCredentials: true,
});


axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    if (status === 401 || message === 'jwt expired') {
      try {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error("Session expired. Please log in again.");
        window.location.href = "/log-in";
      } catch (logoutError) {
        console.error("Error during logout:", logoutError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
