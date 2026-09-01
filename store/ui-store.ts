"use client";

import { create } from "zustand";

interface UIState {
  cartDrawerOpen: boolean;
  mobileNavOpen: boolean;
  quickViewProductId: string | null;
  setCartDrawerOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setQuickViewProductId: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  cartDrawerOpen: false,
  mobileNavOpen: false,
  quickViewProductId: null,
  setCartDrawerOpen: (open) => set({ cartDrawerOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setQuickViewProductId: (id) => set({ quickViewProductId: id }),
}));
