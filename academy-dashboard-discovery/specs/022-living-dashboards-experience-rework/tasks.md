# Tasks: Living Dashboards Experience Rework (Spec 022)

**Input**: Design documents from `academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D24) · data-model.md · contracts/ (16) · quickstart.md · visual-grounding.md (16 frames) — plus Specs 016–021 law (DEC-001…009 binding).
**Tests**: ONE sanctioned smoke amendment (the smoke-rescope contract) in T011 — hub/student/family/teacher/family-child re-pins + new probes (idHero/railStops/flowSteps/storyRows) + the reduced-motion CSS audit + the hub ceiling pin, reviewed as ONE diff. **BYTE-VERBATIM FOREVER: payHit · both payFigure/famPay regex lines · ALL admin asserts · the FAMILY_INTERNAL branch (family-children incl.) · the STUDENT_INTERNAL content branch · all Shell-v2 nav-count branches.**
**App root**: `academy-dashboard-discovery/app/`. **Hard rules on every task**: rebake = EXACTLY the 22 sanctioned files (identity expected 55/77) · the six student internal MODULES and `family-children.js` are FORBIDDEN files · `portal-shell.js`/`enhance.js`/`nav.config.js`/`build-html.mjs`/`package.json` FROZEN · portal-page.js APPEND-ONLY (existing 6 exports byte-identical) · teacher pay-free EXTENDED set (copy AND comments — the G8a lesson) · family zero-pay regex pre-checks on every new family-facing string · ALL motion inside `prefers-reduced-motion: no-preference` · zero new hooks/storage keys · ceilings unchanged (overflow → STOP & trim) · every D24 stop-condition live.

## Phase 0: Visual grounding gate (precondition — COMPLETE)

- [x] T000 Visual grounding gate: 16 frames covering all 12 required areas recorded in `specs/022-living-dashboards-experience-rework/visual-grounding.md` — **done at specify time, re-verified at plan time (research D1). Implementation MUST re-open the grounding file at start; any design element without a cited frame = stop.**

---

## Phase 1: Setup (baseline gate)

- [x] T001 Baseline gate from `academy-dashboard-discovery/app/`: `npm run build` deterministic vs the working tree (77 files, 0 diffs) + `npm test` green (smoke 76 loads + axe 0/0); CAPTURE THE PROOF BASELINES — the six student-internal `#page-body` extraction hashes ×2 languages (the D6 proof inputs), the family-child `#page-body` extraction hash ×2 (the D7 supersession baseline), the family-children full-file hashes ×2 (the D8 zero-diff pin); archive the BEFORE screenshot set (verify the pre-022 frames exist on disk for D19); stub the "Spec 022" section in `screenshots/REVIEW.md`

---

## Phase 2: Foundational (shared living layer — blocks all surfaces)

- [x] T002 [P] Append the living-layer section to `src/styles/app.css` per data-model §4 + the living-design-primitives contract: tokens (`--lv-dur/--lv-ease/--lv-grad-*` incl. dark variants) · classes `.pt-idhero .pt-rail .pt-stop(.is-now/.is-next/.is-done) .pt-story .pt-flow .pt-flow-step .pt-guide .pt-lift .pt-cele` · keyframes `lv-fill/lv-fadeup/lv-pulse` — ALL motion inside `@media (prefers-reduced-motion: no-preference)` with the static end-state as the no-media default; ZERO edits to pre-existing rules (additive diff proof); `.pt-idhero` naming (`.pt-hero` belongs to the hub)
- [x] T003 [P] Add the additive `LIVING_HOME` fixture group to `src/js/fixtures/portal.js` per data-model §1: family (hero counters 5/3/1 + billing/requests stories) · teacher (hero counters — hour/class/task counts ONLY, pay-free comment discipline) · student (hero counters re-homing the existing KPI facts) · hub (the childView demoted-entry ref); counters/stories REFERENCE existing authored numbers; rail stops derive from the EXISTING today slices — no new session/child data; zero edits to retained slices
- [x] T004 [P] Locale work in `src/locales/ar.prt.js` + `en.prt.js` per data-model §2–3: the additive `prt.lv.*` namespace (hero/rail/story/flow/guide/hub-demotion/fold-point copy — AR-first, EN-mirrored; billing story pre-checked against the payFigure regex; teacher strings pre-checked against the extended pay set) + the FOUR sanctioned re-labels (`prt.portal.student`→«عرض الابن» · `prt.role.student`→«ابن العائلة» · `prt.title.student`→«عرض الابن» · `prt.hub.student.t/d`→the demoted copy); `prt.title.stu*` and every other existing key BYTE-VERBATIM (grep-audit)
- [x] T005 Append the five primitives to `src/js/components/portal-page.js` per data-model §5: `idHero({role, personaKey, subKey, counters})` · `dayRail(stops, {tagMode})` · `storyRow(stories)` · `flowStrip(steps, {gateStep})` · `guidePanel(gate)` — appended AFTER the six existing exports which stay BYTE-IDENTICAL (append-only diff proof); heroes structurally refuse pay-looking props (no amount/currency fields exist)

**Checkpoint**: shared layer ready — `npm run build` at this point already rebakes the 14 student files via T004's re-labels; verify the six internal `#page-body` extraction hashes STILL MATCH T001's baseline (the D6 proof, 12 checks) and family-children is byte-identical.

---

## Phase 3: User Story 1 — The corrected hub (Priority: P1)

**Independent Test**: `portals(.en).html` renders 2 primary role cards [family, teacher] + the admin band + EXACTLY 1 demoted child-view entry naming the family journey and سلمان; no student primary card; all links real.

- [x] T006 [US1] Rework `src/js/pages/portals.js` per the hub-role-reclassification contract: primary `ROLES` → `[family, teacher]`; upgrade the existing `.pt-hero` copy (headline names the three primary roles); ADD the demoted child-view card below the grid (`prt.lv.hub.cv*` + one real link → `student-portal(.en).html`); admin band + demo notes KEPT; build + self-check (anchors, copy, no auth claims)

---

## Phase 4: User Story 2 — The living family home (Priority: P1)

**Independent Test**: `family-portal(.en).html` renders idHero + child-tagged dayRail + upgraded child cards + billing/requests stories; the 12 pre-existing body anchors survive by set-equality; payFigure regex green; height within [900,2200].

- [x] T007 [US2] Rework `src/js/pages/family-portal.js` per the family-living-home contract: ① violet `idHero` (replaces pageHead+kpiRow) ② family `dayRail` from FAMILY_PREVIEW today (child tags; now/next/done) ③ the five child cards upgraded IN PLACE (avatar tone + animated bar + kidHint signal line; the 5 drill-downs + 7 sibling tiles KEPT) ④ `storyRow` (billing settled + requests — regex-pre-checked copy) ⑤ quick links w/ `pt-lift` + note; build + self-check (anchors set-equality, payHIT=false, scrollHeight)

---

## Phase 5: User Story 4 — The living teacher home (Priority: P1)

**Independent Test**: `teacher-portal(.en).html` renders teal idHero + teaching dayRail + priority stories + the 4-step flowStrip + guidePanel gates; nav stays 1+6; zero pay tokens in source AND built.

- [x] T008 [US4] Rework `src/js/pages/teacher-portal.js` per the teacher-living-home contract: ① teal `idHero` (counts only) ② teaching `dayRail` (room/course/count/status) ③ follow-ups as priority `storyRow` ④ `flowStrip` تحضير→حضور→تسجيل→مراجعة (existing gate on تسجيل) ⑤ task chips ⑥ `guidePanel` gates + planned-nav note; run the extended pay grep on the module (incl. comments) BEFORE building; build + self-check

---

## Phase 6: User Story 5 — The child-view home (Priority: P1)

**Independent Test**: `student-portal(.en).html` renders the child-view identity («عرض الابن»/«ابن العائلة») + idHero/dayRail/storyRow over the existing student facts; the 6 sibling quick links + both gates survive; the six internals show the reframed shell with byte-equal bodies.

- [x] T009 [US5] Rework `src/js/pages/student-portal.js` per the child-view-reclassification contract (Option B+): `idHero` (the 4 KPI facts re-homed as hero counters + stories) + `dayRail` (today sessions) + the homework band + `storyRow`/week glance + the 6 sibling quick links KEPT + gates 1+1 KEPT; NO touches to the six internal modules (FORBIDDEN files); build + self-check (bodyAnchors sibling set-equality, extraction hashes on the six internals re-verified)

---

## Phase 7: User Story 3 — The fold point (Priority: P1)

**Independent Test**: `family-child(.en).html` shows EXACTLY ONE new preview panel/link («افتح عرض الابن الكامل — سلمان») → student-portal; the 5 panels/:target/default-st1/switcher-5 machinery untouched; family-children byte-identical.

- [x] T010 [US3] Edit `src/js/pages/family-child.js` per the family-child-foldpoint contract: ONE preview panel in the intro area (`prt.lv.child.*` copy naming سلمان + one real link); NOTHING else; build + record the NEW `#page-body` extraction hash ×2 as the 022 baseline (declared supersession of the 020 hash); PROVE the delta is the one panel only (extraction diff) and PROVE `family-children(.en).html` is byte-identical to T001's hashes (the D8 zero-diff pin)

---

## Phase 8: Test harness (the ONE sanctioned smoke amendment → MVP gate)

- [x] T011 The ONE smoke amendment in `tests/smoke/run.cjs` per the smoke-rescope contract, reviewed as ONE diff: new evaluate() probes (idHero, railStops, flowSteps, storyRows, celeBadges) · hub branch re-pin (2-card set-equality + admin link + exactly 1 child-view link) · student-portal re-pin (kpiCards 4→0, idHero===1, railStops pinned, bodyAnchors re-pinned w/ sibling set-equality KEPT, gates 1+1 KEPT) · family-portal re-pin (idHero===1, railStops, childRe/sibRe subsets KEPT, story links pinned exactly) · teacher re-pin (idHero/rail/flow probes; planned 6 + navWant 7/5/1 KEPT) · family-child re-pin (+1 real anchor; panels/default/switcher/zero-pay asserts BYTE-KEPT) · the reduced-motion CSS audit (no `lv-` motion outside the media query) · hub ceiling pin [500,2200] — **payHit + both payFigure/famPay lines + ALL admin asserts + the FAMILY_INTERNAL branch + the STUDENT_INTERNAL content branch + all Shell-v2 nav branches BYTE-VERBATIM**; then `npm run build && npm run test:smoke` → **MVP gate: 76 loads PASS**
- [x] T012 [P] Add the a11y rows to `tests/a11y/run.cjs` per the mobile-a11y-motion contract: portals · family-portal · teacher-portal · student-portal · family-child × (AR light + AR dark) + family-portal EN light; run → critical=0 serious=0 (hero dark contrast is the watch item)
- [x] T013 [P] Add the AFTER capture matrix to `tests/screenshots/capture.cjs` per the visual-regression contract (hub d/m · family d/m/dark · teacher d/m/dark · student child-view d/m · family-child d · hub EN — distinct AFTER naming, BEFORE frames preserved); run sequentially after a11y → 0 console errors

---

## Phase 9: Audits (laws + identity)

- [x] T014 [P] Pay/zero-pay audits: teacher three-layer on the EXTENDED set (source incl. comments on teacher-portal.js + the new fixture/locale slices · built AR+EN grep · payHit byte-verbatim vs HEAD) + the payFigure regex over ALL family bodies (rebaked + untouched) + hero-counter inspection (counts only, all roles)
- [x] T015 [P] Identity + preservation proofs: rebaked set === EXACTLY the 22 sanctioned files; identity computed honestly (expect 55/77) · 40 admin + index + family-children + six family internals byte-identical · the six student internal bodies extraction-hash equal (12 checks) · the family-child delta = one panel · portal-page.js diff pure-append (existing exports byte-identical) · frozen files 0-diff (portal-shell/enhance/nav.config/build-html/package.json/family-children.js/six student modules) · locale audit (only `prt.lv.*` added + the four sanctioned re-labels; all else byte-verbatim)
- [x] T016 [P] Ceiling + motion audits: measure scrollHeight @1366×768 on all six rebaked surfaces (homes [900,2200] · hub/family-child [500,2200]); record the deltas in REVIEW; any overflow → STOP & trim (never raise silently); verify reduced-motion rendering (emulate `reduce` → complete static pages)

---

## Phase 10: Documentation

- [x] T017 [P] `screenshots/REVIEW.md` Spec 022 section per the visual-regression contract: the BEFORE/AFTER verdict table per surface · living-primitives proof · role-model + student-demotion proof · heights table · mobile/dark results · console errors 0 · pay/zero-pay proof · the family-child supersession record
- [x] T018 [P] Docs: `app/README.md` (the living layer, the corrected role model, Django notes for the demoted child view) + `CLAUDE.md` full rewrite (022 delivered → 023 next per DEC-009)
- [x] T019 [P] Append-only spec annotations: the DEC-009 amendment note in `specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/future-spec-sequence.md` (021–032 supersedes the 018 renumbering) + a 022 note in the 016 coverage matrix if touched surfaces demand it

---

## Phase 11: Adversarial reviews + final gate

- [x] T020 Two parallel Opus review agents on the FULL diff: clean-code guard (scope/isolation · pay/zero-pay · honesty · primitive quality · the D24 stop list) + test guard (the ONE smoke amendment: byte-verbatim blocks · non-vacuous re-pins · no weakened asserts); fix only real findings, re-verify
- [x] T021 Final full gate from `academy-dashboard-discovery/app/`: `npm run build && npm test` + captures green; tasks.md all checked; the 25-point final report per plan.md §Implementation outline. **NO commit · NO push · NO manual hooks (the watcher owns git).**

---

## Dependencies & execution order

T000 ✓ → T001 → {T002 ∥ T003 ∥ T004} → T005 → checkpoint → T006 (US1) → T007 (US2) → T008 (US4) → T009 (US5) → T010 (US3) → T011 (MVP gate) → {T012 ∥ T013 (sequential run, parallel edit)} → {T014 ∥ T015 ∥ T016} → {T017 ∥ T018 ∥ T019} → T020 → T021.
Surfaces T006–T010 are independent files and MAY be implemented in any order once Phase 2 lands, but each must build+self-check before the next starts (the proven 020 rhythm). MVP scope = Phases 1–3 + T011's hub re-pin (the corrected role model demo-able); full value lands at T021.
