# Contract: Legacy Role Capability Coverage (Spec 012)

**Status**: Binding · Zero silent future-role gaps. References FR-007/FR-008; US7; SC-006; research D9; data-model §6.

## 1. Artifact

`academy-dashboard-discovery/specs/012-role-portal-foundation/legacy-role-capability-coverage.md`: grounding header (role capture paths) → **Teacher table** (all 22 templates / 26 pages) → **Family table** (all 11 templates / 13 pages) → net-new-value section → Spec 013/014/015 itemized boundary lists → sign-off checklist. Row format: capability · legacy route(s) · what it did (1 line) · classification · destination · rationale.

## 2. Classification scheme (exactly one primary per row)

`foundation-only` (previewed by a Spec 012 section) · `planned-013` · `planned-014` · `planned-015` · `backendRequired` · `future-role-deep` (portal-layer but beyond even 013–015 scoping) · `intentionally excluded` (reason mandatory).

## 3. Mandatory rows/records (research D9 seeds — binding defaults)

- **Pay surfaces** (teacher home salary hero, `/teacher/salary`, `/teacher/salary-class-report`→`update-result`) → **backendRequired**, never previewed with figures.
- **Broken/fake** (teacher+family `/profile` 500s, "Dashboard 1" 404 family, the fake live "room" that re-renders home) → **intentionally excluded** with reasons; account concept survives via profile-edit rows.
- **Weak duplicates** (`/teacher/students` thin roster, duplicate course-history/teacher-history route families, empty `/teacher/tickets`) → excluded/consolidated notes.
- **Net-new**: gamification/achievements/leaderboard/points absent in legacy — recorded as new value introduced by the student portal.
- **The split**: legacy's guardian-proxied single portal deliberately split into Student (013) + Family (014) — recorded with rationale.
- **Every remaining capability** (end-class workflow, monthly report rubric, certificate requests, chat, timetable+availability, today-sessions + cancel + file/voice upload, history + session details, subscriptions + teacher-feedback rubric, billing view-only, feedback meetings, request-trial wizard, library, notifications) classified to 013/014/015/backendRequired per the D9 seed map.

## 4. Sign-off

Checklist: all 39 pages resolve · every exclusion justified · pay surfaces never previewed · 013/014/015 boundaries itemized · reviewer/date line (blank for human).

**Acceptance (binding):**
1. **Given** any of the 39 legacy portal pages, **When** looked up, **Then** exactly one classified row with destination + rationale exists.
2. **Given** the boundary lists, **When** read, **Then** each future spec has an itemized, non-overlapping capability set.
3. **Given** the artifact, **When** greped, **Then** no legacy private wording/status codes appear as new-system labels.
