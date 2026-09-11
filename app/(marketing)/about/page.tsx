import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | " + SITE_CONFIG.name,
};

export default function AboutPage() {
  return (


    <div className="flex min-h-screen flex-col bg-[#f9fafb]">
      <main className="mx-auto w-full max-w-[800px] px-6 py-20 md:px-12 md:py-24">
        <h1 className="mb-10 text-6xl font-bold tracking-tighter text-[#111] md:text-7xl">
          About Us
        </h1>

        <div className="space-y-6 text-[17px] leading-[1.8] text-[#333]">
          <p>
            Welcome to our store. We are focused on delivering quality products, transparent pricing, and a
            smooth shopping experience.
          </p>

          <p>
            Our team works every day to keep product quality high, deliveries reliable, and customer
            support responsive.
          </p>

          <div className="pt-2">
            <p className="mb-5 font-bold text-[#111]">
              What we stand for
            </p>

            <ul className="list-outside list-disc space-y-4 pl-5 marker:text-gray-400">
              <li>Quality products from trusted suppliers.</li>
              <li>Fair pricing and clear communication.</li>
              <li>Fast support for order and delivery issues.</li>
            </ul>
          </div>

          <p className="pt-4">Thank you for shopping with us.</p>
        </div>
      </main>
    </div>
  );
}