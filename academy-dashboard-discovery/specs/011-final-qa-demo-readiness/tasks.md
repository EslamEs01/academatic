# Tasks: Admin Console Final QA Hotfix & Demo Readiness

**Input**: Design documents from `academy-dashboard-discovery/specs/011-final-qa-demo-readiness/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D5) · data-model.md · contracts/ (9) · quickstart.md
**Tests**: Two existing Spec 010 smoke assertions are corrected to the fixed state (research D3) — no new test file; the harness re-runs everything at the gate.
**App root**: `academy-dashboard-discovery/app/` (all `src/`, `tests/`, `scripts/`, `public/` paths below are relative to it). Spec folder: `academy-dashboard-discovery/specs/011-final-qa-demo-readiness/`.

**Organization**: By user story, sequenced per research D5. This is a two-fix hotfix; the fixes are independent files (dashboard.js vs sidebar.js) and parallelizable.

## Phase 1: Setup (baseline gate)

**Purpose**: Prove the pre-change tree is green so every later diff is attributable to Spec 011.

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` and `npm test` (smoke + a11y); confirm green and record the baseline (build ok · smoke pass count · a11y critical=0/serious=0 · HEAD `0ee1965`) as the stub of the "Spec 011" section in `app/screenshots/REVIEW.md`. Confirm the two pre-fix findings still hold: `grep -c 'href="#"' public/dashboard.html public/dashboard.en.html` = 1 each (0 elsewhere) and the sessions badge reads Western "24" on `dashboard.html`.

---

## Phase 3: User Story 1 — Dashboard has no dead Overview link (Priority: P1) 🎯 MVP

**Goal**: The dashboard Overview "View all metrics" link points to a real page; zero `href="#"` on both dashboard files; nothing else on the dashboard changes.

**Independent Test**: Build; `grep -c 'href="#"' public/dashboard.html public/dashboard.en.html` = 0; the Overview link opens the language-correct reports page; dashboard `#page-body` differs from `HEAD` only at the Overview href.

- [x] T002 [US1] In `src/js/pages/dashboard.js`, add a language-aware `linkHref` to the Overview `sectionHeader({ titleKey: 'section.overview', linkKey: 'section.overviewLink' })` call (line ~94): `linkHref: getLang() === 'en' ? 'reports.en.html' : 'reports.html'` (reuse the file's existing `getLang()` href idiom; do NOT modify the shared `sectionHeader()` in `ui.js`) — per `contracts/dashboard-overview-link-contract.md` / research D1
- [x] T003 [US1] Rebuild (`npm run build`) and verify: `grep -c 'href="#"' public/dashboard.html public/dashboard.en.html` = 0 both; the Overview `<a>` now targets `reports.html`/`reports.en.html`; confirm the dashboard `#page-body` diff vs `HEAD` is limited to the Overview `href` value (`git show HEAD:public/dashboard.html` body-region vs current — only that `<a href>` differs), with zero added/removed cards/stats/widgets

---

## Phase 4: User Story 2 — Arabic sessions badge uses localized digits (Priority: P1) 🎯 MVP

**Goal**: Arabic sidebar sessions badge shows Arabic-Indic digits (٢٤); English shows Western (24); both equal `SESSIONS.total`.

**Independent Test**: Build; read the badge from `dashboard.html` (Arabic-Indic) and `dashboard.en.html` (Western); both equal the fixture count; no literal `24` reintroduced in `nav.config.js`.

- [x] T004 [P] [US2] In `src/js/components/sidebar.js`, import `num` from `../i18n.js` and render the sessions badge through it — change `<span class="badge nav-badge tabular">${it.badge}</span>` (line ~37) to `${num(it.badge)}`; leave `nav.config.js` unchanged (`badge: SESSIONS.total`) — per `contracts/localized-nav-badge-contract.md` / research D2
- [x] T005 [US2] Rebuild and verify: Arabic pages show the sessions badge in Arabic-Indic digits equal to `SESSIONS.total` (e.g. ٢٤), English pages show Western digits (24); grep confirms `nav.config.js` still `badge: SESSIONS.total` and no new `badge:` literal number anywhere

**Checkpoint**: MVP fixes landed (T002–T005). Tests updated next so the suite matches the fixed state.

---

## Phase 5: User Story 3 — Final link & truthfulness sweep passes (Priority: P2)

**Goal**: The smoke suite matches the fixed state and the full sweep is green.

**Independent Test**: `npm run test:smoke` passes, including the locale-aware badge assertion and the zero-`href="#"`-everywhere link crawl.

- [x] T006 [US3] In `tests/smoke/run.cjs`, make the sessions-badge assertion locale-aware (research D3 / `contracts/link-truthfulness-contract.md` §2): replace `ok(nav010.sessBadge === SESSIONS_TOTAL, …)` (line ~831) with an expected value computed per language — `const expBadge = new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ar-EG').format(Number(SESSIONS_TOTAL)); ok(nav010.sessBadge === expBadge, …)` — asserting the badge equals the localized form of `SESSIONS.total`
- [x] T007 [US3] In `tests/smoke/run.cjs`, tighten the link-crawl `deadHash` assertion (line ~853) from `ok(links010.deadHash === (page === 'dashboard' ? 1 : 0), …)` to `ok(links010.deadHash === 0, …)` for every page, and update the accompanying comment to note the dashboard follow-up is closed (research D3)
- [x] T008 [US3] Run `npm run test:smoke` — PASS in both languages (locale-aware badge holds; zero `href="#"` sitewide; link crawl finds no dead/external/nonexistent targets; planned/disabled/future-role truthfulness sweep intact; zero raw keys)

---

## Phase 6: User Story 4 — Contract-frozen bodies remain safe (Priority: P2)

**Goal**: Reports/finance untouched; dashboard body limited to the Overview fix; all prior guards green.

**Independent Test**: `git diff` empty on reports/finance modules; reports/finance `#page-body` byte-identical to `HEAD`; Spec 008/009/010 guard audits all `ok`.

- [x] T009 [US4] Verify guarded bodies: `git diff --name-only HEAD -- src/js/pages/reports.js src/js/pages/finance.js src/js/fixtures/reports.js src/js/fixtures/finance.js src/js/components/report-*.js src/js/components/finance-*.js src/locales/*.fin.js src/js/enhance.js src/js/nav.config.js src/js/i18n.js package.json` is EMPTY; and the reports + finance `#page-body` regions are byte-identical to `HEAD` (node body-region compare, the Spec 010 technique)
- [x] T010 [US4] Run the Spec 011 `contracts/scope-guard.md` G3 audit (7 checks) + re-run Spec 008 reports-body grep, Spec 009 G8a (#1 no-leak, #2 no-engine, #3 no-money-arith, with Spec 010's amendments), and Spec 010 G7 — every line prints `ok`

---

## Phase 7: User Story 5 — Demo screenshots prove the fix (Priority: P3)

**Goal**: Visual acceptance of the two fixes + sidebar health, no regression.

**Independent Test**: Frames captured and human-reviewed PASS against the failure conditions.

- [x] T011 [US5] Run `node tests/screenshots/capture.cjs` (frames already exist in the MATRIX; no driver change expected) — zero console errors
- [x] T012 [US5] Human-review and record verdicts in the `app/screenshots/REVIEW.md` Spec 011 section: dashboard AR light + EN light (Overview link intentional, no dead `#`), Arabic sidebar sessions badge = ٢٤, English sidebar badge = 24, mobile AR sidebar intact; confirm no visual regression vs the pre-Spec-011 dashboard frame; fix + recapture any FAIL

---

## Phase 8: Polish & Final Gate

- [x] T013 Prior-doc reconciliation (research D4, reference-to-fixed-follow-up only): tighten Spec 010 `contracts/scope-guard.md` G7 #4 to "zero href=# on every page (closed by Spec 011)"; add a one-line "Resolved in Spec 011" annotation to the accepted-follow-up note in Spec 010 `page-coverage-audit.md` and the Spec 010 section of `app/screenshots/REVIEW.md` — no classification/matrix content changed
- [x] T014 Docs: add the Spec 011 Django-mapping note to `README.md` (`<a href="{% url 'reports' %}">` for the Overview link + a localized-digit filter for the sessions badge); finalize the `app/screenshots/REVIEW.md` Spec 011 acceptance section (verdict table + failure-conditions note + the resolved-follow-ups record per FR-014)
- [x] T015 Final gate: `npm run build` (nav + coherence + chip-tone guards silent) → `npm test` (smoke PASS both languages · a11y critical=0 serious=0) → Spec 011 G3 + Spec 008/009/010 audits all `ok` → walk SC-001…SC-010 and record the confirmation list in `app/screenshots/REVIEW.md`; verify `git status` shows only the allowed change surface; NO commit, NO push

---

## Dependencies & Execution Order

- **T001 gates everything.** The two fixes (T002–T003 dashboard.js · T004–T005 sidebar.js) are independent files and may proceed in parallel.
- **Test updates (T006–T008) must land with/after the fixes**: T006 (badge assert) depends on T004 (else the old exact-string assert fails on Arabic); T007 (deadHash) depends on T002 (else expects the old dashboard `href="#"`). Run T008 after both.
- **T009–T010 (guards) after the fixes + test updates.** T011–T012 (screenshots) after the build is final. T013–T014 (docs) after verification. T015 last.

## Parallel Opportunities

- T002/T003 (dashboard.js) ∥ T004/T005 (sidebar.js) — different files, no shared state.
- T006 ∥ T007 within `tests/smoke/run.cjs` (different assertions; land in one edit pass, then T008 runs the suite once).

## Implementation Strategy

**MVP = T001–T008** (both fixes + the two corrected assertions + green smoke): the demo-ready outcome. Then guards (T009–T010), screenshots (T011–T012), docs/reconciliation (T013–T014), final gate (T015). Every increment ends with build + smoke green; nothing is committed or pushed at any point (do not trigger the auto-commit hook).
