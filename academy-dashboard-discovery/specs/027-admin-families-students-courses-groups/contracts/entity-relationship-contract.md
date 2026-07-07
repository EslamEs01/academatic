# Contract — Entity Relationship

**MUST**: the relationship map is display-real, write-gated. Family→Students · Student↔Courses · Student↔Groups · Course→Groups · Group→Students · Group/Course→Teacher(ref) · →Schedule/Attendance(ref). Every relationship WRITE = `backendRequired`; teacher & schedule/attendance are references only.

**Acceptance**
- Reads (links/tabs/drawers) stay real; writes (enroll/assign/move/add/remove) end at a backendRequired final.
- No fake roster add/remove; no fake link created; no DOM mutation.
- Teacher appears only as a name + real link (no CRUD); schedule/attendance only as real links.
- **Fail** on any fake relationship mutation or teacher/schedule ownership creep.
