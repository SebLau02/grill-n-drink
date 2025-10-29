import { API_BASE } from "@/config/config";
import { ApiResponse, CreateEvent, Event } from "@/config/types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { get, post } from "../app/fetch/crud";
import { getToken } from "@/config/authStorage";

export function useEvents(options = {}) {
  const fetchEvents = async (): Promise<Event[]> => {
    return await get(`${API_BASE}/events`, {});
  };
  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    ...options,
  });
  return { data, isLoading, error };
}

export function useEvent(id: string, options = {}) {
  const fetchEvent = async (): Promise<Event> => {
    const data = await get(`${API_BASE}/events/${id}`, {});

    return data;
  };
  const { data, isLoading, error } = useQuery<Event>({
    queryKey: ["my-event", id],
    queryFn: fetchEvent,
    ...options,
  });
  return { data, isLoading, error };
}

export const useCreateEvent = (
  options?: UseMutationOptions<
    ApiResponse<Event>,
    unknown,
    {
      body: { event: CreateEvent };
    }
  >
) => {
  return useMutation<
    ApiResponse<Event>,
    unknown,
    {
      body: { event: CreateEvent };
    }
  >({
    mutationFn: async ({ body }) => {
      const token = await getToken();
      const data = await post(`${API_BASE}/events`, {
        headers: { Authorization: `Bearer ${token}` },
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
