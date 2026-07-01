# Contract: Sessions & Timetable Report Section (reuse Spec 001/003)

**Status**: Binding · The Sessions & Timetable section + category card. Reuses the Spec 001/003 session status map + `STATUS_SUMMARY` + `SESSIONS.total`; drill-down to `sessions.html` and `schedule.html#view=timetable`. No scheduling engine. References FR-005; data-model §8.

---

## 1. Purpose & reuse

Summarize session/timetable health — a labeled session-status breakdown (live/upcoming/completed/cancelled) + the total — and link to the sessions list + the timetable view. Reuses `STATUS_SUMMARY` (`fixtures/status-summary.js`) + the session `status-map`/`statusChip`/`statusTile` + `SESSIONS.total`; **no new scheduling engine, no calendar library.**

## 2. Data source (binding — roll-up only)

`STATUS_SUMMARY` = `[{cancelled:1},{upcoming:6},{live:3},{completed:14}]` (the canonical display summary) + `SESSIONS.total` (=24). Shown as-is.

## 3. Anatomy (RTL, top → bottom)

A `card` with: a section title + a labeled **report-signal** (e.g. `needsFollowUp` if `cancelled > 0`, else `healthy`) + the session-status summary rendered with the reused **session chips/tiles** (`statusTile`/`statusChip` over `STATUS_SUMMARY`) + a total + an upcoming hint — + **"View sessions"** `<a href="sessions.html">` and **"View timetable"** `<a href="schedule.html#view=timetable">` (language-aware). The category card carries the headline counts + an `available` chip + the links.

## 4. Drill-down (binding)

"View sessions" → `sessions.html`; "View timetable" → `schedule.html#view=timetable` (the hash opens the Timetable tab per Spec 003). Real `<a href>`, never dead.

## 5. Empty / all-clear

If no cancelled/attention sessions, `healthy`; never a broken/empty block.

## 6. MUST NOT

No new timetable grid/scheduling engine; no calendar library; no scheduling mutation; no chart; no fabricated session metric.

## 7. Enforcement & cross-references

- **Smoke**: the Sessions & Timetable section shows a labeled session-status summary (matching `STATUS_SUMMARY`) + a real `<a href>` to `sessions.html` AND a real `<a href>` to `schedule.html#view=timetable`; no chart; no scheduling control.
- **Screenshots**: the Sessions region within frame #1.
- Binds to `reports-page-contract.md`, `academic-operations-contract.md`, the Spec 003 `../../003-timetable-scheduling/contracts/*` (the session-status + `#view=timetable` deep-link). **MUST NOT** build a scheduling engine, a calendar, or a chart.

**Acceptance (binding):**
1. **Given** the Sessions & Timetable section, **When** rendered, **Then** a labeled session-status summary appears + real links to `sessions.html` and `schedule.html#view=timetable`; no chart, no scheduling engine.
