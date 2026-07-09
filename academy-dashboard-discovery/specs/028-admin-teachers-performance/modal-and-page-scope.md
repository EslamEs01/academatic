# Modal / Drawer / Gate / Page Scope — Spec 028

Reuse the CLOSED Spec-026 `data-*` set + the Spec-027 drawer-picker/kebab precedents. **No new hook/storage key/engine. Default count 97.**

| Action | Mechanism | Page | Final | Notes |
|---|---|---|---|---|
| Create teacher (Add) | **modal** `data-modal-trigger`(`trn.act.add`) | teachers.html | backendRequired | already honest; enrich display-only only (Main/Location/Zoom/Additional; NO Salary/Payout fieldset) |
| Edit teacher | **modal** `data-modal-trigger`(`trn.act.edit`) | teacher.html + kebab | backendRequired | upgrade from honest toast |
| Add note | **modal** `data-modal-trigger` | teacher.html | backendRequired | upgrade from honest toast |
| Notify family | **confirm** `data-confirm` | teacher.html | backendRequired | already honest (keep) |
| Suspend / On-Vacation / Deactivate / Activate | **confirm** `data-confirm` | teacher.html + kebab | backendRequired | no status flip / DOM change |
| Delete teacher | **confirm** `data-confirm-danger` | teacher.html + kebab | backendRequired | no DOM removal |
| Teacher card row kebab | **row-menu** `data-row-menu data-row-menu-kind="teacher"` → `teacherMenu` | teachers.html | (menu of the above) | new `teacherMenu` builder in enhance.js mirroring `studentMenu`/`familyMenu`; NOT a new dispatch hook |
| Assign teacher → course | **drawer/picker** `data-drawer="crs-assign-teacher"` (baked `<template>` single-teacher candidate list) | course.html (+ course-group-actions.js) | backendRequired | replaces the `off()` M-N gate; display-only list |
| Assign teacher → group | **drawer/picker** `data-drawer="grp-assign-teacher"` | group.html (+ course-group-actions.js) | backendRequired | SEPARATE from the `grp-assign` student drawer |
| Assign teacher → (from teacher.html) | **drawer/picker** (course/group candidate list) | teacher.html | backendRequired | the `trn.act.assignCourse`/`assignGroup` gates → pickers |
| Teacher category Create/Edit | **modal** `data-modal-trigger` | teachers.html (in-flow "Manage categories") | backendRequired | nav item `teacherCategories` stays **planned** |
| Assign teachers to category | **drawer/picker** `data-drawer` display-only member list | teachers.html | backendRequired | reuse Spec-027 family-category flow |
| Availability windows editor | **drawer** `data-drawer` day/time rows | teacher.html | backendRequired (Add/Update/Delete) | no invented recurrence |
| Message / contact | **gate** `data-disabled-reason`/`data-demo-action` (honest) | teacher.html | 026/future | no composer; no teacher chat page |
| Send Reset Password | **gate** `data-disabled-reason` | teacher.html + kebab | future-backend | no auth |
| Login as teacher | **gate** `data-disabled-reason` | teacher.html + kebab | future-backend | impersonation |
| Export / print | **gate** `data-disabled-reason` | teacher/teacher-performance | 029 | no file |
| Compensations / Salary | **not built** | — | 030 | never a tab/drawer on teacher.html in 028 |
| Teacher status scopes / sorts | **static tab/filter** `data-filter` | teachers.html | — | display-only facet; no computed ordering |
| All-teachers-timetable | **PAGE decision** | schedule.html (fold) OR new page | — | plan must decide: fold "by teacher" view (0 pages, preferred) vs +1 AR+EN page |

## Expected count
- **Default 97** — every action above is a modal/drawer/picker/confirm/tab/gate on an existing page (`teachers`/`teacher`/`teacher-performance`/`course`/`group`); `teacherCategories` nav stays planned.
- **The only page delta candidate**: all-teachers-timetable. Preferred resolution = fold into `schedule.html` (Spec-026 total-queues→sessions / schedule-requests→schedule precedent) → **stays 97**. If the plan legacy-justifies a standalone page, count becomes 99 (+ AR+EN) with a build-verified assertion. **Decided in `/speckit.plan`, never silently in code.**
