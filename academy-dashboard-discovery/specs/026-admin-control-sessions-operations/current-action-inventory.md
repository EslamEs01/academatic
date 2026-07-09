# Current Action Inventory — all 91 public pages

Read-only inventory of every action across the 91 built pages, classified with the approved taxonomy. Classifier of record = `app/src/js/enhance.js` (the single delegated click dispatch). **Coverage method** (per `visual-grounding.md`): shared chrome + shared components are classified **once** and referenced; page-specific body actions are enumerated per page. Every one of the 91 pages is covered by exactly one of the three surface classes below.

**Baseline honesty facts (built, verified):** `href="#"` = **0** sitewide; a generic catch-all (`enhance.js` → `toast(acknowledge(btn))`) means **no button is truly inert**; planned admin nav = `data-coming-soon` gates (no broken anchors); no admin Upload action exists (upload lives only on portals). ⇒ **There are zero truly-dead controls.** The Layer-B work is reclassifying *misleading* persistence-implying actions, not resurrecting dead ones.

---

## A. Shared admin chrome — classified once (present on all 40 admin files)

| Surface | Action(s) | Hook | Current behavior | Classification | Fix in 026? |
|---|---|---|---|---|---|
| Topbar (all 20 bases) | theme / lang / profile / notifications / apps-grid / quick-actions / command-palette | `data-action` (`enhance.js:22-92,515-534`) | popover menus; logout = `data-confirm` modal; quick-actions = 3 create shortcuts (`data-demo-action`) + 1 `data-disabled-reason` | `real-modal` / `display-only` | no — already honest |
| Sidebar rail (all 20) | ~29 planned nav items | `data-coming-soon` + `data-soon-key` | «قريبًا» toast | `planned-future-gate` | no — already honest (owners per `future-owner-register.md`) |
| Sidebar rail (all 20) | 7× finance nav | `data-disabled-reason="nav.reason.finance"` | reason toast | `permission-locked-gate` | no — already honest |

## B. Shared components — classified once (baked across ~8 pages each; reclassifying these fixes admin in bulk)

| Component (file) | Actions | Current | Classification | Fix in 026? |
|---|---|---|---|---|
| appointment drawer (`appointment-details.js:47,62-64`) | Edit, Notify = `data-demo-action` toast; Cancel = `data-confirm-danger`→toast; Join = `data-disabled-reason` | «preview action» / confirm→toast / reason | Edit/Notify → `backendRequired-gate` (**reclassify**); Cancel → `real-modal` honest final (secondary); Join = honest | **yes** |
| outcome drawer (`outcome-details.js:55-70`) | Attend/Feedback/Notify/Reverse = `data-demo-action`; absent/cancel/reschedule = `data-confirm`; Add-to-credit = `data-disabled-reason` | preview / confirm→toast / reason | demo verbs → `backendRequired-gate` (**reclassify**); confirms → honest final (secondary); credit = honest | **yes** |
| row kebab (`enhance.js:94-101 rowMenu`) | View = `data-drawer` (real); Edit, Cancel = `data-demo-action` | drawer / preview toast | View = `real-drawer`; Edit/Cancel → `backendRequired-gate` (**reclassify**) | **yes** |
| family kebab (`enhance.js:103-112 familyMenu`) | View profile = `href` (real); Edit = `data-demo-action`; Suspend/Stop = `data-confirm(-danger)` | link / preview / confirm→toast | View = `real-page-link`; Edit → `backendRequired-gate`; Suspend/Stop → honest final (secondary) | **yes** |
| teacher actions (`teacher-actions.js:17-32`) | Add/Edit/Message/Note = `data-demo-action`; Notify = confirm; Assign/Print = `data-disabled-reason` | preview / confirm / reason | demo verbs → `backendRequired-gate`; Notify → honest final; Assign/Print = honest | **yes** |
| course/group actions (`course-group-actions.js:20-40`) | Edit, Add-students = `data-demo-action`; Remove-student = confirm-danger; Assign/Print = reason | preview / confirm / reason | demo verbs → `backendRequired-gate`; Remove → honest final; Assign/Print = honest | **yes** |
| finance actions (`finance-actions.js:39-113`) | Print = `data-demo-action`; Create-invoice/Export/Send = `data-disabled-reason`; Record/Mark-paid/Send-reminder = confirm | preview / reason / confirm | Print → `backendRequired-gate` (align w/ Export); confirms → honest final; reasons = honest | **yes** |
| settings section (`settings-section.js:11-33`) | Save = `data-demo-action`; toggles = `data-toggle`; theme/lang = **real** persisted; Reset = confirm; 2FA/billing = disabled+reason | preview / flip / real / confirm / reason | Save → `backendRequired-gate`; toggles → `backendRequired`/`display-only` (secondary); theme/lang = `real-static-tab` (real); Reset → honest final; 2FA = honest | **yes** |
| wizard (`wizard.js:23-34`) | steps = `data-step-*` (real); Save = `data-demo-action` | step toggle / preview | steps = `real-static-tab`; Save → `backendRequired-gate` | **yes** |

## C. Per-page admin body actions (page-specific; shared chrome/components above not repeated)

| Page | Key actions | Classification | Fix in 026? |
|---|---|---|---|
| **dashboard** | New-session (`data-action=new-session`) + Add-session (empty-state) → preview toast; View-schedule = real link; Overview/reports/people chips = real links; report cards = real/`is-disabled`; **Apply/Clear-filter (Today's Sessions) = unhandled → preview toast (does NOT filter)**; Retry = design demo | New/Add-session → `backendRequired-gate`; **Apply/Clear → `real-static-filter` or `remove-or-reword` (misleading)**; links = `real-page-link`; retry = `display-only` | **yes** (New/Add + filter widget) |
| **sessions** | New-session = `data-demo-action`; View-attendance = real link; List/Timetable = `data-tab`; status/subject/search = `data-filter`; row kebab = shared; status tiles = static | New-session → `backendRequired-gate`; tabs/filters = real; tiles = `display-only` | **yes** (New-session + kebab Edit/Cancel) |
| **schedule** | teacher/subject/status/search = `data-filter`; List/Timetable = `data-tab`; block → appointment drawer (32×) | filters/tabs = real; drawer = `real-drawer` | via shared drawer |
| **students** | Add-student = `data-demo-action`; View-profile = real link + drawer; family/status/subject/search = `data-filter` | Add-student → `backendRequired-gate`; rest honest | **yes** |
| **teachers** | Add-teacher = `data-demo-action`; View-profile = real link/drawer; subject/status/workload/availability = `data-filter` | Add-teacher → `backendRequired-gate`; rest honest | **yes** |
| **courses** | Add-course = `data-demo-action`; View-course = real link; subject/level/status = `data-filter` | Add-course → `backendRequired-gate`; rest honest | **yes** |
| **groups** | Add-group = `data-demo-action`; summary tiles = `data-filter-set`; 6 filters + search; group rows = real links | Add-group → `backendRequired-gate`; rest honest | **yes** |
| **course** | Edit-course = `data-demo-action`; Assign-teacher/Add-students/Print = reason; tabs + View-in-schedule/attendance = real | Edit → `backendRequired-gate`; rest honest | **yes** (via shared) |
| **group** | Edit-group + Add-students = `data-demo-action`; Remove-student = confirm; Assign/Print = reason; tabs + links real | Edit/Add → `backendRequired-gate`; Remove → honest final; rest honest | **yes** (via shared) |
| **teacher** | Edit/Message/Note = `data-demo-action`; Notify = confirm; Assign/Print = reason; timetable/attendance links + tabs real | demo verbs → `backendRequired-gate`; Notify honest final; rest honest | **yes** (via shared) |
| **teacher-performance** | KPI tiles = static; subject/workload/signal filters + search; View-profile = real links; **0 demo-action / 0 confirm / 0 drawer** | `display-only` / `real-static-filter` / `real-page-link` — fully honest, PAY-FREE | no |
| **attendance** | summary tiles = `data-filter-set`; 6 selects + search = `data-filter`; outcome-row kebab = shared; student/family chips = real links | tiles/filters/links honest; kebab Edit/Cancel → `backendRequired-gate` | **yes** (via shared) |
| **families** | Add-family = **real link** to wizard; card kebab View = real link; Edit = `data-demo-action`; Suspend/Stop = confirm; filters | Add-family = `real-page-link`; Edit → `backendRequired-gate`; Suspend/Stop honest final | **yes** (via shared) |
| **add-family** | steps = `data-step-*` (real); **Save (last step) = `data-demo-action`** (creates nothing); Add-another-child = `data-demo-action`; Manage-billing = disabled+reason; form inputs inert | Save/Add-child → `backendRequired-gate`; steps = real; inputs = `display-only`; billing honest | **yes** |
| **family** | Edit/Add-child/Add-note = `data-demo-action`; Suspend/Stop = confirm; Manage-billing = reason; tabs + child/invoice/schedule links real | demo verbs → `backendRequired-gate`; confirms honest final; rest honest | **yes** |
| **student** | Message/Edit/Add-note = `data-demo-action`; Add-course = **disabled+`set.reason.backend` (already honest)**; 7 tabs + family/course/group/schedule links real | demo verbs → `backendRequired-gate`; Add-course honest; rest honest | **yes** |
| **finance** | Print = `data-demo-action`; Create-invoice/Export CSV/PDF/Send = `data-disabled-reason` (honest); Record/Mark-paid/Send-reminder = confirm; tiles/filters/View drawer real; planned payroll cards = disabled block | Print → `backendRequired-gate` (align w/ Export); confirms → honest final; rest honest; payroll = `planned-future-gate` | **yes** (Print + confirms) |
| **reports** | **Print = `data-demo-action`**; Export CSV/PDF/Share = `data-disabled-reason` (honest); Schedule-report = confirm; category cards = real/`is-disabled`; area/availability/search filters + "more" links real | Print → `backendRequired-gate` (align w/ Export); Schedule honest final; cards = `real-page-link`/`planned-future-gate`; rest honest | **yes** (Print) |
| **settings** | Save = `data-demo-action`; toggles = `data-toggle`; theme/lang = **real**; Reset = confirm; billing/2FA = disabled+reason | Save/toggles → `backendRequired`; theme/lang = real; Reset honest final; 2FA honest | **yes** (via shared) |
| **gallery** | component-showcase demo buttons + one disabled+reason; Show-toast/Modal = real | `display-only` (design reference) / `real-modal` | no — design reference |

## D. Portal surface — classified once (49 files = 24 role bases + family-child, ×2; agent-verified, smoke-pinned)

| Group | Nav | Body anchors | Switchers | Gates | Suspect? |
|---|---|---|---|---|---|
| hub `portals` | — | 4 real (family/teacher/admin/child-view) | — | 0 | none |
| student-portal + 6 internals | 7/7 implemented | quick-links (home) | — | `guidePanel`/`plannedCard` (hwSubmit/history/photo/save/password/live-room/matDownload) all backendRequired/planned | none |
| family-portal + family-child + 7 internals | 8/8 implemented | child drill-downs + fold link (`family-child#child=stX`, `student-portal`) | 5 `:target` `#child=` panels | `gateNote`/`plannedCard`/`guidePanel` (billing/meeting/live-room/matDownload/photo/save/password/history/edit-child/submit) all honest | none |
| teacher-portal + 7 internals | 8/8 implemented | 1 → `teacher-reports` (Spec 025 repoint) | — | `gateNote`/`guidePanel` (outcomeSave/live-room/availability/task/export/upload/download/photo/save/password) all backendRequired | none |

**Portal verdict**: fully action-complete & honest — real nav links (self-current) + real drill-downs + `:target` switchers + non-interactive `backendRequired`/`planned` gates. Zero forms, zero `onclick`, zero `href="#"`, zero dead buttons. **No remediation needed** on the 25 portal bases. Role laws re-swept clean (teacher pay-free, family zero-pay incl. `family-billing`, student child-view «عرض الابن»).

## E. Index / entry (2 files)
`index.html` / `index.en.html` — language/redirect entry; no actions. Honest.

---

### Classification tally
- `real-page-link` / `real-static-tab` / `real-static-filter` / `real-drawer` / `real-modal` — the large majority (all nav, tabs, filters, drawers, entity previews, wizard steps, portal links/switchers).
- `backendRequired-gate` (already honest) — finance Create/Export/Send, student Add-course, all portal gates, disabled+reason controls.
- `planned-future-gate` — planned admin nav (owners per register), planned report/finance cards.
- **`backendRequired-gate` (needs reclassify from «preview action») — the Layer-B work**: ~9 admin Create/Add primaries + the shared demo-action verbs across ~8 components (Edit/Notify/Message/Note/Attend/Save/Print) + the `data-confirm`→success writes (secondary tier).
- `remove-or-reword` / misleading — the dashboard "Today's Sessions" Apply/Clear-filter widget (unhandled, imitates a real filter).
- **`dead-button` / `href-hash` / forbidden — ZERO.**
