# 07 — Product Module Map (v2)

> Confirms the v1 19‑module map ([../frontend-planning/02-product-module-map.md](../frontend-planning/02-product-module-map.md)) and adds verified template counts, corrections, and per‑module improvements from the exhaustive read. Full per‑page detail: [02](02-all-pages-expanded-inventory.md); coverage: [19](19-spec-coverage-map.md).

## Verified module inventory (19 modules)
Page counts (admin) are crawl coverage, not feature completeness. "Templates" ≈ distinct normalized routes after collapsing query variants.

| # | Module | Admin pages | Spec | Improvement focus |
|---|---|--:|---|---|
| 1 | Dashboard / Home | 29 | S002 | role‑specific KPI sets; status‑gated row actions; live refresh |
| 2 | New Requests / Leads (CRM) | (in Reports/General) | S003/S002 | funnel board; lead detail drawer; notes thread; convert‑to‑student flow |
| 3 | Students | 26 | S003 | tabbed detail (lazy); status segments as filters; bulk actions |
| 4 | Families / Guardians | 31 | S003 | 8‑tab detail (lazy); advanced finance filter as chips; re‑activate action on Inactive |
| 5 | Teachers | 94 | S004 | collapse ~60 scope/sort variants → one list w/ clickable sort headers; availability calendar |
| 6 | Staff/Admins + Roles/Permissions | 2 | S004 | grouped searchable PermissionMatrix; confirm diff‑vs‑replace on save |
| 7 | Courses (Enrollments) | 22 | S004 | dual‑rate clarity; session‑impact preview; "Course Actions" row menu |
| 8 | Classes / Live Sessions | 10 | S005 | status‑gated SessionActionPanel; dual‑TZ affordance; real classroom UI |
| 9 | Timetable / Schedule | 6 | S005 | visual weekly calendar w/ conflict warnings; availability drag‑bands |
| 10 | Attendance (embedded) | — | S005 | part of session lifecycle; aggregate views in Reports |
| 11 | Assignments / Tasks (Tickets) | 1 | S006 | rename `/tickets`→`/tasks`; visible Create Task; illustrated empty state |
| 12 | Exams / Quizzes | 2 (forms) | S006 | **gap** — Forms builder is closest; confirm a real exam feature |
| 13 | Certificates | 3 | S006 | accessible canvas designer; approve‑with‑preview + send‑channel confirm |
| 14 | Payments / Invoices | 51 | S007 | one list w/ status+date‑type+currency+gateway filters; export UX |
| 15 | Wallet / Finance | 16 | S007 | KPI tiles + dense P&L tables (sticky col); generate‑salary; payout lifecycle |
| 16 | Reports / Analytics | 16 | S002 | charts (dark+RTL), country map; scannable filter chips |
| 17 | Messages / Notifications | 4 | S008 | chat (real‑time); broadcast w/ **Preview Recipients** + quota; notification matrix |
| 18 | Content / Materials / Library | 4 | S004 | chip category filters; skeleton + empty states; multipart upload |
| 19 | Settings · Profile · Error/Utility | 27+5 | S011 | tab‑per‑domain; theming loop to design tokens; proper error pages |

## Corrections vs v1 (from exhaustive pass)
- **Broken pages: 13, not ~5.** v1 named export‑course (500) + message‑builder (504) + 2× profile (500) + 4× 404. The exhaustive pass found **4 more admin 500s**: `management-families-feedback-family-1`, `management-new-requests-scheduled-trials-index-status-3-4-…`, `…-5-7-6-…`, `management-teachers-1-monthly-classes`. (Full list [01](01-completeness-ledger.md)/[20](20-no-missing-items-audit.md).)
- **Template count is precise: 178** normalized routes (admin 145, teacher 22, family 11) from 339 pages — v1's "~75 admin templates" was a looser semantic grouping; both are valid views (178 strict path‑routes → ~90 semantic page types when scope/status path‑variants are treated as one filtered list).
- **i18n defect to avoid:** several legacy headings leak raw keys (`messages.Inactive Teachers`, `messages.Create Feedback Categories`) — use a typed i18n system so missing keys fail at build.
- **Distinct interaction counts verified:** 66 modals, 141 form‑actions, 104 table shapes, 195 GET routes, 109 mutation endpoints.

## Cross‑cutting product themes (reconfirmed)
Session‑centric (11‑state lifecycle) · make‑up/credit model · dual‑timezone (student vs teacher) on every scheduled action · dual‑rate billing · multi‑currency (16, AED base, editable FX) · WhatsApp/Email notifications woven throughout · 9‑stage CRM funnel · ~170‑permission RBAC + category scoping · built‑in theming (brand + 11 status colors). These shape the shared component layer ([10](10-component-inventory-v2.md)) and IA ([13](13-improved-information-architecture-v2.md)).
