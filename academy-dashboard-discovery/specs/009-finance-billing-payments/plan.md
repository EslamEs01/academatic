# Implementation Plan: Finance, Billing & Payments Shell

**Branch**: `feature/001-approved-dashboard-design` (single-branch spec-kit; Spec 009 lives beside 001–008) | **Date**: 2026-07-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/009-finance-billing-payments/spec.md`

## Summary

Spec 009 builds the academy's first **Finance, Billing & Payments Shell** — one calm, premium, fixture-only admin page (`finance.html` + `finance.en.html`) that organizes the legacy system's sprawling finance module (56 pages / 20 templates: accounting dashboard, invoices, monthly invoices, transactions ledger, expenses + heads, teacher/staff salaries, salary class report, payouts + providers, P&L analyses, banks) into: fixture-authored **family invoices** and **recent payments** with labeled status chips, count-only tiles-as-filters, an invoice details drawer, honest demo/disabled finance actions, real source links into the Spec 002–007 pages, and nine labeled **planned/backendRequired** cards for everything that needs a real backend.

Grounding decision (the spine): **Spec 009 is the finance spec every prior scope-guard deferred to.** The nav already reserves the seam — six `disabled` wallet items (`invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport`) + `banks`, all locked with `nav.reason.finance` — and every existing billing touchpoint (dashboard `revenue` KPI, family `plan/hourRate` stub, `fam5` payment-overdue flag, disabled add-to-credit, disabled `billingAlerts`) is already display-only or disabled-with-reason. Spec 009 adds **exactly one** new implemented nav item `finance` (المالية / Finance) → `finance.html`, born-and-promoted in one step (the Spec 005 `attendance` precedent — no `FUTURE_ROUTES` reservation exists), keeps all seven locked items locked (reason copy updated one line so it stays truthful), and changes **nothing else** in nav, dashboard, or reports.

Technical approach: **reuse, don't rebuild — and never compute money.** Every number is fixture-authored (`fixtures/finance.js`: ~9 invoices, ~6 payments, row-count summary, 9 planned cards, plus a build-time coherence guard); two new labeled maps (`invoice-status`: `paid/unpaid/overdue/cancelled`; `payment-status`: `recorded/pending/returned` — exact reference-backed sets, no partial/draft/gateway states); availability reuses the Spec 008 `REPORT_AVAILABILITY` map; the page composes existing components (`pageHeader`, tiles-as-filters, `filterBar`, `reportCard`+`availabilityChip`, `previewTemplate` drawers, `confirmAction`, `toast`, `states`). The corrected integration invariant is **body-scoped**: `pages/dashboard.js`/`pages/reports.js` are untouched and their built page **bodies** stay finance-free, while the shared sidebar on every built page legitimately gains the one finance item (whole-file byte identity is impossible by construction — the nav is baked into all pages). Static-HTML-first, per-language pre-render, Django-template-ready — exactly as Specs 001–008.

## Technical Context

**Language/Version**: ES modules (native browser JS, no transpile); Node ≥ 18 for the build/test scripts only
**Primary Dependencies**: none added — existing in-repo build (`scripts/build-html.mjs`), `i18n.js` deep-merge overlays, Playwright (smoke/a11y/screenshots), `@axe-core/playwright`. **No** payment/accounting/chart/table/form/calendar/SPA library, **no** CDN, **no** TypeScript.
**Storage**: none — fixtures only (`src/js/fixtures/finance.js`); no API/DB/persistence; no real export/send/upload
**Testing**: `npm run build` + smoke (`tests/smoke/run.cjs`) + a11y (axe) + screenshots (Playwright); screenshot-based visual acceptance is the final gate
**Target Platform**: static site — opened from filesystem / GitHub Pages; Django-template-ready downstream
**Project Type**: static HTML-first multi-page admin app (SSG: page render modules → complete `public/*.html` AR + `*.en.html`); runtime JS enhances baked markup only via the existing `data-*` hooks
**Performance Goals**: instant static page loads; runtime JS only filters/opens/toasts (no page-DOM construction); 1-click reach from any invoice/payment to its family/source page
**Constraints**: NO whole-page `<div id="app">` mount; all tiles/rows/chips/drawers/planned-cards baked at build time; relative+local assets; Arabic RTL default + English LTR; Light/Dark/System; labeled invoice/payment status chips (never numeric/color-only); **no real invoice/payment/accounting/payroll engine, no payment gateway, no PDF/CSV generation, no receipt upload, no send/reminder job, no persistence/mutation, no runtime money arithmetic (no summation/FX/derived totals/overdue-by-date), no chart/canvas, no revenue analytics/cashflow**; no portals; no copied legacy assets/classes/palette/wording/status-code leaks
**Scale/Scope**: **1 new page pair** (`finance` + `finance.en` → 20 page bases / 40 built pages + index) · 1 new nav item (six disabled finance items + `banks` stay locked) · 2 new components + 1 new fixture module + 1 locale overlay pair · 3 shared registration touch-points (`nav.config.js`, `build-html.mjs`, `i18n.js`) + a 1-line reason-copy edit in base locales · dashboard/reports **bodies unchanged** (body-scoped invariant, D3)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The repo constitution (`.specify/memory/constitution.md`) is an unfilled template, so the binding gates are the **Hard Constraints in `CLAUDE.md`** (Spec 001–008), treated as the de-facto constitution — the same basis used by Specs 002–008. Checked:

| Gate (from CLAUDE.md hard constraints + spec) | Status | Note |
|---|---|---|
| Continue the approved Spec 001 design | ✅ PASS | Reuses shell/cards/chips/tiles/states; amber "wallet" accent; screenshot-gated (US10) |
| Static HTML-first, no `#app` whole-page mount | ✅ PASS | All finance markup baked; runtime JS filters/opens/toasts only; no new `data-*` hook |
| No new library (payment/accounting/chart/table/form/calendar/SPA), no CDN/TS | ✅ PASS | Native JS + existing components only |
| Fixtures only — no API/auth/CRUD/persistence | ✅ PASS | `fixtures/finance.js` authored literals + build-time coherence guard |
| **No real billing/payment/accounting/payroll engine or gateway** | ✅ PASS | Engines appear only as labeled planned/backendRequired cards (D8) |
| **No runtime money arithmetic (no summation/FX/totals/overdue-by-date)** | ✅ PASS | Amounts are authored literals; summary = row counts only (D4); the spec's spine |
| **No real PDF/CSV export, send, receipt upload, reminder job, mark-paid mutation** | ✅ PASS | Action matrix is demo/confirm-demo/disabled-with-reason; receipt upload absent entirely (D7) |
| Labeled status chips (icon+text, never numeric/color-only) | ✅ PASS | New `invoice-status` + `payment-status` maps, sets distinct from all ten existing maps (D5) |
| Reuse, never duplicate (availability map, cards, drawers, actions) | ✅ PASS | `REPORT_AVAILABILITY`/`availabilityChip`/`reportCard`/`previewTemplate`/`confirmAction` imported as-is |
| Nav: exactly one new item; locked finance items stay locked; no dead links | ✅ PASS | `finance` born-and-promoted (Spec 005 precedent); six + `banks` keep lock + truthful reason (D2) |
| Dashboard/reports impact: modules untouched; **bodies** finance-free (body-scoped, not byte-identical) | ✅ PASS | The corrected invariant (D3); smoke asserts via `#page-body`; sidebar diff documented |
| Spec 001–008 scope-guards stay green | ✅ PASS | Path-aware two-direction audit; prior guards grep their own file sets, none touched (D9) |
| No teacher/staff pay figures anywhere; no fixture pay fields | ✅ PASS | Payroll = planned cards only; Spec 007 invariant preserved verbatim (D8) |
| Per-language pre-render, relative paths, Django-ready, RTL/LTR, Light/Dark | ✅ PASS | `finance.html` + `finance.en.html`; digits/amounts LTR inside RTL |
| No portals / role dashboards | ✅ PASS | Admin shell only; legacy family/teacher billing portals stay future-role |

**Result: PASS** (no violations; Complexity Tracking left empty).

## Project Structure

### Documentation (this feature)

```text
specs/009-finance-billing-payments/
├── plan.md              # This file
├── research.md          # Phase 0 — decisions D1–D10 (shell-not-engine; nav born-and-promoted; body-scoped invariant; authored data + coherence guard; exact vocabularies; layout/filters; honest actions; planned cards; path-aware scope guard; i18n/reuse)
├── data-model.md        # Phase 1 — 11 fixture-only shapes + map reconciliation + coherence rules + Django mapping
├── quickstart.md        # Phase 1 — build/preview/review/verify steps
├── contracts/           # Phase 1 — 13 contracts (below)
│   ├── finance-page-contract.md
│   ├── invoice-section-contract.md
│   ├── payment-section-contract.md
│   ├── finance-status-contract.md
│   ├── finance-actions-contract.md
│   ├── source-links-contract.md
│   ├── planned-finance-contract.md
│   ├── dashboard-impact-contract.md
│   ├── reports-impact-contract.md
│   ├── navigation-impact-contract.md
│   ├── static-html-django-ready-contract.md
│   ├── screenshot-acceptance.md
│   └── scope-guard.md
├── checklists/requirements.md   # already created in /speckit.specify
└── tasks.md             # Phase 2 (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

All work is inside the existing app; **one new public page pair**, no new top-level dirs. New (N) and edited (E):

```text
academy-dashboard-discovery/app/
├── src/
│   ├── js/
│   │   ├── pages/
│   │   │   └── finance.js                 # N  the Finance shell (header + actions + status tiles + invoice section + payments section + planned cards + baked invoice drawers; row/drawer builders inline — single-page use)
│   │   ├── components/
│   │   │   ├── finance-status.js          # N  INVOICE_STATUS (paid/unpaid/overdue/cancelled) + PAYMENT_STATUS (recorded/pending/returned) labeled maps + chips
│   │   │   └── finance-actions.js         # N  financeActions() cluster + row/drawer action builders (demo/confirm-demo/disabled-with-reason; record-payment gated on cancelled)
│   │   ├── fixtures/
│   │   │   └── finance.js                 # N  INVOICES (~9 authored) + PAYMENTS (~6 authored) + FINANCE_SUMMARY (row counts ONLY) + PLANNED_FINANCE (9 cards) + resolvers + BUILD-TIME COHERENCE GUARD (throws on fam5-no-overdue / trial-family-invoice / payment→cancelled-invoice / dangling id)
│   │   ├── nav.config.js                  # E  +1 item (finance, before the locked wallet block) + 1 FUTURE_ROUTES line — nothing else moves
│   │   └── i18n.js                        # E  register ar.fin.js/en.fin.js (2 imports + 2 deepMerge lines, after *.rep.js)
│   ├── locales/
│   │   ├── ar.fin.js                      # N  Arabic finance overlay (nav.finance + topbar.title/crumb.finance + finPage.* + fin.* + data.fin.*)
│   │   ├── en.fin.js                      # N  English overlay (key-mirrored)
│   │   ├── ar.js                          # E  1 line — nav.reason.finance copy stays truthful (backend still required; fixture preview exists)
│   │   └── en.js                          # E  1 line — same
│   └── styles/
│       └── app.css                        # E  minor: finance tile/row spacing classes reusing existing tokens + chip tones (NO new tone, NO chart CSS)
├── scripts/
│   └── build-html.mjs                     # E  +1 import + 1 PAGES entry ({ base:'finance', activeId:'finance', … }) → public/finance.html + finance.en.html
└── tests/
    ├── smoke/run.cjs                      # E  +'finance' in PAGES (inherits IA asserts) + Spec 009 block (tiles=counts=rows · chips labeled · honest actions · drawer · no-dead-links · no receipt-upload token) + BODY-SCOPED dashboard/reports checks (finance-token regex vs #page-body = clean; sidebar has exactly one finance link; six wallet items still locked)
    ├── a11y/run.cjs                       # E  +finance (ar/en × light/dark) to the axe sweep
    └── screenshots/capture.cjs            # E  +Spec 009 MATRIX block (8 frames) + drawer/confirm/filter driver lines
```

(Additionally at acceptance time: `README.md` gains the Spec 009 Django-portability bullet + an annotation on the Spec 001 "Out" line; `screenshots/REVIEW.md` gains the Spec 009 verdict section — both are E files owned by the tasks phase.)

**Structure Decision**: A genuinely **new page** following the Spec 005 `attendance` promotion pattern — one `PAGES` entry in `build-html.mjs`, one born-and-promoted nav item in `nav.config.js`, everything else untouched: **no `dashboard.js` change, no `reports.js`/reports-fixture/report-component edits** (they are *imported* — `reportCard`, `availabilityChip` — never modified), no academic page/fixture edits, no new build tool, no new dependency, no new `data-*` hook. The three shared registration touch-points + the 1-line reason copy are the complete shared-file surface (data-model §11).

## Phasing & MVP Sequencing

Increment order (each independently reviewable; matches the spec's story priorities):

1. **Foundation** — `fixtures/finance.js` (authored invoices/payments + `FINANCE_SUMMARY` row counts + `PLANNED_FINANCE` + coherence guard) + `finance-status.js` (two labeled maps) + `finance-actions.js` (honest-action cluster) + `ar.fin.js`/`en.fin.js` (key-mirrored). *Blocking prerequisite for the page.*
2. **US1 — Finance shell** (P1, **MVP start**): `pages/finance.js` skeleton (header + action cluster + count tiles + section shells) + nav/build/i18n registration → `finance.html`/`finance.en.html` build green.
3. **US2 — Family invoices section** (P1, **MVP payoff**): baked invoice rows (serial · family link · month · due hint · authored amount LTR · context links · status chip · row actions) + the baked invoice drawers.
4. **US3 — Recent payments section** (P1): payment rows (date · family link · invoice ref → drawer · authored amount · method chip · status chip).
5. **US7 — Filters** (P2): tiles-as-filters (`data-filter-set="status:<id>"` → `#invoice-list`) + `filterBar` (search + status + family) + `noResults`.
6. **US6 — Honest actions** (P2): wire the full matrix (Print demo · Record-payment/Mark-paid + Send-reminder confirm→demo · Export CSV/PDF + Send invoice + Create invoice disabled-with-reason · cancelled-invoice gating). Chips never change.
7. **US5 — Planned payroll & accounting cards** (P2): nine `reportCard`s with availability chips; zero figures; the academic `teacher-performance.html` context link beside (not on) the payroll cards.
8. **US4 — Source links** (P2): verify every family/student/course/group/sessions/attendance link resolves (EN-aware); no `#`.
9. **US8 — Nav/dashboard/reports honesty** (P3): body-scoped smoke checks on dashboard/reports; sidebar single-finance-link + locked-items assertions; updated reason copy verified.
10. **US9/US10 — Static/Django + Visual** (P1, cross-cutting gates): view-source baked verification; build + smoke + a11y green; the 8-frame screenshot matrix reviewed in `REVIEW.md`.

**MVP = US1 + US2 + US3** (the shell with real invoice + payment sections; everything else enriches honesty and coverage).

**Agent context update**: the `CLAUDE.md` active-feature pointer is updated to Spec 009 (this plan).

## How this plan avoids becoming a real billing / payroll / accounting engine (explicit, per spec mandate)

Because this spec finally introduces finance vocabulary after eight specs that forbade it, the guardrail is stated up front and the contracts enforce it:

- **Allowed (display-only fixture values):** authored per-row amounts in one display currency (`unit.sar`, LTR spans); **row counts** as the only derived numbers (tiles = `rows.filter(…).length`, the `OUTCOME_SUMMARY` precedent); labeled invoice/payment status chips; the reused availability vocabulary; real deep-links to implemented pages; demo/confirm-demo/disabled-with-reason actions; nine figure-free planned/backendRequired cards.
- **Forbidden (no exceptions):** any arithmetic on money anywhere (no `Sum`, no balance, no FX/conversion, no VAT, no allocation, no overdue-computed-from-date, no invoice total derived from line items or `hourRate`); any real gateway/ledger/payroll/salary math; any real PDF/CSV/blob download; any receipt-upload affordance (the reference had none — verified); any send/reminder job; any DOM/fixture mutation (a confirmed "Mark as paid" toasts and changes **nothing**); any chart/canvas/graph; any teacher/staff pay figure; any portal surface.
- **Containment discipline:** finance vocabulary exists **only** in Spec 009's own new files + the three registration touch-points + the 1-line reason copy (D9's path-aware two-direction grep audit); `pages/dashboard.js`/`pages/reports.js` and all academic modules are untouched, and their built **bodies** are asserted finance-free by the body-scoped smoke checks — the shared sidebar's single new `finance` item is the only permitted built-HTML difference on those pages (whole-file byte identity is impossible by construction and is NOT the invariant). `scope-guard.md` lists every forbidden engine + the audit; `screenshot-acceptance.md` makes "generic accounting look / money KPI / gateway or payroll impression / receipt upload UI" hard failure conditions.

## Complexity Tracking

*No constitution violations — section intentionally empty.*
