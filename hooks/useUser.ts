import { get, post } from "@/app/fetch/crud";
import { API_BASE } from "@/config/config";
import { ApiResponse, LoginRes, User, UserLogin } from "@/config/types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

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

export const useGetCode = (
  options?: UseMutationOptions<
    ApiResponse<Event>,
    unknown,
    {
      body: { email: string };
    }
  >
) => {
  return useMutation<
    ApiResponse<Event>,
    unknown,
    {
      body: { email: string };
    }
  >({
    mutationFn: async ({ body }) => {
      const data = await post(`${API_BASE}/get-code`, {
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};

export const useCheckCode = (
  options?: UseMutationOptions<
    ApiResponse<Event>,
    unknown,
    {
      body: { code: string };
    }
  >
) => {
  return useMutation<
    ApiResponse<Event>,
    unknown,
    {
      body: { code: string };
    }
  >({
    mutationFn: async ({ body }) => {
      const data = await post(`${API_BASE}/check-code`, {
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};

export const useResetPassword = (
  options?: UseMutationOptions<
    ApiResponse<Event>,
    unknown,
    {
      body: { password: string; password_confirmation: string };
    }
  >
) => {
  return useMutation<
    ApiResponse<Event>,
    unknown,
    {
      body: { password: string; password_confirmation: string };
    }
  >({
    mutationFn: async ({ body }) => {
      const data = await post(`${API_BASE}/reset-password`, {
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
export const useLogin = (
  options?: UseMutationOptions<
    LoginRes,
    unknown,
    {
      body: UserLogin;
    }
  >
) => {
  return useMutation<
    LoginRes,
    unknown,
    {
      body: UserLogin;
    }
  >({
    mutationFn: async ({ body }) => {
      const data = await post(`${API_BASE}/login`, {
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
export const useSignup = (
  options?: UseMutationOptions<
    ApiResponse<{ message: string }>,
    unknown,
    {
      body: UserLogin;
    }
  >
) => {
  return useMutation<
    ApiResponse<{ message: string }>,
    unknown,
    {
      body: UserLogin;
    }
  >({
    mutationFn: async ({ body }) => {
      const data = await post(`${API_BASE}/users`, {
        body: { user: body },
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
