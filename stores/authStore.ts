import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/services/authService";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  _hasHydrated: boolean;
  setAuth: (access: string) => void;
  setUser: (user: User) => void;
  clearAuth: () => void;
  setHasHydrated: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      _hasHydrated: false,

      setAuth: (access) => set({ accessToken: access }),

      setUser: (user) => set({ user }),

      clearAuth: () => set({ accessToken: null, user: null }),
      
      setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "mobilepoint_auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const selectIsAuthenticated = (s: AuthState) => !!s.accessToken;
