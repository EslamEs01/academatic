# Current App Inventory Audit — Spec 023 (Full Legacy Coverage Audit 000–022)

**Title**: Current rebuilt-app inventory audit (public HTML, source modules, nav registries, hub
shape, tests, screenshots, intentional gates)
**Audit date**: 2026-07-06 (per `agent-findings/00-main-session-grounding.md`, "Audit date: 2026-07-06")
**Baseline**: branch `feature/012-role-portal-foundation`, HEAD `837b0c1`, working tree clean at
audit start — Specs 020/021/022 committed; **77** public HTML files on disk
(`agent-findings/00-main-session-grounding.md` §Baseline facts).
**Inputs used**:
- Primary: `academy-dashboard-discovery/specs/023-full-legacy-coverage-audit/agent-findings/04-current-app-inventory.md`
- Cross-checks: `agent-findings/05-admin-coverage.md` (admin nav/finance/settings reads),
  `agent-findings/06-family-child-student-coverage.md` (family/child built-HTML + smoke reads),
  `agent-findings/07-teacher-coverage.md` (teacher built-HTML + pay-free scans + anchor inventory),
  `agent-findings/00-main-session-grounding.md` (grounding sample + confirmed finding F-00-1)
- One underlying evidence file opened directly by this synthesis pass to satisfy the "verbatim"
  requirement (finding 04 paraphrased it):
  `app/src/js/fixtures/portal.js` lines 135–198 (ROLE_NAV + PORTAL_PLANNED, quoted verbatim in §3/§8).

All relative paths below are under
`/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/`.

---

## 1. Public HTML inventory — 77 files, grouped

Source: `agent-findings/04-current-app-inventory.md` §"Public HTML inventory" (derived from
`ls app/public/*.html`); arithmetic re-checked against the build registry
(`app/scripts/build-html.mjs` lines 69–114, 152–169: 38 `PAGES` entries × 2 languages + 1 static
`index.html` redirect = 77).

| Group | Base names | Files |
|---|---|---|
| Index redirect | `index.html` (redirect only, no `.en` pair) | 1 |
| Portals hub | `portals` | 2 |
| Admin console (20 base names × 2) | `dashboard`, `reports`, `gallery`, `sessions`, `schedule`, `students`, `teachers`, `courses`, `settings`, `families`, `add-family`, `family`, `student`, `attendance`, `groups`, `course`, `group`, `teacher`, `teacher-performance`, `finance` | 40 |
| Family portal home + 7 internals | `family-portal`, `family-children`, `family-schedule`, `family-progress`, `family-billing`, `family-requests`, `family-materials`, `family-profile` | 16 |
| Child-view home + 6 internals (demoted student pages) | `student-portal`, `student-schedule`, `student-homework`, `student-materials`, `student-progress`, `student-history`, `student-profile` | 14 |
| Family drill-down | `family-child` | 2 |
| Teacher portal home (only teacher-role page built) | `teacher-portal` | 2 |
| **Total** | | **77** |

Naming-collision warning (finding 04 §Risks, corroborated by finding 07's table which verified the
shells): `student.html` / `family.html` / `teacher.html` are ADMIN profile templates
(`app-shell`, confirmed at `app/public/teacher.html` line 235 per finding 07), distinct from the
portal pages `student-portal.html` / `family-portal.html` / `teacher-portal.html`. Coverage-matrix
authors must not conflate the two families.

## 2. Source page modules — 38 files (`app/src/js/pages/`)

Source: `agent-findings/04-current-app-inventory.md` §"Source page modules". Matches the 38-entry
`PAGES` array in `app/scripts/build-html.mjs` (grep count `base: '` = 38 per finding 04): 20 admin
entries with the default admin shell, 18 portal entries carrying `shell: 'portal'` + `role` +
`personaKey`.

- **Admin (18)**: `add-family.js attendance.js course.js courses.js dashboard.js families.js
  finance.js gallery.js group.js groups.js reports.js schedule.js sessions.js settings.js
  students.js teacher.js teacher-performance.js teachers.js`
- **Admin profile twins listed under role prefixes (2)**: `family.js` (admin family profile),
  `student.js` (admin student profile) — counted inside finding 04's family/student groupings but
  functionally admin (see collision warning above).
- **Portal hub (1)**: `portals.js`
- **Family portal (9)**: `family-portal.js family-children.js family-schedule.js
  family-progress.js family-billing.js family-requests.js family-materials.js family-profile.js
  family-child.js`
- **Child-view / student (7)**: `student-portal.js student-schedule.js student-homework.js
  student-materials.js student-progress.js student-history.js student-profile.js`
- **Teacher portal (1)**: `teacher-portal.js`

Total 18 + 2 + 1 + 9 + 7 + 1 = 38. Supporting trees (finding 04 evidence list): 52 component
modules in `app/src/js/components/` (incl. `portal-page.js`, `portal-shell.js`), 17 fixture
modules in `app/src/js/fixtures/`, 16 locale modules in `app/src/locales/` (incl.
`ar.prt.js`/`en.prt.js`).

## 3. ROLE_NAV registries — VERBATIM

Quoted directly from `app/src/js/fixtures/portal.js` lines 139–168 (opened by this synthesis pass;
finding 04 §ROLE_NAV had paraphrased the same lines — no conflict found):

```js
export const ROLE_NAV = {
  student: [
    { id: 'home', labelKey: 'prt.nav.stu.home', icon: 'home', page: 'student-portal', status: 'implemented' },
    { id: 'schedule', labelKey: 'prt.nav.stu.schedule', icon: 'schedule', page: 'student-schedule', status: 'implemented' },
    { id: 'homework', labelKey: 'prt.nav.stu.homework', icon: 'tasks', page: 'student-homework', status: 'implemented' },
    { id: 'materials', labelKey: 'prt.nav.stu.materials', icon: 'materials', page: 'student-materials', status: 'implemented' },
    { id: 'progress', labelKey: 'prt.nav.stu.progress', icon: 'trending-up', page: 'student-progress', status: 'implemented' },
    { id: 'history', labelKey: 'prt.nav.stu.history', icon: 'clipboard-check', page: 'student-history', status: 'implemented' },
    { id: 'profile', labelKey: 'prt.nav.stu.profile', icon: 'user', page: 'student-profile', status: 'implemented' },
  ],
  family: [
    { id: 'home', labelKey: 'prt.nav.fam.home', icon: 'home', page: 'family-portal', status: 'implemented' },
    { id: 'children', labelKey: 'prt.nav.fam.children', icon: 'families', page: 'family-children', status: 'implemented' },
    { id: 'schedule', labelKey: 'prt.nav.fam.schedule', icon: 'calendar', page: 'family-schedule', status: 'implemented' },
    { id: 'progress', labelKey: 'prt.nav.fam.progress', icon: 'trending-up', page: 'family-progress', status: 'implemented' },
    { id: 'billing', labelKey: 'prt.nav.fam.billing', icon: 'wallet', page: 'family-billing', status: 'implemented' },
    { id: 'requests', labelKey: 'prt.nav.fam.requests', icon: 'help', page: 'family-requests', status: 'implemented' },
    { id: 'materials', labelKey: 'prt.nav.fam.materials', icon: 'materials', page: 'family-materials', status: 'implemented' },
    { id: 'profile', labelKey: 'prt.nav.fam.profile', icon: 'user', page: 'family-profile', status: 'implemented' },
  ],
  teacher: [
    { id: 'home', labelKey: 'prt.nav.tch.home', icon: 'home', page: 'teacher-portal', status: 'implemented' },
    { id: 'schedule', labelKey: 'prt.nav.tch.schedule', icon: 'calendar', page: 'teacher-schedule', status: 'planned' },
    { id: 'students', labelKey: 'prt.nav.tch.students', icon: 'students', page: 'teacher-students', status: 'planned' },
    { id: 'outcomes', labelKey: 'prt.nav.tch.outcomes', icon: 'clipboard-check', page: 'teacher-outcomes', status: 'planned' },
    { id: 'tasks', labelKey: 'prt.nav.tch.tasks', icon: 'tasks', page: 'teacher-tasks', status: 'planned' },
    { id: 'reports', labelKey: 'prt.nav.tch.reports', icon: 'reports', page: 'teacher-reports', status: 'planned' },
    { id: 'profile', labelKey: 'prt.nav.tch.profile', icon: 'user', page: 'teacher-profile', status: 'planned' },
  ],
};
```

**Real-link vs planned flags**:
- **student**: 7/7 `implemented` → real `<a>` links; all 7 target pages exist in `app/public/`
  (§1). Corroborated by finding 06 role-model check row 4.
- **family**: 8/8 `implemented` → real links; all 8 pages exist. Corroborated by finding 06 row 7
  ("8 real family anchors").
- **teacher**: 1/7 `implemented` (`home` → `teacher-portal`); 6/7 `planned`
  (`teacher-schedule/students/outcomes/tasks/reports/profile`) — **no corresponding public HTML
  files exist** (finding 04 confirmed absence from the `app/public` listing). Planned items render
  as labeled non-anchor `<button class="pt-nav-item is-planned">` with the «قريبًا» label per
  `app/src/js/components/portal-shell.js` `navItem()` lines 23–31 (findings 04 and 07 both read
  this) — zero fake links, zero `href="#"`. Smoke pins `plannedNavAnchors === 0`
  (`app/tests/smoke/run.cjs` line 1210, per finding 07).

The teacher 1/7 thinness is INTENTIONAL and sequenced — Spec 025 (Teacher Internal Pages) per the
DEC-009 renumbering in
`specs/016-full-frontend-audit-role-dashboards-ia-design-freeze/future-spec-sequence.md`
(finding 04 §Risks; finding 07 evidence list) — not a gap.

## 4. Portals hub cards (corrected role model, Spec 021 DEC-001/002/004)

Source: finding 04 §"Portals hub cards" (`app/src/js/pages/portals.js` + visual confirmation);
independently corroborated by finding 00 observation 4 and finding 06 role-model rows 1–3 (which
read the BUILT `app/public/portals.html`).

| Hub element | Target | Evidence |
|---|---|---|
| Primary role card 1 — family («بوابة العائلة», persona أبو سلمان الغامدي) | `family-portal[.en].html` | `app/src/js/pages/portals.js` `ROLES` lines 17–20; `app/public/portals.html` lines 262–278 (finding 06) |
| Primary role card 2 — teacher («بوابة المعلم», persona سارة القحطاني) | `teacher-portal[.en].html` | same as above |
| Admin console band («لوحة تحكم الأكاديمية») | `dashboard[.en].html` | `app/public/portals.html` lines 280–289 (finding 06) |
| Demoted child-view preview («عرض الابن — معاينة»; copy: access to children is managed via the family account, no separate login; preview persona سلمان/st1) | `student-portal[.en].html` | `portals.js` `childViewCard()` lines 31–43 (finding 04); `app/public/portals.html` lines 295–296 (finding 06) |

Shape = **2 primary role cards + 1 admin band + 1 demoted child-view preview** — NO student
primary card. Visually confirmed in `app/screenshots/portals__ar__light__desktop.png` (opened by
findings 00, 04, and 06 independently). Machine-pinned at `app/tests/smoke/run.cjs` lines
1099–1106: `hubRoleTargets === ['family-portal','teacher-portal']`, `hubAdminLink === 1`,
`childViewLinks === 1` (all three findings cite the same lines — no conflict).

Personas: `PORTAL_PERSONAS = { student: 'st1', family: 'fam1', teacher: 'sara' }`
(`app/src/js/fixtures/portal.js` lines 8–13 per finding 04) — matches the three-login legacy role
model. `CHILD_ORDER = ['st1','st6','st11','st12','st13']` (lines 245–255) is the real fam1 roster
baked into `family-child.html`.

## 5. Per-role page inventories

### 5.1 Student / child-view pages (7 pairs = 14 files)

`student-portal`, `student-schedule`, `student-homework`, `student-materials`,
`student-progress`, `student-history`, `student-profile` (+ `.en` pairs). Framing: Spec 022
reframed the shell PURELY at the locale layer — `app/src/locales/ar.prt.js` lines 91–94:
`prt.title.student = 'عرض الابن'`, `prt.portal.student = 'عرض الابن'`,
`prt.role.student = 'ابن العائلة'` (finding 04 §Locale reframing; finding 06 row 5 confirms zero
«بوابة الطالب» tokens across all built HTML). The six internals' `#page-body` stayed byte-equal by
law.

**Quality flag (CONFIRMED finding F-00-1)**: 6 of 7 child-view pages still carry the pre-021
Student-primary footnote «لوحة الطالب — النسخة الأولى» inside `#page-body` — exact evidence
`app/src/locales/ar.prt.js:297–298`, `app/src/locales/en.prt.js:294`,
`app/public/assets/locales/ar.prt.js:297`, rendered at `app/public/student-portal.html:393`,
`student-homework.html:397`, `student-history.html:344`, `student-profile.html:361`,
`student-progress.html:409`, `student-materials.html:341` (+ `.en` pairs); `student-schedule.html`
carries no such note (`agent-findings/00-main-session-grounding.md` F-00-1; independently observed
by finding 06 row 8 / Risk 1). A knowing 022 leftover (byte-equal law), **Must fix in 024** with
declared hash supersession. This inventory records it as a wording-quality flag, not a missing page.

### 5.2 Family pages (8 nav pairs + 1 drill-down pair = 18 files)

`family-portal` + 7 internals (§1) + `family-child(.en).html` (5 baked child panels st1/st6/st11/
st12/st13, pure-CSS `#child=stX` switching). `family-child` `#page-body` carries exactly **6
anchors** — the 5 panel switches + the ONE sanctioned fold-point link «افتح عرض الابن الكامل» →
`student-portal[.en].html` (finding 06 row 6: extraction + smoke pin `run.cjs` line 1085,
`bodyAnchors === 6`). `family-children` carries exactly 5 drill-down anchors and deliberately NO
fold link (per-child child-view links rejected as dishonest — preview persona is st1 only; finding
06 Risk 3: treat as INTENTIONAL, do not "fix").

### 5.3 Teacher pages (1 pair = 2 files)

`teacher-portal(.en).html` only; the 6 other nav slots are planned (§3). Anchor inventory (finding
07 Scan 4, built HTML both languages): hub ×3 + self ×2 + exactly ONE body anchor →
`teacher-performance[.en].html`; **zero anchors to finance/billing/invoice surfaces**; smoke-pinned
(`run.cjs` lines 1124–1126 body anchor, 1212–1216 shell multiset {self×2, hub×3} = 5). Pay-free
verified at all three layers by finding 07 (built grep, source grep incl. comments, smoke `payHit`)
— zero hits on the extended token set. Carried flag (finding 07 R1, for 024): the sanctioned
performance anchor lands on `teacher-performance.html`, an ADMIN `app-shell` page whose nav rail
contains `href="finance.html"` (line 354) and الرواتب-labeled items (lines 356–368) — needs an
explicit contract exemption/repoint decision, not an inventory gap.

### 5.4 Admin pages (20 pairs = 40 files)

The 20 base names in §1. All 40 held byte-identical through Specs 020–022 (baseline block,
CLAUDE.md identity 55/77 — consistent with finding 04's listing). Nav truth per finding 05
(read `app/src/js/nav.config.js` in full): 13 already-built + 1 built-thin (`settings.html`, G17
deepening → 031) + 43 future-owned nav rows across Specs 026–031, including 29 `planned` ids and
**7 disabled-with-reason finance ids** (`invoices, monthlyInvoices, salaries, staffSalaries,
payments, classSalaryReport, banks`, `nav.config.js` lines 85–91, honest non-links). `finance.html`
is status-first with 24 authored «ريال» invoice-amount literals — sanctioned by the Spec 009
invariant (invoice amounts on admin finance ≠ pay figures; finding 05 §d nuance). `gallery.html` is
a dev-facing design-system preview with no legacy counterpart (useful-net-new, finding 05 §b).

## 6. Tests / smoke coverage (`app/tests/smoke/run.cjs`, 1304 lines)

Source: finding 04 §Test coverage; line-number citations independently matched by findings 06 and
07 where they read the same file (no conflicts found).

| Assertion family | Detail | Evidence (`app/tests/smoke/run.cjs`) |
|---|---|---|
| Page loads | 38-entry `PAGES` mirror × 2 languages = **76 loads**; final console `PASS — ${PAGES.length * 2} page loads` | lines 8–12, 1302 |
| Scoping sets | `PORTAL_PAGES` (18), `STUDENT_INTERNAL` (6), `FAMILY_INTERNAL` (7) | lines 8–58 |
| Living primitives | `idHero === 1` on every compact home + child-view; `railStops >= 1`; `flowSteps === 4` teacher home only; `storyRows === 2` family home only; child-view home `flowSteps === 0 && storyRows === 0` | lines 939–943, 982–1123 (child-view line 984) |
| Hub shape | `hubRoleTargets === ['family-portal','teacher-portal']`, `hubAdminLink === 1`, `childViewLinks === 1` | lines 1099–1106 |
| Teacher pay-free (`payHit`) | regex `\b(salary|salaries|payouts?|earnings?|compensation)\b` + `راتب|رواتب|أجر|مستحقات|غرامة|مكافأة` over rendered `#page-body`, both languages, must be false; BYTE-VERBATIM per the 022 contract | lines 1108–1112 (finding 07 layer 3) |
| Admin-side teacher guard | `teacher-performance` body carries no salary/payroll/الرواتب/score/rank tokens | lines 548–561 (finding 07) |
| Family zero-pay (`famPay`/`payFigure`) | `famPay` regex (`ريال|ر\.س|SAR|USD|جنيه|EGP|[$€£]|ادفع|سداد|pay now|payment|amount|price|مبلغ|سعر|رسوم`) asserted false on family internals, family home, family-child | lines 1013–1014, 1066–1067, 1090–1091 (finding 06 §c, verbatim citation) |
| Anchor registries | family-portal body anchors = 12 (line 1056); family-children = 5; family-child = 6 (line 1085); family-profile planned cards = 3 (line 1096); teacher-portal body anchor = 1 → `teacher-performance(.en).html` (1124–1126); shell multiset {self×2, hub×3} = 5 (1212–1216); `plannedNavAnchors === 0` (1210) | findings 06 + 07 |
| Table-free rule | 0 `<table>` in `#page-body` on every compact home, family-child, and internal page | lines 1220–1226 |
| Compactness ceilings @1366×768 | compact homes scrollHeight ∈ [900, 2200]px; internals ∈ [500, 2200]px | lines 1229–1240 |
| Mobile no-overflow | viewport 390×900 | line ~1244 |
| Reduced-motion CSS audit | `@media (prefers-reduced-motion: no-preference)` guard exists; zero `lv-fill/lv-fadeup/lv-pulse` usages leak outside it (`leak === 0`) | lines 1278–1298 |
| Build-time chip guard | `assertChipTones` throws on un-styled `chip tone-X` on every page body | `app/scripts/build-html.mjs` lines 118–129 |

Also present: `app/tests/a11y/run.cjs` (156 lines) and `app/tests/screenshots/capture.cjs`
(279 lines) — length-checked only by finding 04, not content-read this audit (recorded limitation).

## 7. Screenshot coverage

Source: finding 04 §Screenshot coverage (directory listing + 2 opened visually), corroborated by
findings 00 (5 current shots opened) and 06 (3 opened).

- **189 files** in `app/screenshots/`, plus the **`before-022/` subfolder holding exactly 6**
  pre-living-rework baseline shots (portals, family-portal ×2, student-portal, teacher-portal,
  family-child).
- ~85 of the 189 cover the portal surfaces: hub; family-portal (`area-*` crops: kpi/today/children/
  billing/requests/materials/history/notes/signals/subscriptions + dark/mobile/en); student-portal
  (`area-*`: kpi/now/next/week/homework/materials/progress/achievements/celebration/history +
  dark/mobile/en); teacher-portal (`area-*`: kpi/today/next/timetable/workflow/students/tasks/
  rubric/requests/materials/account/history + dark/mobile/drawer-open/en); all 7 family internals +
  all 6 student internals (desktop + mobile); `family-child` also has `en` + `child-st11` deep-link
  variants.
- Visually verified this audit (not just listed): `portals__ar__light__desktop.png` (hub shape),
  `family-portal__ar__light__desktop.png` (living layout + status-only billing),
  `teacher-portal__ar__light__desktop.png`, `dashboard__ar__light__desktop.png`,
  `student-portal__ar__light__desktop.png` (findings 00/04/06).
- No `REVIEW.md` exists in `app/screenshots/` (finding 04 §Risks — flag only; the mission listed it
  as "if present").

## 8. Known intentional gates (honest non-actions — NOT gaps)

**Portal gates — `PORTAL_PLANNED`, verbatim ids from `app/src/js/fixtures/portal.js` lines
172–198** (opened by this pass; finding 04 cited the same lines):

| Role | Gate id | availability | Path |
|---|---|---|---|
| student | `hwSubmit` | backendRequired | `app/src/js/fixtures/portal.js:176` |
| student | `matDownload` | backendRequired | `portal.js:177` |
| student | `fullHistory` | planned | `portal.js:178` |
| family | `billingGate` (ZERO amounts — a gate, not a ledger) | backendRequired | `portal.js:184` |
| family | `matDownload` | backendRequired | `portal.js:185` |
| family | `fullHistory` | planned | `portal.js:186` |
| family | `meetingRequest` | planned | `portal.js:187` |
| teacher | `outcomeSave` | backendRequired | `portal.js:193` |
| teacher | `matUpload` | backendRequired | `portal.js:194` |
| teacher | `availabilityEdit` | backendRequired | `portal.js:195` |
| teacher | `taskManage` | planned | `portal.js:196` |

**Nav-level gates**: 6 `ROLE_NAV.teacher` planned slots (§3, `portal.js:161–166`) rendered as
«قريبًا» buttons (`portal-shell.js:23–31`); admin: 29 planned nav ids + 7 disabled finance ids
(`app/src/js/nav.config.js` lines 27–34, 44–48, 55–56, 63–64, 73–74, 85–91, 99–103, 110–115 per
finding 05) + 9 figure-free PLANNED_FINANCE cards on `finance.html`
(`app/src/js/fixtures/finance.js` lines 93–103; rendered with «قريبًا» ×29 per finding 05's built
grep). Page-level family gates verified in built HTML by finding 06: `family-profile` exactly 3
backendRequired gates ↔ the 3 legacy POST forms (smoke pin `run.cjs:1096`); family-billing detailed
invoices gated «يتطلب نظام الفوترة الفعلي» (`app/public/family-billing.html:395–401`); child-view
gates «تسليم الواجبات — يتطلب الخادم» / «السجل الكامل — قيد التخطيط» (finding 00 observation 8).

## 9. Cross-check notes and resolutions (synthesis pass)

1. **ROLE_NAV verbatim requirement**: finding 04 paraphrased the registry, so this pass opened
   `app/src/js/fixtures/portal.js:139–168` directly — the verbatim text (§3) matches finding 04's
   paraphrase and finding 07's teacher-row citations exactly. No conflict.
2. **Smoke line numbers** cited independently by findings 04, 06, and 07 for the same asserts
   (hub 1099–1106; payHit 1108–1112; famPay 1013/1066/1090; ceilings 1229–1240) agree in full.
3. **Finding 04's admin grouping note** ("40 base pages x 2 — wait — actual: 20 admin base names
   x 2 = 40 files") is a self-corrected phrasing slip inside finding 04; the resolved figure (20 × 2
   = 40) is arithmetic-consistent with the 77 total and with finding 05's independent 77-file
   enumeration. Resolved: 40 admin files.
4. **`family.js`/`student.js` grouping**: finding 04 counts them inside its family/student module
   groups while noting they are admin profiles. This synthesis re-groups them explicitly (§2) to
   keep the portal counts honest (family portal = 9 modules, child-view = 7, not 10/8).
5. **F-00-1 wording leftover** is carried as a quality flag on §5.1 (per the cross-cutting
   instruction and findings 00 + 06 which found it independently with matching file:line evidence).
6. **Teacher thinness (1/7)** and **family-children's missing fold link** are both recorded as
   INTENTIONAL (Spec 025 sequencing; 022 implementation supersession) — neither may be counted as
   an inventory gap by the coverage matrix (findings 04 §Risks, 06 Risk 3).

— End of inventory audit. Downstream artifacts (coverage matrix, drift register, 024 backlog)
should cite this file for all "current app" counts.
