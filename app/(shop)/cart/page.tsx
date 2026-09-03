import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your cart and proceed to checkout.",
};

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="border-b border-border pb-6 mb-8">
        <Breadcrumbs items={[{ label: "Cart" }]} className="mb-2 text-[10px] uppercase tracking-[0.1em]" />
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground">Shopping Cart</h1>
      </div>
      <CartPage />
    </div>
  );
}
