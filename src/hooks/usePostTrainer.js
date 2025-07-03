import { useMutation } from "@tanstack/react-query";
import { postTrainerApi } from "../services/apis/TrainerApi/PostTrainerApi";

export const usePostTrainer = () => {
  return useMutation({
    mutationFn: postTrainerApi,
  });
};
