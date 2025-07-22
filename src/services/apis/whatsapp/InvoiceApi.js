import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const InvoicePost = async ({ data, gym_id }) => {
  const token = localStorage.getItem("oai-did");

  const res = await axios.post(`${url}/invoice/${gym_id}`, data, {
    withCredentials: true,
  });
  return res.data;
};
