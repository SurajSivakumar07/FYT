import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export const WebHookApi = async (gymId) => {
  const res = await axios.get(`${url}/gyms/${gymId}/delivery-logs`);
  return res.data.logs || [];
};
