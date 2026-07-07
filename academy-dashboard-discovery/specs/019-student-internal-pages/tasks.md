# Tasks: Student Internal Pages (Spec 019)

**Input**: Design documents from `academy-dashboard-discovery/specs/019-student-internal-pages/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D16) · data-model.md · contracts/ (15) · quickstart.md · visual-grounding.md — plus Specs 016/017/018 law.
**Tests**: ONE sanctioned smoke amendment (the smoke-rescope contract) in T014 — the new student-internal branch + the student-home re-scope + ceiling [500,2200] on internals, reviewed as ONE diff. **BYTE-VERBATIM forever: the payHit block · the family zero-pay regex lines (home + family-child) · the family/teacher/hub/family-child branches · ALL admin asserts.**
**App root**: `academy-dashboard-discovery/app/`. **Hard rules on every task**: teacher pay-free EXTENDED set discipline in all copy AND comments (the G8a rewording lesson) · zero deletion/rewording of retained 013/018 fixtures/keys · `portal-shell.js`/`enhance.js`/`nav.config.js`/`package.json`/all family/teacher/admin modules FROZEN · `build-html.mjs` = EXACTLY 6 imports + 6 entries + the line-130 `activeId` pass-through · family (1+7) and teacher (1+6) registries byte-untouched · every page ≤2 screens (ceiling-guarded).

## Phase 0: Visual grounding gate (precondition — COMPLETE)

- [x] T000 Visual grounding gate: the 7-area evidence table exists in `specs/019-student-internal-pages/visual-grounding.md` (schedule · homework-nearest · materials · progress-nearest · history · profile · admin rhythm; the no-legacy-student-role reality recorded honestly; the 3 profile gates fixed by `student-profile-edit-full.png`) — **done 2026-07-04 at specify time; re-verified at plan time (research D1). Implementation MUST NOT start before this gate is complete.**

---

## Phase 1: Setup (baseline gate)

- [x] T001 Baseline gate from `academy-dashboard-discovery/app/`: `npm run build` deterministic vs HEAD `fe47f68` (51 files, 0 diffs) + `npm test` green (50 smoke loads + axe 0/0); stub the "Spec 019" section in `screenshots/REVIEW.md` (baseline record + the planned D13 quick-tiles deviation note + the height-table skeleton for the six pages)

---

## Phase 2: Foundational (shared primitives · fixtures · locales — blocks all pages)

- [x] T002 [P] Create `src/js/components/portal-page.js` (research D3): export `pageHead(titleKey, subKey)` · `secHead(icn, titleKey, hintKey?, extra?)` · `kpiCard(k, tone)` · `kpiRow(kpis, tone)` · `plannedCard(p)` · `gateNote(msgKey)` — logic byte-equal to the Spec-018 home copies (the 018 home modules are NOT migrated); portal namespace only; comments clean against the extended pay set
- [x] T003 [P] Add the additive `STUDENT_PAGES` group to `src/js/fixtures/portal.js` per data-model §4: homework (kpis 2/1/2 + 5 records: hw1–hw3 re-referenced + 2 NEW reviewed w/ noteKeys) · materials (c1/c3 groups: mat1–mat3 re-referenced + NEW per-course items) · progress (2 signal keys) · history (h1(out1)/h2/h3 re-referenced + 2 NEW authored records) · profile (3 pref chips + the gates trio `photoUpload/profileSave/passwordChange`); **ROLE_NAV untouched in this task; zero retained-slice edits**; all figures st1-canonical (9 · 78 · 41 · 5)
- [x] T004 [P] Add the additive locale keys to `src/locales/ar.prt.js` + `en.prt.js` per data-model §5: `prt.title.stu{Schedule,Homework,Materials,Progress,History,Profile}` · `prt.stu.pg.{sched,hw,mat,prog,hist,prof}.*` (headers/hints/sections/gate lines/chip labels/empties) · `data.prtStuPg*` authored strings — AR-first copy, key-mirrored; existing `prt.stu.*` keys REUSED verbatim where copy fits, never reworded; zero flagged-vocabulary tokens

**Checkpoint**: primitives/fixtures/keys ready — the six pages can now be written in any order.

---

## Phase 3: User Story 1 — Schedule at a glance (Priority: P1)

**Independent Test**: `student-schedule(.en).html` renders today+next cards, the day-grouped week (truthful WED/THU/FRI empties), labeled chips, ONE live gate, zero tables; ≈1–2 screens.

- [x] T005 [P] [US1] Create `src/js/pages/student-schedule.js` per the schedule contract: `pageHead` → today+next summary band (sara-proxy `SESSIONS_FULL` rows + the emphasized next card) → `SCHEDULE_WEEK` day-grouped agenda (the 013 pattern; truthful `.pt-empty` rest days) → ONE live/join backendRequired `gateNote` → closing `.pt-note`; imports from `components/portal-page.js`; zero tables/forms/anchors in the body

---

## Phase 4: User Story 2 — Homework clarity (Priority: P1)

**Independent Test**: `student-homework(.en).html` renders the KPI trio + pending/in-progress/reviewed sections (5 records) + due/state chips + the submit gate + truthful empties; zero forms.

- [x] T006 [P] [US2] Create `src/js/pages/student-homework.js` per the homework contract: `pageHead` → KPI trio band (`STUDENT_PAGES.homework.kpis`) → three state-grouped card sections (title · course · due chip · state chip · teacher-note line where authored) → the submit/upload backendRequired gate (re-homed hwSubmit semantics) → note; zero body anchors

---

## Phase 5: User Story 3 — Materials without the hero (Priority: P2)

**Independent Test**: `student-materials(.en).html` renders per-course groups (≥4 items) w/ type chips + the download gate; NO hero band; zero fake file links.

- [x] T007 [P] [US3] Create `src/js/pages/student-materials.js` per the materials contract: `pageHead` → c1 group → c3 group (type medallion + type chip + title cards from `STUDENT_PAGES.materials`) → the download/open backendRequired gate (re-homed matDownload semantics) → truthful empty where thin → note; zero body anchors

---

## Phase 6: User Story 4 — Honest progress (Priority: P2)

**Independent Test**: `student-progress(.en).html` renders the KPI band, two `.pt-bar` course bars, the attendance trio, the re-homed achievements (3) + celebration (3) sets, and 2 teacher signals; zero charts/rank.

- [x] T008 [P] [US4] Create `src/js/pages/student-progress.js` per the progress contract: `pageHead` → progress KPI band (overall ٧٨٪ · attended ٩ · streak ٥) → per-course bars (`STUDENT_PREVIEW.courses` re-rendered) → attendance trio tiles → achievements + celebration card sets (the RETAINED 013 fixtures render again — unordered) → teacher-signal lines (`STUDENT_PAGES.progress.signals`) → note; Arabic-Indic digits on AR; zero body anchors

---

## Phase 7: User Story 5 — History as a record (Priority: P2)

**Independent Test**: `student-history(.en).html` renders ≥5 F6 records (out1 FIRST w/ its real outcome chip), each w/ summary + homework-note lines; period chips clearly display-only; truthful trailing empty.

- [x] T009 [P] [US5] Create `src/js/pages/student-history.js` per the history contract: `pageHead` → display-only period `.pt-tag` chips (non-interactive, no filter semantics) → the record list (`STUDENT_PAGES.history.records`: out1 outcome-resolved first, then retained h2/h3, then the 2 NEW authored) → truthful `.pt-empty` beyond the window → note; zero body anchors, zero dead filters

---

## Phase 8: User Story 6 — Profile without fake forms (Priority: P2)

**Independent Test**: `student-profile(.en).html` renders identity card + academic rows + safe guardian line + 3 pref chips + EXACTLY 3 backendRequired `.pt-planned` gates (photo/save/password); zero `<form>/<input>`; body anchors 0.

- [x] T010 [P] [US6] Create `src/js/pages/student-profile.js` per the profile contract: `pageHead` → identity card (avatar/name/level/`familyStatusChip`) → academic `.pt-prof-row`s (level/subject/course/group/teacher via st1 + SUBJ maps) → safe guardian/family line (guardian name + city ONLY, from fam1) → preference chips → the THREE gates as `plannedCard`s (`STUDENT_PAGES.profile.gates` → titles/descs from `prt.stu.pg.prof.*`) → note

---

## Phase 9: User Story 7 — Real navigation (Priority: P1) — the registration cluster (ONE reviewed step)

**Independent Test**: build → 63 files; every student page shows 7 nav links w/ the correct single active item ×2 instances; home quick-tiles are REAL links; existing 49 files byte-identical.

- [x] T011 [US7] Register the pages in `academy-dashboard-discovery/app/scripts/build-html.mjs` (research D4): six `renderStudent<X>` imports + six PAGES entries `{ base, shell:'portal', role:'student', personaKey:'data.stud.a.name', activeId:'<navId>', titleKey:'prt.title.stu<X>', render }` + the ONE line-130 amendment `activeId: p.activeId || 'home'`; then `npm run build:html` and hash-verify the amendment is BYTE-NEUTRAL for all 51 existing files before proceeding
- [x] T012 [US7] The flip + the honesty fix, together: (a) six one-line `status: 'planned' → 'implemented'` edits in `ROLE_NAV.student` (`src/js/fixtures/portal.js`; order/labels/icons/pages untouched; family/teacher registries byte-untouched); (b) make `quickTiles` in `src/js/pages/student-portal.js` status-aware per D13 (implemented → real `<a class="pt-qtile" href="student-<x>(.en).html">`; planned → the existing tile byte-pattern); every other home band byte-equal
- [x] T013 [US7] `npm run build` → 62 pages + index = **63 files**; verify both languages of all six new pages render zero raw keys; measure + record the six pages' heights @1366×768 (AR+EN) in the REVIEW.md table (expect each within [500, 2200])

---

## Phase 10: User Story 9 (part 1) — The ONE smoke amendment (MVP gate)

**Independent Test**: `npm run test:smoke` green on 63 loads with every new assert live and every protected assert byte-verbatim.

- [x] T014 [US9] Amend `tests/smoke/run.cjs` per the smoke-rescope contract, as ONE diff: (a) PAGES/PORTAL_PAGES +6 (63 loads); (b) the NEW student-internal branch (shell/role · active ===2×self · navListAnchors===7 · plannedNavAnchors===0 · shell multiset===17 unique {7+hub} · bodyAnchors===0 · formControls===0 · tables===0 · ceiling [500,2200] · per-page pins: profile plannedBackend===3 & 0 forms · homework ≥5 records · materials ≥4 items · history ≥5 records); (c) the student-HOME re-scope (bodyAnchors===6 exact language-correct sibling targets each-once · navListAnchors 1→7 · multiset 5→17 · planned cards stay 2 · ceiling [900,2200] KEPT); (d) `expPlanned` +6 entries; (e) **payHit + family zero-pay lines + family/teacher/hub/family-child branches + admin asserts BYTE-VERBATIM** — then `npm run test:smoke` green = **MVP**

---

## Phase 11: User Story 9 (part 2) — Isolation & pay audits

- [x] T015 [US9] Pay/zero-pay tripwires (the pay-zero-safety contract): teacher EXTENDED-set greps (source incl. comments + built pair) zero · family zero-pay regex green (home + family-child) · the six NEW student sources + built pages greped against the same set (word-bounded EN, AR substrings, uppercase currency codes) — all from `academy-dashboard-discovery/app/`
- [x] T016 [US9] Identity & scope audit (the impact-protection contract): hash-compare all 63 built vs HEAD → **49/63 identical**, changed = EXACTLY the 12 new + `student-portal(.en).html`; frozen-file diffs (`portal-shell.js`/`enhance.js`/`nav.config.js`/`package.json`/family/teacher/admin modules) === 0 lines; `build-html.mjs` diff === 6 imports + 6 entries + 1 amended line; retained-key grep (achievements/celebration/materials/history/profile/hwSubmit keys still present AND now rendering); family/teacher registry rows byte-identical

---

## Phase 12: User Story 8 — Mobile, bilingual, themed

- [x] T017 [US8] Add the additive a11y rows to `tests/a11y/run.cjs` (six pages AR light + AR dark + schedule EN) and run `npm run test:a11y` → axe critical=0 serious=0 (token-only contrast fixes if needed, recorded)
- [x] T018 [US8] Add the additive capture rows to `tests/screenshots/capture.cjs` per D15 (six pages AR desktop+mobile · progress AR dark · schedule EN · student home refresh · family/teacher/family-child/admin unchanged proofs), run the suite (0 console errors), then EYES-ON review every new frame (incl. the EN sample + 390px) and fill the REVIEW.md Spec-019 section: per-page verdict table + heights + mobile result + the D13 deviation note + unchanged proofs

---

## Phase 13: Polish & cross-cutting

- [x] T019 [P] Docs: update `academy-dashboard-discovery/app/README.md` (student app = 7 pages; the registry mechanism) + `CLAUDE.md` SPECKIT block (019 delivered summary; 020 next) + the Django note ("student internal pages use the same ROLE_NAV registry and active_id; planned entries become implemented by flipping registry status and route")
- [x] T020 [P] Coverage annotations (research D16, append-only): the Spec-019 delivery annotation in `specs/016-.../legacy-to-new-coverage-matrix.md` (student S-rows → delivered/gated w/ guardian-proxy citations) + the re-homed notes on the Spec-018 displacement rows (achievements/celebration→progress · week→schedule · materials→materials · history→history · profile→profile · hwSubmit→homework)
- [x] T021 Adversarial reviews on the full diff: clean-code guard (scope creep · long-page regression · duplicated logic vs `portal-page.js` · unscoped CSS · raw keys · dead links · fake gates · pay tokens · admin leakage · a11y/mobile) + test guard (the smoke amendment is real and non-vacuous; byte-verbatim lines md5-checked vs HEAD); fix blockers and re-run affected suites
- [x] T022 Final full gate from `academy-dashboard-discovery/app/`: `npm run build` && `npm test` && `npm run test:smoke` && `npm run test:a11y` && `node tests/screenshots/capture.cjs` all green; re-confirm 63 files + 49/63 + 0-line frozen diffs; mark all tasks complete in this file; produce the numbered final report; **NO commit, NO push, NO manual hook trigger**

---

## Dependencies & execution order

```text
T000 (done) → T001 → {T002, T003, T004} [P]
            → {T005, T006, T007, T008, T009, T010} [P] (all require T002–T004; independent files)
            → T011 → T012 → T013 (the registration cluster — strictly sequential)
            → T014 (MVP) → {T015, T016} → {T017, T018} → {T019, T020} [P] → T021 → T022
```

**Story order**: US1/US2 (P1 pages) land first among the six by convention, but all six page tasks are file-independent [P] after Phase 2. US7 (nav flip) MUST come after ALL six pages exist (zero dead-link windows — the links go live only when every target builds). US9's smoke gate (T014) is the MVP line. US8 rides the standard a11y/capture pass.

**Parallel examples**: T002+T003+T004 together · T005–T010 as a batch after the checkpoint · T019+T020 while T021's reviewers run.

**MVP scope**: T001–T014 (six pages + real nav + the smoke gate green). T015–T022 = audits, visual acceptance, docs, reviews, final gate.

**Format validation**: all 23 tasks use `- [ ] TNNN [P?] [USn?] description + explicit file path(s)`; setup/foundational/polish tasks carry no story label; story-phase tasks carry US1–US9.
