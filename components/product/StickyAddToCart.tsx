"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/shared/Price";
import type { Product } from "@/types/product";

interface StickyAddToCartProps {
  product: Product;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
}

export function StickyAddToCart({ product, onAddToCart }: StickyAddToCartProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] animate-slide-up">
      <div className="container mx-auto flex items-center gap-3">
        <div className="relative h-12 w-10 rounded overflow-hidden shrink-0 hidden sm:block">
          <Image src={product.images[0]} alt="" fill className="object-cover" sizes="40px" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{product.name}</p>
          <Price amount={product.price} size="sm" />
        </div>
        <Button onClick={onAddToCart} size="sm">
          <ShoppingBag className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
        <button
          onClick={() => setDismissed(true)}
          className="text-muted-foreground hover:text-foreground min-h-11 min-w-11 flex items-center justify-center"
          aria-label="Dismiss"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
