import { toast } from "react-toastify"; // Ensure you import toast
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGymId } from "../useGymId";
import { WebHookApi } from "../../services/apis/whatsapp/webhooks";

export const useWebhookLogs = () => {
  const gymId = useGymId();

  return useQuery({
    queryKey: ["webhook-logs", gymId],
    queryFn: () => WebHookApi(gymId),
    enabled: !!gymId,
    onError: (err) => {
      console.error(err);
      toast.error("Failed to fetch webhook logs");
    },
  });
};
