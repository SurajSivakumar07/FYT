import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you import toast
import { UpdateEnquiryApi } from "../services/apis/Enquiry/UpdateEnquiry";

const url = import.meta.env.VITE_API_URL;

// export const useMembers = (gym_id) => {
//   return useQuery({
//     queryKey: ["members", gym_id],
//     queryFn: async () => {
//       const res = await axios.get(`${url}/gyms/${gym_id}/members`, {
//         timeout: 10000, // 10 second timeout
//       });
//       return res.data;
//     },
//     enabled: !!gym_id,
//     staleTime: 1000 * 60 * 5, // 5 minutes - data stays fresh longer
//     gcTime: 1000 * 60 * 30, // 30 minutes - cache for 30 minutes
//     // refetchOnWindowFocus: false,
//     refetchOnMount: "always", // force refresh on every mount
//     refetchOnWindowFocus: true,
//     retry: (failureCount, error) => {
//       // Only retry for network errors, not for client errors (4xx)
//       if (error?.response?.status >= 400 && error?.response?.status < 500) {
//         return false;
//       }
//       return failureCount < 3;
//     },
//     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//   });
// };

export const useUpdateEnquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateEnquiryApi,
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries(["enquiries"]);
    },
    onError: (error) => {
      console.error("Status update failed:", error);
      toast.error("Failed to update status");
    },
  });
};

export const useMembers = (gym_id) => {
  return useQuery({
    queryKey: ["members", gym_id],
    queryFn: async () => {
      const res = await axios.get(`${url}/gyms/${gym_id}/members`, {
        timeout: 10000,
      });
      return res.data;
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    retry: (failureCount, error) => {
      if (error?.response?.status >= 400 && error?.response?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};
