# Flagged Spec-035 Items — Deep Audit (Spec 037)

The maintainer flagged three items as *still feeling missing* after Spec 035. Each is audited on the six lenses the command required, with a recorded corrective. **All three are technically valid but UX-weak.** Recommended correctives keep count at **115** (folds/tabs). Evidence: `src/js/pages/{families,family,students,student}.js`, built `public/*.html`, `nav.config.js`.

---

## 1. familyCategories / فئات العائلات

- **Current route:** `families.html` (fold-anchor, Spec 035).
- **Current target:** the Families directory page.
- **Visual surface clarity:** ❌ **weak.** `families.js` renders the families card grid with a `filterBar` that includes a **category select** (one of two filters, alongside status) and bakes a `famCatDrawer(rows[0])` **reclassify** drawer that only opens from a card kebab. There is **no clearly-labeled "Family Categories" heading, list, or board.** The set of categories (their names, how many families each holds) is never shown as a managed surface.
- **Functional adequacy:** ⚠️ partial. Filtering by category works; reclassify drawer + create-category gate exist. But "managing categories" is not exposed as a first-class surface.
- **UX adequacy:** ❌ A non-technical admin clicking «فئات العائلات» lands on the families directory and would not recognise that "Family Categories" is the feature — it looks like the Families page, with categories buried in a dropdown.
- **Should remain as-is?** No.
- **Should become a stronger folded section?** ✅ **Recommended.**
- **Should become a standalone page?** Optional (alternative, +2 files).
- **Recommended correction:** add a clearly-labeled **Family Categories** surface on `families.html` — either a `#view=categories` tab (introduce `tabs()` with Directory + Categories) or a distinct labeled board — listing each category with an **authored member-count literal** + status chip, the existing reclassify drawer, and a **Create-category** `backendRequired` gate. Route refine `familyCategories` → `families.html#view=categories`. No fake category creation/save/mutation.
- **Count impact:** **0** (fold). Standalone alternative: +2 (`family-categories.html` / `.en`).
- **Risk:** Low — display-only + existing drawer; the only new pattern is a `tabs()` wrap of families.html (Spec 036 precedent). Must not compute anything.
- **Acceptance check:** `families.html#view=categories` opens a labeled Categories surface (AR/EN) listing categories + counts; reclassify drawer reachable; Create = gate; 0 mutation; admin understands the feature exists.

---

## 2. studentResult / نتائج الطلاب

- **Current route:** `student.html#view=results` (deep-link, Spec 035).
- **Current target:** the Results tab of **one representative student (st1)**.
- **Visual surface clarity:** ⚠️ the deep-link **functionally works** (enhance.js opens the Results tab on fresh load; `resultSummary(st.results)` renders). But it is a **single student's** results, reached from a **plural** nav label («نتائج الطلاب» = *Student Results*).
- **Functional adequacy:** ⚠️ shows results honestly (fixture-only, no gradebook), but only for one student.
- **UX adequacy:** ❌ An admin expects a **list/board of students' results**, not one student's profile tab. The label promises breadth the surface doesn't deliver.
- **Should remain as-is?** No (the deep-link is fine as a *drill-down*, but not as the *primary* target of a plural nav item).
- **Should become a stronger folded section?** ✅ **Recommended.**
- **Should become a standalone page?** Optional (alternative, +2 files).
- **Recommended correction:** add a display-only **cross-student Results board** folded into `students.html` — a `#view=results` tab (introduce `tabs()` with Directory + Results + Evaluation) listing each student with **authored** result status chips (certificates earned count, level, completion status — **NO computed score/GPA/rank/percentage**) and a **per-student deep-link** to `student.html#view=results` as the drill-down. Route refine `studentResult` → `students.html#view=results`. Keep the existing single-student Results tab as the drill-down target.
- **Count impact:** **0** (fold). Standalone alternative: +2 (`student-results.html` / `.en`).
- **Risk:** **Medium** — the no-computed-score boundary. The board must show only authored status/labels + counts, never a derived grade/rank.
- **Acceptance check:** `students.html#view=results` opens a Results board (AR/EN) listing students + authored result chips + per-student deep-links; no computed score/GPA/rank/percentage; no canvas; no export/PDF fake.

---

## 3. studentEvaluation / تقييم الطلاب

- **Current route:** `student.html#view=evaluation` (deep-link, Spec 035).
- **Current target:** the Evaluation tab of **one representative student (st1)** (`evaluationRubric(st.evaluation)`).
- **Visual surface clarity:** ⚠️ deep-link works; single-student rubric surface.
- **Functional adequacy:** ⚠️ honest fixture rubric, one student.
- **UX adequacy:** ❌ same as studentResult — plural label, single-student surface.
- **Should remain as-is?** No.
- **Should become a stronger folded section?** ✅ **Recommended.**
- **Should become a standalone page?** Optional (alternative, +2 files).
- **Recommended correction:** add a display-only **cross-student Evaluation board** folded into `students.html` — a `#view=evaluation` tab listing each student with **authored** categorical evaluation status chips (on-track / needs-attention — **NO computed rubric total/score/rank**) + a per-student deep-link to `student.html#view=evaluation`. Route refine `studentEvaluation` → `students.html#view=evaluation`. Keep the existing single-student Evaluation tab as the drill-down.
- **Count impact:** **0** (fold; shares the same `students.html` `tabs()` introduced for Results). Standalone alternative: +2 (`student-evaluations.html` / `.en`).
- **Risk:** **Medium** — no computed rubric total.
- **Acceptance check:** `students.html#view=evaluation` opens an Evaluation board (AR/EN) listing students + authored evaluation chips + per-student deep-links; no computed rubric total/score/rank; no canvas.

---

## Summary

| Item | Verdict | Recommended correction | Count | Risk |
|---|---|---|---|---|
| familyCategories | weak-surface | labeled Categories board/tab on families.html | 0 | Low |
| studentResult | weak-surface | cross-student Results board on students.html#view=results | 0 | Medium |
| studentEvaluation | weak-surface | cross-student Evaluation board on students.html#view=evaluation | 0 | Medium |

**Note:** the 033 roadmap explicitly foresaw studentResult/studentEvaluation as *"deep-link to student tabs **or standalone boards**"* — Spec 035 chose the lighter deep-link; the maintainer's flag validates upgrading to the board option. If the deep-link-only shape is kept, that is a valid documented choice, but it does **not** address the maintainer's "still missing" concern — so the recommendation is to build the folded boards (count 0). Final adoption decision is for `/speckit.plan`.
