import { useMutation } from "@tanstack/react-query";
import { postMembers } from "../services/apis/MemberApi/PostMemberApi";

export const usePostMembers = () => {
  return useMutation({
    mutationFn: (data) => postMembers(data),
    onSuccess: () => {
      const gym_id = sessionStorage.getItem("gym_id");
      queryClient.invalidateQueries(["members", gym_id]);
      queryClient.invalidateQueries(["memberprofile"]);
    },
    onError: (error) => {
      console.error("error:", error);
    },
  });
};
