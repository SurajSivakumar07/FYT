import { useMutation } from "@tanstack/react-query";
import { PostEnquiryApi } from "../services/apis/Enquiry/PostEnquiryApi";

export const usePostEnquiry = () => {
  return useMutation({
    mutationFn: (data) => PostEnquiryApi(data),
  });
};
