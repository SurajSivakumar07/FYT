import { useMutation } from "@tanstack/react-query";
import { postPlansApi } from "../services/apis/PlansApi/PostPlansApi";

export const useCreatePlan = () => {
  return useMutation({
    mutationFn: postPlansApi,
  });
};
