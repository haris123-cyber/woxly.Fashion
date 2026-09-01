import { NextResponse } from "next/server";
import { getProducts } from "@/lib/api/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filters = {
    category: searchParams.get("category") ?? undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sort: (searchParams.get("sort") as "price-asc" | "price-desc" | "newest" | "popularity") ?? undefined,
    page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 12,
    q: searchParams.get("q") ?? undefined,
  };
  const result = getProducts(filters);
  return NextResponse.json(result);
}
