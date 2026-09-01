import type { Order, CreateOrderInput } from "@/types/order";
import { PROMO_CODES } from "@/lib/constants";

const orders: Order[] = [
  {
    id: "ord-1",
    orderNumber: "WOXLY-2026-001",
    email: "demo@woxly.store",
    status: "shipped",
    items: [
      {
        productId: "prod-1",
        name: "Classic Linen Shirt",
        price: 2499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        variant: { size: "M", color: "White" },
      },
    ],
    subtotal: 2499,
    shipping: 49,
    discount: 0,
    total: 2548,
    shippingAddress: {
      firstName: "Demo",
      lastName: "User",
      email: "demo@woxly.store",
      phone: "+919876543210",
      addressLine1: "123 Fashion Street",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      country: "India",
    },
    shippingMethod: "standard",
    paymentMethod: "card",
    createdAt: "2026-08-20T10:00:00Z",
    estimatedDelivery: "2026-08-27T10:00:00Z",
  },
];

export function getOrder(orderNumber: string, email: string): Order | undefined {
  return orders.find(
    (o) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase() && o.email.toLowerCase() === email.toLowerCase()
  );
}

export function getOrdersByEmail(email: string): Order[] {
  return orders.filter((o) => o.email.toLowerCase() === email.toLowerCase());
}

export function createOrder(input: CreateOrderInput): Order {
  const subtotal = input.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  let discount = 0;
  if (input.promoCode && PROMO_CODES[input.promoCode.toUpperCase()]) {
    const promo = PROMO_CODES[input.promoCode.toUpperCase()];
    if (!promo.minOrder || subtotal >= promo.minOrder) {
      discount =
        promo.discountType === "percentage"
          ? subtotal * (promo.discountValue / 100)
          : promo.discountValue;
    }
  }
  const shipping = input.shippingMethod === "express" ? 149 : input.shippingMethod === "same-day" ? 249 : 49;
  const total = subtotal + shipping - discount;
  const partialCodAmount = input.partialCod ? total * 0.2 : undefined;

  const order: Order = {
    id: `ord-${Date.now()}`,
    orderNumber: `WOXLY-${Date.now().toString().slice(-8)}`,
    email: input.email,
    status: "placed",
    items: input.items,
    subtotal,
    shipping,
    discount,
    total,
    shippingAddress: input.shippingAddress,
    shippingMethod: input.shippingMethod,
    paymentMethod: input.paymentMethod,
    partialCodAmount,
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  orders.push(order);
  return order;
}
