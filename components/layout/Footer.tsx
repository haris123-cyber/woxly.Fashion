import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";


const FOOTER_LINKS = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/blog", label: "Blog" },
    { href: "/feedback", label: "Feedback" },
  ],
  Policies: [
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-background text-muted-foreground mt-auto border-t-1 border-border ">
      <div className="container mx-auto px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-4 lg:gap-24">

          <div className="col-span-2 flex flex-col items-start">

            <Link href="/" className="font-fraunces text-2xl tracking-[0.1em] text-foreground mb-6">
              {SITE_CONFIG.name}
            </Link>
            <h3 className="text-foreground mb-2">{SITE_CONFIG.tagline}</h3>
            <div className="text-[13px] leading-relaxed max-w-[340px] mb-8">
              {SITE_CONFIG.description}
            </div>
            <Link href={SITE_CONFIG.instagramUrl} aria-label={`${SITE_CONFIG.name} on Instagram`} className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 flex items-center justify-center text-white hover:opacity-80 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
            </Link>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="col-span-1">
              <h3 className="text-[#cfae70] font-bold text-[10px] tracking-[0.2em] uppercase mb-5">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-foreground hover:text-[#cfae70] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Support Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-[#cfae70] font-bold text-[10px] tracking-[0.2em] uppercase mb-8">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 text-[14px] text-foreground hover:text-[#cfae70] transition-colors">
                  <Mail className="w-[18px] h-[18px]" />
                  {SITE_CONFIG.email}
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-3 text-[14px] text-black hover:text-foreground transition-colors">
                  <IconBrandWhatsapp className="text-20px text-[#25D366]" stroke={2} />

                  WhatsApp
                </Link>
              </li>
              <li>
                <Link href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-[14px] text-foreground hover:text-[#cfae70] transition-colors">
                  <Phone className="w-[18px] h-[18px]" />
                  {SITE_CONFIG.phone}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-4 pt-4 border-t border-border flex flex-col gap-8">
          {/* Secure Payments Row */}
          <div className="flex flex-col md:flex-row items-center justify-between md:justify-end gap-6 w-full">

            <div className="flex justify-center lg:justify-end mb-2">
              <div className="flex flex-col items-center lg:items-end">
                <span className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase mb-3 text-center lg:text-right">SECURE PAYMENTS</span>
                <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                  <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                    <Image src="/payments/upi.svg" alt="UPI" width={50} height={32} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                    <Image src="/payments/mastercard.svg" alt="Mastercard" width={50} height={32} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1.5">
                    <Image src="/payments/visa.png" alt="Visa" width={50} height={32} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                    <Image src="/payments/rupay.png" alt="RuPay" width={50} height={32} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1.5">
                    <Image src="/payments/gpay.svg" alt="Google Pay" width={50} height={32} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-[50px] h-[32px] bg-white border border-gray-200 rounded flex items-center justify-center p-1">
                    <Image src="/payments/phonepe.png" alt="PhonePe" width={50} height={32} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Copyright & Links Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-2 border-t border-border/50">
            <div className="text-[10px] tracking-[0.05em]">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.copyrightName}. All rights reserved.
            </div>

            <div className="flex items-center flex-wrap justify-center gap-6 text-[10px] tracking-[0.05em]">
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms of use</Link>
              <Link href="/shipping" className="hover:text-foreground transition-colors">Shipping Policy</Link>
              <Link href="/returns" className="hover:text-foreground transition-colors">Return Policy</Link>
              <Link href="/feedback" className="hover:text-foreground transition-colors">Feedback</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
