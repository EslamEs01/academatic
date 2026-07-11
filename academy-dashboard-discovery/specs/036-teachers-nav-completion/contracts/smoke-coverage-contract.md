# Contract — Smoke Coverage

All additions are **additive**; every protected regex/assert (role-law, teacher-pay, no-computed-score, nav010, 026–035) stays **byte-verbatim**. One sanctioned amendment only (the planned-item probe repoint).

## Must assert (new Teachers block)
1. **Count/route-freeze** stays **115** (no number change; no PAGES entry added).
2. **Nav flips** — `addTeacher`→`teachers.html`, `teacherCategories`→`teachers.html`, `sessionsKpi`→`teacher-performance.html#view=sessions-kpi`, `monthlyPerf`→`teacher-performance.html#view=monthly`; each a real anchor (not `data-coming-soon`); exactly 4 status changes; **teachers category 0 planned**; admin-menu **50**.
3. **addTeacher fold** — teachers.html/.en load; `trn-add` drawer + Save gate present; **0** salary/rate/fine/payout/`type=password`/`type=file` token in the form body.
4. **teacherCategories fold** — `trn-categories` drawer + Create form + Save/assign gates present; no fake mutation. (Keep the Spec-032 `FORM_DRAWERS_032`/`HYBRID_032`/`PICKERS_032` trn entries byte-verbatim.)
5. **sessionsKpi tab** — `teacher-performance.html#view=sessions-kpi` (fresh load) shows the sessions-KPI tabpanel as the only visible one; board renders; **0** computed score/rank/percentage/`<canvas>`; **0** pay token.
6. **monthlyPerf tab** — `teacher-performance.html#view=monthly` shows the monthly tabpanel; a month/teacher facet narrows rows; **0** computed %/score/`<canvas>`; **0** pay token.
7. **teacher pay-free** — the standing `payHit`/pay grep on teacher bodies stays byte-verbatim = 0.
8. **Global honesty** — `href="#"`=0; raw-keys=0; dead-buttons=0; 0 external request; `FAKE` guard byte-verbatim.
9. **Role-law carryover** — payFigure/famPay/child-view + finance/settings + nav010 (admin-category admItems===5) + 026–035 asserts byte-verbatim.

## Sanctioned amendment (record in the smoke diff header)
- Repoint the dashboard planned-item probe from `[data-nav-category="teachers"]` (Spec 035 set it there) to a category that still holds a planned item after Spec 036 — **reports** (`monthlyReports`/`dataAnalysis`) or **admin** (`materials`/`certificateRequests`) or **settings**. Additive, honesty-preserving. (No route-freeze number change.)

## Forbidden
- Rewriting/relaxing any protected regex; removing any existing assert; making a fake behavior pass; weakening the teacher-pay or no-computed-score guards.
