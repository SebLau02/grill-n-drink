import { get } from "@/app/fetch/crud";
import { ApiResponse, User } from "@/config/types";
import { useQuery } from "@tanstack/react-query";

export function useUser(options = {}) {
  const fetchUser = async (): Promise<ApiResponse<User>> => {
    return await get("https://api.jsonbin.io/v3/b/68f3fef2ae596e708f1b7e1a", {
      headers: {
        "X-Master-Key":
          "$2a$10$sKBZ/89OmFvUuynzhDHyyeg2OUddpYSl9//uJlu8ycyy0d6n.fbaW",
      },
    });
  };
  const { data, isLoading, error } = useQuery<ApiResponse<User>>({
    queryKey: ["user"],
    queryFn: fetchUser,
    ...options,
  });
  return { data, isLoading, error };
}
