# Contract: Academic Operations Overview (Spec 008)

**Status**: Binding · Defines the operations-overview band on the Reports shell — a calm `summaryCards`-style row of fixture **counts** + labeled report-signal chips, every number a roll-up of an existing fixture summary. References FR-003; SC-009; data-model §1 / §6.

---

## 1. Purpose & reuse

Give the admin one calm glance answering "what needs follow-up today?" — a band of headline academic-operations counts drawn entirely from existing fixture summaries, each in its area's tone, with a labeled report-signal. It reuses `summaryCards` (or the `card`/`statMini` atoms) — **no new metric, no chart, no score**.

## 2. Data source (binding — roll-up only)

The overview tiles are **existing fixture counts only** (no fabrication):

| Tile | Source export |
|---|---|
| completed sessions | `OUTCOME_SUMMARY.attended` (or `STATUS_SUMMARY` completed) |
| teacher absences | `OUTCOME_SUMMARY.teacherAbsent` |
| student absences (in teacher sessions) | `OUTCOME_SUMMARY.studentAbsent` |
| cancelled / rescheduled | `OUTCOME_SUMMARY.cancelledOrRescheduled` |
| groups needing attention | `GROUP_SUMMARY.needsAttention` |
| teachers needing follow-up | `TEACHERS_NEEDING_FOLLOWUP` |
| students/families needing follow-up | the `dashboard.js` students count + `FAMILIES.rows.filter(f=>f.attention).length` |

These are the **same** counts the dashboard chips show — the overview and the dashboard MUST agree.

## 3. Anatomy (RTL, top → bottom)

A `summaryCards`-style band (icon medallion + large tabular **count** + label per tile), optionally with a labeled **report-signal** chip per area (e.g. an area with non-zero follow-up → `needsFollowUp`). Tiles are display-only; tones are the areas' existing tones. **No trend arrow that implies a computed trend** (the existing `trendPill` MUST NOT be used here to fake a trend); **no chart**.

## 4. Report-signal derivation (authored threshold, not a score)

Each area's report-signal is an **authored threshold** over its fixture count, not a computed score: e.g. `needsFollowUp` when the area's needs-follow-up/attention count > 0, else `healthy`; `attentionRisk` reserved for an area with a high authored-threshold concern. This is a labeled flag (icon+text), never a number/percentage/grade.

## 5. teacherAbsent vs studentAbsent (binding)

The overview MUST show **teacher absences** and **student absences in teacher sessions** as **two distinct labeled tiles** — never summed into one "absences" tile.

## 6. Empty / all-clear state

If every area count is zero (no fixture concerns), the overview shows a calm "all clear" with `healthy` signals — never a broken/empty band.

## 7. `data-*` hooks

None new — the overview is static display. No chart/canvas.

## 8. Static-HTML-first & Django

The band is baked. **Django**: `{% for tile in academic_ops %}` over a fixture context dict; the report-signal via a template tag.

## 9. Enforcement

- **Smoke**: the overview band is baked with fixture count tiles; **teacher absences and student absences are two distinct tiles**; each tile's number matches its source export (e.g. equals the dashboard chip count); **no chart/canvas, no trendPill faking a trend, no score/%-as-grade**.
- **Screenshots**: the overview region is reviewed within frame #1 (`reports__ar__light__desktop.png`).

**Binds to** `reports-page-contract.md`, `report-status-contract.md`, the per-area report contracts, and `scope-guard.md`. **MUST NOT** add a chart, a computed score/trend/percentile, a finance tile, or a fabricated metric.

**Acceptance (binding):**
1. **Given** the overview, **When** rendered, **Then** every tile is a fixture count (matching its source export + the dashboard chip) with a labeled report-signal — no chart, no score/trend.
2. **Given** the overview, **When** audited, **Then** teacher absences and student absences appear as two distinct tiles.
