<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **10-component-inventory-v2.md**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 05 — Component Inventory

> The distinct UI components the rebuild needs, derived from the discovered surface. The crawler counted ~5,600 buttons / 1,373 modals etc., but that's pre‑dedup (global chrome + the same session‑action modal set repeat on every page). The **distinct component library is ~30 components + ~6 patterns**. Naming below is original/generic (do not reuse legacy class names). Stack target: **HTML + Tailwind (no CDN) + native JS, no SPA framework**.

Legend: **RTL** = needs RTL‑aware styling · **Role** = needs role/permission‑aware rendering.

## A. App shell & navigation

| Component | Purpose | Variants / states | RTL | Role | Notes |
|---|---|---|:--:|:--:|---|
| **AppShell** | Page skeleton: sidebar + topbar + content + (optional) right drawer | expanded/collapsed sidebar; boxed/full container | ✅ | ✅ | three nav configs (admin/teacher/family) |
| **Sidebar** | Primary nav, grouped sections, active state | grouped, collapsible, icon‑only collapsed; pinned shortcuts | ✅ | ✅ | data‑driven from a nav config |
| **Topbar** | Search, notifications, language, theme, profile menu | with/without search; unread badge | ✅ | ✅ | shared across roles |
| **Breadcrumbs** | Location trail | 1–4 levels | ✅ | — | — |
| **GlobalSearch** | Omni search + recent searches | input, dropdown results, recent list | ✅ | — | legacy had "Recent Searches" modal |
| **ShortcutsWidget** | User‑pinned quick links | add/remove; empty state | ✅ | — | per‑role POST shortcuts |
| **LanguageSwitcher** | Locale toggle (10 locales) | flag list | ✅ | — | drives RTL/LTR |
| **ThemeSwitcher** | Light/Dark/System + brand color | 3 modes; color picker | — | — | maps to legacy customisation |
| **PageHeader** | Title + subtitle + primary actions slot | with/without actions, with status badge | ✅ | ✅ | — |

## B. Data display

| Component | Purpose | Variants / states | RTL | Role | Notes |
|---|---|---|:--:|:--:|---|
| **KpiCard** | Stat tile (label + value [+ delta/icon]) | plain; clickable‑as‑filter; multi‑value (e.g. "Waiting & Running"); with sparkline | ✅ | — | dashboards use 6–11 per page; some act as status filters |
| **DataTable** | Sortable, paginated, filterable table | server sort/paginate; row actions menu; selectable (checkbox + bulk action); sticky first col + horizontal scroll (23‑col salary); empty state; loading skeleton | ✅ | ✅ | the workhorse; column visibility may be permission‑gated |
| **RowActionMenu** | Per‑row action dropdown | safe vs destructive grouping; disabled items | ✅ | ✅ | replaces legacy's 4–9 inline buttons per row |
| **StatusChip / Badge** | Status pill | the **11 session statuses** (configurable colors), plus account statuses (active/suspended/stopped/inactive/deleted/trial/incomplete), invoice (paid/unpaid/overdue), payout (8) | ✅ | — | central status‑color map |
| **Timeline / ActivityLog** | Chronological audit (actor + field change old→new) | dense; with avatars | ✅ | — | on student/family/teacher/course/session details |
| **DefinitionList / InfoCard** | Key‑value record display | 1–2 col; masked values (phone/email) | ✅ | ✅ | profile/detail headers |
| **Chart** | Line/bar/pie/donut + **geo map** | per analytics page | ✅ | — | pick a chart lib; map needs geo data |
| **Avatar** | User image w/ initial fallback | sizes; broken‑image fallback (legacy logo 404s) | — | — | always provide fallback |
| **EmptyState** | "No data" placeholder | per entity; with CTA | ✅ | — | many lists empty in test data |
| **MetricGauge** | Circular progress (hours used/remaining) | family/teacher home | — | — | — |

## C. Forms & inputs

| Component | Purpose | Variants / states | RTL | Role | Notes |
|---|---|---|:--:|:--:|---|
| **FormField** | Labeled input + validation + help | text/email/number/password/textarea; error/required/disabled | ✅ | — | legacy had ~48% fields without `<label>` — fix |
| **Select** | Single select | native + searchable (legacy select2) | ✅ | — | — |
| **MultiSelect / TokenInput** | Multi‑value w/ async search | tag chips; students[]/teachers[]/emails[]/phones[] | ✅ | — | used widely (assign, broadcast, group) |
| **DatePicker / DateRange / TimePicker** | Dates & times | range; time w/ hour+minute; min‑date | ✅ | — | legacy flatpickr; many YYYY‑MM‑DD/HH:MM |
| **RadioGroup / CheckboxGroup** | Choice sets | inline/stacked; segmented | ✅ | — | makeup options, accounting statement, etc. |
| **ToggleSwitch** | Boolean settings | on/off; in matrices | ✅ | ✅ | settings & capabilities |
| **FileUpload / Dropzone** | File/image upload | single/multi; thumbnail; size limit; **audio record** (family) | ✅ | — | legacy dropzone; voice = MediaRecorder |
| **RichTextEditor** | Formatted text | minimal toolbar; bilingual | ✅ | — | policies (legacy Quill) |
| **ColorPicker** | Color selection | swatch + hex; "pick from logo" | — | — | theming + status colors |
| **ScheduleRepeater** | Weekly recurring schedule builder | per‑day checkbox + time + duration | ✅ | — | course/group/request‑schedule |
| **PermissionMatrix** | Grouped checkbox tree (~170) | search‑filter; select‑all/clear‑per‑group | ✅ | ✅ | staff permissions |
| **NotificationMatrix** | event × channel grid of toggles | ~47 cells; per‑role columns | ✅ | — | notification settings + family prefs |
| **RateTierRepeater** | Threshold→rate tiers | add/remove rows | ✅ | — | teacher pay rules, fines |
| **Wizard / Stepper** | Multi‑step form | step nav; validation per step; conditional steps | ✅ | — | request‑trial, WhatsApp setup, request‑schedule |
| **FormBuilder** | Dynamic question builder | 6 question types; add/remove/reorder; options repeater | ✅ | — | monthly report forms |

## D. Overlays & interaction

| Component | Purpose | Variants / states | RTL | Role | Notes |
|---|---|---|:--:|:--:|---|
| **Modal / Dialog** | Centered overlay | sm/md/lg; form modal; confirm modal; **destructive confirm** (typed/explicit); lazy‑loaded content | ✅ | ✅ | accessible: focus trap, Esc, role=dialog |
| **Drawer / OffCanvas** | Side panel | right/left; for big forms (24‑field report, filters) | ✅ | — | prefer over modal for large forms |
| **Dropdown / Menu** | Action/menu popups | with dividers, destructive section, disabled items | ✅ | ✅ | 551 dropdowns exercised |
| **Tabs** | In‑page view switch | underline/pill; lazy tab content | ✅ | ✅ | student/family/teacher details (up to 8 tabs) |
| **Accordion** | Collapsible sections | single/multi open | ✅ | — | filter panels, details |
| **Tooltip / Popover** | Hover/click info | calendar session popover | ✅ | — | timetable blocks |
| **Toast / Snackbar** | Transient feedback | success/error/info; legacy used toastr | ✅ | — | for save/submit results |
| **ConfirmService** | Promise‑based confirm | warn/danger; "no replacement" warnings | ✅ | — | wraps destructive actions |
| **Pagination** | Page nav | numbered; prev/next; server‑driven | ✅ | — | all lists |
| **FilterBar** | Persistent filter controls | collapsible advanced; chips for active filters; reset | ✅ | — | replaces hidden legacy filters |

## E. Domain / feature components

| Component | Purpose | Variants / states | RTL | Role | Notes |
|---|---|---|:--:|:--:|---|
| **WeeklyCalendar** | 7‑day × 24h schedule grid | all‑teachers / single / availability‑edit; Sat‑first locale; session blocks sized by duration; dual‑TZ display | ✅ | ✅ | custom grid component; data via events endpoint |
| **SessionActionPanel** | The class‑lifecycle action set | Attend / Absent / Cancel / Edit / Reschedule / Make‑up / Add‑to‑Credit / WhatsApp / Queue / Feedback; gated by status; **dual‑TZ** sub‑tabs | ✅ | ✅ | shared admin+teacher; family = simpler |
| **TimezoneField** | Student vs Teacher time | toggle + computed offset display | ✅ | — | appears in every reschedule/cancel |
| **CurrencyAmount** | Money w/ currency + base‑equivalent | native + AED equivalent; 16 currencies | ✅ | — | finance tables |
| **InvoiceBuilder** | Line‑item invoice editor | add/remove lines; discount/fees/adjustment/instalments | ✅ | ✅ | create‑parent‑invoice |
| **SalarySlip** | Salary breakdown / PDF preview | teacher; printable | ✅ | — | — |
| **CertificateDesigner** | Canvas w/ positioned merge fields | drag; font/size/color/align; mm coords; bg image | ✅ | — | complex; PDF output |
| **ChatPanel** | Contacts + conversation | groups; members; unread; real‑time | ✅ | ✅ | WS/polling |
| **LibraryGrid** | Content cards by category/type | Files/Video/Images/Audio/Links; search; views/downloads | ✅ | ✅ | read for T/F, manage for A |
| **IntegrationCard** | Connectable service tile | connected/disconnected; configure CTA | — | ✅ | 11 integrations |
| **LeadDetailPanel** | CRM lead view + notes | 25+ fields; notes thread; stage transitions | ✅ | — | — |
| **TimezoneConverter** | World‑clock + DST changes | grid + add location; changes table | ✅ | — | utility tool |

## F. Feedback / system states (must exist for every page)

| Component | Purpose | Notes |
|---|---|---|
| **LoadingSkeleton / Spinner** | Async loading | tables, tabs, modal content (legacy "Loading…") |
| **EmptyState** | No data | per entity, with CTA |
| **ErrorState** | Page/section error | 404, 500, export‑failed, gateway‑timeout — legacy has all four |
| **PermissionDeniedState** | Unauthorized | redirect or inline, per RBAC |
| **Offline/RetryState** | Network failure | retry CTA |

## Dedup reality check

| Legacy raw count | Distinct in rebuild | Why the gap |
|---|---|---|
| 5,606 buttons | ~12 button intents (primary/secondary/ghost/danger/icon/link…) | global chrome + per‑row repeats |
| 1,373 modals | ~30–40 distinct dialogs | same session‑action set on every session page |
| 1,962 filters | ~1 FilterBar + field components | repeated filter forms |
| 2,424 badges | ~1 StatusChip + a status‑color map | one chip, many statuses |
| 345 tables | ~1 DataTable + column configs | one component, many schemas |

→ Build **one** strong primitive per row above; configuration (columns, fields, statuses) is data, not new components. Full distinct modal list is in [06-interactions-and-states.md](06-interactions-and-states.md).
