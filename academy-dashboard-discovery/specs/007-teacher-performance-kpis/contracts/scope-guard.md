# Contract: Scope Guard (Spec 007 — Teacher Performance and Academic KPIs)

**Status**: Binding · The boundary contract. Spec 007 is an **admin-facing, frontend-only, fixture-only** extension. It builds the **academic** teacher experience (review/compare/follow-up) and **explicitly forbids** any computed scoring/ranking/analytics engine and **all finance**. References FR-011 / FR-013 / FR-015 / FR-018 / FR-021; SC-002 / SC-004; data-model §1–§16.

---

## G1. Forbidden — product scope (no engines, no portals, no finance)

Do NOT build or wire as real, for the teacher-performance/academic-KPI domain:

- a **backend API** · a **database**.
- real **authentication** · real **permission enforcement** (no "View KPIs" gate, no RBAC).
- real **create / edit / delete persistence** (no save/mutation — no add/edit teacher, no assign, no note save, no notify send).
- a real **teacher-management engine** · a real **teacher-assignment engine** — no real assign-a-course, assign-a-group, add/remove-from-cohort, capability edit; the teacher↔course/group links are **fixture id-joins** (display-only), never a mutation.
- a real **workload-calculation engine** — the **workload** chip (`light/balanced/high`) is an **authored fixture flag** backed by display counts, never a computed load metric.
- **THE CENTRAL FORBIDDEN LINE — a real performance-scoring engine** — NO computed teacher score (0–100 or any), NO normalized/weighted metric, NO automatic rating, NO predictive/risk computation. The legacy system never had one (it had raw counts + a single feedback % + qualitative notes); introducing one here would be net-new fabrication. The KPI tiles and per-teacher comparison rows show **baked fixture COUNTS** only.
- a real **ranking / leaderboard engine** — NO rank column, NO position/percentile, NO "top teacher" ordering by a computed score. The per-teacher comparison list is **sortable/filterable only via the existing client-side facet mechanism**, never a computed ranking.
- a real **finance / salary / payroll / compensation / payout / accounting** workflow — NO salary card, payout card, payroll tab, compensation workflow, fine/bonus, hour-rate, currency, finance math, or pay figure **anywhere**. Where the legacy showed pay (the profile Compensations/Salary tabs, the Salaries/Staff-Salaries pages, the `fine_per_hour`/`salary_type` form block), the Spec 007 surfaces show **only academic counts**; any pay affordance is **absent** or **disabled-with-reason** ("finance is out of current scope"). **No finance field is added to any fixture.**
- a real **attendance / outcome engine** + **attendance mutation** — the Sessions & Outcomes views **reuse the Spec 005 `outcomeRow` + the canonical `outcomeTemplate` drawer** (display-only) + an `attendance.html` deep-link; NO mark-attend/absent/cancel/reschedule SAVE, NO `absent_by` mutation; the legacy 11-state numeric lifecycle MUST NOT be imported as an engine.
- a real **scheduling engine** — the Timetable views **reuse the Spec 003 `scheduleAgenda`** (display-only) + a `schedule.html#view=timetable` deep-link; NO availability editor, NO slot allocation, NO grid builder.
- a real **notifications backend** · real WhatsApp/Zoom/live integration (calm display hints / disabled-with-reason / confirm→demo-toast at most; the legacy "Login as Teacher" impersonation is NOT reproduced).

Do NOT build any **dashboards** or **portals**: teacher / student / family dashboard or portal. `teachers.html`, `teacher.html`, `teacher-performance.html`, and the Student/Family/Dashboard hints are **admin-facing** views of fixture data — NOT a teacher portal, and MUST NOT impersonate one (no "my classes" / "my students" / "my earnings" / login / role-switcher / "Login as Teacher" framing). Portals stay `future-role` (never rendered).

The legacy teacher action family is reused as a **concept only** — each action maps to honest demo feedback, never a real workflow:

| Legacy action | Spec 007 treatment (allowed) | Forbidden as |
|---|---|---|
| Add / Edit teacher | `data-demo-action` → toast | a real save / create |
| Message teacher · Add follow-up note | `data-demo-action` → toast | a real send / save |
| Notify family | `data-confirm` → demo toast | a real notification backend |
| Assign course / Assign group | **disabled-with-reason** (`trn.reason.assign`) | a real assignment engine |
| Print / export summary | **disabled-with-reason** (`trn.reason.export`) | a real export/backend |
| Open timetable | **real `<a>`** → `schedule.html#view=timetable` | a new scheduler |
| View attendance | **real `<a>`** → `attendance.html` | a new attendance engine |
| Deactivate · Delete · Login-as-Teacher · Send-Reset-Password | **NOT reproduced** (omit) | a real mutation / impersonation |
| Salary · Compensation · Generate-salary · Payout | **NOT reproduced** (omit; finance out of scope) | a real finance workflow |

## G2. Forbidden — technology

No chart library · no table library · no form library · no calendar library · no SPA framework · no CDN · no TypeScript · no new runtime dependency. Native ES modules + the existing components only. **No charts/graphs/sparklines for "performance"** — counts + labeled chips only.

## G3. Forbidden — architecture regressions

No whole-page `<div id="app">` mount; no runtime page-DOM construction (cards/rows/tabs/KPI-tiles/outcome-rows/schedule-blocks/drawers MUST be baked at build); no new `data-*` hook (reuse the closed allowlist); no absolute/external asset path; no per-page bespoke outcome drawer or timetable grid (SC-009).

## G4. Forbidden — legacy reuse

No copied legacy assets/classes/logo/palette/icons/private wording; no legacy numeric statuses (`status=0..5`, the 11-state lifecycle); no copied salary/feedback column sets. The legacy is **product/UX reference only**.

## G5. Allowed in Spec 007

Enrich `teachers.html`; add `teacher.html` (profile template, `activeId:'teachers'`, not a nav item); promote `teacherKpi` → `teacher-performance.html`; three NEW labeled maps (teacher-status / workload / follow-up); a `teacherActions()` honest cluster; a `outcomesOfTeacher(id)` resolver; a teacher-fixture extension (status/workload/followUp/notes — **no finance**); two locale overlays (`ar.trn.js`/`en.trn.js`); ONE dashboard chip. Reuse: `scheduleAgenda`, `outcomeRow`/`outcomeTemplate`, `cohort-panels`, `profileBanner`/`tabs`, `directoryCard`/`filterBar`/`summaryCards`/`kpiCard`/`status-tile`/`noResults`, `TEACHER_AVAIL`, `groupsOfTeacher`, `COURSES.teacherIds`, `SCHEDULE_WEEK.trainer.id`.

## G6. Future role surfaces stay out

Teacher/student/family portals, the `addTeacher`/`teacherCategories`/`sessionsKpi`/`monthlyPerf` nav items, a finance/payroll spec, a real reporting/CSV-export spec — all stay **planned/future**, never rendered as real here.

## G6b. Spec 007 IS the approved spec

The naming collision with the legacy planning's "Spec 007 = Finance/Payroll" is noted: **this Spec 007 is Academic KPIs and deliberately excludes payroll.** Payroll belongs to a future finance spec.

## G7. Admin-frontend-only

Every surface is the admin's view of fixture data. No role-switching, no "act as teacher", no portal chrome.

## G8. Grep-able anti-patterns

No `id="app"` on the new pages; no `http(s)://`/CDN in `public/`; no `chart`/`Chart`/`canvas` perf widget; no `salary`/`payroll`/`payout`/`compensation`/`fine`/`hourRate`/`currency` token in the new src; no `score`/`rank`/`leaderboard`/`percentile` computation; no `⟦` raw-key leak.

### G8a. Concrete grep AUDIT (each MUST print nothing)

```bash
cd academy-dashboard-discovery/app
grep -RnE 'id="app"' public/teacher.html public/teacher-performance.html public/teachers.html && echo FAIL || echo ok
grep -RniE 'salary|payroll|payout|compensation|fine_?per|hour_?rate|currency' src/js/pages/teacher*.js src/js/fixtures/teachers.js src/js/components/teacher-*.js && echo FAIL || echo ok
grep -RniE 'chart|canvas|leaderboard|percentile' src/js/pages/teacher*.js src/js/components/teacher-*.js && echo FAIL || echo ok
grep -RnE 'https?://|cdn\.' public/teacher.html public/teacher-performance.html && echo FAIL || echo ok
grep -RnE '⟦' public/teacher.html public/teacher-performance.html public/teachers.html public/teacher.en.html public/teacher-performance.en.html public/teachers.en.html && echo FAIL || echo ok
```

(A computed-score audit is structural, not purely grep-able: the reviewer confirms every number on `teacher-performance.html`/`teacher.html` traces to a fixture count or resolver length, never to a runtime arithmetic of weighted metrics.)

### G8b. One-line reviewer tests

- "Is there a single number on any teacher surface that is not a fixture count / resolved list length?" → MUST be **no**.
- "Does any teacher surface show a rank, position, percentile, star-rating-as-score, or chart?" → MUST be **no**.
- "Does any teacher surface show a salary/pay/fine/payout figure or a finance tab?" → MUST be **no**.
- "Are teacherAbsent and studentAbsent shown as two distinct labeled chips (never one 'absences')?" → MUST be **yes**.
- "Does every action toast/confirm/disable-with-reason/link, with zero dead controls and zero real mutation?" → MUST be **yes**.
- "Is `teacher.html` a baked admin profile (not a portal) highlighting the Teachers nav item?" → MUST be **yes**.

## G9. Enforcement

Smoke (`tests/smoke/run.cjs`) asserts: no `id="app"`; no external request; no raw i18n key; baked cards/rows/tabs/tiles/drawers; real `<a>` nav for the promoted `teacherKpi`; the G8a greps clean; teacherAbsent ≠ studentAbsent present on the outcomes surface; no dead control. Axe critical = 0. The screenshot matrix (`screenshot-acceptance.md`) treats a fake score/rank/chart or a visible salary widget as a hard FAIL. **Binds to** `screenshot-acceptance.md`, `static-html-django-ready-contract.md`, `teacher-performance-contract.md`, `teacher-actions-contract.md`, and the Spec 006 `../../006-courses-groups-learning-paths/contracts/scope-guard.md` (which already names "no teacher-performance engine — teacher KPIs are display-only").

**Acceptance (binding):**
1. **Given** any teacher surface, **When** audited, **Then** every displayed number is a fixture count / resolved list length — zero computed scores/ranks/percentiles, zero charts.
2. **Given** any teacher surface, **When** audited, **Then** zero salary/payroll/compensation/payout figures, fields, tabs, or widgets appear, and no finance field exists in any fixture.
3. **Given** any teacher action, **When** triggered, **Then** it produces a demo toast / confirm→toast / disabled-with-reason / real link, and nothing mutates real data or impersonates a teacher.
4. **Given** the G8a audit, **When** run, **Then** every command prints nothing (no FAIL).
