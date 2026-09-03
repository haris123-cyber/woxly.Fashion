export function formatPrice(
  amount: number,
  currency = "INR",
  locale = "en-IN"
): string {
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `Rs.${formatted}`;
}
