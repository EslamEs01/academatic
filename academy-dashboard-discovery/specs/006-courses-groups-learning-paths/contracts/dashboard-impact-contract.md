# Contract: Dashboard Impact (Spec 006)

**Status**: Binding · The dashboard's courses/groups impact is MINIMAL and FIXTURE-BACKED — exactly one small wiring change backed by the new `GROUPS` fixture AND linked to an in-scope page. The dashboard stays calm: **no new stat wall, no new KPI row/tile, no chart, no fake/unbacked academic-analytics widget, no performance metric, no finance widget.** Touches ONLY `dashboard.js` / `dashboard.html`. Extends the Spec 005 dashboard-impact pattern (`../../005-attendance-session-outcomes/contracts/dashboard-impact-contract.md`). Anything beyond this is a defect, regardless of passing tests.

References: FR-023, data-model #19 (*DashboardCourseGroupSignal*), research R53.

---

## 1. Scope of impact

- Spec 006 touches **only** `public/dashboard.html` (+ `.en`), produced by `app/src/js/pages/dashboard.js`; it adds **no new dashboard page, route, KPI row, stat tile, chart, or finance widget**.
- The dashboard already carries the Spec 004 `peopleSignal()` card (the people-hub with `dash.studentsAttention` chip + `dash.viewFamilies` link) and the Spec 005 `dash.outcomeFollowUp` chip (folded into that same card). Spec 006 **folds one more chip** into that existing card — it does NOT add a new card, a new module, or a new section.
- All changes are baked static HTML enhanced via the established `data-*` hooks; no runtime-built DOM, no external/CDN requests.
- The groups-attention chip resolves through the fixture-backed `GROUP_SUMMARY.needsAttention` count (data-model #19) as **icon + label, never color-only**.

---

## 2. ALLOWED change A — ONE "groups needing attention" chip folded into the people-signal card

- The dashboard MUST add **exactly one** small **"groups needing attention"** count chip (icon + label) **folded into the EXISTING Spec 004 `peopleSignal()` card** (`dashboard.js`) — NO new card, tile, section, or row. It sits in that card's existing `flex flex-wrap items-center gap-2.5 ms-auto` action area, beside the existing `dash.studentsAttention` chip and the Spec 005 `dash.outcomeFollowUp` chip.
- The count MUST be **derived from `GROUP_SUMMARY.needsAttention`** — the `needsAttention` flags on `GROUPS.rows` already in the fixture (data-model #19: `DashboardCourseGroupSignal.groupsAttentionCount`) — with **no second source of truth** and **no engine**.
- The chip MUST be a **real `<a href>`** linking to the **Groups directory** — `./groups.html` (`./groups.en.html` on the English dashboard, via the existing `getLang()` pattern, like `schedHref()` / `attHref` in `dashboard.js`) — optionally carrying a `?attention=1` facet hash the Groups page reads client-side; landing MUST NOT require JS.
- It MUST read as demo/fixture data (icon + label, **never color-only** — FR-023) and imply **no** real academic alert, at-risk detection, or monitoring engine. The chip label is e.g. «N مجموعة تحتاج متابعة» / "N groups needing attention" (i18n key `dash.groupsAttention`).
- The chip uses the existing **amber chip tone** (`tone-amber`, icon `alert-triangle` or `layers`) consistent with the attention vocabulary already in the card — no new chip CSS.

---

## 3. ALLOWED change B (optional) — repoint an existing quick-link to Courses or Groups

- An **existing** dashboard affordance (e.g. an apps-grid / reports-grid quick-link already present in `renderDashboard()`) MAY be repointed to **`./courses.html`** or **`./groups.html`** — reusing an affordance rather than adding a new card.
- **Fixture backing**: the link target is the real, in-scope `courses.html` or `groups.html` built this spec; no new dashboard data is invented.
- **Constraint**: this is OPTIONAL polish. If no suitable existing affordance is present, **this change is omitted entirely** — no new affordance is added in its place.

---

## 4. The hard rule — no new stat wall, no fake/unbacked widget (FORBIDDEN)

- Every added dashboard element MUST be **backed by `GROUPS`/`GROUP_SUMMARY` fixtures** AND **link to an in-scope page** (`groups.html`, `courses.html`, or the canonical drawer). A widget with no fixture backing, or pointing at an unbuilt page, is forbidden.
- The dashboard MUST stay calm — these are **forbidden** (hard rule): a **new stat wall**; a **new KPI row or stat tile**; a **chart**; a **fake/unbacked academic-analytics widget**; a **real enrollment/progress/performance metric**; a **finance / payment / credit / billing / salary widget**; a **second courses/groups card or module**; any **fabricated metric** (no "X% completion rate", no "top course by attendance", no "grade distributions"). The impact is the ONE chip (A) folded into the existing card, plus the optional quick-link repoint (B) — **≤ 1 new courses/groups chip** of net new chrome.
- The Spec 005 `dash.outcomeFollowUp` chip and the Spec 004 `dash.studentsAttention` chip already in `peopleSignal()` are **unchanged** — they are not doubled, repurposed, or removed.
- "Active courses count" / "groups created this week" / "enrollment trends" are **forbidden** on the dashboard — they are either unbacked or belong to a future reporting spec.

---

## 5. What does NOT change on the dashboard

- The welcome-hero counts, the `kpiRow(KPIS)` overview, the `upNext()` schedule strip + its attention chip + its `schedule.html#view=timetable` deep-links, the Spec 004 / 005 `peopleSignal()` chips and `dash.viewFamilies` link, the Today's Sessions module (`sessionsModule`) + its canonical outcome drawer (Spec 005 change B), the `STATUS_SUMMARY` tiles, the reports grid, the states demo region, and the overall layout / density all stay as Spec 001–005 shipped them.
- The shell (category rail + topbar), theme / language behavior, and all existing fixtures are **unchanged**; no existing dashboard control is removed or repurposed beyond folding in the one groups-attention chip and (optionally) repointing one existing quick-link.

---

## 6. Dashboard Impact Review Q&A

**Q1: Does Spec 006 affect the dashboard?**
Yes, minimally. Exactly ONE fixture-backed "groups needing attention" chip is folded into the existing `peopleSignal()` card — the same card that already holds the Spec 004 students-attention chip and the Spec 005 outcome follow-up chip. The card grows by one chip in its `ms-auto` flex row. Optionally, one existing quick-link is repointed to `courses.html` or `groups.html`. That is the complete dashboard footprint of Spec 006; no new section, no new card, no new module.

**Q2: What is deferred to a real backend / reporting spec?**
All of the following are **explicitly deferred** and MUST NOT be faked or approximated on the dashboard:
- Real **enrollment analytics** (course fill rates, enrollment trends, new enrollments this week).
- Real **academic progress or performance metrics** (completion rates, grade distributions, level advancement counts).
- Real **group utilization / capacity metrics** (group fill percentages, waitlists).
- Real **teacher assignment / workload analytics**.
- Real **certificate issuance** counts or learning-path progress rollups.
- Real **at-risk / churn / retention detection** based on attendance + course data.
- Real **finance / payment / credit / billing** signals related to courses or group fees.
- A **Sessions-Analysis** count+hours rollup broken down by course or group.
- Any **notification feed** for course/group events.
- Any **student / family / teacher portal or role dashboard** reachable from the course/group signals.

These deferred items are the correct scope of a future "Academic Analytics" or "Reporting" spec backed by a real backend; they are never approximated with fixture numbers on the dashboard.

---

## 7. Edge cases & states (binding)

- **Zero groups needing attention**: if `GROUP_SUMMARY.needsAttention` is 0, the chip MAY render a calm "all groups on track" label (or be omitted entirely) — never an alarming red "0", never color-only; if rendered, it still deep-links to `groups.html`.
- **Groups fixture not yet populated**: during the fixture-build window before `groups.js` lands, the chip is omitted (count = 0) rather than rendering a raw key or broken state.
- **Mixed-state card**: the three chips (students-attention, outcome-follow-up, groups-attention) render legibly together in the `flex flex-wrap` row; no color collision; no "pill wall" on mobile (chips wrap cleanly at narrow widths).
- **Long label on mobile**: the chip label wraps within the `flex flex-wrap` row; the card never overflows horizontally on small screens.
- **Optional quick-link (B)**: if the quick-link repoint is applied, the existing affordance navigates to `courses.html` or `groups.html` — a real `<a href>`, no `href="#"`, no dead control.

---

## 8. `data-*` hooks (exact, no invention)

The groups-attention chip is a relative **`<a href>`** to `groups.html` carrying the existing amber chip class (`chip tone-amber`) — the same pattern as the `dash.outcomeFollowUp` and `dash.studentsAttention` chips in `peopleSignal()`. The optional quick-link repoint (B) changes an existing href — no new hook. **No new `data-*` hook is introduced; no JS-generated ids/classes.** The Spec 005 `data-filter-set` hook belongs to the Attendance page; the Spec 006 filter-facet hash for the Groups directory is a plain URL hash read by the Groups page's existing `applyFilter` mechanism — not a new hook on the dashboard.

---

## 9. Django mapping

- The groups-attention chip → a single context integer (`groups_attention_count`, derived from `Group.needsAttention` flags in the Groups queryset, passed to the dashboard view context) rendered inside the existing people-signal card template snippet, linking `{% url 'admin:groups' %}` (+ optional `?attention=1` query/hash facet; the facet is client-only state). No new endpoint; no new template partial.
- The optional quick-link repoint → change one existing anchor's `href` to `{% url 'admin:courses' %}` or `{% url 'admin:groups' %}` — no new template node.
- Fixtures → view context; `data-*` attribute keys stay stable. No whole-page `#app` mount; relative `./assets/` paths; zero external requests.

---

## 10. Enforcement

- `no-dead-button` smoke: the groups-attention chip navigates to `groups.html` (real `<a href>`, no `href="#"`, no `target="_blank"`). The optional quick-link (B) navigates to `courses.html` or `groups.html` (real `<a href>`).
- **≤ 1 new courses/groups chip** check: the smoke harness asserts the dashboard added **at most one** net-new groups chip (folded into `peopleSignal()`), **no new stat tile / KPI row / chart / finance widget / second courses-or-groups module**, and that every added element is backed by `GROUP_SUMMARY` and links to an in-scope page; the chip is icon + label (never color-only).
- `no-external-request` + relative-path checks: the deep link resolves relatively; zero CDN/chart/table/form library requests.
- Screenshot frame: **Dashboard groups/courses impact, AR-RTL light desktop** — part of the Spec 006 screenshot matrix (R56, frame: "Dashboard groups-attention, AR light") — confirms the calm, fixture-backed wiring; a new stat wall, a fabricated academic metric, a finance/unbacked widget, or color-only chip = fail.

---

## 11. Reused / cross-references

Reuses Spec 001/002/003/004/005 `welcomeZone`, `kpiRow`, `sessionsModule`, `upNext()`, `peopleSignal()`, `statusTile`, `statusChip`, `appointmentTemplate`, `outcomeTemplate`, the drawer/confirm/toast engines, and the `getLang()` helper — all from `dashboard.js`, unchanged except the one chip addition. New shared pieces consumed (not defined here): `GROUP_SUMMARY.needsAttention` (data-model #19, from the new `groups.js` fixture). Binds to: `groups-page-contract.md` (the chip's deep-link target), `courses-page-contract.md` (optional quick-link target), `../../005-attendance-session-outcomes/contracts/dashboard-impact-contract.md` (the Spec 005 outcome chip this contract sits beside), `../../004-family-student-profiles/contracts/dashboard-impact-contract.md` (the Spec 004 pattern this contract extends), `navigation-impact-contract.md` (no dead links), `static-html-django-ready-contract.md` (SSG / Django rules), `scope-guard.md` (no stat wall / engine / finance / fabricated analytics), `screenshot-acceptance.md`.
