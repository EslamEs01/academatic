# Contract: Family Profile Page

**Status**: Binding · `public/family.html` (+ `.en`). The family profile hub — a profile **banner** + the **baked tabs** (Overview / Students / Schedule / Plan & Billing / Notes) over the Spec 003 tabs widget. The codebase's first per-entity **profile page** (D2/R22). A registered page reached via "view profile" links; **NOT** a nav item. Active nav: `families`.

## 1. Purpose & reuse

- Give the admin a calm, tabbed hub for one family (the guardian/parent account) that makes the **family↔student relationship** unmistakable: the guardian banner, the children (each linking to its student profile), the family's upcoming sessions, a billing stub, and notes. It REPLACES the legacy 8-tab billing-heavy family-details hub (Children buried under an attribute dump) with one airy progressive-disclosure page.
- It MUST compose existing components — the Spec 003 `tabs` widget (R23), `scheduleAgenda` + the shared `appointmentTemplate` drawer (R29), `chip`/`family-status.js` (R25), `statMini`, `states`, `ui` (avatar/medallion/button) — plus the **NEW** `profile-banner` partial. NO new tab engine, NO duplicated timetable engine; behavior is `enhance.js` over baked markup via `data-*` hooks only.

## 2. Page registration & active state (D2/D3/R22 — NOT a nav item)

- `family.html` is a **registered SSG page** (`PAGES` entry `{ base:'family', activeId:'families', titleKey, crumbKey, render }`) rendering **one representative `Family` fixture** as the baked template — it is **NOT** added to `NAV_CATEGORIES`. Its `activeId:'families'` keeps the **`families`** nav item active (violet pill + `aria-current="page"`) and opens the `families` category panel.
- It is reached only via a **"view profile"** `<a href>` from a family card (`families.html`) — language-aware (`family.en.html`). Django later maps the one template to `family/<id>` (per-id), so the static site bakes **one** representative file, not one per family.
- The page MUST NOT render any family/guardian **portal or dashboard** (those stay `future-role`, never rendered, D7).

## 3. Profile banner (`profile-banner`)

The banner MUST present, in a calm header band (NOT a stat wall):

- **Identity** — a `ui` avatar/medallion in the guardian `accent` + the guardian `nameKey` (the account holder) + the **family lifecycle status chip** via `family-status.js` (icon + label, **never numeric/color-only**) + a breadcrumb back to `العائلات`/`Families`.
- **KPIs** — at most a few `statMini` facts derived from the fixture: **students count** (`studentIds.length`), **active courses** (`activeCoursesCount`), **category/segment** chip, **joined date** — display-only, tabular numerals, never finance.
- **Actions row** (§9) — edit / suspend / stop / add-child, each honest under IP8 (demo / confirm→demo / disabled-with-reason).

Long guardian names truncate/wrap gracefully in AR-RTL and EN-LTR.

## 4. Tabbed sections (Spec 003 tabs widget — baked, JS toggles visibility only)

- The profile sections MUST be the generic Spec 003 `tabs` widget (`schedule-tabs-contract.md`): a container `data-tabs="family-profile"`, a `role="tablist"` of `role="tab"` controls (each `data-tab="<id>"`, `aria-controls`, `aria-selected`, `data-view` token), and a baked `role="tabpanel"` (`data-tabpanel="<id>"`, `aria-labelledby`, `tabindex="0"`) **per** tab — the inactive panels carry `hidden`. Tabs, in order: **Overview · Students · Schedule · Plan & Billing · Notes**.
- **All five panels MUST be pre-rendered complete static HTML.** `enhance.js` MUST only toggle visibility (set/remove `hidden`, flip `aria-selected`, move roving `tabindex`) — it MUST NOT render, build, or fetch panel content. Selection persists in `localStorage['academy.schedView.family']` + the URL hash `#view=<tab>` (hash wins on load, else storage, else **Overview** default). Roving-tabindex keyboard per the widget. With JS off, all panels remain reachable as anchored sections.

## 5. Overview tab

Guardian **contacts** (placeholder phone/email/whatsapp — display-only, never a real `tel:`/`mailto:` integration unless a calm demo), **location** (country/city/timezone placeholder), the **KPIs** echoed calmly, and the **attention** hint (icon + label) when the family is flagged. Empty fields produce no empty row.

## 6. Students tab (the children — the relationship hero)

- Lists the family's children resolved from `studentIds`, each as a calm row/card: child avatar (`accent`) + name + **lifecycle status chip** + level/progress mini + a **"view profile"** `<a href>` to **`student.html`** (language-aware `student.en.html`). This is the spine: the family lists its children, and each child links to its academic profile (which links back via its Family tab).
- An **"add child"** affordance MUST be a `data-demo-action` (demo toast) — **no persistence**, no real enrollment. A family with **no children** shows a calm "no children yet / add child" empty state (never a blank region).

## 7. Schedule tab (Spec 003 linkage — no duplication, no portal)

- Renders the family's **upcoming sessions** by reusing **`scheduleAgenda`** (a filtered slice of Spec 003 schedule blocks for this family's `familyKey`) — baked agenda markup (`data-agenda`), NOT a duplicated weekly grid.
- Each block opens the **ONE shared `appointmentTemplate` drawer** (`appointment-details-contract.md`) via `data-drawer="<id>"` over a baked `<template data-preview="<id>">` — the drawer **already renders the `familyKey` row**, so the family context flows through unchanged.
- A language-aware **"View in schedule"** deep-link MUST navigate to `schedule.html#view=timetable` (`schedule.en.html#view=timetable` on EN) — a real `<a href>`, no dead link, no duplicated engine. Empty → a calm "no upcoming sessions" state.

## 8. Plan & Billing tab (calm fixture / disabled-with-reason stub — NO real finance)

- Renders the `plan` stub (cost type / hour rate / label) as **display-only** calm fixture rows — clearly labeled as a placeholder, **never** a real finance/invoice/credits surface.
- Any billing/credits/invoice control (charge / adjust / view invoice / add credit) MUST be **disabled-with-reason** (`data-disabled-reason` / `data-reason-key`, reusing the `nav.reason.finance` idea: "Requires the billing module (out of current scope).") or a clearly-labeled demo — **no persistence, no engine** (scope-guard). This separates billing from the human profile (an improvement over the legacy attribute dump).

## 9. Profile actions (demo / confirm / disabled — IP8/IP9)

- **Edit** — `data-demo-action` → demo toast. **Add child** — `data-demo-action` → demo toast (§6).
- **Suspend / Stop** — destructive lifecycle changes → the approved confirmation modal (`data-confirm` + `data-confirm-title|msg|cta|toast|danger`) → a demo toast on confirm. **No real status persistence.**
- **Real CRUD / export** — `data-disabled-reason` / `data-reason-key` (disabled with a visible reason). Every action is honest under IP8; no raw i18n keys; status & attention never color-only.

## 10. States & responsive

- Each tab MUST show its **own** calm empty state (no children / no upcoming sessions / no notes) — never a blank region. Page-level **loading** skeleton + **error + retry** reuse the Spec 001 `states` patterns.
- **Responsive**: the banner stacks; the tablist scrolls/stacks below the tabs breakpoint (no overflow); the children list and agenda stack to single-column; the shared drawer is full-height on mobile.

## 11. `data-*` hooks (exact, reuse only — no invention)

`data-tabs="family-profile"`, `data-tab="overview|students|schedule|plan|notes"`, `data-tabpanel="<same>"`, `data-view` (hash/persistence token); `data-agenda`, per block `data-row` + `data-attention`; `data-drawer="<id>"`, `data-preview="<id>"`, `data-sheet-close`; actions via `data-demo-action`, `data-confirm` (+ `data-confirm-title|msg|cta|toast|danger`), `data-disabled-reason`/`data-reason-key`, `data-toast`. "View profile" (child → `student.html`), "View in schedule" (→ `schedule.html#view=timetable`), and the breadcrumb are real `<a href>` (not hooks). **No JS-generated ids/classes.**

## 12. Static-HTML-first & Django mapping

- `family.html` MUST be a **complete pre-rendered** static file in `public/` — full shell + banner + **all five** baked tab panels (Overview/Students/Schedule/Plan&Billing/Notes) + the `scheduleAgenda` blocks + every per-item `<template data-preview>` as real markup; **no `<div id="app">`**, no JS-built page DOM. Relative `./assets/` paths; per-language pages (`family.html` ar/rtl + `family.en.html` en/ltr); `.nojekyll`; **zero external/CDN requests**; no chart/table/form/calendar library.
- Django: `public/family.html` → `templates/admin/family.html` mapped to `family/<id>`; the shell → `{% include %}` partials; tabs → static sections / `{% if view %}` (default Overview); the children → `{% for child in family.students %}`; the agenda → the Spec 003 `{% for block %}` slice + the shared `_appointment_details.html` include; the plan stub → context (display-only); the status map → a template tag/filter. No whole-page `#app` mount.

## 13. Enforcement & cross-references

- **Smoke** (R31): `family` is in `PAGES` with `activeId:'families'`; the profile tablist has **≥5 tabs** with **exactly one** visible panel; the Students tab links children to `student.html`; the Schedule tab opens the shared drawer and the "View in schedule" link targets `schedule.html#view=timetable`; the banner shows a `family-status` chip; **no family/guardian portal markup** is present; no dead actions; no `id="app"`; relative assets; axe critical = 0.
- **Screenshots** (screenshot-acceptance): Family profile AR-RTL light desktop — appended to `app/screenshots/REVIEW.md`.
- Binds to `families-page-contract.md` (the "view profile" origin), `student-profile-contract.md` (the children's target + the reciprocal Family tab), the Spec 003 `schedule-tabs-contract.md` (tabs), `appointment-details-contract.md` (the shared drawer), `static-html-django-ready-contract.md` (SD1/SD2/SD4–SD9), and the Spec 002 `interaction-patterns-contract.md` (IP5/IP6/IP8/IP9) + `navigation-ia-contract.md` (NI11 future-role, NI12 registration).
