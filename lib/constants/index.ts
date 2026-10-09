export const FREE_SHIPPING_THRESHOLD = 999;
export const PARTIAL_COD_PERCENTAGE = 20;
export const DEFAULT_PAGE_SIZE = 12;

export const PROMO_CODES: Record<
  string,
  { discountType: "percentage" | "fixed"; discountValue: number; minOrder?: number }
> = {
  WOXLY10: { discountType: "percentage", discountValue: 10, minOrder: 500 },
  WOXLY20: { discountType: "percentage", discountValue: 20, minOrder: 1000 },
  FLAT100: { discountType: "fixed", discountValue: 100, minOrder: 800 },
};

export const SHIPPING_METHODS = [
  { id: "standard", name: "Standard Delivery", price: 49, eta: "5-7 business days" },
  { id: "express", name: "Express Delivery", price: 149, eta: "2-3 business days" },
  { id: "same-day", name: "Same Day (Metro)", price: 249, eta: "Today by 8 PM" },
];

export const SITE_CONFIG = {
  name: "Woxly",
  legalName: "Woxly",
  tagline: "Premium Fashion & Lifestyle",
  description: "Curated fashion, accessories, and lifestyle pieces designed for everyday confidence.",
  url: "https://woxly.store",
  email: "info@woxly.in",
  phone: "+91 73063 47297",
  supportHours: "Monday to Sunday, 9:00 AM to 8:00 PM IST",
  currency: "INR",
  locale: "en-IN",
  returnAddress: null as string | null,
  physicalStoresEnabled: false,
  instagramUrl: "https://instagram.com",
  primaryOffer: {
    code: "WOXLY10",
    label: "10% off orders over ₹500",
  },
};
