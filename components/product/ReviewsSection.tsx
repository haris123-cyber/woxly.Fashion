"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReviewStars } from "@/components/trust/ReviewStars";
import { reviewSchema, type ReviewFormData } from "@/lib/validations/forms";
import { formatDate } from "@/lib/utils";
import type { Product } from "@/types/product";
import { showCustomToast } from "@/components/shared/CustomToast";

interface ReviewsSectionProps {
  product: Product;
}

export function ReviewsSection({ product }: ReviewsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const reviews = product.reviews ?? [];

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { rating: 5, title: "", body: "", author: "" },
  });

  const onSubmit = (_data: ReviewFormData) => {
    showCustomToast({ 
      title: "Review submitted!", 
      description: "Thank you for your feedback (mock submission)",
      type: "success"
    });
    form.reset();
    setShowForm(false);
  };

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.floor(r.rating) === star).length,
    percent: reviews.length ? (reviews.filter((r) => Math.floor(r.rating) === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <section className="mt-16" id="reviews">
      <h2 className="text-xl font-fraunces font-bold mb-6">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="text-center md:text-left">
          <p className="text-4xl font-bold">{product.rating}</p>
          <ReviewStars rating={product.rating} size="md" className="justify-center md:justify-start mt-1" />
          <p className="text-sm text-muted-foreground mt-1">{product.reviewCount} reviews</p>
        </div>
        <div className="md:col-span-2 space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-2 text-sm">
              <span className="w-8">{d.star} ★</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: `${d.percent}%` }} />
              </div>
              <span className="w-8 text-muted-foreground">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <Button variant="outline" onClick={() => setShowForm(!showForm)} className="mb-6">
        Write a Review
      </Button>

      {showForm && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-8 p-4 border rounded-lg">
            <FormField control={form.control} name="author" render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="body" render={({ field }) => (
              <FormItem><FormLabel>Review</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <Button type="submit">Submit Review</Button>
          </form>
        </Form>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <ReviewStars rating={review.rating} />
              <span className="font-medium text-sm">{review.author}</span>
              {review.verified && <span className="text-xs text-success">Verified</span>}
            </div>
            <h4 className="font-medium">{review.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{review.body}</p>
            <time className="text-xs text-muted-foreground mt-2 block">{formatDate(review.date)}</time>
          </div>
        ))}
      </div>
    </section>
  );
}
