import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://staff.pepdekker.com";

// English-language URLs only — /join and /academy's /es and /pt variants
// are intentionally omitted here; add hreflang alternates if those need
// to be indexed separately later.
const ROUTES = [
  "",
  "/calculator",
  "/guide",
  "/bookkeeper",
  "/staff-accountant",
  "/checklist",
  "/pilot-readiness",
  "/join",
  "/academy",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
