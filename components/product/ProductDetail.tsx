"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { toast } from "sonner";

interface ProductDetailProps {
  product: Product;
  related: Product[];
  fbt: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const sizes = product.variants.filter((v) => v.type === "size");
  const colors = product.variants.filter((v) => v.type === "color");

  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes[0]?.value);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(colors[0]?.value);
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'CARE' | 'DELIVERY'>('DETAILS');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[selectedImage],
      quantity: 1,
      variant: { size: selectedSize, color: selectedColor },
    });
    toast.success("Added to bag", { description: product.name });
  };

  const colorMap: Record<string, string> = {
    black: '#111',
    white: '#f5f5f5',
    navy: '#1e293b',
    olive: '#3f4a3c',
    beige: '#d4c5b0',
    camel: '#c29a6b'
  };

  return (
    <>
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 aspect-[3/4] bg-[#111] border border-[#1a1a1a]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-[#0a0a0a] border border-[#cfae70] px-3 py-1">
                <span className="text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase">New</span>
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex md:flex-col gap-4 overflow-x-auto md:w-20 shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative h-24 w-20 shrink-0 border transition-colors bg-[#111]",
                    i === selectedImage ? "border-[#cfae70]" : "border-[#1a1a1a] hover:border-[#333]"
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover p-0.5" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div className="lg:col-span-5 pt-4">
          <p className="text-[#666] text-[9px] font-bold tracking-[0.2em] uppercase mb-4">
            {product.category}
          </p>
          <h1 className="text-4xl font-fraunces font-normal mb-4">{product.name}</h1>
          <p className="text-[#cfae70] font-fraunces text-2xl mb-8">
            ₹{product.price}
          </p>

          <p className="text-[#8a8a8a] text-[13px] leading-relaxed mb-12 max-w-sm">
            {product.shortDescription}
          </p>

          {sizes.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <p className="text-[#f5f5f5] text-[9px] font-bold tracking-[0.2em] uppercase">Size</p>
                <button className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] hover:text-[#e0c591] uppercase transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    disabled={!size.inStock}
                    onClick={() => setSelectedSize(size.value)}
                    className={cn(
                      "w-12 h-10 border text-[10px] uppercase font-bold transition-colors",
                      !size.inStock ? "opacity-50 cursor-not-allowed border-[#222] text-[#444]" :
                        selectedSize === size.value
                          ? "border-[#cfae70] text-[#cfae70]"
                          : "border-[#222] text-[#666] hover:border-[#666]"
                    )}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}



          <div className="flex gap-4 mb-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-[#cfae70] hover:bg-[#b5985d] disabled:bg-[#333] disabled:text-[#666] text-black h-12 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={cn(
                "w-12 h-12 border flex items-center justify-center transition-colors",
                isWishlisted ? "border-[#cfae70] bg-[#cfae70]/10" : "border-[#333] hover:border-[#666]"
              )}
            >
              <Heart className={cn("h-4 w-4", isWishlisted ? "text-[#cfae70] fill-[#cfae70]" : "text-[#cfae70]")} />
            </button>
          </div>

          <button className="w-full border border-[#222] text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#444] h-12 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors mb-16">
            View Bag
          </button>

          {/* Tabs */}
          <div>
            <div className="border-b border-[#222] flex gap-8 mb-8">
              {['DETAILS', 'CARE', 'DELIVERY'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "pb-3 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors border-b-2",
                    activeTab === tab ? "border-[#cfae70] text-[#cfae70]" : "border-transparent text-[#666] hover:text-[#8a8a8a]"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-[#8a8a8a] space-y-4 tracking-[0.05em]">
              {activeTab === 'DETAILS' && (
                <>
                  <div className="grid grid-cols-12">
                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Material</span>
                    <span className="col-span-8 text-[#f5f5f5]">Premium Organic Cotton / Merino Blend</span>
                  </div>
                  <div className="grid grid-cols-12">
                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Colour</span>
                    <span className="col-span-8 text-[#f5f5f5] capitalize">{selectedColor || product.variants.find(v => v.type === 'color')?.label}</span>
                  </div>
                  <div className="grid grid-cols-12">
                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Origin</span>
                    <span className="col-span-8 text-[#f5f5f5]">Made in Italy</span>
                  </div>
                  <div className="grid grid-cols-12">
                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Ref.</span>
                    <span className="col-span-8 text-[#f5f5f5] uppercase">{product.sku || 'MN-AW25-005'}</span>
                  </div>
                  <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
                    <p>{product.description}</p>
                  </div>
                </>
              )}
              {activeTab === 'CARE' && (
                <div className="grid grid-cols-12">
                  <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Care</span>
                  <span className="col-span-8 text-[#f5f5f5]">Dry clean only. Do not tumble dry. Iron on low heat.</span>
                </div>
              )}
              {activeTab === 'DELIVERY' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-12">
                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Standard</span>
                    <span className="col-span-8 text-[#f5f5f5]">Free on orders over ₹999 (3-5 business days)</span>
                  </div>
                  <div className="grid grid-cols-12">
                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Express</span>
                    <span className="col-span-8 text-[#f5f5f5]">₹250 (1-2 business days)</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
