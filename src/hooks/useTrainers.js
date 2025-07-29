import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../utlis/axiosInstance";
const url = import.meta.env.VITE_API_URL;
export const useTrainers = (gym_id) => {
  return useQuery({
    queryKey: ["trainer_details"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trainers/${gym_id}`);
      return res.data.trainers;
    },
    enabled: !!gym_id,
    staleTime: Infinity,
  });
};

export const useUpdateTrainer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await axios.put(`${url}/trainers/update/${id}`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("✅ Trainer updated:", data);
      queryClient.invalidateQueries(["trainer_details"]);

      toast.success("Edit sucess");
    },
    onError: (error) => {
      console.error("Update failed:", error);
      toast.error("Update failed", error);
    },
  });
};
