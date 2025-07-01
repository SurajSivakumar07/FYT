import axios from "axios";
const url = import.meta.env.VITE_URL;
export const fetchDashboardSummary = async () => {
  const { res } = await axios.get(`${url}/dashboard/summary`, {
    params: { gym_id },
  });
  return res.data;
};
