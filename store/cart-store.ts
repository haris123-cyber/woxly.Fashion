"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string, variantKey?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantKey?: string) => void;
  clearCart: () => void;
  setPromoCode: (code: string | null) => void;
}

function getVariantKey(variant?: CartItem["variant"]): string {
  if (!variant) return "";
  return `${variant.size ?? ""}-${variant.color ?? ""}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addItem: (item) => {
        const quantity = item.quantity ?? 1;
        const variantKey = getVariantKey(item.variant);
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && getVariantKey(i.variant) === variantKey
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId && getVariantKey(i.variant) === variantKey
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },

      removeItem: (productId, variantKey = "") => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && getVariantKey(i.variant) === variantKey)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantKey = "") => {
        if (quantity <= 0) {
          get().removeItem(productId, variantKey);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && getVariantKey(i.variant) === variantKey
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [], promoCode: null }),
      setPromoCode: (code) => set({ promoCode: code }),
    }),
    {
      name: "woxly-cart",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({ items: state.items, promoCode: state.promoCode }),
    }
  )
);

export function selectCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function selectCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function selectFreeShippingProgress(subtotal: number): {
  progress: number;
  remaining: number;
  qualified: boolean;
} {
  const qualified = subtotal >= FREE_SHIPPING_THRESHOLD;
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  return { progress, remaining, qualified };
}
