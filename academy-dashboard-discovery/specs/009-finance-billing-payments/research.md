# Research: Finance, Billing & Payments Shell (Spec 009)

Phase 0 output. All unknowns from the Technical Context are resolved below as decisions D1–D10, grounded in three direct re-reads performed for this plan: (a) the legacy academy system analysis (`output/combined/*`, `output/roles/*`, `frontend-planning/*`, `frontend-planning-deep/*`), (b) the current app source (`app/src/js/*`, `app/scripts/*`, `app/tests/*`), and (c) all prior spec artifacts (001–008 plans + contracts). The legacy system is product/UX reference ONLY — no visuals, assets, classes, palette, private wording, or numeric status codes are copied.

---

## D1 — The Finance shell is a DISPLAY / ORGANIZE / LINK surface, never a billing/accounting/payroll engine

**Decision**: `finance.html` renders fixture-authored invoices and payments plus labeled planned/backendRequired cards for everything else. Every number on the page is either an authored literal (per-row amounts) or a count of authored rows (summary tiles). Runtime code performs **zero arithmetic on money** — no summation, no FX, no derived totals, no overdue-by-date computation, no salary math. All write-shaped actions are demo/confirm-demo/disabled-with-reason.

**Rationale**: Every legacy money behavior is backend-bound: invoice totals were computed from line items (`price, discount, fees, additional, adjustment_*` on the Create-Parent-Invoice form), dual-currency totals ran through an editable 16-currency FX table on every accounting page, salaries were attendance-driven and generated per month, payouts moved through a real 8-status provider lifecycle. A static fixture app cannot do any of that honestly; pretending would violate the project's action-honesty contract (Specs 002–008) and the spec's own FR-005/FR-014. The legacy analysis' own IA doc calls the module "scattered across ~10 sidebar entries with overlapping concepts" (`frontend-planning/08-improved-information-architecture.md:14`) — the fix is organization + honesty, not a fake engine.

**Alternatives considered**: (a) compute invoice totals from the existing family `hourRate` stubs — rejected: fabricated money, violates FR-005/FR-006 and the "authored, never derived" rule; (b) a client-side "mark as paid" that flips the chip in the DOM — rejected: fake mutation, worse than honest demo (chips must not change, SC-003); (c) skip amounts entirely and show counts only — rejected: the legacy family billing table (`#, Serial No, Month-Year, Due Date, Course, Amount, Status` — `output/roles/family/pages/student-billing.md`) makes the authored amount the recognizable heart of an invoice row; display-only literals are honest.

---

## D2 — Route & navigation: ONE new `finance` item, born-and-promoted (the Spec 005 `attendance` precedent); the six disabled wallet items + `banks` stay locked

**Decision**: Add exactly one nav item `item({ id: 'finance', labelKey: 'nav.finance', icon: 'wallet', route: 'finance.html' })` to the `reports` category `items[]`, inserted directly before the six disabled finance items so the finance block reads as one group. Add `finance: 'finance.html'` to `FUTURE_ROUTES` at the same moment (documentation-parity, exactly as Spec 005 did for `attendance`). Register one `PAGES` entry in `build-html.mjs` (`{ base: 'finance', activeId: 'finance', titleKey: 'topbar.title.finance', crumbKey: 'topbar.crumb.finance', render: renderFinance }`). The six disabled items (`invoices`, `monthlyInvoices`, `salaries`, `staffSalaries`, `payments`, `classSalaryReport`) and `banks` (admin category) keep `status:'disabled'` + lock icon + `reasonKey:'nav.reason.finance'`; the shared reason copy in base `ar.js`/`en.js` is updated one line each so it stays truthful (real billing backend still required; the Finance page is a fixture-only preview).

**Rationale**: Direct re-read of `nav.config.js` confirms none of the seven disabled items has a `FUTURE_ROUTES` reservation, and each is narrower than the shell (invoices-only, payments-only, salaries-only…) — promoting one would mislabel the umbrella page. The Spec 005 navigation-impact contract documents the exact precedent: "`attendance` has no reserved route today… promotion MUST add `attendance: 'attendance.html'` to `FUTURE_ROUTES` … at the same moment it adds the item to `NAV_CATEGORIES` with `status:'implemented'` + `route:'attendance.html'`". The nav build guard (implemented→route required; non-implemented→no route; disabled→reasonKey required) passes unchanged.

**Alternatives considered**: (a) promote `invoices` from disabled→implemented with `route:'finance.html'` — rejected: label «الفواتير» would point at a broader finance shell (mislabeled nav), and it would consume a future per-module route the real-backend specs will want (the legacy planning itself splits future finance into invoices/accounting + payroll/payouts, `frontend-planning/10-spec-splitting-plan.md:69-70`); (b) a new sidebar category «المالية» — rejected: a category is far more chrome than one item, and the six locked items already live in `reports` (matching the legacy IA where finance reports sat with reports); (c) restructure the finance block into a `sections:[{titleKey:'cat.finance',…}]` sub-group (the teachers-category mechanism) — rejected for this spec: it visually moves six existing items, and the accepted decision is "no other nav item is added, promoted, renamed, moved, or removed"; noted as an optional future-IA refinement when real finance specs land.

---

## D3 — Dashboard/Reports invariant is BODY-scoped, not whole-file (resolves the byte-identical correction)

**Decision**: `pages/dashboard.js` and `pages/reports.js` (and their fixtures/components) are not modified. The invariant on built output is: the `#page-body` content region of `dashboard.html`/`reports.html` (both languages) gains **zero** finance chrome — no card, chip, widget, figure, token; the **only** permitted built-HTML difference is the shared sidebar gaining the single `finance` nav item (plus the one-line updated `nav.reason.finance` toast copy carried by the locked items' `title` attributes). Verification is by body-scoped DOM assertions in smoke — `document.getElementById('page-body')` — not whole-file identity.

**Rationale**: `build-html.mjs` deletes and regenerates **every** `public/*.html` on each build, and `shellMarkup()` bakes the sidebar into every page — so adding any nav item changes every built file by construction; whole-file byte identity is impossible. The technique is already in the codebase: the Spec 007 and Spec 008 smoke blocks run forbidden-token regexes against `document.getElementById('page-body').innerText` (e.g. 008: `/\b(salary|payroll|payout|invoice|revenue|accounting|…)\b/i.test(body.innerText)` + the Arabic token list) — Spec 009 reuses the identical regex/technique, targeted at the `dashboard` and `reports` pages, plus sidebar assertions (exactly one `a[href="finance.html"]`; six locked wallet items still `aria-disabled` with lock icon).

**Alternatives considered**: (a) whole-file before/after diff — rejected: impossible by construction (above); (b) exempting dashboard/reports from rebuild — rejected: the stale-route cleanup + full regeneration is a deliberate build invariant since Spec 001; (c) diffing only `#page-body` HTML snapshots across builds — viable but adds new tooling; the smoke DOM assertions achieve the same guarantee with the existing runner.

---

## D4 — Fixture data is AUTHORED; coherence is enforced by a build-time guard in the fixture

**Decision**: One new fixture module `fixtures/finance.js` authors `INVOICES` (~9 rows) and `PAYMENTS` (~6 rows) as literal data: serial, familyId, optional studentIds, courseId/groupId context, monthKey, issue/due date keys, `amount` (authored integer), shared currency label (`unit.sar`), statusId, optional noteKey; payments carry invoiceId, familyId, dateKey, authored amount, methodKey, statusId. `FINANCE_SUMMARY` is computed **only as row counts** (`rows.filter(…).length` — the `OUTCOME_SUMMARY` precedent), never as money sums. The module ends with a build-time coherence guard (the `nav.config.js` guard pattern): throw if any payment references a missing or `cancelled` invoice, if any invoice references a missing family, if `fam5` has no `overdue` invoice, or if a zero-rate family (`fam3`, `fam8`) has any invoice. Authored distribution: every invoice status appears ≥1; the single `cancelled` invoice belongs to `fam7` (the "stopped" family); amounts are plausible next to the family `hourRate` stubs but never derived from them.

**Rationale**: FR-005/FR-006/SC-007 make coherence a hard acceptance; a thrown build error is cheaper and stricter than a smoke assertion (and the repo already trusts this pattern in `nav.config.js`). Counting rows is explicitly sanctioned ("counts by status are okay only as row counts"); `OUTCOME_SUMMARY` already counts rows the same way.

**Alternatives considered**: (a) hand-author the summary counts too — rejected: two sources of truth can drift; row-derived counts are still not money arithmetic; (b) validate coherence only in smoke — rejected: later signal, weaker guarantee; (c) author amounts as `hourRate × hours` in comments — rejected: even a comment claiming derivation invites the forbidden mental model (and trips comment-scanning audits); fixture comments must state amounts are authored demo literals.

---

## D5 — Two new labeled vocabularies with exact reference-backed sets; availability is REUSED from Spec 008; tones only from the styled chip set

**Decision**: New component `finance-status.js` exports two maps in the house shape (`{ id, tone, icon, labelKey }` + `*_ORDER` + `xOf(id)` + `xChip(id)`):
- `INVOICE_STATUS` — exactly `paid / unpaid / overdue / cancelled`;
- `PAYMENT_STATUS` — exactly `recorded / pending / returned`.
No `partial`, `draft`, `failed`, `refunded`, `authorized`, `captured`, `processing`, `wallet`, `credit`. Availability labeling reuses `REPORT_AVAILABILITY` / `availabilityChip()` imported from `components/report-status.js` — no duplicate map. Chip `tone` values are chosen only from the CSS-styled set (`live, upcoming, completed, cancelled, amber, neutral`): paid→`completed`, unpaid→`amber`, overdue→`cancelled`, cancelled→`neutral`; recorded→`completed`, pending→`upcoming`, returned→`amber`; icons from the existing sprite (candidates: `check-circle`, `clock`, `alert-triangle`, `x-circle`, `check`, `wallet`; final pick at implementation against `icons.json`).

**Rationale**: The verified legacy vocabulary is Paid/UnPaid on invoice lists, Due/Overdue in invoice analysis, SoftDelete for removed invoices — and a grep across the whole crawl output finds **no** "partial" or "draft" anywhere (`output/combined/*`), so the calm modern set `paid/unpaid/overdue/cancelled` is the honest modernization (cancelled ≙ soft-deleted). Payments had no status vocabulary of their own (they were keyed-in transactions); `recorded/pending/returned` is grounded in the transaction model + the payout vocabulary (Pending/Returned) without importing the gateway lifecycle. Both sets are distinct from all ten existing maps. The tone restriction avoids the documented Spec 008 post-review bug (`tone:'coral'` chips render unstyled — REVIEW.md).

**Alternatives considered**: (a) `partial`/`draft` per the original brief's suggestion — rejected: reference never had them (verified absence); inventing them violates "do not invent from imagination"; (b) a new `FINANCE_AVAILABILITY` map with the same four keys — rejected: duplicate of `REPORT_AVAILABILITY`, violates the repo's distinct-sets convention and FR-013's "reused, not duplicated"; (c) modeling the 8 legacy payout statuses — rejected: payouts are a backendRequired planned card (D8), never a working lifecycle UI.

---

## D6 — Layout & filtering: stacked calm sections; tiles-as-filters bound to the single invoice list; payments is a short unfiltered "recent" list

**Decision**: `pages/finance.js` composes (in order): `pageHeader` → `financeActions()` cluster → four invoice-status summary tiles (each a `data-filter-set="status:<id>"` button targeting `#invoice-list`, the Spec 005 attendance tile pattern) → **Family invoices** section (`filterBar({ targetId:'#invoice-list', search + status select + family select })` + baked invoice rows + `noResults()`) → **Recent payments** section (short baked list, ~6 rows, with payment-status + method chips, no separate filter form) → **Payroll & accounting** planned section (nine `reportCard`s with availability chips) → baked invoice drawers (`previewTemplate` pattern). No chart, no wide table, no aggregate money KPI.

**Rationale**: The one genuinely good legacy finance pattern is clickable KPI-status tiles above the list (invoices/payouts/salaries all had them — `frontend-planning-deep/03-screenshot-review.md:17`); the app already modernized exactly this on `attendance.html`. The `enhance.js` filter mechanism binds tiles to **the** page-level `[data-filter-form]` (singular `document.querySelector`), so only one filterable list per page is supported without a new hook — the invoice list is the primary workflow and gets it; payments stays a calm "recent" list (mirroring its legacy nature: transactions recorded against invoices, never a standalone workflow page — verified: no standalone payments list existed). The stacked section flow mirrors `reports.js` (Spec 008), the freshest accepted page shape.

**Alternatives considered**: (a) tabs (Invoices/Payments/Planned) — rejected: hides the honest planned area and the payments context; the reports shell precedent is stacked sections; (b) two filter forms — rejected: requires changing the singular filter-form lookup in `enhance.js` (a runtime-behavior change rippling to all pages) or a new hook (forbidden, FR-015); (c) a dense 10-column invoice table — rejected: the legacy's own reviewers flag the wide tables (up to 23 columns on the teacher salary drill-down) as the anti-pattern; rows + drawer is the house pattern.

---

## D7 — Honest finance actions: exact matrix, status-gated on cancelled invoices, and NO receipt upload anywhere

**Decision**: New component `finance-actions.js` provides the page cluster and per-row/drawer actions using only the four existing honesty classes:
- **Page cluster**: Create invoice → disabled-with-reason (`fin.reason.backend`); Export CSV / Export PDF → disabled-with-reason (`fin.reason.export`); Print → demo toast (`fin.act.print.toast`).
- **Invoice row**: View → `data-drawer` (baked drawer); Record payment → `confirmAction` → demo toast — except on a `cancelled` invoice where it renders disabled-with-reason (`fin.reason.cancelled`), the Spec 006 `groupActions` status-gating pattern.
- **Invoice drawer**: Mark as paid → confirm → demo toast (chip never changes); Send reminder → confirm → demo toast; Send invoice → disabled-with-reason (`fin.reason.send`); Print → demo toast.
- **Payment row**: View linked invoice → `data-drawer` to the invoice's drawer; family link → real `<a>`.
No upload-receipt action, field, or affordance exists anywhere.

**Rationale**: Mirrors `reportActions()`/`teacherActions()`/`groupActions()` verbatim in mechanism (demo / `confirmAction` / `aria-disabled + data-disabled-reason` / real link), satisfying the smoke rule that every disabled control carries a reason and every control gives feedback. Receipt upload is excluded on grounded absence: the crawl's 65 file inputs are all class-remark/feedback attachments; none is payment proof (verified) — the reference had no receipt concept, so the shell must not invent one (FR-014).

**Alternatives considered**: (a) Send invoice as confirm→demo — rejected: sending implies an outbound channel (the legacy sent by WhatsApp/email via backend jobs); disabled-with-reason is the honest class, while Send **reminder** stays confirm→demo as the deliberately-demoed "communication intent" action mirroring 008's Schedule; (b) a fake blob-download for Export CSV — rejected explicitly by the house rule ("no `window`-blob download faking a real export", 008 report-actions contract); (c) hiding actions entirely on cancelled invoices — rejected: disabled-with-reason teaches the rule; hiding hides it.

---

## D8 — Payroll & accounting are planned/backendRequired cards ONLY — nine cards, no figures, reusing `reportCard`

**Decision**: A `PLANNED_FINANCE` fixture array renders nine `reportCard`s (route-less → the disabled-with-reason variant) with availability chips: `monthlyInvoices` (**planned**) and eight **backendRequired** — invoices engine (create/adjust/instalments), payments collection, teacher salaries, staff salaries, class salary report, payouts & compensations, accounting & expenses (incl. heads, P&L/invoice analyses, multi-currency/FX), banks. Each card: icon, title, one-line description, availability chip — zero figures, zero links (the payroll area's only real link is the academic `teacher-performance.html` context link rendered beside the section, not on a card). Teacher/staff fixtures gain no fields.

**Rationale**: These are precisely the verified legacy surfaces (accounting dashboard's 10 money KPIs + FX table; salaries with Generate/Request-payouts; compensations Fine/Bonus; payouts 8 statuses; expenses with `is_income`; banks stub) — every one requires the backend to be honest. Card-per-locked-nav-concept keeps sidebar and shell telling one story (spec US5). `reportCard` + `availabilityChip` already implement exactly this honest planned-card rendering (Spec 008's `monthlyReports`/`dataAnalysis` cards).

**Alternatives considered**: (a) fixture-backed demo salary rows — rejected: Spec 007's invariant ("No finance field is added to any fixture"; zero pay figures) is binding and re-affirmed by FR-011; (b) fewer merged cards (one "payroll" + one "accounting") — rejected: breaks the 1:1 sidebar↔shell story for the six locked items; (c) linking cards to the locked nav items — meaningless (nav items aren't pages); cards stay route-less.

---

## D9 — Path-aware scope-guard reconciliation: finance vocabulary is allowed ONLY in Spec 009's own files + three registration touch-points; prior guards stay green

**Decision**: The Spec 009 `scope-guard.md` defines a **two-direction, explicit-file-list** audit (the 008 G8a technique, extended):
1. **No-leak direction** (must print nothing): grep the finance vocabulary (`invoice|payment|salary|payroll|payout|revenue|accounting|billing|gateway|fx|currency` + Arabic equivalents) over the Spec 001–008 file sets — `pages/dashboard.js`, `pages/reports.js`, `fixtures/reports.js`, `components/report-*.js` (minus the sanctioned pre-existing touch-points listed below), academic pages/fixtures/components (`family.js`, `student.js`, `teacher*.js`, `course*.js`, `group*.js`, …), and `locales/*.rep.js`/`*.trn.js`/etc.
2. **Allowed-here direction**: finance vocabulary lives in `pages/finance.js`, `fixtures/finance.js`, `components/finance-*.js`, `locales/ar.fin.js`/`en.fin.js`, plus exactly three shared registration touch-points — `nav.config.js` (one new item line + one `FUTURE_ROUTES` line), `build-html.mjs` (one import + one `PAGES` entry), `i18n.js` (two imports + two `deepMerge` lines) — and the one-line reason-copy edit in base `ar.js`/`en.js`.
3. **Built-page body checks** (smoke, not shell grep — a file grep over `public/dashboard.html` would false-positive on the sidebar's new label): the D3 body-scoped DOM assertions.
The guard also lists the **sanctioned pre-existing finance touch-points** that must NOT be flagged or removed: the Spec 001 `kpis.js` `revenue` KPI, the Spec 004 family `plan/hourRate` stub + disabled Manage-billing, the Spec 005 `att.act.addToCredit` disabled action, the settings `billingAlerts` toggle, the nav wallet items, and base-locale nav labels. New-file comments must avoid *other* specs' forbidden tokens (no `score/rank/chart` wording in finance comments), and finance comments must not claim derivation (D4).

**Rationale**: Specs 001–008 each grep **their own explicit file lists** (e.g. 008: `src/js/pages/reports.js src/js/fixtures/reports.js src/js/components/report-*.js src/locales/*.rep.js`) — Spec 009 touches none of those files, so all prior audits remain green by construction; the new guard makes that an asserted invariant instead of an accident. Broad repo-wide greps would fail on Spec 009's own legitimate vocabulary — path-aware allowlists are the only correct shape.

**Alternatives considered**: (a) relaxing the 008 guard to "finance allowed now" — rejected: 008's file set must stay finance-free (reports body stays finance-free forever per FR-017); (b) a single repo-wide grep with an exclude list — workable but brittle in review; explicit per-direction file lists match the house precedent and read as evidence.

---

## D10 — i18n & reuse inventory: a `fin.*` overlay pair merged last; strings and components itemized

**Decision**: New `src/locales/ar.fin.js` + `en.fin.js` (key-mirrored) carry ALL Spec 009 strings under: `nav.finance` (المالية / Finance), `topbar.title.finance` + `topbar.crumb.finance` (the Spec 005/007 new-page pattern), `finPage.*` (title/subtitle), `fin.status.*` (4), `fin.pay.*` (3), `fin.method.*` (3 generic: bankTransfer/card/cash — no gateway branding), `fin.tile.*`, `fin.sec.*`, `fin.act.*`, `fin.reason.*` (export/backend/send/cancelled), `fin.planned.*` (9 × title/desc), `fin.filter.*`, `fin.drawer.*`, and `data.fin.*` (authored months/notes). Registered in `i18n.js` after the `*.rep.js` block (2 imports + 2 `deepMerge` calls). The only base-locale edit is the `nav.reason.finance` truthfulness line (D2). Reused components (no new framework): `pageHeader`/`summaryCards`, `filterBar`, `noResults`/`emptyBox`, `chip`/`button`/`medallion`, `statusChip` pattern, `reportCard` + `availabilityChip` (Spec 008), `confirmAction`, `previewTemplate`/`sheetRow`, `toast`, the `data-filter-set` tile mechanism, and the shell (`shellMarkup`/sidebar/topbar). New components: exactly `finance-status.js` + `finance-actions.js`; invoice/payment row + drawer builders live inline in `pages/finance.js` (single-page use — the `reports.js` precedent), not as shared components.

**Rationale**: Matches the one-overlay-per-spec + one-prefix-per-spec convention (`trn.*`, `rep.*` → `fin.*`); `deepMerge` order (base → … → rep → fin) lets the overlay add `nav.finance`/topbar keys without touching base dictionaries. Keeping rows inline avoids component sprawl for single-page markup (008 built all its sections inline; `outcome-row.js`/`group-row.js` earned component status only by multi-page reuse).

**Alternatives considered**: (a) overriding `nav.reason.finance` from the fin overlay instead of editing base — workable via deepMerge leaf override, but rejected: base copy edited in place is more discoverable and avoids establishing an overlay-overrides-base convention; (b) a shared `invoice-row.js` component — deferred until a second surface (e.g. a future family-profile billing tab enrichment) actually reuses it.

---

## Summary of new/edited artifacts (informs data-model + tasks)

**New (N)**: `src/js/pages/finance.js` · `src/js/components/finance-status.js` · `src/js/components/finance-actions.js` · `src/js/fixtures/finance.js` · `src/locales/ar.fin.js` · `src/locales/en.fin.js` → produce `public/finance.html` + `public/finance.en.html`.
**Edited (E)**: `src/js/nav.config.js` (+1 item, +1 `FUTURE_ROUTES` line) · `scripts/build-html.mjs` (+1 import, +1 `PAGES` entry) · `src/js/i18n.js` (+2 imports, +2 merges) · `src/locales/ar.js`/`en.js` (1 line each: `nav.reason.finance` copy) · `src/styles/app.css` (minor: finance tile/row spacing classes reusing existing tokens/tones) · `tests/smoke/run.cjs` (+`'finance'` in PAGES + Spec 009 assertion block + dashboard/reports body-scoped checks) · `tests/a11y/run.cjs` (+finance entries) · `tests/screenshots/capture.cjs` (+Spec 009 MATRIX block + drawer/confirm/filter driver lines) · `README.md` (+Spec 009 Django bullet; annotate the Spec 001 "Out" line) · `screenshots/REVIEW.md` (+Spec 009 section at acceptance time).
**Untouched (binding)**: `pages/dashboard.js`, `pages/reports.js`, `fixtures/reports.js`, `components/report-card.js`/`report-status.js`/`report-actions.js` (imported, not edited), all academic pages/fixtures/components, `fixtures/teachers.js` (no pay fields), `nav` statuses of the seven locked finance items.
