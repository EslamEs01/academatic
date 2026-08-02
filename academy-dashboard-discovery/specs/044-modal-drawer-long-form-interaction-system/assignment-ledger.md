# Executor Assignment Ledger — Spec 044

**Orchestrator/final authority:** Codex  
**Execution model:** serialized Claude/Kimi relay runs in the one authorized working tree; no concurrent writers, no child agents, no commits  
**Planned allocation:** Kimi 42/69 executor tasks (60.9% by task count, including the repetitive/high-volume work); Claude Opus 27/69 high-risk tasks. Actual allocation is reconciled at closure; executor availability never changes acceptance criteria.

Every return is a claim until Codex reviews actual status, staged/unstaged/untracked bytes, the complete owned-file diff, forbidden-file drift, focused gates, and the task contract. Rework resumes only the same task session with a delta brief.

## Global constraints copied into every brief

- Work only on branch `044-modal-drawer-long-form-interaction-system`; do not create/switch branches.
- Read `CLAUDE.md`, Spec-044 spec/plan/contracts/tasks, relevant Spec-043 contracts, and assigned source dependencies.
- Never commit, add/stage, push, pull, fetch, merge, rebase, cherry-pick, stash, reset, clean, tag, deploy, create a PR, alter remotes, or invoke another agent/delegation session.
- Preserve Spec-041 IA/routes and all Spec-043 privacy/RBAC/child-view/teacher-policy meaning and protected tests.
- No new framework/dependency/backend/persistence; no fake loading/delay/error/success/save/authorization.
- Authored source owns generated output; do not hand-edit `app/public/` unless the assignment explicitly runs the canonical build after source acceptance.
- Required selectors/targets/assertions fail loudly; no optional catch, skip, swallowed failure, or weakened guard.
- One writer per file; touch only owned files; report any needed scope expansion instead of taking it.
- Ponytail lite only; no full/ultra mode.

## Assignment A — Kimi foundational deterministic guards

| Field | Contract |
|---|---|
| Executor | Kimi K3 initially; reassigned to Claude Opus after three relay attempts produced zero repository files (one stalled analysis, one unavailable resume, one 20-minute non-delivery timeout) |
| Task IDs | T013, T014, T017 |
| Owned files | new `app/tests/interaction/inventory.cjs`, `app/tests/interaction/expected.cjs`, `app/tests/interaction/layout.cjs` only |
| Read-only dependencies | `interaction-inventory.md`, `classification-matrix.md`, `baseline.md`, `contracts/inventory-contract.md`, `contracts/verification-mutation-contract.md`, `app/scripts/build-html.mjs`, current `app/public/*.html`, current CSS/components/test conventions |
| Expected behavior | recursive nested-template inventory; exact 57-route AR/EN records/dynamic menu mapping/backend-key counts; duplicate IDs exposed; layout guard for modal-grade/stable-region/390 rules; explicit intended baseline GREEN for inventory and intended RED for not-yet-implemented layout contract |
| Required commands | syntax-check each new CJS file; run inventory; run layout and report exact intended RED without weakening it |
| Forbidden files | every existing application source/public/test file, package files, SpecKit docs, Spec-043 files, Git index/history/config |
| Return evidence | exact files, behavior, syntax output, inventory counts, exact layout RED assertion, deviations/open questions, relay session/result paths |
| Codex acceptance | Kimi result rejected for non-delivery; combined Claude foundation return pending. Kimi's read-only calibration confirmed confirmations=160, keyed generic modals=13, row menus=75, sidebar openers=32, and identified the 31-count shell-menu multiplicity adjustment; no task completion credit. |

## Assignment B — Claude combined foundation and high-risk fail-first interaction/protected design

Started after Assignment A's Kimi result was rejected with zero writes; Claude owns the four disjoint new guard files as one replacement foundation wave.

**Transport result:** rejected before execution. The installed Claude relay returned `sandbox required but unavailable` because host `socat` is absent. The skill permits bypass mode only with separate human acceptance, so Codex did not bypass permissions, install a host package, or credit Claude with work. Foundation ownership is being decomposed into smaller Kimi micro-assignments, with Codex directly handling high-risk pieces that cannot be delegated safely.

| Field | Contract |
|---|---|
| Executor | Claude Opus, high effort, no child agent |
| Task IDs | T013–T017 |
| Owned files | new `app/tests/interaction/expected.cjs`, `inventory.cjs`, `layout.cjs`, and `run.cjs` only |
| Read-only dependencies | all Spec-044 artifacts/contracts, accepted Assignment-A guard files, `enhance.js`, interaction components/styles, existing smoke/a11y/screenshot drivers, Spec-043 protected register/tests |
| Expected behavior | fail-first browser scenarios for lifecycle, purposeful focus, one overlay/trap/lock, dirty/validation/backend state, scroll/mobile, sidebar/dropdown/wizard; additive Spec-044 block names and mutation hooks; no inherited assertion edits |
| Required commands | syntax-check runner; execute focused runner and report exact expected RED guarantees (not syntax/load/fixture failures); confirm inherited test files untouched |
| Forbidden files | all application source/styles/locales/public output, existing smoke/a11y/screenshot drivers, package files, SpecKit docs, Spec-043 files, Git index/history/config |
| Return evidence | exact scenario names, intended REDs mapped to missing behavior, files touched, commands/counts, deviations/open questions, relay session/result paths |
| Codex acceptance | Claude transport rejected with zero writes; Codex fallback executed under the prompt's unavailable-executor rule |

## Subsequent serialized ownership waves

| Wave | Claude-owned files | Kimi-owned files | Start condition |
|---|---|---|---|
| Shared lifecycle | `components/interaction-system.js`, `enhance.js`; then interaction runner | `preview-drawer.js`, `confirm-modal.js`; inventory/layout guards | Foundational RED accepted; helper contract reviewed before Kimi edits |
| Mobile/layout | controller only | `app.css`, layout guard, screenshot/a11y files one at a time | Lifecycle API accepted; no shared writer |
| Dirty/validation | controller, `enhance.js`, interaction runner | locales, preview markup, screenshots | State names/markup contract frozen |
| Dropdown/wizard | controller review + wizard high-risk state | `dropdown.js`, screenshot/a11y drivers | Prior state gates GREEN |
| Consumer migration | `outcome-details.js`, protected regression corrections only | disjoint producer groups T064–T067, inventory expected data, canonical build | Helper classification contract accepted |
| Mutations | Claude designs all and executes focus/dirty/nesting high-risk mutations | Kimi mechanically executes approved opener/semantics/Escape/scroll/CSS/copy/locale/ID mutations | Final focused GREEN; strictly one isolated copy at a time |
| Final evidence | none unless correction assigned | impact/inventory/ownership ledgers | Application/test bytes frozen |

## Return review template

For every assignment Codex records: relay status/session/result path; actual owned/unowned changed files; test-diff review; production-code review where applicable; focused commands/results; accept/rework verdict; exact correction brief; task checkboxes accepted; broader gates invalidated.

## Foundation acceptance record

- Kimi full assignment and micro-assignment: rejected, zero repository files, timeout/non-delivery. Read-only calibration evidence was independently reproduced by Codex.
- Claude replacement: rejected before execution, zero repository files, missing required host sandbox dependency; no permission bypass used.
- Codex fallback scope: four new files under `app/tests/interaction/` only. Existing application/generated/protected tests remained byte-unchanged.
- Baseline guard: PASS — 115 HTML, 114 bodies, 57+57 localized routes, 234 targets/locale, 72 forms (58 top-level +14 nested), 162 details, 160 confirmations, 405 menus, backend note 7 source/40 pages/94 instances, and known duplicate records reproduced exactly.
- Intended final RED: recursive field IDs=30, duplicate target IDs=10, explicit-family metadata missing on 468 localized targets, explicit form presentation missing on 144 localized form targets.
- Layout intended RED: 21 named missing shared-controller/stable-region/390px/scroll/safe-area hooks; no syntax, parser, module-fixture, or unrelated error.
- Browser intended RED: 2/21 inherited scenarios GREEN (`inventory.required-opener`, wizard step-value preservation); 19 named Spec-044 behaviors RED. Required selectors use hard assertions; the scenario aggregator reports and exits nonzero rather than swallowing failures.
- Test-guard review: behavior assertions use real generated pages and Playwright with no mocks; shared helpers remove repeated setup; each scenario covers a distinct contract/mutation; the static layout guard is retained only for exact CSS/mutation contracts and is paired with browser geometry behavior.
- Checkpoint verdict: T013–T019 accepted; the final execution reconciliation below governs closure.

## Final execution reconciliation

- Kimi received the bounded foundation assignment, a resume, and a smaller micro-assignment. The
  configured relay stalled/timed out each time and wrote zero repository files. Kimi receives zero
  implementation-task credit; its read-only calibration was independently reproduced.
- Claude Opus received the combined high-risk foundation brief. The installed relay rejected the
  session before execution because its required `socat` sandbox dependency is absent. Codex neither
  installed a host package nor used the skill's human-approval-only bypass. Claude wrote zero files
  and receives zero implementation-task credit.
- With both configured executors unavailable, Codex completed T020–T100 directly as the prompt's
  explicit safe fallback. No concurrent writers existed. The intended ownership boundaries still
  governed review: controller/high-risk state first, bounded markup/style/locale producers second,
  canonical generation third, tests and evidence last.
- Consumer waves T064–T067 were completed primarily by shared `formDrawer()` classification and the
  controller rather than manufactured edits to every producer named in the plan. Only the three
  hybrid form-bearing producers needing active terminals changed (`family.js`, `library.js`, and
  `report-feedback.js`); recursive inventory proves the unchanged producers receive their final
  family and lifecycle contract through the shared helper.
- T059 required no `wizard.js` edit: the existing wizard step engine already preserves step values.
  The new controller registers the existing dedicated page for dirty/departure/validation guarding,
  and the 22-scenario browser suite verifies the integrated behavior.
