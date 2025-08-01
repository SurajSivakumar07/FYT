// hooks/useLogout.js
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utlis/axiosInstance";
import { toast } from "react-toastify"; // or use your own toast method

export const useLogoutSession = () => {
  return useMutation({
    mutationFn: async (session_id) => {
      const res = await axiosInstance.post("/logout-session", { session_id });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Logout successful!"); // or console.log(data)
    },
    onError: (error) => {
      console.error(error);

      if (error?.response?.data?.message) {
        toast.error(`Logout failed: ${error.response.data.message}`);
      } else {
        toast.error("Something went wrong during logout.");
      }
    },
  });
};
