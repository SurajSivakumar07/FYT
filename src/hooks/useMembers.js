import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const useMembers = (gym_id) => {
  return useQuery({
    queryKey: ["addmembers", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/gyms/${gym_id}/members`);
      return res.data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60,
  });
};
