"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Package, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFiltersPanel } from "@/components/product/ProductFiltersPanel";
import { getProducts, getFilterOptions, getCollectionLabel } from "@/lib/api/products";
import type { ProductFilters } from "@/types/product";
import Link from "next/link";

interface ProductListingProps {
  searchParams: Record<string, string | undefined>;
}

export function ProductListing({ searchParams }: ProductListingProps) {
  const router = useRouter();
  const filterOptions = getFilterOptions(searchParams.category);

  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "100px" }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, []);

  const filters: ProductFilters = {
    category: searchParams.category,
    minPrice: searchParams.minPrice ? Number(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    size: searchParams.size,
    color: searchParams.color,
    minRating: searchParams.minRating ? Number(searchParams.minRating) : undefined,
    sort: (searchParams.sort as ProductFilters["sort"]) ?? "popularity",
    page: 1,
    limit: page * 12,
  };

  const result = getProducts(filters);
  const hasMore = result.total > result.data.length;
  const activeCategoryLabel = getCollectionLabel(filters.category);
  const appliedFilters = [
    activeCategoryLabel && { key: "category", label: activeCategoryLabel },
    filters.size && { key: "size", label: `Size ${filters.size}` },
    filters.color && { key: "color", label: filters.color },
    filters.minRating && { key: "minRating", label: `${filters.minRating}+ stars` },
  ].filter(Boolean) as { key: string; label: string }[];

  const updateParams = (updates: Record<string, string | undefined>) => {
    setPage(1);
    const params = new URLSearchParams();
    const merged = { ...searchParams, ...updates };
    Object.entries(merged).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    params.delete("page"); // Remove page from URL, managed locally now
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-12">

      <aside className="hidden lg:block w-64 shrink-0">
        <ProductFiltersPanel filters={filters} filterOptions={filterOptions} onUpdate={updateParams} />

      </aside>


      <div className="flex-1">
        <div className="sticky top-[60px] lg:static z-30 bg-background flex items-center justify-between mb-4 gap-3 border-b border-border py-3 lg:pt-0 lg:pb-6">


          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger className="lg:hidden h-11 px-3 border border-border text-foreground hover:border-[#cfae70] flex items-center justify-center text-[10px] uppercase tracking-[0.1em] font-bold transition-colors">
                <SlidersHorizontal className="h-3 w-3 mr-2" /> Filter{appliedFilters.length ? ` (${appliedFilters.length})` : ""}
              </SheetTrigger>
              <SheetContent side="left" className="h-full bg-background border-r border-border text-foreground w-full sm:w-[400px]">
                <SheetHeader className="mb-8 text-left border-b border-border pb-4">
                  <SheetTitle className="font-fraunces text-2xl font-normal text-foreground">Filters</SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-[calc(100vh-120px)] hide-scrollbar pr-4">
                  <ProductFiltersPanel filters={filters} filterOptions={filterOptions} onUpdate={updateParams} />
                </div>
              </SheetContent>
            </Sheet>

            <Select
              value={filters.sort ?? "popularity"}
              onValueChange={(val) => updateParams({ sort: val })}
            >
              <SelectTrigger className="w-[150px] sm:w-[180px] bg-transparent border-border rounded-none focus:ring-[#cfae70] text-foreground text-[10px] uppercase tracking-[0.1em] font-bold h-11">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-background border-border rounded-none text-foreground">
                <SelectItem value="popularity" className="text-[11px] uppercase tracking-[0.1em] focus:bg-secondary focus:text-[#cfae70]">Popularity</SelectItem>
                <SelectItem value="price-asc" className="text-[11px] uppercase tracking-[0.1em] focus:bg-secondary focus:text-[#cfae70]">Price: Low to High</SelectItem>
                <SelectItem value="price-desc" className="text-[11px] uppercase tracking-[0.1em] focus:bg-secondary focus:text-[#cfae70]">Price: High to Low</SelectItem>
                <SelectItem value="newest" className="text-[11px] uppercase tracking-[0.1em] focus:bg-secondary focus:text-[#cfae70]">New Arrivals</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <span className="hidden sm:block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{result.total} results</span>
        </div>

        {appliedFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6" aria-label="Applied filters">
            {appliedFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => updateParams({ [filter.key]: undefined })}
                className="min-h-11 border border-border px-3 text-[10px] font-bold uppercase tracking-[0.1em] hover:border-[#cfae70]"
                aria-label={`Remove ${filter.label} filter`}
              >
                {filter.label} ×
              </button>
            ))}
            <button onClick={() => router.push("/products", { scroll: false })} className="min-h-11 px-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#cfae70]">Clear all</button>
          </div>
        )}

        {result.data.length === 0 ? (
          <div className="text-center py-24 border border-border mt-8">
            <Package className="h-8 w-8 text-[#444] mx-auto mb-4" />
            <h3 className="font-fraunces text-2xl text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6 text-[11px] uppercase tracking-[0.1em]">Try adjusting your filters</p>
            <Link href="/products" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#cfae70] hover:text-foreground transition-colors pb-1 border-b border-[#cfae70] hover:border-[#f5f5f5]">
              Clear All Filters
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-x-6 md:gap-y-12">
              {result.data.map((product) => (
                <ProductCard key={product.id} product={product} showDetails={true} />
              ))}
            </div>
            {hasMore && (
              <div ref={observerTarget} className="flex justify-center mt-16 py-8">
                <Loader2 className="w-8 h-8 animate-spin text-[#cfae70]" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
