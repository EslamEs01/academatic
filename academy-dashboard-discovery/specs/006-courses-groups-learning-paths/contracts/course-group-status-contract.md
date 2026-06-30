# Contract: Course / Group / Enrollment Status Maps + Reconciliation

**Status**: Binding · three labeled status vocabularies for Spec 006, each `id → { id, tone, icon, labelKey }`, rendered via the generic `chip` (`components/ui.js`) as **icon + label, never numeric or color-only**, AA-contrast, AR/EN:
- `app/src/js/components/course-status.js` → **EXTEND** `COURSE_STATUS` (today inline in `fixtures/courses.js`) + `courseStatusOf(id)` + `courseStatusChip(id)`.
- `app/src/js/components/group-status.js` → **NEW** `GROUP_STATUS` + `GROUP_STATUS_ORDER` + `groupStatusOf(id)` + `groupStatusChip(id)`, plus the separate **`needsAttention` flag** rendered via the existing `attentionFlag`.
- `app/src/js/components/enrollment-status.js` → **NEW**; **RELOCATE** the local `courseStatusChip`/`COURSE_STATUS` currently inside `pages/student.js` (lines ~35–40) here as `ENROLLMENT_STATUS` + `enrollmentStatusOf(id)` + `enrollmentStatusChip(id)`, so it stops shadowing the catalogue `CourseStatus`.

Realizes R46, FR-016/FR-017/FR-018, data-model #2/#8/#8b, SC-002. These are the **fourth, fifth, and sixth** status vocabularies in the app and MUST stay distinct from the three already in force (session, lifecycle, outcome).

## 1. Purpose & reuse (the three-map problem — R46)

- The legacy system encoded status as **opaque numeric URL codes** (`status[0]=0..5`). They MUST NOT be imported, themed, aliased, or relied on (documented anti-pattern in `scope-guard.md`).
- Spec 006 needs **three distinct, labeled** status semantics — *catalogue* (is the academy offering this subject?), *cohort* (what state is this class in?), and *enrollment* (where is this one student in this one course?). Collapsing them into one map reproduces the legacy conflation; this contract keeps them **separate, owned, and non-shadowing**.
- Each chip MUST be composed from the **existing** generic `chip({ tone, icon, labelKey })` atom — exactly as `statusChip` / `familyStatusChip` / `outcomeChip` do — so colors never drift and **no new chip CSS / no new tone token** is introduced. Reuse the existing `.chip tone-<tone>` look + the vendored `lucide-static` icons.
- Each renderer MUST fall back safely for an unknown id (never throw, never blank, never leak a raw key / numeric code): `courseStatusOf` → `active`, `groupStatusOf` → `active`, `enrollmentStatusOf` → `active`.
- This contract defines **vocabularies**, not workflows: no state machine, no transitions engine, no persistence. `needsAttention` is a **flag**, not a status (§4).

## 2. The id sets (binding — exact)

| Map | ids (exact, no more, no fewer) | + flag |
|---|---|---|
| **CourseStatus** | `active · draft · paused · archived` | — |
| **GroupStatus** | `active · trial · full · paused · completed` | `needsAttention` (separate flag) |
| **EnrollmentStatus** | `active · paused · completed` | — |

Rules:
- `CourseStatus` **EXTENDS** the existing `active / draft / archived` by adding exactly one id — **`paused`**. No other id may be added.
- `GroupStatus` is **NEW** with exactly the five ids above; `trial` here is a **cohort** facet (a forming class), unrelated to the family-lifecycle `trial`.
- `EnrollmentStatus` is the relocated local map with exactly `active / paused / completed`; **`trial` MAY be added ONLY if a fixture enrollment is `trial`** (none today → it MUST NOT be defined speculatively).
- No id may be added to any map without amending this contract; **no legacy numeric code** (`0..5`) may survive in any map or any baked output.

## 3. CourseStatus — tone / icon / label table (binding)

Catalogue card (`courses.html`) + course profile banner (`course.html`). Reuse existing chip tones only.

| id | tone (token) | icon (lucide, vendored) | label (AR / EN) | meaning |
|---|---|---|---|---|
| `active` | `completed` | `check-circle` | نشِطة / Active | the academy is running this subject |
| `draft` | `amber` | `edit` | مسودة / Draft | being prepared, not yet offered |
| **`paused`** *(NEW)* | `amber` | `pause-circle` | متوقفة مؤقتًا / Paused | temporarily not enrolling/running |
| `archived` | `neutral` | `archive` | مؤرشفة / Archived | retired offering |

- `labelKey` keeps the **existing** `cur.status.*` namespace already used by the live fixture: `cur.status.active` · `cur.status.draft` · **`cur.status.paused`** (NEW key) · `cur.status.archived`. Both AR and EN keys MUST exist; no raw key surfaces.
- `draft` and `paused` share the `amber` tone; they MUST stay distinguishable by **icon + label** (`edit` vs `pause-circle`), never by hue alone.
- Exports: `COURSE_STATUS`, `COURSE_STATUS_ORDER = ['active','draft','paused','archived']`, `courseStatusOf(id)`, `courseStatusChip(id)`.

## 4. GroupStatus — tone / icon / label table + the needsAttention flag (binding)

Groups directory (`groups.html` rows/tiles) + group profile banner (`group.html`).

| id | tone (token) | icon (lucide, vendored) | label (AR / EN) | meaning |
|---|---|---|---|---|
| `active` | `completed` | `check-circle` | نشِطة / Active | running cohort |
| `trial` | `upcoming` *(sky)* | `sparkles` | تجريبية / Trial | a forming/trial cohort |
| `full` | `neutral` | `users` | مكتملة العدد / Full | at capacity (`enrolledCount === capacity`) |
| `paused` | `amber` | `pause-circle` | متوقفة مؤقتًا / Paused | temporarily not meeting |
| `completed` | `neutral` | `flag` | منتهية / Completed | the cohort finished |

- `labelKey` namespace: `group.status.{active,trial,full,paused,completed}` (mirrored AR/EN). No raw key surfaces.
- Exports: `GROUP_STATUS`, `GROUP_STATUS_ORDER = ['active','trial','full','paused','completed']`, `groupStatusOf(id)`, `groupStatusChip(id)`.
- **`needsAttention` is a SEPARATE FLAG, not a status** (mirroring the Spec 005 `needsFollowUp` / `makeUpSuggested` flag pattern). It MUST be rendered via the **existing** `attentionFlag(att)` (amber, `alert-triangle`, icon + label) **alongside** — never instead of — the group-status chip. A group has BOTH a `statusId` and an optional `needsAttention` flag; they are **separate fields**. `groupStatusChip` MUST NOT emit the attention flag, and the flag MUST NOT substitute for the status chip.
- `full` and `completed` share the `neutral` tone; they MUST stay distinguishable by **icon + label** (`users` vs `flag`).

## 5. EnrollmentStatus — tone / icon / label table (relocation, binding)

Student profile **Courses** tab only (`student.html`, the student↔course link). This is the **relocated** local map from `pages/student.js`; tones/icons/labels are **kept** (R46 "keep, don't duplicate") so the existing visual is preserved.

| id | tone (token) | icon (lucide, vendored) | label (AR / EN) | meaning |
|---|---|---|---|---|
| `active` | `live` | `play` | جارية / Active | the student is currently taking the course |
| `paused` | `amber` | `pause-circle` | متوقفة / Paused | the student paused this enrollment |
| `completed` | `completed` | `check-circle` | مكتملة / Completed | the student finished the course |

- `labelKey` namespace: `enroll.status.{active,paused,completed}` (mirrored AR/EN); the prior local keys `sp.courseStatus.*` are **migrated** to these and MUST NOT remain as a second source.
- Exports: `ENROLLMENT_STATUS`, `enrollmentStatusOf(id)`, `enrollmentStatusChip(id)`.
- **No-shadowing distinctness (binding):** EnrollmentStatus `active` (tone `live`, icon `play`) is intentionally **different** from CourseStatus `active` (tone `completed`, icon `check-circle`) so "the student is actively taking it" never reads as "the catalogue offering is live", and vice-versa. The name `courseStatusChip` MUST NOT exist in `student.js` after relocation.

## 6. Distinctness — six separate vocabularies (no merge, no double-encoding — R46)

The app now owns six labeled status maps; each is a separate field and a separate map. None may import, alias, or merge another:

| Map | File | Domain | Where rendered |
|---|---|---|---|
| Session/scheduling | `status-map.js` (`live/upcoming/completed/cancelled`) | a session's scheduling state | Sessions / Schedule / drawer "Status" row |
| Family lifecycle | `family-status.js` (`active/trial/suspended/stopped/inactive`) | people lifecycle | Families / profiles |
| Outcome (review) | `outcome-status.js` (`attended/studentAbsent/…` + flags) | session review outcome | Attendance / Sessions secondary / drawer "Outcome" |
| **Course** | `course-status.js` (`active/draft/paused/archived`) | catalogue offering | **catalogue card + course banner** |
| **Group** | `group-status.js` (`active/trial/full/paused/completed` + `needsAttention`) | cohort/class state | **groups directory + group banner** |
| **Enrollment** | `enrollment-status.js` (`active/paused/completed`) | one student in one course | **student Courses tab** |

- The same words MUST NOT be conflated across domains: scheduling `completed` ≠ course/group/enrollment `completed`; group/course `paused` ≠ enrollment `paused` (different subject); family-lifecycle `trial` ≠ group `trial`. They are intentionally the same word in different maps and MUST keep separate ownership.
- No surface merges any two of these into one code or one chip.

## 7. Reconciliation — which map renders WHERE + the no-shadowing rule (binding — R46)

| Surface | Renders | MUST NOT render |
|---|---|---|
| Courses catalogue card (`courses.html`) | `courseStatusChip(course.statusId)` | group/enrollment chips |
| Course profile banner (`course.html`) | `courseStatusChip(course.statusId)` | group/enrollment chips |
| Groups directory row + tiles (`groups.html`) | `groupStatusChip(group.statusId)` + (optional) `attentionFlag` when `needsAttention` | course/enrollment chips |
| Group profile banner (`group.html`) | `groupStatusChip(group.statusId)` + `attentionFlag` when `needsAttention` | course/enrollment chips |
| Student profile Courses tab (`student.html`) | `enrollmentStatusChip(enrollment.statusId)` | the catalogue `courseStatusChip` |

- **No-shadowing rule (binding):** the catalogue `CourseStatus` (subject offering) and the per-student `EnrollmentStatus` MUST NEVER appear on the same surface as each other's, and the student Courses tab MUST render **EnrollmentStatus** — never the catalogue map. The relocation in §5 is what enforces this: there MUST be exactly ONE map named for the catalogue (`COURSE_STATUS` in `course-status.js`) and exactly ONE for enrollment (`ENROLLMENT_STATUS` in `enrollment-status.js`); the legacy duplicate-named local map in `student.js` MUST be removed.
- A course card/banner shows the offering's status; the student↔course link shows the student's enrollment status; a reviewer (and the screenshot matrix) can always tell which is which by **map ownership + label**, not by surface guesswork.

## 8. Rendering rules (binding)

- Every chip MUST render as **icon + visible label text** — never a bare color swatch, never a numeric code, never an unlabeled dot.
- The label MUST come from i18n (`labelKey`), resolved per language at build time; no raw key may surface.
- Tone is an accent only; meaning is carried by **icon + label**. AA contrast in Light AND Dark themes.
- RTL/LTR safe — the icon sits at the inline-start; the label never mirrors glyphs incorrectly; any numbers inside a consuming surface format per locale and never mirror.
- Each map is the **single source of truth** for its chip across every surface (card, banner, tile, row, drawer hint) — one map per domain, no per-surface fork.

## 9. API & `data-*` (exact — reuse only)

- Exports per §3/§4/§5 only; no mutation API, no other exports.
- Rows/cards expose the value as `data-status="<id>"` (course/group) consumed by the existing `applyFilter` + the `data-filter-set` tiles; the `needsAttention` flag is exposed as the existing `data-attention="<kind>"` facet (consumed by the attention filter). The maps add **no new runtime hook** — they are pure build-time string composition baked into the static HTML.
- No JS-generated ids/classes; chip markup is identical whether emitted by JS at build time or by Django at request time.

## 10. Static-HTML-first & Django mapping

- Chips are baked into the static `public/*.html` at build (no `<div id="app">`, no runtime DOM build); relative assets; AR + EN pages; zero external/CDN requests; no chart/table/form/calendar library.
- Django template filters emitting the same `.chip tone-<tone>` markup + localized label:
  - `{{ course.status|course_status_chip }}`
  - `{{ group.status|group_status_chip }}` and `{% if group.needs_attention %}{{ group|attention_flag }}{% endif %}`
  - `{{ enrollment.status|enrollment_status_chip }}`
- The `data-status` / `data-attention` facets are reproduced server-side. One tag per map, no per-template fork.

## 11. Edge cases & grayscale legibility (binding)

- **A `full` group** — labeled "full" (icon `users` + label), never color-only; capacity is shown as "8 / 10" text in the card/banner; the `addStudents` action is gated (see `course-group-actions-contract.md`), the status chip itself never implies an action.
- **A `draft`/`paused` course with zero groups/students** — the chip still renders (calm), and the profile shows a "no groups/students yet" **empty-data** state (distinct from a filter no-result).
- **A `needsAttention` group** — the amber attention flag renders ALONGSIDE the status chip, never as the only signal; a group with no flag shows the status chip alone (no empty flag slot).
- **Grayscale / color-blind sim** — desaturating MUST leave every status distinguishable by icon + label; the same-tone pairs (course `draft`/`paused` amber; group `full`/`completed` neutral) MUST NOT become indistinguishable.
- **Unknown id** — each `*StatusOf` falls back per §1; never throws, never blanks, never leaks a key.
- **No `trial` enrollment in fixtures** — `EnrollmentStatus` MUST NOT define a `trial` entry speculatively (§2).

## 12. Enforcement, acceptance & cross-references

- **Smoke** (R55): every rendered course/group/enrollment chip carries **both an icon and visible label text** (never a bare color/dot, never a numeric code); `COURSE_STATUS` exposes exactly the four ids incl. `paused`; `GROUP_STATUS` exactly the five ids; `ENROLLMENT_STATUS` exactly three; the `needsAttention` flag renders **distinct** from the group-status chip; the student Courses tab renders the **enrollment** map and `student.js` no longer defines a local `courseStatusChip` (no-shadowing); no `status=0..N` numeric code appears in any baked output; no raw i18n key surfaces; no map imports another.
- **axe**: color-contrast (AA) passes for every chip tone in Light AND Dark; critical = 0.
- **Screenshots** (screenshot-acceptance): the Courses catalogue, Groups directory, and student Courses tab must each visibly show their OWN labeled map (a course `paused` chip, a group `full`/`trial`/`needsAttention` chip, an enrollment chip) — a merged/color-only/numeric status, or the catalogue map shadowing the enrollment map, is a screenshot failure condition.

**Acceptance (binding):**
1. **Given** the Courses catalogue and a course profile banner, **When** rendered, **Then** each shows a `courseStatusChip` (active/draft/paused/archived) as icon+label — and `paused` is present in the extended map. *(FR-016)*
2. **Given** the Groups directory and a group profile banner, **When** rendered, **Then** each shows a `groupStatusChip` (active/trial/full/paused/completed) as icon+label, with the `needsAttention` flag rendered separately (never numeric/color-only). *(FR-017)*
3. **Given** the student Courses tab, **When** rendered, **Then** each enrollment shows an `enrollmentStatusChip` (active/paused/completed) and NO catalogue `courseStatusChip` — the no-shadowing relocation holds. *(FR-018 reconciliation)*
4. **Given** all six maps, **When** audited, **Then** none imports/aliases/merges another and no legacy numeric code survives.

- Binds to: `course-group-actions-contract.md` (the `full`-gated `addStudents` + status-gated actions), `learning-path-contract.md` (the level ladder is display-only, NOT a status lifecycle — FR-018), `courses-page-contract.md` / `groups-page-contract.md` (the card/row/tile consumers), `course-profile-contract.md` / `group-profile-contract.md` (the banners), `student-family-impact-contract.md` (the relocated enrollment chip), `static-html-django-ready-contract.md`, and `scope-guard.md` (no engines, no legacy numeric statuses). The Spec 005 `../../005-attendance-session-outcomes/contracts/outcome-status-contract.md` (the third map), the Spec 004 `../../004-family-student-profiles/contracts/families-page-contract.md` (the lifecycle map), and the Spec 001 `../../001-approved-dashboard-foundation/contracts/tokens-contract.md` (T7 chip tones) remain in force.
