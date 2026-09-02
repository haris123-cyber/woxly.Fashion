import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your order securely.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <Breadcrumbs items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} className="mb-12" />
        <h1 className="text-4xl font-fraunces font-normal mb-12">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
