# Targeted Visual Grounding — Spec 039 (Admin Content & Certificates Explicit Pages)

**Gate status: COMPLETE — evidence was opened and visually inspected (not merely listed).**
Baseline: branch `feature/012-role-portal-foundation`, HEAD `4cbcb31` (Spec 038 committed), working tree
clean, public HTML **115**, admin menu **50**. `feature.json` → `039-content-certificates-explicit-pages`.

Scope: `materials` · `certificateRequests` (primary roadmap targets from Spec 033) + inspected-not-widened
related surfaces: admin library/content, certificate templates, certificate designer, teacher/family library.

---

## A. Screenshots opened and described (admin, teacher, family)

Every PNG below was opened with the image reader and its visible contents transcribed. Contact sheets were
NOT used as a substitute.

### 1. `output/roles/admin/screenshots/management-materials-full.png`
- Left "MANAGEMENT" rail: List of Banks · **Materials** (active) · List of Books · certificate · Certificate Requests.
- Card title **"Courses"**; breadcrumb **"Dashboard › Courses List"**; primary button **"+ Add Course"**.
- Table columns: **`#` · `Name` · `name_ar` · `Settings`**. One row: `1 · arabic · للغه عربيه · (⋮ kebab)`.
- **DEFECT (naming):** the "Materials" nav item renders a page titled "Courses" with "Add Course"/"Courses List".
  The real entity is a **Material/Subject** (a subject such as *arabic / اللغة العربية*), NOT a Course. Ambiguous
  legacy naming — the current rebuild already fixes this (see §B).

### 2. `output/roles/admin/screenshots/management-materials-create-full.png`
- Breadcrumb **"Dashboard › messages.Materials › Create Courses"** — **raw i18n key leak** `messages.Materials`
  (broken translation in the legacy app).
- Section "Main information" with exactly two fields: **Name** (ph "Course Name") + **Course Name (Arabic)**
  (ph "Course Name in Arabic"). One **Submit** button. → A Material = **{ name (EN), name_ar (AR) }**. Nothing else.

### 3. `output/roles/admin/screenshots/management-materials-1-edit-full.png`
- Breadcrumb "Dashboard › messages.Materials › Edit Courses". Same two fields, pre-filled
  Name=`arabic`, Course Name (Arabic)=`للغه عربيه`. Submit. → Edit reuses the same 2-field form.

### 4. `output/roles/admin/screenshots/management-materials-002-page-interaction-002.png`
- Row **⋮ kebab menu open**: **Edit** · **Delete**. → Material delete is a row action (→ a confirm in an honest rebuild).
  (`…-001…` shows only the account dropdown — no scope content.)

### 5. `output/roles/admin/screenshots/management-library-full.png`  (nav "List of Books")
- Toolbar: **"Filter Media"** (filter) · **"Categories"** · **"+ Add Material"**.
- Table columns: **`#` · `Book Name` · `Category` · `Published at` · `Views` · `Downloads` · `Status` · `View` · `Actions`**.
- Empty banner **"No Material Added"** (no rows in capture). → the media/content library (books) with authored-style
  view/download COUNTS + category + published date + status. "Add Material" label reused on the Books page (legacy
  label drift).

### 6. `output/roles/admin/screenshots/management-library-002-page-interaction-002.png`  (Categories modal)
- Modal **"Category Details"**: "Add new category" (Category name input) + **"All Categories"** table
  (`Category name · Total of material · Action[Edit]`); row `اللغة العربية · 0 · Edit`. Buttons **Close / Save changes**.

### 7. `output/roles/admin/screenshots/management-library-003-page-interaction-003.png`  (Add Material modal)
- Modal **"Add Material"**: **Material name** · **Type of material** (select, value "Files") · **Category**
  (select "اللغة العربية") · **Material** = **`Choose File` / "No file chosen"** · **Thumbnail** =
  **`Choose File` / "No file chosen"**. Buttons **Close / Save changes**.
- **KEY NO-FAKE BOUNDARY:** legacy content upload uses **two `type=file` inputs** (Material + Thumbnail). The
  rebuild renders these as **gated affordances (no `type=file`)** — Spec 039 must NOT introduce file inputs.

### 8. `output/roles/admin/screenshots/management-certificate-requests-full.png`
- Card **"Certificate Requests"** + top-right cross-link **"Certificate Templates"**.
- Table columns: **`#` · `Student Name` · `Course Name` · `Teacher Name` · `Description` · `Date` · `Action`**.
- Empty **"No data found"** (sad-face) — the request queue had **no rows** in the capture.
  (`…-001…` shows only the account dropdown.)

### 9. `output/roles/admin/screenshots/management-pdf-full.png`  (nav "certificate" = templates)
- Card **"Certificate Templates"** + **"+ Add"**. Columns: **`#` · `Certificate Name` · `Background` · `Certificates` · `Action`**.
  Empty **"No data found"**.

### 10. `output/roles/admin/screenshots/management-pdf-create-full.png` (+ `-001` interaction, identical)
- Header **"Certificate Designer"** · **Certificate Name** input · **"Upload Background"** · **"Save Settings"**.
- Central stage: a real certificate artwork ("CERTIFICATE OF APPRECIATION") with **positioned/draggable label
  boxes**: Student Name, Description ("Lorem ipsum…"), Teacher Name ("Marawan Farag"), Date ("2026-06-20").
- Right inspector for the selected field: **Font** (Helvetica) · **Style B/I/U** · **Size (20px slider)** ·
  **Color (#000000 picker)** · **Alignment (4)** · **X/Y/W (mm)** numeric position (8.6 / 14.2 / 59.4).
- **KEY NO-FAKE BOUNDARY:** this is a **real drag/position + font/PDF template editor with file upload +
  persistence**. It is future-backend. The rebuild deliberately shows a **STATIC preview** (CSS-positioned
  `<span>`s inside `role="img"`, **no `<canvas>`, no drag, upload = gate**). Spec 039 keeps the static preview;
  it must NOT reproduce the editor, generate a PDF, or upload.

### 11. `output/roles/teacher/screenshots/teacher-library-full.png`
- Teacher portal (nav Home/Chat/Schedule/Students/**Library**/Tasks). Library = hero "Education and talents —
  All in one place" + **Search** + **All Categories** dropdown + (empty) category grid. **Read-only browse/search.**

### 12. `output/roles/family/screenshots/student-library-full.png`
- Family/guardian (child-view) portal (nav Home/Schedule/Classes Summary/Courses/Billing/Student Feedback/**Library**).
  Library = hero + **Search** (+ button) + **All Categories** + (empty) grid. **Read-only browse/search.**

**Role law confirmed by pixels:** admin *manages* content/certificates; teacher & family only *read/browse*
the library. Their portal library pages already exist separately (`teacher-library.html`,
`family-materials.html`, `student-materials.html`) and are **out of Spec 039 scope**.

---

## B. Current rebuilt-app equivalents (source-inspected)

- `src/js/nav.config.js`:
  - `materials` → **`status:'planned'`** (renders «قريبًا» button, no route). `FUTURE_ROUTES.materials='library.html'`.
  - `books` → **`route:'library.html'`** (implemented).
  - `certificates` → **`route:'certificates.html'`** (implemented).
  - `certificateRequests` → **`status:'planned'`** (renders «قريبًا» button, no route).
- `src/js/pages/library.js`: `tabs({ group:'library', items:[{id:'materials'…},{id:'books'…}] })` — **the Materials
  tab already exists** (subject catalog: bilingual `matName`+`matNameAr`, row edit/delete; the ambiguous "Course"
  label is gone) + Books tab (media catalog: name/type/category/published/views/downloads/status, filters,
  `lib-cats` category drawer, `lib-item` add drawer — **uploads are gates, no `type=file`**).
- `src/js/pages/certificates.js`: `tabs({ group:'certificates', items:[{id:'templates'…},{id:'requests'…}] })` —
  Templates tab (cards + **static** `cert-stage` designer preview, `role="img"`, no canvas, upload gated) +
  **the Requests tab already exists** (authored `CERT_REQUESTS` rows, status chips, review drawer, create drawer;
  approve/reject/generate/preview/download/send = gates).
- `src/js/enhance.js` `initTabs()`: `#view=<id>` in the URL wins on load → so `library.html#view=materials` and
  `certificates.html#view=requests` are **already valid deep-links** into the existing tabs.

**Therefore the only real gap is navigational:** two sidebar items still say «قريبًا» even though their target
surfaces are built and reachable. This is the same condition Specs 037/038 resolved by unlocking nav deep-links.

---

## C. Grounding ledger (19 required rows)

Legend — Decision ∈ {keep, improve, consolidate, defer, reject}. Every row cites ≥1 current-app source and ≥1
discovery source. Confidence H/M/L.

| # | Item | Discovery evidence | Current-app equivalent | Gap | Proposed | Conf | Owner | Decision |
|---|------|--------------------|------------------------|-----|----------|------|-------|----------|
| 1 | Materials list | mgmt-materials-full (title "Courses", cols #/Name/name_ar/Settings) | `library.js` Materials tab (subject list, correct naming) | nav item is «قريبًا»; surface unreachable from sidebar | Unlock `materials`→`library.html#view=materials` | H | 039 | keep+improve(nav) |
| 2 | Material create | mgmt-materials-create-full (Name + Course Name (Arabic), Submit) | `materialsPanel()` `mat-add`/create form (matName+matNameAr) | none (form exists, Save gated) | reuse; final Save stays gate | H | 039 | keep |
| 3 | Material edit | mgmt-materials-1-edit-full (same 2 fields, prefilled) | `mat-edit` drawer | none | reuse; Save gated | H | 039 | keep |
| 4 | Material delete/confirm | mgmt-materials-002 (kebab Edit/Delete) | materials row edit/delete → confirm (backendRequired) | none | reuse confirm; no mutation | H | 039 | keep |
| 5 | Library/content list | mgmt-library-full (cols Book Name/Category/Published/Views/Downloads/Status/View/Actions; "No Material Added") | `booksPanel()` Books table (authored rows, chips, filters) | `books` already implemented → `library.html`; opens Materials (1st tab) by default | Optional refine `books`→`library.html#view=books`; else keep | H | 039 | keep (optional improve) |
| 6 | Library category mgmt | mgmt-library-002 ("Category Details": add + list + Edit) | `categoryDrawer()` `lib-cats` (name field + list + gated Save) | none | reuse; Save gated | H | 039 | keep |
| 7 | Library item add/edit/view/filter | mgmt-library-003 ("Add Material": name/type/category/**file**/**thumbnail**) | `libItemDrawer()` (name/type/category selects; upload = GATE, **no type=file**) | none | reuse; uploads stay gates | H | 039 | keep |
| 8 | Certificate template list | mgmt-pdf-full (Certificate Name/Background/Certificates/Action; +Add; "No data found") | `templatesPanel()` `CERT_TEMPLATES` cards | none (reached via `certificates`→Templates default tab) | keep | H | 039/031 | keep |
| 9 | Certificate designer | mgmt-pdf-create-full (drag/position, Font/Size/Color, X/Y/W mm, Upload Background, Save Settings) | `designerPreview()` STATIC CSS-span preview, `role="img"`, no canvas, upload gate | real editor absent by design | keep static preview; real editor = future backend | H | future-backend | defer(editor) / keep(preview) |
| 10 | Certificate request queue | mgmt-certificate-requests-full (Student/Course/Teacher/Description/Date/Action; "No data found") | `requestsPanel()` authored `CERT_REQUESTS` rows + status chips + filters | nav item is «قريبًا»; surface unreachable from sidebar | Unlock `certificateRequests`→`certificates.html#view=requests` | H | 039 | keep+improve(nav) |
| 11 | Cert request detail/review | (empty queue in capture; columns imply per-row detail) | `requestDrawer()` read-only review sheet per request | none | reuse | M | 039 | keep |
| 12 | Cert approve/reject/cancel | Action column (empty capture) | approve/reject/generate = `data-disabled-reason` gates | none | reuse gates; no status mutation | M | 039 | keep |
| 13 | Certificate preview | designer artwork; template cards | static template preview + `cert-create` PDF-preview gate | none | reuse; labelled preview only, never "generated" | H | 039/future | keep |
| 14 | Cert delivery / WhatsApp | (not captured for requests; legacy topbar WhatsApp only) | Send/deliver = gate; **no** gateway/credential | delivery is future backend | defer; keep Send as gate | M | future-backend | defer |
| 15 | Teacher→admin cert handoff | teacher roster "request certificate" (see handoff artifact) → admin queue columns Student/Course/Teacher | admin Requests tab is the review destination; teacher portal separate | handoff is display-only; real request = backend | document; admin review reachable via unlock | M | 039 (doc) | keep(doc) |
| 16 | Admin nav & route ownership | Spec 033 roadmap assigns materials/certificateRequests to 039 | nav.config admin category (5 items) | two «قريبًا» items | 2 nav flips; admin-menu stays 50; count stays 115 | H | 039 | improve |
| 17 | Empty/loading/error states | "No data found" / "No Material Added" | authored populated + `noResults` empty patterns | none | reuse; document states | H | 039 | keep |
| 18 | AR/EN & RTL/LTR | legacy bilingual (Name/name_ar); raw-key leak `messages.Materials` | mirrored `ar/en.adm.js`, `#view=` deep-links resolve to `.en.html` | none | verify parity + fresh-load routing | H | 039 | keep |
| 19 | Mobile & a11y risks | legacy wide empty tables (density/overflow risk) | existing responsive card/table + tabs a11y | none new (nav-only change) | a11y rows already cover library/certificates; add deep-link rows | H | 039 | keep |

**UNKNOWNs (not invented):** exact legacy certificate-request *status* vocabulary and delivery states (queue was
empty in capture) → the rebuilt `CERT_STATUS`/authored rows are used as the honest display; no legacy status
codes are copied. Real PDF generation, background upload, and WhatsApp/email delivery are **future-backend**.

---

## Forbidden for this scope (restated)
No fake persistence/upload/delete/approval/generation/issuance/delivery; no fake PDF; no fake WhatsApp/email; no
fake view/download metric mutation; no computed finance/score; no `<canvas>`; no `type=file`; no `type=password`;
no secrets/API/webhook; no backend/API/network; no `href="#"`; no raw keys; no dead buttons; no
`package.json`/dependency change; no teacher/family portal redesign.

## Proceeding to specify: **YES**
Evidence is complete and consistent; both targets have real, honest, reachable surfaces; the gap is purely the
two «قريبًا» nav locks. Recommended architecture = **Option B (nav-unlock deep-links, 0 new pages, count 115,
admin-menu 50)** — the proven Spec 037/038 pattern. Full disposition in `count-and-route-contract.md`.
