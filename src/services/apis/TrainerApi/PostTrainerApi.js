import axios from "axios";
import axiosInstance from "../../../utlis/axiosInstance";

const url = import.meta.env.VITE_API_URL;

export const postTrainerApi = async ({ data, gym_id }) => {
  const res = await axiosInstance.post(`/gyms/${gym_id}/trainers`, data);
  return res.data;
};
