import { patch } from "@/app/fetch/crud";
import { getToken } from "@/config/authStorage";
import { API_BASE } from "@/config/config";
import { NotificationType } from "@/config/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useReadNotification = (
  options?: UseMutationOptions<
    { message: string; notifications: NotificationType[] },
    unknown,
    {
      id: number;
    }
  >
) => {
  return useMutation<
    { message: string; notifications: NotificationType[] },
    unknown,
    {
      id: number;
    }
  >({
    mutationFn: async ({ id }) => {
      const token = await getToken();
      const data = await patch(`${API_BASE}/read_notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
