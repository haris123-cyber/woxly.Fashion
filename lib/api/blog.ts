import type { BlogPost } from "@/types/user";
import blogsData from "@/data/blogs.json";

const blogs = blogsData as BlogPost[];

export function getPosts(): BlogPost[] {
  return [...blogs].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogs.find((b) => b.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogs.map((b) => b.slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];
  return blogs.filter((b) => b.slug !== slug && b.category === post.category).slice(0, limit);
}
