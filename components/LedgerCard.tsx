export default function LedgerCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ledger-card rounded-xl ${className}`}>{children}</div>
  );
}
