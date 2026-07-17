import Link from "next/link";
import Reveal from "./Reveal";
import LedgerCard from "./LedgerCard";

const roles = [
  {
    href: "/bookkeeper",
    title: "Hiring a bookkeeper",
    body: "Transaction coding, reconciliations, GL maintenance, AP/AR — for firms drowning in day-to-day bookkeeping.",
  },
  {
    href: "/staff-accountant",
    title: "Outsourcing month-end close",
    body: "Month-end close, journal entries, supporting schedules — for firms whose close slips every month.",
  },
];

export default function RoleCoverage() {
  return (
    <section className="border-t border-hairline px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-center text-sm text-ink-muted">
            Looking for a specific role?
          </p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <Reveal key={role.href}>
              <Link href={role.href}>
                <LedgerCard className="h-full p-6">
                  <h3 className="text-base font-semibold text-ink">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {role.body}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-accent">
                    Learn more →
                  </span>
                </LedgerCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
