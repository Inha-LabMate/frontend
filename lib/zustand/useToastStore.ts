// Toast Store 모킹
import { create } from "zustand";

interface ToastState {
  message: string;
  type: "success" | "error" | "info";
  show: (message: string, type: "success" | "error" | "info") => void;
}

const useToastStore = create<ToastState>((set) => ({
  message: "",
  type: "info",
  show: (message, type) => {
    set({ message, type });
    // 실제로는 토스트 UI를 표시
    console.log(`[Toast ${type.toUpperCase()}]:`, message);
  },
}));

export const toast = {
  error: (message: string) => useToastStore.getState().show(message, "error"),
  success: (message: string) =>
    useToastStore.getState().show(message, "success"),
  info: (message: string) => useToastStore.getState().show(message, "info"),
};

export default useToastStore;

