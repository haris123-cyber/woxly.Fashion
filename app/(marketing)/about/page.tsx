import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "About Us | " + SITE_CONFIG.name };

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop"
          alt="About Us Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in">
            The Story of Woxly
          </p>
          <h1 className="text-5xl md:text-7xl font-fraunces text-white mb-6 animate-slide-up">
            Elegance in Every Detail
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Welcome to our store. We are focused on delivering quality products, transparent pricing, and a smooth shopping experience.

            Our team works every day to keep product quality high, deliveries reliable, and customer support responsive.

          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-[3/4] md:aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1000&fit=crop"
                alt="Our Mission"
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                Our Mission
              </p>
              <h2 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground mb-6">
                Fashion with Purpose
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                <p>
                  Founded with a vision to make quality fashion accessible, we source the finest materials and partner with ethical manufacturers to create products you&apos;ll love for years to come.
                </p>
                <p>
                  We aim to empower individuals to express their unique style through thoughtfully designed, sustainably made products that transcend seasonal trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-secondary border-t border-border">
        <div className="container mx-auto px-8 max-w-6xl">
          <div className="text-center mb-16">
            <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Our Values
            </p>
            <h2 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Quality", desc: "Quality products from trusted suppliers." },
              { title: "Transparency", desc: "Fair pricing and clear communication." },
              { title: "Support", desc: "Fast support for order and delivery issues." },
              { title: "Inclusivity", desc: "Offering versatile sizes and styles for every body type." }
            ].map((value, i) => (
              <div key={i} className="text-center p-4 py-8 border border-border  bg-background hover:border-[#cfae70] transition-colors duration-300">
                <h3 className="text-xl font-fraunces mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background border-t border-border text-center">
        <div className="container mx-auto px-8 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-fraunces font-normal text-foreground mb-6">
            Experience the Collection
          </h2>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Discover our latest arrivals and timeless pieces crafted for the modern individual.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-black px-8 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
          >
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
