# Contract — Role-Law & No-Fake Carryover

All standing laws (Specs 016–036) remain BINDING; protected smoke assertions stay **byte-verbatim** except the one sanctioned amendment. (Plan mirror of `../role-law-and-no-fake-carryover.md`.)

## Role laws (green)
- **Teacher pay-free (GLOBAL):** Spec 037 touches only `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` — no teacher surface (`teachers.html`/`teacher.html`/`teacher-performance.html`/the 16 teacher-portal files) is touched; **0** salary/rate/hour_rate/fine/payout/payroll/currency token anywhere in scope.
- **Family zero-pay:** the family PORTAL is untouched; the admin `families.html#view=categories` board carries an authored member-count literal + status chip only — no money/fee/plan figure.
- **Student child-view:** admin `students.html`/`student.html` are directory/profile/board surfaces for admins, NOT the student portal; the 7 reframed «عرض الابن» child-view pages (Specs 021/022/024) are untouched; the new `students.html#view=results`/`#view=evaluation` boards are additive admin fold-anchors whose drill-down target is the existing single-student tab, unchanged.
- **Admin finance Spec-009 invariant:** `finance.html` body untouched; `reports.html#view=analysis` is explicitly scoped to non-finance areas (attendance/sessions/courses-groups/teachers/students-families) — finance-flavoured analysis (analysis-expenses/analysis-invoices/monthly-invoices) stays excluded, owner Spec 038; reports body stays finance-free FOREVER.
- **No computed score/rank/percentage/GPA/rubric-total/chart/canvas:** both reports tabs (Monthly, Analysis) and both students tabs (Results, Evaluation) render authored count literals + categorical status/trend chips only — **0** `<canvas>`, 0 chart library, 0 computed metric anywhere in the 5 new surfaces.

## No-fake laws (green)
- No fake report generation/analytics calculation/export/PDF/send/publish — every such final stays a `backendRequired` gate («يُتاح بعد ربط الخادم» / "available once the server is connected"), the same honesty class as the existing reports Print/CSV/Share gates (Spec 029 R-G).
- No fake family-category create/save/reclassify-persist; no fake student-result/evaluation calculation or mutation — the two corrective boards are strictly display-only over existing authored fixtures plus the existing gated drawers.
- No backend/API/websocket/database/auth; no external dependency (`package.json` 0-diff).
- No new `data-*` hook/storage key/engine — reuse the CLOSED set only: `tabs()`+`#view=` (Specs 035/036 precedent), `filterBar`/`facetAttrs`, `data-drawer`→`template[data-preview]`, `data-disabled-reason`, `data-confirm`, `noResults()`.
- No `href="#"`, dead button, raw locale key, `type=file`, `type=password`, credential/secret.

## Protected assertions (byte-verbatim)
- `payHit`/teacher-pay guards, `payFigure`/`famPay`, child-view guard, finance/settings invariants.
- Admin-menu-50 freeze; reports 7-card/2-planned scoped to `#reports-grid` (a distinct in-page concept from the nav planned-count, unaffected); finance 9-planned figure-free.
- Families 0-planned (Spec 035 baseline) and Teachers 0-planned (Spec 036 baseline) — both untouched by 037 (037 only adds tabs/boards, never planned items, to families/students/teachers).
- `nav010` (6 rail cats · finance sub-section · admin-menu 50 · banks placement · planned-truthfulness) — only the reports-category planned-count line is expected to change (2→0); everything else byte-verbatim.
- Spec-026 action-completion, Spec-032 form-completion, 026–036 per-page asserts.
- Spec-037 additions = a separate additive Reports/Families/Students block; never edit a protected regex.

## Sanctioned amendments
- Reports-category planned-count 2→0 (mirrors the families/teachers precedent).
- The dashboard planned-item preview probe repoints again — from reports (where Spec 036 last placed it) to admin (`materials`/`certificateRequests`) or settings (owner 039/040 — still genuinely planned after 037). No route-freeze number change.

## Impact-protection expectation
- `reports.html`/`.en`, `families.html`/`.en`, `students.html`/`.en` bodies change (tabs added). `student.html`/`.en`, `family.html`/`.en` single-entity bodies + `result-summary.js`/`evaluation-rubric.js` output stay byte-identical (drill-down target unchanged). Portals ×16 + index + every other admin body byte-identical. `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff.
