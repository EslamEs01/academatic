# Contract: Student & Family Profile Outcome Impact

**Status**: Binding · `public/student.html` and `public/family.html` (+ `.en`). The Spec 004 tabbed academic profiles (`app/src/js/pages/student.js`, `app/src/js/pages/family.js`) **lightly, fixture-only enriched** with a calm recent-attendance/outcome hint and a **"View attendance"** deep-link. The hints are **DISPLAY-ONLY** (data-model *StudentOutcomeSignal* / *FamilyOutcomeSignal*); both profiles **deep-link to the canonical Attendance page** rather than carrying a bespoke outcome drawer. **No new tab.** Admin profile pages only — **not** student/family portals.

## 1. Purpose & exactly-what-changes vs Spec 004

This contract EXTENDS, it does not replace, the Spec 004 profiles. Both pages stay exactly as shipped: the baked `profileBanner` over the Spec 003 `tabs` widget — Student: Overview/Courses/Timetable/Results/Evaluation/Family/Notes; Family: Overview/Students/Schedule/Plan&Billing/Notes — with all panels baked (`renderStudent()` / `renderFamily()`). **The only additions are a calm fixture hint + a deep-link on each**, placed inside an EXISTING panel — everything else (banner, tabs, drawers, links) is unchanged.

The changes, and **only** these:

1. **Student** (`student.js`): a calm fixture **recent-outcomes / attendance hint** rendered inside the EXISTING Timetable/Overview area (`overviewPanel(st, fam, blocks)` or `timetablePanel(blocks)`), plus a **"View attendance"** deep-link (§2).
2. **Family** (`family.js`): a calm fixture **children follow-up hint** rendered inside the EXISTING Overview/Schedule area (`overviewPanel(fam)` or `schedulePanel(blocks)`), plus a **"View attendance"** deep-link (§3).

No Spec 004 tab, panel, banner field, drawer, or link is removed; **no new tab is added** to either tablist.

## 2. Student profile hint (binding)

- The student profile MUST show a calm **fixture recent-outcomes/attendance hint** — e.g. **"attended N of M · K to follow up"** (data-model *StudentOutcomeSignal*: `{ attended, total, followUp?, href }`) — rendered as a small labeled line/`info-card` inside the **existing** Overview panel or the Timetable panel (alongside the existing `timetablePanel(blocks)` "View in schedule" link). It MUST NOT introduce a new `role="tab"` / `tabpanel` (the tablist stays the Spec 004 seven).
- The hint MUST read as **demo/fixture** data (icon + label, never color-only) and MUST NOT claim a live attendance metric, rate, percentage engine, or at-risk detection. The `N`, `M`, and `K` values are baked fixture numbers (derived from the student's `SESSION_OUTCOMES` rows + `needsFollowUp`/absence flags, no second source), not a computed live rate.
- A language-aware **"View attendance"** affordance MUST be a **real `<a href>`** to `attendance.html` (`attendance.en.html` on the English page via the existing `getLang()` helpers, like `schedHref()`/`familyHref()` in `student.js`). It MAY carry a student facet hash the Attendance page reads client-side; landing MUST NOT require JS.
- The hint MAY reuse the labeled `outcomeChip` / attention vocabulary for the "K to follow up" fragment (icon + label) so it reads consistently with the Attendance page; it MUST NOT recolor or restate the banner's lifecycle status.

## 3. Family profile hint (binding)

- The family profile MUST show a calm **fixture children follow-up hint** — e.g. **"K of the family's children's sessions need follow-up"** (data-model *FamilyOutcomeSignal*: `{ followUp, href }`) — rendered as a small labeled line/`info-card` inside the **existing** Overview panel or the Schedule panel (alongside the existing `schedulePanel(blocks)` "View in schedule" link). It MUST NOT introduce a new tab (the tablist stays the Spec 004 five).
- The hint is **fixture-derived** from the family's children's outcomes (`studentsOfFamily(fam.id)` → their `SESSION_OUTCOMES` follow-up flags) and MUST NOT claim a finance/credit/billing balance, a real attendance metric, or an alerting engine. The existing Plan & Billing tab stays the Spec 004 disabled-with-reason placeholder — the follow-up hint MUST NOT bleed a credit/payment claim into it.
- A language-aware **"View attendance"** affordance MUST be a **real `<a href>`** to `attendance.html` (language-aware via the existing helpers; it MAY carry a family facet hash). Live navigation, never `href="#"`.

## 4. Both profiles deep-link to Attendance — no bespoke profile drawer (binding)

- Neither profile MAY define a bespoke outcome drawer/modal. Per R35/R41, the profiles **deep-link** to the canonical Attendance (and the existing Schedule timetable deep-link stays as-is). The Student Timetable tab keeps opening the **shared appointment drawer** (`appointmentTemplate`, Spec 004 §8) for its session blocks — that is unchanged and is NOT upgraded to the outcome drawer here.
- The outcome hints are pure display compositions baked into the existing panels — runtime JS only switches tabs (existing `tabs` widget) and follows the real `<a href>`; it builds no panel DOM and adds no engine.
- The teacher is NOT linked from the hint (teachers directory is out of scope); the hint's only navigation is the "View attendance" deep-link (and, on the Student page, the existing siblings/family links remain as Spec 004 shipped them).

## 5. MUST NOT (hard boundaries)

- MUST NOT add a **real attendance engine / metric** — the "attended N of M" line is a fixture display value, not a computed live rate.
- MUST NOT add a **new profile tab** or a new tablist entry on either page.
- MUST NOT make a **finance / credit / billing claim** in the family hint.
- MUST NOT add a **bespoke profile outcome drawer** — profiles deep-link to Attendance; no embedded outcomes list/card hybrid, no outcome summary tiles inside a profile.
- MUST NOT add a portal affordance, a chart, a table/form library, or a JS-rendered region.

## 6. Edge cases & states (binding)

- **No outcomes yet**: a student/family with no recorded outcomes shows a calm "no recent sessions yet" / "nothing to follow up" line (warm, distinct from a zero claim) — never a blank region and never an alarming "0 of 0".
- **All attended**: when nothing needs follow-up, the hint drops the "K to follow up" fragment (or shows a calm "all caught up") and still offers the "View attendance" deep-link.
- **Group session**: a child's outcome is session-level — the family hint counts sessions needing follow-up, never a per-student roster computation.
- **Long content**: long AR/EN copy wraps/truncates within the panel; the hint never forces horizontal overflow on mobile.
- **JS off**: both hints + deep-links are baked HTML — they render and navigate with JS disabled (only tab-switching is inert, all panels visible per Spec 004).

## 7. `data-*` hooks (exact, no invention)

Reuses, unchanged: the `tabs` hooks (`data-tabs="student"|"family"`, `data-tab=...`, `data-tabpanel=...`, `data-view`); the Timetable/Schedule agenda + shared appointment drawer hooks on the Student Timetable tab (`data-agenda`, `data-drawer="<id>"`, `<template data-preview="<id>">`, `data-sheet-close`) — all from `student.js`/`family.js`. The recent-outcomes hint and the **"View attendance"** deep-link are plain baked markup + a plain `<a href>` (no new hook). The new Spec 005 `data-filter-set` hook belongs to the Attendance page, **not** here. **No invented hooks; no JS-generated ids/classes.**

## 8. Responsive / RTL-LTR / theme / a11y

- The hint line/`info-card` stacks within its panel on mobile; long AR/EN copy wraps/truncates gracefully; no horizontal overflow.
- Arabic RTL default (`student.html`/`family.html`); English (`student.en.html`/`family.en.html`) with the "View attendance" links language-aware; logical properties; numbers/dates never mirror.
- Light/Dark/System via tokens; the hint icon + label read correctly in all three, never color-only.
- Keyboard operable with visible focus; the deep-link is a real link in the tab order; ≥44px targets; axe critical = 0.

## 9. Django mapping & enforcement

- **Django**: `student.html` → `templates/admin/student.html` with `student.outcome_signal` (`{ attended, total, follow_up }`) in view context, rendered inside the existing Overview/Timetable section; "View attendance" → `{% url 'admin:attendance' %}` (+ optional `?student=<id>`). `family.html` → `templates/admin/family.html` with `family.outcome_signal` (`{ follow_up }`) derived from the children, rendered inside the existing Overview/Schedule section; "View attendance" → `{% url 'admin:attendance' %}` (+ optional `?family=<id>`). Both signals are display context integers (no new endpoint, no engine). No whole-page `#app` mount; relative `./assets/` paths; zero external requests.
- **Enforcement**: the smoke harness (R43) asserts on `student.html` AND `family.html` (AR + EN) that the calm fixture **outcome hint exists** (icon + label, never color-only) inside an existing panel, that a real **"View attendance" `<a href>`** to `attendance.html` exists (no `href="#"`, no dead control), that **no new tab** was added (the tablist count is the Spec 004 seven for Student / five for Family with exactly one visible `tabpanel`), that the Student Timetable tab still uses the shared appointment drawer (not a profile outcome drawer), that there are **no raw i18n keys**, **zero external requests**, and **no finance/credit claim** on the family hint. Screenshots: Student profile attendance/outcome section + Family profile follow-up section, AR-RTL light desktop (`screenshot-acceptance.md`, Visual Acceptance #7 and #8).

## 10. Reused / cross-references

Reuses Spec 003/004 `tabs`, `profileBanner`, `scheduleAgenda`, `appointmentTemplate`, `sheetRow`/`info-card`, `chip`, `ui` (avatar/button), the `family-status` map, the `attentionFlag`, and the existing `getLang()`/`langRoute()` helpers — all from `student.js`/`family.js` unchanged. New shared concepts consumed: *StudentOutcomeSignal* / *FamilyOutcomeSignal* (data-model), `outcomeChip` (`outcome-status-contract.md`). Binds to: `attendance-page-contract.md` (the "View attendance" target + the canonical outcomes board), `outcome-details-contract.md` (the canonical drawer the profiles deep-link toward, not embed), `outcome-status-contract.md` (the follow-up chip vocabulary), `../../004-family-student-profiles/contracts/student-profile-contract.md` and `family-profile-contract.md` (the unchanged Spec 004 banner/tabs/timetable), `navigation-impact-contract.md` (no dead links), `static-html-django-ready-contract.md` (SSG/Django rules), `scope-guard.md` (no engine/finance/new-tab/bespoke-drawer), `screenshot-acceptance.md`.
