import type { Metadata } from "next";
import { getPosts } from "@/lib/api/blog";
import { BlogListing } from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description: "Style tips, trends, and stories from Woxly.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-16 mb-30">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-fraunces font-normal mb-4 text-foreground">The Journal</h1>
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-bold">Stories about fashion, lifestyle, and culture</p>
      </div>
      <BlogListing initialPosts={posts} />
    </div>
  );
}
