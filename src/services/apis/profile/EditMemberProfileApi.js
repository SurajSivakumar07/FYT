import axios from "axios";
const url = import.meta.env.VITE_API_URL;
export const EditMemberProfileApi = async ({ memberId, updatedData }) => {
  const res = await axios.put(`${url}/members/${memberId}`, updatedData, {
    withCredentials: true,
    timeout: 10000, // optional safety
  });
};
