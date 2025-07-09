import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTranscation } from "../services/apis/Transcation/UpdateTranscation";

export const useUpdateTranscation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ member_id, data }) => UpdateTranscation({ member_id, data }),
    onSuccess: () => {
      const gym_id = sessionStorage.getItem("gym_id");
      queryClient.invalidateQueries(["members", gym_id]);
      queryClient.invalidateQueries(["memberprofile"]);
      toast.success("Updated Transaction");
    },
    onError: (err) => {
      toast.error("Update Failed", err);
    },
  });
};
