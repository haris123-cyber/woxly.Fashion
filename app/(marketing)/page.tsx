import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getCategories, getFeaturedProducts, getNewArrivals } from "@/lib/api/products";
import { SITE_CONFIG } from "@/lib/constants";

import { HeroCarousel } from "@/components/marketing/HeroCarousel";

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(8);
  const newArrivals = getNewArrivals(4);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.tagline,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      <HeroCarousel />

      {/* Categories */}
      <section className="bg-background pt-8 pb-8">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-3xl font-fraunces font-normal text-foreground">Shop by Category</h2>
            <Link href="/products" className="text-muted-foreground hover:text-foreground text-[9px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center">
              View All <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-secondary"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 text-foreground z-10">
                  <p className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">Explore</p>
                  <h3 className="font-fraunces text-xl text-[#cfae70] font-normal">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Best Sellers */}
      <section className="bg-background py-8 border-t border-border">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] uppercase mb-2">Trending</p>
              <h2 className="text-3xl font-fraunces font-normal text-foreground">Best Sellers</h2>
            </div>

          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-background py-8 border-t border-border">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] uppercase mb-2">AW25</p>
              <h2 className="text-3xl font-fraunces font-normal text-foreground">New Arrivals</h2>
            </div>
            <div className="flex gap-6 hidden md:flex">
              <Link href="/products" className="text-muted-foreground hover:text-foreground text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">All</Link>
              <Link href="/products?category=women" className="text-muted-foreground hover:text-foreground text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Women</Link>
              <Link href="/products?category=accessories" className="text-muted-foreground hover:text-foreground text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Accessories</Link>
              <Link href="/products?category=sale" className="text-muted-foreground hover:text-foreground text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Sale</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-secondary py-24 border-t border-border">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-8 justify-between">
            <div className="flex-1 max-w-xl">
              <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Private Circle</p>
              <h2 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground leading-tight max-w-[400px]">
                Stay in the loop

              </h2>
            </div>

            <div className="flex-1 max-w-lg md:pt-4">
              <p className="text-muted-foreground text-[13px] leading-relaxed mb-2">
                New products, promos, and exclusive offers in your inbox.
              </p>

              <NewsletterForm />

              <p className="text-muted-foreground text-[10px] tracking-wide mt-2">
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
