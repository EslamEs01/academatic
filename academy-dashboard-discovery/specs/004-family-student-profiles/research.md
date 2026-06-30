# Phase 0 Research: Families and Student Academic Profiles

Spec 004 inherits the entire Spec 001 stack + Spec 002 decisions **R1–R10** (SSG `renderX()` pages, real `.html` routing + baked `aria-current`, schedule day-grouped list, students/trainers directory shapes, **R5 drawer-for-previews/modal-for-confirm**, **R6 client-side filtering of pre-rendered rows**, settings taxonomy, **R8 shared components**, **R9 hand-rolled SVG/CSS visuals**, **R10 extend the test harness**) + Spec 003 decisions **R11–R19** (the generic **tabs** widget, the hand-rolled timetable grid, the single-day **agenda**, the shared **appointment drawer**, fixture-only attention flags, minimal **dashboard impact**, label reconciliation). **No new dependencies.** This file records only the decisions specific to the families/students experience. Each: **Decision · Rationale · Alternatives rejected**. It is grounded in the inspected reference (the family-centric academatic family/student screens + inventories) + the current implementation — not invented.

---

## R20 — Family is a first-class entity; students link via a real `familyId`

**Decision**: Add a new **`fixtures/families.js`** (`FAMILIES` + `FAMILY_CATEGORIES`) where a Family is the guardian/parent account (guardian name+avatar, status, category, `studentIds[]`, contact placeholder, plan stub, attention, notes). Extend `fixtures/students.js` so each student carries a real **`familyId`** (replacing the bare `guardian` string) + academic fields. The family↔student link is bidirectional in the fixtures (family lists its `studentIds`; each student names its `familyId`).

**Rationale**: The reference's whole module is family-centric (Family = account, students = nested children). Today the app has only a bare guardian string — no relationship to build on. A real entity + id makes the relationship the product spine and maps cleanly to Django (`family.students` / `student.family`).

**Alternatives rejected**: keep guardian as a string (can't group children or build a family profile); a separate Guardian entity distinct from Family (the reference has one guardian account *per* family — Family *is* the guardian; a separate entity adds needless indirection).

---

## R21 — Families directory = family-as-hero cards (not the legacy table)

**Decision**: Render `families.html` as a **`cardGrid` of family cards** (new `family-card.js`): each card leads with the guardian + the family's **children grouped visually** (child avatars/chips with overflow "+N") + student & active-course counts + a labeled status chip + a fixture attention hint + "view profile" (→ `family.html`) + a kebab (demo/disabled). Header + summary tiles + a `filterBar` (search + status + category facets) over pre-rendered cards (R6 filtering). Mobile → single column.

**Rationale**: The reference buried the family↔children link in a wide table column; leading with a card that *groups the children* makes the relationship the hero (the spec's core ask) and reads premium, not spreadsheet. Reuses `cardGrid`/`directoryCard`/`statMini`/`filterBar`.

**Alternatives rejected**: a wide data table with a "No. Children" column (the legacy weakness — relationship buried, spreadsheet feel); a table+cards toggle (needless for the foundation).

---

## R22 — Rich profile = a dedicated baked PAGE; quick peek stays a drawer (extends R5)

**Decision**: The full **family profile** (`family.html`) and **student academic profile** (`student.html`) are **dedicated, baked, tabbed PAGES** (one representative fixture entity each; Django later → per-id). The lightweight "view details" peek stays the existing `<template data-preview>` **drawer** (students list keeps its drawer; a student's *session* detail reuses the **shared `appointmentTemplate` drawer**). Profile pages are registered in the SSG with `activeId` = `families`/`students` (no new nav item).

**Rationale**: A multi-section tabbed profile exceeds a drawer's calm progressive-disclosure budget; NI12/G6b authorize a real page; a drawer is right for a quick peek. This introduces the codebase's first **profile-page pattern** while keeping the established drawer for peeks.

**Alternatives rejected**: cram the profile into a drawer (too much; the 8-tab legacy hub doesn't fit); per-entity static pages baked per id (can't bake one file per family/student — one representative template + Django per-id is the static-site idiom).

---

## R23 — Profile sections reuse the Spec 003 tabs engine (no new tab code)

**Decision**: Family/student profile **sections are the Spec 003 `tabs` widget** — baked `role=tabpanel` panels, the existing `enhance.js` tab engine toggles visibility (+ `#view` hash + localStorage), roving-tabindex keyboard. Family tabs: Overview / Students / Schedule / Plan&Billing / Notes. Student tabs: Overview / Courses / Timetable / Results / Evaluation / Family / Notes.

**Rationale**: The tabs widget already exists, is accessible, baked, and Django-friendly; reusing it gives the profile spine for free with zero new tab runtime.

**Alternatives rejected**: a new accordion/section component (duplicates the tabs widget); JS-rendered sections (violates HTML-first).

---

## R24 — Add-Family is a BAKED multi-step wizard (a stepper over the tab engine)

**Decision**: `add-family.html` is a **baked multi-step wizard** (`wizard.js` + new labeled `form-field.js` helpers): all steps are pre-rendered static `role=tabpanel`-style panels with a step indicator; runtime adds only a tiny **stepper** to `enhance.js` — `data-step-next` / `data-step-prev` buttons find the active step and advance/retreat it via the **same tab-selection logic** (no new engine), and "Save" is `data-demo-action` (toast). Steps: **Identity → Contact & Location → Children → Plan & Billing → Review**. Every field is labeled. No form library, no validation engine, **no persistence**. Maps to Django `{% if step %}`.

**Rationale**: The reference's giant one-page form is the documented weakness; a guided, labeled stepper is the improvement. Baking the steps + reusing the tab toggle honors HTML-first (schedule-tabs §3) with the smallest possible new runtime (next/prev over existing selection).

**Alternatives rejected**: a single long form (legacy weakness, not premium); a form library / SPA wizard (banned); JS-built steps (violates HTML-first); a real submit (no persistence allowed). **Field set is kept tight** — a curated subset of the ~30 legacy fields per step, not a port.

---

## R25 — Family/student status is a NEW labeled lifecycle map (never numeric/color-only)

**Decision**: Add `family-status.js` — a status map for the family/student **lifecycle** (`active / trial / suspended / stopped / inactive`) → `{ tone, icon, labelKey }`, rendered via the generic `chip`. Distinct from the session `status-map` (live/upcoming/completed/cancelled).

**Rationale**: The reference used numeric, unlabeled student statuses (`/status/0..6`) — the documented weakness. A labeled, AA-contrast, icon+label chip map fixes it and keeps one source of truth.

**Alternatives rejected**: reuse the session status map (wrong vocabulary); numeric/color-only badges (the legacy anti-pattern; fails a11y "never color-only").

---

## R26 — Results = fixture-only progress + certificates + summary (no gradebook)

**Decision**: The student profile **Results** tab (`result-summary.js`) shows, fixture-only: per-course **progress** (the existing hand-rolled progress bar/ring), a **certificates** list, and a level/term **summary**. No grades/marks/terms engine.

**Rationale**: The reference has **no academic grade system** (an explicit gap); achievement surfaced as progress + certificates. Inventing a gradebook would be ungrounded. Progress + certificates is the honest, grounded "result."

**Alternatives rejected**: a subjects×terms marks table (ungrounded — the reference has none; would be invented); a real grade engine (out of scope).

---

## R27 — Evaluation = the fixture-only monthly progress-report rubric

**Decision**: The student profile **Evaluation** tab (`evaluation-rubric.js`) renders the reference's **Monthly Progress Report** as a calm rubric: criteria rows (**learning progress, focus, homework completion, punctuality**) each with a **rating pill** (icon+label, never color-only) + an **achievements** narrative + **next-month objectives** + an **Approve** demo action. Fixture-only; no workflow.

**Rationale**: This is exactly what the reference's "evaluation" was (a structured progress-report rubric with rating scales + achievements + objectives + approve) — grounded and an honest premium improvement over the legacy's cramped form.

**Alternatives rejected**: a star-rating widget library (banned); a real evaluation workflow/persistence (out of scope); a fabricated criteria set (the reference's scales are used verbatim in structure, original wording).

---

## R28 — Family Categories = a segmentation facet; Groups/result/eval pages stay planned

**Decision**: `FAMILY_CATEGORIES` (CRM segmentation: name/desc/status/count) drives a **filter facet + category chips** on the Families page; its **nav item stays `planned`**. `groups` (a learning construct), `scheduleSearch`, `studentResult`, `studentEvaluation` **stay `planned`** (no new pages). Results/Evaluation live as **student-profile tabs** (R26/R27).

**Rationale**: Family Categories is genuinely a lightweight segmentation (a facet), not a module; Groups is a learning construct better suited to a courses/sessions spec; standalone result/evaluation overview pages aren't needed when the per-student previews live in the profile. Keeps scope focused and the nav free of dead links.

**Alternatives rejected**: a full Family-Categories CRUD page / Groups module (scope creep, not required); promoting `studentResult`/`studentEvaluation` to thin standalone pages (the in-profile tabs are the useful placement).

---

## R29 — Timetable linkage reuses Spec 003 (no duplication, no portal)

**Decision**: Family + student profile **Schedule/Timetable** sections reuse **`scheduleAgenda`** (a filtered slice of schedule blocks for that family/student) + the **shared appointment drawer** (which already renders `familyKey`) + a language-aware **"View in schedule"** deep-link to `schedule.html#view=timetable`. The schedule/session fixtures already carry `familyKey` facets. The full timetable grid is **not** duplicated.

**Rationale**: Reuses the proven Spec 003 scheduling visual language with zero new timetable code; the deep-link connects the surfaces without a portal.

**Alternatives rejected**: re-implement the weekly grid per profile (duplication); a student "my timetable" portal (banned — future-role).

---

## R30 — Minimal, fixture-backed dashboard impact (template from 003 R16)

**Decision**: (a) a **deep-link** from an existing dashboard affordance to `families.html`; (b) the Today's Sessions rows' shared drawer already carries family context (no change); (c) **one** small fixture-backed **"students needing attention"** count chip (from existing `attention` flags) linking to the filtered Students/Families surface. No new stat wall; nothing finance/unbacked.

**Rationale**: Same minimal pattern as Spec 003 — connect existing signals to the new surfaces + one tiny fixture-backed chip; the dashboard stays calm.

**Alternatives rejected**: a families/students KPI row or stat wall (the contract's forbidden "new stat wall"); a payments/finance widget (unbacked, forbidden).

---

## R31 — Tests & screenshots extend the existing harness

**Decision**: Extend `tests/smoke/run.cjs` (add `families`/`add-family`/`family`/`student` to PAGES; assert family cards group children, profile tabs present + exactly-one-visible, the wizard advances Next/Back + Save toasts, no dead nav, the promoted nav items are real `<a>` with routes + the rest stay Soon, portals absent). Extend `tests/screenshots/capture.cjs` MATRIX + naming with the Spec 004 frames (incl. a `wizard-step` variant + a `results`/`evaluation` tab variant via `#view`/step hash). Extend a11y coverage. The "no external requests" assertion already guarantees no chart/table/form library.

**Rationale**: One pipeline covers Spec 001+002+003+004; deterministic; reuses installed Playwright/axe; turns the spec's failure conditions into machine-checkable + screenshot-checked gates.

**Alternatives rejected**: a separate harness (duplication); manual-only verification (not reproducible).

---

## Resolved decisions summary

| # | Topic | Decision |
|---|---|---|
| R20 | Family entity | New `families.js` fixture; students gain a real `familyId`; bidirectional link |
| R21 | Families directory | Family-as-hero **cards** grouping children (not the legacy table) |
| R22 | Detail model | Rich profile = dedicated baked **page**; quick peek = drawer (extends R5) |
| R23 | Profile sections | Reuse the Spec 003 **tabs** widget (no new tab code) |
| R24 | Add-Family | **Baked multi-step wizard** = stepper over the tab engine; labeled fields; demo save |
| R25 | Status | New labeled family/student **lifecycle** status map (never numeric/color-only) |
| R26 | Results | Fixture-only progress + certificates + summary (no gradebook) |
| R27 | Evaluation | Fixture-only **monthly progress-report rubric** (criteria + rating pills + narrative + approve-demo) |
| R28 | Categories/Groups | Family categories = a **facet**; groups/result/eval nav items stay planned |
| R29 | Timetable | Reuse `scheduleAgenda` + shared drawer + `#view=timetable` deep-link (no duplication, no portal) |
| R30 | Dashboard | Minimal + fixture-backed (deep-link + shared drawer + one attention chip) |
| R31 | Tests | Extend smoke (pages/tabs/wizard) + capture matrix + a11y |

No unresolved `NEEDS CLARIFICATION` remain.
