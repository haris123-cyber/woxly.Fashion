import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export function RedSaleBanner() {
  return (
    <div className="bg-[#cc0000] text-white flex flex-col items-center justify-center py-12 px-4 text-center">
      <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-4">Starting Now!</p>
      <p className="text-sm font-bold uppercase tracking-[0.1em] mb-1">Up To</p>
      <h2 className="text-6xl md:text-8xl font-black tracking-tight mb-2">60% OFF</h2>
      <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-8">Online & In Store</p>

      <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
        <Link href="/products?category=women" className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Women</Link>
        <Link href="/products?category=men" className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Men</Link>
        <Link href="/products?category=kids" className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Kids</Link>
        <Link href="/products?category=sale" className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Sale Home</Link>
      </div>
    </div>
  );
}

export function FallCollectionBanner() {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[21/9]">
      <Image src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000" alt="Fall Collection" fill className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center pb-20 md:pb-0 bg-black/20 text-white text-center px-4">
        <h3 className="text-4xl md:text-6xl font-fraunces font-normal mb-2 shadow-sm">Power. Glam. Sass.</h3>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-8 shadow-sm">The Fall Collection</p>
        <Link href="/products" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</Link>
      </div>
    </div>
  );
}

export function MidnightCollectionBanner() {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[21/9]">
      <Image src="https://images.unsplash.com/photo-1571924848943-25c2c95bbb4b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="New Launch" fill className="object-cover object-top" />
      <div className="absolute inset-0 flex flex-col items-end justify-center pr-6 md:pr-24 bg-black/30 md:bg-black/10 text-white text-right">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 shadow-sm">New Launch</p>
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 max-w-[300px] md:max-w-md shadow-sm leading-[1.1] uppercase">The Midnight Collection</h3>
        <Link href="/products" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</Link>
      </div>
    </div>
  );
}

export function ThinPromoStrip() {
  return (
    <div className="bg-[#2d2226] text-white flex flex-col items-center justify-center py-8 px-4 text-center border-y border-[#4a3a40]">
      <h4 className="text-sm md:text-base font-bold uppercase tracking-[0.15em] mb-2">The Midnight Collection</h4>
      <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-300">Shop In-Store Now!</p>
      <Link href="/products" className="text-[9px] tracking-[0.2em] uppercase underline hover:text-gray-300 decoration-1 underline-offset-4">Find a store near you</Link>
    </div>
  );
}

export function SeasonalSplitGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2">
      <div className="relative w-full aspect-[4/5] md:aspect-square">
        <Image src="https://images.unsplash.com/photo-1589363358751-ab05797e5629?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Kids Costume" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 shadow-sm">Online Only</p>
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-8 shadow-sm">Time to Dress Up</h3>
          <Link href="/products?category=kids" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</Link>
        </div>
      </div>
      <div className="relative w-full aspect-[4/5] md:aspect-square">
        <Image src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000" alt="Women Party" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent text-white text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 shadow-sm">Get Ready</p>
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-8 shadow-sm">Party Edit</h3>
          <Link href="/products?category=women" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</Link>
        </div>
      </div>
    </div>
  );
}

export function InteriorBanner() {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[21/9]">
      <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000" alt="Interior" fill className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 bg-gradient-to-t from-black/50 via-transparent to-transparent text-white text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 shadow-sm text-black">Conscious Choice</p>
        <h3 className="text-4xl md:text-5xl font-black tracking-widest uppercase mb-8 shadow-sm text-black">Spot On</h3>
        <Link href="/products?category=home" className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">Shop Now</Link>
      </div>
    </div>
  );
}

export function WoxlyEditionSplitGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2">
      <div className="relative w-full aspect-[4/5] md:aspect-square">
        <Image src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=1000" alt="Weekend Essentials" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/70 via-transparent to-transparent text-white text-center px-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3 shadow-sm">Layer Up</p>
          <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-widest mb-8 shadow-sm max-w-[300px] leading-[1.2]">Weekend Essentials</h3>
          <Link href="/products" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</Link>
        </div>
      </div>
      <div className="relative w-full aspect-[4/5] md:aspect-square bg-[#d9bfa1] flex flex-col items-center justify-center p-8 text-center text-black overflow-hidden">
        {/* Abstract / Graphic background simulation */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#c4a98a] rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#e3c49e] rounded-full blur-[80px]"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center h-full w-full">
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 sm:mb-12">WOXLY<br />EDITION</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1">New Collection</p>
          <p className="text-[11px] md:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-10 text-gray-800">Available Online Now</p>
          <Link href="/products" className="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">Buy</Link>
        </div>
      </div>
    </div>
  );
}

export function AccessoriesHeroBanner() {
  return (
    <div className="relative w-full aspect-[4/5] md:aspect-[21/9]">
      <Image src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2000" alt="Accessories Collection" fill className="object-cover object-top" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-center px-4">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4">The Finishing Touch</p>
        <h3 className="text-5xl md:text-7xl font-fraunces font-light mb-8">Statement Pieces</h3>
        <Link href="/products?category=accessories" className="border border-white bg-transparent text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors">Discover More</Link>
      </div>
    </div>
  );
}

export function NewsletterPromoStrip() {
  return (
    <div className="bg-[#f5f5f5] text-black flex flex-col md:flex-row items-center justify-center py-6 px-4 text-center md:text-left gap-4 md:gap-8 border-y border-border">
      <h4 className="text-sm md:text-base font-bold uppercase tracking-[0.1em]">Join The Woxly Club</h4>
      <p className="text-[10px] md:text-xs font-medium uppercase tracking-[0.1em] text-gray-500">Get 15% off your first order</p>
      <Link href="/login" className="bg-black text-white px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">Sign Up</Link>
    </div>
  );
}

export function SpringCollectionSplitGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3">
      <div className="md:col-span-2 flex flex-col w-full h-full">
        <div className="relative w-full aspect-[4/5] md:h-full md:min-h-[400px]">
          <Image src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1600" alt="Spring Collection" fill className="object-cover" />
          <div className="absolute inset-0 flex flex-col items-start justify-end pb-16 px-8 md:px-16 bg-gradient-to-t from-black/60 to-transparent text-white">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3">Fresh Arrivals</p>
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6">Spring '26</h3>
          </div>
        </div>
        <div className="bg-[#cc0000] text-white p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div>
            <h4 className="font-bold uppercase tracking-widest text-lg md:text-xl">Limited Time Offer</h4>
            <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2">Extra 20% Off Spring Styles</p>
          </div>
          <Link href="/products?category=spring" className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">Shop Now</Link>
        </div>
      </div>
      <div className="relative h-full min-h-[400px] overflow-hidden flex flex-col items-center justify-center p-12 text-center">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1200"
          alt="Spring Details"
          fill
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/40" />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h4 className="font-fraunces text-3xl mb-6 text-[#4a4a4a] max-w-md">
            Breathe new life into your wardrobe.
          </h4>

          <Link
            href="/products"
            className="border-b border-black text-black pb-1 text-[10px] font-bold uppercase tracking-[0.2em] hover:text-[#cfae70] hover:border-[#cfae70] transition-colors"
          >
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PersonalizedSaleSplitGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2">
      <div className="bg-[#f8f7f5] flex flex-col items-center justify-center py-24 px-8 text-center border-b md:border-b-0 md:border-r border-border">
        <h3 className="text-3xl md:text-4xl font-fraunces font-normal mb-4 text-foreground">JUST FOR YOU</h3>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Personalized products</p>
      </div>
      <div className="bg-[#cc0000] text-white flex flex-col items-center justify-center py-24 px-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4">SALE</p>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-8">UP TO 50% OFF</h3>
        <Link href="/products?category=sale" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">
          Shop Sale &rarr;
        </Link>
      </div>
    </div>
  );
}

export function StackedPromoBanners() {
  return (
    <div className="w-full flex flex-col">
      <ThinPromoStrip />
      <MidnightCollectionBanner />


    </div>
  );
}

export function BeautyArrivalsGrid({ products }: { products?: Product[] }) {
  const displayProducts = products?.slice(0, 3) || [];

  if (displayProducts.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-b from-[#fde7f9] to-white py-12 px-4 md:px-8 flex flex-col items-center border-b border-border">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#001f3f]">
          New At <span className="italic font-serif">WOXLY</span>
        </h2>
        <p className="text-[#001f3f] text-sm md:text-base">Latest  Arrivals You'll Want To Own</p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-3 w-full  max-w-6xl mb-10">
        {displayProducts.map((product) => (
          <div key={product.id} className="flex flex-col items-center text-center bg-white  overflow-hidden shadow-sm hover:shadow-md transition-shadow p-1">
            <div className="relative w-full aspect-square mb-2 mt-2">
              <Image src={product.images[0]} alt={product.name} fill className="object-contain " />

            </div>

          </div>
        ))}
      </div>

      <Link href="/products" className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">
        View All <span className="ml-2">&rarr;</span>
      </Link>

    </div>
  );
}

export function HelloNewBeautySection({ products }: { products?: Product[] }) {
  const displayProducts = products?.slice(0, 6) || [];

  if (displayProducts.length === 0) return null;

  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 flex flex-col items-center border-b border-border">
      <div className="text-center mb-8 relative w-full max-w-4xl flex justify-center items-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#8b653a] tracking-wider text-center flex flex-col">
          <span>HELLO</span>
          <span>NEW TRENDS</span>
        </h2>
      </div>

      <div className="w-full max-w-6xl mb-6">
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9]  overflow-hidden shadow-md">
          <Image src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=2000" alt="New Beauty Campaign" fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <h3 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg tracking-tighter flex items-center text-center">
              <span className="text-blue-500 mr-2 text-6xl">✨</span> OUR FAVORITES
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-2 w-full  max-w-6xl mb-10">
        {displayProducts.map((product) => (
          <div key={product.id} className="flex flex-col items-center text-center bg-white  overflow-hidden shadow-sm hover:shadow-md transition-shadow p-0">
            <div className="relative w-full aspect-square mb-2 mt-2">
              <Link href={`/products/${product.slug}`}>
                <Image src={product.images[0]} alt={product.name} fill className="object-contain " />
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
