import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const postRenewMeberApi = async ({ member_id, data }) => {
  const token = localStorage.getItem("oai-did");

  const res = await axios.post(`${url}/members/${member_id}/renew`, data, {
    timeout: 10000,
    withCredentials: true,
  });
  return res.data;
};
