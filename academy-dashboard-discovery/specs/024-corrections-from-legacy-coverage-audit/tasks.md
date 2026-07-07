# Tasks: Corrections From Legacy Coverage Audit (Spec 024)

**Input**: Design documents from `academy-dashboard-discovery/specs/024-corrections-from-legacy-coverage-audit/`
**Prerequisites**: plan.md, spec.md, research.md (D1–D22), data-model.md, quickstart.md, contracts/ (16), correction-scope.md, evidence-review.md
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Spec 023 + 024 uncommitted working-tree baseline; **77 public HTML**.

**Nature**: correction/alignment spec — NO new pages, NO backend, NO fake behavior. Public HTML count MUST stay 77.

**Execution status (2026-07-07)**: IMPLEMENTED. B-01…B-11 complete; B-11 pinned-body rows D-04/D-05/D-09 deferred (recorded reason). Chosen options landed exactly (B-03 Option A honest role-shell bell reusing `data-action="notifications"`, no new hook, hub excluded; B-05 Option A one planned `library` item, nav 7→8; B-06 explicit exclusion record, no nav item). Results in `correction-status.md`. 77 HTML held; all 5 forbidden files at 0 diff; smoke green; no commit.

## Format: `- [ ] T### [P?] [US?] Description with exact file + verification`

- **[P]** = parallelizable (different files, no dependency on an incomplete task).
- **[US?]** = the spec user story served (US1 child-view wording · US2 owner/gate before building · US3 teacher internals honest · US4 provenance · US5 no-deletion + density). Setup/audit/polish tasks carry no story label.
- Chosen options (from plan/research): **B-03 Option A** (honest role-shell notifications gate reusing `data-action="notifications"`, no new hook), **B-05 Option A** (one planned teacher `library` nav item), **B-06** explicit teacher-side exclusion record (no nav item), **B-11** CSS-only (pinned-body rows deferred unless a hash supersession is declared).

---

## Phase 0 — Evidence / preflight gate

- [ ] T001 Re-read the evidence set (`specs/024-…/evidence-review.md`, `correction-scope.md`, `research.md`, all 16 `contracts/*`) and `specs/023-…/{correction-backlog-for-024,role-model-consistency-audit,design-quality-register}.md`; confirm the 11 evidence-gate facts hold (per `contracts/evidence-gate-contract.md`). Verification: a short note in `specs/024-…/tasks.md` execution log or the PR description listing each B-item → its cited file:line.
- [ ] T002 Confirm working tree + guards: `git branch --show-current` == `feature/012-role-portal-foundation`; `find academy-dashboard-discovery/app/public -maxdepth 1 -name "*.html" | wc -l` == 77; `cat .specify/feature.json` → 024. Verification: all three match.
- [ ] T003 Confirm scope-guard boundary loaded (`contracts/scope-guard.md`): the forbidden-file list (`build-html.mjs`, `package.json`, `topbar.js`, `enhance.js` unless hard blocker, `nav.config.js` unless proven doc-note, admin/internal page source) is understood before any edit. Verification: no forbidden file appears in any later task's file path.

## Phase 1 — Baseline & proof captures (foundational)

- [ ] T004 Capture the pre-fix baseline greps: `grep -c "لوحة الطالب" academy-dashboard-discovery/app/src/locales/ar.prt.js` (student note present), `grep -c "لوحة العائلة" …/ar.prt.js` (family, record N), `grep -c "لوحة المعلم" …/ar.prt.js` (teacher, record N). Verification: baseline numbers recorded for the unchanged-proof audits (T041/T042).
- [ ] T005 Record the current teacher pay-free baseline: run the three-layer scan (`contracts/pay-zero-safety-contract.md`) over `app/public/teacher-portal.html`(+`.en`), `app/src/js/pages/teacher-portal.js`, teacher locale keys → expect 0 hits. Verification: 0-hit baseline recorded.
- [ ] T006 Record the current smoke baseline: `cd academy-dashboard-discovery/app && npm test` green at HEAD (load count, payHit, famPay, anchors, `plannedNavAnchors===0`, role-model pins). Verification: green baseline captured (so any later red is attributable to a 024 change).

## Phase 2 — B-01 child-view wording correction (US1, P1 — the only visible page-content change)

- [ ] T007 [US1] Capture the forbidden-wording evidence: `grep -RIn "لوحة الطالب" academy-dashboard-discovery/app/public/student-*.html` (expect 6 ar pages) + `grep -RIn "student dashboard" …/student-*.en.html`. Verification: the 6-of-7 set matches `evidence-review.md` (student-schedule absent).
- [ ] T008 [US1] Edit ONLY the student child-view note in `academy-dashboard-discovery/app/src/locales/ar.prt.js:297-298`: `noteT` → «عرض الابن — النسخة الأولى»; `noteD` → guardian-addressed child-view wording (e.g. «هذه معاينة لوحة الابن ضمن حساب العائلة؛ الجلسات المباشرة وتعديل الحساب تتطلبان الخادم؛ الرسائل والإشعارات لاحقًا.»). Do NOT touch `:387-388` (family) or `:446-447` (teacher). Verification: diff shows only lines 297-298 changed in the student block; per `contracts/b01-child-view-wording-contract.md`.
- [ ] T009 [US1] Edit the EN twin `academy-dashboard-discovery/app/src/locales/en.prt.js:294`: `noteT` → "Child view — part of the family account"; `noteD` → guardian-addressed. Verification: ar/en mirrored; family/teacher EN notes unchanged.
- [ ] T010 [US1] Rebake: `cd academy-dashboard-discovery/app && npm run build`. Verification: `public/student-{portal,homework,history,profile,progress,materials}.html`(+`.en`) + `public/assets/locales/*` regenerated; `find public -maxdepth 1 -name "*.html" | wc -l` == 77.
- [ ] T011 [US1] Declare the Spec 022 extraction-hash supersession: append-only note to `academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/contracts/student-preservation-contract.md` (or a sibling) stating the 5 affected internals' documented `#page-body` hashes (10 of 12; student-schedule's 2 unchanged) are intentionally superseded by B-01. Verification: the note exists and names the exact pages.
- [ ] T012 [US1] Add the optional one-line smoke role-model guard in `academy-dashboard-discovery/app/tests/smoke/run.cjs`: assert child-view `#page-body` bodyText does NOT match `/لوحة الطالب|بوابة الطالب|student dashboard/i` (additive, inside the existing role-model pin block; per `contracts/smoke-rescope-contract.md`). Verification: assertion present; `payHit`/`famPay`/admin asserts byte-verbatim.
- [ ] T013 [US1] Acceptance greps: `grep -RIl "لوحة الطالب" academy-dashboard-discovery/app/public/student-*.html` == 0; `grep -RIl "بوابة الطالب" …/student-*.html` == 0; `grep -RIl "student dashboard" …/student-*.en.html` == 0. Verification: all zero; new note reads child-view/family-owned wording.

## Phase 3 — Documentation corrections (B-02, B-04, B-06, B-07, B-08, B-09)

- [ ] T014 [P] [US2] B-02 Locations owner record: append-only note to `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/coverage-matrix.md` (Locations row) + `missing-capabilities-register.md` (M-04 status → "owner 031, recorded in 024"): owner = **Spec 031** (settings/general display slice); no page, no nav item. Verification: owner written; no `nav.config.js` change; per `contracts/b02-locations-owner-contract.md`.
- [ ] T015 [P] [US2] B-04 live-room future-backend record: append-only note to `academy-dashboard-discovery/specs/023-…/coverage-matrix.md` (teacher `session-class-room` row: `unclear-needs-review` → `intentionally-excluded / future-backend`) + `missing-capabilities-register.md` (M-05 status). Verification: matrix row no longer `unclear-needs-review`; no app change; per `contracts/b04-live-room-future-backend-contract.md`.
- [ ] T016 [P] [US3] B-06 teacher chat exclusion record: append-only note to `academy-dashboard-discovery/specs/023-…/missing-capabilities-register.md` (M-02 status) + `specs/024-…/correction-scope.md`: teacher chat = backendRequired/future, NO 024 nav item, owner decision to Spec 025, admin preview stays 026, send-form UNCONFIRMED. Verification: record present; no nav item added; per `contracts/b06-chat-ownership-contract.md`.
- [ ] T017 [US3] B-07 pay-free exemption record: append-only exemption to `academy-dashboard-discovery/specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/contracts/teacher-pay-free-global-contract.md` (cross-ref `specs/022-…/contracts/teacher-pay-free-contract.md`): `teacher-performance.html` = pre-existing Spec 007 ADMIN board, body pay-free + smoke-asserted (`run.cjs:548-561`), الرواتب tokens are admin-shell nav chrome; grandfathered pending the 025 repoint. Verification: exemption cites Spec 007; the `payHit` grep is NOT weakened; per `contracts/b07-pay-free-exemption-contract.md`.
- [ ] T018 [US3] B-07 record the Spec 025 repoint task: note in `specs/023-…/correction-backlog-for-024.md` status + `specs/024-…/correction-scope.md` that Spec 025 repoints `teacher-portal.html:378` → the real `teacher-reports` internal and demotes the admin-board link to admin-only. Verification: 025 task recorded; no 024 anchor change.
- [ ] T019 [P] [US4] B-08 exclusion provenance: append "recorded in 024" status to `academy-dashboard-discovery/specs/023-…/missing-capabilities-register.md` for M-10…M-16 (teacher pay surfaces, family Amount, chart/score engines, fake-action engines, finance/payroll boundary, notifications/shortcuts, admin payroll figures) — each with its governing law. Verification: each exclusion carries a law citation; per `contracts/b08-b09-provenance-boundary-contract.md`.
- [ ] T020 [P] [US4] B-09 finance-boundary sentence: add the boundary line to `academy-dashboard-discovery/app/README.md` and the CLAUDE.md hard-constraints area: "authored admin invoice-amount literals are Spec-009-sanctioned (zero aggregate/math, admin-only); salary/payroll/compensation/payout figures are NEVER allowed anywhere; family/teacher stay figure-free." Verification: sentence present in both; `finance.html` invoice literals unchanged.

## Phase 4 — B-03 role-portal notifications honest gate (US2, P1)

- [ ] T021 [US2] Confirm the reuse path: verify `app/src/js/enhance.js` serves `data-action="notifications"` via `notificationsMenu()` (Soon-badged, `aria-disabled`, `data-disabled-reason`) and that role-portal pages load `enhance.js`. Verification: the handler + `topbar.notif*` keys exist; if the role topbar cannot reach the popover without an `enhance.js` edit, STOP and switch to fallback A2 (inline `pt-guide` gate) or Option B (record only) per `contracts/b03-notifications-gate-contract.md`.
- [ ] T022 [US2] Add the notifications gate to `academy-dashboard-discovery/app/src/js/components/portal-shell.js` topbar: a `data-action="notifications"` bell `icon-btn` beside the existing theme/lang buttons (reuse the EXISTING attribute + existing `topbar.notifications` label). No new hook, no new storage key, no fake count/read state. Verification: diff shows only an additive markup block in the topbar; no `enhance.js`/`topbar.js` edit.
- [ ] T023 [US2] Rebake + verify honesty: `npm run build`; the role-portal topbar renders the bell → the existing Soon-badged, `aria-disabled` popover; zero numeric badge/count in built HTML. Verification: `grep` finds no fake count near the role bell; admin `notificationsMenu()` byte-unchanged; 77 HTML held.
- [ ] T024 [US2] Smoke/a11y coverage for the gate: extend `app/tests/a11y/run.cjs` to assert the role-topbar notifications control is `aria-disabled="true"` + labeled + keyboard-focusable-non-activating; confirm `app/tests/smoke/run.cjs` shell-anchor multiset still holds (the control is a non-anchor, so `plannedNavAnchors` unaffected). Verification: a11y critical/serious == 0; smoke green.

## Phase 5 — B-05 teacher library planned nav item (US3, P2)

- [ ] T025 [US3] Add one planned `library` item to `ROLE_NAV.teacher` in `academy-dashboard-discovery/app/src/js/fixtures/portal.js` (after line ~166): `{ id: 'library', labelKey: 'prt.nav.tch.library', icon: 'book', page: 'teacher-library', status: 'planned' }`. Verification: exactly one item added; owner Spec 025; per `contracts/b05-teacher-library-gate-contract.md`.
- [ ] T026 [US3] Add mirrored `prt.nav.tch.library` labels in `academy-dashboard-discovery/app/src/locales/ar.prt.js` and `en.prt.js` (e.g. ar «مكتبتي», en "Library"). Verification: ar/en mirrored; no raw key; pay-free.
- [ ] T027 [US3] Rebake + verify the gate is a non-anchor: `npm run build`; the teacher nav renders `library` as an `is-planned` «قريبًا» button (no `href` to a non-existent page). Verification: `plannedNavAnchors===0` holds; teacher planned nav count now 7.
- [ ] T028 [US3] Re-pin smoke: in `academy-dashboard-discovery/app/tests/smoke/run.cjs` bump the `ROLE_NAV.teacher` planned-count expectation 6 → 7 (declared reason: B-05 library gate); keep `plannedNavAnchors===0`. Verification: smoke green; the amendment is the only teacher-nav change; per `contracts/smoke-rescope-contract.md`.

## Phase 6 — B-10 rail moved-vs-deleted verification (US5, P2)

- [ ] T029 [US5] Compare rails: open `app/screenshots/before-022/teacher-portal__ar__light__desktop.png` vs `app/screenshots/teacher-portal__ar__light__desktop.png`; read `specs/022-…/contracts/{teacher-living-home-contract.md, impact-protection-contract.md, smoke-rescope-contract.md, visual-regression-screenshot-contract.md}`. Verification: a written determination — the pre-022 prep-hint/count content was MOVED (reachable via flowStrip/counters/quick-links) or DELETED.
- [ ] T030 [US5] Record the determination in `specs/024-…/correction-scope.md` (B-10) + append-only note to `specs/023-…/extra-or-drift-register.md` (X-49 status). If MOVED: close the row, no restore. If DELETED: create a restore subtask feeding B-11 (real rail content, never a fake control). Verification: determination recorded; no other prior entry point silently dropped.
- [ ] T031 [P] [US5] Record the B-17 protection: family-children's missing fold-point link is INTENTIONAL (per-child child-view links rejected as dishonest — preview persona st1); note in `specs/023-…/extra-or-drift-register.md` (X-48) + `specs/024-…/correction-scope.md`. Verification: recorded do-not-fix; `family-children.html` body anchors stay 5 (no student-portal link added).

## Phase 7 — B-11 visual-density CSS pass (US5, P2 — CSS-only living layer)

- [ ] T032 [US5] D-01 rails: add a second content column / width cap to `.pt-rail .pt-stop` cards in `academy-dashboard-discovery/app/src/styles/app.css` living layer (prep-hint / child avatar+name / capacity note), pure CSS. If T030 found DELETED content, restore the copy here (real, not fake). Verification: rails read fuller; no new hook; per `contracts/b11-visual-density-contract.md`.
- [ ] T033 [P] [US5] D-06 dark hero: add role-tinted dark-gradient tokens for `.pt-idhero` in the additive living CSS layer (family + child-view heroes regain role color in dark). Verification: dark-mode hero shows role tint; reduced-motion honored.
- [ ] T034 [P] [US5] D-07 schedule hierarchy: balance the family-schedule day-row width/«التالي» placement via `app.css` living layer. Verification: symmetric day rows; no markup change.
- [ ] T035 [P] [US5] D-08 hub 2-up row: make the hub primary row a centered/spanning 2-up (fill the empty third slot after student demotion) via `app.css`. Verification: no empty grid slot; admin + demoted-preview rows unchanged.
- [ ] T036 [P] [US5] D-10/D-11/D-12 delight: small pure-CSS + status-only copy touches — family-requests compact counters, family-internal «جميع الفواتير مسوّاة» celebration (figure-free), teacher all-clear strip warmth. Copy in `ar.prt.js`/`en.prt.js` (mirrored, pay-free, status-only). Verification: no pay/payment token; motion inside the one reduced-motion block.
- [ ] T037 [P] [US5] D-13 mobile topbar: fix the teacher/student mobile-390 topbar brand wrap via `app.css` living layer. Verification: no wrap/overflow at 390px.
- [ ] T038 [US5] Pinned-body rows D-04/D-05/D-09: attempt purely in the living CSS layer. If any needs `#page-body` markup, either (a) declare a hash supersession + smoke re-pin (per `contracts/smoke-rescope-contract.md`) and implement, or (b) DEFER that row with a recorded reason. Verification: each of D-04/D-05/D-09 is either done-with-supersession or deferred-with-reason — never a silent body change.
- [ ] T039 [US5] Rebake: `npm run build`. Verification: 77 HTML; changed structural probes (if any) re-pinned in smoke with a stated reason.

## Phase 8 — Smoke / a11y / screenshot / docs

- [ ] T040 Run the suites: `cd academy-dashboard-discovery/app && npm run build && npm test && npm run test:a11y && node tests/screenshots/capture.cjs`. Verification: build green; smoke green; a11y critical==0 serious==0; screenshots captured.
- [ ] T041 [P] Capture the required screenshots + update `academy-dashboard-discovery/app/screenshots/REVIEW.md`: child-view note (B-01), family note + teacher note (unchanged proof), role-portal topbar (B-03 gate), teacher home (B-05 library item), hub/family/teacher/student after density, dark hero (if D-06), mobile-390. Verification: all present in `REVIEW.md`.
- [ ] T042 [P] Update `CLAUDE.md` correction-status pointer (append-only) noting Spec 024 implemented B-01…B-11 with results; keep the narrative. Verification: pointer updated; unrelated CLAUDE content unchanged.

## Phase 9 — Pay / zero-pay / role-model audits

- [ ] T043 Teacher pay-free three-layer audit (`contracts/pay-zero-safety-contract.md`): source grep (incl. comments) + built grep + smoke `payHit` over `teacher-portal`(+`.en`), `teacher-portal.js`, teacher locale keys, and the new B-05 library copy → 0 hits. Verification: all three layers green; `payHit` byte-verbatim.
- [ ] T044 [P] Family zero-pay audit: `famPay`/`payFigure` regex over all 18 family bodies → green; family-billing stays status-first; any B-11 family delight copy is figure-free. Verification: green.
- [ ] T045 [P] Role-model audit (`contracts/impact-protection-contract.md`): hub 2 role cards + admin + demoted preview; `childViewLinks===1`; family-child `bodyAnchors===6`; `ROLE_NAV.student` 7 items unchanged; `hub.student` key retained; family/teacher notes byte-unchanged vs T004 baseline; zero «بوابة الطالب» in built HTML. Verification: all pins green; student demoted-not-deleted.
- [ ] T046 [P] Guard audits: `find public -maxdepth 1 -name "*.html" | wc -l` == 77; `grep -RIl 'href="#"' public/*.html` == 0; no dead links (smoke); no new `data-*` hook name; no new storage key; no raw locale key. Verification: all pass.

## Phase 10 — Clean-code / test-guard reviews

- [ ] T047 Clean-code review of the diff: locale edits mirrored ar/en, CSS additive-only in the living layer, `portal-shell.js` change is a single additive markup block, no dead code, no commented-out cruft, comment density matches surrounding code. Verification: reviewer notes recorded; no forbidden-token disclaimer near score/rank/chart/finance introduced.
- [ ] T048 Test-guard review: every smoke amendment is additive + declared (B-01 guard, B-05 6→7, any B-11 re-pin); `payHit`/`famPay`/admin asserts byte-verbatim; no assertion loosened. Verification: `git diff academy-dashboard-discovery/app/tests/smoke/run.cjs` shows only the sanctioned amendments.
- [ ] T049 Forbidden-file diff proof: `git diff --name-only` contains NONE of `build-html.mjs`, `package.json`, `topbar.js`, `enhance.js` (unless a documented hard blocker), `nav.config.js` (unless the documented B-02 doc-note), any admin/internal page source, any new page module, backend/deps. Verification: the name-only diff is within the `contracts/scope-guard.md` allowed set.

## Phase 11 — Final gate & report

- [ ] T050 Produce the final report (in the PR/turn summary) with: completed task count · files changed · public HTML count (77) · B-01…B-11 each result · pay-free result · zero-pay result · role-model result · build/test/smoke/a11y/screenshots result · clean-code guard result · test-guard result · forbidden-file diff proof · confirmation no new pages/backend/fake behavior · confirmation no commit/push · whether Spec 024 is safe to review/commit. Verification: all fields present; every audit (T043–T049) green.

---

## Dependencies & execution order

- **Phase 0–1** (T001–T006) block everything (evidence gate + baselines).
- **Phase 2** (B-01, T007–T013) is the P1 MVP — independently testable (grep gates) and shippable alone.
- **Phase 3** doc corrections (T014–T020) are mostly `[P]` (different spec/README files) and independent of the code phases.
- **Phase 4** (B-03) and **Phase 5** (B-05) each end with a rebake + smoke re-pin; run sequentially through the shared `npm run build`/`run.cjs` sync points, though their source edits (portal-shell.js vs portal.js/locales) are independent.
- **Phase 6** (B-10) precedes **Phase 7** (B-11) because T030's moved-vs-deleted determination may feed T032's rail restore.
- **Phase 7** CSS tasks T033–T037 are `[P]` (independent living-layer rules); T032/T038/T039 are sync points.
- **Phase 8–11** run after all edits; audits (Phase 9) are `[P]`; the final report (T050) is last.

## Parallel opportunities

`[P]` tasks: T014, T015, T016, T019, T020 (docs, different files) · T031 · T033, T034, T035, T036, T037 (independent CSS rules) · T041, T042 · T044, T045, T046 (independent audits). Never parallelize a rebake (`npm run build`) or a shared-file edit (`run.cjs`, `ar.prt.js`).

## Implementation strategy (MVP → incremental)

1. **MVP (safest, shippable alone)**: Phase 0–2 → B-01 child-view wording. Grep-gated, hash-supersession-guarded, no UI risk. Closes the only confirmed role-model contradiction (F-00-1).
2. **+ Must-Fix records**: Phase 3 (B-02/B-04) + Phase 4 (B-03). Closes the remaining P1 items.
3. **+ Should-Fix**: Phase 5 (B-05), Phase 6 (B-10), Phase 3 (B-06/B-07/B-08/B-09), then Phase 7 (B-11 density).
4. **Gate**: Phase 8–11 after each increment; never proceed past a red audit.

## Deferred / out of scope (NO tasks generated)

- B-12 (scanner hygiene), B-13 (FUTURE_ROUTES map), B-14 (gallery nav check → 032), B-16 (settingsUsers → 031) — deferred per plan; not implemented in 024.
- B-17 (family-children no-fold-link) — covered ONLY as a record inside B-10 (T031).
- B-18 (broad exclusion register) — covered ONLY as a record inside B-08 (T019).
- Within B-11: D-02 is F-00-1 (handled by B-01); D-14 admin cards → 026–031; D-15 data sheets stay light; D-04/D-05/D-09 deferred unless a hash supersession is declared (T038).
