"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCartStore, selectCartSubtotal } from "@/store/cart-store";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations/checkout";
import { createOrder } from "@/lib/api/orders";
import { formatPrice, cn } from "@/lib/utils";
import { SHIPPING_METHODS, PARTIAL_COD_PERCENTAGE } from "@/lib/constants";
import { showCustomToast } from "@/components/shared/CustomToast";

// Custom Minimal Input
const MinimalInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full border border-border bg-transparent px-4 py-2 text-sm text-foreground transition-colors placeholder:text-[#444] focus-visible:outline-none focus-visible:border-[#cfae70] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
);
MinimalInput.displayName = "MinimalInput";

// Custom Minimal Label
const MinimalLabel = ({ className, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className={cn("text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block", className)} {...props}>
    {children}
  </label>
);

export function CheckoutForm() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const promoCode = useCartStore((s) => s.promoCode);
  const subtotal = selectCartSubtotal(items);
  const [partialCod, setPartialCod] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      shippingAddress: {
        firstName: "", lastName: "", phone: "",
        addressLine1: "", city: "", state: "", postalCode: "", country: "India",
      },
      shippingMethod: "standard",
      paymentMethod: "card",
      partialCod: false,
    },
  });

  const shippingMethod = form.watch("shippingMethod");
  const shipping = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 49;
  const total = subtotal + shipping;
  const partialAmount = partialCod ? total * (PARTIAL_COD_PERCENTAGE / 100) : total;
  const codAmount = partialCod ? total - partialAmount : 0;

  const onSubmit = (data: CheckoutFormData) => {
    const order = createOrder({
      email: data.email,
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image,
        variant: i.variant,
      })),
      shippingAddress: {
        ...data.shippingAddress,
        email: data.email,
      },
      shippingMethod: data.shippingMethod,
      paymentMethod: data.paymentMethod,
      promoCode: promoCode ?? undefined,
      partialCod,
    });
    clearCart();
    showCustomToast({ title: "Order placed successfully!", type: "success" });
    router.push(`/order-success/${order.orderNumber}`);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-24 border border-border">
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Link href="/products" className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#cfae70] hover:text-foreground transition-colors pb-1 border-b border-[#cfae70] hover:border-[#f5f5f5]">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <Accordion type="multiple" defaultValue={["contact", "shipping", "delivery", "payment"]} className="space-y-0">
              <AccordionItem value="contact" className="border-b border-border px-0">
                <AccordionTrigger className="font-fraunces text-2xl text-foreground hover:text-[#cfae70] transition-colors py-6 hover:no-underline">
                  Contact Information
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-8">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Guest checkout — no account required</p>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <MinimalLabel>Email Address</MinimalLabel>
                      <FormControl><MinimalInput type="email" placeholder="you@example.com" {...field} /></FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b border-border px-0">
                <AccordionTrigger className="font-fraunces text-2xl text-foreground hover:text-[#cfae70] transition-colors py-6 hover:no-underline">
                  Shipping Address
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-8">
                  <div className="grid grid-cols-2 gap-6">
                    <FormField control={form.control} name="shippingAddress.firstName" render={({ field }) => (
                      <FormItem><MinimalLabel>First Name</MinimalLabel><FormControl><MinimalInput {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                    )} />
                    <FormField control={form.control} name="shippingAddress.lastName" render={({ field }) => (
                      <FormItem><MinimalLabel>Last Name</MinimalLabel><FormControl><MinimalInput {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="shippingAddress.phone" render={({ field }) => (
                    <FormItem><MinimalLabel>Phone Number</MinimalLabel><FormControl><MinimalInput {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                  )} />
                  <FormField control={form.control} name="shippingAddress.addressLine1" render={({ field }) => (
                    <FormItem><MinimalLabel>Address</MinimalLabel><FormControl><MinimalInput placeholder="Apartment, suite, etc." {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                  )} />
                  <div className="grid grid-cols-2 gap-6">
                    <FormField control={form.control} name="shippingAddress.city" render={({ field }) => (
                      <FormItem><MinimalLabel>City</MinimalLabel><FormControl><MinimalInput {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                    )} />
                    <FormField control={form.control} name="shippingAddress.state" render={({ field }) => (
                      <FormItem><MinimalLabel>State</MinimalLabel><FormControl><MinimalInput {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="shippingAddress.postalCode" render={({ field }) => (
                    <FormItem><MinimalLabel>PIN Code</MinimalLabel><FormControl><MinimalInput {...field} /></FormControl><FormMessage className="text-red-500 text-[10px]" /></FormItem>
                  )} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery" className="border-b border-border px-0">
                <AccordionTrigger className="font-fraunces text-2xl text-foreground hover:text-[#cfae70] transition-colors py-6 hover:no-underline">
                  Shipping Method
                </AccordionTrigger>
                <AccordionContent className="pb-8">
                  <FormField control={form.control} name="shippingMethod" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                          {SHIPPING_METHODS.map((method) => (
                            <div key={method.id} className={cn("flex items-center space-x-4 border p-4 transition-colors", field.value === method.id ? "border-[#cfae70]" : "border-border hover:border-[#444]")}>
                              <RadioGroupItem value={method.id} id={method.id} className="text-[#cfae70] border-[#cfae70]" />
                              <label htmlFor={method.id} className="flex-1 cursor-pointer flex justify-between items-center">
                                <div>
                                  <p className="text-[11px] uppercase tracking-[0.1em] text-foreground mb-1">{method.name}</p>
                                  <p className="text-xs text-muted-foreground">{method.eta}</p>
                                </div>
                                <span className="font-fraunces text-[#cfae70] text-lg">{method.price === 0 ? "Free" : formatPrice(method.price)}</span>
                              </label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )} />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="payment" className="border-b border-border px-0">
                <AccordionTrigger className="font-fraunces text-2xl text-foreground hover:text-[#cfae70] transition-colors py-6 hover:no-underline">
                  Payment
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-8">
                  <p className="text-[11px] tracking-[0.1em] text-muted-foreground italic">All transactions are secure and encrypted.</p>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                          {[
                            { id: "card", label: "Credit / Debit Card" },
                            { id: "upi", label: "UPI (Google Pay, PhonePe)" },
                            { id: "cod", label: "Cash on Delivery" },
                            { id: "partial-cod", label: "Partial COD (20% online)" },
                          ].map((method) => (
                            <div key={method.id} className={cn("flex items-center space-x-4 border p-4 transition-colors", field.value === method.id ? "border-[#cfae70]" : "border-border hover:border-[#444]")}>
                              <RadioGroupItem value={method.id} id={`pay-${method.id}`} className="text-[#cfae70] border-[#cfae70]" />
                              <label htmlFor={`pay-${method.id}`} className="cursor-pointer text-[11px] uppercase tracking-[0.1em] text-foreground">{method.label}</label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )} />

                  <div className="flex items-center gap-3 p-4 border border-border mt-4">
                    <Checkbox
                      id="partial-cod"
                      checked={partialCod}
                      onCheckedChange={(c) => setPartialCod(!!c)}
                      className="border-[#cfae70] data-[state=checked]:bg-[#cfae70] data-[state=checked]:text-black"
                    />
                    <label htmlFor="partial-cod" className="text-[11px] tracking-[0.05em] text-muted-foreground cursor-pointer leading-relaxed">
                      Pay <span className="text-[#cfae70]">{PARTIAL_COD_PERCENTAGE}% online</span> ({formatPrice(partialAmount)}), rest on delivery ({formatPrice(codAmount)})
                    </label>
                  </div>

                  {form.watch("paymentMethod") === "card" && (
                    <div className="p-6 border border-border mt-6 space-y-6 bg-background">
                      <MinimalLabel>Card Details</MinimalLabel>
                      <MinimalInput placeholder="Card number" disabled />
                      <div className="grid grid-cols-2 gap-6">
                        <MinimalInput placeholder="MM / YY" disabled />
                        <MinimalInput placeholder="CVV" disabled />
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="border border-border p-8 space-y-8 bg-background">
              <h2 className="font-fraunces text-2xl text-foreground">Order Summary</h2>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <p className="text-[12px] text-foreground uppercase tracking-[0.05em] leading-snug">{item.name}</p>
                      <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground mt-1">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-fraunces text-[#cfae70] text-lg">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4 text-[11px] uppercase tracking-[0.1em]">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="text-foreground">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Shipping</span><span className="text-foreground">{formatPrice(shipping)}</span></div>
                {partialCod && (
                  <>
                    <div className="flex justify-between text-[#cfae70]"><span>Pay Now ({PARTIAL_COD_PERCENTAGE}%)</span><span>{formatPrice(partialAmount)}</span></div>
                    <div className="flex justify-between text-muted-foreground"><span>Pay on Delivery</span><span className="text-foreground">{formatPrice(codAmount)}</span></div>
                  </>
                )}
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Total</span>
                <span className="font-fraunces text-3xl text-[#cfae70]">{formatPrice(total)}</span>
              </div>

              <button type="submit" className="w-full bg-[#cfae70] hover:bg-[#b5985d] text-black h-14 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-colors mt-8">
                {partialCod ? `Pay ${formatPrice(partialAmount)} Now` : `Place Order — ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
