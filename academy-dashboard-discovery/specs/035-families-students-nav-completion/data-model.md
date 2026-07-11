# Data Model — Spec 035

All data is authored, display-only fixtures. No persistence, no computed values, no PII, no pay figures.

## New entities

### ScheduleSearchCandidate (`fixtures/schedule-search.js` → `SS_CANDIDATES`)
A single searchable availability row (a teacher + an open slot).
| Field | Type | Notes |
|---|---|---|
| `id` | string | e.g. `ssc1` (drawer/facet key) |
| `teacherKey` | i18n key | teacher name — **name only, no rate/pay** |
| `subjectKey` / `categoryId` | i18n key / id | subject or category (facet) |
| `dayId` | id | day-of-week facet (`sun`…`sat`) |
| `slotId` | id | time-window facet bucket (e.g. `morning`/`afternoon`/`evening` or `t0900`) |
| `startKey` / `endKey` | i18n key | display start/end time (authored) |
| `availabilityId` | id | `available` \| `partially` \| `booked` (authored label, NOT computed) |
| `roomKey` | i18n key (optional) | display only |

**Validation/rules:** every candidate renders via `facetAttrs({ search, teacher, category, day, slot, availability })`; no field is derived from another; availability is an authored enum, never a computed overlap.

### ScheduleSearch facet vocabularies (`fixtures/schedule-search.js`)
`SS_TEACHERS`, `SS_CATEGORIES`, `SS_DAYS`, `SS_SLOTS`, `SS_AVAILABILITY` — arrays/maps of `{ id, labelKey, icon?, tone? }` used to build filterBar select options and result chips.

### ScheduleSearch KPIs (`SS_KPIS`)
Authored summary literals for `summaryCards` (e.g. teachers scanned / open slots / categories). Each `{ icon, tone, value, labelKey }` — **literal values, not computed**.

## Reused / unchanged entities (no edit)
- **FamilyCategory** (`fixtures/families.js` → `FAMILY_CATEGORIES`) + the `fam-cat` reclassify preview (`family.js`) — reachable, unchanged.
- **Student.results** (`resultSummary`) — authored per-course progress + certificates + level/term; unchanged.
- **Student.evaluation** (`evaluationRubric`) — authored categorical criteria + narratives; unchanged.

## State transitions
**None.** No entity has a mutable state in this spec. Every write final (schedule-search Book/Assign, fam-cat Save, evaluation Approve) is a `backendRequired` gate that performs no transition. Client-side filtering only toggles row visibility (CSS/attribute), never data.

## Locale keys (new)
- `ssr.*` in `ar/en.ssr.js` — page title/subtitle, filter labels, result column/chip labels, empty-state text, gate reasons, KPI labels.
- **No** new keys for familyCategories / studentResult / studentEvaluation (nav labels + surfaces already exist).
