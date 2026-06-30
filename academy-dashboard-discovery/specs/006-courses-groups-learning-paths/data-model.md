# Data Model — Spec 006: Courses, Groups and Learning Paths Deep Experience

**Fixture-only.** No DB schema, no API schema, no persistence. Every shape is a plain JS object literal baked at build time; every cross-reference id resolves to an existing Spec 002/003/004/005 fixture. Each shape maps 1:1 to a Django template-context object (`{% for %}` loops + a status template tag); the mapping is noted per shape. Status values are **labels rendered as icon+text chips**, never numeric or color-only.

Reuses (not redefined here): `Student` (Spec 004), `Family`/`Guardian` (Spec 004), `Teacher` (Spec 002), schedule `Block` (Spec 003), `SessionOutcome` (Spec 005), the session-status / family-lifecycle / outcome-status maps.

---

## 1. Course  *(subject offering — ENRICHES the existing `COURSES.rows`)*

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'c1'…` (existing) |
| `titleKey` / `subjectKey` / `levelKey` | i18n key | existing |
| `subject` | enum | `math\|arabic\|programming\|physics\|english\|science` (existing) |
| `statusId` | enum → CourseStatus | `active\|draft\|paused\|archived` (adds `paused`) |
| `icon` / `accent` | string | existing |
| `enrolled` / `sessions` | number | existing counts |
| `levels[]` | LearningPathLevel[] | the level ladder (enriched: per-level counts) — see #14 |
| **`groupIds[]`** | string[] | → Group.id (NEW) |
| **`teacherIds[]`** | string[] | → Teacher.id (NEW) |
| **`studentsCount` / `groupsCount` / `teachersCount`** | number | derived display counts (NEW) |
| **`upcomingCount`** | number | fixture upcoming-sessions hint (NEW) |
| **`attention?`** | `{kind,labelKey}` | optional fixture follow-up hint (NEW) |
| `notesKey` | i18n key | course notes (NEW) |

**Relationships.** `Course 1—* Group` (via `groupIds`); `Course *—* Teacher` (via `teacherIds`, see #3); `Course *—* Student` (via enrollments + group rosters, see #4). **Django**: `{% for course in courses %}` → `course/<id>` detail.

## 2. CourseStatus  *(labeled map — EXTENDS `COURSE_STATUS`)*

`{ id, tone, icon, labelKey }` for `active`(tone `completed`, icon `check-circle`) · `draft`(`amber`, `edit`) · **`paused`**(`amber`, `pause-circle`) · `archived`(`neutral`, `archive`). Exported `COURSE_STATUS`, `COURSE_STATUS_ORDER`, `courseStatusOf(id)`, `courseStatusChip(id)`. **Django**: `{{ course.status|course_status_chip }}`.

## 3. CourseTeacherLink  *(resolved, display-only)*

`{ courseId, teacherId }` derived from `Course.teacherIds[]`; resolves `teacherId`→`TEACHERS` for name/accent/avail. Rendered as the course profile **Teachers** tab (teacher rows linking to the teacher preview/label). No assignment engine. **Django**: `{% for t in course.teachers %}`.

## 4. CourseStudentLink  *(resolved, display-only)*

`{ courseId, studentId, enrollmentStatusId, groupId? }` — the union of (a) Spec 004 `Student.enrollments[]` whose course matches and (b) members of the course's groups. `enrollmentStatusId` ∈ `active\|paused\|completed` (see #8b). Rendered as the course profile **Students** tab (rows → `student.html`). **Django**: `{% for s in course.students %}`.

## 5. CourseGroupLink  *(resolved, display-only)*

`{ courseId, groupId }` from `Course.groupIds[]`; resolves to `Group` for the course profile **Groups** tab (cards → `group.html`). Reverse of `Group.courseId`. **Django**: `{% for g in course.groups %}`.

## 6. CourseProfile  *(view-model for `course.html`)*

`{ course, banner:{ statusChip, counts:[students,groups,teachers,sessions], actions }, tabs:{ overview, groups, students, teachers, timetable, outcomes, learningPath, notes } }`. Baked tabbed template (reuses `profileBanner`+`tabs`); exactly one panel visible. One representative course baked. **Django**: one `course_detail.html` with `{% if %}` per tab.

## 7. Group  *(NEW cohort/class — `GROUPS.rows`)*

| Field | Type | Notes |
|---|---|---|
| `id` | string | `'grp1'…` (supersedes the Spec 004 `STUDENT_GROUPS` seed) |
| `nameKey` | i18n key | e.g. «مجموعة الرياضيات أ» |
| `courseId` | string | → Course.id (each group delivers exactly one course) |
| `teacherId` | string | → Teacher.id (one teacher) |
| `studentIds[]` | string[] | → Student.id (the roster, many) |
| `scheduleBlockIds[]` | string[] | → Spec 003 `SCHEDULE_WEEK` blocks (display-only, R49) |
| `outcomeIds[]` | string[] | → Spec 005 `SESSION_OUTCOMES` rows (display-only) |
| `levelKey` | i18n key | the cohort's level (foundation/l1/l2/l3/advanced) |
| `statusId` | enum → GroupStatus | `active\|trial\|full\|paused\|completed` |
| `needsAttention?` | boolean/flag | the separate attention flag (not a status) |
| `scheduleSummary` | `{daysKey, time}` | calm "days · time" string for the card |
| `capacity` / `enrolledCount` | number | display ("8 / 10") — `full` when equal |
| `accent` | string | avatar/medallion tone |
| `notesKey` | i18n key | group notes |

**Relationships.** `Group *—1 Course`, `Group *—1 Teacher`, `Group *—* Student`, `Group 1—* Block`, `Group 1—* SessionOutcome`. **Django**: `{% for group in groups %}` → `group/<id>`.

## 8. GroupStatus  *(NEW labeled map — `group-status.js`)*

`{ id, tone, icon, labelKey }`: `active`(`completed`,`check-circle`) · `trial`(`upcoming`/sky,`sparkles`) · `full`(`neutral`,`users`) · `paused`(`amber`,`pause-circle`) · `completed`(`neutral`,`flag`). Plus the **needsAttention flag** rendered via the existing `attentionFlag` (amber, `alert-triangle`). Exported `GROUP_STATUS`, `GROUP_STATUS_ORDER`, `groupStatusOf(id)`, `groupStatusChip(id)`. Distinct from session/lifecycle/outcome maps. **Django**: `{{ group.status|group_status_chip }}`.

### 8b. EnrollmentStatus  *(reconciliation — reuse, do not duplicate)*

The student↔course relationship keeps its OWN labeled map `active\|paused\|completed` (today a local `courseStatusChip` in `student.js`). Decision: relocate it to a shared `enrollment-status` so it no longer shadows the catalogue `CourseStatus`. `{ id, tone, icon, labelKey }`. Used only on the student profile Courses tab.

## 9. GroupStudentLink  *(resolved roster, display-only)*

`{ groupId, studentId, accent, familyId }` from `Group.studentIds[]`; resolves `studentId`→`STUDENTS` (name/accent) + `familyId`→`FAMILIES` (guardian chip). Rendered as the group profile **Students** tab: rows → `student.html`, family chip → `family.html`. No enrollment/removal engine. **Django**: `{% for s in group.students %}`.

## 10. GroupTeacherLink  *(resolved, display-only)*

`{ groupId, teacherId }` → `TEACHERS` for the banner teacher label + the **Teacher** tab. No assignment engine. **Django**: `group.teacher`.

## 11. GroupScheduleLink  *(resolved, display-only — R49)*

`{ groupId, blockIds[] }` → `SCHEDULE_WEEK` blocks for the group profile **Timetable** tab, rendered via the Spec 003 `scheduleAgenda` + a `schedule.html#view=timetable` deep-link. No scheduling engine, no mutation. **Django**: `{% for block in group.schedule %}`.

## 12. GroupOutcomeSignal  *(resolved, display-only — R49)*

`{ groupId, outcomeIds[], counts:{attended,absent,cancelled,needsFollowUp} }` → Spec 005 `SESSION_OUTCOMES` rows for the group profile **Sessions & Outcomes** tab, rendered via the canonical `outcomeRow`+`outcomeTemplate` + an `attendance.html` deep-link. Display-only; no attendance mutation. **Django**: `{% for o in group.outcomes %}`.

## 13. LearningPath  *(display-only — inside CourseProfile, R47)*

`{ courseId, levels: LearningPathLevel[], certificatesHint:{count, labelKey} }`. Rendered as the course profile **Learning Path** tab/section: an ordered, labeled level ladder + a certificates hint. NO units/modules/milestones engine, NO editing. **Django**: `{% for level in course.learning_path %}`.

## 14. LearningPathLevel  *(display-only)*

`{ id, labelKey, order, studentsCount, isCurrent? }` for `foundation\|l1\|l2\|l3\|advanced`. Rendered as a labeled `.level-step` in the ladder (icon+text, ordered). Counts are fixture display only. **Django**: a level partial.

## 15. CourseAction  *(honesty descriptor — R51)*

`{ key, labelKey, icon, kind }` where `kind ∈ demo | confirmDemo | disabledReason | link`. Set: `add`(demo) · `edit`(demo) · `assignTeacher`(disabledReason `crs.reason.assign`) · `addStudents`(disabledReason `crs.reason.enroll`) · `openTimetable`(link→schedule) · `viewAttendance`(link→attendance) · `printSummary`(disabledReason `crs.reason.export`) · `archive`(confirmDemo). No action persists. **Django**: buttons carry `data-*` hooks; server renders the same disabled-with-reason state.

## 16. GroupAction  *(honesty descriptor — R51)*

`{ key, labelKey, icon, kind }`: `add`(demo) · `edit`(demo) · `assignTeacher`(disabledReason) · `addStudents`(demo toast, **disabledReason when `statusId==='full'`** with `grp.reason.full`) · `removeStudent`(confirmDemo, danger) · `openTimetable`(link) · `viewAttendance`(link) · `printSummary`(disabledReason). No mutation. Status-gated like Spec 005 `gatedActions`.

## 17. StudentCourseGroupSignal  *(student profile integration — R52)*

`{ studentId, enrollments:[{ courseId, courseHref, groupId?, groupHref?, enrollmentStatusId }] }`. Drives the student Courses tab: each enrollment card title → `course.html`, group chip → `group.html`. Fixture-only, no new tab, no portal. **Django**: extends the existing student courses context.

## 18. FamilyCourseGroupSignal  *(family profile integration — R52)*

`{ familyId, coursesCount, groupsCount, attentionGroupsCount, coursesHref, groupsHref }`. Drives ONE calm Overview hint card on `family.html` + deep-links. No finance/enrollment claim, no portal. **Django**: extends the existing family overview context.

## 19. DashboardCourseGroupSignal  *(minimal — R53)*

`{ groupsAttentionCount, groupsHref, coursesHref }` → ONE "groups needing attention" chip folded into the existing people-signal card + a deep-link. No new card/stat wall, no fabricated metric. **Django**: one extra context value on the dashboard view.

---

## Fixture coherence rules (verified at build + by smoke)

- Every `Course.groupIds[]` resolves to a `Group`; every `Group.courseId` resolves to a `Course` (bidirectional consistency).
- Every `Group.teacherId` → `TEACHERS`, every `Group.studentIds[]` → `STUDENTS`, every `Group.scheduleBlockIds[]` → `SCHEDULE_WEEK`, every `Group.outcomeIds[]` → `SESSION_OUTCOMES`.
- Course display counts (`studentsCount`/`groupsCount`/`teachersCount`) match the resolved links; `GROUP_SUMMARY.needsAttention` matches the dashboard chip count.
- A `full` group has `enrolledCount === capacity`; the student profile group chips resolve to real `group.html` entities.
- No numeric status anywhere; every status renders via its labeled map.
