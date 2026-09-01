"use client";

export function AnnouncementBar() {
  return (
    <div className="bg-[#0a0a0a] text-[#8a8a8a] text-[8px] tracking-[0.2em] uppercase py-2.5 px-4 overflow-hidden border-b border-[#1a1a1a]">
      <div className="flex items-center justify-center gap-6 whitespace-nowrap opacity-80">
        <span>FREE SHIPPING ON ORDERS OVER £500</span>
        <span className="text-[#cfae70]">♦</span>
        <span>NEW AW25 COLLECTION — NOW LIVE</span>
        <span className="text-[#cfae70]">♦</span>
        <span>COMPLIMENTARY GIFT WRAPPING</span>
        <span className="text-[#cfae70]">♦</span>
        <span>RETURNS WITHIN 30 DAYS</span>
        
        {/* Repeat for wider screens */}
        <span className="text-[#cfae70] hidden md:inline">♦</span>
        <span className="hidden md:inline">FREE SHIPPING ON ORDERS OVER £500</span>
        <span className="text-[#cfae70] hidden lg:inline">♦</span>
        <span className="hidden lg:inline">NEW AW25 COLLECTION — NOW LIVE</span>
        <span className="text-[#cfae70] hidden xl:inline">♦</span>
        <span className="hidden xl:inline">COMPLIMENTARY GIFT WRAPPING</span>
      </div>
    </div>
  );
}
