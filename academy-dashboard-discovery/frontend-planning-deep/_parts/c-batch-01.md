# Batch 1 — Admin · Certificates

---

### `management-certificate-requests` — Certificate Requests

- **Purpose:** Lists all student certificate requests submitted to admin, allowing the admin to review, preview, and approve or cancel each request.
- **Key sections / flows:** Single H5 "Certificate Requests" heading; one data table with columns: #, Student Name, Course Name, Teacher Name, Description, Date, Action. Table currently shows "No data found" (empty state). Three select filters (two unlabeled + Month). Pagination present (1 page). A navigation link "Certificate Templates" points to `management-pdf`.
- **Key SAFE actions:** View table rows, apply filters (select + Month), paginate, navigate to Certificate Templates list.
- **Key MUTATING/dangerous actions:** "Approve" (triggers approve modal — sends certificate to student, optionally via WhatsApp); "Cancel" (cancels/rejects the request); "Save" (inside the Approve modal, persists template selection and settings).
- **Important modals/forms:**
  - *Approve modal* — fields: Student Name (display), Teacher Name (display), Description (display), Date (display), Certificate Template (select), send-to-WhatsApp toggle (Send group / Send Private Message / Don't send), link field; buttons: Preview, Cancel, Approve. This is the highest-risk modal: Approve dispatches the certificate, Cancel rejects the request, and WhatsApp send options have external side effects.
- **Variant-of:** unique template
- **Broken/empty:** Table shows "No data found" — may be genuinely empty data or a data-load failure; logo image returns 404 (`/storage/uploads/logo.png`).
- **UX improvement for the rebuild:** The Approve modal mixes display fields, template selection, and external-send options in one step with no confirmation gate — split into a two-step flow: (1) select template and preview, (2) confirm send channel and approve, with an explicit destructive-action confirmation dialog before final submission.

---

### `management-pdf` — Certificate Templates

- **Purpose:** Displays the library of reusable certificate PDF templates; entry point for creating new templates and linking to the requests queue.
- **Key sections / flows:** Single H5 "Certificate Templates" heading; one data table with columns: #, Certificate Name, Background, Certificates (count/link), Action. Table shows "No data found" (empty state). "Add" button (link) navigates to `management-pdf-create`. Pagination present (1 page). No filter controls on this page.
- **Key SAFE actions:** View template list, paginate, navigate to Certificate Requests, navigate to Create Template (Add link).
- **Key MUTATING/dangerous actions:** "Add" link (navigates to create form — initiates creation flow); row-level Action column (not fully detailed in capture, but expected to include edit/delete per standard CRUD pattern).
- **Important modals/forms:** None specific to this page beyond global chrome modals (Recent Searches, Add shortcuts — both skipped per rules).
- **Variant-of:** unique template
- **Broken/empty:** Table shows "No data found"; logo 404 same as above.
- **UX improvement for the rebuild:** Add an inline empty-state illustration and a prominent "Create your first template" call-to-action in the table body rather than relying on the top-right Add button, which is easy to miss when the table appears empty.

---

### `management-pdf-create` — Certificate Designer

- **Purpose:** A canvas-based visual editor for creating a new certificate PDF template, allowing background image upload and placement of text elements (e.g., Student Name) with typography controls.
- **Key sections / flows:** H5 "Certificate Designer"; H6 "Student Name" (representing one draggable text element on the canvas). Two content cards: (1) designer canvas area with background upload and "Save Settings" submit; (2) typography/positioning panel for the selected text element with controls for Font (Helvetica / Arial / Times New Roman / Courier), Style (Bold B, Italic I, Underline U checkboxes), Size (range slider, default 20px), Color (color picker + hex text input), Alignment (radio: left/center/right/justify), X/Y/W position inputs in mm. Form `certForm` POSTs to `management/pdf` with `name`, `background` (file), and `json_data` (hidden, serialized canvas layout). 235 network requests captured, indicating heavy asset/canvas loading.
- **Key SAFE actions:** Upload background image preview, adjust typography controls (live preview on canvas), change text alignment, move/resize text element via X/Y/W inputs.
- **Key MUTATING/dangerous actions:** "Save Settings" (submits `certForm` — creates/saves the certificate template to the backend); no delete on this page.
- **Important modals/forms:**
  - *Certificate create form (`certForm`)* — key fields: `name` (Certificate Name, required text), `background` (file upload, optional), `json_data` (hidden, serialized JSON layout), Font select, B/I/U checkboxes, Size range, Color picker, Alignment radios, X/Y/W number inputs. Posts to `POST /management/pdf`.
- **Variant-of:** unique template
- **Broken/empty:** No table; logo 404 persists. No edit route observed — unclear whether this same designer is reused for editing existing templates (needs backend confirmation).
- **UX improvement for the rebuild:** Replace the raw range/number inputs for position and size with a proper drag-and-drop canvas (e.g., Konva.js or Fabric.js) with snap-to-grid and real-time mm readout, and add undo/redo history; the current form-only positioning with X/Y/W numbers is error-prone and not WYSIWYG.

---

## Module synthesis (this batch)

**What this module does and its core entities:**
The Certificates module handles the full lifecycle of student completion certificates: admins design reusable PDF templates (with background images and positioned text elements), and then fulfill student requests by selecting a template, previewing the output, and dispatching the certificate (optionally via WhatsApp). Core entities: `CertificateTemplate` (name, background image, JSON layout), `CertificateRequest` (student, course, teacher, description, date, status).

**Distinct page templates vs variant count:**
- 3 unique page templates (no pure query-param/status variants in this batch).
- 0 variant pages.

**Cross-cutting interactions (modals/filters/tabs) and which are dangerous:**
- *Approve modal* (on certificate-requests): dangerous — triggers Approve (dispatches certificate + possible WhatsApp send) and Cancel (rejects request). No intermediate confirmation gate observed.
- *Month filter + 2 unlabeled selects* (on certificate-requests): safe server-side filters.
- Global chrome modals (Recent Searches, Add shortcuts, notifications loading modal) appear on all three pages — these are cross-cutting but not module-specific and should be extracted as shared layout components in the rebuild.

**Improvements for the new platform:**
1. **Two-step Approve flow with confirmation:** Split the current single Approve modal into: Step 1 — template selection + preview; Step 2 — channel selection (WhatsApp group / private / none) + irreversible Approve confirm with clear destructive styling.
2. **Empty/error states:** All three pages currently show bare "No data found" table rows. Replace with illustrated empty states, contextual CTAs, and distinct error states (network failure vs. truly empty).
3. **Certificate Designer — WYSIWYG canvas:** Replace raw X/Y/W number fields with a drag-and-drop canvas (Fabric.js / Konva.js), undo/redo, snap guides, and live PDF preview. The current approach requires pixel/mm mental arithmetic.
4. **RTL-first layout:** All three pages are LTR (`dir: ltr`), but the platform serves Arabic users. The rebuild must flip the sidebar, table column order, and text alignment for RTL; the designer canvas must also handle RTL text rendering (especially for Arabic student names on certificates).
5. **Filter labeling:** The two unlabeled `<select>` filters on certificate-requests have no accessible labels — the rebuild must provide visible labels and ARIA attributes.
6. **Row actions menu:** The Action column in both list pages should use a kebab/overflow menu pattern with explicit confirmation dialogs for destructive actions (delete template, cancel request), rather than bare inline buttons.
7. **Pagination and search:** Both list pages need server-side pagination with page-size control and a search/filter bar (course, teacher, date range for requests; name search for templates).
8. **Logo 404:** The platform logo at `/storage/uploads/logo.png` returns 404 on all pages — the rebuild should use a reliable asset path or CDN reference.
9. **Mobile:** The designer canvas is inherently desktop-heavy; on mobile, degrade gracefully to a read-only preview with edit redirecting to desktop.
10. **Accessibility:** Modal focus trapping, Escape-to-close, `role="dialog"`, and `aria-labelledby` are absent in the current implementation — all modals in the rebuild must comply.

**Needs owner/backend confirmation:**
- Whether `management-pdf-create` doubles as the edit route for existing templates (no edit URL was discovered; the form POSTs to `POST /management/pdf` which suggests create-only).
- The exact WhatsApp integration mechanism (whether "Send group" and "Send Private Message" are via a configured WhatsApp Business API or a manual link; this affects the approve flow design).
- The two unlabeled filter selects on certificate-requests — their intended filter dimensions (status? teacher? course?) must be confirmed with the backend team.
- Whether `json_data` in the designer form is a proprietary schema or a standard canvas serialization format — important for the rebuild's canvas library choice.
