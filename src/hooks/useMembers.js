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
        const res = await axiosInstance.get(`/gyms/${gym_id}/members`, {
          timeout: 10000,
          withCredentials: true,
        });

        const raw = res.data;

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
