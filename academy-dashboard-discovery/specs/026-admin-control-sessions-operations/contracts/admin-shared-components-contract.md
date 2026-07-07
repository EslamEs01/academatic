# Contract — Admin Shared Components

**MUST**: reclassify the persistence-implying verbs ONCE in the shared components; the honest outcome propagates to every page that bakes them. Re-verify each touched admin page's built output.

**Components**: `appointment-details.js`, `outcome-details.js`, `enhance.js` (rowMenu/familyMenu), `teacher-actions.js`, `course-group-actions.js`, `finance-actions.js`, `settings-section.js`, `wizard.js`, plus page verbs in `family.js`/`student.js`.

**Acceptance**
- Edit → modal/drawer → backendRequired; Notify/Message/Send/Attend/Feedback/Reverse/Add-note/Print → backendRequired gate; View/filters/tabs unchanged (real); existing `data-disabled-reason` unchanged.
- No new hook/storage key; changes are attribute values/wiring + baked templates.
- Byte-diff review per touched admin page (dashboard/sessions/schedule/attendance/students/teachers/courses/groups/course/group/teacher/families/add-family/family/student/settings/reports/finance) — only the intended action nodes change.
- **Fail** if a component still emits «preview action» on a persistence verb, or an unrelated node changes.
