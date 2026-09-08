"use client";

import { useState } from "react";
import { showCustomToast } from "@/components/shared/CustomToast";

export function FeedbackForm() {
  const [category, setCategory] = useState("General Feedback");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      showCustomToast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback.",
        type: "success"
      });
      setIsSubmitting(false);
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
      setCategory("General Feedback");
    }, 800);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
          <input type="text" id="name" className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors" placeholder="Your name" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
          <input type="email" id="email" className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors" placeholder="Your email address" required />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium text-foreground">Feedback Category</label>
        <select 
          id="category" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors"
        >
          <option>General Feedback</option>
          <option>Product Suggestion</option>
          <option>Website Issue</option>
          <option>Customer Service</option>
          <option>Other</option>
        </select>
      </div>

      {category === "Other" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <label htmlFor="otherCategory" className="text-sm font-medium text-foreground">Specify Category</label>
          <input type="text" id="otherCategory" className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors" placeholder="Please specify your feedback category" required />
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
        <textarea id="message" rows={6} className="w-full p-3 border border-border  bg-background text-foreground focus:outline-none focus:ring-0 focus:border-border transition-colors resize-y" placeholder="Tell us what you think..." required></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-foreground text-background hover:bg-[#cfae70] hover:text-black font-bold uppercase tracking-[0.1em] text-[12px] py-4 transition-colors disabled:opacity-70"
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  );
}
