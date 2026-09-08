"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllOrders } from "@/lib/api/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/types/order";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Reverse to show newest orders first
    setOrders(getAllOrders().reverse());
    setMounted(true);
  }, []);

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

  if (!mounted) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="border-b border-border pb-6">
          <div className="h-8 bg-muted w-48 mb-2"></div>
          <div className="h-4 bg-muted w-64"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-border pb-6">
        <h2 className="font-fraunces text-2xl font-normal text-foreground mb-2">Order History</h2>
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.1em]">View and track your recent orders.</p>
      </div>

      {orders.length === 0 ? (
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.1em]">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`} className="block p-6 border border-border bg-background hover:border-[#cfae70] transition-colors">
              <div className="flex flex-col gap-4">
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-foreground mb-1">{order.orderNumber}</p>
                    <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{formatDate(order.createdAt)}</p>
                  </div>
                  <span className={`px-3 py-1 ${getStatusColor(order.status)} text-[9px] font-bold tracking-[0.15em] uppercase shrink-0`}>
                    {order.status}
                  </span>
                </div>

                {/* Content Row */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-2">
                  <div className="flex flex-wrap gap-2">
                    {order.items.map((item, index) => (
                      <div key={`${item.productId}-${index}`} className="relative w-32 h-36 bg-muted rounded-sm overflow-hidden border border-border">
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="text-right mt-2 sm:mt-0">
                    <p className="font-fraunces font-medium text-foreground text-sm">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
