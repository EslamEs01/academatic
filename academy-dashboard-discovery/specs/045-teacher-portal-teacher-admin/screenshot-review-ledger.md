# Screenshot Review Ledger

**STATUS: FINAL.** This file records one canonical state. Everything above the "HISTORICAL /
SUPERSEDED" heading at the bottom is current; everything below it is retained history and is **not**
a status claim.

**Branch:** `045-teacher-portal-teacher-admin`
**Matrix measured against:** current pushed branch HEAD **`7e30474`** (working tree clean, generated
bytes reproduce from source — see `verification-evidence.md`).
**Baseline:** committed Spec-044 project matrix, 402 captures, console errors = 0.

---

## 1. The final Teacher matrix — 64 frames, byte-backed

Re-captured in full on **2026-08-04** by the Spec-045 matrix driver
(`final-matrix.cjs`, private port 4823, the repo's installed Playwright). Every row below names a
PNG that exists on disk with the recorded byte size and pixel dimensions; the geometry columns are
numeric probes taken in the same page context immediately before the shutter, not impressions.

| Result | Value |
|---|---|
| Frames captured | **64** |
| Console errors | **0** (across all 64) |
| Horizontal overflow | **0** (across all 64) |
| Undersized/blank frames | **0** (every PNG ≥ 3,000 bytes; smallest 33,335) |
| State assertions failed | **0/9** |
| Mobile frames | 31, **every one `scrollWidth === clientWidth === 390` exactly** |
| Desktop frames | 33, **every one `scrollWidth === clientWidth === 1366` exactly** |
| Total bytes on disk | 5,684,802 |
| Driver exit code | **0** (`MATRIX PASS`) |

**Coverage rule satisfied:** all 22 localized Teacher consumers in AR/RTL **and** EN/LTR light at
desktop and exactly 390px (44 frames), plus dark coverage for all 11 distinct page modules
(11 frames), plus 9 material state/interaction frames required by `page-state-matrix.md`.
44 + 11 + 9 = **64**.

### 1.1 Per-frame records

| # | Frame (on disk) | Scope | Locale/dir | Theme | Viewport | State | scrollW/clientW | Console | Overflow | Bytes | PNG px |
|---:|---|---|---|---|---|---|---|---:|---|---:|---|
| 1 | `f-portal-ar-light-desktop.png` | teacher-portal | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 169,687 | 1366×900 |
| 2 | `f-portal-ar-light-390.png` | teacher-portal | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 94,117 | 390×900 |
| 3 | `f-portal-en-light-desktop.png` | teacher-portal | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 194,512 | 1366×900 |
| 4 | `f-portal-en-light-390.png` | teacher-portal | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 99,412 | 390×900 |
| 5 | `f-portal-ar-dark-desktop.png` | teacher-portal | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 185,060 | 1366×900 |
| 6 | `f-sched-ar-light-desktop.png` | teacher-schedule | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 89,600 | 1366×900 |
| 7 | `f-sched-ar-light-390.png` | teacher-schedule | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 60,133 | 390×900 |
| 8 | `f-sched-en-light-desktop.png` | teacher-schedule | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 92,769 | 1366×900 |
| 9 | `f-sched-en-light-390.png` | teacher-schedule | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 62,889 | 390×900 |
| 10 | `f-sched-ar-dark-desktop.png` | teacher-schedule | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 90,487 | 1366×900 |
| 11 | `f-stu-ar-light-desktop.png` | teacher-students | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 111,228 | 1366×900 |
| 12 | `f-stu-ar-light-390.png` | teacher-students | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 66,542 | 390×900 |
| 13 | `f-stu-en-light-desktop.png` | teacher-students | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 113,337 | 1366×900 |
| 14 | `f-stu-en-light-390.png` | teacher-students | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 67,308 | 390×900 |
| 15 | `f-stu-ar-dark-desktop.png` | teacher-students | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 113,017 | 1366×900 |
| 16 | `f-out-ar-light-desktop.png` | teacher-outcomes | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 117,575 | 1366×900 |
| 17 | `f-out-ar-light-390.png` | teacher-outcomes | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 60,006 | 390×900 |
| 18 | `f-out-en-light-desktop.png` | teacher-outcomes | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 116,041 | 1366×900 |
| 19 | `f-out-en-light-390.png` | teacher-outcomes | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 57,028 | 390×900 |
| 20 | `f-out-ar-dark-desktop.png` | teacher-outcomes | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 119,724 | 1366×900 |
| 21 | `f-tsk-ar-light-desktop.png` | teacher-tasks | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 94,511 | 1366×900 |
| 22 | `f-tsk-ar-light-390.png` | teacher-tasks | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 65,007 | 390×900 |
| 23 | `f-tsk-en-light-desktop.png` | teacher-tasks | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 91,407 | 1366×900 |
| 24 | `f-tsk-en-light-390.png` | teacher-tasks | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 60,518 | 390×900 |
| 25 | `f-tsk-ar-dark-desktop.png` | teacher-tasks | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 96,039 | 1366×900 |
| 26 | `f-rep-ar-light-desktop.png` | teacher-reports | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 111,768 | 1366×900 |
| 27 | `f-rep-ar-light-390.png` | teacher-reports | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 58,259 | 390×900 |
| 28 | `f-rep-en-light-desktop.png` | teacher-reports | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 108,874 | 1366×900 |
| 29 | `f-rep-en-light-390.png` | teacher-reports | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 59,144 | 390×900 |
| 30 | `f-rep-ar-dark-desktop.png` | teacher-reports | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 115,250 | 1366×900 |
| 31 | `f-lib-ar-light-desktop.png` | teacher-library | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 90,712 | 1366×900 |
| 32 | `f-lib-ar-light-390.png` | teacher-library | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 56,250 | 390×900 |
| 33 | `f-lib-en-light-desktop.png` | teacher-library | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 92,660 | 1366×900 |
| 34 | `f-lib-en-light-390.png` | teacher-library | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 54,179 | 390×900 |
| 35 | `f-lib-ar-dark-desktop.png` | teacher-library | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 91,944 | 1366×900 |
| 36 | `f-prf-ar-light-desktop.png` | teacher-profile | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 82,732 | 1366×900 |
| 37 | `f-prf-ar-light-390.png` | teacher-profile | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 54,212 | 390×900 |
| 38 | `f-prf-en-light-desktop.png` | teacher-profile | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 86,606 | 1366×900 |
| 39 | `f-prf-en-light-390.png` | teacher-profile | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 58,895 | 390×900 |
| 40 | `f-prf-ar-dark-desktop.png` | teacher-profile | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 83,580 | 1366×900 |
| 41 | `f-dir-ar-light-desktop.png` | teachers | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 141,737 | 1366×900 |
| 42 | `f-dir-ar-light-390.png` | teachers | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 50,909 | 390×900 |
| 43 | `f-dir-en-light-desktop.png` | teachers | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 141,961 | 1366×900 |
| 44 | `f-dir-en-light-390.png` | teachers | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 49,731 | 390×900 |
| 45 | `f-dir-ar-dark-desktop.png` | teachers | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 142,046 | 1366×900 |
| 46 | `f-tchr-ar-light-desktop.png` | teacher | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 118,268 | 1366×900 |
| 47 | `f-tchr-ar-light-390.png` | teacher | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 60,931 | 390×900 |
| 48 | `f-tchr-en-light-desktop.png` | teacher | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 121,335 | 1366×900 |
| 49 | `f-tchr-en-light-390.png` | teacher | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 61,078 | 390×900 |
| 50 | `f-tchr-ar-dark-desktop.png` | teacher | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 118,737 | 1366×900 |
| 51 | `f-perf-ar-light-desktop.png` | teacher-performance | AR/RTL | light | 1366 | initial | 1366/1366 | 0 | none | 144,416 | 1366×900 |
| 52 | `f-perf-ar-light-390.png` | teacher-performance | AR/RTL | light | 390 | initial | 390/390 | 0 | none | 54,682 | 390×900 |
| 53 | `f-perf-en-light-desktop.png` | teacher-performance | EN/LTR | light | 1366 | initial | 1366/1366 | 0 | none | 146,027 | 1366×900 |
| 54 | `f-perf-en-light-390.png` | teacher-performance | EN/LTR | light | 390 | initial | 390/390 | 0 | none | 53,777 | 390×900 |
| 55 | `f-perf-ar-dark-desktop.png` | teacher-performance | AR/RTL | dark | 1366 | initial | 1366/1366 | 0 | none | 145,246 | 1366×900 |
| 56 | `f-lib-en-390-filtered.png` | teacher-library | EN/LTR | light | 390 | search filtered — query "worksheet" — visibleCards=1 emptyStateVisible=false | 390/390 | 0 | none | 55,350 | 390×900 |
| 57 | `f-lib-ar-390-filtered.png` | teacher-library | AR/RTL | light | 390 | search filtered — query «فيديو» — visibleCards=1 emptyStateVisible=false | 390/390 | 0 | none | 55,954 | 390×900 |
| 58 | `f-lib-en-390-empty.png` | teacher-library | EN/LTR | light | 390 | search no-results (empty state) — visibleCards=0 emptyStateVisible=true | 390/390 | 0 | none | 47,187 | 390×900 |
| 59 | `f-lib-ar-390-empty.png` | teacher-library | AR/RTL | light | 390 | search no-results (empty state) — visibleCards=0 emptyStateVisible=true | 390/390 | 0 | none | 52,463 | 390×900 |
| 60 | `f-dir-ar-390-add.png` | teachers | AR/RTL | light | 390 | D1 hub tab: add-teacher form | 390/390 | 0 | none | 41,989 | 390×900 |
| 61 | `f-dir-ar-390-categories.png` | teachers | AR/RTL | light | 390 | D1 hub tab: categories | 390/390 | 0 | none | 44,990 | 390×900 |
| 62 | `f-perf-ar-390-sessions.png` | teacher-performance | AR/RTL | light | 390 | tab: sessions KPI | 390/390 | 0 | none | 58,328 | 390×900 |
| 63 | `f-perf-en-390-monthly.png` | teacher-performance | EN/LTR | light | 390 | tab: monthly | 390/390 | 0 | none | 51,306 | 390×900 |
| 64 | `f-tchr-ar-390-drawer.png` | teacher | AR/RTL | light | 390 | drawer open (trn-policy) — dialogOpen=1 | 390/390 | 0 | none | 33,335 | 390×900 |

### 1.3 Coverage roll-up per scope

| Scope | Frames | AR desktop | AR 390 | EN desktop | EN 390 | AR dark | State frames |
|---|---:|:-:|:-:|:-:|:-:|:-:|---:|
| teacher-portal | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teacher-schedule | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teacher-students | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teacher-outcomes | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teacher-tasks | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teacher-reports | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teacher-library | 9 | ✓ | ✓ | ✓ | ✓ | ✓ | 4 |
| teacher-profile | 5 | ✓ | ✓ | ✓ | ✓ | ✓ | 0 |
| teachers | 7 | ✓ | ✓ | ✓ | ✓ | ✓ | 2 |
| teacher | 6 | ✓ | ✓ | ✓ | ✓ | ✓ | 1 |
| teacher-performance | 7 | ✓ | ✓ | ✓ | ✓ | ✓ | 2 |

### 1.2 State / interaction frames — behaviour proven, not named

The nine state frames drive the **real** shared controls and assert the resulting DOM, so a frame
labelled "filtered" is proven filtered rather than merely titled that way. Measured results:

| Frame | Control driven | Measured result |
|---|---|---|
| `f-lib-en-390-filtered` | `input[data-filter="search"]` ← `worksheet` | `visibleCards=1` of 3, `emptyStateVisible=false` |
| `f-lib-ar-390-filtered` | `input[data-filter="search"]` ← «فيديو» | `visibleCards=1` of 3, `emptyStateVisible=false` |
| `f-lib-en-390-empty` | `input[data-filter="search"]` ← `zzzznomatch` | `visibleCards=0`, `emptyStateVisible=true` |
| `f-lib-ar-390-empty` | `input[data-filter="search"]` ← `zzzznomatch` | `visibleCards=0`, `emptyStateVisible=true` |
| `f-dir-ar-390-add` | `teachers.html#view=add` (D1 hub tab) | tab panel rendered |
| `f-dir-ar-390-categories` | `teachers.html#view=categories` | tab panel rendered |
| `f-perf-ar-390-sessions` | `teacher-performance.html#view=sessions-kpi` | tab panel rendered |
| `f-perf-en-390-monthly` | `teacher-performance.en.html#view=monthly` | tab panel rendered |
| `f-tchr-ar-390-drawer` | click `[data-drawer="trn-policy"]` | `dialogOpen=1` |

**This closed a real capture gap.** The Spec-045 batch that extended `capture.cjs` (T064) correctly
**declined** to fake library search frames, because no row field in that harness types free text into
`input[data-filter="search"]`; it recorded the refusal instead of inventing a mechanism. The four
library state frames above are the honest closure of that gap — the driver types into the real
control and asserts the count.

**A guard weakness was found while producing these frames** and is recorded rather than quietly
fixed: the empty state is toggled by CSS `display`, never by the `hidden` attribute, so the protected
smoke assertion's `emptyShown = !n.hidden` term was **true whenever the node merely existed** — a
partly vacuous assertion inside an otherwise real guard. Corrected in `run.cjs` to a computed-style
test, plus a new assertion that the empty state is **hidden** while results exist. See
`verification-evidence.md` § "Corrections applied during this reconciliation".

---

## 2. Inspection records — 19 measured claims, 19 verified

Native image viewing is **not available to the reviewer in this correction run**, so the visual
claims are not restated as "the reviewer opened the image". They are re-verified as **measurements
on the same rendered pages the frames were captured from** (`inspect.cjs`, exit 0,
`INSPECTIONS=19 PASS=19 FAIL=0`). This is deliberately a stronger record than an eyes-on assertion,
because every line fails loudly if the claim stops being true.

| Frame | Claim | Measured |
|---|---|---|
| `f-tchr-ar-light-390` | FR-036: `td-actions` grid holds all 14 actions | `actions=14 columns=2` |
| `f-tchr-ar-light-390` | the 3 unavailable gates are grouped LAST | `gates=3 firstGateIndex=11 lastLiveIndex=10` |
| `f-tchr-ar-light-390` | nothing clipped, nothing escapes 390px | `clippedChildren=0 offscreenChildren=0` |
| `f-tchr-en-light-390` | same fix holds in **LTR** | `actions=14 columns=2`, `gates=3 firstGateIndex=11 lastLiveIndex=10`, `clipped=0 offscreen=0` |
| `f-perf-ar-light-390` | FR-039 board stays categorical | `percentChars=0 canvas=0` |
| `f-perf-ar-light-390` | profile navigation preserved | `profileLinks=31` |
| `f-portal-ar-dark-desktop` | FR-012 in dark + RTL | `tiles=7 soon=0 anchors=8` |
| `f-portal-ar-dark-desktop` | no admin board exposure | `teacherPerformanceRefs=0` |
| `f-portal-en-light-390` | FR-012 in LTR at 390px | `tiles=7 soon=0 anchors=8`, `teacherPerformanceRefs=0` |
| `f-lib-ar-light-390` | one `td-gates` group, each gate keeps its chip | `groups=1 notes=2 chips=2` |
| `f-stu-ar-light-390` | the 4 evidenced relationships in ONE group | `groups=1 gateNotes=4` |
| `f-stu-ar-light-390` | privacy boundary holds | `emails=0 phones=0 anchors=0` |
| `f-tsk-en-light-390` | `td-meta` folds two stacked bands into one row | `metaRows=3 singleLineRows=3 clipped=0` |
| `f-dir-ar-light-390` | FR-031: no percentage in the summary | `percentChars=0` |
| `f-dir-en-light-390` | FR-031 holds in EN | `percentChars=0` |
| `f-prf-ar-light-390` | self page distinct from admin detail | `gates=3 formControls=0 anchors=0 adminShell=0 portalShell=1` |

The profile row is measured with the **same selector the protected smoke guard uses**
(`.pt-planned .chip.tone-amber`), after a first probe draft used `[data-disabled-reason]` and
reported a false FAIL. That was a defect in the probe, not the product, and is recorded here for the
same reason the mutation ledger records its own false REDs.

---

## 3. Project-wide screenshot matrix

`npm run screenshots` on the pushed tree, this correction run:

**`[screenshots] 436 captured · 0 with console errors`**, exit **0**.

436 = the committed Spec-044 baseline **402** + the **34** additive `sp045-` rows now present in
`tests/screenshots/capture.cjs` (verified: `git diff 722be1c..HEAD -- tests/screenshots/capture.cjs`
is **+62 / −0** — strictly additive, zero protected rows weakened, reordered or removed).

**Correction:** earlier ledgers and task notes claimed **411** captures (402 + 9). That was the count
implied by the T064 micro-batch alone; a further 25 `sp045-` rows landed afterwards and were never
reflected. The measured number is **436**. Nothing was removed to reach it.

---

## 4. Reference grounding

`management-teachers-1-full` (reference platform, EG-045-10) remains the grounding record for the
admin detail work: its star rating, hour rate, phone, live WhatsApp URL, Compensations/Salary tabs
and Left/Acquired tables are all correctly **rejected** by D045-01/02/03, and its one transferable
strength — a grouped action list rather than a pill waterfall — is what the FR-036 fix adopts. This
is an inherited record from the implementation run; it is a *reference* asset, not a product frame,
and no product claim in this file depends on it.

---

# HISTORICAL / SUPERSEDED — NOT CURRENT STATE

> Everything below this line is retained for provenance only. **It does not describe the current
> state of Spec 045 and must not be read as a status claim.** The current state is §1–§4 above:
> 64 Teacher frames, 0 console errors, 0 overflow, 436 project captures, 0 console errors.

## Superseded: the mid-run capture record (sessions 3–4)

At the time it was written this file reported **35 frames across two passes** and listed
`teacher-students`, `teacher-outcomes`, `teacher-tasks`, `teacher-reports`, `teacher-profile` and
`teachers` under "Outstanding capture work", with the state matrix incomplete. That was accurate for
**session 3 only**. All six scopes were subsequently implemented and captured; the matrix in §1
covers all eleven scopes and the state frames in §1.2 complete the state matrix. **There is no
outstanding capture work.**

The session-3/4 passes were:

- Pass 1 — 10 focused frames on the changed surfaces (`sp045-teacher-*`, `sp045-perf-kpi-*`,
  `sp045-portal-*`).
- Pass 2 — a 25-frame matrix for the five scopes accepted at that point.
- Session 4 added a further 30, reaching 65 frames in the interim capture directory.

Those interim frames are superseded by the 64-frame final matrix in §1, which was captured in one
run against the pushed bytes.

## Superseded: the "80-frame matrix" claim

Task note T060 previously recorded "80 frames". **That number could not be recovered from any
retained output or from the frames on disk** during this reconciliation. Rather than restate it, the
matrix was **re-run in full** and the real, byte-backed figure — **64 frames** — is recorded in §1
with a per-frame table. T060's note has been corrected to the measured value; nothing was invented to
preserve the older number.
