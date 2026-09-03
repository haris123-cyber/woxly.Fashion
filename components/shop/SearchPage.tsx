"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { searchProducts } from "@/lib/api/products";

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? <mark key={i} className="text-[#cfae70] bg-transparent font-bold">{part}</mark> : part
  );
}

function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("woxly-recent-searches");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>(getRecentSearches);

  const results = query.length >= 2 ? searchProducts(query) : [];

  const handleSearch = useCallback((q: string) => {
    if (q.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      const updated = [q, ...recentSearches.filter((s) => s !== q)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("woxly-recent-searches", JSON.stringify(updated));
    }
  }, [router, recentSearches]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialQuery) handleSearch(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, initialQuery, handleSearch]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-xl mx-auto">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <Input
          placeholder="SEARCH PRODUCTS..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 h-14 rounded-none border-border focus-visible:ring-[#cfae70] uppercase tracking-[0.1em] text-[10px] font-bold"
          aria-label="Search products"
          autoFocus
        />
      </div>

      {recentSearches.length > 0 && !query && (
        <div className="text-center mt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-6">Recent Searches</p>
          <div className="flex flex-wrap justify-center gap-3">
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-6 py-3 border border-border bg-background hover:border-[#cfae70] hover:text-[#cfae70] transition-colors rounded-none text-[9px] uppercase tracking-[0.1em]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {query.length >= 2 && results.length === 0 && (
        <EmptyState
          icon={SearchIcon}
          title="No results found"
          description={`No products match "${query}"`}
          actionLabel="Browse All Products"
          actionHref="/products"
          className="mt-12"
        />
      )}

      {results.length > 0 && (
        <div className="mt-12">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mb-8 text-center">{results.length} results for &ldquo;{query}&rdquo;</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
