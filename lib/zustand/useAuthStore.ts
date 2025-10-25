// Zustand Auth Store 모킹
import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean;
  isLoading: boolean;
  setAccessToken: (token: string) => void;
  clearAccessToken: () => void;
  setInitialized: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,
  isLoading: false,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  setInitialized: (value) => set({ isInitialized: value }),
  setLoading: (value) => set({ isLoading: value }),
}));

export default useAuthStore;

