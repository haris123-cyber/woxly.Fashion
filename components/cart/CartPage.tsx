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
          <div className="p-6 border border-border bg-muted/10 space-y-4 mb-8">
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold">Add {formatPrice(remaining)} more for free shipping!</p>
            <div className="h-1 bg-background overflow-hidden">
              <div className="h-full bg-[#cfae70] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => {
            const variantKey = `${item.variant?.size ?? ""}-${item.variant?.color ?? ""}`;
            return (
              <div key={`${item.productId}-${variantKey}`} className="flex gap-6 p-6 border border-border bg-background group hover:border-[#cfae70] transition-colors">
                <Link href={`/products/${item.slug}`} className="relative h-32 w-24 overflow-hidden bg-muted shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="96px" />
                </Link>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <Link href={`/products/${item.slug}`} className="text-[11px] uppercase tracking-[0.15em] font-bold hover:text-[#cfae70] transition-colors">{item.name}</Link>
                      {item.variant && (
                        <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground mt-1">
                          {[item.variant.size, item.variant.color].filter(Boolean).join(" / ")}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-fraunces font-medium text-foreground">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto pt-4">
                    <div className="flex items-center border border-border">
                      <button className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" onClick={() => updateQuantity(item.productId, item.quantity - 1, variantKey)} aria-label="Decrease">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-[10px] font-bold">{item.quantity}</span>
                      <button className="h-8 w-8 flex items-center justify-center hover:bg-muted transition-colors text-muted-foreground hover:text-foreground" onClick={() => updateQuantity(item.productId, item.quantity + 1, variantKey)} aria-label="Increase">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-[#cfae70] transition-colors ml-auto" onClick={() => removeItem(item.productId, variantKey)} aria-label="Remove">
                      <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {upsells.length > 0 && (
          <div className="mt-12 pt-12 border-t border-border">
            <h3 className="font-fraunces text-2xl font-normal text-foreground mb-8">You might also like</h3>
            <div className="grid grid-cols-2 gap-4">
              {upsells.map((p) => <ProductCard key={p.id} product={p} showDetails={true} />)}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="p-8 border border-border bg-background sticky top-24 space-y-6">
          <h2 className="font-fraunces text-xl font-normal text-foreground border-b border-border pb-4">Order Summary</h2>
          <div className="flex gap-0">
            <Input
              placeholder="PROMO CODE"
              className="rounded-none border-border focus-visible:ring-0 focus-visible:border-[#cfae70] text-[10px] uppercase tracking-[0.1em]"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              aria-label="Promo code"
            />
            <button className="bg-muted px-4 hover:bg-[#cfae70] hover:text-white transition-colors border border-l-0 border-border" onClick={applyPromo}>
              <Tag className="h-4 w-4" />
            </button>
          </div>
          {promoCode && <p className="text-[10px] uppercase tracking-[0.1em] text-success font-bold">Code {promoCode} applied</p>}
          <div className="space-y-4 text-[11px] uppercase tracking-[0.1em] text-muted-foreground pt-4">
            <div className="flex justify-between"><span>Subtotal</span><span className="text-foreground">{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="flex justify-between text-success"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between"><span>Shipping</span><span className="text-foreground">{qualified ? "Free" : formatPrice(49)}</span></div>
            <div className="pt-4 border-t border-border flex justify-between font-bold text-foreground text-[12px] tracking-[0.15em]">
              <span>Total</span>
              <span className="font-fraunces text-lg font-medium">{formatPrice(subtotal - discount + (qualified ? 0 : 49))}</span>
            </div>
          </div>
          <Link href="/checkout" className="flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold w-full mt-6">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
