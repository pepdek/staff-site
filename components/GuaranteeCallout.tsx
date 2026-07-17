import LedgerCard from "./LedgerCard";
import ArchivalLabel from "./ArchivalLabel";

// TODO: guarantee terms below are a placeholder policy — needs sign-off
// on the exact terms (what counts as "not the right fit," refund
// mechanics, timing) before launch.
export default function GuaranteeCallout({ className = "" }: { className?: string }) {
  return (
    <LedgerCard className={`border-accent p-6 text-center ${className}`}>
      <p className="text-base font-medium text-ink">
        Not the right fit in your first 30 days? We&apos;ll match you with
        someone else at no additional cost, or refund the difference.
      </p>
      <ArchivalLabel className="mt-2 block">
        Placeholder policy — pending sign-off on exact terms
      </ArchivalLabel>
    </LedgerCard>
  );
}
