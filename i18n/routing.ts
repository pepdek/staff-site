import { defineRouting } from "next-intl/routing";

// Scoped deliberately to the talent-facing pages only (/join, /academy).
// Client-facing pages (/, /calculator, /guide, /bookkeeper,
// /staff-accountant) live outside app/[locale] entirely and are
// untouched by this — see middleware.ts's matcher.
export const routing = defineRouting({
  locales: ["en", "es", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed", // default locale (en) has no URL prefix: /join, /es/join, /pt/join
});
