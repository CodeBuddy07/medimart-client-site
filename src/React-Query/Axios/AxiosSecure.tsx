"use client";

import axios from "axios";
import { toast } from "sonner";





const axiosSecure = axios.create({
  //baseURL: 'http://localhost:5000/api',
  baseURL: 'https://medimart-server-site.vercel.app/api', // Base URL of deployed server
  withCredentials: true, 
});


axiosSecure.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if (error.response?.status === 401) {
      try {
        
        await axiosSecure.post("/logout");

        toast.error("Session expired. Please log in again.");



        window.location.href = '/log-in';



      } catch (logoutError) {
        console.error("Logout error:", logoutError);
      }
    }

    // Reject the original error
    return Promise.reject(error);
  }
);

export default axiosSecure;