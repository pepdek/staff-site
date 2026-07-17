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
- **Pricing tiers** (`components/Pricing.tsx`) — Starter/Standard/Firm price ranges are examples, not confirmed costs.
- **Calculator benchmark data** (`lib/calculator.ts`) — offshore/Meridian monthly cost ranges, base close-day estimates, the in-house overhead multiplier, and the offshore close-time penalty are all illustrative, not verified. See the `TODO` at the top of the file.
- **Guide comparison data** (`lib/guide.ts`) — every cost range, response-time claim, and setup-time estimate in `COMPARISON_ROWS` is illustrative, not verified. See the `TODO` at the top of the file.
- **Guide PDF export** (`components/GuideTable.tsx`) — uses the browser's native print-to-PDF (`window.print()`) rather than a PDF library. Fine for a print-styled export; swap in a library (e.g. `jspdf`) if a non-print-dialog download is required.
- **Contact/from email addresses** — `founders@example.com` (default lead notification address), `leads@example.com` (Resend "from" address), `hello@example.com` (footer) in `app/api/lead/route.ts` and `components/Footer.tsx`.
- **Status dashboard** (`components/HowItWorks.tsx`, step 4) — copy says "coming soon" since no real dashboard exists yet; update once built.
- **Privacy/Terms links** (`components/Footer.tsx`) — currently `#` placeholders.
