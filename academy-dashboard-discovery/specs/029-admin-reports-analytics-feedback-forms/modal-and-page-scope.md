# Spec 029 — Modal & Page Scope

Decides, per surface, whether it is a modal / drawer / gate / page / fold, and states the count policy. The
EXACT count is fixed in `/speckit.plan`; specify sets the default and the candidate test.

## Count policy

- **Default preference: 97** (Spec 028 baseline). Prefer deepening existing pages + modals/drawers/folds.
- A standalone page is allowed ONLY if it (a) is grounded in legacy evidence, (b) appears in the current admin
  menu, (c) cannot be honestly folded into an existing page, (d) cannot be a drawer/modal, and (e) has a
  justified AR/EN (+2) delta with added smoke/a11y/screenshot coverage.
- Candidates are identified from **admin-menu coverage only** (not invented). No accidental removals, no
  unrelated additions.

## Surface → mechanism

| Surface | Mechanism | Rationale | Count impact |
|---|---|---|---|
| Reports overview | existing page, deepen | `reports.html` exists; add export/print honesty + optional detail drawers | 0 |
| Report detail | **drawer** (`previewTemplate`/`sheetRow`) | bounded read-only view | 0 |
| Feedback review (teacher/class/family/student) | **fold into reports.html** (tabs/filter) OR **new page candidate** | grounded but absent; fold preferred | 0 (fold) or +2 (page) |
| Feedback detail | **drawer** (read-only) | bounded read-only view | 0 |
| Feedback category Create/Edit | **modal** (`data-modal-trigger` backendRequired) | bounded write gate | 0 |
| Feedback category Assign-members | **drawer** (display-only picker → gate) | mirror `trn-categories`/`fam-cat` | 0 |
| Forms/surveys list | **fold** OR **new page candidate** | grounded builder; fold preferred (display-only list) | 0 (fold) or +2 (page) |
| Create form / Edit form | **modal** (backendRequired) | bounded write gate | 0 |
| Progress form (student) | **existing** student Evaluation tab, deepen | already partial | 0 |
| Analytics summary (course/student) | **fold into reports.html** OR **planned gate** (`dataAnalysis`) | numberless/chartless; page only if planning justifies | 0 (fold/gate) or +2 (page) |
| `monthlyReports` / `monthlyPerf` / `sessionsKpi` | **fold** OR **planned gate** | thin; gate acceptable | 0 |
| `studentResult` / `studentEvaluation` | **fold into reports/feedback** OR **planned gate** | single-student views exist | 0 |
| Export / Print / CSV / PDF / Excel (all surfaces) | **gate** (disabled-with-reason / backendRequired modal) | no real files | 0 |
| Approve/Delete feedback | **confirm** (`data-confirm` backendRequired) | bounded write gate | 0 |
| Add-feedback (outcome drawer) | **modal/gate** (reclassify from demo toast) | it's a write | 0 |

## Admin-menu missing-page decisions

| Nav item | Decision | Why |
|---|---|---|
| dataAnalysis | fold-into-reports OR planned gate | numberless/chartless analytics; page must be justified in plan |
| monthlyReports | fold OR planned gate | thin; no standalone justification yet |
| sessionsKpi / monthlyPerf | fold OR planned gate | thin |
| studentResult / studentEvaluation | fold OR planned gate | single-student equivalents already exist |
| feedback (no nav item today) | fold into reports (tabbed) preferred | keeps count 97; a dedicated `feedback.html` only if plan proves fold is dishonest/cramped |
| forms (no nav item today) | fold OR page candidate | display-only list; fold preferred |

## Expected count

- **Planning default: 97** (all report/feedback/forms improvements handled via existing pages + modals +
  drawers + folds).
- **Upper bound if pages are justified**: each justified standalone page adds +2 (AR+EN). Candidates that
  could push the count up: a dedicated `feedback` page, a dedicated `analytics`/`forms` page. Planning must
  run the page-candidate test for each and build-verify the exact number. Specify does NOT fix a number > 97.

## Page-candidate test (must be answered per candidate in planning)

1. Grounded in legacy evidence? (cite)
2. In the current admin menu? (cite nav id)
3. Can it be folded into an existing page? (why not)
4. Can it be a drawer/modal instead? (why not)
5. Why is a standalone page necessary? (IA argument)
6. AR/EN page delta? (+2 exactly)
7. Which smoke/a11y/screenshot checks are added?

Any candidate that fails 3–5 is folded or gated, not built as a page.
