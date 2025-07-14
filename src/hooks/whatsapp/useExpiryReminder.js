import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ExpiryReminderApi } from "../../services/apis/whatsapp/ExpiryNotificationReminder";

export const useExpiryReminder = () => {
  return useMutation({
    mutationFn: ({ data, gym_id }) => ExpiryReminderApi({ data, gym_id }),
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
