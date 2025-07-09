import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditMemberProfileApi } from "../services/apis/profile/EditMemberProfileApi";
import { toast } from "react-toastify"; // Ensure you import toast

export const useEditMemberProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, updatedData }) =>
      EditMemberProfileApi({ memberId, updatedData }),

    onSuccess: () => {
      // Invalidate specific member query
      const gym_id = sessionStorage.getItem("gym_id");

      queryClient.invalidateQueries(["members", gym_id]);
      queryClient.invalidateQueries(["memberprofile"]);
      toast.success("Edit sucess");
    },

    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Update failed", error);
    },
  });
};
