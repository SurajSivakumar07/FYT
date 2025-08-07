import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../utlis/axiosInstance";
import { useGymId } from "../useGymId";
import { useState } from "react";
import { useAccessStore } from "../../zustand/store";
import { setGymApi } from "../../services/apis/gyms/gyms";

export const useGymData = () => {
  const gymId = useGymId();

  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const query = useQuery({
    queryKey: ["gymData", gymId],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/gym_details/${gymId}`, {
          timeout: 10000,
        });

        useAccessStore.getState().setUser(res.data);
        return res.data;
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
    enabled: !!gymId,
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

export const useYearlyStatement = () => {
  const gym_id = localStorage.getItem("gym_id");
  const backend_url = import.meta.env.VITE_API_URL;

  return useQuery({
    queryKey: ["annualreport"],

    queryFn: async () => {
      const res = await axiosInstance.get(`/gyms/${gym_id}/annual-report`, {
        responseType: "blob",
      });
      return res.data;
    },

    enabled: false,
  });
};
export const useDownloadMonthlyExcel = () => {
  const backend_url = import.meta.env.VITE_API_URL;
  const gym_id = localStorage.getItem("gym_id");

  return useQuery({
    queryKey: ["monthlyreport"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/gyms/${gym_id}/monthly-report`, {
        responseType: "blob",
      });
      return res.data;
    },
    enabled: false,
  });
};

export const getGymName = async (gymId) => {
  const response = await axiosInstance.get(`/gyms/${gymId}`);
  return response.data;
};

export const useSetGym = () => {
  return useMutation({
    mutationFn: setGymApi,
    onSuccess: (data) => {
      console.log("✅ Gym set successfully:", data);
    },
    onError: (error) => {
      console.error("❌ Error setting gym:", error);
    },
  });
};
