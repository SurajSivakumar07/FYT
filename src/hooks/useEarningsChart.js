import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utlis/axiosInstance";

export const useEarningsSummary = (gym_id) => {
  return useQuery({
    queryKey: ["dashboard-earning", gym_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/dashboard/earnings`, {
        params: { gym_id },
      });
      return res.data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60,
  });
};
