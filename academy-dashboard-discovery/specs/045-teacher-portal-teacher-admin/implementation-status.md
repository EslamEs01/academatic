# Implementation Status — Spec 045

**Status:** IN PROGRESS — application implementation STARTED and partially delivered; **NOT IMPLEMENTED**
**Branch:** `045-teacher-portal-teacher-admin`
**HEAD:** `32e51e5a8f8b89971b4aa253605c54cc96401d36` (unchanged this run — no Git operation was performed)
**Working tree:** dirty by design; all accepted work is left uncommitted for user review
**Application implementation:** started 2026-08-03; four batches delivered and accepted (A, B, C1, F-partial)

## Checkpoint reconciliation

The resumed run expected HEAD `722be1c`; actual HEAD was `32e51e5`. Investigated before any mutation:
`32e51e5` is purely the Spec-045 artifact commit — 33 files, all under
`specs/045-teacher-portal-teacher-admin/` plus `.specify/feature.json` and `AGENTS.md`, with **zero**
application, test, or generated files touched. The checkpoint is therefore valid and was preserved;
nothing was reset, discarded, or recreated. The previous session's own status file already recorded
13/100 with next task T014, matching the artifacts on disk.

## What is actually done

**Batch A — shared Teacher visual layer (Claude, T014/T015).** An additive `td-*` block appended to
`app/src/styles/app.css` after the `@layer components` close, matching the established `.cc-*` /
`.mr-*` / `.finm-*` precedent so Tailwind's purge cannot strip it. Four opt-in primitives —
`td-focus`, `td-meta`, `td-gates`, `td-actions` — plus a 390px containment guard and explicit
dark-theme handling. Zero existing selectors modified. Non-Teacher regression proven empirically:
the T014 build changed **only** the two CSS artifacts and **zero HTML pages**.

**Batch B — truthful portal home (Kimi, T016/T017).** Fixed the FR-012 defect: seven implemented
Teacher destinations were rendered as "soon" tiles. Fixed the FR-013/FR-041 defect: portal copy told
the Teacher that performance indicators live in the admin console, and labelled a button "Open
performance board" while it actually opened the Teacher's own reports page. Corrected the false
"arriving soon" quick-links hint.

**Batch C1 — schedule + library (Kimi, T021/T033/T034).** Grouped the stacked gate banners on both
pages into one calm `td-gates` block each; applied `td-focus`; implemented the evidence-required
client-side library search entirely through the existing shared `filterBar`/`facetAttrs`/`noResults`
mechanism, with no new hook, listener or dependency, and correctly declined to invent the reference
platform's category dropdown.

**Batch F (partial) — admin detail + performance (Claude, T048/T052).** `teacherActions()` adopts
`td-actions` and is reordered by intent, turning the fourteen-action 390px waterfall into a
two-column grid with the unavailable gates grouped last. `teacher-performance` moves the categorical
quality chip into the identity block, removing one stacked band per repeated record.

**Test work (Claude).** Two declared supersessions (S45-1, S45-2) and one additive guard (G45-1), all
registered in `mutation-ledger.md` with rationale and falsifying mutations. Both supersessions are
strictly stronger than what they replace; zero assertions were deleted or relaxed.

## Verified gates

Build PASS (115 HTML, 114 bodies) · smoke PASS (114 page loads) · a11y PASS (critical=0 serious=0) ·
domain audit PASS (9/9 sections) · 10 focused frames with 0 console errors and 0 horizontal overflow
at exactly 390px · `git diff --check` PASS · impact 0 pages added/removed, 14 bodies changed,
0 unrelated drift · 4 mutations run, 1 guard hole found and closed, residue 0.

## What is NOT done — outstanding work

- **Five Teacher portal pages untouched:** `teacher-students`, `teacher-outcomes`, `teacher-tasks`,
  `teacher-reports`, `teacher-profile` (T025–T032, T038–T040). The FR-017 evidenced student-context
  work on `teacher-students` in particular has not been implemented.
- **Admin directory untouched (T043–T047).** A confirmed FR-031 violation is still live in
  `app/src/js/pages/teachers.js`: `const avgUtil = Math.round(rows.reduce((a, r) => a + r.util, 0) / rows.length)`
  renders as a computed `%` summary card. Diagnosed and briefed, not yet fixed.
- **Twelve of sixteen mutations not run** (M45-01/02/05/08/09/10/11/12/13/14/15/16).
- **Full screenshot matrix not run** (`npm run screenshots`); only 10 focused frames were captured.
- Tasks T056–T062 (cross-page coherence and full visual matrix), T063–T066 (remaining guards),
  T067–T073 (full gate sweep), T090–T092 (residue/impact/reconciliation), T093–T100 (closure).

## Weighted accepted implementation share — deviation declared

| Executor | Accepted units | Share |
|---|---:|---:|
| Kimi K3 | 20 (Batch B = 10; Batch C1 = 10) | **53.3%** |
| Claude Opus | 17.5 (Batch A = 8; Batch F-partial = 6; protected tests = 3; lead whitespace correction = 0.5) | 46.7% |

Kimi holds the **largest** accepted share, but **53.3% is below the 65–75% target**, and that gap is
reported rather than papered over. The single cause is the lost Batch C+D run, which carried roughly
28 units of Kimi-owned work; had it landed, Kimi's share would sit near 70%. The loss was a lead
error (early termination), not an executor failure. **No Kimi work was rejected and no Kimi share was
transferred to Claude.** The outstanding work is predominantly Kimi-assigned — five portal pages plus
the admin directory — so completing the Spec restores the intended ratio without any re-planning.

Spec 045 remains **IN PROGRESS**. No task has been marked complete without both its implementation
and its verification being genuinely done.
**Tasks:** **35/100** truthfully complete — T001–T024 (portal home + schedule, delivered, verified and accepted), T033–T035 (library search), T048–T055 (admin detail + performance). 65 remain open. Each marked task carries a one-line evidence note in `tasks.md`; T049 and T053 are marked complete because zero mirrored locale changes were *required*, verified against the files.
**Targeted Visual Grounding:** PASS for EG-045-01–11 (inherited from the checkpoint; not re-run)
**Executor capability probes:** Kimi grounded analysis PASS (123.3s) and isolated file delivery PASS (16.8s), both re-verified on 2026-08-03; the Claude relay probe is retired rather than repeated, because Claude Opus implements in-session and is not a delegated subprocess

## Resolved executor gate

- Kimi Code is installed at `/home/mekky/.kimi-code/bin/kimi` (0.31.1) with configured model `tokenrouter/kimi-k3-free`.
- The 55.178s and 120.224s attempts were local watchdog expirations, not provider failures.
- A fair grounded EG-045-07 probe completed in 408.126s, exit 0, with exact evidence citations and no unsupported invention.
- A resumed isolated delivery probe completed in 333.516s, exit 0, with one deterministic edit; the disposable file was removed and residue is zero.
- Claude Code is installed/authenticated and its Opus/high read-only relay completed in 28.894s with `readOnlyViolation=false`, but its report contained only an attempted tool invocation and none of the requested evidence. Sol rejected it as ungrounded.
- No `app/src`, `app/public`, or `app/tests` file changed during preflight.

Kimi is available as the primary implementation executor. The resumed run assigns 58/88 weighted implementation units (65.9%) to Kimi and 30/88 (34.1%) to Claude Opus/Claude-controlled execution. The prior Sol-labeled closure roles are superseded for T013–T100 by the user’s explicit Claude-lead authority.

Spec 045 remains IN PROGRESS until every task, gate, mutation, screenshot review, impact count, executor contribution, and Claude Opus independent review is truthfully complete.
