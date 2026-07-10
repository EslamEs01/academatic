# Academy Dashboard — Visual Foundation (Spec 001)

The approved academy admin dashboard foundation, shipped as a **static HTML site**:
HTML-first (real markup in every page, **not** a JS-mounted app), deployable to
**GitHub Pages / any static host**, openable with **VS Code Live Server**, and
**Django-template-ready**. Arabic RTL first, English LTR, Light/Dark/System.
Local Tailwind/PostCSS, native ES modules, **no CDN, no framework, no TypeScript,
no chart library**.

Spec: `../specs/001-approved-dashboard-foundation/`. Visual target: `../design-references/approved-dashboard/`.

## Architecture at a glance

- **Final client preview uses `public/`** — a built static site (`npm run build`).
- **Live Server opens `public/dashboard.html`** directly — no Node server required.
- **GitHub Pages** can publish `public/`; copy it to **`docs/`** via `npm run deploy:pages -- --out=../../docs`.
- **JavaScript only enhances existing markup** (`src/js/enhance.js`) — it creates **no page DOM**.
- **No JS-rendered empty app mount remains** (no `<div id="app">`); every page ships the full shell + sections as static HTML.
- **Pages are Django-template-ready** (see [Django portability](#django-portability)).

## How it works

- **Authoring** lives in `src/` (styles, components, fixtures, locales).
- A **static-site generator** (`scripts/build-html.mjs`) pre-renders each page to
  **complete static HTML** in `public/` — the shipped `.html` files contain the full
  shell + sections (slim icon rail + light nav panel + topbar, KPI cards, sessions
  table, tiles, reports, states). No page DOM is created at runtime.
- The browser loads `public/assets/js/enhance.js`, which **only enhances** the
  existing markup: theme switch, language switch, icon-rail collapse + off-canvas
  nav drawer, dropdowns, modal, filter/table demo feedback, and the no-dead-button
  catch-all.
- **i18n**: one pre-rendered page per language — `dashboard.html` (Arabic, default)
  and `dashboard.en.html` (English). The language toggle navigates between them;
  theme persists across the switch.
- All asset paths are **relative** (`./assets/...`), so the site works at a GitHub
  Pages project URL (`user.github.io/repo/`) and under Live Server.

## Build → preview (Live Server, no server needed)

```bash
npm install
npm run build          # vendor fonts/icons → copy assets → compile CSS → generate public/*.html
```

Then **open `public/dashboard.html` with VS Code Live Server** (right-click → "Open with Live Server").
No Node server required. (Other pages: `public/reports.html`, `public/gallery.html`,
and the English variants `*.en.html`.)

Prefer a Node server instead? `npm run preview` → http://localhost:4178.

> Note: open via an HTTP host (Live Server / `npm run preview`), not `file://` —
> ES modules need http. The page **content** renders without JS; only the
> interactive behaviors need the http origin.

## Deploy to GitHub Pages (repo `/docs`)

The repo serves Pages from the root **`docs/`** folder, which is a full mirror of the
built site. After any change:

```bash
cd academy-dashboard-discovery/app
npm run deploy:pages     # = npm run build && node scripts/sync-pages.mjs
```

`sync-pages.mjs` cleans root `docs/` and mirrors the COMPLETE `public/` output into it
(all pages incl. `.en.html` variants, `assets/`, `index.html`, `.nojekyll`) — removed
pages never linger stale, and `public/` stays the untouched canonical build output.
The site is self-contained with relative paths, so everything works unchanged at a
project URL (`user.github.io/repo/`).

Then commit together: `docs/` + `academy-dashboard-discovery/app/public/` + your
source changes.

**GitHub Pages settings (one-time):** Settings → Pages → *Deploy from a branch* →
branch **main** (or your active branch) → folder **`/docs`**.

(For an arbitrary output folder there is still `node scripts/deploy-pages.mjs -- --out=<dir>`.)

## Test & screenshots

```bash
npm test               # smoke + a11y
npm run test:smoke     # no raw i18n keys · no external (CDN) requests · no dead buttons · disabled-with-reason
npm run test:a11y      # axe-core — fails on any critical violation
npm run screenshots    # capture the acceptance matrix → screenshots/  (review vs the approved PNG)
```

See `screenshots/REVIEW.md` and `../specs/.../contracts/screenshot-acceptance.md`.

## Django portability

The generated pages map straight to Django templates:

- `public/dashboard.html` → `templates/admin/dashboard.html`, `public/reports.html` → `templates/admin/reports.html`.
- **Spec 002 admin pages** (same mapping): `sessions.html`, `schedule.html`, `students.html`, `teachers.html`, `courses.html`, `settings.html` (+ each `.en.html`) → `templates/admin/<page>.html`. Their lists (session rows, schedule blocks, student/teacher/course cards, settings rows, preview `<template>`s) become `{% for %}` loops; filters/drawers/modals stay client-side over the same `data-*` hooks; fixtures (`src/js/fixtures/*`) → Django view context.
- **Spec 004 families & student academic profiles**: `families.html`, `add-family.html`, `family.html`, `student.html` (+ each `.en.html`) → `templates/admin/<page>.html`; `students.html`/`dashboard.html` are regenerated (enriched). Mapping:
  - **Families** (`families.html`) — the family **cardGrid** → `{% for family in families %}`, each card's grouped children → `{% for child in family.students %}` with the **"+N" overflow precomputed in context** (never JS); facets (`data-status`/`data-category`/`data-search`) emitted server-side; the family/student **lifecycle status** (`active/trial/suspended/stopped/inactive`) resolves through a template tag/filter (icon + label, never numeric/color-only).
  - **Family / Student profiles** (`family.html`/`student.html`) are the codebase's first **per-entity profile templates** — registered SSG pages (NOT nav items; `activeId` = `families`/`students`) reached via "view profile" links, baking **one representative** entity. In Django they become `family/<id>` / `student/<id>` views over one `Family`/`Student` (+ `family.students` / `student.family`). The **tabs** (family: Overview/Children/Schedule/Plan&Billing/Notes; student: Overview/Courses/Timetable/Results/Evaluation/Family/Notes) are baked `role="tabpanel"` sections → static sections or `{% if view == "results" %}…{% endif %}` (default Overview); the tab engine only toggles visibility (`#view=` hash + `localStorage['academy.schedView.<group>']`). **Results** (`{% for course in student.results.courses %}` progress bars with baked `--pct`, `{% for cert in student.results.certificates %}`) and **Evaluation** (`{% for c in student.evaluation.criteria %}` rating pills) are **fixture display only — no gradebook/engine**.
  - **Add-Family wizard** (`add-family.html`) — all five steps are baked `[data-step]` panels → static sections / `{% if step == "children" %}…{% endif %}` (default Identity); the tiny `data-step-next`/`data-step-prev` stepper toggles visibility (transient `#step=` hash, **not persisted**); every field is a labeled `form-field`; "Save" stays a `data-demo-action` demo toast (**no server write**).
  - **Timetable** sections reuse the Spec 003 agenda loop (server-filtered to that family/student) + **one** shared `{% include "admin/_appointment_details.html" %}` drawer partial; "View in schedule" is a language-aware link to `{% url 'schedule' %}#view=timetable`. Nav promotes `families`/`addFamily` (`{% url %}` anchors); the rest of the families category stays planned; no `future-role` portal is emitted.
- **Spec 007 teacher performance & academic KPIs**: `teacher.html` (profile template) + `teacher-performance.html` (promoted `teacherKpi` nav page) (+ each `.en.html`) → `templates/admin/<page>.html`; `teachers.html`/`dashboard.html` are regenerated (enriched). Mapping:
  - **Teachers** (`teachers.html`) — the enriched `directoryCard` grid → `{% for teacher in teachers %}`; the **teacher-status** (`active/paused/inactive`), **workload** (`light/balanced/high`), and **follow-up** (`strongDelivery/stable/needsFollowUp/attentionRisk`) chips each resolve through a template tag (icon + label, never numeric/color-only); the academic counts (courses/groups/active-students/upcoming) come from the view context; "View profile" is a language-aware `{% url 'teacher' teacher.id %}`. **No salary/finance field, no computed score.**
  - **Teacher profile** (`teacher.html`) is a per-entity profile template (NOT a nav item; `activeId = teachers`) → `teacher/<id>`. The 8 baked tabs (Overview/Courses/Groups/Timetable/Sessions&Outcomes/Students/Follow-up/Notes) → static sections / `{% if view == "students" %}…{% endif %}` (default Overview); **Timetable** reuses the Spec 003 agenda + the shared `_appointment_details.html` drawer; **Sessions & Outcomes** reuses the Spec 005 `{% for outcome in teacher.outcomes %}` rows + **one** shared `{% include "admin/_outcome_details.html" %}` canonical drawer (teacher-absent vs student-absent stay two distinct labeled chips); Courses/Groups/Students link to `course/group/student`/`family`. It is an **admin profile, not a teacher portal**.
  - **Teacher Performance** (`teacher-performance.html`, the promoted `teacherKpi`) — the KPI **tiles** + the per-teacher **comparison** list (`{% for row in teacher_perf %}`, each → `teacher/<id>`) + the **follow-up queue** are display-only **fixture counts** — **no computed score, ranking, percentile, chart, or salary**; filtering stays client-side over the existing facet hooks. The dashboard gains **one** fixture "teachers needing follow-up" chip folded into the existing people-signal card → `teacher-performance.html`.
- **Spec 008 academic reports shell** (`reports.html`, the enriched in-place `reports` page; **no new page, no `build-html.mjs`/`nav.config.js`/`dashboard.js` change**) → `templates/admin/reports.html`. Mapping:
  - The **academic-operations overview** → `{% for tile in academic_ops %}`; the **report-category cards** → `{% for category in report_categories %}` → `_report_card.html` with `{{ category.availability|report_availability_chip }}` (`available` → real `{% url %}`; `planned`/`backendRequired` → a disabled-with-reason block, never a dead `#`); the **per-area sections** → `{% for section in report_sections %}` of `{% include %}` blocks with `{{ section.signal|report_signal_chip }}`. The roll-up is a context dict `report_summary` — **every number equals an existing fixture export and matches the dashboard chips** (no server-side aggregation beyond the same roll-ups).
  - Source links are language-aware `{% url 'attendance' %}` / `{% url 'sessions' %}` / `{% url 'schedule' %}#view=timetable` / `{% url 'courses' %}` / `{% url 'groups' %}` / `{% url 'teacher-performance' %}` / `{% url 'students' %}` / `{% url 'families' %}` (+ `teacher`/`student`/`family` profile urls). The honest actions (Print = demo · Export CSV/PDF/Share = disabled-with-reason · Schedule = confirm→demo) are static markup wired by `enhance.js`. **No reporting/analytics/aggregation/export/BI engine, no chart/canvas, no computed grade/ordering/percentile/trend, no finance/revenue/salary report** (the legacy `revenue` card is removed); teacher-absent vs student-absent stay two distinct labeled chips. The `reports` nav item is unchanged; `monthlyReports`/`dataAnalysis` stay planned, surfaced as disabled-with-reason cards.
- **Spec 009 finance, billing & payments shell** (`finance.html` + `finance.en.html`, **ONE new nav item** `finance`; the six locked wallet items + `banks` stay unchanged) → `templates/admin/finance.html`. Mapping:
  - **Invoice rows** → `{% for invoice in invoices %}` → `_invoice_row.html` with `{{ invoice.status|invoice_status_chip }}`; **payments** → `{% for payment in recent_payments %}` → `_payment_row.html` with `{{ payment.status|payment_status_chip }}` / `{{ payment.method|method_label }}`; **summary tiles** → `{% for tile in finance_summary.tiles %}` (counts = `.count()` querysets, **never** `Sum()`); **planned cards** → the existing `_report_card.html` disabled variant; the **invoice drawer** is **one** shared `{% include "admin/_invoice_drawer.html" %}` partial inside the invoice loop; the sidebar gains **one** `{% url 'finance' %}` entry.
  - **Honesty rules**: every amount is an **authored fixture literal** — **zero runtime money arithmetic** (no `Sum`/`reduce`/running totals; the only derived numbers are `.count()`/`.length` row counts); actions are demo-toast / confirm→demo-toast / disabled-with-reason only (**no real charge/refund/export/send**); **no receipt/upload/attachment concept anywhere** (the legacy reference had none); **no pay/salary/payroll figure**; `dashboard.html`/`reports.html` bodies stay **unchanged** — only the shared sidebar partial differs (one new link).
- **Spec 010 coverage, navigation IA & polish** (audit + IA + polish pass — **no new page/file/hook/library**) → mapping of the changed surfaces:
  - **Finance sub-section** under the Reports category is the **same nested-section shape** as Teachers → Performance: `{% for section in category.sections %}<div class="nav-subsection">…{% for item in section.items %}…{% endfor %}</div>{% endfor %}` — Finance is the one implemented `{% url 'finance' %}`, the six billing items + `banks` are disabled partials carrying `data-disabled-reason`. `banks` simply moves into this section (no new template concept).
  - **Category labels** `cat.finance` / relabeled `cat.families` → translation-catalog entries (`{% trans %}`); no structural change.
  - **Sessions badge** `{{ sessions_total }}` context variable (today the authored fixture total) instead of a literal.
  - **Family → Finance link** → a plain `<a href="{% url 'finance' %}">` in the `_family_billing.html` panel (the one sanctioned cross-page finance link outside the finance page itself).
  - **Filter visibility**: the shared `[data-row][hidden]{display:none !important}` rule is template-agnostic CSS (applies wherever the filter hook marks a row hidden). The **chip-tone build guard** is a build-time check with no template footprint.
  - The **legacy-capability coverage matrix** and **page audit** are spec-folder documentation only — they never ship as app pages / Django templates.
- **Spec 011 final QA hotfix** (demo-readiness — **no new page/file/hook/library**) → two one-token mappings:
  - **Dashboard Overview link** → `<a href="{% url 'reports' %}">` (the "view all metrics" affordance now resolves to the reports hub; was a dead `href="#"`).
  - **Sessions badge** → `{{ sessions_total|localize_digits }}` — a locale digit filter (the Django equivalent of the build-time `num()`), over the same `sessions_total` context variable; Arabic renders ٢٤, English 24.
- **Spec 012 role portal foundation** (a SECOND, portal shell — the admin console is untouched; 49 built files):
  - **Portal shell** → `templates/portal/_base.html` (a second base template beside the admin one): warm rail-less header (brand + role chip + persona greeting + theme/lang menus + role-switch link) over a single-column main; the `role` context variable drives the accent attribute (`data-role`).
  - **Portal pages** → `templates/portal/{student,family,teacher}.html` extending the portal base; persona fixtures become view context (`student`, `family.children`, `teacher.sessions`); planned cards render availability chips (same labeled vocabulary as the admin report cards).
  - **Demo hub** → `templates/portal/portals.html` — the documented demo entry (`portals.html`): three role cards + one labeled `{% url 'dashboard' %}` admin return. No portal link exists anywhere in the admin console; the hub URL is the entry.
  - **Honesty**: fixtures only, no login/auth; the teacher portal carries ZERO pay/earnings vocabulary (grep-enforced); deep dashboards arrive in Specs 013/014/015.
  - **Spec 013 — Student Dashboard** deepens `templates/portal/student.html` into the full one-page learning home (13 sections: today · next · week agenda · courses · homework · materials · progress · achievements · celebration · recent-sessions · profile). Each section is an include-able block; the authored `STUDENT_PREVIEW.*` registers become context variables; homework-submit / materials-download / full-history are labeled backend-gated blocks (`{% if backend %}`), never faked; only the student page changed (family/teacher/hub/admin byte-identical). Deep family = 014 · teacher = 015 · communications = 016.
  - **Spec 014 — Family / Guardian Dashboard** deepens `templates/portal/family.html` into the full one-page guardian control center (12 sections: children · today · attendance signals · teacher notes · history · subscriptions · billing status · requests hub · materials · account). `FAMILY_PREVIEW.*` registers become context variables; the **zero-pay hard line** maps to the template never receiving amount/currency context (billing is status-only, no pay control); every request (cancel/reschedule/feedback/trial/meeting) is a display-only preview whose submit is a labeled backend-gated block; the page carries zero form controls. Only the family page changed (student/teacher/hub/admin byte-identical).
  - **Spec 017 — Role Dashboard Shell v2** upgrades `templates/portal/_base.html` into the role-app frame: the role sidebar + the native mobile `<details>` nav render from the `ROLE_NAV` registries (`src/js/fixtures/portal.js`) → a `{% for item in role_nav %}` loop; `item.status` gates anchor-vs-planned-control exactly like the admin nav's status mapping (planned items render as labeled non-link controls until a real page backs them); the view's `active_id` drives `aria-current="page"`. Page bodies (`#page-body`) are untouched — the shell wraps them.
  - **Spec 015 — Teacher Dashboard** deepens `templates/portal/teacher.html` into the full one-page daily cockpit (14 sections: today · next class · follow-up board · my students · outcome workflow · recent sessions · tasks · materials · timetable/availability · monthly rubric · requests & performance · account). `TEACHER_PREVIEW.*` registers become context variables; the **teacher hard line** maps to the template never receiving compensation-related context of any kind (the teacher fixture's numeric `rating`/`util` are also never passed — worded signals only); every write (outcome save · mark absent · cancel/reschedule · upload/download · availability edit · certificate request · profile edit) is a labeled backend-gated block, never faked; the page carries zero form controls and exactly ONE body anchor (`{% url 'teacher-performance' %}`). Only the teacher page changed (student/family/hub/admin byte-identical).
  - **Spec 018 — Role Dashboards Admin-Like UX Rework** compresses the three role HOMES into COMPACT admin-like dashboards (7-band recipe, a smoke-pinned scrollHeight ceiling) and adds `templates/portal/family-child.html` — five baked child panels switched purely by CSS `:target` on the `#child=stX` fragment (the frozen tab hook reads `#view=` only), reached from the family home's five real child-drill-down links.
  - **Spec 019 — Student Internal Pages** turns the six student planned nav entries into real pages: `templates/portal/student-{schedule,homework,materials,progress,history,profile}.html` (51→63 built; 49/63 byte-identical).
  - **Spec 020 — Family / Guardian Internal Pages** completes the family app: `templates/portal/family-{children,schedule,progress,billing,requests,materials,profile}.html` (63→77 built; 59/77 byte-identical). **Django note**: family internal pages use the SAME `ROLE_NAV` registry and `active_id`; planned entries become implemented one line at a time by flipping registry `status` and shipping the route; **`family-child` remains a drill-down page linked from family contexts** (home child cards + the children/progress pages), never a sidebar item — its `active_id` stays `home`. Billing is STATUS-FIRST under the zero-pay hard line: the template context carries hour-quota counts and invoice status rows with NO amount/currency field (settlement belongs to admin finance behind `{% if backend %}` gates); the payFigure guard runs on every family page body. The home quick-tiles are status-aware (implemented → real `<a>`); requests/materials/profile writes are labeled backendRequired gates. Only family surfaces changed (student/teacher/admin byte-identical; teacher pay-free + the original zero-pay lines held byte-verbatim).
  - **Spec 021 — Role Model & Student Reclassification Audit** (audit-only, no app change): the legacy system has **three** primary roles — Admin, Family/Guardian, Teacher. There is **no standalone Student role**; the legacy `/student/*` routes are the guardian portal, and students are children *inside* the family account. Decisions: demote Student from the hub, preserve the Spec 019 pages as the child's own view, keep the family the owner of the child journey. See `specs/021-role-model-student-reclassification/`.
  - **Spec 022 — Living Dashboards Experience Rework** turns the static card-gallery homes into **living cockpits** and lands the corrected role model. Five shared living primitives live in `components/portal-page.js` — `idHero` (role identity band with story-carrying counters), `dayRail` (today as now/next/done stops), `storyRow` (status stories), `flowStrip` (the teacher prepare→attend→record→review workflow), `guidePanel` (guided gate cards) — over an additive **living layer** in `app.css`. **Motion rule (Django/theming note)**: all auto-playing animation (`lv-fill`/`lv-fadeup`/`lv-pulse`) is quarantined inside a single `@media (prefers-reduced-motion: no-preference)` block, so the no-motion state is the finished static default. **Corrected role model**: the hub (`portals`) shows two primary role cards (Family, Teacher) + the admin console + **one demoted child-view preview** linking the preserved student pages; the student shell is reframed «بوابة الطالب» → «عرض الابن» purely at the locale layer (`prt.portal.student`/`prt.role.student`/`prt.title.student`), so the six student internal page bodies stay byte-identical; `family-child` gains one honest fold-point link into the child view. Only the hub + the four home surfaces + the 14 student files rebake (identity 55/77); admin/index/other family internals byte-identical; teacher pay-free + family zero-pay held green. **Django note**: student internal pages use the SAME `ROLE_NAV` registry and `active_id` as the shell — a planned entry becomes implemented one line at a time by flipping its registry `status` and shipping its route; each page passes its own `active_id` (`= its nav id`) so `aria-current="page"` lands on the right item; the shell needs no change. The home's quick-links band is status-aware (an `implemented` destination renders a real `<a>`, a `planned` one keeps the labeled «قريبًا» control) so the home never advertises a live page as "soon". Every write (submit/upload/download/photo/profile-save/password/live-join) is a labeled backendRequired gate, never faked; internal-page bodies carry zero anchors (the sidebar owns navigation). Only the student pages changed (family/teacher/hub/family-child/admin byte-identical; teacher pay-free + family zero-pay held byte-verbatim).
- The shell (slim **category icon rail** + light **category panel** + topbar) is three markup blocks → extract to `{% include "admin/_nav_rail.html" %}` / `_nav_panel.html` / `_topbar.html`. Each of the six category panels maps to a Django **partial** (or a `{% if cat == "control" %}…{% endif %}` block); the rail is a loop over the six categories.
- **Navigation is a two-level category rail**, data-driven from `src/js/nav.config.js` (`NAV_CATEGORIES`): a slim rail of **six category tabs** (control / families / teachers / reports / admin / settings) beside a panel that shows **ONLY the selected category's links** — never all categories at once. Each item carries a `status` — `implemented` (real `<a href>` page), `planned` (a «قريبًا/Soon» button, no route, no dead link), `disabled` (locked, disabled-with-reason), `future-role` (portals — never rendered), or `hidden` (documented, not shown). All six category panels are **baked into the static HTML**; client-side, only the selected category renders (the rest carry `hidden`) — swapped purely via the `data-nav-category` (rail tab) / `data-nav-panel` (panel) hooks, no navigation. In Django this maps cleanly: `implemented`/`planned`/`disabled` are emitted server-side, with planned/disabled gated as `{% if perms %}` blocks or **disabled partials** carrying the same `data-*` hooks (`data-coming-soon`, `data-disabled-reason`); `future-role`/`hidden` are simply not emitted. See `../specs/002-admin-core-operations/contracts/navigation-ia-contract.md` for the authoritative categories, items, statuses, the category-switching behavior, and the no-dead-link rule.
- `src/styles` → Django **static** CSS; `src/js` → Django **static** JS (enhancement only, attaches to the same markup via `data-*` hooks).
- Build-time **fixtures** (`src/js/fixtures/`) map to Django **view context**; the per-row markup (KPI/table/report loops) maps to `{% for %}`.
- Behavior hooks are `data-*` attributes (`data-action`, `data-row-menu`, `data-shell`, `data-nav`, …) — reproducible from Django with no JS-generated IDs.
- For i18n, Django can collapse the two per-language pages into one template with `{% trans %}` / `LocaleMiddleware`; the Arabic page is the canonical basis.

## Structure

```
src/styles/   tokens.css · base.css · app.css (Tailwind entry + component layer)
src/js/       enhance.js (runtime) · theme · i18n · components/ (render + widgets) · fixtures/
src/locales/  ar.js (default) · en.js          src/icons/ + src/fonts/  (vendored, no CDN)
scripts/      vendor-assets.cjs · build-assets.mjs · build-html.mjs · serve.cjs · deploy-pages.mjs
public/       BUILT static site (gitignored) — open with Live Server / publish to Pages
tests/        smoke/ · a11y/ · screenshots/
```

## Scope (Spec 001)

In: tokens, shell, base components, admin dashboard, reports overview, gallery,
RTL/LTR, Light/Dark/System, a11y, responsive, screenshot acceptance, static
preview + Django-readiness.

Out: real API/auth/permissions, business modules (students/families/teachers/
courses/attendance/finance (→ Spec 009 adds a fixture-only finance shell; real
billing/payroll engines still out)), sessions lifecycle beyond fixtures, report
detail pages, portals, charts, CDN, TypeScript, SPA frameworks, copied legacy
assets/wording.

## Intentional exclusions & the finance boundary (Spec 024 B-08/B-09)

Recorded so no future pass "restores" a law-excluded surface or copies figures across roles:

- **Teacher surfaces are pay-free GLOBALLY** — the legacy teacher salary band, `/teacher/salary`,
  `/teacher/salary-class-report`, and the update-result pay matrix are intentionally excluded; the
  ledger concept survives only as zero-figure admin-finance GATE shells (Spec 030).
- **Family surfaces carry zero pay figures** — the legacy billing **Amount** column is intentionally
  dropped; family billing is status-first (hour-quota). No family payment token anywhere.
- **No computed-score / rank / chart engines** — legacy accounting/analysis charts, the tickets pie +
  "Average" column, and the teacher-feedback "Percentage" are excluded; equivalents are authored STAT
  cards, never chart series.
- **No fake-action engines** — notifications, chat, live-room, and the "Add shortcuts" widget are
  honest gates / future-backend records, never faked (no counts, no read/unread, no send, no join).
- **Finance boundary**: authored admin invoice-amount literals on admin finance pages are
  Spec-009-sanctioned (zero aggregate, zero runtime math, admin-only); **salary/payroll/compensation/
  payout figures are NEVER allowed anywhere**; family and teacher surfaces stay figure-free.

## Spec 025 — Teacher Internal Pages

The teacher portal is now a full role app: seven internal pages (schedule · students ·
outcomes · tasks · reports · profile · library), each AR + EN, built from the shared living
primitives + the retained `TEACHER_PREVIEW` fixtures (77 → 91 public HTML). The seven planned
`ROLE_NAV.teacher` items are now implemented links; the teacher-home performance anchor repoints
to the pay-free `teacher-reports` page (closing the Spec-024 B-07 admin-shell adjacency). Every
unavailable action (live-room, save/submit, export, upload/download, the three profile writes) is
an honest backendRequired gate; `teacher-reports` is academic-only (no chart/score). Teacher
surfaces stay pay-free GLOBALLY (three-layer enforced); no teacher chat page/nav (chat → Spec 026).

## Spec 026 — Admin Control / Sessions / Operations + Global Action Completion

Three new admin operations pages — **sessions-analysis · public-holiday · scheduled-actions**
(each AR + EN, 91 → 97 public HTML) — grounded in the legacy `management-*` operations captures:
display-only authored boards/lists where every write (export, set holiday, bulk absence, create
scheduled action) is an honest `backendRequired` gate. Two more legacy surfaces fold in as ops bands
(total-queues → Sessions, schedule-requests → Schedule). Three planned nav items flip to real links.

Alongside, a **global action-completion pass**: every visible admin action now resolves to a real
page, a modal/drawer, a real static tab/filter, or an honest `backendRequired`/`planned` gate — no
button left claiming it did something it can't. Create/Add/Save primaries open an honest
backendRequired modal (reusing the existing `data-modal-trigger`); the previous «preview action» /
"saved (demo)" toasts were reworded to "available once the server is connected"; the dashboard's
unwired filter widget was replaced with a real link to the sessions page. No backend, no fake
persistence, no new hook or storage key; teacher pay-free / family zero-pay / student child-view /
admin finance invariants all preserved.

## Spec 027 — Admin Families / Students / Courses / Groups Deep Management

Deepened the nine already-honest admin management pages (families · family · add-family · students ·
student · courses · course · groups · group) into real, usable admin screens — **no new pages
(97 → 97)**. Every delta is a modal, a drawer-picker, a row-kebab, a tab, or an honest gate on an
existing page, reusing ONLY the closed Spec-026 `data-*` hook set (no new dispatch hook, storage key,
engine, dependency, or CSS redesign).

- **Edit family/student/course/group · Add-child · Add-note · Create-group-from-course** → honest
  `data-modal-trigger` backendRequired modals (title + "nothing is saved yet" note; no fake fields).
- **Enroll-in-course · Assign-to-group · Move-between-groups · Add-students (course/group) ·
  Family-category reclassify** → display-only candidate-list drawers baked as `<template data-preview>`
  (`stu-enroll`/`stu-assign`/`stu-move`/`crs-enroll`/`grp-assign`/`fam-cat`), each ending at a clickable
  `data-disabled-reason` backendRequired gate — no selection persists, no roster mutates.
- **Students-table row kebab** (previously absent) → a new `studentMenu` builder in `enhance.js`, routed
  by the EXISTING `data-row-menu` dispatch via one `'student'` branch mirroring `familyMenu` (View
  profile · Edit modal · Suspend/Remove confirm) — **not** a new hook.
- **Suspend/Remove student** → `data-confirm`; **cross-family transfer** and **schedule-search** →
  honest gates (no invented fields); **Results/Evaluation** stay display-only (no computed score/chart).
- Out-of-scope actions stay honest owner gates: assign-teacher → 028, message → 026/future, print/export
  → 029, billing/plan → 030 (the admin plan hour-rate stays a single-value, no-math literal), materials
  → 031, login-as/reset → future-backend.

New display-only fixture `src/js/fixtures/management.js` (picker candidates derived from existing
entities — no computed or pay values); mirrored AR/EN keys added to `ar/en.fam.js` (fam/stu/res/eval) and
`ar/en.crs.js` (crs/grp), reusing `common.backendRequiredNote`. **Django note**: each picker is a baked
`<template data-preview="…">` block (a `{% include %}` of a candidate list) whose final button is a
`backendRequired` gate — the real Enroll/Assign/Move POST lands behind `{% if backend %}`; the student
row kebab reuses the same `data-row-menu` menu machinery as the family kebab. Only the ten detail/list
HTML changed (course/family/group/student/students × 2 languages); families/add-family/courses/groups +
all portal + admin-ops + index stay byte-identical; `package.json` 0-diff; teacher pay-free / family
zero-pay / student child-view / admin finance Spec-009 invariants all preserved. Build 97; smoke PASS;
a11y critical=0 serious=0.

## Spec 028 — Admin Teachers / Performance Deep Management

Deepened the admin teacher surfaces (teachers · teacher · teacher-performance) and completed
the Spec-027 **assign-teacher** handoff on course/group — **no new pages (97 → 97)**. Every delta
is a modal, a drawer-picker, a row-kebab, a confirm, or an honest gate on an existing page,
reusing ONLY the closed Spec-026 `data-*` set + the Spec-027 precedents (no new hook/engine/CSS).

- **Teachers list**: a per-card **row kebab** (View profile · Edit modal · On-Vacation/Deactivate
  confirm · Delete confirm) via a new `teacherMenu` on the EXISTING `data-row-menu` hook (an
  optional `menuId`/`menuKind` slot on `directory-card.js`); a **Manage-categories** drawer
  (`trn-categories`: category list + Create-category modal + assign-members backendRequired gate).
- **Teacher detail**: Edit/Add-note → modals; Notify → confirm; **assign-course/assign-group** →
  display-only picker drawers (`trn-assign-course`/`trn-assign-group`); On-Vacation/Deactivate/Delete
  → confirms; **availability-window editor** (`trn-availability`: day/time rows + Add/Update/Delete
  gates, no recurrence); Reset-password/Login-as → future-backend gates; Message → 026/future; Print → 029.
- **Course/Group**: the M-N assign-teacher gate → a display-only single-teacher picker drawer
  (`crs-assign-teacher`/`grp-assign-teacher`), separate from the student `grp-assign` drawer.
- **Teacher performance**: preserved display-only — **no computed score/rank/chart**; the unused
  `rating` fixture field stays unsurfaced.
- **all-teachers-timetable**: **folds into the existing `schedule.html` teacher-lens** (a `teacher`
  filter over List + Timetable already exists) — no new page, `schedule.js` byte-unchanged.

**Django note**: the teacher row kebab reuses the same `data-row-menu` menu machinery as the
family/student kebab (one `'teacher'` dispatch branch); each picker is a baked
`<template data-preview="…">` (a `{% include %}` of a display-only candidate list) whose final
Assign/Save is a `backendRequired` gate behind `{% if backend %}`. **Pay-finance is excluded**:
Compensations/Salary/Accounting/Salaries/Payouts → Spec 030; Payout-Providers/Login-as/Reset-password
→ future-backend; Teacher/Class-Feedback → Spec 029; teacher-portal salary → excluded forever
(teacher pay-free GLOBAL). **Teacher portal pay-free**: the 16 `teacher-*` portal files stay
byte-identical (`teacher-performance.html` is the sanctioned admin exempt board, never linked from
the portal). Family zero-pay / student child-view / admin finance Spec-009 invariant all preserved;
only teachers/teacher/course/group HTML changed; `package.json` 0-diff. Build 97; smoke PASS; a11y 0/0.

## Spec 029 — Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu Coverage Gate

Completed the admin reporting/feedback layer that Specs 027/028 routed here, and added an **Admin Menu
Coverage Gate** — **no new pages (97 → 97)**. Feedback-review + Forms/surveys **fold into `reports.html`**;
every write is an honest `backendRequired` final. Reuses ONLY the closed `data-*` set + existing primitives
(`filterBar` · `previewTemplate`/`sheetRow` · `confirmAction` · chips) — no new hook/engine/page; near-zero CSS.

- **Feedback review** (`components/report-feedback.js` + `fixtures/report-feedback.js`): authored rows across
  teacher/class/family/student — a CATEGORICAL remark pill (never a number), a status chip, a real
  type/status `filterBar`, a read-only detail drawer per row (Approve = confirm, Delete = confirm-danger,
  both backendRequired), a Create-feedback modal, and a **Manage-categories** drawer (`rep-fbcat`: list +
  Create-category modal + assign-members `data-disabled-reason` gate). No computed percentage/score/rank.
- **Forms / surveys**: display-only list (authored question/response **literals** — no aggregation) + a
  Create-form modal + a real deep-link to the EXISTING student **Evaluation** tab (the monthly progress form —
  no duplicate engine).
- **Export/print honesty**: reports **Print** → disabled-with-reason gate (R-G, consistent with CSV/PDF/Share);
  the native disabled-with-reason gates on sessions-analysis / course / group / student / teacher stay as-is
  (already honest); `teacher-performance` stays export-free and display-only.
- **Write honesty**: the outcome **"Add feedback"** action → a backendRequired modal (R-E, in the ONE
  canonical `outcome-details.js` drawer — so attendance/sessions/course/group/teacher all pick it up); the
  student Evaluation **"Approve"** → a backendRequired confirm (R-F).
- **Analytics**: no plotting visuals, no computed metric; `dataAnalysis`/`monthlyReports`/`monthlyPerf`/
  `sessionsKpi`/`studentResult`/`studentEvaluation` stay honest **planned** nav gates.
- **Admin Menu Coverage Gate**: all 43 `nav.config.js` items classified in `admin-menu-coverage-inventory.md`
  (0 unclassified); `nav.config.js` **0-diff**; runtime coverage enforced by the existing Spec-010 nav block
  (6 rail categories · exact finance sub-section · banks placement · link-integrity `deadHash/badTarget=0` ·
  planned-truthfulness) plus a new assert that the folded feedback/forms render on reports.

**Django note**: each feedback/form detail is a baked `<template data-preview="rep-…">` (a `{% include %}` of a
display-only record) opened by `data-drawer`; Create/Approve/Delete are `data-modal-trigger`/`data-confirm`
finals behind `{% if backend %}` — no persistence. **Finance excluded**: legacy analysis-expenses/
analysis-invoices/salary-class-report/invoice-export → Spec 030; finance source is **0-diff** and no pay figure
enters any 029 body (the reports `#page-body` forbidden-token grep already covers salary/payroll/invoice/etc.).
Role laws preserved: teacher pay-free (16 portal files + `teacher-performance.html` byte-identical), family
zero-pay, student child-view, admin finance Spec-009 invariant. **14 HTML changed**
(reports/attendance/sessions/course/group/teacher/student ×2); teacher-performance + portal + family + finance +
index byte-identical; `package.json`/`nav.config.js` 0-diff. Build 97; smoke PASS; a11y 0/0; screenshots 0 errors.

## Spec 030 — Admin Finance / Invoices / Payroll / Banks Deep Management

Deepened the admin finance domain **without faking any money operation** — **no new pages (97 → 97),
`nav.config.js` 0-diff**. `finance.html` became a **tabbed hub** (Overview · Salaries · Banks) via the existing
`data-tab` mechanism — the first sanctioned modification of `finance.html`, done through a **declared Spec-009
supersession** (lifts the finance-source freeze + the `finance.html` body-byte-identical clause + the
`demoInCluster>=1` assertion for F-J; keeps every permanent guarantee byte-verbatim).

- **Two money-figure classes (binding)**: invoice/payment **amount literals** are allowed (single authored
  value, no math — Spec-009-sanctioned); **salary / payout / compensation figures are never shown anywhere**;
  computed aggregates (Net Income / P&L / totals / balance) and charts are forbidden.
- **Overview tab**: the existing Spec-009 content, behavior-identical — 4 status tiles, 9 invoice rows + read-
  only drawers, recent payments, and the 9 figure-free planned cards (kept: `plannedN===9`). Payments gained
  honest Add-payment / Reconcile gates.
- **Salaries tab**: teacher + staff **STATUS-FIRST, FIGURE-FREE** boards — name + status chip + period ONLY (no
  salary/fixed/fine/gift/hour-rate/total figure). Run-salaries / Approve / Mark-disbursed / Export = honest
  `data-disabled-reason` gates (the real payroll run needs the billing system).
- **Banks tab**: bank name/status list + Add-bank `backendRequired` modal (name only) + Import-statement /
  Reconcile gates — no credentials, account numbers, balances, or `type=password`.
- **Print** reclassified to a disabled-with-reason gate (F-J, like the Spec-029 reports Print). Export CSV/PDF/
  Download stay gates. **Record-payment / Mark-paid confirms mutate nothing** (status chip unchanged).
- **Honest gates for the money-movement / computed surfaces**: monthly-invoices, class-salary-report, payouts,
  accounting, analysis-expenses/invoices, and expense are represented by the existing figure-free planned
  cards (F-B/F-F/F-H/F-I/F-M/F-N/F-O) — no P&L, no chart, no group-by/sum, no salary total.
- **Finance menu coverage**: all 8 finance nav items classified; `nav.config.js` 0-diff (the six wallet items +
  banks stay honest disabled-with-reason gates for the real billing/payroll/bank engine; the display previews
  live in the hub tabs).

**Django note**: each finance tab is a baked `data-tabpanel`; salary/bank rows are display-only `{% for %}`
records with a status chip; Add-bank/Run-salaries/Import/Reconcile/Export are `data-modal-trigger`/
`data-disabled-reason` finals behind `{% if backend %}` — nothing computes, mutates, generates, imports,
reconciles, or produces a file. **Payout providers (Paymob/Payoneer) credentials + webhooks and payment-gateway
settings route to future-backend/031 — never mocked; no secret/API-key rendered.** Teacher-portal salary twin
and family payment stay excluded (pay-free / zero-pay laws). **Only `finance.html`/`.en` changed**; teacher-
portal ×16 + teacher-performance + family + student + reports + index byte-identical; `package.json`/
`nav.config.js`/`enhance.js`/`finance-status.js` 0-diff. Build 97; smoke PASS; a11y 0/0; screenshots 0 errors.

## Spec 031 — Admin Management / Content / Certificates / Settings / Materials

Deepened the remaining **non-finance** admin domain — staff/users/RBAC, materials, books/library, certificates
(+requests), and the six settings sub-domains + integrations — **without faking any settings save, user/permission
mutation, file upload/download, certificate/PDF generation, integration connection, or backup**. Count **97 → 103**:
the settings sub-domains **fold into the existing `settings.html`** as a 6-tab hub (0-delta, the finance-hub
precedent), and the `admin`-category surfaces become three focused pages.

- **`staff.html`** (`staff`→implemented): display-only staff directory + a per-row kebab (View drawer · Edit/
  Duplicate backendRequired modal — **no password, no salary field** · display-only RBAC matrix drawer + Save
  gate · Category/Activity drawers · Deactivate/Delete confirms that mutate nothing · Reset/Invite future-backend
  gates). The single staff home (the `settingsUsers` nav folds here via a Users-tab deep-link).
- **`library.html`** (`books`→implemented; `materials` folds in): a Content hub with **Materials** (bilingual
  subject catalog, name-only modals) and **Books** (media rows with authored view/download **count literals**,
  type/category filters, category drawer). Add-Material/Upload/Download/Publish/Delete are gates — **no `type=file`,
  no download link**.
- **`certificates.html`** (`certificates`→implemented; `certificateRequests` folds in): **Templates** (+ a
  **static, non-draggable designer preview** — CSS-positioned label spans over a band; no `<canvas>`, no
  jQuery-UI, no upload, no server render commands) and **Requests** queue. Approve/Reject/Generate/Preview/
  Download/Send/Create/Upload are gates — **no PDF, no `window.open`, no status mutation**.
- **`settings.html` hub**: 6 tabs (General · Notifications · Customization · Security · Users · Integrations).
  The existing **theme/language controls stay genuinely functional**; every Save/Connect/Test is a
  backendRequired gate. General omits pay-rate/salary (a non-numeric "managed in Finance" pointer) and folds the
  Locations slice + a figure-free **expense-heads** lookup (name/status, no amount). Notifications = a figure-free
  event×channel matrix. Integrations = **locked-placeholder** provider cards (name + status only) — payment-
  gateway/payout/WhatsApp/Email credentials route to future-backend, **never a `type=password`/API-key/webhook**.

**Django note**: each surface is baked static HTML over `{% for %}` display records; the settings hub + library +
certificates tabs are `data-tabpanel`s; every write (Add/Edit/Delete/Approve/Generate/Upload/Connect/Save) is a
`data-modal-trigger`/`data-confirm`/`data-disabled-reason` final behind `{% if backend %}` — nothing persists,
generates, uploads, connects, or produces a file. The staff kebab reuses the existing `data-row-menu` dispatch (a
`staff` branch — no new hook). **Only `settings.html` changed among existing page bodies**; the 3 nav promotions
changed the shared sidebar (staff/books/certificates → anchors); teacher-portal ×16 + family + student + index +
finance/reports bodies byte-identical; `package.json`/no new dependency/engine/hook 0-diff. Build 103; smoke PASS;
a11y 0/0; screenshots 0 errors.

## Spec 032 — Final QA / Create-Edit Forms Completion / Production Freeze

The last frontend-completion spec. Its one rule: **every Add / Create / New / Edit / Duplicate action opens a
real form UI first** — a drawer with visible, grounded input/select/textarea fields — and only the final
Save/Submit/Issue is a `backendRequired` gate. The 40 create/edit actions (FC-01…FC-40) used to open a
field-less "available once the server is connected" note as their first-and-only response (`openModal` rendered
title + note + Close only); each now opens a form-bearing drawer. **Count held 97 → 103 (no change from Spec
031): 0 new pages** — all 40 forms are drawers folded into existing pages.

**Mechanism (Option B).** One additive helper — `formDrawer(id, {titleKey, headIcon, fields, ctaKey, reasonKey})`
in `components/preview-drawer.js` — wraps the existing `previewTemplate()`: it renders `fields` (a concatenation of
the existing `field()` controls) inside a `.wiz-grid` and appends exactly ONE clickable `data-disabled-reason`
Save final. Each field-less `data-modal-trigger` create/edit trigger becomes a `data-drawer="X"` trigger that opens
the baked `<template data-preview="X">`, reusing the CLOSED `data-drawer` → `openSheet` → `template[data-preview]`
clone path verbatim (the `openPanel` focus-trap already covers `input`/`select`). Kebab-menu items in `enhance.js`
gained `data-drawer="X"` (data-drawer dispatches first, so the drawer always wins). **No new hook, no new storage
key, no new engine, no new CSS class, no new page, no `package.json`/`build-html.mjs` change.**

**MUST-OMIT (never rendered on any form):** password · salary/hour-rate/fine/pay-period · currency-with-salary ·
gateway/payout/SMTP/Zoom credentials · 2FA OTP · computed Total. **MUST-GATE (stay `data-disabled-reason`, no
working control):** all `type=file` uploads (teacher CV, certificate background, library file/thumbnail, settings
logo) · certificate canvas/PDF (static preview only) · WhatsApp pairing · Record-Payment. Fields are INERT — no
behavior hook, no persistence; every Save mutates nothing.

- **Sessions** (`sess-new`, folded into `sessions.html`/`dashboard.html`): course/teacher/date/time/duration/
  credit-source/status.
- **Families/Students**: `fam-edit` (name±ar/email/phone/status/category/notes) · `fam-child` · `fam-note` ·
  `stu-edit` · `stu-note` · `stu-add` (+ trial block); the add-family wizard's "Add child" reveals a real third
  child row via a native `<details>` disclosure (no new hook).
- **Courses/Groups**: `crs-add`/`crs-edit` (material/teacher/start-date/schedule — **no teacher-rate**) ·
  `grp-add` (course prefilled = create-group-from-course)/`grp-edit` — **no per-group rate**.
- **Teachers**: `trn-add`/`trn-edit` (name±ar/email/phone/status/subjects/level/course/city/country/notes +
  CV-upload **gate**) · `trn-note`; **no salary/hour-rate/fine/meeting-provider/payout/auth-secret field**.
- **Reports/Feedback**: `fb-add` (nested in the outcome sheet) · `fb-create` · `form-create` (repeatable
  field-builder rows) · `rep-fbcat` hybrid create form.
- **Finance**: `bank-add` (bank-name only — **no credentials/balance/figure**).
- **Staff**: `staff-add`/`staff-edit`/`staff-dup` (name/username/email/phone/role/status — **no password/salary/
  OTP**).
- **Certificates**: `cert-tpl` (name + **static** designer preview + background-upload gate — no `<canvas>`, no
  drag, no PDF) · `cert-create` (student/course/template/date/message + PDF-preview gate).
- **Library/Settings**: `mat-add`/`mat-edit` · `lib-item` (+ file/thumbnail gates) · `lib-cats` create form ·
  `head-add` (name/status — **no amount**); Customization Save + Policy Edit stay honest panel gates.

**Django note**: each form drawer maps to a Django `ModelForm` rendered inside a `{% block drawer %}` `<template>`;
the visible fields are `{{ form.field }}` widgets, the final Save is `<button ... {% if not backend %}disabled{% endif
%}>` — nothing persists until the backend is wired. The `formDrawer()` body is a plain field list, so swapping the
INERT controls for real form widgets is a one-file change per surface.

**Coverage / freeze**: admin menu **50 items, 0 unclassified** (`nav.config.js` route rules 0-diff; 2 stale
`FUTURE_ROUTES` doc-entries cleaned); route/page **103 pages, 0 orphan, 0 missing mirror** (`build-html.mjs` PAGES
0-diff). The 14 candidate-list pickers stay list-then-gate; the 3 hybrid category drawers gained real create forms.
Teacher-portal ×16 + family + student + index bodies byte-identical; the protected role-law + 026–031 smoke asserts
are byte-verbatim (the ONE amendment: the finance invoice-drawer count now scopes to `inv*` templates so the
additive `bank-add` form isn't miscounted). Build 103; smoke PASS + a new form-completion block (0 field-less
create/edit modal, 0 MUST-OMIT leak, 0 MUST-GATE control, pickers + hybrids re-pinned); a11y critical=0 serious=0
(+ open-form / mobile-390 / dark / EN rows); 258 screenshots 0 console errors (39 new open-form frames).
