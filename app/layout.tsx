import type { Metadata } from "next";
import { Inter, Fraunces, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { MotionConfig } from "framer-motion";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-display",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-label",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://staff.pepdekker.com";

const TITLE = "Meridian — Same-business-day bookkeeping staff for U.S. CPA firms";
const DESCRIPTION =
  "Latin America-based bookkeepers who overlap your EST/CST business hours, so monthly close questions get answered same-day, not tomorrow.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Plausible only loads if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set — no
// external request fires in local dev/preview environments that haven't
// configured it. See README "Analytics events" for what's tracked.
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${plexMono.variable} font-sans antialiased`}
      >
        {/* reducedMotion="user" makes every motion.* component site-wide (Reveal, wizard step transitions) respect prefers-reduced-motion automatically. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
        {PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.tagged-events.outbound-links.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
