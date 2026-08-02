# C10 — Content, Materials, Certificates · Capability Audit (Spec 042)

**Method (honest counts)**: **35 screenshots opened AS IMAGES** with the Read tool (**23 legacy** — every full +
every interaction frame in the C10 path list — and **12 current**) and **27 records** read at source:
**9 legacy page records** (`output/roles/*/pages/*.json` — forms · modals · tables · filters · buttons ·
interactions), **3 legacy RAW HTML files** (`management-certificate-requests.html`, `management-student-1.html`,
`teacher-studentslist.html` — the only places the certificate workflow's real field sets, endpoints and handlers
live), **4 combined inventories** (`table-inventory`, `form-inventory`, `missing-coverage`,
`role-permission-matrix` / `skipped-actions`), **9 current source modules** and **2 prior Spec contracts**.
Where a planning summary and a raw record disagreed, **the record won** (see §6 Evidence conflicts).

---

## 1. What the legacy actually is (proved from pixels + raw records, not summaries)

The cluster is **three unrelated things wearing one nav group**:

**(a) "Materials" is NOT a materials library — it is the SUBJECT/COURSE catalog.**
`/management/materials` renders **`Courses List`** (breadcrumb `Dashboard › Courses List`, card title
`Courses`, primary `+ Add Course`) with a **2-data-column** table `# · Name · name_ar · Settings` and a single
authored row (`arabic / اللغه عربيه`). The row kebab (pixel-proven in
`management-materials-002-page-interaction-002.png`) carries exactly **Edit · Delete** — nothing else.
`/management/materials/create` and `/management/materials/1/edit` are the SAME 2-field form
(`name`, `name_ar` → `Submit`; raw form action `POST /management/materials`, edit posts to
`/management/materials/1` with `_method`). **Two fields. That is the whole legacy "material" object** — no file,
no thumbnail, no description, no price.

**(b) "List of Books" (`/management/library`) is the media library.** Table (empty — "No Material Added"):
`# · Book Name · Category · Published at · Views · Downloads · Status · View · Actions` (**9 columns**).
Toolbar: a **`Filter Media`** select (`Files · Video · Images · Audio · Links`), **`Categories`**, **`+ Add Material`**.
Modals (raw record `management-library.json → modals`):
- `materialexample` "**Add Material**" — **5 fields**: `name` (text) · `type` (select ×5) · `category_id` (select) ·
  **`file` (type=file)** · **`thumbnail` (type=file)** → `Save changes` (`POST /management/library`).
- `exampleModal` "**Category Details**" — `name` (text) + an **All Categories** table
  (`Category name · Total of material · Action=Edit`) + `Save changes`. Category **create AND per-row edit** in one modal.
- `libShowModal` "**Details**" — the item detail sheet ("*This material is provided solely for educational purposes
  and enrichment.*"), reached from the table's **`View`** column.

**(c) Certificates = a three-role workflow, and the crawl's own summary gets it wrong.**
- `/management/pdf` = **Certificate Templates** (`# · Certificate Name · Background · Certificates · Action`, `+ Add`; empty).
- `/management/pdf/create` = **Certificate Designer** — a live WYSIWYG: `Certificate Name` · **`Upload Background`**
  (`type=file`) · a stage with **4 draggable merge boxes** (Student Name · Description · Teacher Name · Date) over
  certificate artwork · a per-element properties panel (**Font** select · **B/I/U** · **Size** range · **Color**
  picker+hex · **Alignment** ×4 radios · **X (mm) · Y (mm) · W (mm)** numbers) · **`Save Settings`**.
  Raw `certForm` fields: `name`, `background` (file), **`json_data` (hidden — the serialized layout)** + the 11
  property controls ⇒ **~15 controls**. The sample renders a REAL teacher name (**"Marawan Farag"**).
- `/management/certificate-requests` = the approval queue (`# · Student Name · Course Name · Teacher Name ·
  Description · Date · Action`) + `Certificate Templates` link. Row actions (from the raw handlers, not the DOM —
  the table is empty): **`.approveCertificate`** → the **`certApproveModal`**, and **`.rejectCertificate`** →
  a SweetAlert confirm → `POST /management/certificate/{id}/reject`.
- **`certApproveModal` "Approve" — 7 controls** (raw HTML, verbatim): `cert-student_name` · `cert-teacher_name` ·
  `cert-description` (textarea) · `cert-date_certificate` (flatpickr `YYYY-MM-DD`) · **`cert-template`** (select,
  required) · **`cert-send` = Send to WhatsApp {Don't send · Send group · Send Private}** ·
  `cert-message` ("Message (add link") — plus a **`Preview`** button that does
  `window.open('/management/certificate/{id}/preview?template=…&student_name=…', '_blank')` and an **`Approve`**
  that `POST`s `{pdfcertificat_id, send_type, message, student_name, teacher_name, description, date_certificate}`
  to `/management/certificate/{id}/approve` then fires `Swal.fire("Success!")` and removes the row.
- **The requests have an ORIGIN the combined summaries deny: the TEACHER.**
  `teacher/html/raw/teacher-studentslist.html` carries `#certificateRequestModal` →
  **`POST /teacher/certificate-request`** with `course_id` (hidden) + **Student Name (RO) · Course Name (RO) ·
  `description` (required, max 250) · `date_certificate` (required)** and the note
  *"This request will be sent to management for approval and template selection."*
- **Two more admin certificate surfaces live on the STUDENT profile** (`/management/student/1`, C-students page but
  a C10 capability): a per-course **`Certificates` count badge** → `#create-certificate` "Certificate Details"
  modal (`# · certificate · Options`, loaded by `POST /management/certificates-student`), a
  **`Create Certificate`** item → `#onboardHorizontalImageModal` "Certificate Information"
  (**5 visible fields**: Student Name · Teacher Name · Description (250, counter) · Date · **Certificate Template**
  (required) + 3 hidden ids → `POST /management/create-certificate`), and an **`Upload Certificate`** item →
  `uploadForm` **`POST /management/upload-certificate`** (`fileInput` + `student_id` + `course_id`).
- **The family/guardian role has NO certificate surface at all** (grep of `family/html/raw/**` = 0 hits).
  In the legacy the guardian only ever receives the certificate **over WhatsApp**.

**(d) The role libraries** (`/teacher/library`, `/student/library`) are the same page twice: a marketing hero
("*Education and talents — All in one place*" / "*Education, talents, and career opportunities*"), a **Search**
box (`search_form`: `query` + `filter`) and an **"All Categories"** select (searchable; the only category is
`اللغه العربيه`) over an **empty** grid. No upload, no per-item action evidenced (the library was empty).

---

## 2. What we ship today (read at source)

`pages/library.js` (144 ln) = a 2-tab hub — **Materials** (the 6-row `SUBJECTS` subject catalog; `mat-add` /
`mat-edit` 2-field drawers; delete confirm) and **Books & Library** (the 6-row `BOOKS` catalog with
search + type + category `filterBar`; `lib-item` add drawer = 3 fields + upload/thumbnail **gates**; `lib-cats`
drawer = category list + counts + a name/status create form; per-row Download/Publish gates + Delete confirm).
`pages/certificates.js` (155 ln) = **Templates** (4 `CERT_TEMPLATES` cards + usage literal + the **static designer
preview**: 4 CSS-positioned `<span>`s, `role="img"`, no `<canvas>`, no drag, no `json_data`) and **Requests**
(5 `CERT_REQUESTS` rows + status chips + a per-row read-only `cr-*` drawer with Generate-PDF/Preview/Download/Send
gates + Approve/Reject **gates** + an `Issue certificate` 5-field drawer + an `Upload certificate` gate).
Role side: `teacher-library.js` (3 authored cards, upload/download gate notes),
`family-materials.js` (items grouped **by child**, download gate), `student-materials.js` (grouped by course).
Issued certificates surface once more in `components/result-summary.js` (admin student profile → Results tab).

---

## 3. Capability ledger

See the normalized disposition summary below (27 rows, `C10-01 … C10-27`), mirrored 1:1 into the master
`legacy-current-capability-ledger.md`. Headlines:

- **The legacy "material" is 2 fields and we ship 2 fields** → the subject catalog is genuinely COMPLETE.
- **The certificate designer is our biggest control-count gap: ~15 legacy controls → 1** (name). This is a
  *sanctioned* gap — Spec 031 `certificate-pdf-gate-contract.md` forbids `<canvas>`, drag, `json_data`, FPDF and
  background upload — but it must be booked as **PARTIAL + FUTURE_BACKEND**, never as "done".
- **The approve path is 7 legacy controls → 0** (a bare gate). The template pick + delivery choice + message that
  the legacy demanded at approval time exist in our product only inside a *separate* `Issue certificate` drawer,
  and that drawer has **no delivery control at all**.
- **The teacher's `Request Certificate` — the ONLY honest origin of the whole request queue — does not exist in our
  product.** Our admin queue therefore shows five requests that nothing in the product could have created.

---

## 4. What we deliberately do BETTER (preserve — do not "fix" back)

1. **No fake `Success!`** — the legacy `Approve` fires `Swal.fire("Success!")` and *deletes the row from the DOM*
   whatever the server said. Ours is a gate with an honest reason.
2. **No `window.open` PDF** — the legacy Preview opens a server-rendered PDF in a new tab; ours is a gate.
3. **Delete is confirmed.** The legacy subject `Delete` (kebab) posts straight from a form with **no confirm**
   evidenced anywhere in the record. We ship `data-confirm` + a backendRequired final.
4. **The library table gains a labelled TYPE chip column** (legacy exposed type only through the `Filter Media`
   select) and **two more filters** (search + category) than the admin legacy had (1).
5. **The certificate-requests queue gains a labelled STATUS chip** (legacy had **no** status column at all).
6. **Family materials are grouped by CHILD** (Spec 020) instead of the legacy's generic hero + category dropdown —
   the guardian's real mental model.
7. **No real PII / no secrets ported**: the legacy pages ship a live CSRF token in the HTML, a real manager
   identity (`Eslam Essam · eslammekky@gmail.com`), real student/teacher names (`محمد احمد`, `Marawan Farag`,
   `المعلم محمد صادق صادق`). None of it is in our fixtures.

---

## 5. What we must NOT copy (REJECTED_*)

- **`Send group` in the approve modal** (`cert-send` option `group`) — approving a certificate can push a NAMED
  CHILD's certificate + a link into a shared WhatsApp **group**. That is a cross-family disclosure of a minor's
  record. **REJECTED_PRIVACY**; if certificate delivery is ever built, it is **private, per-guardian, opt-in only**
  (owner **043**, delivery mechanics **053**).
- **The fake success + optimistic row removal** on Approve/Reject → **REJECTED_NO_FAKE** (already honoured).
- **Real PII in the designer sample** (`Marawan Farag`) and the embedded CSRF token → **REJECTED_PRIVACY / SECURITY**.
- **`type=file` uploads** (Add Material `file`+`thumbnail`, `Upload Background`, `upload-certificate`) stay
  **gates** until a real server exists (Spec 031/039 `no-file-upload-download-contract`).

---

## 6. Evidence conflicts (resolved from raw records)

1. `combined/missing-coverage.md:209` and `role-permission-matrix.md:24` state **Certificates: present for admin,
   ABSENT for teacher & family**. **FALSE for teacher**: `teacher/html/raw/teacher-studentslist.html` contains a
   live `#certificateRequestModal` posting to `/teacher/certificate-request`. The crawler missed it because the
   modal is triggered from a per-row link on the students list, and the module tagger only saw the admin routes.
   **Raw HTML wins** — the teacher IS a first-class actor in this cluster.
2. The C10 path list titles `management-materials` as **"Courses List"** and the module tag says
   *Content / Materials / Library*. The pixels + the form (`name`, `name_ar`) prove it is the **subject catalog**,
   not a media library. Our Spec-031 reading ("Materials = bilingual subject catalog") is the correct one.
3. Legacy `library` / `pdf` / `certificate-requests` tables are **ALL EMPTY** in the crawl ("No Material Added" /
   "No data found"). Therefore every per-row **Actions** cell in those three tables is **UNPROVEN** — we cannot say
   what a book row's Actions offered, nor a template row's. Anything we assert there is UNKNOWN_EVIDENCE.

---

## 7. Visual verdict (current vs legacy vs an academy identity)

- `library.html` (both tabs) and `certificates.html#view=requests` read as clean, warm, cream-and-violet academic
  tables — **better than the legacy's generic Bootstrap admin**. Keep.
- **`certificates.html#view=templates` needs a redesign pass**: the "static designer preview" renders as a large
  EMPTY dashed rectangle with four floating grey label chips. Against the legacy's actual certificate artwork it
  reads as a broken/unfinished canvas rather than an honest preview. It should look like a *certificate*
  (rule border, seal, ribbon, calligraphic frame — all CSS, still zero canvas/drag) with the merge-field labels
  sitting *on* it. → **COMPLETE_BUT_VISUAL_REVIEW_REQUIRED**, owner **045–050**.
- `teacher-library` is three cards on a wide empty page — the emptiest surface in the cluster. Needs the search +
  category affordance the legacy had, and real content propagation from the admin library.
- Empty/loading/error states: our library/certificates tabs have **no authored empty state** (fixtures are never
  empty) — the legacy's three empty states ("No Material Added" / "No data found") are the states a real academy
  will actually see on day one. **State coverage gap** across the whole cluster (owner 045–050 / 057).

---

## Disposition summary (normalized — Spec 042 ledger source)

Derived strictly from the sections above. The table below IS the structured ledger §3 references — 27 rows,
`C10-01 … C10-27`, mirrored 1:1 into the master `legacy-current-capability-ledger.md`. Owners marked `*` were
not named in the audit text and are assigned by normalization from the Spec-042 binding future-owner register
(flagged to the orchestrator).

| capId | capability | disposition | owner | evidence anchor |
|---|---|---|---|---|
| C10-01 | Subject/course catalog list + row kebab (Edit·Delete) | COMPLETE_AND_VERIFIED | — | §1(a) + §3 |
| C10-02 | Subject create/edit form (name · name_ar; field-level 2=2) | COMPLETE_AND_VERIFIED | — | §1(a) + §3 |
| C10-03 | Subject delete (legacy unconfirmed POST → data-confirm + backendRequired) | INTENTIONALLY_IMPROVED | — | §4.3 |
| C10-04 | Media library book list (9-col) + labelled type chip + search/type/category filters | INTENTIONALLY_IMPROVED | — | §1(b) + §4.4 |
| C10-05 | Add Material form (legacy 5 fields → 3 shipped) | PARTIAL | 056* | §1(b) + §2 |
| C10-06 | Add Material `file` + `thumbnail` upload | FUTURE_BACKEND | 056* | §1(b) + §5 |
| C10-07 | Category Details modal (legacy create + per-row edit; per-row edit not shipped) | PARTIAL | 056* | §1(b) + §2 |
| C10-08 | Library item detail sheet (`libShowModal` via View column) | MISSING | 044* | §1(b) + §2 |
| C10-09 | Certificate templates surface (static designer preview) | COMPLETE_BUT_VISUAL_REVIEW_REQUIRED | 045-050 | §7 |
| C10-10 | Certificate designer WYSIWYG (~15 controls → 1; sanctioned by Spec-031 gate contract) | PARTIAL | 044* | §1(c) + §3 |
| C10-11 | Certificate requests queue list (+ labelled STATUS chip legacy lacked) | INTENTIONALLY_IMPROVED | — | §1(c) + §4.5 |
| C10-12 | Approve modal (7 controls → 0; template/delivery/message at approval time) | PARTIAL | 056* | §1(c) + §3 |
| C10-13 | Certificate Preview (legacy `window.open` PDF → honest gate) | INTENTIONALLY_IMPROVED | — | §4.2 |
| C10-14 | Approve/Reject fake `Success!` + optimistic row removal | REJECTED_NO_FAKE | — | §4.1 + §5 |
| C10-15 | `Send group` WhatsApp delivery in the approve modal | REJECTED_PRIVACY | 043 | §5 |
| C10-16 | Teacher `Request Certificate` modal (`POST /teacher/certificate-request`) | MISSING | 055* | §1(c) + §3 + §6.1 |
| C10-17 | Student-profile per-course certificates list (`Certificate Details` modal → Results tab) | PARTIAL | 044* | §1(c) + §2 |
| C10-18 | Create/Issue certificate (5-field drawer; no delivery control shipped) | PARTIAL | 056* | §1(c) + §3 |
| C10-19 | Upload certificate (`POST /management/upload-certificate`) | FUTURE_BACKEND | 056* | §1(c) + §5 |
| C10-20 | Guardian certificate delivery (private, per-guardian, opt-in only) | FUTURE_BACKEND | 053 | §1(c) + §5 |
| C10-21 | Teacher library page (search + category affordance + content propagation) | PARTIAL | 045-050* | §1(d) + §7 |
| C10-22 | Student/child-view materials page (legacy search + category select) | PARTIAL | 045-050* | §1(d) + §2 |
| C10-23 | Family materials grouped by child | INTENTIONALLY_IMPROVED | — | §4.6 |
| C10-24 | Real legacy PII (designer sample, manager identity, student/teacher names) not ported | REJECTED_PRIVACY | — | §4.7 + §5 |
| C10-25 | Live CSRF token embedded in legacy HTML | REJECTED_SECURITY | — | §5 |
| C10-26 | Per-row Actions of the three empty legacy tables (library · pdf · certificate-requests) | UNKNOWN_EVIDENCE | 045-050* | §6.3 |
| C10-27 | Authored empty/loading/error states across the cluster | MISSING | 045-050 | §7 |

Honest counts: screenshotsOpened=35 · recordsInspected=27 · currentSourceFiles=9
