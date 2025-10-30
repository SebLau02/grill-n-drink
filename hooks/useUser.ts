import { get, patch, post } from "@/app/fetch/crud";
import { getToken } from "@/config/authStorage";
import { API_BASE } from "@/config/config";
import {
  ApiResponse,
  LoginRes,
  User,
  UserLogin,
  UserProfile,
} from "@/config/types";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from "@tanstack/react-query";

export function useUser(options = {}) {
  const fetchUser = async (): Promise<User> => {
    const token = await getToken();
    return await get(`${API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["me"],
    queryFn: fetchUser,
    ...options,
  });
  return { data, isLoading, error };
}
export function useUserProfile(options = {}) {
  const fetchUser = async (): Promise<UserProfile> => {
    const token = await getToken();
    return await get(`${API_BASE}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const { data, isLoading, error, refetch } = useQuery<UserProfile>({
    queryKey: ["profile"],
    queryFn: fetchUser,
    ...options,
  });
  return { data, isLoading, error, refetch };
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

export const useUpdateUser = (
  options?: UseMutationOptions<
    User,
    unknown,
    {
      body: { [key: string]: string };
      id: number;
    }
  >
) => {
  return useMutation<
    User,
    unknown,
    {
      body: { [key: string]: string };
      id: number;
    }
  >({
    mutationFn: async ({ body, id }) => {
      const data = await patch(`${API_BASE}/users/${id}`, {
        body: body,
      });

      if (!data) throw new Error("Requête échouée");
      return data;
    },
    ...options,
  });
};
