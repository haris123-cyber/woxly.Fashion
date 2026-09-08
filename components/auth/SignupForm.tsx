"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { signupSchema, type SignupFormData } from "@/lib/validations/auth";
import { showCustomToast } from "@/components/shared/CustomToast";

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    showCustomToast({ title: "Account created successfully!", type: "success" });
    router.push("/account/orders");
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-10">
      <div className="text-center space-y-2">
        <h1 className="font-fraunces text-3xl md:text-4xl">Create Account</h1>
        <p className="text-muted-foreground text-sm tracking-wide">Please fill in the information below:</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="First Name" className="rounded-none border-border h-12 px-4 focus-visible:ring-[#cfae70]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem><FormControl><Input placeholder="Last Name" className="rounded-none border-border h-12 px-4 focus-visible:ring-[#cfae70]" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormControl><Input type="email" placeholder="Email" className="rounded-none border-border h-12 px-4 focus-visible:ring-[#cfae70]" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" className="rounded-none border-border h-12 px-4 focus-visible:ring-[#cfae70]" {...field} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 min-h-11 min-w-11 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle password">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem><FormControl><Input type="password" placeholder="Confirm Password" className="rounded-none border-border h-12 px-4 focus-visible:ring-[#cfae70]" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>

          <button 
            type="submit" 
            className="w-full h-12 bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors text-[10px] tracking-[0.2em] font-bold uppercase mt-6"
          >
            Create Account
          </button>
        </form>
      </Form>

      <div className="text-center pt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-foreground border-b border-foreground hover:text-[#cfae70] hover:border-[#cfae70] transition-colors pb-0.5">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
