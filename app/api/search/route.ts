import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/api/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  if (q.length < 2) return NextResponse.json({ data: [] });
  const results = searchProducts(q);
  return NextResponse.json({ data: results });
}
