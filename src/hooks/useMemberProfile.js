import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMeberProfile = (gym_id, id) => {
  return useQuery({
    queryKey: ["memberprofile", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/gyms/${gym_id}/members/${id}`);
      return res.data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60,
  });
};
