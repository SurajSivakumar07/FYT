import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const postRenewMeberApi = async ({ member_id, data }) => {
  const res = await axios.post(`${url}/members/${member_id}/renew`, data, {
    withCredentials: true,
    timeout: 10000,
  });
  return res.data;
};
