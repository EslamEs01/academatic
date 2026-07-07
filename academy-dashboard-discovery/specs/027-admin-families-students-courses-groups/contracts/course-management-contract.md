# Contract — Course Management

**MUST**: course deep-management is honest. Edit-course → modal; Add-students/enroll → drawer picker → backendRequired; create-group-from-course → modal/drawer → backendRequired; copy/status/delete = gates; assign-teacher = reference gate (→028); print/analytics → 029; materials/subjects → 031.

**Acceptance**
- Edit-course opens a modal (not a bare toast); final = backendRequired.
- Add-students opens a display-only student picker → backendRequired Enroll; no fake roster change.
- Create-group-from-course opens a prefilled create flow → backendRequired.
- Assign-teacher stays a reference gate; no teacher CRUD in 027. No course pay/compensation figure.
- **Fail** on fake course create/update/enroll or teacher-CRUD creep.
