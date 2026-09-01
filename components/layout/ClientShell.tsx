"use client";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { StoreHydration } from "@/components/providers/store-hydration";

export function ClientShell() {
  return (
    <>
      <StoreHydration />
      <CartDrawer />
    </>
  );
}
