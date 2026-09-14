import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductListing } from "@/components/product/ProductListing";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductGridSkeleton } from "@/components/shared/Skeletons";
import { getProducts, getFilterOptions } from "@/lib/api/products";


export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of premium fashion and lifestyle products.",
};

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filters = {
    category: params.category,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    size: params.size,
    color: params.color,
    minRating: params.minRating ? Number(params.minRating) : undefined,
    sort: (params.sort as "price-asc" | "price-desc" | "newest" | "popularity") ?? "popularity",
  };

  const result = getProducts(filters);
  return (
    <div className="bg-background min-h-screen text-foreground">
      <div className="container mx-auto px-4 md:px-8 py-6 ">
        <Breadcrumbs items={[{ label: "Shop" }]} className="mb-6" />
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal  text-foreground mb-2">All Products</h1>
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-10 font-bold">
          {result.total} {result.total === 1 ? 'Product' : 'Products'}
        </p>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductListing searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}
