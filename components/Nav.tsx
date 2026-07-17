import Link from "next/link";
import LanguageToggle from "./LanguageToggle";

export default function Nav({ talentNav = false }: { talentNav?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur-sm print:hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* TODO: replace "Meridian" with final company name across this file, Footer.tsx, and app/layout.tsx metadata */}
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Meridian
        </Link>
        <div className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-ink">
              Who we place
            </button>
            <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
              <div className="w-56 overflow-hidden rounded-xl border border-hairline bg-paper shadow-lg">
                <Link
                  href="/bookkeeper"
                  className="block px-4 py-3 text-sm text-ink-muted hover:bg-accent-light hover:text-ink"
                >
                  Bookkeeper
                </Link>
                <Link
                  href="/staff-accountant"
                  className="block px-4 py-3 text-sm text-ink-muted hover:bg-accent-light hover:text-ink"
                >
                  Staff Accountant
                </Link>
              </div>
            </div>
          </div>
          <Link href="/#how-it-works" className="hover:text-ink">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-ink">
            Pricing
          </Link>
          <Link href="/calculator" className="hover:text-ink">
            Calculator
          </Link>
          <Link href="/guide" className="hover:text-ink">
            Guide
          </Link>
          <Link href="/#faq" className="hover:text-ink">
            FAQ
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {/* Language toggle only ever renders on talent-facing pages (/join, /academy) — talentNav is only passed true from within app/[locale]. */}
          {talentNav && <LanguageToggle />}
          {!talentNav && (
            <Link
              href="/join"
              className="hidden text-sm text-ink-muted hover:text-ink sm:inline"
            >
              For talent
            </Link>
          )}
          <Link
            href="/#contact"
            className="btn-primary rounded-lg px-4 py-2 text-sm font-medium"
          >
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  );
}
