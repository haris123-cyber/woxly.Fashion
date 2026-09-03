"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/shared/Price";
import { ReviewStars } from "@/components/trust/ReviewStars";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
  showDetails?: boolean;
}

export function ProductCard({ product, className, priority = false, showDetails = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const hasHydrated = useWishlistStore((s) => s._hasHydrated);
  
  const isWishlistActive = hasHydrated && isInWishlist;

  const [isMobileVisible, setIsMobileVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth >= 768) return;
        entries.forEach((entry) => {
          setIsMobileVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0,
        rootMargin: "-50% 0px -49% 0px"
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    toast.success("Added to cart", { description: product.name });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className={cn("group relative", className)}>
      <Link href={`/products/${product.slug}`} className="block">
        <div ref={cardRef} className="relative aspect-[3/4] overflow-hidden bg-secondary">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden
            />
          )}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-muted text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-muted text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1">
                Sale
              </span>
            )}
          </div>
          <button
            onClick={handleWishlist}
            className={cn(
              "absolute top-2 right-2 sm:top-4 sm:right-4 flex h-6 w-6 items-center justify-center transition-opacity",
              isMobileVisible ? "opacity-100" : "opacity-0",
              "md:opacity-0 md:group-hover:opacity-100"
            )}
            aria-label={isWishlistActive ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-5 w-5 sm:h-6 sm:w-6 text-white hover:text-[#cfae70]", isWishlistActive && "fill-[#cfae70] text-[#cfae70]")} />
          </button>

          <button
            className={cn(
              "absolute bottom-0 left-0 right-0 bg-muted/90 backdrop-blur-sm text-foreground py-4 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300",
              isMobileVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
              "md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
            )}
            onClick={handleQuickAdd}
          >
            Add to Bag
          </button>
        </div>
        {showDetails && (
          <div className="bg-background text-foreground p-1 md:p-1 space-y-0 md:space-y-1">
            <h3 className="font-fraunces text-[11px] md:text-xs  font-medium uppercase tracking-wider truncate">
              {product.name}
            </h3>
            <div className="text-[11px] md:text-xs font-medium ">
              {formatPrice(product.price)}
            </div>
            {(() => {
              const colors = product.variants?.filter((v) => v.type === "color") || [];
              if (colors.length === 0) return null;
              return (
                <div className="flex items-center gap-[4px] pt-1.5 flex-wrap">
                  {colors.slice(0, 3).map((color, idx) => (
                    <div
                      key={idx}
                      className="w-[12px] h-[12px] border border-[#ccc]"
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    />
                  ))}
                  {colors.length > 3 && (
                    <span className="text-[8px] text-muted-foreground leading-none">
                      +{colors.length - 3}
                    </span>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </Link>
    </div>
  );
}
