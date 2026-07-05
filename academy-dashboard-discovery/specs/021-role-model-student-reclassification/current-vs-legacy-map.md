# Current-vs-Legacy Map — Spec 021

Grounded in `visual-grounding.md` (L1–L8, C1–C7) and the Spec 015/020 100% sweeps. Verdict legend:
✅ grounded match · ➕ net-new but useful · ⚠️ reclassify · ⏳ scheduled/planned · 🔒 gated by design.

## 1. Role apps

| Legacy surface (role · route) | Current surface | Verdict |
|---|---|---|
| Admin `/management/home` + ~75 templates | `dashboard.html` + 40 admin pages (six-category rail) | ✅ (per-page fidelity re-checked in 023) |
| Teacher `/teacher/home` | `teacher-portal.html` | ✅ home only |
| Teacher chat/schedule/students/library/tasks/monthly-reports/profile | 7 planned nav entries («قريبًا») | ⏳ Spec 025 |
| Teacher salary / salary-class-report | **Deliberately absent** | 🔒 pay-free GLOBAL law (backend-owned) |
| Family `/student/home` | `family-portal.html` | ✅ |
| Family `/student/studentslist` ("All Account Subscriptions") | `family-children.html` | ✅ |
| Family `/student/timetable` + `/student/today-sessions` | `family-schedule.html` | ✅ (merged, improved) |
| Family `/student/student-history` (+ per-student filter) | `family-progress.html` + `family-child.html#child=stX` | ✅ |
| Family `/student/billing` (WITH Amount column) | `family-billing.html` (STATUS-FIRST, amount dropped) | ✅ under the zero-pay hard line |
| Family `/student/request-trial` + `/student/feedbacks` | `family-requests.html` | ✅ (trial step-2 stays gated — recorded gap) |
| Family `/student/library` | `family-materials.html` | ✅ (hero dropped by design) |
| Family `/student/profile-edit` (view page was a 500) | `family-profile.html` (3 backendRequired gates) | ✅ |
| Family courses view | `family-children` subscription tags + `family-child` course tiles | ✅ distributed |
| — (no legacy login) | **`student-portal.html` + 6 student internals as a PRIMARY role app** | ⚠️ **content ✅ / classification ⚠️** — reclassify as the child's own view under Family (DEC-002/003/006) |
| — | `portals.html` hub | ➕ demo device; needs the DEC-004 rework |
| — | `family-child.html` (aggregated child file) | ➕ the fold-point for the student view |

## 2. Where each Spec 019 student page's content actually comes from

| Student page | Legacy ancestor (all under roles/family) | Post-reclassification meaning |
|---|---|---|
| student-portal | `/student/home` (single-child presentation) | the child's day view |
| student-schedule | `/student/timetable`, `/student/today-sessions` | the child's timetable |
| student-homework | guardian homework/feedback signals | the child's tasks |
| student-materials | `/student/library` | the child's materials |
| student-progress | `/student/student-history` | the child's progress |
| student-history | `/student/student-history` (filter view) | the child's session log |
| student-profile | `/student/profile` (broken in legacy; rebuilt honestly) | the child's profile card |

Every row is guardian-derived — which is exactly why the fold into Family is a *re-labeling of
ownership*, not a content rebuild.

## 3. Cross-cutting

| Concept | Legacy | Current | Verdict |
|---|---|---|---|
| Multi-child ownership | account → student rows (L3) | fam1 → st1/st6/st11/st12/st13 everywhere | ✅ coherent |
| Identity hero band | all three role homes (L2/L4/L5) | absent (sidebar block only) | ⚠️ Spec 022 restores the concept |
| Live day operations | Today's Classes tables w/ actions | inert session cards | ⚠️ Spec 022 (static-safe presentation only; no fake actions) |
| Chat / notifications | teacher+family+admin headers | absent | 🔒 backendRequired futures (023 records owners) |
| Certificates (family visibility) | admin-side certificate/requests | absent in family app | ⏳ resolve in 023 |
| Payments/salaries | legacy shows amounts everywhere | excluded by law | 🔒 permanent |

## 4. Summary

The rebuild's coverage of *legacy capability* is strong (the family app is 100%-mapped; admin was
delivered in 001–011; teacher is scheduled). The two real deviations are (1) the invented Student
PRIMARY role — a classification error over correctly-derived content, fixed by DEC-001…006 — and
(2) the presentation gap versus the legacy's living, operational feel — fixed by Spec 022. The 023
audit then proves no third deviation exists anywhere in 000–020.
