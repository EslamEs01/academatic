# Research — Spec 036 (Decisions D1–D33)

Format: **Decision · Rationale · Alternatives.** Evidence is first-hand (see plan.md grounding note + `visual-grounding.md` + `legacy-teachers-coverage.md`).

## Count & scope
**D1 — Baseline 115.** Verified on the green (uncommitted) Spec-035 tree. *Alt:* wait for commit — user approved proceeding.
**D2 — Target 115 (delta 0).** All four items fold; no new page. *Alt:* +6 (standalone pages) — rejected; drawers/boards fold honestly.
**D3 — 0 new page bases.** *Alt:* standalone add-teacher/KPI/monthly — Spec 033 recommended fold.
**D4 — 4 nav resolutions.** The four planned teachers items (nav.config.js:55,56,63,64).

## addTeacher
**D5 — Fold-anchor → teachers.html.** The `trn-add` drawer already exists there. *Alt:* standalone add-teacher.html (mirror add-family) — rejected: teacher creation is a single flat form (not a 5-step wizard); would duplicate the drawer.
**D6 — Reachability.** `addTeacherAction()` primary button → `data-drawer="trn-add"` (teacher-actions.js:28-30; teachers.js:105/112). No body edit.
**D7 — Forbidden legacy fields omitted forever.** The legacy Add-Teacher Salary/Payout/Zoom/password sections are FORBIDDEN (teacher pay-free + no-credential laws). Already omitted from `trn-add` (teacher-actions.js:36). *Alt:* none — non-negotiable.
**D8 — Save gate.** `formDrawer` single primary `common.add` = `data-disabled-reason` backendRequired gate. Byte-identical.

## teacherCategories
**D9 — Fold-anchor → teachers.html.** `trn-categories` drawer exists (teachers.js:70-84). Drop the now-redundant `FUTURE_ROUTES.teacherCategories`. *Alt:* standalone categories page — needs forbidden category-CRUD persistence.
**D10 — Reachability.** "Manage categories" secondary button → `data-drawer="trn-categories"` (teachers.js:105). No body edit.
**D11 — Gate.** Create Save = `common.backendRequiredNote`; assign = `trn.cat.assignReason`. INERT fields. Byte-identical.

## sessionsKpi
**D12 — Fold as a display tab.** Add `tabs({group:'perf'})` to teacher-performance.html; wrap the current board as the **overview** (default) panel; add a `sessions-kpi` panel; `#view=sessions-kpi` opens it. *Rationale:* Spec 033 roadmap "2 display tabs on teacher-performance.html"; the page is the teacherKpi board; the `tabs()` widget + `#view=` are the established mechanism. *Alt:* standalone page (+2) — rejected.
**D13 — Board sections.** authored KPI summary tiles (counts) + a per-teacher sessions board (name + status chip + authored session counts + a categorical quality/attendance chip) + a `filterBar` (teacher/subject) + optional read-only drawer. *Alt:* a table — cards match the existing board style.
**D14 — Authored data.** reuse `teacherCounts` (authored session counts) + new categorical quality labels in `fixtures/teacher-performance.js`. *Alt:* new counts fixture — reuse avoids drift.
**D15 — No-compute proof.** counts are literals, quality is a categorical chip; NO computed score/rank/percentage; NO `<canvas>`/chart. The legacy `Percentage` column is NOT reproduced (no-computed-score law). *Alt:* none.
**D16 — Pay-free proof.** names/counts/labels only; pay-token grep = 0.

## monthlyPerf
**D17 — Fold as a display tab.** third tab on the `perf` group; `#view=monthly`. *Alt:* standalone — rejected.
**D18 — Board sections.** month filter + per-teacher monthly rows (name + status + month + categorical trend/status chip + authored note) + optional drawer. *Alt:* two tables (legacy had two) — one authored board is cleaner + avoids the category-% table.
**D19 — Authored data.** new `MONTHLY_ROWS` in `fixtures/teacher-performance.js` (teacher + month + categorical trend + note). *Alt:* none.
**D20 — No-compute proof.** categorical trend/status + notes only; NO computed %/score/rank/total; NO chart. Does not duplicate the Spec-029 feedback engine (that stays in reports.html). *Alt:* reproduce the legacy feedback workflow — rejected (duplication + a write engine).
**D21 — Pay-free proof.** names/labels/notes only; pay grep = 0.

## Mechanics
**D22 — Fixtures.** new `src/js/fixtures/teacher-performance.js`: `SESSIONS_KPI_LABELS` (per-teacher categorical quality label) + `MONTHLY_ROWS` (teacher/month/trend/note) + label/month vocab. Authored, no PII/pay/computed. `fixtures/teachers.js`/`teacher-links.js` unchanged. *Alt:* extend teacher-management.js — a focused fixture matches the page.
**D23 — Locale.** extend EXISTING `ar/en.trn.js` (new `trn.tab.*` for the 3 tab labels + `trn.kpi.*` + `trn.monthly.*`), mirrored, 0 divergence. **No new locale pair; `i18n.js` 0-diff.** *Alt:* a new `ar/en.tperf.js` pair — unnecessary; trn is the teacher module.
**D24 — CSS.** additive only; reuse existing primitives; `.tp-*` only if a new layout needs it; motion (if any) inside the reduced-motion block. *Alt:* new framework — forbidden.
**D25 — nav.config.js.** 4 flips + FUTURE_ROUTES.teacherCategories drop; build guard satisfied; EN hash routes handled by the Spec-035 hash-aware `langRoute` (already in place). *Alt:* keep FUTURE_ROUTES entry — stale.
**D26 — build-html.mjs 0-diff.** teacher-performance already registered (:115); no new page. *Alt:* none.
**D27 — Smoke.** additive Teachers block (see contract). Protected + teacher-pay + nav010 asserts byte-verbatim. Sanctioned amendment: repoint the dashboard planned-item probe from `teachers` → a category still holding a planned item (`reports`/`admin`/`settings`), since teachers now has 0 planned. *Alt:* weaken an assert — forbidden.
**D28 — A11y.** the two new tabs AR/EN light/dark + mobile-390 + open-drawer; teachers.html fold rows covered by existing teachers rows. *Alt:* skip mobile — rejected.
**D29 — Screenshots.** teachers Add-Teacher + Teacher-Categories drawers + the two tabs; AR/EN dark/mobile. *Alt:* fewer — rejected (visual acceptance).
**D30 — Role-law carryover.** all laws green; protected + pay asserts byte-verbatim (see contract).
**D31 — Impact protection.** teachers/teacher bodies byte-identical; teacher-performance body changes (tabs) = the one sanctioned change; portals+index byte-identical; package.json/enhance.js/build-html/i18n 0-diff.
**D32 — Allowed/forbidden files.** see `contracts/scope-guard.md`.
**D33 — Risks/stop.** see plan.md §Risks + scope-guard.
