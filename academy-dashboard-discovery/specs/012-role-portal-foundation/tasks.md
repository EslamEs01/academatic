# Tasks: Role Portal Foundation

**Input**: Design documents from `academy-dashboard-discovery/specs/012-role-portal-foundation/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D12) · data-model.md · contracts/ (12) · quickstart.md
**Tests**: Test-harness extension IS in scope (FR-017 + the D6 smoke reconciliation — the portal-absence re-scope is REQUIRED or smoke fails the moment portal pages exist); assertions land with or right after their surface, full gate at the end.
**App root**: `academy-dashboard-discovery/app/` (paths below relative to it unless prefixed). Spec folder: `academy-dashboard-discovery/specs/012-role-portal-foundation/`.

**Organization**: By user story, sequenced per research D12 (shell foundation → hub → student → family → teacher → tests → coverage → guards → screenshots). Personas are fixed: student=`st1` (∈ fam1) · family=`fam1` · teacher=`sara`.

## Phase 1: Setup (baseline gate)

**Purpose**: Prove the pre-change tree is green so every later diff is attributable to Spec 012.

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` + `npm test` (must be green: 40 loads, a11y 0/0) and re-run the Spec 008/009/010/011 guard audits (all `ok`); confirm 41 built pages and HEAD `e7ee011`; stub the "Spec 012" section in `app/screenshots/REVIEW.md` with the baseline record

---

## Phase 2: Foundational (the shared portal layer — blocks all portal stories)

**Purpose**: The shell, styling, locale, fixture, and build plumbing every portal page needs.

- [x] T002 [P] Create `src/locales/ar.prt.js` + `src/locales/en.prt.js` (`prt.*` overlay: portal/hub titles for `<title>`, role identity labels, shared shell keys [switch-role, demo note, greeting patterns], per-portal section headings, planned-card copy [availability language, NO "coming soon" hype], owning-spec notes) — key-mirrored, Arabic-first quality; register both in `src/js/i18n.js` (+2 imports, +2 `deepMerge` AFTER the fin pair) per research D4
- [x] T003 [P] Create `src/js/fixtures/portal.js` — display-only: persona bindings (`PORTAL_PERSONAS = { student: 'st1', family: 'fam1', teacher: 'sara' }`), authored preview snippets (student progress/achievements literals, family teacher-notes literals), and the planned-card registers per portal (student: homework/materials/leaderboard · family: billing/meetings/subscriptions · teacher: materials/tasks) — NO new domain entities, NO pay-adjacent fields, comment discipline per scope-guard G4
- [x] T004 Create `src/js/components/portal-shell.js` — `portalShellMarkup({ role, bodyHTML })` per `contracts/role-portal-foundation-contract.md` §1: sticky friendly header (brand medallion + portal name, role-identity chip, persona greeting, EXISTING `data-action="lang-menu"`/`"theme-menu"` controls reused, labeled role-switch link → `portals.html`/`portals.en.html` language-aware) above `main#page > div#page-body`; root `class="portal-shell" data-role="…"`; ZERO `.app-shell`/`.nav-rail`/`.nav-panel`/admin-topbar markup; optionally `src/js/components/portal-cards.js` for shared friendly section/card/planned-card helpers
- [x] T005 [P] Add the `.portal-shell` CSS namespace block to `src/styles/app.css` per research D5: warm card-based mobile-first layout (single column, generous spacing, larger radius, soft shadows), `data-role` accent hooks mapped to EXISTING palette tokens, hero/section/planned-card styles, dark-mode-safe — all selectors namespaced under `.portal-shell`, zero changes to admin selectors
- [x] T006 Extend `scripts/build-html.mjs`: PAGES entries gain optional `shell: 'portal'` + `role`; the render loop branches `shell === 'portal' ? portalShellMarkup(...) : shellMarkup(...)` (admin path character-for-character untouched); import `portalShellMarkup`; verify a rebuild WITHOUT any portal entries still produces 40 byte-identical admin files

**Checkpoint**: Shell layer ready — portal pages can now be added one by one.

---

## Phase 3: User Story 1 — Product owner opens all three portals via the hub (Priority: P1) 🎯 MVP

**Goal**: The demo role-switch hub exists and is the documented entry; the portal pattern is proven end-to-end.

**Independent Test**: Open `portals.html`: three friendly role cards + labeled admin return; each card reaches its portal (once built) in one click; the hub itself uses the portal shell.

- [x] T007 [US1] Create `src/js/pages/portals.js` (the demo hub per `contracts/role-portal-navigation-contract.md` §1: honest demo-switcher headline, three large role cards [icon + accent + one-line promise + persona note + real link], ONE labeled admin-console link → `dashboard.html`/`dashboard.en.html`, honesty note) + register the `portals` PAGES entry (`shell:'portal'`, `role:'hub'`, `activeId:null`) in `scripts/build-html.mjs`
- [x] T008 [US1] Build and verify: `portals.html`/`portals.en.html` render the portal shell (zero admin markup), the admin link is labeled and language-correct, and the three role-card links target the three portal files (they may 404 until Phases 4–6 — acceptable mid-build, resolved before the link-crawl task T017 runs)

---

## Phase 4: User Story 2 — Student portal foundation (Priority: P1) 🎯 MVP

**Goal**: st1's friendly daily-learning foundation — the experience-defining portal.

**Independent Test**: `student-portal.html`: all 8 composition blocks with st1's real fixture data, ZERO `<table>` elements, no admin chrome, Spec-013 note.

- [x] T009 [US2] Create `src/js/pages/student-portal.js` per `contracts/student-portal-foundation-contract.md`: welcome hero (st1, encouraging bright-not-childish tone) · today's-learning preview (st1's sessions via grp1/schedule fixtures) · next-session card (honest demo affordance, never a live-join look) · my-courses cards (enrollments, zero tables) · progress gauge (authored `progress: 78` + portal.js literals, display-only) · achievements preview (net-new framing) · 3 planned cards (homework/materials/leaderboard, labeled availability, figure-free) · Spec-013 closing note; register the PAGES entry (`shell:'portal'`, `role:'student'`)
- [x] T010 [US2] Build and verify: both language files render all 8 blocks with st1 data; `grep -c '<table' public/student-portal.html` = 0; Arabic-Indic digits on AR; zero raw keys; zero admin markup

---

## Phase 5: User Story 3 — Family portal foundation (Priority: P1)

**Goal**: fam1's calm guardian foundation with the real multi-child pattern.

**Independent Test**: `family-portal.html`: guardian welcome, all five fixture children visible, today's sessions, progress + teacher-notes previews, 3 planned cards (billing figure-free), Spec-014 note.

- [x] T011 [US3] Create `src/js/pages/family-portal.js` per `contracts/family-portal-foundation-contract.md`: guardian welcome (fam1) · children overview (st1/st6/st11/st12/st13 as friendly cards + honest multi-child affordance) · today's-sessions preview · attendance/progress preview (existing outcome fixtures, labeled chips, display-only) · teacher-notes preview (portal.js authored literals anchored in the legacy session-summary concept) · 3 planned cards (billing/finance planned-only + meetings + subscriptions) · Spec-014 note; register the PAGES entry (`role:'family'`)
- [x] T012 [US3] Build and verify: all five children render from fixtures; the billing card has ZERO amounts and is not an `<a>`; both languages clean; zero admin markup

---

## Phase 6: User Story 4 — Teacher portal foundation (Priority: P1)

**Goal**: sara's organized today-first foundation — pay-free by construction.

**Independent Test**: `teacher-portal.html`: all blocks with sara's fixture data; the join affordance honestly non-real; grep proves zero pay tokens in both languages.

- [x] T013 [US4] Create `src/js/pages/teacher-portal.js` per `contracts/teacher-portal-foundation-contract.md`: welcome (sara) · today's-schedule preview (teacher-links/schedule fixtures, time-ordered cards) · next-live-session card (demo/planned affordance, explicitly not a call join) · my-students preview (sara's students, labeled follow-up signals reused) · outcome-workflow preview (display-only step glimpse, no form) · 2 planned cards (materials/library + tasks) · ONE labeled real link to `teacher-performance.html` (admin view) · Spec-015 note; register the PAGES entry (`role:'teacher'`)
- [x] T014 [US4] Build and verify the pay-free rule: `grep -RniE 'salary|payout|earning|compensation|راتب|رواتب|أجر|مستحقات' public/teacher-portal.html public/teacher-portal.en.html src/js/pages/teacher-portal.js src/locales/ar.prt.js src/locales/en.prt.js` → zero matches; all blocks render sara's real data

---

## Phase 7: User Story 8 — Admin console unchanged (Priority: P1)

**Goal**: The strongest admin bar yet: byte-identity of all 40 admin files + the sanctioned register wording.

**Independent Test**: Hash-compare all 40 admin built files vs HEAD → identical; `git diff` on admin modules empty; FUTURE_ROLE wording truthful.

- [x] T015 [US8] Update the three `FUTURE_ROLE` `reason` strings in `src/js/nav.config.js` to the post-012 truth per research D7 (foundation shipped by Spec 012 → `*-portal.html`; deep experience = Spec 013/014/015; NEVER an admin nav item; student portal split out of the legacy guardian-proxied portal) — wording only, no structural change
- [x] T016 [US8] Run the admin-identity audit (`contracts/scope-guard.md` G5 #1): all 40 admin `public/*.html` content-identical vs HEAD; `git diff --name-only` on admin page modules / existing fixtures / existing components / `enhance.js` / `package.json` is EMPTY (only `portal-*` new files + the 3 registration touch-points appear); zero portal references in the 40 admin files (G5 #3)

---

## Phase 8: User Story 5 + 6 — Portal navigation, mobile, bilingual, themes (Priority: P2)

**Goal**: The smoke reconciliation + portal test block — the D6 requirement that keeps the whole suite green and honest.

**Independent Test**: `npm test` passes on 49 pages: admin asserts unchanged (incl. admin-scoped portal-absence), portal block green (shell present, admin markup absent, pay-free teacher, localized digits, honest cards), a11y 0/0 with portal scenarios.

- [x] T017 [US5] Extend `tests/smoke/run.cjs` per research D6: add the 4 portal bases to `PAGES` (VALID_FILES/link-crawl auto-extend); introduce `PORTAL_PAGES` set; branch the shell-specific assertions — ADMIN pages keep every existing assert verbatim INCLUDING the portal-absence check (now admin-scoped); PORTAL pages skip admin-shell asserts and get the portal block: `.portal-shell` present with correct `data-role`, `.app-shell`/`.nav-rail`/`.nav-panel` ABSENT, role-switch link → hub present, teacher-portal body pay-token-free (EN+AR regex), AR portal pages use Arabic-Indic digits in numeric previews, planned cards labeled (availability text present, no `<a>` planned cards), zero dead links
- [x] T018 [P] [US5] Extend `tests/a11y/run.cjs` with the four portal pages (AR/EN × light/dark for at least the three portals) — critical=0 serious=0 required
- [x] T019 [US6] Run the full suite (`npm test`) — smoke PASS across all 49 loads in both languages (admin asserts + portal block + crawl), a11y clean; fix any assertion/page mismatch found (composition stays contract-bound)

---

## Phase 9: User Story 7 — Legacy role coverage artifact (Priority: P2)

**Goal**: All 39 legacy portal pages classified; Specs 013/014/015 boundaries itemized.

**Independent Test**: Look up any legacy `/teacher/*` or `/student/*` route in the artifact → exactly one classified row with destination + rationale; boundary lists present; sign-off walked.

- [x] T020 [US7] Write `specs/012-role-portal-foundation/legacy-role-capability-coverage.md` per `contracts/legacy-role-capability-coverage-contract.md`: grounding header → Teacher table (all 22 templates/26 pages) → Family table (all 11 templates/13 pages) → the D9 seeded classifications (pay surfaces→backendRequired never previewed · broken profiles/404s/fake live room→excluded · thin duplicates→excluded/consolidated · chat/upload→backendRequired · everything else→planned-013/014/015 per the seed map) → net-new section (gamification absent in legacy; the three-portal split record) → itemized Spec 013/014/015 boundary lists → sign-off checklist
- [x] T021 [US7] Completeness pass: verify 39/39 routes resolve, one primary classification each, every exclusion justified, boundaries non-overlapping; walk the sign-off checklist (reviewer/date line left blank for the human)

---

## Phase 10: User Story 9 — Architecture & guards (Priority: P2)

**Goal**: Static/Django confirmations + the full audit floor.

**Independent Test**: Scope-guard G5 all `ok`; prior guards green; README carries the portal Django mapping.

- [x] T022 [P] [US9] Update `README.md`: the portal Django mapping per `contracts/static-html-django-ready-contract.md` §2 (portal base template + role includes + persona context + hub) and the documented demo path (`portals.html`); note the 49-page build
- [x] T023 [US9] Run the complete `contracts/scope-guard.md` G5 audit (8 checks: admin identity · pay tokens · admin isolation · 49 pages · zero `href="#"` · no admin markup in portals · guarded diffs · prior guards) + re-run Spec 008 reports-body, Spec 009 G8a (amended), Spec 010 G7, Spec 011 G3 — every line `ok`

---

## Phase 11: User Story 10 — Screenshots (Priority: P3)

**Goal**: Visual acceptance: distinct-from-admin, better-than-legacy, admin unchanged.

**Independent Test**: 12 frames captured, human-reviewed PASS, recorded in REVIEW.md.

- [x] T024 [P] [US10] Extend `tests/screenshots/capture.cjs` MATRIX with the 12 Spec 012 frames per `contracts/screenshot-acceptance.md` §1 (student AR light/dark + EN + AR mobile · family AR/EN + AR mobile · teacher AR/EN + AR mobile · hub AR · admin-dashboard unchanged-proof) — plain page loads, no new drivers
- [x] T025 [US10] Capture the full run (zero console errors); human-review every frame against §2/§3 (admin-clone, legacy-clone, table-heavy, pay figures, fake-real affordances, clutter, RTL/dark/mobile); record the Spec 012 verdict table + notes in `app/screenshots/REVIEW.md`; fix + recapture any FAIL

---

## Phase 12: Polish & Final Gate

- [x] T026 Final gate: `npm run build` (49 pages; nav/coherence/chip-tone guards silent) → `npm test` (smoke + a11y green) → G5 + all prior guard audits `ok` → walk SC-001…SC-010 and record the confirmation list in the `app/screenshots/REVIEW.md` Spec 012 section; verify `git status` shows only the G3 allowed surface; NO commit, NO push (do not trigger the auto-commit hook)

---

## Dependencies & Execution Order

- **T001 → Phase 2 (T002∥T003∥T005, then T004 [needs T002 keys conceptually, can draft in parallel], then T006 [needs T004])** → portal pages.
- **Page order**: T007/T008 (hub — proves the shell) → T009/T010 (student) → T011/T012 (family) → T013/T014 (teacher). Page modules are independent files and MAY be built in parallel once T006 lands, but the hub-first order de-risks the shell; the T008 link-target caveat resolves once all three portals exist.
- **T017 MUST land before any full-suite run after portal pages exist** (the old portal-absence assert fails otherwise) — sequence it immediately after Phase 6, before T019.
- **T015/T016 (admin)** any time after T006; T016 re-runs after the LAST build. **T020/T021** independent of code (parallel with Phases 4–8). **T022∥T023** after all code; **T024/T025** after final build; **T026** last.

## Parallel Opportunities

- T002 ∥ T003 ∥ T005 (different files); T018 ∥ T017-adjacent; T020 ∥ Phases 5–8 (documentation vs code); T022 ∥ T024.
- The three portal page modules (T009/T011/T013) are parallelizable across agents once the shell (T004/T006) exists — each is a self-contained new file + one PAGES entry.

## Implementation Strategy

**MVP = T001–T010 + T017/T019** (baseline + shell layer + hub + student portal + reconciled green tests): proves the entire foundation pattern on the most experience-sensitive role. Then family/teacher reuse it, followed by coverage, guards, screenshots, and the final gate. Every increment ends with build green; nothing is committed or pushed at any point.
