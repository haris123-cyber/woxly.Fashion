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
    const container = containerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollRight(
      Math.ceil(scrollLeft + clientWidth) < scrollWidth - 5
    );

    const firstCard = container.children[0] as HTMLElement;

    if (firstCard) {
      const cardWidth = firstCard.offsetWidth;

      // Detect actual gap instead of hard-coding 24px
      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || "0");

      const index = Math.round(scrollLeft / (cardWidth + gap));

      setActiveIndex(
        Math.min(Math.max(index, 0), categories.length - 1)
      );
    }
  };

  useEffect(() => {
    checkScroll();

    window.addEventListener("resize", checkScroll);

    return () => {
      window.removeEventListener("resize", checkScroll);
    };
  }, [categories.length]);

  const scrollRight = () => {
    const container = containerRef.current;
    if (!container) return;

    const firstCard = container.children[0] as HTMLElement;

    if (firstCard) {
      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || "0");

      container.scrollBy({
        left: firstCard.offsetWidth + gap,
        behavior: "smooth",
      });
    }
  };

  const scrollTo = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const firstCard = container.children[0] as HTMLElement;

    if (firstCard) {
      const styles = window.getComputedStyle(container);
      const gap = parseFloat(styles.columnGap || "0");

      container.scrollTo({
        left: index * (firstCard.offsetWidth + gap),
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">

      {/* Category Carousel */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        className="
          grid grid-rows-1 grid-flow-col
          auto-cols-[40vw]
          sm:auto-cols-[calc(50vw-2rem)]
          md:auto-cols-[calc(33.333vw-2rem)]
          lg:auto-cols-[calc(25vw-2rem)]
          gap-4 md:gap-6
          overflow-x-auto
          scrollbar-none
          py-2
          px-1
          snap-x snap-mandatory
        "
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.slug}`}
            className="
              group
              relative
              aspect-[3/4.5]
              overflow-hidden
              bg-slate-100
              snap-start
            "
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="
                (max-width: 640px) 40vw,
                (max-width: 768px) 50vw,
                (max-width: 1024px) 33vw,
                25vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
            />

            {/* Editorial Gradient */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/75
                via-black/10
                to-transparent
              "
            />

            {/* Category Content */}
            <div className="absolute bottom-5 left-5 z-10 text-white">
              <p className="
                mb-1.5
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/80
              ">
                Explore
              </p>

              <h3 className="
                text-2xl
                md:text-3xl
                font-medium
                tracking-tight
              ">
                {cat.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Editorial Spread / More Indicator */}
      <div
        className={cn(
          `
            pointer-events-none
            absolute
            right-0
            top-0
            bottom-0
            z-20
            flex
            w-16
            md:w-48
            items-center
            justify-center
            md:justify-end
            md:pr-8
            transition-opacity duration-500 ease-in-out
          `,
          canScrollRight ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Soft fade */}
        <div
          className="
              absolute
              inset-0
              bg-gradient-to-l
              from-background/95
              md:from-background
              via-background/50
              md:via-background/80
              to-transparent
            "
        />

        {/* Luxury button */}
        <style>{`
            @keyframes bounceRight {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(3px); }
            }
            .animate-bounce-right {
              animation: bounceRight 1.5s infinite ease-in-out;
            }
          `}</style>
        <div className="relative flex items-center justify-center p-2.5 md:px-5 md:py-2.5 ">

          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="text-foreground animate-bounce-right ml-10"
          />
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="mt-5 flex justify-center">
        <div className="flex items-center gap-1.5">
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to category ${idx + 1}`}
              className={cn(
                "h-2 transition-all duration-300",
                activeIndex === idx
                  ? "w-5 bg-foreground"
                  : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      </div>

    </div>
  );
}