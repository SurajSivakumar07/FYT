import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const deleteMember = async (memberId) => {
  const res = await axios.delete(`${url}/members/${memberId}`, {
    withCredentials: true,
  });
  return res.data;
};
