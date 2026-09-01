import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductBySlug, getAllProductSlugs, getRelatedProducts, getFBTProducts } from "@/lib/api/products";
import { ProductDetail } from "@/components/product/ProductDetail";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug);
  const fbt = getFBTProducts(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-[#0a0a0a] min-h-screen text-[#f5f5f5]">
        <div className="container mx-auto px-4 md:px-8 py-8">
          <Breadcrumbs
            items={[
              { label: "Shop", href: "/products" },
              { label: product.category, href: `/products?category=${product.categorySlug}` },
              { label: product.name },
            ]}
            className="mb-12"
          />
          <ProductDetail product={product} related={related} fbt={fbt} />
        </div>
      </div>
    </>
  );
}
