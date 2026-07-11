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

## Courses, Groups & Learning Paths — Spec 006 (2026-06-30)

Added the admin **Courses, Groups & Learning Paths** experience on top of Spec 001–005, making the academy feel academically complete by unifying the course↔group↔student↔teacher↔schedule↔attendance graph the legacy system scattered/dead-ended. Grounding decision: a **Course = a subject offering** (the app's improved framing; the legacy "course = enrolment" lives on the Spec 004 student `enrollments[]`), a **Group = a cohort/class** (one teacher + many students + a shared schedule delivering a course — the genuine new depth the legacy system left skeletal), and **Learning Paths are display-only** (NO curriculum engine is reference-backed). Surfaces: **ENRICHED** `courses.html` (academic counts + a course-profile link); NEW **`course.html`** profile (banner + 8 baked tabs); NEW **`groups.html`** directory (the planned `groups` nav item **promoted** NI12) + NEW **`group.html`** profile (7 baked tabs). NEW labeled **group-status** map (`active/trial/full/paused/completed` + a `needsAttention` flag) + EXTENDED course-status (+`paused`) + a relocated **enrollment-status** (active/paused/completed) — three DISTINCT labeled maps, never numeric/color-only. The Timetable tabs **reuse** the Spec 003 `scheduleAgenda` + the schedule deep-link; the Outcomes/Sessions tabs **reuse** the Spec 005 `outcomeRow` + the **canonical** outcome drawer + the attendance deep-link (SC-009 — zero new builders). Light fixture integration: Student Courses-tab links to course/group, Family Overview gains a courses/groups hint, Dashboard gains ONE "groups needing attention" chip. Reviewed against the analyzed academatic course/group screens (product reference only) + the approved Spec 001–005 direction.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | **Courses** (enriched) · AR Light | `courses__ar__light__desktop.png` | ✅ PASS — labeled course-status chips (فعّالة/مسوّدة/مؤرشفة, distinct icons), active-students/groups/teachers counts + upcoming hint + attention flag + «عرض الدورة» link; not a generic catalogue |
| 2 | **Courses** · AR **Dark** | `courses__ar__dark__desktop.png` | ✅ PASS — true-dark, counts/chips legible |
| 3 | **Courses** · **EN LTR** | `courses__en__light__desktop.png` | ✅ PASS — mirrored, "View course" + counts |
| 4 | **Course profile** · AR Light | `course__ar__light__desktop.png` | ✅ PASS — banner (subject+level+status+counts+actions) + 8 baked tabs; Groups→group, Students→student; not a portal |
| 5 | **Course Learning Path** · AR Light | `course__ar__light__desktop__learning-path.png` | ✅ PASS — display-only level ladder (تأسيسي→ل١→ل٢·الحالي→ل٣) + per-level counts + certificates hint + explicit «عرض فقط – لا يوجد محرّك مناهج» note |
| 6 | **Groups** directory · AR Light | `groups__ar__light__desktop.png` | ✅ PASS — promoted «المجموعات» nav active; airy rows (course/teacher/level/schedule/count + labeled group-status نشطة/تجريبية/مكتملة العدد/موقوفة/منتهية + attention); 3 tiles; not a spreadsheet |
| 7 | **Groups** · AR **Dark** | `groups__ar__dark__desktop.png` | ✅ PASS — true-dark, distinct labeled statuses |
| 8 | **Group profile** · AR Light | `group__ar__light__desktop.png` | ✅ PASS — banner (course chip-link + teacher + level + status + count + actions incl. remove-student) + 7 baked tabs |
| 9 | **Group Timetable** (Spec 003 reuse) · AR Light | `group__ar__light__desktop__timetable.png` | ✅ PASS — reuses `scheduleAgenda` + «عرض في الجدول» deep-link; session-status chips |
| 10 | **Group Sessions & Outcomes** (Spec 005 reuse) · AR Light | `group__ar__light__desktop__outcomes.png` | ✅ PASS — reuses `outcomeRow` + canonical drawer (labeled outcome chip + student/family link-chips) + «عرض الحضور» deep-link; no bespoke drawer |
| 11 | **Student** Courses-tab links · AR Light | `student__ar__light__desktop__course-links.png` | ✅ PASS — enrollment cards → `course.html` + group chip → `group.html`; enrollment status «جارية» (play/live) **distinct** from catalogue «فعّالة» (check/green) — no shadowing |
| 12 | **Family** courses/groups hint · AR Light | `family__ar__light__desktop__course-group.png` | ✅ PASS — ONE calm Overview hint + «الدورات»/«المجموعات» deep-links; no finance/enrolment claim |
| 13 | **Dashboard** groups impact · AR Light | `dashboard__ar__light__desktop__groups-impact.png` | ✅ PASS — ONE «٢ مجموعة تحتاج متابعة» chip folded into the existing people-signal card; no new stat wall |
| 14 | **Mobile** Groups · AR Light | `groups__ar__light__mobile.png` | ✅ PASS — rows → single-column cards, tiles wrap; no overflow |
| 15 | **Mobile** Group profile · AR Light | `group__ar__light__mobile.png` | ✅ PASS — banner stacks, actions wrap, KPIs 2×2, tabs scroll; no overflow |

**Failure conditions:** none triggered — not a generic course catalogue, not a class spreadsheet; the course↔group↔student↔teacher↔schedule↔outcome relationships are visible and linked; profile/detail experiences present; all three status vocabularies labeled (icon+text, never numeric/color-only) and distinct; actions are demo / confirm→toast / disabled-with-reason / real-link (no dead controls, no persistence/mutation); learning path is display-only (no engine); the Spec 003 agenda + Spec 005 canonical drawer are reused unchanged (SC-009); no legacy copy/assets/numeric statuses; no raw i18n keys; strong dark mode; correct RTL/LTR; static HTML-first (baked cards/rows/profile tabs/drawer templates, no `#app`); relative paths; Django-mappable; minimal dashboard impact; no portals.

**Automated (accompanying):** build clean (34 pages, 66 icons / 0 missing) · smoke PASS (34 loads + NEW Spec 006 asserts: ≥6 group rows · **all** group-status chips labeled icon+text · `groups` nav real `<a>` · rows → `group.html` · 3 tiles · status filter narrows · course/group profile tabs baked + one-visible + switch · ≥4 reused drawer templates · course→group/student links + learning-path ladder · group→student/family/course links · no portals/`#app`) · axe **critical=0 / serious=0** (courses AR light+dark+EN, groups AR light+dark+EN, course/group AR light + tab states) · 74 screenshots, **0 console errors**. No new dependencies.

## Spec 007 — Teacher Performance & Academic KPIs — 2026-06-30

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Teachers directory (enriched) · AR Light | `teachers__ar__light__desktop.png` | ✅ PASS — labeled status + workload + conditional follow-up chips, courses/groups/students counts, upcoming hint, View-profile link; reads as teacher operations, not an HR table |
| 2 | Teachers directory · AR Dark | `teachers__ar__dark__desktop.png` | ✅ PASS — true-dark, AA contrast, chips legible |
| 3 | Teachers directory · EN LTR | `teachers__en__light__desktop.png` | ✅ PASS — fully mirrored, Latin digits, English labels, PERFORMANCE section with promoted "Teacher performance" |
| 4 | Teacher profile (Sara) · AR Light | `teacher__ar__light__desktop.png` | ✅ PASS — banner (status+availability+workload+KPIs+honest actions) over 8 baked tabs; Overview shows teacher-absent vs student-absent as two distinct chips |
| 5 | Teacher Performance board · AR Light | `teacher-performance__ar__light__desktop.png` | ✅ PASS — 7 count tiles + per-teacher comparison cards (workload/follow-up signals + counts → profile) + follow-up queue; NO score/rank/chart/salary |
| 6 | Teacher profile Timetable tab · AR Light | `teacher__ar__light__desktop__timetable.png` | ✅ PASS — reuses Spec 003 scheduleAgenda + schedule deep-link |
| 7 | Teacher profile Sessions & Outcomes tab · AR Light | `teacher__ar__light__desktop__outcomes.png` | ✅ PASS — reuses Spec 005 outcomeRow + canonical drawer; teacher-absent (amber) vs student-absent (red) distinct |
| 8 | Teacher action confirm (Notify family) · AR Light | `teacher__ar__light__desktop__confirm.png` | ✅ PASS — confirm modal → demo toast, "no real notification" copy |
| 9 | Teacher profile Students tab (cross-links) · AR Light | `teacher__ar__light__desktop__students.png` | ✅ PASS — roster rows → student.html + family chips → family.html |
| 10 | Dashboard teacher follow-up signal · AR Light | `dashboard__ar__light__desktop__teachers-followup.png` | ✅ PASS — ONE "teachers needing follow-up" chip folded into the existing people card → teacher-performance.html; no new stat wall |
| 11 | Mobile Teachers directory · AR Light | `teachers__ar__light__mobile.png` | ✅ PASS — single-column cards, chips wrap, no overflow |
| 12 | Mobile Teacher profile · AR Light | `teacher__ar__light__mobile.png` | ✅ PASS — banner stacks, tabs scroll, no overflow |

**Failure conditions:** none triggered — not a generic HR dashboard / employee table; not a fake analytics suite (no computed score, ranking, leaderboard, percentile, or chart — every number is a fixture count); no salary/payroll/compensation widget anywhere; teacher↔course/group/schedule/outcomes relationships visible and linked; teacher-absent vs student-absent unmistakably distinct; honest demo/disabled/confirm actions (no dead controls, no persistence/mutation); not a portal (admin profile template, highlights the Teachers nav); the Spec 003 agenda + Spec 005 canonical outcome drawer reused unchanged (SC-009); no legacy copy/assets/numeric statuses; no raw i18n keys; strong dark mode; correct RTL/LTR; static HTML-first (baked cards/rows/tabs/drawer templates, no `#app`); relative paths; Django-mappable.

**Automated (accompanying):** build clean (38 pages, 66 icons / 0 missing, no missing i18n keys) · smoke PASS (38 loads + NEW Spec 007 asserts: enriched teacher cards with labeled status chips + teacher.html links · status filter narrows · teacher profile 8 baked tabs + one-visible + named switch · course/group/student/family + schedule/attendance deep-links · canonical outcome drawer opens from the sessions tab · teacher-absent ≠ student-absent textually distinct · teacher.html NOT a nav item · board KPI tiles + comparison cards → teacher.html + promoted teacherKpi nav + filter narrows + no forbidden score/rank/finance token · ≤1 dashboard teacher chip) · axe **critical=0 / serious=0** (teachers AR dark + EN, teacher AR light + sessions-outcomes + EN, teacher-performance AR light + dark + EN) · 86 screenshots, **0 console errors** · scope-guard grep audit clean (no finance/score/chart token in teacher src, no `#app`). No new dependencies.

## Spec 008 — Academic Reports & Operations Shell — 2026-06-30

Enriches the implemented (placeholder) `reports.html` **in place** into a calm, fixture-only Academic Reports & Operations shell — report-category cards + a fixture-backed operations overview + per-area summary sections + honest demo actions + real drill-down links. **No new page, no `build-html.mjs`/`nav.config.js`/`dashboard.js` change.** Every number is a display-only roll-up of an existing fixture summary (matches the dashboard chips); **all finance removed** (the legacy `revenue` card is gone).

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Reports shell (overview + cards + all sections) · AR Light | `reports__ar__light__desktop.png` | ✅ PASS — header + honest action cluster + 8 operations-overview count tiles (teacher absences ١ and student absences ٣ as two distinct tiles) + 5 area-status report-signal chips + 7 filterable category cards (5 Available + Planned/Backend-required with honest reasons) + 5 per-area detail sections with reused chips + real source links. Reads as a calm operations shell, **not a BI dashboard** |
| 2 | Reports shell · AR Dark | `reports__ar__dark__desktop.png` | ✅ PASS — true-dark, AA contrast, medallion tiles + chips legible, cards/sections clean |
| 3 | Reports shell · EN LTR | `reports__en__light__desktop.png` | ✅ PASS — fully mirrored, Latin digits, "Available/Planned/Backend required" chips, distinct "Teacher absences"/"Student absences", all source links present |
| 4 | Schedule confirm-demo modal · AR Light | `reports__ar__light__desktop__action.png` | ✅ PASS — Schedule opens an honest confirm modal ("demo only — no backend job is created and nothing is sent") → demo toast; Export CSV/PDF/Share render disabled-with-reason |
| 5 | Category-card filter narrowed · AR Light | `reports__ar__light__desktop__filter.png` | ✅ PASS — area facet narrows the category cards with a live count + reset/no-results affordance |
| 6 | Mobile Reports shell · AR Light | `reports__ar__light__mobile.png` | ✅ PASS — action cluster wraps, overview tiles → 2 columns, category cards → single column, sections stack, no horizontal overflow |

**Failure conditions:** none triggered — not a generic BI dashboard / statistics wall / chart-heavy suite (no chart/canvas/graph/sparkline anywhere); no computed score/ranking/leaderboard/percentile/trend (every number is a fixture roll-up matching the dashboard chips); **no finance/salary/payroll/invoice/revenue/accounting card, figure, or widget** (the legacy `revenue` card removed); teacher-absent (amber) vs student-absent (red) two distinct labeled chips in the overview, the Attendance section, and the Teacher section; every available category card + per-area section links to a real implemented page (attendance/sessions/schedule#view=timetable/courses/groups/teacher-performance/teacher/students/families/student/family), planned/backendRequired cards are disabled-with-reason (never a dead `#`); honest actions (Print demo · Export/Share disabled-with-reason · Schedule confirm→demo — no real export/send/schedule/persistence); no copied legacy visuals/wording/numeric statuses; no raw i18n keys; strong dark mode; correct RTL/LTR; static HTML-first (baked overview tiles + category cards + sections + planned cards, no `#app`); relative paths; Django-mappable. Dashboard unchanged (its Reports section now shows the same honest cards with real links — no `revenue`, no dead `#`).

**Automated (accompanying):** build clean (38 pages, **69 icons / 0 missing** — 3 new action icons vendored, no missing i18n keys) · smoke PASS (38 loads + NEW Spec 008 reports asserts: **exactly 7** baked category cards [**exactly 5** available real `<a>` to the expected pages · **exactly 2** planned disabled-with-reason, not dead `#`] · **exactly 8** operations-overview tiles scoped to `#ops-overview` · all 9 source links present · teacher-absent ≠ student-absent two distinct chips · Print demo + ≥3 disabled-with-reason actions + Schedule confirm modal · no real export/download anchor · **no finance/chart/score/rank token in the page body (EN+AR)** · area filter narrows the cards · no `#app`/dead `#`) · axe **critical=0 / serious=0** (reports AR light + dark + EN) · 6 reports screenshots, **0 console errors** · scope-guard G8a grep audit clean (no finance token in reports src/locales; no chart/score/rank token in reports.js/report-*.js; no `#app`; no external http; no raw ⟦) · ar.rep/en.rep locale key mirror exact (79/79). No new dependencies.

**Post-review fixes (clean-code-guard + test-guard):** (1) the Students & Families category-card summary chip used `tone:'coral'`, which has no `.chip.tone-*` rule (valid chip tones are completed/amber/neutral/upcoming/live/cancelled) — it rendered as an unstyled pill; switched to `amber` (now a proper styled pill, consistent with the other follow-up chips). (2) Stripped the now-dead finance wording from the base `reportsPage` subtitle in `ar.js`/`en.js` (fully overridden by the `*.rep.js` overlay) and removed the orphaned legacy `report.studentPerf`/`report.attendanceMonthly` keys. (3) Removed two unused `rep.sec.*` keys (`attended`/`activeGroups`) keeping the AR/EN mirror exact. (4) Collapsed a dead sub-expression in `report-card.js`. (5) Tightened the smoke asserts: scoped the overview-tile count to `#ops-overview` and pinned exact counts (7 cards / 5 available / 2 planned / 8 tiles), added an expected-route check, and broadened the AR forbidden-token alternation for EN/AR parity. Re-ran build + smoke + a11y + screenshots — all green.

## Spec 009 — Finance, Billing & Payments Shell — 2026-07-02

Adds the academy's first admin **Finance, Billing & Payments shell** — ONE new page pair (`finance.html` + `finance.en.html`) + ONE born-and-promoted nav item `finance` («المالية», reports category, before the six locked wallet items, which stay locked with an updated truthful reason). Fixture-authored family invoices (9) + recent payments (6) with the two NEW labeled maps (invoice-status paid/unpaid/overdue/cancelled · payment-status recorded/pending/returned), count-only tiles-as-filters, a baked invoice drawer, honest demo/disabled actions, real source links, and nine figure-free planned/backendRequired payroll/accounting cards reusing the Spec 008 `reportCard` + availability chip. Zero runtime money arithmetic (amounts are authored literals; the only derived numbers are row counts); dashboard/reports page modules untouched and their bodies finance-free (the shared sidebar's single new finance item is the only built-file diff there).

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Finance shell (tiles + invoices + payments + planned cards) · AR Light | `finance__ar__light__desktop.png` | ✅ PASS — calm academy billing surface; active «المالية» pill + six locked wallet items; honest cluster (Create/CSV/PDF disabled, Print demo); 4 count tiles = row counts (٤/٢/٢/١), no money-total tile; 9 rows with labeled chips + LTR serials/amounts + course/group links; cancelled row's record-payment disabled; 9 figure-free planned cards + academic teacher-performance link |
| 2 | Finance shell · AR Dark | `finance__ar__dark__desktop.png` | ✅ PASS — all chips/tiles keep AA contrast on the dark surface; no unstyled chip |
| 3 | Finance shell · EN Light (LTR) | `finance__en__light__desktop.png` | ✅ PASS — full LTR mirror, English labels, SAR amounts, same structure/honesty |
| 4 | Invoice drawer (INV-2026-041) · AR Light | `finance__ar__light__desktop__drawer.png` | ✅ PASS — serial/family/students/course/group links, month + dates, amount + «عرض فقط — لا تُحتسب أي مبالغ فعلية», status chip, NO total line; Mark-paid + Send-reminder confirm, Send-invoice disabled, Print demo |
| 5 | Record-payment confirm modal · AR Light | `finance__ar__light__desktop__confirm.png` | ✅ PASS — honest demo copy («لا يتم حفظ أي دفعة ولا تتغيّر حالة الفاتورة»); background unchanged |
| 6 | Invoice list filtered by the overdue tile · AR Light | `finance__ar__light__desktop__filter.png` | ✅ PASS — only the two fam5 overdue rows remain, count «عرض ٢ من ٩», select shows «متأخرة» (verified after the `[hidden]` fix — see post-review fixes) |
| 7 | Finance shell · AR Light · Mobile 390×844 | `finance__ar__light__mobile.png` | ✅ PASS — single-column flow, tiles wrap, rows stack, no RTL overflow |

**Failure conditions:** none triggered — not generic accounting software; no fake revenue dashboard / giant money KPI / cashflow; no chart/canvas/graph; no payment-gateway or payroll impression (zero pay figures anywhere; payroll = labeled backendRequired cards only); no fake invoice generator (Create/Export/Send disabled-with-reason; Print demo; Record-payment/Mark-paid confirm→demo toast that changes nothing); **no receipt/upload UI anywhere** (the reference system had none); every family/student/course/group link resolves (zero `href="#"`); fixture coherence visible (fam5 = the two overdue invoices matching its Spec 004 «دفعة متأخرة» flag; trial fam3/inactive fam8 absent; the one cancelled invoice = fam7 with no payments); no copied legacy visuals/status-code leaks; no raw i18n keys; strong dark mode; correct RTL/LTR (all serials/amounts/dates LTR-wrapped); static HTML-first (all rows/tiles/drawers/cards baked, no `#app`); relative paths; Django-mappable per README. Dashboard + Reports bodies unchanged (smoke-asserted body-scoped: finance-token regex clean, wallet-icon/currency-token counts at their sanctioned values, exactly one sidebar finance link, six wallet items still locked).

**Automated (accompanying):** build clean (40 pages; nav guard + NEW finance fixture coherence guard silent) · smoke PASS (40 loads + NEW Spec 009 asserts: 4 tiles = per-status row counts [Arabic-Indic-aware] · 9 invoice + 6 payment rows baked · every invoice/payment status chip present (AR+EN copy) · ≥3 disabled-with-reason + Print demo in the cluster · cancelled-row record-payment disabled, never confirm · 9 drawer templates · confirm→toast mutates NO chip [before/after] · overdue tile narrows VISUALLY [computed display] · 9 figure-free planned cards with availability chips · zero `href="#"`/receipt/upload/`type="file"` tokens · dashboard/reports `#page-body` finance-token regex clean + structural wallet/currency counts + one sidebar finance link + six items locked) · axe **critical=0 / serious=0** (finance AR/EN × light/dark) · 7 finance screenshots, **0 console errors** · scope-guard G8a two-direction audit clean (finance tokens confined to the new finance files + 3 registration touch-points + the 1-line reason copy; Spec 008's own guard re-run green verbatim) · ar.fin/en.fin locale mirror exact (95/95). No new dependencies, no new `data-*` hook, no `enhance.js` change.

**Post-review fixes (clean-code-guard + test-guard + visual review):** (1) [MAJOR, caught by screenshot review] tiles-as-filters set the `[hidden]` attr but `.fin-row`'s display rule won the specificity tie, leaving filtered rows visually rendered — added `.fin-row[hidden]{display:none}` and a smoke assert on **computed** visibility; NOTE: the same latent defect pre-exists app-wide (verified on `attendance.html`: 10 rows attr-hidden, 15 visually shown) — left untouched there per Spec 009's no-academic-edits scope; flagged for a follow-up fix. (2) [MAJOR] the dashboard/reports EN finance-token smoke regex omitted `payment|salary` vs the contract's list — completed, + a structural wallet-icon/currency-token count guard so a token-free money widget also fails. (3) Comment-discipline sweep: reworded "ledger"/"chart"/"receipt/upload"/`FinanceSummary`("Sum") tokens out of new-file comments (the G8a audits scan comments). (4) "Coming soon"-hype copy on the monthlyInvoices planned card replaced with schedule-free wording (planned-finance-contract §4); AR «بوابات الدفع» aligned to EN "payment providers". (5) Dead-code pass: `unitKey` now consumed at all three amount render sites; `invoicesOfFamily()`/`paymentsOfInvoice()` wired as real consumers (family filter options + cancelled-invoice guard); payments header shows the `payments.total` count; shape-parity fields documented. (6) Contract text reconciled to the reused Spec 008 disabled-card modality (inline reason + tooltip, no click-toast). Re-ran build + smoke + a11y + screenshots — all green.

---

## Spec 010 — Full Academy Capability Coverage, Navigation IA & Admin Experience Polish — 2026-07-02

Brownfield audit + IA + polish pass over the implemented Spec 001–009 app — **no new page, no new source file, no new hook/library/fixture entity**. Delivered: a **legacy capability coverage matrix** (`legacy-capability-coverage.md`, 90 rows across the nine-way scheme, all 15 mandatory named capabilities + the 5 audit-found gaps, sign-off checklist) and a **20-page × 10-dimension page audit** (`page-coverage-audit.md`); **navigation IA corrections** (a labeled **finance sub-section** under the Reports category via the existing teachersPerf `sections` mechanism — Finance first + the six locked billing items + **`banks` moved out of Admin**; the Families category relabeled «العائلات والطلاب»/"Families & Students"; four stale `FUTURE_ROUTES` entries removed; the sessions badge derived from `SESSIONS.total` instead of a literal); the **app-wide `[data-row][hidden]{display:none !important}` filter-visibility fix** with per-page computed-visibility smoke proofs; **one** honest family→finance cross-page link; a **chip-tone build guard**; and a link-integrity + planned/backendRequired truthfulness sweep. Dashboard/reports/finance page **bodies unchanged** (sidebar-only ripple across all 40 rebuilt pages). Prior Spec 008/009 guards re-run green (Spec 009's amended additively with the one sanctioned family touch-point).

**Baseline (pre-change gate, T001):** build clean (40 pages) · smoke PASS (40 loads) · axe critical=0 serious=0 · Spec 008 reports-body + Spec 009 G8a (#1 no-leak, #2 no-engine, #3 no-money-arith) all `ok` · HEAD `7a2ee50`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | All six rail categories expanded (control/families/teachers/reports/admin/settings) · AR Light | `dashboard__ar__light__desktop.png` + `…__cat-families/teachers/reports/admin/settings.png` | ✅ PASS — six purposeful categories, none random/bloated; each panel shows only its own links |
| 2 | Reports category → **finance sub-section** · AR Light | `dashboard__ar__light__desktop__cat-reports.png` | ✅ PASS — Reports/Monthly reports/Data analysis on top, then a «المالية» sub-section: Finance (only real link) + الفواتير/الفواتير الشهرية/الرواتب/رواتب الموظفين/المدفوعات/تقرير رواتب الفصول/**البنوك**, all lock-iconed; reads as one calm story |
| 3 | Reports category / finance sub-section · AR **Dark** | `dashboard__ar__dark__desktop__finance-group__cat-reports.png` | ✅ PASS — grouping + lock icons keep AA contrast on the dark surface; no unstyled chip |
| 4 | Reports category / finance sub-section · **EN** Light (LTR) | `dashboard__en__light__desktop__finance-group__cat-reports.png` | ✅ PASS — "FINANCE" sub-section label, English item labels, correct LTR mirror; banks present, admin no longer holds it |
| 5 | Mobile sidebar drawer · AR | `dashboard__ar__light__mobile__drawer.png` | ✅ PASS — rail + panel usable at 390px; category switching intact |
| 6 | Family **Plan & Billing** tab (new finance link) · AR Light | `family__ar__light__desktop__plan-billing.png` | ✅ PASS — «عرض فواتير العائلة في صفحة المالية (معاينة تجريبية) ←» real link beside the disabled Manage-billing button + the "display only" note; sidebar category reads «العائلات والطلاب» |
| 7 | **Attendance filter-narrowing proof** · AR Light | `attendance__ar__light__desktop__filtered.png` | ✅ PASS — student-absent filter → count «عرض ٣ من ١٥» and **exactly 3 rows render, all «غياب الطالب»** (pre-fix: all 15 stayed visible). The app-wide `[hidden]` defect is genuinely fixed |
| 8 | Dashboard (body-unchanged proof) · AR Light | `dashboard__ar__light__desktop.png` | ✅ PASS — no new card/chip/stat/link; the Spec 001 revenue KPI (٤٨٬٢٠٠ ريال) untouched; only the sidebar around it changed |
| 9 | Finance shell (post-nav-polish, body unchanged) · AR Light | `finance__ar__light__desktop.png` | ✅ PASS — all Spec 009 invariants intact; benefits from the sidebar grouping + inbound family link |
| 10 | Topbar/crumb on a representative page | `family__ar__light__desktop__plan-billing.png` (crumb «الرئيسية · العائلات · ملف العائلة») + others | ✅ PASS — title/crumb correct in both languages on every audited page |
| 11 | Families people page | `families__ar__light__desktop.png` | ✅ PASS — relabeled category, content rich, filters narrow visibly |
| 12 | Course/group operations page | `course__ar__light__desktop.png` / `group__ar__light__desktop.png` | ✅ PASS — unchanged, reachable, filters visibly narrow |

**Failure conditions:** none triggered — sidebar is organized not random; the finance group is clear and banks is neither duplicated nor stranded (it lives once, in the finance sub-section); no copied legacy visuals/labels/status codes; labels premium and correctly localized (AR + EN); no duplicate nav items; no dead links (the one pre-existing dashboard Overview `a[href="#"]` is a Spec 001 approved-design artifact in the contract-frozen dashboard body — logged as an accepted follow-up, allowed by the link crawl, not introduced by Spec 010); no fake working planned link (all 20 planned items are non-navigating «قريبًا» buttons; all 7 locked finance items disabled-with-reason + lock icon); no raw i18n keys; correct RTL/LTR; strong dark mode; every implemented page reachable; no planned/backendRequired item looks working; the attendance filter visibly narrows; dashboard/reports/finance bodies unchanged (git-diff empty on their modules); Django-mappable per README.

**Automated (accompanying):** build clean (40 pages; nav guard + Spec 009 coherence guard + **NEW chip-tone guard** all silent) · smoke PASS (40 loads + **NEW Spec 010 asserts**: 6-rail-category geometry · finance sub-section label + 8 members in exact order + exactly one implemented link (finance) · banks in reports-not-admin + admin=5 items · the 7 locked finance items disabled+reason+lock · sessions badge = fixture count · families category relabel (AR+EN) · **per-page computed-visibility on all 11 filterable pages** [attendance/finance/sessions/students/teachers/courses/groups/families/teacher-performance/reports/schedule]: zero attribute-hidden-but-visible rows + filter engages · family body finance-link count == 1 · link-integrity crawl [no new `href="#"`, no external, no nonexistent-file target] · planned/disabled truthfulness sweep) · axe **critical=0 / serious=0** · **102 screenshots, 0 console errors** · Spec 010 G7 scope-guard (guarded modules untouched · zero new source files · 41 pages · no new dead link · family link present both langs · FUTURE_ROUTES cleaned · badge literal gone · one visibility rule) + Spec 008 reports-body + Spec 009 G8a (with the two attributed Spec 010 amendments) all `ok`.

**Issues found & fixed during implementation:** (1) the link-integrity crawl initially flagged 12 valid `./`-prefixed targets (normalized the relative prefix) and the one pre-existing dashboard `href="#"` (recognized as this app's enhance.js control-hook idiom in the frozen dashboard body → allowed exactly one on dashboard, fail any new one elsewhere; logged as accepted follow-up). (2) my own family.js code comment used the words "billing"/"invoices" and tripped Spec 009's comment-scanning G8a no-leak audit → reworded to token-free wording (the documented comment-discipline rule). Both caught by the audits before completion and re-verified green.

---

## Spec 011 — Admin Console Final QA Hotfix & Demo Readiness — 2026-07-02

Two-fix QA hotfix closing the accepted follow-ups Spec 010 (committed `0ee1965`) left in the then-frozen dashboard body — **no new page/file/hook/library/engine**. **Fix 1**: the dashboard Overview "view all metrics" / «عرض كل المؤشرات» link was a dead `href="#"` (the only one in built output — 1 per dashboard file); it now points to the reports hub, language-aware (`reports.html` / `reports.en.html`), via a one-value `linkHref` on the existing `sectionHeader` call — zero visual change. **Fix 2**: the sessions nav badge rendered raw Western digits on Arabic pages; it now goes through the existing build-time locale helper `num()` (`${num(it.badge)}` in `sidebar.js`) — Arabic shows ٢٤, English 24, both still `SESSIONS.total` (no config change, no per-language literal). The badge lives in the shared sidebar (outside `#page-body`); the dashboard `#page-body` diff is exactly one line (the Overview href), reports & finance `#page-body` byte-identical to HEAD.

**Baseline (pre-change gate, T001):** build clean (40 pages) · smoke PASS (40 loads) · axe critical=0 serious=0 · findings confirmed present (dashboard `href="#"` = 1 each; AR sessions badge = Western "24") · HEAD `0ee1965`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Dashboard after Overview fix · AR Light | `dashboard__ar__light__desktop.png` | ✅ PASS — Overview «عرض كل المؤشرات» link intact and intentional (now → reports.html), no dead `#`; sidebar sessions badge shows **٢٤** (Arabic-Indic, consistent with the "٢٤ جلسات اليوم" KPI); no other dashboard change |
| 2 | Dashboard after Overview fix · EN Light | `dashboard__en__light__desktop.png` | ✅ PASS — "View all metrics" link → reports.en.html; sidebar Sessions badge shows **24** (Western, did NOT become Arabic); body otherwise unchanged |
| 3 | Sidebar with localized sessions badge (٢٤) · AR | `dashboard__ar__light__desktop.png` (+ every AR frame) | ✅ PASS — Arabic-Indic ٢٤ on the Sessions item, equal to the fixture count |
| 4 | Sidebar with Western sessions badge (24) · EN | `dashboard__en__light__desktop.png` (+ every EN frame) | ✅ PASS — Western 24 on the Sessions item, same fixture count |
| 5 | Mobile sidebar quick check · AR | `dashboard__ar__light__mobile__drawer.png` | ✅ PASS — drawer + localized badge intact at 390px |

**Failure conditions:** none triggered — no `href="#"` remains anywhere; the Overview control is intentional and points to a real page (never a fake route); the Arabic badge is Arabic-Indic and the English badge stays Western; the badge equals `SESSIONS.total`; no dashboard visual regression (only the Overview href + the localized badge changed); reports body unchanged; finance body unchanged; no raw i18n keys; no dead/fake links; correct RTL/LTR; strong dark mode; mobile sidebar intact.

**Automated (accompanying):** build clean (40 pages; nav + finance coherence + chip-tone guards silent) · smoke PASS (40 loads; the sessions-badge assertion is now **locale-aware** — expects the Arabic-Indic form of `SESSIONS.total` on AR pages and Western on EN; the link-crawl `deadHash` assertion is tightened to **`=== 0` on every page**) · axe **critical=0 / serious=0** · **102 screenshots, 0 console errors** · Spec 011 scope-guard G3 (zero `href="#"` sitewide · AR Arabic-Indic / EN Western badge · badge still `SESSIONS.total`, no config literal · guarded bodies untouched · zero new source files · 41 pages) + Spec 008 reports-body + Spec 009 G8a (#1/#2/#3, with Spec 010 amendments) + Spec 010 chip-tone/G7 all `ok`. Dashboard `#page-body` diff = 1 line (Overview href); reports/finance `#page-body` byte-identical to HEAD; `reports.js`/`finance.js` + fixtures/components/`nav.config.js`/`i18n.js`/`enhance.js`/`package.json` all zero git diff.

**Resolves:** the Spec 010 accepted follow-up "dashboard Overview `href="#"`" (Spec 010 `page-coverage-audit.md` + scope-guard G7 #4 annotated "Resolved in Spec 011").

**Accepted follow-up (observed, out of Spec 011 scope):** the sibling dashboard **Reports** section header (`dashboard.js:111`) uses a non-language-aware `linkHref: 'reports.html'`, so on the English dashboard that "Reports center" link points at the Arabic reports page — a pre-existing latent cross-language link inconsistency (the file resolves and the link is not dead, so no crawl failure). Not the Overview link Spec 011 was scoped to; logged for a future dashboard-owning spec. (The new Overview link is language-aware and correct.)

**Issues found & fixed during implementation:** none blocking — both fixes landed clean; the only required maintenance was updating the two Spec 010 smoke assertions to the post-fix truth (locale-aware badge; zero-`href="#"`-everywhere), which are tightenings, not weakenings. clean-code-guard verdict: SAFE TO SHIP. test-guard verdict: TESTS SOLID.

---

## Spec 012 — Role Portal Foundation — 2026-07-02

Starts the ROLE-PORTAL layer as a foundation-only pass: a **shared warm portal shell** (`portal-shell.js` — rail-less sticky header: brand + role chip + persona greeting + existing theme/lang menus + labeled «تبديل الدور» hub link; root `.portal-shell[data-role]` drives accents), **four new page pairs** (49 built files): the demo hub `portals.html` (three role cards + one labeled admin-console return — the documented demo entry; admin console untouched) + `student-portal` (st1 ∈ fam1, sky) + `family-portal` (fam1 guardian, violet) + `teacher-portal` (sara, teal). Personas are existing fixtures; every number authored; planned cards use the labeled availability chips; each portal closes with its honest owning-spec note (013/014/015). The `legacy-role-capability-coverage.md` artifact classifies **all 39 legacy portal pages** (27 teacher + 17 family rows) under the seven-way scheme with itemized Spec 013/014/015 boundaries. Two sanctioned reconciliations only: `FUTURE_ROLE` reason wording (post-012 truth) + the smoke portal-absence assertion re-scoped to the 20 admin bases (kept verbatim there) with a new portal assertion block.

**Baseline (pre-change gate, T001):** build 40 pages · smoke PASS · axe 0/0 · Spec 008/009/010/011 audits all `ok` · HEAD `e7ee011`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Student portal · AR Light | `student-portal__ar__light__desktop.png` | ✅ PASS — warm sky hero «مرحبًا، سلمان الغامدي 🌟», today's-learning cards, next-session card with the honest demo note, my-courses cards with Arabic-Indic ٧٨٪/٤١٪, the ٧٨٪ progress gauge, achievements with «جديد» chip + "النظام القديم لم يكن يقدّم هذا!", 3 labeled planned cards, Spec-013 note; ZERO tables, ZERO admin chrome |
| 2 | Student portal · AR Dark | `student-portal__ar__dark__desktop.png` | ✅ PASS — premium dark surfaces, ink-strength accents hold contrast (axe-clean) |
| 3 | Student portal · EN Light | `student-portal__en__light__desktop.png` | ✅ PASS — LTR mirror, Western digits/percent, same structure |
| 4 | Student portal · AR Mobile 390px | `student-portal__ar__light__mobile.png` | ✅ PASS — perfect single-column reflow, no horizontal scroll, touch-comfortable |
| 5 | Family portal · AR Light | `family-portal__ar__light__desktop.png` | ✅ PASS — calm guardian welcome «أبو سلمان الغامدي 🌿», ALL FIVE fam1 children as friendly cards with labeled status chips + progress, honest multi-child hint (switching arrives in Spec 014), today's sessions, the 3-tile attendance preview, teacher-note cards, planned cards (billing = «يتطلب الخادم» lock chip, ZERO amounts), Spec-014 note |
| 6 | Family portal · EN Light | `family-portal__en__light__desktop.png` | ✅ PASS — LTR mirror clean |
| 7 | Family portal · AR Mobile | `family-portal__ar__light__mobile.png` | ✅ PASS — single-column, children stack cleanly |
| 8 | Teacher portal · AR Light | `teacher-portal__ar__light__desktop.png` | ✅ PASS — teal today-first layout: جدول اليوم (٢), next-session with «الانضمام المباشر يتطلب ربط نظام الجلسات الفعلي», my-students cards, the 4-step outcome-flow preview (١ الحضور · ٢ التقييم · ٣ الملخص · ٤ الملاحظات), labeled admin performance link, 2 planned cards, Spec-015 note — **zero pay figures/vocabulary** |
| 9 | Teacher portal · EN Light | `teacher-portal__en__light__desktop.png` | ✅ PASS — LTR mirror, pay-free (grep-verified) |
| 10 | Teacher portal · AR Mobile | `teacher-portal__ar__light__mobile.png` | ✅ PASS — single-column daily flow |
| 11 | Demo hub · AR Light | `portals__ar__light__desktop.png` | ✅ PASS — «تجربة البوابات» with three role-accented cards (persona named on each), one labeled «لوحة تحكم الأكاديمية» return card, honest no-login note; itself on the portal shell |
| 12 | Admin dashboard unchanged-proof · AR Light | `dashboard__ar__light__desktop.png` | ✅ PASS — pixel-equivalent to the pre-012 frame (all 40 admin files are byte-identical to HEAD by hash-compare); zero portal links anywhere |

**Failure conditions:** none triggered — no portal looks like an admin copy (rail-less header shell, different density/tone) nor a legacy clone (card-based vs legacy's KPI+table homes); the student portal has zero tables and reads bright-not-childish; the family portal is calm and child-centered; the teacher portal contains **no salary/pay/earnings figure or vocabulary in either language** (the legacy teacher home's salary hero is deliberately absent — classified backendRequired); no fake join/chat/payment (the next-session affordances are honest demo notes); admin sidebar/body gained nothing; zero `href="#"`; zero dead links; zero raw keys; RTL/LTR correct; dark premium; mobile clean; reports/finance untouched.

**Automated (accompanying):** build clean (48 pages + index; nav + coherence + chip-tone guards silent) · smoke PASS (48 loads: all admin asserts unchanged incl. the admin-scoped portal-absence check + the NEW Spec 012 portal block — portal shell + role attr · admin markup absent · switch link present · hub = 3 role cards + 1 admin link · planned-card counts/labels (3/3/2) with availability chips, never anchors · teacher pay-token regex (word-bounded EN + AR) · AR counters Arabic-Indic · student portal zero tables) · axe **critical=0 serious=0** (incl. 10 portal scenarios; 3 initial contrast issues fixed via ink-strength accent tokens) · **113 screenshots, 0 console errors** (+11 recaptured after polish) · Spec 012 G5 scope-guard audit all `ok` (40-admin-file hash identity · pay tokens · admin isolation · 49 pages · zero `href="#"` · no admin markup in portals · guarded diffs) · Spec 008 + 009 (G8a amended) + 010 + 011 guards re-run `ok`.

**Issues found & fixed during implementation:** (1) [a11y] 3 serious color-contrast violations on light theme — the raw sky/teal accent hues were too light for small bold text; fixed by introducing `--pt-accent-ink` (mapped to the existing `--c-sky-ink`/`--c-teal-ink` tokens) for all text-bearing portal rules → axe 0/0. (2) [honesty, caught in visual review] the family children hint said "اضغط على أي ابن للتبديل" while the cards are non-interactive — reworded to the honest foundation form ("switching arrives with Spec 014"). (3) [audit precision] the pay-token grep matched "l**earning**" — word-bounded the regex in the scope-guard audit + smoke (and repaired two lines corrupted by an over-eager regex replace during that fix). (4) [visual polish] planned-card dashed borders rendered too heavy for the soft direction — lightened. (5) The universal smoke `focusables > 5` threshold was scoped to `> 3` for portal pages (deliberately action-light foundations); the admin threshold is unchanged.

---

## Spec 013 — Student Dashboard — 2026-07-03

Deepens the Spec-012 student foundation (`student-portal(.en).html`, persona **st1**) into the full one-page **student learning home** — 13 sections, today-first, card-based, ZERO tables, warm/premium/mobile-first. Delivers the three student `planned-013` capabilities (F5 week timetable · F6 class-history feedback · F12 materials) plus the deep today/progress/achievements experience and the celebration recognition (the honest leaderboard resolution). Every number is an authored/fixture literal; every action is one of the four honest classes; the page body contributes **zero anchors** (only the shell's skip + hub-switch links). Only the student pair changed — **47/49 built files byte-identical to HEAD**.

**Baseline (pre-change gate, T001):** build 49 · smoke PASS · axe 0/0 · Spec 008–012 audits `ok` · HEAD `055994c`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Student dashboard · AR Light desktop (full) | `student-portal__ar__light__desktop.png` | ✅ PASS — 13 sections in the today→me ramp: sky hero «مرحبًا، سلمان الغامدي 🌟» + next-action hint · today's-learning with «جارية الآن» chips · honest next-session note · the SAT/الإثنين/الثلاثاء week agenda closing on the «يوم راحة 🌤» Friday empty state · course cards with ٧٨٪/٤١٪ + next-step lines · homework/materials with «يتطلب الخادم» dashed gates · ٧٨٪ gauge + trio (٩/٢/٥) · achievements «جديد» · «نجوم مجموعتي» celebration with «احتفاء» label · F6 feedback (real out1 «حضور مكتمل» + «مرفق») + «السجل الكامل» planned · profile · honest closing note. Arabic-Indic digits throughout; zero tables; unmistakably NOT admin |
| 2 | Student dashboard · AR Dark desktop | `student-portal__ar__dark__desktop.png` | ✅ PASS — premium dark surfaces; sky progress bars, amber backendRequired chips, celebration tint, and status chips all hold contrast (axe-clean) |
| 3 | Student dashboard · EN Light desktop | `student-portal__en__light__desktop.png` | ✅ PASS — LTR mirror, Western digits/percent, same 13-section structure |
| 4 | Student dashboard · AR Mobile 390px | `student-portal__ar__light__mobile.png` | ✅ PASS — perfect single-column reflow, no horizontal scroll (smoke probe scrollWidth ≤ 391), touch-comfortable |
| 5 | Next-session area | `…__area-next.png` | ✅ PASS — rich card + the honest backendRequired join note; no live-looking button |
| 6 | Week area | `…__area-week.png` | ✅ PASS — stacked SAT-first day groups + the Friday rest-day empty state; no grid clone |
| 7 | Homework area | `…__area-homework.png` | ✅ PASS — 3 display-only cards (due/state tags) + «تسليم الواجبات» backendRequired mini-card; no submit control |
| 8 | Materials area | `…__area-materials.png` | ✅ PASS — 3 display-only cards (type icons) + «تحميل الملفات» backendRequired mini-card; no download control |
| 9 | Progress area | `…__area-progress.png` | ✅ PASS — overall gauge ٧٨٪ + attendance trio; authored, no KPI wall |
| 10 | Celebration area | `…__area-celebration.png` | ✅ PASS — 3 unordered group-win cards, «احتفاء»-labeled; no ranks/points/peer comparison |
| 11 | History/feedback area | `…__area-history.png` | ✅ PASS — F6 cards (real out1 + 2 authored, summary + homework-note lines, «مرفق» annotation) + «السجل الكامل» planned |
| 12 | Portal hub unchanged-proof | `portals__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 13 | Family portal unchanged-proof | `family-portal__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 14 | Teacher portal unchanged-proof | `teacher-portal__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD, pay-free |
| 15 | Admin dashboard unchanged-proof | `dashboard__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD (all 40 admin files hash-identical) |

**Failure conditions:** none triggered — not admin-like (rail-less warm shell, card language), not a legacy clone (cards vs the legacy 10-col today table / 8-col grid; designed empty states the legacy never had), zero tables, bright-not-childish, no fake live join / upload / submit / download / chat / ranking (all backend-gated or display-only), stress-free celebration (unordered, no ranking), zero raw keys, zero `href="#"`, zero dead links, correct RTL/LTR, clean mobile, good dark contrast, no admin/family/teacher/reports/finance change, no new backend/library.

**Automated (accompanying):** build clean (49) · smoke PASS (48 loads; student branch amended: ≥2 gauge counters, ≥10 sections, ≥1 `.pt-empty`, zero body anchors, ≥2 backendRequired gates, planned count 3 with new semantics, zero tables, 390px overflow probe; **admin/family/teacher/hub asserts byte-verbatim**) · axe **critical=0 serious=0** (student AR/EN × light/dark incl. the deepened sections) · **11 student frames, 0 console errors** (4 experience + 7 element-scoped area close-ups) · byte-identity: exactly `student-portal.html` + `.en.html` changed, 47/49 identical · Spec 008–012 guards re-run `ok` (incl. teacher pay-grep + admin 40-file identity).

---

## Spec 014 — Family / Guardian Dashboard — 2026-07-03

Deepens the Spec-012 family foundation (`family-portal(.en).html`, persona **fam1** — guardian + 5 children) into the full one-page **guardian control center** — 12 sections, calm/child-centered/parent-friendly, ZERO tables, ZERO form controls, ZERO body anchors, and the **zero-pay hard line** (no currency/amount/pay token anywhere; the fixture's `hourRate`/`plan.perHour` display-suppressed). Delivers the guardian capabilities F1–F16 (previews with gated submits) with real per-child signals grounded in real outcome rows (out15 st11 absence · out12 st13 trial-cancel). Only the family pair changed — **47/49 built files byte-identical to HEAD**.

**Baseline (pre-change gate, T001):** build 49 · smoke PASS · axe 0/0 · Spec 008–013 audits `ok` · HEAD `86729a9`.

| # | Scenario | File | Verdict |
|---|----------|------|---------|
| 1 | Family dashboard · AR Light desktop (full) | `family-portal__ar__light__desktop.png` | ✅ PASS — 12 sections: violet guardian hero «مرحبًا، أبو سلمان الغامدي 🌿» + family summary + next-action hint · ALL FIVE children with status chips + progress bars (٧٨/٤١/٣٣/٢٨/١٥٪) + per-child hints · child-associated today sessions «لـ …» · the trio (١٢/٣/١) + TWO real attention cards (وليد «غياب واحد — متابعة لطيفة مع سارة» + absence chip · دانة trial-cancel) + reassurance · 3 teacher notes · child-first history (real «حضور مكتمل» + «غياب الطالب» + «مرفق») + planned full-history · subscriptions «الخطة المتقدمة» + status chips (ZERO amounts) · «جميع الفواتير مسوّاة» billing status (ZERO figures) + backendRequired gate · the requests hub (cancel + no-replacement caution · rubric question-lines · trial tiles · truthful meetings empty state) all «يتطلب الخادم» · materials + download gate · account slice. Calm, not admin-like, zero tables |
| 2 | Family dashboard · AR Dark desktop | `family-portal__ar__dark__desktop.png` | ✅ PASS — premium dark surfaces; violet accents, status/outcome chips, amber gates hold contrast (axe-clean) |
| 3 | Family dashboard · EN Light desktop | `family-portal__en__light__desktop.png` | ✅ PASS — LTR mirror, same 12-section structure, zero currency tokens |
| 4 | Family dashboard · AR Mobile 390px | `family-portal__ar__light__mobile.png` | ✅ PASS — clean single-column reflow, five children + hub cards stack, no horizontal scroll (smoke probe scrollWidth ≤ 391) |
| 5 | Children overview area | `…__area-children.png` | ✅ PASS — five child cards, gentle progress + per-child hints, no switcher |
| 6 | Today sessions area | `…__area-today.png` | ✅ PASS — each card names its child; status chips; no join/cancel control |
| 7 | Progress/signals area | `…__area-signals.png` | ✅ PASS — trio + two REAL outcome attention cards + reassurance; gentle, no KPI wall |
| 8 | Teacher notes area | `…__area-notes.png` | ✅ PASS — 3 child-associated notes, summary/homework shape |
| 9 | History area | `…__area-history.png` | ✅ PASS — real out1 + out15 child-first records + authored + planned full-history |
| 10 | Subscriptions area | `…__area-subscriptions.png` | ✅ PASS — plan label + 5 status rows, ZERO amounts |
| 11 | Billing area | `…__area-billing.png` | ✅ PASS — settled-status card + backendRequired gate, ZERO figures, no pay-now |
| 12 | Requests hub area | `…__area-requests.png` | ✅ PASS — four honest preview cards, the no-replacement caution, rubric question-lines, trial tiles, truthful meetings empty state; every submit «يتطلب الخادم»; ZERO form controls |
| 13 | Materials area | `…__area-materials.png` | ✅ PASS — 3 display-only cards + download backendRequired gate |
| 14 | Student portal unchanged-proof | `student-portal__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 15 | Teacher portal unchanged-proof | `teacher-portal__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD, pay-free |
| 16 | Portal hub unchanged-proof | `portals__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 17 | Admin dashboard unchanged-proof | `dashboard__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD (all 40 admin files hash-identical) |

**Failure conditions:** none triggered — not admin-like (warm rail-less shell, card language), not a legacy clone (cards vs the legacy 10-col today / 8-col billing tables; designed empty states the legacy never had), zero tables, **no confusing child switcher** (everyone-inline), **no fake payment** (status only, zero figures, no pay-now), no fake cancel/reschedule/upload/voice/feedback submit (all backend-gated previews, zero form controls), zero raw keys, zero `href="#"`, zero dead links, correct RTL/LTR, clean mobile, good dark contrast, no student/teacher/admin change, no reports/finance regression, no new backend/library, **no currency/pay figure anywhere**.

**Automated (accompanying):** build clean (49) · smoke PASS (48 loads; family branch amended: 5 progress bars = 5 children, ≥10 sections, ≥1 `.pt-empty`, zero body anchors, **zero form controls**, planned 2 amber + 2 neutral, **zero-pay regex 0 hits**, tables 0, 390px probe; **student/admin/teacher/hub asserts byte-verbatim**) · axe **critical=0 serious=0** (family AR/EN × light/dark) · **13 family frames, 0 console errors** (4 experience + 9 element-scoped area close-ups) · byte-identity: exactly `family-portal.html` + `.en.html` changed, 47/49 identical · Spec 008–013 guards re-run `ok` (incl. teacher pay-grep + admin 40-file identity + the Spec-013 student smoke branch unchanged).

## Spec 015 — Teacher Dashboard — 2026-07-03

**Baseline (T001):** HEAD `0d144aa` (Spec 014, watcher-committed) · branch `feature/012-role-portal-foundation` · working tree carries only the Spec-015 planning artifacts · rebuild deterministic (49 pages, **0** built files differ from HEAD) · smoke PASS (48 loads) · axe **critical=0 serious=0** (incl. teacher-portal ar/light, ar/dark, en/light) · Spec 008–014 guard asserts all green inside the smoke run. Frames + verdicts recorded below after implementation (T022/T023).

**Delivered (T022/T023):** the 14-section cockpit reviewed frame-by-frame against `contracts/screenshot-acceptance.md` §2.

| # | Frame | File | Verdict |
|---|---|---|---|
| 1 | Teacher dashboard · AR Light desktop (full) | `teacher-portal__ar__light__desktop.png` | ✅ PASS — organized daily cockpit, all 14 sections in D1+A1 order; card language, zero tables, zero admin chrome; ZERO pay vocabulary/figures |
| 2 | Teacher dashboard · AR Dark desktop (NEW frame) | `teacher-portal__ar__dark__desktop.png` | ✅ PASS — premium dark surfaces; teal accents, status/outcome chips, amber gates hold contrast (axe-clean) |
| 3 | Teacher dashboard · EN Light desktop | `teacher-portal__en__light__desktop.png` | ✅ PASS — LTR mirror, same 14-section structure, zero pay/currency tokens |
| 4 | Teacher dashboard · AR Mobile 390px | `teacher-portal__ar__light__mobile.png` | ✅ PASS — clean single-column reflow; steps/day-groups/gates stack; no horizontal scroll (smoke probe scrollWidth ≤ 391) |
| 5 | Today schedule area | `…__area-today.png` | ✅ PASS — 2 session cards, labeled live chips, authored «١٨ من ٢٠ طالبًا» counts; no join control |
| 6 | Next class area | `…__area-next.png` | ✅ PASS — rich card + group tag + prepare hint + the honest backendRequired live note (never join-styled) |
| 7 | Follow-up board area | `…__area-followup.png` | ✅ PASS — the two REAL outcome cards (out15 st11 absence + support note · out4 st7 make-up) with real chips + reassurance; no risk numbers |
| 8 | My students area | `…__area-students.png` | ✅ PASS — 4 grp1 roster cards, lifecycle chips, worded notes; zero links/percentages |
| 9 | Outcome workflow area | `…__area-workflow.png` | ✅ PASS — the 5 capture-verified steps display-only + the A2 mark-absent gated note + the «حفظ نتيجة الجلسة» gate; ZERO form controls |
| 10 | Recent sessions area (A1) | `…__area-history.png` | ✅ PASS — 2 REAL outcome records (out1 · out11) w/ chips + feedback + homework lines; no route/modal |
| 11 | Tasks area | `…__area-tasks.png` | ✅ PASS — 3 authored prep cards + due tags + the planned task-management gate |
| 12 | Materials area | `…__area-materials.png` | ✅ PASS — 3 display-only cards + the upload/download backendRequired gate |
| 13 | Timetable/availability area | `…__area-timetable.png` | ✅ PASS — SAT/MON/TUE day-grouped agenda + the TRUTHFUL free-days empty state + the availability-edit gate; never a grid |
| 14 | Monthly rubric area | `…__area-rubric.png` | ✅ PASS — 5 display-only dimension lines + inline gate; NO answer scales / rating visual / score vocabulary |
| 15 | Requests & performance area | `…__area-requests.png` | ✅ PASS — certificate preview + inline gate + the A2 cancel/reschedule gated note + the ONE sanctioned labeled performance link |
| 16 | Account area | `…__area-account.png` | ✅ PASS — name/subject rows + labeled status/availability chips + backendRequired edit note; rating/util NEVER rendered |
| 17 | Student portal unchanged-proof | `student-portal__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 18 | Family portal unchanged-proof | `family-portal__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 19 | Portal hub unchanged-proof | `portals__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD |
| 20 | Admin dashboard unchanged-proof | `dashboard__ar__light__desktop.png` | ✅ PASS — byte-identical to HEAD (all 40 admin files hash-identical) |

**Failure conditions:** none triggered — not admin-like (warm rail-less shell, card language), not a legacy clone (cards vs the legacy pay-hero home / hour-grid timetable / 13-col ledgers; the fake live room never cloned), zero tables, **no pay vocabulary or money/currency figure anywhere** (three-layer enforced), no fake live-join/end-class/attendance-save/upload/download/chat/certificate/profile-save (every write a labeled gate; zero form controls), no computed score/rating (sara's numerics suppressed), zero raw keys, zero `href="#"`, zero dead links, correct RTL/LTR, clean mobile, good dark contrast, no student/family/admin change, no reports/finance regression, no new backend/library.

**Automated (accompanying):** build clean (49) · smoke PASS (48 loads; teacher branch amended: ≥10 sections, ≥1 `.pt-empty`, **bodyAnchors === 1 pinned to `teacher-performance(.en).html`**, zero form controls, planned 3 amber + 1 neutral, avatar floor ≥6, the Spec-012 payHit assert BYTE-VERBATIM and green, tables 0, 390px probe; **student/family/admin/hub asserts byte-verbatim**) · axe **critical=0 serious=0** (teacher AR light/dark + EN light) · **16 teacher frames + 4 refreshed proofs, 0 console errors** · byte-identity: exactly `teacher-portal.html` + `.en.html` changed among the 49, 47/49 identical · Spec 008–014 guards re-run `ok`.

## Spec 017 — Role Dashboard Shell + Navigation — 2026-07-03

**Baseline (T001):** HEAD `2b8bb84` (Spec 016 law, committed) · tree clean · rebuild deterministic (49 pages, 0 diffs) · smoke PASS (48 loads) · axe critical=0 serious=0 · prior 008–016 guards green. **Planned freeze amendments** (research D4/D5, recorded up front): **A1** — the role mobile nav is a NATIVE `details.pt-nav-drawer` disclosure (the frozen enhance.js clone-drawer targets the admin `#shell > .sidebar` only); **A2** — no desktop sidebar collapse in 017 (collapse would need hooks/storage that are frozen). Frames + verdicts recorded below after implementation (T020).

**Delivered (T018/T020):** Shell v2 reviewed frame-by-frame; **freeze amendments A1 (native disclosure) + A2 (no collapse) applied as recorded** — reasons verified in source (`enhance.js openDrawer()` targets `#shell > .sidebar` only; collapse would need frozen hooks/storage).

| # | Frame | Verdict |
|---|---|---|
| 1 | Student · AR light desktop | ✅ PASS — real dashboard frame: sky sidebar (identity block · 7 items · home active pill · 6 «قريبًا» planned buttons · hub exit); all 13 home sections intact; not admin-like |
| 2 | Family · AR light desktop | ✅ PASS — violet sidebar, 8 items (الفواتير = status register), 12 sections intact |
| 3 | Teacher · AR light desktop | ✅ PASS — teal cockpit sidebar, 7 items, 14 sections intact, the ONE body anchor unchanged |
| 4 | Teacher · AR dark desktop | ✅ PASS — sidebar/drawer dark-safe, pills legible (axe-clean) |
| 5 | Student/Family/Teacher · EN light | ✅ PASS — LTR mirror, mirrored labels, same counts/active/planned |
| 6 | Teacher · AR mobile (closed) | ✅ PASS — «القائمة» disclosure under the topbar, zero overflow |
| 7 | Teacher · AR mobile **drawer-OPEN** (NEW) | ✅ PASS — native details panel lists all 7 items + hub exit; opens/closes natively; A1 proven |
| 8 | Portals hub | ✅ PASS — NO sidebar (entry chooser); refreshed dashboard-register copy; inventory asserts unchanged |
| 9 | Admin dashboard proof | ✅ PASS — byte-identical (41/49 identity) |

**Failure sweep:** none — no admin markup in role pages, no bottom tabs, no fake affordances (planned = labeled buttons + existing toast), zero `href="#"`, zero pay vocabulary (extended set, three layers), RTL/LTR/dark/mobile clean, home `#page-body` regions BYTE-EQUAL to HEAD (all six files), hub-only entry preserved.

**Automated:** build clean (49) · smoke PASS (48 loads; Shell-v2 asserts: sidenav on exactly 3 pages, counts 7/8/7 both instances, active home ×2/page, planned-as-buttons, drawer summary, shell-anchor set {self,hub} multiset 5; **every pre-017 assert byte-verbatim incl. payHit**) · axe 0/0 · 43 portal frames + admin proofs, 0 console errors · 41/49 hash-identical · G2 diffs (enhance/build-html/nav.config/package.json) = 0 lines.

## Spec 018 — Role Dashboards Admin-Like UX Rework — 2026-07-04

**The corrective verdict (the user's binding complaint):** the three role HOMES were too long / portal-like ("even the developer got lost"). Spec 018 reworks them into COMPACT admin-like dashboards (the 7-band recipe: compact header · 4-KPI row · now band · role-core · preview · quick-links · one-line note) inside the UNTOUCHED Shell v2, and adds the mandatory guardian→child drill-down page `family-child(.en).html`. **Visual grounding gate** (23 legacy/reference frames) recorded in `specs/018-.../visual-grounding-addendum.md` — zero decisions changed; three strengthened.

**Baseline (T001):** HEAD `0edafe1` (Spec 017 committed) · tree clean (only sanctioned dirty files) · rebuild deterministic (49 pages, 0 diffs) · smoke PASS (48 loads) · axe 0/0.

### Before → after height (scrollHeight @ 1366×768, the endless-page cure)

| Home | Before (AR / EN) | After (AR / EN) | Sections | KPIs | Verdict |
|---|---|---|---|---|---|
| Student | 3597 / 3638 px | **1428 / 1467 px** | 11 → 5 | 4 | ✅ ~2 screens; inside [900, 2200] |
| Family  | 4202 / 4348 px | **1753 / 1771 px** | 10 → 5 | 4 | ✅ ~2 screens; inside [900, 2200] |
| Teacher | 4390 / 4449 px | **1486 / 1486 px** | 12 → 5 | 4 | ✅ ~2 screens; inside [900, 2200] |
| family-child (new) | — | **1162 / 1162 px** | drill-down | — | ✅ one child panel + switcher |

The ceiling was NOT retuned — every home landed well inside the D1 window [900, 2200] on the first build (no ±10% adjustment needed). The ceiling is now a smoke probe, so a future long-page regression fails the build.

### Screenshot review (element-scoped close-ups + full-page + family-child flow)

| # | Frame | Verdict |
|---|---|---|
| 1 | Student · AR light desktop (full) | ✅ PASS — compact: header → 4 KPIs → today+next → homework snapshot → week+history preview → quick-link tiles → note; admin-like rhythm, sky accent; no endless scroll |
| 2 | Student · AR dark / EN / AR mobile | ✅ PASS — dark-safe, LTR mirror, 2×2 KPI on mobile, zero 390px overflow |
| 3 | Family · AR light desktop (full) | ✅ PASS — 4 KPIs · today+next · **five child cards each with a real «فتح ملف الابن» link** · billing STATUS chip (zero figures) + gates · quick tiles; violet accent |
| 4 | Family · AR dark / EN / AR mobile | ✅ PASS — dark/LTR/mobile clean |
| 5 | Teacher · AR light + AR dark desktop | ✅ PASS — 4 KPIs (حصص اليوم/متابعات/مهام مفتوحة/طلابي) · today+next · follow-up board · recording-flow + performance-link preview · quick tiles; teal accent; ZERO pay vocabulary |
| 6 | Teacher · EN / AR mobile / drawer-open | ✅ PASS — LTR mirror, mobile clean, native nav disclosure (A1) intact |
| 7 | **family-child · AR light desktop (default st1)** | ✅ PASS — child header · course/group/teacher · today · attendance trio + progress · latest note · homework/materials · history+profile gates; zero forms, zero money |
| 8 | **family-child · switched child (#child=st11)** | ✅ PASS — deep-link selects st11's panel (pure-CSS :target); the switcher pill highlights |
| 9 | family-child · AR dark / EN / AR mobile | ✅ PASS — dark/LTR/mobile clean |
| 10 | Admin dashboard proof | ✅ PASS — byte-identical (43/51 identity; 40 admin + index + hub pair unchanged) |

**Failure sweep:** none — no endless page (hard ceiling smoke-pinned), no admin chrome in role pages, no fake actions (quick-links are honest «قريبًا» tiles, gates are labeled availability chips, zero form controls), **zero pay vocabulary/currency in the teacher family (three layers)**, family + family-child bodies carry zero currency/amount figures, zero `href="#"`, zero dead links, zero raw keys, RTL/LTR/dark/mobile clean, displaced capabilities RETAINED for Specs 019–021.

**Automated:** build clean (51) · smoke PASS (50 loads; compact branches: sections 4–7, KPI===4, ceiling [900,2200], family bodyAnchors===5 exact child links, family-child 5 panels + default st1 + 5 #child= switcher links; **payHit + family zero-pay BYTE-VERBATIM; all Shell-v2/hub/admin asserts unchanged**) · axe **critical=0 serious=0** (3 compact homes ar/dark + en + family-child default/dark/en/switched) · 43/51 hash-identical · frozen-file diffs (enhance.js/nav.config.js/package.json/portal-shell.js) = 0 lines · build-html.mjs diff = exactly 2 registration lines.

## Spec 019 — Student Internal Pages — 2026-07-04

**Goal:** turn the six student planned nav entries into real COMPACT admin-like pages inside the untouched Shell v2, completing the Student Dashboard App. Visual grounding gate COMPLETE (`specs/019-…/visual-grounding.md`, 7 areas; no legacy student role — guardian surfaces + teacher-side records; the 3 profile gates fixed by the legacy profile-edit frame).

**Baseline (T001):** HEAD `fe47f68` · tree clean · rebuild deterministic (51 files) · smoke 50 loads PASS · axe 0/0.

### Heights (scrollHeight @1366×768, AR — the endless page can never return; window [500, 2200])

| Page | Height | Sections/content | Verdict |
|---|---|---|---|
| student-portal (home, refreshed) | 1426 px | 5 bands; quick-tiles now 6 REAL links | ✅ compact; honesty fix live |
| student-schedule | 1434 px | today+next · day-grouped week · live gate | ✅ inside [500,2200] |
| student-homework | 1126 px | KPI trio · pending/in-progress/reviewed · submit gate | ✅ |
| student-materials | 790 px | per-course groups · download gate; no hero | ✅ |
| student-progress | 1222 px | KPI · course bars · attendance · achievements+celebration · signals | ✅ |
| student-history | 920 px | out1 first · F6 records · display-only period chips | ✅ |
| student-profile | 1422 px | identity · academic · guardian · prefs · 3 gates | ✅ |

### Screenshot review (30 frames, 0 console errors)

| # | Frame | Verdict |
|---|---|---|
| 1 | Schedule · AR desktop | ✅ today+next cards, day-grouped week (SAT/MON/TUE real, SUN/WED/THU truthful «يوم راحة» rest days), labeled status chips, ONE live gate, zero tables; sky sidebar, «جدولي» active |
| 2 | Homework · AR desktop | ✅ KPI trio, pending/in-progress/reviewed sections, due+state chips, teacher-note lines on reviewed, submit gate |
| 3 | Materials · AR desktop | ✅ per-course groups (math/programming), type chips, download gate; NO marketing hero |
| 4 | Progress · AR desktop + dark | ✅ KPI band, `.pt-bar` course bars (78/41), attendance trio, re-homed achievements+celebration (unordered), teacher signals; zero charts/rank; dark-safe |
| 5 | History · AR desktop | ✅ out1 real outcome first, F6 records (summary + homework note), display-only period chips, no dead filters |
| 6 | Profile · AR desktop | ✅ identity + academic + guardian + preference chips + EXACTLY 3 backendRequired gates (photo/save/password); zero forms |
| 7 | All six · AR mobile (390) | ✅ single-column stacks, zero horizontal overflow |
| 8 | Schedule · EN desktop | ✅ LTR mirror, sidebar left, clean English, «Schedule» active |
| 9 | Student home · refresh (tiles-now-links) | ✅ the quick-links band is six REAL `<a>` links (no «قريبًا» over a live page); home still compact (1426px) |
| 10 | Family / teacher / family-child / admin | ✅ unchanged (49/63 hash-identical — proof, not re-shot) |

**Failure sweep:** none — no long-page regression (ceiling smoke-pinned [500,2200] on internals, [900,2200] on homes), no admin chrome, no marketing hero, no charts/rank, no fake actions (every write a labeled `يتطلب الخادم`/backendRequired gate; internal-page bodies zero anchors; zero forms), zero `href="#"`/dead links/dead filters/raw keys, RTL/LTR/dark/mobile clean, teacher pay-free + family zero-pay held.

**Automated:** build clean (63) · smoke PASS (62 loads; new student-internal branch — role/active===2×self/navListAnchors===7/shell multiset===17/bodyAnchors===0/forms===0/tables===0/ceiling[500,2200]/profile 3 gates; home re-scope bodyAnchors===6 exact siblings; **payHit + family zero-pay + family/teacher/hub/family-child/admin asserts BYTE-VERBATIM**) · axe **critical=0 serious=0** (6 pages AR light/dark + EN sample + home refresh) · **49/63 hash-identical** · frozen-file diffs (portal-shell/enhance/nav.config/package.json/family/teacher modules) = 0 · build-html.mjs diff = 6 imports + 6 entries + 1 amended line.

## Spec 020 — Family / Guardian Internal Pages — 2026-07-05

**Goal:** turn the seven family planned nav entries into real COMPACT admin-like pages inside the untouched Shell v2, preserving `family-child` as the drill-down and keeping billing STATUS-FIRST under the zero-pay hard line. **Visual grounding: 100%** (`specs/020-…/visual-grounding.md`: 27/27 family frames incl. every interaction shot; the Amount column deliberately dropped; trial step-2 stays gated — the recorded legacy gap).

**Baseline (T001):** HEAD `8d3d561` · tree clean · rebuild deterministic (63 files) · smoke 62 loads PASS · axe 0/0 · family-child `#page-body` baseline hashes captured (AR `c1608c6e…` / EN `58c71d31…`).

### Heights (scrollHeight @1366×768, AR — window [500, 2200]; home [900, 2200])

| Page | Height | Content | Verdict |
|---|---|---|---|
| family-portal (home, refreshed) | 1749 px | 5 bands; tiles now 7 REAL links + the 5 child links (body 12) | ✅ honesty fix live |
| family-children | 1203 px | 5 rich child cards → 5 real drill-downs | ✅ |
| family-schedule | 1628 px | child-tagged today + next → day-grouped week → live gate | ✅ |
| family-progress | 1317 px | family trio → 5 child bar-cards w/ drill-downs → notes | ✅ |
| family-billing | 1378 px | quota tiles 40/12/28 → settled chip → subs → amount-free invoices → gates | ✅ zero-pay green |
| family-requests | 1678 px | 4 type cards (trial/meeting/feedback/cancel) + per-type gates | ✅ |
| family-materials | 1094 px | 5 per-child groups (all covered) + download gate; no hero | ✅ |
| family-profile | 1393 px | identity · account · children · prefs · EXACTLY 3 gates | ✅ |
| family-child (preserved) | 1162 px | **#page-body BYTE-EQUAL to baseline (both languages)** | ✅ drill-down intact |

### Screenshot review (18 new frames + proofs, 0 console errors)

| # | Frame | Verdict |
|---|---|---|
| 1 | Children · AR desktop + mobile + EN | ✅ five cards (course/group/teacher · chips · bar · hint · subscription tag · «فتح ملف الابن»); LTR mirror clean |
| 2 | Schedule · AR desktop + mobile | ✅ child-name tags on today cards; day-grouped week; truthful rest days; ONE live gate; zero tables |
| 3 | Progress · AR desktop + mobile | ✅ family trio; five bar-cards each with the real drill-down; re-homed teacher notes; zero charts |
| 4 | Billing · AR light + dark + mobile | ✅ hour tiles (٤٠/١٢/٢٨) · settled chip · per-child subscription rows · serial/month/due/course/status invoice cards — NO amounts, NO pay control; dark-safe |
| 5 | Requests · AR desktop + mobile | ✅ counts band; trial two-path tiles; meetings truthful empty + gate; feedback lines; cancel options + caution; every type gated |
| 6 | Materials · AR desktop + mobile | ✅ per-child groups (st12/st13 covered by the new items) + type chips + download gate; NO hero |
| 7 | Profile · AR desktop + mobile | ✅ guardian identity + account rows + children line + prefs + EXACTLY 3 «يتطلب الخادم» gates; zero forms |
| 8 | Family home · tiles-now-links refresh | ✅ the quick-links band navigates (7 real tiles); the five child cards unchanged |
| 9 | family-child · proof | ✅ default st1 renders; deep links switch; nav shows 8 links with HOME active (drill-down semantics kept) |
| 10 | Student / teacher / admin | ✅ unchanged (59/77 hash-identical — proof, not re-shot) |

**Failure sweep:** none — zero pay/currency/amount tokens on all 18 family bodies (regex-proven), no fake payment/submit/download/save, no hero, no charts/rank, no dead links/`href="#"`/raw keys, no long-page regression (all in-window), RTL/LTR/dark/mobile clean, family-child body byte-equal, student/teacher/admin untouched.

**Automated:** build clean (77) · smoke PASS (**76 loads**; FAMILY_INTERNAL branch: role/active===2×self/navList===8/multiset===19/forms===0/tables===0/ceiling[500,2200]/payFigure-per-page + per-page pins (children 5 exact · progress 5 exact + bars 5 · billing pB===1 · requests pP===1 · materials pB===1+items · profile pB===3); home re-scope bodyAnchors===12 in two exact subsets; family-child re-scope navList 8/multiset 19 w/ **navCurrent 2×family-portal KEPT + ALL body asserts BYTE-KEPT**; **payHit + the original zero-pay lines + the ENTIRE student branch + teacher/hub/admin asserts BYTE-VERBATIM**) · axe **critical=0 serious=0** (7 pages AR light/dark + children EN) · **59/77 hash-identical** · frozen-file diffs = 0 (portal-shell/portal-page/enhance/nav.config/package.json/family-child.js/student/teacher modules) · build-html.mjs diff = exactly 14 added lines.

## Spec 022 — Living Dashboards Experience Rework — 2026-07-06

**Goal:** transform the static card-gallery hub + role homes into LIVING educational cockpits and land the corrected role model (Spec 021 DEC-001…006), under every standing law. **Before frames** archived in `screenshots/before-022/`; **after frames** captured in place (160 frames, **0 console errors**).

### Before → after (the static-card problem, solved)

| Surface | BEFORE (static) | AFTER (living) | Verdict |
|---|---|---|---|
| Hub | 3 equal role cards incl. a Student primary | 2 primary role cards (Family·Teacher) + admin console + ONE demoted «عرض الابن — معاينة» child-view entry naming the family journey + سلمان | ✅ role model corrected |
| Family home | plain head + 4 flat KPI tiles + inert session cards | violet **idHero** (avatar + greeting + 3 counters WITH story lines) · child-tagged **day rail** (now/next stops) · child cards w/ animated bars · billing/requests **status stories** («دون أرقام») · **guided** gate panels | ✅ alive |
| Teacher home | same flat rhythm | teal **idHero** · roster-tagged **day rail** · follow-up board · التحضير→الحضور→تسجيل→المراجعة **flow strip** (record step dashed-gated) · **guided** gate · performance link | ✅ alive, pay-free |
| Child view (student) | «بوابة الطالب» primary role, flat KPIs | reframed **«عرض الابن» / «ابن العائلة»** shell · sky **idHero** · **day rail** · homework + celebration + **guided** gates | ✅ reframed + alive |
| family-child | 5-panel drill-down | + ONE honest fold-point link «افتح عرض الابن الكامل (سلمان)» → the child view | ✅ fold point |

### Heights @1366×768 (compact window held — the endless page did not return)

| Page | Height | Window | Verdict |
|---|---|---|---|
| family-portal | 1925 px | [900,2200] | ✅ |
| teacher-portal | 1563 px | [900,2200] | ✅ |
| student-portal | 1528 px | [900,2200] | ✅ |
| portals (hub) | 815 px | — | ✅ |
| family-child | 1260 px | — | ✅ |

### Living primitives proof (all shared, from `portal-page.js`)
`idHero` (1 per home) · `dayRail` (now/next/done stops, the now-dot pulses only with motion allowed) · `storyRow` (family billing/requests, 2) · `flowStrip` (teacher, 4 steps) · `guidePanel` (every gate; adds the «ماذا يحدث عند التفعيل» line, stays non-interactive).

### Role-model + demotion proof
Hub `hubRoleTargets` = exactly `[family-portal, teacher-portal]` (student demoted); exactly 1 child-view link (→ student-portal); admin link kept. Student shell reads «عرض الابن»/«ابن العائلة» on all 14 student pages; the six internal **bodies byte-equal** (12 extraction-hash proofs); `ROLE_NAV.student` structurally untouched (7 links still work).

### Failure sweep
None. Dark/RTL/mobile clean (a11y **critical=0 serious=0** incl. hub dark + all reworked homes light/dark); reduced-motion CSS-audited (all `lv-*` animation quarantined behind `prefers-reduced-motion: no-preference`, static end-state default); zero `href="#"`/dead links/raw keys; **teacher pay-free** three layers green (source incl. comments + built AR/EN + payHit byte-verbatim); **family zero-pay** payFigure regex green on ALL 18 family bodies; family-children byte-identical; no fake actions. Identity **55/77** (22 intentional rebakes); admin/index/other family internals byte-identical.

## Spec 024 — Corrections From Legacy Coverage Audit (2026-07-07)

Correction/alignment pass over the Spec 023 backlog (B-01…B-11). No new pages/backend/fake behavior; 77 HTML held; smoke PASS (76 loads); a11y critical=0 serious=0.

### B-01 — child-view wording (F-00-1 fix)
The demoted child-view note reframed «لوحة الطالب — النسخة الأولى» → «عرض الابن — النسخة الأولى» (ar) / "Student dashboard…" → "Child view — part of the family account" (en) on the 6 child-view pages that carried it (home + homework/history/profile/progress/materials; student-schedule had none). Grep gates: zero «لوحة الطالب|بوابة الطالب» in `student-*.html`, zero "student dashboard|Student Portal" in `student-*.en.html`. Family note («لوحة العائلة») and teacher note («لوحة المعلم») BYTE-UNCHANGED (both primary roles — correct). Declared 022 extraction-hash supersession (10/12 internal bodies). New smoke guard: child-view `#page-body` must not match `/لوحة الطالب|بوابة الطالب|student dashboard/i`.

### B-03 — role-portal notifications honest gate
Bell added to the family/teacher/student topbars (reuses `data-action="notifications"` → the existing Soon-badged, `aria-disabled` popover; no dot/count, no new hook, admin gate untouched). The hub (role-switcher) is deliberately EXCLUDED — `portals.html` byte-clean vs HEAD.

### B-05 — teacher library planned nav item
One `library` «مكتبتي/Library» item added to `ROLE_NAV.teacher` (non-anchor `is-planned` «قريبًا» button, owner Spec 025). Teacher nav 7→8; `plannedNavAnchors===0` held.

### B-11 — visual-density (pure CSS, additive living layer)
D-06 dark-mode role-tinted idHero (family/child heroes keep role color in dark, theme-aware) · D-08 hub primary grid 2-up (no empty third slot after the student-card demotion) · D-13 mobile topbar de-wrap (hide the redundant greeting <560px so the action row — now with the bell — never wraps). D-04/D-05/D-09 DEFERRED (pinned bodies). Motion untouched (single reduced-motion block); no new hook/page.

### Records (no code)
B-02 Locations→031 · B-04 live-room→future-backend · B-06 teacher chat→future (owner 025, no nav item) · B-07 pay-free exemption for the pre-existing Spec 007 admin teacher-performance board (grep NOT weakened; 025 repoints the anchor) · B-08/B-09 exclusion + finance-boundary provenance (README/CLAUDE) · B-10 rail verified MOVED-not-deleted (prep-hint → flowStrip «التحضير»); family-children no-fold-link recorded intentional.

### Failure sweep
None. Forbidden files (build-html.mjs, package.json, nav.config.js, enhance.js, topbar.js) 0-diff. Teacher pay-free three layers green; family zero-pay green. No `href="#"`, no new hook/storage key. Admin pages untouched.

## Spec 025 — Teacher Internal Pages (2026-07-07)

The seven teacher internal pages built behind the teacher portal nav (each AR+EN → 77→91 public HTML). Static, pay-free, honest gates; no backend, no fake actions. Smoke PASS (90 loads); a11y critical=0 serious=0; 170 screenshots / 0 console errors.

### Pages (grounded in the Spec 015 T1–T27 map)
- **teacher-schedule** (T14): today dayRail (roster counts + «جارية الآن» status + prep hint) + week day-grouped agenda cards (truthful rest days, no grid clone); live-room + availability = backendRequired gates.
- **teacher-students** (T8): view-only roster cards (st1/st6/st11/st13 — course/group + learning signal) + follow-up storyRow; zero form controls, zero body anchors.
- **teacher-outcomes** (T22/T3): prepare→attend→record→review flowStrip + the five classes-end capture fields display-only + recorded examples (out1/out11); save = backendRequired.
- **teacher-tasks** (T11/T16): task board (priority/status + due) + monthly-plan preview; complete = backendRequired; no tickets chart/average.
- **teacher-reports** (T9+T20/T21): **academic-only** — authored counts (24 sessions / 4 students / 3 on-track), student-progress cards, 5 rubric dimension lines (no scales/scores), export = backendRequired. **The teacher-home performance anchor's repoint target.**
- **teacher-profile** (T23): identity + subjects + availability windows + preferences; exactly 3 backendRequired write gates (photo/save/password).
- **teacher-library** (T15): resource cards (type/status/course) from TEACHER_PREVIEW.materials; upload/download = backendRequired.

### Nav conversion + anchor repoint
The 7 planned ROLE_NAV.teacher items → implemented (navListAnchors 1→8, plannedNavAnchors===0, shell-anchor multiset 5→19 — teacher is now a full role app like family). The teacher-home performance anchor repointed `teacher-performance`→`teacher-reports` (closing the Spec-024 B-07 admin-shell adjacency).

### Pay-free / honesty
Teacher pay-free GLOBAL verified at 3 layers (source incl. comments + built + smoke `payHit` byte-verbatim; 0 hits on the 7 teacher-owned pages + teacher-portal). Reports academic-only (no chart/computed-score). Live-room = backendRequired gate (B-04); no teacher chat page/nav (B-06→026); every unavailable action an honest gate; zero `href="#"`, zero form controls, zero body anchors.

### Failure sweep
None. Admin (40) + index + all family + all student pages byte-identical (only teacher-portal pair changed — nav+anchor). package.json / enhance.js / topbar.js / portal-shell.js / nav.config.js 0-diff. One sanctioned smoke amendment (TEACHER_INTERNAL set + teacher nav/body asserts + anchor re-pin + expPlanned entries); payHit/famPay/admin asserts byte-verbatim. Dark/RTL/mobile-390 clean.

## Spec 026 — Admin Control / Sessions / Operations + Global Action Completion Pass (2026-07-07)

Two layers: (A) three new admin ops pages + two folded ops bands + nav flips; (B) a global action-completion pass making every misleading admin «preview action» toast an honest `backendRequired` outcome. Static, honest, no backend, no fake persistence. **91 → 97 HTML.** Smoke PASS (96 loads); a11y critical=0 serious=0; screenshots clean.

### Layer A — new admin ops pages (grounded in legacy management-* captures)
- **sessions-analysis** (`management-sessions-analysis`): display-only outcome KPI board — helper tiles + regular/trial outcome rows (authored count + total-time), **no computed score/rank/chart**; Export = honest backendRequired gate.
- **public-holiday** (`management-public-holiday`): authored holiday-window list (from→to, scope, status chip) + summary tallies; Set-holiday + Bulk-absence = backendRequired gates; no fake bulk cancel.
- **scheduled-actions** (`management-scheduled-actions`): authored queued lifecycle-actions (suspend/activate/cancel-classes, scheduled + auto-return dates) + roll-up; Create = backendRequired gate; no scheduler engine.
- **Folds** (0 new pages): total-queues → an ops queue band on **sessions**; schedule-requests → an inbox-preview band on **schedule**; add-queue / accept / reject are clickable `data-disabled-reason` backendRequired gates.
- **Nav**: 3 planned items (`sessionsAnalysis`/`publicHoliday`/`scheduledActions`) flipped planned→implemented (real `<a>` links); the other 5 (leads/tasks/messages/announcements/time-convertor) stay honest `data-coming-soon` planned gates → owner specs.

### Layer B — global action completion (all pages)
- **Honest core**: `enhance.js` `acknowledge()` now says "available once the server is connected" (never «إجراء تجريبي»/"preview action"); `openModal()` generalized to show a Create/Edit title + a backendRequired note (reuses the existing `data-modal-trigger` — no new dispatch hook, no new storage key).
- **Create/Add primaries** (New session ×2, Add student/teacher/course/group, wizard Save, Add-another-child) → open the honest backendRequired modal (`data-modal-trigger` + title/note keys), never a fake "saved" toast.
- **Inline verbs + confirms** (Edit/Notify/Message/Note/Print/Attend/Feedback/Reverse/Cancel/Suspend/Stop/Remove/Record/Mark/Remind/Reset/Schedule) → 78 toast rewordings + 12 confirm-body rewordings to honest "will be available once the server is connected" (never «تم…»/"saved/cancelled/done/(demo)").
- **DU-20 dashboard "Today's Sessions"**: the fake Apply/Clear/select-btn filter (unwired) removed (Option B); replaced with New-session (honest modal) + a real "view all sessions" link to the working sessions page.

### Honesty / role laws / impact
No fake create/save/delete/upload/download/export/print/attendance/outcome/chat/live-room. `href="#"` = 0 sitewide; 0 «preview action»; 0 fake-success toast wording in any built page. Teacher pay-free (portal pages 0 pay tokens; teacher-performance is the admin B-07 board), family zero-pay, student child-view, admin finance Spec-009-invariant (finance «رواتب» nav byte-identical to HEAD) — all green. Portal 49 files + index byte-identical; package.json 0-diff; no new dependency/engine/hook/storage key. One sanctioned smoke amendment (3 pages + action-completion asserts; DU-20/DU-07 assertions updated to the new honest behavior).

## Spec 027 — Admin Families / Students / Courses / Groups Deep Management (2026-07-08)

Deepened the 9 already-honest admin management pages (families/family/add-family/students/student/courses/course/groups/group) into real usable admin screens — **zero new pages (97 → 97)**, every delta a modal / drawer-picker / row-kebab / tab / gate on an existing page. Static, honest, no backend, no fake persistence. Smoke PASS (96 loads); a11y critical=0 serious=0; 187 screenshots, 0 console errors.

### What became deep (M-A…M-M, M-R, M-S)
- **Family** (`family__*__sp027-edit-modal`, `__sp027-reclassify`): Edit family / Add child / Add note upgraded from shallow toasts → honest `data-modal-trigger` backendRequired modals; **category reclassify** = a display-only assignment-preview drawer (`fam-cat`: the 4 tiers with the family's current tier marked + member counts) whose "Save category" is a backendRequired gate. Suspend/Stop stay confirm-gates; billing stays the owner-030 gate (the admin plan hour-rate stays a single-value, no-math literal).
- **Student** (`students__*__sp027-row-kebab`, `student__*__sp027-enroll-picker`, `__sp027-suspend-confirm`): the previously-absent **students-table row kebab** (View profile · Edit modal · Suspend/Remove confirm) via a new `studentMenu` variant on the EXISTING `data-row-menu` hook (no new dispatch hook); Edit/Add-note → modals; **enroll-in-course / assign-to-group / move-between-groups** = display-only candidate-list drawer pickers (`stu-enroll`/`stu-assign`/`stu-move`) with a backendRequired final gate; **cross-family transfer** = an honest gate inside the move picker (no invented fields); **schedule-search** = an availability-preview gate. Results/Evaluation stay display-only (**no computed score/rank/chart added**). Message stays the honest 026/future gate.
- **Course** (`course__*__sp027-add-students`, `__sp027-en`): Edit-course → modal; **Add-students** = `crs-enroll` display-only picker → backendRequired; **create-group-from-course** → modal. Assign-teacher (→028) / Print (→029) stay reference gates; materials (→031) deferred.
- **Group** (`group__*__sp027-add-students`, `__sp027-dark`): Edit-group → modal; **Add-students** = `grp-assign` display-only picker → backendRequired; Remove stays confirm; **move** = honest gate; capacity stays the pre-existing grounded total (no invented seat field). Assign-teacher (→028) / Print (→029) stay gates.

### Honesty / role laws / impact
No fake create/save/delete/enroll/assign/move/remove/upload/export/print; no DOM/roster mutation; no persisted picker selection. `href="#"` = 0; no dead buttons; no raw keys. Reused ONLY the closed Spec-026 `data-*` set (`data-modal-trigger`+title/note · `data-drawer` baked `<template>` · `data-confirm` · `data-disabled-reason` · `data-row-menu`+`-kind`) — **no new dispatch hook, no new storage key, no new engine, no new page, no CSS redesign** (pickers reuse `sheet-card`/`sheet-row`, kebab reuses `icon-btn`). Family zero-pay, student child-view (no «لوحة الطالب»), teacher pay-free (reference only), admin finance Spec-009 invariant — all byte-verbatim green. Portal + admin-ops (sessions-analysis/public-holiday/scheduled-actions) + index byte-identical; package.json 0-diff. One sanctioned smoke amendment (+83 lines, additions only; payHit/famPay/payFigure/child-view/admin-finance + the 026 action-completion asserts byte-verbatim).

## Spec 028 — Admin Teachers / Performance Deep Management (2026-07-08)

Deepened the admin teacher surfaces (teachers · teacher · teacher-performance) + the course/group **assign-teacher** references — the Spec-027 M-N handoff — into real usable admin screens. **Zero new pages (97 → 97)**; all-teachers-timetable **folds into the existing `schedule.html` teacher-lens** (no new page, `schedule.js` byte-unchanged). Static, honest, no backend, no fake persistence. Smoke PASS (96 loads); a11y critical=0 serious=0; 197 screenshots, 0 console errors.

### What became deep
- **Teachers list** (`teachers__*__sp028-kebab`, `__sp028-categories`): a per-card **row kebab** (previously absent — View profile real link · Edit modal · On-Vacation/Deactivate confirm · Delete confirm) via a new `teacherMenu` on the EXISTING `data-row-menu` hook (an optional `menuId`/`menuKind` slot on `directory-card.js` — every non-teacher `directoryCard` caller stays byte-identical); a **Manage-categories** header drawer (`trn-categories`: display-only category list + a Create-category modal + an assign-members backendRequired gate) — the `teacherCategories` nav item stays **planned** (no page).
- **Teacher detail** (`teacher__*__sp028-edit-modal`, `__sp028-assign-course`, `__sp028-availability`, `__sp028-confirm`, `__sp028-en`): Edit + Add-note → honest `data-modal-trigger` modals; Notify → confirm (kept); **assign-course / assign-group** → display-only `trn-assign-course`/`trn-assign-group` picker drawers → backendRequired; **On-Vacation / Deactivate / Delete** → confirms; **availability-window editor** (`trn-availability`: weekly day/time rows + Add/Update/Delete backendRequired gates, no invented recurrence); Reset-password / Login-as → future-backend gates; Message → 026/future gate; Print → 029 gate.
- **Course / Group** (`course__*__sp028-assign-teacher`, `group__*__sp028-assign-teacher-dark`): the M-N assign-teacher gate → a display-only single-teacher `crs-assign-teacher`/`grp-assign-teacher` picker drawer → backendRequired (separate from the Spec-027 `grp-assign` student drawer).
- **Teacher performance**: preserved display-only (counts + labeled signals + facet filters + real profile links) — **no computed score/rank/chart** added; the unused `rating` fixture field stays unsurfaced.

### Honesty / role laws / impact
No fake teacher create/edit/delete/status-change/assign/schedule/availability mutation; no persisted picker selection; no roster/relationship change. **Zero pay/salary/payroll/compensation/payout figures** on the admin teacher surfaces (the shared «الرواتب» finance nav in the sidebar is the pre-existing Spec-009-sanctioned link, outside `#page-body`); no Salary/Payout fieldset; no compensations tab. Reused ONLY the closed Spec-026 `data-*` set + Spec-027 drawer-picker/kebab precedents — **no new dispatch hook, no storage key, no engine, no page, no CSS**. **Teacher portal pay-free**: the 16 `teacher-*` portal files stay **byte-identical**; `teacher-performance.html` is the Spec-024-B-07 sanctioned admin exempt board (never linked from the portal). Family zero-pay, student child-view, admin finance Spec-009 invariant — all byte-verbatim green. Only teachers/teacher/course/group HTML changed (×2 lang); `teacher-performance` + all portal + admin-ops + the 9 Spec-027 pages + index byte-identical; `package.json` 0-diff. One sanctioned smoke amendment (+77 lines, additions only; payHit/tchPay/famPay/payFigure/child-view/admin-finance + 026/027 asserts byte-verbatim).

## Spec 029 — Admin Reports / Analytics / Feedback / Forms Deep Management + Admin Menu Coverage Gate

**Frames**: `reports__*__sp029-feedback-drawer`, `__sp029-categories`, `__sp029-create-feedback`,
`__sp029-form-drawer-en`, `__sp029-feedback-drawer-dark`, `__sp029-mobile` (203 total · 0 console errors).

### What became deep (no new page — 97 → 97; feedback + forms folded into reports.html)
- **Feedback review** (`sp029-feedback-drawer`, `__-dark`): authored rows across teacher/class/family/student
  — a CATEGORICAL remark pill (never a number) + status chip + a real type/status `filterBar`; each row opens
  a **read-only** detail drawer whose finals are backendRequired confirms (Approve · Delete). No computed
  percentage/score/rank; no plotting visuals.
- **Feedback categories** (`sp029-categories`): a Manage-categories drawer (`rep-fbcat`) — display-only list +
  a Create-category modal + an assign-members `data-disabled-reason` gate; the nav item stays **planned/folded**
  (mirrors `teacherCategories`/`familyCategories`).
- **Create feedback** (`sp029-create-feedback`): an honest `data-modal-trigger` backendRequired modal (nothing
  saved).
- **Forms / surveys** (`sp029-form-drawer-en`): a display-only list (authored question/response **literals** —
  no aggregation) + a Create-form modal + a read-only detail drawer + a real deep-link to the EXISTING student
  Evaluation tab (the monthly progress form — no duplicate engine).
- **Mobile** (`sp029-mobile`, 390px): the folded feedback/forms sections reflow with no horizontal overflow.

### Honesty / role laws / impact
Every 029 write ends at a `backendRequired` modal/confirm/gate — no fake report/export/download/PDF/CSV/print,
no fake feedback submit/approve/delete, no fake form persistence, no DOM mutation. **No chart engine / `<canvas>`
/ computed percentage / score / rank / percentile** anywhere; `sparkline.js` not repurposed. **Export/print
honesty**: reports Print → disabled-with-reason gate (R-G); native disabled-reason gates on sessions-analysis /
course / group / student / teacher kept (already honest); teacher-performance stays export-free/display-only.
**Write honesty**: outcome "Add feedback" → backendRequired modal (R-E, via the ONE canonical outcome drawer →
attendance/sessions/course/group/teacher); student "Approve" → backendRequired confirm (R-F). **No finance
figure** in any 029 body (reports `#page-body` forbidden-token grep covers salary/payroll/invoice/etc.);
finance source **0-diff**. **Admin-menu coverage**: 43 items classified, 0 unclassified; `nav.config.js` 0-diff;
runtime-enforced by the existing Spec-010 nav block. **14 HTML changed**
(reports/attendance/sessions/course/group/teacher/student ×2); teacher-performance + 16 teacher-portal + family
+ finance + index byte-identical; `package.json` 0-diff. Teacher pay-free / family zero-pay / student child-view
/ admin finance Spec-009 invariant all byte-verbatim green. Additive smoke amendment (Spec-029 asserts + R-G
re-pin + one facet-scoped filter-correctness refinement); a11y critical=0 serious=0.

## Spec 030 — Admin Finance / Invoices / Payroll / Banks Deep Management

**Frames**: `finance__*__sp030-salaries`, `__sp030-banks-en`, `__sp030-add-bank-modal`, `__sp030-salaries-dark`,
`__sp030-mobile` (208 total · 0 console errors).

### What became deep (no new page — 97 → 97; nav.config.js 0-diff; finance.html tabbed hub)
- **Salaries tab** (`sp030-salaries`, `__-dark`): teacher + staff **STATUS-FIRST, FIGURE-FREE** boards — name +
  status chip + period ONLY (no salary/fixed/fine/gift/hour-rate/total figure). Run-salaries / Approve /
  Mark-disbursed / Export = honest `data-disabled-reason` gates.
- **Banks tab** (`sp030-banks-en`): bank name/status list + an Add-bank `backendRequired` modal
  (`sp030-add-bank-modal`, name only) + Import-statement / Reconcile gates — no credentials, account numbers,
  balances, or `type=password`.
- **Overview tab** (unchanged, byte-behavior-identical): 4 status tiles + 9 invoice rows + read-only drawers +
  recent payments (now with Add/Reconcile gates) + the 9 figure-free planned cards. Print reclassified to a
  disabled-with-reason gate (F-J).
- **Mobile** (`sp030-mobile`, 390px): the finance hub tabs + salary board reflow with no horizontal overflow.

### Honesty / no-fake-money / role laws / impact
Every finance write is a `backendRequired`/`disabled-with-reason` gate or a `data-confirm` that mutates
nothing — no fake payment / mark-paid / salary generation / payout / bank import / reconciliation / export /
print. **Two figure classes**: invoice/payment amount literals allowed (Spec-009-sanctioned); **salary/payout/
compensation figures never shown** (salaries/payouts/class-report are figure-free boards or honest planned
gates). No computed aggregate (Net Income / P&L / totals / balance), no group-by/sum, no chart/`<canvas>`, no
`type=file`, no `type=password`, no API-key/webhook/secret/paymob/payoneer. Payout-providers + payment-gateway
credentials → future-backend/031 (never mocked); teacher-portal salary twin + family payment → excluded.
**Declared Spec-009 supersession**: lifted the finance-source freeze + the `demoInCluster>=1` assertion (F-J);
kept byte-verbatim the 4-tiles / 9-invoices / 6-payments / **9-planned-cards** / 9-drawers / forbidden regex /
no-mutation-on-confirm / no-receipt asserts. **Only `finance.html`/`.en` changed**; `package.json`/
`nav.config.js`/`enhance.js`/`finance-status.js` 0-diff; teacher-portal ×16 + teacher-performance + family +
student + reports + index byte-identical. Additive smoke amendment; a11y critical=0 serious=0.

## Spec 031 — Admin Management / Content / Certificates / Settings / Materials

**Frames**: `sp031-staff`, `sp031-staff-rbac`, `sp031-library-en`, `sp031-library-cats`, `sp031-certificates`,
`sp031-cert-requests`, `sp031-settings`, `sp031-integrations`, `sp031-add-head-modal`, `sp031-settings-dark`,
`sp031-mobile` (219 total · 0 console errors).

### What became deep (97 → 103; settings folds 0-delta; +staff/library/certificates)
- **Users & Staff** (`sp031-staff`, `-rbac`): display-only directory + per-row kebab (View drawer · Edit/Duplicate
  backendRequired modal with **no password / no salary** · display-only RBAC matrix drawer + Save gate · Category/
  Activity drawers · Deactivate/Delete confirms that mutate nothing · Reset/Invite future-backend gates). The ONE
  staff home (resolves the settingsUsers duplicate; the settings Users tab deep-links here).
- **Materials & Library** (`sp031-library-en`, `-cats`): Content hub — Materials (bilingual subject catalog,
  name-only modals) + Books (media rows with authored view/download **count literals**, filters, category drawer).
  Add-Material/Upload/Download/Publish/Delete are gates — **no `type=file`, no download link, no fake publish**.
- **Certificates** (`sp031-certificates`, `-cert-requests`): Templates (+ a **static, non-draggable designer
  preview** — no `<canvas>`, no drag, no upload) + Requests queue. Approve/Reject/Generate/Preview/Download/Send/
  Create/Upload = gates — **no PDF, no `window.open`, no status mutation**.
- **Settings hub** (`sp031-settings`, `-integrations`, `-add-head-modal`, `-settings-dark`): 6 tabs (General ·
  Notifications · Customization · Security · Users · Integrations). **Theme/language stay REAL**; every Save/
  Connect/Test is a gate. General omits pay-rate/salary, folds Locations + a figure-free expense-heads lookup.
  Notifications = figure-free matrix. Integrations = **locked-placeholder** provider cards (name + status only —
  no credentials, no `type=password`, no webhook). Message-builder/backup/import = future-backend gates.
- **Mobile** (`sp031-mobile`, 390px): staff directory reflows with no horizontal overflow.

### Honesty / role laws / impact
Every write is a `backendRequired`/`disabled-with-reason` gate or a `data-confirm` that mutates nothing — no fake
settings save / user-RBAC mutation / upload-download / certificate-PDF generation / integration connect / backup.
**0** `type=password`/`type=file`/api-key/secret/webhook/`<canvas>`/`.pdf`/`window.open` in any 031 body; **0**
salary/pay figure (staff omits salary; heads name/status; notif `salaries` figure-free). Only `settings.html`
changed among existing bodies; the 3 nav flips changed the shared sidebar (staff/books/certificates → anchors,
proven the only change); teacher-portal ×16 + family + student + index + finance/reports bodies byte-identical.
Protected role-law + 026-030 smoke asserts byte-verbatim. a11y critical=0 serious=0.

## Spec 032 — Create-Edit Forms Completion / Production Freeze

**Frames**: 39 new `sp032-*` open-form frames (258 total · 0 console errors) — one open drawer per rebuilt
create/edit surface across desktop AR + select EN + dark + mobile 390, plus a picker-drawer proof and the
nested feedback-form proof: `sp032-sess-new`, `sp032-fam-edit`(+`-dark`), `sp032-fam-child`, `sp032-fam-note`,
`sp032-wizard-child3`, `sp032-stu-add`(+`-mobile`), `sp032-stu-edit`, `sp032-stu-note`, `sp032-crs-add`(+`-en`),
`sp032-crs-edit`, `sp032-create-group`, `sp032-grp-add`, `sp032-grp-edit`, `sp032-trn-add`(+`-mobile`),
`sp032-trn-edit`, `sp032-trn-note`, `sp032-trn-categories-form`, `sp032-fb-create`, `sp032-form-create-en`,
`sp032-fbcat-form`, `sp032-fb-add`, `sp032-bank-add`(+`-dark`), `sp032-staff-add`(+`-en`), `sp032-staff-edit`,
`sp032-staff-dup`, `sp032-cert-tpl`(+`-dark`), `sp032-cert-create`, `sp032-mat-add`, `sp032-lib-item`,
`sp032-head-add`(+`-mobile`), `sp032-picker-proof`.

### The core change: a real form before every gate (FC-01…FC-40)
Every Add/Create/New/Edit/Duplicate action used to open a field-less "backendRequired" note as its first-and-only
response. Now each opens a **form-bearing drawer**: a baked `<template data-preview>` whose body is a `.wiz-grid`
of INERT `field()` controls (via the new additive `formDrawer()` helper in `preview-drawer.js`, wrapping the
existing `previewTemplate`) followed by exactly ONE clickable `data-disabled-reason` backendRequired final. The
40 field-less create/edit gates became 24 shared form drawers; **0 field-less create/edit modal remains**. No new
hook, no new storage key, no new engine, no new page (count held at 103).

### What the forms show (and what they never show)
- **Sessions** (`sess-new`): course/teacher/date/time/duration/credit-source/status. **Family/Student**: fam-edit
  (name±ar/email/phone/status/category/notes — **no password**), fam-child, fam-note, stu-edit, stu-note, stu-add
  (+ trial block); the add-family wizard's "Add child" now reveals a real third child row via a native `<details>`.
- **Courses/Groups**: crs-add/crs-edit (material/teacher/start-date/schedule — **no teacher-rate field**),
  grp-add (course prefilled for create-from-course)/grp-edit — **no per-group rate field**.
- **Teachers** (`sp032-trn-add`): name±ar/email/phone/status/subjects/level/course/city/country/notes + a CV-upload
  **gate** — **no salary/hour-rate/fine/meeting-provider/payout/auth-secret field anywhere**.
- **Reports**: fb-add (nested in the outcome sheet)/fb-create/form-create (repeatable field-builder rows)/rep-fbcat.
- **Finance** (`bank-add`): bank-name only — **no credentials, no balance, no figure**. **Staff**: add/edit/dup
  (name/username/email/phone/role/status — **no password, no salary, no OTP**).
- **Certificates** (`cert-tpl`): name + a **static** designer preview (CSS-positioned field labels) + a background-
  upload **gate** — no `<canvas>`, no drag, no PDF. cert-create (student/course/template/date/message + preview gate).
- **Library/Settings**: mat-add/mat-edit, lib-item (+ upload/thumbnail gates), lib-cats create form, head-add
  (name/status — **no amount**). Customization Save + Policy Edit stay honest panel gates over already-visible fields.

### Honesty / role laws / impact
Fields are INERT (no behavior hook, no persistence); every final Save/Submit/Issue is a `data-disabled-reason`
backendRequired gate — no fake save/create/edit/assign/upload/PDF/payment/permission/integration. **0**
`type=password`/`type=file`/`<canvas>`/`.pdf`/`window.open`/`blob:`/`download=`/credential-named control in any
form body; **0** salary/pay/hour-rate/fine/amount figure. The 14 candidate-list pickers stay list-then-gate; the
3 hybrid category drawers (`trn-categories`/`rep-fbcat`/`lib-cats`) gained real create forms. Teacher-portal ×16 +
family + student + index bodies byte-identical; `package.json`/`build-html.mjs` PAGES 0-diff; protected role-law
+ 026-031 smoke asserts byte-verbatim. Mobile 390: `.wiz-grid` reflows to one column, no horizontal overflow.
a11y critical=0 serious=0 (open-form focus-trap/dialog rows added).

## Spec 034 — Control Center Pages (Messages / Leads / Tasks / Announcements / Time Converter)

**Frames**: 24 new `sp034-*` frames (282 total · 0 console errors) — each page desktop AR + EN + dark + mobile-390, plus open-form/drawer proofs and the time-converter active-conversion frame:
`sp034-messages`(+`-en`/`-dark`/`-group`/`-mobile`), `sp034-leads`(+`-en`/`-dark`/`-create`/`-detail`/`-mobile`),
`sp034-tasks`(+`-en`/`-dark`/`-create`/`-mobile`), `sp034-announcements`(+`-en`/`-dark`/`-mobile`),
`sp034-timeconverter`(+`-en`/`-dark`/`-mobile`, all with a live computed result).

### The five closed Control items (103 → 113; 5 nav «قريبًا» → real links)
- **messages** (`sp034-messages`, `-group`): inbox list (contact/role/unread) + a default thread panel (authored bubbles) + a compose box; **Send/attach = backendRequired gates**; read-only thread sheets per conversation; Create-Group + Add-Member form drawers with the image upload as a **gate** (no `type=file`).
- **leads** (`sp034-leads`, `-create`, `-detail`): authored KPI cards + a lead list (date/parent/email/phone) + 9 status filters + a lead-detail drawer (notes log + Add-Notes + Change-Status forms) + a Create-Request form (~19 grounded fields, **no money field**); Convert/Assign/Save/Update = gates.
- **tasks** (`sp034-tasks`, `-create`): KPI strip + a display-only status board (no drag) + a per-staff table ("Average" = authored literal) + Create/Edit-task + Add-Section form drawers; Save/Assign/Move = gates.
- **announcements** (`sp034-announcements`): announcements list (audience/channel/status chips) + a compose form (message/channels/private/expire/audience) + preview + recipients; **Publish/Send + WhatsApp + media = gates** (no `type=file`); does NOT duplicate the settings Notifications form.
- **time-converter** (`sp034-timeconverter`): a **real working client tool** — source/target zone + date/time → live conversion via native `Intl` (Cairo 3 PM → New York 8 AM in the frame), common-zone quick chips, and an authored DST-changes tab. **No gate on the conversion; no network; no dependency.**

### Honesty / impact
Every write final is a `backendRequired` gate (or an inert disabled-with-reason button) — 0 fake send/convert/save/move/publish/delivery, 0 row/status/thread mutation, 0 fake-success wording. **0** `type=file`/`type=password`/credential/`<canvas>`/`.pdf`/`window.open`/money-figure in any of the 5 bodies. Only the 52 admin pages' shared sidebar changed (5 «قريبًا» → anchors); every admin `#page-body`, all portal pages, and index are byte-identical. `package.json` 0-diff. a11y critical=0 serious=0 (incl. mobile-390 + open-form rows).

## Spec 035 — Families & Students Nav Completion (113 → 115; 4 nav «قريبًا» → real links/deep-links)

**Frames**: 11 new `sp035-*` frames (0 console errors) — the new schedule-search page (desktop AR + EN + dark + detail-drawer + empty-state + mobile-390), the families fold owner + `fam-cat` reclassify drawer, and the two student deep-link tabs:
`sp035-schedule-search`(+`-en`/`-dark`/`-detail`/`-empty`/`-mobile`), `sp035-families-fold`, `sp035-family-cat-drawer`,
`sp035-student-results`(+`-en`), `sp035-student-evaluation`.

### The four closed Families/Students items
- **familyCategories** (`sp035-families-fold`, `sp035-family-cat-drawer`): the nav item is now a real `<a>` → `families.html` (the folded owner — category filter + the display-only `fam-cat` reclassify drawer whose "Save category" stays a `backendRequired` gate). No standalone page, no fake category create/save/mutation; `families.html`/`family.html` `#page-body` byte-identical.
- **scheduleSearch** (`sp035-schedule-search`, `-detail`, `-empty`): a NEW standalone display-only availability finder (legacy `management/search-schedule`) — a teacher/subject/day/time-window/availability filter bar over authored candidate rows (teacher + subject + day + time + room + a labeled availability chip), per-slot read-only detail drawers, and an empty state. **Client-side facet filtering only (no engine, no network, no pay figure); Book/Assign = `backendRequired` gates** (no fake booking/assignment/mutation).
- **studentResult** (`sp035-student-results`): the nav item deep-links to `student.html#view=results` — the existing display-only Results tab (per-course progress + certificates; **no gradebook/computed score/chart**).
- **studentEvaluation** (`sp035-student-evaluation`): deep-links to `student.html#view=evaluation` — the existing display-only Evaluation rubric tab (categorical ratings; Approve stays a `backendRequired` gate; **no computed total**).

### Honesty / impact
Every write final is a `backendRequired` gate — 0 fake booking/assignment/category-save/mutation, 0 fake-success wording. **0** `type=file`/`type=password`/credential/`<canvas>`/pay-figure in the schedule-search body (the "Salaries" tokens are the shared, Spec-009-sanctioned finance sidebar labels, present on every admin page). `result-summary.js`/`evaluation-rubric.js` byte-identical; no computed score/rank/chart introduced. Only the 52 admin pages' shared sidebar changed (4 «قريبًا» → anchors — PROVEN: `#page-body`-onward byte-identical for families/family/students/student ×2 lang); all portal pages + index byte-identical; `package.json`/`enhance.js` 0-diff. a11y critical=0 serious=0 (incl. mobile-390 + open-drawer rows).

## Spec 036 — Teachers Nav Completion (115 → 115; 4 nav «قريبًا» → real anchors/deep-links)

**Frames**: 9 new `sp036-*` frames (0 console errors) — the two fold-anchor drawers on teachers.html + the two new teacher-performance tabs:
`sp036-add-teacher` (trn-add drawer), `sp036-teacher-categories` (trn-categories drawer),
`sp036-sessions-kpi`(+`-en`/`-dark`/`-mobile`), `sp036-monthly`(+`-en`/`-dark`).

### The four closed Teachers items
- **addTeacher** (`sp036-add-teacher`): nav is now a real `<a>` → teachers.html; the `trn-add` form drawer (names/email/phone/status/subjects/level/courses/city/country/notes + CV **gate**) is reachable; Save = backendRequired; **no salary/rate/fine/payout/password field**.
- **teacherCategories** (`sp036-teacher-categories`): nav → teachers.html; `trn-categories` drawer (list + Create form + Save/assign gates) reachable; no fake mutation; stale FUTURE_ROUTES entry dropped.
- **sessionsKpi** (`sp036-sessions-kpi`): `teacher-performance.html#view=sessions-kpi` — a display-only board of per-teacher session **counts** + a categorical quality chip. **No computed percentage/score/rank/chart, no pay.**
- **monthlyPerf** (`sp036-monthly`): `teacher-performance.html#view=monthly` — a display-only board grouped by month (per-teacher categorical trend chip + authored note). **No computed figure, no pay.**

### Honesty / impact
Teacher pay-free upheld: 0 salary/rate/payout/currency token on any teacher surface (legacy Add-Teacher Salary/Payout/Zoom/password excluded forever). No computed score/rank/percentage/chart/`<canvas>` — the legacy "Classes KPI"/"Monthly Performance" `Percentage` is not reproduced. `teachers.html`/`teacher.html` `#page-body` byte-identical (fold anchors = nav-only); only `teacher-performance.html`/`.en` bodies change (tabs) + the shared sidebar; portals ×16 + index byte-identical; `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff. a11y critical=0 serious=0 (incl. mobile-390).

## Spec 037 — Reports / Analytics Nav Completion + Missing-Pages Correctives (115 → 115; 2 «قريبًا» → tabs + 3 flagged-035 items strengthened)

**Frames**: 19 new `sp037-*` frames (0 console errors) — the reports Overview preservation + the two new reports tabs + the three flagged-035 corrective boards:
`sp037-reports-overview`, `sp037-monthly`(+`-en`/`-dark`/`-mobile`), `sp037-analysis`(+`-en`/`-dark`),
`sp037-family-categories`(+`-en`/`-dark`/`-mobile`), `sp037-student-results`(+`-en`/`-dark`/`-mobile`), `sp037-student-evaluation`(+`-en`/`-dark`).

### The five surfaces
- **monthlyReports** (`sp037-monthly`): `reports.html#view=monthly` — authored month-grouped rows (area + count + status chip) + summary cards; Export/Generate = gates. **No computed metric/chart/money.**
- **dataAnalysis** (`sp037-analysis`): `reports.html#view=analysis` — authored insight cards + AUTHORED categorical trend labels; Run/Export = gates. **No engine/computed/chart; finance-free.**
- **familyCategories** (`sp037-family-categories`): `families.html#view=categories` — labeled board of the authored `FAMILY_CATEGORIES` (name/desc/count/status) + reclassify drawer reachable + Create gate. No computed stat, no money.
- **studentResult** (`sp037-student-results`): `students.html#view=results` — cross-student board (level + certificate-count + status chip + per-student deep-link to `student.html#view=results`). **No computed score/rank/GPA/percentage.**
- **studentEvaluation** (`sp037-student-evaluation`): `students.html#view=evaluation` — cross-student board (approved/pending chip + month + per-student deep-link). **No computed rubric total.**

### Honesty / impact
`reports.html` Overview preserves the existing body verbatim (7 `.report-card`s); families → Directory tab, students → Directory tab, both verbatim. New tabs are pure display boards (no filterBar — honors enhance.js's single global `[data-no-results]`). `student.html`/`family.html` + `result-summary`/`evaluation-rubric` byte-identical; only `reports`/`families`/`students` bodies (×2 lang) + the shared sidebar change; portals ×16 + index byte-identical; `package.json`/`enhance.js`/`build-html.mjs`/`i18n.js` 0-diff. Admin-menu 50; reports category 0-planned. a11y critical=0 serious=0 (incl. mobile-390).
