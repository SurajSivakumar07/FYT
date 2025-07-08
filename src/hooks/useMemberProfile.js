import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useMemberProfile = (gym_id, id) => {
  return useQuery({
    queryKey: ["memberprofile", gym_id, id], // 🟢 dynamic key
    queryFn: async () => {
      const res = await axios.get(
        `${url}/gyms/${gym_id}/members/${id}/full-details`
      );
      return res.data;
    },
    enabled: !!gym_id && !!id,
    staleTime: 0, // optional: always fetch fresh
    keepPreviousData: false, // optional: prevents showing old data
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
