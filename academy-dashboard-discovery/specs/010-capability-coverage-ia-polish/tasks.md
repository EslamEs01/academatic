# Tasks: Full Academy Capability Coverage, Navigation IA & Admin Experience Polish

**Input**: Design documents from `academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D12) · data-model.md · contracts/ (14) · quickstart.md
**Tests**: Test-harness updates ARE in scope (the spec's FRs mandate smoke/screenshot extensions); no TDD ordering — assertions land with or right after their change, and the final gate re-runs everything.
**App root**: `academy-dashboard-discovery/app/` (all `src/`, `tests/`, `scripts/`, `public/` paths below are relative to it). Spec folder: `academy-dashboard-discovery/specs/010-capability-coverage-ia-polish/`.

**Organization**: By user story, sequenced per research D12 (documentation-first: matrix → nav IA → verification → polish). Story order within equal priority follows D12, not story number.

## Phase 1: Setup (baseline gate)

**Purpose**: Prove the pre-change tree is green so every later diff is attributable to Spec 010.

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` and `npm test` (smoke + a11y) and re-run the Spec 008 + Spec 009 scope-guard G8a audit blocks verbatim — ALL must be green BEFORE any change; stub the "Spec 010" section in `app/screenshots/REVIEW.md` recording this baseline (build ok · smoke pass count · a11y critical=0 · audits ok · HEAD hash)

---

## Phase 2: Foundational (artifact scaffolds — block US2/US3/US4/US5/US8)

**Purpose**: The two documentation artifacts every audit story writes into.

- [x] T002 [P] Create `specs/010-capability-coverage-ia-polish/legacy-capability-coverage.md` skeleton: grounding-sources header (output/combined + frontend-planning-deep citations), the nine classification group headings in D9 order, row-format legend (capability · legacy route(s) · what it did · destination · rationale), and the empty product-owner sign-off checklist (per `contracts/legacy-capability-coverage-contract.md` §1/§4)
- [x] T003 [P] Create `specs/010-capability-coverage-ia-polish/page-coverage-audit.md` skeleton: 20-row table (dashboard, sessions, schedule, attendance, families, add-family, family, students, student, teachers, teacher, teacher-performance, courses, course, groups, group, reports, finance, settings, gallery) × 10 dimension columns + fix-now list and future-log sections (per `contracts/page-coverage-audit-contract.md` §1)

**Checkpoint**: Skeletons exist — matrix population and nav work can proceed in parallel.

---

## Phase 3: User Story 2 — Every capability covered or honestly classified (Priority: P1) 🎯 MVP

**Goal**: The coverage matrix — zero silent gaps across the 339-page legacy system.

**Independent Test**: Read the matrix; look up all 19 legacy modules + the 15 mandatory named capabilities; sample 3 random routes from `output/combined/page-inventory.md` — every lookup resolves to exactly one classified row.

- [x] T004 [US2] Populate the implementedNow / betterName / moved / merged groups in `legacy-capability-coverage.md` from the Specs 001–009 coverage map + legacy inventories (incl. Trainers→Teachers, Curricula→Courses, Tickets→Tasks, "Courses List"→Materials renames; finance ~10-entries→one-shell move; attendance un-embedding; quick-queues→session-UI merge)
- [x] T005 [P] [US2] Populate the planned + backendRequired groups: map all 20 planned nav items and the 7 locked finance items + 9 Spec 009 planned cards to their legacy capabilities (incl. notification settings matrix→settingsNotifications, CSV import/backup→settingsSecurity, RBAC ~170-flag matrix→settingsUsers/staff, WhatsApp/Email config→settingsIntegrations, certificate designer→certificates, currency-rates→accountingExpenses card, Zoom surfaces→backendRequired)
- [x] T006 [P] [US2] Populate the future-role group: all 26 teacher-portal and 13 family/student-portal legacy pages (groupable rows), each matching the `FUTURE_ROLE` register, none rendered in admin
- [x] T007 [P] [US2] Populate the intentionallyExcluded group with reasons: broken routes (message-builder 504; export-course/monthly-classes/scheduled-trials-index/family-feedback-detail/teacher+student-profile-views 500), `downlaod` typo route, thin features (tickets KPI shell, total-queues, WhatsApp insights), duplicate teacher-history routes, per-row pill anti-pattern, 161 query-param variants, unconfirmed exams module
- [x] T008 [US2] Populate the missingLogged group — the five audit-found gaps (forms/assessment builder, family feedback-meetings, teacher request-schedule/response workflow, per-session class feedback, Zoom live surfaces), each folded under its planned/backendRequired destination concept with rationale; add documentation rows for the dashboard revenue KPI, dev gallery, and index.html redirect (sanctioned artifacts)
- [x] T009 [US2] Completeness pass: verify 19/19 modules present, all 15 mandatory named rows exist (contract §2), classification uniqueness (one primary each), excluded/missing rows all have reasons; run the 3-random-route sample against `output/combined/page-inventory.md` and record the sample + results at the bottom of the matrix

**Checkpoint**: Matrix complete (sign-off walk happens in US8 after all changes land).

---

## Phase 4: User Story 1 — Complete, organized, truthful sidebar (Priority: P1) 🎯 MVP

**Goal**: The five accepted nav IA corrections, invariants proven on all 40 rebuilt pages.

**Independent Test**: Walk all six rail categories in AR + EN: finance sub-section groups 8 items under «المالية» in reports, banks gone from admin, families category reads «العائلات والطلاب», badge matches the sessions page total, no stale future route; build guard + smoke green.

- [x] T010 [US1] Add label keys in `src/locales/ar.js` + `src/locales/en.js`: new `cat.finance` («المالية» / "Finance") and relabel `cat.families` («العائلات والطلاب» / "Families & Students") — base nav labels only, both files in the same change (research D2)
- [x] T011 [US1] Restructure `src/js/nav.config.js` reports category per `contracts/navigation-ia-polish-contract.md` §1–2: top-level items exactly [reports, monthlyReports, dataAnalysis] + `sections:[{ titleKey:'cat.finance', items:[finance, invoices, monthlyInvoices, salaries, staffSalaries, payments, classSalaryReport, banks] }]`; REMOVE banks from the admin category (move, never duplicate; all seven locked items keep status/reasonKey/icon/labels unchanged)
- [x] T012 [US1] In `src/js/nav.config.js`: delete the four stale `FUTURE_ROUTES` entries (`attendance`, `groups`, `teacherKpi`, `finance`) and replace `badge: 24` with `badge: SESSIONS.total` (+ import `SESSIONS` from `./fixtures/sessions.js`) per research D5/D6
- [x] T013 [US1] Rebuild (`npm run build` — nav build-guard must stay silent) and extend `tests/smoke/run.cjs` nav assertions: reports panel renders the finance sub-section title + the 8 members in order with Finance the only link; admin panel = exactly 5 planned items, no banks; sidewide locked-finance count = 7 and sidebar finance links = 1 (existing asserts keep passing); rail = 6 categories; sessions badge text equals `SESSIONS.total`; families category label matches the new key in both languages
- [x] T014 [US1] Active-state verification (extend/confirm smoke): `finance.html` opens the reports category with `finance` active inside the sub-section; profile pages (family/student/teacher/course/group) still highlight their owning list items; gallery still zero-active — run full smoke, all green in both languages

**Checkpoint**: MVP complete (T001–T014): truthful IA + coverage matrix, shippable and reviewable.

---

## Phase 5: User Story 3 — Every page reachable, every crumb correct (Priority: P1)

**Goal**: Reachability and orientation locked in as verified truth.

**Independent Test**: For each of the 20 page bases ×2 languages: a nav path exists (direct item or documented in-page link), topbar title+crumb correct, exactly one active nav item (zero on gallery).

- [x] T015 [US3] Walk all 20 page bases ×2 languages and record the reachability + topbar/crumb + active-state audit columns in `page-coverage-audit.md` (per `contracts/topbar-header-contract.md` §3 — no title/crumb/topbar code change expected; any mismatch found becomes a fix-now item); confirm the gallery + index.html documentation rows landed in the matrix (from T008)

---

## Phase 6: User Story 4 — Better than legacy, documented (Priority: P2)

**Goal**: The rename/move/merge story made explicit and auditable.

**Independent Test**: Read the matrix's betterName/moved/merged groups: each row names legacy label/route → new destination → why better; the three planned-item overlaps are explicitly resolved.

- [x] T016 [US4] Write the overlap-resolution notes in `legacy-capability-coverage.md`: studentResult + studentEvaluation (planned) vs the implemented student-profile Results/Evaluation tabs; familyCategories (planned) vs the families filter facet — each states what exists today, what the future academy-wide page adds, and why the planned items stay (research D4); verify no legacy private wording or numeric status code appears anywhere in the matrix's new-system columns

---

## Phase 7: User Story 5 — Polished pages with working filters (Priority: P2)

**Goal**: The app-wide `[hidden]` defect fixed and proven page-by-page; the 20×10 audit finished with fix-now polish executed.

**Independent Test**: On every filterable page apply a narrowing filter — visually-rendered rows == claimed matches (computed style, not attributes); attendance (the confirmed-broken case) proven fixed; zero-match filters show labeled empty states.

- [x] T017 [US5] Add the shared rule to `src/styles/app.css`, placed after all component blocks: `[data-row][hidden] { display: none !important; }` — the only `!important` this spec permits; keep all existing narrow `[hidden]` rules (`contracts/filter-visibility-contract.md` §2)
- [x] T018 [US5] Extend `tests/smoke/run.cjs` with computed-visibility assertions for EVERY page with `[data-filter-form]`/`[data-filter-set]` (attendance, sessions, schedule list view, students, teachers, courses, groups, families, teacher-performance — finance's existing check (j) stays): apply a narrowing filter → count `getComputedStyle(row).display !== 'none'` == facet-matching rows; add a zero-match → empty-state-visible check where each page's filter form permits (contract §3)
- [x] T019 [US5] Rebuild + run full smoke: attendance proof case passes (the historical 10-hidden/15-visible failure is gone), all filterable pages pass both languages, and ALL existing tab/drawer/category-panel/wizard behaviors still pass (no over-hiding regression — contract §2 boundary)
- [x] T020 [US5] Complete all remaining cells of the 20×10 table in `page-coverage-audit.md` with fresh eyes/screenshots (purpose, content richness, link integrity, action honesty, bilingual, RTL/LTR, dark/mobile, legacy coverage, better-than-legacy, disposition); enumerate the fix-now list (copy/empty-state/token-level ONLY per `contracts/page-polish-contract.md` §1–2) and cross-reference every future cell to a matrix row
- [x] T021 [US5] Execute every fix-now PolishAction (both locales in the same change, Arabic-first quality, no raw keys, no structural additions); check each off in `page-coverage-audit.md` with its named verification (smoke assert / frame / grep); rebuild

---

## Phase 8: User Story 6 — Connected pages, no dead ends (Priority: P2)

**Goal**: The one sanctioned family→finance shortcut + the app-wide link-integrity proof.

**Independent Test**: From family.html's Plan & Billing tab, reach the finance shell in one click (language-correct target, honest label); crawl all 40 pages — zero `href="#"`, zero dead targets.

- [x] T022 [P] [US6] Add the key pair `fam.bill.viewInvoices` to `src/locales/ar.fam.js` + `src/locales/en.fam.js` — honest fixture-preview wording (AR e.g. «عرض فواتير العائلة في صفحة المالية (معاينة تجريبية)» / EN "View family invoices on the Finance page (fixture preview)") per `contracts/source-links-contract.md` §1
- [x] T023 [US6] Add the real `<a>` link to the finance shell in `billingPanel()` of `src/js/pages/family.js`, next to the existing disabled Manage-billing button — existing button/link idiom, EN-aware href (`finance.html`/`finance.en.html`); THE only guarded-file edit in Spec 010
- [x] T024 [US6] Amend `specs/009-finance-billing-payments/contracts/scope-guard.md` additively with attribution (research D10 / Spec 010 scope-guard G6): G8a block-1 exclusion list += `fam\.bill\.viewInvoices` and the family-page finance-href token, each annotated "(Spec 010 sanctioned touch-point: family→finance shortcut)"; G8b question 5 += the family.js exception sentence — NO pattern widened, NO file unlisted
- [x] T025 [US6] Extend `tests/smoke/run.cjs`: family body finance-link count == 1 (both languages), dashboard/reports body finance links still 0 (existing asserts untouched); add the all-pages link-integrity crawl (every `a[href]` resolves to an existing `public/` file, in-page hash, or documented hash-view; zero `href="#"`, zero absolute/external) — rebuild + run, all green

---

## Phase 9: User Story 7 — Honest planned/backendRequired story everywhere (Priority: P2)

**Goal**: Exhaustive truthfulness sweep — nothing not-yet-real looks working.

**Independent Test**: Activate every planned/disabled nav item and inspect every planned/backendRequired card: no navigation, no mutation, visible label/reason, figure-free finance cards.

- [x] T026 [US7] Add/verify the truthfulness sweep in `tests/smoke/run.cjs` per `contracts/planned-backendrequired-contract.md` §2: all 20 planned items = «قريبًا» buttons that navigate nowhere and mutate nothing; all 7 locked items expose the truthful reason with `aria-disabled` + lock icon; the 9 finance planned cards keep availability chips + zero digits (existing Spec 009 asserts confirmed still green); Spec 008 planned report cards unchanged; future-role portal absence checks still pass — run full smoke both languages

---

## Phase 10: User Story 9 — Still static, still honest, still Django-ready (Priority: P3)

**Goal**: Architecture re-proven; every guard green on the final tree.

**Independent Test**: Full build + smoke + a11y + the Spec 010 G7 audit + Spec 008/009 audits — every line `ok`; git diff review shows only the allowed change surface.

- [x] T027 [US9] Add the chip-tone build guard to `scripts/build-html.mjs`: after rendering each page, scan the HTML for `chip tone-([a-z-]+)`; every capture MUST be in `{live, upcoming, completed, cancelled, amber, neutral}` else `throw` (build fails naming the page + tone) — per data-model "Build-time guard additions"; rebuild to prove it passes on the current tree
- [x] T028 [US9] Run the complete Spec 010 scope-guard G7 audit block (`contracts/scope-guard.md`) + re-run Spec 008's and Spec 009's G8a blocks (009 with its two attributed amendments) — every line prints `ok`; verify guarded-set `git diff` is empty (dashboard/reports/finance modules + their fixtures/components, `enhance.js`, `package.json`, all non-sessions-read fixtures) and `git status` shows zero new files under `src/`/`scripts/`
- [x] T029 [US9] Update `README.md`: Spec 010 Django-mapping bullets (finance sub-section = nested section include like teachersPerf; `cat.*` labels = translation catalog; badge = context variable; family link = plain `{% url %}` anchor; `[data-row][hidden]` = template-agnostic CSS) + note the coverage/audit artifacts as documentation-only — per `contracts/static-html-django-ready-contract.md` §3

---

## Phase 11: User Story 8 — Coverage matrix signed off (Priority: P3)

**Goal**: The matrix becomes a decision record.

**Independent Test**: The sign-off checklist at the bottom of the matrix walks clean: every module classified · every exclusion justified · every future-role registered · zero silent gaps.

- [x] T030 [US8] Walk and complete the sign-off checklist in `legacy-capability-coverage.md` (reviewer/date line included); cross-check every `future` cell in `page-coverage-audit.md` references a matrix row; fold anything newly discovered during the walk into the matrix (never a verbal note)

---

## Phase 12: User Story 10 — Screenshot-proven, better-not-cloned (Priority: P3)

**Goal**: Visual acceptance of the 13-frame matrix.

**Independent Test**: All 13 frames captured and human-reviewed pass against the failure conditions; the attendance frame visually proves filter narrowing; sidebar frames prove organized-not-cloned.

- [x] T031 [US10] Extend `tests/screenshots/capture.cjs` MATRIX with the Spec 010 frames per `contracts/screenshot-acceptance.md` §1: six rail categories expanded (AR light), reports category panel (AR dark + EN light), mobile sidebar drawer (AR), family Plan & Billing tab (AR light), attendance with a status tile applied (AR light), dashboard + finance body-unchanged frames (AR light)
- [x] T032 [US10] Capture the full run (zero console errors), human-review every frame against §2 pass / §3 failure conditions, record the Spec 010 verdict table + notes in `app/screenshots/REVIEW.md`; fix and recapture any FAIL before closing

---

## Phase 13: Polish & Final Gate

- [x] T033 Final gate: `npm run build` (nav guard + coherence guard + chip-tone guard silent) → `npm test` (smoke all-green both languages, a11y critical=0) → Spec 010 G7 + Spec 008/009 audits all `ok` → walk SC-001…SC-010 from spec.md and record the confirmation list in the `app/screenshots/REVIEW.md` Spec 010 section; verify `git status` shows only the allowed change surface; NO commit, NO push

---

## Dependencies & Execution Order

- **Phase 1 → Phase 2 → stories**: T001 gates everything; T002/T003 unblock the documentation stories.
- **Story order (D12)**: US2 (matrix) → US1 (nav IA) → US3 (reachability) → US4 (overlap docs) → US5 (filters+polish) → US6 (shortcut+links) → US7 (truthfulness) → US9 (guards/arch) → US8 (sign-off — needs US2+US9 done) → US10 (screenshots — needs all UI changes final).
- **Cross-story facts**: T013/T014 (nav asserts) must precede T019/T025/T026 full-smoke runs only in the sense that smoke stays green cumulatively; T024 (guard amendment) must land in the same increment as T023 (else Spec 009's audit fails); T027 (chip guard) before T028 (final audits); T031 before T032.
- **Independent test criteria** are listed per phase header — each story is verifiable on its own increment.

## Parallel Opportunities

- T002 ∥ T003 (different artifacts).
- T005 ∥ T006 ∥ T007 after T004 (different matrix sections; T008/T009 serialize after).
- T022 ∥ anything in US5 (different files); T010 ∥ T002/T003.
- The three verification-only stories (US3, US4, US7) can interleave with US5/US6 work — they touch artifacts/tests, not the same source files.

## Implementation Strategy

**MVP = T001–T014** (baseline + matrix + nav IA): independently shippable — a truthful, organized sidebar plus the zero-silent-gaps matrix (plan.md "MVP & Sequencing"). Then incremental: filters fix (biggest UX defect), shortcut, sweeps, guards, sign-off, screenshots. Every increment ends with build + smoke green; nothing is committed or pushed at any point (environment auto-commit hooks must not be triggered manually).
