# Teacher → Admin Certificate Handoff — Spec 039 (documentation only)

Certificate requests are a cross-role workflow: **Teacher requests → Admin reviews → Admin approves/delivers.**
Spec 039 is **admin-focused**; this artifact documents the handoff to keep the data contract coherent. It does
**not** redesign or expand the teacher/family portals.

## The legacy flow (evidence)
1. **Teacher origin:** `/teacher/studentslist` has a **"Request Certificate"** modal (fields `description`,
   `date_certificate`) → `POST /teacher/certificate-request` (`course_id, description, date_certificate`). The
   teacher requests a certificate for a permitted own student in a course. (Planning: S006 modal on an S009
   teacher page; permission matrix: "Certificates — manage+approve[admin] / request[teacher] / —[family]".)
2. **Admin queue:** those requests surface in admin `/management/certificate-requests`
   (Student · Course · Teacher · Description · Date · Action).
3. **Admin review/approve:** the **Approve** modal (Student/Teacher/Description/Date/**Template select**/
   **WhatsApp delivery select: Don't send / Send group / Send Private Message**/notes) → **Preview / Cancel /
   Approve**. Approval links the request to a template (`pdfcertificat_id`) and (inferred) may dispatch WhatsApp.

## What is UNKNOWN (not invented)
- Exact request **status** vocabulary (the legacy queue was captured empty). The rebuild uses its own authored
  `CERT_STATUS` = `pending · approved · rejected`.
- Whether approval **actually triggers WhatsApp** server-side — this is a planning-doc *inference* (WhatsApp
  fields are observed elsewhere in the legacy app, not confirmed wired to certificate approval). Treated as
  future-backend; **no send is performed**.

## Rebuilt-app coherence (what Spec 039 relies on)
- **Admin review destination exists:** `certificates.html` Requests tab (`requestsPanel()`) with authored
  `CERT_REQUESTS` rows (student/course/teacher/description/date/status), a read-only review drawer, a
  create-request drawer, and Approve/Reject/Generate/Preview/Download/Send **gates**. Spec 039 makes it reachable
  from the sidebar via `certificates.html#view=requests`.
- **Teacher origin already exists as a separate portal surface** and is **out of Spec 039 scope** — the teacher
  portal is a distinct app (never admin nav). No teacher-portal change is proposed.
- **Data-contract consistency:** the shared request entity `{ student, course, teacher, description, date,
  status }` and the shared content entity `{ name, type, category, status }` are read-only across roles; admin
  manages, teacher/family read.

## Decision
**Document only.** No teacher/family portal edit. The admin-side review surface is made reachable (nav unlock).
The real teacher→admin request creation, approval mutation, PDF, and WhatsApp delivery are **future-backend**
(honest gates on both sides). If a tiny compatibility correction to a portal were ever proven necessary it would
be raised explicitly — none is needed for Spec 039.
