"use client";

export function AnnouncementBar() {
  const content = Array.from({ length: 8 }).map((_, i) => (
    <div key={i} className="flex items-center gap-8 shrink-0">
      <span className="whitespace-nowrap">USE WELOCOM10 CODE FOR 10% OFF ON EVERY PRODUCT</span>
      <span className="text-[#cfae70]">♦</span>
    </div>
  ));

  return (
    <div className="bg-background text-foreground text-[11px] tracking-[0.1em] py-2.5 overflow-hidden border-b border-border flex flex-nowrap w-full group">
      <div className="flex items-center justify-start min-w-full animate-marquee shrink-0 gap-8 pr-8">
        {content}
      </div>
      <div className="flex items-center justify-start min-w-full animate-marquee shrink-0 gap-8 pr-8" aria-hidden="true">
        {content}
      </div>
    </div>
  );
}
