# Tasks: Family / Guardian Dashboard (Spec 014)

**Input**: Design documents from `academy-dashboard-discovery/specs/014-family-guardian-dashboard/`
**Prerequisites**: plan.md · spec.md · research.md (D1–D14) · data-model.md · contracts/ (16) · quickstart.md
**Tests**: The single sanctioned smoke amendment (research D11) lands in two staged steps — T010 right after Band A and the floor-raise inside T016 — reviewed together as ONE diff at the G3 audit (the proven Spec-013 pattern). All other harness work is additive.
**App root**: `academy-dashboard-discovery/app/` (paths relative to it unless prefixed). Spec folder: `academy-dashboard-discovery/specs/014-family-guardian-dashboard/`.

**Organization**: By user story, sequenced per research D14 bands. Persona is fixed: **fam1** (guardian + st1/st6/st11/st12/st13). Almost all section tasks edit the same file (`src/js/pages/family-portal.js`) and are intentionally sequential — parallelism lives in Phase 2 and the polish docs. **The zero-pay hard line applies to every task**: no `hourRate`/`fam.plan.perHour`/currency token may ever be referenced by the family page.

## Phase 1: Setup (baseline gate)

**Purpose**: Prove the pre-change tree is green so every later diff is attributable to Spec 014.

- [x] T001 Baseline gate: from `academy-dashboard-discovery/app/` run `npm run build` + `npm test` (green: 48 loads, a11y 0/0) and re-run the Spec 008/009/010/011/012/013 guard audits (all `ok`, incl. the 012 G5 admin-identity hash-compare and the 013 student-branch asserts); confirm 49 built pages and record HEAD; stub the "Spec 014" section in `screenshots/REVIEW.md` with the baseline record

---

## Phase 2: Foundational (registers, keys, styles — blocks all stories)

- [x] T002 [P] Extend the family block of `src/js/fixtures/portal.js` per data-model §§3–14: `FAMILY_PREVIEW.todayChildren` (sessionId→studentId authored mapping) · `.attendance = {attended:12, upcoming:3, followUp:1}` (foundation literals kept) · `.signals = [{outcomeId:'out15', framingKey}, {outcomeId:'out12', framingKey}]` (REAL outcome refs) · `.teacherNotes` +1 authored note (n3) · `.history[3]` (`{outcomeId:'out1'}` + `{outcomeId:'out15'}` + 1 authored st6/khalid record) · `.materials[3]` (titleKey/childId/typeIcon) · `.requests` register (cancelResched/teacherFeedback/meetings/trial preview-card defs with availability) · per-child hint refs; re-register `PORTAL_PLANNED.family = {billingGate: backendRequired, matDownload: backendRequired, fullHistory: planned, meetingRequest: planned}`; `PORTAL_PERSONAS`/`STUDENT_PREVIEW`/student/teacher registers byte-untouched; NO money-like field anywhere; comment discipline per scope-guard
- [x] T003 [P] Add the new keys to `src/locales/ar.prt.js` + `src/locales/en.prt.js`: `prt.fam.*` (hero summary/reassurance/hint, children hints + the D2 `kidsHint` copy resolution, today "what to know", signals framings + reassurance line, notes day labels, history keys, subscriptions/billing status wording, the four requests-hub cards incl. the no-replacement caution + rubric question lines + meetings empty copy + trial path tiles, materials, account, closing note, the four planned mini-card t/d pairs) + `data.prtFam*` authored content strings — key-mirrored, Arabic-first, calm availability language; **shared `prt.shell/portal/role/hub`, sibling `prt.stu.*`/`prt.tch.*`, `data.prtStu*`, `data.prtNote1/2` untouched**; ZERO currency/pay vocabulary (verify diff shows only `prt.fam.*`/`data.prtFam*` changes)
- [x] T004 [P] Add the small additive `.portal-shell`-namespaced CSS bits to `src/styles/app.css`: requests-hub card grid + question-line list styling (reusing `.pt-empty`/`.pt-tag`/`.pt-stat`/`.pt-prof-row`/`.pt-note` from Spec 013 read-only) — existing selectors unmodified, ink-token discipline

**Checkpoint**: Registers/keys/styles ready — section work can begin.

---

## Phase 3: User Story 1 — Guardian instantly understands the family day (Priority: P1) 🎯 MVP

**Independent Test**: Hero greets the guardian by fixture name with family summary + reassurance + plain-text next-action hint; no date/notification count; reassuring empty-state pattern available page-wide.

- [x] T005 [US1] In `src/js/pages/family-portal.js`: upgrade the hero per FR-001 — guardian name (existing), NEW family-summary line + today reassurance + plain-text next-action hint (`prt.fam.heroSummary/heroHint`); build and verify both languages, zero raw keys, zero new anchors

---

## Phase 4: User Story 2 — All children clear, no confusion (Priority: P1)

**Independent Test**: All five fam1 children render as deepened cards (name/level/status chip/progress/per-child hint) with NO switcher control; st13's trial chip gentle.

- [x] T006 [US2] In `src/js/pages/family-portal.js`: deepen the children overview per the children contract — five cards with `familyStatusChip`, progress bar + localized percent, and the authored per-child hint line; ensure the section contains ZERO interactive controls; the updated `kidsHint` copy renders (D2 resolution)

---

## Phase 5: User Story 3 — Today's sessions across children (Priority: P1)

**Independent Test**: Each today card names its child (via `FAMILY_PREVIEW.todayChildren`), shows time/course/teacher + labeled status chip; no join/cancel control.

- [x] T007 [US3] In `src/js/pages/family-portal.js`: upgrade the today band per FR-003 — child association on every session card + status chips + the "what to know" hint; no action affordances

---

## Phase 6: User Story 4 — Attendance, progress, teacher notes — calm (Priority: P1)

**Independent Test**: The signals band shows the authored trio + TWO real needs-attention cards (out15 st11 absence chip · out12 st13 cancelled/trial chip) + the reassurance line; notes section shows 3 child-associated notes.

- [x] T008 [US4] In `src/js/pages/family-portal.js`: build the signals band per research D9 — the trio tiles (gentle labels, `num()` digits) + the two REAL outcome cards resolved from `SESSION_OUTCOMES` (`OUTCOME_BY_ID` import; real `outcomeChip`, gentle framing keys) + the reassurance close; calm styling, no red walls
- [x] T009 [US4] Deepen the teacher-notes section to 3 child-associated notes (existing n1/n2 + new n3), summary/homework shape, display-only; build and verify both languages

---

## Phase 7: Smoke reconciliation step 1 (research D11) [US10]

**Independent Test**: `npm run test:smoke` green on all 48 loads; `git diff tests/smoke/run.cjs` confined to the family expectations.

- [x] T010 [US10] Amend `tests/smoke/run.cjs` **family expectations ONLY**: planned count family **3 → 4** with chip-tone semantics (`.pt-planned .chip.tone-amber === 2` + `.tone-neutral === 2` — holds already since T002 re-registered the ids; the old planned row renders all four until Bands B/C place them) · five-children assert (kids section renders the 5 fixture names/cards) · **zero-pay regex** on the family body (`/ريال|ر\.س|\bSAR\b|\bUSD\b|[$€£]|pay now|ادفع|سداد/i` === 0 hits, both langs) · `bodyAnchors === 0` · `.pt-section` floor ≥ 6 NOW (raised to ≥ 10 in T016) · extend the 390px scrollWidth probe to `family-portal` · zero `<form>/<input>/<select>/<textarea>` on the family page; **student branch, admin-scoped, teacher, and hub assertions byte-verbatim**; run smoke green (**MVP checkpoint** = T001–T010; T010 + T016's floor-raise = the ONE sanctioned amendment, reviewed as a single diff at T019)

---

## Phase 8: User Story 5 — Billing & subscriptions without fake payment (Priority: P1)

**Independent Test**: Subscriptions = 5 per-child plan-label rows + status chips, zero amounts; billing = one settled-status card + the backendRequired gate; zero-pay grep clean.

- [x] T011 [US5] In `src/js/pages/family-portal.js`: add the plans & subscriptions section per the billing contract §1 — per-child rows (name + `data.fam.fam1.plan` label + `familyStatusChip`); NO amount, NO renewal control, NO `plan.perHour`/`hourRate` reference
- [x] T012 [US5] Add the billing-status section per contract §2 — ONE calm settled-status card (authored chip + reassurance line) + the `billingGate` `.pt-planned` backendRequired mini-card («الفواتير والدفع»); build and run the zero-pay grep on both built files (0 hits)

---

## Phase 9: User Story 6 — Requests honest: cancel / feedback / meetings / trial (Priority: P2)

**Independent Test**: The hub renders exactly 4 preview cards with inline availability chips and ZERO form controls; the no-replacement caution and the meetings `.pt-empty` render truthfully.

- [x] T013 [US6] In `src/js/pages/family-portal.js`: build the requests & communication hub per the requests contract — cancel/reschedule card (two option lines + the calm no-replacement caution `pt-note` + inline backendRequired chip) · feedback-about-teacher card (display-only question lines, no rating visual, inline backendRequired chip) · meetings card (the truthful `.pt-empty` «لا توجد لقاءات مجدولة» + the `meetingRequest` planned affordance) · request-trial card (new-vs-existing child tiles + inline backendRequired chip); NO `<form>`/`<input>`/radio/submit anywhere

---

## Phase 10: User Story 7 — History and materials (Priority: P2)

**Independent Test**: History = 3 child-first records (real out1 attended + real out15 absent-with-support-feedback + authored st6) with summary/homework lines + outcome chips + the fullHistory planned card; materials = 3 display-only cards + the matDownload gate.

- [x] T014 [US7] In `src/js/pages/family-portal.js`: add the recent-sessions section per the history contract — resolve `FAMILY_PREVIEW.history` outcome refs against `SESSION_OUTCOMES` (child-first titles, real `outcomeChip`s, `data.att.fb.good`/`data.att.fb.support` feedback texts) + the authored record + the `fullHistory` planned mini-card
- [x] T015 [US7] Add the family-materials section — 3 child-associated display-only cards (type icons) + the `matDownload` backendRequired mini-card; remove the old Spec-012 planned-row section once all four mini-cards live in their owning sections; build and verify plannedCount = 4 with correct placement

---

## Phase 11: Composition completion (cross-cutting — finishes the 12-section contract)

- [x] T016 Add the account slice (guardian name/email/city/joined/children-count rows from the family fixture + backendRequired editing note) and the closing honest note (delivered-state + Spec-016 pointer) to `src/js/pages/family-portal.js`; full build; raise the T010 floors in `tests/smoke/run.cjs` to final (`.pt-section` ≥ 10, `.pt-empty` ≥ 1) and run smoke green — the composition contract's 12/12 now holds

---

## Phase 12: User Story 8 — Beautiful on mobile (Priority: P1)

- [x] T017 [US8] Mobile audit at 390px: five child cards + hub cards stack cleanly, long Arabic names wrap (`min-width:0`), zero horizontal overflow (probe green); fix any overflow in `src/js/pages/family-portal.js` / `src/styles/app.css`

---

## Phase 13: User Story 9 — Bilingual, RTL/LTR, themed, localized digits (Priority: P1)

- [x] T018 [US9] Run the full a11y matrix (`npm run test:a11y` — family AR light/dark + EN light against the deepened page) → critical=0 serious=0, fixing any contrast finding with ink-strength tokens in `src/styles/app.css`; scan both built files for raw keys and ASCII digits on AR

---

## Phase 14: User Story 10 — Admin, student, teacher, hub protected (Priority: P1)

- [x] T019 [US10] Run the scope-guard G3 audit set from `academy-dashboard-discovery/app/`: (1) change-surface = G1 paths only · (2) hash-compare all 49 built files vs HEAD — exactly `family-portal.html` + `.en.html` differ (47/49 identical) · (3) teacher pay-token grep (word-bounded EN+AR) over portal sources + built files · (4) **family zero-pay grep** over both built family files · (5) zero `href="#"` sitewide + family bodyAnchors 0 + zero form controls · (6) planned registers exact (family 4-id set; student/teacher byte-unchanged) · (7) `git diff` empty on all G2 files (`portal-shell.js`, `build-html.mjs`, `nav.config.js`, `enhance.js`, `package.json`, `student-portal.js`, `teacher-portal.js`, `portals.js`) · (8) Spec 008/009/010/011/012/013 guards re-run `ok` (single-diff review of the T010+T016 smoke amendment)

---

## Phase 15: User Story 11 — Legacy family capabilities accounted for (Priority: P1)

- [x] T020 [US11] Append **§8 Spec-014 delivery notes** to `academy-dashboard-discovery/specs/012-role-portal-foundation/legacy-role-capability-coverage.md` per the coverage contract table (all 17 F-rows dispositioned: 13 delivered-014 with preview/gated qualifications · F4 backendRequired unchanged · F14/F15/F17 excluded unchanged · real submissions → planned-016; + sign-off block); §§1–7 byte-unchanged

---

## Phase 16: User Story 12 — Screenshots prove it (Priority: P1)

- [x] T021 [US12] Extend `tests/screenshots/capture.cjs` additively with the six element-scoped family area frames (children `section:nth-of-type(2)` · today (3) · signals+notes (4)+(5) · billing+subscriptions (7)+(8) · requests hub (9) · history+materials (6)+(10) — verify indices against the final DOM before capturing) and run `npm run screenshots` → 0 console errors (the 4 experience frames + 4 unchanged proofs exist in the matrix)
- [x] T022 [US12] Visual review of all Spec-014 frames against `contracts/screenshot-acceptance.md` §2 (calm/parent-friendly/not-admin-like; honest gated affordances; NO currency figure anywhere; RTL/dark/mobile quality; unchanged proofs); record the verdict table + failure-condition sweep + issues-found-and-fixed list in `screenshots/REVIEW.md`; fix-and-recapture anything failing

---

## Phase 17: Polish — docs, final gate

- [x] T023 [P] Docs: add the one-line Spec-014 Django note to `README.md` if wording needs it; refresh `CLAUDE.md` if any planned detail shifted during implementation; finalize the REVIEW.md Spec-014 section
- [x] T024 Final gate from `academy-dashboard-discovery/app/`: `npm run build` + `npm test` green (48 loads, amended family asserts, a11y 0/0) + re-run the FULL G3 audit set (T019) + `git status` shows only the G1 surface; mark this tasks.md checklist accurately

---

## Dependencies & execution order

- **T001 → T002/T003/T004 [P] → T005…T009 (sequential — same page module) → T010 (MVP checkpoint) → T011…T015 (sequential) → T016 (floor raise) → T017/T018 → T019 → T020 → T021/T022 → T023 → T024.**
- Story completion order: US1 → US2 → US3 → US4 → (smoke US10 step 1) → US5 → US6 → US7 → US8 → US9 → US10 → US11 → US12. All stories on the D14 band sequence; no story depends on a later one.
- Parallel opportunities: T002+T003+T004 (three files); T020 can run parallel with T021 (different files) if desired. Section tasks are deliberately serial — one file, one coherent calm composition.

## Implementation strategy

**MVP = T001–T010** (Band A: hero + five-children overview + child-associated today band + the real-outcome signals band, with the family smoke branch re-scoped and green) — independently demoable: the guardian's top three questions answered with fixture truth. Then Band B (T011–T012, T014), Band C (T013, T015, T016), then the verification ladder (mobile → a11y → protection → coverage → screenshots) and the polish gate. Any blocking finding routes back to the owning section task — never to a scope expansion; the zero-pay line is checked at every build touchpoint (T010 regex, T012 grep, T019 audit #4, T022 visual).
