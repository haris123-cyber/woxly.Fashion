import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceProps {
  amount: number;
  compareAt?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Price({ amount, compareAt, className, size = "md" }: PriceProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl font-semibold",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("font-semibold text-foreground", sizeClasses[size])}>
        {formatPrice(amount)}
      </span>
      {compareAt && compareAt > amount && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(compareAt)}
        </span>
      )}
    </div>
  );
}
