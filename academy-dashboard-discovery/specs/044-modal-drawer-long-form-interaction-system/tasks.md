# Tasks: Modal, Drawer & Long-Form Interaction System

**Input**: [spec.md](spec.md), [plan.md](plan.md), research/state/contracts, passed visual grounding, accepted baseline, and complete live inventory  
**Tests**: Required and written fail-first where behavior is absent; protected tests never weakened  
**Execution law**: Codex accepts each executor diff and focused evidence before checking a task. No commits or remote/history operations.

## Format: `[ID] [P?] [Story] Description`

- **[P]** means different owned files and no incomplete dependency.
- **Owner** is explicit in every task; actual executor assignments must repeat file ownership, read-only dependencies, commands, forbidden files, and return evidence in `assignment-ledger.md`.

## Phase 1: Setup and Evidence Freeze

- [x] T001 (Codex) Record repository identity, starting branch/HEAD/upstream/status/history and authorized branch creation in `implementation-status.md`
- [x] T002 (Codex) Complete and independently review original-detail current/legacy screenshot evidence in `targeted-visual-grounding.md`
- [x] T003 (Codex) Freeze truthful application/test/count baselines at commit `7d2397b...` in `baseline.md`
- [x] T004 [P] (Codex) Preserve the recursive route/target/trigger inventory and exact AR/EN/backend-key/duplicate-ID counts in `interaction-inventory.md`
- [x] T005 [P] (Codex) Approve every current interaction family and migration decision in `classification-matrix.md`
- [x] T006 [P] (Codex) Assign every deferred item exactly one owner in `ownership-matrix.md`
- [x] T007 (Codex) Complete `spec.md` and `checklists/requirements.md` with FR-001–FR-060 and SC-001–SC-012
- [x] T008 (Codex) Complete evidence-backed clarification review with zero unresolved critical ambiguity in `spec.md`
- [x] T009 (Codex) Complete `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, and all `contracts/*.md`
- [x] T010 (Codex) Approve technical coverage, file ownership, and no-overlap constraints in `plan-review.md`
- [x] T011 (Codex) Audit every prompt requirement → FR → acceptance scenario → task → verification mapping in `task-coverage.md`

---

## Phase 2: Foundational Guards and Assignment Control

**Blocks all application implementation.**

- [x] T012 (Codex) Create the executor assignment ledger with serialized ownership for `app/src/js/enhance.js`, `app/src/js/components/interaction-system.js`, `app/src/styles/app.css`, producer files, test drivers, and docs in `assignment-ledger.md`
- [x] T013 [P] (Codex fallback; Kimi unavailable) Add a fail-loud recursive inventory/count runner with source/generated/backend-key mapping in `app/tests/interaction/inventory.cjs`
- [x] T014 [P] (Codex fallback; Kimi unavailable) Add explicit expected inventory/classification data, including all 57 route bodies and dynamic menu mappings, in `app/tests/interaction/expected.cjs`
- [x] T015 [P] (Codex fallback; Claude unavailable) Add fail-first browser lifecycle/focus/scroll/dirty/validation contract scenarios in `app/tests/interaction/run.cjs`
- [x] T016 (Codex fallback; Claude unavailable) Register additive Spec-044 protected blocks and exact mutation-to-guard mappings without changing inherited assertions in `app/tests/interaction/run.cjs` and `contracts/verification-mutation-contract.md`
- [x] T017 [P] (Codex fallback; Kimi unavailable) Add fail-first responsive/stable-region geometry assertions at desktop and 390px in `app/tests/interaction/layout.cjs`
- [x] T018 (Codex) Review the guard diffs for false positives, optional catches, weakened assertions, unrelated file drift, and exact expected RED; record acceptance in `assignment-ledger.md`
- [x] T019 (Codex) Verify inherited Spec-043 protected block bytes/meaning and R-2/R-3 hard exits remain unchanged; record hashes/results in `implementation-status.md`

**Checkpoint**: focused guards fail only for intended missing Spec-044 behavior; inventory baseline guard is GREEN.

---

## Phase 3: User Story 1 — Correct Open, Use, and Close (Priority: P1) 🎯 MVP

**Goal**: One deterministic modal-grade lifecycle, explicit mapping, no dead trigger, exact teardown/restoration.

**Independent Test**: Every representative family opens its mapped target, contains focus, uses one overlay/listener/lock, closes by the correct safe/guarded policy, and restores the exact opener; missing targets fail loudly.

- [x] T020 [US1] (Claude Opus) Implement the one-owner lifecycle/state shell in `app/src/js/components/interaction-system.js`
- [x] T021 [US1] (Claude Opus) Route drawer, confirmation, generic modal, and mobile-sidebar dispatch through the shared controller and remove toast fallback/competing overlay paths in `app/src/js/enhance.js`
- [x] T022 [P] [US1] (Kimi K3) Add explicit family/name/description/action-region metadata contracts to `app/src/js/components/preview-drawer.js`
- [x] T023 [P] [US1] (Kimi K3) Align confirmation trigger semantics and safe-action data in `app/src/js/components/confirm-modal.js`
- [x] T024 [US1] (Claude Opus) Implement same-surface transition ownership and idempotent open/close/teardown in `app/src/js/components/interaction-system.js`
- [x] T025 [US1] (Claude Opus) Integrate cloned mobile-sidebar content with the shared host without IA/route changes in `app/src/js/enhance.js` and `app/src/js/components/drawer.js`
- [x] T026 [US1] (Claude Opus) Make lifecycle/focus/one-overlay/missing-target tests GREEN in `app/tests/interaction/run.cjs`
- [x] T027 [US1] (Codex) Independently review production/test diffs and run focused US1 interaction, protected privacy, and selector guards; record acceptance in `implementation-status.md`

---

## Phase 4: User Story 2 — Mobile Full-Screen and Stable Layout (Priority: P1)

**Goal**: No clipped/off-screen surface at 390px; stable header/content/footer/action; safe keyboard/dynamic viewport behavior.

**Independent Test**: AR/RTL and EN/LTR form modal, detail drawer, long drawer, confirmation, and sidebar remain in viewport at 390px with reachable actions and zero horizontal overflow.

- [x] T028 [US2] (Kimi K3) Implement shared logical drawer/modal/sidebar layout, stable regions, dynamic viewport, safe-area, reduced-motion, and 390px full-screen rules in `app/src/styles/app.css`
- [x] T029 [US2] (Claude Opus) Implement body lock, scrollbar compensation, scroll-position restoration, keyboard-focus visibility, and responsive-mode focus stability in `app/src/js/components/interaction-system.js`
- [x] T030 [US2] (Kimi K3) Make desktop/390px geometry and stable action-region guards GREEN in `app/tests/interaction/layout.cjs`
- [x] T031 [P] [US2] (Kimi K3) Add representative AR/EN light/dark desktop/390 screenshot states for form modal, detail drawer, long drawer, confirmation, and sidebar in `app/tests/screenshots/capture.cjs`
- [x] T032 [P] [US2] (Kimi K3) Add required 390px modal-grade accessibility scenarios in `app/tests/a11y/run.cjs`
- [x] T033 [US2] (Codex) Open new 390px images at original detail, verify keyboard/overflow geometry, run focused a11y, and record acceptance in `implementation-status.md`

---

## Phase 5: User Story 3 — Unsaved Changes and Data Preservation (Priority: P1)

**Goal**: Meaningful edits survive every accidental/canceled departure without persistent sensitive storage or nested modal.

**Independent Test**: Clean close has no warning; every dirty departure path shows one in-surface decision; continue preserves all values/focus; discard clears only the active draft; sensitive values never reach storage/URL/attributes/logs.

- [x] T034 [US3] (Claude Opus) Implement normalized initial/current draft snapshots and accurate dirty recalculation in `app/src/js/components/interaction-system.js`
- [x] T035 [US3] (Claude Opus) Implement one-surface continue-editing/discard state and guard close/Escape/overlay/incompatible-open paths in `app/src/js/components/interaction-system.js`
- [x] T036 [US3] (Claude Opus) Add route/page/beforeunload and dedicated-session departure protection without false persistence claims in `app/src/js/components/interaction-system.js` and `app/src/js/enhance.js`
- [x] T037 [US3] (Claude Opus) Add value-preservation, canceled-discard, confirmed-discard, and no-sensitive-storage checks to `app/tests/interaction/run.cjs`
- [x] T038 [P] [US3] (Kimi K3) Add localized in-surface discard copy and labels in `app/src/locales/ar.extra.js` and `app/src/locales/en.extra.js`
- [x] T039 [P] [US3] (Kimi K3) Add dirty and discard screenshot states for representative AR/EN light/dark desktop/390 surfaces in `app/tests/screenshots/capture.cjs`
- [x] T040 [US3] (Codex) Review dirty-state normalization/privacy boundaries, run focused tests, inspect captures, and record acceptance in `implementation-status.md`

---

## Phase 6: User Story 4 — Validation and Truthful Operation States (Priority: P1)

**Goal**: Accessible, non-destructive validation and truthful backend-required state; no fake loading/error/success.

**Independent Test**: Invalid authored constraints produce associated AR/EN messages and appropriate focus without value loss; valid frontend data reaches an in-surface “server required / not saved” state; repeated actions do not duplicate errors/messages.

- [x] T041 [US4] (Claude Opus) Implement field issue association, summary/focus, deterministic correction, and hidden-step hooks in `app/src/js/components/interaction-system.js`
- [x] T042 [US4] (Claude Opus) Implement in-surface backend-required terminal state, busy/error APIs limited to real work, and duplicate-action protection in `app/src/js/components/interaction-system.js`
- [x] T043 [US4] (Kimi K3) Update `formDrawer()` markup to expose validation summary, operation live region, and truthful actionable backend boundary in `app/src/js/components/preview-drawer.js`
- [x] T044 [P] [US4] (Kimi K3) Generate exact direct/implicit source and 20 AR/20 EN generated-page backend-key mapping in `app/tests/interaction/inventory.cjs`
- [x] T045 [P] [US4] (Kimi K3) Add/adjust AR/EN validation, discard, operation, and backend-required copy without changing truthful global meaning in `app/src/locales/ar.extra.js` and `app/src/locales/en.extra.js`
- [x] T046 [US4] (Claude Opus) Make validation/value-preservation/backend-required/no-fake-state browser guards GREEN in `app/tests/interaction/run.cjs`
- [x] T047 [P] [US4] (Kimi K3) Add validation-error and backend-required screenshot states; record real loading/error as non-applicable unless inventory proves real work in `app/tests/screenshots/capture.cjs`
- [x] T048 [US4] (Codex) Verify global vs specialized reason keys, no false copy, no invented requiredness/fields, and focused GREEN in `implementation-status.md`

---

## Phase 7: User Story 5 — Keyboard and Assistive Technology (Priority: P1)

**Goal**: Purposeful initial focus, full containment/background isolation, announced state, and exact restoration across every modal-grade family.

**Independent Test**: Tab/Shift+Tab wrap, background cannot receive focus, destructive confirm starts safely, validation focus is stable, resize retains focus, close restores exact opener, and axe finds no critical/serious issue.

- [x] T049 [US5] (Claude Opus) Finalize purpose-based initial focus, dynamic focusable filtering, Tab boundaries, background isolation/restoration, and no-focusable fallback in `app/src/js/components/interaction-system.js`
- [x] T050 [US5] (Claude Opus) Finalize validation/loading/error announcements and focus stability through responsive/state transitions in `app/src/js/components/interaction-system.js`
- [x] T051 [US5] (Claude Opus) Make semantics, focus, background, restoration, and responsive-focus scenarios GREEN in `app/tests/interaction/run.cjs`
- [x] T052 [P] [US5] (Kimi K3) Expand representative confirmation/modal/drawer/sidebar/wizard state coverage in `app/tests/a11y/run.cjs`
- [x] T053 [US5] (Codex) Perform manual keyboard review plus focused/full a11y validation and accept or order exact corrections in `implementation-status.md`

---

## Phase 8: User Story 6 — Non-Modal Dropdowns (Priority: P2)

**Goal**: Keyboard-operable row/global menus that never gain modal semantics or a modal focus trap.

**Independent Test**: Arrow/Home/End navigation, Escape/outside close, logical focus restoration, and operation inside an active surface all work with one modal-grade overlay.

- [x] T054 [US6] (Kimi K3) Add fail-first dropdown navigation/non-modal/inside-surface scenarios to `app/tests/interaction/run.cjs`
- [x] T055 [US6] (Kimi K3) Implement ArrowUp/Down/Home/End, consistent outside/Escape restoration, and active-surface containment in `app/src/js/components/dropdown.js`
- [x] T056 [US6] (Claude Opus) Review dropdown/controller boundary for secondary-overlay and focus-trap conflicts in `app/src/js/components/interaction-system.js` and `app/src/js/components/dropdown.js`
- [x] T057 [P] [US6] (Kimi K3) Add representative dropdown-near/inside-interaction screenshot and accessibility states in `app/tests/screenshots/capture.cjs` and `app/tests/a11y/run.cjs`
- [x] T058 [US6] (Codex) Run and review focused dropdown, one-overlay, a11y, and console guards; record acceptance in `implementation-status.md`

---

## Phase 9: User Story 7 — Dedicated Large-Form Page (Priority: P2)

**Goal**: Keep the existing `add-family` page/wizard and integrate dirty, validation, preservation, and truthful terminal behavior without a new route.

**Independent Test**: Change values across steps, navigate steps, cancel departure, expose hidden-step errors, and invoke the final backend-required action with values intact.

- [x] T059 [US7] (Claude Opus) Integrate the dedicated wizard session with dirty/departure/validation state in `app/src/js/components/wizard.js` and `app/src/js/components/interaction-system.js`
- [x] T060 [US7] (Claude Opus) Add wizard step preservation, hidden-error, departure, and truthful terminal scenarios to `app/tests/interaction/run.cjs`
- [x] T061 [P] [US7] (Kimi K3) Add AR/EN light/dark desktop/390 populated, dirty, validation, and backend-required wizard captures in `app/tests/screenshots/capture.cjs`
- [x] T062 [US7] (Codex) Verify page count remains 115, route/sidebar IA is unchanged, wizard state passes, and captures are accepted in `implementation-status.md`

---

## Phase 10: User Story 8 — Complete Consumer Migration and Preservation (Priority: P1)

**Goal**: Explicitly classify/migrate every source consumer with AR/EN/theme parity and zero Spec-041/043 regression.

**Independent Test**: The permanent inventory reproduces 54 form modals, 18 form drawers, 162 detail drawers, 160 confirmations, 13 generic modals, one wizard, 405 dropdown openers, and 32 sidebar openers per locale; all generated consumers and protected tests pass.

- [x] T063 [US8] (Kimi K3) Make `formDrawer()` presentation explicit and fail-loud for missing/unknown classification in `app/src/js/components/preview-drawer.js` and `app/tests/interaction/inventory.cjs`
- [x] T064 [P] [US8] (Kimi K3) Classify/migrate academic course/group/session/task producers in `app/src/js/components/course-group-actions.js`, `app/src/js/components/table.js`, and `app/src/js/pages/tasks.js`
- [x] T065 [P] [US8] (Kimi K3) Classify/migrate family/student/teacher/staff producers without privacy-content changes in `app/src/js/pages/family.js`, `app/src/js/pages/student.js`, `app/src/js/pages/students.js`, `app/src/js/pages/staff.js`, and `app/src/js/components/teacher-actions.js`
- [x] T066 [P] [US8] (Kimi K3) Classify/migrate reports/library/messages/certificates producers in `app/src/js/components/report-feedback.js`, `app/src/js/pages/library.js`, `app/src/js/pages/messages.js`, and `app/src/js/pages/certificates.js`
- [x] T067 [P] [US8] (Kimi K3) Classify/migrate settings/finance/leads producers in `app/src/js/pages/settings.js`, `app/src/js/pages/finance.js`, and `app/src/js/pages/leads.js`
- [x] T068 [US8] (Claude Opus) Replace nested feedback transitions and fixed IDs with outcome-scoped identity in `app/src/js/components/outcome-details.js` and shared controller integration
- [x] T069 [US8] (Kimi K3) Make every inventory/classification/source-generated/backend-key/count assertion GREEN in `app/tests/interaction/inventory.cjs` and `app/tests/interaction/expected.cjs`
- [x] T070 [US8] (Kimi K3) Regenerate authored output with `npm run build` and report exact source/generated/page/body/consumer deltas without hand-editing `app/public/`
- [x] T071 [US8] (Claude Opus) Run focused protected Spec-043 privacy/RBAC/child-view/teacher-policy guards and correct only shared-host regressions in assigned source files
- [x] T072 [P] [US8] (Kimi K3) Complete AR/EN, RTL/LTR, light/dark, desktop/tablet/390 consumer matrix and console coverage in `app/tests/screenshots/capture.cjs`
- [x] T073 [P] [US8] (Kimi K3) Complete equivalent accessibility matrix with required fail-loud selectors in `app/tests/a11y/run.cjs`
- [x] T074 [US8] (Codex) Review every producer diff, exact final classification counts, protected content, generated parity, screenshots, and focused/full gates in `implementation-status.md`

---

## Phase 11: Isolated Mutation Proofs

**Each task uses a fresh isolated copy, one mutation only, exact intended RED, copy removal, and primary GREEN. These tasks are serialized.**

- [x] T075 (Kimi K3) Execute Claude-designed M44-01 missing opener → exact inventory RED → remove copy → GREEN; record in `mutation-ledger.md`
- [x] T076 (Kimi K3) Execute Claude-designed M44-02 wrong/missing target mapping → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T077 (Kimi K3) Execute Claude-designed M44-03 removed dialog semantics → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T078 (Claude Opus) Execute M44-04 disabled focus containment → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T079 (Claude Opus) Execute M44-05 broken exact opener restoration → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T080 (Kimi K3) Execute Claude-designed M44-06 removed safe Escape behavior → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T081 (Claude Opus) Execute M44-07 dirty close without warning → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T082 (Claude Opus) Execute M44-08 nested modal/second overlay allowed → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T083 (Kimi K3) Execute Claude-designed M44-09 body scroll not restored → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T084 (Kimi K3) Execute Claude-designed M44-10 390px full-screen rule removed → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T085 (Kimi K3) Execute Claude-designed M44-11 stable action/footer rule removed → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T086 (Kimi K3) Execute Claude-designed M44-12 false saved backend copy → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T087 (Kimi K3) Execute Claude-designed M44-13 missing AR or EN copy → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T088 (Kimi K3) Execute Claude-designed M44-14 swallowed required selector failure → exact RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T089 (Kimi K3) Execute Claude-designed M44-15 fixed nested feedback IDs → exact duplicate-ID RED → remove copy → GREEN in `mutation-ledger.md`
- [x] T090 (Codex) Prove all isolated copies removed, primary-tree mutation residue=0, protected test bytes valid, and final focused GREEN in `mutation-ledger.md`

---

## Phase 12: Final Gates, Impact, Documentation, and Independent Review

- [x] T091 (Codex) Run final build and exact 115-page/114-body/source-generated/inventory/count gates; record output in `implementation-status.md`
- [x] T092 (Codex) Run final smoke and focused interaction suites; record exact passed/total and no silent skip in `implementation-status.md`
- [x] T093 (Codex) Run final accessibility matrix and record exact scenarios with critical=0 serious=0 in `implementation-status.md`
- [x] T094 (Codex) Run final screenshot matrix, verify console errors=0, and open every distinct/new representative state at original detail; record results in `implementation-status.md` and `app/screenshots/REVIEW.md`
- [x] T095 [P] (Kimi K3) Produce exact source/generated/page-body/consumer/test-matrix impact and unrelated-drift evidence against `7d2397b...` in `impact-ledger.md`
- [x] T096 [P] (Kimi K3) Update inventory/classification/ownership evidence to final counts without changing task contracts in `interaction-inventory.md`, `classification-matrix.md`, and `ownership-matrix.md`
- [x] T097 (Codex) Review changed production code with Clean Code guard and changed tests with Test guard; order corrections and rerun invalidated focused gates
- [x] T098 (Codex) Review all changed documentation with Docs guard against live bytes; correct false or stale claims in Spec-044 artifacts and `CLAUDE.md`
- [x] T099 (Codex) Independently audit every FR, scenario, T001–T098 result, changed source/generated file, privacy boundary, selector, focus/scroll/state/copy rule, mutation, impact, forbidden drift, and `git diff --check`; route and verify corrections
- [x] T100 (Codex) Mark Spec 044 IMPLEMENTED only when every gate is truthful, tasks are 100/100, residue/drift are zero, and `implementation-status.md`, checklist, task ledger, and `CLAUDE.md` agree

---

## Dependencies and Execution Order

- Phase 1 evidence/artifacts → Phase 2 guards/assignment ledger → shared controller US1.
- US1 lifecycle blocks mobile layout, dirty state, validation, focus completion, dropdown-inside-surface, wizard state, and consumer migration.
- Kimi classification/CSS work may run only after Claude’s helper/controller contract is accepted and files are disjoint.
- Dirty/validation/focus stories may be implemented by Claude in a serialized controller stream while Kimi works on approved CSS, inventories, or disjoint producers.
- Full consumer migration must finish before mutation proofs and final broad gates.
- Mutations T075–T089 are strictly sequential; each copy is removed before the next.
- T099 may reopen any task; T100 depends on every correction and rerun.

## Parallel Opportunities

- T013/T014/T017 use disjoint foundational files while Claude owns T015/T016.
- After controller API acceptance, T028/T030/T031 (Kimi) can run beside Claude controller state work, with `app.css` and controller files disjoint.
- Consumer groups T064–T067 are parallelizable only if Kimi uses one process with serialized file ownership or Codex assigns non-overlapping executors; no two writers share a file.
- A11y and screenshot driver edits can run in parallel only when assigned to different files and their shared scenario contracts are frozen.
- Impact/docs work T095/T096 runs only after application/generated bytes freeze.

## Implementation Strategy

1. Prove inventory and expected RED before product changes.
2. Deliver US1 shared lifecycle as the minimal independently testable foundation.
3. Add mobile, dirty, validation, focus, dropdown, and wizard increments with focused acceptance after each.
4. Migrate all consumers mechanically only after the shared contracts stabilize.
5. Execute isolated mutations, broad gates, exact impact, documentation truth review, and final independent Codex audit.

## Notes

- Optional SpecKit auto-commit hooks are skipped under the user’s Git policy.
- No task authorizes commit, push, pull, fetch, merge, rebase, stash, reset, clean, deployment, or PR creation.
- A checked box means Codex independently accepted evidence, not merely that an executor reported completion.
