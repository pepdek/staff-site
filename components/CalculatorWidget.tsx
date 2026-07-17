"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import LedgerCard from "./LedgerCard";
import GlassCard from "./GlassCard";
import CountUpNumber from "./CountUpNumber";
import ArchivalLabel from "./ArchivalLabel";
import {
  calculate,
  FIRM_SIZE_LABELS,
  type CostMode,
  type FirmSize,
} from "@/lib/calculator";

export default function CalculatorWidget() {
  const [firmSize, setFirmSize] = useState<FirmSize>("small");
  const [closeDays, setCloseDays] = useState(8);
  const [costMode, setCostMode] = useState<CostMode>("in-house");
  const [inHouseSalary, setInHouseSalary] = useState(55000);
  const [outsourcingMonthlyCost, setOutsourcingMonthlyCost] = useState(1800);

  const result = useMemo(
    () =>
      calculate({
        firmSize,
        closeDays,
        costMode,
        inHouseSalary,
        outsourcingMonthlyCost,
      }),
    [firmSize, closeDays, costMode, inHouseSalary, outsourcingMonthlyCost]
  );

  const columns = [result.inHouse, result.offshore, result.meridian];

  return (
    <div>
      <LedgerCard className="grid gap-8 p-8 md:grid-cols-2 md:gap-10 md:p-10">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-ink-muted">
              Firm size
            </label>
            <select
              value={firmSize}
              onChange={(e) => setFirmSize(e.target.value as FirmSize)}
              className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink outline-none focus:border-accent"
            >
              {Object.entries(FIRM_SIZE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-ink-muted">
              Current monthly close time:{" "}
              <span className="font-semibold text-ink">
                {closeDays} business day{closeDays === 1 ? "" : "s"}
              </span>
            </label>
            <input
              type="range"
              min={1}
              max={15}
              value={closeDays}
              onChange={(e) => setCloseDays(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-ink-muted">
              Current bookkeeping cost
            </label>
            <div className="mb-3 flex overflow-hidden rounded-lg border border-hairline">
              <button
                type="button"
                onClick={() => setCostMode("in-house")}
                className={`flex-1 px-4 py-2 text-sm transition-colors ${
                  costMode === "in-house"
                    ? "bg-accent text-white"
                    : "bg-paper text-ink-muted hover:text-ink"
                }`}
              >
                In-house employee
              </button>
              <button
                type="button"
                onClick={() => setCostMode("outsourcing")}
                className={`flex-1 px-4 py-2 text-sm transition-colors ${
                  costMode === "outsourcing"
                    ? "bg-accent text-white"
                    : "bg-paper text-ink-muted hover:text-ink"
                }`}
              >
                Already outsourcing
              </button>
            </div>

            {costMode === "in-house" ? (
              <div>
                <label className="mb-1 block text-xs text-ink-muted">
                  Annual salary
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={inHouseSalary}
                  onChange={(e) => setInHouseSalary(Number(e.target.value))}
                  className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink outline-none focus:border-accent"
                />
              </div>
            ) : (
              <div>
                <label className="mb-1 block text-xs text-ink-muted">
                  Current monthly cost
                </label>
                <input
                  type="number"
                  min={0}
                  step={50}
                  value={outsourcingMonthlyCost}
                  onChange={(e) =>
                    setOutsourcingMonthlyCost(Number(e.target.value))
                  }
                  className="w-full rounded-lg border border-hairline bg-paper px-4 py-2.5 text-ink outline-none focus:border-accent"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid divide-y divide-hairline border border-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:grid-cols-1 md:divide-x-0 md:divide-y">
          {columns.map((col) => (
            <div
              key={col.label}
              className={`p-4 ${col.label.startsWith("Meridian") ? "bg-accent-light" : ""}`}
            >
              <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">
                {col.label}
              </div>
              <div className="mt-2 text-2xl font-semibold text-ink">
                <CountUpNumber value={Math.round(col.monthlyCost)} format="currency" />
                <span className="text-sm font-normal text-ink-muted">/mo</span>
              </div>
              <div className="mt-1 text-sm text-ink-muted">
                <CountUpNumber value={col.closeDays} /> business days to close
              </div>
              <div
                className={`mt-1 text-sm font-medium ${
                  col.sameDayResponse ? "text-accent" : "text-ink-muted"
                }`}
              >
                {col.sameDayResponse ? "✓ Same-day response" : "✕ Same-day response"}
              </div>
              <ArchivalLabel className="mt-2 block">
                {col.costSourceLabel}
              </ArchivalLabel>
            </div>
          ))}
        </div>
      </LedgerCard>

      {/* The one glass moment in this system — do not extend this treatment elsewhere. */}
      <GlassCard className="mt-6 p-8 text-center">
        <p className="text-lg text-ink">
          You could save{" "}
          <span className="font-display text-2xl font-semibold text-accent">
            <CountUpNumber value={result.annualSavingsVsCurrent} format="currency" />
            /year
          </span>{" "}
          and close{" "}
          <span className="font-display text-2xl font-semibold text-accent">
            <CountUpNumber value={result.daysFasterVsCurrent} />
          </span>{" "}
          days faster with Meridian.
        </p>
        <ArchivalLabel className="mt-2 block">
          Estimate based on the published figures above, not a fixed quote
        </ArchivalLabel>
        <Link
          href="/#contact"
          className="btn-primary mt-6 inline-block rounded-lg px-6 py-3 text-base font-medium"
        >
          Get this exact setup — book a call
        </Link>
      </GlassCard>
    </div>
  );
}
