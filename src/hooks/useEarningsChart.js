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

      const raw = res.data;
      const data = raw.map((item) => ({
        month: item.m,
        membership: item.ms,
        payments: item.pm,
      }));
      return data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60,
  });
};
