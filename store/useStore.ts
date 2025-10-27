import { AuthenticatedUser } from "@/config/types";
import { create } from "zustand";

interface AppState {
  user: AuthenticatedUser | null;
  setUser: (user: AuthenticatedUser) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
