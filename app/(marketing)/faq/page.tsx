import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const metadata: Metadata = { title: "FAQ" };

const FAQS = [
  { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. Items must be unworn with original tags attached." },
  { q: "How long does shipping take?", a: "Standard delivery takes 5-7 business days. Express delivery (2-3 days) and same-day delivery (metro cities) are also available." },
  { q: "Do you offer free shipping?", a: "Yes! Free standard shipping on all orders over ₹999." },
  { q: "What payment methods do you accept?", a: "We accept credit/debit cards, UPI, cash on delivery, and partial COD (pay 20% online, rest on delivery)." },
  { q: "How do I track my order?", a: "Visit our Track Order page and enter your order number and email address." },
  { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 1 hour of placement. Contact our support team for assistance." },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StaticPageLayout title="Frequently Asked Questions">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </StaticPageLayout>
    </>
  );
}
