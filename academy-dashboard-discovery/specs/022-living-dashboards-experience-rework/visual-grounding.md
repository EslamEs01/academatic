# Visual Grounding — Spec 022: Living Dashboards Experience Rework

**Date**: 2026-07-05 · **Gate status**: COMPLETE. Every frame below was personally opened and
visually inspected in this session. The Spec 021 grounding (same session, same eyes) is
incorporated by reference and re-cited per row; five NEW frames were opened specifically for 022.

## Exact screenshots/files opened

**Opened for Spec 021 in this session (re-used as live evidence, not memory):**
`output/roles/family/screenshots/student-home-full.png` (L2) ·
`output/roles/family/screenshots/student-studentslist-full.png` (L3) ·
`output/roles/teacher/screenshots/teacher-home-full.png` (L4) ·
`output/roles/admin/screenshots/management-home-full.png` (L5) ·
`app/screenshots/portals__ar__light__desktop.png` (C1) ·
`app/screenshots/student-portal__ar__light__desktop.png` (C2) ·
`app/screenshots/teacher-portal__ar__light__desktop.png` (C3) ·
`app/screenshots/family-portal__ar__light__desktop__tiles-now-links.png` (C4) ·
`app/screenshots/family-child__ar__light__desktop.png` (C5) ·
`app/screenshots/family-billing__ar__light__desktop.png` (C6) ·
`app/screenshots/family-children__ar__light__desktop.png` (C7)

**Newly opened for Spec 022:**
`output/roles/family/screenshots/student-today-sessions-full.png` (L9) ·
`output/roles/family/screenshots/student-timetable-full.png` (L10) ·
`app/screenshots/family-portal__ar__light__mobile.png` (C8) ·
`app/screenshots/family-portal__ar__dark__desktop.png` (C9) ·
`app/screenshots/student-progress__ar__light__desktop.png` (C10)

Design references on file: `design-references/academy-dashboard.png`, `sidebar-reference.png`,
`approved-dashboard/` (the admin design canon — binding for admin, tone reference for portals).

## Comparison table (required areas)

| Area | Legacy opened | Current opened | What legacy does better | What current does worse | Preserve | Improve | Impact on Spec 022 |
|---|---|---|---|---|---|---|---|
| Hub / role switcher | — (no legacy hub; three separate logins) | C1 | n/a — logins were separate apps | Presents Student as a fourth equal primary role (the 021-proven drift); flat three-card row, no role storytelling | No-auth demo device; persona lines; admin console entry | Corrected role model (3 primary + demoted child-view entry); richer role cards (role art/gradient, "what you'll see" line) | Hub rework contract (FR-HUB) |
| Family home | L2 | C4, C8, C9 | Gradient identity hero with avatar + hour counters up top; single glanceable band | Identity only in sidebar block; five same-white bands; KPI tiles isolated from action | Compact 5-band skeleton, truthful content, child cards w/ real drill-downs, zero-pay | Page-wide violet hero (guardian + children context); today band → child-tagged day rail; child cards gain motion + latest-signal story; billing band → one status story row | Family living contract (FR-FAM) |
| Teacher home | L4 | C3 | Hero + live Today's-Classes table w/ room/status and real actions; operational density | Same card-stack rhythm as family (only accent differs); workflow described in text, not visualized | Follow-up board content, session-outcome checklist, honest gates, PAY-FREE | Teal teaching hero (NO pay data); day timeline w/ room/count/status stops; prepare→attend→record→review flow strip; follow-ups as priority stories | Teacher living contract (FR-TEA) |
| Child/student view | L2 (single-child presentation) | C2, C10 | Legacy proves the child-centric presentation belongs to the family account | C2 brands itself «بوابة الطالب» — a primary-role claim the 021 audit disproved | ALL 14 built student files (DEC-003); C10's badge/celebration language | Reframe shell copy as child-view («عرض الابن») ; student home adopts the shared hero/rail primitives; internals get copy-reframe only | Reclassification scope file |
| family-child fold point | L3 (account→students) | C5 | Legacy studentslist proves account-owns-children | No path from the child file into the child's own richer view | The 5-panel `:target` machinery byte-proven in 018–020 | Add the honest child-view link («افتح عرض الابن الكامل») from family-child (and family-children cards) → student pages | DEC-006 mechanics (FR-CHILD) |
| Today sessions / living day timeline | L9, L10 (date-searchable day table; week grid with TODAY highlighted amber) | C2/C3/C4 today bands | Day-orientation with the current day visually marked; one glance = "where am I in the day" | Sessions listed as inert equal-weight cards; "now" only a small chip | Child tags, «جارية الآن/قادمة» truthfulness, ≤3+next cap | A time rail: now-stop pulsing (CSS), next emphasized, done dimmed; room/child tags on stops; rest-day empties stay truthful but friendlier | `pt-rail` primitive (FR-RAIL) |
| KPI / status stories | L4/L5 counter strips + KPI cards w/ Show Details | C2/C3/C4 KPI rows | Every legacy number sits next to an action (Show Details) | Numbers isolated in tiles; no narrative, no trend, no link | `num()` authored literals; 4-KPI cap | Each KPI becomes a story row: number + one-line narrative + real link («١ يحتاج متابعة ← افتح التقدم») | `pt-story` primitive (FR-STORY) |
| Action/gate panels | L4 row actions (Enter/End) | C2/C3/C4 dashed gate cards | Actions visible at the point of work | Gates are dead-looking dashed boxes with a lock chip | Honesty classes; zero fake actions | Gates become guided panels: what happens when live · who acts · status — still non-interactive, visibly designed | `pt-guide` primitive (FR-GUIDE) |
| Role identity hero | L2/L4 (gradient art band + avatar + chip + counters) | — (absent everywhere current) | The single strongest "alive" signal legacy has | Current pages start with plain text heading | Compact ceilings (018 law) | `pt-hero` per role: gradient wash + identity + 2–3 headline counters; budgeted height | `pt-hero` primitive (FR-HERO) |
| Mobile 390 | — | C8 | n/a | Very long uniform pill-stack; the static problem is amplified on small screens | Single-column stacking, native drawer, tap targets | Hero compresses gracefully; rail becomes vertical; stories stay one-line; motion subtle | Mobile budget in every contract |
| Dark/light | — | C9 | n/a | Dark works (tokens) but the flatness persists | Token-driven theming | Hero gradients and celebration accents must have dark-safe variants; contrast ≥ AA | Dark rows in a11y matrix |
| Celebration / educational joy | — | C10 (student-progress) | — | Exists ONLY on one internal page | C10's وسام badges, gradient star cards, next-step lines — already in-app, already honest | Scale this exact language to the three homes (family child streaks, teacher day completion) using EXISTING authored facts only | Joy vocabulary source (FR-JOY) |

## What must NOT be copied from legacy

Salary/fines/bonus strips and ALL pay figures (teacher pay-free GLOBAL; family zero-pay) · the
flat 8-column data tables as a home pattern · the joyless empty grids (L9/L10 empty states) · the
broken "Dashboard 1" nav rows · English-first layouts · the cluttered admin sidebar flatness ·
any fake action affordance (legacy buttons imply server behavior we do not have).

## Verdict

The legacy wins on *presence* (hero identity, day orientation, action proximity); the current wins
on *honesty, structure, bilingual RTL, theming, and compactness*. Spec 022 fuses them: keep the
current skeleton and laws, add the living layer (hero · rail · stories · flow · guides · joy) as
shared primitives so family/teacher/hub/child-view all inherit it consistently.
