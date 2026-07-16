# Spec 042 — Modal / Drawer / Overlay Interaction Ledger

**Lens:** MODAL · DRAWER · OVERLAY. Trigger → destination → size → focus → close → scroll →
mobile → direct-link → form completeness → silent open/close failure in tests → duplicate ids →
nested-drawer collisions → page-vs-tab appropriateness.
**Baseline:** committed HEAD `de8d552` (Spec 041 route/sidebar freeze); 115 public HTML.
**Scope discipline:** READ-ONLY on `app/**`. This file is the only artifact written. Spec 042 proposes
NO app change; every gap below carries a future owner. Where evidence is missing → `UNKNOWN_EVIDENCE`.

The app has exactly ONE overlay engine, proven from source:
- **`openPanel(node,{wide},trigger)`** — `enhance.js:399-419` — the right-side sheet/drawer. Builds
  `div.drawer[.sheet]` with `role=dialog aria-modal=true`, a `.scrim`, a **real Tab focus-trap**
  (`enhance.js:408-418`), Esc-to-close (`:410`), and return-focus (`:427`). Used by BOTH
  `openSheet(id)` (clones `<template data-preview="id">`, `:441-445`) and `openDrawer()` (clones the
  mobile sidebar, `:431-439`).
- **`openConfirm(el)`** — `enhance.js:448-475` — the centered `.modal-scrim > .modal[role=dialog
  aria-modal=true]` built from `data-confirm-*` attributes; Esc + scrim-click close, return-focus.
- **`openModal(trigger)`** — `enhance.js:477-498` — the honest backendRequired note modal
  (`data-modal-trigger` + optional `data-modal-title-key/-note-key`); Close-only.
- **`openPopover(trigger,html)`** — `dropdown.js:15-50` — the kebab/topbar menu popover
  (`role=menu`, outside-click + Esc). Kebab menu items carry `data-drawer` and dispatch into
  `openSheet` (`enhance.js:589-590`).

The content of every sheet lives PRE-RENDERED in the static HTML as `<template data-preview="id">`
blocks (`preview-drawer.js:9-22`); `formDrawer()` (`:32-38`) wraps that with a `.wiz-grid` of inert
`field()` controls + exactly one `data-disabled-reason` Save. **No `<dialog>`, no library, no new
hook.** Sitewide census (built HTML): **162 distinct `data-drawer` ids**, **182 distinct
`<template data-preview>` ids**, **320 `data-confirm`**, **26 `data-modal-trigger`**, 48/115 pages
carry ≥1 template.

---

## PART A — THE MANDATED INVESTIGATION: the pre-existing 30 duplicate `f-fbAdd-*` ids

**Verdict: CONFIRMED, PRE-EXISTING at the Spec-041 baseline, NOT introduced by 042. Owner 044. Do
NOT fix in 042.**

### A.1 The defect
`field()` emits `id="f-${name}"` and a matching `<label for="f-${name}">` — `form-field.js:15,20,24,27`.
The Add-feedback form drawer `fb-add` (`outcome-details.js:60-65`) renders three such fields:
`fbAdd-category`, `fbAdd-remark`, `fbAdd-note` → ids `f-fbAdd-category / f-fbAdd-remark /
f-fbAdd-note`. But `fbAddDrawer()` is baked **NESTED inside every _attended_ outcome template's
action cluster** (`outcome-details.js:81` — `A.push(button(...'data-drawer="fb-add"') + fbAddDrawer())`),
so the whole `fb-add` template — ids and all — is re-emitted once per attended session on the page.

### A.2 Exact per-page count (grep of `app/public/*.html`, HEAD `de8d552`)
| page (×2 langs) | `f-fbAdd-category` occurrences | so, extra dup ids beyond first |
|---|---|---|
| `attendance.html` / `.en` | **5** | 4 × 3 = 12 |
| `sessions.html` / `.en` | **3** | 2 × 3 = 6 |
| `course.html` / `.en` | **2** | 1 × 3 = 3 |
| `group.html` / `.en` | **2** | 1 × 3 = 3 |
| `teacher.html` / `.en` | **2** | 1 × 3 = 3 |

The task's framing "30 duplicate ids (f-fbAdd-category/remark/note ×3 on 10 pages … ×2 langs)"
resolves to: **3 non-unique id NAMES**, each repeated on **5 base pages × 2 langs = 10 page files** →
the 30 duplicated-id-name cells. Every page above has ≥2 copies of all three ids ⇒ every one is a
W3C duplicate-`id` violation and a broken `<label for>` (the label points to the first match only).

### A.3 Baseline provenance (proven, non-destructive `git show`)
`git show <c>:…/attendance.html | grep -c 'id="f-fbAdd-category"'`:
- `21502af` (Spec 040, the Spec-041 baseline) → **5**   ← the mandated proof point
- `de8d552` (current HEAD) → **5**
- `HEAD` working build → **5**
- `a438ac2` (Spec 032, where FC-25 introduced the nested fb-add form) → **5**
- `80449be` (Spec 031, before FC-25) → **0**

⇒ The duplicate-id set was **born with Spec 032's FC-25** (the field-less "Add feedback" modal became
a real `formDrawer` nested in each attended outcome) and has been **byte-stable through 032→041**.
It is a genuine pre-existing defect, present and unchanged at commit `21502af`.

### A.4 Why it exists / why the tests never caught it
- The single `fb-add` template is the honest Spec-032 design (a real 3-field form + one backendRequired
  Save); the bug is only that it is CLONED per attended row instead of hoisted once per page.
- No runner asserts id-uniqueness. `smoke/run.cjs` never greps for duplicate ids; `a11y/run.cjs` axe
  scans do open drawers but the **fb-add nested form is never opened by any a11y row** (see B.3), so
  axe's `duplicate-id`/`duplicate-id-active` rules never fire on it in a rendered state.

### A.5 Owner & remedy (for Spec 044, NOT 042)
**Owner 044** (Modal/Drawer/Long-Form Interaction System). The clean fix is to bake `fb-add` ONCE per
page (hoist it out of the per-row action cluster; the `data-drawer="fb-add"` triggers already all
point at the one id) — or to suffix the field ids per host row. Either is a structural change to
`outcome-details.js` and is out of Spec 042's read-only scope. **No other owner is implied by the
evidence.** Record: the fix must keep the FC-25 guarantee (3 inert fields + one backendRequired Save)
and must not regress the Spec-032 `nestedFbAdd>=1` smoke assert (`smoke/run.cjs:1378`).

---

## PART B — SILENT OPEN/CLOSE FAILURES IN THE TEST RUNNERS

### B.1 CONFIRMED — `staff.html` RBAC drawer capture is a byte-identical no-op (highest severity)
`capture.cjs:251` — `{ page:'staff', … openDrawer:'st-perm', variant:'sp031-staff-rbac' }` — drives
`page.click('[data-drawer="st-perm"]').catch(()=>{})` (`capture.cjs:504`). But **`public/staff.html`
contains ZERO static `[data-drawer="st-perm"]`** (proven: `grep -c` = 0; the id exists only as
`<template data-preview="st-perm">` + a runtime kebab item at `enhance.js:156`). The selector matches
nothing, the `.catch(()=>{})` swallows it, and the frame is captured on the un-opened directory.
**Proof of the null result:** `md5sum` of `staff__ar__light__desktop__sp031-staff-rbac.png` ==
`staff__ar__light__desktop__sp031-staff.png` == `124561b3b9556ed830c11298839aa5d6`. The RBAC matrix —
the single hardest long-form surface in the product (Spec 031 contract asked for ~170 rows) — **has
never been rendered in any verification artifact.** This is the exact failure class Spec 041 R-2/R-3
swept for; one instance survived. The working `staffKebabDrawer` mechanism already exists
(`capture.cjs:513-516`, used for `staff-edit`/`staff-dup`). **Owner 044** (migrate row 251 to
`staffKebabDrawer:'st-perm'`); the RBAC content itself is owned by 043 + a dedicated RBAC spec.
The single smoke gate `smoke/run.cjs` only checks `a31.permTpl===1` (a template EXISTS in the DOM) —
it never opens the drawer, never counts rows.

### B.2 Systematic scan — every runner `openDrawer`/`open:` row resolved against static triggers
Script over `capture.cjs` + `a11y/run.cjs` cross-checking each row's `openDrawer`/`open:[data-drawer]`
id against a real `data-drawer="id"` in the target page. **Exactly one row fails: `st-perm` (B.1).**
Every other `openDrawer`/`open` row resolves to a real in-page trigger. (Kebab-hosted drawers
`staff-edit`/`staff-dup`/`stu-edit`/`trn-edit`/`fam-edit` correctly use the kebab-driver, not a direct
`[data-drawer]`.) Good hygiene overall — the one hole is severe because of WHICH surface it hides.

### B.3 CONFIRMED — 133 of 182 template ids are NEVER opened in any runner
Census (dedup across `capture.cjs` openDrawer/nestedDrawer/staffKebabDrawer + `a11y/run.cjs`
data-drawer): **49 opened, 133 never opened.** 76 are per-row entity previews (`out1..out15`, `s1..s5`,
`st1..st14`, `inv-*`, `sara/mohammed/…` teacher cards) whose sibling id is exercised, so a spot-check
covers them. But **57 are NAMED (non-row) drawers with no opened sibling**, i.e. surfaces whose
rendered state has never been asserted by any test:

| never-opened named drawer | host page(s) | note / owner |
|---|---|---|
| `st-cat`, `st-activity` | staff | 0 capture + 0 a11y rows — see C11 audit "never rendered in any verification artifact"; owner 044 + (semantics) 043 |
| `stu-assign`, `stu-move` | student | enroll pickers; `stu-enroll` IS opened, these two are not; owner 044 |
| `trn-assign-group` | teacher | `trn-assign-course` opened, group twin not; owner 044 |
| `integ-stripe/paypal/mollie/xpay/payoneer/custom/paymob-payout/payoneer-payout` | settings | only `integ-paymob/-email/-whatsapp` are captured (Spec 040) — 8 provider drawers never rendered in a runner; owner 053 (content) / 044 (host) |
| `msg-c1..c5` | messages | the read-only conversation sheets; only `msg-group` opened; owner 044 |
| `msg-member` | messages | Add-Member form drawer — `data-preview` exists, 0 runner rows (capture opens `msg-group` only); owner 044 |
| `task-section` | tasks | Add-Section drawer; only `task-new` opened; owner 044 |
| `b1..b16` (appointment previews) | schedule/course/group/family/student/teacher | the timetable-block drawers; smoke opens ONE block behaviorally (`smoke:314-317`) but no per-id frame; owner 044/045-050 |
| `st1..st14` | students | per-row quick-peek previews — never opened; owner 045-050 |
| `sara/mohammed/layan/abdullah/reem/nora/khalid/huda` | teachers | per-teacher previews — never opened; owner 045-050 |

**Owner 044** for the interaction-coverage gap generally; specific content owners as noted. This is a
verification-completeness finding, not proof any of them is broken — but none can be claimed "verified".

### B.4 No orphan triggers, no dangling clones (good)
- Every in-page `data-drawer` trigger has a matching in-page `<template data-preview>` (script over all
  115 files: **0 triggers with a missing template**). A missing template would silently fall through to
  `toast(acknowledge)` (`enhance.js:443`) — none exists.
- The mobile-sidebar drawer clone strips ids + `aria-controls`/`aria-labelledby` before insertion
  (`enhance.js:435-437`) — correctly avoids duplicate-id/dangling-aria on clone. The kebab popover is
  removed on close (`dropdown.js:7`); the sheet is removed on close (`enhance.js:425`).

---

## PART C — FOCUS / CLOSE / SCROLL / MOBILE BEHAVIOUR

### C.1 CONFIRMED — the confirm modal and the note modal do NOT trap Tab
`openConfirm` (`enhance.js:448-475`) and `openModal` (`:477-498`) register **only** an Escape handler
(`:467`, `:494`); neither installs the Tab focus-trap that `openPanel` has (`:408-418`). Focus can Tab
out of the dialog into the inert background page while `aria-modal=true` claims otherwise. **320
`data-confirm` instances sitewide** flow through `openConfirm`; every destructive confirm (delete
staff/course/library, suspend/stop family/student, session cancel/absent) inherits this. The drawers
(`openPanel`) are fine; the modals are not. **Owner 044** (add the same trap/return-focus contract that
Spec 015-019 wrote for `openPanel`; Spec 041 R-2 made a11y `serious` a gate, so this is a candidate
that axe may already flag if a confirm frame is scanned — but no a11y row opens a confirm, see B.3).
Return-focus IS handled for both (`:465`, and `openPanel :427`); scrim-click + Esc close both.

### C.2 CONFIRMED — no `overflow:hidden`/`inert` on the background while a sheet/modal is open
`openPanel`/`openConfirm`/`openModal` append the scrim but never lock body scroll or mark the shell
`inert`/`aria-hidden`. On a short viewport the page behind a tall drawer still scrolls. Minor; the
scrim visually covers it. **Owner 044** (background scroll-lock is part of a modal system).

### C.3 CONFIRMED — the mobile sidebar drawer is clipped (also a documented visual finding)
`dashboard__ar__light__mobile__drawer.png` (780×1688) shows the cloned sidebar with **every nav label
clipped at the inline edge and the icon rail absent**. Root cause is geometry, not the clone: the
`.drawer` is `width:min(334px,92vw)` (`app.css:328`) but it hosts a `.sidebar` whose intrinsic width is
`--rail-w 68px + --panel-w 246px = 314px` (`app.css:16-18`) laid out `flex-direction:row`
(`app.css:230`); at 390px viewport ×0.92 = 359px the panel + rail + padding overflow and the RTL
`.nav-panel` text is cut. Contrast the desktop sheets which fit `min(440px,92vw)` (`app.css:527`).
**Owner 044** (Spec 041 D-1 and C15 both flag the mobile drawer; the fix is a drawer-width/label-wrap
rule, not new behaviour). `C15-13 COMPLETE_BUT_VISUAL_REVIEW_REQUIRED → 044`.

### C.4 CONFIRMED — direct-linking a drawer is impossible (by design); tabs are hash-addressable
`langUrl()` preserves `#view=/#step=/#child=` (Spec 041 D-3, `enhance.js:239-249`) and tabs restore
from the hash on load (`enhance.js:267-274`), so a TAB is a real deep-link. A DRAWER has no hash
representation — `openSheet` is click-only (`enhance.js:441`), no `hashchange` listener exists
(`enhance.js` has none). This is fine for ephemeral previews, but it means every long-form surface that
was foldered into a drawer (fam-edit 9 fields, trn-edit 11, lead-new 19, staff RBAC ~170) is
**unreachable by URL and lost on refresh**. It is the core argument for the drawer-vs-page decisions
below. **Owner 044** to rule per-surface (page/tab vs drawer); it must not regress the hash-aware tab
engine.

---

## PART D — SIZE / SCROLL / "SHOULD THIS BE A PAGE OR TAB?" — the long-form-in-a-narrow-sheet problem

Every sheet is a fixed `min(440px,92vw)` single-column scroller with the Save at the END of the
scrolling `.sheet-body` — there is **NO sticky action footer** (`preview-drawer.js:32-38`; only
`.sheet-head` is fixed, `app.css:529-530`). Below a handful of fields the Save falls below the fold.
Largest baked drawer bodies (control count, AR build):

| drawer | controls | host | issue → owner |
|---|---|---|---|
| `lead-new` | **19** | leads.html | Save below fold (proven: `leads__ar__light__desktop__sp034-leads-create.png` — the bottom "ملاحظة" field is the last visible row, no Save on screen; the two legacy section headings `lead.create.main/.more` exist unused). Legacy split it into 2 sections. → **044** (sticky footer + sections) / **056** (fields) |
| `trn-edit` | 11 | teacher.html + teachers.html | teacher edit is a ~25-field legacy form crammed into one column → **044** host decision / **056** |
| `form-create` | 10 | reports.html | a FORM BUILDER baked with exactly 2 static question rows — the whole point (add/remove rows + options) cannot exist in the sheet; → **044** repeatable-row primitive / **056** |
| `fam-edit` | 9 | families/family | legacy family edit ≈28 controls; the sheet cannot host Settings/Billing/Activity → **044** (page/tabbed host) / **056** |
| `stu-add`, `grp-add`, `stu-edit`, `grp-edit`, `crs-edit`, `sess-new` | 7–8 | various | borderline; acceptable today, but any field-parity pass (056) pushes them past the sheet → **044** |

**`fb-add` sticky point (also A.1):** the fb-add sheet Save ("حفظ") is visible in
`attendance__ar__light__desktop__sp032-fb-add.png` because it only carries 3 fields — the size problem
is real only for the 9-19 field forms above.

**Confirm-with-fields gap (structural):** `confirmAction()` (`confirm-modal.js:8-17`) renders a
button carrying `data-confirm-*` text ONLY — the confirm modal (`openConfirm`) has **no field slot**.
So Suspend/Stop family+student lost their legacy return-date + auto-return + mandatory note (legacy
"Suspended Family" = 3 fields, "Schedule Stop" = 4 fields — `modal-inventory.md`). A field-less confirm
cannot carry them. **Owner 044** (a "confirm-with-fields" pattern) + **056** (the fields).

---

## PART E — MODAL/DRAWER GAPS vs THE LEGACY (from the ledger + raw `modal-inventory.md`)

Legacy corpus = **1,373 captured modals, 67 distinct titles** (`modal-inventory.md`). The heaviest are
long-form operator modals with NO drawer/modal host in our product today. Every row here is a form
whose fields are owned by 056 and whose long-form HOST is owned by 044; persistence is FUTURE_BACKEND.

| legacy modal (max fields) | evidence | current | disposition | owner |
|---|---|---|---|---|
| **Mark As Absent (13)** | `admin/pages/management-home.json` modal "Mark As Absent" | outcome drawer → `studentAbsent`/`teacherAbsent` = field-less `data-confirm` (`outcome-details.js:73-74`) | PARTIAL | 044 + 056; persistence FUTURE_BACKEND |
| **Cancel Class (10)** | same, modal "Cancel Class" | outcome drawer cancel confirm (`outcome-details.js:75`), 0 fields | PARTIAL | 044 + 056 |
| **Edit Class (8, incl. teacher-reassign)** | same, modal "Edit Class" | appointment drawer "Edit" = `data-demo-action` toast, 0 fields (`appointment-details.js` appointmentActions) | PARTIAL | 044 + 056 (teacher reassign = the biggest missing control) |
| **Mark as attend (7 + images[])** | same, modal "Mark as attend" | outcome drawer attend = `data-demo-action` toast (`outcome-details.js:72`) | PARTIAL | 044 + 056; upload stays a GATE |
| **Send Report (24)** teacher/admin monthly report | `teacher/…` "End class"(5)/`admin` "Send Report"(24) | teacher-reports.html = 5 read-only labels; student `#view=evaluation` read-only | MISSING (producer) | 044 (the 2-column long-form) + 056 |
| **New Transaction (8)** record payment | `modal-inventory.md` "New Transaction" ×28 | finance record-payment = field-less confirm/gate (`finance-actions.js:66-79`) | PARTIAL | 044 + 056 + future billing |
| **Create parent invoice (16 + line rows)** | C07 audit | "Create invoice" = disabled gate, 0 fields | FUTURE_BACKEND | future billing + 056 + 044 (line-item repeater) |
| **Schedule Cancel Classes (8)** | `management-home` kebab | `scheduled-actions.html` create = field-less gate; NOT reachable from a course | PARTIAL | 044 (conditional long-form) + 056 |
| **Add Lesson Student Timezone (8)** / **Student Timetable (dual-tz)** | course records | Timetable tab is single-timezone; no add-classes entry | PARTIAL | 044 + 055 |
| **Request Cancel (8)** family/teacher | `teacher`/`family` records | family-requests preview card + gate; teacher: none | PARTIAL | 044 + 055 |
| **Certificate approve (7)** | `management-certificate-requests.html` #certApproveModal | Approve = bare gate; template/date/message live in a SEPARATE `cert-create` drawer | PARTIAL | 044 (the approve form) + FUTURE_BACKEND |
| **Certificate designer (~15, drag)** | `management-pdf-create` certForm | `cert-tpl` drawer = name + STATIC preview + upload gate | PARTIAL (sanctioned) | 044 (per-card identity) + FUTURE_BACKEND (render) |
| **Add Feedback (2→3)** | `management-home` "Add Feedback" | `fb-add` formDrawer (3 fields + gate) — the ONE completed one | PARTIAL (+ the dup-id defect, Part A) | 044 |
| **Group settings / Leave Group** offcanvas | `management-chat.html` #offcanvasRight | NO surface at all in messages.html | MISSING | 044 + FUTURE_BACKEND |
| **Currency Rates (17)** | `modal-inventory.md` ×7 | none (finance is single authored SAR) | UNKNOWN_EVIDENCE (never opened in crawl; field COUNT only) | future billing |
| **Recent Searches (1)** / **Add shortcuts (2)** | ×294 / ×315 | topbar command popover — 3 fabricated recents + noop add | PARTIAL / FUTURE_BACKEND | 044 (search UI) / 056 (shortcut form) — C12-24/C15-06/07 |

**Per-row drawer identity defect (CONFIRMED, C10-31 restated):**
`library.js:38` opens the ONE `mat-edit` drawer for all 6 subjects (prefilled `SUBJECTS[0]`);
`certificates.js:40,70` opens the ONE `cert-tpl` for all 4 templates. Clicking "Edit الرياضيات" shows
"اللغة العربية". The certificate-request drawers `cr-cr1…` DO carry per-row identity correctly
(`certificates.js:106` — `data-drawer="cr-${r.id}"`) — use them as the 044 pattern. **Owner 044.**

**messages.js dual-representation (CONFIRMED, C11-01 restated):** every conversation row is a
`data-drawer="msg-<id>"` read-only sheet (`messages.js:57`) while the inline thread pane is pinned to
`MESSAGES[0]` (`messages.js:71`) and the sheet has no compose box — selecting a conversation never
switches the pane and the reply box vanishes when you open one. **Owner 044.**

---

## PART F — WHAT IS HONEST AND MUST BE PRESERVED (do not "fix")

- The single `openPanel` engine with a real Tab trap + Esc + return-focus on all drawers/sheets
  (`enhance.js:408-427`) — a genuine a11y win over the legacy's Bootstrap modals.
- `formDrawer` renders INERT fields + exactly ONE `data-disabled-reason` Save — no fake persistence
  (`preview-drawer.js:32-38`); smoke enforces `fieldless===0 / noGate===0 / multiPrimary<=1 /
  MUST-OMIT===0` per registered drawer (`smoke/run.cjs:1329-1379`).
- Settings deliberately ships **0 confirm dialogs** (a confirm in front of an inert gate is theatre) —
  SETTLED by Spec 040; do not add confirms there (C09 audit).
- The mobile-clone id/aria stripping (`enhance.js:435-437`) is the correct anti-duplicate-id measure —
  the fb-add defect (Part A) is the one place a template is cloned WITHOUT it.
- The `cr-*` per-row drawers + the kebab-driver (`capture.cjs:513`) are the correct patterns 044 should
  generalize.

---

## SUMMARY TABLE — findings, disposition, owner

| # | finding | evidence | disposition | owner |
|---|---|---|---|---|
| A | 30 duplicate `f-fbAdd-*` ids, nested fb-add cloned per attended row, stable since Spec 032 | `outcome-details.js:60-65,81`; grep; `git show 21502af` | CONFIRMED pre-existing | **044** (not 042) |
| B.1 | staff RBAC (`st-perm`) capture is a byte-identical no-op — never rendered | `capture.cjs:251,504`; md5 `124561b3…` | CONFIRMED silent test failure | **044** + 043/RBAC-spec |
| B.3 | 57 named drawers (st-cat, st-activity, msg-member, 8 integ-*, task-section, stu-assign/move, trn-assign-group…) never opened in any runner | dedup census script | CONFIRMED coverage gap | **044** / 053 / 045-050 |
| C.1 | confirm + note modals lack a Tab focus-trap (drawers have one) | `enhance.js:448-498` vs `:408-418` | CONFIRMED a11y defect | **044** |
| C.2 | no background scroll-lock/inert behind sheet/modal | `enhance.js` openPanel/openConfirm | CONFIRMED minor | **044** |
| C.3 | mobile sidebar drawer clips labels + drops rail (314px sidebar in a 334px drawer) | `…mobile__drawer.png`; `app.css:16-18,328` | CONFIRMED | **044** |
| C.4 | drawers not hash-addressable / lost on refresh; tabs are | `enhance.js:239-274,441` | by-design, argues page-vs-drawer | **044** |
| D | long-form-in-narrow-sheet: no sticky footer, Save below fold on lead-new(19)/trn-edit(11)/form-create(10)/fam-edit(9) | `preview-drawer.js:32-38`; `…sp034-leads-create.png` | CONFIRMED ergonomic | **044** + 056 |
| D′ | confirmAction has no field slot → Suspend/Stop lost date+note | `confirm-modal.js:8-17` | CONFIRMED | **044** + 056 |
| E | ~14 heavy legacy modals (Absent 13 / Cancel 10 / Edit 8 / Send-Report 24 / invoice 16 …) have field-less gates or no host | `modal-inventory.md`; `outcome-details.js`, `finance-actions.js` | PARTIAL / MISSING | **044** + 056 (+055/billing) |
| E′ | per-row drawer identity lost (mat-edit×6, cert-tpl×4) | `library.js:38`; `certificates.js:40,70` | CONFIRMED | **044** |
| E″ | messages drawer-vs-pinned-pane; reply box disappears on open | `messages.js:57,71` | CONFIRMED | **044** |
