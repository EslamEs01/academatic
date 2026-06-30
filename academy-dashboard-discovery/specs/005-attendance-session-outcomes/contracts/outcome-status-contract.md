# Contract: Outcome Status Map

**Status**: Binding · `app/src/js/components/outcome-status.js` → `OUTCOME_STATUS` (the map) + `outcomeChip(id)` (the renderer).

The single labeled **review-outcome** vocabulary for Spec 005, rendered via the generic `chip` as **icon + label, never numeric or color-only**, AA-contrast, AR/EN. Realizes D2, R33/R34, FR-003, SC-001/SC-002. It is the **third** status vocabulary in the app and MUST stay distinct from the other two.

## 1. Purpose & reuse

- Replace the legacy **~11-state lifecycle** (`pending · waiting · running · attend · student-absent · teacher-absent · teacher-cancel · student-cancel · admin-cancel · trial`) and its **opaque numeric URL codes** (`status=1`, `2,10`, `3,4`, `5,6,7`, `8`) with a calm, honest, labeled set.
- The legacy numeric `status=0..N` codes MUST **NOT** be imported, themed, aliased, or relied on — they are a documented anti-pattern (the avoid-list in `scope-guard.md`).
- `outcomeChip(id)` MUST resolve a row/tile/drawer chip by composing the **existing** generic `chip({ tone, icon, labelKey })` atom (`components/ui.js`) — exactly as `statusChip`/`family-status` do — so colors never drift and the renderer adds no new engine. NO new chip primitive; reuse the existing `.chip tone-<tone>` look + the vendored `lucide-static` icons.
- This contract defines a **vocabulary**, not a workflow: no state machine, no transitions engine, no persistence. The *who* and the *make-up/credit* details are display attributes resolved at build time (§6, §7).

## 2. The id set (binding — exact)

`OUTCOME_STATUS` MUST define exactly these **seven outcome ids** plus **two display flags**, no more, no fewer:

- Outcomes: **`attended` · `studentAbsent` · `teacherAbsent` · `cancelled` · `rescheduled` · `upcoming` · `live`**.
- Display flags (rendered alongside an outcome, never as a standalone status): **`makeUpSuggested` · `needsFollowUp`**.

Rules:

- Each entry MUST be `{ tone, icon, labelKey }` (the flags share the same shape).
- `outcomeChip(id)` MUST fall back safely (e.g. to `upcoming`) for an unknown id and MUST never emit a raw key or a bare numeric code.
- No additional ids may be added without amending this contract; `trial` MUST NOT appear (it is a session **type facet**, not an outcome).

## 3. Tone / icon / label table (binding)

Reuse the existing chip tones only (`success · coral · amber · sky · teal · neutral · upcoming · live · completed`); every entry is AA-contrast and the label ALWAYS accompanies the tone + icon.

| id | tone (token) | icon (lucide, vendored) | label (AR / EN) | meaning |
|---|---|---|---|---|
| `attended` | `success` | `check-circle` | حضور مكتمل / Attended | held & attended |
| `studentAbsent` | `coral` | `user-x` | غياب الطالب / Student absent | the **student** did not attend |
| `teacherAbsent` | `amber` | `user-x` (distinct tone) | غياب المعلم / Teacher absent | the **teacher** did not attend |
| `cancelled` | `neutral` | `x-circle` | ملغاة / Cancelled | cancelled (the *who* → drawer attribution) |
| `rescheduled` | `sky` | `calendar-clock` | مُعاد جدولتها / Rescheduled | moved to a new time |
| `upcoming` | `upcoming` | `clock` | قادمة / Upcoming | not yet held |
| `live` | `live` | `play` | جارية الآن / Live | in progress |
| *flag* `makeUpSuggested` | `amber` | `rotate-cw` | تعويض مقترح / Make-up suggested | display flag (drawer hint) |
| *flag* `needsFollowUp` | `amber` | `alert-triangle` | تحتاج متابعة / Needs follow-up | display flag (drives the attention facet) |

Binding distinctness within the table:

- `studentAbsent` (coral) and `teacherAbsent` (amber) MUST stay **two distinct tones AND two distinct labels** so they are unmistakable on the list and in the drawer even in grayscale (§5).
- `cancelled` MUST be a distinct neutral tone (NOT coral) so it does not read as an absence.
- `upcoming`/`live` reuse the session-map accents (`upcoming`/`live`) but remain entries of THIS map (no import of `status-map.js`).

## 4. Distinctness — three separate vocabularies (no merge, no double-encoding — R34)

- **Session/scheduling status** (`components/status-map.js`: `live · upcoming · completed · cancelled`) MUST remain the **scheduling** vocabulary used by Sessions/Schedule and the drawer's "Status" row. `OUTCOME_STATUS` MUST NOT replace it, import it, or alias its ids — `completed` (scheduling) vs `attended` (outcome) are intentionally different words.
- **Lifecycle status** (`components/family-status.js`: `active · trial · suspended · stopped · inactive`) is the Spec 004 **people** vocabulary and MUST stay separate.
- `OUTCOME_STATUS` is the **review** vocabulary. The scheduling status stays the session map; the outcome map is the review vocabulary admins act on (R33/R34).
- A session may carry BOTH a `statusId` (scheduling) and an `outcomeId` (review); they are **separate fields**. Display rule:
  - **Attendance page** — the **outcome** chip is primary; the scheduling status is not on the row (it shows in the drawer).
  - **Sessions page** — the scheduling **status** stays primary; a **secondary** outcome chip shows ONLY where a recorded outcome exists.
  - **Drawer** — labels BOTH "Status" (scheduling) and "Outcome" (review), with the outcome emphasized.
- No surface merges them into one code (the legacy 11-state conflation).

## 5. Student-absent vs teacher-absent (the required distinction — SC-002)

- The student-absent vs teacher-absent distinction MUST be **two separate statuses** (`studentAbsent`, `teacherAbsent`), never one "absent" status with a hidden party.
- On the list each renders its own distinct chip (icon + tone + label per §3).
- In the drawer the **who** is restated as an attribution line (`attribution.absentBy` → "Student absent" / "Teacher absent", see `outcome-details-contract.md`).
- A reviewer (and the screenshot matrix) MUST be able to tell the two apart **without relying on color** (icon + label carry the meaning).

## 6. Cancel reasons collapse to one status (who → drawer attribution)

- The legacy **three cancel reasons** (`teacher-cancel · student-cancel · admin-cancel`) MUST collapse to the **single** `cancelled` status.
- The *who cancelled* MUST NOT become three statuses; it is shown as a **drawer attribution attribute** (`attribution.cancelBy` ∈ `teacher | student | admin` → "Cancelled by the teacher/student/admin"), per `outcome-details-contract.md`.
- Other legacy collapses: `pending`/`waiting` → `upcoming`; `running` → `live`; `attend` → `attended`. None of the collapsed legacy ids survive in the map.

## 7. Display flags (additive, never standalone)

- `makeUpSuggested` and `needsFollowUp` are **display flags** rendered next to an outcome chip (e.g. a row's attention flag or the drawer's hint area), NOT outcome statuses; `outcomeChip(<flag>)` is allowed but a flag never substitutes for an outcome.
- `makeUpSuggested` is a **display-only** hint (the real make-up/credit action is disabled-with-reason — no finance/credit/accounting engine; cite `outcome-actions-contract.md`/D5).
- `needsFollowUp` drives the `attention` facet, the "تحتاج متابعة / Needs follow-up" tile count, and the minimal dashboard signal — all derived from the fixture, no engine.

## 8. Rendering rules (binding)

- Every chip MUST render as **icon + visible label text** — never a bare color swatch, never a numeric code, never an unlabeled dot.
- The label MUST come from i18n (`labelKey`), resolved per language at build time; no raw key may surface.
- Tone is an accent only; meaning is carried by **icon + label**. AA contrast in Light AND Dark themes.
- RTL/LTR safe — the icon sits at the inline-start; the label never mirrors its glyphs incorrectly; numbers/dates inside any consuming surface format per locale and never mirror.
- The same map is the single source of truth for the Attendance row chip, the summary-tile tone/icon, the Sessions secondary chip, the drawer "Outcome" row, and the profile/dashboard hints — one map, no per-surface fork.

## 9. API & `data-*` (exact — reuse only)

- Exports: `OUTCOME_STATUS` (the id → `{ tone, icon, labelKey }` map) and `outcomeChip(outcomeId)` (the renderer returning the baked `.chip tone-<tone>` HTML). Optionally `OUTCOME_ORDER` for stable tile/filter ordering. No other exports; no mutation API.
- Rows expose the value as `data-outcome="<id>"` (consumed by `applyFilter` + the `data-filter-set` tiles). The map adds **no new runtime hook** — it is pure build-time string composition baked into the static HTML.
- No JS-generated ids/classes; the chip markup is identical whether emitted by JS at build time or by Django at request time.

## 10. Static-HTML-first & Django mapping

- Chips are baked into the static `public/*.html` at build time (no `<div id="app">`, no runtime DOM build); relative assets; AR + EN pages; zero external/CDN requests; no chart/table/form/calendar library.
- Django: `OUTCOME_STATUS` → a template tag/filter **`outcome_chip`** (`{{ outcome.outcomeId|outcome_chip }}` or `{% outcome_chip outcome.outcomeId %}`) emitting the same `.chip tone-<tone>` markup + the localized label; the flags map to the same tag. The `data-outcome` facet is reproduced server-side. One tag, no per-template fork.

## 11. Edge cases & grayscale legibility (binding)

- **Mixed-state day** — a single day's list may show all seven outcomes at once; each chip MUST stay legible with **no color collision** (icon + label disambiguate, not hue).
- **Grayscale** — desaturating the page (or color-blind simulation) MUST leave every outcome distinguishable by its icon + label; `studentAbsent`/`teacherAbsent`/`cancelled` MUST NOT become indistinguishable.
- **Unknown id** — `outcomeChip(id)` falls back to `upcoming` (never throws, never blanks, never leaks a key).
- **Flag without an outcome** — a `makeUpSuggested`/`needsFollowUp` flag is always rendered ALONGSIDE an outcome chip, never as the row's only status.
- **Trial / type facet** — a `trial` session is filtered by a type facet (if present), NOT given an outcome chip; the map has no `trial` entry.
- **Long labels** — long AR/EN outcome labels wrap/truncate inside the chip without breaking the icon alignment in either direction.

## 12. Enforcement & cross-references

- **Smoke** (R43): every rendered outcome chip carries **both an icon and visible label text** (never a bare color/dot, never a numeric code); the map exposes exactly the seven ids + two flags; `studentAbsent` and `teacherAbsent` render as **distinct** chips (distinct tone + distinct label); no `status=0..N` numeric code appears in any baked output; no raw i18n key surfaces.
- **axe**: color-contrast (AA) passes for every chip tone in Light AND Dark; critical = 0.
- **Screenshots** (screenshot-acceptance): the Attendance list + the outcome drawer must visibly show **distinct student-absent vs teacher-absent chips** (and cancelled vs rescheduled) — a missing/merged distinction or a color-only/numeric status is a screenshot failure condition.
- Binds to `attendance-page-contract.md` (the row + tile consumer), `outcome-details-contract.md` (the drawer "Outcome" row + attribution), `outcome-actions-contract.md` (status-gated actions + the make-up/credit disabled-with-reason), `sessions-integration-contract.md` (the secondary chip), and `scope-guard.md` (no engines, no legacy numeric statuses). The Spec 001 `../../001-approved-dashboard-foundation/contracts/tokens-contract.md` (T7 chip tones) and the Spec 004 `../../004-family-student-profiles/contracts/families-page-contract.md` §10 (the separate lifecycle map) remain in force.
