import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPosts } from "@/lib/api/blog";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Style tips, trends, and stories from Woxly.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-fraunces font-bold mb-8">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-muted mb-3">
              <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <Badge variant="secondary" className="mb-2">{post.category}</Badge>
            <h2 className="font-fraunces text-lg font-semibold group-hover:text-primary transition-colors">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
            <p className="text-xs text-muted-foreground mt-2">{formatDate(post.publishedAt)} · {post.readTime} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
