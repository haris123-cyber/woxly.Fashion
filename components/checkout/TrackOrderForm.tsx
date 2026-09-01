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
  email: z.string().email("Valid email required"),
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
  const [order, setOrder] = useState<ReturnType<typeof getOrder>>(undefined);

  const form = useForm<z.infer<typeof trackSchema>>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      orderNumber: searchParams.get("order") ?? "",
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof trackSchema>) => {
    const found = getOrder(data.orderNumber, data.email);
    setOrder(found);
    if (!found) form.setError("orderNumber", { message: "Order not found. Check your details." });
  };

  const currentStep = order ? STATUS_ORDER.indexOf(order.status) : -1;

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="orderNumber" render={({ field }) => (
            <FormItem><FormLabel>Order Number</FormLabel><FormControl><Input placeholder="WOXLY-..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit" className="w-full">Track Order</Button>
        </form>
      </Form>

      {order && (
        <div className="space-y-6">
          <div className="flex justify-between">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isActive = i <= currentStep;
              const isCurrent = i === currentStep;
              return (
                <div key={step.status} className="flex flex-col items-center flex-1">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    isActive ? "border-primary bg-primary text-primary-foreground" : "border-muted text-muted-foreground"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className={cn("text-xs mt-2", isCurrent && "font-semibold")}>{step.label}</p>
                </div>
              );
            })}
          </div>

          <div className="border rounded-lg p-4 space-y-2 text-sm">
            <p><strong>Order:</strong> {order.orderNumber}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> {formatPrice(order.total)}</p>
            <p><strong>Est. Delivery:</strong> {formatDate(order.estimatedDelivery)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
