# Current Management Action Inventory — Spec 027 (post-Spec-026)

Read-only inventory of every action on the 9 management pages + shared components, in their **post-Spec-026 honest state**. Classifier of record = `src/js/enhance.js` delegated dispatch. Verified in built `public/*.html` (AR+EN).

**Spec 026 confirmed landed**: Create/Add primaries open an honest backendRequired modal (`openModal` — title + "needs the server" note, no fake Save); inline verbs toast «سيتوفّر … بعد ربط الخادم» / "available once the server is connected"; confirm CTAs surface a backendRequired toast, never "done/saved". **The pages are already honest — 027 completes the DEEP-MANAGEMENT workflows (they are currently shallow).**

## Shared dispatch legend (classified once)
- **real-modal** = `data-modal-trigger` + `data-modal-title-key`/`data-modal-note-key` → title + honest note, no fields, no fake Save (*shallow*).
- **backendRequired-gate (toast)** = `data-demo-action data-toast="…بعد ربط الخادم"` → honest toast.
- **confirm-gate** = `data-confirm[-danger]` → real modal; CTA → backendRequired toast; no DOM mutation.
- **real-drawer** = `data-drawer` → `openSheet` (baked `<template>`). **real-static-tab/-filter** = `data-tab`/`data-step-go` · `data-filter`/`data-filter-set`.
- **display-only (disabled+reason)** = `button({disabled,reasonKey})` → inert button + tooltip reason.

## 1. families.html — `pages/families.js` + `components/family-card.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Add family | href → add-family (`families.js:38`) | navigate | real-page-link | no |
| Status/Category filter + search | `data-filter` (`families.js:27-33`) | live filter | real-static-filter | no |
| Card View profile | href → family (`family-card.js:50`) | navigate | real-page-link | no |
| Card kebab: Edit | `data-demo-action` (`enhance.js:107`) | honest toast | backendRequired-gate | **upgrade → edit-family modal** |
| Card kebab: Suspend/Stop | `data-confirm[-danger]` (`enhance.js:109-110`) | confirm → backendRequired | confirm-gate | no |
| Card kebab: View profile | href (`enhance.js:106`) | navigate | real-page-link | no |

## 2. family.html — `pages/family.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Banner Edit | `data-demo-action` (`family.js:164`) | toast | backendRequired-gate | **upgrade → edit modal** |
| Banner Add child | `data-demo-action` (`family.js:165,101`) | toast | backendRequired-gate | **upgrade → add-child modal** |
| Banner Suspend/Stop | `confirmAction` (`family.js:166-167`) | confirm → backendRequired | confirm-gate | no |
| Tabs ×5 | `data-tab` (`family.js:170-186`) | toggle panels | real-static-tab | no |
| Overview → Attendance/Courses/Groups; child rows; View-in-schedule; View-invoices | href (`family.js:78,91,92,42,112,132`) | navigate | real-page-link | no |
| Schedule block → drawer | `data-drawer` (`family.js:188`) | appointment sheet | real-drawer | no (026) |
| Plan "Manage billing" | disabled+reason (`family.js:131`) | inert tooltip | display-only | → **030** |
| Notes "Add" | `data-demo-action` (`family.js:142`) | toast | backendRequired-gate | **upgrade → note modal** |

## 3. add-family.html — `pages/add-family.js` + `components/wizard.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Steps ×5 | `data-step-go/next/prev` (`wizard.js`) | toggle panels | real-static-tab | no |
| Save (final) | `data-modal-trigger` (`wizard.js:33`) | backendRequired modal | real-modal (shallow) | no (may enrich review) |
| Add another child | `data-modal-trigger` (`add-family.js:46`) | backendRequired modal | real-modal (shallow) | optional: inline static add |
| Billing "Manage billing" | disabled+reason (`add-family.js:54`) | inert | display-only | → **030** |
| Form inputs | inert input/select | no bind | display-only | no |

## 4. students.html — `pages/students.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Add student | `data-modal-trigger` (`students.js:85`) | backendRequired modal | real-modal (shallow) | no |
| Family/Status/Subject filter + search | `data-filter` (`students.js:71-78`) | live filter | real-static-filter | no |
| Row View profile / quick-peek | href / `data-drawer` (`students.js:43,44`) | navigate / sheet | real-page-link / real-drawer | no |
| **row kebab (edit/suspend/transfer/remove)** | **absent** (0 `data-row-menu` vs families 16) | — | **missing-needs-027-fix** | **yes (M-I)** |

## 5. student.html — `pages/student.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Banner Message | `data-demo-action` (`student.js:177`) | toast | backendRequired-gate | → **026/future** |
| Banner Edit | `data-demo-action` (`student.js:178`) | toast | backendRequired-gate | **upgrade → edit modal** |
| Tabs ×7 + Results/Evaluation jump | `data-tab` (`student.js:80-81,181-201`) | toggle | real-static-tab | no |
| Attendance / course cards / group chip / family / siblings | href (`student.js:95,113,107,133,53`) | navigate | real-page-link | no |
| Courses "Add" (enroll) | disabled+reason (`student.js:122`) | inert tooltip | display-only | **upgrade → enroll flow (M-B)** |
| Notes "Add" | `data-demo-action` (`student.js:152`) | toast | backendRequired-gate | **upgrade → note modal** |
| **enroll / assign-to-group / transfer / suspend** | **absent** | — | **missing-needs-027-fix** | **yes (M-B/M-C/M-J)** |

## 6. courses.html — `pages/courses.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Add course | `data-modal-trigger` (`courses.js:56`) | backendRequired modal | real-modal (shallow) | no |
| Subject/Level/Status filter + search | `data-filter` (`courses.js:47-54`) | live filter | real-static-filter | no |
| Card View course | href → course (`courses.js:35`) | navigate | real-page-link | no |

## 7. course.html — `pages/course.js` + `components/course-group-actions.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Banner Edit course | `data-demo-action` (`course-group-actions.js:20`) | toast | backendRequired-gate | **upgrade → edit modal (M-D)** |
| Banner Assign teacher | disabled+reason (`:21`) | inert | display-only | → **028** |
| Banner Add students (enroll) | disabled+reason (`:22`) | inert | display-only | **upgrade → enroll (M-B)** |
| Banner View schedule/attendance | href (`:22-23`) | navigate | real-page-link | no |
| Banner Print | disabled+reason (`:24`) | inert | display-only | → **029** |
| Tabs ×8 + group/student/teacher rows | `data-tab`/href (`course.js:36,46,54,104-126`) | toggle/navigate | real-static-tab / real-page-link | no |
| Timetable/Outcomes drawers | `data-drawer` | sheet + gatedActions | real-drawer / gate | 026 |
| **create-group-from-course** | absent | — | missing-needs-027-fix | **yes (M-L)** |

## 8. groups.html — `pages/groups.js` + `components/group-row.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Add group | `data-modal-trigger` (`groups.js:69`) | backendRequired modal | real-modal (shallow) | no |
| Summary tiles + 6 filters + search | `data-filter-set`/`data-filter` (`groups.js:40,56-66`) | facet + live filter | real-static-filter | no |
| Group row view | href → group (`group-row.js:25`) | navigate | real-page-link | no |

## 9. group.html — `pages/group.js` + `course-group-actions.js`
| Action | Element | Behavior | Class | Fix 027? |
|---|---|---|---|---|
| Banner Edit group | `data-demo-action` (`:34`) | toast | backendRequired-gate | **upgrade → edit modal (M-E)** |
| Banner Add students | `data-demo-action` / disabled-if-full (`:30-32,35`) | toast | backendRequired-gate | **upgrade → assign-students picker (M-A)** |
| Banner Remove student | `data-confirm-danger` (`:36`) | confirm → backendRequired | confirm-gate | no |
| Banner Assign teacher | disabled+reason (`:37`) | inert | display-only | → **028** |
| Banner View schedule/attendance; roster/family/teacher/course rows | href (`:38-39`, `group.js:37,41,65,74`) | navigate | real-page-link | no |
| Banner Print | disabled+reason (`:40`) | inert | display-only | → **029** |
| Tabs ×7 + drawers | `data-tab`/`data-drawer` | toggle/sheet | real-static-tab / real-drawer | no/026 |
| **move/transfer student between groups** | absent | — | missing-needs-027-fix | **yes (M-C)** |

## Classification tally
- Large majority: `real-page-link` / `real-static-tab` / `real-static-filter` / `real-drawer` / `real-modal` / `confirm-gate` / `backendRequired-gate` — all already honest (0 dead, 0 `href="#"`, 0 fake finals; verified).
- **Fix in 027 (deep-management deltas, M-A…M-M)**: upgrade Edit family/student/course/group + Add-child + Add-note from shallow toast/modal → richer modal/drawer; add enroll-in-course + assign-students-to-group + move/transfer pickers; add students-table row kebab; add suspend-student; family-category reclassify; create-group-from-course. **Every 027 write ends at a backendRequired final** (reuse closed `data-*` set — no new hook/storage key, no fake persistence).
- **Route out**: assign-teacher persistence → **028**; message/contact → **026/future-backend**; print/export → **029**; billing/plan persistence → **030**.
- **0** forbidden classifications. **0** `dead-button`/`href-hash`/fake-final.

## Role-law confirmation (built AR+EN)
- No «لوحة الطالب»/«بوابة الطالب»/"student dashboard" on any of the 9 admin pages.
- Family admin **plan hour-rate literal** («سعر الساعة ٨٠ ريال/ساعة» + «عرض فقط — لا تُحتسب أي مبالغ فعلية») on family.html + add-family review is a **Spec-004/009-sanctioned admin-only single-value plan literal** (zero aggregate/math) — distinct from the **family-PORTAL** zero-pay hard line (family-portal/family-billing stay figure-free). NOT a violation; 027 keeps it single-value/no-math, adds **no** salary/payroll, routes real billing persistence to **030**.
- `families.html` carries no currency figures. No dead controls, no `href="#"`, confirm finals honest — all verified.
