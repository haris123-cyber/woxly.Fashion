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
    regex.test(part) ? <mark key={i} className="bg-accent/30 rounded px-0.5">{part}</mark> : part
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
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-12 text-base"
          aria-label="Search products"
          autoFocus
        />
      </div>

      {recentSearches.length > 0 && !query && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Recent searches</p>
          <div className="flex flex-wrap justify-center gap-2">
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors min-h-11"
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
        />
      )}

      {results.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">{results.length} results for &ldquo;{query}&rdquo;</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {results.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {highlightMatch(product.name, query)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
