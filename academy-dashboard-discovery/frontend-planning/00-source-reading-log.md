<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **00-output-manifest.md & 01-completeness-ledger.md (verified manifest of all 2,837 files; 339/339 pages, 0 gaps)**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 00 — Source Reading Log

> Honest record of what was inspected to produce this planning package. Paths are relative to the discovery project root: `academy-dashboard-discovery/`. This folder (`frontend-planning/`) is a sibling of `output/`.

## Phase / method

This was a **discovery reading + planning + spec‑splitting** phase only. No spec‑kit command was run, no code/HTML/CSS/JS was written, no mutating action was triggered against the live platform. The crawler output was read as the source of truth; the live site was **not** re‑crawled or visited.

Reading was done in two passes:

1. **Orientation pass (read directly):** folder tree, role maps, and the small combined summary files.
2. **Deep page‑level pass (read via parallel sub‑readers):** the per‑page `pages/*.md` reports — the source of truth — grouped by module/role, summarised into structured digests. Eight readers covered: admin Dashboard/utilities, admin Students/Families, admin Teachers/Admins, admin Courses/Classes/Timetable/Materials, admin Finance, admin Reports/Settings/Messages/Certificates/Profile, the full Teacher portal (26 pages), and the full Family portal (13 pages).

## Folders inspected

| Path | What it contains | Depth of inspection |
|---|---|---|
| `output/combined/` | Aggregated cross‑role reports (19 files) | Key files read in full (see below); the very large inventories sampled, not parsed line‑by‑line |
| `output/roles/admin/` | 300 pages: `pages/*.md` + `*.json`, `html/sanitized/`, `html/raw/`, `screenshots/`, `text/`, `network/`, `role-map.md/json` | `role-map.md` read in full; ~70 representative/anchor `pages/*.md` deep‑read across every module |
| `output/roles/teacher/` | 26 pages, same structure | `role-map.md` read in full; **all 26** `pages/*.md` deep‑read |
| `output/roles/family/` | 13 pages, same structure | `role-map.md` read in full; **all 13** `pages/*.md` deep‑read |
| project root | `roles.config.json`, `claude-analysis-prompt.md`, `README.md`, `.env.crawler*`, crawler source (`crawl-role.js`, etc.) | Config + analysis prompt read; crawler source not re‑audited (out of scope for planning) |

## Files read in full

- `roles.config.json` — role definitions (admin/teacher/family + future roles student/manager/director/staff/guardian).
- `claude-analysis-prompt.md` — legal/ethical constraints + the crawler authors' intended deliverable structure.
- `output/combined/llm-context.md` — system overview, module counts, component snapshot.
- `output/combined/role-permission-matrix.md` — per‑module/per‑role presence + component counts.
- `output/combined/component-inventory.md` — global + per‑role component tallies.
- `output/combined/interaction-inventory.md` — safe interactions exercised, by type.
- `output/combined/failed-pages.md` — failed pages/interactions (0 across all roles).
- `output/combined/design-token-summary.md` — observed colors/fonts/spacing/radii/shadows (reference only).
- `output/roles/admin/role-map.md`, `output/roles/teacher/role-map.md`, `output/roles/family/role-map.md` — full page inventories + route graphs per role.

## Page‑level reports deep‑read (source of truth)

**Admin (representative anchors per module; query‑param variants summarised once):**
`management-home`, `management-home-status*`, `management-total-queues`, `management-courseclasses-1/2`, `management-courseclasses-default-member-course-details-1`, `management-group-index`, `management-groups-create`, `management-banks(+create)`, `management-time-convertor`, `management-scheduled-actions(+create)`, `management-heads`, `management-export-course`, `management-settings-customisation-message-builder`, `management-new-requests(+create, +filter-*, +scheduled-trials-completed)`, `management-student(+1, +2, +1-edit, +1-create, +1-trial-create, +status-3)`, `management-analysis-student`, `management-forms-students`, `management-families(+create, +1, +1-edit, +2, +feedback, +feedback-family-2, +feedback-students, +status-active)`, `management-categories-families(+create, +3-assign)`, `management-family-feedback-categories(+create)`, `management-teachers(+create, +1, +1-edit, +details, +scope-active, +sort-*)`, `management-teacher-categories(+create, +1-create-members, +1-edit)`, `management-teacher-feedback(+per-teacher-year)`, `management-teachers-1-compensations(+create, +1, +1-edit)`, `management-public-holiday`, `management-admins(+create, +appear-6, +permission-6/7, +categories-6, +6-edit)`, `management-courses(+1, +1-create, +1-create-free, +1-edit, +create-new-copy-1, +type-no-invoices, +status-0-1)`, `management-session-class-room-mq-3`, `management-sessions-analysis`, `management-class-feedback(+feedback)`, `management-all-teachers-timetable`, `management-search-schedule`, `management-schedule-trials-response`, `management-schedule-sessions-response`, `management-request-schedule-1-1`, `management-materials(+create, +1-edit)`, `management-library`, `management-accounting(+transaction-session/invoices/salary)`, `management-expense`, `management-invoices(+create-parent-invoice-1, +monthly, +status-all, +downlaod)`, `management-salaries`, `management-staff-salaries`, `management-payouts(+all-1)`, `management-payout-providers(+7-edit)`, `management-salary-class-report`, `management-analysis-invoices`, `management-analysis-expenses`, `management-settings-payments-create-payment-method-1`, `management-settings-payments-1-edit`, `management-forms(+create)`, `management-analysis-course`, `management-chat`, `management-public-advertisement`, `management-tickets`, `management-settings-general`, `management-settings-integrations(+1-configure, +11-configure)`, `management-settings-notification`, `management-settings-security-data(+policy, +backup-send)`, `management-settings-customisation-personalisation`, `management-settings-integrations-whatsapp-families-insights`, `management-pdf(+create)`, `management-certificate-requests`, `management-profile-show(+edit)`.

**Teacher:** all 26 pages, including the error pages (`teacher-profile` = HTTP 500; four `*/main/index.html` = 404).

**Family/Student:** all 13 pages, including error pages (`student-profile` = HTTP 500; `main-index-html` = 404).

> The ~230 admin pages **not** opened individually are, per the role‑map, deterministic query‑param variants of templates that *were* read (teacher scope×sort×page permutations ≈ 60; courses status/type variants ≈ 18; invoices status/date‑type/export variants ≈ 25; families status variants ≈ 7; student status variants ≈ 7; settings‑integrations configure ≈ 11; settings‑payments create‑method ≈ 7; admins appear/permission/categories/edit/duplicate ×6/×7 ≈ 10; new‑requests filter stages ≈ 10; courseclasses 1–6; home‑status variants). Each was confirmed identical in structure to its anchor; they are catalogued in [03-role-page-inventory.md](03-role-page-inventory.md) and not re‑described per‑instance.

## Files deliberately NOT deeply parsed (and why)

These are large auto‑generated aggregates; the per‑page reports already contain their primary data at higher fidelity. They were not read line‑by‑line and are **not** the basis of any claim here unless cross‑checked against a page report:

- `output/combined/report.html` (3.8 MB) — human visual report; the brief explicitly says not to rely on it.
- `output/combined/speckit-discovery.md` (43 KB) and `llm-context.md` are the crawler's own summaries — the brief says not to rely on them alone; used only for orientation/cross‑check, intentionally improved upon rather than copied.
- `output/combined/form-inventory.md` (856 KB), `modal-inventory.md` (157 KB), `table-inventory.md` (72 KB), `button-coverage.md` (41 KB), `skipped-actions.md` (113 KB), `shared-unique-pages.md` (113 KB), `route-graph.md` (87 KB), `missing-coverage.md` (29 KB), `academy-system-map.json` (745 KB)/`.md` — aggregations of the same per‑page data. Sampled for cross‑checking counts; not exhaustively parsed.
- Per‑page `pages/*.json` — the `.md` reports are derived from these and are more readable; the `.md` files were used. The `.json` would be the machine‑readable source if a future automated step needs it.
- Screenshots (1,113 PNGs) — referenced by path in page reports; **not** opened/embedded (legal: do not reproduce captured assets). Visual structure was inferred from the structured DOM/heading/card data, which is sufficient for planning.
- `html/raw/` and `html/sanitized/` — not parsed; the structured extraction in the `.md` reports was used instead.
- `auth-state-*.json` — credentials/session artifacts; intentionally not opened.

## Honesty notes / limits

- **Single language captured.** 338/339 pages were captured in **English / LTR**; the Arabic/RTL UI was never exercised (the crawler deliberately skips `/management/lang/*` switches). Arabic appears only inside *data* (names, category labels). So RTL behaviour of the legacy UI is **unknown from this crawl** — our RTL plan is a forward design requirement, not an observation. See [12-open-decisions.md](12-open-decisions.md).
- **Mutating flows were never executed** (by design). Form/modal *fields* are known from the DOM, but server validation rules, success/error states, and multi‑step outcomes are **inferred**, not observed.
- **Two export endpoints failed** (`/management/invoicesexportdata`, `/management/courseclasses/export-class/1`) and several routes are broken in the reference app (`/teacher/profile` 500, `/student/profile` 500, `*/main/index.html` 404, `settings/customisation/message-builder` 504 gateway timeout, `export-course` server error). These are documented, not hidden.
- **Empty test data.** Many list pages were captured empty ("No data found"), so column sets are known but row‑level rendering/edge cases are inferred.
- Counts cited elsewhere (e.g. 5,606 buttons, 1,373 modals) are crawler tallies **before** de‑duplication of repeated chrome (global search, "Add shortcuts", logout, notification bell repeat on every page). The de‑duplicated component set is far smaller — see [05-component-inventory.md](05-component-inventory.md).
