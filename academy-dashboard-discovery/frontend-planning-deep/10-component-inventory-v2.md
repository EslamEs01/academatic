# 10 — Component Inventory (v2)

> Confirms v1 ([../frontend-planning/05-component-inventory.md](../frontend-planning/05-component-inventory.md)) with verified dedup numbers and adds components surfaced by the exhaustive read + visual review. Distinct library ≈ **34 components + ~8 domain components + system states**. Naming original/generic. Stack: HTML + Tailwind (no CDN) + native JS.

## Verified dedup (why the library is small despite huge raw counts)
| Raw (crawler) | Distinct | Source of inflation |
|---|---|---|
| 5,606 buttons | ~12 button intents | global chrome + per‑row repeats |
| 1,373 modals | **66** distinct titles (63 functional + 3 chrome) | session‑action set repeats on every session page |
| 1,962 filters | 1 FilterBar + field components | repeated filter forms |
| 2,424 badges | 1 StatusChip + status‑color map | one chip, many statuses |
| 345 tables | 1 DataTable + **104** column configs | one component, many schemas |
| 1,713 forms | 1 form system + **141** action configs | one system, many endpoints |
→ Build **one strong primitive** per row; columns/fields/statuses are **data**, not new components.

## A. App shell & nav (9)
AppShell · Sidebar (data‑driven, grouped, icon‑rail) · Topbar · Breadcrumbs · GlobalSearch (+recent) · ShortcutsWidget · LanguageSwitcher (10 locales) · ThemeSwitcher (light/dark/system + brand) · PageHeader. *(all RTL + role‑aware)*

## B. Data display (11)
KpiCard (plain / clickable‑as‑filter / multi‑value e.g. "Waiting & Running" / sparkline) · **DataTable** (server sort+filter+paginate; **clickable sort headers w/ asc/desc chevrons** — legacy used separate URL links; row‑action menu; bulk select; sticky first col + h‑scroll for 23‑col salary; column‑priority hide; skeleton; empty state) · RowActionMenu (grouped safe vs **Danger Zone**, status‑gated, disabled items) · StatusChip/Badge (status‑color map; icon+label, never color‑only) · Timeline/ActivityLog · DefinitionList/InfoCard (masked phone/email) · Chart (line/bar/pie/donut + **geo map**; dark+RTL) · Avatar (initial fallback) · EmptyState (illustrated + CTA; distinguish "none yet" vs "no match") · MetricGauge (hours used/remaining) · CurrencyAmount (native + base‑equivalent, tabular nums).

## C. Forms & inputs (16)
FormField (always labeled — fix legacy ~48% unlabeled) · Select · MultiSelect/TokenInput (async search) · DatePicker/DateRange/TimePicker (calendar, not raw text) · RadioGroup/CheckboxGroup (segmented) · ToggleSwitch · FileUpload/Dropzone (multi + thumbnail + **audio record** for family) · RichTextEditor (policies) · ColorPicker (+ pick‑from‑logo) · **ScheduleRepeater** (per‑day checkbox+time+duration) · **PermissionMatrix** (grouped, searchable, select‑all/clear‑per‑group, sticky Save, **confirm diff‑vs‑replace**) · **NotificationMatrix** (event×channel grid, ~47 cells) · RateTierRepeater (teacher pay/fines) · **Wizard/Stepper** (request‑trial, WhatsApp setup, request‑schedule; conditional steps) · **FormBuilder** (6 question types) · **KeyValueRowsEditor** *(new — replace the legacy `\n`‑delimited custom‑payment textarea)*. *Long forms (24‑field report, create‑family) get **autosave drafts** + section/step layout in drawers/full‑page.*

## D. Overlays & interaction (11)
Modal/Dialog (sm/md/lg; form; confirm; **destructive‑confirm naming the entity**; lazy content; **bottom‑sheet on mobile**) · Drawer/OffCanvas (large forms/filters) · Dropdown/Menu · Tabs (lazy panels) · Accordion · Tooltip/Popover (calendar session popover) · Toast/Snackbar · ConfirmService (promise‑based; "no replacement" warnings) · Pagination · FilterBar (persistent, active‑filter chips, Reset, advanced accordion) · CommandHint *(optional search shortcuts)*.

## E. Domain components (12)
WeeklyCalendar (all‑teachers / single / **availability drag‑bands with conflict warnings**; Sat‑first; dual‑TZ) · **SessionActionPanel** (Attend/Absent/Cancel/Edit/Reschedule/Make‑up/Add‑to‑Credit/WhatsApp/Queue/Feedback; **status‑gated**; dual‑TZ tabs) · TimezoneField · InvoiceBuilder (line items + discount/fees/adjustment/instalments) · SalarySlip (PDF) · **CertificateDesigner** (canvas preview + properties panel: font/style/size/color/align/X‑Y‑W‑mm + merge fields) · ChatPanel (real‑time; groups/members/unread) · LibraryGrid (chip category filters + skeleton + empty) · IntegrationCard (connected/disconnected) · LeadDetailPanel (25+ fields + notes thread + stage transitions) · **BroadcastComposer** (targeting + quota + **Preview‑Recipients confirm** showing resolved audience count) · TimezoneConverter (world‑clock + DST changes).

## F. System states (5 — every page)
LoadingSkeleton/Spinner · EmptyState · ErrorState (404/500/403/504/export‑failed — all seen in legacy; **contextual back‑links to the role home, not /login**) · PermissionDeniedState · Offline/RetryState.

## New components vs v1 (added by exhaustive read)
- **KeyValueRowsEditor** (custom payment instructions) · **BroadcastComposer** with recipient preview · clickable **sort headers** on DataTable · **status‑gated** SessionActionPanel · availability **conflict‑warning** calendar · **autosave‑draft** behavior on long forms · error states with **contextual back‑links**.

> All components must pass light+dark, LTR+RTL, keyboard/AX, and responsive. Build base primitives in Spec 001; domain components ship with their owning specs.
