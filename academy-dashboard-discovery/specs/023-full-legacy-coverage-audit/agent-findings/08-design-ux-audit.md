# Agent 08 — Design / UX / Living-Dashboard Quality Audit (post-Spec-022)

Spec 023 — Full Legacy Coverage Audit 000–022. Read-only visual audit. Every claim below names the
exact screenshot(s) opened with the Read tool (rendered visually), current vs legacy.

Screenshot roots (abbreviated in this file):

- `CUR/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/screenshots/`
- `LEG/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/`
- `REF/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/design-references/`
- `DOC/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/frontend-planning-deep/`

## Scope & method

- Mission: judge VISUAL quality of the rebuilt app after Spec 022 (living cockpits + corrected role
  model) against the legacy capability/visual reference — better/weaker, static vs living, uplift
  needs, mobile/dark/RTL/LTR quality, and a ranked design-quality register.
- Method: opened **47 current screenshots** (including the 6 in `CUR/before-022/` for before/after
  of the hub + three role homes + family-child), **9 legacy/reference images** (7 legacy full-page
  captures across the three roles + the 2 approved design references), and the 3 legacy visual
  docs (`DOC/03-visual-patterns.md`, `DOC/03-screenshot-review.md`,
  `DOC/14-design-system-direction-v2.md`). All images were actually rendered and inspected.
- Judgments respect the binding laws: teacher pay-free / family zero-pay / no chart engines /
  honest gates / no pixel-cloning / corrected role model (student = demoted child-view). Where the
  rebuild "lacks" something legacy had because of a law, it is recorded as an INTENTIONAL
  exclusion, not a gap.

## Evidence opened (exact paths)

Current (47, all under `CUR/`):

1. `portals__ar__light__desktop.png`
2. `before-022/portals__ar__light__desktop.png`
3. `family-portal__ar__light__desktop.png`
4. `before-022/family-portal__ar__light__desktop.png`
5. `teacher-portal__ar__light__desktop.png`
6. `before-022/teacher-portal__ar__light__desktop.png`
7. `student-portal__ar__light__desktop.png`
8. `before-022/student-portal__ar__light__desktop.png`
9. `family-portal__ar__dark__desktop.png`
10. `teacher-portal__ar__dark__desktop.png`
11. `student-portal__ar__dark__desktop.png`
12. `before-022/family-portal__ar__dark__desktop.png`
13. `family-portal__en__light__desktop.png`
14. `teacher-portal__en__light__desktop.png`
15. `student-portal__en__light__desktop.png`
16. `family-portal__ar__light__mobile.png`
17. `teacher-portal__ar__light__mobile.png`
18. `student-portal__ar__light__mobile.png`
19. `teacher-portal__ar__light__mobile__drawer-open.png`
20. `family-children__ar__light__desktop.png`
21. `family-schedule__ar__light__desktop.png`
22. `family-progress__ar__light__desktop.png`
23. `family-billing__ar__light__desktop.png`
24. `family-requests__ar__light__desktop.png`
25. `family-materials__ar__light__desktop.png`
26. `family-profile__ar__light__desktop.png`
27. `family-child__ar__light__desktop.png`
28. `student-schedule__ar__light__desktop.png`
29. `student-homework__ar__light__desktop.png`
30. `student-progress__ar__light__desktop.png`
31. `student-materials__ar__light__desktop.png`
32. `student-history__ar__light__desktop.png`
33. `student-profile__ar__light__desktop.png`
34. `before-022/family-child__ar__light__desktop.png`
35. `family-child__ar__light__mobile.png`
36. `dashboard__ar__light__desktop.png`
37. `families__ar__light__desktop.png`
38. `students__ar__light__desktop.png`
39. `attendance__ar__light__desktop.png`
40. `finance__ar__light__desktop.png`
41. `reports__ar__dark__desktop.png`
42. `sessions__ar__light__desktop.png`
43. `dashboard__ar__light__mobile.png`
44. `family-billing__ar__dark__desktop.png`
45. `families__ar__dark__desktop.png`
46. `family-children__ar__light__mobile.png`
47. `attendance__ar__light__mobile.png`

Legacy + reference (9 images + 3 docs):

1. `LEG/family/screenshots/student-home-full.png`
2. `LEG/family/screenshots/student-billing-full.png`
3. `LEG/family/screenshots/student-timetable-full.png`
4. `LEG/family/screenshots/student-studentslist-full.png`
5. `LEG/teacher/screenshots/teacher-home-full.png`
6. `LEG/teacher/screenshots/teacher-library-full.png`
7. `LEG/admin/screenshots/management-accounting-full.png`
8. `REF/academy-dashboard.png`
9. `REF/sidebar-reference.png`
10. `DOC/03-visual-patterns.md`
11. `DOC/03-screenshot-review.md`
12. `DOC/14-design-system-direction-v2.md`

## 1) What is now BETTER than legacy (both-side evidence)

| # | Area | Legacy evidence | Current evidence | Why better |
|---|------|-----------------|------------------|------------|
| B1 | Family home | `LEG/family/screenshots/student-home-full.png` — LTR-only shell, Arabic name injected into English UI, hero KPIs all `0`, pink "No sessions today" / "No Teachers" banners | `CUR/family-portal__ar__light__desktop.png` | Legacy guardian home was effectively empty. The rebuilt violet cockpit has a real identity hero (avatar + 3 truthful counters), a living day rail (جارية الآن pulse / قادمة), 5 child story rows with progress + real drill links, honest billing/requests gates, quick links. Night-and-day upgrade. |
| B2 | Family billing | `LEG/family/screenshots/student-billing-full.png` — completely empty table (`Billing Details` header row only) | `CUR/family-billing__ar__light__desktop.png` | Status-first billing with hour quota 40/12/28, per-child subscription status, amount-free invoice history, honest «يتطلب الخادم» gates. Zero-pay law respected while carrying MORE usable information than legacy. |
| B3 | Family/child schedule | `LEG/family/screenshots/student-timetable-full.png` — empty 7-column week grid, zero sessions | `CUR/family-schedule__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png` | Day-grouped rails with per-child tags, status chips (مكتملة/جارية الآن/قادمة), and delightful rest-day empty states («يوم راحة — استمتع بعطلتك») — legacy empty state was a bare grid. |
| B4 | Children directory | `LEG/family/screenshots/student-studentslist-full.png` — one-row table with a yellow "not have any courses" chip | `CUR/family-children__ar__light__desktop.png` | Five real child cards with level/subject/teacher, progress bars, plan chips, per-child drill-down. |
| B5 | Teacher home | `LEG/teacher/screenshots/teacher-home-full.png` — salary card (997.00 EGP, fines/bonus) + one classes table with 3 colored action pills per row | `CUR/teacher-portal__ar__light__desktop.png` | Teal teaching cockpit: identity hero, day rail with student counts (٢٠/١٨), REAL follow-ups from session records (غياب الطالب/غياب المعلم), prepare→attend→record→review flow strip, honest gates. The missing salary card is the pay-free LAW (intentional exclusion, not a gap). Row-action-pill clutter (legacy weakness #1 in `DOC/03-visual-patterns.md`) is gone. |
| B6 | Teacher/library content | `LEG/teacher/screenshots/teacher-library-full.png` — decorative banner + empty "All Categories" card | `CUR/student-materials__ar__light__desktop.png`, `CUR/family-materials__ar__light__desktop.png` | Real per-subject / per-child material lists with type chips (PDF/فيديو/ورقة عمل) and honest download gate. |
| B7 | Admin finance | `LEG/admin/screenshots/management-accounting-full.png` — all-zero KPI tiles + five empty ApexCharts | `CUR/finance__ar__light__desktop.png` | Authored invoice ledger (status chips مدفوعة/غير مدفوعة/متأخرة/ملغاة), payments log, and gated capability cards for the salary/payout family — informative instead of zero-filled. |
| B8 | Admin dashboard | `REF/academy-dashboard.png` (approved reference), `DOC/03-visual-patterns.md` weaknesses #6/#10 (bare empty states, no loading affordance) | `CUR/dashboard__ar__light__desktop.png` | Live cockpit: greeting hero with real date, KPI tiles with mini trends, filterable sessions table, week-ahead rail, families follow-up band, reports hub, and a deliberate UI-states section (skeleton / error+retry / empty+CTA) — directly fixes the legacy weaknesses. Matches the approved design reference. |
| B9 | RTL Arabic-first | `DOC/03-screenshot-review.md` ("RTL never exercised", Arabic content inside LTR shell — `LEG/family/screenshots/student-home-full.png`) | every `CUR/*__ar__*` capture + `CUR/family-portal__en__light__desktop.png` etc. | Full mirrored RTL shell with Arabic-Indic numerals AND a clean LTR English build — legacy never shipped an RTL shell at all. |
| B10 | Dark mode | Legacy dark existed only as an unverified toggle (`DOC/14-design-system-direction-v2.md`) | `CUR/family-portal__ar__dark__desktop.png`, `CUR/teacher-portal__ar__dark__desktop.png`, `CUR/student-portal__ar__dark__desktop.png`, `CUR/families__ar__dark__desktop.png`, `CUR/reports__ar__dark__desktop.png`, `CUR/family-billing__ar__dark__desktop.png` | Consistent dark theme across roles with legible chips and progress bars. |
| B11 | Role hub + honest role model | legacy = three separate logins, no hub (`DOC/03-screenshot-review.md`) | `CUR/portals__ar__light__desktop.png` vs `CUR/before-022/portals__ar__light__desktop.png` | Hub now tells the truth: 2 primary roles (family/teacher) + admin + demoted «عرض الابن — معاينة» row; the fake "student role" card from before-022 is gone (Spec 021 DEC-001). |
| B12 | Living rework itself (before→after 022) | `CUR/before-022/family-portal__ar__light__desktop.png`, `before-022/teacher-portal__ar__light__desktop.png`, `before-022/student-portal__ar__light__desktop.png` | items 3/5/7 above | KPI-tile row replaced by identity hero with contextual counters; flow strip replaces static checklist card (teacher); the ONE sanctioned fold-point link added on family-child (`CUR/family-child__ar__light__desktop.png` top card vs `CUR/before-022/family-child__ar__light__desktop.png` which lacks it). |

## 2) What is still WEAKER than legacy

| # | Area | Legacy evidence | Current evidence | Judgment |
|---|------|-----------------|------------------|----------|
| W1 | Analytics/chart depth | `LEG/admin/screenshots/management-accounting-full.png` (ApexCharts line/donut, per-metric charts), `DOC/03-screenshot-review.md` archetype 4 (KPI + charts + world map) | `CUR/reports__ar__dark__desktop.png`, `CUR/finance__ar__light__desktop.png` | Legacy offered chart-based analytics; the rebuild has none. This is the **no-chart-engine LAW** (intentional), and the reports hub covers the capability with counts + gates — but visually the reports center is a static card/summary gallery where legacy had (mostly empty) charts. Any future uplift must stay chart-free (authored trend glyphs only, like the admin dashboard KPI tiles). |
| W2 | Week-at-a-glance grid | `LEG/family/screenshots/student-timetable-full.png` — true 7-column weekly grid (empty but structurally a grid); legacy also had an all-teachers timetable (`DOC/03-screenshot-review.md` archetype 7) | `CUR/family-schedule__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png` | Family/child schedule is a stacked day list; you cannot scan a whole week horizontally. (The admin side does have timetable views — not the family side.) Better on mobile, weaker for desktop scanning. Candidate for a compact week strip, not a full grid clone. |
| W3 | Teacher internal surface area | `LEG/teacher/screenshots/teacher-home-full.png` + teacher sidebar (Chat/Schedule/Students/Library/Tasks) | `CUR/teacher-portal__ar__light__desktop.png` sidebar — every item except الرئيسية is a «قريبًا» pill; same in `CUR/teacher-portal__ar__light__mobile__drawer-open.png` | Legacy teachers had real (if thin) Schedule/Students/Library pages; the rebuilt teacher role still has only the home. Sequenced work (Spec 025), honest gating — but today the teacher role is visually the thinnest of the three. |
| W4 | Communication (chat) | `LEG/teacher/screenshots/teacher-home-full.png` sidebar "Chat" | admin sidebar «المحادثات قريبًا» in `CUR/dashboard__ar__light__desktop.png` | Chat exists only as a planned gate. backendRequired — intentional, but a visible capability presence gap vs legacy. |

Notes: salary/pay surfaces (legacy teacher salary card, salary reports) and computed-score UI are
NOT listed as weaknesses — they are law-mandated exclusions (teacher pay-free global, zero pay
figures, no score engines).

## 3) Which pages still feel STATIC (card-gallery) vs the 022 living primitives

Reference for "living" = idHero / dayRail / storyRow / flowStrip / guidePanel, all visible on the
three role homes (`CUR/family-portal__ar__light__desktop.png`,
`CUR/teacher-portal__ar__light__desktop.png`, `CUR/student-portal__ar__light__desktop.png`).

| Page | Evidence | Verdict |
|------|----------|---------|
| family-children | `CUR/family-children__ar__light__desktop.png` | STATIC card gallery. No hero, no story numbers; opens with a single count card that is ~85% empty. The five child cards are good but inert (no "today" tag, no now/next pulse). |
| family-requests | `CUR/family-requests__ar__light__desktop.png` | STATIC gate gallery. Two big near-empty count cards up top; the rest is guide panels — honest but flat. Its one delight: the «لا توجد لقاءات مجدولة — كل شيء على ما يرام» empty state. |
| family-materials | `CUR/family-materials__ar__light__desktop.png` | STATIC flat list (title + type chip per row). Acceptable for a content page; zero living touches. |
| family-profile | `CUR/family-profile__ar__light__desktop.png` | STATIC data sheet + gates. Fine as-is; lowest priority. |
| family-billing | `CUR/family-billing__ar__light__desktop.png` | SEMI-living (status chips, quota numbers) but composed as a card gallery; hour-balance tiles are the emptiest cards in the family app. |
| family-progress | `CUR/family-progress__ar__light__desktop.png` | SEMI-living (per-child حضر/قادمة chips + teacher notes = storyRow-like), but the 3-tile KPI band is static and empty-heavy. |
| family-child | `CUR/family-child__ar__light__desktop.png` | SEMI-living: has the fold-point card, «جارية الآن» day item, progress bar, teacher note. KPI tiles (حضر/قادمة/غياب) are ~80% empty; no rail treatment on «اليوم والقادم». |
| student-schedule | `CUR/student-schedule__ar__light__desktop.png` | SEMI-living (day chips + rest-day delight) but day-rail cards are largely empty (see D1). |
| student-homework | `CUR/student-homework__ar__light__desktop.png` | SEMI-living status-first sections (بانتظار الإنجاز/قيد العمل/تمت مراجعتها) — good bones; the 3 KPI tiles are empty-heavy. |
| student-progress | `CUR/student-progress__ar__light__desktop.png` | Most LIVING internal page: وسام badges, gradient «نجوم مجموعتي» celebration cards, next-step lines. Model for the others. |
| student-materials / student-history / student-profile | `CUR/student-materials__ar__light__desktop.png`, `CUR/student-history__ar__light__desktop.png`, `CUR/student-profile__ar__light__desktop.png` | STATIC lists/sheets. History at least carries narrative teacher summaries. |
| Admin dashboard | `CUR/dashboard__ar__light__desktop.png` | LIVING already (hero + trends + now-filter + week rail + follow-up band + UI states). |
| Admin families/students/sessions/attendance | `CUR/families__ar__light__desktop.png`, `CUR/students__ar__light__desktop.png`, `CUR/sessions__ar__light__desktop.png`, `CUR/attendance__ar__light__desktop.png` | Dense workbenches — appropriate register for admin; not a defect. |
| Admin reports / finance capability sections | `CUR/reports__ar__dark__desktop.png`, `CUR/finance__ar__light__desktop.png` (bottom «الرواتب والحسابات» grid) | STATIC gate galleries; acceptable (honesty first), could gain per-card counts/last-activity lines later. |

## 4) Pages needing living-design uplift / hierarchy fixes / delight / density work

Recurring density defects (the single biggest visual-quality theme):

- **D1 — Day-rail cards are 60–70% empty.** The session card puts time+title+chips at the start
  edge and leaves a huge blank field. Visible on ALL rails: `CUR/teacher-portal__ar__light__desktop.png`
  («جدول اليوم» cards), `CUR/student-portal__ar__light__desktop.png` («تعلّمي اليوم»),
  `CUR/family-portal__ar__light__desktop.png` («جلسات اليوم»),
  `CUR/student-schedule__ar__light__desktop.png`, `CUR/family-schedule__ar__light__desktop.png`,
  and dark variants (`CUR/teacher-portal__ar__dark__desktop.png`). Ironically the BEFORE version
  packed more into these cards (student counts + «التحضير المقترح» prep hint on
  `CUR/before-022/teacher-portal__ar__light__desktop.png`). Uplift: reintroduce the second content
  column (teacher prep hint / child avatar+name / hall + join-gate note) or cap card width.
- **D2 — Stat/KPI tiles are number-plus-void.** Icon+number cluster at one edge, label below, rest
  empty: `CUR/family-billing__ar__light__desktop.png` (رصيد الساعات),
  `CUR/family-progress__ar__light__desktop.png` (ملخّص العائلة),
  `CUR/family-child__ar__light__desktop.png` (الحضور والتقدّم),
  `CUR/family-children__ar__light__desktop.png` (the lone «٥ أبناء» card),
  `CUR/family-requests__ar__light__desktop.png` (أنواع الطلبات/طلبات مفتوحة),
  `CUR/student-homework__ar__light__desktop.png` (نظرة سريعة). Uplift: compact tile variant
  (auto-height, inline icon+number+label) or merge counters into the section header line, as the
  022 idHero already does.
- **D3 — Weekly strip card underfilled.** «أسبوعي وسجلّي» is a full-width gradient card holding
  only 3 small day chips: `CUR/student-portal__ar__light__desktop.png`,
  `CUR/student-portal__ar__dark__desktop.png`. Uplift: 7 day cells with counts (rest days dimmed)
  — a mini week strip that also answers W2.
- **D4 — family-schedule weekly section is asymmetric.** Day groups render as single ~45%-width
  cards hugging one edge, with a floating «التالي» card and dead space:
  `CUR/family-schedule__ar__light__desktop.png`. Uplift: full-width day rows or a 2-col day grid.
- **D5 — Hub grid leaves an empty slot.** With the student card demoted, the 2 primary cards sit
  in a 3-column row leaving the third column empty: `CUR/portals__ar__light__desktop.png`.
  Uplift: 2-up centered/spanning layout for the primary row.
- **D6 — Mobile long-scroll + brand wrap.** Family home mobile is ~5,572px tall
  (`CUR/family-portal__ar__light__mobile.png`); topbar brand block wraps awkwardly on mobile
  (`CUR/teacher-portal__ar__light__mobile.png`, `CUR/student-portal__ar__light__mobile.png` —
  «بوابة المعلم»/«عرض الابن» wraps under the brand while the greeting crowds it). Uplift: tighter
  mobile topbar; consider collapsing quick-links on mobile.
- **D7 — Hero wash nearly invisible in dark.** The idHero identity gradient that defines each
  role's color story reads as flat charcoal in dark mode:
  `CUR/family-portal__ar__dark__desktop.png`, `CUR/student-portal__ar__dark__desktop.png`
  (teacher keeps a faint teal: `CUR/teacher-portal__ar__dark__desktop.png`). Uplift: stronger
  role-tinted dark wash tokens (still reduced-motion-safe, pure CSS).

Delight gaps (joy layer uneven):

- Student side has it (وسام/نجوم مجموعتي celebration cards — `CUR/student-progress__ar__light__desktop.png`;
  rest-day sparkles — `CUR/student-schedule__ar__light__desktop.png`).
- Family internals are dry by comparison: billing/profile/materials have zero joy moments
  (`CUR/family-billing__ar__light__desktop.png`, `CUR/family-profile__ar__light__desktop.png`,
  `CUR/family-materials__ar__light__desktop.png`) while the guardian home got the living layer.
  Small wins: celebrate «جميع الفواتير مسوّاة», give each child card a "streak/last note" line.
- Teacher home could celebrate «بقية طلابك على المسار الصحيح» more warmly
  (`CUR/teacher-portal__ar__light__desktop.png` — currently a thin strip).

## 5) Mobile / Dark / RTL / LTR observations

- **Mobile (AR):** clean single-column stacking; the native `details` drawer works and shows the
  full ROLE_NAV with honest «قريبًا» pills (`CUR/teacher-portal__ar__light__mobile__drawer-open.png`).
  Child cards, rails, and gates all remain legible (`CUR/family-portal__ar__light__mobile.png`,
  `CUR/student-portal__ar__light__mobile.png`, `CUR/family-children__ar__light__mobile.png`,
  `CUR/family-child__ar__light__mobile.png`). Admin mobile keeps the whole cockpit usable
  (`CUR/dashboard__ar__light__mobile.png`) and attendance mobile stacks result cards well
  (`CUR/attendance__ar__light__mobile.png`). Defects: D6 brand-wrap + page length; admin mobile
  dashboard is ~10,304px tall (acceptable for admin, worth a jump-nav later).
- **Dark:** consistent surfaces, chips keep icon+text and readable tints across
  `CUR/family-portal__ar__dark__desktop.png`, `CUR/teacher-portal__ar__dark__desktop.png`,
  `CUR/student-portal__ar__dark__desktop.png`, `CUR/families__ar__dark__desktop.png`,
  `CUR/reports__ar__dark__desktop.png`, `CUR/family-billing__ar__dark__desktop.png`. Progress
  tracks and the amber gate bars remain visible. Defect: D7 (hero wash flattens).
- **RTL (AR):** correct end-to-end mirroring — sidebars on the right, chevrons/arrows flipped,
  progress bars fill right-to-left, Arabic-Indic numerals used consistently (e.g. ٪٧٨ in
  `CUR/family-portal__ar__light__desktop.png`). This was never achieved in legacy
  (`LEG/family/screenshots/student-home-full.png` shows Arabic text inside an LTR shell).
- **LTR (EN):** genuine mirrored build, not a translation overlay: layout flips cleanly, English
  copy is idiomatic ("Your family today at a glance", "Backend required"), Latin numerals used
  (`CUR/family-portal__en__light__desktop.png`, `CUR/teacher-portal__en__light__desktop.png`,
  `CUR/student-portal__en__light__desktop.png` — the latter correctly says "Child view / Family
  child" per the corrected role model).
- **Role-model copy note:** the child-view shell says «عرض الابن»/«ابن العائلة» while the frozen
  `#page-body` footers still say «لوحة الطالب — النسخة الأولى»
  (`CUR/student-schedule__ar__light__desktop.png`, `CUR/student-homework__ar__light__desktop.png`).
  This is the DELIBERATE Spec-022 byte-freeze of the six student modules, not a bug — but it is a
  visible wording inconsistency to schedule for relabeling (with hash supersession) in Spec 024.

## 6) Ranked design-quality register (draft)

| Rank | Page(s) | Current state (evidence) | Gap | Severity | Proposed uplift | Owner spec |
|------|---------|--------------------------|-----|----------|-----------------|------------|
| 1 | All day rails: 3 role homes + family-schedule + student-schedule + family-child | `CUR/teacher-portal__ar__light__desktop.png`, `CUR/student-portal__ar__light__desktop.png`, `CUR/family-portal__ar__light__desktop.png`, `CUR/family-schedule__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png`, `CUR/family-child__ar__light__desktop.png` | Rail cards ~60–70% empty; before-022 teacher cards were richer (`CUR/before-022/teacher-portal__ar__light__desktop.png`) | HIGH (visual) | Re-add a second content column per session card (prep hint / child avatar / capacity / join-gate note) or cap card width; keep pulse/dim states | 024 |
| 2 | Teacher role internals (whole nav is «قريبًا») | `CUR/teacher-portal__ar__light__mobile__drawer-open.png`, `CUR/teacher-portal__ar__light__desktop.png` | Thinnest role; legacy had real pages (`LEG/teacher/screenshots/teacher-home-full.png` sidebar) | HIGH (coverage, already sequenced) | Build the 6 teacher internals living-first (rail + flowStrip on schedule/outcomes) | 025 |
| 3 | family-children | `CUR/family-children__ar__light__desktop.png` | Static gallery; empty count card; no now/next context | MED-HIGH | Adopt storyRow layout + «اليوم: …» tag per child; compact the count into the section header | 024 |
| 4 | Stat tiles family-wide + student-homework + family-child | see D2 evidence list | Number-plus-void tiles repeat on 6 pages | MED-HIGH | Compact stat-tile variant or inline header counters (pattern already proven by idHero) | 024 |
| 5 | idHero dark wash | `CUR/family-portal__ar__dark__desktop.png`, `CUR/student-portal__ar__dark__desktop.png` | Role color identity lost in dark | MED | Stronger role-tinted dark gradient tokens in the additive living CSS layer | 024 |
| 6 | family-schedule weekly layout | `CUR/family-schedule__ar__light__desktop.png` | Asymmetric half-width day cards + floating «التالي» | MED | Full-width day rows or 2-col day grid; align «التالي» into the rail | 024 |
| 7 | Portals hub primary row | `CUR/portals__ar__light__desktop.png` | Empty third grid slot after the student-card demotion | MED | 2-up centered primary row; keep admin + preview rows as-is | 024 |
| 8 | Weekly strip on student/child home | `CUR/student-portal__ar__light__desktop.png` | Full-width card holds 3 chips; also the only week-at-a-glance surface (cf. legacy grid `LEG/family/screenshots/student-timetable-full.png`) | MED | 7-cell mini week strip with counts, rest days dimmed | 024 |
| 9 | Child-view body wording «لوحة الطالب» | `CUR/student-homework__ar__light__desktop.png` (footer note) | Shell says «عرض الابن», bodies say «الطالب» (intentional 022 freeze) | MED (copy consistency) | Relabel the six module footers under a declared hash supersession | 024 |
| 10 | family-requests | `CUR/family-requests__ar__light__desktop.png` | Static gate gallery, empty count cards | LOW-MED | Compact counters; add request-type icon rows with last-update lines | 024 |
| 11 | Family internals delight | `CUR/family-billing__ar__light__desktop.png`, `CUR/family-profile__ar__light__desktop.png`, `CUR/family-materials__ar__light__desktop.png` | Joy layer absent outside home (student side has وسام cards — `CUR/student-progress__ar__light__desktop.png`) | LOW-MED | Celebrate «جميع الفواتير مسوّاة»; add per-child accent to materials; keep pure CSS | 024 |
| 12 | Mobile topbar + page length | `CUR/teacher-portal__ar__light__mobile.png`, `CUR/family-portal__ar__light__mobile.png`, `CUR/dashboard__ar__light__mobile.png` | Brand wrap; 5.5k–10k px scrolls | LOW | Tighten mobile topbar; optional in-page jump nav for admin mobile | 024 / 026–031 (admin) |
| 13 | Reports/finance capability sections | `CUR/reports__ar__dark__desktop.png`, `CUR/finance__ar__light__desktop.png` | Static gate galleries (chart-free by LAW) | LOW | Add authored counts/last-activity lines per capability card; never charts | 026–031 |
| 14 | Static content pages (student-materials/history/profile, family-profile) | `CUR/student-materials__ar__light__desktop.png`, `CUR/student-history__ar__light__desktop.png`, `CUR/student-profile__ar__light__desktop.png` | Flat but functional | LOW | Optional light touches only; do not over-design data sheets | later / 032 QA |

## Risks, gaps, and proposed corrections

1. **Risk — the rail regression hides real content.** Spec 022's rail visually DROPPED the
   teacher prep-hint and per-session student counts that the before-022 home showed
   (`CUR/before-022/teacher-portal__ar__light__desktop.png` vs
   `CUR/teacher-portal__ar__light__desktop.png` — counts survive only as small chips; the
   «التحضير المقترح» text is gone from the rail). If that copy was deleted rather than moved, it
   violates the no-deletion preference; Spec 024 should restore it inside the rail card body
   (which also fixes D1). Verify against the 022 contracts before relabeling anything.
2. **Risk — uplift vs byte-freeze collision.** Ranks 3/4/8/9 touch family internals and the six
   frozen student modules whose `#page-body` hashes are pinned by the 020/022 smoke. Every fix
   needs a declared hash-supersession (the family-child precedent from 022) — otherwise the smoke
   will (correctly) fail. Plan the amendments, never bypass the asserts.
3. **Risk — dark-mode hero fix must stay inside the additive living CSS layer** and the single
   `prefers-reduced-motion` quarantine block; no new hooks/keys (closed set law).
4. **Gap — week-at-a-glance (W2) and chat/analytics presence (W1/W4)** remain the only places
   legacy is visually ahead; all are either law-bound (charts) or sequenced (chat backendRequired,
   teacher pages 025, admin groups 026–031). Record them in the coverage register so 032 QA can
   verify none silently disappears.
5. **Gap — no current teacher-internal or admin-timetable screenshots were reviewable for this
   audit's uplift ranks 2/12 beyond the home/drawer evidence**; when Spec 025/026 land, re-run
   this visual pass on those new surfaces (same method) before closing the register rows.
6. **Overall verdict:** after Spec 022 the rebuild is decisively ahead of legacy on every opened
   surface pair (legacy's role homes were near-empty shells — see B1–B7). The remaining
   design-quality debt is concentrated in ONE repeated pattern (empty-heavy cards: D1/D2/D3) plus
   dark-hero tinting; a single focused Spec-024 visual-density pass on the shared living CSS layer
   would resolve ranks 1, 3–8 together with low regression risk.
