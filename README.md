# Meridian — landing page

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. No
database — client-side leads (`IntakeWizard`, the `/guide` gate) post to
`/app/api/lead/route.ts`; talent applications (`TalentWizard` on `/join`)
post to the separate `/app/api/talent-application/route.ts`. Both email
via Resend if configured, or log to console otherwise. Every lead
submission includes a `source` field (`wizard`, `guide`) so leads can be
told apart.

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
TALENT_NOTIFICATION_EMAIL=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

Without `RESEND_API_KEY`, submitted leads and talent applications are just
logged to the server console (see the `TODO`s in `app/api/lead/route.ts`
and `app/api/talent-application/route.ts`).

`NEXT_PUBLIC_CONTACT_EMAIL` is the footer's contact address
(`components/Footer.tsx`). **If unset, the footer renders a visibly fake
address** (`SET-NEXT_PUBLIC_CONTACT_EMAIL@meridian.example`) on purpose,
so a missing real inbox is obvious rather than silently shipping
`hello@example.com`.

`NEXT_PUBLIC_SITE_URL` is used for `metadataBase`, `sitemap.xml`, and
`robots.txt` — defaults to `https://staff.pepdekker.com` if unset.

`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` enables analytics (see below). Without it,
no analytics script loads at all — no external request fires in local
dev.

## Analytics events

Plausible (`app/layout.tsx`), loaded only if `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
is set. `lib/analytics.ts`'s `trackEvent()` is a safe no-op otherwise.
Which landing page a lead came from is covered by Plausible's built-in
pageview/referrer tracking — no custom event needed for that. Custom
events fired:

| Event | Fired when | Props |
|---|---|---|
| `Calculator: Input Changed` | Any calculator field changes (firm size, close-days slider on release, cost mode, salary/cost fields on blur) | `field` |
| `Calculator: CTA Clicked` | "Get this exact setup" clicked | `firmSize` |
| `IntakeWizard: Step Completed` | Advancing to the next step (not going back) | `step` |
| `IntakeWizard: Submitted` | Step 4 submits successfully | `firmSize`, `role` |
| `TalentWizard: Step Completed` | Same as above, talent side | `step` |
| `TalentWizard: Submitted` | Step 4 submits successfully | `role` |
| `Guide: Unlocked` | `/guide` email gate unlocked | — |
| `Checklist: Unlocked` | `/checklist` or `/pilot-readiness` email gate unlocked | `source` |
| `Checklist: Downloaded` | "Download as PDF" clicked on either checklist page | `source` |

## Placeholders to replace before launch

- **Company name "Meridian"** — appears in `components/Nav.tsx`, `components/Footer.tsx`, `app/layout.tsx` metadata, `app/calculator/page.tsx` and `app/guide/page.tsx` metadata, and the "from" address in `app/api/lead/route.ts`.
- **Hero trust-bar stats** (`components/Hero.tsx`) — "40+ firms onboarded", "<2hrs avg. response time", "6hr overlap" are all placeholder numbers, marked inline.
- **Pricing tiers** (`components/Pricing.tsx`) — Starter ($1,100/mo), Standard ($2,000/mo), Firm ($1,850/mo per additional FTE) are final published pricing, not placeholders.
- **Calculator competitor benchmarks** (`lib/calculator.ts`) — the in-house, offshore-India, and offshore-Philippines ranges are sourced from published competitor/industry pricing (TOA Global, QX Accounting, Entigrity, Madras Accountancy) as of mid-2026. These aren't Meridian's own numbers, so they should be periodically re-verified against those providers' current pricing pages — competitor pricing changes without notice. Base close-day estimates remain illustrative.
- **Guide comparison data** (`lib/guide.ts`) — the cost row is sourced (see `sourceLabel` on that row) and should stay in sync with `lib/calculator.ts`. The remaining qualitative rows (English fluency, GAAP familiarity, setup time, contract flexibility) are still illustrative — marked via `illustrative: true`.
- **Guide PDF export** (`components/GuideTable.tsx`) — uses the browser's native print-to-PDF (`window.print()`) rather than a PDF library. Fine for a print-styled export; swap in a library (e.g. `jspdf`) if a non-print-dialog download is required.
- **Contact/from email addresses** — `founders@example.com` (default lead notification address), `leads@example.com` (Resend "from" address) in `app/api/lead/route.ts`. The footer's contact email is no longer a hardcoded placeholder — see `NEXT_PUBLIC_CONTACT_EMAIL` above.
- **Status dashboard** (`components/HowItWorks.tsx`, step 4) — copy says "coming soon" since no real dashboard exists yet; update once built.
- **`/privacy` and `/terms`** — real first-draft pages now exist (`app/privacy/page.tsx`, `app/terms/page.tsx`), linked from the footer. **These are first-draft templates, not placeholder text — a real visitor may read them — and require legal review before launch**, same as any other real legal document. See "Pre-launch checklist" below.
- **`ArchivalLabel` source tags** — every stat, savings figure, and comparison-table row is annotated with an `ArchivalLabel` (see `components/ArchivalLabel.tsx`). Before launch, review each one and confirm it reads either "Illustrative estimate" (still a placeholder) or an actual source (e.g. "Source: BLS median, 2024") — don't ship a real figure still labeled as illustrative, or vice versa.
- **Intake wizard qualifying questions** (`components/IntakeWizard.tsx`) — Step 3's pain-point list and the software options in Step 1 are best guesses at what qualifies a lead, not finalized categories. Review both against real client feedback after the first 10-20 completions and adjust.

## Role-specific landing pages

`/bookkeeper` and `/staff-accountant` (`components/RolePageContent.tsx`) are
the first two role pages, targeting distinct buyer search intent rather
than the general homepage. The logical next role pages once these two are
validated: `/tax-preparer`, `/tax-reviewer`, `/ap-ar-specialist`, and
`/payroll-specialist`. Don't build them yet — this is a sequencing note,
not a task, until bookkeeper/staff-accountant prove out.

## Talent-facing page (`/join`)

The following need real internal data before this goes live — everything
else in this feature is functional as built:

- **Pay-band figures** (`messages/*.json`, `TalentWizard.step1Bookkeeper`/`step1StaffAccountant`) — "$8-14/hr" (bookkeeper) and "$12-20/hr" (staff accountant) are placeholders, not confirmed pay bands. These numbers are identical across all three locales by design — only surrounding copy is translated.
- **Meridian Academy curriculum** (`app/[locale]/academy/page.tsx`, `messages/*.json` under `Academy`) — the program description (GAAP fundamentals, QuickBooks/Xero certification, close-process training) is a v1 placeholder structure. Needs real modules, hours, and any certifying-body details.
- **Assessment/review SLA timing** (`messages/*.json` under `StatusTracker`) — "scheduled within 2 business days," "reviewed within 3 business days," etc. are placeholder timing pending real internal SLA data.
- **Resume upload** (`components/TalentWizard.tsx`, Step 4) — uses a link input (resume/LinkedIn/portfolio URL) instead of a file upload, since file upload needs multipart handling and storage that's out of scope for this pass. Revisit if a link proves too much friction for applicants.

## Localization (`/join`, `/academy`)

Scoped deliberately to the talent-facing pages via next-intl — everything
client-facing (`/`, `/calculator`, `/guide`, `/bookkeeper`,
`/staff-accountant`) stays English-only and lives entirely outside the
`app/[locale]` route group, untouched by `middleware.ts`'s matcher.

- Three locales: `en` (default, no URL prefix — `/join`), `es` (`/es/join`), `pt` (`/pt/join`).
- The pill toggle in the nav (`components/LanguageToggle.tsx`) switches locale in place; persistence across visits and initial browser-language detection both come from next-intl's built-in `NEXT_LOCALE` cookie + `Accept-Language` negotiation (`middleware.ts`) — not hand-rolled `localStorage`, since the library already does this and a second mechanism would just be a second source of truth for the same setting.
- **Spanish and Portuguese translations** (`messages/es.json`, `messages/pt.json`) were written for initial launch, not machine-translated, but should be reviewed by a native speaker in each target market — ideally someone from the actual candidate pool — before this goes fully live. This is a **review, not a re-write**: the structure and terminology (QuickBooks, Xero, GAAP left untranslated, as used in LATAM accounting contexts) are intentional; the ask is to sanity-check phrasing, not redo it.
- Pay-band and other numeric figures in `TalentWizard` are identical across all three `messages/*.json` files by design (see above) — don't let a translation review touch the numbers.

## Closing gaps from the prior improvement-pass review

Five items identified in a review of earlier recommendations that never
made it into the build, now closed:

1. **Client-facing status tracker** (`components/ClientStatusTracker.tsx`) — mirrors the talent-side `StatusTracker` via the shared `components/PipelineStages.tsx`, shown after `IntakeWizard` submission. Stage timeframes ("scheduled within 2 business days," etc.) are placeholder timing pending real internal SLA data, same caveat as the talent tracker.
2. **Guarantee statement** (`components/GuaranteeCallout.tsx`, used in `Pricing.tsx` and `FAQ.tsx`) — "not the right fit in your first 30 days" policy is a **placeholder needing sign-off on the exact terms** (what counts as "not the right fit," refund mechanics, timing) before launch.
3. **Named point of contact** (`components/DedicatedContactCard.tsx`, on the homepage and in `ClientStatusTracker`) — name and photo are **placeholders pending real team assignment**; nothing here is launch-ready until a real person is named.
4. **Monthly close checklist** (`/checklist`) — content-only, gated the same way as `/guide` (first section free, rest behind email capture, `source: "checklist"`). Launch-ready as built.
5. **Pilot-readiness checklist** (`/pilot-readiness`) — same gating pattern, `source: "pilot-readiness"`, linked directly from the `IntakeWizard`'s post-submission status view. Launch-ready as built.

Items 2 and 3 are the two in this batch that need real business decisions
or team info, not just review — everything else here (1, 4, 5) is
functional and launch-ready as built.

## Fixed in this pass

- **Trust-bar stats rendering as "0+"/"<0hrs"/"0hr"** (`components/CountUpNumber.tsx`) — root cause: the count-up animation initialized its displayed state to `0` and only corrected to the real value once an `IntersectionObserver` callback fired. If that callback ever failed to fire (element never crossing the visibility threshold, a JS error elsewhere on the page), the bare `0` was the permanent, visible state. Fixed by initializing state to the real value — the animation is now a bonus on top of an always-correct number, not something correctness depends on. Also now respects `prefers-reduced-motion` (snaps directly to the final value, no animation).
- **FlipCard kept its old hover/focus-within-only interaction** — replaced with a real toggle button (`aria-expanded`, Enter/Space via native button semantics, state persists until toggled again instead of reverting when focus moves away).
- **IntakeWizard/TalentWizard step transitions** — focus now moves to the new step's first field on every transition; the "Step X of Y" indicator is `aria-live="polite"` so it's announced, not just visually updated.
- **Heading hierarchy** — fixed three h1→h3 level-skips found during the audit: `RoleCoverage` had no section heading at all (was a `<p>`, now `<h2>`), and both `GatedChecklist` (used by `/checklist` and `/pilot-readiness`) and `/academy` jumped from the page's `h1` straight to `h3` with no `h2` in between.
- **Decorative icon glyphs** (✓ bullets, → arrows) now `aria-hidden="true"` where the adjacent text already conveys the meaning, so screen readers don't read out "check mark" redundantly. `PipelineStages`' done/pending status (previously conveyed by color and a checkmark only) now also has a `sr-only` "Completed"/"Upcoming" label per stage.
- **Color contrast** — audited every text/background combination against the ledger-paper/ledger-ink/emerald tokens; all pass WCAG AA (worst case ~5.3:1 for muted footer text on the navy-deep band, most combinations exceed 7:1). No token values needed to change.

## Pre-launch checklist

The last items standing between this build and a real launch:

- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` to a real, monitored inbox (footer currently shows a visibly fake placeholder on purpose).
- [ ] Legal review of `/privacy` and `/terms` — first-draft templates, not final copy.
- [ ] Replace the hero trust-bar figures ("40+ firms onboarded," "<2hrs avg. response time," "6hr overlap") with real numbers once available.
- [ ] Sign off on the guarantee statement's exact terms (`components/GuaranteeCallout.tsx`).
- [ ] Assign and update the dedicated-contact placeholder (`components/DedicatedContactCard.tsx`).
- [ ] Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and confirm events are actually arriving in the Plausible dashboard (see "Analytics events" above) — a configured-but-unverified integration is as good as no integration.
- [ ] Everything else listed under "Placeholders to replace before launch" and the talent-facing/localization sections above.
