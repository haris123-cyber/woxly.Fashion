"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const REVIEW_POOL = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "August 12, 2026",
    title: "Absolutely in love!",
    content: "The quality is outstanding. It fits perfectly and the material feels incredibly premium. Will definitely be purchasing more from Woxly.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop"
    ],
  },
  {
    id: 2,
    author: "Priya K.",
    rating: 5,
    date: "July 28, 2026",
    title: "Beautiful design",
    content: "I wore this to a dinner party and received so many compliments. The attention to detail is just superb. Highly recommend!",
  },
  {
    id: 3,
    author: "Elena R.",
    rating: 4,
    date: "July 15, 2026",
    title: "Great but slightly long",
    content: "The fabric is gorgeous and the packaging was beautiful. It's just a tiny bit long for me, but nothing a quick hem couldn't fix.",
  },
  {
    id: 4,
    author: "Aisha T.",
    rating: 5,
    date: "June 05, 2026",
    title: "Perfect staple piece",
    content: "I've worn this almost every day since I bought it. It washes incredibly well and still looks brand new. Attaching a pic from my vacation!",
    images: [
      "https://images.unsplash.com/photo-1434389670869-c80327f90f15?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1520975954732-57dd998e1f54?w=400&h=400&fit=crop"
    ],
  },
  {
    id: 5,
    author: "Chloe B.",
    rating: 4,
    date: "May 22, 2026",
    title: "Very chic",
    content: "Love the minimal design. It goes with almost everything in my wardrobe.",
  },
  {
    id: 6,
    author: "Nisha D.",
    rating: 5,
    date: "April 10, 2026",
    title: "My new favorite!",
    content: "Stunning! The color is exactly as shown online and the fit is true to size.",
    images: ["https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=400&h=400&fit=crop"],
  }
];

function getReviewsForProduct(productId: string) {
  const sum = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const startIdx = sum % (REVIEW_POOL.length - 2);
  return REVIEW_POOL.slice(startIdx, startIdx + 3);
}

export function ProductReviews({ productId }: { productId: string }) {
  const reviews = useMemo(() => getReviewsForProduct(productId), [productId]);
  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const [lightboxState, setLightboxState] = useState<{ images: string[], index: number } | null>(null);
  
  // Review form state
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", title: "", content: "", rating: 5 });

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxState && lightboxState.index < lightboxState.images.length - 1) {
      setLightboxState({ ...lightboxState, index: lightboxState.index + 1 });
    }
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxState && lightboxState.index > 0) {
      setLightboxState({ ...lightboxState, index: lightboxState.index - 1 });
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.title || !reviewForm.content) {
      toast.error("Please fill out all fields");
      return;
    }
    
    toast.success("Thank you for your review!", {
      description: "It has been submitted for approval and will appear soon."
    });
    setIsWritingReview(false);
    setReviewForm({ name: "", title: "", content: "", rating: 5 });
  };

  return (
    <>
      <section className="mt-24 border-t border-border pt-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left: Summary */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-fraunces font-normal text-foreground mb-6">Customer Reviews</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={cn("h-5 w-5", star <= Math.round(Number(avgRating)) ? "fill-[#cfae70] text-[#cfae70]" : "text-muted")} />
                ))}
              </div>
              <span className="font-fraunces text-2xl text-foreground">{avgRating}</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-8">
              Based on {Math.floor(Number(avgRating) * 7)} reviews
            </p>
            <button 
              onClick={() => setIsWritingReview(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center bg-foreground text-background hover:bg-[#cfae70] hover:text-white transition-colors px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-bold"
            >
              Write a Review
            </button>
          </div>

          {/* Right: Review List */}
          <div className="lg:col-span-8 space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="border border-border p-6 bg-background">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "h-3 w-3",
                            star <= review.rating ? "fill-[#cfae70] text-[#cfae70]" : "text-muted"
                          )}
                        />
                      ))}
                    </div>
                    <h4 className="font-fraunces text-lg text-foreground">{review.title}</h4>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground uppercase tracking-[0.05em] mb-4">
                  {review.content}
                </p>
                
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {review.images.map((img, i) => (
                      <button 
                        key={i} 
                        className="relative h-20 w-20 border border-border hover:border-[#cfae70] transition-colors cursor-zoom-in"
                        onClick={() => setLightboxState({ images: review.images!, index: i })}
                      >
                        <Image src={img} alt="Customer review photo" fill className="object-cover p-1" sizes="80px" />
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-foreground">
                  — {review.author}
                </p>
              </div>
            ))}
            <div className="text-center pt-8">
              <button className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#cfae70] hover:text-foreground transition-colors pb-1 border-b border-[#cfae70] hover:border-border">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      {isWritingReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background border border-border w-full max-w-lg relative p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsWritingReview(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="font-fraunces text-2xl mb-6">Write a Review</h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.2em] font-bold text-foreground mb-3">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                    >
                      <Star className={cn("h-6 w-6", star <= reviewForm.rating ? "fill-[#cfae70] text-[#cfae70]" : "text-muted border-muted-foreground")} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="name" className="block text-[9px] uppercase tracking-[0.2em] font-bold text-foreground mb-2">Name</label>
                <input
                  id="name"
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full h-12 border border-border bg-background px-4 text-[13px] focus:outline-none focus:border-[#cfae70] transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-[9px] uppercase tracking-[0.2em] font-bold text-foreground mb-2">Review Title</label>
                <input
                  id="title"
                  type="text"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full h-12 border border-border bg-background px-4 text-[13px] focus:outline-none focus:border-[#cfae70] transition-colors"
                  placeholder="Summarize your experience"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-[9px] uppercase tracking-[0.2em] font-bold text-foreground mb-2">Review</label>
                <textarea
                  id="content"
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  className="w-full border border-border bg-background p-4 text-[13px] focus:outline-none focus:border-[#cfae70] transition-colors resize-none h-32"
                  placeholder="How was the fit? The quality? Tell us more..."
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full h-12 bg-foreground text-background text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#cfae70] hover:text-white transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxState && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxState(null)}
        >
          <button 
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightboxState(null)}
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="relative w-full max-w-4xl aspect-[4/3] md:aspect-video flex items-center justify-center group" onClick={(e) => e.stopPropagation()}>
            {lightboxState.index > 0 && (
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur hover:bg-black hover:border-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            
            <Image 
              src={lightboxState.images[lightboxState.index]} 
              alt="Enlarged review photo" 
              fill 
              className="object-contain" 
              sizes="100vw"
            />

            {lightboxState.index < lightboxState.images.length - 1 && (
              <button 
                onClick={handleNextImage}
                className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur hover:bg-black hover:border-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              {lightboxState.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setLightboxState({ ...lightboxState, index: idx }); }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    idx === lightboxState.index ? "bg-white" : "bg-white/30 hover:bg-white/60"
                  )}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
