import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Meridian",
  description: "The terms governing use of Meridian's services and this website.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service — Meridian",
    description: "The terms governing use of Meridian's services and this website.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-paper">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-20">
        {/*
          FIRST-DRAFT TEMPLATE — requires legal review before launch. This
          is a real document a real visitor may read, not placeholder
          copy; see README "Pre-launch checklist."
        */}
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Last updated: [DATE] — first-draft template, pending legal review.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
          <section>
            <h2 className="text-lg font-semibold text-ink">Overview</h2>
            <p className="mt-2">
              These terms govern your use of this website and your
              engagement with Meridian for bookkeeping and staff-accountant
              staffing services. By submitting a form or starting a trial,
              you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Services</h2>
            <p className="mt-2">
              Meridian matches U.S. accounting and bookkeeping firms with
              dedicated, timezone-matched bookkeepers and staff
              accountants. Pricing is published on our{" "}
              <a href="/#pricing" className="text-accent underline">
                pricing page
              </a>
              . Engagements are month-to-month; either party may end an
              engagement with 30 days&apos; notice, per our published
              cancellation policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Trial period</h2>
            <p className="mt-2">
              The paid trial ($295 flat, two weeks) is described on our{" "}
              <a href="/#faq" className="text-accent underline">
                FAQ
              </a>
              . If you continue past the trial, that fee is credited toward
              your first month, per the terms in effect at the time of your
              trial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Client data and confidentiality</h2>
            <p className="mt-2">
              Any client financial data shared with Meridian or a matched
              bookkeeper/staff accountant is treated as confidential and
              used solely to perform the contracted services. NDAs are
              signed prior to engagement start.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Limitation of liability</h2>
            <p className="mt-2">
              Meridian provides staffing and matching services; final
              review and sign-off of financial records remains the
              responsibility of the client firm. Meridian&apos;s liability
              for any claim arising from these services is limited to the
              fees paid in the preceding three months.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Changes to these terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of
              this site or our services after changes take effect
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about these terms? Contact us using the email
              address in the footer of this site.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
