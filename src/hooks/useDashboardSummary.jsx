import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useDashboardSummary = (gym_id) => {
  return useQuery({
    queryKey: ["dashboard-summary", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/dashboard/summary`, {
        params: { gym_id },
      });
      console.log(res);

      return res.data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60,
  });
};
