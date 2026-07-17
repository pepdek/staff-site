import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Meridian",
  description: "How Meridian collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy — Meridian",
    description: "How Meridian collects, uses, and protects your information.",
    type: "website",
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Last updated: [DATE] — first-draft template, pending legal review.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-muted">
          <section>
            <h2 className="text-lg font-semibold text-ink">Information we collect</h2>
            <p className="mt-2">
              When you use our calculator, intake wizard, guide, checklist,
              or application forms, we collect the information you submit
              directly: name, email, phone (if provided), firm or
              candidate details, and your answers to qualifying questions.
              We also collect standard web analytics (pages visited,
              interactions) via our analytics provider — see &quot;Analytics&quot;
              below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">How we use it</h2>
            <p className="mt-2">
              We use the information you provide to respond to inquiries,
              schedule calls and trials, evaluate applications, send the
              content you requested (guides, checklists), and improve this
              site. We do not sell your information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Analytics</h2>
            <p className="mt-2">
              We use privacy-respecting analytics (no cross-site tracking,
              no cookies used for advertising) to understand how visitors
              use this site. See the README in our public repository for
              the specific events we track.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Data retention</h2>
            <p className="mt-2">
              We retain submitted information for as long as reasonably
              necessary to respond to your inquiry or, if you become a
              client or placed candidate, for the duration of that
              relationship and as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Your rights</h2>
            <p className="mt-2">
              You can request a copy of the information we hold about you,
              ask us to correct it, or ask us to delete it, by emailing the
              address in our footer.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              Questions about this policy? Contact us using the email
              address in the footer of this site.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
