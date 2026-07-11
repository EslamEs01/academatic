# Contract — No-Fake Student/Family Corrections

Binding on the three flagged-035 corrective boards: `families.html#view=categories`
(familyCategories), `students.html#view=results` (studentResult), `students.html#view=evaluation`
(studentEvaluation) — all folded into their existing directory pages via the `tabs()`/`#view=`
mechanism (Spec 036 precedent). No academic or categorical value is ever computed; no write persists.
(Binding plan mirror of `../no-fake-student-family-corrections-register.md`.)

| # | Action | Surface | Honest treatment | Forbidden alternative | Acceptance check |
|---|---|---|---|---|---|
| SF-01 | Student result "calculation" | `students.html#view=results` | **MUST-SHOW-ONLY:** authored literals per row — certificate/result count, level, categorical completion-status chip, per-student deep-link | derive/sum/average any value; show score/GPA/percentage of any kind | grep: 0 computed score/GPA/`%`/rank token in the Results board fixture or markup; smoke: board row count == authored fixture row count |
| SF-02 | Student evaluation "calculation" | `students.html#view=evaluation` | **MUST-SHOW-ONLY:** authored categorical evaluation status chip per row (e.g. "on-track"/"needs-attention"), plus per-student deep-link | compute a rubric total, dimension average, or composite rating | grep: 0 computed total/average/numeric-rubric token in the Evaluation board fixture or markup |
| SF-03 | Computed score/rank/GPA/%/rubric-total anywhere | Results board, Evaluation board, AND existing single-student `student.html#view=results`/`#view=evaluation` tabs | **MUST-STAY-DISPLAY-ONLY, GLOBALLY:** `result-summary.js`/`evaluation-rubric.js` (the reused drill-down renderers) stay **byte-identical** to their Spec 035 baseline | introduce score/rank/GPA/%/rubric-total in the new boards, deep-link targets, or any shared component touched by this fold | diff: `result-summary.js`/`evaluation-rubric.js` byte-identical to pre-Spec-037; grep: 0 new score/rank/GPA/`%`/rubric-total token across families/students/family/student bodies |
| SF-04 | Family category creation/save/reclassify | `families.html#view=categories` | **MUST-GATE:** Create-category and Reclassify (existing `fam-cat` drawer) = `data-disabled-reason` (`backendRequired`) finals; board shows only authored category name + member-count literal + status chip | persist a new category, rename a category, move a family between categories on confirm | smoke: Create/Reclassify `aria-disabled`; post-click category list + member counts unchanged; `fam-cat` gate unchanged from Spec 035 |
| SF-05 | Fake publish / export / PDF | all three boards | **MUST-GATE:** any Export/Publish/PDF/Print/Download control = `data-disabled-reason` gate (or absent) | `window.open`, `blob:`/`.pdf`, fake "published/exported" success state | grep: 0 `window.open`/`blob:`/`.pdf` in the three board bodies; smoke: any present export control is `aria-disabled` |
| SF-06 | Row / roster / category / result mutation | all three boards | **MUST NOT:** no control changes a family's roster, a student's result/evaluation status, or category membership in the DOM after interaction | simulate "moved"/"reclassified"/"updated" state changes on any confirm | smoke: DOM snapshot of board rows before/after clicking every gated control on all three boards is unchanged |
| SF-07 | Backend / API / network | all three boards + the `tabs()`/`#view=` fold on `families.html`/`students.html` | **MUST NOT:** all rows are authored fixtures loaded at build time; tab switching/filter = pure client-side (`tabs()` + `filterBar`/`data-facet`) | `fetch`/`XHR`/`WebSocket`, new dependency, `package.json` change | smoke: 0 external request on load + tab-switch + filter interaction for all three boards; `package.json` 0-diff |

## Drill-down note (binding)
The per-student deep-link on each Results/Evaluation board row targets the **existing, unchanged**
single-student surfaces — `student.html#view=results` / `student.html#view=evaluation` (Spec 035's
`resultSummary(st.results)` / `evaluationRubric(st.evaluation)` tabs). Spec 037 adds NO second
rendering path, NO new component, NO new computed field to them (see SF-03).

## Hard forbiddens
- Fake result/evaluation/category persistence or calculation; fake success wording («تم/حُفظ/
  (تجريبي)» / "saved/moved/done"); row/roster/category mutation.
- Computed score/rank/GPA/percentage-as-metric/rubric-total/average/cross-student aggregation/
  sort-by-score.
- Backend/API/websocket/network; new hook/storage key/dependency.
- `href="#"`; raw locale keys; dead buttons.

## Honest wording
- All gates use the standing Spec-026 phrasing («يُتاح بعد ربط الخادم» / "available once the server
  is connected"); `fam-cat`'s existing gate copy is reused unchanged.

## Acceptance
- Smoke `FAKE`/no-fake-success guard runs on `families.html#view=categories`,
  `students.html#view=results`, `students.html#view=evaluation` (AR+EN) with 0 hits; post-click state
  unchanged; 0 external request; `result-summary.js`/`evaluation-rubric.js` diff clean; all existing
  famPay/child-view/Spec 026-036 asserts stay byte-verbatim.
