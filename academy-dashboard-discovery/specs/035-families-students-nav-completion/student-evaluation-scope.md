# Student Evaluation — Scope (Spec 035)

**Item:** `studentEvaluation` / تقييم الطلاب
**Decision:** **DEEP-LINK to the existing display-only Evaluation tab** — no new page, no new board, no computed academic figure. **Count impact = 0.**

## Deep-link / tab / page decision

| Option | Verdict | Reason |
|---|---|---|
| Standalone `student-evaluation.html` (stale `FUTURE_ROUTES` entry) | **REJECTED** | An aggregate "all students evaluation" page has no honest content under the no-computed-score law; it would invent rubric totals or be empty. |
| Folded admin board/tab on `students.html` | **REJECTED** | Duplicates the per-student rubric already on the profile; risks a cross-student aggregate = forbidden. |
| **Deep-link `student.html#view=evaluation`** | **CHOSEN** | The Evaluation surface already exists, is display-only, and the tabs widget already honors `#view=` on load. Zero new page, zero new fake. Matches Spec 033 CS-09 / page-vs-deeplink "Deep-link (recommended)". |

**Evidence:**
- `student.js:234,243` — profile tabs include `{ id: 'evaluation', … }` → `panels.evaluation = evaluationRubric(st.evaluation)`.
- `components/evaluation-rubric.js:1-6` header — "the FIXTURE-ONLY Monthly Progress Report rubric: criteria rows … each with a calm rating pill (icon + label, NEVER color-only) … NO scoring engine, NO approval workflow, NO persistence."
- `evaluation-rubric.js:60` — Approve is a `confirmAction` whose message is `common.backendRequiredNote` (honest gate; Spec 029 R-F).
- `components/tabs.js:4` + `enhance.js:261-269` — `#view=` deep-link wins on load; overview panel exposes a `data-tab="evaluation"` shortcut (student.js:85).
- Spec 033: matrix row 34 "display-only board; NO computed score"; page-vs-deeplink "Deep-link (recommended)", count 0, evidence "student.html evaluation tab".

## Display sections (already present — Spec 035 adds NONE)
- Month + subtitle header + approved/pending status chip (icon + label).
- Rubric rows — criteria (learningProgress / focus / homework / punctuality) each with a **categorical** rating pill (excellent / good / sometimes / rarely). No number.
- Achievements narrative + next-month objectives narrative (authored strings).

## Allowed authored evaluation data
- The existing `Student.evaluation` fixture (criteria → categorical `ratingId`, narrative keys). No new fixture required for the deep-link.
- Ratings are a **distinct categorical vocabulary** — never mapped to a numeric score or summed.

## Forbidden (hard)
- ❌ computed score / mark / numeric rating
- ❌ computed rank / rubric total / average / percentage
- ❌ `<canvas>` / chart / drawn graph
- ❌ fake publish / fake save / fake approve success
- ❌ fake teacher/student mutation
- ❌ backend / API

## Final gated actions (if any)
- The Evaluation surface already gates its one write honestly: **Approve = `data-confirm` → `common.backendRequiredNote`** (Spec 029 R-F). Spec 035 keeps this byte-identical and introduces **no** new action.

## Nav mechanism
- `nav.config.js`: `studentEvaluation` `planned` → `implemented`, `route:'student.html#view=evaluation'`. Remove the stale `FUTURE_ROUTES.studentEvaluation` entry.
- Same active-pill note as studentResult (resolves to the families category; landing on the `student.html` detail page).

## Smoke / a11y / screenshot scope
- **Smoke:** assert `studentEvaluation` nav item is `implemented` with route `student.html#view=evaluation` (real anchor, not «قريبًا»); assert 0 «قريبًا» remains for this item; re-affirm `student.html` body has an `evaluation` tabpanel; the no-computed-score / no-chart guards stay byte-verbatim.
- **A11y:** covered by existing `student.html` rows; confirm the deep-linked Evaluation tab opens 0/0.
- **Screenshots:** one AR + one EN frame of `student.html#view=evaluation` (light/dark), confirming the Evaluation tab is active via deep-link.
