# Phase 1 Data Model: Approved Academy Dashboard Visual Foundation

**Important**: There is **no database, no API, and no persistence** in Spec 001. These are **display fixture shapes** only — the structure of the static data each component renders. They define presentation contracts, not a storage schema, and imply no backend model. Fixtures live in `app/src/js/fixtures/`. The only persisted state is UI preference (theme, language) in `localStorage`.

All user-facing strings are **i18n keys**, not literals, so fixtures stay language-neutral (see `i18n.js`). Numbers/dates are formatted at render per locale (Arabic-Indic vs Latin digits) but never mirrored.

---

## Entity: NavGroup / NavItem (sidebar)

Drives the data-driven sidebar (`nav.config.js`).

**NavGroup**
| field | type | notes |
|---|---|---|
| id | string | e.g. `general`, `academic`, `administration` |
| labelKey | i18n key | group heading (عام / الأكاديمية / الإدارة) |
| items | NavItem[] | ordered |

**NavItem**
| field | type | notes |
|---|---|---|
| id | string | stable id, also used for active matching |
| labelKey | i18n key | nav label |
| icon | string | icon id in the local SVG set |
| route | string | page path (e.g. `pages/dashboard.html`) |
| badge | number \| null | optional count (e.g. Sessions `24`) |
| active | derived | computed from current page, not stored |
| disabled | boolean | default false |

**Approved fixture (3 groups)**: general → [home (active), sessions (badge 24), schedule]; academic → [students, trainers, curricula]; administration → [reports, settings]. A bottom **help card** (titleKey, subtitleKey, icon) is separate config, not a NavItem.

---

## Entity: ProfileSummary (topbar + welcome)

| field | type | notes |
|---|---|---|
| nameKey | i18n key | display name (fixture) |
| roleKey | i18n key | e.g. "Academy Manager" |
| avatarText | string | initials fallback (avatar always has a fallback) |
| avatarImage | string \| null | optional; null exercises the fallback |
| planKey | i18n key | sidebar brand badge (e.g. "Advanced plan") |
| permissions | string[] | fixture flags, used ONLY to demo disabled-with-reason |

---

## Entity: WelcomeContext (compact welcome/top zone)

| field | type | notes |
|---|---|---|
| greetingKey | i18n key | time-aware greeting (fixture: morning) |
| dateValue | ISO string | formatted per locale at render; not mirrored |
| summaryKey | i18n key | at-a-glance line (uses counts below) |
| todaySessions | number | mirrors KPI |
| liveNow | number | mirrors status summary |
| primaryActionKey | i18n key | e.g. "New session" |
| secondaryActionKey | i18n key | e.g. "View schedule" |
| motif | string | educational SVG motif id (decorative, `aria-hidden`) |

---

## Entity: Kpi (stat card)

| field | type | notes |
|---|---|---|
| id | string | `revenue`, `attendance`, `activeStudents`, `todaySessions` |
| labelKey | i18n key | supporting label |
| value | number | large numeral |
| unitKey | i18n key \| null | e.g. currency label |
| format | enum | `number` \| `currency` \| `percent` |
| accent | enum | `amber` \| `success` \| `teal` \| `primary` (maps to tokens) |
| icon | string | medallion icon id |
| trendDirection | enum | `up` \| `down` \| `flat` |
| trendPercent | number | shown in the trend pill |
| spark | number[] | values for the inline SVG sparkline (no chart lib) |
| sparkKind | enum | `line` \| `bar` \| `progress` \| `ring` |

**Approved fixture**: revenue 48,200 (amber, line, +8%); attendance 92% (success, progress, +3%); activeStudents 1,284 (teal, line, +4%); todaySessions 24 (primary, line, +12%).

---

## Entity: Session (sessions table — fixture rows)

| field | type | notes |
|---|---|---|
| id | string | stable id |
| time | string `HH:MM` | start time (not mirrored) |
| durationMin | number | rendered "N min" |
| titleKey | i18n key | session title |
| levelKey | i18n key | sub-line (e.g. "Level 3") |
| trainerName | string | display name |
| trainerAvatarText | string | colored initial fallback |
| trainerAccent | enum | avatar color from token accents |
| roomKey | i18n key | e.g. "Hall A" |
| studentsPresent | number | numerator |
| studentsCapacity | number \| null | denominator (null → "—") |
| statusId | StatusId | FK into the Status vocabulary below |
| actions | ActionId[] | row-action menu items (no row of pill buttons) |

**Approved fixture**: ≥5 rows mirroring the reference (live/upcoming/completed/cancelled mix), with a "showing 5 of 24" pagination context (`total: 24`, `pageSize: 5`).

---

## Entity: Status (single source of truth for chips, tiles, table)

One vocabulary maps each status → color + icon + label. **No component invents its own status color.**

| field | type | notes |
|---|---|---|
| id | StatusId | `live` \| `upcoming` \| `completed` \| `cancelled` (extensible) |
| labelKey | i18n key | localized label |
| accent | enum | token accent: live→teal, upcoming→sky, completed→success, cancelled→coral |
| icon | string | status icon id |
| tone | enum | `solid` \| `soft` (chip vs tile treatment) |

Rule: status is **never** conveyed by color alone — always icon + label too (FR-006).

---

## Entity: StatusSummaryTile

| field | type | notes |
|---|---|---|
| statusId | StatusId | reuses the Status vocabulary |
| count | number | large count |
| (label/icon/accent) | derived | from Status — not duplicated |

**Approved fixture**: cancelled 1, upcoming 6, live 3, completed 14 (colored tiles, never gray flat pills).

---

## Entity: ReportEntry (reports area + reports page)

| field | type | notes |
|---|---|---|
| id | string | stable id |
| titleKey | i18n key | report title |
| descriptionKey | i18n key | short description |
| icon | string | medallion icon id |
| accent | enum | token accent |
| route | string \| null | target (no detail page exists in Spec 001 → may be `#` placeholder, but rendered as navigable card) |
| disabled | boolean | true → permission-locked |
| disabledReasonKey | i18n key \| null | shown reason (e.g. "Requires academy-manager permission") |

**Approved fixture**: trainers-report (disabled, lock, reason); revenue-report (amber); student-performance (success); monthly-attendance (violet).

---

## Entity: InterfaceState (empty / loading / error demos)

| field | type | notes |
|---|---|---|
| kind | enum | `empty` \| `loading` \| `error` |
| titleKey | i18n key \| null | (loading may be title-less skeleton) |
| messageKey | i18n key \| null | human, warm microcopy |
| icon | string \| null | medallion icon (empty/error) |
| actionKey | i18n key \| null | CTA (empty: "Add session") / retry (error) |

**Approved fixture**: loading skeleton; error ("could not load data… retry"); empty ("no sessions yet… add the first one").

---

## Entity: Locale (i18n dictionary)

| field | type | notes |
|---|---|---|
| code | enum | `ar` (default) \| `en` |
| dir | enum | `rtl` \| `ltr` |
| messages | map<key,string> | namespaced (`nav.*`, `kpi.*`, `session.*`, `status.*`, `report.*`, `state.*`, `topbar.*`, `welcome.*`) |

Rule: every visible string resolves through a Locale; an unresolved key is flagged in dev (no raw keys reach the user).

---

## Entity: UIPreference (the only persisted state)

| field | type | notes |
|---|---|---|
| theme | enum | `light` \| `dark` \| `system` (default `system`) |
| language | enum | `ar` \| `en` (default `ar`) |
| sidebarCollapsed | boolean | slim icon-rail vs expanded |

Stored in `localStorage`; applied before first paint to avoid flash. No other state persists.

---

## Relationships (display-only)

- `NavItem.badge` for Sessions mirrors `Session` fixture `total`.
- `Kpi(todaySessions).value`, `WelcomeContext.todaySessions`, and the sum of `StatusSummaryTile.count` are kept **consistent** in fixtures (24) so the dashboard reads coherently.
- `StatusSummaryTile`, sessions-table chips, and any status chip all resolve through the single `Status` vocabulary.
- `ReportEntry.disabled` is gated by `ProfileSummary.permissions` (fixture) purely to demonstrate disabled-with-reason — not a real permission system.
