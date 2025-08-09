import axios from "axios";
import axiosInstance from "../../../utlis/axiosInstance";

const url = import.meta.env.VITE_API_URL;
export const postPlansApi = async ({ data, gym_id }) => {
  const res = await axiosInstance.post(`/gyms/${gym_id}/plans`, data);

  return res.data;
};
