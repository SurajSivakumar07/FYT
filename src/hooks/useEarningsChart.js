import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useEarningsSummary = (gym_id) => {
  return useQuery({
    queryKey: ["dashboard-earning", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/dashboard/earnings`, {
        params: { gym_id },
      });
      return res.data;
    },
    enabled: !!gym_id,
  });
};
