# Tasks: Full Frontend Audit + Role Dashboards IA + Design Freeze (Spec 016)

**Input**: Design documents from `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D12) · data-model.md · contracts/ (11, incl. scope-guard amendment A1) · quickstart.md
**Nature**: Spec 016 is docs-only and its 13 strategy artifacts already exist. **Every task below is VERIFICATION-ONLY** (scope-guard amendment A1): read/count/grep/cross-check the documents, verify git cleanliness, and gate Spec-017 readiness. **NO task may touch any file under `app/`, any test, CLAUDE.md, README.md, REVIEW.md, or the Spec-012 coverage artifact.** Findings are fixed by editing the 016 documents themselves (allowed surface) and re-running the check.
**Spec folder**: paths below are relative to `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/` unless prefixed.

## Phase 1: Setup (state verification)

- [x] T001 From the repo root run the read-only state checks per `quickstart.md` §1: `git status --short` (expect ONLY `.specify/feature.json` + this spec folder), `git log -1 --oneline` (expect HEAD `20dc089`), `git diff -- academy-dashboard-discovery/app | wc -l` (expect 0), `ls academy-dashboard-discovery/app/public/*.html | wc -l` (expect 49); record the four results in a "Verification record" note appended to `checklists/requirements.md`

---

## Phase 2: Foundational (vocabulary closure — blocks all story checks)

- [x] T002 Sanctioned-vocabulary closure sweep across all 13 artifacts in this folder: every classification used in `missing-pages-and-gaps-register.md`, every status in `legacy-to-new-coverage-matrix.md` (21-value set), every classification in `admin-sidebar-page-inventory.md` (10-value set), every treatment code (CARDS/AGENDA/DRAWER/TILES/LINES/GATE/LOCK/STAT), and every end-state (REAL/LOCK/GATE) is a member of its sanctioned set from `data-model.md` — zero ad-hoc values; record pass/fail per artifact in `checklists/requirements.md`

---

## Phase 3: User Story 1 — Honest state of Specs 001–015 (Priority: P1)

**Independent Test**: every spec 001–015 has all six audit fields; every gap has exactly one classification; zero TBD.

- [x] T003 [US1] Verify `frontend-audit-001-015.md`: all fifteen specs carry delivered/owned/deferred/excluded/weakness/tasks-count entries; the verdict paragraph states zero broken/fake/silently-missing; the sidebar-state section matches nav.config.js reality (29 planned · 7 disabled · 3 future-role — read-only grep of `academy-dashboard-discovery/app/src/js/nav.config.js` to confirm counts only)
- [x] T004 [US1] Verify `missing-pages-and-gaps-register.md`: exactly 20 rows G1–G20, one classification each, classification-totals line sums to 20, `must-fix-before-continuing` count = 0, and every `move-to-spec-0NN` destination exists as a row in `future-spec-sequence.md`

---

## Phase 4: User Story 2 — Portals reclassified as Homes (Priority: P1)

- [x] T005 [US2] Verify `role-dashboard-ia.md` §1–§2: the reclassification is stated in plain words, the three home filenames are named as KEPT (no rename/deletion), the home↔internal-page contract (§4) maps every current home section, and shell v2 is defined as a second shell family with zero admin chrome

---

## Phase 5: User Story 3 — Student app plan complete (Priority: P1)

- [x] T006 [US3] Verify `role-dashboard-page-inventory.md` §Student: exactly 6 internal pages + the kept home, each row has sections/sources/gates/covers filled; cross-check against `role-dashboard-ia.md` §3 (7 nav items) — every nav item resolves to home or a listed page

---

## Phase 6: User Story 4 — Family app plan complete (Priority: P1)

- [x] T007 [US4] Verify inventory §Family: exactly 7 internal pages + home, all rows filled; the zero-figure line appears on the `family-billing.html` row AND as the app-wide machine-asserted rule; nav map has 8 items, all resolving

---

## Phase 7: User Story 5 — Teacher app plan pay-free (Priority: P1)

- [x] T008 [US5] Verify inventory §Teacher: exactly 6 internal pages + home, all rows filled, the final exclusion row lists T2/T17/T18/T19/T6/T12/T25/T26/T27; verify `contracts/teacher-pay-free-global-contract.md` scopes the ENTIRE `teacher-*` family (vocabulary + currency + comments + zero-routes + suppressed numerics + three layers) and names Specs 020/025/027 as enforcement points

---

## Phase 8: User Story 6 — Admin sidebar fully mapped (Priority: P1)

- [x] T009 [US6] Verify `admin-sidebar-page-inventory.md`: count the table rows per group (Control 14 · Families 10 · Teachers 8 · Reports&Finance 13 · Management 5 · Settings 7 = 57), confirm the corrected totals line reconciles (13/1/26/3/6/2/5/1 = 57) and ownership sums (021×10 · 022×4 · 023×5 · 024×3 · 025×9 · 026×12 = 43 future + 13 built + 1 covered), zero unclassified rows, every user-list item from the six-group brief present (naming variants unified)

---

## Phase 9: User Story 7 — Every «قريبًا»/locked item planned (Priority: P1)

- [x] T010 [US7] Verify all 36 current non-implemented nav items (29 planned + 7 disabled, from T003's census) appear in the inventory with a REAL/LOCK/GATE end-state and an owning spec; confirm the standing rule ("never dead/blank/toast-only/bare-«قريبًا»") is stated in both the inventory and `contracts/admin-sidebar-inventory-contract.md`

---

## Phase 10: User Story 8 — Screenshot/file evidence recorded (Priority: P2)

- [x] T011 [US8] Verify `legacy-screenshot-review.md` names the inspected frames (sidebar-reference, admin home, admin salaries, family/student home + the Spec-015 capture-verified teacher hero) with what each proved, states the corpus totals (1,113 shots · 339 pages · 178 templates), and states the student-evidence gap honestly; verify `visual-reference-audit.md` answers all nine required visual-audit questions

---

## Phase 11: User Story 9 — Old idea kept, redesigned better (Priority: P2)

- [x] T012 [US9] Verify the design-treatment column is filled for every non-excluded row in `legacy-to-new-coverage-matrix.md`, and `role-dashboard-design-freeze.md`'s forbidden register bans the legacy anti-patterns BY NAME (KPI money wall, 10–23-col ledgers, fake live room, dual badges, hour-grids in role apps, pink/alarm empties via "aggressive warnings" language, admin-clone portals)

---

## Phase 12: User Story 10 — Zero uncategorized legacy routes (Priority: P1)

- [x] T013 [US10] Verify `legacy-to-new-coverage-matrix.md`: role totals reconcile (admin 145 · teacher 22 · family 11 · student 0 = 178 templates), every listed route row carries one sanctioned status, the reconciliation section asserts zero-uncategorized and zero remaining `needs-decision`, and the file extends (never edits) the Spec-012 artifact — confirm via `git diff -- academy-dashboard-discovery/specs/012-role-portal-foundation/legacy-role-capability-coverage.md` being empty for this spec

---

## Phase 13: User Story 11 — Honesty rules reusable (Priority: P1)

- [x] T014 [US11] Verify `honesty-and-backendrequired-contract.md`: the four action classes are exhaustive-worded, the four gate patterns enumerated, the no-fake register contains every item from the user brief (payment → user-permission-save, 20+ entries), role hard lines present, enforcement-continuity section names the standing guards; verify `contracts/honesty-backendrequired-contract.md` requires citation by 017–027

---

## Phase 14: User Story 12 — Design frozen, no redesign (Priority: P1)

- [x] T015 [US12] Verify `role-dashboard-design-freeze.md` answers EVERY category of the user's freeze list (shells, sidebar/topbar, locked-page style, coming-soon replacement, gate pattern, cards/tables/filters/tabs/modals/forms/empty-states/chips, page+section headers, stat/timeline/agenda/profile/settings/finance-locked cards, mobile nav, dark mode, Arabic typography, spacing, icons, density, role colors, forbidden patterns) — each entry marked frozen-as-exists(ref) or frozen-new(owner); change-control clause present

---

## Phase 15: User Story 13 — Future specs sequenced (Priority: P1)

- [x] T016 [US13] Verify `future-spec-sequence.md`: all eleven rows 017–027 have scope/pages/depends-on/acceptance-floor; no overlap and no gap versus the sidebar inventory's ownership sums and the register's destinations (spot-check: المحادثات→021 · بحث الجدول→022 · الأداء الشهري→023 · تحليل البيانات→024 · الرواتب→025 GATE · التكاملات→026); the split valve permits internal splits only; projected ~145–150 files stated

---

## Phase 16: User Story 14 — Measurable final QA rules (Priority: P2)

- [x] T017 [US14] Verify the eight 027 rules in `future-spec-sequence.md` are each machine-checkable (grep/crawl/assert phrasing, no judgment-only rule) and that `contracts/final-frontend-qa-contract.md` mirrors them 1:1 with the no-weakening clause

---

## Phase 17: Polish — cross-checks & the completion gate

- [x] T018 [P] Zero-TBD sweep per `quickstart.md` §3 over all `*.md` in this folder (TBD/TODO/open needs-decision markers → expect only the sanctioned "= 0" mentions); plus the three destination spot-checks agreeing across register ↔ matrix ↔ inventory
- [x] T019 [P] Scope-guard G3 audit: `git status --short` = the two G1 paths; `git diff -- academy-dashboard-discovery/app` empty; tasks.md verification-only (this file, per amendment A1); record in `checklists/requirements.md`
- [x] T020 Run the Spec-017 readiness test (`quickstart.md` §4): confirm a reader can answer 017's what/what-not/floor/first-docs-task from the artifacts alone; then mark this tasks.md checklist accurately and append the final verification record to `checklists/requirements.md`

---

## Dependencies & execution order

- **T001 → T002 → T003…T017 (each independent once T002 passes) → T018/T019 [P] → T020.**
- Story checks T003–T017 are mutually independent (different artifacts) — any subset can run in any order after Phase 2; they are listed in spec-story order for review coherence.
- Parallel opportunities: T003–T017 are all [P]-safe conceptually (read-only, different files) but kept unmarked to preserve one-reviewer flow; T018+T019 are explicitly [P].

## Implementation strategy

**MVP = T001–T004** (state + vocabulary closure + the two audit-artifact verifications): proves the audit core is sound. Then the story sweep (T005–T017, one artifact each), then the gate (T018–T020). Any check that fails routes to a document fix INSIDE this spec folder (the allowed surface) + re-run — never to an app/source change. Completion = all 20 tasks checked, G3 green, Spec 017 unblocked.
