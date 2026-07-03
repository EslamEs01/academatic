# Tasks: Teacher Dashboard (Spec 015)

**Input**: Design documents from `academy-dashboard-discovery/specs/015-teacher-dashboard/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D16) · data-model.md · contracts/ (17) · quickstart.md
**Tests**: The single sanctioned smoke amendment (research D13) lands in two staged steps — T008 right after Band A and the floor-raise inside T016 — reviewed together as ONE diff at the G3 audit (the proven 013/014 pattern). The Spec-012 teacher **payHit assertion is NEVER touched** and must stay green throughout. All other harness work is additive.
**App root**: `academy-dashboard-discovery/app/` (paths relative to it unless prefixed). Spec folder: `academy-dashboard-discovery/specs/015-teacher-dashboard/`.

**Organization**: By user story, sequenced per research D16 bands. Persona is fixed: **sara** (math · grp1 roster st1/st6/st11/st13). Almost all section tasks edit the same file (`src/js/pages/teacher-portal.js`) and are intentionally sequential — parallelism lives in Phase 2 and the polish docs. **THE PAY HARD RULE applies to every task**: no pay/currency token may appear in copy OR comments (word-bounded EN `salary|salaries|pay|payouts?|earnings?|compensation|bonus|fines?` + AR `راتب|رواتب|أجر|مستحقات|غرامة|مكافأة` + currency `EGP|SAR|USD|ريال|ر.س|جنيه|$€£`); sara's numeric `rating`/`util` are never rendered.

## Phase 1: Setup (baseline gate)

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` + `npm test` (green: 48 loads, a11y 0/0) and re-run the Spec 008/009/010/011/012/013/014 guard audits (all `ok`, incl. the 012 G5 admin-identity hash-compare, the 013 student-branch and 014 family-branch asserts, and the teacher payHit); confirm 49 built pages and record HEAD; stub the "Spec 015" section in `screenshots/REVIEW.md` with the baseline record

---

## Phase 2: Foundational (registers, keys, styles — blocks all stories)

- [x] T002 [P] Add the NEW teacher block to `src/js/fixtures/portal.js` per data-model §§3–13: `TEACHER_PREVIEW.followUps = [{outcomeId:'out15', framingKey}, {outcomeId:'out4', framingKey}]` (REAL outcome refs) · `.tasks[3]` (titleKey/subKey/dueKey — prepare worksheet · review homework · prepare monthly report) · `.materials[3]` (titleKey/courseId/typeIcon file-text|play|materials) · `.studentNotes` (authored per-roster-student note refs `data.prtTchStu*`) · `.nextPrepKey` + rubric/certificate concept key lists; re-register `PORTAL_PLANNED.teacher = {outcomeSave: backendRequired, matUpload: backendRequired, availabilityEdit: backendRequired, taskManage: planned}`; `PORTAL_PERSONAS`/`STUDENT_PREVIEW`/`FAMILY_PREVIEW`/student/family registers byte-untouched; NO pay-adjacent token in any comment (scope-guard comment discipline)
- [x] T003 [P] Rewrite the teacher block of `src/locales/ar.prt.js` + `src/locales/en.prt.js`: `prt.tch.*` (hero summary/hint, today hints + student-count wording, next-class prepare hint — keep the existing honest `nextNote` live wording, follow-up board title/framings `sig.absence`/`sig.makeup` + reassurance, my-students title/hint, the 5-step workflow titles/descriptions (attendance/remark/summary/homework/files), tasks/materials titles + due labels, timetable/availability titles + the free-days empty copy «الأربعاء والخميس — بلا حصص، وقت مثالي للتحضير 🌤», rubric title + 5 dimension lines + explainer, certificate preview lines, account labels + edit note, the four planned mini-card t/d pairs, the resolved `noteT/noteD` delivered-state closing copy) + `data.prtTch*` authored content strings — key-mirrored, Arabic-first, professional-calm register; **shared `prt.shell/portal/role/hub`, sibling `prt.stu.*`/`prt.fam.*`, `data.prtStu*`/`data.prtFam*`/`data.prtNote1/2` untouched**; ZERO pay/currency vocabulary anywhere (verify diff shows only `prt.tch.*`/`data.prtTch*` changes)
- [x] T004 [P] Add the tiny additive `.portal-shell`-namespaced CSS bits to `src/styles/app.css` if needed (workflow-stepper/roster polish — the 013/014 primitives `.pt-empty`/`.pt-day`/`.pt-lines`/`.pt-line`/`.pt-tag`/`.pt-stat`/`.pt-prof-row`/`.pt-card-chip` are REUSED read-only) — existing selectors unmodified, teal ink-token discipline

**Checkpoint**: Registers/keys/styles ready — section work can begin.

---

## Phase 3: User Story 1 — Teacher instantly understands today (Priority: P1) 🎯 MVP

**Independent Test**: Hero greets sara with a today summary + plain-text next-action hint (zero pay wording, no date/notification count); today's schedule cards carry labeled chips + authored student counts.

- [x] T005 [US1] In `src/js/pages/teacher-portal.js`: upgrade the hero per FR-001 (today summary + hint keys) and deepen the today's-schedule cards per the schedule contract — time/course/room + `statusChip` + the authored student count (`present` fixture literal via `num()`, e.g. «١٨ طالبًا»); no live-join affordance, no duration/fine fragments; build and verify both languages, zero raw keys

---

## Phase 4: User Story 2 — Next class clear and honest (Priority: P1)

**Independent Test**: The next-class card shows time/course/room/group + the prepare hint; the live affordance is the honest backendRequired note, never join-styled.

- [x] T006 [US2] In `src/js/pages/teacher-portal.js`: enrich the next-class card per FR-003 — add the group label where fixture-available + the authored `prt.tch.nextPrep` prepare hint; keep the existing honest live note wording; verify no join-styled control

---

## Phase 5: User Story 3 (part 1) — Student follow-up board (Priority: P1)

**Independent Test**: The board renders the TWO real follow-up cards (out15 st11 studentAbsent + the `data.att.fb.support` note · out4 st7 teacherAbsent/make-up) with real `outcomeChip`s + gentle framings + the reassurance line; no risk numbers.

- [x] T007 [US3] In `src/js/pages/teacher-portal.js`: build the follow-up board per the follow-up contract §1 — resolve `TEACHER_PREVIEW.followUps` against `SESSION_OUTCOMES` (`OUTCOME_BY_ID` import), render child-first cards with the real outcome chips + framing keys + the support-note text where the fixture carries it + the reassurance close; calm styling, no red walls, no computed anything

---

## Phase 6: Smoke reconciliation step 1 (research D13) [US11]

**Independent Test**: `npm run test:smoke` green on all 48 loads; `git diff tests/smoke/run.cjs` confined to the teacher expectations; the payHit assert byte-unchanged.

- [x] T008 [US11] Amend `tests/smoke/run.cjs` **teacher expectations ONLY**: planned count teacher **2 → 4** with chip-tone semantics (`.pt-planned .chip.tone-amber === 3` + `.tone-neutral === 1` — holds already since T002 re-registered the ids; the old planned row renders all four until Bands B/C place them) · **`bodyAnchors === 1` AND the anchor href matches `teacher-performance(\.en)?\.html`** (the tightened D11 sanctioned-link inventory — holds now, the foundation link exists) · `formControls === 0` · `.pt-section` floor ≥ 6 NOW (raised to ≥ 10 in T016; `emptyCount ≥ 1` also lands in T016 — the free-days state is Band C) · extend the tables + 390px scrollWidth probe to `teacher-portal` (now all three deepened portals); **THE payHit PAY-TOKEN ASSERT STAYS BYTE-VERBATIM; student branch, family branch (incl. its zero-pay regex), admin-scoped, and hub assertions byte-verbatim**; run smoke green (**MVP checkpoint** = T001–T008; T008 + T016's floor-raise = the ONE sanctioned amendment, reviewed as a single diff at T020)

---

## Phase 7: User Story 3 (part 2) — My students preview (Priority: P1)

**Independent Test**: The roster section renders exactly 4 display-only cards (grp1: st1/st6/st11/st13) with group/course association, lifecycle chips, authored notes; zero anchors, zero percentages.

- [x] T009 [US3] In `src/js/pages/teacher-portal.js`: deepen the my-students section per the follow-up contract §2 — `studentsOfTeacher('sara')` cards (avatar · name · group/course label · `familyStatusChip` · the authored `data.prtTchStu*` note); no links, no progress bars

---

## Phase 8: User Story 4 — Session-outcome workflow preview (Priority: P1)

**Independent Test**: Exactly 5 ordered display-only steps (attendance/remark/summary/homework/files) + the «حفظ نتيجة الجلسة» backendRequired mini-card + the mark-absent gated note; the recent-sessions slice renders exactly 2 real-outcome cards; zero form controls, zero new anchors.

- [x] T010 [US4] In `src/js/pages/teacher-portal.js`: deepen the outcome workflow per the session-outcome contract — extend the flowStep pattern from 4 to the 5 capture-verified steps (add the files step; renumber ١…٥) with one-line descriptions + place the `outcomeSave` `.pt-planned` mini-card as the section's write gate + the **T4 mark-absent backendRequired note** (amendment A2: non-anchor `.pt-note` w/ labeled chip — «تسجيل الغياب يحتاج تفعيل الخادم.»); THEN add the **Recent sessions** section (amendment A1 — T20/T21 explicit) directly after: exactly 2 display-only cards from `TEACHER_PREVIEW.history` (REAL out1 + out11 refs: child-first, real `outcomeChip`, `dateKey` day label, feedback line where the fixture carries one, authored homework-note lines); NO form/input/toggle anywhere, NO modal/route

---

## Phase 9: User Story 5 — Homework/tasks and materials (Priority: P2)

**Independent Test**: 3 authored task cards (due labels) + the taskManage planned gate; 3 authored material cards (type icons) + the matUpload backendRequired gate; zero interactive controls.

- [x] T011 [US5] In `src/js/pages/teacher-portal.js`: add the homework & tasks section per the materials-tasks contract §1 — `TEACHER_PREVIEW.tasks` display-only cards (association line + `.pt-tag` due label) + the `taskManage` planned mini-card
- [x] T012 [US5] Add the materials & library section per contract §2 — `TEACHER_PREVIEW.materials` display-only cards + the `matUpload` backendRequired mini-card; build and verify both sections render with resolving refs

---

## Phase 10: User Story 6 — Timetable and availability (Priority: P2)

**Independent Test**: SAT/MON/TUE day-grouped agenda cards + the truthful merged free-days `.pt-empty` + the availabilityEdit backendRequired gate; zero grids/tables.

- [x] T013 [US6] In `src/js/pages/teacher-portal.js`: add the timetable & availability section per the reports-availability contract §1 — `scheduleOfTeacher('sara')` day groups (the `.pt-day` pattern: day header + start–end/course/room cards + status chips) + the merged «الأربعاء والخميس — بلا حصص» `.pt-empty` (research D12) + the `availabilityEdit` backendRequired mini-card; REMOVE the old Spec-012 planned-row section once all four mini-cards live in their owning sections; verify plannedCount = 4 with correct placement

---

## Phase 11: User Story 7 — Monthly report rubric preview (Priority: P2)

**Independent Test**: The 5 dimension lines render display-only (no answer scales, no rating visual) + the inline backendRequired chip.

- [x] T014 [US7] In `src/js/pages/teacher-portal.js`: add the monthly-report rubric section per the reports-availability contract §2 — the five dimension `.pt-lines` + the explainer + the inline `availabilityChip('backendRequired')` (`.pt-card-chip` pattern); no scales, no score vocabulary

---

## Phase 12: User Story 8 — Requests, performance link, and account (Priority: P2)

**Independent Test**: The certificate preview (concept lines + backendRequired chip) + the ONE labeled performance link + the account slice (name/subject/status/availability chips + backendRequired edit note; NO rating/util numerics).

- [x] T015 [US8] In `src/js/pages/teacher-portal.js`: build the requests & performance section per the reports-availability contract §3 — the certificate-request preview card (routed-to-management framing + description/date concept lines + inline backendRequired chip) + the **T5 cancel/reschedule backendRequired note** (amendment A2: non-anchor `.pt-note` w/ labeled chip — «طلب إلغاء أو تعويض الحصة يحتاج تفعيل الخادم.») + the existing labeled performance link card (kept, unchanged target) — and the deepened account slice (`.pt-prof-row` rows: name · subject · the existing `teacherStatusChip(statusId)` from `components/teacher-status.js` · the availability chip via the generic `chip` + `TEACHER_AVAIL` tone/label) + the backendRequired editing note; the fixture's `rating`/`util`/`hours`/`sessions` numerics are NOT rendered

---

## Phase 13: Composition completion (cross-cutting — finishes the 13-section contract)

- [x] T016 Update the closing note to the delivered-state copy (`noteT/noteD` — live/writes backendRequired; communications = Spec 016) in `src/js/pages/teacher-portal.js`; full build; raise the T008 floors in `tests/smoke/run.cjs` to final (`.pt-section` ≥ 10, `.pt-empty` ≥ 1) and run smoke green — the composition contract's 13/13 now holds

---

## Phase 14: User Story 9 — Beautiful on mobile (Priority: P1)

- [x] T017 [US9] Mobile audit at 390px: the 5-step workflow, roster, and day groups stack cleanly, long Arabic titles wrap (`min-width:0`), zero horizontal overflow (probe green); fix any overflow in `src/js/pages/teacher-portal.js` / `src/styles/app.css`

---

## Phase 15: User Story 10 — Bilingual, RTL/LTR, themed, localized digits (Priority: P1)

- [x] T018 [US10] Run the full a11y matrix (`npm run test:a11y` — teacher AR light/dark + EN light against the deepened page) → critical=0 serious=0, fixing any contrast finding with teal ink-strength tokens in `src/styles/app.css`; scan both built files for raw keys and ASCII digits on AR

---

## Phase 16: User Story 14 — The pay-free audit (Priority: P1)

- [x] T019 [US14] Run the THREE-LAYER pay-free audit per the pay-free contract §2: (1) the word-bounded pay regex + currency regex over `src/js/pages/teacher-portal.js`, the portal fixture teacher block, and both locale overlays — **including comments** — zero hits; (2) the same regexes over `public/teacher-portal.html` + `.en.html` — zero hits; (3) confirm the Spec-012 smoke payHit assertion passed byte-unchanged in the T016 run; also verify NO route to any pay surface (the one link targets the pay-free performance board) and no `rating`/`util` numeral renders

---

## Phase 17: User Story 11 — Admin, student, family, hub protected (Priority: P1)

- [x] T020 [US11] Run the scope-guard G3 audit set from `academy-dashboard-discovery/app/`: (1) change-surface = G1 paths only · (2) hash-compare all 49 built files vs HEAD — exactly `teacher-portal.html` + `.en.html` differ (47/49 identical) · (3) the pay-free audit result (T019) recorded · (4) zero `href="#"` sitewide + teacher bodyAnchors === 1 w/ exact target + zero form controls · (5) no admin markup in the teacher page / no portal ref in admin files · (6) planned registers exact (teacher 4-id set; student/family byte-unchanged) · (7) `git diff` empty on all G2 files (`portal-shell.js`, `build-html.mjs`, `nav.config.js`, `enhance.js`, `package.json`, `student-portal.js`, `family-portal.js`, `portals.js`) · (8) Spec 008/009/010/011/012/013/014 guards re-run `ok` (single-diff review of the T008+T016 smoke amendment)

---

## Phase 18: User Story 12 — Legacy teacher capabilities accounted for (Priority: P1)

- [x] T021 [US12] Append **§9 Spec-015 delivery notes** to `academy-dashboard-discovery/specs/012-role-portal-foundation/legacy-role-capability-coverage.md` per the coverage contract table (all 27 T-rows dispositioned; **T2/T17/T18/T19 stay backendRequired — pay, never rendered**; **T20/T21 explicitly delivered via the recent-sessions/history slice + the workflow preview** (amendment A1); **T4/T5 visible as backendRequired gated notes on the page** (amendment A2); T13 chat refined to planned-016; excluded rows unchanged; + sign-off block); §§1–8 byte-unchanged

---

## Phase 19: User Story 13 — Screenshots prove it (Priority: P1)

- [x] T022 [US13] Extend `tests/screenshots/capture.cjs` additively: the NEW teacher **ar/dark** base frame + element-scoped area frames (verify `section:nth-of-type` indices against the final DOM — expected after amendment A1: 2=today, 3=next, 4=follow-up, 5=students, 6=workflow, **7=recent-history**, 8=tasks, 9=materials, 10=timetable, 11=rubric, 12=requests/performance, 13=account) and run `npm run screenshots` → 0 console errors
- [x] T023 [US13] Visual review of all Spec-015 frames against `contracts/screenshot-acceptance.md` §2 (organized/cockpit/not-admin-like; honest gated affordances; **zero pay vocabulary/figures**; no computed score; RTL/dark/mobile quality; unchanged proofs); record the verdict table + failure-condition sweep + issues-found-and-fixed list in `screenshots/REVIEW.md`; fix-and-recapture anything failing

---

## Phase 20: Polish — docs, final gate

- [x] T024 [P] Docs: add the one-line Spec-015 Django note to `README.md` if wording needs it; refresh `CLAUDE.md` if any planned detail shifted during implementation; finalize the REVIEW.md Spec-015 section
- [x] T025 Final gate from `academy-dashboard-discovery/app/`: `npm run build` + `npm test` green (48 loads, amended teacher asserts, a11y 0/0) + re-run the FULL G3 audit set (T020) incl. the pay-free audit + `git status` shows only the G1 surface; mark this tasks.md checklist accurately

---

## Dependencies & execution order

- **T001 → T002/T003/T004 [P] → T005…T007 (sequential — same page module) → T008 (MVP checkpoint) → T009…T015 (sequential) → T016 (floor raise) → T017/T018 → T019 → T020 → T021 → T022/T023 → T024 → T025.**
- Story completion order: US1 → US2 → US3(board) → (smoke US11 step 1) → US3(roster) → US4 → US5 → US6 → US7 → US8 → US9 → US10 → US14 → US11 → US12 → US13. All on the D16 band sequence; no story depends on a later one.
- Parallel opportunities: T002+T003+T004 (three files); T021 can run parallel with T022 (different files) if desired. Section tasks are deliberately serial — one file, one organized cockpit.

## Implementation strategy

**MVP = T001–T008** (Band A: pay-free hero + today's schedule with student counts + the enriched next-class card + the real-outcome follow-up board, with the teacher smoke branch re-scoped and green) — independently demoable: the teacher's top three questions answered with fixture truth. Then Band B (T009–T012), Band C (T013–T016), then the verification ladder (mobile → a11y → **the pay-free audit** → protection → coverage → screenshots) and the polish gate. Any blocking finding routes back to the owning section task — never to a scope expansion; the pay hard rule is checked at every build touchpoint (T003 authoring discipline, T008's kept payHit, T019's three layers, T020 audit #3, T023 visual).
