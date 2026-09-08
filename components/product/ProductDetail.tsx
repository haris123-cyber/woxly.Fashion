"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Heart, Tag, Ticket, MapPin, Truck, Store, ArrowBigDown, ArrowDown, Droplets, ShieldCheck, Ban } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductReviews } from "@/components/product/ProductReviews";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import { SITE_CONFIG } from "@/lib/constants";
import { showCustomToast } from "@/components/shared/CustomToast";

interface ProductDetailProps {
    product: Product;
    related: Product[];
    fbt: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);

    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setSelectedImage((prev) => Math.min(prev + 1, product.images.length - 1));
        }
        if (isRightSwipe) {
            setSelectedImage((prev) => Math.max(prev - 1, 0));
        }
    }; const sizes = product.variants.filter((v) => v.type === "size");
    const colors = product.variants.filter((v) => v.type === "color");

    const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes[0]?.value);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(colors[0]?.value);
    const [activeTab, setActiveTab] = useState<'DETAILS' | 'CARE' | 'DELIVERY'>('DETAILS');
    const [isWishlisted, setIsWishlisted] = useState(false);

    const [showStickyBar, setShowStickyBar] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    const [pincode, setPincode] = useState('');
    const [deliveryStatus, setDeliveryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [deliveryMessage, setDeliveryMessage] = useState('');

    const mainButtonRef = useRef<HTMLDivElement>(null);

    const checkDelivery = () => {
        if (pincode.length !== 6) return;
        setDeliveryStatus('loading');

        // Simulate API check
        setTimeout(() => {
            // Mock logic: some generic non-serviceable pincodes
            if (['0', '9'].includes(pincode[0])) {
                setDeliveryStatus('error');
                setDeliveryMessage('Sorry, delivery is not available for this pincode.');
            } else {
                setDeliveryStatus('success');
                setDeliveryMessage(`Delivery available to ${pincode} within 3-5 business days.`);
            }
        }, 800);
    };

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
        showCustomToast({
            title: "Added to bag",
            product: {
                name: product.name,
                price: product.price,
                image: product.images[selectedImage],
            },
            variant: {
                size: selectedSize,
                color: selectedColor,
            },
            quantity: 1,
        });

        setJustAdded(true);
        // Reset highlight after 3 seconds
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the main button is NOT intersecting (visible), show the sticky bar
                setShowStickyBar(!entry.isIntersecting);
            },
            { threshold: 0 } // Trigger as soon as 1 pixel is visible/hidden
        );

        if (mainButtonRef.current) {
            observer.observe(mainButtonRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32 min-w-0">
                {/* Left: Gallery */}
                <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 min-w-0">
                    {product.images.length > 1 && (
                        <div className="flex md:flex-col gap-4 overflow-x-auto md:w-20 shrink-0 hide-scrollbar">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={cn(
                                        "relative h-24 w-20 shrink-0 border transition-colors bg-secondary",
                                        i === selectedImage ? "border-[#cfae70]" : "border-border hover:border-border"
                                    )}
                                    aria-label={`View image ${i + 1}`}
                                >
                                    <Image src={img} alt="" fill className="object-cover p-0.5" sizes="80px" />
                                </button>
                            ))}
                        </div>
                    )}

                    <div
                        className="relative flex-1 aspect-[3/4] bg-secondary border border-border min-w-0 touch-pan-y overflow-hidden"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover transition-opacity duration-300"
                            priority
                        />
                        {product.isNew && (
                            <div className="absolute top-4 left-4 bg-background border border-[#cfae70] px-3 py-1">
                                <span className="text-[#cfae70] text-[9px] font-bold tracking-[0.15em] uppercase">New</span>
                            </div>
                        )}

                        {/* Pagination Dots for visual feedback on mobile */}
                        {product.images.length > 1 && (
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10 md:hidden">
                                {product.images.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1 transition-all rounded-none",
                                            i === selectedImage ? "bg-[#cfae70] w-6" : "bg-white/50 w-2"
                                        )}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Info */}
                <div className="lg:col-span-5 pt-4">
                    <p className="text-muted-foreground text-[9px] font-bold tracking-[0.2em] uppercase mb-4">
                        {product.category}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {product.isSale && (
                            <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-wider">Hot Deal</span>
                        )}
                        {product.isNew && (
                            <span className="bg-[#cfae70] text-black text-[9px] font-bold px-2 py-1 uppercase tracking-wider">New</span>
                        )}
                        {(product.stock > 0 && product.stock <= 10) && (
                            <span className="bg-black text-[#cfae70] text-[9px] font-bold px-2 py-1 uppercase tracking-wider border border-[#cfae70]">Limited</span>
                        )}

                    </div>
                    <div className="flex items-center justify-between  mb-2">
                        <h1 className="text-4xl font-fraunces font-normal">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-2">
                            <span
                                className={cn(
                                    "w-2 h-2 ",
                                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                                )}
                            />
                            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-muted-foreground">
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                        <p className="text-[#cfae70] font-fraunces text-2xl">
                            ₹{product.price}
                        </p>
                        {(() => {
                            const comparePrice = product.compareAtPrice;
                            if (comparePrice && comparePrice > product.price) {
                                const discount = Math.round(((comparePrice - product.price) / comparePrice) * 100);
                                return (
                                    <>
                                        <p className="text-muted-foreground line-through text-xl">
                                            ₹{comparePrice}
                                        </p>
                                        <p className="flex items-center whitespace-nowrap text-red-500 text-xl font-fraunces px-0 py-1 uppercase tracking-wider">
                                            <ArrowDown className="w-5 h-5" /> {discount}%
                                        </p>
                                    </>
                                );
                            }
                            return null;
                        })()}
                    </div>

                    <p className="text-foreground text-[13px] leading-relaxed mb-8 max-w-sm">
                        {product.shortDescription}
                    </p>

                    {/* Promo Banners */}
                    <div className="mb-12 flex flex-col gap-3">
                        <div className="relative border border-dashed border-[#cfae70]/50 bg-[#cfae70]/5 p-4 flex items-start gap-3 overflow-hidden">
                            {/* Ticket cutouts */}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full border-r border-dashed border-[#cfae70]/50" />
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full border-l border-dashed border-[#cfae70]/50" />

                            <Tag className="w-4 h-4 text-[#cfae70] mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold text-foreground tracking-[0.1em] uppercase mb-1">Bank Offer</p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">10% instant discount on HDFC Credit Cards. Use code <span className="font-bold text-[#cfae70]">HDFC10</span></p>
                            </div>
                        </div>
                        <div className="relative border border-dashed border-[#cfae70]/50 bg-[#cfae70]/5 p-4 flex items-start gap-3 overflow-hidden">
                            {/* Ticket cutouts */}
                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full border-r border-dashed border-[#cfae70]/50" />
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-background rounded-full border-l border-dashed border-[#cfae70]/50" />

                            <Ticket className="w-4 h-4 text-[#cfae70] mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold text-foreground tracking-[0.1em] uppercase mb-1">Special Price</p>
                                <p className="text-[11px] text-muted-foreground leading-relaxed">Get extra 15% off on your first order. Use code <span className="font-bold text-[#cfae70]">WELCOME15</span></p>
                            </div>
                        </div>
                    </div>

                    {sizes.length > 0 && (
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-foreground text-[9px] font-bold tracking-[0.2em] uppercase">Size</p>
                                <button
                                    onClick={() => setShowSizeGuide(true)}
                                    className="text-[#cfae70] text-[9px] font-bold tracking-[0.2em] hover:text-[#e0c591] uppercase transition-colors"
                                >
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
                                            !size.inStock ? "opacity-50 cursor-not-allowed border-border text-[#444]" :
                                                selectedSize === size.value
                                                    ? "border-[#cfae70] border-2 text-[#cfae70]"
                                                    : "border-2 border-gray-300  text-muted-foreground hover:border-[#666]"
                                        )}
                                    >
                                        {size.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {colors.length > 0 && (
                        <div className="mb-12 ">
                            <p className="text-foreground  text-[9px] font-bold tracking-[0.2em] uppercase mb-4">
                                Colour — {colors.find(c => c.value === selectedColor)?.label || 'Select'}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {colors.map((color) => {
                                    const bg = colorMap[color.value.toLowerCase()] || color.value;
                                    return (
                                        <button
                                            key={color.id}
                                            disabled={!color.inStock}
                                            onClick={() => setSelectedColor(color.value)}
                                            className={cn(
                                                "w-5 h-5 rounded-full  ring-2 ring-offset-2  transition-all",
                                                !color.inStock ? "opacity-50 cursor-not-allowed" : "",
                                                selectedColor === color.value ? "ring-[#cfae70]" : "ring-white hover:ring-[#444]"
                                            )}
                                            style={{ backgroundColor: bg }}
                                            aria-label={color.label}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Pincode Checker */}
                    <div className="mb-12 border-t border-border pt-8">
                        <p className="text-foreground text-[9px] font-bold tracking-[0.2em] uppercase mb-4">
                            Delivery Availability
                        </p>
                        {deliveryStatus !== 'success' && (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => {
                                        setPincode(e.target.value.replace(/\D/g, '').slice(0, 6));
                                        setDeliveryStatus('idle');
                                    }}
                                    className="flex-1 bg-transparent border border-border h-12 px-4 text-sm focus:outline-none focus:border-[#cfae70] transition-colors placeholder:text-muted-foreground/50"
                                />
                                <button
                                    onClick={checkDelivery}
                                    disabled={pincode.length !== 6 || deliveryStatus === 'loading'}
                                    className="bg-secondary text-foreground px-6 h-12 text-[10px] font-bold tracking-[0.2em] uppercase border border-border hover:border-[#cfae70] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {deliveryStatus === 'loading' ? 'Checking...' : 'Check'}
                                </button>
                            </div>
                        )}

                        {deliveryStatus === 'success' && (
                            <div className="mt-2 border border-border bg-background">
                                {/* Top section: Pincode */}
                                <div className="p-4 bg-[#cfae70]/5 flex items-start gap-3 border-b border-border">
                                    <MapPin className="w-5 h-5 text-[#cfae70] shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-foreground text-sm">{pincode}</p>
                                        <button
                                            onClick={() => setDeliveryStatus('idle')}
                                            className="text-[#cfae70] text-xs hover:underline mt-1 transition-colors"
                                        >
                                            Change delivery location &gt;
                                        </button>
                                    </div>
                                </div>
                                {/* Middle section: Delivery Date */}
                                <div className="p-4 flex items-start gap-3 border-b border-border">
                                    <Truck className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-foreground text-sm">Delivery by Sep 10, 2026</p>
                                        <p className="text-muted-foreground text-xs mt-1">₹53.36 delivery · Delhivery Surface</p>
                                    </div>
                                </div>
                                {/* Bottom section: General Info */}
                                <div className="p-4 flex items-start gap-3">
                                    <Store className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                                    <p className="text-muted-foreground text-xs leading-relaxed">
                                        1-4 Working Days for Delivery (Kerala). 2-6 Working Days for Delivery (Tamil Nadu, Karnataka, Goa, Andhra Pradesh, Telangana). 3-9 Working Days for Delivery (Other States).
                                    </p>
                                </div>
                            </div>
                        )}
                        {deliveryStatus === 'error' && (
                            <p className="text-red-500 text-xs mt-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                                {deliveryMessage}
                            </p>
                        )}
                    </div>

                    <div ref={mainButtonRef} className="flex gap-4 mb-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="flex-1 border-2 border-[#cfae70]/80 hover:border-[#cfae70]/60  hover:bg-[#b5985d] disabled:bg-[#333] disabled:text-muted-foreground text-black h-12 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                        </button>
                        <button
                            onClick={() => setIsWishlisted(!isWishlisted)}
                            className={cn(
                                "w-12 h-12 border flex items-center justify-center transition-colors",
                                isWishlisted ? "border-[#cfae70] bg-[#cfae70]/10" : "border-border hover:border-[#666]"
                            )}
                        >
                            <Heart className={cn("h-4 w-4", isWishlisted ? "text-[#cfae70] fill-[#cfae70]" : "text-[#cfae70]")} />
                        </button>
                        <a
                            href={`https://wa.me/${SITE_CONFIG?.phone?.replace(/[^0-9]/g, "") || "919876543210"}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name} (₹${product.price}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 border border-border flex items-center justify-center text-[#25D366] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                            aria-label="Ask on WhatsApp"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                            </svg>
                        </a>
                    </div>

                    <button
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                window.location.href = "/cart"; // next/router push would be better but requires adding useRouter to component top
                            } else {
                                useUIStore.getState().setCartDrawerOpen(true);
                            }
                        }}
                        className={cn(
                            "w-full border-2 h-12 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors mb-16",
                            justAdded
                                ? "border-[#cfae70] text-[#cfae70] hover:bg-[#cfae70]/10"
                                : " bg-[#cfae70] border-border border-gray-300  text-foreground hover:text-foreground hover:border-[#444]"
                        )}
                    >
                        View Bag
                    </button>

                    {/* Trust Badges */}
                    <div className="w-full overflow-hidden py-6 border-y border-border mb-8">
                        <div className="flex gap-4 sm:gap-6 md:justify-between overflow-x-auto hide-scrollbar pb-2">
                            <div className="flex flex-col items-center justify-center text-center gap-2 min-w-[85px] shrink-0">
                                <Droplets className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[9px] uppercase font-bold tracking-[0.1em] text-muted-foreground">Washable</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2 min-w-[85px] shrink-0">
                                <Ban className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[9px] uppercase font-bold tracking-[0.1em] text-muted-foreground">No Returns</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2 min-w-[85px] shrink-0">
                                <ShieldCheck className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[9px] uppercase font-bold tracking-[0.1em] text-muted-foreground">100% Authentic</span>
                            </div>
                            <div className="flex flex-col items-center justify-center text-center gap-2 min-w-[85px] shrink-0">
                                <Truck className="w-5 h-5 text-muted-foreground" />
                                <span className="text-[9px] uppercase font-bold tracking-[0.1em] text-muted-foreground">Secure Delivery</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div>
                        <div className="border-b border-border flex gap-8 mb-8">
                            {['DETAILS', 'CARE', 'DELIVERY'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={cn(
                                        "pb-3 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors border-b-2",
                                        activeTab === tab ? "border-[#cfae70] text-[#cfae70]" : "border-transparent text-muted-foreground hover:text-muted-foreground"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="text-[11px] text-muted-foreground space-y-4 tracking-[0.05em]">
                            {activeTab === 'DETAILS' && (
                                <>
                                    <div className="grid grid-cols-12">
                                        <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Material</span>
                                        <span className="col-span-8 text-foreground">Premium Organic Cotton / Merino Blend</span>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Colour</span>
                                        <span className="col-span-8 text-foreground capitalize">{selectedColor || product.variants.find(v => v.type === 'color')?.label}</span>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Origin</span>
                                        <span className="col-span-8 text-foreground">Made in Italy</span>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Ref.</span>
                                        <span className="col-span-8 text-foreground uppercase">{product.sku || 'MN-AW25-005'}</span>
                                    </div>
                                    <div className="mt-6 pt-6 border-t border-border">
                                        <p>{product.description}</p>
                                    </div>
                                </>
                            )}
                            {activeTab === 'CARE' && (
                                <div className="grid grid-cols-12">
                                    <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Care</span>
                                    <span className="col-span-8 text-foreground">Dry clean only. Do not tumble dry. Iron on low heat.</span>
                                </div>
                            )}
                            {activeTab === 'DELIVERY' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-12">
                                        <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Standard</span>
                                        <span className="col-span-8 text-foreground">Free on orders over ₹999 (3-5 business days)</span>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <span className="col-span-4 uppercase tracking-[0.15em] text-[9px]">Express</span>
                                        <span className="col-span-8 text-foreground">₹250 (1-2 business days)</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {related.length > 0 && (
                <section className="mt-24 border-t border-border pt-16">
                    <h2 className="text-3xl font-fraunces font-normal text-foreground mb-12">You May Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {related.map((p) => <ProductCard key={p.id} product={p} />)}
                    </div>
                </section>
            )}

            {/* Reviews */}
            <ProductReviews productId={product.id} />

            {/* Product Banners */}
            <section className="mt-24 pb-12">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative aspect-[4/3] md:aspect-[3/2] border border-border bg-secondary group overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                            alt="Premium Collection"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                    </div>
                    <div className="relative aspect-[4/3] md:aspect-[3/2] border border-border bg-secondary group overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                            alt="Sustainable Fashion"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                    </div>
                </div>
            </section>

            {/* Mobile Sticky Add to Bag */}
            <div
                className={cn(
                    "lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40 flex items-center gap-4 pb-safe transition-transform duration-300",
                    showStickyBar ? "translate-y-0" : "translate-y-full"
                )}
            >
                <div className="flex-1 truncate pr-2">
                    <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground truncate mb-0.5">{product.name}</p>
                    <p className="text-[#cfae70] font-fraunces text-lg leading-none">₹{product.price}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-1/2 bg-[#cfae70] hover:bg-[#b5985d] disabled:bg-[#333] disabled:text-muted-foreground text-black h-12 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors shrink-0"
                >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
                </button>
            </div>

            {/* Size Guide Modal */}
            {showSizeGuide && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="relative w-full max-w-2xl bg-background border border-border p-6 shadow-xl max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setShowSizeGuide(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <h2 className="text-2xl font-fraunces mb-6 text-foreground">Size Guide</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm mb-6">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="py-3 px-4 font-bold tracking-[0.1em] uppercase text-[10px] text-muted-foreground">Size</th>
                                        <th className="py-3 px-4 font-bold tracking-[0.1em] uppercase text-[10px] text-muted-foreground">Chest (in)</th>
                                        <th className="py-3 px-4 font-bold tracking-[0.1em] uppercase text-[10px] text-muted-foreground">Waist (in)</th>
                                        <th className="py-3 px-4 font-bold tracking-[0.1em] uppercase text-[10px] text-muted-foreground">Length (in)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-border hover:bg-secondary/50">
                                        <td className="py-3 px-4 font-bold">XS</td>
                                        <td className="py-3 px-4">34-36</td>
                                        <td className="py-3 px-4">28-30</td>
                                        <td className="py-3 px-4">27</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-secondary/50">
                                        <td className="py-3 px-4 font-bold">S</td>
                                        <td className="py-3 px-4">36-38</td>
                                        <td className="py-3 px-4">30-32</td>
                                        <td className="py-3 px-4">28</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-secondary/50">
                                        <td className="py-3 px-4 font-bold">M</td>
                                        <td className="py-3 px-4">38-40</td>
                                        <td className="py-3 px-4">32-34</td>
                                        <td className="py-3 px-4">29</td>
                                    </tr>
                                    <tr className="border-b border-border hover:bg-secondary/50">
                                        <td className="py-3 px-4 font-bold">L</td>
                                        <td className="py-3 px-4">40-42</td>
                                        <td className="py-3 px-4">34-36</td>
                                        <td className="py-3 px-4">30</td>
                                    </tr>
                                    <tr className="hover:bg-secondary/50">
                                        <td className="py-3 px-4 font-bold">XL</td>
                                        <td className="py-3 px-4">42-44</td>
                                        <td className="py-3 px-4">36-38</td>
                                        <td className="py-3 px-4">31</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-secondary/30 p-4 border border-border">
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                <span className="font-bold text-foreground">How to measure:</span><br />
                                <strong className="text-foreground">Chest:</strong> Measure around the fullest part of your chest, keeping the measuring tape horizontal.<br />
                                <strong className="text-foreground">Waist:</strong> Measure around the narrowest part (typically where your body bends side to side), keeping the tape horizontal.<br />
                                <strong className="text-foreground">Length:</strong> Measure from the highest point of the shoulder down to the desired hemline.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
