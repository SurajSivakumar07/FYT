import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useMeberProfile = (gym_id, id) => {
  return useQuery({
    queryKey: ["memberprofile"],
    queryFn: async () => {
      const res = await axios.get(
        `${url}/gyms/${gym_id}/members/${id}/full-details`
      );
      return res.data;
    },
    enabled: !!gym_id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
