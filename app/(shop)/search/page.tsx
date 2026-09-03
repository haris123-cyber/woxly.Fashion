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
      <div className="border-b border-border pb-6 mb-8 max-w-xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal text-foreground">Search</h1>
      </div>
      <Suspense>
        <SearchPage />
      </Suspense>
    </div>
  );
}
