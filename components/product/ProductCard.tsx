"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Price } from "@/components/shared/Price";
import { ReviewStars } from "@/components/trust/ReviewStars";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { showCustomToast } from "@/components/shared/CustomToast";

interface ProductCardProps {
    product: Product;
    className?: string;
    priority?: boolean;
    showDetails?: boolean;
    isWishlistContext?: boolean;
}

export function ProductCard({ product, className, priority = false, showDetails = false, isWishlistContext = false }: ProductCardProps) {
    const addItem = useCartStore((s) => s.addItem);
    const toggleWishlist = useWishlistStore((s) => s.toggle);
    const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
    const hasHydrated = useWishlistStore((s) => s._hasHydrated);

    const isWishlistActive = hasHydrated && isInWishlist;

    const [isMobileVisible, setIsMobileVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (window.innerWidth >= 768) return;
                entries.forEach((entry) => {
                    setIsMobileVisible(entry.isIntersecting);
                });
            },
            {
                threshold: 0,
                rootMargin: "-50% 0px -49% 0px"
            }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.images[0],
        });
        showCustomToast({
            title: "Added to cart",
            product: {
                name: product.name,
                price: product.price,
                image: product.images[0],
            },
            quantity: 1,
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
        showCustomToast({
            title: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
            product: {
                name: product.name,
                price: product.price,
                image: product.images[0],
            }
        });
    };

    const [showConfirm, setShowConfirm] = useState(false);

    const handleRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(true);
    };

    const confirmRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
        setShowConfirm(false);
        showCustomToast({
            title: "Removed from wishlist",
            product: {
                name: product.name,
                price: product.price,
                image: product.images[0],
            }
        });
    };

    const cancelRemove = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowConfirm(false);
    };

    return (
        <div className={cn("group relative", className)}>
            <Link href={`/products/${product.slug}`} className="block">
                <div ref={cardRef} className="relative aspect-[3/4] overflow-hidden bg-secondary">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={priority}
                    />
                    {product.images[1] && (
                        <Image
                            src={product.images[1]}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            aria-hidden
                        />
                    )}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-2">
                        {product.isNew && (
                            <span className="bg-muted text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1">
                                New
                            </span>
                        )}
                        {product.isSale && (
                            <span className="bg-muted text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase px-3 py-1">
                                Sale
                            </span>
                        )}
                    </div>

                    {isWishlistContext ? (
                        <button
                            onClick={handleRemove}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 flex h-8 w-8 items-center justify-center transition-all bg-white hover:bg-red-50 rounded-full shadow-sm z-10 opacity-100"
                            aria-label="Remove from wishlist"
                        >
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
                        </button>
                    ) : (
                        <button
                            onClick={handleWishlist}
                            className={cn(
                                "absolute top-2 right-2 sm:top-4 sm:right-4 flex h-6 w-6 items-center justify-center transition-opacity",
                                isMobileVisible ? "opacity-100" : "opacity-0",
                                "md:opacity-0 md:group-hover:opacity-100"
                            )}
                            aria-label={isWishlistActive ? "Remove from wishlist" : "Add to wishlist"}
                        >
                            <Heart className={cn("h-5 w-5 sm:h-6 sm:w-6 text-white hover:text-[#cfae70]", isWishlistActive && "fill-[#cfae70] text-[#cfae70]")} />
                        </button>
                    )}

                    <button
                        className={cn(
                            "absolute bottom-0 left-0 right-0 bg-muted/90 backdrop-blur-sm text-foreground py-4 text-[10px] font-bold tracking-[0.15em] uppercase transition-all duration-300",
                            isMobileVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                            "md:translate-y-full md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                        )}
                        onClick={handleQuickAdd}
                    >
                        Add to Bag
                    </button>
                </div>
                {showDetails && (
                    <div className="bg-background text-foreground p-1 md:p-1 space-y-0 md:space-y-1">
                        <h3 className="font-fraunces text-[11px] md:text-xs  font-medium uppercase tracking-wider truncate">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[11px] md:text-xs font-medium text-foreground">
                                {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                                <>
                                    <span className="text-[9px] md:text-[10px] text-muted-foreground line-through">
                                        {formatPrice(product.compareAtPrice)}
                                    </span>
                                    <span className="text-[9px] md:text-[10px] text-[#cfae70] font-bold">
                                        -{Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>
                        {(() => {
                            const colors = product.variants?.filter((v) => v.type === "color") || [];
                            if (colors.length === 0) return null;
                            return (
                                <div className="flex items-center gap-[4px] pt-1.5 flex-wrap ">
                                    {colors.slice(0, 3).map((color, idx) => (
                                        <div
                                            key={idx}
                                            className="w-[12px] h-[12px] border rounded-full border-[#cfae70]"
                                            style={{ backgroundColor: color.value }}
                                            title={color.label}
                                        />
                                    ))}
                                    {colors.length > 3 && (
                                        <span className="text-[8px] text-muted-foreground leading-none">
                                            +{colors.length - 3}
                                        </span>
                                    )}
                                </div>
                            );
                        })()}
                    </div>
                )}
            </Link>

            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent className="sm:max-w-[400px] flex flex-col  items-center justify-center p-8 pt-10 gap-2  text-center border-none shadow-2xl">
                    <DialogTitle className="sr-only">Confirm Wishlist Removal</DialogTitle>
                    <DialogDescription className="sr-only">Are you sure you want to remove this item from your wishlist?</DialogDescription>

                    <div className="relative mb-2">
                        <Trash2 className="w-7 h-7 text-[#cfae70]" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-lg font-bold text-foreground">Confirm Item Removal?</h2>
                    <p className="text-[13px] text-muted-foreground mb-4 leading-relaxed">
                        Are you sure you want to remove <span className="font-bold">"{product.name}"</span> from your wishlist?<br />This action cannot be undone.
                    </p>

                    <div className="flex gap-3 w-full mt-2">
                        <button
                            onClick={cancelRemove}
                            className="flex-1 py-2.5 px-4 text-[13px] font-bold border border-[#cfae70]   bg-[#cfae70] hover:bg-red-50 transition-colors "
                        >
                            Cancel
                        </button>
                        <button
                            onClick={confirmRemove}
                            className="flex-1 py-2.5 px-4 text-[13px] font-bold bg-red-500 text-white hover:bg-red-600 transition-colors  shadow-sm"
                        >
                            Delete
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
