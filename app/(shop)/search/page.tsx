import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPage } from "@/components/shop/SearchPage";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Search",
  description: `Search ${SITE_CONFIG.name} products.`,
};

export default function Search() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">

      <Suspense>
        <SearchPage />
      </Suspense>
    </div>
  );
}
