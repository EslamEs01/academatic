# Screenshot Acceptance Review — Spec 001

**Date:** 2026-06-29 · **Reference:** `design-references/approved-dashboard/academy-dashboard.png` + `sidebar-reference.png`
**Harness:** `npm run screenshots` (Playwright/Chromium, deterministic fixtures + fixed clock).

Each capture was reviewed side-by-side against the approved design and judged against the §A4 failure conditions in `contracts/screenshot-acceptance.md`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · Arabic RTL · Light · Desktop | `dashboard__ar__light__desktop.png` | ✅ PASS — matches approved (warm canvas, dark right sidebar, violet active pill, KPI row order, sessions table, status tiles, reports, states) |
| 2 | Dashboard · Arabic RTL · Dark · Desktop | `dashboard__ar__dark__desktop.png` | ✅ PASS — true-dark surfaces, brighter accents, gradient hero preserved |
| 3 | Dashboard · English LTR · Light · Desktop | `dashboard__en__light__desktop.png` | ✅ PASS — fully mirrored to LTR, all copy localized, Latin digits |
| 4 | Reports overview · Arabic RTL · Light | `reports__ar__light__desktop.png` | ✅ PASS — reuses shell, report cards incl. permission-locked, no detail pages |
| 5 | Gallery · Arabic RTL · Light | `gallery__ar__light__desktop.png` | ✅ PASS — all base components render; no dead buttons / raw keys |
| 5b | Gallery · Arabic RTL · Dark | `gallery__ar__dark__desktop.png` | ✅ PASS — components correct in dark |
| 6 | Dashboard · Arabic RTL · Light · Mobile (390) | `dashboard__ar__light__mobile.png` | ✅ PASS — sidebar → hamburger/drawer, content reflows, no overflow |
| 6b | Dashboard · Arabic RTL · Light · Tablet (834) | `dashboard__ar__light__tablet.png` | ✅ PASS — sidebar retained, 2×2 KPI/reports grids |

**Failure conditions (§A4):** none triggered — not generic Tailwind, sidebar is strong, dashboard is full/colorful, topbar utilities grouped, KPI cards have medallions + trend + sparklines, table is not a spreadsheet, reports are real cards, resembles the approved direction.

**Automated checks (accompanying, not replacing this review):**
- `npm run test:smoke` → PASS (no raw i18n keys, no external/CDN requests, no dead buttons, all disabled controls have a reason, keyboard-reachable).
- `npm run test:a11y` → axe **critical = 0, serious = 0** across dashboard/reports/gallery × {ar light, ar dark, en light}.
- All captures: **0 console errors**.

## Fixes applied during review
1. KPI card order reversed to match the approved RTL row (sessions → active students → attendance → revenue).
2. Attendance ring: removed an accidental Tailwind `ring` utility collision (class renamed `att-ring`) that drew a focus-blue box.
3. Avatar gradient classes (`av-*`) were purged by Tailwind (runtime-composed) → added to `safelist`.
4. Responsive: in-grid sidebar now collapses below `md`; drawer takes over (mobile no longer crushed).
5. WCAG AA contrast: added darker `*-ink` text tokens for chips/tiles/trend/badges; darkened `--c-ink-3`; brightened dark sidebar muted text; fixed `.badge-count` for light surfaces.

## Spec 002 — Admin Core Operations Pages (2026-06-29)

Six new admin pages reviewed against the Spec 001 approved direction + sidebar reference + existing Spec 001 screenshots (old academy = product/UX reference only). All static `public/*.html`, AR default + EN.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Sessions · AR RTL · Light | `sessions__ar__light__desktop.png` | ✅ PASS — premium ops page (header, status tiles, filter bar, modern table, kebab, pagination); active pill on الجلسات |
| 2 | Sessions · AR RTL · Dark | `sessions__ar__dark__desktop.png` | ✅ PASS — true-dark, brighter accents, consistent |
| 3 | Sessions · EN LTR · Light | `sessions__en__light__desktop.png` | ✅ PASS — fully mirrored + translated, Latin digits |
| 4 | Schedule · AR RTL · Light | `schedule__ar__light__desktop.png` | ✅ PASS — calm day-grouped list, status-accent borders, no calendar widget |
| 5 | Students · AR RTL · Light | `students__ar__light__desktop.png` | ✅ PASS — directory table, status chips, progress bars, summary cards, preview |
| 6 | Trainers · AR RTL · Light | `trainers__ar__light__desktop.png` | ✅ PASS — card grid, availability chips, hand-rolled performance stats |
| 7 | Curricula · AR RTL · Light | `curricula__ar__light__desktop.png` | ✅ PASS — course cards, status chips, counts, level preview |
| 8 | Settings · AR RTL · Light | `settings__ar__light__desktop.png` | ✅ PASS — sections; real theme/lang, demo save/toggles, disabled-with-reason, reset→confirm, roles preview |
| 9 | Sessions · AR RTL · Light · Mobile | `sessions__ar__light__mobile.png` | ✅ PASS — sidebar→hamburger, 2×2 tiles, table scrolls |
| 10 | Schedule · AR RTL · Light · Tablet | `schedule__ar__light__tablet.png` | ✅ PASS — sidebar retained, filter wraps, day-groups reflow |

**§A4 failure conditions:** none triggered — not generic, not disconnected from Spec 001, sidebar/topbar identical, not cluttered, readable, real filters, not spreadsheet-like, real cards, no dead actions, good dark mode, RTL/LTR correct, static HTML-first (no `#app`), GitHub-Pages relative paths, Django-mappable.

**Automated (accompanying):** build clean · smoke PASS (18 loads, structure + filter/drawer behavior) · axe critical=0/serious=0 (14 scenarios) · 0 console errors. Spec 001 pages re-verified — no regression.

## Architecture change (static / HTML-first / Django-ready)
Re-captured after converting from a JS-rendered app to a **static-site-generated** build: pages ship as complete static HTML in `public/` (real shell + sections, no JS mount), runtime JS only enhances, per-language pre-rendered pages, relative `./assets/` paths (GitHub Pages / Live Server compatible). The rendered design is **pixel-identical** to the pre-refactor captures — all 8 frames still PASS, smoke PASS, axe critical=0/serious=0, 0 console errors. Behaviors verified: theme toggles in-place, language navigates (theme persists), mobile drawer clones the static sidebar.

## Pre-003 Alignment — Sidebar/Shell refactor + naming (2026-06-29)

The shell was corrected to the now-mandatory **`sidebar-reference.png`**: a **slim icon rail** (hamburger top · icon stack with the active icon in a filled-violet square · circular profile avatar at the bottom) **+ an expanded light nav panel** (brand wordmark · section label · grouped list with a **large violet active pill**), replacing the previous single dark `#1F1B38` column. Naming aligned to the analyzed academy system: **Trainers→Teachers** (المعلمون, `teachers.html`), **Curricula→Courses** (الدورات, `courses.html`), Schedule AR → الجدول الدراسي, Sessions "trainer" column → "teacher". Each capture reviewed directly against `sidebar-reference.png` + the approved `academy-dashboard.png` body.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · AR · Light | `dashboard__ar__light__desktop.png` | ✅ PASS — faithful to sidebar-reference: rail+light panel, violet pill on الرئيسية, filled-violet rail square, bottom avatar; warm body preserved |
| 2 | Dashboard · AR · Dark | `dashboard__ar__dark__desktop.png` | ✅ PASS — rail is the deepest plane (#0E0C18), panel a step lighter w/ divider; premium dark, violet pill pops |
| 3 | Dashboard · AR · Light · **collapsed rail** | `dashboard__ar__light__desktop__rail.png` | ✅ PASS — panel hidden, rail-only (active square + avatar), content reflows, no layout break |
| 4 | Teachers · AR · Light | `teachers__ar__light__desktop.png` | ✅ PASS — renamed المعلمون (title/crumb/active pill); card grid, availability chips, varied bios/stats |
| 5 | Courses · AR · Light | `courses__ar__light__desktop.png` | ✅ PASS — renamed الدورات ("دورة جديدة"); status chips, subject·level, counts |
| 6 | Sessions · EN · Light (LTR) | `sessions__en__light__desktop.png` | ✅ PASS — shell **mirrored** (rail far-left, panel right); Teachers/Courses + "Teacher" column; status tiles, table |
| 7 | Sessions · AR · Light · Mobile | `sessions__ar__light__mobile.png` | ✅ PASS — sidebar→hamburger drawer, 2×2 tiles, table reflows, المعلم column |
| 8 | Sessions/Schedule/Students/Settings · AR · Light | respective files | ✅ PASS — all carry the new shell + correct active pill; bodies unchanged (aligned), Reports now uses shared `pageHeader` |

**§A4 failure conditions:** none triggered — shell clearly matches `sidebar-reference.png`, not generic, sidebar/topbar coherent, real filters, not spreadsheet-like, good dark mode, RTL/LTR correct, static HTML-first (no `#app`), relative paths.

**Automated (accompanying):** build clean (18 pages, idempotent — stale `trainers`/`curricula` routes removed) · smoke PASS (18 loads + new `.nav-rail`/`.nav-panel`/single-active-item assertions + filter/drawer behavior) · axe **critical=0 / serious=0** (15 scenarios incl. dashboard EN dark) · 19 screenshots, 0 console errors. Fixed a real **dark-mode AA contrast** bug on `.btn-primary` (white on `#9486F4` = 3.01 → new `--c-primary-btn`).

## Navigation IA + Topbar alignment (2026-06-29)

The sidebar now renders the **full discovered admin IA** — **7 job-based groups, 17 items**: 8 implemented (real links + violet active pill) + 8 **planned** («قريبًا» amber pill, `<button>` not `<a>`, coming-soon toast) + 1 **disabled** (Finance, lock + reason toast). The 3 role portals stay **future-role (hidden)**; the long tail (announcements/library/finance sub-areas/tools/etc.) is folded or documented in `navigation-ia-contract.md`. The rail mirrors **only navigable (implemented) pages**. The topbar adds a **«+» Quick-Actions menu** (new session/add student/add teacher = demo; create announcement = disabled-with-reason) + a **⌘K command popover** + a notifications "View all" (disabled-with-reason) + a profile menu that **folds** Help/Settings/Log-out (confirm modal). No dead links — every nav/topbar control acts, opens a menu, fires a demo toast, or is disabled-with-reason.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · AR · Light (full IA) | `dashboard__ar__light__desktop.png` | ✅ PASS — 7 calm groups; implemented rows unchanged (active pill, 24 badge); planned «قريبًا» clearly secondary; Finance disabled w/ lock; topbar «+» + ⌘K; not cluttered |
| 2 | Dashboard · AR · Dark (full IA) | `dashboard__ar__dark__desktop.png` | ✅ PASS — قريبًا pills + lock legible/premium on the deep panel; violet active pill correct |
| 3 | Dashboard · EN · LTR (full IA) | `dashboard__en__light__desktop.png` | ✅ PASS — rail far-left, "Soon" pills + lock mirror to inline-end; ⌘K renders LTR; groups translated |
| 4 | Collapsed rail | `dashboard__ar__light__desktop__rail.png` | ✅ PASS — rail shows only implemented icons + avatar (no planned/disabled); no scroll |
| 5 | Mobile drawer (open) | `dashboard__ar__light__mobile__drawer.png` | ✅ PASS — full-IA panel full-width (rail hidden); planned/disabled render; active pill correct |
| 6 | Sessions / Students / Settings · AR · Light | respective files | ✅ PASS — same full-IA shell + correct active pill; page bodies unchanged |

**Interaction proof (recorded, not a static shot):** clicking a planned row → «قريبًا» toast; clicking Finance → billing-reason toast; «+» opens the quick-actions menu; ⌘K opens the command popover — none navigate, none dead (smoke-asserted).

**§A4 failure conditions:** none — sidebar matches `sidebar-reference.png`, full IA visible but **not** overwhelming, future items clearly marked + non-dead, topbar complete but not cluttered, active state correct, RTL/LTR + dark + mobile drawer all good, static HTML-first (no `#app`), relative paths.

**Automated (accompanying):** build clean (18 pages) · smoke PASS (18 loads + NEW assertions: no-dead-nav, rail-only-implemented, planned/disabled/quick-actions feedback) · axe **critical=0 / serious=0** · 20 screenshots, 0 console errors. New icons vendored (tasks/messages/families/materials/certificates/staff/megaphone), 0 missing.

## Category Navigation Rail (2026-06-29)

Corrected the sidebar to the **two-level category rail** of `sidebar-reference.png`: the slim rail is a **tablist of 6 category icons** (Control 📚 · Families 👥 · Teachers · Reports 📊 · Administration ▦ · Settings ⚙ + hamburger + bottom avatar); selecting a category swaps the expanded panel to show **ONLY that category's links** (with its title + optional sub-section) — never all categories at once. The route's category opens on load; clicking a rail icon switches the panel client-side (no navigation, persisted). Topbar gained an **apps-grid quick-launcher**. Reviewed each capture against `sidebar-reference.png`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard · AR · Light — **Control** category | `dashboard__ar__light__desktop.png` | ✅ PASS — matches the reference Dashboard panel exactly (الرئيسية pill, الجلسات 24, الجدول الدراسي + قريبًا items); other categories NOT shown |
| 2 | **Families** category selected (clicked, no nav) | `dashboard__ar__light__desktop__cat-families.png` | ✅ PASS — panel swapped to ONLY Families links (الطلاب/الدورات implemented, rest قريبًا); rail Families icon = violet square |
| 3 | **Teachers** category (with sub-section) | `dashboard__ar__light__desktop__cat-teachers.png` | ✅ PASS — المعلمون link + sub-section «مؤشرات الأداء» (3 perf items قريبًا) |
| 4 | Reports / Admin / Settings categories | `..__cat-reports/admin/settings.png` | ✅ PASS — each shows only its links; Reports/Admin finance items disabled w/ lock |
| 5 | **EN LTR** — Families category | `dashboard__en__light__desktop__cat-families.png` | ✅ PASS — rail far-left, panel right, only Families links, "Soon" pills, apps-grid in topbar |
| 6 | Dashboard · AR · **Dark** | `dashboard__ar__dark__desktop.png` | ✅ PASS — category rail + panel premium in dark; violet active square/pill correct |
| 7 | Collapsed rail / Mobile drawer | `..__rail.png` / `..__drawer.png` | ✅ PASS — collapse hides panel (rail categories persist); drawer keeps rail+panel so switching works on mobile |

**Core requirement met:** the sidebar **no longer shows all links at once** — only the selected category's links are visible, and clicking a rail category switches the panel (smoke-asserted: 6 category tabs · exactly ONE visible panel · switching to families works).

**Automated:** build clean · smoke PASS (+ category-switch + single-visible-panel + 6-tabs assertions) · axe **critical=0 / serious=0** · 26 screenshots, 0 console errors. New icons: layers/grid/user-plus (52 total, 0 missing).

## Timetable & Scheduling Experience — Spec 003 (2026-06-29)

Evolved the Schedule + Sessions surfaces into a tabbed timetable experience: **List/Agenda** + a NEW **hand-rolled weekly Timetable grid** (days × cropped working hours, status-colored blocks, today column, overlap lanes, attention flags — **no calendar library**). Clicking any block opens ONE shared **appointment drawer** (progressive disclosure + demo/disabled actions). Filters (teacher / subject / status / search) narrow BOTH views; an admin **teacher-timetable lens** scopes the grid. Sessions gains a today Timetable/agenda tab; the Dashboard gains a minimal fixture-backed impact (deep-links + shared drawer + "up next" strip + attention chip). Reviewed against the old-system *All Teachers Timetable* (product reference only) + the Spec 001/002 approved direction. Arabic label **`الجدول الدراسي`** / English **`Timetable`**.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Schedule · **List tab** · AR Light | `schedule__ar__light__desktop__list.png` | ✅ PASS — calm day-grouped blocks kept; attention flags + teacher facet added; not a plain table |
| 2 | Schedule · **Timetable tab** · AR Light | `schedule__ar__light__desktop__timetable.png` | ✅ PASS — readable weekly grid (Sat-first RTL, axis 08–16 cropped), today (الأحد) violet + live teal blocks, attention flags (تعارض/قد تتأخر/ملغاة line-through), Tue overlap side-by-side |
| 3 | Schedule · Timetable · AR **Dark** | `schedule__ar__dark__desktop__timetable.png` | ✅ PASS — true-dark surfaces, blocks legible (ink-2), live tint + today subtle; contrast fixed (axe clean) |
| 4 | Schedule · Timetable · **EN LTR** | `schedule__en__light__desktop__timetable.png` | ✅ PASS — fully mirrored (Sat→Thu left-to-right, axis left), English labels (Timetable/List/Possible conflict/May run late/Cancelled), LTR times |
| 5 | Schedule · **Teacher lens** · AR Light | `schedule__ar__light__desktop__teacher.png` | ✅ PASS — teacher filter (سارة القحطاني) scopes grid to her 3 sessions, "عرض ٣ من ١١" — admin display only, no portal |
| 6 | **Appointment drawer** · AR Light | `schedule__ar__light__desktop__drawer.png` | ✅ PASS — status/date/time(LTR)/teacher/students/subject/room/notes + actions (edit·notify·cancel-danger); scrim + focus trap |
| 7 | **Dashboard** schedule impact · AR Light | `dashboard__ar__light__desktop__schedule-impact.png` | ✅ PASS — hero "عرض الجدول" deep-link + "القادم هذا الأسبوع" strip + "⚠ ٢ تحتاج انتباه" chip; rows open shared drawer; stays calm (no new stat wall) |
| 8 | **Mobile agenda** fallback · AR Light | `schedule__ar__light__mobile__agenda.png` | ✅ PASS — grid reflows to stacked day-grouped agenda via source order (no duplicate markup), attention flags kept |
| 9 | **Tablet** Timetable · AR Light | `schedule__ar__light__tablet__timetable.png` | ✅ PASS — grid readable at 834px |
| 10 | **Sessions** Timetable/agenda tab · AR Light | `sessions__ar__light__desktop__timetable.png` | ✅ PASS — status tiles kept; today's sessions as time-ordered agenda; shared drawer chevrons; table still the List tab |

**§A4 failure conditions:** none — the schedule is **not** a plain table (calendar/timetable tab present), the detail **drawer** is present, time blocks are readable (cropped axis, generous height, 3 tidy lines), filters are strong (teacher lens + facets, visible feedback), dark mode is good, RTL/LTR correct (times never mirrored), it is static HTML-first (no `#app`, the grid is **baked** — block `grid-row`/`--col` placement computed at build, not runtime), relative paths only, **no calendar library**, Django-mappable (`{% for day %}{% for block %}`). Resembles the analyzed system's weekly-timetable idea but cleaner/calmer — not a legacy copy, not invented.

**Automated (accompanying):** build clean (18 pages, 52 icons / 0 missing) · smoke PASS (18 loads + NEW Spec 003 assertions: ≥2 content tabs · exactly ONE visible tabpanel · baked timetable grid · tab-switch shows only the grid · timetable block opens the drawer · teacher lens narrows the grid) · axe **critical=0 / serious=0** (incl. `#view=timetable` scans) · 35 screenshots, **0 console errors**. No new dependencies.

## Families & Student Academic Profiles — Spec 004 (2026-06-29)

Added the admin Families & Students academic experience on top of Spec 001/002/003: a **Families directory** (`families.html` — family-as-hero cards that group each family's children: overlapping child-avatar stack + "+N" overflow, guardian, labeled lifecycle status chip, category, attention hint, student & active-course counts), a **Family profile** (`family.html` — banner + baked tabs Overview/Children/Schedule/Plan&Billing/Notes; children link to student profiles; schedule reuses Spec 003 `scheduleAgenda` + shared drawer + `#view=timetable` deep-link; billing is a disabled-with-reason stub), an **Add-Family wizard** (`add-family.html` — 5 baked steps Identity→Contact→Children→Plan&Billing→Review; `data-step-next/prev` toggle visibility, every field labeled, Save = demo toast, no persistence), an enriched **Students** directory (`students.html` — real `familyId` + family chip-link + family facet + "view profile" link, quick-peek drawer kept), and a **Student academic profile** (`student.html` — banner with family link + 7 baked tabs incl. **Results** = fixture progress/certificates and **Evaluation** = the monthly progress-report rubric). New labeled family/student **lifecycle status map** (active/trial/suspended/stopped/inactive — never numeric/color-only). Nav promotes `families`/`addFamily`; `family`/`student` are profile templates (activeId families/students); the rest of the families category stays «قريبًا/Soon». Minimal fixture-backed dashboard impact. Reviewed against the analyzed academatic family/student screens (product reference only) + the approved Spec 001/002/003 direction.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | **Families** directory · AR Light | `families__ar__light__desktop.png` | ✅ PASS — family-as-hero cards group children (overlapping avatar stack + "+1"), labeled lifecycle chips (نشطة/تجريبية/موقوفة مؤقتًا/غير نشطة/متوقفة), attention flags (الفترة التجريبية تنتهي قريبًا / دفعة متأخرة), category chips, counts, empty-family state «لا يوجد أبناء بعد»; not a CRM, not a spreadsheet |
| 2 | **Families** · AR **Dark** | `families__ar__dark__desktop.png` | ✅ PASS — true-dark surfaces, chips/avatars/attention legible, violet active pill correct |
| 3 | **Families** · **EN LTR** | `families__en__light__desktop.png` | ✅ PASS — fully mirrored (sidebar left), Latin numerals, "Add family / View family profile", "Trial ending soon / Payment overdue / No children yet" |
| 4 | **Family profile** · AR Light | `family__ar__light__desktop.png` | ✅ PASS — banner (guardian + status + category + KPIs + edit/add-child/suspend/stop) + baked tabs; Overview shows contacts + details; calm, not a portal |
| 5 | **Add-family wizard** (Children step) · AR Light | `add-family__ar__light__desktop__wizard-step3.png` | ✅ PASS — step indicator (③ الأبناء active), labeled child mini-rows, «إضافة ابن آخر» demo, Back/Next; one giant legacy form avoided |
| 6 | **Students** (family link + facet) · AR Light | `students__ar__light__desktop.png` | ✅ PASS — family chip-link column + family facet + view-profile link; quick-peek drawer kept; lifecycle status chips |
| 7 | **Students** · AR **Dark** | `students__ar__dark__desktop.png` | ✅ PASS — dark table legible, family chips + status correct |
| 8 | **Student profile** · AR Light | `student__ar__light__desktop.png` | ✅ PASS — banner (student + **family link chip** + status + level + 78% progress bar) + 7 baked tabs; Overview facts + progress + deep-links; family relationship unmistakable |
| 9 | Student **Results** tab · AR Light | `student__ar__light__desktop__results.png` | ✅ PASS — level/term summary + overall 78% + per-course bars (78/100/100%) + certificates (صادرة) + export(disabled)/print(demo) + «عرض تجريبي – ليست نتائج فعلية أو نظام درجات»; not a gradebook |
| 10 | Student **Evaluation** tab · AR Light | `student__ar__light__desktop__evaluation.png` | ✅ PASS — monthly rubric (مستوى التعلّم/التركيز/أداء الواجبات/الالتزام) with calm rating pills (icon+label), achievements + objectives narratives, اعتماد التقرير demo + «لا يوجد سير عمل اعتماد فعلي» |
| 11 | **Dashboard** family impact · AR Light | `dashboard__ar__light__desktop__family-impact.png` | ✅ PASS — one calm connective card («العائلات» + «⚠ ٤ بحاجة إلى متابعة» chip + «عرض العائلات» deep-link); no new stat wall, no fake finance widget |
| 12 | **Mobile** Families · AR Light | `families__ar__light__mobile.png` | ✅ PASS — single-column cards, child stacks intact, no horizontal overflow |
| 13 | **Mobile** Student profile · AR Light | `student__ar__light__mobile.png` | ✅ PASS — banner stacks (family link + progress), KPIs 2×2, tablist scrolls; no overflow |

**Failure conditions:** none triggered — not a generic CRM, not a spreadsheet; the family↔student relationship is the hero (grouped children + real family links both ways); family profile + student academic profile present; strong filters with feedback + no-results; Results = fixture progress/certificates, Evaluation = the fixture rubric (no gradebook/engine); timetable linkage reuses Spec 003 (`scheduleAgenda` + shared drawer + `#view=timetable`); dashboard impact minimal; no dead links/actions; no legacy copy; no raw i18n keys; good dark mode; correct RTL/LTR; static HTML-first (baked cards/tabs/steps/templates, no `#app`); relative paths; Django-mappable; only one nav category panel visible at a time.

**Automated (accompanying):** build clean (26 pages, 62 icons / 0 missing) · smoke PASS (26 loads + NEW Spec 004 assertions: family cards group children · promoted nav real links · profile tabs baked + one visible + switch · wizard advances/retreats + Save toasts + labeled fields · no portals in DOM) · axe **critical=0 / serious=0** (incl. families/family/add-family/student + `#view=results|evaluation|students` + `#step=children` + dark + EN) · 48 screenshots, **0 console errors**. No new dependencies.

## Attendance & Session Outcomes — Spec 005 (2026-06-30)

Added the admin-facing daily **Attendance & Session Outcomes** experience on top of Spec 001/002/003/004: ONE new page **`attendance.html`** (+`.en`, title «الحضور ونتائج الجلسات»/"Attendance & Session Outcomes", nav «الحضور»/"Attendance" promoted in the **control** category, `activeId:'attendance'`) — a premium daily **outcomes board**: five **summary tiles** that double as filters (`data-filter-set`), a six-facet **filter bar** (day/outcome/teacher/family/subject/attention), and an airy **outcome list/card hybrid** (time·day · session+course · teacher avatar · the **labeled outcome chip** · student & family **link-chips** · follow-up flag · kebab). A NEW labeled **outcome status map** (`attended/studentAbsent/teacherAbsent/cancelled/rescheduled/upcoming/live` + flags — distinct from the scheduling-status & lifecycle maps, **never numeric/color-only**), with **studentAbsent (coral) vs teacherAbsent (amber)** unmistakable. ONE **canonical outcome drawer** (`outcomeTemplate` = a SUPERSET of the shared `appointmentRows` refactor + an outcome section: Outcome chip + who-absent/who-cancelled **attribution** + present/capacity + make-up & follow-up **display hints** + teacher feedback) — labels BOTH "Status" + "Outcome" (no double-encoding) and is **reused on Sessions** (secondary outcome chip on recorded rows only; scheduling status stays primary). Status-gated **demo-only actions** (markAttend/notify/feedback/reverse = toast; cancel/reschedule/mark-absent = confirm→toast; real-save/notify/add-to-credit = disabled-with-reason). Light fixture **integrations**: Student profile «الحضور الأخير» hint, Family profile «متابعة جلسات الأبناء» hint, Dashboard one «needs-follow-up today» chip on the existing people-signal card — all deep-linking to `attendance.html`, no new stat wall, no finance/credit engine. Reviewed against the analyzed academatic session/attendance/outcome screens (product reference only) + the approved Spec 001–004 direction.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | **Attendance** board · AR Light | `attendance__ar__light__desktop.png` | ✅ PASS — premium daily board: 5 outcome tiles (حضور مكتمل ٥ / غياب طلاب ٢ / غياب المعلمين ١ / ملغاة ومؤجلة ٣ / تحتاج متابعة ٦), airy rows, **«غياب الطالب» (coral) vs «غياب المعلم» (amber)** unmistakable, student+family link-chips, follow-up flags; الحضور active in control nav; not a generic attendance spreadsheet |
| 2 | **Attendance** · AR **Dark** | `attendance__ar__dark__desktop.png` | ✅ PASS — true-dark surfaces; outcome chips (مكتمل/غياب/ملغاة/مُعاد جدولتها/جارية/قادمة) + amber follow-up flags legible; violet active pill correct |
| 3 | **Attendance** · **EN LTR** | `attendance__en__light__desktop.png` | ✅ PASS — fully mirrored (sidebar left), Latin numerals, "Attended / Student absent / Teacher absent / Cancelled / Rescheduled / Live / Upcoming", "Follow up an absence/cancellation · Confirm the reschedule"; absence types distinct |
| 4 | **Outcome drawer** (canonical) · AR Light | `attendance__ar__light__desktop__drawer.png` | ✅ PASS — the ONE superset drawer: BOTH labeled «مكتملة» Status chip AND «حضور مكتمل» Outcome chip, date/time/duration/teacher, family link, subject/room/notes, outcome section (student link + attribution + teacher feedback), status-gated demo actions; never color-only |
| 5 | **Action confirm** modal · AR Light | `attendance__ar__light__desktop__confirm.png` | ✅ PASS — an upcoming row's gated actions + a «تسجيل غياب الطالب؟» confirm modal stating «لا يُحفظ شيء» (demo-only, no persistence) |
| 6 | **Sessions** outcome integration · AR Light | `sessions__ar__light__desktop__outcome.png` | ✅ PASS — a SECONDARY outcome chip below the PRIMARY scheduling status on recorded rows only (no double-encoding), «عرض الحضور» deep-link, canonical drawer reused; الحضور in nav |
| 7 | **Student profile** attendance hint · AR Light | `student__ar__light__desktop__attendance.png` | ✅ PASS — a calm «الحضور الأخير» card (fixture "attended N of M" + «عرض الحضور» deep-link) inside Overview; no new tab, no engine claim |
| 8 | **Family profile** follow-up hint · AR Light | `family__ar__light__desktop__attendance.png` | ✅ PASS — a calm «متابعة جلسات الأبناء» card («١ جلسات لأبناء العائلة تحتاج متابعة» + «عرض الحضور» deep-link); fixture-only, no finance/credit claim |
| 9 | **Dashboard** outcome impact · AR Light | `dashboard__ar__light__desktop__outcome-impact.png` | ✅ PASS — ONE «٦ بحاجة إلى متابعة اليوم» clipboard chip folded into the existing people-signal card (beside students-attention) + deep-link; no new stat wall, no fake finance widget |
| 10 | **Mobile** Attendance · AR Light | `attendance__ar__light__mobile.png` | ✅ PASS — tiles wrap, rows reflow to single-column cards (time/day → title → course → outcome+student+family chips + follow-up flag + kebab); no horizontal overflow |
| 11 | **Mobile** outcome drawer · AR Light | `attendance__ar__light__mobile__drawer.png` | ✅ PASS — the canonical drawer as a full-height sheet; both Status + Outcome chips, student/family links, feedback, status-gated actions; correct attended-row gating (no reschedule/credit) |

**Failure conditions:** none triggered — not a generic attendance spreadsheet; the outcome vocabulary is **labeled icon+text, never color-only**; **studentAbsent vs teacherAbsent** are visually + textually distinct (coral vs amber, distinct icons + labels); cancelled vs rescheduled distinguished; ONE canonical outcome drawer (a superset of the shared appointment rows) reused on Attendance + Sessions; all actions are demo-toast / confirm→toast / disabled-with-reason (no real save/mutation/notification/persistence claim); no dead links/actions; no legacy copy/assets/numeric statuses; no raw i18n keys; strong dark mode; correct RTL/LTR; static HTML-first (baked tiles/rows/drawer templates, no `#app`); relative paths; Django-mappable; minimal dashboard impact; no student/teacher/family portals.

**Automated (accompanying):** build clean (28 pages, 66 icons / 0 missing) · smoke PASS (28 loads + NEW Spec 005 asserts: 5 tiles · ≥12 outcome rows · **every** outcome chip labeled icon+text · **studentAbsent vs teacherAbsent textually distinct** · tile→filter narrows · kebab→view opens the canonical drawer with an Outcome section · student/family/schedule real `<a>` links · `attendance` nav real `<a>` with route, rest «قريبًا/Soon» · no portals/`#app`) · axe **critical=0 / serious=0** (attendance AR light + dark + EN) · screenshots **0 console errors**. No new dependencies.

**Post-review fixes (verification gate, 2026-06-30).** A 3-perspective adversarial pass (clean-code / test-guard / scope-guard) over the diff — scope-guard CLEAN — surfaced and fixed: (1) the canonical outcome drawer was dropping the spec-required **present/capacity** line on attendance rows (shared `appointmentRows` reads `i.students`, attendance rows carry `present`/`capacity`); now rendered in the **outcome section** («الحضور ١٨ / ٢٠»), **gated to outcomes where attendance was taken** (attended/studentAbsent/teacherAbsent) so cancelled/upcoming never show a misleading "0 / N" — drawer frames re-reviewed (desktop + mobile), PASS; (2) the «ملغاة ومؤجلة = ٣» tile filtered to only the 2 *cancelled* rows — added backward-compatible OR-matching to `applyFilter` (`cancelled+rescheduled`) + a matching outcome option, so the tile now reveals all **3**; (3) hardened the outcome-row student/family link guards to require the resolved name key. Test hardening: the smoke "labeled chip" check now asserts **all** chips (not ≥1), plus the new absence-distinction assertion; a Playwright robustness fix seats the kebab/popover inside the shell's `.page-scroll` overflow container before clicking. Re-verified: build + smoke + a11y green, attendance frames recaptured 0 console errors.
