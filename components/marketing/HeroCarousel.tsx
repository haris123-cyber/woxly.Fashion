"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const IMAGES = [
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&h=1600&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop",
  "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=1200&h=1600&fit=crop"
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const minSwipeDistance = 50;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]); // Reset timer when index changes manually

  const handleSwipeStart = (clientX: number) => {
    touchEndX.current = null;
    touchStartX.current = clientX;
  };

  const handleSwipeMove = (clientX: number) => {
    touchEndX.current = clientX;
  };

  const handleSwipeEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    } else if (isRightSwipe) {
      setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] bg-muted overflow-hidden select-none"
      onTouchStart={(e) => handleSwipeStart(e.targetTouches[0].clientX)}
      onTouchMove={(e) => handleSwipeMove(e.targetTouches[0].clientX)}
      onTouchEnd={handleSwipeEnd}
      onMouseDown={(e) => handleSwipeStart(e.clientX)}
      onMouseMove={(e) => {
        if (touchStartX.current !== null) handleSwipeMove(e.clientX);
      }}
      onMouseUp={handleSwipeEnd}
      onMouseLeave={() => {
        if (touchStartX.current !== null) handleSwipeEnd();
      }}
    >
      {/* Images */}
      {IMAGES.map((src, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          )}
        >
          <Image
            src={src}
            alt={`Hero Campaign ${idx + 1}`}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-top pointer-events-none"
            draggable="false"
          />
        </div>
      ))}



      {/* Bottom Action Area */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-end z-20 px-4">
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
            className="text-white hover:text-foreground text-[10px] font-bold tracking-[0.15em] uppercase transition-colors"
          >
            Lookbook
          </Link>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-2 mt-6">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation(); // prevent swipe triggering when clicking dots
                setCurrentIndex(idx);
              }}
              className={cn(
                "h-1.5 transition-all rounded-full shadow-sm cursor-pointer",
                idx === currentIndex ? "w-12 md:w-16 bg-white" : "w-8 md:w-12 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
