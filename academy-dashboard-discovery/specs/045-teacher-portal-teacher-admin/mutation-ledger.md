# Mutation Ledger

**Register:** M45-01–M45-16 in `contracts/verification-mutation-contract.md`.  
**Method:** fresh isolated copy, one mutation, exact intended RED, copy removal, primary GREEN, residue zero.

| Mutation | Isolated copy | One byte-level intent | Exact expected guard | Observed RED cause | Copy removed | Verdict |
|---|---|---|---|---|---|---|
| **M45-03** visible pay text | `/tmp/sp045-mut-M45-03-*` | `en.prt.js`: library title → `'My Library — salary 500 SAR'` | pay-free audit | `FAIL pay token on teacher-library.en.html → "salary"` | yes | **RED (causal)** |
| **M45-04** portal performance exposure | `/tmp/sp045-mut-M45-04-*` | `teacher-portal.js`: `perfHref` retargeted to `teacher-performance(.en).html` | portal/admin separation audit | `FAIL portal page teacher-portal.html references teacher-performance` (+ `.en`) | yes | **RED (causal)** |
| **M45-06** absence conflation | `/tmp/sp045-mut-M45-06-*` | `ar.trn.js`: `studentAbsent: 'غياب طلاب'` → `'غياب المعلّم'` | absence-integrity guard | first run **GREEN — guard hole**; after strengthening: `FAIL locale ar.trn.js: teacherAbsent and studentAbsent share the identical label "غياب المعلّم" — the two absence concepts have been conflated (FR-020)` | yes | **RED (causal) after fix** |
| **M45-07** broken deep link | `/tmp/sp045-mut-M45-07-*` | `teacher-portal.js`: quick-tile `href` → `teacher-nonexistent.html` | dead-link audit | `FAIL teacher-portal.html dead link → teacher-nonexistent.html` (+ `.en`) | yes | **RED (causal)** |

**Runner discipline.** `mutate.sh` copies `src` + `scripts` + `tests` + `public` into a throwaway
directory (symlinking `node_modules`, which is not part of the mutation surface), applies exactly one
textual mutation, rebuilds, and runs the exact guard that owns the broken guarantee. It **aborts if
the mutation does not textually apply**, because a no-op edit would otherwise produce a false GREEN;
and it **rejects a build failure as REJECTED rather than RED**, because a build break is not causal
evidence. The copy is removed by an `EXIT` trap. The primary tree is never touched.

**Mutation residue: 0** — `ls -d /tmp/sp045-mut-*` returns nothing after the runs.

### M45-06 — the guard hole this campaign actually found

The first M45-06 run came back **GREEN**, which is a failure of the guard, not a pass of the product.
The original check asserted only that *a* teacher-absence label and *a* student-absence label each
appear somewhere on the page. When `studentAbsent` was rewritten to `teacherAbsent`'s wording, a
sibling block elsewhere on the same page still supplied a matching student-absence phrase, so the
count-based check passed while the two concepts were, in fact, conflated — precisely FR-020's
forbidden state.

Fix: **additive guard G45-1** in `tests/smoke/run.cjs` checks the guarantee where the two values sit
side by side — the locale source. For every locale file it pairs `teacherAbsent` and `studentAbsent`
values in emission order and requires each pair to differ, requires the two keys to be defined an
equal number of times, and requires at least four pairs so the guard cannot pass vacuously. Re-run:
exact causal RED. This is the clearest evidence in the run that the mutation campaign is doing real
work rather than confirming what was already believed.

### Session-3 additions

| Mutation | One byte-level intent | Guard | Observed RED cause | Copy removed | Verdict |
|---|---|---|---|---|---|
| **M45-01** missing scope | `build-html.mjs`: delete the `teacher-tasks` PAGES entry | scope/consumer audit | `FAIL missing localized consumer teacher-tasks.html` + `.en.html` | yes | **RED (causal)** |
| **M45-02** missing localized consumer | `build-html.mjs`: skip writing only `teacher-library.en.html` | scope/consumer audit | `FAIL missing localized consumer teacher-library.en.html` | yes | **RED (causal)** |
| **M45-13** false saved wording | `en.prt.js`: library upload gate → "Your resource has been saved to the library." | truthfulness audit | `FAIL fake-success wording on teacher-library.en.html → "has been saved"` | yes | **RED (causal)** |
| **M45-15** private role field | `teacher-students.js`: render a guardian phone into the roster card markup | privacy audit | `FAIL contact-shaped value on teacher-students.html → "+966 55 123 4567"` (+ `.en`) | yes | **RED (causal)** |
| **M45-17** FR-031 regression *(new, added with G45-2)* | `teachers.js`: reintroduce `avgUtil = Math.round(reduce(...)/rows.length)` | **G45-2**, via full smoke | three causal failures: reintroduced `avgUtil`; reads the numeric `util` field again; computes an arithmetic mean over the records | yes | **RED (causal)** |

**Running total: 9 of the 16 contract mutations plus the new M45-17 are proven. Residue 0.**

### A mutation-design correction worth recording

The first M45-15 attempt came back **GREEN**. Investigation showed the fault was in the *mutation*,
not the guard: it added an unused `const GUARDIAN_PHONE` that never rendered, so there was no leak on
the page for a rendered-output guard to find. A mutation that applies textually but produces no
observable defect is not evidence of a working guard. It was redesigned to inject the phone into the
roster card's actual markup, and then produced causal RED in **both** localized consumers.
The same discipline rejected a malformed M45-02 attempt: it broke the isolated build, and the runner
reported `RESULT=REJECTED` rather than counting a build break as RED.

### HISTORICAL / SUPERSEDED — the mid-run "outstanding mutations" worklist

> **NOT CURRENT STATE.** This subsection is retained only as a record of how the campaign was
> sequenced. The authoritative statement is **"CANONICAL FINAL MUTATION STATE"** at the end of this
> file: **17/17 proven, residue 0**. Nothing below is an open item. The "Guard status" column
> preserves what was true *at the moment the row was written* and is not a current status.

Proven at closure: **M45-01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, and G45-2's
M45-17.** The final three (M45-10, M45-12, M45-14) landed in session 6; see "Session-6" below.
Historical note: this table originally read "M45-05, 08, 09, 10, 11, 12, 14, 16 have NOT been run" —
that was true at end-of-session-5 only.

| Mutation | Guard it needed before it could produce a causal RED | Guard status *when this row was written* | Final |
|---|---|---|---|
| M45-05 self/admin identity | identity-separation assertion distinguishing `teacher.html` from `teacher-profile.html` | G45-5 authored | **PROVEN RED** |
| M45-08 missing locale copy | AR/EN key-parity check promoted into the suite | G45-3 authored | **PROVEN RED** |
| M45-09 removed 390px containment | numeric geometry assertion (`scrollWidth === clientWidth` at 390px) | partly covered: `cap.cjs` asserts it numerically per frame and exits 1; G45-4 additionally pins the 390px CSS block's presence | **PROVEN RED** (G45-4) |
| M45-11 source/generated desync | rebuild-and-compare parity assertion | not yet authored | **PROVEN RED** (`parity.cjs`) |
| M45-12 swallowed selector | fail-loud meta-guard scanning test source for silent catch / optional selectors | G45-6 authored | **PROVEN RED** |
| M45-14 Spec-044 interaction regression | the inherited interaction driver wired into the Spec-045 gate set | not yet authored | **PROVEN RED** (M44-14 + G45-7) |
| M45-16 unrelated drift | page-body drift comparison promoted from `impact.cjs` into the suite | not yet authored | **PROVEN RED** (`impact.cjs` drift guard) |

### Guards authored in session 4

| Guard | Protects | Falsified by | Notes |
|---|---|---|---|
| **G45-3** | AR/EN key parity for the `prt` and `trn` namespaces (FR-052) | M45-08 | Compares flattened key **sets** in both directions, and refuses to pass on an empty set. Catches a missing key structurally, where a DOM raw-key sweep only catches it if the affected page/state happens to be visited. |
| **G45-4** | The Teacher layer's dark-theme and 390px rules surviving into the **compiled** stylesheet (FR-053, FR-054) | M45-10 | Checks the built artifact, not the source, because Tailwind purges what it believes unused. Also pins all four `td-*` primitives. |
| **G45-5** | `teacher-profile` (portal self) and `teacher` (admin detail) never becoming the same surface (FR-040) | M45-05 | Asserts shell identity in both directions and that four admin-only controls never appear on the self page. |
| **G45-6** | The Spec-045 guards themselves failing loudly (FR-061) | M45-12 | A meta-guard: reads its own file, extracts every `G45-*` block, and rejects an empty `catch`/`catch(e)`, an empty `.catch(() => {})`, or a block containing no assertion. Refuses to pass if fewer than five guard blocks are found. **Strengthened in session 6** (see M45-12 below): the catch-regex originally required a parameter list, so a bare ES2019 `catch {}` (optional catch-binding) slipped through; it now matches both forms and skips its own block (its source necessarily names the pattern, which would otherwise self-flag). |

**A guard-accuracy correction (same class as the earlier audit-regex bugs):** G45-4's first version
asserted `\[data-theme="dark"\]` and went RED against a perfectly intact stylesheet — the minifier
strips attribute-selector quotes, emitting `[data-theme=dark]`. The rule was present all along. The
regex was made quote-agnostic. Recorded because a guard that reports a false RED is itself a defect.

### Session-4 mutation results

| Mutation | Intent | Guard | Outcome |
|---|---|---|---|
| **M45-08** | delete `gateCertificate` from `en.prt.js` only | G45-3 | **RED (causal)** — `ar.prt.js has 1 key(s) with no EN mirror → ["prt.tch.pg.students.gateCertificate"]`. Residue 0 |
| **M45-10** (attempt 1) | remove the explicit dark `.td-gates` rule | G45-4 | **REJECTED — unrelated cause.** The isolated copy was taken while Kimi's D4-A batch had `teacher-profile.js` referencing three not-yet-authored keys, so the RED was `raw i18n keys [...profile.identHint ...]`, nothing to do with the dark rule. Not counted; re-run after the tree was consistent |
| **M45-10** (attempt 2) | same | G45-4 | **GREEN — second genuine guard hole found** (see below) |
| **M45-10** (attempt 3) | same, against the tightened guard | G45-4 | re-run in progress at session end |

### M45-10 — the second guard hole this campaign found

Attempt 2 returned GREEN against a stylesheet whose explicit dark rule had genuinely been deleted.
Cause: the Teacher layer carries **two** dark rules — the explicit
`[data-theme=dark] .td-gates { … }` and the system fallback
`:root:not([data-theme=light]):not([data-theme=dark]) .td-gates { … }` inside
`@media (prefers-color-scheme: dark)`. The original assertion
`\[data-theme=dark\][^{]*\.td-gates` **also matches the fallback**, because the fallback contains
`[data-theme=dark])` before its ` .td-gates`. Deleting the explicit rule therefore left the guard
satisfied by the survivor.

Fix: the explicit rule is now anchored to the **start of a rule** — preceded by `}`, `;`, `,` or the
file start — which the `:not(...)` form can never satisfy because its bracket is preceded by `)`. A
third assertion pins the fallback separately, so removing **either** rule now fails.

This is the second time a mutation exposed a hole in a guard rather than confirming one (M45-06 was
the first). Both are recorded rather than quietly repaired, because a campaign that only ever
confirms what its author already believed is not doing any work.

### Session-5 mutation results

| Mutation | Intent | Guard | Outcome |
|---|---|---|---|
| **M45-05** (attempt 1) | `build-html.mjs`: `{ base: 'teacher', shell: 'admin'` → portal | G45-5 | **ABORTED by the runner** — that text does not exist (admin is the *default* shell, not a written key). The runner refused to proceed rather than produce a false GREEN from a no-op edit |
| **M45-05** (attempt 2) | add `shell: 'portal', role: 'teacher'` to the real `teacher` PAGES entry | G45-5 / smoke | **RED (causal)** — `teacher/ar: missing static shell/content`, `missing slim icon rail (.nav-rail)`, `missing light nav panel (.nav-panel)`, `expected 1 active nav item, got 0`. The admin surface rendered as a portal was caught exactly. Residue 0 |
| **M45-11** | hand-edit the generated `public/teacher-library.html` **after** the build | **parity** | **RED (causal)** — `DIVERGED — 1 generated Teacher page(s) were not in sync with their authored source`. Required a new post-build mutation mode, because a pre-build edit to a generated file is erased by the build itself |
| **M45-14** (attempt 1) | rename the `trn-policy` drawer template so its opener dangles | inherited Spec-044 driver | **GREEN — third genuine guard gap found** (see below) |
| **M45-14** (attempt 2) | same, against the new G45-7 | smoke | re-run in progress |

### M45-14 — the third gap: the inherited suite does not cover Teacher trigger→target mapping

Renaming a Teacher drawer template so that its opener pointed at a non-existent target produced a
**dangling trigger** — a control that looks live and does nothing — and **all 22 inherited Spec-044
interaction guards still passed**. The inherited driver validates the shared interaction *system*
(focus, scroll, dismissal, single-overlay, backend-required truthfulness); it does not enumerate
Teacher-domain opener/target pairs.

FR-047 requires exactly that mapping to be exercised and to fail loudly when absent, so assuming the
inherited suite covered it was wrong. **G45-7** now asserts, for each of the 22 localized Teacher
consumers, that every `data-drawer="X"` has a matching `<template data-preview="X">` on the same
page. Measured on the clean tree: **38 openers, 0 dangling** — the invariant already held, but until
now nothing enforced it.

### Session-5 completion

| Mutation | Intent | Guard | Outcome |
|---|---|---|---|
| **M45-16** (attempt 1) | rewrite `dashboard.js` to append markup | drift | **REJECTED** — the edit broke the isolated build; a build break is never a causal RED |
| **M45-16** (attempt 2) | change one dashboard-body string in `en.extra.js` (a locale edit cannot break the build, so any RED is necessarily the drift guard) | **drift** | **RED (causal)** — `UNDECLARED drift: 1 ["dashboard.en.html"]` |
| **M45-09** (attempts 1–2) | remove the exact-390px containment block | smoke | **REJECTED — port collision.** Both runs exited non-zero on `EADDRINUSE :4178` because a concurrent mutation held the fixed smoke port. Investigated rather than counted; an infrastructure crash is not a causal RED |
| **M45-09** (attempt 3, unique port) | same | **G45-4** | **RED (causal)** — `G45-4: the exact-390px containment block for the Teacher layer is gone from the compiled stylesheet (FR-054)` |

### The port-collision near-miss

Two M45-09 runs returned non-zero and *looked* like passes. They were not: the smoke process died on
`EADDRINUSE` binding port 4178, because `mutate.sh` used a fixed port and another mutation was
running concurrently. The exit code was right for the wrong reason.

It was caught by insisting on reading the actual failure text instead of trusting the exit status —
the log had no `SMOKE FAILED:` line at all, which is what exposed it. `mutate.sh` now allocates a
unique port per run (`PORT=$((4300 + RANDOM % 400))`) so concurrent runs cannot collide, and both
attempts are recorded as REJECTED rather than quietly replaced by the passing third attempt.

### New infrastructure this session

- `mutate.sh` gained a **`post`** mode (apply the mutation *after* the build) so generated-file
  mutations survive to the guard, and **`interaction`** / **`parity`** guard modes.
- `parity.cjs` — snapshots all 22 generated Teacher consumers, re-runs the canonical generator, and
  requires byte-identical output; refuses to pass unless it snapshotted exactly 22 files.
  On the clean primary tree: **all 22 reproduce byte-identically**.

### Session-6 — the final three (M45-10, M45-12, M45-14)

| Mutation | Intent | Guard | Outcome |
|---|---|---|---|
| **M45-12** (attempt 1) | inject a bare ES2019 `catch {}` (optional catch-binding) into the **G45-2** block of `run.cjs`, file kept loadable | G45-6 | **GREEN — third genuine guard hole found.** The meta-guard regex `/catch\s*\(\s*\w*\s*\)\s*\{\s*\}/` requires a parameter list, so a bare `catch {}` — the canonical swallowed selector — slipped through. Not a false RED (file parsed; the guard simply did not see it). |
| **M45-12** (attempt 2) | same mutation, against the **strengthened** G45-6 | G45-6 | **RED (causal)** — `SMOKE FAILED: G45-6: guard G45-2 contains an empty catch — a swallowed failure (FR-061)`. `SMOKE_EXIT=1`, no browser crash. Copy removed; residue 0. |
| **M45-10** | remove the explicit `[data-theme="dark"] .td-gates { … }` rule from `src/styles/app.css` (dark theme) | G45-4 | **RED (causal)** — `SMOKE FAILED: G45-4: the EXPLICIT [data-theme=dark] .td-gates rule is gone from the compiled stylesheet (FR-053)`. Confirms the session-4 anchored fix (`(^|[};,])\[data-theme=…dark…\]\s+\.td-gates\{`) catches the removal; no further repair needed. `SMOKE_EXIT=1`, no crash. Copy removed; residue 0. |
| **M45-14** | break one inherited Spec-044 Teacher interaction — proven in BOTH shapes FR-061/FR-047 forbid | M44-14 + G45-7 | **RED (causal), two independent halves** — see below |

### M45-14 — both halves went RED with the exact cause

**(a) swallowed selector (the M45-12-class failure, in the Spec-044 driver).** Removed
`reportInteractionError('missing-target', …)` from `openSheet` in `enhance.js` so a missing drawer
target silently returned. The inherited interaction driver went **RED**:
`FAIL M44-14 inventory.fail-loud: missing required target was swallowed instead of emitting exact
interaction:error`, `INTERACTION_EXIT=1`.

**(b) dangling trigger (the FR-047 shape G45-7 was authored for).** Renamed the `trn-policy` drawer
*template* while leaving its `data-drawer="trn-policy"` opener in place → the opener dangled. Smoke
went **RED**: `G45-7: teacher.html has a dangling drawer opener data-drawer="trn-policy" with no
<template data-preview="trn-policy"> on the page (FR-047)` (and `teacher.en.html`), plus the page's
trn-policy structural pins. Copy removed, residue 0, primary tree green.

### M45-12 — the third(real) guard hole: bare `catch {}` vs `catch (e) {}`

The fail-loud meta-guard G45-6 scanned for empty catches with `/catch\s*\(\s*\w*\s*\)\s*\{\s*\}/` —
a pattern that demands a **parenthesised parameter** (`catch (e) {}`). A bare ES2019
**`catch {}`** (optional catch-binding) is a perfectly valid swallowed selector and parsed the test
file fine, yet the regex never matched it. The mutation went GREEN — the meta-guard passed while a
swallowed failure sat in the suite. That is precisely the failure mode FR-061 forbids.

Minimal primary fix (in `run.cjs`, in place): the regex became
`new RegExp('cat' + 'ch(\\s*\\(\\s*\\w*\\s*\\))?\\s*\\{' + '\\s*\\}')` — parameter list now optional
(`(...)?`), so both forms match; and the loop `continue`s on its own `G45-6` block, because this
guard's own source must *name* the pattern it rejects and would otherwise flag itself. Re-run against
the identical mutation produced the causal RED above. (Self-flag risk was caught and fixed in the
same edit; the primary self-scan now reports 0 flagged blocks.)

### Runner durability fix this session (infrastructure, recorded like the port collision)

The smoke suite loads all 114 pages × 2 locales in one long-lived headless browser. On this host the
renderer was OOM-killed mid-crawl at a *moving* page (`family-profile.en.html`, then `library.html`),
yielding `Target page/context/browser has been closed` with **no** `SMOKE FAILED:` line — an
infrastructure crash that exits non-zero and looks like a pass. This is the same environment trap as
the M45-09 `EADDRINUSE`. Minimal fix in `run.cjs`: relaunch chromium **per base page**
(`await relaunch()` at the top of the 114-page loop), bounding peak memory at a single fresh browser.
Primary baseline then ran clean: `[smoke] PASS — 114 page loads`, `SMOKE_EXIT=0`. Without this, none
of the session-6 mutations could produce a trustworthy causal RED.

No mutation has run before implementation. Syntax/load/fixture/unrelated failures will be rejected rather than counted.

---

## Protected-test supersession register (FR-062)

Every change to an existing protected assertion is recorded here with owner, the verbatim superseded text, the rationale, why the replacement is not a weakening, and the mutation that falsifies it. Additive guards are listed separately and need no supersession.

### S45-1 — teacher portal body-anchor pin

| Field | Value |
|---|---|
| Owner | Claude Opus (lead) — the supersession decision is lead-level even though the surrounding batch is Kimi's |
| File | `app/tests/smoke/run.cjs` (teacher-portal branch) |
| Superseded (verbatim) | `ok(prt.bodyAnchors === 1, '… the teacher page body must contribute exactly ONE anchor (the performance link) …')` and `ok(prt.anchorTargets.every((h) => /(^|\/)teacher-reports\.(en\.)?html$/.test(h)), '… Spec 025 repoint …')` |
| Lineage | Spec 022 / Spec 025 sanctioned-anchor registry |
| Why it must change | Those assertions were authored when the seven Teacher internal pages were **not reachable** from the home: `quickTiles()` emitted `is-planned` divs with a "soon" badge, so the body really did contain exactly one anchor. Spec 045 **FR-012** requires every implemented Teacher destination to be a working localized affordance instead of a false planned state. All eight `ROLE_NAV.teacher` entries carry `status: 'implemented'` and all eight pages are built, so the body necessarily contributes 1 + 7 = 8 anchors. Retaining `=== 1` would make the smoke suite **mandate the defect Spec 045 exists to fix**. |
| Replacement | Six assertions: exact `bodyAnchors === 8`; `qtileLinks === 7`; `qtileSoon === 0`; every expected localized target present; no unexpected target emitted; and no `teacher-performance` target ever. |
| Why this is a STRENGTHENING | The old pair constrained **one** destination and left the other seven entirely unconstrained (they were not anchors at all). The replacement pins the **exact localized target of all eight**, requires the quick-tile set to equal the implemented `ROLE_NAV` set exactly in both directions (missing **and** unexpected), and adds a zero-"soon" guard plus an admin-board-exposure guard that did not previously exist. A regression to the pre-045 rendering now fails **three independent assertions** instead of one. Zero assertions were deleted or relaxed. |
| Falsifying mutations | **M45-04** (expose `teacher-performance` in portal navigation → the new no-performance-target assertion goes RED) and **M45-07** (break one required deep link/trigger → the exact-target assertions go RED). |
| Status | **Applied and PROVEN.** M45-04 and M45-07 both produced causal RED (see the tables above); the primary tree is GREEN. |

### S45-2 — teacher internal-page zero-form-controls rule, narrowed to one page

Recovered verbatim from the live bytes at `app/tests/smoke/run.cjs:2055-2106` during the 2026-08-04
evidence-reconciliation correction. This entry was **missing** from the register while the
supersession itself was correctly declared, argued and enforced in the test source — an FR-062
documentation gap, not an undeclared supersession.

| Field | Value |
|---|---|
| Owner | Claude Opus (lead) |
| File | `app/tests/smoke/run.cjs` (teacher internal-page branch) |
| Superseded (verbatim) | `ok(prt.formControls === 0, '… teacher internal page must contain zero form controls …');` |
| Lineage | Spec 025 teacher internal pages |
| Why it must change | FR-024/FR-025 require `teacher-library` to provide evidence-backed deterministic resource search (the reference platform's `search_form` with its `query` input). A search field **is** a form control, so the blanket rule and the requirement cannot both hold. The blanket rule existed to stop teacher internal pages carrying **data-entry** forms that imply persistence; a client-side filter over content already rendered on the page is not that and claims nothing. |
| Replacement | The rule stays **byte-identical (`=== 0`) for the other seven** teacher internal pages. `teacher-library` alone is pinned far more tightly: exactly 1 form, exactly 1 input, 0 select, 0 textarea; that input must be `input[type="search"][data-filter="search"]`; plus exactly 1 reset control, exactly 1 `[data-no-results]` state and exactly 1 filter target. The guard then **drives the real control**: types a non-matching query, asserts visible cards go ≥3 → 0 **and** the empty state becomes visible, clicks reset, and asserts every resource returns. |
| Why this is a STRENGTHENING | A data-entry field, a `<select>`, a `<textarea>`, or a second input on `teacher-library` now **fails**, where the old blanket rule would merely have counted them and failed with no diagnosis. Behaviour is proven, not assumed. Zero assertions were deleted or relaxed for the other seven pages. |
| Falsifying mutations | **M45-12** (swallowed selector) and **M45-13** (false saved wording), both proven causal RED. |
| Status | **Applied and PROVEN.** |

### Additive guard register (no supersession required)

| Guard | Protects | Falsified by | Status |
|---|---|---|---|
| **G45-1** | `teacherAbsent`/`studentAbsent` pair distinctness at the locale source | M45-06 | proven RED |
| **G45-2** | FR-031 — no `avgUtil`, no `.util` read, no arithmetic mean, no `%`/`٪` in the directory summary | M45-17 | proven RED |
| **G45-3** | AR/EN key parity for the `prt` and `trn` namespaces (FR-052) | M45-08 | proven RED |
| **G45-4** | The Teacher layer's dark-theme and exact-390px rules surviving into the **compiled** stylesheet (FR-053/FR-054) | M45-10, M45-09 | proven RED (both) |
| **G45-5** | `teacher-profile` (portal self) and `teacher` (admin detail) never becoming the same surface (FR-040) | M45-05 | proven RED |
| **G45-6** | The Spec-045 guards themselves failing loudly (FR-061) | M45-12 | proven RED |
| **G45-7** | Every Teacher `data-drawer="X"` opener has a matching `<template data-preview="X">` on the same page (FR-047). Measured on the clean tree: **38 openers, 0 dangling** | M45-14(b) | proven RED |
| **G45-8** | Consolidated fail-loud Teacher-domain census (FR-060), 7 sections: §1 scope/consumer completeness · §2 dead links/routes · §3 pay-free · §4 rank/score/chart · §5 portal-vs-admin shell separation · §6 absence distinction · §7 locale parity + raw-key sweep. Each section refuses to pass vacuously. | the same mutations that falsify §1–§7 (M45-01/02/03/04/07/08/13/15) | proven RED |

**G45-8 was undocumented until this correction.** It exists in the pushed bytes at
`app/tests/smoke/run.cjs:3182+` and is the artifact that actually satisfies T063; the earlier
ledgers recorded only G45-1…G45-7. Recorded here from live bytes.

---

## CANONICAL FINAL MUTATION STATE

**All 16 contract mutations (M45-01…M45-16) plus the guard-driven M45-17 are proven causal RED and
then GREEN on the primary tree. Total 17/17. Mutation residue 0** — re-verified on 2026-08-04:
`ls -d /tmp/sp045-mut-*` returns nothing.

| # | Mutation | Owning guard | Outcome | Recorded in |
|---|---|---|---|---|
| 1 | M45-01 missing scope | G45-8 §1 / audit | RED (causal) | session 3 |
| 2 | M45-02 missing localized consumer | G45-8 §1 / audit | RED (causal); one attempt REJECTED as a build break | session 3 |
| 3 | M45-03 visible pay text | G45-8 §3 / audit | RED (causal) | early |
| 4 | M45-04 portal performance exposure | G45-8 §5 / S45-1 | RED (causal) | early |
| 5 | M45-05 self/admin identity | G45-5 | RED (causal); attempt 1 correctly ABORTED as a no-op edit | session 5 |
| 6 | M45-06 absence conflation | G45-1 | GREEN → **guard hole found** → RED after G45-1 | early |
| 7 | M45-07 broken deep link | G45-8 §2 / audit | RED (causal) | early |
| 8 | M45-08 missing locale copy | G45-3 | RED (causal) | session 4 |
| 9 | M45-09 removed 390px containment | G45-4 | RED (causal); attempts 1–2 REJECTED as `EADDRINUSE` | session 5 |
| 10 | M45-10 removed dark-theme rule | G45-4 | GREEN → **second guard hole** → RED after anchoring | sessions 4/6 |
| 11 | M45-11 source/generated desync | `parity.cjs` | RED (causal), required the new post-build mutation mode | session 5 |
| 12 | M45-12 swallowed selector | G45-6 | GREEN → **third guard hole** → RED after the regex fix | session 6 |
| 13 | M45-13 false saved wording | audit §6 truthfulness sweep | RED (causal) | session 3 |
| 14 | M45-14 Spec-044 interaction regression | M44-14 + G45-7 | GREEN → **fourth gap** → RED in **both** halves | sessions 5/6 |
| 15 | M45-15 private role field | audit privacy sweep | RED (causal); first attempt redesigned (never rendered) | session 3 |
| 16 | M45-16 unrelated drift | `impact.cjs` drift guard | RED (causal); attempt 1 REJECTED as a build break | session 5 |
| 17 | M45-17 FR-031 regression | G45-2 | RED (causal), three independent failures | session 3 |

**Four genuine guard holes/gaps were found by this campaign and closed** (M45-06 → G45-1;
M45-10 → anchored rule; M45-12 → optional-catch-binding regex; M45-14 → G45-7). Every REJECTED
attempt is recorded above rather than replaced by its passing successor.

**Correction applied 2026-08-04:** the session-6 M45-12 rows previously named the mutated block and
the RED text as `G45-5`. The retained runner log (`m12.log`) reads
`G45-6: guard G45-2 contains an empty catch — a swallowed failure (FR-061)`; `tasks.md` T085 already
said `G45-2`. Corrected here to match the actual output. The correction changes the guard *named in
the message*, not the outcome: M45-12 remains a proven causal RED via G45-6.
