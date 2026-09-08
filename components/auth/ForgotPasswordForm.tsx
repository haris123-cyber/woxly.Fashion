"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations/auth";
import { showCustomToast } from "@/components/shared/CustomToast";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    showCustomToast({ 
      title: "Reset link sent!", 
      description: "Check your email for further instructions.",
      type: "success"
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-8 py-10">
      <div className="text-center space-y-2">
        <h1 className="font-fraunces text-3xl md:text-4xl">Reset Password</h1>
        <p className="text-muted-foreground text-sm tracking-wide">Enter your email to receive a reset link.</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-10">
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" className="rounded-none border-border h-12 px-4 focus-visible:ring-[#cfae70]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <button 
            type="submit" 
            className="w-full h-12 bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors text-[10px] tracking-[0.2em] font-bold uppercase mt-6"
          >
            Send Reset Link
          </button>
        </form>
      </Form>
      <div className="text-center pt-4">
        <p className="text-sm">
          Remembered your password?{" "}
          <Link href="/login" className="text-foreground border-b border-foreground hover:text-[#cfae70] hover:border-[#cfae70] transition-colors pb-0.5">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
