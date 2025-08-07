import axiosInstance from "../../../utlis/axiosInstance";

export const updateMemberPlanApi = async (gym_id, member_id, data) => {
  const res = await axiosInstance.put(
    `update_member_plan/${gym_id}/${member_id}`,
    data
  );
  return res.data;
};
