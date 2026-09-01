import { Suspense } from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { TrackOrderForm } from "@/components/checkout/TrackOrderForm";

export const metadata: Metadata = {
  title: "Track Order",
  description: "Track your Woxly order status.",
};

export default function TrackOrderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Track Order" }]} className="mb-6" />
      <h1 className="text-3xl font-fraunces font-bold mb-8 text-center">Track Your Order</h1>
      <Suspense>
        <TrackOrderForm />
      </Suspense>
    </div>
  );
}
