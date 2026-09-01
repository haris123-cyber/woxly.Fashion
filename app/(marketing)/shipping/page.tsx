import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export const metadata: Metadata = { title: "Shipping Information" };

export default function ShippingPage() {
  return (
    <StaticPageLayout title="Shipping & Delivery">
      <h2>Shipping Methods</h2>
      <ul>
        <li><strong>Standard Delivery</strong> — ₹49, 5-7 business days</li>
        <li><strong>Express Delivery</strong> — ₹149, 2-3 business days</li>
        <li><strong>Same Day (Metro)</strong> — ₹249, delivered by 8 PM</li>
      </ul>
      <h2>Free Shipping</h2>
      <p>Enjoy free standard shipping on all orders over ₹999.</p>
      <h2>Order Processing</h2>
      <p>Orders are processed within 1-2 business days. You&apos;ll receive a confirmation email with tracking information once your order ships.</p>
    </StaticPageLayout>
  );
}
