import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-24 px-4 text-center border border-border bg-background", className)}>
      <div className="mb-6 border border-border p-6 bg-muted/10">
        <Icon className="h-8 w-8 text-muted-foreground stroke-[1.5]" />
      </div>
      <h3 className="font-fraunces text-2xl font-normal text-foreground mb-4">{title}</h3>
      {description && (
        <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground max-w-sm mb-8 leading-relaxed">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link href={actionHref} className="inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
