import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { TrustBadges } from "@/components/trust/TrustBadges";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { getCategories, getFeaturedProducts, getNewArrivals } from "@/lib/api/products";
import { SITE_CONFIG } from "@/lib/constants";

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

      <div className="bg-[#0a0a0a] text-white min-h-[calc(100vh-64px)] flex items-center">
        <div className="container mx-auto px-4 md:px-8 w-full">
          <div className="flex flex-col md:flex-row items-stretch">
            
            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-between py-12 md:py-16 lg:py-24 pr-8 lg:pr-16">
              <div className="max-w-xl flex-1 flex flex-col justify-center">
                <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-10">
                  Autumn / Winter 2025
                </p>

                <h1 className="text-6xl md:text-7xl lg:text-[6.5rem] font-fraunces font-normal leading-[1.05] mb-8">
                  <span className="text-[#f5f5f5]">The Art</span><br />
                  <span className="text-[#cfae70]">of Still</span>
                </h1>

                <p className="text-[#666] text-[15px] max-w-[340px] mb-12 leading-relaxed">
                  A collection built on restraint. Considered silhouettes, material integrity, and the quiet confidence of wearing less.
                </p>

                <div className="flex flex-wrap items-center gap-8">
                  <Button
                    asChild
                    className="bg-[#cfae70] hover:bg-[#b5985d] text-black rounded-none px-8 py-6 text-[10px] font-bold tracking-[0.15em] uppercase"
                  >
                    <Link href="/products?category=new-in">
                      Explore Collection <ArrowRight className="ml-3 h-4 w-4" />
                    </Link>
                  </Button>

                  <Link
                    href="/products"
                    className="text-[#666] hover:text-white text-[10px] font-bold tracking-[0.15em] uppercase transition-colors"
                  >
                    Lookbook
                  </Link>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-10 border-t border-[#222] mt-16 max-w-lg">
                <div>
                  <p className="text-[#cfae70] text-3xl font-fraunces mb-2">142</p>
                  <p className="text-[#666] text-[9px] font-bold tracking-[0.15em] uppercase">New Pieces</p>
                </div>
                <div>
                  <p className="text-[#cfae70] text-3xl font-fraunces mb-2">18</p>
                  <p className="text-[#666] text-[9px] font-bold tracking-[0.15em] uppercase">Materials</p>
                </div>
                <div>
                  <p className="text-[#cfae70] text-3xl font-fraunces mb-2">6</p>
                  <p className="text-[#666] text-[9px] font-bold tracking-[0.15em] uppercase">Collabs</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-1 relative min-h-[60vh] md:min-h-[calc(100vh-128px)] hidden md:block border border-[#222]">
              <Image
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=1600&fit=crop"
                alt="Maison Noir Fashion Collection"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Overlay Box */}
              <div className="absolute -left-12 bottom-12 bg-[#111] border border-[#333] p-6 min-w-[180px] shadow-2xl z-20">
                <p className="text-[#666] text-[9px] font-bold tracking-[0.15em] uppercase mb-1">Campaign</p>
                <p className="text-[#f5f5f5] text-sm font-medium font-fraunces">AW25 — Still Life</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="bg-[#0a0a0a] pt-24 pb-16">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl font-fraunces font-normal text-[#f5f5f5]">Shop by Category</h2>
            <Link href="/products" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors flex items-center">
              View All <ArrowRight className="ml-2 h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden bg-[#111]"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/20 to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 text-white z-10">
                  <p className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] uppercase mb-2">Explore</p>
                  <h3 className="font-fraunces text-2xl text-[#f5f5f5] font-normal">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Best Sellers */}
      <section className="bg-[#0a0a0a] py-16 border-t border-[#1a1a1a]">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] uppercase mb-4">Trending</p>
              <h2 className="text-3xl font-fraunces font-normal text-[#f5f5f5]">Best Sellers</h2>
            </div>
            <div className="flex gap-6">
              <Link href="/products" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">All</Link>
              <Link href="/products?category=women" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Women</Link>
              <Link href="/products?category=accessories" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Accessories</Link>
              <Link href="/products?category=sale" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Sale</Link>
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
      <section className="bg-[#0a0a0a] py-16 border-t border-[#1a1a1a]">
        <div className="container mx-auto px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] uppercase mb-4">AW25</p>
              <h2 className="text-3xl font-fraunces font-normal text-[#f5f5f5]">New Arrivals</h2>
            </div>
            <div className="flex gap-6 hidden md:flex">
              <Link href="/products" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">All</Link>
              <Link href="/products?category=women" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Women</Link>
              <Link href="/products?category=accessories" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Accessories</Link>
              <Link href="/products?category=sale" className="text-[#8a8a8a] hover:text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-colors">Sale</Link>
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
      <section className="bg-[#111] py-24 border-t border-[#1a1a1a]">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-16 md:gap-8 justify-between">
            <div className="flex-1 max-w-xl">
              <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-6">Private Circle</p>
              <h2 className="text-4xl md:text-5xl font-fraunces font-normal text-[#f5f5f5] leading-tight max-w-[400px]">
                First access to new arrivals and private sales.
              </h2>
            </div>

            <div className="flex-1 max-w-lg md:pt-4">
              <p className="text-[#8a8a8a] text-[13px] leading-relaxed mb-8">
                Join Maison Noir&apos;s inner circle. Members receive priority access to new collections, exclusive editorial content, and invitations to private events.
              </p>

              <NewsletterForm />

              <p className="text-[#666] text-[10px] tracking-wide mt-4">
                No spam, ever. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
