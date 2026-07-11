# Tasks: Admin Content & Certificates Explicit Pages (Spec 039)

**Feature dir**: `academy-dashboard-discovery/specs/039-content-certificates-explicit-pages/`
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `4cbcb31` (Spec 038 committed), public HTML **115**,
admin menu **50**.
**Nature**: navigation-only unlock (deep-links to existing tabs). Sole application-source edit = `nav.config.js`.
Everything else is 0-diff or additive tests/docs. No commit / no push (watcher commits).

**Paths** (relative to `academy-dashboard-discovery/app/` unless noted): `src/js/nav.config.js`,
`tests/smoke/run.cjs`, `tests/a11y/run.cjs`, `tests/screenshots/capture.cjs`, `screenshots/REVIEW.md`,
`README.md`; repo-root `CLAUDE.md`; spec dir status doc.

**Tests requested**: YES (this project's contract is test-guarded; smoke/a11y/screenshot are part of every spec).

**Conventions**: `[P]` = parallelizable (different file, no incomplete dep). Same-file edits are sequential.

---

## Phase 1: Setup & Preflight (baseline gate — no story label)

- [x] T001 Verify baseline gate from repo root: `git branch --show-current` = `feature/012-role-portal-foundation`; `git rev-parse --short HEAD` = `4cbcb31` (or committed successor); `git status --short` shows ONLY `.specify/feature.json` + `specs/039-content-certificates-explicit-pages/`; `find academy-dashboard-discovery/app/public -maxdepth 1 -name '*.html' | wc -l` = 115. STOP per `contracts/scope-guard.md` if any differ.
- [x] T002 Confirm baseline green in `academy-dashboard-discovery/app`: `npm run build` (115 pages), `npm run test:smoke` (PASS), `npm run test:a11y` (critical=0 serious=0). Record results.
- [x] T003 Capture non-destructive impact baseline (per `contracts/impact-protection-contract.md`): for each `academy-dashboard-discovery/app/public/*.html`, extract the `#page-body`, normalize, md5 → `scratchpad/baseline-md5.txt`. NO git stash/reset/checkout-discard/branch-switch.

---

## Phase 2: Foundational — the nav.config.js edit + declared smoke amendments (BLOCKING)

**Blocks all user stories. The nav edits + the two declared smoke amendments must land together so `npm run test:smoke` can pass post-flip.** All edits in this phase touch shared files (`nav.config.js`, then `tests/smoke/run.cjs`) → sequential, no `[P]`.

- [x] T004 In `src/js/nav.config.js`: flip `materials` (line ~100) `status:'planned'` → `route:'library.html#view=materials'`; flip `certificateRequests` (line ~103) `status:'planned'` → `route:'certificates.html#view=requests'`; refine `books` (line ~101) `route:'library.html'` → `route:'library.html#view=books'`; remove the `materials: 'library.html'` entry from `FUTURE_ROUTES` (line ~144). Per `contracts/nav-completion-contract.md` + `contracts/materials-deeplink-contract.md` + `contracts/books-route-refinement-contract.md` + `contracts/certificate-requests-deeplink-contract.md`. Do NOT touch any other nav item.
- [x] T005 Rebuild in `academy-dashboard-discovery/app` (`npm run build`): confirm the nav build-time guard passes (implemented⇒route), public HTML stays **115**, and admin menu stays **50** (per `contracts/page-count-contract.md`).
- [x] T006 **Declared Amendment 1** in `tests/smoke/run.cjs` (~lines 227–230, per `contracts/protected-test-supersession-contract.md`): repoint the dashboard planned-item toast probe `data-nav-category` from `admin` → `settings` (the only category still carrying planned items); update the adjacent comment. Preserve the `clickFeedback`/`ok(!rPlanned, …)` logic byte-identical otherwise.
- [x] T007 **Declared Amendment 2** in `tests/smoke/run.cjs` (~line 1636 / `nav010` evaluate block): keep `admItems.length === 5 && !admItems.includes('banks')` byte-verbatim; correct ONLY the inaccurate "5 planned items" message text; add `admPlanned` to the `nav010` evaluate block (mirror `famPlanned` ~1376) and a companion `ok(nav010.admPlanned === 0, …)` assertion. Weaken no neighbor.

**Checkpoint**: after T004–T007, `npm run test:smoke` PASSES with the flip in place.

---

## Phase 3: User Story 1 — Admin reaches Materials from the sidebar (Priority: P1) 🎯 MVP

**Goal**: `materials` sidebar item is a real link opening the Materials (subject catalog) tab on fresh load, AR+EN.
**Independent test**: fresh-load AR/EN; `materials` anchor resolves to `library(.en).html#view=materials`, no «قريبًا»/aria-disabled/lock; Materials panel visible; Add/Edit reachable + gated; no `type=file`.

- [x] T008 [US1] In `tests/smoke/run.cjs` add an additive assertion block (per `contracts/smoke-coverage-contract.md`): in a fresh browser context, AR **and** EN, assert `materials` is an implemented `<a>` (`data-nav-status="implemented"`), href resolves to `library.html#view=materials` (AR) / `library.en.html#view=materials` (EN), NO «قريبًا»/`aria-disabled`/lock icon, and on fresh load exactly one visible tabpanel = Materials (`data-tabpanel="materials"` visible, `books` hidden), with no external/network request.

---

## Phase 4: User Story 2 — Admin understands and reviews Certificate Requests (Priority: P1)

**Goal**: `certificateRequests` sidebar item opens the Requests queue tab on fresh load, AR+EN; dispositions gated.
**Independent test**: fresh-load AR/EN; `certificateRequests` anchor resolves to `certificates(.en).html#view=requests`; Requests panel visible; review + create drawers reachable; Approve/Reject/Generate/Preview/Download/Send are gates (no mutation/PDF/send).

- [x] T009 [US2] In `tests/smoke/run.cjs` add an additive assertion block: AR **and** EN, assert `certificateRequests` is an implemented `<a>`, href resolves to `certificates.html#view=requests` (AR) / `certificates.en.html#view=requests` (EN), no «قريبًا»/`aria-disabled`/lock; fresh load shows exactly one visible tabpanel = Requests (`data-tabpanel="requests"` visible, `templates` hidden); no external request. (Same file as T008 → sequential.)

---

## Phase 5: User Story 3 — Distinguish Materials from Library content / books refinement (Priority: P2)

**Goal**: the Content-Library («الكتب») item opens the Books tab explicitly; Materials and Content are distinct.
**Independent test**: `books` anchor resolves to `library(.en).html#view=books`; fresh load shows the Books panel.

- [x] T010 [US3] In `tests/smoke/run.cjs` add an additive assertion: `books` is an implemented `<a>` with href resolving to `library.html#view=books` (AR) / `library.en.html#view=books` (EN); fresh load shows the Books panel (`data-tabpanel="books"` visible). Per `contracts/books-route-refinement-contract.md`. (Same file → sequential after T009.)

---

## Phase 6: User Story 4 — Teacher→admin certificate handoff coherence (Priority: P2)

**Goal**: admin review destination reachable + request entity coherent with the teacher origin; portals untouched.
**Independent test**: 16 portal bodies byte-identical; no admin approval/management control in any teacher/family page.

- [x] T011 [US4] Verify (existing byte-verbatim role-law asserts in `tests/smoke/run.cjs` still pass) that all 16 teacher/family/student portal page bodies are byte-identical and expose no admin content/approval control; confirm the admin Requests queue fields (student/course/teacher/description/date) match `teacher-admin-certificate-handoff.md`. No portal file edited (per `contracts/role-law-carryover-contract.md`).

---

## Phase 7: User Story 5 — Related real backend actions remain honestly gated (Priority: P1)

**Goal**: every content/certificate write stays a gate; no `type=file`/`type=password`/`<canvas>`/`.pdf`/`window.open`.
**Independent test**: built library/certificates bodies grep clean; existing `a31`/`g32` honesty asserts pass byte-verbatim.

- [x] T012 [US5] Verify the existing `a31` content/certificate honesty block in `tests/smoke/run.cjs` (~1183–1208) passes **byte-verbatim**: library tabIds `['materials','books']`, certificates tabIds `['templates','requests']`, `certStage===1`, rows≥6, gates thresholds, `fileInputs===0`, `passwordInputs===0`, `canvas===0`, `noDrag`; and sitewide `g32` (`pw===0 && file===0 && canvas===0 && !pdfish`). Per `contracts/no-fake-content-certificate-contract.md` + `contracts/certificate-designer-honesty-contract.md`. If any fails, STOP (a body must have drifted — not allowed).

---

## Phase 8: User Story 6 — Nav/count/role-law/impact contracts protected (Priority: P1)

**Goal**: count 115, menu 50, admin planned 0, role laws + no-fake byte-verbatim, only shared sidebar changes.
**Independent test**: build 115; smoke passes with only the 2 declared amendments; impact snapshot shows body byte-identity.

- [x] T013 [US6] In `tests/smoke/run.cjs` (additive, within the nav010/new block) assert: admin menu = 50 (`navCount32===50` byte-verbatim @1300), `admItems.length===5`, `admPlanned===0`, `settingsPlanned===6`, `classSalaryReport` unchanged (disabled+lock), settings items unchanged, and `FUTURE_ROUTES.materials` absent (via a config-derived or built-nav check consistent with repo conventions). Per `contracts/page-count-contract.md`.
- [x] T014 [US6] Verify byte-verbatim (no edit) that all carried role-law/no-fake asserts still pass: `payHit`/`tchPay`/`famPay`/`payFigure`/`child-view`/finance nav010 (`lockedFin`/`finLinks`/`finMembers`)/`truth010.badPlanned`/link-integrity/families-teachers-reports nav asserts. Per `contracts/role-law-carryover-contract.md` + `contracts/protected-test-supersession-contract.md`.
- [x] T015 [US6] Impact proof (per `contracts/impact-protection-contract.md`): rebuild, re-extract normalized `#page-body` md5 per page, diff vs `scratchpad/baseline-md5.txt`. REQUIRE: `library.html`/`library.en.html`/`certificates.html`/`certificates.en.html` `#page-body` byte-identical; every other admin body + all 16 portal bodies + `index.html` byte-identical; only the shared admin sidebar markup differs; count 115.
- [x] T016 [US6] Forbidden-file 0-diff proof: `git diff --stat -- academy-dashboard-discovery/app/src` shows ONLY `nav.config.js`; `git diff` is empty for `pages/library.js`, `pages/certificates.js`, `fixtures/content-library.js`, `fixtures/certificates.js`, `locales/ar.adm.js`, `locales/en.adm.js`, `enhance.js`, `components/tabs.js`, `components/sidebar.js`, `i18n.js`, `styles/app.css`, `scripts/build-html.mjs`, `package.json`. Per `contracts/fixtures-locale-zero-diff-contract.md` + `contracts/scope-guard.md`.

---

## Phase 9: Cross-cutting additive coverage (a11y + screenshots — serve US1/US2/US3)

Distinct files from each other and from smoke → `[P]`.

- [x] T017 [P] In `tests/a11y/run.cjs` add additive rows (per `contracts/a11y-screenshot-contract.md`): `library.html#view=materials`, `library.html#view=books`, `certificates.html#view=requests` × AR/EN × light/dark × mobile 390, plus open-state rows (Materials add/edit drawer + delete-confirm; `lib-cats`/`lib-item` drawers; certificate review + `cert-create` drawers) and keyboard tab switching. Skip rows already covered. Run `npm run test:a11y` → critical=0 serious=0.
- [x] T018 [P] In `tests/screenshots/capture.cjs` add additive frames (per `contracts/a11y-screenshot-contract.md`): Materials tab (`#view=materials`), Books tab via refined link (`#view=books`), Certificate Requests tab (`#view=requests`) × AR/EN × dark × mobile 390; request-review drawer; materials drawer/confirm; admin sidebar showing the implemented anchors. Run `node tests/screenshots/capture.cjs` → 0 console errors.

---

## Phase 10: Polish & Docs (no story label)

- [x] T019 [P] Update docs: `academy-dashboard-discovery/app/screenshots/REVIEW.md` (+Spec 039 frames), `academy-dashboard-discovery/app/README.md` (+Spec 039 section), repo-root `CLAUDE.md` (active-feature pointer → Spec 039; move Spec 038 to history), and create `specs/039-content-certificates-explicit-pages/implementation-status.md`.
- [x] T020 Final full verification in `academy-dashboard-discovery/app`: `npm run build` (115), `npm test` / `npm run test:smoke` (PASS), `npm run test:a11y` (0/0), `node tests/screenshots/capture.cjs` (0 console errors). Confirm locale parity `adm` AR≡EN, 0 raw keys.
- [x] T021 Adversarial review: run the clean-code guard + test-guard over the full diff (per plan model-routing). Confirm: scope = only `nav.config.js` (source) + declared/additive test edits + docs; the 2 amendments only; no weakened assert; no fake/mutation/type=file/canvas/password/pdf; no new dependency/hook/storage key; count 115; menu 50. Fix any blocker and re-run T020. Do NOT commit/push.

---

## Dependencies & execution order

- **Phase 1 (T001–T003)** → **Phase 2 (T004–T007, blocking)** → all user stories.
- **US1 (T008)**, **US2 (T009)**, **US3 (T010)** edit the same `tests/smoke/run.cjs` → sequential (T008→T009→T010).
- **US4 (T011)**, **US5 (T012)**, **US6 (T013–T016)** are verifications on top of Phase 2 → run after T004–T007; T013 edits run.cjs (sequential after T010); T011/T012/T014 are pass-verifications; T015/T016 are diff/impact proofs (after build).
- **Phase 9 (T017 a11y, T018 screenshots)** — `[P]` with each other and with the smoke work (different files), but after T005 (build reflects the flip).
- **Phase 10** last: T019 `[P]` (docs), then T020 (full verify), then T021 (guards).

## Parallel example
```
After T004–T007 + T005 build:
  Parallel: T017 (tests/a11y/run.cjs)  ‖  T018 (tests/screenshots/capture.cjs)  ‖  T019 (docs)
  Sequential on tests/smoke/run.cjs:   T008 → T009 → T010 → T013
```

## Implementation strategy
- **MVP = User Story 1** (T001–T008): `materials` reachable + verified. Delivers the core roadmap value alone.
- Incremental: add US2 (certificate requests), then US3 (books refinement), then the protection/verification stories
  (US4/US5/US6) and additive a11y/screenshot coverage, then polish.
- The whole spec is small (one source file); stories are delivered together in practice but remain independently
  testable via their own assertion blocks.

## Task count
21 tasks — Setup 3 · Foundational 4 · US1 1 · US2 1 · US3 1 · US4 1 · US5 1 · US6 4 · Cross-cutting 2 · Polish 3.
