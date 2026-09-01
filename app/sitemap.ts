import type { MetadataRoute } from "next";
import { getAllProductSlugs } from "@/lib/api/products";
import { getAllBlogSlugs } from "@/lib/api/blog";
import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url;
  const productSlugs = getAllProductSlugs();
  const blogSlugs = getAllBlogSlugs();

  const staticPages = ["", "/products", "/about", "/contact", "/blog", "/faq", "/shipping", "/returns", "/privacy", "/terms"];

  return [
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...productSlugs.map((slug) => ({
      url: `${base}/products/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${base}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
