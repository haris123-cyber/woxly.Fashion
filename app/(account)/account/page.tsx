import Link from "next/link";
import { Package, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountDashboard() {
  return (
    <div className="space-y-8 bg-background">
      <div className="border-b border-border pb-6">
        <h2 className="font-fraunces text-2xl font-normal text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground text-[11px] uppercase tracking-[0.1em]">Welcome back! Manage your orders, wishlist, and account settings.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { href: "/account/orders", icon: Package, label: "Orders", desc: "View order history" },
          { href: "/account/wishlist", icon: Heart, label: "Wishlist", desc: "Saved items" },
          { href: "/account/addresses", icon: MapPin, label: "Addresses", desc: "Manage addresses" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="group p-6 border border-border bg-background hover:border-[#cfae70] transition-colors flex flex-col items-center text-center">
            <item.icon className="h-6 w-6 text-foreground group-hover:text-[#cfae70] transition-colors mb-4" strokeWidth={1.5} />
            <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-foreground mb-1">{item.label}</p>
            <p className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{item.desc}</p>
          </Link>
        ))}
      </div>

      <div className="pt-4">
        <Link href="/products" className="inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold w-full sm:w-auto">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
