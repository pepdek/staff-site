"use client";

import { useState } from "react";

const FIRM_SIZES = [
  "Solo practitioner",
  "2–5 people",
  "6–10 people",
  "11+ people",
];

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setStatus("success");
      form.reset();
    } else {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass-card rounded-2xl p-8 text-center">
        <h3 className="text-lg font-semibold text-white">
          Thanks — we&apos;ll be in touch shortly.
        </h3>
        <p className="mt-2 text-sm text-white/60">
          We typically respond within one business day to schedule your call.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card grid gap-4 rounded-2xl p-8 text-left"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-white/70" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-accent-light"
            placeholder="Jane Rivera"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-accent-light"
            placeholder="jane@yourfirm.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70" htmlFor="firmSize">
          Firm size
        </label>
        <select
          id="firmSize"
          name="firmSize"
          required
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-accent-light"
          defaultValue=""
        >
          <option value="" disabled>
            Select firm size
          </option>
          {FIRM_SIZES.map((size) => (
            <option key={size} value={size} className="bg-navy">
              {size}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm text-white/70" htmlFor="painPoint">
          What&apos;s the most painful part of your monthly close right now? (optional)
        </label>
        <textarea
          id="painPoint"
          name="painPoint"
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-white/30 outline-none focus:border-accent-light"
          placeholder="e.g. Reconciling multiple bank feeds always takes forever"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary rounded-lg px-6 py-3 text-base font-medium text-white disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Book a 15-minute call"}
      </button>
    </form>
  );
}
