import { SITE_CONFIG } from "@/lib/constants";

export function formatPrice(
  amount: number,
  currency = SITE_CONFIG.currency,
  locale = SITE_CONFIG.locale
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
