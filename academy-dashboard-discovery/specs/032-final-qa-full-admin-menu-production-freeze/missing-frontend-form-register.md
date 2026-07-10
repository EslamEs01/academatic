# Missing Frontend Form Register — Spec 032

Every action that currently opens a **field-less / too-early gate** where a real frontend form is possible and grounded. These are the FC-01…FC-40 rows from `create-edit-forms-completion-inventory.md`, restated as the fix register. **No unresolved row.** Each: current behavior = field-less `openModal` gate (or bare `disabled-reason`); required fix = render grounded fields, Save = backendRequired gate.

| ID | Role | Page | Action | Expected frontend form | Legacy evidence | Fix in 032? | Owner | Acceptance |
|---|---|---|---|---|---|---|---|---|
| FC-01/02/03 | admin | sessions/dashboard | New session | session form (course/teacher/date/time/duration/status) | form-inventory.md:3357 | Yes | 032 | form control visible; Save=gate |
| FC-04/06 | admin | family/kebab+detail | Edit family | family form (name/email/phone/status/category/notes, no password) | :5628 | Yes | 032 | fields visible; Save=gate |
| FC-05 | admin | family/kebab | Reclassify | category select (reuse fam-cat list) | :1412 | Yes | 032 | picker+select; assign=gate |
| FC-07/08 | admin | family | Add child | student form (name/name_ar/language/gender/birth/notes) | :14320 | Yes | 032 | fields visible; Save=gate |
| FC-09 | admin | family | Add note | notes textarea | :5628 (notes field) | Yes | 032 | textarea visible; Save=gate |
| FC-10 | admin | add-family | Add child (step) | append real childRow | add-family.js:34-46 | Yes | 032 | appends field row |
| FC-11/12 | admin | student | Edit student | student form (no trial on edit) | :14371 | Yes | 032 | fields visible; Save=gate |
| FC-13 | admin | student | Add note | admin/teacher note textarea | :14320 | Yes | 032 | textarea visible; Save=gate |
| FC-14 | admin | students | Add student | student form + trial block | :14320 | Yes | 032 | fields visible; Save=gate |
| FC-15/16 | admin | courses/course | Add/Edit course | course form (material/teacher/start/schedule, no teacher-rate) | :2955 | Yes | 032 | fields visible; Save=gate |
| FC-17/18/19 | admin | course/groups/group | Create/Add/Edit group | group form (name/course/students/schedule, no t-rate) | :7820 | Yes | 032 | fields visible; Save=gate |
| FC-20/21/22 | admin | teacher/teachers | Add/Edit teacher | teacher form (name/subjects/status/level/notes, **no pay/zoom/payout**) | :16019 | Yes | 032 | fields visible, no pay; Save=gate |
| FC-23 | admin | teacher | Add note | notes textarea | :16019 | Yes | 032 | textarea; Save=gate |
| FC-24 | admin | teachers | Create teacher category | name/status/description | :15572 | Yes | 032 | fields visible; Save=gate |
| FC-25 | admin | attendance/outcome | Add feedback | category/remark/note | 029 rep.fb | Yes | 032 | fields visible; Save=gate |
| FC-26 | admin | reports | Create feedback category | name/status/description | :7559 | Yes | 032 | fields visible; Save=gate |
| FC-27 | admin | reports | Create feedback | type/subject/category/remark/note | 029 rep.fb | Yes | 032 | fields visible; Save=gate |
| FC-28 | admin | reports | Create form/survey | form_name/day/field-builder rows | :7627 | Yes | 032 | field rows visible; Save=gate |
| FC-29 | admin | finance | Add bank | name (name-only, no credentials) | :1346 | Yes | 032 | name visible; Save=gate |
| FC-30/31/32 | admin | staff | Add/Edit/Duplicate staff | staff form (name/username/email/phone/role, **no password/salary**) | :569 | Yes | 032 | fields visible, no pw/salary; Save=gate |
| FC-33/34 | admin | certificates | Create/Edit template | name + static layout preview (**bg upload/canvas = gate**) | :12071 | Yes | 032 | name+preview; Save=gate |
| FC-35 | admin | certificates | Create certificate | student/course/template/date/message (**PDF = gate**) | certApproveModal | Yes | 032 | fields visible; Issue=gate |
| FC-36/37 | admin | library | Add/Edit material | name/name_ar | :11005 | Yes | 032 | fields visible; Save=gate |
| FC-38 | admin | library | Add book category / item | name (+ item name/type/category, **file=gate**) | :10910/:10922 | Yes | 032 | fields visible; Save=gate |
| FC-39 | admin | settings | Add expense head | name/status (**no amount**) | 031 heads | Yes | 032 | fields visible; Save=gate |
| FC-40 | admin | (empty states) | Create CTA | route to host create form | states.js:55 | Yes | 032 | opens the entity form |

**Unresolved rows: 0.** Every row is grounded (legacy field list) and fixable as a frontend form with a backendRequired final. MUST-OMIT/MUST-GATE fields are recorded in `future-backend-or-excluded-form-register.md`.
