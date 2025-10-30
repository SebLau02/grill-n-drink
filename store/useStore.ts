import { User } from "@/config/types";
import { create } from "zustand";

interface AppState {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  shouldRefreshPage: boolean;
  setShouldRefreshPage: (value: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  shouldRefreshPage: false,
  setShouldRefreshPage: (value) => set({ shouldRefreshPage: value }),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
