"use client";

import Link from "next/link";
import { ArrowLeft, RefreshCcw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-background min-h-[80vh] flex flex-col items-center justify-center text-foreground">
      <div className="text-center px-4">
        <h1 className="text-5xl md:text-7xl font-fraunces font-normal text-[#cfae70] leading-none mb-6">
          Something went wrong
        </h1>
        <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-12 max-w-sm mx-auto leading-relaxed">
          We apologize for the inconvenience. An unexpected error has occurred on our end.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={reset}
            className="inline-flex items-center justify-center h-12 px-8 bg-foreground text-background hover:bg-[#cfae70] hover:text-black text-[10px] uppercase font-bold tracking-[0.2em] transition-colors w-full sm:w-auto"
          >
            <RefreshCcw className="w-3 h-3 mr-3" /> Try Again
          </button>
          
          <Link 
            href="/" 
            className="inline-flex items-center justify-center h-12 px-8 border border-border hover:border-[#cfae70] text-muted-foreground hover:text-foreground text-[10px] uppercase font-bold tracking-[0.2em] transition-colors bg-transparent w-full sm:w-auto"
          >
            <ArrowLeft className="w-3 h-3 mr-3" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
