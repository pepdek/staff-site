"use client";

import { useState } from "react";
import LedgerCard from "./LedgerCard";
import type { ChecklistSection } from "@/lib/checklist";

function Section({ section }: { section: ChecklistSection }) {
  return (
    <LedgerCard className="p-6">
      <h3 className="text-base font-semibold text-ink">{section.title}</h3>
      <ul className="mt-3 space-y-2">
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-hairline text-[10px]">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </LedgerCard>
  );
}

export default function GatedChecklist({
  sections,
  source,
  unlockCopy,
}: {
  sections: ChecklistSection[];
  source: string;
  unlockCopy: string;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const [visibleSection, ...gatedSections] = sections;

  async function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    // Reveal immediately — the POST below is fire-and-forget for lead capture,
    // not a gate the user has to wait on (same pattern as /guide).
    setUnlocked(true);

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong, but the checklist is still unlocked.");
      setStatus("error");
    } else {
      setStatus("idle");
    }
  }

  function handleDownloadPdf() {
    // ponytail: window.print() is the native "save as PDF" flow every
    // browser already ships — same approach as the /guide download,
    // avoids adding a PDF-generation dependency for one button.
    window.print();
  }

  return (
    <div>
      <div className="space-y-4">
        <Section section={visibleSection} />
      </div>

      <div className="relative mt-4">
        <div className={`space-y-4 ${unlocked ? "" : "select-none blur-sm"}`}>
          {gatedSections.map((section) => (
            <Section key={section.title} section={section} />
          ))}
        </div>

        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-paper/70 backdrop-blur-[2px] print:hidden">
            <form onSubmit={handleUnlock} className="mx-4 w-full max-w-sm">
              <LedgerCard className="p-6 text-center">
                <p className="text-sm font-medium text-ink">{unlockCopy}</p>
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
                  Unlock the full checklist
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
