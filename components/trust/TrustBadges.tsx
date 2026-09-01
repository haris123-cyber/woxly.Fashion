import { Shield, Truck, RotateCcw, CreditCard, Lock, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  truck: Truck,
  returns: RotateCcw,
  card: CreditCard,
  lock: Lock,
  award: Award,
};

export interface TrustBadge {
  icon: string;
  label: string;
  description?: string;
}

interface TrustBadgesProps {
  badges?: TrustBadge[];
  variant?: "inline" | "grid";
  className?: string;
}

const DEFAULT_BADGES: TrustBadge[] = [
  { icon: "lock", label: "Secure Checkout", description: "256-bit SSL encryption" },
  { icon: "truck", label: "Free Shipping", description: "On orders over ₹999" },
  { icon: "returns", label: "Easy Returns", description: "30-day return policy" },
  { icon: "shield", label: "Quality Guarantee", description: "100% authentic products" },
];

export function TrustBadges({
  badges = DEFAULT_BADGES,
  variant = "inline",
  className,
}: TrustBadgesProps) {
  return (
    <div
      className={cn(
        variant === "grid"
          ? "grid grid-cols-2 md:grid-cols-4 gap-4"
          : "flex flex-wrap items-center justify-center gap-6 md:gap-8",
        className
      )}
    >
      {badges.map((badge) => {
        const Icon = ICON_MAP[badge.icon] ?? Shield;
        return (
          <div
            key={badge.label}
            className={cn(
              "flex items-center gap-3",
              variant === "grid" && "flex-col text-center p-4 rounded-lg bg-muted/50"
            )}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{badge.label}</p>
              {badge.description && (
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
