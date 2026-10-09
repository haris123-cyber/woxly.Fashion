"use client";

import { SITE_CONFIG } from "@/lib/constants";

export function AnnouncementBar() {
  const content = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="flex items-center gap-8 shrink-0">
      <span className="whitespace-nowrap">
        {SITE_CONFIG.primaryOffer.label.toUpperCase()} · USE {SITE_CONFIG.primaryOffer.code}
      </span>
      <span className="text-[#cfae70]">♦</span>
    </div>
  ));

  return (
    <div className="h-8 bg-background text-foreground text-[10px] tracking-[0.1em] overflow-hidden border-b border-border flex flex-nowrap items-center w-full group" aria-label={`${SITE_CONFIG.primaryOffer.label}. Use code ${SITE_CONFIG.primaryOffer.code}`}>
      <div className="flex items-center justify-start min-w-full animate-marquee shrink-0 gap-8 pr-8">
        {content}
      </div>
      <div className="flex items-center justify-start min-w-full animate-marquee shrink-0 gap-8 pr-8" aria-hidden="true">
        {content}
      </div>
    </div>
  );
}
