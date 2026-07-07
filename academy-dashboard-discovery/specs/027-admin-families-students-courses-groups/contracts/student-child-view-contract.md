# Contract — Student Child-View

**MUST**: no new standalone student role; no «لوحة الطالب»/«بوابة الطالب»/«student dashboard» primary-role wording (the admin student page is admin-owned; the portal child-view law is unchanged). No fake homework/material/profile persistence.

**Acceptance**
- Smoke child-view assert byte-verbatim green; 0 primary-role wording on `student.html`/`students.html`.
- Portal `student-*` pages byte-identical (untouched by 027).
- **STOP** on any student-primary wording or a new student role surface.
