export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-white/40 sm:flex-row">
        {/* TODO: replace "Meridian" and contact email once finalized */}
        <span>© {new Date().getFullYear()} Meridian. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/70">
            Privacy
          </a>
          <a href="#" className="hover:text-white/70">
            Terms
          </a>
          <a href="mailto:hello@example.com" className="hover:text-white/70">
            hello@example.com
          </a>
        </div>
      </div>
    </footer>
  );
}
