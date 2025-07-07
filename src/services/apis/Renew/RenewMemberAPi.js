import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const postRenewMeberApi = async ({ member_id, data }) => {
  const res = await axios.post(`${url}/members/${member_id}/renew`, data);

  return res.data;
};
