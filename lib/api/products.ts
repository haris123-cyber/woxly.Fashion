import type { Product, Category, ProductFilters, PaginatedResponse } from "@/types/product";
import { MOCK_PRODUCTS } from "@/data/products";
import categoriesData from "@/data/categories.json";

const products = MOCK_PRODUCTS;
const categories = categoriesData as Category[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProducts(filters: ProductFilters = {}): PaginatedResponse<Product> {
  let filtered = [...products];

  if (filters.category) {
    filtered = filtered.filter((p) => p.categorySlug === filters.category);
  }
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.size) {
    filtered = filtered.filter((p) =>
      p.variants.some((v) => v.type === "size" && v.value === filters.size)
    );
  }
  if (filters.color) {
    filtered = filtered.filter((p) =>
      p.variants.some((v) => v.type === "color" && v.value === filters.color)
    );
  }
  if (filters.minRating) {
    filtered = filtered.filter((p) => p.rating >= filters.minRating!);
  }
  if (filters.q) {
    const q = filters.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  switch (filters.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case "popularity":
    default:
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
  }

  const page = filters.page ?? 1;
  const limit = filters.limit ?? 12;
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total, page, limit, totalPages };
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];
  if (product.relatedSlugs?.length) {
    return product.relatedSlugs
      .map((s) => getProductBySlug(s))
      .filter((p): p is Product => !!p)
      .slice(0, limit);
  }
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== slug)
    .slice(0, limit);
}

export function getFBTProducts(slug: string): Product[] {
  const product = getProductBySlug(slug);
  if (!product?.fbtSlugs?.length) return [];
  return product.fbtSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is Product => !!p);
}

export function getFeaturedProducts(limit = 8): Product[] {
  return [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, limit);
}

export function getNewArrivals(limit = 4): Product[] {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export function searchProducts(query: string, limit = 20): Product[] {
  return getProducts({ q: query, limit }).data;
}

export function getFilterOptions() {
  const sizes = new Set<string>();
  const colors = new Set<string>();
  products.forEach((p) => {
    p.variants.forEach((v) => {
      if (v.type === "size") sizes.add(v.value);
      if (v.type === "color") colors.add(v.value);
    });
  });
  const prices = products.map((p) => p.price);
  return {
    sizes: Array.from(sizes),
    colors: Array.from(colors),
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    categories,
  };
}
