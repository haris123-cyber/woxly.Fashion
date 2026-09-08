import Image from "next/image";
import Link from "next/link";

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
      <Image src="https://images.unsplash.com/photo-1550614000-4b95d4ebf04f?q=80&w=2000" alt="New Launch" fill className="object-cover object-top" />
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
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative w-full aspect-[4/5] md:aspect-square">
        <Image src="https://images.unsplash.com/photo-1542157643-4ce43f11bc02?q=80&w=1000" alt="Kids Costume" fill className="object-cover" />
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
    <div className="grid grid-cols-1 md:grid-cols-2">
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
        <div className="relative z-10 flex flex-col items-center">
          <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">WOXLY<br />EDITION</h3>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-3">New Collection</p>
          <p className="text-[11px] md:text-xs font-bold tracking-widest uppercase mb-10 text-gray-800">Available Online Now</p>
          <Link href="/products" className="bg-black text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">Buy</Link>
        </div>
      </div>
    </div>
  );
}

export function StackedPromoBanners() {
  return (
    <div className="w-full flex flex-col">
      <RedSaleBanner />
      <FallCollectionBanner />
      <MidnightCollectionBanner />
      <ThinPromoStrip />
      <SeasonalSplitGrid />
      <InteriorBanner />
      <WoxlyEditionSplitGrid />
    </div>
  );
}
