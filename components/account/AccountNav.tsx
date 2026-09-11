"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, Heart, MapPin, CreditCard, Tag, User, LogOut, ChevronRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import { showCustomToast } from "@/components/shared/CustomToast";
import { getAllOrders } from "@/lib/api/orders";
import { useWishlistStore } from "@/store/wishlist-store";

const NAV = [
  { href: "/account/settings", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", desc: "Track, return or buy again", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", desc: "Your saved items", icon: Heart },
  { href: "/account/addresses", label: "Addresses", desc: "Manage delivery addresses", icon: MapPin },

];

export function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const isRoot = pathname === '/account';

  const [orderCount, setOrderCount] = useState(0);
  const [addressCount, setAddressCount] = useState(1);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    // Only update counts on client to avoid hydration mismatch
    setOrderCount(getAllOrders().length);
    // Addresses is currently mocked as 1 in the addresses page
    setAddressCount(1);
  }, []);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    showCustomToast({ title: "Logged out successfully", type: "success" });
    router.push("/");
  };

  return (
    <nav className={cn(
      "w-full md:w-[400px] shrink-0 flex-col gap-4 p-6  bg-background ",
      !isRoot ? "hidden md:flex" : "flex"
    )}>
      {/* Header Profile Section */}
      <div className="flex flex-col items-center text-center relative pt-2 pb-6">

        <div className="relative mt-0 mb-2">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm bg-white">
            <img src="/images/usericon.png" alt="Sarah Khan" className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 hover:bg-gray-50 transition-colors">
            <Camera className="w-4 h-4 text-black" />
          </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-1">Sarah Khan</h2>
        <p className="text-sm text-gray-600 mb-8">Style speaks louder.</p>

        <div className="flex w-full justify-between items-center px-4">
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl font-bold text-gray-900 mb-1">{orderCount}</span>
            <span className="text-[11px] text-gray-600">Orders</span>
          </div>
          <div className="w-px h-8 bg-black/10 mx-2"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl font-bold text-gray-900 mb-1">{wishlistCount}</span>
            <span className="text-[11px] text-gray-600">Wishlist</span>
          </div>
          <div className="w-px h-8 bg-black/10 mx-2"></div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-xl font-bold text-gray-900 mb-1">{addressCount}</span>
            <span className="text-[11px] text-gray-600">Addresses</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <div className="bg-[#fcfaf9] shadow-sm p-3  flex flex-col">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between p-3 rounded-[1.25rem] transition-all hover:bg-gray-100/50",
                isActive ? "bg-gray-100/50" : ""
              )}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-gray-800" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[13px] font-semibold text-gray-900 mb-0.5">{item.label}</p>
                  <p className="text-[11px] text-gray-500 truncate">{item.desc}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
            </Link>
          );
        })}
      </div>

      {/* Logout */}
      <div className="bg-[#fcfaf9] p-3 shadow-sm flex flex-col mt-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-3 rounded-[1.25rem] transition-all hover:bg-gray-100/50 text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5 text-gray-800" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-900">Log out</p>
            </div>
          </div>
        </button>
      </div>
    </nav>
  );
}
