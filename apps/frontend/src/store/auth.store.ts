import { create } from "zustand";
import type { User } from "@sa/shared/types";
import { api } from "@/lib/api";
import { setToken as saveToken, removeToken } from "@/lib/auth";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.auth.login({ email, password });
      if (response.success && response.data) {
        saveToken(response.data.token);
        set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        set({ error: response.error || "Login failed", isLoading: false });
        return false;
      }
    } catch (error: any) {
      set({ error: error.message || "Login failed", isLoading: false });
      return false;
    }
  },

  register: async (email: string, password: string, name?: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.auth.register({ email, password, name });
      if (response.success && response.data) {
        set({ user: response.data, isLoading: false });
        return true;
      } else {
        set({ error: response.error || "Registration failed", isLoading: false });
        return false;
      }
    } catch (error: any) {
      set({ error: error.message || "Registration failed", isLoading: false });
      return false;
    }
  },

  logout: () => {
    removeToken();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const response = await api.auth.me();
      if (response.success && response.data) {
        set({ user: response.data, isAuthenticated: true, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
