import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utlis/axiosInstance";
import mapMemberProfile from "../utlis/dataMapper";
export const useMemberProfile = (gym_id, id) => {
  return useQuery({
    queryKey: ["memberprofile", gym_id, id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/gyms/${gym_id}/members/${id}/full-details`
      );

      // Map the data to consistent format
      const mappedData = mapMemberProfile(res.data);

      return mappedData;
    },
    enabled: !!gym_id && !!id,
    staleTime: 0,
    keepPreviousData: false,
    refetchOnWindowFocus: true,
  });
};
