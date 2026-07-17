"use client";

import { useState } from "react";
import { COMPARISON_ROWS } from "@/lib/guide";

const VISIBLE_ROWS_WHEN_LOCKED = 2;

function Row({ row }: { row: (typeof COMPARISON_ROWS)[number] }) {
  return (
    <div className="grid grid-cols-4 gap-4 border-t border-white/5 px-6 py-4 text-sm">
      <div className="font-medium text-white">{row.label}</div>
      <div className="text-white/60">{row.inHouse}</div>
      <div className="text-white/60">{row.offshore}</div>
      <div className="text-accent-light">{row.meridian}</div>
    </div>
  );
}

export default function GuideTable() {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const visibleRows = COMPARISON_ROWS.slice(0, VISIBLE_ROWS_WHEN_LOCKED);
  const gatedRows = COMPARISON_ROWS.slice(VISIBLE_ROWS_WHEN_LOCKED);

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    // Reveal immediately — the POST below is fire-and-forget for lead capture,
    // not a gate the user has to wait on.
    setUnlocked(true);

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source: "guide" }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong, but the guide is still unlocked.");
      setStatus("error");
    } else {
      setStatus("idle");
    }
  }

  function handleDownloadPdf() {
    // ponytail: window.print() is the native "save as PDF" flow every
    // browser already ships — avoids adding a PDF-generation dependency
    // (e.g. jspdf) for one button. If a styled, non-print-dialog download
    // is required later, add a PDF library here.
    window.print();
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <div className="grid grid-cols-4 gap-4 bg-white/5 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-white/50">
          <div />
          <div>In-house</div>
          <div>Philippines / offshore</div>
          <div>LatAm / Meridian</div>
        </div>

        {visibleRows.map((row) => (
          <Row key={row.label} row={row} />
        ))}
      </div>

      <div className="relative mt-8">
        <div
          className={unlocked ? "" : "select-none blur-sm"}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {gatedRows.map((row) => (
              <Row key={row.label} row={row} />
            ))}
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-white/70">
          <p>
            Monthly close runs on back-and-forth: a reconciling item flagged,
            a coding question answered, a variance explained. When your
            bookkeeper works your business hours, that back-and-forth happens
            in one working day. When they don&apos;t, each exchange costs a
            full day of latency — and close workflows have several of these
            exchanges per cycle.
          </p>
          <p>
            The Philippines became the default outsourcing destination over
            the last decade for real reasons: a large English-speaking labor
            pool, established BPO infrastructure, and lower costs than
            onshore hiring. None of that addressed the timezone gap — it was
            simply the tradeoff firms accepted to get the cost savings.
          </p>
          <p>
            What&apos;s changed is that close itself has moved to the cloud.
            QuickBooks Online and Xero make it possible for a bookkeeper
            anywhere to work inside your live books in real time, not batch
            files sent overnight. That shift makes timezone overlap — not
            just cost — the variable that determines how fast close actually
            runs.
          </p>
          </div>
        </div>

        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy/70 backdrop-blur-[2px] print:hidden">
            <form
              onSubmit={handleUnlock}
              className="glass-card mx-4 w-full max-w-sm rounded-xl p-6 text-center"
            >
              <p className="text-sm font-medium text-white">
                Unlock the full guide
              </p>
              <p className="mt-1 text-xs text-white/50">
                5 more comparison rows, plus the full breakdown below.
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourfirm.com"
                className="mt-4 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-accent-light"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary mt-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
              >
                Unlock the full guide
              </button>
              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </form>
          </div>
        )}
      </div>

      {unlocked && (
        <div className="mt-6 flex justify-end print:hidden">
          <button
            onClick={handleDownloadPdf}
            className="rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 hover:border-white/30 hover:text-white"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
