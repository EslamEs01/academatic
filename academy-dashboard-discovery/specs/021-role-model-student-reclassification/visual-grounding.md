# Visual Grounding — Spec 021: Role Model & Student Reclassification Audit

**Date**: 2026-07-05 · **Gate status**: COMPLETE — every frame below was personally opened and
visually inspected in this session (no memory, no summaries). The decisive structural facts were
re-verified live against the filesystem and the crawler inventories.

## 1. Exact screenshots / files opened for Spec 021

**Legacy evidence (opened this session):**

| # | File |
|---|---|
| L1 | `output/roles/` directory listing (live `ls`) — contains **admin, family, teacher only** |
| L2 | `output/roles/family/screenshots/student-home-full.png` |
| L3 | `output/roles/family/screenshots/student-studentslist-full.png` |
| L4 | `output/roles/teacher/screenshots/teacher-home-full.png` |
| L5 | `output/roles/admin/screenshots/management-home-full.png` |
| L6 | `frontend-planning/03-role-page-inventory.md` (role sections + family account model) |
| L7 | `frontend-planning/04-permission-and-navigation-matrix.md` (roles, namespaces, sidebars) |
| L8 | `output/combined/academy-system-map.md` ("Roles with crawled output: admin, teacher, family") |

**Current-app evidence (opened this session):**

| # | File |
|---|---|
| C1 | `app/screenshots/portals__ar__light__desktop.png` (the hub / role switcher) |
| C2 | `app/screenshots/student-portal__ar__light__desktop.png` |
| C3 | `app/screenshots/teacher-portal__ar__light__desktop.png` |
| C4 | `app/screenshots/family-portal__ar__light__desktop__tiles-now-links.png` (post-020 home) |
| C5 | `app/screenshots/family-child__ar__light__desktop.png` (the drill-down) |
| C6 | `app/screenshots/family-billing__ar__light__desktop.png` (Spec 020 internal, opened fresh today) |
| C7 | `app/screenshots/family-children__ar__light__desktop.png` (Spec 020 internal, opened fresh today) |

Zip note: `output.zip`, `frontend-planning.zip`, `frontend-planning-deep.zip` exist at the
discovery root and are the archives of the ALREADY-EXTRACTED folders inspected above (same
content); no separate `screenshots.zip` exists in the repository. The prior spec archives
(`020-family-guardian-internal-pages.zip`) mirror committed spec folders.
Prior 100% sweeps remain on record: Spec 020 opened **27/27** family frames; Spec 015 grounded the
teacher home; Specs 001–011 grounded the admin console. Spec 021 re-opened the decisive role-proof
frames rather than re-opening all 1,113.

## 2. Evidence table

| Area | File/screenshot opened | What was observed | What role/product idea it proves | Impact on the rebuilt system |
|---|---|---|---|---|
| Legacy role folders | L1 (`ls output/roles/`) | Exactly three folders: `admin` (1,019 frames), `family` (27), `teacher` (67). **No `student` folder.** | The crawler logged in as three roles only. There was no student credential to crawl. | The rebuilt hub's fourth first-class portal (Student) has NO legacy counterpart. |
| Legacy role registry | L8 system map | "Roles with crawled output: admin, teacher, family"; family = 13 pages / 9 modules. | Three-role product, formally recorded. | Confirms L1 structurally. |
| Legacy family namespace | L6 + L7 | Family app titled "FAMILY / GUARDIAN (`/student/*`)" — ~12 templates; "Family account model: guardian-operated, student-centric; supports multiple children (child selector on history/courses; new-vs-existing child in trial wizard)". Family sidebar: Home · Schedule · Classes Summary · Courses · Billing · Student Feedback · Library · Logout. | The legacy `student-*` routes ARE the guardian portal. "Student" in legacy URLs = the *subject* of the account, not a login role. | Every Spec 019 "student page" concept actually descends from guardian surfaces. |
| Legacy guardian home | L2 | `/student/home`: purple gradient hero band with avatar, greeting «الطالبة لمار حسن» + green "Student" chip, hour tiles (Total/Remaining/Taken), Time Spendings, Today's Classes (with Request Trial + Show More), Your Teachers. Sidebar = the family sidebar (L7). | One account, student-centric presentation, guardian-operated. Single-child accounts greet the child by name — but it is the SAME family login, not a separate role. | The account model is "family account whose content is its children" — exactly what `family-child` + the 020 pages rebuilt. |
| Legacy children list | L3 | `/student/studentslist`: "**All Account Subscriptions**" table — # · Student Name · Status · Teacher Name · Course Name · Subscription · History · Feedback About, plus a `student` selector control. | One login owns MULTIPLE student rows. Students are rows in the guardian's account, never logins. | Proves the multi-child ownership model; the rebuilt `family-children` page is the correct heir. |
| Legacy teacher home | L4 | `/teacher/home`: hero band (avatar, «المعلم محمد صادق صادق», Teacher chip, hour tiles, attended %), salary strip (997.00 EGP · Estimated · Fines · Bonus), Today's Classes table with date search and LIVE row actions (View / **Enter Again** / **End class**), sidebar Home·Chat·Schedule·Students·Library·Tasks. | Teacher is a real standalone role — an operational cockpit that acts on today's classes. | Teacher stays a primary role. Also: the legacy home's *alive* feel = hero + live table + actions (input to the Spec 022 brief). Salary display is backend-owned → stays OUT (the standing pay-free law). |
| Legacy admin home | L5 | `/management/home`: KPI action cards (Total/Pending/Attend/Waiting&Running/Cancel/Absent) each with "Show Details", Filter Classes, "Classes Of <date>" live table (student/teacher/course/left-hours/status/actions), Excel export. | Admin is the operations control room. | Admin stays primary; its live-ops rhythm is the second input to Spec 022. |
| Current hub / role switcher | C1 | Four entries: **بوابة الطالب (Student — persona سلمان الغامدي)** · بوابة العائلة (Family — أبو سلمان الغامدي) · بوابة المعلم (Teacher — سارة القحطاني) · لوحة تحكم الأكاديمية (Admin). | The rebuild exposes Student as a peer PRIMARY role. | This is the drift. Salman is fam1's child st1 (see C5) — a child was promoted into a login persona the legacy never had. |
| Current student home | C2 | `student-portal.html`: compact bands — KPI row, today sessions, homework, week glance, quick tiles; uniform white rounded cards on flat cream; identity only in the small sidebar block; gates as dashed cards. | Technically complete (Spec 018/019) but visually static — no hero, no timeline, no page-wide identity, every band the same card rhythm. | Content is worth keeping as the CHILD's view under Family; presentation feeds the B-answers and the 022 brief. |
| Current teacher home | C3 | `teacher-portal.html`: same compact recipe; 6 nav items «قريبًا»; follow-ups board; session-outcome checklist card. | Teacher app direction matches legacy role model; internals still pending. | Teacher Internal Pages resume AFTER the corrective specs (as 025). |
| Current family home | C4 | Post-020 `family-portal.html`: 8-link live sidebar, KPI row, today sessions tagged per child, five children cards with real drill-downs, billing status band, quick links. | The family app now matches the legacy guardian scope 1:1 (see the map file). | Family is the strongest surface; it becomes the OWNER of the student journey. |
| Current family-child | C5 | `family-child.html`: «ملف الابن» — 5-child switcher (سلمان/دانة/وليد/ريناد/سلمى), per-child subject/group/teacher tiles, attendance trio, progress bar, teacher note, homework, materials, 2 server gates. | The rebuilt child file already exists INSIDE the family app and carries the same identity (Salman st1) as the "student portal" persona. | The natural fold-point: the student pages become the child's own view reachable from here. |
| Current 020 internals | C6, C7 | `family-billing` (hour tiles ٤٠/١٢/٢٨, amount-free invoice status cards, gates) and `family-children` (5 rich cards → drill-downs). | The legacy guardian workflows were faithfully re-homed (status-first billing under the zero-pay law). | Confirms C-alignment; no rework needed on 020 content. |

## 3. Evidence for each current role

- **Admin**: L5 vs the 40 rebuilt admin pages (Specs 001–011, committed) — grounded, matching.
- **Teacher**: L4 vs C3 — role exists in both; internals pending; pay surfaces correctly excluded.
- **Family**: L2/L3/L6/L7 vs C4/C5/C6/C7 — grounded and, after Spec 020, functionally complete.
- **Student**: C1/C2 exist in the rebuild; **no legacy counterpart exists** (L1/L8: no student folder,
  no student role, no student login; the `/student/*` namespace belongs to Family).

## 4. Does a standalone Student exist in legacy? — NO

Three independent proofs, all re-verified this session:
1. **Filesystem**: `output/roles/student` does not exist (L1).
2. **Inventory**: "Roles with crawled output: admin, teacher, family" (L8); the role×page inventory
   has exactly three role sections A/B/C, and C is "FAMILY / GUARDIAN (`/student/*`)" (L6).
3. **Pixels**: the `/student/*` screens themselves (L2, L3) show the FAMILY sidebar and an
   account-owns-students model ("All Account Subscriptions" with multiple student rows).

## 5. student-* routes belong to Family/Guardian — YES

All 27 legacy family frames are `student-*`-named (`student-home`, `student-studentslist`,
`student-timetable`, `student-today-sessions`, `student-billing`, `student-feedbacks`,
`student-library`, `student-request-trial`, `student-student-history-fillter-2`,
`student-profile`, `student-profile-edit`) and were crawled INSIDE the family role session; the
inventory names `/student/*` as the family namespace (L6, L7). This was already exploited —
correctly — as the evidence base for Spec 020.

## 6. Current-vs-legacy role comparison

| Legacy (proven) | Current rebuild | Verdict |
|---|---|---|
| Admin `/management/*` | Admin console, 40 pages | ✅ aligned |
| Teacher `/teacher/*` | `teacher-*` app (home + 6 planned) | ✅ aligned, incomplete by plan |
| Family/Guardian `/student/*` (guardian-operated, student-centric, multi-child) | `family-*` app (home + child + 7 internals) | ✅ aligned and complete |
| — (no fourth role) | **`student-*` app as a PRIMARY portal + hub card** | ⚠️ NOT legacy-grounded as a *role*; the content is grounded (it descends from guardian surfaces) but the top-level classification is an invention |

## 7. What the rebuilt app got right

- Three legacy roles all present and correctly scoped; admin untouched by the drift.
- The family app is a faithful, improved heir of the guardian portal (multi-child cards, child
  drill-down, status-first billing under zero-pay, honest gates) — C4–C7 vs L2–L3.
- The teacher pay surfaces were correctly kept OUT (L4 shows why the law exists).
- The honesty system (backendRequired/planned gates, no fake actions) has no legacy equivalent
  and is a genuine improvement.
- The student PAGES' content itself is legacy-derived (schedule/homework/materials/progress all
  descend from guardian surfaces) — the content is salvageable as the child's own view.

## 8. What the rebuilt app got wrong

- **Role model drift**: Student is exposed as a fourth PRIMARY role (hub card, peer branding
  «بوابة الطالب») with persona Salman — who is simultaneously fam1's child st1 inside
  `family-child`. Legacy has no student login; the family account IS the student-facing login.
- **Static/dead presentation** (the user's binding verdict, confirmed frame-by-frame): every band
  on C2/C3/C4 renders the same white rounded card on a flat background; identity lives only in a
  small sidebar block; the legacy homes lead with a gradient identity hero + live operational
  tables with action buttons. The rebuild's accent color alone does not carry the role identity.

## 9. What must change before continuing

1. Reclassify Student (fold under Family as the child's view; hub demotion; no deletion) —
   decisions DEC-001…DEC-006 in `role-model-decision.md`.
2. Rework the three role homes (and the internal-page rhythm) into living educational cockpits —
   the Spec 022 brief in `spec.md` §Living-Dashboards Brief.
3. Run the full legacy coverage audit (023) and its corrections (024) BEFORE building the teacher
   internals (025) so the teacher app is built once, correctly, on the corrected model.
