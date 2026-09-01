"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";

export function StoreHydration() {
  const setCartHydrated = useCartStore((s) => s.setHasHydrated);
  const setWishlistHydrated = useWishlistStore((s) => s.setHasHydrated);

  useEffect(() => {
    setCartHydrated(true);
    setWishlistHydrated(true);
  }, [setCartHydrated, setWishlistHydrated]);

  return null;
}
