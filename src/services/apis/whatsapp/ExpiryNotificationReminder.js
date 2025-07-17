import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const ExpiryReminderApi = async ({ data, gym_id }) => {
  const res = await axios.post(`${url}/expirynotification/${gym_id}`, data, {
    withCredentials: true,
    timeout: 10000,
  });
  return res.data;
};
