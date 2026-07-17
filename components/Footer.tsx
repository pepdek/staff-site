export default function Footer() {
  return (
    <footer className="bg-navy-deep px-6 py-10 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
        {/* TODO: replace "Meridian" and contact email once finalized */}
        <span>© {new Date().getFullYear()} Meridian. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/80">
            Privacy
          </a>
          <a href="#" className="hover:text-white/80">
            Terms
          </a>
          <a href="mailto:hello@example.com" className="hover:text-white/80">
            hello@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}
