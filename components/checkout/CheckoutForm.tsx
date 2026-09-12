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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCartStore, selectCartSubtotal } from "@/store/cart-store";
import { checkoutSchema, type CheckoutFormData } from "@/lib/validations/checkout";
import { createOrder } from "@/lib/api/orders";
import { formatPrice, cn } from "@/lib/utils";
import { SHIPPING_METHODS, PARTIAL_COD_PERCENTAGE } from "@/lib/constants";
import { showCustomToast } from "@/components/shared/CustomToast";
import { Tag, Award } from "lucide-react";

const MOCK_SAVED_ADDRESSES = [
  {
    id: "home",
    title: "Home",
    firstName: "John",
    lastName: "Doe",
    phone: "+91 9876543210",
    addressLine1: "123 Main Street, Apt 4B",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    country: "India",
  },
  {
    id: "work",
    title: "Work",
    firstName: "John",
    lastName: "Doe",
    phone: "+91 9876543210",
    addressLine1: "456 Business Park, Tower A",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400051",
    country: "India",
  }
];

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

  const handleUseSavedAddress = (addr: typeof MOCK_SAVED_ADDRESSES[0]) => {
    form.setValue("shippingAddress.firstName", addr.firstName);
    form.setValue("shippingAddress.lastName", addr.lastName);
    form.setValue("shippingAddress.phone", addr.phone);
    form.setValue("shippingAddress.addressLine1", addr.addressLine1);
    form.setValue("shippingAddress.city", addr.city);
    form.setValue("shippingAddress.state", addr.state);
    form.setValue("shippingAddress.postalCode", addr.postalCode);
  };

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: "",
      shippingAddress: {
        firstName: "", lastName: "", phone: "",
        addressLine1: "", city: "", state: "", postalCode: "", country: "India",
      },
      shippingMethod: "standard",
      paymentMethod: "online",
      partialCod: false,
    },
  });

  const shippingMethod = form.watch("shippingMethod");
  const shipping = SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.price ?? 49;
  const paymentMethod = form.watch("paymentMethod");
  const onlineDiscount = paymentMethod === "online" ? 10 : 0;
  const total = subtotal + shipping - onlineDiscount;
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
                  <div className="mb-6 space-y-4 ">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-muted-foreground font-bold">Use a saved address</p>
                    <Select onValueChange={(id) => {
                      const addr = MOCK_SAVED_ADDRESSES.find(a => a.id === id);
                      if (addr) handleUseSavedAddress(addr);
                    }}>
                      <SelectTrigger className="w-[50%] h-12 border-border bg-transparent rounded-none focus:ring-0 focus:border-[#cfae70]">
                        <SelectValue placeholder="Select a saved address" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-border">
                        {MOCK_SAVED_ADDRESSES.map((addr) => (
                          <SelectItem key={addr.id} value={addr.id} className="cursor-pointer">
                            {addr.title} - {addr.addressLine1}, {addr.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                  </div>

                  <div className="flex items-center gap-4 my-6">
                    <div className="h-px bg-border flex-1"></div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Or enter new address</span>
                    <div className="h-px bg-border flex-1"></div>
                  </div>

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



              <AccordionItem value="payment" className="border-b border-border px-0">
                <AccordionTrigger className="font-fraunces text-2xl text-foreground hover:text-[#cfae70] transition-colors py-6 hover:no-underline">
                  Payment
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pb-8">
                  <p className="text-[11px] tracking-[0.1em] text-muted-foreground italic">All transactions are secure and encrypted.</p>
                  <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4 mt-6">

                          <div className="relative">
                            <div className="absolute -top-3 left-4 z-10">
                              <span className="bg-[#16a34a] text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider ">SAVE ₹10 ON PREPAID ORDERS</span>
                            </div>
                            <div className={cn("relative  border p-4 cursor-pointer transition-colors", field.value === "online" ? "border-[#cfae70] bg-[#f5f3ff]" : "border-border hover:border-[#7c3aed]")} onClick={() => field.onChange("online")}>
                              <div className="flex items-start space-x-4">
                                <div className="mt-1">
                                  <RadioGroupItem value="online" id="pay-online" className="data-[state=checked]:border-[#cfae70] data-[state=checked]:text-[#cfae70] border-border" />
                                </div>
                                <div className="flex-1">
                                  <label htmlFor="pay-online" className="cursor-pointer font-semibold text-sm text-foreground flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-[#cfae70] flex items-center justify-center shrink-0">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><line x1="9" x2="15" y1="22" y2="22" /></svg>
                                    </div>
                                    Pay Online
                                  </label>
                                  <p className="text-xs text-muted-foreground mt-1 mb-3">UPI, Credit/Debit Cards, or Netbanking. Secure & instant.</p>
                                  <div className="inline-flex items-center gap-1.5 bg-[#dcfce7] text-[#16a34a] px-2 py-1  text-[10px] font-semibold border border-[#bbf7d0]">
                                    <Tag className="w-3 h-3" /> Extra ₹10 off — online payment only.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className={cn(" border p-4 cursor-pointer transition-colors", field.value === "cod" ? "border-[#cfae70] bg-[#f5f3ff]" : "border-border hover:border-[#cfae70]")} onClick={() => field.onChange("cod")}>
                            <div className="flex items-start space-x-4">
                              <div className="mt-1">
                                <RadioGroupItem value="cod" id="pay-cod" className="data-[state=checked]:border-[#cfae70] data-[state=checked]:text-[#cfae70] border-border" />
                              </div>
                              <div className="flex-1">
                                <label htmlFor="pay-cod" className="cursor-pointer font-semibold text-sm text-foreground flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center border border-border shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>
                                  </div>
                                  Cash on Delivery
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">Pay in cash when your order arrives.</p>
                              </div>

                            </div>

                          </div>

                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500 text-[10px]" />
                    </FormItem>
                  )} />

                  <div className="border border-border  p-4 bg-background">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-[#4f46e5]" />
                        <span className="text-[13px] font-semibold text-foreground">Loyalty Coins</span>
                      </div>
                      <span className="text-[13px] font-semibold text-foreground">0 Coins</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1">Min 100 Coins · Up to 20% of order</p>
                  </div>

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
                    <span className="font-fraunces text-black text-lg">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>



              <div className="h-px bg-muted w-full" />

              <div className="space-y-4 text-[11px] uppercase tracking-[0.1em]">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span className="text-foreground">{formatPrice(subtotal)}</span></div>
                {paymentMethod === "online" && (
                  <div className="flex justify-between text-[#16a34a] font-medium"><span>Pay online discount</span><span>-₹10</span></div>
                )}
                {paymentMethod === "online" && (
                  <div className=" border border-[#cfae70] text-[#cfae70] text-xs p-2  mt-0 flex items-center">
                    You'll earn <span className="font-bold mx-1">4 Coins</span> on this order.
                  </div>
                )}
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
                <span className="font-fraunces text-3xl text-black">{formatPrice(total)}</span>
              </div>

              <button type="submit" className="w-full bg-black hover:bg-[#b5985d] text-white h-14 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] transition-colors mt-8">
                {partialCod ? `Pay ${formatPrice(partialAmount)} Now` : `Place Order — ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
