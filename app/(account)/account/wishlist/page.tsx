"use client";

import { useWishlistStore } from "@/store/wishlist-store";
import { MOCK_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((s) => s.items);
  const products = MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  if (products.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="Your wishlist is empty"
        description="Save items you love for later"
        actionLabel="Browse Products"
        actionHref="/products"
      />
    );
  }

  return (
    <div>
      <div className="bg-background flex items-center justify-between mb-8 gap-4 border-b border-border pb-6">
        <h2 className="font-fraunces text-2xl font-normal text-foreground">Wishlist</h2>
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
          {products.length} {products.length === 1 ? 'Item' : 'Items'}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
        {products.map((p) => <ProductCard key={p.id} product={p} showDetails={true} />)}
      </div>
    </div>
  );
}
