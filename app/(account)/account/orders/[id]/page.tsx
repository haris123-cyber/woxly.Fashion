import { notFound } from "next/navigation";
import { getOrdersByEmail } from "@/lib/api/orders";
import { formatPrice, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const orders = getOrdersByEmail("demo@woxly.store");
  const order = orders.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{order.orderNumber}</h2>
          <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
        </div>
        <Badge variant="secondary" className="capitalize">{order.status}</Badge>
      </div>
      <Separator />
      {order.items.map((item) => (
        <div key={item.productId} className="flex justify-between text-sm">
          <span>{item.name} x{item.quantity}</span>
          <span>{formatPrice(item.price * item.quantity)}</span>
        </div>
      ))}
      <Separator />
      <div className="space-y-1 text-sm">
        <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>{formatPrice(order.shipping)}</span></div>
        <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(order.total)}</span></div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>Estimated delivery: {formatDate(order.estimatedDelivery)}</p>
      </div>
    </div>
  );
}
