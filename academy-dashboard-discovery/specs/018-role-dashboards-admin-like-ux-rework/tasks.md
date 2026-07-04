# Tasks: Role Dashboards Admin-Like UX Rework (Spec 018)

**Input**: Design documents from `academy-dashboard-discovery/specs/018-role-dashboards-admin-like-ux-rework/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D15) · data-model.md · contracts/ (11) · quickstart.md — plus Specs 016/017 law.
**Tests**: ONE sanctioned smoke amendment (the rescope contract) in T012 — the long-home branch re-scope + the family-child branch + the compactness probes, reviewed as ONE diff. **BYTE-VERBATIM forever: the payHit block · the family zero-pay regex line · ALL Shell-v2/hub/admin asserts.**
**App root**: `academy-dashboard-discovery/app/`. **Hard rules on every task**: the teacher pay-free EXTENDED set (copy AND comments) · zero deletion of displaced fixtures/keys (retention grep at the G-audit) · Shell v2 + ROLE_NAV + hub UNTOUCHED · `build-html.mjs` = EXACTLY the 2 registration lines · the ceiling makes long pages impossible to ship. Children = the REAL fam1 roster **st1 · st6 · st11 · st12 · st13** (research D5).

## Phase 0: Visual grounding gate (precondition — COMPLETE)

- [x] T000 Visual grounding gate: open and visually review the relevant legacy family/teacher/admin screenshots + the approved design references for the exact Spec 018 surfaces (family home/children/child-history/child-profile/schedule/today/billing/feedback/requests/library · teacher home/roster/timetable/history/plans/tasks/library · admin rhythm references), record the evidence table + conclusions in `visual-grounding-addendum.md`, and report any decision change BEFORE implementation — **done 2026-07-04: 23 frames reviewed, evidence recorded, ZERO Spec 018 decisions changed** (see `visual-grounding-addendum.md` + the research.md addendum). Implementation MUST NOT start before this gate is complete.

---

## Phase 1: Setup (baseline gate + BEFORE heights)

- [x] T001 Baseline gate from `academy-dashboard-discovery/app/`: `npm run build` + `npm test` green vs HEAD `0edafe1` (49 files, 0 diffs); **measure the BEFORE heights** (Playwright or the smoke browser: 1366×768 viewport → `document.documentElement.scrollHeight` for the three role homes, AR) and stub the "Spec 018" section in `screenshots/REVIEW.md` with the baseline record + the BEFORE height table + the planned re-scope note

---

## Phase 2: Foundational (fixtures · locales · CSS — blocks all stories)

- [x] T002 [P] Add the NEW slices to `src/js/fixtures/portal.js` per data-model §5: `COMPACT_HOME` (student/family/teacher kpis — authored literals per data-model §2 — + weekGlanceKeys/historyTeaserRef/requestsTeaserKey/workflowSummaryKey) + `CHILD_PROFILE` for st1/st6/st11/st12/st13 (per-panel authored bits + REAL note/outcome/session refs where they exist per D5); **ROLE_NAV/PERSONAS/PREVIEWS/PLANNED byte-untouched**; comments clean against the extended pay set
- [x] T003 [P] Add the new keys to `src/locales/ar.prt.js` + `en.prt.js` per data-model §6: `prt.kpi.{stu,fam,tch}.*` (4 labels each) · `prt.band.*` (band titles/hints incl. quick-links + «فتح ملف الابن»/“Open child file”) · `prt.child.*` (page title, switcher aria, panel labels, summary-line keys, truthful-none states, history/profile gate copy) · `prt.title.familyChild` (declared shared-map ADDITION) · `data.prtChild*` authored strings — key-mirrored; **NO displaced key deleted or reworded**; teacher keys pass the extended set
- [x] T004 [P] Add additive `.portal-shell` CSS to `src/styles/app.css` per D3: `.pt-kpi`/`.pt-kpi-row` (compact stat cards, 4-up desktop / 2×2 mobile) · band spacing utilities · `.pt-child-switch` (baked tab-trigger row) · quick-link tile variant · compact now-band 2-col split ≥1024px; token-driven, dark/RTL-safe, ZERO existing selectors modified

**Checkpoint**: slices/keys/styles ready.

---

## Phase 3: User Story 4 (part 1) — The child drill-down page exists FIRST (Priority: P1)

**Independent Test**: `family-child(.en).html` builds and renders 5 baked panels (default st1 visible without JS), the switcher swaps panels via the existing tab/hash hooks, deep links `#child=stX` select correctly; zero body anchors/forms; zero money figures.

- [x] T005 [US4] Create `src/js/pages/family-child.js`: page header (title + one-line purpose, slim variant) · the baked 5-trigger switcher row (existing `data-tab` hooks) · five `[data-tabpanel]` child panels per data-model §3 (identity+lifecycle chip · course/group/teacher line · today/next real-or-truthful-none · attendance mini-trio + authored progress · latest teacher note (real FAMILY_PREVIEW refs for st1/st6/st12 notes + kidHints) · homework/materials summary lines · history gate + profile gate via `availabilityChip`); display-only, zero `<form>/<input>`, zero anchors in the body, zero money-like anything
- [x] T006 [US4] Register the page: add EXACTLY 2 lines to `academy-dashboard-discovery/app/scripts/build-html.mjs` (the `renderFamilyChild` import + the PAGES entry `{ base:'family-child', shell:'portal', role:'family', personaKey:'data.fam.fam1.name', activeId:null, titleKey:'prt.title.familyChild', render:renderFamilyChild }`); `npm run build` → 50 pages + index = 51 files; verify both language files render with zero raw keys and the family shell (home = the active nav anchor per D4)

---

## Phase 4: User Story 3 + User Story 4 (part 2) — Compact family home w/ real drill-downs (Priority: P1)

**Independent Test**: family home = the 7 bands; 4 KPIs; ≤3 today rows; five child cards EACH with a real «فتح ملف الابن» link (`family-child(.en).html#child=stX`, every child exactly once); billing STATUS chip + requests teaser; quick tiles; sections 4–7.

- [x] T007 [US3] Rewrite `src/js/pages/family-portal.js` to the 7-band recipe (spec + compact-role-home contract): compact header (greet + one-line status) · `COMPACT_HOME.family.kpis` row · now band (child-tagged today ≤3 + next) · children cards core band (avatar/name/hint chip + the drill-down link per child) · preview band (billing `billSettled` STATUS chip + `requestsTeaserKey` + billingGate compact treatment) · quick-link tiles (children/schedule/progress/billing/requests/materials/profile — planned treatment) · one-line note; every displaced section checked off the displacement map; zero-pay wording discipline throughout

---

## Phase 5: User Story 1 + User Story 2 — Compact student home (Priority: P1)

- [x] T008 [US1] Rewrite `src/js/pages/student-portal.js` to the 7-band recipe: compact header (greet + next-session status line) · student KPI row (attended ٩ · progress ٧٨٪ · open homework ٣ · streak ٥) · now band (today + next w/ the honest live note) · homework snapshot core (top-2 cards + the hwSubmit gate compact) · preview band (week-glance chips SAT–FRI truthful + the out1 history teaser card) · quick tiles (schedule/homework/materials/progress/history/profile) · note; bodyAnchors stays 0; displaced sections checked off (achievements/celebration/full week/full history/full materials/profile → Spec 019 per the map)

---

## Phase 6: User Story 5 + User Story 6 — Compact teacher cockpit (Priority: P1)

- [x] T009 [US5] Rewrite `src/js/pages/teacher-portal.js` to the 7-band recipe: compact header · teacher KPI row (حصص اليوم ٢ · متابعات ٢ · مهام مفتوحة ٣ · طلابي ٤) · now band (today ≤2 + next w/ prep hint + honest note) · follow-up board core (the two REAL outcome cards + reassurance, kept) · preview band (workflow summary card + `outcomeSave` gate compact + the KEPT sanctioned performance link) · quick tiles (schedule/students/outcomes/tasks/reports/profile) · note; bodyAnchors stays ===1 (the perf link); labels re-checked against the extended pay set; displaced sections checked off (5-step detail/history/tasks/materials/timetable/rubric/requests-notes/account → Spec 021)

---

## Phase 7: User Story 8 — Heights measured, ceiling pinned (Priority: P1)

- [x] T010 [US8] `npm run build`; measure the AFTER heights (1366×768, AR+EN, three homes); confirm ≤2,200px each (retune within ±10% ONLY if a band legitimately needs it, recording the retune + reason in `screenshots/REVIEW.md`); fill the BEFORE/AFTER table in REVIEW.md

---

## Phase 8: User Story 9 — Displacement verified (Priority: P1)

- [x] T011 [US9] Walk the spec's displacement table row-by-row against the three rewritten modules (every pre-018 section accounted: kept-compact / family-child / 019 / 020 / 021 / gate) and run the retained-keys grep (e.g., `prt.stu.ach1|prt.stu.celeb|prt.tch.flow5|prt.tch.rubric|prt.fam.req.trialT|prt.fam.hist` present in BOTH overlays; displaced fixture fields present in `fixtures/portal.js`); record the checklist result for the G-audit

---

## Phase 9: User Story 10 — The smoke amendment (Priority: P1) 🎯 MVP checkpoint

**Independent Test**: 50 loads green; the diff confined to the enumerated re-scope + additions; byte-verbatim lines appear as context only.

- [x] T012 [US10] Amend `tests/smoke/run.cjs` per the smoke-rescope contract, ONE diff: (a) student branch → `kpi===4` (`.pt-kpi` count) + sections 4–7 + bodyAnchors===0 (kept); (b) family branch → kpi===4 + window + **bodyAnchors===5 all matching `family-child(\.en)?\.html#child=(st1|st6|st11|st12|st13)` each exactly once** + re-pinned gate tones (zero-pay regex line BYTE-VERBATIM); (c) teacher branch → kpi===4 + window + re-pinned tones (bodyAnchors===1 + exact-target + payHit lines BYTE-VERBATIM); (d) ADD `family-child` to PAGES + PORTAL_PAGES (50 loads) with its branch (5 panels + 5 `[data-tab]` triggers + default st1 visible + shell registry unique {family-portal, portals} multiset 5 + navCurrent 2×family-portal + body 0 + formControls 0 + zero-pay + tables 0 + 390 probe); (e) the 1366×768 ceiling/floor probe (≤2,200 / ≥900) for the three homes; (f) Shell-v2/hub/admin asserts UNTOUCHED; run `npm run test:smoke` green — **MVP = T001–T012**

---

## Phase 10: User Story 11 — Teacher pay-free three layers (Priority: P1)

- [x] T013 [US11] Extended-set audit: (1) source grep incl. comments over `src/js/pages/teacher-portal.js` + the new fixture slices + the new locale keys → zero; (2) built grep over `public/teacher-portal(.en).html` → zero (incl. currency tokens); (3) confirm payHit passed byte-unchanged in T012's run; record all three

---

## Phase 11: User Story 12 — Admin identity (Priority: P1)

- [x] T014 [US12] Hash-compare all 51 built files vs HEAD `0edafe1` → **43/51 identical** (40 admin + `index.html` + the `portals` pair); changed = the three role pairs; new = the family-child pair; `git diff` EMPTY on `enhance.js`/`nav.config.js`/`package.json`/`portal-shell.js`/`portals.js`/all admin sources; display the `build-html.mjs` diff and confirm it is EXACTLY the 2 registration lines

---

## Phase 12: User Story 13 — Mobile (Priority: P1)

- [x] T015 [US13] 390px pass on all four pages (3 homes + family-child): KPI 2×2 wrap, bands stack, switcher usable, drawer still works, probes green; fix overflow in `src/styles/app.css` only

---

## Phase 13: User Story 14 — English equivalence (Priority: P2)

- [x] T016 [US14] Eyes-on the four `.en.html` pages: LTR mirror, mirrored labels, same counts/links/gates; zero raw keys (smoke covers mechanically — this is the review pass)

---

## Phase 14: User Story 7 — Admin-like rhythm verified (Priority: P1)

- [x] T017 [US7] Side-by-side screenshot comparison of each compact home vs `dashboard__ar__light__desktop.png` (band rhythm, KPI row, density, drill-down affordances — role accents intact, zero admin markup); declare the freeze additions (`.pt-kpi`, band utilities, switcher, tile variant) in `screenshots/REVIEW.md` per the admin-like-design contract

---

## Phase 15: Polish — a11y, captures, docs, sequence, final gate

- [x] T018 Run `npm run test:a11y` with `family-child` scenarios added additively to `tests/a11y/run.cjs` (ar light + ar dark) → critical=0 serious=0; fix contrast with tokens only if needed
- [x] T019 Extend `tests/screenshots/capture.cjs` additively: family-child frames (AR desktop, AR mobile) + the SWITCHED-CHILD step (`childTab: 'st11'` clicking its `[data-tab]`) + re-capture the three compact homes (AR desktop+mobile, teacher dark, one EN) + hub/admin proofs → 0 console errors; write the Spec-018 verdict table + failure sweep + the completed height table in `screenshots/REVIEW.md`
- [x] T020 [P] Docs: README Django note for `family-child` (`family/child/<id>`; panels ↔ view context; switcher = baked tabs) in `academy-dashboard-discovery/app/README.md`; verify CLAUDE.md points at Spec 018 (done at plan time)
- [x] T021 [P] Append (append-only, zero deletions) to `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/future-spec-sequence.md`: the user-directed Amendment section renumbering 019–028 per the future-sequence-amendment contract; append the Spec-018 delivery annotation to `.../legacy-to-new-coverage-matrix.md`
- [x] T022 Final gate from `academy-dashboard-discovery/app/`: `npm run build` + `npm test` + `npm run test:smoke` + `npm run test:a11y` green (50 loads, axe 0/0) + the FULL scope-guard G3 audit (surface · 43/51 · probes · child links · pay layers · retention grep · G2 empty · prior guards green, amendment as ONE diff · heights recorded) + mark this tasks.md accurately

---

## Dependencies & execution order

- **T001 → T002/T003/T004 [P] → T005 → T006 → T007 → T008 → T009 (homes sequential — shared patterns, but different files; T008∥T009 allowed if desired) → T010 → T011 → T012 (MVP) → T013/T014/T015/T016 (any order) → T017 → T018 → T019 → T020/T021 [P] → T022.**
- The drill-down page (T005/T006) precedes the family home rewrite (T007) so the 5 links are born live — zero dead-link windows.
- Parallel: T002+T003+T004; T008∥T009 (different files); T020∥T021.

## Implementation strategy

**MVP = T001–T012**: slices/keys/CSS → the child page + registration → the three compact homes → heights pinned → displacement verified → the smoke amendment green on 50 loads. Everything after is closure (pay layers, identity, mobile/EN eyes-on, rhythm review, a11y, captures, docs, sequence amendment, final gate). Any blocking finding routes to its owning task; the ceiling assert makes long-page regression impossible; displaced content is retention-grepped, never deleted.
