# Entity & Relationship Scope — Spec 027

The static admin relationship map for families/students/courses/groups. All data is authored fixtures; every relationship WRITE is a `backendRequired` gate (no fake mutation). Teacher and schedule/attendance are **references** (real links/names), not owned by 027.

## Entities & allowed display fields

| Entity | Owned by 027 | Display fields (authored) | Not shown / excluded |
|---|---|---|---|
| **Family** | yes | name · contact · category · lifecycle status (active/trial/suspended/stopped/inactive) · children list · notes | **NO pay/billing figure** (owner-030 / excluded) |
| **Student** | yes | name · level · status · enrolled courses · groups · family link · schedule/attendance refs · notes | no fake homework/material persistence; no «لوحة الطالب» |
| **Course** | yes | name · subject · level · status · groups · roster count · teacher(ref) | no computed grade/rank |
| **Group** | yes | name · capacity/status · course · students · teacher(ref) | no fake capacity mutation |
| **Teacher** | reference only | name + real link to teacher profile | **deep teacher mgmt = Spec 028** |
| **Schedule / Attendance** | reference only | real links to existing pages | not owned by 027 |

## Relationships

| Relationship | Cardinality | Display | Write action (all `backendRequired`) |
|---|---|---|---|
| Family → Students | 1 family owns N students | family detail lists children; student links back to family | add-child, edit-child |
| Student → Courses | N:N | student profile lists enrolled courses | enroll-in-course, unenroll |
| Student → Groups | N:N | student profile lists groups | assign-to-group, move/transfer |
| Course → Groups | 1 course has N groups | course detail lists groups | (display; group create sets its course) |
| Group → Students | 1 group has N students | group roster | add-students-to-group, remove-student |
| Group → Teacher | 1 group references 1 teacher | group shows teacher name + link | assign-teacher (reference gate) |
| Course → Teacher | reference | course shows teacher name + link | assign-teacher (reference gate) |
| Student/Course/Group → Schedule/Attendance | reference | real links | not owned by 027 |

## Which writes are `backendRequired` (no fake mutation)
create/edit/delete family·student·course·group · add-child · suspend/stop family · add-note · enroll-in-course · unenroll · assign-to-group · move/transfer student · add-students-to-course/group · remove-student · assign-teacher(ref). **Every** relationship write shows an honest "available once the server is connected" outcome; **none** mutates the DOM roster/status or fabricates a link.

## Reads that stay real (no backend needed)
view family/student/course/group detail pages · open family↔student links · open schedule/attendance links · open teacher profile (ref) · static tabs · static filters · read-only drawers.

## Boundaries
- **Family zero-pay**: no amount/price/pay figure on any family/student surface; billing = owner-030 or excluded.
- **Teacher**: reference only; deep management = 028.
- **No new entity types**; no computed scores/ranks/charts; no backend/persistence.
