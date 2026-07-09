# Certificate & File Scope — Spec 031

Defines what the certificate, materials/books, and file surfaces may display, the hard file/PDF prohibitions, and the grep strategy. Grounded in the certificates + materials audits (`legacy-management-content-coverage.md` §B/§C). **This is the highest fake-generation-risk area in the spec** — legacy renders real PDFs via FPDF and opens live `/certificate/{id}/preview`.

## Allowed certificate / template display
- Certificate **templates list**: display-only rows (name, background-thumbnail as an authored image reference, usage-count literal).
- Certificate **designer**: a **static, non-interactive preview** of an authored template layout (labels positioned by baked fixture data). No drag, no reposition, no properties panel that mutates, no background upload.
- Certificate **requests queue**: display-only rows (student, course, teacher, description, date, status chip).
- Certificate **details**: read-only drawer listing authored issued-certificate rows; the "Options" column is non-actionable text.

## Forbidden — real certificate/PDF generation
- **No `<canvas>`** anywhere (the legacy designer is jQuery-UI drag-drop, not canvas — but the rebuild must not introduce canvas either).
- **No jQuery-UI `.draggable()`** / live positioning / `json_data` serialization / FPDF command building.
- **No real PDF**: no `.pdf` href, no `window.open('.../preview')`, no `blob:`/`URL.createObjectURL`, no `<a download>`.
- **No fake generation/approval**: Approve/Reject/Generate/Preview/Send/Create-certificate are `backendRequired`/disabled-with-reason gates; none mutates a status chip, opens a file, or dispatches WhatsApp; no fake "Success!"/«تم».

## Allowed materials/books display
- Subject (materials) rows: name + name_ar (display-only); Add/Edit = name-only backendRequired modal.
- Book/library rows: name, type chip, category, published-at literal, views/downloads **count literals** (authored, not computed), status chip.
- Library categories: read-only list + name-only modal.

## Forbidden — real file upload/download/storage
- **No `type="file"`** anywhere (legacy Add-Material has `file`+`thumbnail`; Import has 4×`type=file`; logo/avatar uploads) → all become gates.
- **No real download**: no `.pdf`/`.csv`/`.xlsx` asset href, no `download` attribute, no `blob:`.
- **No fake publish**: Publish/Delete = backendRequired gates; no status flip.
- **No file storage / no template schema** (the Import "Download Template" that exposes a `password:123456` family column is excluded).

## Certificate approve/reject/generate/send gate rules
| Action | Rule |
|---|---|
| Approve / Reject | backendRequired gate/confirm; **no status mutation** |
| Generate-PDF / Preview / Download | gate; **no file, no window.open** |
| Send (WhatsApp/email) | gate; **no dispatch** |
| Create-certificate / Upload-certificate | modal / gate; **no `type=file`** |
| Designer Save | backendRequired modal; **no persist, no upload** |

## Materials/books upload/download gate rules
| Action | Rule |
|---|---|
| Add-Material / Upload / thumbnail | gate; **no `type=file`** |
| Download | gate; **no asset href** |
| Publish / Delete | gate; **no mutation** |
| Category Add/Edit | name-only backendRequired modal |

## Smoke grep strategy (built certificate/materials/books bodies)
```
noCanvas   = !/<canvas|chart\.js|apexcharts|amcharts|data-chart/i
noDrag     = !/ui-draggable|\.draggable\(|jquery-ui|json_data|SetFont|SetXY?|FPDF/i
noFile     = !/type="file"/i
noPdf      = !/\.pdf\b|\.csv\b|\.xlsx\b|blob:|URL\.createObjectURL|download=|window\.open/i
noFakeGen  = FAKE guard (no تم / بنجاح / Success / generated / issued on cert controls)
noMutate   = before/after snapshot on Approve/Publish/Delete confirm (status chips unchanged)
figureFree = !/ريال|SAR|جنيه|EGP|AED|EUR|[$€£]/  (no pay figure on staff/materials/cert bodies)
gates      = [data-disabled-reason] present for Upload/Download/Generate/Approve/Publish/Send
```
Protected role-law regexes stay **byte-verbatim**. This block is additive, modeled on the finance `f30` block.
