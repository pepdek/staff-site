"use client";

import { useState } from "react";
import { COMPARISON_ROWS } from "@/lib/guide";
import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

const VISIBLE_ROWS_WHEN_LOCKED = 2;

function Row({ row }: { row: (typeof COMPARISON_ROWS)[number] }) {
  return (
    <div className="grid grid-cols-4 divide-x divide-hairline border-t border-hairline text-sm">
      <div className="px-6 py-4 font-medium text-ink">{row.label}</div>
      <div className="px-6 py-4 text-ink-muted">{row.inHouse}</div>
      <div className="px-6 py-4 text-ink-muted">{row.offshore}</div>
      <div className="px-6 py-4 text-accent">{row.meridian}</div>
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
      <div className="overflow-hidden rounded-xl border border-hairline">
        <div className="grid grid-cols-4 divide-x divide-hairline bg-accent-light/40 font-label text-xs uppercase tracking-widest text-ink-muted">
          <div className="px-6 py-4" />
          <div className="px-6 py-4">In-house</div>
          <div className="px-6 py-4">Philippines / offshore</div>
          <div className="px-6 py-4">LatAm / Meridian</div>
        </div>

        {visibleRows.map((row) => (
          <Row key={row.label} row={row} />
        ))}
      </div>

      <div className="relative mt-8">
        <div className={unlocked ? "" : "select-none blur-sm"}>
          <div className="overflow-hidden rounded-xl border border-hairline">
            {gatedRows.map((row) => (
              <Row key={row.label} row={row} />
            ))}
          </div>

          <ArchivalLabel className="mt-3 block">
            Illustrative estimate — figures are not independently verified,
            see README before launch
          </ArchivalLabel>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-ink-muted">
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
          <div className="absolute inset-0 flex items-center justify-center bg-paper/70 backdrop-blur-[2px] print:hidden">
            <form onSubmit={handleUnlock} className="mx-4 w-full max-w-sm">
              <LedgerCard className="p-6 text-center">
                <p className="text-sm font-medium text-ink">
                  Unlock the full guide
                </p>
                <p className="mt-1 text-xs text-ink-muted">
                  5 more comparison rows, plus the full breakdown below.
                </p>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourfirm.com"
                  className="mt-4 w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-sm text-ink placeholder-ink-muted/50 outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary mt-3 w-full rounded-lg px-4 py-2.5 text-sm font-medium disabled:opacity-60"
                >
                  Unlock the full guide
                </button>
                {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
              </LedgerCard>
            </form>
          </div>
        )}
      </div>

      {unlocked && (
        <div className="mt-6 flex justify-end print:hidden">
          <button
            onClick={handleDownloadPdf}
            className="rounded-lg border border-hairline px-5 py-2.5 text-sm font-medium text-ink-muted hover:border-ink-muted hover:text-ink"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
