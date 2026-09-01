"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/shared/Price";
import { EmptyState } from "@/components/shared/EmptyState";
import { useCartStore, selectCartSubtotal, selectCartItemCount, selectFreeShippingProgress } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const open = useUIStore((s) => s.cartDrawerOpen);
  const setOpen = useUIStore((s) => s.setCartDrawerOpen);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = selectCartSubtotal(items);
  const itemCount = selectCartItemCount(items);
  const { progress, remaining, qualified } = selectFreeShippingProgress(subtotal);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-[#0a0a0a] border-l border-[#1a1a1a] text-[#f5f5f5] p-6">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left font-fraunces text-2xl font-normal text-[#f5f5f5]">Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add some products to get started"
            actionLabel="Continue Shopping"
            actionHref="/products"
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-8 hide-scrollbar">
              {!qualified && (
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] uppercase tracking-[0.1em] text-[#8a8a8a]">
                    <span>Add {formatPrice(remaining)} more for free shipping</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div className="h-1 rounded-none bg-[#222] overflow-hidden">
                    <div
                      className="h-full bg-[#cfae70] transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
              {qualified && (
                <p className="text-[10px] uppercase tracking-[0.1em] text-[#cfae70] font-bold">You qualify for free shipping!</p>
              )}

              <div className="space-y-6">
                {items.map((item) => {
                  const variantKey = `${item.variant?.size ?? ""}-${item.variant?.color ?? ""}`;
                  return (
                    <div key={`${item.productId}-${variantKey}`} className="flex gap-4">
                      <div className="relative h-28 w-20 bg-[#111] border border-[#1a1a1a] shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="font-fraunces text-lg text-[#f5f5f5] hover:text-[#cfae70] transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          {item.variant && (
                            <p className="text-[9px] uppercase tracking-[0.1em] text-[#8a8a8a] mt-1">
                              {[item.variant.size, item.variant.color].filter(Boolean).join(" / ")}
                            </p>
                          )}
                          <p className="text-[#cfae70] font-fraunces text-sm mt-2">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                          <button
                            className="h-8 w-8 border border-[#222] flex items-center justify-center text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#cfae70] transition-colors"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, variantKey)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-[11px] font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            className="h-8 w-8 border border-[#222] flex items-center justify-center text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#cfae70] transition-colors"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, variantKey)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            className="h-8 w-8 ml-auto text-[#8a8a8a] hover:text-red-500 transition-colors flex items-center justify-center"
                            onClick={() => removeItem(item.productId, variantKey)}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-[#1a1a1a] pt-6 space-y-6 mt-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8a8a8a]">Subtotal</span>
                <span className="font-fraunces text-2xl text-[#cfae70]">{formatPrice(subtotal)}</span>
              </div>
              <div className="space-y-3">
                <Button asChild className="w-full bg-[#cfae70] hover:bg-[#b5985d] text-black rounded-none uppercase font-bold text-[10px] tracking-[0.2em] h-12 transition-colors" onClick={() => setOpen(false)}>
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-[#222] hover:border-[#cfae70] text-[#8a8a8a] hover:text-[#f5f5f5] rounded-none uppercase font-bold text-[10px] tracking-[0.2em] h-12 bg-transparent transition-colors" onClick={() => setOpen(false)}>
                  <Link href="/cart">View Full Cart</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
