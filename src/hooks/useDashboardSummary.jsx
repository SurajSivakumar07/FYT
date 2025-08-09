import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "../utlis/axiosInstance";

import decryptAESData from "../utlis/decryptData";

const url = import.meta.env.VITE_API_URL;

export const useDashboardSummary = (gym_id) => {
  return useQuery({
    queryKey: ["dashboard-summary", gym_id],
    queryFn: async () => {
      const res = await axiosInstance.get(`${url}/dashboard/summary`, {
        params: { gym_id },
      });

      const raw = res.data;

      const data = {
        activeMembers: raw.am,
        expiringSoon: raw.es,
        totalMembers: raw.tm,
        earnings: parseFloat(decryptAESData(raw.er)),
        pending_balance_members: raw.pbm,
      };

      return data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60,
  });
};
