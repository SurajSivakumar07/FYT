import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGymId } from "./useGymId";

const url = import.meta.env.VITE_API_URL;

export const useMemberId = (gym_id) => {
  return useQuery({
    queryKey: ["member_id", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/gyms/${gym_id}/generate-member-code`);

      return res.data;
    },
    enabled: !!gym_id,
  });
};
