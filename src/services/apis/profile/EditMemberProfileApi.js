import axios from "axios";
import { useAccessToken } from "../../../hooks/useAccessToken";
const url = import.meta.env.VITE_API_URL;

export const EditMemberProfileApi = async ({ memberId, updatedData }) => {
  const token = localStorage.getItem("oai-did");

  const res = await axios.put(`${url}/members/${memberId}`, updatedData, {
    withCredentials: true,
    timeout: 10000,
  });

  return res.data;
};
