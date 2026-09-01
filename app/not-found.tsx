import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-[#0a0a0a] min-h-[80vh] flex flex-col items-center justify-center text-[#f5f5f5]">
      <div className="text-center px-4">
        <h1 className="text-8xl md:text-9xl font-fraunces font-normal text-[#cfae70] leading-none mb-6">
          404
        </h1>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#8a8a8a] mb-12 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center h-12 px-8 border border-[#222] hover:border-[#cfae70] text-[#8a8a8a] hover:text-[#f5f5f5] text-[10px] uppercase font-bold tracking-[0.2em] transition-colors bg-transparent"
        >
          <ArrowLeft className="w-3 h-3 mr-3" /> Return Home
        </Link>
      </div>
    </div>
  );
}
