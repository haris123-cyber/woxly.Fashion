"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Heart, User, Menu, HomeIcon, UserIcon, HeartIcon, PackageIcon, } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
    <header className="sticky top-0 z-50 border-b border-border bg-background  ">
      <div className="container mx-auto px-4 md:px-8 scrollbar-none">
        <div className="flex h-15 items-center justify-between gap-4 ">

          {/* Left: Logo */}
          <div className="flex-1 flex items-center">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild className="lg:hidden mr-4">
                <button className="text-muted-foreground hover:text-foreground border-none transition-colors p-2 -ml-2" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80  border-r-2 border-border border-[#cfae70]   bg-background">
                <SheetHeader>
                  <SheetTitle className="text-foreground font-fraunces  tracking-widest">{SITE_CONFIG.name}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 h-full overflow-y-auto pb-8 hide-scrollbar">
                  {/* Categories */}
                  <nav className="flex flex-col mt-6 ">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="categories" className="border-b-0">
                        <AccordionTrigger className="hover:no-underline px-3 py-3 transition-colors hover:bg-muted/50 rounded-md">
                          <span className="text-[12px] tracking-[0.2em] font-bold uppercase transition-colors text-foreground">
                            EXPLORE COLLECTIONS
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pb-3 pl-6 pr-3 space-y-3 mt-1">
                          {NAV_LINKS.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={() => setMobileNavOpen(false)}
                              className={cn(
                                "block text-[11px] tracking-[0.15em] uppercase transition-colors py-1.5",
                                pathname === link.href ? "text-[#cfae70] font-bold" : "text-muted-foreground hover:text-foreground font-semibold"
                              )}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </nav>

                  {/* Main Links */}
                  <div className="pt-2 border-t border-border">
                    <nav className="flex flex-col gap-2  text-muted-foreground">

                      <Link href="/" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] gap-2 tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        <HomeIcon className=" mr-2" size={18} />Home
                      </Link>
                      <Link href="/products" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] gap-2 tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        <ShoppingBag className=" mr-2" size={18} />Shop
                      </Link>
                      <Link href="/account/wishlist" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] gap-2 tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        <HeartIcon className=" mr-2" size={18} />Wishlist
                      </Link>
                      <Link href="/account/orders" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] gap-2 tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        <PackageIcon className=" mr-2" size={18} />Orders
                      </Link>
                      <Link href="/login" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] gap-2 tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        <UserIcon className=" mr-2" size={18} />Sign in
                      </Link>
                    </nav>
                  </div>

                  {/* Help & Policies */}
                  <div className="pt-6 border-t border-border ">
                    <h4 className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4 px-3">Help & Policies</h4>
                    <nav className="flex flex-col gap-2 text-muted-foreground">
                      <Link href="/privacy" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Privacy Policy
                      </Link>
                      <Link href="/terms" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Terms of Service
                      </Link>
                      <Link href="/shipping" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Shipping Policy
                      </Link>
                      <Link href="/returns" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Return Policy
                      </Link>
                      <Link href="/blog" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Blog
                      </Link>
                      <Link href="/about" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        About
                      </Link>
                      <Link href="/faq" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        FAQs
                      </Link>
                      <Link href="/feedback" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Feedback
                      </Link>
                      <Link href="/contact" onClick={() => setMobileNavOpen(false)} className="px-3 py-3 rounded-md text-[12px] tracking-[0.2em] font-bold uppercase transition-colors min-h-11 flex items-center">
                        Contact
                      </Link>
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="font-fraunces text-2xl  tracking-[0.1em] text-foreground">
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
                  "text-[11px] tracking-[0.25em] uppercase transition-colors",
                  pathname === link.href ? "text-foreground" : "text-foreground font-medium hover:text-foreground"
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

            {/* Mobile Cart Link */}
            <Link
              href="/cart"
              className="md:hidden relative text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#cfae70] text-[8px] font-bold text-black border border-border">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="hidden md:block relative text-muted-foreground hover:text-foreground transition-colors"
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
