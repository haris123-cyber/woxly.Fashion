"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice, cn } from "@/lib/utils";
import type { ProductFilters, Category } from "@/types/product";

interface ProductFiltersPanelProps {
  filters: ProductFilters;
  filterOptions: {
    sizes: string[];
    colors: string[];
    minPrice: number;
    maxPrice: number;
    categories: Category[];
  };
  onUpdate: (updates: Record<string, string | undefined>) => void;
}

export function ProductFiltersPanel({ filters, filterOptions, onUpdate }: ProductFiltersPanelProps) {
  const [priceRange, setPriceRange] = useState([
    filters.minPrice ?? filterOptions.minPrice,
    filters.maxPrice ?? filterOptions.maxPrice,
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] border-b border-[#1a1a1a] pb-3 mb-4 font-bold">Category</h3>
        <div className="space-y-4">
          {filterOptions.categories.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-3">
              <Checkbox
                id={`cat-${cat.slug}`}
                checked={filters.category === cat.slug}
                onCheckedChange={(checked) =>
                  onUpdate({ category: checked ? cat.slug : undefined })
                }
                className="border-[#222] data-[state=checked]:bg-[#cfae70] data-[state=checked]:border-[#cfae70] data-[state=checked]:text-black rounded-none"
              />
              <label htmlFor={`cat-${cat.slug}`} className="text-[11px] text-[#f5f5f5] hover:text-[#cfae70] uppercase tracking-[0.1em] cursor-pointer transition-colors leading-none pt-0.5">
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] border-b border-[#1a1a1a] pb-3 mb-6 font-bold">Price Range</h3>
        <Slider
          min={filterOptions.minPrice}
          max={filterOptions.maxPrice}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          onValueCommit={(val) =>
            onUpdate({ minPrice: String(val[0]), maxPrice: String(val[1]) })
          }
          className="[&_[role=slider]]:border-[#cfae70] [&_[role=slider]]:bg-black [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:rounded-none [&_.bg-primary]:bg-[#cfae70]"
        />
        <div className="flex justify-between text-[11px] uppercase tracking-[0.1em] text-[#8a8a8a] mt-4">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] border-b border-[#1a1a1a] pb-3 mb-4 font-bold">Size</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onUpdate({ size: filters.size === size ? undefined : size })}
              className={cn(
                "w-10 h-10 border text-[10px] uppercase font-bold transition-colors rounded-none flex items-center justify-center",
                filters.size === size
                  ? "border-[#cfae70] text-[#cfae70]"
                  : "border-[#222] text-[#666] hover:border-[#666]"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8a8a8a] border-b border-[#1a1a1a] pb-3 mb-4 font-bold">Color</h3>
        <div className="flex flex-wrap gap-2">
          {filterOptions.colors.map((color) => (
            <button
              key={color}
              onClick={() => onUpdate({ color: filters.color === color ? undefined : color })}
              className={cn(
                "h-10 px-4 border text-[10px] uppercase font-bold transition-colors rounded-none flex items-center justify-center",
                filters.color === color
                  ? "border-[#cfae70] text-[#cfae70]"
                  : "border-[#222] text-[#666] hover:border-[#666]"
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
