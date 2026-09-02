import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductListing } from "@/components/product/ProductListing";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGridSkeleton } from "@/components/shared/Skeletons";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of premium fashion and lifestyle products.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <Breadcrumbs items={[{ label: "Shop" }]} className="mb-12" />
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal mb-16 text-foreground">All Products</h1>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductListing searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
