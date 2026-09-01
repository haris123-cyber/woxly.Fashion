"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/shared/Price";
import { ReviewStars } from "@/components/trust/ReviewStars";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

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
        <div className="relative aspect-[3/4] overflow-hidden bg-[#111] mb-3">
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
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-[#1a1a1a] text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-[#1a1a1a] text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1">
                Sale
              </span>
            )}
          </div>
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4 text-white hover:text-[#cfae70]", isInWishlist && "fill-[#cfae70] text-[#cfae70]")} />
          </button>
          
          <button
            className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a]/90 backdrop-blur-sm text-white py-4 text-[10px] font-bold tracking-[0.15em] uppercase translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
            onClick={handleQuickAdd}
          >
            Add to Bag
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#666]">{product.category}</p>
          {/* Hiding name and price to match the minimalist look of the mockup, or we can keep them subtle */}
        </div>
      </Link>
    </div>
  );
}
