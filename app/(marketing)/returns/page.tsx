import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <StaticPageLayout title="Returns & Refunds">
      <h2>30-Day Return Policy</h2>
      <p>We want you to love your purchase. If you&apos;re not completely satisfied, return it within 30 days for a full refund.</p>
      <h2>Conditions</h2>
      <ul>
        <li>Items must be unworn, unwashed, and in original condition</li>
        <li>Original tags must be attached</li>
        <li>Items must be in original packaging</li>
      </ul>
      <h2>How to Return</h2>
      <p>Contact our support team at hello@woxly.store with your order number. We&apos;ll provide a prepaid return label.</p>
      <h2>Refunds</h2>
      <p>Refunds are processed within 5-7 business days after we receive your return.</p>
    </StaticPageLayout>
  );
}
