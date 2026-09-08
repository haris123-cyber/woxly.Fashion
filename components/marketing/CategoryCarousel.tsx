"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

interface CategoryCarouselProps {
  categories: Category[];
}

export function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);

      const cardWidth = containerRef.current.children[0]?.clientWidth || 0;
      if (cardWidth > 0) {
        // Gap is usually around 16px (gap-4) or 24px (gap-6)
        const index = Math.round(scrollLeft / (cardWidth + 24));
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scrollRight = () => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0;
      containerRef.current.scrollBy({ left: cardWidth + 24, behavior: "smooth" });
    }
  };

  const scrollTo = (index: number) => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0]?.clientWidth || 0;
      containerRef.current.scrollTo({ left: index * (cardWidth + 24), behavior: "smooth" });
    }
  };

  return (
    <div className="relative">


      {/* Carousel Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="overflow-x-auto scrollbar-none flex gap-4 md:gap-6 snap-x snap-mandatory py-2 px-1"
      >
        {categories.map((cat, idx) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="group relative aspect-[3/4.5] overflow-hidden bg-slate-100 shrink-0 w-[40vw] sm:w-[calc(50vw-2rem)] md:w-[calc(33.333vw-2rem)] lg:w-[calc(25vw-2rem)]  snap-start"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90" />

            {/* Content */}
            <div className="absolute bottom-6 left-6 text-white z-10">
              <p className="text-[#e2b659] text-[11px] font-semibold tracking-[0.2em] uppercase mb-1.5">
                Explore
              </p>
              <h3 className="font-sans text-3xl font-medium tracking-tight">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>



      {/* Navigation Indicators */}
      <div className="flex flex-col items-center justify-center mt-2 space-y-6">
        <div className="flex gap-2">
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              className={cn(
                "h-2 w-2  transition-colors duration-300",
                activeIndex === idx
                  ? "bg-slate-700"
                  : "bg-slate-200 hover:bg-slate-400"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>


      </div>
    </div>
  );
}
