"use client";

import { useState } from "react";

export default function FlipCard({
  front,
  back,
  className = "",
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    // A native <button> gets keyboard activation (Enter/Space) and the
    // aria-expanded state change announced by screen readers for free —
    // hover/focus-within alone (the old implementation) flips the card
    // visually on focus but never on a keyboard press, and never tells
    // assistive tech that anything changed.
    <button
      type="button"
      aria-expanded={flipped}
      onClick={() => setFlipped((f) => !f)}
      className={`flip-card h-full w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      <div className={`flip-card-inner ${flipped ? "flip-card-flipped" : ""}`}>
        <div className="flip-card-face flip-card-front ledger-card flex h-full flex-col justify-center rounded-xl p-6">
          {front}
        </div>
        <div className="flip-card-face flip-card-back ledger-card flex h-full flex-col justify-center rounded-xl bg-accent-light p-6">
          {back}
        </div>
      </div>
    </button>
  );
}
