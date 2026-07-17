import Reveal from "./Reveal";

const faqs = [
  {
    q: "What if it doesn't work out?",
    a: "You start with a 2-week trial on your actual books before committing to anything ongoing. After that, there are no long-term contracts — you can end the engagement with a month's notice at any point.",
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
];

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>
        <div className="mt-12 space-y-4">
          {faqs.map((f) => (
            <Reveal key={f.q}>
              <details className="glass-card group rounded-xl px-6 py-5">
                <summary className="cursor-pointer list-none text-base font-medium text-white marker:content-none">
                  <span className="flex items-center justify-between">
                    {f.q}
                    <span className="ml-4 text-white/40 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
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
