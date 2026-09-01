import { NextResponse } from "next/server";
import { createOrder } from "@/lib/api/orders";
import type { CreateOrderInput } from "@/types/order";

export async function POST(request: Request) {
  const body = (await request.json()) as CreateOrderInput;
  const order = createOrder(body);
  return NextResponse.json(order, { status: 201 });
}
