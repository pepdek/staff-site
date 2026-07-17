import Link from "next/link";

// NEXT_PUBLIC_CONTACT_EMAIL must be set to a real, monitored inbox before
// launch — this fallback is intentionally NOT a working address, so a
// missing env var is obvious in the rendered page rather than silently
// showing a fake-but-plausible email.
const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "SET-NEXT_PUBLIC_CONTACT_EMAIL@meridian.example";

export default function Footer() {
  return (
    <footer className="bg-navy-deep px-6 py-10 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
        {/* TODO: replace "Meridian" once finalized */}
        <span>© {new Date().getFullYear()} Meridian. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-white/80">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-white/80">
            Terms
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white/80">
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </footer>
  );
}
