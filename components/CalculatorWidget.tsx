"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GlassCard from "./GlassCard";
import CountUpNumber from "./CountUpNumber";
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
      <GlassCard className="grid gap-8 p-8 md:grid-cols-2 md:gap-10 md:p-10">
        <div className="space-y-6">
          <div>
            <label className="mb-2 block text-sm text-white/70">Firm size</label>
            <select
              value={firmSize}
              onChange={(e) => setFirmSize(e.target.value as FirmSize)}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-accent-light"
            >
              {Object.entries(FIRM_SIZE_LABELS).map(([value, label]) => (
                <option key={value} value={value} className="bg-navy">
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Current monthly close time:{" "}
              <span className="font-semibold text-white">
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
            <label className="mb-2 block text-sm text-white/70">
              Current bookkeeping cost
            </label>
            <div className="mb-3 flex overflow-hidden rounded-lg border border-white/10">
              <button
                type="button"
                onClick={() => setCostMode("in-house")}
                className={`flex-1 px-4 py-2 text-sm transition-colors ${
                  costMode === "in-house"
                    ? "bg-accent text-white"
                    : "bg-white/5 text-white/60 hover:text-white"
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
                    : "bg-white/5 text-white/60 hover:text-white"
                }`}
              >
                Already outsourcing
              </button>
            </div>

            {costMode === "in-house" ? (
              <div>
                <label className="mb-1 block text-xs text-white/50">
                  Annual salary
                </label>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={inHouseSalary}
                  onChange={(e) => setInHouseSalary(Number(e.target.value))}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-accent-light"
                />
              </div>
            ) : (
              <div>
                <label className="mb-1 block text-xs text-white/50">
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
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none focus:border-accent-light"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 md:gap-3">
          {columns.map((col) => (
            <div
              key={col.label}
              className={`rounded-xl border p-4 ${
                col.label.startsWith("Meridian")
                  ? "border-accent/40 bg-accent/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="text-xs font-medium uppercase tracking-wide text-white/50">
                {col.label}
              </div>
              <div className="mt-2 text-2xl font-semibold text-white">
                <CountUpNumber value={Math.round(col.monthlyCost)} format="currency" />
                <span className="text-sm font-normal text-white/50">/mo</span>
              </div>
              <div className="mt-1 text-sm text-white/60">
                <CountUpNumber value={col.closeDays} /> business
                days to close
              </div>
              <div
                className={`mt-1 text-sm font-medium ${
                  col.sameDayResponse ? "text-accent-light" : "text-white/40"
                }`}
              >
                {col.sameDayResponse ? "✓ Same-day response" : "✕ Same-day response"}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="mt-6 p-8 text-center">
        <p className="text-lg text-white/80">
          You could save{" "}
          <span className="font-display text-2xl font-semibold text-accent-light">
            <CountUpNumber value={result.annualSavingsVsCurrent} format="currency" />
            /year
          </span>{" "}
          and close{" "}
          <span className="font-display text-2xl font-semibold text-accent-light">
            <CountUpNumber value={result.daysFasterVsCurrent} />
          </span>{" "}
          days faster with Meridian.
        </p>
        <Link
          href="/#contact"
          className="btn-primary mt-6 inline-block rounded-lg px-6 py-3 text-base font-medium text-white"
        >
          Get this exact setup — book a call
        </Link>
      </GlassCard>
    </div>
  );
}
