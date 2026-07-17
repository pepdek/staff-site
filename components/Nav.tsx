import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-paper/90 backdrop-blur-sm print:hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* TODO: replace "Meridian" with final company name across this file, Footer.tsx, and app/layout.tsx metadata */}
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-ink">
          Meridian
        </Link>
        <div className="hidden items-center gap-8 text-sm text-ink-muted md:flex">
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
        <Link
          href="/#contact"
          className="btn-primary rounded-lg px-4 py-2 text-sm font-medium"
        >
          Book a call
        </Link>
      </nav>
    </header>
  );
}
