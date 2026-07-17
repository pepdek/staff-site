"use client";

import { useEffect, useRef, useState } from "react";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

// ponytail: rAF + IntersectionObserver beats pulling in a counting-animation library for a handful of numbers.
// `format` is a string tag (not a callback) so this can be passed from server components.
export default function CountUpNumber({
  value,
  format,
  suffix = "",
  duration = 800,
}: {
  value: number;
  format?: "currency";
  suffix?: string;
  duration?: number;
}) {
  // Initialized to the real value, not 0 — if the IntersectionObserver
  // callback below never fires for any reason (unsupported browser,
  // element never crossing the threshold, a JS error elsewhere on the
  // page), the visitor still sees the correct number instead of a bare
  // "0+"/"0hr". The animation is a bonus, not something correctness
  // depends on.
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const from = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      setDisplay(value);
      from.current = value;
      return;
    }

    const animate = (startValue: number) => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const current = startValue + (value - startValue) * progress;
        setDisplay(current);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          from.current = value;
        }
      };
      requestAnimationFrame(tick);
    };

    if (seen.current) {
      // Value changed after first reveal (e.g. calculator inputs) —
      // animate from whatever was last displayed.
      animate(from.current);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      // No observer support: skip the animation, keep the correct value
      // already set as initial state.
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen.current = true;
          // Ramp up from a nearby lower number for a nice count-up
          // effect on first reveal — never from a hardcoded 0, so even
          // mid-animation the number reads as "close to right," not "0".
          animate(Math.round(value * 0.6));
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  const rounded = Math.round(display);

  return (
    <span ref={ref}>
      {format === "currency" ? formatCurrency(rounded) : `${rounded}${suffix}`}
    </span>
  );
}
