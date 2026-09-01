import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <StaticPageLayout title="Terms of Service">
      <p>Last updated: August 2026</p>
      <h2>Acceptance of Terms</h2>
      <p>By accessing and using woxly.store, you agree to be bound by these Terms of Service.</p>
      <h2>Products & Pricing</h2>
      <p>All prices are listed in INR and are subject to change without notice. We reserve the right to limit quantities.</p>
      <h2>Orders</h2>
      <p>We reserve the right to refuse or cancel any order. You will be notified if your order is cancelled.</p>
      <h2>Intellectual Property</h2>
      <p>All content on this site is the property of Woxly and is protected by copyright laws.</p>
    </StaticPageLayout>
  );
}
