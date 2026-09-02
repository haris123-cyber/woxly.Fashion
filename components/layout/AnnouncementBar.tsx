"use client";

import { Fragment } from "react";

export function AnnouncementBar() {
  const content = Array.from({ length: 12 }).map((_, i) => (
    <Fragment key={i}>
      <span className="whitespace-nowrap">use WELOCOM10 code to 10% off on every product</span>
      <span className="text-[#cfae70]">♦</span>
    </Fragment>
  ));

  return (
    <div className="bg-background text-foreground text-[11px] tracking-[0.1em] uppercase py-2.5 overflow-hidden border-b border-border flex flex-nowrap w-full group">
      <div className="flex items-center justify-start min-w-full gap-8 animate-marquee shrink-0 pr-8">
        {content}
      </div>
      <div className="flex items-center justify-start min-w-full gap-8 animate-marquee shrink-0 pr-8" aria-hidden="true">
        {content}
      </div>
    </div>
  );
}
