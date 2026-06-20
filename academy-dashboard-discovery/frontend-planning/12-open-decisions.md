<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **17-open-decisions-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 12 — Open Decisions (need your approval before implementation)

> Decisions to lock before we write Spec 001's spec‑kit command. Each has a recommendation; please confirm or change. Items are grouped: **A. Must decide before Spec 001**, **B. Decide before the module that needs it**, **C. Needs the platform owner / backend team** (can't be answered from the crawl).

## A. Must decide before Spec 001

| # | Decision | Recommendation | Why / impact |
|---|---|---|---|
| A1 | **Default language** | **Arabic‑first**, with English + 8 locales supported | The audience is an Arabic academy (Arabic names throughout data); drives default `dir=rtl`, font priority, and layout defaults. Legacy was captured in English only, so RTL is a fresh build requirement. |
| A2 | **Arabic‑first naming / bilingual content model** | Store + render bilingual fields (name + name_ar) everywhere the data model has them; UI strings via i18n keys, Arabic primary | Many entities already carry `*_ar` fields; avoids the legacy's leaked i18n keys (e.g. "messages.Create…"). |
| A3 | **Architecture: native JS, no SPA framework** | Confirm as stated; use small native‑JS module pattern + a light client router; server provides data (see C1) | You specified no SPA framework — confirming this shapes how the shell, routing, and state primitives are built in Spec 001. |
| A4 | **One design system, three role apps** (admin/teacher/family) | Yes — shared design system + component library, three separate route trees/nav configs | Roles are genuinely different apps; one mega‑sidebar would be worse. |
| A5 | **Brand identity** (name, logo, palette, font) | Create **original** identity now (or give us brand assets); pick an Arabic‑capable font | Legal: must not reuse legacy purple/logo/font as‑is. `--primary`/`--secondary` and font can't be finalised in Spec 001 without this. |
| A6 | **Light/Dark/System + themeable status colors** | Ship all three; make brand + 11 status colors themeable | Legacy already treats theming + per‑status colors as a product feature; users expect it. |

## B. Decide before the module that needs it

| # | Decision | Recommendation | Affects spec |
|---|---|---|---|
| B1 | **Role routing & guard model** | Admin = **permission‑set‑driven** (~170 flags + category scope); teacher/family = role‑fixed + own‑resource scope | 002, 004, 011 |
| B2 | **Module / build priority** | Admin → teacher → family, in the 001→012 order; Finance (007) splittable | all |
| B3 | **Include legacy utility/error pages?** | **Build proper** 404/500/403/timeout/export‑failed states; **drop** the broken `main/index.html` nav, broken profile views (rebuild them), and the timing‑out message‑builder (redesign blind) | 011, 009, 010 |
| B4 | **Design style direction** | Academy‑friendly, cheerful‑but‑professional, card‑based, calm surfaces + expressive status colors (per [09](09-design-system-direction.md)) | 001 |
| B5 | **Family "Billing" — can parents pay online?** | Decide: read‑only invoices vs real gateway checkout. Crawl found a billing *view* but **no pay form** | 007, 010 |
| B6 | **Exams/Quizzes** | Treat as a **gap**: scope the Forms/assessment builder; confirm with owner whether a real exam feature exists behind an un‑crawled route | 006 (see C5) |
| B7 | **Live classroom** (`session-class-room`) | Decide target: build a real classroom (video/whiteboard) as a separate spec, or embed an external meeting provider (Zoom creds exist on teachers) | 005, 009 |
| B8 | **Calendar week start** | Saturday‑first by default (family timetable uses it), locale‑configurable | 005, 009, 010 |
| B9 | **Duplicate routes** (teacher course‑history vs teacher‑history) | Consolidate to one | 009 |
| B10 | **Materials vs Library naming** | "Materials" = subjects catalog; "Library" = content. Rename legacy's misleading "Courses List" | 004 |

## C. Needs the platform owner / backend team (not answerable from the crawl)

| # | Question | Why it matters |
|---|---|---|
| C1 | **API contract & auth** — is there (or will there be) a JSON REST/GraphQL API? endpoint shapes, param names, auth tokens, pagination/sort conventions? | The legacy is server‑rendered HTML; we observed **no clean data API**. A native‑JS dynamic frontend needs one. This is the single biggest unknown. |
| C2 | **Real‑time mechanism** — WebSocket/SSE for chat, live session status, notifications? | Specs 005/008/009/010 depend on it. |
| C3 | **File upload/download/export flows** — incl. the 2 failing export endpoints, salary‑slip & certificate PDF generation, family voice upload. | Specs 007/006/010. |
| C4 | **Payment gateway flows** — server‑side flows for the 7 incoming + 2 payout providers; does family pay online? | Specs 007/010, B5. |
| C5 | **Does an Exams/Quizzes feature exist** beyond the Forms builder? | Confirms whether 006 builds it or logs a gap. |
| C6 | **Permission semantics** — exact meaning/granularity of the ~170 flags + category scoping. | Spec 002/004 guards & gated UI. |
| C7 | **Notification delivery internals** — how WhatsApp(free/pairing)/Email/App/Private actually send. | Spec 008/011. |
| C8 | **Multi‑currency conversion timing** — when/how amounts convert to base (AED); are FX rates point‑in‑time on invoices? | Spec 007 correctness. |
| C9 | **Data import/migration** — the 4 CSV import shapes; legacy data migration plan. | Spec 011. |
| C10 | **Certificate `json_data`** — canvas serialization format + PDF render service. | Spec 006. |

## Uncertainties / honesty flags carried from discovery
- RTL behaviour of the legacy UI is **unknown** (English‑only crawl) — our RTL is a forward design, validated fresh.
- Mutating flows were **never executed**; success/error/validation states are **inferred**.
- Many lists were **empty** in test data; row‑level/edge rendering inferred from column sets.
- Field names are legacy DOM `name`s — **hints, not the API contract** (depends on C1).
- ~230 admin pages were confirmed as query‑param variants, not individually opened (deterministic; see [00](00-source-reading-log.md)).

> Please mark each A‑item Approved/Changed, give a steer on B‑items, and route C‑items to the owner/backend. Once **A1–A6** are settled we can draft the Spec 001 spec‑kit command.
