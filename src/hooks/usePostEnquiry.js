import { useMutation } from "@tanstack/react-query";
import { PostEnquiryApi } from "../services/apis/Enquiry/PostEnquiryApi";
import axios from "axios";
import { useGymId } from "./useGymId";
const url = import.meta.env.VITE_API_URL;

export const usePostEnquiry = () => {
  return useMutation({
    mutationFn: (data) => PostEnquiryApi(data),
  });
};

export const useUpdateEnquiry = () => {
  return useMutation({
    mutationFn: async ({ enquiry_id, data }) => {
      const res = await axios.put(
        `${url}/enquiries/update/${enquiry_id}`,
        data
      );
      console.log(res.data);

      return res.data;
    },
  });
};
