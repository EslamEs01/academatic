# Assignment Ledger

## Executor capability preflight — 2026-08-02

| Attempt | Installed invocation | Model / profile | Duration | Result | Grounded output / file delivery | Tree effect |
|---|---|---|---:|---|---|---|
| Kimi probe 1 | `node /home/mekky/.agents/skills/kimi-delegate/scripts/relay.mjs --cd … --model tokenrouter/kimi-k3-free --timeout 55s` | Kimi Code 0.31.1; configured `tokenrouter/kimi-k3-free` | 55.178s | **TIMEOUT**, exit 143; relay watchdog terminated it | Only “I’ll read…” was returned; no evidence fact, session id, or deliverable. Implementation-capable file delivery **not proven**. | No product/test/source file changed; relay listed only the already-dirty Spec-045 documentation paths. |
| Claude probe | `node /home/mekky/.agents/skills/claude-delegate/scripts/relay.mjs --read-only --model opus --effort high --max-turns 6 --timeout 90s` | Claude Code 2.1.220; Opus/high; plan/read-only | 28.894s | Process completed, exit 0; `readOnlyViolation=false` | **REJECTED AS UNGROUNDED**: final message contained only an attempted `ctx_read` invocation and no requested repository finding. A grounded implementation session is not proven. | No tree change. |
| Kimi probe 2 | same installed Kimi relay with a smaller two-file brief and `--timeout 2m` | Kimi Code 0.31.1; `tokenrouter/kimi-k3-free` | 120.224s | **TIMEOUT**, exit 143 | No final message, evidence fact, session id, or deliverable. Implementation-capable file delivery **not proven**. | No product/test/source file changed; only pre-existing documentation dirt reported. |

### Preflight decision

Kimi is unavailable for grounded bounded implementation in the current relay state: two fresh probes reached the installed CLI but timed out without the requested evidence or a session deliverable. Claude’s CLI is authenticated and launched, but its read-only report is rejected because it never produced grounded findings.

Per the user’s mandatory availability rule, **T013 is blocked and no T014+ application implementation may start**. The permitted next step requires explicit user authority for a substitute execution plan (for example: repair/reconfigure the Kimi relay, approve a different installed executor, or approve a documented workload deviation). No substitute has been assumed.

## Weighted implementation allocation

Weights represent bounded implementation complexity, not lines or generated files. Status remains **PROVISIONAL / NOT ACTIVATED** because the Kimi capability gate failed.

| Batch | Weight | Executor / model | Owned authored files | Read-only evidence/dependencies | Required behavior and tests | Forbidden files | Return evidence |
|---|---:|---|---|---|---|---|---|
| A — shared Teacher pattern (T014) | 8 | Claude Opus | `app/src/styles/app.css`; explicitly approved shared Teacher component only if task requires | EG-045-01–11, visual contract, all 11 page sources/screenshots | establish additive domain pattern; desktop/dark/390px samples; non-Teacher regression | page modules, locales, tests unless separately reassigned | inspected evidence paths, diff, consumer list, screenshots, focused results |
| B — portal home/navigation (T016–T018) | 10 | Kimi K3 | `teacher-portal.js`, `fixtures/portal.js`, `ar.prt.js`, `en.prt.js` | EG-045-01, accepted pattern, portal shell/page | truthful eight-page navigation; no admin-performance implication; AR/EN; desktop/390 | app.css, admin files, tests | exact screenshots/analysis inspected, diff, routes, locale parity, build/focused results |
| C — portal daily pages (T021–T022, T026, T031–T032) | 16 | Kimi K3 | `teacher-schedule.js`, `teacher-outcomes.js`, `teacher-tasks.js`, `teacher-reports.js` | EG-045-02/04/05/06, accepted pattern, shared components/locales read-only | coherent workflow/state hierarchy, absence distinction, truthful gates, 390px | app.css, admin pages, shared interactions, tests | evidence paths, per-page diff/consumers, focused checks/screenshots |
| D — portal people/resources (T025, T027–T028, T033–T035, T038–T040) | 12 | Kimi K3 | `teacher-students.js`, `teacher-library.js`, `teacher-profile.js`; portal locale files only after B is accepted and ownership transfers | EG-045-03/07/08, privacy contract, accepted pattern | safe roster depth, library discovery, self/admin separation, AR/EN/390px | app.css, admin pages, private fixtures, tests | evidence paths, behavior proof, privacy/token results, screenshots |
| E — admin directory (T043–T045) | 12 | Kimi K3 | `teachers.js`; directory fixture file if exact task names it | EG-045-09, D1 contract, accepted pattern, Teacher locales read-only | scope/sort/page, authored summaries, D1 preservation, AR/EN/390px | app.css, teacher detail/performance, shared interactions, tests | evidence paths, record/count proof, focused tests/screenshots |
| F — admin detail/performance (T048–T050, T052–T054) | 10 | Claude Opus | `teacher.js`, `teacher-performance.js`, performance fixtures, `ar.trn.js`, `en.trn.js` | EG-045-10/11, accepted pattern, privacy/interaction contracts | eight tabs/deep links/action priority; categorical performance; AR/EN/dark/390 | app.css after A acceptance except correction round; directory/portal/test files | evidence paths, diff, interaction/privacy proof, screenshots |
| G — domain guards/captures (T059–T060, T063–T064) | 8 | Kimi K3 | `app/tests/smoke/run.cjs`, `app/tests/screenshots/capture.cjs`; new bounded Spec-045 evidence script only if architecture review accepts | all accepted production bytes, test contract | exact scopes/routes/actions/pay/rank/role/absence/visual matrix; fail loud | interaction protected files, production files | test diff, test-guard review packet, exact GREEN results |
| H — protected interaction/mutations (T065) | 3 | Claude Opus | `app/tests/interaction/*.cjs` files explicitly named in tasks | Spec-043/044 registers, accepted production bytes | additive guards, mutation definitions and exact causes | smoke/screenshots/production files | test diff, intended RED design, primary GREEN |
| I — evidence/impact closure (T074–T089 plus bounded ledger updates) | 5 | Kimi K3 | Spec-045 verification/screenshot/impact ledgers after Sol supplies accepted results | all command outputs and accepted screenshots | deterministic counts and documentation truth | application/test/source files | exact byte-backed ledgers |
| J — integration corrections | 10 | Sol maximum | only explicit tiny seam/final correction files after executor review | all evidence and diffs | corrections unsafe/wasteful to delegate; focused rerun | broad batch implementation | diff and independent acceptance |

**Target accepted implementation share:** Kimi 58/88 executor implementation units (65.9%), Claude 21/88 (23.9%), Sol at most 9/88 (10.2%). Review-only work is excluded. If actual accepted weights change, this ledger records the reason and recomputes the percentages.

## Concurrency and transfer rules

- No application implementation begins before both safe capability probes are recorded.
- Kimi unavailable before implementation is a hard STOP requiring user approval for a substitute.
- Claude’s CSS batch completes and is accepted before Kimi page propagation begins.
- Portal locale files transfer B → D only after B acceptance; no simultaneous writers.
- Teacher locale files belong to F; E uses existing keys or waits for F—no overlap.
- Tests begin after the relevant production batches are accepted.
- Builds may update generated consumers, but only one active writer/build owner operates at a time.
- Claude reviews material Kimi batches read-only; Sol independently accepts or returns corrections.
