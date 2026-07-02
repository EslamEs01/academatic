---
description: "Task list for Spec 009 — Finance, Billing & Payments Shell"
---

# Tasks: Finance, Billing & Payments Shell

**Input**: Design documents from `specs/009-finance-billing-payments/` (plan.md, spec.md, research.md D1–D10, data-model.md §1–§11, quickstart.md, 13 contracts)
**Tests**: **INCLUDED** — the spec mandates smoke/a11y/screenshot extension (FR-021, SC-008) and the two build-time guards; test tasks are part of the story phases they verify.
**App root**: `academy-dashboard-discovery/app/` (all paths below relative to it unless noted). Spec docs live in `academy-dashboard-discovery/specs/009-finance-billing-payments/`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: different files, no dependency on an incomplete task
- **[Story]**: US1–US10 (story phases only)
- Every task names its exact file(s)

## Story sequencing rationale (read first)

US1→US2→US3 (all P1) build the shell, then its two fixture-backed sections — **MVP = US1+US2+US3** (plan.md Phasing). The P2 stories follow in dependency-cheapest order: US7 (filters — needs the US2 rows to filter), US6 (actions — needs rows + drawers), US5 (planned cards — independent section), US4 (source-links audit — needs all sections placed). P3 gates close it out: US8 (nav/dashboard/reports body-scoped honesty — needs the final page so assertions are stable), US9 (static/Django), US10 (screenshot acceptance — the final gate). The foundational phase is strictly blocking: the page module imports the fixture, both status maps, the actions cluster, and the locale overlay on its first line of work.

**Binding invariants carried from the contracts (apply to every task):** no runtime money arithmetic anywhere (amounts = authored literals; tiles = row counts); no new `data-*` hook; no `enhance.js` change; no receipt/upload affordance; chips never mutate; `pages/dashboard.js` / `pages/reports.js` / `fixtures/reports.js` / `components/report-*.js` / academic modules are **never edited** (report components are imported only); finance vocabulary only in the new finance files + the three registration touch-points + the 1-line reason copy (scope-guard G8).

---

## Phase 1: Setup

**Purpose**: Confirm a green pre-Spec-009 baseline so the body-scoped invariant has a reference point.

- [X] T001 Baseline: in `academy-dashboard-discovery/app/`, run `npm run build && npm test` and confirm green (19 bases / 38 pages + index, smoke + a11y pass); note that `public/dashboard.html`/`public/reports.html` bodies are the pre-009 reference for the US8 body-scoped checks

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The fixture, both status maps, the actions cluster, and the locale overlay — everything `pages/finance.js` imports. **⚠️ No user-story work can begin until this phase is complete.**

- [X] T002 [P] Create `src/locales/ar.fin.js` — Arabic overlay: `nav.finance` («المالية»), `topbar.title.finance` + `topbar.crumb.finance`, `finPage.*` (title/subtitle), `fin.status.*` (4), `fin.pay.*` (3), `fin.method.*` (3 generic), `fin.tile.*`, `fin.sec.*`, `fin.act.*` (labels + toasts), `fin.reason.*` (export/backend/send/cancelled), `fin.planned.*` (9 × title/desc), `fin.filter.*`, `fin.drawer.*`, `data.fin.*` (months/date hints/notes) — calm product wording, no legacy codes (research D10)
- [X] T003 [P] Create `src/locales/en.fin.js` — English overlay, **key-mirrored 1:1** with `ar.fin.js` (smoke raw-key check depends on it)
- [X] T004 [P] Create `src/js/components/finance-status.js` — `INVOICE_STATUS` (exactly `paid/unpaid/overdue/cancelled`) + `PAYMENT_STATUS` (exactly `recorded/pending/returned`) in the house shape (`{id,tone,icon,labelKey}` + `*_ORDER` + `xOf()` + `xChip()`); tones only `completed/amber/cancelled/neutral/upcoming`; icons verified against `public/assets/icons/icons.json`; imports `chip` from `./ui.js` ONLY — no availability map here (it is reused, `finance-status-contract.md` §1)
- [X] T005 [P] Create `src/js/fixtures/finance.js` — authored `INVOICES` (~9 rows: every status ≥1; `fam5` ≥1 `overdue`; `fam3`/`fam8` none; the one `cancelled` = `fam7`, no payments; real family/student/course/group ids; authored `amount` literals + `unit.sar`; serials/months/due hints per data-model §1) + `PAYMENTS` (~6 rows, every status ≥1, all → existing non-cancelled invoices, `familyId` = invoice's family) + `FINANCE_SUMMARY` (**row counts via `.filter(…).length` only**) + `PLANNED_FINANCE` (9 cards: `monthlyInvoices` planned + 8 backendRequired per `planned-finance-contract.md` §1) + `INVOICE_BY_ID`/`invoicesOfFamily()` + the **throwing build-time coherence guard** (data-model "Fixture coherence rules"); comments state amounts are authored demo literals (never "derived") and avoid score/rank/chart tokens
- [X] T006 [P] Create `src/js/components/finance-actions.js` — `financeActions()` page cluster (Create invoice/Export CSV/Export PDF = disabled-with-reason · Print = demo toast) + `invoiceRowActions(inv)` (View drawer · Record payment confirm→demo, **disabled-with-reason when `inv.statusId==='cancelled'`**) + `invoiceDrawerActions(inv)` (Mark paid + Send reminder confirm→demo · Send invoice disabled · Print demo) — exact matrix from `finance-actions-contract.md` §1; only `demo/off/link/confirmAction` primitives; **no `uploadReceipt` anything**
- [X] T007 Register the overlay in `src/js/i18n.js` — +2 imports (`ar.fin.js`/`en.fin.js`) + 2 `deepMerge` calls **after** the `*.rep.js` block, with the house `// Spec 009 …` comment (depends on T002, T003)

**Checkpoint** 🎯: foundation compiles standalone (`node -e "import('./src/js/fixtures/finance.js')"` passes the coherence guard); no page exists yet.

---

## Phase 3: User Story 1 — Admin opens the Finance shell (Priority: P1) 🎯 MVP start

**Goal**: `finance.html`/`finance.en.html` exist with header, action cluster, four count-only tiles, section shells, and correct nav/topbar — the one new page + one born-and-promoted nav item.

**Independent Test**: Build; open both pages with JS disabled — complete shell renders; sidebar shows one new «المالية» link + six still-locked wallet items; tile counts equal fixture row counts (spec US1 acceptance).

- [X] T008 [US1] Create `src/js/pages/finance.js` — `renderFinance()` skeleton: `pageHeader({titleKey:'finPage.title', subKey:'finPage.subtitle'})` + `financeActions()` + four invoice-status tiles (counts from `FINANCE_SUMMARY.invoices`, each a `data-filter-set="status:<id>"` button with `data-target="#invoice-list"`, the attendance tile pattern) + empty section shells for invoices/payments/planned + NO money-total tile (`finance-page-contract.md` §2–§3)
- [X] T009 [P] [US1] Edit `src/js/nav.config.js` — insert `item({ id: 'finance', labelKey: 'nav.finance', icon: 'wallet', route: 'finance.html' })` in the `reports` category directly before `invoices`; add `finance: 'finance.html'` to `FUTURE_ROUTES`; **nothing else moves** (`navigation-impact-contract.md` §1–§2)
- [X] T010 [US1] Edit `scripts/build-html.mjs` — `import { renderFinance } from '../src/js/pages/finance.js';` + PAGES entry `{ base: 'finance', activeId: 'finance', titleKey: 'topbar.title.finance', crumbKey: 'topbar.crumb.finance', render: renderFinance }` under a `// Spec 009 — …` comment (depends on T008)
- [X] T011 [P] [US1] Edit `src/locales/ar.js` + `src/locales/en.js` — ONE line each: update `nav.reason.finance` copy to stay truthful (real billing backend still required; the Finance page is a fixture-only preview) per `navigation-impact-contract.md` §3
- [X] T012 [US1] Build & verify: `npm run build` green (20 bases / 40 pages + index; nav guard + coherence guard silent); open `public/finance.html` + `public/finance.en.html` — activeId `finance` pill, reports panel is the single visible panel, topbar title/crumb resolve, tiles = row counts, zero `⟦key⟧` (depends on T008–T011)

**Checkpoint** 🎯: the Finance shell is reachable from the sidebar and honest at the shell level.

---

## Phase 4: User Story 2 — Admin reviews family invoices (Priority: P1) 🎯 MVP

**Goal**: The fixture-authored invoice list + the baked invoice drawer.

**Independent Test**: Count rendered rows per status vs tiles (equal); `fam5` shows an overdue row; `fam3`/`fam8` none; drawer opens from baked `<template>` with no computed total (spec US2 acceptance).

- [X] T013 [US2] Add invoice rows to `src/js/pages/finance.js` — `invoiceRow(inv)` baked into `#invoice-list`: serial (LTR span) · family link → `family.html` · month · due hint · authored amount + `unit.sar` (LTR) · course/group context link · `invoiceStatusChip(inv.statusId)` · `invoiceRowActions(inv)`; facet attrs `data-row data-status data-family` + search haystack (`invoice-section-contract.md` §1)
- [X] T014 [US2] Add baked invoice drawers to `src/js/pages/finance.js` — one `previewTemplate('inv-'+inv.id, …)` per invoice with `sheetRow` lines (serial/family/students/course/group/month/dates/amount lines labeled display-only — **no total line** — /status chip/note) + `invoiceDrawerActions(inv)` (`invoice-section-contract.md` §4; depends on T013 for shared row helpers)
- [X] T015 [US2] Edit `src/styles/app.css` — minor finance classes (tile row spacing, invoice/payment row grid, drawer amount-line styling) reusing existing tokens + chip tones only; NO new tone, NO chart CSS; confirm nothing new needs the tailwind safelist

**Checkpoint** 🎯: the primary admin question ("which families have unpaid/overdue invoices?") is answerable at a glance.

---

## Phase 5: User Story 3 — Admin reviews payment status (Priority: P1) 🎯 MVP complete

**Goal**: The short fixture-authored recent-payments list.

**Independent Test**: Every payment row shows date/family-link/invoice-serial(→ that invoice's drawer)/authored amount/method chip/status chip; every reference resolves to a non-cancelled invoice (spec US3 acceptance).

- [X] T016 [US3] Add the recent-payments section to `src/js/pages/finance.js` — `paymentRow(p)` rows: date label · family link · invoice serial as `data-drawer="inv-<invoiceId>"` trigger · authored amount (LTR) · method label chip (`fin.method.*`) · `paymentStatusChip(p.statusId)`; NO filter form, NO facets, NO gateway names (`payment-section-contract.md`)

**Checkpoint** 🎯: **MVP complete (US1+US2+US3)** — build + manual review per quickstart "Finance page / invoices / payments" sections.

---

## Phase 6: User Story 7 — Admin filters invoices and payments (Priority: P2)

**Goal**: Tiles-as-filters + filter bar over the pre-rendered invoice rows.

**Independent Test**: Clicking the overdue tile leaves only overdue rows + selected tile state; a no-match combination shows `noResults` with reset; with JS off all rows are visible (spec US7 acceptance).

- [X] T017 [US7] Add filtering to `src/js/pages/finance.js` — `filterBar({ targetId: 'invoice-list', searchKey: 'fin.filter.searchPh', selects: [status, family] })` + `noResults()` after the list; verify the four T008 tiles narrow via the existing `data-filter-set` mechanism (facet `status` matches the select name) and the live count updates; NO new hook, payments list stays unfiltered (research D6)

**Checkpoint** 🎯: status-scan workflow works; JS-off degradation verified.

---

## Phase 7: User Story 6 — Admin uses invoice/payment actions honestly (Priority: P2)

**Goal**: The full action matrix behaves per contract, including the cancelled-invoice gate.

**Independent Test**: Every control yields exactly one contracted behavior (drawer/demo/confirm→demo/disabled-reason/link); after any action no chip changed and reload is identical; zero receipt affordances (spec US6 acceptance).

- [X] T018 [US6] Wire & verify the action matrix across `src/js/pages/finance.js` + `src/js/components/finance-actions.js` — confirm modals carry `fin.act.*` title/msg/cta/toast keys; the `cancelled` invoice's Record-payment renders the disabled-with-reason variant (build-time gate off `inv.statusId`); all disabled controls are keyboard-reachable with `aria-disabled` + reason `title`; walk every control on both languages per `finance-actions-contract.md` acceptance

**Checkpoint** 🎯: action honesty proven (SC-003) — nothing mutates, exports, sends, or persists.

---

## Phase 8: User Story 5 — Admin sees planned/backendRequired finance surfaces honestly (Priority: P2)

**Goal**: Nine figure-free planned payroll/accounting cards, 1:1 with the locked nav concepts.

**Independent Test**: Exactly 9 cards each with an availability chip (1 planned + 8 backendRequired), zero numbers, zero links; activating any card → reason toast; the payroll area's only real link is the academic teacher-performance link (spec US5 acceptance).

- [X] T019 [US5] Add the planned section to `src/js/pages/finance.js` — map `PLANNED_FINANCE` through the **imported** `reportCard(r)` route-less disabled variant (availability chip via the reused Spec 008 map — import from `../components/report-status.js`, never redefine); add the single academic context link → `teacher-performance.html` beside the section header with zero pay framing (`planned-finance-contract.md`; `source-links-contract.md` §2)

**Checkpoint** 🎯: sidebar locks ↔ shell cards tell one story; zero pay figures anywhere (SC-004).

---

## Phase 9: User Story 4 — Admin follows finance source links (Priority: P2)

**Goal**: Every outward link resolves, EN-aware.

**Independent Test**: `grep -c 'href="#"' public/finance*.html` → 0; clicking every family/student/course/group/sessions/attendance/teacher-performance link lands correctly in both languages (spec US4 acceptance).

- [X] T020 [US4] Source-link pass over `src/js/pages/finance.js` — apply the EN-aware href technique (the `reports.js` `localizeHref` pattern) to every row/drawer/section link; verify the closed target list of `source-links-contract.md` §1 and run its acceptance greps against the rebuilt pages

**Checkpoint** 🎯: 1-click reach guarantees hold (SC-001).

---

## Phase 10: User Story 8 — Dashboard and navigation impact stays minimal and honest (Priority: P3)

**Goal**: The body-scoped invariant is asserted by smoke, and both scope-guard directions are proven clean.

**Independent Test**: `git diff` empty for dashboard/reports/academic modules; smoke passes the new body-scoped + sidebar assertions; Spec 008's own smoke block + G8a audit still green (spec US8 acceptance).

- [X] T021 [US8] Edit `tests/smoke/run.cjs` — add `'finance'` to the `PAGES` array (inherits all IA/raw-key/no-dead-button asserts) + the Spec 009 finance-page block: 4 tiles whose numbers equal `#invoice-list` row counts per status · ≥1 chip per invoice/payment status id · honest actions present (≥3 disabled-with-reason on the cluster, ≥1 confirm, ≥1 demo, the cancelled row's gated action) · baked drawer templates exist · zero `href="#"` · **no receipt/upload/`type="file"` token in the page body**
- [X] T022 [US8] Edit `tests/smoke/run.cjs` (same file — after T021) — the body-scoped integration checks: on `dashboard` + `reports` (both langs) run the finance-token regex (EN + AR lists, `dashboard-impact-contract.md` §3) against `document.getElementById('page-body').innerText` → clean; sidebar contains exactly one `a[href$="finance.html"]`; the six wallet items remain `[data-nav-status="disabled"][aria-disabled="true"]` with the lock icon; no `finance.html` link inside either page's `#page-body`
- [X] T023 [US8] Run the audits — `contracts/scope-guard.md` G8a blocks 1–7 (both directions) + re-run Spec 008's `contracts/scope-guard.md` G8a verbatim + `git diff --stat` proves `pages/dashboard.js`, `pages/reports.js`, `fixtures/reports.js`, `components/report-*.js`, `enhance.js`, and all academic modules are untouched; record results for the REVIEW.md automated footer

**Checkpoint** 🎯: SC-005 + SC-006 proven; the eight predecessor guards remain green.

---

## Phase 11: User Story 9 — Experience stays static, Django-ready, bilingual, themed (Priority: P3)

**Goal**: Architecture + portability gates.

**Independent Test**: View-source with JS disabled shows everything; a11y critical = 0 on finance (ar/en × light/dark); README documents the Django mapping (spec US9 acceptance).

- [X] T024 [P] [US9] Edit `tests/a11y/run.cjs` — add `finance` entries (ar/en × light/dark) to the axe MATRIX
- [X] T025 [US9] Verify SD rules + document portability — no-JS view-source pass on both built pages (SD1/SD2/SD6/SD7 per `static-html-django-ready-contract.md` acceptance); edit `README.md` (repo `academy-dashboard-discovery/app/README.md`): add the **Spec 009** Django-portability bullet after the Spec 008 bullet (mapping table SD8: invoice/payment loops, chip tags, one drawer partial, sidebar `{% url 'finance' %}`, six items stay disabled) and annotate the Spec 001 "Out" line (finance now exists as a fixture-only shell; real engines still out)

**Checkpoint** 🎯: SC-008 automated half green; Django story written down.

---

## Phase 12: User Story 10 — Visual and reference alignment (Priority: P3)

**Goal**: The 8-frame screenshot matrix captured and human-reviewed — the final gate.

**Independent Test**: All frames pass every A2b criterion with zero A4 failure conditions; verdicts recorded (spec US10 acceptance).

- [X] T026 [US10] Edit `tests/screenshots/capture.cjs` — append the Spec 009 MATRIX block (7 entries from `screenshot-acceptance.md` A2a) + driver lines: `financeDrawer` → click first `#invoice-list [data-drawer]`; `financeConfirm` → click first `#invoice-list [data-confirm]`; `financeFilter` → click `[data-filter-set="status:overdue"]`
- [X] T027 [US10] Capture + review — `npm run screenshots`; review each frame against A2b criteria + A4 failure list (vs the approved Spec 001 design, Specs 002–008 frames, and legacy finance screens as product reference only); add the `## Spec 009 — Finance, Billing & Payments Shell — <date>` section to `screenshots/REVIEW.md` (verdict table + failure-conditions paragraph + automated footer from T023); any FAIL blocks acceptance and loops back to the offending task

**Checkpoint** 🎯: visual acceptance recorded — the spec's final gate.

---

## Phase 13: Polish & Cross-Cutting Concerns

- [X] T028 Full gate run per `quickstart.md` "Verify — gates": `npm run build` (20 bases, guards silent) → `npm test` (smoke incl. Spec 009 + body-scoped blocks; axe critical=0) → both G8a audits → quickstart walkthrough end-to-end (every "How to review/verify" section) → confirm reload-idempotence after confirm-actions; fix-and-rerun until all green

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (P1)** → **Foundational (P2)** → story phases. Foundational **blocks everything** (the page imports all five foundational modules).
- Story order: US1 → US2 → US3 (MVP) → US7 → US6 → US5 → US4 → US8 → US9 → US10 → Polish. US8/US10 must run **after** the page is content-complete (their assertions/frames are otherwise unstable).
- T007 depends on T002+T003 · T010 on T008 · T012 on T008–T011 · T014 on T013 · T017 on T008+T013 · T018 on T013+T014+T006 · T022 on T021 · T027 on T026 + all page phases · T028 last.

### Same-file serialization (never run these in parallel)

- `src/js/pages/finance.js`: T008 → T013 → T014 → T016 → T017 → T018 → T019 → T020 (one writer at a time)
- `tests/smoke/run.cjs`: T021 → T022
- `src/locales/ar.js`/`en.js`: T011 only (do not fold into T002/T003)

### Parallel opportunities

- Phase 2: T002 ∥ T003 ∥ T004 ∥ T005 ∥ T006 (five different new files); T007 immediately after the locale pair.
- Phase 3: T009 ∥ T011 while T008 is in progress; T010 after T008.
- T015 (app.css) ∥ T016; T024 (a11y) ∥ T021/T022 (different files); T026 ∥ T025.

## Parallel Example: Foundational phase

```bash
# Five new files, no interdependencies — launch together:
Task: "Create src/locales/ar.fin.js (Arabic finance overlay)"
Task: "Create src/locales/en.fin.js (key-mirrored English overlay)"
Task: "Create src/js/components/finance-status.js (two labeled maps)"
Task: "Create src/js/fixtures/finance.js (authored data + coherence guard)"
Task: "Create src/js/components/finance-actions.js (honest action cluster)"
# then: register the overlay in src/js/i18n.js
```

## Implementation Strategy

### MVP path

1. Phase 1 (baseline) → Phase 2 (foundation) → Phase 3 (US1 shell + registration) → Phase 4 (US2 invoices) → Phase 5 (US3 payments).
2. **STOP and VALIDATE**: build green, both pages complete without JS, tiles = row counts, fam5-overdue/fam3-empty/fam7-cancelled coherence visible. This is the demo-able MVP.

### Incremental delivery

Each subsequent phase (filters → actions → planned cards → links → honesty gates → static/Django → screenshots) is independently reviewable against its contract's acceptance list; the page stays shippable after every checkpoint. Polish (T028) is the exit gate.

### Notes

- Tests are integrated per story (T012 build-verify, T021–T023 smoke/audits, T024 a11y, T026–T027 screenshots) rather than TDD-first — matching the Specs 005–008 pattern where build/smoke/screenshot gates verify baked output.
- The user's standing instruction: no commits/pushes are made by these tasks; committing is a separate user decision.
- If any G8a audit or body-scoped check fails, fix the offending file — never widen the allowlist (scope-guard G8: nothing Spec 009 adds may need the sanctioned-touch-point exclusion list).
