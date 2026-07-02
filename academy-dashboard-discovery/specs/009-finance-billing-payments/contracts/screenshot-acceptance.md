# Contract: Screenshot Acceptance (Spec 009)

**Status**: Binding · The visual gate for the finance shell. References SC-008; US10. Mirrors the A0–A8 structure of Specs 005–008.

## A0. Targets

The **built** static pages in `app/public/` (`finance.html`, `finance.en.html`). Content renders without JS; JS only reaches a state (drawer open, confirm open, filter narrowed).

## A1. Harness

`tests/screenshots/capture.cjs` (Playwright/Chromium, existing): theme via `localStorage['academy.theme']`, deterministic fixtures, animations disabled. Viewports: desktop 1440×900, mobile 390×844.

## A2. Required matrix (8 frames — the minimum gate)

| # | Frame | File |
|---|---|---|
| 1 | Finance shell · AR · Light · Desktop | `finance__ar__light__desktop.png` |
| 2 | Finance shell · AR · Dark · Desktop | `finance__ar__dark__desktop.png` |
| 3 | Finance shell · EN · Light · Desktop | `finance__en__light__desktop.png` |
| 4 | Invoice drawer open · AR · Light | `finance__ar__light__desktop__drawer.png` |
| 5 | Record-payment confirm modal · AR · Light | `finance__ar__light__desktop__confirm.png` |
| 6 | Invoice list filtered (overdue tile active) · AR · Light | `finance__ar__light__desktop__filter.png` |
| 7 | Planned payroll/accounting cards region · AR · Light | *(covered in frames 1–2 full-page; may be captured as a scroll crop if the reviewer needs it isolated)* |
| 8 | Finance shell · AR · Light · Mobile | `finance__ar__light__mobile.png` |

(There is **no** dashboard frame in the Spec 009 matrix — Spec 009 makes no dashboard body change; the body-scoped smoke assertions are the evidence. The 008 precedent applies verbatim.)

## A2a. MATRIX append (for `capture.cjs`)

```js
// Spec 009 — Finance, Billing & Payments Shell (acceptance matrix)
{ page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop' },
{ page: 'finance', lang: 'ar', theme: 'dark',  vp: 'desktop' },
{ page: 'finance', lang: 'en', theme: 'light', vp: 'desktop' },
{ page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', financeDrawer: true,  variant: 'drawer' },
{ page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', financeConfirm: true, variant: 'confirm' },
{ page: 'finance', lang: 'ar', theme: 'light', vp: 'desktop', financeFilter: true,  variant: 'filter' },
{ page: 'finance', lang: 'ar', theme: 'light', vp: 'mobile' },
```
Driver lines: `financeDrawer` → click the first `#invoice-list [data-drawer]`; `financeConfirm` → click the first `#invoice-list [data-confirm]`; `financeFilter` → click the overdue tile (`[data-filter-set="status:overdue"]`).

## A2b. Per-frame criteria (what each frame MUST show / MUST NOT show)

1–3: header + action cluster (3 visibly-disabled controls + Print) + exactly 4 count tiles (no money-total tile) + invoice rows with labeled chips + LTR amounts inside RTL (frame 3: LTR layout, English labels) + payments list + 9 planned cards with availability chips. MUST NOT show: a chart, a giant money KPI, an aggregate revenue figure, a gateway/payroll UI, a receipt/upload control, a 10-column table, raw `⟦key⟧`.
4: drawer over the page — amount lines labeled display-only, NO total line, honest action row (Mark-paid/Send-reminder/Send-invoice-disabled/Print).
5: the confirm modal with calm copy; background page unchanged.
6: only overdue rows visible; the overdue tile in its selected state; the count label updated.
8: single-column mobile flow; tiles wrap; rows stay scannable; nothing overflows RTL.

## A3. Review process

Compare against: the Spec 001 approved dashboard PNG + sidebar reference (visual language), Specs 002–008 accepted screenshots (consistency), and the legacy finance screens (`output/roles/admin/pages/management-invoices*`, `-accounting*`, `-salaries*`, contact sheets) as **product/UX reference ONLY — never a visual copy**. Verdicts recorded in `app/screenshots/REVIEW.md` (`## Spec 009 — … — <date>` section, verdict table + failure-conditions paragraph + automated footer).

## A4. Failure conditions (any one = FAIL)

Looks like generic accounting software · a fake revenue dashboard or giant money KPI · chart-heavy finance page · a real payment-gateway impression · a real payroll impression (any pay figure) · a fake invoice generator impression · missing source links · a dead link/control · a real export/PDF/CSV/send/reminder/payment behavior · receipt-upload UI · copied legacy visuals/assets/colors/classes or raw status-code leaks (`messages.3`-style) · raw i18n keys · poor dark-mode contrast · broken RTL/LTR (incl. amounts not LTR-wrapped) · JS-rendered whole page · claims of real accounting/payment/invoice persistence · markup that would be hard to Djangoify.

## A5. Automated checks (accompany, never replace, the human review)

Build green (incl. the fixture coherence guard) · smoke green (incl. the Spec 009 block + dashboard/reports body-scoped checks) · axe critical = 0 on finance (ar/en × light/dark) · scope-guard G8a audit clean (both directions) · zero console errors during capture.

## A6–A8. Verdicts, naming, determinism

A6: dated verdict table in `REVIEW.md`; any FAIL blocks acceptance. A7: `{page}__{lang}__{theme}__{viewport}[__{variant}].png`. A8: fixed fixtures/clock, animations off; every frame also satisfies the carried shell invariants — exactly one visible nav category panel (reports), exactly one `is-active[aria-current]` (the `finance` item), six rail tabs, the six locked wallet items visible with lock icons in the expanded panel, no portal chrome, no legacy bleed-through.
