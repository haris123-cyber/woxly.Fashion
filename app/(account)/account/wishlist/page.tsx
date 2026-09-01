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
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Wishlist ({products.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
