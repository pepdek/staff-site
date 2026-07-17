import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy/80 backdrop-blur-md print:hidden">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* TODO: replace "Meridian" with final company name across this file, Footer.tsx, and app/layout.tsx metadata */}
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-white"
        >
          Meridian
        </Link>
        <div className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <Link href="/#how-it-works" className="hover:text-white">
            How it works
          </Link>
          <Link href="/#pricing" className="hover:text-white">
            Pricing
          </Link>
          <Link href="/calculator" className="hover:text-white">
            Calculator
          </Link>
          <Link href="/guide" className="hover:text-white">
            Guide
          </Link>
          <Link href="/#faq" className="hover:text-white">
            FAQ
          </Link>
        </div>
        <Link
          href="/#contact"
          className="btn-primary rounded-lg px-4 py-2 text-sm font-medium text-white"
        >
          Book a call
        </Link>
      </nav>
    </header>
  );
}
