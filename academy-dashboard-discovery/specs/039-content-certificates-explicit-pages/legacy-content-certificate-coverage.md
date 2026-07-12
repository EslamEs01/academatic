# Legacy Content & Certificate Coverage — Spec 039

Evidence: admin page records (`output/roles/admin/pages/*.md/.json`), sanitized HTML/text, admin
`network/endpoints.json`, and the 16 screenshots inspected in `targeted-visual-grounding.md`. All legacy lists
were captured **empty** (0 real rows) — column semantics are read from headers/forms, never invented.

## L1 — Materials  (`/management/materials`, `/create`, `/1/edit`)
- **Actually a Course-taxonomy CRUD** mislabeled "Materials". Page title/breadcrumb = "Courses List" /
  "Create Courses" / "Edit Courses"; **broken i18n key `messages.Materials`** leaks in the create/edit breadcrumb.
- List columns: `# · Name · name_ar · Settings`; row action = kebab → **Edit · Delete**. Primary = "+ Add Course".
- Create/Edit form: exactly **`name` + `name_ar`** (text). Submit → `POST /management/materials[/{id}]` (Laravel
  form-post, `_token`/`_method`; **no file input**). No XHR/JSON API.
- **Rebuild reading:** a **Material/Subject** = `{ name, name_ar }`. The ambiguous "Course" wording is a legacy
  defect and is NOT reproduced.

## L2 — Library / Content  (`/management/library`)
- The true media/content library. List columns: `# · Book Name · Category · Published at · Views · Downloads ·
  Status · View · Actions`; empty-state **"No Material Added"**.
- Second (category) table: `Category name · Total of material · Action[Edit]`.
- Type enum (filter + Add-Material select): **Files(1) · Video(2) · Images(3) · Audio(4) · Links(5)**.
- "Categories" modal: add-category name + list + Edit/Save-changes. "Details" modal: read-only disclaimer
  ("provided solely for educational purposes and enrichment").
- **"Add Material" modal**: `name` · Type select · Category select · **`file` (type=file)** · **`thumbnail`
  (type=file)** → `POST /management/library`. **Two real file uploads** (content + thumbnail).
- **Rebuild reading:** content item = `{ name, type, category, publishedAt, views, downloads, status,
  thumbnail }`. Views/Downloads are **read-only metrics** (no create input) → authored literals only, never
  mutated. Uploads → **gates, no `type=file`**.

## L3 — Certificate Requests  (`/management/certificate-requests`)
- List columns: `# · Student Name · Course Name · Teacher Name · Description · Date · Action`; empty-state
  **"No data found"**; filters = 3 selects incl. **"Month"**; top-right cross-link **"Certificate Templates"**.
- **Approve modal** (HTML capture — queue was empty): Student Name · Teacher Name · Description (textarea) ·
  Date (`YYYY-MM-DD`) · **Certificate Template (select)** · **WhatsApp delivery (select: Don't send / Send group
  / Send Private Message)** · notes textarea. Buttons: **Close · Preview · Cancel · Approve**.
- No captured status enum (empty queue). Disposition = **Approve / Cancel** (+ **Preview** before approve).
- **Rebuild reading:** request = `{ student, course, teacher, description, date, status }`. Approve/Reject/
  Cancel/Preview/Generate/Download/**Send (WhatsApp)** = **gates** (highest fake-PDF/fake-send risk). No status
  mutation, no PDF, no `window.open`, no gateway/credential.

## L4 — Certificate Templates + Designer  (`/management/pdf`, `/pdf/create`)
- Templates list columns: `# · Certificate Name · Background · Certificates · Action`; empty **"No data found"**;
  "+ Add" → designer.
- **Certificate Designer** (`certForm` → `POST /management/pdf`): `name` (required) · **`background`
  (type=file)** · Font (Helvetica/Arial/Times/Courier) · B/I/U · Size (range) · Color (picker+hex) · Alignment
  (4) · posX/posY/posW (mm) · hidden `json_data` (field-layout JSON) · **"Save Settings"**. A real
  drag/position + font + background-upload + PDF template editor.
- **Rebuild reading:** the designer is **future-backend**. The rebuild shows a **static, non-draggable preview**
  (CSS-positioned `<span>`s in `role="img"`, **no `<canvas>`**, upload gated). Never described as generated/saved.

## L5 — Cross-role library  (`/teacher/library`, `/student/library`)
- Both = **read-only browse/search**: hero + Search + "All Categories" filter + category grid. No admin
  add/upload/download controls for teacher/student. Confirms the manage-vs-read role split.
- **Rebuild:** already separate portal pages (`teacher-library.html`, `family-materials.html`,
  `student-materials.html`) — **out of Spec 039 scope** (admin-only spec).

## Backend/persistence signals (flagged, all future-backend)
File uploads (library `file`+`thumbnail`, designer `background`); PDF generation + WhatsApp delivery on approve;
Laravel CSRF form-post CRUD (no REST/JSON API captured). None of these are reproduced as real behavior — every
one is an honest gate in the rebuilt surfaces (per Spec 031 laws, carried forward).
