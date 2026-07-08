# Current Teacher Action Inventory — Spec 028

Every visible action on the admin teacher surfaces + course/group assign-teacher, from the 6-agent source audit. **All are already honest after Spec 026** (0 dead buttons, 0 `href="#"`, 0 fake finals) — the work is *deepening*, not fixing dead UI.

Fields: Page · Action · Element/hook · Current behavior · Expected (028) · Classification · Fix in 028? · Owner · Acceptance.

## teachers.html (`pages/teachers.js`, `components/teacher-actions.js`)
| Action | Hook | Current | Expected 028 | Classification | Fix? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|
| Add teacher | `data-modal-trigger`(`trn.act.add`+backendRequiredNote) | honest modal | keep (optionally enrich display-only) | real-modal/backendRequired-gate | opt | 028 | modal opens → backendRequired |
| Search / Subject / Status / Workload / Availability | `data-filter` | client-side facet | keep | real-static-filter | no | — | filters narrow cards |
| Card "View profile" | `href=teacher.html` | real link | keep | real-page-link | no | — | navigates |
| Card preview | `data-drawer=<id>` (baked template) | display-only sheet | keep | real-drawer | no | — | drawer opens |
| **Per-card kebab (View/Edit/status/Delete)** | — | **absent** | add `data-row-menu data-row-menu-kind="teacher"` → teacherMenu (View link · Edit modal · On-Vacation/Deactivate confirm · Delete confirm) | **missing-needs-028-fix** | **Yes** | 028 | cards carry an honest kebab |

## teacher.html (`pages/teacher.js`, `components/teacher-actions.js`)
| Action | Hook | Current | Expected 028 | Classification | Fix? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|
| Edit | `data-demo-action`(`trn.act.editToast`, honest) | honest toast | → `data-modal-trigger` modal | backendRequired-gate | Yes | 028 | Edit opens modal → backendRequired |
| Message teacher | `data-demo-action`(`trn.act.messageToast`) | honest toast | keep as gate (→026/future) | backendRequired-gate | no | 026/future | gate stays honest; no composer |
| Notify family | `confirmAction`(`trn.act.notify*`) | confirm → honest toast | keep | backendRequired-gate | no | 028 | confirm → backendRequired |
| Add follow-up note | `data-demo-action`(`trn.act.noteToast`) | honest toast | → `data-modal-trigger` modal | backendRequired-gate | Yes | 028 | note opens modal → backendRequired |
| **Assign course** | `off('trn.act.assignCourse','trn.reason.assign')` | disabled+reason gate | → `data-drawer` single-course picker (or reuse the course-side flow) → backendRequired | backendRequired-gate | Yes | 028 | opens picker → backendRequired |
| **Assign group** | `off('trn.act.assignGroup','trn.reason.assign')` | disabled+reason gate | → `data-drawer` single-group picker → backendRequired | backendRequired-gate | Yes | 028 | opens picker → backendRequired |
| **On-Vacation / Deactivate / Activate** | — | **absent** | add `data-confirm` status gates → backendRequired | missing-needs-028-fix | Yes | 028 | confirm → backendRequired; no status flip |
| **Delete teacher** | — | **absent** | add `data-confirm-danger` → backendRequired | missing-needs-028-fix | Yes | 028 | confirm → backendRequired; no DOM removal |
| **Send Reset Password** | — | **absent** | honest `data-disabled-reason` gate → future-backend | missing-owner-future-spec | no | future-backend | gate honest; no auth |
| **Login as teacher** | — | **absent** | honest gate → future-backend (impersonation) | missing-owner-future-spec | no | future-backend | gate honest; no session |
| **Availability windows editor** | — | **absent** (3-value chip only) | add `data-drawer` day/time window list; Add/Update/Delete = backendRequired gates | missing-needs-028-fix | Yes | 028 | editor opens; writes = gates; no fake schedule |
| Open timetable / View attendance | `href` | real links | keep | real-page-link | no | — | navigate |
| Print / export summary | `off('trn.reason.export')` | disabled+reason gate | keep (→029) | backendRequired-gate | no | 029 | gate honest; no file |
| 9 tabs (Overview/Courses/Groups/Timetable/Sessions/Students/Follow-up/Notes) | `data-tab` | display-only panels | keep | real-static-tab | no | — | one panel visible |
| Tab rows → course/group/student/family | `href` | real links | keep | real-page-link | no | — | navigate |

## teacher-performance.html (`pages/teacher-performance.js`)
| Action | Hook | Current | Expected 028 | Classification | Fix? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|
| Summary tiles (counts) | — | display-only counts (fixture sums) | keep — no score/rank/chart | display-only | no | — | no computed rank/chart |
| Search / Subject / Workload / Signal | `data-filter` | facet filters | keep | real-static-filter | no | — | filters narrow |
| Comparison-card / queue "View profile" | `href=teacher.html` | real links | keep | real-page-link | no | — | navigate |
| **Export / print board** | — | **absent** | (optional) add `data-disabled-reason` gate → 029 | missing-owner-future-spec | opt | 029 | gate honest; no file |

## teacher categories (nav.config.js `teacherCategories` — planned)
| Action | Hook | Current | Expected 028 | Classification | Fix? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|
| Manage categories (Create/Edit) | `data-coming-soon` (planned nav) | planned gate | add in-flow `data-modal-trigger` Create/Edit modal reachable from teachers.html; nav stays planned | planned-future-gate + real-modal | Yes | 028 | modal → backendRequired; nav stays planned |
| Assign teachers to category | — | absent | `data-drawer` display-only member picker → backendRequired | missing-needs-028-fix | Yes | 028 | picker → backendRequired |

## course.html / group.html assign-teacher (`components/course-group-actions.js`)
| Action | Hook | Current | Expected 028 | Classification | Fix? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|
| Assign teacher (course) | `off('crs.act.assignTeacher','crs.reason.assign')` | inert disabled+reason gate (native `disabled`+title) | → `drawerBtn` single-teacher picker (`crs-assign-teacher`) → backendRequired | backendRequired-gate | Yes | 028 | picker → backendRequired; teacher stays read-only |
| Assign teacher (group) | `off('grp.act.assignTeacher','grp.reason.assign')` | inert disabled+reason gate | → `drawerBtn` single-teacher picker (`grp-assign-teacher`, SEPARATE from `grp-assign` student drawer) → backendRequired | backendRequired-gate | Yes | 028 | picker → backendRequired |

**Forbidden classes present**: none (0 dead-button / href-hash / fake-submit / fake-save / fake-assign / fake-payroll on any current surface — Spec 026 already made them honest).
