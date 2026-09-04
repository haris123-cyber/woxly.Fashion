import type { Metadata } from "next";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Feedback | " + SITE_CONFIG.name };

export default function FeedbackPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in">
            We value your opinion
          </p>
          <h1 className="text-5xl md:text-6xl font-fraunces text-white mb-6 animate-slide-up">
            Feedback
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-8 max-w-3xl">
          <div className="bg-card border border-border p-8 md:p-12 shadow-sm ">
            <h2 className="text-3xl font-fraunces mb-6 text-foreground text-center">We'd Love to Hear From You</h2>
            <p className="text-muted-foreground leading-relaxed text-center mb-10">
              Your feedback helps us improve {SITE_CONFIG.name}. Please let us know how we're doing, what you love, and where we can do better.
            </p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <input type="text" id="name" className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <input type="email" id="email" className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors" placeholder="Your email address" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium text-foreground">Feedback Category</label>
                <select id="category" className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors">
                  <option>General Feedback</option>
                  <option>Product Suggestion</option>
                  <option>Website Issue</option>
                  <option>Customer Service</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <textarea id="message" rows={6} className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors resize-y" placeholder="Tell us what you think..."></textarea>
              </div>

              <button type="button" className="w-full bg-foreground text-background hover:bg-[#cfae70] hover:text-black font-bold uppercase tracking-[0.1em] text-[12px] py-4  transition-colors">
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
