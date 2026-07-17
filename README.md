# Meridian — landing page

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. No
database — lead form posts to `/app/api/lead/route.ts`, which emails via
Resend if configured, or logs to console otherwise. The `/calculator` and
`/guide` pages post to the same endpoint with a `source` field so leads can
be told apart.

## Run locally

```bash
npm install
npm run dev
```

## Environment variables (optional)

Create `.env.local`:

```
RESEND_API_KEY=
LEAD_NOTIFICATION_EMAIL=
```

Without `RESEND_API_KEY`, submitted leads are just logged to the server
console (see the `TODO` in `app/api/lead/route.ts`).

## Placeholders to replace before launch

- **Company name "Meridian"** — appears in `components/Nav.tsx`, `components/Footer.tsx`, `app/layout.tsx` metadata, `app/calculator/page.tsx` and `app/guide/page.tsx` metadata, and the "from" address in `app/api/lead/route.ts`.
- **Hero trust-bar stats** (`components/Hero.tsx`) — "40+ firms onboarded", "<2hrs avg. response time", "6hr overlap" are all placeholder numbers, marked inline.
- **Pricing tiers** (`components/Pricing.tsx`) — Starter ($1,100/mo), Standard ($2,000/mo), Firm ($1,850/mo per additional FTE) are final published pricing, not placeholders.
- **Calculator competitor benchmarks** (`lib/calculator.ts`) — the in-house, offshore-India, and offshore-Philippines ranges are sourced from published competitor/industry pricing (TOA Global, QX Accounting, Entigrity, Madras Accountancy) as of mid-2026. These aren't Meridian's own numbers, so they should be periodically re-verified against those providers' current pricing pages — competitor pricing changes without notice. Base close-day estimates remain illustrative.
- **Guide comparison data** (`lib/guide.ts`) — the cost row is sourced (see `sourceLabel` on that row) and should stay in sync with `lib/calculator.ts`. The remaining qualitative rows (English fluency, GAAP familiarity, setup time, contract flexibility) are still illustrative — marked via `illustrative: true`.
- **Guide PDF export** (`components/GuideTable.tsx`) — uses the browser's native print-to-PDF (`window.print()`) rather than a PDF library. Fine for a print-styled export; swap in a library (e.g. `jspdf`) if a non-print-dialog download is required.
- **Contact/from email addresses** — `founders@example.com` (default lead notification address), `leads@example.com` (Resend "from" address), `hello@example.com` (footer) in `app/api/lead/route.ts` and `components/Footer.tsx`.
- **Status dashboard** (`components/HowItWorks.tsx`, step 4) — copy says "coming soon" since no real dashboard exists yet; update once built.
- **Privacy/Terms links** (`components/Footer.tsx`) — currently `#` placeholders.
- **`ArchivalLabel` source tags** — every stat, savings figure, and comparison-table row is annotated with an `ArchivalLabel` (see `components/ArchivalLabel.tsx`). Before launch, review each one and confirm it reads either "Illustrative estimate" (still a placeholder) or an actual source (e.g. "Source: BLS median, 2024") — don't ship a real figure still labeled as illustrative, or vice versa.
