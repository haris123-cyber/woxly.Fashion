import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().regex(/^[+]?[\d\s-]{10,15}$/, "Please enter a valid phone number"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit PIN code"),
  country: z.string().min(1, "Country is required"),
});

export const checkoutSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  shippingAddress: addressSchema,
  shippingMethod: z.string().min(1, "Please select a shipping method"),
  paymentMethod: z.enum(["card", "upi", "cod", "partial-cod", "online"]),
  promoCode: z.string().optional(),
  partialCod: z.boolean().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
