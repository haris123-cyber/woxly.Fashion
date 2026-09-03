import Link from "next/link";
import { getOrdersByEmail } from "@/lib/api/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const orders = getOrdersByEmail("demo@woxly.store");

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
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-foreground mb-1">{order.orderNumber}</p>
                  <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-muted text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase mb-2">
                    {order.status}
                  </span>
                  <p className="font-fraunces font-medium text-foreground text-sm">{formatPrice(order.total)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
