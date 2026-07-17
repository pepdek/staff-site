"use client";

import { useEffect, useRef, useState } from "react";

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
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
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const from = useRef(0);

  // Re-animates from the previous displayed value whenever `value` changes
  // (calculator inputs), and animates from 0 on first scroll-into-view
  // (static stats like the hero trust bar).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      const start = performance.now();
      const startValue = from.current;
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
      animate();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
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
