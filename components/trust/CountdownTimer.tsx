"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
  onExpire?: () => void;
  hideOnExpire?: boolean;
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function CountdownTimer({
  targetDate,
  className,
  onExpire,
  hideOnExpire = false,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate);

    const tick = () => {
      const remaining = getTimeLeft(target);
      setTimeLeft(remaining);
      return remaining;
    };

    if (!tick()) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      if (!tick()) {
        clearInterval(interval);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (!mounted) {
    return (
      <div
        className={cn("flex items-center gap-1 font-mono text-sm font-semibold min-h-6", className)}
        aria-hidden
      />
    );
  }

  if (!timeLeft) {
    if (hideOnExpire) return null;
    return <span className={cn("text-sm font-medium", className)}>Offer ended</span>;
  }

  const units = [
    { value: timeLeft.days, label: "d" },
    { value: timeLeft.hours, label: "h" },
    { value: timeLeft.minutes, label: "m" },
    { value: timeLeft.seconds, label: "s" },
  ];

  return (
    <div
      className={cn("flex items-center gap-1 font-mono text-sm font-semibold", className)}
      role="timer"
      aria-live="polite"
      suppressHydrationWarning
    >
      {units.map((unit, i) => (
        <span key={unit.label} className="flex items-center">
          {i > 0 && <span className="mx-0.5 opacity-60">:</span>}
          <span className="bg-background/20 rounded px-1.5 py-0.5 min-w-[2ch] text-center">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-xs ml-0.5 opacity-80">{unit.label}</span>
        </span>
      ))}
    </div>
  );
}
