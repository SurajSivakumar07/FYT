import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const postTrainerApi = async ({ data, gym_id }) => {
  const res = await axios.post(`${url}/gyms/${gym_id}/plans`, data);
  return res.data;
};
