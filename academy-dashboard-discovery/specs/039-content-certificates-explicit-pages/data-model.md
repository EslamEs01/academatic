# Data Model — Spec 039 (REUSE ONLY)

Spec 039 introduces **no new entity, field, fixture, computed value, status, or persistence model**. It reuses the
existing authored, display-only fixtures verbatim (0-diff). This document records the reused shapes and counts as
re-confirmed from `src/js/fixtures/content-library.js` and `src/js/fixtures/certificates.js`.

## Content library (`fixtures/content-library.js`) — 0-diff
| Fixture | Count | Fields (authored literals; no pay, no computed, no PII) |
|---|---|---|
| `SUBJECTS` | **6** | bilingual `name` / `nameAr` (subjects: arabic, english, math, science, quran, coding) |
| `BOOKS` | **6** | name · type · category · publishedAt · **views (literal)** · **downloads (literal)** · status |
| `BOOK_TYPES` | **5** | `file`, `video`, `image`, `audio`, `link` (each `{tone, icon, labelKey}`) |
| `BOOK_STATUS` | **3** | `published`, `draft`, `archived` |
| `BOOK_CATEGORIES` | **6** | name + authored `count` literal (arabic/english/math/science/quran/coding) |

## Certificates (`fixtures/certificates.js`) — 0-diff
| Fixture | Count | Fields |
|---|---|---|
| `CERT_TEMPLATES` | **4** | completion/excellence/attendance/quran; authored `usageCount` literal |
| `CERT_DESIGNER.fields` | **4** | student/course/teacher/date; static `x`,`y` % coords (no interactivity) |
| `CERT_STATUS` | **3** | `pending`, `approved`, `rejected` (+ `CERT_STATUS_ORDER`) |
| `CERT_REQUESTS` | **5** | `id, studentKey, courseKey, teacherKey, descKey, dateKey, statusId` |
| `CERT_ISSUED` | **2** | `id, labelKey, statusId` |

## Entity semantics (display-only)
- **Material/Subject** = `{ name, name_ar }` — a bilingual subject; NEVER a "Course" (fixes the legacy mislabel).
- **Content item (Book)** = `{ name, type∈BOOK_TYPES, category, publishedAt, views(literal), downloads(literal),
  status∈BOOK_STATUS, thumbnail(gated) }`. Views/downloads are authored literals — **never computed or mutated**.
- **Content category** = `{ name, count(literal), status }`.
- **Certificate template** = `{ name, background(gated upload), fields(static x,y), usageCount(literal) }`.
- **Certificate request** = `{ student, course, teacher, description, date, status∈CERT_STATUS }`.
- **Certificate (issued)** = display-only `{ label, status }`; issuance is future-backend.

## Invariants (must hold after Spec 039 — proven by 0-diff)
- No new fixture file; no new field; no computed metric; no `type=file`; no `<canvas>`; no persistence.
- Views/downloads/usageCount/count stay authored literals; request status is authored, never mutated by any action.
- Fixture counts remain exactly: SUBJECTS 6 · BOOKS 6 · BOOK_TYPES 5 · BOOK_STATUS 3 · BOOK_CATEGORIES 6 ·
  CERT_TEMPLATES 4 · CERT_DESIGNER.fields 4 · CERT_STATUS 3 · CERT_REQUESTS 5 · CERT_ISSUED 2.

## State transitions
**None.** All boards are display-only; every write (create/edit/delete/upload/publish/download/approve/reject/
generate/preview/send) ends at a `backendRequired`/`data-disabled-reason` gate or a confirm-then-gate. No status
transition occurs client-side.
