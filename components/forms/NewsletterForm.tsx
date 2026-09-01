"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { newsletterSchema, type NewsletterFormData } from "@/lib/validations/forms";
import { toast } from "sonner";

export function NewsletterForm() {
  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: NewsletterFormData) => {
    toast.success("Subscribed!", { description: `Thanks for subscribing with ${data.email}` });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder="Your email address" 
                  type="email" 
                  aria-label="Email address" 
                  className="bg-[#050505] border-[#222] text-white rounded-none h-12 md:h-14 focus-visible:ring-[#cfae70] focus-visible:border-transparent text-sm"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit"
          className="rounded-none h-12 md:h-14 px-8 bg-[#cfae70] hover:bg-[#b5985d] text-black font-bold text-[10px] tracking-[0.15em] uppercase"
        >
          Join
        </Button>
      </form>
    </Form>
  );
}
