import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utlis/axiosInstance";

const url = import.meta.env.VITE_API_URL;

export const useMemberProfile = (gym_id, id) => {
  return useQuery({
    queryKey: ["memberprofile", gym_id, id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/gyms/${gym_id}/members/${id}/full-details`
      );
      return res.data;
    },
    enabled: !!gym_id && !!id,
    staleTime: 0,
    keepPreviousData: false,
    refetchOnWindowFocus: true,
  });
};
