"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center space-y-4">
      <h1 className="text-2xl font-fraunces font-bold">Something went wrong</h1>
      <p className="text-muted-foreground">We apologize for the inconvenience.</p>
      <div className="flex gap-3 justify-center">
        <Button onClick={reset}>Try Again</Button>
        <Button asChild variant="outline"><Link href="/">Go Home</Link></Button>
      </div>
    </div>
  );
}
