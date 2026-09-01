import Link from "next/link";
import { Package, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountDashboard() {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">Welcome back! Manage your orders, wishlist, and account settings.</p>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { href: "/account/orders", icon: Package, label: "Orders", desc: "View order history" },
          { href: "/account/wishlist", icon: Heart, label: "Wishlist", desc: "Saved items" },
          { href: "/account/addresses", icon: MapPin, label: "Addresses", desc: "Manage addresses" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="p-4 border rounded-lg hover:border-primary transition-colors">
            <item.icon className="h-6 w-6 text-primary mb-2" />
            <p className="font-medium">{item.label}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </Link>
        ))}
      </div>
      <Button asChild variant="outline">
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
