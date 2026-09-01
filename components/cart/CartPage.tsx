"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Price } from "@/components/shared/Price";
import { EmptyState } from "@/components/shared/EmptyState";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore, selectCartSubtotal, selectFreeShippingProgress } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { PROMO_CODES } from "@/lib/constants";
import { getFeaturedProducts } from "@/lib/api/products";
import { toast } from "sonner";
import { useState } from "react";

export function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const promoCode = useCartStore((s) => s.promoCode);
  const setPromoCode = useCartStore((s) => s.setPromoCode);
  const subtotal = selectCartSubtotal(items);
  const { progress, remaining, qualified } = selectFreeShippingProgress(subtotal);
  const [promoInput, setPromoInput] = useState("");
  const upsells = getFeaturedProducts(2);

  const applyPromo = () => {
    const code = promoInput.toUpperCase();
    if (PROMO_CODES[code]) {
      setPromoCode(code);
      toast.success("Promo code applied!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  let discount = 0;
  if (promoCode && PROMO_CODES[promoCode]) {
    const promo = PROMO_CODES[promoCode];
    discount = promo.discountType === "percentage" ? subtotal * (promo.discountValue / 100) : promo.discountValue;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Looks like you haven't added anything yet"
        actionLabel="Start Shopping"
        actionHref="/products"
      />
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {!qualified && (
          <div className="p-4 rounded-lg bg-muted space-y-2">
            <p className="text-sm">Add {formatPrice(remaining)} more for free shipping!</p>
            <div className="h-2 rounded-full bg-background overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {items.map((item) => {
          const variantKey = `${item.variant?.size ?? ""}-${item.variant?.color ?? ""}`;
          return (
            <div key={`${item.productId}-${variantKey}`} className="flex gap-4 p-4 border rounded-lg">
              <Link href={`/products/${item.slug}`} className="relative h-24 w-20 rounded overflow-hidden bg-muted shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </Link>
              <div className="flex-1">
                <Link href={`/products/${item.slug}`} className="font-medium hover:text-primary">{item.name}</Link>
                {item.variant && (
                  <p className="text-sm text-muted-foreground">
                    {[item.variant.size, item.variant.color].filter(Boolean).join(" / ")}
                  </p>
                )}
                <Price amount={item.price} size="sm" className="mt-1" />
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity - 1, variantKey)} aria-label="Decrease">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.productId, item.quantity + 1, variantKey)} aria-label="Increase">
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 ml-auto" onClick={() => removeItem(item.productId, variantKey)} aria-label="Remove">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}

        {upsells.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-4">You might also like</h3>
            <div className="grid grid-cols-2 gap-4">
              {upsells.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="p-6 border rounded-lg space-y-4 sticky top-24">
          <h2 className="font-semibold text-lg">Order Summary</h2>
          <div className="flex gap-2">
            <Input
              placeholder="Promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              aria-label="Promo code"
            />
            <Button variant="outline" onClick={applyPromo}>
              <Tag className="h-4 w-4" />
            </Button>
          </div>
          {promoCode && <p className="text-sm text-success">Code {promoCode} applied</p>}
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between"><span>Shipping</span><span>{qualified ? "Free" : formatPrice(49)}</span></div>
            <Separator />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{formatPrice(subtotal - discount + (qualified ? 0 : 49))}</span>
            </div>
          </div>
          <Button asChild className="w-full" size="lg">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
