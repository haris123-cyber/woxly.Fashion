import type { Metadata } from "next";
import { OrderSuccessClient } from "@/components/checkout/OrderSuccess";

export const metadata: Metadata = {
  title: "Order Confirmed",
};

interface OrderSuccessPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const { orderId } = await params;
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-[#f5f5f5] flex items-center justify-center">
      <div className="container mx-auto px-4">
        <OrderSuccessClient orderNumber={orderId} />
      </div>
    </div>
  );
}
