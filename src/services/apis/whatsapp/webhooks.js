import axiosInstance from "../../../utlis/axiosInstance";

export const WebHookApi = async (gymId) => {
  const res = await axiosInstance.get(`/gyms/${gymId}/delivery-logs`);
  return res.data.logs || [];
};
