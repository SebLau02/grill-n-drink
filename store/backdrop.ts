import { create } from "zustand";

interface BackdropStore {
  open: boolean;
  setOpen: () => void;
  setClose: () => void;
}

export const useBackdropStore = create<BackdropStore>((set) => ({
  open: false,
  setOpen: () => set({ open: true }),
  setClose: () => set({ open: false }),
}));
