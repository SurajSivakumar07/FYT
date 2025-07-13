import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const InvoicePost = async ({ data, gym_id }) => {
  const res = await axios.post(`${url}/invoice/${gym_id}`, data);
  return res.data;
};
