import Reveal from "./Reveal";
import ArchivalLabel from "./ArchivalLabel";

const faqs = [
  {
    q: "How much does this cost?",
    a: "Starter is $1,100/mo (part-time, ~20 hrs/week). Standard is $2,000/mo (full-time, ~40 hrs/week). Firm is $1,850/mo per additional FTE for firms needing 3+ dedicated staff. No setup fees, no long-term contract — month-to-month, cancel with 30 days' notice.",
  },
  {
    q: "Do I have to sign a contract?",
    a: "No. Month-to-month, cancel anytime with 30 days' notice.",
  },
  {
    q: "What happens after the trial?",
    a: "The trial is $295 flat for two weeks on your real books — not free. If you continue past the trial, that $295 is credited toward your first month, so it's not an extra cost on top of your plan.",
  },
  {
    q: "Do I need to set up anything special?",
    a: "No. Your bookkeeper works inside the software you already use. You'll grant them access the same way you would a new hire — nothing new to install or configure on your end.",
  },
  {
    q: "What software do your bookkeepers use?",
    a: "QuickBooks Online and Xero are the most common. If your firm uses something else, mention it on the scoping call and we'll confirm fit before matching you.",
  },
  {
    q: "How is this different from hiring from the Philippines or India?",
    a: "The work itself can look similar. The difference is the clock: a Philippines-based hire is typically 12–13 hours ahead of U.S. business hours, so a question you send in the afternoon gets answered the next morning at best. Our bookkeepers are based in Latin America, which overlaps EST/CST — so a question sent during your work day usually gets answered the same day.",
  },
  {
    q: "Why aren't you cheaper than offshore providers in India?",
    a: "Cheaper offshore pricing (roughly $1,200–$2,000/mo) often comes from higher staff turnover and no real-time overlap with U.S. business hours. We price at parity with the more established Philippines-based providers, because the value we're selling is same-business-day collaboration — not being the cheapest option on the page.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-hairline px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <ArchivalLabel className="mb-3 block text-center">
            Fig. 06 — FAQ
          </ArchivalLabel>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-12 space-y-4">
          {faqs.map((f) => (
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
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
