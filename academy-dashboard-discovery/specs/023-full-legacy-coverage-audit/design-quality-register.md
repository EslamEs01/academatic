# Design Quality Register — Spec 023 Full Legacy Coverage Audit 000–022

- **Title**: Design / UX / living-dashboard quality register (post-Spec-022 rebuild vs legacy)
- **Audit date**: 2026-07-06 (per `agent-findings/00-main-session-grounding.md`; the task brief left the date undefined)
- **Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`; Specs 020/021/022 committed; **77** public HTML files (`app/public/*.html`, ar RTL default + `.en` LTR pairs)
- **Inputs used** (all under `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/`):
  - `08-design-ux-audit.md` — PRIMARY (47 current + 9 legacy/reference screenshots opened + 3 legacy visual docs)
  - `00-main-session-grounding.md` — main-session grounding sample + confirmed finding **F-00-1** (file:line evidence)
  - `02-legacy-screenshots-admin.md`, `02-legacy-screenshots-family.md`, `02-legacy-screenshots-teacher.md` — legacy visual notes (pay-surface exclusion evidence; empty-fixture caveats; broken legacy pages)
- **Screenshot path roots** (abbreviations used below; expand to absolute paths):
  - `CUR/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/screenshots/`
  - `LEG/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/output/roles/`
  - `REF/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/design-references/`
  - `APP/` = `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app/`

**Standing law applied to every judgment**: legacy is a capability checklist, not a pixel-clone
target. Teacher surfaces pay-free GLOBALLY; family zero-pay (status-first, hour-quota); no
chart/score/rank engines anywhere; honest gates only; static HTML-first, closed hook set. Where the
rebuild "lacks" a legacy element because of a law, it is an **intentional exclusion** and is NOT
registered as a design gap (the exclusions themselves are itemized in §2 notes). All uplift
proposals below are pure-CSS/static, no JS animation engines, `prefers-reduced-motion` honored
inside the single existing quarantine block, no new hooks/keys.

---

## 1) What is now BETTER than legacy

All rows carry both-side screenshot evidence (source: `08-design-ux-audit.md` §1, corroborated by
`00-main-session-grounding.md` obs. 1–8).

| # | Area | Legacy evidence | Current evidence | Why better |
|---|------|-----------------|------------------|------------|
| B1 | Family home | `LEG/family/screenshots/student-home-full.png` (LTR-only shell, Arabic name inside English UI, all-zero hero KPIs, pink empty banners) | `CUR/family-portal__ar__light__desktop.png` | Violet guardian cockpit: idHero with 3 truthful counters, living day rail («جارية الآن» pulse), 5 child story rows with real drill links, honest gates. Legacy guardian home was effectively an empty shell. |
| B2 | Family billing | `LEG/family/screenshots/student-billing-full.png` (empty table, header row only) | `CUR/family-billing__ar__light__desktop.png` | Status-first billing: hour quota 40/12/28, per-child subscription status, amount-free invoice history — more usable information than legacy while holding the zero-pay law. |
| B3 | Schedules | `LEG/family/screenshots/student-timetable-full.png` (empty 7-col grid, zero sessions) | `CUR/family-schedule__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png` | Day-grouped rails with child tags, status chips, and delightful rest-day empty states vs a bare empty grid. |
| B4 | Children directory | `LEG/family/screenshots/student-studentslist-full.png` (one-row table + "not have any courses" chip) | `CUR/family-children__ar__light__desktop.png` | Five real child cards with level/subject/teacher, progress bars, per-child drill-down. |
| B5 | Teacher home | `LEG/teacher/screenshots/teacher-home-full.png` (salary band 997.00 EGP + one classes table with 3 action pills/row) | `CUR/teacher-portal__ar__light__desktop.png` | Teal teaching cockpit: idHero, day rail with student counts, REAL follow-ups from session records, prepare→attend→record→review flowStrip, honest gates. Missing salary band = pay-free LAW (intentional exclusion). Legacy row-pill clutter gone. |
| B6 | Learning materials | `LEG/teacher/screenshots/teacher-library-full.png` (decorative banner + empty categories card) | `CUR/student-materials__ar__light__desktop.png`, `CUR/family-materials__ar__light__desktop.png` | Real per-subject/per-child material lists with type chips and honest download gate. |
| B7 | Admin finance | `LEG/admin/screenshots/management-accounting-full.png` (all-zero KPIs + five empty ApexCharts) | `CUR/finance__ar__light__desktop.png` | Authored invoice ledger with status chips + payments log + gated salary/payout capability cards — informative instead of zero-filled (admin invoice amounts sanctioned per Spec 009-invariant scope). |
| B8 | Admin dashboard | `REF/academy-dashboard.png` + legacy weaknesses #6/#10 in `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/frontend-planning-deep/03-visual-patterns.md` | `CUR/dashboard__ar__light__desktop.png` | Live cockpit with greeting hero, KPI trends, filterable sessions, week rail, follow-up band, and a deliberate UI-states section (skeleton/error/empty) — directly fixes legacy's bare empty states. |
| B9 | RTL Arabic-first | `LEG/family/screenshots/student-home-full.png` (Arabic content inside an LTR shell; RTL never shipped in legacy) | every `CUR/*__ar__*` capture, e.g. `CUR/family-portal__ar__light__desktop.png` | Full mirrored RTL shell + Arabic-Indic numerals + a genuine LTR English build (`CUR/family-portal__en__light__desktop.png`). |
| B10 | Dark mode | legacy dark = unverified toggle only (`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/frontend-planning-deep/14-design-system-direction-v2.md`) | `CUR/family-portal__ar__dark__desktop.png`, `CUR/teacher-portal__ar__dark__desktop.png`, `CUR/families__ar__dark__desktop.png`, `CUR/reports__ar__dark__desktop.png`, `CUR/family-billing__ar__dark__desktop.png` | Consistent dark theme across roles, chips stay icon+text legible. (One defect: D-06 hero wash.) |
| B11 | Honest role model | legacy = three separate logins, no hub (`02-legacy-screenshots-family.md` §Cross-page role-model evidence) | `CUR/portals__ar__light__desktop.png` vs `CUR/before-022/portals__ar__light__desktop.png` | Hub tells the truth: 2 primary roles + admin + demoted «عرض الابن — معاينة» row; the fake student-role card is gone (Spec 021 DEC-001). |
| B12 | Living rework (before→after 022) | `CUR/before-022/family-portal__ar__light__desktop.png`, `CUR/before-022/teacher-portal__ar__light__desktop.png`, `CUR/before-022/student-portal__ar__light__desktop.png` | `CUR/family-portal__ar__light__desktop.png`, `CUR/teacher-portal__ar__light__desktop.png`, `CUR/student-portal__ar__light__desktop.png` | KPI-tile rows replaced by identity heroes with contextual counters; flowStrip replaces the static checklist; sanctioned fold-point link on family-child (`CUR/family-child__ar__light__desktop.png`). |

## 2) What is still WEAKER than legacy

Source: `08-design-ux-audit.md` §2, cross-checked against the 02 legacy files. **Intentional
exclusions are excluded from this list** — specifically the four legacy teacher pay surfaces
(home salary band, `/teacher/update-result`, `/teacher/salary`, `/teacher/salary-class-report` —
precise evidence in `02-legacy-screenshots-teacher.md` §"Legacy TEACHER pay/finance surfaces"),
the family billing Amount column (`02-legacy-screenshots-family.md` §"Pay/currency figures"), and
all chart/score/rank UI (no-engine law).

| # | Area | Legacy evidence | Current evidence | Judgment |
|---|------|-----------------|------------------|----------|
| W1 | Analytics/chart depth | `LEG/admin/screenshots/management-accounting-full.png` (ApexCharts line/donut) | `CUR/reports__ar__dark__desktop.png`, `CUR/finance__ar__light__desktop.png` | Law-bound (no chart engines) and legacy charts were mostly empty — but visually the reports center is a static card/summary gallery. Any uplift must stay chart-free (authored trend glyphs only). → D-14. |
| W2 | Week-at-a-glance | `LEG/family/screenshots/student-timetable-full.png` (true 7-column week grid, though empty) | `CUR/family-schedule__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png` | Family/child schedules are stacked day lists; a whole week cannot be scanned horizontally on desktop. Candidate for a compact CSS week strip, not a grid clone. → D-09. |
| W3 | Teacher internal surface area | `LEG/teacher/screenshots/teacher-home-full.png` sidebar (Chat/Schedule/Students/Library/Tasks — real if thin pages) | `CUR/teacher-portal__ar__light__desktop.png`, `CUR/teacher-portal__ar__light__mobile__drawer-open.png` (every nav item except الرئيسية is «قريبًا») | Honest gating, already sequenced as Spec 025 — but today the teacher role is visually the thinnest of the three. → D-03. |
| W4 | Communication (chat) | `LEG/teacher/screenshots/teacher-home-full.png` sidebar "Chat" | `CUR/dashboard__ar__light__desktop.png` («المحادثات قريبًا») | backendRequired — intentional, but a visible capability-presence gap vs legacy; recorded so 032 QA can verify it never silently disappears. |

Caveat from the legacy side (`02-legacy-screenshots-family.md` risks 2–3): nearly all legacy
family/teacher tables were captured EMPTY (zero-course fixture account), so legacy's populated-state
rendering was never observed — no rebuilt page should ever be judged against an imagined populated
legacy state, and no "pixel match" claims are possible.

## 3) Which pages still feel STATIC (vs the 022 living primitives)

Reference for "living" = idHero / dayRail / storyRow / flowStrip / guidePanel on the three role
homes. Source: `08-design-ux-audit.md` §3.

- **STATIC (card/gate galleries, no living touches)**: `family-children`
  (`CUR/family-children__ar__light__desktop.png` — inert child cards, near-empty count card),
  `family-requests` (`CUR/family-requests__ar__light__desktop.png`), `family-materials`
  (`CUR/family-materials__ar__light__desktop.png`), `family-profile`
  (`CUR/family-profile__ar__light__desktop.png`), `student-materials` / `student-history` /
  `student-profile` (`CUR/student-materials__ar__light__desktop.png`,
  `CUR/student-history__ar__light__desktop.png`, `CUR/student-profile__ar__light__desktop.png`),
  admin reports/finance capability sections (`CUR/reports__ar__dark__desktop.png`,
  `CUR/finance__ar__light__desktop.png` bottom grid — acceptable, honesty-first).
- **SEMI-LIVING (good bones, empty-heavy)**: `family-billing`
  (`CUR/family-billing__ar__light__desktop.png`), `family-progress`
  (`CUR/family-progress__ar__light__desktop.png`), `family-child`
  (`CUR/family-child__ar__light__desktop.png`), `student-schedule`
  (`CUR/student-schedule__ar__light__desktop.png`), `student-homework`
  (`CUR/student-homework__ar__light__desktop.png`).
- **ALREADY LIVING (models to copy)**: the three role homes, `student-progress`
  (`CUR/student-progress__ar__light__desktop.png` — وسام badges + «نجوم مجموعتي» celebration
  cards; the model internal page), admin dashboard (`CUR/dashboard__ar__light__desktop.png`).
- **Dense admin workbenches** (`CUR/families__ar__light__desktop.png`,
  `CUR/students__ar__light__desktop.png`, `CUR/sessions__ar__light__desktop.png`,
  `CUR/attendance__ar__light__desktop.png`) are the appropriate register for admin — NOT defects.

## 4) Which pages need LIVING-DESIGN uplift later

Ordered by payoff (details in the register table): (1) all day rails — role homes +
family-schedule + student-schedule + family-child (D-01); (2) family-children → storyRow layout
with per-child «اليوم:» context (D-04); (3) the six teacher internals when built in Spec 025 —
living-first, rail + flowStrip on schedule/outcomes (D-03); (4) student/child weekly strip → 7-cell
mini week (D-09); (5) family-requests compact counters + request-type rows (D-10); (6)
reports/finance capability cards → authored counts/last-activity lines, never charts (D-14).
Static data sheets (family-profile, student-profile/materials/history) deliberately stay light —
do not over-design (D-15).

## 5) Which pages need VISUAL-HIERARCHY improvements

- `family-schedule` — asymmetric ~45%-width day cards + floating «التالي» card and dead space
  (`CUR/family-schedule__ar__light__desktop.png`) → D-07.
- Portals hub — empty third grid slot in the primary row after the student-card demotion
  (`CUR/portals__ar__light__desktop.png`) → D-08.
- idHero in dark mode — role color identity flattens to charcoal on family/child heroes
  (`CUR/family-portal__ar__dark__desktop.png`, `CUR/student-portal__ar__dark__desktop.png`;
  teacher keeps a faint teal in `CUR/teacher-portal__ar__dark__desktop.png`) → D-06.
- Mobile topbar — brand block wraps awkwardly under the greeting
  (`CUR/teacher-portal__ar__light__mobile.png`, `CUR/student-portal__ar__light__mobile.png`) → D-13.
- Child-view copy hierarchy — shell says «عرض الابن» while frozen `#page-body` footers still say
  «لوحة الطالب — النسخة الأولى» (`CUR/student-homework__ar__light__desktop.png` footer;
  file:line proof in F-00-1) → D-02.

## 6) Which role surfaces need more DELIGHT

The joy layer is uneven (source: `08-design-ux-audit.md` §4 "Delight gaps"):

- **Student/child side HAS it**: وسام / «نجوم مجموعتي» celebration cards
  (`CUR/student-progress__ar__light__desktop.png`), rest-day sparkles
  (`CUR/student-schedule__ar__light__desktop.png`).
- **Family internals are dry**: billing/profile/materials carry zero joy moments
  (`CUR/family-billing__ar__light__desktop.png`, `CUR/family-profile__ar__light__desktop.png`,
  `CUR/family-materials__ar__light__desktop.png`). Small pure-CSS wins: celebrate «جميع الفواتير
  مسوّاة», add a streak/last-note line per child card → D-11.
- **Teacher home** could celebrate «بقية طلابك على المسار الصحيح» more warmly — currently a thin
  strip (`CUR/teacher-portal__ar__light__desktop.png`) → D-12.

## 7) DENSITY problems (too much / too little)

The single biggest visual-quality theme is **too little** — one repeated empty-heavy card pattern
(source: `08-design-ux-audit.md` §4 D1–D7):

- **Too little (empty-heavy)**: day-rail session cards ~60–70% empty on ALL rails (D-01 — the
  before-022 teacher cards were actually richer: student counts + «التحضير المقترح» hint on
  `CUR/before-022/teacher-portal__ar__light__desktop.png`); stat/KPI "number-plus-void" tiles on 6
  pages (D-05); the «أسبوعي وسجلّي» full-width gradient card holding only 3 chips
  (`CUR/student-portal__ar__light__desktop.png`, D-09); family-children's lone «٥ أبناء» count
  card (D-04); family-requests' two near-empty count cards (D-10); the hub's empty grid slot (D-08).
- **Too much (long scroll)**: family home mobile ≈5,572px tall
  (`CUR/family-portal__ar__light__mobile.png`); admin dashboard mobile ≈10,304px
  (`CUR/dashboard__ar__light__mobile.png` — acceptable for admin, jump-nav candidate) → D-13.
- Admin desktop workbench density is appropriate — no "too much" defect on desktop admin.

---

## 8) Ranked design-quality register

Severity scale: HIGH > MED-HIGH > MED > LOW-MED > LOW. All uplifts are pure-CSS/static, honest
gates preserved, motion stays inside the one `prefers-reduced-motion: no-preference` quarantine
block, no new hooks/keys. Rows touching pinned `#page-body` hashes (D-02, D-04, D-05 in part,
D-09) require a **declared hash supersession + smoke re-pin** (the 022 family-child precedent) —
never a bypass.

| ID (D-) | Page | Current state | Gap vs legacy/022 standard | Severity | Proposed uplift | Owner spec |
|---------|------|---------------|----------------------------|----------|-----------------|------------|
| D-01 | All day rails: 3 role homes + family-schedule + student-schedule + family-child — `CUR/teacher-portal__ar__light__desktop.png`, `CUR/student-portal__ar__light__desktop.png`, `CUR/family-portal__ar__light__desktop.png`, `CUR/family-schedule__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png`, `CUR/family-child__ar__light__desktop.png`, dark: `CUR/teacher-portal__ar__dark__desktop.png` | Rail cards put time+title+chips at the start edge, leaving a huge blank field (~60–70% empty) | Below the 022 living standard the rail itself set; before-022 teacher cards were RICHER (`CUR/before-022/teacher-portal__ar__light__desktop.png` — student counts + «التحضير المقترح» prep hint). If that copy was deleted rather than moved, it brushes the no-deletion preference — verify against the 022 contracts before relabeling | HIGH | Re-add a second content column per session card (prep hint / child avatar+name / capacity / join-gate note) or cap card width; keep pulse/dim states; pure CSS layout only | 024 |
| D-02 | 6 of 7 child-view pages: footer note «لوحة الطالب — النسخة الأولى» + «هذه لوحتك الدراسية…» — screenshot: `CUR/student-homework__ar__light__desktop.png`, `CUR/student-schedule__ar__light__desktop.png` (shell vs body contrast); file:line: `APP/src/locales/ar.prt.js:297-298`, `APP/src/locales/en.prt.js:294`, `APP/public/student-portal.html:393`, `student-homework.html:397`, `student-history.html:344`, `student-profile.html:361`, `student-progress.html:409`, `student-materials.html:341` (+ `.en` pairs) | Shell correctly reframed to «عرض الابن»/«ابن العائلة»; frozen `#page-body` footers still use pre-021 Student-primary wording | Contradicts the corrected role model (Spec 021 DEC-001..004) on the visible page; a knowing 022 byte-freeze leftover, now the top child-view correction candidate (**confirmed F-00-1**). Reconciliation note: `08-design-ux-audit.md` ranked this MED (copy consistency); `00-main-session-grounding.md` confirms it with file:line proof and marks it **Must fix in 024** — this register adopts the stronger verdict after opening both files | HIGH (role-model consistency; confirmed) | Reframe `noteT`/`noteD` (ar+en) to guardian-addressed child-view wording, rebake the 5 hash-pinned internals + home, **declare supersession of the 019/022 `#page-body` extraction hashes** and re-pin smoke — ONE sanctioned amendment | 024 (Must fix) |
| D-03 | Teacher role internals (entire ROLE_NAV beyond الرئيسية) — `CUR/teacher-portal__ar__light__desktop.png`, `CUR/teacher-portal__ar__light__mobile__drawer-open.png` | Every nav item is an honest «قريبًا» pill; only the home exists | Thinnest role surface; legacy teachers had real (if thin) Schedule/Students/Library/Tasks pages (`LEG/teacher/screenshots/teacher-home-full.png` sidebar, `LEG/teacher/screenshots/teacher-library-full.png`). Already sequenced — not an accidental gap. Pay surfaces stay excluded by LAW | HIGH (coverage, sequenced) | Build the 6 teacher internals living-first (dayRail on جدولي, flowStrip on نتائج الحصص); pay-free three-layer enforcement from day one | 025 |
| D-04 | family-children — `CUR/family-children__ar__light__desktop.png`, mobile: `CUR/family-children__ar__light__mobile.png` | Static card gallery; lone «٥ أبناء» count card ~85% empty; child cards inert (no today/now-next context) | No living primitives on the family app's main roster page; 022 deliberately did not touch it (per-child child-view links REJECTED as dishonest — that exclusion stands) | MED-HIGH | Adopt storyRow layout + per-child «اليوم: …» tag; fold the count into the section header; NO per-child child-view links (021 ruling holds) | 024 |
| D-05 | Stat/KPI tiles on 6 pages — `CUR/family-billing__ar__light__desktop.png` (رصيد الساعات), `CUR/family-progress__ar__light__desktop.png` (ملخّص العائلة), `CUR/family-child__ar__light__desktop.png` (الحضور والتقدّم), `CUR/family-children__ar__light__desktop.png`, `CUR/family-requests__ar__light__desktop.png`, `CUR/student-homework__ar__light__desktop.png` (نظرة سريعة) | "Number-plus-void" tiles: icon+number at one edge, label below, rest empty | The 022 idHero already proved the compact inline-counter pattern; the internals never received it | MED-HIGH | Compact stat-tile variant (auto-height, inline icon+number+label) or merge counters into section-header lines; hash supersession where bodies are pinned | 024 |
| D-06 | idHero dark wash (family + child-view homes) — `CUR/family-portal__ar__dark__desktop.png`, `CUR/student-portal__ar__dark__desktop.png` (teacher's faint teal survives: `CUR/teacher-portal__ar__dark__desktop.png`) | Role-identity gradient reads as flat charcoal in dark mode | The hero's whole purpose is per-role color story; lost in one of the two themes | MED | Stronger role-tinted dark gradient tokens inside the additive living CSS layer; reduced-motion-safe, no new hooks | 024 |
| D-07 | family-schedule weekly section — `CUR/family-schedule__ar__light__desktop.png` | Day groups render as single ~45%-width cards hugging one edge; «التالي» card floats amid dead space | Asymmetric hierarchy vs the balanced rails on the role homes | MED | Full-width day rows or a 2-column day grid; align «التالي» into the rail | 024 |
| D-08 | Portals hub primary row — `CUR/portals__ar__light__desktop.png` (contrast: `CUR/before-022/portals__ar__light__desktop.png`) | 2 primary cards sit in a 3-column grid, leaving an empty third slot after the student-card demotion | Layout artifact of the (correct) 021/022 role-model change | MED | 2-up centered/spanning primary row; keep admin + demoted-preview rows exactly as-is | 024 |
| D-09 | Weekly strip on student/child home («أسبوعي وسجلّي») — `CUR/student-portal__ar__light__desktop.png`, `CUR/student-portal__ar__dark__desktop.png` | Full-width gradient card holds only 3 small day chips | Underfilled AND it is the only week-at-a-glance surface — legacy had a true 7-column week grid (`LEG/family/screenshots/student-timetable-full.png`), cf. W2 | MED | 7-cell mini week strip with per-day counts, rest days dimmed — answers W2 without cloning the grid; pure CSS | 024 |
| D-10 | family-requests — `CUR/family-requests__ar__light__desktop.png` | Static gate gallery; two near-empty count cards; one good empty state («لا توجد لقاءات مجدولة — كل شيء على ما يرام») | Flat vs the living standard; gates themselves are correct and stay | LOW-MED | Compact counters; request-type icon rows with last-update lines; gates remain honest non-links | 024 |
| D-11 | Family internals delight (billing / profile / materials) — `CUR/family-billing__ar__light__desktop.png`, `CUR/family-profile__ar__light__desktop.png`, `CUR/family-materials__ar__light__desktop.png` | Zero joy moments outside the family home | The student side has the وسام/celebration layer (`CUR/student-progress__ar__light__desktop.png`); family internals got none | LOW-MED | Celebrate «جميع الفواتير مسوّاة»; per-child accent on materials; streak/last-note line per child card; pure CSS, zero-pay wording untouched | 024 |
| D-12 | Teacher home positive-status strip — `CUR/teacher-portal__ar__light__desktop.png` | «بقية طلابك على المسار الصحيح» is a thin plain strip | Joy layer uneven vs the student side; teacher deserves a warm all-clear moment | LOW-MED | Celebration treatment on the all-clear strip (existing lv-* motion vocabulary; reduced-motion honored; pay-free copy only) | 024 |
| D-13 | Mobile topbar + page length — `CUR/teacher-portal__ar__light__mobile.png`, `CUR/student-portal__ar__light__mobile.png` (brand wrap), `CUR/family-portal__ar__light__mobile.png` (≈5,572px), `CUR/dashboard__ar__light__mobile.png` (≈10,304px) | Brand block wraps under the greeting; long single-column scrolls | Mobile polish below the desktop standard; admin length acceptable but unaided | LOW | Tighter mobile topbar (no wrap); consider collapsing quick-links on mobile; optional in-page jump nav for admin mobile | 024 (role) / 026–031 (admin) |
| D-14 | Admin reports + finance capability sections — `CUR/reports__ar__dark__desktop.png`, `CUR/finance__ar__light__desktop.png` (bottom «الرواتب والحسابات» grid) | Static gate galleries | Chart-free by LAW (intentional vs legacy ApexCharts — `LEG/admin/screenshots/management-accounting-full.png`); cards could still inform more | LOW | Authored counts / last-activity lines per capability card; NEVER charts or computed figures | 026–031 |
| D-15 | Static content sheets: student-materials / student-history / student-profile / family-profile — `CUR/student-materials__ar__light__desktop.png`, `CUR/student-history__ar__light__desktop.png`, `CUR/student-profile__ar__light__desktop.png`, `CUR/family-profile__ar__light__desktop.png` | Flat but functional lists/data sheets; history already carries narrative teacher summaries | Lowest-priority distance from the living standard | LOW | Optional light touches only — do NOT over-design data sheets; re-check at final QA | later / 032 QA |

## Cross-cutting risks carried into 024 planning

1. **Rail regression check (D-01)**: confirm whether the before-022 prep-hint/count copy was moved
   or deleted before restoring it (022 contracts at
   `/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/specs/022-living-dashboards-experience-rework/contracts/`).
2. **Uplift vs byte-freeze**: D-02/D-04/D-05/D-09 touch hash-pinned bodies — every fix ships with a
   declared hash supersession + ONE sanctioned smoke amendment; the asserts are never bypassed.
3. **CSS containment**: D-06/D-12 stay inside the additive living CSS layer and the single
   reduced-motion quarantine block; closed hook set holds.
4. **Verdict** (per `08-design-ux-audit.md` §6): the rebuild is decisively ahead of legacy on every
   opened surface pair; remaining debt concentrates in ONE repeated empty-card pattern
   (D-01/D-05/D-09) plus the dark hero — a single focused Spec-024 visual-density pass on the shared
   living CSS layer resolves D-01, D-04–D-09 together with low regression risk.
