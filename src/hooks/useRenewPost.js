import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify"; // or use your preferred UI alert
import { postRenewMeberApi } from "../services/apis/Renew/RenewMemberAPi";

export const usePostRenew = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ member_id, data }) => postRenewMeberApi({ member_id, data }),
    onSuccess: () => {
      const gym_id = sessionStorage.getItem("gym_id");
      queryClient.invalidateQueries(["members", gym_id]);
      toast.success("Member renewed successfully");
    },
    onError: (error) => {
      toast.error("Renewal failed. Please try again.");
      console.error("Renewal error:", error);
    },
  });
};
