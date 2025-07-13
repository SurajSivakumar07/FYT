import { useMutation } from "@tanstack/react-query";
import { InvoicePost } from "../../services/apis/whatsapp/InvoiceApi";
import { toast } from "react-toastify";

export const usePostInvoice = () => {
  return useMutation({
    mutationFn: ({ data, gym_id }) => InvoicePost({ data, gym_id }),
    onSuccess: () => {
      toast.success(" sent");
      console.log("sucess");
    },
    onError: (error) => {
      toast.error("Update Error", error);

      console.log(error);
    },
  });
};
