import {
  FREE_SHIPPING_THRESHOLD,
  PREPAID_DISCOUNT,
  PROMO_CODES,
  SHIPPING_METHODS,
} from "@/lib/constants";

export interface PromotionResult {
  code: string | null;
  discount: number;
  error: string | null;
  shortfall: number;
}

export function calculatePromotion(code: string | null | undefined, subtotal: number): PromotionResult {
  const normalizedCode = code?.trim().toUpperCase() || null;
  if (!normalizedCode) return { code: null, discount: 0, error: null, shortfall: 0 };

  const promotion = PROMO_CODES[normalizedCode];
  if (!promotion) {
    return { code: normalizedCode, discount: 0, error: "This promo code is invalid or no longer active.", shortfall: 0 };
  }
  if (promotion.minOrder && subtotal < promotion.minOrder) {
    return {
      code: normalizedCode,
      discount: 0,
      error: `Minimum order not met for ${normalizedCode}.`,
      shortfall: promotion.minOrder - subtotal,
    };
  }

  const rawDiscount = promotion.discountType === "percentage"
    ? subtotal * (promotion.discountValue / 100)
    : promotion.discountValue;

  return {
    code: normalizedCode,
    discount: Math.min(rawDiscount, subtotal),
    error: null,
    shortfall: 0,
  };
}

export function calculateShipping(shippingMethod: string, subtotal: number): number {
  if (shippingMethod === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return SHIPPING_METHODS.find((method) => method.id === shippingMethod)?.price
    ?? SHIPPING_METHODS[0].price;
}

export function calculateOrderTotals({
  subtotal,
  promoCode,
  shippingMethod = "standard",
  paymentMethod,
}: {
  subtotal: number;
  promoCode?: string | null;
  shippingMethod?: string;
  paymentMethod?: string;
}) {
  const promotion = calculatePromotion(promoCode, subtotal);
  const shipping = calculateShipping(shippingMethod, subtotal);
  const paymentDiscount = paymentMethod === "online" ? Math.min(PREPAID_DISCOUNT, subtotal) : 0;
  const discount = Math.min(promotion.discount + paymentDiscount, subtotal + shipping);
  const total = Math.max(0, subtotal + shipping - discount);

  return { subtotal, shipping, promotion, paymentDiscount, discount, total };
}
