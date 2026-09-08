"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { contactSchema, type ContactFormData } from "@/lib/validations/forms";
import { Button } from "@/components/ui/button";
import { showCustomToast } from "@/components/shared/CustomToast";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = () => {
    showCustomToast({ 
      title: "Message sent", 
      description: "We'll get back to you soon!",
      type: "success"
    });
    form.reset();
  };

  const inputClasses = "w-full p-3 border border-border bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors rounded-sm";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[30vh] min-h-[300px] flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&h=900&fit=crop"
          alt="Contact Us Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <p className="text-[#cfae70] text-[10px] font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in">
            Get In Touch
          </p>
          <h1 className="text-5xl md:text-6xl font-fraunces text-white mb-6 animate-slide-up">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="container mx-auto px-8 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="md:col-span-1 space-y-8">
              <div>
                <h3 className="text-2xl font-fraunces text-foreground mb-6">Let's talk.</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  Have a question, feedback, or need assistance? We'd love to hear from you. Fill out the form or reach out using the details below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#cfae70] mb-1">Email</p>
                    <a href="mailto:info@woxly.in" className="text-sm text-foreground hover:opacity-80 transition-opacity">info@woxly.in</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#cfae70] mb-1">Phone</p>
                    <a href="tel:+917306347297" className="text-sm text-foreground hover:opacity-80 transition-opacity">+91 73063 47297</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#cfae70] mb-1">Location</p>
                    <p className="text-sm text-foreground">Bangalore, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border p-8 md:p-12 shadow-sm rounded-sm">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Name</FormLabel>
                          <FormControl>
                            <input type="text" className={inputClasses} placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                          <FormControl>
                            <input type="email" className={inputClasses} placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    
                    <FormField control={form.control} name="subject" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Subject</FormLabel>
                        <FormControl>
                          <input type="text" className={inputClasses} placeholder="What is this regarding?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <FormField control={form.control} name="message" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-foreground">Message</FormLabel>
                        <FormControl>
                          <textarea rows={5} className={`${inputClasses} resize-y`} placeholder="How can we help you?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    
                    <button type="submit" className="w-full bg-foreground text-background hover:bg-[#cfae70] hover:text-black font-bold uppercase tracking-[0.1em] text-[12px] py-4 transition-colors mt-4">
                      Send Message
                    </button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
