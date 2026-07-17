// The one glass moment in this system — reserved for the calculator's
// result panel. Every other card in the site should use LedgerCard instead.
export default function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass-panel rounded-xl ${className}`}>{children}</div>
  );
}
