import { useMutation } from "@tanstack/react-query";
import { postMembers } from "../services/apis/MemberApi/PostMemberApi";

export const usePostMembers = () => {
  return useMutation({
    mutationFn: (data) => postMembers(data),
  });
};
