import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify"; // Ensure you import toast
import { UpdateEnquiryApi } from "../services/apis/Enquiry/UpdateEnquiry";
import { useAccessToken } from "./useAccessToken";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axiosInstance from "../utlis/axiosInstance";
import { updateMemberPlanApi } from "../services/apis/MemberApi/UpdateMemeberPlan";
import decryptAESData from "../utlis/decryptData";

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

export const useMembers = (gym_id, filters = {}) => {
  // 1. Accept filters object
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const query = useQuery({
    // 2. Add filters to the queryKey for automatic refetching
    queryKey: ["members", gym_id, filters],
    queryFn: async ({ queryKey }) => {
      // The filters object is available from the queryKey
      const [_key, gymId, currentFilters] = queryKey;

      try {
        // 3. Build the dynamic URL with search parameters
        const params = new URLSearchParams();

        Object.entries(currentFilters).forEach(([key, value]) => {
          // Append parameter only if it has a non-empty value
          if (value && value !== "all") {
            // Map frontend key to backend key if they differ
            const paramKey =
              {
                member_type: "member_type",
                status: "status",
                join_year: "join_year",
                join_month: "join_month",
                plan_id: "plan_id",
                search: "search",
              }[key] || key;
            params.append(paramKey, value);
          }
        });

        const queryString = params.toString();
        const url = `/gyms/${gymId}/members_testing?${queryString}`; // Ensure this endpoint matches your backend

        const res = await axiosInstance.get(url, {
          timeout: 10000,
          withCredentials: true,
        });

        // The decryption and mapping logic remains the same
        const data = res.data.map((item) => ({
          id: item.ip,
          member_id: item.md,
          name: item.ne,
          phone_number: decryptAESData(item.pn),
          email: decryptAESData(item.el),
          status: item.st,
          type: item.tp,
          start_date: item.sd,
          end_date: item.ed,
          balance: item.bl,
          plan_id: item.pi,
        }));

        return data;
      } catch (error) {
        if (error?.response?.status === 401) {
          setIsRedirecting(true);
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }
        throw error;
      }
    },
    enabled: !!gym_id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnMount: "always", // 🔥 ensures refetch when component remounts

    // Other options remain the same
  });

  return {
    ...query,
    isRedirecting,
  };
};

export const useUpdateMemberPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ gym_id, member_id, data }) =>
      updateMemberPlanApi(gym_id, member_id, data),

    onSuccess: () => {
      toast.success("Member plan updated successfully!");
      queryClient.invalidateQueries(["memberprofile"]);
    },

    onError: (error) => {
      const message =
        error?.response?.data?.detail || error?.message || "Update failed";
      toast.error(message);
    },
  });
};
