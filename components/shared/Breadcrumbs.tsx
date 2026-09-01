import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[9px] font-bold tracking-[0.2em] uppercase text-[#666]", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/"
            className="hover:text-[#f5f5f5] transition-colors py-2"
            aria-label="Home"
          >
            HOME
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#f5f5f5] transition-colors py-2"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[#f5f5f5] py-2" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
