import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const UpdateTranscation = async ({ member_id, data }) => {
  const res = await axios.put(`${url}/gyms/transcation/${member_id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    timeout: 10000,
  });
  return res.data;
};
