export interface ProductVariant {
  id: string;
  type: "size" | "color";
  value: string;
  label: string;
  inStock: boolean;
  priceModifier?: number;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  categorySlug: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  variants: ProductVariant[];
  tags: string[];
  isNew?: boolean;
  isSale?: boolean;
  saleEndsAt?: string;
  sku: string;
  reviews?: ProductReview[];
  relatedSlugs?: string[];
  fbtSlugs?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  minRating?: number;
  sort?: "price-asc" | "price-desc" | "newest" | "popularity";
  page?: number;
  limit?: number;
  q?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
