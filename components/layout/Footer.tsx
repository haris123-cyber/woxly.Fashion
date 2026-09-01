import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

const FOOTER_LINKS = {
  SHOP: [
    { href: "/products?category=women", label: "Women" },
    { href: "/products?category=men", label: "Men" },
    { href: "/products?category=accessories", label: "Accessories" },
    { href: "/products?category=new-in", label: "New In" },
    { href: "/products?category=sale", label: "Sale" },
  ],
  DISCOVER: [
    { href: "/lookbook", label: "Lookbook" },
    { href: "/edit", label: "The Edit" },
    { href: "/collaborations", label: "Collaborations" },
    { href: "/sustainability", label: "Sustainability" },
  ],
  HELP: [
    { href: "/sizing", label: "Sizing Guide" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/care", label: "Care Guide" },
    { href: "/contact", label: "Contact Us" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#8a8a8a] mt-auto">
      <div className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-24">
          
          <div className="md:col-span-2">
            <Link href="/" className="font-fraunces text-2xl tracking-[0.1em] text-[#f5f5f5]">
              {SITE_CONFIG.name}
            </Link>
            <div className="mt-6 text-[13px] leading-relaxed max-w-[240px]">
              <p>A house of considered fashion.</p>
              <p>Est. 2018, London.</p>
            </div>
          </div>
          
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[#cfae70] font-bold text-[9px] tracking-[0.2em] uppercase mb-8">{title}</h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] hover:text-[#f5f5f5] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-24 pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] tracking-[0.05em]">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] uppercase">
            <Link href="https://instagram.com" className="hover:text-[#f5f5f5] transition-colors">Instagram</Link>
            <Link href="https://pinterest.com" className="hover:text-[#f5f5f5] transition-colors">Pinterest</Link>
            <Link href="https://tiktok.com" className="hover:text-[#f5f5f5] transition-colors">Tiktok</Link>
          </div>
          
          <div className="flex items-center gap-2">
            {['VISA', 'MASTERCARD', 'AMEX', 'PAYPAL'].map(payment => (
              <span key={payment} className="border border-[#222] px-3 py-1.5 text-[8px] tracking-[0.1em] uppercase text-[#666]">
                {payment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
