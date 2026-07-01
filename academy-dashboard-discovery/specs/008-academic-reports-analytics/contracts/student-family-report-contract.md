# Contract: Students & Families Report Section (reuse Spec 004)

**Status**: Binding · The Students & Families section + category card. Reuses the Spec 004 family/student attention signals; drill-down to `students.html`/`student.html`/`families.html`/`family.html`. No portal/enrollment engine. References FR-008; data-model §11.

---

## 1. Purpose & reuse

Summarize people follow-up health — students needing follow-up + families with attention hints — and link to the student + family directories/profiles. Reuses the **exact** existing dashboard computation (students with `statusId∈{suspended,stopped}` OR a family with `attention`) + `FAMILIES.rows.filter(f=>f.attention)`; **no portal, no enrollment engine.**

## 2. Data source (binding — roll-up only)

Students needing follow-up = the `dashboard.js` `peopleSignal()` count (`statusId∈{suspended,stopped}` OR family `attention`); families with attention = `FAMILIES.rows.filter(f=>f.attention).length` (=2). Shown as-is — the **same** counts the dashboard students/families chips show.

## 3. Anatomy (RTL, top → bottom)

A `card` with: a section title + a labeled **report-signal** (`needsFollowUp` if either count > 0, else `healthy`) + the counts: **students needing follow-up** + **families needing attention** — + **"View students"** `<a href="students.html">` and **"View families"** `<a href="families.html">` (language-aware); a representative **student/family profile** link (`student.html`/`family.html`) MAY be included. The category card carries the headline counts + an `available` chip + the links.

## 4. Drill-down (binding)

"View students" → `students.html`; "View families" → `families.html`; profile links → `student.html`/`family.html`. Real `<a href>`, never dead.

## 5. Empty / all-clear

If both counts are zero, `healthy`; never a broken/empty block.

## 6. MUST NOT

No student/family **portal** or dashboard; no enrollment/notification engine; no chart; no fabricated metric; no finance/family-billing figure.

## 7. Enforcement & cross-references

- **Smoke**: the Students & Families section shows the students-needing-follow-up + families-attention counts (matching the dashboard computation) + real `<a href>`s to `students.html` and `families.html` (and `student.html`/`family.html` where surfaced); no portal markup; no chart.
- **Screenshots**: the Students & Families region within frame #1.
- Binds to `reports-page-contract.md`, `academic-operations-contract.md`, and the Spec 004 `../../004-family-student-profiles/contracts/*` (the directories/profiles). **MUST NOT** add a portal, an enrollment engine, a finance figure, or a chart.

**Acceptance (binding):**
1. **Given** the Students & Families section, **When** rendered, **Then** students/families follow-up counts (matching the dashboard) appear + real links to `students.html`/`families.html` (+ profile links) — no portal, no chart.
