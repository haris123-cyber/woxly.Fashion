"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore, selectCartItemCount } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/products?category=women", label: "WOMEN" },
  { href: "/products?category=men", label: "MEN" },
  { href: "/products?category=accessories", label: "ACCESSORIES" },
  { href: "/products?category=new-in", label: "NEW IN" },
  { href: "/products?category=sale", label: "SALE" },
];

export function Header() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const cartCount = selectCartItemCount(items);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const setCartDrawerOpen = useUIStore((s) => s.setCartDrawerOpen);
  const mobileNavOpen = useUIStore((s) => s.mobileNavOpen);
  const setMobileNavOpen = useUIStore((s) => s.setMobileNavOpen);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-15 items-center justify-between gap-4">

          {/* Left: Logo */}
          <div className="flex-1 flex items-center">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild className="lg:hidden mr-4">
                <button className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background border-r border-border">
                <SheetHeader>
                  <SheetTitle className="text-foreground font-fraunces  tracking-widest">{SITE_CONFIG.name}</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={cn(
                        "px-3 py-3 rounded-md text-[10px] tracking-[0.2em] uppercase transition-colors min-h-11 flex items-center",
                        pathname === link.href ? "text-foreground bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="font-fraunces text-xl  tracking-[0.1em] text-foreground">
              {SITE_CONFIG.name}
            </Link>
          </div>

          {/* Center/Right: Navigation */}
          <nav className="hidden lg:flex items-center gap-8 justify-center flex-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[9px] tracking-[0.25em] uppercase transition-colors",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Icons */}
          <div className="flex-1 flex items-center justify-end gap-5">
            <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Search">
              <Search className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            <Link href="/account" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:flex" aria-label="Account">
              <User className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </Link>

            <Link href="/account/wishlist" className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#cfae70] text-[8px] font-bold text-black border border-border">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="relative text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#cfae70] text-[8px] font-bold text-black border border-border">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
