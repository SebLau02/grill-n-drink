import { Authentication, User } from "@/config/types";
import { create } from "zustand";

interface AppState {
  user: (User & Authentication) | null;
  setUser: (user: User & Authentication) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
