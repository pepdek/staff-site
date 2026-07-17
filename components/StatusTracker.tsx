import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

// TODO: "Reviewed within 3 business days" and the other timeframes below
// are placeholder timing pending real internal SLA data — confirm actual
// review/matching turnaround before launch.
const STAGES = [
  {
    title: "Applied",
    body: "We've received your application.",
    timeframe: "Confirmed immediately",
    done: true,
  },
  {
    title: "Assessment scheduled",
    body: "A short, paid skills assessment (1 hour, compensated at your quoted rate) gets scheduled.",
    timeframe: "Scheduled within 2 business days",
    done: false,
  },
  {
    title: "Assessment reviewed",
    body: "Your assessment is reviewed once — no separate client interview gauntlet.",
    timeframe: "Reviewed within 3 business days",
    done: false,
  },
  {
    title: "Matched with a firm",
    body: "You're matched with a firm whose hours and software fit your profile.",
    timeframe: "Timing depends on current firm demand",
    done: false,
  },
];

export default function StatusTracker() {
  return (
    <LedgerCard className="p-8">
      <ArchivalLabel className="mb-4 block">Your application status</ArchivalLabel>
      <div className="space-y-4">
        {STAGES.map((stage, i) => (
          <div
            key={stage.title}
            className={`flex gap-4 rounded-xl border px-5 py-4 ${
              stage.done ? "border-accent bg-accent-light" : "border-hairline"
            }`}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                stage.done ? "bg-accent text-white" : "bg-paper text-ink-muted"
              }`}
            >
              {stage.done ? "✓" : i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{stage.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{stage.body}</p>
              <ArchivalLabel className="mt-1 block">{stage.timeframe}</ArchivalLabel>
            </div>
          </div>
        ))}
      </div>
    </LedgerCard>
  );
}
