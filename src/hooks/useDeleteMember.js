import { useNavigate } from "react-router-dom";
import { deleteMember } from "../services/apis/MemberApi/DeleteMember";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGymId } from "./useGymId";

export const useDeleteMember = (navigate) => {
  const queryClient = useQueryClient();
  const gym_id = useGymId();
  return useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      // Invalidate members list query to refresh data
      queryClient.invalidateQueries(["members", gym_id]);

      navigate("/members?status=all");
    },
    onError: (error) => {
      console.error("❌ Error deleting member:", error);
    },
  });
};
