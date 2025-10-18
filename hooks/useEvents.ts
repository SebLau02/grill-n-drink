import { ApiResponse, Event } from "@/config/types";
import { useQuery } from "@tanstack/react-query";
import { get } from "../app/fetch/crud";

export function useEvents(options = {}) {
  const fetchEvents = async (): Promise<ApiResponse<Event[]>> => {
    return await get("https://api.jsonbin.io/v3/b/68f3f272ae596e708f1b706e", {
      headers: {
        "X-Master-Key":
          "$2a$10$sKBZ/89OmFvUuynzhDHyyeg2OUddpYSl9//uJlu8ycyy0d6n.fbaW",
      },
    });
  };
  const { data, isLoading, error } = useQuery<ApiResponse<Event[]>>({
    queryKey: ["events"],
    queryFn: fetchEvents,
    ...options,
  });
  return { data, isLoading, error };
}

export function useEvent(id: string, options = {}) {
  const fetchEvent = async (): Promise<ApiResponse<Event>> => {
    const data = await get(
      "https://api.jsonbin.io/v3/b/68f3f272ae596e708f1b706e",
      {
        headers: {
          "X-Master-Key":
            "$2a$10$sKBZ/89OmFvUuynzhDHyyeg2OUddpYSl9//uJlu8ycyy0d6n.fbaW",
        },
      }
    );
    const event = data.record.find(
      (event: Event) => event.id.toString() === id
    );
    return { record: event };
  };
  const { data, isLoading, error } = useQuery<ApiResponse<Event>>({
    queryKey: ["event", id],
    queryFn: fetchEvent,
    ...options,
  });
  return { data, isLoading, error };
}
