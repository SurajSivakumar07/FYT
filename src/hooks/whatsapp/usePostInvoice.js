import { useMutation } from "@tanstack/react-query";
import { InvoicePost } from "../../services/apis/whatsapp/InvoiceApi";

export const usePostInvoice = () => {
  return useMutation({
    mutationFn: ({ data, gym_id }) => InvoicePost({ data, gym_id }),
    onSuccess: () => {
      console.log("sucess");
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
