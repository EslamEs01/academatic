# 17 — Open Decisions (v2)

> Confirmed and expanded after the exhaustive read. Supersedes v1 [12-open-decisions.md](../frontend-planning/12-open-decisions.md). Same structure: **A** = decide before Spec 001, **B** = decide before the owning module spec, **C** = needs platform owner / backend. New items from the deep pass are tagged **(deep)**.

## A. Before Spec 001
| # | Decision | Recommendation |
|---|---|---|
| A1 | **Default language** | Arabic‑first (RTL default), + English & 8 locales. Legacy captured English‑only → RTL is a fresh requirement. |
| A2 | **Bilingual content model** | Render `name`/`name_ar` pairs everywhere they exist; i18n keys (avoid legacy's leaked `messages.*` keys). |
| A3 | **Native JS, no SPA framework** | Confirm; light client router + fetch modules + URL‑synced state. |
| A4 | **One design system, three role apps** | Yes (verified: 3 URL namespaces, 3 shells, 145/22/11 templates). |
| A5 | **Brand identity** (name/logo/palette/font) | Create original; pick Arabic‑capable font. Legacy = purple+amber (reference only, do not copy). |
| A6 | **Light/Dark/System + themeable status colors** | Ship all three; make brand + the **11 session‑status colors** themeable (legacy already exposes this). |

## B. Before the owning module spec
| # | Decision | Recommendation | Spec |
|---|---|---|---|
| B1 | Role routing & guards | Admin = permission‑set (~170 flags + category scope); teacher/family = role + own‑resource scope | S002/S004/S011 |
| B2 | Module/build priority | Admin → teacher → family, S001→S012 order | all |
| B3 | Legacy utility/error pages | Build proper 404/500/403/timeout/export‑failed; **drop** the broken `main/index.html` nav, broken profile views (rebuild), the 504 message‑builder; **(deep)** also rebuild the 4 newly‑found admin 500s (export‑course, families‑feedback‑family‑1, 2× new‑requests‑scheduled‑trials‑index, teachers‑1‑monthly‑classes) | S009/S010/S011 |
| B4 | Design style | Academy‑friendly, cheerful‑but‑professional, card‑based, expressive status colors ([14](14-design-system-direction-v2.md)) | S001 |
| B5 | Family online payments? | Decide: read‑only billing vs real gateway checkout (no pay form found on `/student/billing`) | S007/S010 |
| B6 | Exams/Quizzes | Treat as gap; scope the Forms builder; confirm a real exam feature exists | S006 |
| B7 | Live classroom | `session-class-room` falls back to home in legacy → decide real classroom (video/whiteboard) vs embed external (Zoom creds exist) | S005/S009 |
| B8 | Calendar week start | Saturday‑first default (family timetable), locale‑configurable | S005/009/010 |
| B9 | Duplicate teacher history routes | Consolidate `course-history` + `teacher-history` | S009 |
| B10 | Naming | "Materials" (subjects) vs "Library" (content); fix `downlaod` typo | S004/S007 |
| B11 **(deep)** | Variant URLs → stateful pages | Collapse the **178 templates / 339 pages** so scope/status/sort/date are in‑page URL state, not separate pages | all list specs |
| B12 **(deep)** | Row‑action menus | Replace the 3–6 colored per‑row pills (seen in screenshots) with a grouped action menu (safe vs destructive) | all list specs |
| B13 **(deep)** | Lazy detail tabs/modals | Detail pages are 300–380 KB (eager tabs+modals); lazy‑load | S003/S004/S005 |

## C. Needs platform owner / backend (cannot be answered from the crawl)
| # | Question |
|---|---|
| C1 | **API contract & auth** — REST/GraphQL? endpoint shapes, params, tokens, pagination/sort conventions? (legacy = server‑rendered HTML, **no JSON API observed**; we did catalog 195 GET routes + 109 form‑action endpoints in [06](06-complete-data-surface.md) as hints). **Biggest unknown.** |
| C2 | **Real‑time** mechanism (chat, live session status, notifications) — legacy shows Livewire + `broadcasting/auth`; confirm. |
| C3 | **File upload/download/export** — 2 export endpoints failed; salary‑slip + certificate PDF generation; family file+**voice** upload. |
| C4 | **Payment gateway** flows (7 incoming + 2 payout providers); does family pay online? |
| C5 | **Exams/Quizzes** — real feature or just Forms? |
| C6 | **Permission semantics** — meaning/granularity of the ~170 flags + category scoping. |
| C7 | **Notification delivery** — WhatsApp(free/pairing)/Email/App/Private internals + the ~47‑field routing matrix. |
| C8 | **Multi‑currency** conversion timing (point‑in‑time FX on invoices?). |
| C9 | **CSV import** shapes (4 import types) + legacy data migration. |
| C10 | **Certificate `json_data`** canvas format + PDF render service. |
| C11 **(deep)** | The 4 newly‑found admin 500s + 504 — are these intended features that are simply broken in the captured env, or deprecated? Confirm before scoping. |

## Honesty flags (unchanged, reconfirmed by the exhaustive pass)
RTL unexercised (English‑only) · mutating flows never executed (fields known, validation/states inferred) · many lists empty in test data · field names are legacy hints not a contract · 339 pages are 178 templates (many query‑param variants).

> Settle **A1–A6** to draft the Spec 001 command. Route **C** items to owner/backend (C1 first).
