"use client";

import { use, useEffect, useState } from "react";
import { getAllOrders } from "@/lib/api/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Truck, Package, Archive, CheckCircle } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import Image from "next/image";

function getStatusColor(status: OrderStatus) {
  switch (status) {
    case 'delivered': return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-100';
    case 'cancelled': return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-100';
    case 'placed': return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100';
    case 'shipped': return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100';
    case 'packed': return 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100';
    default: return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-100';
  }
}

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const orders = getAllOrders();
    const found = orders.find((o) => o.id === id);
    setOrder(found || null);
    setMounted(true);
  }, [id]);

  if (!mounted) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading order details...</div>;
  }

  if (!order) {
    return (
      <div className="text-center space-y-4 py-24 border border-border mb-30">
        <h2 className="text-2xl font-fraunces text-foreground">Order Not Found</h2>
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.1em]">
          We couldn't find the order you're looking for.
        </p>
      </div>
    );
  }

  const statuses = ["placed", "packed", "shipped", "delivered"];
  const currentStatusIndex = statuses.indexOf(order.status);

  const trackingSteps = [
    { id: "placed", label: "Placed", icon: Package },
    { id: "packed", label: "Packed", icon: Archive },
    { id: "shipped", label: "Shipped", icon: Truck },
    { id: "delivered", label: "Delivered", icon: CheckCircle },
  ];

  return (
    <div className="space-y-6 mb-30">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{order.orderNumber}</h2>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <Badge className={`capitalize ${getStatusColor(order.status)}`} variant="outline">
          {order.status}
        </Badge>
      </div>

      <Separator />

      {/* Tracking Section */}
      <div className="py-6">
        <h3 className="font-fraunces text-3xl text-center mb-10 text-foreground">Track Your Order</h3>

        {order.status !== 'cancelled' ? (
          <div className="relative max-w-3xl mx-auto px-4 mt-8">
            {/* The horizontal muted line with progress fill */}
            <div className="absolute top-8 sm:top-10 left-[12.5%]  right-[12.5%] h-px bg-border -z-10">
              <div
                className="absolute top-0 left-0 h-full bg-[#cfae70]  transition-all duration-500"
                style={{ width: `${(Math.max(0, currentStatusIndex) / (trackingSteps.length - 1)) * 100}% ` }}
              />
            </div>

            <div className="flex justify-between items-start">
              {trackingSteps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = currentStatusIndex >= idx;

                return (
                  <div key={step.id} className="flex flex-col items-center flex-1 relative z-10">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center border transition-colors bg-background ${isActive ? 'border-[#cfae70] text-[#cfae70]' : 'border-border text-muted-foreground'}`}>
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1} />
                    </div>
                    <p className={`mt-4 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-bold text-center ${isActive ? 'text-[#cfae70]' : 'text-muted-foreground'}`}>
                      {step.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4  text-center max-w-md mx-auto">
            <p className="font-semibold">Order Cancelled</p>
            <p className="text-sm mt-1">This order was cancelled and will not be delivered.</p>
          </div>
        )}
      </div>


      <div>
        <h3 className="font-semibold text-lg mb-4">Items Summary</h3>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative w-32 h-36 bg-muted shrink-0 rounded-sm overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2 text-sm bg-muted/10 p-4  border border-border">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(order.shipping)}</span></div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-border mt-2">
          <span>Total</span>
          <span className="text-[#cfae70]">{formatPrice(order.total)}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground bg-muted/10 p-4  border border-border">
        <p className="font-medium text-foreground mb-1">Estimated delivery</p>
        <p>{formatDate(order.estimatedDelivery)}</p>
      </div>

      <Separator />

      <div>
        <h3 className="font-semibold text-lg mb-4">Order Details</h3>
        <div className="grid sm:grid-cols-2 gap-6 bg-muted/20 p-6  border border-border text-sm">
          <div>
            <p className="font-semibold text-foreground mb-2">Shipping Address</p>
            <div className="text-muted-foreground space-y-1">
              <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-2">Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-foreground mb-2">Contact</p>
              <p className="text-muted-foreground">{order.email}</p>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-2">Payment Method</p>
              <p className="text-muted-foreground uppercase">{order.paymentMethod}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
