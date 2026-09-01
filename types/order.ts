export type OrderStatus =
  | "placed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: {
    size?: string;
    color?: string;
  };
}

export interface Order {
  id: string;
  orderNumber: string;
  email: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
  partialCodAmount?: number;
  createdAt: string;
  estimatedDelivery: string;
}

export interface CreateOrderInput {
  email: string;
  items: OrderItem[];
  shippingAddress: Address;
  shippingMethod: string;
  paymentMethod: string;
  promoCode?: string;
  partialCod?: boolean;
}
