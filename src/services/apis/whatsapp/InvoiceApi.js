import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const InvoicePost = async ({ data, gym_id }) => {
  const res = await axios.post(`${url}/invoice/${gym_id}`, data, {
    withCredentials: true, // 🔐 ensures access_token cookie is sent
    timeout: 10000, // optional but recommended
  });
  return res.data;
};
