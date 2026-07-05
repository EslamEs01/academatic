# Tasks: Family / Guardian Internal Pages (Spec 020)

**Input**: Design documents from `academy-dashboard-discovery/specs/020-family-guardian-internal-pages/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D20) · data-model.md · contracts/ (17) · quickstart.md · visual-grounding.md (**27/27 family frames**) — plus Specs 016–019 law.
**Tests**: ONE sanctioned smoke amendment (the smoke-rescope contract) in T014 — the FAMILY_INTERNAL branch + the family-home re-scope (bodyAnchors 5→12) + the family-child re-scope (nav-only; body asserts BYTE-KEPT) + ceiling [500,2200], reviewed as ONE diff. **BYTE-VERBATIM forever: the payHit block · the ORIGINAL zero-pay regex lines (family home + family-child) · the ENTIRE student branch · the teacher branch · the hub branch · ALL admin asserts.**
**App root**: `academy-dashboard-discovery/app/`. **Hard rules on every task**: THE ZERO-PAY HARD LINE on every family surface (billing copy pre-checked against the exact payFigure regex — D13; the fixture invoice shape has NO amount field) · teacher pay-free EXTENDED-set comment discipline (the G8a lesson) · zero deletion/rewording of retained 014/018 fixtures/keys · `portal-shell.js`/`portal-page.js`(extend-only)/`enhance.js`/`nav.config.js`/`package.json`/`family-child.js`(stop-condition)/all student/teacher/admin modules FROZEN · `build-html.mjs` = EXACTLY 7 imports + 7 entries (purely additive; the 019 activeId pass-through is live) · student (7 impl) and teacher (1+6) registries byte-untouched · every page ≤2 screens (ceiling-guarded).

## Phase 0: Visual grounding gate (precondition — COMPLETE)

- [x] T000 Visual grounding gate: the 9-area evidence table exists in `specs/020-family-guardian-internal-pages/visual-grounding.md` — **done 2026-07-04 at specify time at 100%: all 27/27 family-role frames personally viewed (16 opened for this spec incl. every interaction shot), combined inventories greped, 5 legacy gaps recorded with nearest-evidence resolutions; re-verified at plan time (research D1). Implementation MUST NOT start before this gate is complete.**

---

## Phase 1: Setup (baseline gate)

- [x] T001 Baseline gate from `academy-dashboard-discovery/app/`: `npm run build` deterministic vs HEAD `8d3d561` (63 files, 0 diffs) + `npm test` green (76→62 smoke loads baseline + axe 0/0); capture the family-child `#page-body` extraction hash BASELINE (both languages — the D12 preservation proof input); stub the "Spec 020" section in `screenshots/REVIEW.md` (baseline record + the height-table skeleton + the zero-pay-proof placeholder)

---

## Phase 2: Foundational (fixtures · locales — blocks all pages)

- [x] T002 [P] Add the additive `FAMILY_PAGES` group to `src/js/fixtures/portal.js` per data-model §4: `quota {totalH:40, takenH:12, remainH:28}` · `children` (5 rows: childId + subscriptionKey + nextOrNoteKey, resolving existing canon) · `billing.invoices` (3 authored rows: serialKey/monthKey/dueKey/courseId/statusTone — **the shape has NO amount field**) · `requests.items` (4 type cards re-referencing the RETAINED `prt.fam.req.*`) · `materials` (FAMILY_PREVIEW.materials re-referenced + 2 NEW items for st12/st13) · `profile` (3 pref chips + the gates trio photoUpload/profileSave/passwordChange); **ROLE_NAV untouched in this task; zero retained-slice edits**; all data consistent with fam1 + st1/st6/st11/st12/st13 + the CHILD_PROFILE panels
- [x] T003 [P] Add the additive locale keys to `src/locales/ar.prt.js` + `en.prt.js` per data-model §5: `prt.title.fam{Children,Schedule,Progress,Billing,Requests,Materials,Profile}` · `prt.fam.pg.{kids,sched,prog,bill,req,mat,prof}.*` (headers/hints/sections/gate lines/chip labels/empties) · `data.prtFamPg*` authored strings — AR-first, key-mirrored; retained `prt.fam.*` keys REUSED verbatim, never reworded; **every billing-adjacent string grep-checked against the exact payFigure regex BEFORE proceeding** (D13: hours only, serial/month/due/course/status labels, zero pay-verbs/currency/amount tokens)

**Checkpoint**: fixtures/keys ready — the seven pages can be written in any order.

---

## Phase 3: User Story 1 — Children at a glance (Priority: P1)

**Independent Test**: `family-children(.en).html` renders 5 rich child cards (real roster) each with its `family-child(.en).html#child=stX` link; body anchors === 5; labeled chips; active nav = children.

- [x] T004 [P] [US1] Create `src/js/pages/family-children.js` per the children contract: `pageHead` → summary band (children count + quota-context line) → FIVE child cards (avatar/name/level · course/group/teacher via students.js+SUBJ maps · `familyStatusChip` + subscription label · authored `.pt-bar` + attendance hint · kidHint/next line · the REAL drill-down link) → truthful empty pattern → note; imports from `components/portal-page.js`; zero forms

---

## Phase 4: User Story 2 — The family week, child-tagged (Priority: P1)

**Independent Test**: `family-schedule(.en).html` renders the child-tagged today band (s2→st1 · s3→st11 · s5→st6) + next card + day-grouped week w/ child tags + rest-day empties + ONE live gate; body anchors 0; zero tables.

- [x] T005 [P] [US2] Create `src/js/pages/family-schedule.js` per the schedule contract: `pageHead` → today band (SESSIONS_FULL family-proxy rows w/ visible child names via FAMILY_PREVIEW.todayChildren + the emphasized next card) → SCHEDULE_WEEK day-grouped agenda w/ child `.pt-tag`s → truthful `.pt-empty` rest days → the live/join backendRequired `gateNote` → note

---

## Phase 5: User Story 3 — Per-child progress (Priority: P1)

**Independent Test**: `family-progress(.en).html` renders the family summary trio + 5 per-child bar cards each linking `#child=stX` (body anchors === 5) + the re-homed teacher notes; zero charts/rank.

- [x] T006 [P] [US3] Create `src/js/pages/family-progress.js` per the progress contract: `pageHead` → family summary band (the RETAINED FAMILY_PREVIEW.attendance trio re-rendered) → FIVE per-child cards (authored `.pt-bar` + attendance mini + kidHint signal + the REAL drill-down link) → teacher-notes band (the RETAINED teacherNotes re-homed) → note

---

## Phase 6: User Story 4 — Billing status, zero-pay safe (Priority: P1)

**Independent Test**: `family-billing(.en).html` renders quota tiles + settled chip + per-child subscription chips + amount-free invoice STATUS rows + finance gates + the admin-finance note; the verbatim payFigure regex passes on its body; zero payment controls/forms; body anchors 0.

- [x] T007 [P] [US4] Create `src/js/pages/family-billing.js` per the billing-zero-pay contract: `pageHead` → hour-quota tiles (num(40)/num(12)/num(28) + hour-unit labels) → the settled-status chip + reassurance (RETAINED billSettled/billReassure re-homed) → per-child subscription chip rows → invoice STATUS cards (serial label · month · due label · course · labeled chip via statusTone) → the billingGate `plannedCard` (re-homed) + the admin-finance `gateNote` → note; **self-check the rendered AR+EN copy against the payFigure regex before finishing the task**

---

## Phase 7: User Story 5 — Requests without fake submits (Priority: P2)

**Independent Test**: `family-requests(.en).html` renders the summary band + 4 type-grouped cards (trial/meeting/feedback/cancel) w/ status chips + per-type backendRequired gates; zero forms; body anchors 0.

- [x] T008 [P] [US5] Create `src/js/pages/family-requests.js` per the requests contract: `pageHead` → summary band (authored counts by status) → TRIAL card (the two-path tiles trialNew/trialExisting; step-2 stays gated — the recorded gap) → MEETING card (truthful meetingsEmpty + the meetingRequest `plannedCard` re-homed) → FEEDBACK card (the four fbQ lines) → CANCEL/RESCHEDULE card (the two options + cancelCaution note) → per-type backendRequired gates → note

---

## Phase 8: User Story 6 — Materials by child (Priority: P2)

**Independent Test**: `family-materials(.en).html` renders per-child groups covering all five children (≥5 items) + type chips + the download gate; NO hero; body anchors 0.

- [x] T009 [P] [US6] Create `src/js/pages/family-materials.js` per the materials contract: `pageHead` → per-CHILD groups (child-name headers; the retained st1/st11/st6 items + the NEW st12/st13 items; truthful empty where authored-thin) → material cards (type medallion + type chip + title) → the matDownload `plannedCard` (re-homed) → note

---

## Phase 9: User Story 7 — The family account (Priority: P2)

**Independent Test**: `family-profile(.en).html` renders guardian identity + account rows + children summary + 3 pref chips + EXACTLY 3 backendRequired gates; zero `<form>/<input>`; body anchors 0.

- [x] T010 [P] [US7] Create `src/js/pages/family-profile.js` per the profile contract: `pageHead` → guardian identity card (avatar/name/role chip from FAMILIES fam1) → account `.pt-prof-row`s (email/city/joined/children count — the RETAINED acct register re-homed) → children summary line (5 names, display-only) → preference rows (`FAMILY_PAGES.profile.prefs`) → the THREE gates as `plannedCard`s → note

---

## Phase 10: User Story 8 — Real navigation (Priority: P1) — the registration cluster (ONE reviewed step)

**Independent Test**: build → 77 files; every family page shows 8 nav links w/ the correct single active item ×2 instances; home quick-tiles are REAL links; family-child body byte-equal; the 59 protected files untouched.

- [x] T011 [US8] Register the pages in `academy-dashboard-discovery/app/scripts/build-html.mjs` (research D4): seven `renderFamily<X>` imports + seven PAGES entries `{ base, shell:'portal', role:'family', personaKey:'data.fam.fam1.name', activeId:'<navId>', titleKey:'prt.title.fam<X>', render }` — PURELY ADDITIVE 14 lines (no engine change); then `npm run build:html` and hash-verify ZERO drift on all 63 existing files before proceeding
- [x] T012 [US8] The flip + the honesty fix, together: (a) seven one-line `status: 'planned' → 'implemented'` edits in `ROLE_NAV.family` (`src/js/fixtures/portal.js`; order/labels/icons/pages untouched; student/teacher registries byte-untouched); (b) make `quickTiles` in `src/js/pages/family-portal.js` status-aware per D11 (the exact 019 edit: implemented → real `<a class="pt-qtile" href="family-<x>(.en).html">`); every other home band byte-equal — the five child cards UNCHANGED
- [x] T013 [US8] `npm run build` → 76 pages + index = **77 files**; verify both languages of all seven new pages render zero raw keys; measure + record the seven pages' heights @1366×768 (AR+EN) in REVIEW.md (expect each within [500, 2200]); **run the D12 preservation proof**: extract `#page-body` from built `family-child(.en).html` and hash-compare vs the T001 baseline — MUST be byte-equal (STOP and report if not)

---

## Phase 11: User Story 10 (part 1) — The ONE smoke amendment (MVP gate)

**Independent Test**: `npm run test:smoke` green on 76 loads with every new assert live and every protected assert byte-verbatim.

- [x] T014 [US10] Amend `tests/smoke/run.cjs` per the smoke-rescope contract, as ONE diff: (a) PAGES/PORTAL_PAGES +7 (76 loads); (b) the NEW FAMILY_INTERNAL branch (role=family · active ===2×self · navListAnchors===8 · plannedNavAnchors===0 · shell multiset===19 unique {family-portal + 7 internals + hub} · formControls===0 · tables===0 · ceiling [500,2200] · **the VERBATIM payFigure regex on every one of the 7 pages** · per-page pins: children bodyAnchors===5 exact set + cards≥5 · progress ===5 exact + bars≥5 · schedule ===0 · billing ===0 + plannedBackend===1 · requests ===0 + its gate counts · materials ===0 + items≥5 · profile ===0 + plannedBackend===3 + forms===0); (c) the family-HOME re-scope (bodyAnchors===12 as TWO exact subsets: the 5 child links + the 7 sibling tiles · navListAnchors 1→8 · multiset 5→19 · planned cards stay 1+1 · ceiling [900,2200] KEPT); (d) the family-child re-scope (navListAnchors 1→8 · multiset 5→19 · unique→the 9-target set · navCurrent===2×family-portal KEPT · ALL body asserts BYTE-KEPT); (e) expPlanned +7 (0/0/0/1/1/1/3, re-pinned in-diff if placement shifts); (f) the Shell-v2 `else` branch shrinks to teacher-portal only, its values byte-kept; (g) **payHit + the ORIGINAL zero-pay lines + the ENTIRE student branch + teacher/hub/admin asserts BYTE-VERBATIM** — then `npm run test:smoke` green = **MVP**

---

## Phase 12: User Story 10 (part 2) — Pay/zero-pay & identity audits

- [x] T015 [US10] Pay/zero-pay tripwires (the pay-zero-safety contract): the payFigure regex greped over all 14 new built family files → zero hits · the original home/family-child regex lines byte-checked vs HEAD · teacher EXTENDED-set greps (source incl. comments + built pair) zero · the 7 new family sources greped word-bounded (no pay/currency/amount tokens, comments included) — all from `academy-dashboard-discovery/app/`
- [x] T016 [US10] Identity & scope audit (the impact-protection contract): hash-compare all 77 built vs HEAD → **59/77 identical**, changed = EXACTLY 14 new + `family-portal(.en).html` + `family-child(.en).html`; ALL 14 student files + teacher pair + 40 admin + index + hub pair among the identical; frozen-file diffs (`portal-shell.js`/`portal-page.js`/`enhance.js`/`nav.config.js`/`package.json`/`family-child.js`/student/teacher/admin modules) === 0 lines; `build-html.mjs` diff === 14 added lines; retained-key grep (req.*/bill*/notes/materials/acct/kidHints still present AND now rendering); student/teacher registry rows byte-identical

---

## Phase 13: User Story 9 — Mobile, bilingual, themed

- [x] T017 [US9] Add the additive a11y rows to `tests/a11y/run.cjs` (seven pages AR light + AR dark + children EN) and run `npm run test:a11y` → axe critical=0 serious=0 (token-only contrast fixes if needed, recorded)
- [x] T018 [US9] Add the additive capture rows to `tests/screenshots/capture.cjs` per D19 (7 × AR desktop+mobile · billing AR dark · children EN · family home `tiles-now-links` refresh · family-child default-st1 proof · student/teacher/admin unchanged proofs), run the suite (0 console errors), then EYES-ON review every new frame (incl. billing dark + children EN + 390px) and fill the REVIEW.md Spec-020 section: per-page verdicts + heights + mobile result + the zero-pay proof line + unchanged proofs

---

## Phase 14: Polish & cross-cutting

- [x] T019 [P] Docs: update `academy-dashboard-discovery/app/README.md` (family app = 9 surfaces; the registry mechanism; the Django note: "family internal pages use the same ROLE_NAV registry and active_id; planned entries become implemented by flipping registry status and route; family-child remains a drill-down page linked from family contexts") + `CLAUDE.md` SPECKIT block (020 delivered summary; 021 teacher next)
- [x] T020 [P] Coverage annotations (research D20, append-only): the Spec-020 delivery annotation in `specs/016-.../legacy-to-new-coverage-matrix.md` (§8 F-rows → delivered/gated w/ guardian-surface citations) + the re-homed notes on the Spec-018 displacement rows (children→children · today→schedule · signals/notes/history→progress · subs/billing→billing · requests-hub→requests · materials→materials · account→profile)
- [x] T021 Adversarial reviews on the full diff: clean-code guard (scope/isolation · zero-pay wording · family-child untouched · long-page regression · duplicated logic vs portal-page.js · dead links · fake gates · raw keys · admin/student/teacher leakage · a11y/mobile) + test guard (the smoke amendment real and non-vacuous; the byte-verbatim register md5-checked vs HEAD incl. the whole student branch); fix blockers and re-run affected suites
- [x] T022 Final full gate from `academy-dashboard-discovery/app/`: `npm run build` && `npm test` && `npm run test:smoke` && `npm run test:a11y` && `node tests/screenshots/capture.cjs` all green; re-confirm 77 files + 59/77 + 0-line frozen diffs + the family-child extraction hash; mark all tasks complete in this file; produce the numbered final report; **NO commit, NO push, NO manual hook trigger**

---

## Dependencies & execution order

```text
T000 (done) → T001 → {T002, T003} [P]
            → {T004, T005, T006, T007, T008, T009, T010} [P] (require T002–T003; independent files)
            → T011 → T012 → T013 (the registration cluster — strictly sequential; T013 carries the STOP-condition)
            → T014 (MVP) → {T015, T016} → {T017, T018} → {T019, T020} [P] → T021 → T022
```

**Story order**: US1–US4 (P1 pages) conventionally first among the seven, but all seven page tasks are file-independent [P] after Phase 2. US8 (the flip) MUST come after ALL seven pages exist — zero dead-link windows. US10's smoke gate (T014) is the MVP line. US9 rides the a11y/capture pass.

**Parallel examples**: T002+T003 together · T004–T010 as a batch after the checkpoint · T019+T020 while T021's reviewers run.

**MVP scope**: T001–T014 (seven pages + real nav + preserved drill-down + the smoke gate green). T015–T022 = audits, visual acceptance, docs, reviews, final gate.

**Format validation**: all 23 tasks use `- [ ] TNNN [P?] [USn?] description + explicit file path(s)`; setup/foundational/polish tasks carry no story label; story-phase tasks carry US1–US10.
