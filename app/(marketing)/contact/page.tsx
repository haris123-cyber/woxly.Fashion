"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { StaticPageLayout } from "@/components/layout/StaticPageLayout";
import { contactSchema, type ContactFormData } from "@/lib/validations/forms";
import { toast } from "sonner";

export default function ContactPage() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = () => {
    toast.success("Message sent (mock)", { description: "Email sending is a UI stub" });
    form.reset();
  };

  return (
    <StaticPageLayout title="Contact Us">
      <p className="mb-6">Have a question? We&apos;d love to hear from you.</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem><FormLabel>Subject</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="message" render={({ field }) => (
            <FormItem><FormLabel>Message</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <Button type="submit">Send Message</Button>
        </form>
      </Form>
    </StaticPageLayout>
  );
}
