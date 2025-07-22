import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you import toast
import { UpdateEnquiryApi } from "../services/apis/Enquiry/UpdateEnquiry";
import { useAccessToken } from "./useAccessToken";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
const url = import.meta.env.VITE_API_URL;

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
  const accessToken = useAccessToken();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const query = useQuery({
    queryKey: ["members", gym_id],
    queryFn: async () => {
      try {
        const res = await axios.get(`${url}/gyms/${gym_id}/members`, {
          timeout: 10000,
          withCredentials: true,
        });
        return res.data;
      } catch (error) {
        if (error?.response?.status === 401) {
          setIsRedirecting(true);
          setTimeout(() => {
            navigate("/signin");
          }, 1000); // ⏱️ optional small delay to show animation
        }
        throw error;
      }
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
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    ...query,
    isRedirecting,
  };
};

// export const useMembers = (gym_id) => {
//   const accessToken = useAccessToken();

//   return useQuery({
//     queryKey: ["members", gym_id],
//     queryFn: async () => {
//       const res = await axios.get(`${url}/gyms/${gym_id}/members`, {
//         timeout: 10000,
//         headers: {
//           Authorization: `Bearer ${accessToken}`, // 👈 Attach token here
//         },
//       });
//       return res.data;
//     },
//     enabled: !!gym_id,
//     staleTime: 1000 * 60 * 5,
//     gcTime: 1000 * 60 * 30,
//     refetchOnMount: "always",
//     refetchOnWindowFocus: true,
//     retry: (failureCount, error) => {
//       if (error?.response?.status >= 400 && error?.response?.status < 500) {
//         return false;
//       }
//       return failureCount < 3;
//     },
//     retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
//   });
// };
