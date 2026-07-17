import Reveal from "./Reveal";

export interface FAQItem {
  q: string;
  a: string;
}

export default function FAQList({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-4">
      {items.map((f) => (
        <Reveal key={f.q}>
          <details className="ledger-card group rounded-xl px-6 py-5">
            <summary className="cursor-pointer list-none text-base font-medium text-ink marker:content-none">
              <span className="flex items-center justify-between">
                {f.q}
                <span className="ml-4 text-ink-muted transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
