import { NotificationType, Participate, User } from "@/config/types";
import { create } from "zustand";

interface AppState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  shouldRefreshPage: boolean;
  setShouldRefreshPage: (value: boolean) => void;
  participation: Participate | null;
  setParticipation: (participation: Participate | null) => void;
  notifications: NotificationType[];
  setNotifications: (notifications: NotificationType[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  shouldRefreshPage: false,
  setShouldRefreshPage: (value) => set({ shouldRefreshPage: value }),
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  participation: null,
  setParticipation: (participation) => set({ participation }),

  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
}));
