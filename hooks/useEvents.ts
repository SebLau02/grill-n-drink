import { API_BASE } from "@/config/config";
import { ApiEventRes, ApiResponse, CreateEvent, Event } from "@/config/types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";
import { get, patch, post } from "../app/fetch/crud";
import { getToken } from "@/config/authStorage";

export function useEvents(options = {}) {
  const fetchEvents = async (): Promise<Event[]> => {
    return await get(`${API_BASE}/events`, {});
  };
  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["events-index"],
    queryFn: fetchEvents,
    ...options,
  });
  return { data, isLoading, error };
}

export function useEvent(id: string, options = {}) {
  const fetchEvent = async (): Promise<Event> => {
    const token = await getToken();
    const options = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};
    const data = await get(`${API_BASE}/events/${id}`, options);

    return data;
  };
  const { data, isLoading, error } = useQuery<Event>({
    queryKey: ["event-show", id],
    queryFn: fetchEvent,
    ...options,
  });
  return { data, isLoading, error };
}

export function useMyEvent(userId: string, eventId: string, options = {}) {
  const fetchEvent = async (): Promise<Event> => {
    const data = await get(`${API_BASE}/users/${userId}/event/${eventId}`, {});

    return data;
  };
  const { data, isLoading, error } = useQuery<Event>({
    queryKey: ["my-event", userId, eventId],
    queryFn: fetchEvent,
    ...options,
  });
  return { data, isLoading, error };
}

export const useCreateEvent = (
  options?: UseMutationOptions<
    ApiEventRes<Event>,
    unknown,
    {
      body: { event: CreateEvent };
    }
  >
) => {
  return useMutation<
    ApiEventRes<Event>,
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

export const useUpdateEvent = (
  options?: UseMutationOptions<
    ApiResponse<Event>,
    unknown,
    {
      body: { event: Event };
      id: number;
    }
  >
) => {
  return useMutation<
    ApiResponse<Event>,
    unknown,
    {
      body: { event: Event };
      id: number;
    }
  >({
    mutationFn: async ({ body, id }) => {
      const token = await getToken();
      const data = await patch(`${API_BASE}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};

export const useParticipate = (
  options?: UseMutationOptions<
    ApiEventRes<Event>,
    unknown,
    {
      body: { event: { role: number } };
      id: number;
    }
  >
) => {
  return useMutation<
    ApiEventRes<Event>,
    unknown,
    {
      body: { event: { role: number } };
      id: number;
    }
  >({
    mutationFn: async ({ body, id }) => {
      const token = await getToken();
      const data = await post(`${API_BASE}/events/${id}/participate`, {
        headers: { Authorization: `Bearer ${token}` },
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
