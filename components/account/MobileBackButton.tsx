"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function MobileBackButton() {
  const pathname = usePathname();

  // Don't show the back button on the root account dashboard
  if (pathname === '/account') return null;

  return (
    <div className="md:hidden mb-6">
      <Link href="/account" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-foreground bg-white hover:text-foreground transition-colors border border-border px-3 py-3 rounded-full hover:border-[#cfae70] hover:text-[#cfae70]">
        <ChevronLeft className="w-5 h-5 mr-1" />

      </Link>
    </div>
  );
}
