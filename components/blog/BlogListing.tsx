"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@/types/user";

export function BlogListing({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(initialPosts.map((post) => post.category));
    return ["All", ...Array.from(cats)];
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialPosts, searchQuery, selectedCategory]);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12 border-b border-border pb-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-[0.1em] font-bold transition-colors whitespace-nowrap shrink-0 border ${
                selectedCategory === cat
                  ? "bg-[#cfae70] text-black border-[#cfae70]"
                  : "bg-transparent text-muted-foreground border-border hover:border-[#cfae70] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-transparent border-border rounded-none focus-visible:ring-[#cfae70] focus-visible:border-[#cfae70] text-[11px] placeholder:uppercase placeholder:tracking-[0.1em]"
          />
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-24 border border-border bg-secondary/20">
          <h3 className="font-fraunces text-2xl text-foreground mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-6 text-[10px] uppercase tracking-[0.1em]">Try adjusting your search or category</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#cfae70] hover:text-foreground transition-colors pb-1 border-b border-[#cfae70] hover:border-[#f5f5f5]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-6 border border-border">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                  sizes="(max-width: 768px) 100vw, 33vw" 
                />
              </div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-[#cfae70] font-bold mb-3">{post.category}</p>
              <h2 className="font-fraunces text-2xl md:text-3xl font-normal group-hover:text-[#cfae70] transition-colors mb-3 leading-[1.2]">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
              <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-bold">
                {formatDate(post.publishedAt)} <span className="mx-2 text-border">|</span> {post.readTime} min read
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
