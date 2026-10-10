import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { formatStoreAddress, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Shipping Information" };

export default function ShippingPage() {
  return (
    <StaticPageLayout title="Shipping & Delivery">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl min-h-[70vh]">
        <h1 className="text-4xl font-bold text-[#111827] mb-8">Shipping Policy</h1>

        <div className="text-[15px] text-gray-600 leading-relaxed">
          <div className="space-y-4 mb-12">
            <p><strong>Store:</strong> {SITE_CONFIG.legalName}</p>
            <p><strong>Support Email:</strong> {SITE_CONFIG.email}</p>
            <p><strong>Support Phone:</strong> {SITE_CONFIG.phone}</p>
            <p><strong>Support Hours:</strong> {SITE_CONFIG.supportHours}</p>
            {SITE_CONFIG.dispatchAddress && <p><strong>Dispatch Location:</strong> {formatStoreAddress(SITE_CONFIG.dispatchAddress)}</p>}
          </div>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Delivery Areas</h2>
          <p className="mb-12">
            We deliver to serviceable locations listed at checkout. Orders placed outside our delivery zones cannot be fulfilled.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Order Processing</h2>
          <p className="mb-12">
            Orders are typically processed within 1 to 2 business days after payment confirmation. Processing may take longer during peak seasons, sales, or holidays.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Shipping Charges</h2>
          <p className="mb-12">
            Shipping fees, if applicable, are shown at checkout before you place your order. Charges may vary by location, order value, and delivery method.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Free Shipping</h2>
          <p className="mb-12">
            Free shipping may be available on eligible orders above a minimum cart value. Any free-shipping threshold and conditions are displayed at checkout.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Estimated Delivery Times</h2>
          <p className="mb-12">
            Estimated delivery windows are shown at checkout and on your order confirmation. Delivery times are estimates only and are not guaranteed.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Order Tracking</h2>
          <p className="mb-12">
            Once your order is dispatched, tracking updates are shared by SMS, email, or WhatsApp where available. You can also view live status from your orders page.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Delivery Issues</h2>
          <ul className="list-disc pl-5 space-y-2 mb-12">
            <li>If your package arrives damaged, refuse delivery when possible and contact us immediately.</li>
            <li>If delivery is delayed beyond the estimated window, contact support with your order number.</li>
            <li>If you receive the wrong item, contact us within 48 hours of delivery.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Need Help?</h2>
          <p className="mb-12">
            For shipping-related questions, contact {SITE_CONFIG.email}.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
