import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utlis/axiosInstance";

const url = import.meta.env.VITE_API_URL;

export const useEnquiry = (gym_id) => {
  return useQuery({
    queryKey: ["enquiries", gym_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/gyms/${gym_id}/enquiries`);

      return res.data;
    },
    enabled: !!gym_id,
    staleTime: Infinity,
  });
};
