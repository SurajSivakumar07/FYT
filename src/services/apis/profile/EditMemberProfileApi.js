import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const EditMemberProfileApi = async ({ memberId, updatedData }) => {
  const res = axios.put(`${url}/members/${memberId}`, updatedData);
  return res.data;
};
