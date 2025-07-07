import axios from "axios";

// Get backend URL from .env
const url = import.meta.env.VITE_API_URL;

export const postMembers = async (data) => {
  const res = await axios.post(`${url}/members`, data);
  return res.data;
};
