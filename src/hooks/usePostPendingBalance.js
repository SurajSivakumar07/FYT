import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pendingBalanceApi } from "../services/apis/PendingBalanceApi/PendingBalanceApi";
import { toast } from "react-toastify"; // Ensure you import toast

export const usePendingBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ member_id, data }) => pendingBalanceApi({ member_id, data }),
    onSuccess: () => {
      const gym_id = sessionStorage.getItem("gym_id");
      queryClient.invalidateQueries(["members", gym_id]);
      queryClient.invalidateQueries(["memberprofile"]);
      toast.success("Added pending balance");
    },
    onError: (error) => {
      toast.error("Update failed");
      console.error("Pending balance update error:", error);
    },
  });
};
