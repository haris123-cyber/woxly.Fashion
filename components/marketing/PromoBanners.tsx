import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BANNERS = [
  {
    id: 1,
    title: "Summer Collection",
    subtitle: "Up to 50% off on selected items",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    link: "/products?category=sale",
    cta: "Shop Sale"
  },
  {
    id: 2,
    title: "New Accessories",
    subtitle: "Complete your look",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
    link: "/products?category=accessories",
    cta: "Shop Accessories"
  }
];

export function PromoBanners() {
  return (
    <section className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BANNERS.map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group relative aspect-[4/3] md:aspect-[16/9] overflow-hidden bg-secondary flex items-center justify-center"
            >
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />
              
              <div className="relative z-10 text-center px-4 flex flex-col items-center">
                <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                  {banner.subtitle}
                </p>
                <h3 className="font-fraunces text-3xl md:text-4xl text-white mb-6">
                  {banner.title}
                </h3>
                <Button
                  asChild
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black rounded-none px-6 py-5 text-[10px] font-bold tracking-[0.15em] uppercase transition-all"
                >
                  <span>
                    {banner.cta} <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
