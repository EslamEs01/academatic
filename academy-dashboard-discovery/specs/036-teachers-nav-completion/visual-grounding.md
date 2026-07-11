# Targeted Visual Grounding — Spec 036

**Gate: COMPLETE.** Evidence inspected first-hand (current app source + legacy crawl + prior specs) — not memory.

## Grounding note (required format)

```
Targeted Visual Grounding — Spec 036 Complete

Scope:
- addTeacher · teacherCategories · sessionsKpi · monthlyPerf

Evidence inspected:
- CURRENT APP: nav.config.js (teachers items :55-56 + cat.teachersPerf section :63-64, all planned; FUTURE_ROUTES.teacherCategories :144);
  pages/teachers.js (trn-add via addTeacherAction :105/112; trn-categories drawer :70-84/110; secondary "Manage categories" button);
  components/teacher-actions.js (trn-add/trn-edit fields :45-63 — names/email/phone/status/subjects/level/courses/city/country/notes + cvGate;
  pay fieldset OMITTED :36; reset-password = off() gate :100); pages/teacher-performance.js (display-only board: count tiles +
  comparison list + follow-up queue; NO tabs widget; NO computed rating/rank/chart :1-6); components/tabs.js (#view= widget);
  components/preview-drawer.js (formDrawer/previewTemplate); components/filter-bar.js + dom.js facetAttrs.
- LEGACY CRAWL: management-teachers-create.md (Add-Teacher form WITH Salary/Payout/Zoom/password sections);
  management-teacher-categories(.-create/-members).md (list + CRUD name/status/description + member_id[]);
  management-class-feedback.md (Classes KPI: #/Teacher/Percentage/session count); management-teacher-feedback.md
  (Monthly Performance: #/Teacher/Percentage/Note + Category/Percentage + feedback-category modals).
- PRIOR SPECS: 033 matrix rows 40/41/43/44 + CS-10..13 + page-vs-deeplink rows 17-20 + roadmap 036 + page-count-envelope row 13;
  028 (trn-add/trn-categories, teacher-performance display-only, performance-metric-scope forbids computed score/rank/chart,
  pay-finance-exclusion); 032 FC-20..24 (trn-add/trn-edit/trn-note/trn-categories fields — OMIT password/salary/rate/fine/zoom/payout, cv=gate).

Legacy capabilities found:
- addTeacher: REAL create form WITH Salary information + Payout details + password + Zoom (all FORBIDDEN here).
- teacherCategories: REAL list + CRUD (name/status/description + assign members). No pay.
- sessionsKpi: REAL read-only "Classes KPI" report — teacher + COMPUTED Percentage + session count. No pay, no chart.
- monthlyPerf: REAL read-only "Monthly Performance" report — teacher + COMPUTED Percentage + note; + feedback-category mgmt. No pay, no chart.

Current frontend state:
- addTeacher: planned «قريبًا»; surface EXISTS (trn-add drawer on teachers.html, pay-free/password-free, Save=gate).
- teacherCategories: planned «قريبًا»; surface EXISTS (trn-categories drawer on teachers.html; list + Create form + gates).
- sessionsKpi: planned «قريبًا»; NO surface (teacher-performance.html is a flat board, no tabs).
- monthlyPerf: planned «قريبًا»; NO surface.

Implementation decision:
- addTeacher: FOLD-ANCHOR → teachers.html. Count 0. No pay/password.
- teacherCategories: FOLD-ANCHOR → teachers.html. Count 0. Drop stale FUTURE_ROUTES entry.
- sessionsKpi: FOLD as display tab → teacher-performance.html#view=sessions-kpi. Count 0. Counts + categorical labels; NO computed %.
- monthlyPerf: FOLD as display tab → teacher-performance.html#view=monthly. Count 0. Month + categorical trend/status + notes; NO computed %.
- count: 115 → 115 (0). tabs() widget added to teacher-performance.html (its body changes; teachers.html/teacher.html bodies byte-identical).

Forbidden for this scope:
- no fake teacher creation · no fake teacher category save · no fake KPI calculation
- no computed rank/chart/score/percentage · no salary/rate/fine/pay/payout figures · no backend/API · no row/status mutation

Proceeding to specify: YES
```

## Evidence table
| Item | Legacy screenshot / page | Current surface |
|---|---|---|
| addTeacher | `management-teachers-create.md` (Salary/Payout/Zoom/password sections) | `trn-add` drawer (pay/password OMITTED) |
| teacherCategories | `management-teacher-categories(.-create/-members).md` | `trn-categories` drawer (list + Create + gates) |
| sessionsKpi | `management-class-feedback.md` (Percentage + session count) | none — build display-only tab (counts + labels, NO %) |
| monthlyPerf | `management-teacher-feedback.md` (Percentage + note) | none — build display-only tab (month + labels + notes, NO %) |

## Grounding gaps
- None material. The two legacy report pages carried a computed `Percentage`; we deliberately do **not** reproduce it (no-computed-score/rank/chart law) — the tabs render authored counts + categorical labels, the conservative honest surface.
