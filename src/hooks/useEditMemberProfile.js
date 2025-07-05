import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditMemberProfileApi } from "../services/apis/profile/EditMemberProfileApi";

export const useEditMemberProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, updatedData }) =>
      EditMemberProfileApi(memberId, updatedData),

    onSuccess: () => {
      // Invalidate specific member query
      queryClient.invalidateQueries(["memberprofile"]);
      alert("Updated successfully");
    },

    onError: (error) => {
      console.error("Update failed:", error);
      alert("Something went wrong while updating.");
    },
  });
};
