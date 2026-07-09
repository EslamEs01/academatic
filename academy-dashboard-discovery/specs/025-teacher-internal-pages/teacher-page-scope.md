# Teacher Page Scope — Spec 025

**Date**: 2026-07-07. Per-page build scope for the 7 teacher internal pages. Each is a portal-shell page (`shell: 'portal', role: 'teacher'`, persona `data.t.sara`), AR+EN, using the living primitives; every unavailable action is a labeled backendRequired/planned gate; pay-free absolute.

Building blocks (from `portal-page.js`): `idHero · dayRail · storyRow · flowStrip · guidePanel · kpiRow/kpiCard · plannedCard · gateNote · secHead · pageHead`. Data: `TEACHER_PREVIEW` (followUps out15/out4 · recentSessions out1/out11 · tasks tk1/tk2 · materials tm1/tm2/tm3 · rubric dims · certificate) + new static rows (no pay).

## 1. teacher-schedule (T14) — nav `schedule`

- **Identity**: light `pageHead` («جدولي» / "My Schedule") — no full hero (density).
- **Sections**: (a) today `dayRail` (time · course/group · room · authored student count · status chip · prep state); (b) week agenda — day-grouped cards (Sat–Fri), truthful rest-day empty states, NO 7×24 grid clone; (c) next-class card with a "what to prepare" hint.
- **Gates**: live/enter-class = backendRequired `gateNote`; availability edit = backendRequired.
- **Forbidden**: fake start/attendance-write/live-room; grid clone; pay token.

## 2. teacher-students (T8) — nav `students`

- **Identity**: `pageHead` («طلابي» / "My Students").
- **Sections**: roster cards for sara's students (st1/st6/st11/st13) — name · course/group label · a calm learning signal (from real outcome fixtures out15/out4) · next-session/latest-outcome context; a follow-up `storyRow` for students needing attention.
- **Gates**: contact/message = backendRequired (if surfaced at all); student detail = display-only (no fake profile route).
- **Forbidden**: messaging composer; edit/save; private guardian contact; pay token.

## 3. teacher-outcomes (T22/T3) — nav `outcomes`

- **Identity**: `pageHead` («نتائج الحصص» / "Session Outcomes").
- **Sections**: (a) `flowStrip` prepare→attend→record→review (4 steps); (b) the five-field outcome checklist display-only (attendance · remark · summary · homework note · files note); (c) example outcome states + honest review status (recent-sessions out1/out11).
- **Gates**: record/save/submit = backendRequired `guidePanel`.
- **Forbidden**: fake save/submit/attendance-write; the 23-col pay matrix.

## 4. teacher-tasks (T11/T16) — nav `tasks`

- **Identity**: `pageHead` («المهام» / "Tasks").
- **Sections**: task/follow-up board from `TEACHER_PREVIEW.tasks` (tk1/tk2 + static rows) — title · priority/status tag · due/next-class context; a monthly-plan preview row (T11).
- **Gates**: complete/assign = backendRequired.
- **Forbidden**: fake completion/toggle; the empty tickets KPI shell; the tickets pie/Average; pay token.

## 5. teacher-reports (T9 + T20/T21) — nav `reports` — **the B-07 anchor repoint target**

- **Identity**: `pageHead` («تقاريري» / "My Reports") — academic-only.
- **Sections**: (a) session-completion + attendance/outcome-quality summary (counts, not charts); (b) student-progress summaries; (c) the monthly rubric dimensions display-only (achievements · learning-progress · focus · homework · punctuality + rescheduled/support/objectives) — dimension lines, NO answer scales/computed score.
- **Gates**: export/download = backendRequired.
- **Repoint**: `teacher-portal.js` performance anchor → `teacher-reports.html` (was `teacher-performance.html`); update the Spec 024 B-07 exemption.
- **Forbidden**: ANY pay/finance/salary vocabulary; computed score/rank/percentile/chart engine.

## 6. teacher-profile (T23) — nav `profile`

- **Identity**: `pageHead` («ملفي» / "My Profile") or a light `idHero` (persona).
- **Sections**: identity summary · subjects/specializations · availability windows (from/to day+time, display-only) · teaching preferences (language/theme/contact).
- **Gates**: exactly three backendRequired write gates (photo · profile save · password) — mirrors the family/student profile pattern.
- **Forbidden**: financial/pay info; fake save; the /profile 500.

## 7. teacher-library (T15) — nav `library`

- **Identity**: `pageHead` («مكتبتي» / "My Library").
- **Sections**: resource cards from `TEACHER_PREVIEW.materials` (tm1/tm2/tm3 + static) — material name · type chip · status · linked course/group; static filter/search UI ONLY if it actually works (no fake filter).
- **Gates**: upload/download = backendRequired.
- **Forbidden**: fake upload/download/open/delete/cloud-sync; pay token.

## Nav conversion (FR-008)

`ROLE_NAV.teacher` (`fixtures/portal.js` lines 159–167): flip `schedule/students/outcomes/tasks/reports/library/profile` from `status: 'planned'` → `'implemented'`; each becomes a real self-link with `aria-current` on its own page. Home stays implemented. Result: 8 implemented links; `plannedNavAnchors===0`; `navListAnchors===8`; NO chat/finance/pay nav item.

## Build registration (FR-017)

`build-html.mjs`: add 7 PAGES entries `{ base: 'teacher-<page>', shell: 'portal', role: 'teacher', personaKey: 'data.t.sara', activeId: '<navId>', titleKey: 'prt.title.tch.<page>', render: renderTeacher<Page> }` + 7 imports. ONLY these 7 entries; `package.json` untouched.

## Count (FR-019)

77 → **91** (77 + 14). No removals; the 40 admin + index + family/student pages byte-identical except the teacher-portal anchor repoint. Verify at preflight and after build.

## Design direction

Consistent with Spec 022 living language but NOT hero-on-every-page: teacher-schedule/outcomes use the living rail/flow; students/reports/tasks/library/profile lead with a lighter `pageHead` + `secHead` + cards/`storyRow` to avoid hero-fatigue and keep density strong. Dark/light + RTL/LTR + mobile-390; motion in the single reduced-motion block; no new hook/storage key.
