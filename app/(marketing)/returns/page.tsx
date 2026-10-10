import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { formatStoreAddress, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <StaticPageLayout title="Returns & Refunds">
      <div className="container mx-auto px-4 py-12 md:py-20 max-w-3xl min-h-[70vh]">
        <h1 className="text-4xl font-bold text-[#111827] mb-8">Return & Refund Policy</h1>

        <div className="text-[15px] text-gray-600 leading-relaxed">
          <div className="space-y-4 mb-12">
            <p><strong>Store:</strong> {SITE_CONFIG.legalName}</p>
            <p><strong>Support Email:</strong> {SITE_CONFIG.email}</p>
            <p><strong>Support Phone:</strong> {SITE_CONFIG.phone}</p>
            {SITE_CONFIG.returnAddress && <p><strong>Return Address:</strong> {formatStoreAddress(SITE_CONFIG.returnAddress)}</p>}
            <p><strong>Support Hours:</strong> {SITE_CONFIG.supportHours}</p>
          </div>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Return Window</h2>
          <p className="mb-12">
            Customers can request a return within {SITE_CONFIG.returns.windowDays} days of delivery, unless an item is marked as non-returnable or exchange-only.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Eligibility</h2>
          <ul className="list-disc pl-5 space-y-2 mb-12">
            <li>Item must be unused and in original condition.</li>
            <li>Original packaging, tags, and proof of purchase are required.</li>
            <li>Customized items, opened hygiene-sensitive goods, digital products, and gift cards may be excluded.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Return Process</h2>
          <p className="mb-12">
            To request a return, contact us using the support details above. Approved requests receive step-by-step instructions and the correct return destination. Please do not send an item before authorization.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Refund Timeline</h2>
          <p className="mb-12">
            Once inspected and approved, refunds are processed to the original payment method within {SITE_CONFIG.returns.refundTimeline}.
          </p>

          <h2 className="text-2xl font-bold text-[#111827] mt-12 mb-4">Need Help?</h2>
          <p className="mb-12">
            For return-related questions, contact {SITE_CONFIG.email}.
          </p>
        </div>
      </div>
    </StaticPageLayout>
  );
}
