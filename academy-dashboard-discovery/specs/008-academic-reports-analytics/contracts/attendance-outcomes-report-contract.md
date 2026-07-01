# Contract: Attendance & Outcomes Report Section (reuse Spec 005)

**Status**: Binding · The Attendance & Outcomes section + category card on the Reports shell. Reuses the Spec 005 `OUTCOME_SUMMARY` + the `outcome-status` chips; **teacherAbsent vs studentAbsent stay two DISTINCT labeled facts**; drill-down to `attendance.html`. No attendance engine/mutation. References FR-004; data-model §7.

---

## 1. Purpose & reuse

Summarize the academy's session-outcome health from the Spec 005 fixture — completed, **teacher absences**, **student absences in teacher sessions**, cancelled/rescheduled, needs-follow-up — and link to the full attendance page. Reuses `OUTCOME_SUMMARY` + the `outcome-status` `outcomeChip` vocabulary; **no new outcome engine, no drawer rebuild, no attendance mutation.**

## 2. Data source (binding — roll-up only)

`OUTCOME_SUMMARY` (`fixtures/attendance.js`): `attended`, `studentAbsent`, `teacherAbsent`, `cancelledOrRescheduled`, `needsFollowUp`, `total` (=15). Every count is shown as-is; nothing recomputed.

## 3. Anatomy (RTL, top → bottom)

A `card`/`info-card` with: a section title + a labeled **report-signal** (`needsFollowUp` when `OUTCOME_SUMMARY.needsFollowUp > 0`, else `healthy`) + the counts rendered with the reused **`outcome-status` chips**: **completed** (`attended`), **teacher absent** (`outcomeChip('teacherAbsent')` — amber) and **student absent** (`outcomeChip('studentAbsent')` — coral) as two distinct labeled facts, **cancelled/rescheduled**, **needs follow-up** — + a **"View attendance"** real `<a href="attendance.html">` (language-aware). The category card carries the headline counts + an `available` availability chip + the same link.

## 4. teacherAbsent vs studentAbsent (binding)

`teacherAbsent` and `studentAbsent` MUST render as the **two distinct** Spec 005 chips (distinct tone AND label) — never summed into one "absences" number, in both the section and the operations overview.

## 5. Drill-down (binding)

The "View attendance" link MUST navigate to `attendance.html` (`attendance.en.html` on EN) — a real `<a href>`, never dead.

## 6. Empty / all-clear

If `needsFollowUp === 0` and no absences, the section shows `healthy` ("attendance is on track"), never a broken/empty block.

## 7. MUST NOT

No new outcome row/drawer/builder; no attendance/outcome mutation; no import of the legacy 11-state numeric lifecycle as an engine; no finance derived from absence; no computed delivery score; no chart.

## 8. `data-*` hooks (reuse only)

None new — the section is static display + a real link. (If outcome rows were ever embedded they would reuse `outcome-status` chips, but the section is a summary, not a row list.)

## 9. Enforcement & cross-references

- **Smoke**: the Attendance & Outcomes section shows completed + **a teacherAbsent chip and a studentAbsent chip that are textually distinct** + cancelled/rescheduled + needs-follow-up counts (matching `OUTCOME_SUMMARY`) + a real `<a href>` to `attendance.html`; no chart; no mutation control.
- **Screenshots**: the Attendance & Outcomes region within frame #1.
- Binds to `reports-page-contract.md`, `academic-operations-contract.md`, `report-status-contract.md`, and the Spec 005 `../../005-attendance-session-outcomes/contracts/outcome-status-contract.md` (the teacherAbsent/studentAbsent map). **MUST NOT** rebuild the outcome engine, mutate attendance, conflate the two absence types, or add a chart.

**Acceptance (binding):**
1. **Given** the Attendance & Outcomes section, **When** rendered, **Then** teacherAbsent ≠ studentAbsent (distinct chips), the counts match `OUTCOME_SUMMARY`, and a "View attendance" link opens `attendance.html`.
