# Certificate Templates & Designer Scope — Spec 039

**Related dependency — NOT a primary target, NOT new build scope, NOT re-specified.** Nav id `certificates`
(AR «الشهادات») is already `route:'certificates.html'` (implemented since Spec 031). `certificates.html` hosts
the Templates tab (list + static designer preview) AND the Requests tab (primary target — see
`certificate-requests-scope.md`).

## First-determination results (as required)
- **Already exists in the rebuilt frontend?** YES — `certificates.js` `templatesPanel()` renders `CERT_TEMPLATES`
  (4) cards + a `designerPreview()` + `cert-tpl` create/edit drawer.
- **Complete?** YES for frontend honesty. The designer is a **static, non-draggable preview**: a `cert-stage`
  `<div role="img" aria-label=…>` with absolutely-positioned `<span class="cert-field" style="left:%;top:%">`
  merge-field labels (student/course/teacher/date from `CERT_DESIGNER.fields`). **No `<canvas>`, no drag, no
  plotting library, no background upload** (upload = gate).
- **Spec 039 owns only a link to it?** Effectively yes — it is reached via the `certificates` nav item's default
  (Templates) tab. Spec 039 adds the `certificateRequests` deep-link (sibling Requests tab); it does **not**
  re-open the designer.
- **Frontend-honest without PDF/backend?** YES — no PDF, no `window.open`, no `.pdf` href, no fake render.
- **Must remain an honest lock?** The real editor stays **future-backend**; the static preview stays.

## Legacy evidence (why the real designer is future-backend)
`/management/pdf/create` "Certificate Designer": `name` (required) · `background` (type=file) · Font
(Helvetica/Arial/Times/Courier) · B/I/U · Size range · Color picker · Alignment (4) · posX/posY/posW (mm) ·
hidden `json_data` field-layout · "Save Settings" → `POST /management/pdf`. A real drag/position + font +
background-upload + PDF-render editor. `/management/pdf` list: Certificate Name · Background · Certificates ·
Action; "No data found". Planning docs (S006) flag "CertificateDesigner (canvas, merge fields, mm coords, PDF
preview)" and "Certificate `json_data` canvas format + PDF render service" as an open backend question.

## Required distinction (never conflate)
| Concept | Spec 039 disposition |
|---|---|
| Visual template editing (drag/position/font/color) | **NOT built** — future backend |
| Local frontend preview | **KEPT** as the static `cert-stage` `role="img"` preview — labelled preview only |
| Real PDF generation | **NOT built** — future backend; Generate/Preview/Download = gates |
| Real persistence (Save Settings / template CRUD) | **NOT built** — Create/Edit = `backendRequired` gate |
| Real WhatsApp/email delivery | **NOT built** — Send = gate |

Local preview MUST NEVER be described/asserted as generated, saved, issued, or delivered business truth.

## Decision — REUSED / DEFERRED
Templates + designer are **complete-and-reused** (frontend-honest) + the real editor/PDF/persistence are
**deferred to future backend**. Spec 039 makes **no change** to `templatesPanel()`/`designerPreview()`/fixtures.

## No-fake / role law
No `<canvas>`, no drag, no `type=file`, no `.pdf`/`blob:`/`window.open`, no fake success; every write = gate.

## Test contract
No new assertions required; the existing `certificates` `a31` block already enforces tabIds
`['templates','requests']`, `certStage === 1`, gates ≥4, no file/canvas/password. Keep byte-verbatim.
