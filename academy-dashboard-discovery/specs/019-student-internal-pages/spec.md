# Feature Specification: Student Internal Pages (Spec 019)

**Feature Branch**: `feature/012-role-portal-foundation` (single working branch, watcher-owned — the established 016–018 pattern; no per-spec branch)
**Created**: 2026-07-04
**Status**: Draft (spec only — no plan/tasks/implementation yet)
**Input**: User description: "Student Internal Pages — turn the Spec-017 student planned navigation entries into six real, compact, admin-like internal pages inside Shell v2, completing the Student Dashboard App frontend."

**Binding law inherited**: Spec 016 (IA, design freeze, honesty contract, coverage matrix, teacher pay-free GLOBAL) · Spec 017 (Shell v2 + ROLE_NAV registries + sanctioned-anchor discipline) · Spec 018 (compact admin-like recipe, hard ceilings on the homes, displacement map, sequence 019–028). **Visual grounding gate: COMPLETE** — see [`visual-grounding.md`](visual-grounding.md) (7 areas evidenced; two frames newly opened for this spec; the no-legacy-student-role reality documented honestly).

## The one-paragraph verdict

The student app today is a compact home plus six labeled «قريبًا» buttons. Spec 019 builds the six destinations — `student-schedule` · `student-homework` · `student-materials` · `student-progress` · `student-history` · `student-profile` (AR + EN pairs, 12 new files, 51 → **63** built) — each a COMPACT admin-like dashboard page (the Spec-018 rhythm, never the endless portal), flips the six student ROLE_NAV statuses `planned → implemented` (the exact one-line-per-page mechanism Spec 017 designed for), re-homes the Spec-018-displaced student content on its owning pages, and leaves family/teacher/admin byte-untouched.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Schedule at a glance (Priority: P1)

A student (st1) opens «جدولي» from the sidebar and immediately understands: what's today, what's next, and their whole week — without a dense grid.

**Why this priority**: the schedule is the most-consulted student surface (the home's now-band is its teaser); it's also the first nav destination after home.

**Independent Test**: open `student-schedule(.en).html` → today + next cards on top, the full week as day-grouped agenda cards (Friday's truthful rest-day empty), labeled time/status chips, one honest live/join gate, zero tables, active nav = Schedule.

**Acceptance Scenarios**:

1. **Given** the AR schedule page, **When** it loads, **Then** today's sessions and the next session render as cards with teacher/room/status chips, followed by the week's day groups (SAT/MON/TUE real blocks; WED/THU/FRI truthful empties per the sara-proxy fixture week).
2. **Given** any join/live affordance, **Then** it is a labeled backendRequired gate — never a fake room link.
3. **Given** the sidebar, **Then** «جدولي» carries `is-active`/`aria-current` and «الرئيسية» is a plain link back home.

### User Story 2 — Homework clarity (Priority: P1)

A student opens «واجباتي» and sees what needs action now, what's in progress, and what was reviewed — with due chips and course context.

**Independent Test**: open `student-homework(.en).html` → a small summary band, then state-grouped sections (pending / in-progress / done-reviewed) of homework cards (title · course · due chip · state chip · teacher-note line where real), the submit/upload backendRequired gate, and a truthful empty for any empty group.

**Acceptance Scenarios**:

1. **Given** the homework page, **Then** every homework card resolves authored fixture literals (extending the RETAINED `STUDENT_PREVIEW.homework` trio) and every state/due label is icon+text, never color-only.
2. **Given** the submit/upload actions, **Then** they are labeled backendRequired gates (the Spec-013 `hwSubmit` gate re-homed here) — no fake form, no dead button.

### User Story 3 — Materials without the marketing hero (Priority: P2)

A student opens «المواد» and finds their learning files grouped by course with type labels — no landing-page hero, no fake downloads.

**Independent Test**: open `student-materials(.en).html` → per-course groups of compact material cards (type icon + type chip + title + course), the download/open backendRequired gate (the re-homed `matDownload`), truthful empty where a course has none.

**Acceptance Scenarios**:

1. **Given** the materials page, **Then** materials group by st1's real courses (c1 math, c3 programming) using RETAINED + extended authored fixtures, and no anchor pretends to be a file.

### User Story 4 — Progress that motivates honestly (Priority: P2)

A student opens «تقدمي» and sees their own authored progress: overall + per-course bars, the attendance trio, and their achievements/celebration — zero computed numbers, zero ranking.

**Independent Test**: open `student-progress(.en).html` → progress KPI band, per-course `.pt-bar` bars (78% math / 41% programming — the authored literals), attendance trio (9/2/5), the RETAINED achievements + celebration card sets re-homed from the pre-018 home, and a teacher-signal note line.

**Acceptance Scenarios**:

1. **Given** the progress page, **Then** every figure is an authored fixture literal rendered via the locale digit rules (Arabic-Indic on AR), bars are the sanctioned `.pt-bar` (never a chart), and celebration stays unordered recognition (never rank/leaderboard/percentile).

### User Story 5 — History as a real record (Priority: P2)

A student opens «سجل الحصص» and reviews past sessions: date/teacher/course/outcome chip plus the teacher's summary and homework note per session.

**Independent Test**: open `student-history(.en).html` → a session-record card list (the F6 shape; the real `out1` outcome ref first, then authored records), labeled outcome chips, display-only period chips (clearly non-interactive), truthful empty beyond the authored window.

**Acceptance Scenarios**:

1. **Given** the history page, **Then** records render the RETAINED `STUDENT_PREVIEW.history` (extended with authored entries), each with summary + homework note lines, and any filter affordance either genuinely narrows baked rows via the existing closed hook set or is a clearly display-only chip — no dead filter.

### User Story 6 — Profile without fake forms (Priority: P2)

A student opens «ملفي» and understands their account: identity, level/course/group, teacher, guardian/family line, status chips — and sees clearly that editing (photo/profile/password) needs the real backend.

**Independent Test**: open `student-profile(.en).html` → identity card (avatar/name/level/status chip), academic details rows, guardian/family summary (safe fields only), and EXACTLY the three legacy-evidenced backendRequired gates: photo upload · profile save · password change. Zero `<form>/<input>`.

**Acceptance Scenarios**:

1. **Given** the profile page, **Then** all data resolves st1's existing fixture record (students.js + families.js + SUBJ maps) — no new domain facts — and no control simulates a save.

### User Story 7 — Real navigation, complete app (Priority: P1)

The six student sidebar entries become real language-correct links; every student page shows the correct active item; the app now feels complete.

**Independent Test**: on all 7 student pages ×2 languages: nav renders 7 items, ALL SEVEN are anchors (`implemented`), zero planned buttons remain in the student registry, the current page's item (and only it) carries `is-active`+`aria-current="page"` in both nav instances (aside + drawer), and the shell-anchor registry expands to the sanctioned per-page inventory.

### User Story 8 — Mobile, bilingual, themed (Priority: P1)

All six new pages are clean at 390px (no horizontal overflow), byte-mirrored AR/EN (RTL/LTR), and dark/light/system-safe.

### User Story 9 — Nothing else moves (Priority: P1)

Family/teacher/admin surfaces are untouched: family nav keeps 1 implemented + 7 planned, teacher keeps 1 + 6, admin/index/hub/family-child byte-identical, teacher payHit + family zero-pay byte-verbatim and green.

### Edge Cases

- **Nav flip blast radius**: flipping the six statuses re-renders the nav on the EXISTING student home pair → `student-portal(.en).html` changes (sanctioned; its `#page-body` must stay byte-equal — the change is nav-only). The home's shell-anchor multiset assert (self×2+hub×3, =5) is superseded for student pages by the new full-registry inventory (7 self+sibling anchors ×2 instances + hub×3) — ONE sanctioned smoke re-scope, student-scoped only.
- **family-child unchanged**: it consumes the FAMILY registry — the student flip cannot touch it (assert stays byte-verbatim).
- **Old `#page-body` guarantees**: student home body anchors stay **0**; each new page's body-anchor inventory is pinned by the plan (target: 0 body anchors per internal page — the sidebar owns navigation; any exception must be sanctioned-listed).
- **Empty groups**: any state/course group with no authored rows renders the truthful `.pt-empty` pattern, never a blank.
- **Compactness**: the Spec-018 ceiling probe covers the three HOMES; internal pages inherit the ≤2-screen DESIGN discipline, with the plan deciding whether the smoke ceiling extends to them (recorded either way).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (Visual grounding gate)**: the recorded evidence in `visual-grounding.md` MUST exist before planning/implementation and be cited by the plan; any design that contradicts it must be re-grounded first. ✅ complete at spec time.
- **FR-002 (Nav flip)**: exactly the six student `ROLE_NAV.student` entries flip `status: 'planned' → 'implemented'` (six one-line edits; order/labels/icons/pages FROZEN per Spec 017). Family and teacher registries byte-untouched.
- **FR-003 (Six page pairs)**: `student-schedule` · `student-homework` · `student-materials` · `student-progress` · `student-history` · `student-profile`, each a complete pre-rendered AR+EN pair in the portal shell (`role: 'student'`), registered in the build PAGES table with its own `activeId` matching its nav id, `personaKey: 'data.stud.a.name'`, and a new `prt.title.*` addition per page. Built total 51 → **63**.
- **FR-004 (Active states)**: each page's nav id renders `is-active`+`aria-current="page"` once per nav instance; home is a plain link on internal pages.
- **FR-005 (Schedule)**: today+next band · day-grouped week agenda (never an hour×day grid, never a table) · time/status chips · truthful rest-day empties · ONE live/join backendRequired gate.
- **FR-006 (Homework)**: summary band · pending/in-progress/reviewed sections · due+state chips · teacher-note lines where real · submit/upload backendRequired gate(s) · truthful empties.
- **FR-007 (Materials)**: per-course groups · type icon+chip cards · download/open backendRequired gate · truthful empties · NO hero/marketing band.
- **FR-008 (Progress)**: progress KPI band · per-course `.pt-bar` bars · attendance trio · RETAINED achievements + celebration re-homed · teacher-signal line · zero computed/rank/chart.
- **FR-009 (History)**: session-record cards (date/teacher/course/outcome chip + summary + homework note) · real outcome refs where they exist (out1) · display-only period chips OR genuinely-working baked filters via the existing closed hook set — no new hooks, no dead filters.
- **FR-010 (Profile)**: identity card · academic rows · safe guardian summary · preference/status chips · EXACTLY three backendRequired gates (photo/profile-save/password) · zero form controls.
- **FR-011 (Fixtures)**: additive `portal.js` slices only (e.g., a `STUDENT_PAGES` group); ZERO deletion/rewording of any existing key or slice (018 displacement law); all figures authored literals consistent with st1 across all six pages (9 attended · 78% math · 41% prog · the same homework trio…).
- **FR-012 (Locales)**: additive `prt.*` + `data.*` keys, AR/EN key-mirrored, Arabic-first copy, zero raw keys in built output.
- **FR-013 (Design)**: sky accent via the existing `data-role="student"` tokens; `.pt-*` primitives (018's kpi/band/tile set + existing cards/chips/empties); additive CSS only if a genuinely new primitive is needed, inside the `.portal-shell` namespace; admin chrome/selectors never imported.
- **FR-014 (Honesty)**: zero fake live/join/submit/upload/download/save/password actions; every unavailable action a labeled availability gate; zero `href="#"`; zero dead links; the four honest action classes only.
- **FR-015 (Impact protection)**: changed built files = the 12 new + `student-portal(.en).html` (nav-only; body byte-equal) + shared assets; family home/family-child/teacher home/hub/index/40 admin files byte-identical (**49/63 hash-identical** target).
- **FR-016 (Pay safety)**: teacher pay-free three layers re-verified green (no teacher content touched); family zero-pay regex green (no family content touched); the new student pages carry no pay/currency figures either (student pages have never had a pay register; keep it that way).
- **FR-017 (Tests)**: ONE sanctioned smoke amendment scoped to the student branch: 63 files/loads, per-page existence + shell + active-nav + body-anchor + planned-gate asserts, student nav implemented===7 (anchors) & planned buttons===0, family/teacher registries unchanged (7/8 with 1 implemented each), payHit + family zero-pay + family-child + admin asserts BYTE-VERBATIM, 390px probe + tables===0 extended to the six pages.
- **FR-018 (a11y + screenshots)**: additive axe rows (six pages AR light/dark + EN sample) critical=0 serious=0; captures for each page desktop+mobile + unchanged-proof frames; REVIEW.md verdict section.
- **FR-019 (Docs)**: README + CLAUDE.md updates; the Django note ("student internal pages use the same ROLE_NAV registry and active_id; planned entries become implemented by flipping registry status one line at a time"); 016 coverage-matrix delivery annotation (student S-rows → delivered/gated); 018 displacement map annotated "re-homed by 019" where applicable.

### Key Entities

- **StudentPage** — one of six: `{ base, activeId(=nav id), titleKey, render }`; body = compact bands (header → summary → content groups → gates → note).
- **StudentNavEntry** — the existing ROLE_NAV rows; only `status` changes.
- **StudentPageFixtures** — additive authored slices per page (homework records, material items, history records, profile rows), all resolving st1's existing entities.
- **SanctionedAnchorInventory** — per student page: shell = full 7-item registry ×2 instances + hub×3; body = 0 (plan-pinned).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 63 built files; the six new pairs exist and render both languages with zero raw keys.
- **SC-002**: student nav = 7 real anchors on every student page; zero «قريبًا» buttons remain in the student sidebar; every page shows the correct single active item (×2 instances).
- **SC-003**: a student can reach any of the six surfaces in ONE click from anywhere in the student app (sidebar), and return in one click.
- **SC-004**: every new page is compact — ≤ 2 desktop screens by eye and recorded height ≤ the home ceiling (2,200px @1366×768) as a design check; zero long-page regression anywhere.
- **SC-005**: zero fake actions / dead links / `href="#"` / raw keys across all 63 files (smoke-proven); every gate labeled.
- **SC-006**: 390px clean (no horizontal overflow) on all six pages; axe critical=0 serious=0 on the new rows.
- **SC-007**: **49/63** files hash-identical to HEAD (only the 12 new + student home pair + assets differ); payHit + family zero-pay byte-verbatim green.
- **SC-008**: coverage: every Spec-016 student-app row and every Spec-018 "→ Spec 019" displacement line resolves to a shipped page section or a labeled gate — zero silent drops (grep-audited at implementation).

## Assumptions

- The 016/018 sequence renumber stands: this is **Spec 019 — Student Internal Pages** (old "018" in the pre-amendment 016 table).
- Single-branch/watcher-commit workflow continues (no per-spec branch; the before/after auto-commit hooks are NOT manually triggered, per the standing rule).
- `activeId` per page reuses the Spec-017 default-`'home'` mechanism — each internal page passes its own nav id (the shell already supports any id; NO shell edit).
- The student home body stays byte-equal; only its baked nav changes. If the build's shared-asset regeneration touches other `public/assets/*` mirrors, that is reported as shared-assets churn, not page changes.
- The smoke ceiling probe remains home-scoped unless the plan extends it; the ≤2-screen rule for internal pages is enforced by review + recorded heights either way.
- No new npm dependency, no new `data-*` hook, no new storage key exists in any acceptable implementation.
