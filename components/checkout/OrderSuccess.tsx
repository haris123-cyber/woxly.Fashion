"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Check, Truck } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface OrderSuccessProps {
  orderNumber: string;
}

export function OrderSuccessClient({ orderNumber }: OrderSuccessProps) {
  const estimatedDelivery = useMemo(
    () => formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
    []
  );

  useEffect(() => {
    // Mock analytics purchase event
    console.log("[Analytics] purchase", { orderNumber, value: 0 });
  }, [orderNumber]);

  return (
    <div className="max-w-xl mx-auto text-center space-y-10 py-16 border border-[#1a1a1a] p-8 md:p-16 bg-[#0a0a0a]">
      <div className="mx-auto w-16 h-16 border border-[#cfae70] flex items-center justify-center rounded-full mb-6">
        <Check className="h-8 w-8 text-[#cfae70]" strokeWidth={1.5} />
      </div>
      
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8a8a8a] mb-4">Order Successful</p>
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-[#f5f5f5] leading-tight">
          Thank you for your purchase.
        </h1>
      </div>

      <div className="py-8 border-y border-[#1a1a1a]">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mb-2">Order Reference</p>
        <p className="text-3xl font-fraunces text-[#cfae70]">{orderNumber}</p>
        <p className="text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mt-8 mb-2">Estimated Delivery</p>
        <p className="text-lg text-[#f5f5f5]">{estimatedDelivery}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link 
          href={`/track-order?order=${orderNumber}`}
          className="flex-1 border border-[#cfae70] bg-[#cfae70] hover:bg-[#b5985d] text-black h-12 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
        >
          <Truck className="h-4 w-4 mr-3" /> Track Order
        </Link>
        <Link 
          href="/products"
          className="flex-1 border border-[#222] hover:border-[#cfae70] text-[#8a8a8a] hover:text-[#f5f5f5] h-12 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors bg-transparent"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
