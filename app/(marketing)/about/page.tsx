import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <StaticPageLayout title="About Woxly">
      <p>Woxly is a premium fashion and lifestyle brand dedicated to bringing you curated collections that blend timeless elegance with contemporary style.</p>
      <p>Founded with a vision to make quality fashion accessible, we source the finest materials and partner with ethical manufacturers to create products you&apos;ll love for years to come.</p>
      <h2>Our Mission</h2>
      <p>To empower individuals to express their unique style through thoughtfully designed, sustainably made products.</p>
      <h2>Our Values</h2>
      <ul>
        <li>Quality craftsmanship in every product</li>
        <li>Sustainable and ethical sourcing</li>
        <li>Customer-first approach</li>
        <li>Inclusive sizing and styles</li>
      </ul>
    </StaticPageLayout>
  );
}
