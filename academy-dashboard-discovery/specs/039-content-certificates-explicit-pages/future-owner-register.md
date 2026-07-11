# Future-Owner Register — Spec 039

Capabilities discovered in scope that are **NOT** Spec 039's to build. Each is an honest gate now; the real
behavior belongs to a named future owner. Nothing here is mocked.

| Capability | Evidence | Why deferred | Owner |
|---|---|---|---|
| Real material/library persistence (create/edit/delete write) | legacy Laravel form-post CRUD; no JSON API | needs the real content backend | future-backend |
| Content file upload (`file` + `thumbnail`) | library "Add Material" modal (2× `type=file`) | real upload/storage; no `type=file` allowed | future-backend |
| Real view/download metrics | library Views/Downloads columns | computed/tracked server-side; authored literals only now | future-backend |
| Certificate template persistence + list CRUD | `/management/pdf` list + "Save Settings" | real storage | future-backend |
| Certificate **Designer** (drag/position, font/color, mm coords, `json_data`) | `/management/pdf/create` | real interactive editor + canvas/layout engine | future-backend |
| Real **PDF generation / preview / download** | designer + Approve "Preview"; `json_data` + render service | server-side PDF render (FPDF-class); highest fake-risk | future-backend |
| Certificate background upload (`background` file) | designer "Upload Background" | real upload; no `type=file` | future-backend |
| Certificate request **status mutation** (Approve/Reject/Cancel) | Approve modal | needs backend workflow + audit | future-backend |
| Certificate **delivery** (WhatsApp "Don't send/Group/Private", email) | Approve modal delivery select (WhatsApp = **INFERRED/UNKNOWN**, planning-doc only) | needs messaging integration + credentials | future-backend |
| Teacher→admin **request creation** (`POST /teacher/certificate-request`) | teacher `/teacher/studentslist` Request-Certificate modal | teacher portal is a separate app; real request = backend | future-backend (teacher portal) |
| Student-profile certificate sub-feature (`Certificate Details/Information`, `POST /management/upload-certificate`) | `/management/student/{id}` (legacy S003) | belongs to the Students profile surface, not content/certs | Students owner / future-backend |
| Settings deep-links (×6 planned) | settings category | separate roadmap step | **Spec 040** |
| Final sidebar/route/production re-freeze | Spec 033 roadmap | last step | **Spec 041** |

## Not-in-scope confirmations
- No teacher/family portal redesign. No finance/payment. No Settings deep-links (040). No production freeze (041).
- Legacy planning tagged Materials/Library = S004 and Certificates/Requests = S006, but the **rebuilt app's
  Spec 031 fold** (materials→library.html, certificateRequests→certificates.html) is authoritative; the legacy
  S00x numbers are historical and do not reopen scope. Minor legacy-doc tagging inconsistencies noted
  (Add-Material tagged S005 in one modal table; student-cert modals tagged S006 vs host page S003) are
  evidence-only and non-blocking.
