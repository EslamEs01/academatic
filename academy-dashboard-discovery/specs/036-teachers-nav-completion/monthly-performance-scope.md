# Monthly Performance — Scope (Spec 036)

**Item:** `monthlyPerf` / الأداء الشهري
**Decision:** **Fold as a display-only TAB** on `teacher-performance.html` → `teacher-performance.html#view=monthly`. **Count 0.** No existing surface (built fresh, display-only).

## Tab vs page decision
- Spec 033 (matrix row 44 / CS-13 / page-vs-deeplink row 20): **Fold (tab) recommended**, count 0. Same `teacher-performance.html` host + `tabs()` widget added by the sessionsKpi fold.

## Legacy grounding (and the critical boundary)
- Legacy "Monthly Performance" (`/management/teacher-feedback`, `management-teacher-feedback.md:170-188`): a read-only monthly report — filter (teachers[]/date_month/date_year) → Table 1 (#, Teacher Name, **Percentage**, Note, Action) + Table 2 (Category, **Percentage**), plus feedback-category management (Add Category modal: name/description/status; Add feedback: date/teacher_id/feedback_note).
- **CRITICAL:** legacy showed a **computed `Percentage`** per teacher and per category. Spec 036 **MUST NOT reproduce a computed percentage/score**. The honest fold renders **authored month + categorical trend/status + notes** only.
- **Do not duplicate Spec 029:** the feedback-review/forms engine already folded into `reports.html` (Spec 029). This tab is a display-only monthly-performance BOARD, not a second feedback engine; any Add-feedback/Add-category writes stay `backendRequired` gates (or are omitted) and are NOT reproduced as a working workflow here.

## Display sections (all authored, display-only)
- Section heading + a "display only" note.
- Filters (grounded): teacher + month + year as `filterBar` select facets over authored rows.
- A **per-teacher monthly board** (rows/cards): teacher name + status chip + month label + a **categorical** trend/status chip (icon+text; e.g. improving / steady / needs-attention) + an authored note/recommendation line. Optional read-only detail drawer.
- Reuses existing primitives (`cardGrid`/`filterBar`/`facetAttrs`/`chip`/`sheetRow`).

## Allowed authored data
- A small additive authored fixture of monthly rows (teacher + month + categorical trend + note). No PII, no pay, no computed value.

## Forbidden (hard)
- ❌ computed score / rank / rating / **percentage** / rubric-total
- ❌ `<canvas>` / chart / graph
- ❌ salary / rate / fine / payout / any pay figure
- ❌ fake export / PDF; fake save/publish; row/status mutation; backend/API/external request

## Teacher pay-free guard
- Month rows carry names/labels/notes only; pay-token grep = 0.

## Final gated actions (if any)
- Display-only. Any Add-note/Approve surfaced = `data-disabled-reason` backendRequired gate.

## Smoke / a11y / screenshot scope
- **Smoke:** `teacher-performance.html#view=monthly` opens the monthly tab; authored rows render; a month/teacher facet narrows rows; **0** computed-percentage/score/`<canvas>` token; **0** pay token; nav `monthlyPerf` = implemented anchor to that hash route.
- **A11y:** `teacher-performance` `#view=monthly` AR/EN light/dark + mobile-390 → 0/0.
- **Screenshots:** AR + EN frames of the monthly tab.
