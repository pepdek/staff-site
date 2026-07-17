"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
] as const;

// Pill-style switch, not a dropdown — flips the route's locale in place.
// Persistence across visits and initial browser-language detection are
// both handled by next-intl's middleware (NEXT_LOCALE cookie +
// Accept-Language negotiation), not hand-rolled localStorage — the
// library already does exactly this, so duplicating it would just be
// two sources of truth for the same thing.
export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-hairline p-0.5">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: l.code })}
          aria-current={locale === l.code}
          className={`font-label rounded-full px-2.5 py-1 text-xs uppercase tracking-widest transition-colors ${
            locale === l.code
              ? "bg-accent text-white"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
