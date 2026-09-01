import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllBlogSlugs, getRelatedPosts } from "@/lib/api/blog";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return { title: post.title, description: post.excerpt, openGraph: { images: [{ url: post.image }] } };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    image: post.image,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} className="mb-6" />
        <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted mb-8">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
        </div>
        <header className="mb-8">
          <p className="text-sm text-primary font-medium">{post.category}</p>
          <h1 className="text-3xl md:text-4xl font-fraunces font-bold mt-2">{post.title}</h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>{post.readTime} min read</span>
          </div>
        </header>
        <div className="prose prose-neutral dark:prose-invert max-w-none whitespace-pre-line">
          {post.content}
        </div>
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t">
            <h2 className="text-xl font-fraunces font-bold mb-4">Related Posts</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="text-sm hover:text-primary">
                  {r.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
