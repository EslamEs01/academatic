# Contract — Impact Protection

Spec 037's footprint = 2 reports-category nav resolutions + 3 route refinements + 2 new reports tabs + 1 new families tab + 2 new students tabs (shared `tabs()` widget) + tests/docs.

## Byte-identical (must not change)
- **Bodies (`#page-body`)** of `student.html`/`.en` and `family.html`/`.en` — the single-entity drill-down targets are unchanged; `result-summary.js`/`evaluation-rubric.js` render output stays byte-identical.
- **All 16 portal pages** (student/family/teacher portals + internals) and **`index.html`**.
- Every other admin page body (finance/teachers/teacher-performance/settings/staff/library/certificates/control/schedule-search/courses/groups/attendance/sessions/schedule/dashboard/etc.) — untouched by 037.
- Existing fixture entries in `fixtures/reports.js`/`fixtures/families.js`/`fixtures/students.js` that back the overview/directory content (037 only adds new authored data for the 3 new boards).
- `package.json` · `enhance.js` · `build-html.mjs` · `i18n.js` — **0-diff** (the `tabs()`/`#view=` mechanism already exists per the Spec 035/036 precedent and needs no new code).

## Allowed to change
- **`reports.html`/`.en` bodies** — existing content wrapped as an **overview** tab (Spec 036 `teacher-performance` precedent) + new **monthly** + **analysis** tabs.
- **`families.html`/`.en` bodies** — existing content becomes a **directory** tab + new **categories** tab.
- **`students.html`/`.en` bodies** — existing content becomes a **directory** tab + new **results** + **evaluation** tabs.
- **Shared admin sidebar** re-renders on all admin pages (2 «قريبًا» → anchors in reports; 3 existing anchors get refined `href` targets only) — the standard nav-flip/route-refinement footprint.
- New/modified fixtures: reports monthly/analysis authored data, families category member-counts, students cross-student result/evaluation status data.
- Modified: `pages/reports.js`, `pages/families.js`, `pages/students.js` (tabs + boards), `nav.config.js` (2 flips + 3 route edits + `FUTURE_ROUTES` trim), locale files (new `rep.monthly.*`/`rep.analysis.*`/`fam.cat.*`/`stu.results.*`/`stu.eval.*` keys, mirrored ar/en), `app.css` (additive classes only if needed), tests, docs.

## Verification protocol (at implement time)
1. `git stash` the Spec 037 source changes (leave the Spec 034 baseline / green Spec 035+036 working tree intact underneath).
2. Rebuild (`node scripts/build-html.mjs`) and capture `md5sum` of the `#page-body` slice (extracted the same way the existing extraction-hash tooling does, per the Specs 018–022 precedent) for every page in the byte-identical set above, plus `student.html`/`family.html`.
3. `git stash pop`, rebuild again, re-capture the same `md5sum` set.
4. Compare: every hash in the byte-identical set must match exactly; only `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` (+ the shared sidebar snippet) may differ.
5. `git diff --stat` must show only the allowed file set above — no `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` line.

## Acceptance
- Any body-hash mismatch outside the allowed set (esp. `student.html`/`family.html`, any portal file, any other admin page, `finance.html`) = STOP and report.
- `result-summary.js`/`evaluation-rubric.js` produce byte-identical rendered output on the drill-down target pages (proves the new cross-student boards do not alter the single-student rendering path they link into).
- Teacher-pay grep on teacher bodies = 0 (unaffected surface, re-verified anyway per standing law).
