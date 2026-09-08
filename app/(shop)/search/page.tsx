import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchPage } from "@/components/shop/SearchPage";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Woxly products.",
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
