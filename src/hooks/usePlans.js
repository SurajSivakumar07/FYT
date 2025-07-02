import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const usePlans = (gym_id) => {
  return useQuery({
    queryKey: ["plans", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/gyms/${gym_id}/plans`);
      return res.data.plans;
    },
    enabled: !!gym_id,
    staleTime: Infinity,
  });
};
