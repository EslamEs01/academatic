# No-Fake Student/Family Corrections Register (Spec 037)

Covers the three flagged-035 corrective boards recommended in `flagged-035-items-audit.md`:
`families.html#view=categories` (familyCategories), `students.html#view=results` (studentResult), and
`students.html#view=evaluation` (studentEvaluation). All three are display-only cross-entity boards folded
into their existing directory pages via the `tabs()`/`#view=` mechanism (Spec 036 precedent). No academic or
categorical value is ever computed, and no write persists.

| # | Action | Surface | Honest treatment | Forbidden alternative | Acceptance check |
|---|---|---|---|---|---|
| SF-01 | Student result "calculation" | `students.html#view=results` (Results board) | **MUST-SHOW-ONLY:** each row displays authored literals only — certificate/result-count, level, completion-status chip, per-student deep-link | **MUST NOT** derive, sum, or average any value; **MUST NOT** show a score, GPA, or percentage of any kind | grep: 0 computed score/GPA/`%`/rank token in the Results board fixture or markup; smoke: board row count matches authored fixture row count exactly |
| SF-02 | Student evaluation "calculation" | `students.html#view=evaluation` (Evaluation board) | **MUST-SHOW-ONLY:** each row displays an authored categorical evaluation status chip only (e.g. "on-track"/"needs-attention"), plus per-student deep-link | **MUST NOT** compute a rubric total, dimension average, or composite rating | grep: 0 computed total/average/numeric-rubric token in the Evaluation board fixture or markup |
| SF-03 | Computed score / rank / GPA / percentage / rubric-total anywhere | Results board, Evaluation board, AND the existing single-student `student.html#view=results`/`#view=evaluation` tabs | **MUST-STAY-DISPLAY-ONLY, GLOBALLY:** `result-summary.js` and `evaluation-rubric.js` (the single-student renderers reused as drill-down targets) remain **byte-identical** to their Spec 035 baseline — no new computed field added anywhere in the chain | **MUST NOT** introduce a score/rank/GPA/percentage/rubric-total in the new boards, the deep-link targets, or any shared component touched by this fold | diff: `result-summary.js`/`evaluation-rubric.js` byte-identical to pre-Spec-037; grep: 0 new score/rank/GPA/`%`/rubric-total token across families/students/family/student bodies |
| SF-04 | Family category creation / save / reclassify | `families.html#view=categories` (Categories board) | **MUST-GATE:** "Create category" and "Reclassify" (the existing `fam-cat` drawer, now reachable from a clearly-labeled Categories surface) are `data-disabled-reason` (`backendRequired`) finals; the board shows only authored category name + member-count literal + status chip | **MUST NOT** persist a new category, rename a category, or move a family between categories on confirm | smoke: Create/Reclassify controls `aria-disabled`; post-click category list + member counts unchanged; `fam-cat` gate present and unchanged from Spec 035 |
| SF-05 | Fake publish / export / PDF | All three boards | **MUST-GATE:** any Export/Publish/PDF/Print/Download control on the three boards is a `data-disabled-reason` gate (or is simply absent) | **MUST NOT** call `window.open`, generate a `blob:`/`.pdf`, or show a fake "published/exported" success state | grep: 0 `window.open`/`blob:`/`.pdf` in the three board bodies; smoke: any export control present is `aria-disabled` |
| SF-06 | Row / roster / category / result mutation | All three boards | **MUST NOT:** no control changes a family's roster, a student's result/evaluation status, or a category's membership in the DOM after interaction | **MUST NOT** simulate "moved", "reclassified", "updated" state changes on any confirm | smoke: DOM snapshot of board rows before/after clicking every gated control on all three boards is unchanged |
| SF-07 | Backend / API / network | All three boards + the `tabs()`/`#view=` fold on `families.html`/`students.html` | **MUST NOT:** all rows are authored fixtures loaded at build time; tab switching and any filter are pure client-side (existing `tabs()` + `filterBar`/`data-facet`) | **MUST NOT** add `fetch`/`XHR`/`WebSocket`, a new dependency, or a `package.json` change | smoke: 0 external request on load + tab-switch + filter interaction for all three boards; `package.json` 0-diff |

## Drill-down note (binding)
The per-student deep-link on each Results/Evaluation board row points to the **existing, unchanged**
single-student surfaces — `student.html#view=results` and `student.html#view=evaluation` (the Spec 035
`resultSummary(st.results)` / `evaluationRubric(st.evaluation)` tabs). These remain the drill-down target;
Spec 037 does not add a second rendering path, a new component, or any new computed field to them —
`result-summary.js` / `evaluation-rubric.js` stay byte-identical (see SF-03).

## Standing pattern reuse (no new hook / storage key / engine)
- Boards/tabs = the existing `tabs()` widget + `#view=` hash routing wrapping `families.html`/`students.html`
  (Directory tab preserved byte-identical; Categories/Results/Evaluation are additive tabs).
- Gates = the existing `data-disabled-reason` / `aria-disabled` mechanism; `fam-cat` reuses its Spec 035 gate
  unchanged.
- Deep-links = the existing `#view=` tab hash already proven by Spec 035/036 fresh-load routing.
- Wording = the Spec 026 `acknowledge()` copy, byte-identical — "available once the server is connected" /
  «يُتاح بعد ربط الخادم».
