import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const postPlansApi = async ({ data, gym_id }) => {
  const res = await axios.post(`${url}/gyms/${gym_id}/trainers`, data);
  return res.data;
};
