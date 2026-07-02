# Tasks: Student Dashboard (Spec 013)

**Input**: Design documents from `academy-dashboard-discovery/specs/013-student-dashboard/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D12) · data-model.md · contracts/ (14) · quickstart.md
**Tests**: The single sanctioned smoke amendment (research D9) lands immediately after Band A (its `.pt-empty` assert depends on the week section existing); all other harness work is additive. Full gate at the end.
**App root**: `academy-dashboard-discovery/app/` (paths relative to it unless prefixed). Spec folder: `academy-dashboard-discovery/specs/013-student-dashboard/`.

**Organization**: By user story, sequenced per research D12. Note: US6 (week view, P2) is deliberately pulled forward of US3/US4 — it belongs to Band A/MVP because it delivers coverage row F5 and the Friday `.pt-empty` state that the D9 smoke re-scope asserts; deferring it would force two smoke amendments. Persona is fixed: **st1**. Almost all section tasks edit the same file (`src/js/pages/student-portal.js`), so they are intentionally sequential — parallelism lives in Phase 2 only.

## Phase 1: Setup (baseline gate)

**Purpose**: Prove the pre-change tree is green so every later diff is attributable to Spec 013.

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` + `npm test` (must be green: 48 loads, a11y 0/0) and re-run the Spec 008/009/010/011/012 guard audits (all `ok`, incl. the 012 G5 admin-identity hash-compare); confirm 49 built pages and record HEAD; stub the "Spec 013" section in `screenshots/REVIEW.md` with the baseline record

---

## Phase 2: Foundational (registers, keys, styles — blocks all stories)

**Purpose**: Every section task consumes these; land them once, key-mirrored and namespace-clean.

- [x] T002 [P] Extend the student block of `src/js/fixtures/portal.js` per data-model §§4–10: `STUDENT_PREVIEW.homework[3]` (titleKey/courseId/dueKey/stateKey) · `.materials[3]` (titleKey/courseId/typeIcon file-text|play|materials) · `.history` (first entry `{outcomeId:'out1'}` + 2 authored records with summaryKey/homeworkKey, ONE with `hasAttachment`) · `.attendance = {attended:9, upcoming:2, streakDays:5}` · `.celebration[3]` (unordered group wins) · `courses[*].nextStepKey`; re-register `PORTAL_PLANNED.student = {hwSubmit: backendRequired, matDownload: backendRequired, fullHistory: planned}`; `PORTAL_PERSONAS`/`FAMILY_PREVIEW`/family/teacher registers byte-untouched; comment discipline per scope-guard
- [x] T003 [P] Add the new keys to `src/locales/ar.prt.js` + `src/locales/en.prt.js`: `prt.stu.*` section headings/hints/labels (week, homework, materials, trio, celebration, history, profile, closing note, backendRequired gate wording) + `data.prtStu*` authored content strings (homework/material/history/celebration/next-step copy) — key-mirrored, Arabic-first, availability language (no hype); REUSE existing `sch.day.*` day names and `sess.today`; **shared `prt.shell/portal/role/hub`, `prt.fam.*`, `prt.tch.*`, `data.prtNote*` keys untouched** (verify diff shows pure additions)
- [x] T004 [P] Add the additive `.portal-shell`-namespaced CSS blocks to `src/styles/app.css`: `.pt-empty` (soft icon + warm line), `.pt-day`/day-header (week agenda), celebration and profile-card bits — existing selectors unmodified, ink-token discipline for any accent-on-light text (`--pt-accent-ink`)

**Checkpoint**: Registers/keys/styles ready — section work can begin.

---

## Phase 3: User Story 1 — Student instantly understands today (Priority: P1) 🎯 MVP

**Goal**: Hero + today's learning answer "what do I have today / what should I do now" above the fold.

**Independent Test**: Open `student-portal.html`: upgraded hero (st1 name, today greeting, plain-text next-action hint, no date/notification count) + today's-learning cards with labeled status chips — before any scroll on desktop.

- [x] T005 [US1] In `src/js/pages/student-portal.js`: upgrade the hero (calm motivational copy + next-action hint per FR-001 — hint is TEXT, no anchor) and deepen today's-learning session cards to carry the labeled icon+text status chip from the existing status maps (FR-002), keeping time/course/teacher/room from `SESSIONS_FULL` (sara/grp1 proxy)
- [x] T006 [US1] Build and verify both languages: hero + today render with st1 fixture truth, chips labeled, zero raw keys, zero new anchors (source-links contract table still exact)

---

## Phase 4: User Story 2 — Next session clear and honest (Priority: P1)

**Goal**: The next-session moment is prominent and its affordance is honestly backend-gated.

**Independent Test**: The next-session card shows time/course/teacher(/group) and the join affordance is a backendRequired-vocabulary note — never a button-styled join, in both languages.

- [x] T007 [US2] In `src/js/pages/student-portal.js`: enrich the next-session card (time · course · teacher · room, group where fixture-available) and replace the foundation note with the honesty-contract §2 join note (backendRequired availability wording — real join requires the live-session integration); verify no join-styled control and the anchor inventory is unchanged

---

## Phase 5: User Story 6 — My week at a glance (Priority: P2 — pulled forward per research D12)

**Goal**: Deliver coverage row F5 as a friendly SAT-first agenda + the truthful Friday empty state (D4/D5).

**Independent Test**: The week section renders sara-filtered `SCHEDULE_WEEK` blocks as stacked day groups («اليوم» marker on `isToday`), zero tables; Friday shows the `.pt-empty` rest-day state; RTL day order correct on AR.

- [x] T008 [US6] In `src/js/pages/student-portal.js`: add the week-at-a-glance section — iterate `SCHEDULE_WEEK` (import from `../fixtures/schedule.js`), filter each day's blocks by `trainer.id === 'sara'`, render day header (nameKey; today chip when `isToday`) + compact start–end/course/room cards; omit day groups with no matching blocks
- [x] T009 [US6] Append the Friday rest-day `.pt-empty` entry («الجمعة — يوم راحة 🌤» / "Friday — rest day", warm one-liner) per research D5; build and verify day ordering SAT-first on both languages and zero `<table>`

---

## Phase 6: Smoke reconciliation — the ONE sanctioned test amendment (research D9) [US9]

**Goal**: The Spec-012 portal block's student branch graduates with the page; everything non-student stays byte-verbatim.

**Independent Test**: `npm run test:smoke` green on all 48 loads with the amended student asserts; `git diff tests/smoke/run.cjs` shows changes confined to the student expectations.

- [x] T010 [US9] Amend `tests/smoke/run.cjs` student expectations ONLY: planned-card semantics (count 3 — NOTE: at this point the page still carries the three FOUNDATION planned cards, so assert count 3 now and let T013 flip nothing count-wise; the id/label semantics asserts — «يتطلب الخادم» ≥ 2 on the AR body + planned label on the third card — land in T017's floor-raise step once Bands B–D exist; plannedBad rule active throughout) · `.pt-empty` count ≥ 1 · `.pt-section` floor ≥ 6 NOW (the Band-A composition), raised to the final ≥ 10 in T017 · gaugeCount floor stays ≥ 1 now, raised to ≥ 2 in T017 · `<table>` === 0 kept · NEW one-shot 390px viewport probe for `student-portal` asserting `scrollWidth ≤ 391`; **admin-scoped asserts, portal-absence, family/teacher/hub expectations byte-verbatim**; run smoke green (**MVP checkpoint** = T001–T010; T010 + T017 together form the ONE sanctioned amendment, reviewed as a single diff at T020)

---

## Phase 7: User Story 3 — Courses, homework, and materials as friendly cards (Priority: P1)

**Goal**: Graduate the two planned cards into real display-only sections; courses deepen with next-step lines.

**Independent Test**: 3 homework + 3 materials display-only items render with resolving course refs; submit/download exist ONLY as the two backendRequired mini-cards; course cards carry level/progress/next-step and zero links; page still zero tables.

- [x] T011 [US3] In `src/js/pages/student-portal.js`: deepen my-courses cards — title/level (existing) + teacher/group where fixture-available + the authored `nextStepKey` line under the progress bar; NO hrefs (research D7)
- [x] T012 [US3] Add the homework & tasks section: 3 `STUDENT_PREVIEW.homework` display-only cards (course ref via `COURSE_BY_ID`, authored due label, display-only state chip) + the «تسليم الواجبات» `.pt-planned` backendRequired mini-card (honesty contract §3 — no controls on items)
- [x] T013 [US3] Add the learning-materials section: 3 `STUDENT_PREVIEW.materials` display-only cards (type icon + course ref) + the «تحميل الملفات» `.pt-planned` backendRequired mini-card; build and verify plannedCount = 3 with the new ids and zero interactive controls in both sections

---

## Phase 8: User Story 4 — Progress, attendance, achievements motivate without stress (Priority: P1)

**Goal**: The reflection band — authored numbers only, celebratory register.

**Independent Test**: Gauge (٧٨٪) + per-course bars + attended/upcoming/streak trio + 3 achievement badges + 3 unordered celebration cards render with Arabic-Indic digits on AR; no rank/points vocabulary anywhere.

- [x] T014 [US4] In `src/js/pages/student-portal.js`: build the deepened progress band — overall gauge (`overallProgress` 78) + per-course bars + the `STUDENT_PREVIEW.attendance` trio tiles (attended/upcoming/streak — `num()` everywhere, streak framing motivational per D8)
- [x] T015 [US4] Deepen achievements (net-new framing kept) and add the «نجوم مجموعتي» celebration section: 3 unordered authored group-win cards + the section-level authored/demo label (progress-achievements contract §3 — no ordinals/points/peer comparisons); build and verify digits + framing in both languages

---

## Phase 9: User Story 5 — History and session summaries as learning feedback (Priority: P2)

**Goal**: Deliver coverage row F6 (student view) anchored in real fixture truth.

**Independent Test**: 3 feedback cards render — first resolving `out1` (sara · math · attended chip · `data.att.fb.good`), each with summary + homework-note lines; one display-only attachment annotation; «السجل الكامل» planned mini-card closes the section.

- [x] T016 [US5] In `src/js/pages/student-portal.js`: add the recent-sessions section — resolve `STUDENT_PREVIEW.history[0].outcomeId` against `SESSION_OUTCOMES` (import from `../fixtures/attendance.js`; render teacher, real outcome chip, feedback text) + the 2 authored records (summaryKey/homeworkKey lines; ONE display-only paperclip annotation, no link) + the `fullHistory` planned mini-card (history-feedback contract §§1–3)

---

## Phase 10: Composition completion (cross-cutting — finishes the 13-section contract)

- [x] T017 Add the profile slice card (st1 level/course/family relation from existing fixtures + the backendRequired editing note) and the closing honest note (delivered-state summary + Spec-016 pointer) to `src/js/pages/student-portal.js`; full build; raise the T010 floors to their final values (`.pt-section` ≥ 10, gaugeCount ≥ 2) in `tests/smoke/run.cjs` and run smoke green — the composition contract's 13/13 now holds

---

## Phase 11: User Story 7 — Beautiful on mobile (Priority: P1)

**Independent Test**: 390px AR: zero horizontal overflow (probe green), clean single-column stack, comfortable wrapping.

- [x] T018 [US7] Mobile audit at 390px (serve + devtools or the probe): verify every new section stacks cleanly, long Arabic titles wrap (`min-width:0` on flex rows), time chips stay tabular; fix any overflow in `src/js/pages/student-portal.js` / `src/styles/app.css`; smoke probe green

---

## Phase 12: User Story 8 — Bilingual, RTL/LTR, themed, localized digits (Priority: P1)

**Independent Test**: Both files zero raw keys; AR counters Arabic-Indic; dark mode axe-clean.

- [x] T019 [US8] Run the full a11y matrix (`npm run test:a11y` — student AR/EN × light/dark × desktop/mobile scenarios) → critical=0 serious=0, fixing any contrast finding with ink-strength tokens in `src/styles/app.css`; scan both built files for raw `prt.`/`data.` key leakage and ASCII digits on AR (smoke asserts + manual spot-check)

---

## Phase 13: User Story 9 — Admin, family, and teacher surfaces protected (Priority: P1)

**Independent Test**: 47/49 built files hash-identical to HEAD; guarded diffs empty; pay grep clean; prior guards ok.

- [x] T020 [US9] Run the scope-guard G3 audit set from `academy-dashboard-discovery/app/`: (1) change-surface check (`git status` = G1 paths only) · (2) hash-compare all 49 built files vs HEAD — exactly `student-portal.html` + `student-portal.en.html` differ · (3) word-bounded pay-token grep over portal sources + built portal files · (4) zero `href="#"` sitewide · (5) no admin markup in the student page / no portal ref in admin files · (6) student planned register exact + family/teacher registers byte-unchanged · (7) `git diff` empty on all G2 files (`portal-shell.js`, `build-html.mjs`, `nav.config.js`, `enhance.js`, `package.json`, family/teacher/hub modules, shared locale keys) · (8) Spec 008/009/010/011/012 guards re-run `ok`

---

## Phase 14: User Story 10 — Screenshots prove the experience (Priority: P1)

**Independent Test**: 12+ frames captured with 0 console errors; every frame PASS against the failure conditions; verdicts in REVIEW.md.

- [x] T021 [US10] Extend `tests/screenshots/capture.cjs` additively: the 4 student experience frames (ar/light, ar/dark, en/light desktop + ar/light mobile 390) if not already matrix-covered, PLUS element-scoped area captures (Playwright `locator.screenshot()` on the section wrappers) for next-session · homework+materials · progress+achievements+celebration · history/feedback, PLUS re-capture of the 4 unchanged proofs (hub/family/teacher/admin dashboard ar/light); run `npm run screenshots` → 0 console errors
- [x] T022 [US10] Visual review of all Spec-013 frames against `contracts/screenshot-acceptance.md` §2 (cheerful/premium/not-admin-like/not-childish; honest affordances; RTL/dark/mobile quality; unchanged proofs vs Spec-012 records); record the verdict table + failure-condition sweep + issues-found-and-fixed list in `screenshots/REVIEW.md`; fix-and-recapture anything failing

---

## Phase 15: Polish — coverage notes, docs, final gate

- [x] T023 [P] Append the delivery notes to `academy-dashboard-discovery/specs/012-role-portal-foundation/legacy-role-capability-coverage.md` per the coverage contract table (F5 · F6 · F12 · §4 items 1/4/5/6/7/8/9 — appended notes only, classifications preserved, no other row touched)
- [x] T024 [P] Docs: extend the README Spec-012 portal mapping with a one-line Spec-013 note if wording needs it (docs-only); refresh `CLAUDE.md` if any planned detail shifted during implementation; finalize the `screenshots/REVIEW.md` Spec-013 section
- [x] T025 Final gate from `academy-dashboard-discovery/app/`: `npm run build` + `npm test` green (48 loads, amended student asserts, a11y 0/0) + re-run the FULL G3 audit set (T020) + `git status` shows only the G1 surface; mark this tasks.md checklist accurately

---

## Dependencies & execution order

- **T001 → T002/T003/T004 [P] → T005…T009 (sequential — same page module) → T010 (needs `.pt-empty` from T009) → T011…T016 (sequential) → T017 (raises T010 floors) → T018/T019 → T020 → T021/T022 → T023/T024 [P] → T025.**
- Story completion order: US1 → US2 → US6 → (smoke) → US3 → US4 → US5 → US7 → US8 → US9 → US10. US6 precedes US3/US4 per research D12 (Band A/MVP; single smoke amendment).
- Parallel opportunities: T002+T003+T004 (three different files); T023+T024 (docs vs coverage artifact). Section tasks are deliberately serial — one file, coherent composition.

## Implementation strategy

**MVP = T001–T010** (Band A: upgraded hero/today/next + the F5 week agenda + the truthful Friday empty state, with the harness re-scoped and green) — independently demoable and valuable. Then Bands B/C/D as three additive increments (each ends with a green build), then the verification ladder (mobile → a11y → protection → screenshots) and the polish pass. Any blocking finding routes back to the owning section task, never to a scope expansion.
