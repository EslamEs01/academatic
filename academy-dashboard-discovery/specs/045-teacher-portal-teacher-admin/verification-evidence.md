# Verification Evidence

Pre-implementation evidence is captured in `baseline-ledger.md`. Post-implementation results will be appended only from live command output and accepted manual review:

**Superseded header (2026-08-02):** "Executor preflight is complete but failed its go/no-go condition." Superseded by the 2026-08-03 resumed-run preflight, which PASSED on both grounded analysis and file delivery (`assignment-ledger.md`).

## Gate results — resumed run 2026-08-03

Recorded only from live command output. "partial" means the gate ran and passed on the delivered scope but the Spec is not yet feature-complete, so the gate must run again at closure.

| Gate | Command/evidence | Result | Final |
|---|---|---|---|
| Build | `npm run build` | **PASS** — 114 static pages + `index.html` + `.nojekyll`; 115 HTML total; exit 0 | partial |
| Domain audit | `sp045-audit.cjs` (9 sections, fail-loud, exit 1 on any violation) | **PASS** — all 9 sections; see breakdown below | partial |
| Smoke | `npm run test:smoke` | **PASS** — 114 page loads, no raw keys / external requests / dead buttons / unexplained disabled controls | partial |
| Accessibility | `npm run test:a11y` | **PASS** — `critical=0 serious=0` | partial |
| Focused screenshots | `cap.cjs`, 10 frames incl. exact-390px geometry probe | **PASS** — 10 captured, **0 console errors**, **0 horizontal overflow** (`scrollW === clientW` on every frame) | partial |
| Source/generated parity | canonical build re-run, byte comparison | **PASS** — rebuilding produces no further diff; every generated change traces to an authored change | partial |
| Impact | `impact.cjs` strict `#page-body` comparison against committed `HEAD` | **PASS** — 115 files, 0 added, 0 removed, 14 bodies changed, 100 unchanged | partial |
| Whitespace | `git diff --check -- academy-dashboard-discovery/app` | **PASS** — clean (one real trailing-whitespace defect was found and fixed; see `impact-ledger.md`) | partial |
| Mutations | isolated M45 runs | **4 run, 1 guard hole found and closed**; the remaining 12 are outstanding | no |

### Domain audit breakdown (all PASS)

1. 11 scopes / 22 localized consumers present with a `#page-body`.
2. **0** user-visible pay tokens across 22 consumers.
3. **0** non-negated score/rank/leaderboard/percentile tokens; **0** chart/`<canvas>`.
4. **0** `teacher-performance` references in any of the 16 portal consumers.
5. `teacherAbsent`/`studentAbsent` distinct on all four admin consumers (`teacher` 4/4 AR and EN; `teacher-performance` 17/18 AR, 17/17 EN).
6. **0** fake saved/sent/deleted/created claims.
7. **188** in-body relative links all resolve; **0** `href="#"`.
8. Quick tiles: 7 real links / 0 "soon" badges in both locales.
9. **0** email/phone-shaped values outside the `teacher-profile` own-contact allowance.

## Session-4 gate run — all eleven Teacher scopes implemented

| Gate | Result |
|---|---|
| Build | **PASS** — 114 static pages + index; 115 HTML |
| Smoke | **PASS** — 114 page loads, with S45-1, S45-2 and G45-1…G45-6 all active |
| Accessibility | **PASS** — `critical=0 serious=0`, re-run after all five new pages landed |
| Domain audit | **PASS** — 9/9 sections |
| Raw-key sweep | **0** raw dotted keys on any Teacher page in either locale |
| Locale parity | exact — `prt` and `trn` mirrored in both directions |
| Screenshots | **65 frames** this run; **0 console errors, 0 horizontal overflow** (`scrollW === clientW` on every 390px frame) |
| Impact vs `32e51e5` | 115 HTML, **0 added / 0 removed**, 26 bodies changed (22 Teacher = all 11 scopes × AR/EN, 4 declared collateral), 88 unchanged, **unrelated drift 0** |
| Whitespace | **PASS** — `git diff --check` exit 0 |
| Mutations | **11 proven causal RED** (M45-01/02/03/04/06/07/08/10/13/15/17); residue **0** |

### Frames Claude personally opened this session

`m-lib-ar-light-390` (td-gates group + working search) · `m-tchr-en-light-390` (LTR action grid) ·
`m-sched-en-light-390` (LTR td-focus edge + gate group) · `m-dir-ar-light-390` (FR-031 count card) ·
`m-stu-ar-light-390` (four grouped gates, privacy-safe roster) · `m-tsk-en-light-390` (td-meta fold) ·
`m-rep-en-light-390` (authored counts, five rubric lines, no grades) ·
`m-prf-ar-light-390` (own-contact allowance, three gates, zero admin controls).

### Guards added this session

**G45-3** locale key parity · **G45-4** dark-theme + 390px rules in the compiled stylesheet ·
**G45-5** self/admin identity separation · **G45-6** fail-loud meta-guard over the Spec-045 guards.

## Session-3 gate re-run (after the FR-031 fix)

| Gate | Result |
|---|---|
| Build | **PASS** — 114 static pages + index; 115 HTML |
| Smoke | **PASS** — 114 page loads, with S45-1, S45-2, G45-1 **and the new G45-2** all active |
| Accessibility | **PASS** — `critical=0 serious=0`, re-run after `teachers.html` changed |
| Domain audit | **PASS** — 9/9 sections |
| Locale parity | **exact** — `prt` 663/663, `trn` 220/220, zero divergence in either direction |
| Screenshots | 30 further frames (25-frame matrix for the five accepted scopes + 5 directory frames); **0 console errors, 0 horizontal overflow**; 40 frames total this run |
| Impact vs `32e51e5` | 115 HTML, **0 added / 0 removed**, 16 bodies changed, 98 unchanged |
| Whitespace | **PASS** — `git diff --check` exit 0 |
| Mutations | 9 of 16 contract mutations + the new M45-17 proven causal RED; residue 0 |

### FR-031 closure evidence

`avgUtil` and its percentage card are gone from `pages/teachers.js`. The third summary card is a
plain count of teachers in the authored `high` workload band. Verified four ways: source (`avgUtil`
absent, `.util` unread, no `reduce(...)/length` mean), rendered output (**no `%` or `٪` in either
localized summary row**), visual (AR 390px shows «٢ معلّمون بحِمل مرتفع», and exactly two teachers on
the page carry «حِمل مرتفع», so the count is truthful), and mutation (**M45-17** reintroduces the mean
and G45-2 fires three causal assertions).

### Audit-accuracy corrections (FR-061)

The audit's first run produced four findings, **all four of which were bugs in the audit itself, not product defects**. They are recorded because a guard that reports an unrelated RED is itself a defect:

- `/SAR/i` matched the teacher persona name **"Sara"** → currency codes are now `\b`-anchored.
- Arabic student-absence renders «غياب طلاب», not only the shadda form → both orthographies accepted.
- "no computed rating" and "display only, no scores" are the product **truthfully denying** a ranking → negated forms excluded, per the spec's negative-vocabulary edge case.
- «يتم الحفظ بعد ربط الخادم» ("saving happens once the server is connected") is an **honest gate** containing «تم الحفظ» ("was saved") as a substring; JS `\b` is ASCII-only → an Arabic-letter lookbehind was required.
