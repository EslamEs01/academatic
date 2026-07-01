# Contract: Courses & Groups Report Section (reuse Spec 006)

**Status**: Binding · The Courses & Groups section + category card. Reuses the Spec 006 `GROUP_SUMMARY` + the `group-status` chips + an active-courses count; drill-down to `courses.html`/`groups.html`. No course/group engine. References FR-006; data-model §9.

---

## 1. Purpose & reuse

Summarize cohort health — active courses, group totals, **groups needing attention** — and link to the courses + groups directories. Reuses `GROUP_SUMMARY` (`fixtures/groups.js`) + the `group-status` `groupStatusChip` vocabulary + active-courses = `COURSES.rows.filter(c=>c.statusId==='active').length`; **no course/group/enrolment engine.**

## 2. Data source (binding — roll-up only)

`GROUP_SUMMARY` = `{total:7, active, trial, full, needsAttention:2}` + active-courses count (=4, computed inline from `COURSES`). Shown as-is.

## 3. Anatomy (RTL, top → bottom)

A `card` with: a section title + a labeled **report-signal** (`needsFollowUp` if `GROUP_SUMMARY.needsAttention > 0`, else `healthy`) + active-courses + group totals + a **groups-needing-attention** count (rendered with the `group-status`/attention vocabulary) — + **"View courses"** `<a href="courses.html">` and **"View groups"** `<a href="groups.html">` (language-aware). The category card carries the headline counts + an `available` chip + the links.

## 4. Drill-down (binding)

"View courses" → `courses.html`; "View groups" → `groups.html`. (Course/group **profiles** `course.html`/`group.html` are reachable from those directories.) Real `<a href>`, never dead.

## 5. Empty / all-clear

If `needsAttention === 0`, `healthy`; never a broken/empty block.

## 6. MUST NOT

No course/group/enrolment engine; no group-capacity recompute; no chart; no fabricated metric.

## 7. Enforcement & cross-references

- **Smoke**: the Courses & Groups section shows active-courses + group totals + a groups-needing-attention count (matching `GROUP_SUMMARY.needsAttention`) + real `<a href>`s to `courses.html` and `groups.html`; no chart.
- **Screenshots**: the Courses & Groups region within frame #1.
- Binds to `reports-page-contract.md`, `academic-operations-contract.md`, the Spec 006 `../../006-courses-groups-learning-paths/contracts/*` (the group-status + directories). **MUST NOT** build a course/group engine or a chart.

**Acceptance (binding):**
1. **Given** the Courses & Groups section, **When** rendered, **Then** active-courses + group totals + a groups-needing-attention signal appear + real links to `courses.html`/`groups.html`; no chart, no engine.
