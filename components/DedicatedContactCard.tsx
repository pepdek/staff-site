import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

// TODO: placeholder name/photo — replace with real team info before launch.
export default function DedicatedContactCard() {
  return (
    <LedgerCard className="flex items-center gap-4 p-6">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent-light font-label text-xs uppercase tracking-widest text-ink-muted">
        Photo
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">Your dedicated contact</p>
        <p className="mt-1 text-sm text-ink-muted">
          You&apos;ll work directly with [Name] from day one — not a
          rotating support queue.
        </p>
        <ArchivalLabel className="mt-1 block">
          Placeholder — pending real team assignment
        </ArchivalLabel>
      </div>
    </LedgerCard>
  );
}
