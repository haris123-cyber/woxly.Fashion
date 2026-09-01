import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your cart and proceed to checkout.",
};

export default function Cart() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Cart" }]} className="mb-6" />
      <h1 className="text-3xl font-fraunces font-bold mb-8">Shopping Cart</h1>
      <CartPage />
    </div>
  );
}
