# Contract: Teacher Report Section (reuse Spec 007)

**Status**: Binding · The Teachers section + category card. Reuses the Spec 007 `TEACHERS_NEEDING_FOLLOWUP` + the teacher/student absence breakdown; drill-down to `teacher-performance.html`/`teacher.html`. **No score/rank/leaderboard.** References FR-007; data-model §10.

---

## 1. Purpose & reuse

Summarize teacher follow-up health — teachers needing follow-up, teacher absences, student absences in teacher sessions — and link to the Teacher Performance board + a teacher profile. Reuses `TEACHERS_NEEDING_FOLLOWUP` (`fixtures/teachers.js`) + `OUTCOME_SUMMARY.teacherAbsent`/`OUTCOME_SUMMARY.studentAbsent` + the Spec 007 follow-up signal vocabulary; **no teacher scoring/ranking/leaderboard.**

## 2. Data source (binding — roll-up only)

`TEACHERS_NEEDING_FOLLOWUP` (=2) + `OUTCOME_SUMMARY.teacherAbsent` + `OUTCOME_SUMMARY.studentAbsent`. Shown as-is. (No per-teacher comparison/ranking is rendered here — that lives on `teacher-performance.html`.)

## 3. Anatomy (RTL, top → bottom)

A `card` with: a section title + a labeled **report-signal** (`needsFollowUp` if `TEACHERS_NEEDING_FOLLOWUP > 0`, else `healthy`) + the counts: **teachers needing follow-up**, **teacher absences** (`outcomeChip('teacherAbsent')`) and **student absences in teacher sessions** (`outcomeChip('studentAbsent')`) — two distinct labeled facts — + **"Teacher performance"** `<a href="teacher-performance.html">` and **"Teacher profile"** `<a href="teacher.html">` (language-aware). The category card carries the headline counts + an `available` chip + the links.

## 4. teacherAbsent vs studentAbsent (binding)

Both render as the two distinct Spec 005 chips — never one "absences" number.

## 5. No score / rank (binding)

The section shows **counts + labeled follow-up signal only** — **NO computed score, ranking, leaderboard, or percentile**. The full per-teacher comparison lives on `teacher-performance.html` (also count-based, no score).

## 6. Drill-down (binding)

"Teacher performance" → `teacher-performance.html`; "Teacher profile" → `teacher.html`. Real `<a href>`, never dead.

## 7. Empty / all-clear

If `TEACHERS_NEEDING_FOLLOWUP === 0`, `healthy`; never a broken/empty block.

## 8. MUST NOT

No teacher score/rank/leaderboard/percentile; no salary/finance; no chart; no fabricated metric; no per-teacher mutation.

## 9. Enforcement & cross-references

- **Smoke**: the Teachers section shows teachers-needing-follow-up + a teacherAbsent chip and a studentAbsent chip (distinct) + real `<a href>`s to `teacher-performance.html` and `teacher.html`; **no score/rank/leaderboard/percentile token**; no chart.
- **Screenshots**: the Teachers region within frame #1.
- Binds to `reports-page-contract.md`, `academic-operations-contract.md`, `scope-guard.md`, and the Spec 007 `../../007-teacher-performance-kpis/contracts/teacher-performance-contract.md`. **MUST NOT** introduce a score/rank/leaderboard, a salary figure, or a chart.

**Acceptance (binding):**
1. **Given** the Teachers section, **When** rendered, **Then** teachers-needing-follow-up + teacher/student absence counts (distinct chips) appear + real links to `teacher-performance.html`/`teacher.html` — no score/rank/chart/salary.
