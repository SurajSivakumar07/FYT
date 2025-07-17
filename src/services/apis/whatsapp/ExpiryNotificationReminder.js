import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const ExpiryReminderApi = async ({ data, gym_id }) => {
  const token = localStorage.getItem("oai-did");

  const res = await axios.post(`${url}/expirynotification/${gym_id}`, data, {
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
