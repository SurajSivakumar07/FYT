import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
export const useTrainers = (gym_id) => {
  return useQuery({
    queryKey: ["trainer_details", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/trainers/${gym_id}`);
      return res.data.trainers;
    },
    enabled: !!gym_id,
    staleTime: Infinity,
  });
};
