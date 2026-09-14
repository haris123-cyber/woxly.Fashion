"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

export function BeautyArrivalsCarousel({ products }: { products?: Product[] }) {
  const displayProducts = products || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  if (displayProducts.length === 0) return null;

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.clientWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  useEffect(() => {
    // Initial calculation to set the right active index
    handleScroll();
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-[#fde7f9] to-white py-12 px-4 md:px-8 flex flex-col items-center border-b border-border overflow-hidden">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#001f3f]">
          New At <span className="italic font-serif">WOXLY</span>
        </h2>
        <p className="text-[#001f3f] text-sm md:text-base">Latest Arrivals You'll Want To Own</p>
      </div>

      <div
        className="w-full max-w-6xl relative mb-10"
      >
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none py-10 px-[30vw] md:px-[35vw] gap-6 md:gap-10 items-center"
        >
          {displayProducts.map((product, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div
                key={product.id}
                className={cn(
                  "snap-center shrink-0 transition-all duration-500 ease-out flex flex-col items-center bg-white shadow-sm hover:shadow-md  p-2 w-[55vw] md:w-[280px]",
                  isActive
                    ? "scale-110 md:scale-110 z-10 shadow-lg border border-border"
                    : "scale-90 md:scale-95 opacity-60 blur-[1px] hover:blur-none hover:opacity-100"
                )}
              >
                <div className="relative w-full aspect-square mb-2 mt-2">
                  <Image src={product.images[0]} alt={product.name} fill className="object-contain" />
                </div>

                {/* Always render text to maintain consistent height, just toggle opacity */}
                <div className={cn("text-center pb-2 transition-opacity duration-500", isActive ? "opacity-100" : "opacity-0 pointer-events-none")}>
                  <h4 className="text-[#001f3f] font-bold text-sm md:text-lg truncate max-w-full px-2">{product.name}</h4>
                  <p className="text-[#cfae70] font-bold text-xs">${product.price.toFixed(2)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Link href="/products" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border border-black hover:bg-black hover:text-white transition-colors">
        View All <span className="ml-2">&rarr;</span>
      </Link>
    </div>
  );
}
