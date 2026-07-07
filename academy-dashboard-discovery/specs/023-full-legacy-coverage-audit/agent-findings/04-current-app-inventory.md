# Agent 04 — Current Rebuilt App Inventory Audit

## Scope & method

Read-only inventory of the REBUILT app as it exists on disk today (no legacy comparison — that is
other agents' job). Every claim below is anchored to an exact file path opened during this session.
No build/test commands were run; counts were derived by listing/grep on the checked-in `app/public`,
`app/src`, `app/scripts`, `app/tests`, and `app/screenshots` trees. Two screenshots were opened
visually to corroborate the hub-card-count and family-home-layout claims (rendering, not just source).

## Evidence opened (exact paths)

- `app/public/*.html` — directory listing (77 files; via `ls app/public/*.html`)
- `app/src/js/pages/` — directory listing (38 page modules)
- `app/src/js/components/` — directory listing (52 component modules, incl. `portal-page.js`, `portal-shell.js`)
- `app/src/js/fixtures/` — directory listing (17 fixture modules)
- `app/src/locales/` — directory listing (16 locale modules, incl. `ar.prt.js`/`en.prt.js`)
- `app/src/js/components/portal-shell.js` (lines 1–94 read) — shell markup, `ROLE_ICONS`, `navItem`/`navList`, `portalShellMarkup`
- `app/src/js/fixtures/portal.js` (full file, 429 lines) — `PORTAL_PERSONAS`, `STUDENT_PREVIEW`, `ROLE_NAV` (lines 139–168), `PORTAL_PLANNED` (170–198), `COMPACT_HOME` (211–236), `CHILD_PROFILE`/`CHILD_ORDER` (245–255), `STUDENT_PAGES` (257+)
- `app/src/js/pages/portals.js` (full file) — hub render logic, `ROLES` array, `childViewCard()`
- `app/scripts/build-html.mjs` (lines 69–169) — `PAGES` registry (38 entries), `htmlDoc`, chip-tone guard, write loop, index.html redirect note
- `app/tests/smoke/run.cjs` — `wc -l` (1304 lines); grepped sections: lines 8–58 (`PAGES`, `PORTAL_PAGES`, `STUDENT_INTERNAL`, `FAMILY_INTERNAL`, `FILTER_SPEC`), 925–1123 (portal probes: `idHero`/`railStops`/`flowSteps`/`storyRows`/`childViewLinks`/hub assertions/payHit), 1220–1245 (table-free + compactness-ceiling probes), 1278–1302 (reduced-motion CSS audit + final PASS line)
- `app/tests/a11y/run.cjs` — `wc -l` (156 lines)
- `app/tests/screenshots/capture.cjs` — `wc -l` (279 lines)
- `app/screenshots/` — directory listing (189 files) + `before-022/` subfolder listing (6 files) + filtered listing of portal/family/student/teacher/hub screenshots (~85 files)
- `app/screenshots/portals__ar__light__desktop.png` — opened visually
- `app/screenshots/family-portal__ar__light__desktop.png` — opened visually
- `app/src/locales/ar.prt.js` (lines 91–94, 276–378 grepped) — `prt.title.student`/`prt.portal.student`/`prt.role.student` = «عرض الابن»/«مركز البوابات → عرض الابن»/«ابن العائلة»
- `app/src/styles/app.css` (lines 1019–1099 grepped) — `.pt-idhero/.pt-rail/.pt-story/.pt-flow/.pt-guide` rules + the single `@media (prefers-reduced-motion: no-preference)` block with `lv-fadeup/lv-fill/lv-pulse`
- `app/README.md` — `wc -l` (163 lines) + grep of Spec 020/022 paragraphs (lines 111–134)

## Public HTML inventory (77 files, grouped)

**Hub + index (3 files x languages where applicable):**
- `index.html` (redirect only)
- `portals.html` / `portals.en.html`

**Admin console (40 base pages x 2 languages = wait — actual: 20 admin base names x 2 = 40 files):**
`dashboard`, `reports`, `gallery`, `sessions`, `schedule`, `students`, `teachers`, `courses`,
`settings`, `families`, `add-family`, `family`, `student`, `attendance`, `groups`, `course`, `group`,
`teacher`, `teacher-performance`, `finance` — each with `.html` + `.en.html` = 40 files.
(Note: `student.html`/`student.en.html` and `teacher.html`/`teacher.en.html` here are ADMIN profile
templates, distinct from the portal's `student-portal.html`/`teacher-portal.html`.)

**Family portal home + 7 internals (8 base names x 2 = 16 files):**
`family-portal`, `family-children`, `family-schedule`, `family-progress`, `family-billing`,
`family-requests`, `family-materials`, `family-profile`.

**Student "child-view" home + 6 internals (7 base names x 2 = 14 files):**
`student-portal`, `student-schedule`, `student-homework`, `student-materials`, `student-progress`,
`student-history`, `student-profile`. (Framed as the demoted child-view per Spec 021/022 — locale
layer only, see below.)

**Family drill-down (1 base name x 2 = 2 files):**
`family-child.html` / `family-child.en.html`.

**Teacher portal home only (1 base name x 2 = 2 files):**
`teacher-portal.html` / `teacher-portal.en.html` (the six other teacher nav slots —
schedule/students/outcomes/tasks/reports/profile — are `status:'planned'` in `ROLE_NAV.teacher` and
have NO corresponding public HTML file; confirmed absent from `app/public` listing).

Total: 1 (index) + 40 (admin) + 16 (family) + 14 (student) + 2 (family-child) + 2 (teacher-portal)
+ 2 (portals hub) = 77. Matches `app/scripts/build-html.mjs`'s 38-entry `PAGES` array × 2 languages
+ 1 index (`build-html.mjs` lines 69–114, 152–169).

## Source page modules (`app/src/js/pages/`, 38 files)

Admin: `add-family.js attendance.js course.js courses.js dashboard.js families.js finance.js
gallery.js group.js groups.js reports.js schedule.js sessions.js settings.js students.js teacher.js
teacher-performance.js teachers.js` (18)
Portal hub: `portals.js` (1)
Family: `family-portal.js family-children.js family-schedule.js family-progress.js
family-billing.js family-requests.js family-materials.js family-profile.js family.js
family-child.js` (10 — note `family.js` is the ADMIN family profile, distinct from
`family-portal.js`)
Student: `student.js student-portal.js student-schedule.js student-homework.js
student-materials.js student-progress.js student-history.js student-profile.js` (8 — `student.js`
is the ADMIN student profile, distinct from `student-portal.js`)
Teacher portal: `teacher-portal.js` (1)

## ROLE_NAV registries (verbatim, `app/src/js/fixtures/portal.js` lines 139–168)

**student** (all `status:'implemented'`, 7 items) → targets `student-portal`, `student-schedule`,
`student-homework`, `student-materials`, `student-progress`, `student-history`, `student-profile`.

**family** (all `status:'implemented'`, 8 items) → targets `family-portal`, `family-children`,
`family-schedule`, `family-progress`, `family-billing`, `family-requests`, `family-materials`,
`family-profile`.

**teacher** (7 items, only `home` implemented, 6 planned) →
`{id:'home', page:'teacher-portal', status:'implemented'}`, then `schedule→teacher-schedule`,
`students→teacher-students`, `outcomes→teacher-outcomes`, `tasks→teacher-tasks`,
`reports→teacher-reports`, `profile→teacher-profile` — all `status:'planned'` (rendered as
non-anchor `<button>` "قريبًا" per `portal-shell.js` `navItem()` lines 23–31, confirmed no
corresponding files exist in `app/public`).

`portal-shell.js` `navItem()` (lines 23–31) implements the honest-gate contract: `implemented` →
real `<a href="{page}[.en].html">`; else → `<button type="button" class="pt-nav-item is-planned">`
with a `prt.nav.soon` label span — zero fake links, matching the "no fake actions" law.

## Portals hub cards (`app/src/js/pages/portals.js`, confirmed live in
`screenshots/portals__ar__light__desktop.png`)

- `ROLES` array (lines 17–20 of `portals.js`): exactly 2 primary role cards — `family` →
  `family-portal[.en].html`, `teacher` → `teacher-portal[.en].html`.
- One admin console band → `dashboard[.en].html` (labeled «لوحة تحكم الأكاديمية» /
  «فتح لوحة التحكم» in the screenshot).
- One demoted child-view card (`childViewCard()`, lines 31–43) → links to `student-portal[.en].html`,
  labeled «عرض الابن — معاينة» in the screenshot, framed as "معاينة لوحة الابن (سلمان) ضمن رحلة
  العائلة... دون تسجيل دخول منفصل".
- Visually confirmed in `screenshots/portals__ar__light__desktop.png`: exactly 2 role cards
  (بوابة المعلم / بوابة العائلة), 1 admin band, 1 child-view preview band — matches source.
- Smoke test enforces this exact shape at `app/tests/smoke/run.cjs` lines 1099–1106:
  `hubRoleTargets === ['family-portal','teacher-portal']`, `hubAdminLink === 1`,
  `childViewLinks === 1`.

## Personas / fixtures (`app/src/js/fixtures/portal.js` lines 8–13)

`PORTAL_PERSONAS = { student: 'st1', family: 'fam1', teacher: 'sara' }` — matches the three-login
role model (Spec 021 DEC-001). `CHILD_ORDER = ['st1','st6','st11','st12','st13']` — the real fam1
roster used by `family-child.html`'s baked panels (`CHILD_PROFILE`, lines 245–251).

## Locale reframing (Spec 022, `app/src/locales/ar.prt.js` lines 91–94)

- `prt.title.student` = `'عرض الابن'` (was «بوابة الطالب»)
- `prt.portal.student` = `'عرض الابن'`
- `prt.role.student` = `'ابن العائلة'` (was «طالب»)
- `prt.portal.hub` = `'مركز البوابات'`, `prt.role.hub` = `'عرض تجريبي'`
- `prt.portal.family` = `'بوابة العائلة'`, `prt.role.family` = `'وليّ أمر'`
- `prt.portal.teacher` = `'بوابة المعلم'`, `prt.role.teacher` = `'معلّم'`

This confirms the reframe is confined to the locale layer only — the six student internal page
module files (`student-schedule.js` etc.) were not grepped for changes here (that is a byte-hash
job for other agents), but the `prt.title.*`/`prt.role.*`/`prt.portal.*` keys are the ONLY three
key families touched per CLAUDE.md's own claim, and this agent's read of `ar.prt.js` corroborates
those three keys exist exactly as claimed.

## Living-layer CSS (Spec 022, `app/src/styles/app.css` lines 1019–1099)

Confirmed present: `.pt-idhero` (+ `-top/-hi/-sub/-stats/-stat/-stat-top/-stat-num/-stat-label/
-stat-story`), `.pt-rail`, `.pt-story` (+ `-main/-title/-sub`), `.pt-flow` (+ `-step/-head/-num/
-title/-sub`, `.is-gated` dashed-border variant), `.pt-guide` (`.pt-planned.pt-guide`, `.pt-guide-line`).
All auto-playing keyframes (`lv-fadeup`, `lv-fill`, `lv-pulse`, lines 1092–1094) are declared, and
their USE is confined to a single `@media (prefers-reduced-motion: no-preference)` block starting at
line 1095 (`.pt-idhero { animation: lv-fadeup ... }`, `.pt-bar.is-live > span { animation: lv-fill ... }`,
`.pt-stop.is-now .pt-stop-dot { animation: lv-pulse ... }`) — matches the CLAUDE.md claim of "ONE
`prefers-reduced-motion: no-preference` block."

## Build registry (`app/scripts/build-html.mjs` lines 69–114)

`PAGES` array has exactly 38 entries (grep count confirmed: `grep -n "base: '" | wc -l` = 38).
20 admin entries use `shell: undefined` (default admin `shellMarkup`); 18 portal entries carry
`shell: 'portal'` with an explicit `role` (`hub`/`student`/`family`/`teacher`) and `personaKey`.
The write loop (lines 152–165) emits both `ar` and `en` variants of every entry (38×2=76) plus a
static `index.html` redirect (line ~168) = 77 total, matching the actual file count on disk.
The `assertChipTones` guard (lines 118–129) runs on every page body at build time and throws on any
un-styled `chip tone-X`, preventing a silent unstyled-pill regression.

## Test coverage summary (`app/tests/smoke/run.cjs`, 1304 lines)

- Iterates the 38-entry `PAGES` const (lines 8–12, hand-mirrored from `build-html.mjs`) × 2
  languages → 76 page loads exercised (console line 1302: `PASS — ${PAGES.length * 2} page loads`).
- `PORTAL_PAGES` (18), `STUDENT_INTERNAL` (6), `FAMILY_INTERNAL` (7) sets scope portal-specific
  assertions distinctly from admin-page assertions.
- Portal living-primitive probes (lines 939–943, asserted 982–1123): `idHero === 1` on every
  compact home + child-view; `railStops >= 1`; `flowSteps === 4` only on teacher home (prepare→
  attend→record→review); `storyRows === 2` only on family home (billing/requests); child-view
  home explicitly asserts `flowSteps === 0 && storyRows === 0` (line 984).
- Hub-shape assertions (lines 1099–1106): exactly 2 role-card targets (family+teacher), exactly 1
  admin link, exactly 1 child-view link.
- Teacher pay-free assertion (lines 1110–1112): regex over `bodyText` for
  `salary|salaries|payouts?|earnings?|compensation` (English) and
  `راتب|رواتب|أجر|مستحقات|غرامة|مكافأة` (Arabic) — `payHit` must be false.
- Family zero-pay assertions: `famPay` check (line 1014) on internal pages, `payFigure` regex on
  family-portal (line 1067) and family-child (line 1091).
- Table-free rule (lines 1220–1226): every role-content page (`isCompactHome` OR `family-child` OR
  `isInternalPage`) must render `0` `<table>` elements in `#page-body`.
- Compactness-ceiling probes @1366×768 (lines 1229–1240): compact homes must be in `[900, 2200]px`
  scrollHeight; internal pages must be in `[500, 2200]px` — "the endless page must not return."
- Mobile no-overflow check follows immediately (line ~1244, viewport 390×900).
- Reduced-motion CSS audit (lines 1278–1298): confirms the `@media (prefers-reduced-motion:
  no-preference)` guard exists in `app.css` and that zero `lv-fill/lv-fadeup/lv-pulse` usages leak
  outside it (`leak === 0` assertion).
- `app/tests/a11y/run.cjs` (156 lines) — not deep-read this pass; exists as a separate a11y-focused
  runner alongside smoke.
- `app/tests/screenshots/capture.cjs` (279 lines) — drives the 189-screenshot capture set (existence
  confirmed via directory listing; not read line-by-line this pass).

## Screenshot coverage summary (`app/screenshots/`, 189 files total)

- `before-022/` subfolder holds exactly 6 "before" reference shots (portals, family-portal ×2,
  student-portal, teacher-portal, family-child) — the living-rework baseline for visual diffing.
- Portal/hub/family/student/teacher screenshots number ~85 of the 189 files, covering: hub
  (`portals__ar__light__desktop.png`, visually opened — confirms 2 role cards + admin + child-view
  band), family-portal (multiple `area-*` sub-crops: kpi/today/children/billing/requests/materials/
  history/notes/signals/subscriptions + dark/mobile/en variants — `family-portal__ar__light__desktop.png`
  visually opened, confirms hero/rail/children-cards/billing-requests/quick-links layout matching
  source), student-portal (`area-*`: kpi/now/next/week/homework/materials/progress/achievements/
  celebration/history + dark/mobile/en), teacher-portal (`area-*`: kpi/today/next/timetable/workflow/
  students/tasks/rubric/requests/materials/account/history + dark/mobile/drawer-open/en), all seven
  family internals + all six student internals (desktop + mobile, `family-child` also has an
  `en` and a `child-st11` deep-link variant, `student-schedule`/`family-child`/`family-children`
  also have `en` variants).
- No `REVIEW.md` file found in `app/screenshots/` during this pass (not explicitly searched for by
  name, but not present in the directory listing captured).

## Known intentional gates (backendRequired / planned registers)

`PORTAL_PLANNED` (`app/src/js/fixtures/portal.js` lines 172–198):
- **student** (3): `hwSubmit` (backendRequired), `matDownload` (backendRequired), `fullHistory` (planned)
- **family** (4): `billingGate` (backendRequired), `matDownload` (backendRequired), `fullHistory`
  (planned), `meetingRequest` (planned)
- **teacher** (4): `outcomeSave` (backendRequired), `matUpload` (backendRequired),
  `availabilityEdit` (backendRequired), `taskManage` (planned)

`ROLE_NAV.teacher` planned nav slots (6 of 7 items, page path only, no file):
`teacher-schedule`, `teacher-students`, `teacher-outcomes`, `teacher-tasks`, `teacher-reports`,
`teacher-profile` — all rendered as labeled non-anchor `<button>` "قريبًا" (never `href="#"`,
never a dead link), per `portal-shell.js` `navItem()` (lines 23–31).

## Risks, gaps, and proposed corrections

- **Teacher role app is the thinnest surface by file count**: only 1 of 7 `ROLE_NAV.teacher` items
  is implemented (`teacher-portal`) vs. 7/7 for student and 8/8 for family. This is consistent with
  CLAUDE.md's stated sequencing ("Spec 025 — Teacher Internal Pages" is still future work per the
  021 sequence note), so this reads as an intentional, already-planned gap rather than an
  unplanned omission — flagging for Agent(s) auditing the sequence/roadmap to confirm Spec 025 is
  indeed still queued and not silently dropped.
- **Naming collision risk for future cross-referencing agents**: `student.js`/`student.html` (ADMIN
  profile template) and `student-portal.js`/`student-portal.html` (the child-view home) are
  easily confused by filename alone; same for `family.js`/`family.html` vs. `family-portal.js`/
  `family-portal.html`, and `teacher.js`/`teacher.html` vs. `teacher-portal.js`/`teacher-portal.html`.
  Other audit agents comparing to legacy should take care not to conflate these when building the
  coverage matrix.
- **`app/tests/a11y/run.cjs` and `app/tests/screenshots/capture.cjs` were only length-checked, not
  content-read** in this pass — if another agent needs the exact a11y assertion list or capture
  matrix, a follow-up read is needed (this agent's mission was inventory, not a11y/test-content audit).
- **No `REVIEW.md` found** in `app/screenshots/` — if CLAUDE.md or another spec artifact expected one,
  this is a genuine gap worth flagging to the orchestrator (the mission text listed it as "if
  present," and it is not present in the directory listing captured).
- All findings above describe the CURRENT rebuilt state only; this agent did not compare against
  legacy discovery evidence, so no coverage/gap verdicts relative to legacy are asserted here — that
  cross-reference is other agents' explicit mission.
