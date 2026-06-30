# Contract: Dashboard Impact (Spec 007)

**Status**: Binding · Defines the **minimal** dashboard change — exactly ONE fixture-backed teacher chip folded into an existing card. Mirrors the minimal-impact precedent of Specs 003–006. References FR-017; SC guard (no fake stat wall); data-model §16.

---

## 1. Scope of impact

`dashboard.html` (+ `.en`) gains **at most one** new chip of chrome. No new card, no new band, no chart, no ranking, no salary widget.

## 2. ALLOWED change A — ONE chip folded into the existing people/attention card

Add a single fixture-backed **"teachers needing follow-up"** count chip into the **existing** people-signal / attention card (the same card that already carries the Spec 004 students-attention, Spec 005 follow-up, and Spec 006 groups-attention chips). The count = `TEACHERS.rows.filter(r => r.followUp==='needsFollowUp' || r.followUp==='attentionRisk').length`. The chip is a real `<a href="./teacher-performance.html">` (language-aware) — icon + label + count, never color-only.

(Alternatively the chip may read **"teacher absences today"** = a fixture count of today's `teacherAbsent` outcomes; **one** chip total, not both.)

## 3. ALLOWED change B (optional) — repoint nothing new

No new quick-link is required. If a "people" quick-link cluster exists, it MAY gain a "Teacher Performance" entry → `teacher-performance.html`; otherwise the chip's deep-link suffices. No other dashboard change.

## 4. The hard rule — no new stat wall / fake widget (FORBIDDEN)

FORBIDDEN on the dashboard: a new teacher KPI band, a teacher ranking/leaderboard, a computed performance metric, a fabricated "top teacher", a chart/graph, any salary/payroll/finance widget, or more than one new teacher chip. Net new chrome ≤ **1 chip**.

## 5. What does NOT change

The hero, the existing stat cards, the Today's Sessions module, the schedule/attendance/groups chips, and the layout are untouched apart from the single inserted chip.

## 6. Dashboard Impact Review Q&A

- **Q1: Do teacher KPIs affect the dashboard?** Minimally — one fixture follow-up chip + a deep-link.
- **Q2: Teacher absences today / overloaded teachers / needs-follow-up trio?** No — **one** chip only; the board (`teacher-performance.html`) holds the rest.
- **Q3: New widgets?** No.
- **Q4: Update existing quick links instead?** The chip's deep-link is enough; an optional quick-link repoint is allowed, not required.
- **Q5: Link to Teachers / Teacher Performance?** The chip links to `teacher-performance.html`.
- **Q6: What's deferred?** A real teacher KPI band, any ranking/score, and all finance/payroll → future specs.

## 7. Edge cases & states

- **Zero teachers needing follow-up** → the chip shows `0` calmly (or is omitted) — never a broken/empty widget.
- The chip is icon+label+count; it inherits the existing card's responsive/RTL/dark behavior.

## 8. `data-*` hooks

None new. The chip is a real `<a href>`; no new hook.

## 9. Django mapping

`{{ signals.teachers_followup }}` rendered inside the existing people-signal card partial; the deep-link → `{% url 'teacher-performance' %}`.

## 10. Enforcement

- **Smoke**: `dashboard.html` contains exactly **one** new teacher chip (a real `<a href="teacher-performance.html">` with a count) inside the existing people-signal card; **no** new dashboard card/band/chart/finance widget is added; no dead link.
- **Screenshots**: frame #10 (`dashboard__ar__light__desktop__teachers-followup.png`) shows the single chip folded into the existing card.

## 11. Reused / cross-references

Binds to `teacher-performance-contract.md` (the deep-link target), `static-html-django-ready-contract.md`, and the Spec 006 `../../006-courses-groups-learning-paths/contracts/dashboard-impact-contract.md` (the established one-chip pattern). **MUST NOT** add a stat wall, a ranking, a computed metric, a chart, or any finance widget.

**Acceptance (binding):**
1. **Given** the dashboard, **When** rendered, **Then** a single fixture "teachers needing follow-up" chip links to `teacher-performance.html`, with no new stat wall.
2. **Given** the dashboard, **When** audited, **Then** no ranking, computed metric, chart, or salary widget appears.
