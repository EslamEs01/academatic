# Contract: Dashboard Impact (Spec 008)

**Status**: Binding · Defines the dashboard change for Spec 008 — which is **none**. References FR-017; data-model §1.

---

## 1. No dashboard change

Spec 008 makes **no change to `dashboard.js`**. The dashboard already links to the Reports page (the existing `section.reports` header → `reports.html`, `dashboard.js`) and already carries the Spec 004–007 attention chips (outcome-follow-up · groups-attention · teachers-follow-up · students-attention). No new dashboard card, chip, stat-wall, quick-link, or widget is added.

## 2. Why none (Dashboard Impact Review Q&A)

- **Q1: Do academic reports affect the dashboard?** Minimally — the dashboard already has the entry point.
- **Q2: Add a Reports quick link?** Not needed — the existing `section.reports` header already links to `reports.html`.
- **Q3: Add a report-summary chip?** No — the dashboard already shows the same fixture counts (outcome/groups/teachers/students follow-up) the Reports shell rolls up; duplicating them on the dashboard would be redundant chip clutter.
- **Q4: Avoid changes because Specs 004–07 already added chips?** Yes — the dashboard is at its chip budget.
- **Q5: Link to reports.html?** Already done (pre-existing).
- **Q6: Deferred?** A dashboard reports KPI band / analytics widget → a future backend reporting spec (never faked).

## 3. The hard rule — no new dashboard chrome (FORBIDDEN)

FORBIDDEN on the dashboard: a new reports KPI band, a report stat-wall, an analytics widget, a chart, any finance/revenue widget, or any new chip/card. Net new dashboard chrome = **0**.

## 4. What does NOT change

The hero, the existing stat cards, Today's Sessions, the up-next strip, the people-signal card + its chips, the existing Reports section header (already → `reports.html`), and the layout are all untouched.

## 5. Enforcement

- **Smoke**: `dashboard.js` is unchanged; the dashboard adds **no** new card/chip/band; the existing `section.reports` link to `reports.html` remains.
- **Screenshots**: no dashboard frame in the Spec 008 matrix (no change to capture).

## 6. Cross-references

Binds to `reports-page-contract.md` (the link target) and the Spec 007 `../../007-teacher-performance-kpis/contracts/dashboard-impact-contract.md` (the one-chip precedent — here the budget is already met, so zero). **MUST NOT** add a dashboard widget, chart, stat-wall, or finance chip.

**Acceptance (binding):**
1. **Given** the dashboard, **When** compared before/after Spec 008, **Then** it is unchanged (the existing Reports link is the entry point; no new chrome).
