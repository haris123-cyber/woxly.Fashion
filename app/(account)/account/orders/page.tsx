import Link from "next/link";
import { getOrdersByEmail } from "@/lib/api/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function OrdersPage() {
  const orders = getOrdersByEmail("demo@woxly.store");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-muted-foreground">No orders yet.</p>
      ) : (
        orders.map((order) => (
          <Link key={order.id} href={`/account/orders/${order.id}`} className="block p-4 border rounded-lg hover:border-primary transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="capitalize">{order.status}</Badge>
                <p className="font-medium mt-1">{formatPrice(order.total)}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
