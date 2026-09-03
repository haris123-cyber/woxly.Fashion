import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientShell } from "@/components/layout/ClientShell";
import { Toaster } from "sonner";
import { WhatsAppWidget } from "@/components/shared/WhatsAppWidget";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: "Premium fashion and lifestyle products. Shop the latest collections with free shipping on orders over ₹999.",
  metadataBase: new URL(SITE_CONFIG.url),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${inter.variable} h-full`}>
      <head>
      </head>
      <body className="min-h-full flex flex-col font-inter antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
          <AnnouncementBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ClientShell />
          <WhatsAppWidget />
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
