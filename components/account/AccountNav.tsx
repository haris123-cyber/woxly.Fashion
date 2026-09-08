"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, MapPin, Heart, Settings, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/account/settings", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },

  { href: "/logout", label: "Logout", icon: LogOut },

];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden md:flex flex-col w-48 shrink-0">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-4 text-[10px] uppercase tracking-[0.15em] font-bold transition-all border-l-2",
                isActive ? "border-[#cfae70] text-[#cfae70] bg-muted/30" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/10"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <nav className="md:hidden flex  grid grid-cols-2  pb-4 -mx-4 px-4 border-b border-border mb-6">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center  gap-2 px-4 py-6 text-[12px] uppercase tracking-[0.15em] font-bold border-b-2  -mb-[2px] transition-colors",
                isActive ? "border-[#cfae70] text-[#cfae70]" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
