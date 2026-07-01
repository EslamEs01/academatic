# Contract: Report Signal / Availability Maps (Spec 008)

**Status**: Binding · Defines the TWO new labeled report vocabularies (signal + availability) — icon+text, never numeric/color-only, **authored display flags** (never computed scores/grades), distinct from the existing maps. References FR-009; SC-002; data-model §4 / §5.

---

## 1. Purpose & reuse

The Reports shell needs two calm labeled signals the admin reads at a glance: a per-area **health signal** (is this area healthy or does it need follow-up?) and a per-category **availability** (is this report available now, demo-only, planned, or backend-required?). Spec 008 adds two NEW maps and **reuses** the existing status chips (`outcome-status`/`status-map`/`group-status`/`teacher-signals`) for the per-area factual counts — **without** any of them becoming a computed metric.

## 2. The id sets (binding — exact)

- **report-signal** (`report-status.js`): `healthy`, `needsFollowUp`, `attentionRisk`.
- **report-availability** (`report-status.js`): `available`, `demoOnly`, `planned`, `backendRequired`.

## 3. ReportSignal map (tone / icon / label)

`{ id, tone, icon, labelKey }`:

| id | tone | icon | labelKey | AR | EN |
|---|---|---|---|---|---|
| `healthy` | `completed` | `check-circle` | `rep.signal.healthy` | سليم | Healthy |
| `needsFollowUp` | `amber` | `alert-triangle` | `rep.signal.needsFollowUp` | يحتاج متابعة | Needs follow-up |
| `attentionRisk` | `cancelled` | `x-circle` | `rep.signal.attentionRisk` | بحاجة انتباه | Attention risk |

An **authored display flag** summarizing an area's state from its fixture counts (e.g. an area with a non-zero needs-follow-up count → `needsFollowUp`). **NOT** a computed score/grade/percentile. `REPORT_SIGNAL_ORDER = ['healthy','needsFollowUp','attentionRisk']`; `reportSignalOf(id)` (fallback `healthy`); `reportSignalChip(id)`.

## 4. ReportAvailability map

`{ id, tone, icon, labelKey }`:

| id | tone | icon | labelKey | AR | EN |
|---|---|---|---|---|---|
| `available` | `live` | `check` | `rep.avail.available` | متاح الآن | Available |
| `demoOnly` | `upcoming` | `sparkles` | `rep.avail.demoOnly` | عرض تجريبي | Demo only |
| `planned` | `neutral` | `clock` | `rep.avail.planned` | قيد التخطيط | Planned |
| `backendRequired` | `amber` | `lock` | `rep.avail.backendRequired` | يتطلب الخادم | Backend required |

Labels each category card honestly: `available` = links to a real implemented page; `planned`/`backendRequired` = disabled-with-reason (no route). `AVAILABILITY_ORDER = ['available','demoOnly','planned','backendRequired']`; `availabilityOf(id)`; `availabilityChip(id)`. (Icons finalized against the vendored sprite; every value stays icon+text.)

## 5. Distinctness — two NEW vocabularies (no merge)

The existing labeled maps are session (`status-map`), outcome (`outcome-status`), course (`course-status`), group (`group-status`), enrollment (`enrollment-status`), family-lifecycle (`family-status`), teacher-status, workload, follow-up (Spec 007). Spec 008 adds **report-signal** and **report-availability** as **separate** vocabularies with their own labelKey namespaces (`rep.signal.*` / `rep.avail.*`). They are NEVER merged with each other or with the existing maps.

## 6. Reconciliation — which vocabulary renders WHERE (no shadowing)

| Map | Renders on | Never on |
|---|---|---|
| report-availability | category cards | the operations overview tiles |
| report-signal | operations overview + per-area sections | a category card's availability slot |
| outcome-status (reused) | Attendance + Teacher sections | category cards |
| session status-map (reused) | Sessions section | category cards |
| group-status (reused) | Courses & Groups section | category cards |

## 7. Rendering rules

Every chip is `chip({ labelKey, tone, icon })` → `<span class="chip tone-<tone>">` with an inline SVG icon + the resolved label. **Never** a bare number, a bare color dot, or a raw key. Grayscale-legible (icon + text). Fallback-safe (`*Of(id)` returns a default).

## 8. API & `data-*`

Exports: `REPORT_SIGNAL`/`REPORT_SIGNAL_ORDER`/`reportSignalOf`/`reportSignalChip` + `REPORT_AVAILABILITY`/`AVAILABILITY_ORDER`/`availabilityOf`/`availabilityChip` (`report-status.js`). Facet attrs on filterable category cards: `data-availability`, `data-signal`, `data-area` (lowercased by `facetAttrs`). No new hook.

## 9. Static-HTML-first & Django

Chips are baked into the cards/sections/tiles. **Django**: `{{ category.availability|report_availability_chip }}`, `{{ section.signal|report_signal_chip }}` template tags.

## 10. Edge cases & grayscale legibility

- An area with zero follow-up signals → `healthy` (calm "all clear"), never a broken/empty chip.
- In grayscale, healthy vs needsFollowUp vs attentionRisk (and available vs planned vs backendRequired) stay distinguishable by **icon + label**, not color.
- `report-signal.needsFollowUp` and the `outcome-status`/`teacher-signal` follow-up concepts never appear on the same element (they render in different surfaces).

## 11. Enforcement

- **Smoke**: each report-signal/availability chip renders with an SVG icon + non-empty text (never numeric/color-only); the facets `data-availability`/`data-signal` are present + lowercased; the maps are two distinct exports, not extensions of the existing maps; no raw `rep.*` key leaks.
- **a11y**: contrast AA in light + dark; meaning conveyed by icon+text.

**Binds to** `reports-page-contract.md`, `academic-operations-contract.md`, and the Spec 007 `../../007-teacher-performance-kpis/contracts/teacher-status-contract.md` (the multi-map-distinctness precedent). **MUST NOT** render a numeric/color-only report indicator, compute a signal from a formula (it is authored from fixture counts via a simple threshold, not a score), or merge with the existing maps.

**Acceptance (binding):**
1. **Given** any report chip, **When** rendered, **Then** it is icon+text from its labeled map — never numeric-only or color-only.
2. **Given** the two new maps, **When** inspected, **Then** they are distinct vocabularies (`rep.signal.*`/`rep.avail.*`), separate from the existing maps.
3. **Given** a category card, **When** rendered, **Then** its availability chip matches its route state (available → real `<a>`; planned/backendRequired → disabled-with-reason).
