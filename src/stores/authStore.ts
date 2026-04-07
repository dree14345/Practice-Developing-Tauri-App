import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "../api/auth";

interface AuthState {
  token: string | null;
  userId: number | null;
  username: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      username: null,
      isLoading: false,

      login: async (username, password) => {
        set({ isLoading: true });
        try {
          const result = await authApi.login({
            username: username,
            password: password,
          });
          set({
            token: result.token,
            userId: result.user_id,
            username: result.username,
            isLoading: false,
          });
        } catch (err) {
          set({ isLoading: false });
          throw err; // re-throw so the form can catch it
        }
      },

      logout: () => {
        set({ token: null, userId: null, username: null });
      },
    }),
    { name: "auth-storage" }, // key in localStorage
  ),
);
