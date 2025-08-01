import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utlis/axiosInstance";

const url = import.meta.env.VITE_API_URL;

export const useMemberTrend = (gym_id) => {
  return useQuery({
    queryKey: ["memebr_trend", gym_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/gyms/${gym_id}/member-trends`);
      return res.data;
    },
    enabled: !!gym_id,
    staleTime: Infinity,
  });
};
