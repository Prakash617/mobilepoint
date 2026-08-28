import { api } from "@/lib/api";

export interface User {
  id: number;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  profile_image?: string | null;
  is_verified: boolean;
}

export interface LoginResponse {
  access: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
}

export interface RefreshResponse {
  access: string;
}

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post<LoginResponse>("/auth/login/", {
      email,
      password,
    });
    return data;
  },

  register: async (payload: RegisterRequest) => {
    const { data } = await api.post<RegisterRequest>("/auth/register/", payload);
    return data;
  },

  getMe: async () => {
    const { data } = await api.get<User>("/auth/me/");
    return data;
  },

  refresh: async (refreshToken: string) => {
    const { data } = await api.post<RefreshResponse>("/auth/refresh/", {
      refresh: refreshToken,
    });
    return data;
  },

  uploadProfileImage: async (file: File) => {
    const formData = new FormData();
    formData.append("profile_image", file);
    const { data } = await api.patch<User>("/auth/me/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  logout: async () => {
    await api.post("/auth/logout/", {});
  },
};