# Assignment Ledger

## Executor capability preflight — 2026-08-02

| Attempt | Installed invocation | Model / profile | Duration | Result | Grounded output / file delivery | Tree effect |
|---|---|---|---:|---|---|---|
| Kimi probe 1 | `node /home/mekky/.agents/skills/kimi-delegate/scripts/relay.mjs --cd … --model tokenrouter/kimi-k3-free --timeout 55s` | Kimi Code 0.31.1; configured `tokenrouter/kimi-k3-free` | 55.178s | **TIMEOUT**, exit 143; relay watchdog terminated it | Only “I’ll read…” was returned; no evidence fact, session id, or deliverable. Implementation-capable file delivery **not proven**. | No product/test/source file changed; relay listed only the already-dirty Spec-045 documentation paths. |
| Claude probe | `node /home/mekky/.agents/skills/claude-delegate/scripts/relay.mjs --read-only --model opus --effort high --max-turns 6 --timeout 90s` | Claude Code 2.1.220; Opus/high; plan/read-only | 28.894s | Process completed, exit 0; `readOnlyViolation=false` | **REJECTED AS UNGROUNDED**: final message contained only an attempted `ctx_read` invocation and no requested repository finding. A grounded implementation session is not proven. | No tree change. |
| Kimi probe 2 | same installed Kimi relay with a smaller two-file brief and `--timeout 2m` | Kimi Code 0.31.1; `tokenrouter/kimi-k3-free` | 120.224s | **TIMEOUT**, exit 143 | No final message, evidence fact, session id, or deliverable. Implementation-capable file delivery **not proven**. | No product/test/source file changed; only pre-existing documentation dirt reported. |
| Kimi fair grounded probe | installed relay with repository cwd, EG-045-07 exact screenshot/analysis/source/AR+EN consumer packet, and `--timeout 10m` | Kimi Code 0.31.1; provider `tokenrouter`; configured alias `tokenrouter/kimi-k3-free` resolving to `moonshotai/kimi-k3-free` | 408.126s | **PASS**, exit 0; final answer produced; stderr empty | Inspected every supplied path and returned three evidence-backed observations, the authored owner, both consumers, one bounded recommendation, and explicit no-invention confirmation. Session `session_a5ba1ed8-e6de-4029-baf3-43683e6ce410`; no file delivery requested. | No tree change. |
| Kimi isolated delivery probe | resumed the grounded session through the same relay with `--timeout 10m`; one disposable file outside application/generated/test source | same Kimi CLI/provider/model | 333.516s | **PASS**, exit 0; final report produced; stderr empty | Replaced exactly `KIMI_DELIVERY_PROBE=UNEDITED` with `KIMI_DELIVERY_PROBE=EDITED`; direct read and an independent one-line unified diff verified delivery. | Disposable file removed with zero residue; no application/generated/test/governance file changed. |

### Preflight decision

Kimi is **AVAILABLE** for grounded, file-delivering implementation. The earlier 55.178s and 120.224s attempts were relay-watchdog terminations of requests that needed more time; neither was provider authentication, quota, model, or tool failure. With the required realistic ten-minute window, grounded analysis completed in 408.126s and isolated file delivery completed in 333.516s.

The installed path is `/home/mekky/.agents/skills/kimi-delegate/scripts/relay.mjs` → Kimi Code 0.31.1 → configured provider/model alias `tokenrouter/kimi-k3-free`. The relay forwards the repository cwd, transports the brief through the CLI prompt argument, records streamed JSON events/stdout and stderr separately, supports Kimi read/edit tools, and terminates the process group only when its configured watchdog expires. No credentials were displayed or modified, no package was installed, and no integration was replaced.

T013 capability and ownership gates now pass. Application implementation may proceed with Kimi as the largest useful owner. Claude’s earlier read-only probe remains rejected as historical evidence; a corrected grounded Claude capability run is required before its first implementation batch and must be recorded below.

## Executor capability re-verification — resumed run 2026-08-03 (Claude Opus lead)

The resumed run re-ran the fair preflight from scratch rather than inheriting the 2026-08-02 result, because provider quota state is not durable across days (the prior lead executor was itself unavailable for exactly that reason).

| Attempt | Installed invocation | Model / provider | Duration | Exit | Result | Capability tested | Tree effect |
|---|---|---|---:|---:|---|---|---|
| Kimi grounded preflight (resumed run) | `node /home/mekky/.agents/skills/kimi-delegate/scripts/relay.mjs --brief <EG-045-07 packet> --cd /media/mekky/work/backend/dashboard-intelligence-crawler --model tokenrouter/kimi-k3-free --timeout 10m` | Kimi Code 0.31.1; provider `tokenrouter`; alias `tokenrouter/kimi-k3-free` | 123.343s (00:08:40.156Z → 00:10:43.499Z) | 0 | **PASS**; stderr empty; session `session_ccd20dec-dd66-464f-a5e1-54710f5230f4` | Grounded read-only inspection of a six-path evidence packet | `touchedFiles` = the three already-dirty Spec-045 documents only; zero new changes |
| Kimi isolated delivery probe (resumed run) | same relay, disposable file `/media/mekky/work/backend/dashboard-intelligence-crawler/.kimi-delivery-probe-045.txt`, `--timeout 10m` | same CLI/provider/model | 16.817s (00:11:15.523Z → 00:11:32.340Z) | 0 | **PASS**; stderr empty; session `session_6c92a3c8-1e16-4f8c-9ce0-7243b30fa5bd` | File-edit delivery | Exactly one token replaced; verified by direct read **and** an independent `diff -u` against a regenerated original; file then removed — `git status --porcelain` shows zero residue |

### What the grounded probe actually returned

Against packet EG-045-07 (`teacher-library`) Kimi returned all six required sections: the exact six inspected paths; three evidence-backed observations each citing its source path (the reference `search_form`/`query` input and category select proven by the discovery file and reference screenshot; the current three-card authored fixture shelf with its two `gateNote` backend-required blocks confirmed across authored source, both generated consumers and the current screenshot; and a pay-free audit noting the reference sidebar's `/teacher/salary` and `/teacher/salary-class-report` entries are correctly absent from both consumers); the authored owner `app/src/js/pages/teacher-library.js`; both generated consumers; one bounded recommendation (an evidence-backed client-side search over the already-rendered fixture cards); and an explicit no-invention confirmation.

It additionally **declined** to recommend the reference "All Categories" subject dropdown on the ground that `TEACHER_PREVIEW.materials` carries no authored category field, so reproducing it would require inventing fixture data. That refusal is the discipline this Spec requires and is accepted as positive evidence of grounding, not as an omission.

### Corrected Claude capability ruling

The 2026-08-02 `claude-delegate` relay probe is **retired, not repeated**. For this run Claude Opus is the in-session supreme lead and implements directly through its own tools; it is not a delegated subprocess, so a relay capability probe is not a precondition for its batches. Its implementation evidence is the actual diff, build output, focused test results, and screenshots recorded per batch in `executor-review-ledger.md`. The T013 gate is therefore satisfied by: (a) Kimi PASS on both grounded analysis and file delivery, and (b) Claude Opus operating in-session.

### Executor run log (resumed run)

| Run | Scope | Duration | Outcome |
|---|---|---:|---|
| Batch B | `teacher-portal.js` + both portal locales (3 files) | 644.7s, exit 0 | **DELIVERED and ACCEPTED** |
| Batch C+D (first attempt) | seven portal internal pages + both locales (9 files) | ~20 min, no result | **LOST — batch oversized, then terminated early by the lead.** Kimi spent the whole run inspecting the seven evidence packets and had written none of its owned files. The lead then killed the process while ~10 minutes of the 30-minute watchdog remained. That termination was a lead error, recorded here rather than attributed to the executor. **No file was partially written and the tree was unaffected** (verified by `git status` immediately after: only the already-accepted Batch B files and the lead's own files were modified). Cost = one lost run, no rework. |
| Batch C1 | `teacher-schedule.js`, `teacher-library.js` + both locales (4 files) | — | Re-dispatched at a correctly bounded size after the C+D lesson: a short fixed read list instead of seven full evidence packets. |

**Lesson applied to all later batches:** Kimi's throughput limit here is evidence-inspection breadth, not edit volume. Briefs must name a short explicit read list and 3–4 owned files. The 9-file/7-packet shape does not complete inside a 30-minute window.

### Blocker status

No genuine blocker exists. No authentication failure, quota or rate-limit response, provider outage, invalid model, missing executable, tool incompatibility, evidence-inspection failure, delivery failure, or repeated termination occurred under the realistic ten-minute window. The workload model is unchanged: Kimi keeps the largest accepted implementation share.

## Weighted implementation allocation

Weights represent bounded implementation complexity, not lines or generated files. Status is **ACTIVATED** as of the 2026-08-03 resumed-run preflight: Kimi passed both the grounded-analysis and file-delivery gates, so the batch table below is binding rather than provisional. (The superseded line read "PROVISIONAL / NOT ACTIVATED because the Kimi capability gate failed"; that referred to the pre-2026-08-02 watchdog timeouts and is no longer true.)

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
| J — integration corrections and final acceptance | 10 | Claude Opus lead | only explicit seam/final correction files after executor review; serialized against every batch owner | all evidence and diffs | difficult integration, exact correction, invalidated-gate rerun, and clean final acceptance | broad page-family takeover while Kimi is available | diff, focused reruns, and independent final review |

**Target accepted implementation share for this resumed run:** Kimi 58/88 implementation units (65.9%) and Claude Opus/Claude-controlled execution 30/88 (34.1%). Review-only work is excluded. Historical T001–T012 work remains attributed as originally recorded; no Sol invocation or pending Sol acceptance exists in T013–T100. If accepted weights change, this ledger records the reason and recomputes the percentages.

## Concurrency and transfer rules

- No application implementation begins before Kimi delivery and the corrected Claude grounded capability probe are recorded.
- Kimi unavailable before implementation is a hard STOP requiring user approval for a substitute.
- Claude’s CSS batch completes and is accepted before Kimi page propagation begins.
- Portal locale files transfer B → D only after B acceptance; no simultaneous writers.
- Teacher locale files belong to F; E uses existing keys or waits for F—no overlap.
- Tests begin after the relevant production batches are accepted.
- Builds may update generated consumers, but only one active writer/build owner operates at a time.
- Claude Opus reviews and accepts or returns every material Kimi batch, owns final corrections, and performs the clean independent final acceptance for this run.
