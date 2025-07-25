import axios from "axios";

const url = import.meta.env.VITE_API_URL || "http://localhost:8000"; // Default to local URL if env variable is not set

export const axiosInstance = axios.create({
  baseURL: url, // Replace this with your API base URL
  withCredentials: true, // <-- This is what sends cookies like access_token
});

export default axiosInstance;
