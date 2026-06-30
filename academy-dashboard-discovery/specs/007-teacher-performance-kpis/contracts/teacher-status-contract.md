# Contract: Teacher Status / Workload / Follow-up Maps (Spec 007)

**Status**: Binding · Defines the THREE new labeled teacher vocabularies (status · workload · follow-up signal) + the reuse of availability, all **icon+text, never numeric/color-only**, all **authored fixture flags** (never computed scores/ranks), each **distinct** from the existing six maps. References FR-012 / FR-013; SC-002; data-model §2 / §3 / §4 / §5.

---

## 1. Purpose & reuse (the multi-map problem)

The teacher needs several orthogonal labeled signals the admin reads separately: **status** (lifecycle), **availability** (schedule), **workload** (load hint), **follow-up** (delivery signal). Spec 007 adds three NEW maps and reuses the existing availability map — **without** chip clutter and **without** any of them becoming a computed metric.

## 2. The id sets (binding — exact)

- **teacher-status** (`teacher-status.js`): `active`, `paused`, `inactive`.
- **availability** (REUSED `TEACHER_AVAIL`): `available`, `busy`, `off`.
- **workload** (`teacher-signals.js`): `light`, `balanced`, `high`.
- **follow-up signal** (`teacher-signals.js`): `strongDelivery`, `stable`, `needsFollowUp`, `attentionRisk`.

## 3. TeacherStatus map (tone / icon / label)

`{ id, tone, icon, labelKey }`:

| id | tone | icon | labelKey | AR | EN |
|---|---|---|---|---|---|
| `active` | `completed` | `check-circle` | `trn.status.active` | نشط | Active |
| `paused` | `amber` | `pause-circle` | `trn.status.paused` | متوقّف مؤقتًا | Paused |
| `inactive` | `neutral` | `user-x` | `trn.status.inactive` | غير نشط | Inactive |

Collapses the legacy active/inactive/incomplete/unconfirmed/deleted into three calm labels. `TEACHER_STATUS_ORDER = ['active','paused','inactive']`; `teacherStatusOf(id)` (fallback `active`); `teacherStatusChip(id)`.

## 4. TeacherWorkload map

`{ id, tone, icon, labelKey }`:

| id | tone | icon | labelKey | AR | EN |
|---|---|---|---|---|---|
| `light` | `sky` | `trending-down` | `trn.workload.light` | حِمل خفيف | Light load |
| `balanced` | `teal` | `activity` | `trn.workload.balanced` | حِمل متوازن | Balanced |
| `high` | `amber` | `trending-up` | `trn.workload.high` | حِمل مرتفع | High load |

A **display-only authored fixture flag** (backed by the teacher's session/hour counts), never a computed load metric. `WORKLOAD_ORDER = ['light','balanced','high']`; `workloadOf(id)`; `workloadChip(id)`.

## 5. TeacherFollowUpSignal map

`{ id, tone, icon, labelKey }`:

| id | tone | icon | labelKey | AR | EN |
|---|---|---|---|---|---|
| `strongDelivery` | `completed` | `award` | `trn.signal.strongDelivery` | أداء قوي | Strong delivery |
| `stable` | `teal` | `check-circle` | `trn.signal.stable` | مستقر | Stable |
| `needsFollowUp` | `amber` | `alert-triangle` | `trn.signal.needsFollowUp` | يحتاج متابعة | Needs follow-up |
| `attentionRisk` | `coral` | `flag` | `trn.signal.attentionRisk` | بحاجة انتباه | Attention risk |

A **display-only authored flag** — NOT a score, rank, percentile, or predicted risk. `SIGNAL_ORDER = ['strongDelivery','stable','needsFollowUp','attentionRisk']`; `signalOf(id)`; `signalChip(id)`. (Icons are finalized against the vendored sprite at implementation; the build throws on an unknown id — every value stays icon+text.)

## 6. Distinctness — a SEVENTH/EIGHTH/NINTH vocabulary (no merge)

The existing labeled maps are **six**: session (`status-map`), family-lifecycle (`family-status`), outcome (`outcome-status`), course (`course-status`), group (`group-status`), enrollment (`enrollment-status`). Spec 007 adds **teacher-status** (7th), **workload** (8th), and **follow-up signal** (9th) as **separate** vocabularies with their own labelKey namespaces (`trn.status.*` / `trn.workload.*` / `trn.signal.*`). They are NEVER merged with each other or with the six. The `needsFollowUp` follow-up id intentionally shares a *concept* with the `outcome-status` follow-up **flag** but is a different map and renders in a different surface (§7).

## 7. Reconciliation — which map renders WHERE + the no-shadowing rule

| Map | Renders on | Never on |
|---|---|---|
| teacher-status | teacher card + profile banner | session/course/group rows |
| availability (reused) | profile banner meta + Teachers filter facet | as a status |
| workload | teacher card + banner + perf comparison row | as a session/outcome chip |
| follow-up signal | teacher card flag (only when needed) + perf comparison row + follow-up queue | as a per-session outcome chip |
| outcome-status (reused) | Sessions & Outcomes rows + drawer | the teacher card/banner |

**No chip clutter**: the teacher **card** shows **status + workload + one follow-up flag only when flagged** (not all four); the **banner** shows status + workload + availability; the **performance board** carries the follow-up signal. The four teacher chips are orthogonal and never stacked indiscriminately.

## 8. Rendering rules

Every chip is `chip({ labelKey, tone, icon })` → `<span class="chip tone-<tone>">` with an inline SVG icon + the resolved label. **Never** a bare number, a bare color dot, or a raw key. Grayscale-legible (icon + text carry meaning without color). Fallback-safe (`*Of(id)` returns a default, never `undefined`).

## 9. API & `data-*`

Exports: `TEACHER_STATUS`/`TEACHER_STATUS_ORDER`/`teacherStatusOf`/`teacherStatusChip` (`teacher-status.js`); `TEACHER_WORKLOAD`/`WORKLOAD_ORDER`/`workloadOf`/`workloadChip` + `TEACHER_SIGNAL`/`SIGNAL_ORDER`/`signalOf`/`signalChip` (`teacher-signals.js`). Facet attrs on rows: `data-status`, `data-workload`, `data-signal` (lowercased by `facetAttrs`) for the client-side filters. No new hook.

## 10. Static-HTML-first & Django

Chips are baked into the cards/rows/banner/tiles. **Django**: `{{ teacher.statusId|teacher_status_chip }}`, `{{ teacher.workload|workload_chip }}`, `{{ teacher.followUp|teacher_signal_chip }}`, `{{ teacher.avail|teacher_avail_chip }}` template tags.

## 11. Edge cases & grayscale legibility

- A teacher with an unknown/absent flag → the `*Of` fallback (`active` / no workload chip / no follow-up flag) renders calmly.
- In grayscale, status vs workload vs follow-up stay distinguishable by **icon + label** (not color).
- `needsFollowUp` (teacher) and the outcome follow-up flag never appear on the same element.

## 12. Enforcement

- **Smoke**: each teacher status/workload/follow-up chip renders with an SVG icon + non-empty text (never numeric/color-only); the facets `data-status`/`data-workload`/`data-signal` are present and lowercased; the maps are three distinct exports, not extensions of the six existing maps; no raw `trn.*` key leaks.
- **a11y**: contrast AA in light + dark; meaning conveyed by icon+text.

**Binds to** `teachers-page-contract.md`, `teacher-profile-contract.md`, `teacher-performance-contract.md`, and the Spec 006 `../../006-courses-groups-learning-paths/contracts/course-group-status-contract.md` (the multi-map-distinctness precedent). **MUST NOT** render a numeric/color-only teacher indicator, compute a status from a formula, or merge any teacher map with the six existing maps.

**Acceptance (binding):**
1. **Given** any teacher chip, **When** rendered, **Then** it is icon+text from its labeled map — never numeric-only or color-only.
2. **Given** the three new maps, **When** inspected, **Then** they are distinct vocabularies (`trn.status.*`/`trn.workload.*`/`trn.signal.*`), separate from the six existing maps.
3. **Given** a teacher card, **When** rendered, **Then** it shows status + workload + a follow-up flag only when flagged (no four-chip clutter).
