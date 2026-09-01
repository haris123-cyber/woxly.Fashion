import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <StaticPageLayout title="Privacy Policy">
      <p>Last updated: August 2026</p>
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly, such as name, email, shipping address, and payment details when you make a purchase.</p>
      <h2>How We Use Your Information</h2>
      <p>We use your information to process orders, communicate about your purchases, and improve our services.</p>
      <h2>Data Security</h2>
      <p>We implement industry-standard security measures to protect your personal information.</p>
      <h2>Contact</h2>
      <p>For privacy-related inquiries, contact us at hello@woxly.store.</p>
    </StaticPageLayout>
  );
}
