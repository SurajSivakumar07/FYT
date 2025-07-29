import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you import toast
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../utlis/axiosInstance";

const url = import.meta.env.VITE_API_URL;

export const usePlans = (gym_id) => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/gyms/${gym_id}/plans`);
      return res.data.plans;
    },
    enabled: !!gym_id,
    staleTime: Infinity,
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, updatedData }) => {
      const res = await axios.put(`${url}/plans/${planId}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Edit sucess");

      queryClient.invalidateQueries(["plans"]);
    },
    onError: (error) => {
      toast.error("Update failed", error);
      console.error("Update failed:", error.response?.data || error.message);
    },
  });
};
