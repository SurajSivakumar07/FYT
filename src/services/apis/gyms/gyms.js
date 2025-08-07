import axiosInstance from "../../../utlis/axiosInstance";

export const setGymApi = async (gym_id) => {
  const res = await axiosInstance.post("/set-gym", { gym_id });
  return res.data;
};
