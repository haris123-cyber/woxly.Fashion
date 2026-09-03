"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Package, Truck, CheckCircle, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getOrder } from "@/lib/api/orders";
import { formatDate, formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order";

const trackSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
});

const STEPS: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: "placed", label: "Placed", icon: Package },
  { status: "packed", label: "Packed", icon: Box },
  { status: "shipped", label: "Shipped", icon: Truck },
  { status: "delivered", label: "Delivered", icon: CheckCircle },
];

const STATUS_ORDER: OrderStatus[] = ["placed", "packed", "shipped", "delivered"];

export function TrackOrderForm() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<ReturnType<typeof getOrder>>(() => {
    const initialOrder = searchParams.get("order");
    return initialOrder ? getOrder(initialOrder) : undefined;
  });

  const form = useForm<z.infer<typeof trackSchema>>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      orderNumber: searchParams.get("order") ?? "",
    },
  });


  const currentStep = order ? STATUS_ORDER.indexOf(order.status) : -1;

  return (
    <div className="max-w-xl mx-auto space-y-12 mb-24">


      {order && (
        <div className="space-y-8">
          <div className="flex justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-[1px] bg-border -z-10" />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step.status} className="flex flex-col items-center flex-1 bg-background z-10 px-2">
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center transition-colors bg-background border border-border",
                    isActive ? "border-[#cfae70] text-[#cfae70]" : "text-muted-foreground"
                  )}>
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className={cn("text-[9px] uppercase tracking-[0.2em] mt-4 text-center", isCurrent ? "text-[#cfae70] font-bold" : "text-muted-foreground")}>{step.label}</p>
                </div>
              );
            })}
          </div>

          <div className="border border-border bg-muted/10 p-6 space-y-4 text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
            <div className="flex justify-between"><span>Order</span><span className="text-foreground font-bold tracking-[0.15em]">{order.orderNumber}</span></div>
            <div className="flex justify-between"><span>Status</span><span className="text-[#cfae70] font-bold">{order.status}</span></div>
            <div className="flex justify-between"><span>Total</span><span className="font-fraunces text-[14px] lowercase tracking-normal text-foreground">{formatPrice(order.total)}</span></div>
            <div className="flex justify-between border-t border-border pt-4 mt-2"><span>Est. Delivery</span><span className="text-foreground font-bold tracking-[0.15em]">{formatDate(order.estimatedDelivery)}</span></div>
          </div>
        </div>
      )}
    </div>
  );
}
