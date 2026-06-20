<!-- deep-v2-banner -->
> **⬆ Updated by the exhaustive pass.** This v1 doc used representative/anchor reads. It is confirmed and **expanded by the verified deep version** in `../frontend-planning-deep/`: **11-interactions-states-v2.md & 05-distinct-interaction-catalog.md (66 distinct modals)**.
> Key correction from the full read: **13 broken pages** were found (not ~5) — incl. 4 admin 500s (`families-feedback-family-1`, 2× `new-requests-scheduled-trials-index`, `teachers-1-monthly-classes`). Verified counts: 339 pages = 178 route templates; 66 distinct modals; 141 form‑actions; 104 table shapes; 195 GET + 109 mutation endpoints. Useful content below retained.

# 06 — Interactions & States

> Catalog of the interactions and UI states the rebuild must reproduce (improved): modals, dropdowns, tabs, filters, the safe vs **dangerous/mutating** divide, and the empty/error/loading/responsive states. Mutating actions are flagged because the crawler **never triggered them** and the rebuild must always guard them.

## 1. Distinct modals / dialogs (~35 — deduped from 1,373 instances)

### Session / class lifecycle (shared admin + teacher; family has a subset)
| Modal | Opens from | Key fields | Danger |
|---|---|---|---|
| **Mark as Attend** | session/course/home rows | attend mode (with/without details), remark (Excellent…Needs Improvement), summary, homework, notes, images[] | mutating |
| **Mark as Absent** | same | who‑absent (student/teacher), note, send‑message (none/default/custom), makeup (no/auto/reschedule), add‑to‑credit, **TZ (student/teacher)**, date/time, video (teacher variant) | mutating |
| **Cancel Class** | same | cancel‑by (teacher/student/admin), note, send‑notif, makeup tabs, add‑to‑credit, TZ, date/time | mutating |
| **Edit Class** | same | new date/time, duration, teacher, accounting statement, send‑notif | mutating |
| **Request Cancel** (teacher/family) | teacher home / today‑sessions | type (reschedule / auto‑makeup / no‑reschedule‑with‑warning), date/time | mutating |
| **Add Quick Queue** | session rows | level (urgent/medium/normal), text | mutating |
| **Send WhatsApp Message** | session rows | message, send to teacher / student | mutating |
| **Add Feedback** (class) | session rows | note, files | mutating |
| **End Class** (teacher) | teacher home | remark, summary, homework, notes, images[] | mutating |
| **Direct Links** | session detail | per‑role room links (read) | safe |
| **Student/Class Details** | history rows | remark/summary/homework/note/files (read) | safe |
| **Student Timetable** | student/course rows | weekly schedule (read) | safe |

### Scheduling
| Modal | Key fields | Danger |
|---|---|---|
| **Schedule Cancel Classes** (bulk) | scheduled date, cancel type, reschedule date/time, add‑to‑credit, note | mutating |
| **Add Lesson / Add Classes** | date/time, duration, credit, teacher, accounting statement | mutating |
| **Availability editor** (teacher) | from/to day, from/to time; add/update/delete | mutating |
| **Add Location** (time converter) | region tabs → city/IANA TZ | safe (client state) |

### People management
| Modal | Key fields | Danger |
|---|---|---|
| **Suspend / Stop / Schedule‑Stop / Activate** (student & family) | returned date, schedule‑auto‑return, note | mutating |
| **Update Suspension** | returned_at, note | mutating |
| **Change (lead) Status** | status select | mutating |
| **Add Notes / Notes List** (lead) | note textarea / list | mutating / safe |
| **Lead Detail** | 25+ read fields (geo/device) | safe |
| **Feedback about your teacher** (family) | rating, interactivity, see/hear, like, complain, comment | mutating |
| **Add Meeting Date / Add Report / Add Notes** (family feedback) | date, manager / curriculum+expected+level+achievements | mutating |
| **Send Report** (teacher monthly progress) | month + 7‑field rubric + 2 textareas | mutating |
| **Request Certificate** (teacher) | description, date | mutating |
| **Approve Certificate** (admin) | template select, preview, WhatsApp delivery | mutating |

### Finance
| Modal | Key fields | Danger |
|---|---|---|
| **New Transaction / Record Payment** | transaction id, date, basic/additional/taxes/total, currency, gateway | mutating |
| **Invoice Adjustment** | type (discount/percentage/add), amount, count, note | mutating |
| **Generate Salary** (teacher/staff) | month, date range, select‑all + member checkboxes | mutating |
| **Salary slip** | breakdown + PDF (read) | safe |
| **Currency Rates** | rate per 16 currencies | mutating |

### Settings / content / chat
| Modal | Key fields | Danger |
|---|---|---|
| **Create Group / Add Member** (chat) | name, bio, image, staff[]/teachers[]/students[] | mutating |
| **Group Settings** | leave / about / members | mutating (leave) |
| **Add Material / Category** (library) | name, type, category, file, thumbnail | mutating |
| **Color picker** (forms) | color | mutating |
| **Upload File** (family) | files[], audio (voice record) | mutating |

### Global chrome (every page — build once)
| Modal | Notes |
|---|---|
| **Add Shortcuts** | title + link; personal pinned nav |
| **Recent Searches** | search history (read) |
| **Notifications panel** | bell dropdown; mark‑read |

## 2. Dropdowns / menus
- **Row action menus** on every list (replace legacy's 4–9 inline buttons per row). Must group safe vs destructive and disable inactive actions per status/permission.
- **Profile menu, language menu, notification bell, theme menu** in the topbar.
- **Searchable selects & multiselects** (legacy select2) across forms — treat as a dropdown pattern with async search.
- Result type tallies (crawler): dropdown/menu 551, accordion 104, tab change 8, modal 47, navigation 59.

## 3. Tabs (in‑page view switching)
- **Detail pages:** Student (Courses/Trials/Siblings/Monthly Plan), Family (8 tabs), Teacher (7 tabs), Course (current/history/timeline).
- **List type/scope strips:** Courses type radio (7), Students/Families/Teachers status segments, Invoices status, Transactions (session/invoice/salary), Analysis (invoices/P&L; student/course).
- **Settings:** General (4 tabs), Email config (3 tabs).
- **Rebuild:** ARIA `role=tablist`, keyboard nav, **lazy‑load** tab content (legacy loaded all at once on heavy pages).

## 4. Filters
- Nearly every list has a filter form (often **hidden/collapsed** in legacy — a UX miss). Rebuild: a **persistent FilterBar** with active‑filter chips, a "more filters" accordion for advanced sets, and a Reset.
- Notable filter sets: family **advanced finance filter** (rate/children/cost‑type/course‑type/payment‑method/currency ×16), invoice (status/date‑type Due‑vs‑Payment/currency/gateway), teacher (scope/category/material + sortable columns), sessions/home (date/time/teacher/family/student/type), new‑requests (stage + date), library (media type).
- **Filters drive URL state** (legacy used GET params, preserving sort/page in hidden fields). Rebuild: keep filter/sort/page in the URL query so views are shareable/bookmarkable — and so the ~230 variant URLs collapse into one stateful page.

## 5. Safe vs dangerous actions (critical for any future automated testing)

**Safe (navigation / view / filter / open‑UI):** browse lists, open detail, expand accordion, switch tab, open a read‑only modal, run a GET filter/search/sort/paginate, view a slip/preview, copy a link, view timeline.

**Dangerous / mutating (must have explicit confirm; never auto‑fire; the crawler refused these):**
- **Destructive:** delete (student/family/teacher/course/invoice/material/category/staff/queue), force‑delete, suspend/stop/deactivate a student or family, set teacher on vacation, **Public Holiday bulk‑schedule** (mass effect), Schedule Cancel Classes (bulk), logout.
- **Financial:** generate salary, request/approve/execute payout, record payment, create/submit invoice, edit currency rates, add/edit/delete expense, save gateway credentials.
- **Communication:** send broadcast (dashboard+WhatsApp, quota'd), send WhatsApp/notification, send reset password, mark notifications read.
- **Session writes:** attend/absent/cancel/edit/reschedule/makeup/add‑to‑credit, end class, request cancel, add queue, add feedback, upload files.
- **Config writes:** save any settings tab, save permissions, save integration keys, import CSV, save policy.

The crawler classified buttons by keyword (`add/save/submit/send/delete/cancel/suspend/update`) and **skipped** unsafe ones — the rebuild should mirror this safety taxonomy in tests and in destructive‑action confirm dialogs.

## 6. Empty states (observed, must be designed)
Many pages were captured empty: forms list, certificate templates, certificate requests, tickets (KPIs all 0), most finance ledgers, banks, heads, groups, several teacher/family lists, family billing, today's sessions, timetables. Each needs a purpose‑built EmptyState (icon + one‑line + primary CTA), **inside** the table/list container (not a separate page).

## 7. Error pages / states (observed in legacy — design proper versions)
| State | Legacy occurrence | Rebuild |
|---|---|---|
| **404 Not Found** | `/main/index.html` (sidebar bug) | real 404 page; fix nav to absolute paths |
| **500 Server Error** | `/teacher/profile`, `/student/profile`, `/management/export-course` | friendly 500 with retry/back; build working profile views |
| **504 Gateway Timeout** | `/settings/customisation/message-builder` | timeout/retry state |
| **Export failed** | `/invoicesexportdata`, `export-class/1` | proper download UX + failure toast |
| **Broken asset** | logo 404 on every page | avatar/logo fallbacks everywhere |

## 8. Loading states
Legacy showed bare "Loading…" text and AJAX‑rendered tables (e.g. class‑feedback drilldown had 344 XHRs; search‑schedule & chat load async). Rebuild: **skeletons** for tables/cards/tab‑content, button spinners on submit, optimistic UI where safe, and explicit error/retry on failed fetch.

## 9. Responsive behavior needed
- **Admin** is data‑dense (wide tables up to 23 columns, 8‑tab details). Needs: collapsing sidebar (icon‑rail), horizontal‑scroll tables with **sticky first column**, column priority/hide on small screens, filters → drawer on mobile, tabs → scrollable/segmented.
- **Teacher & family** are lighter and should be **mobile‑first** (teachers run classes on phones; parents check on phones): card‑ified lists instead of wide tables, bottom‑sheet modals on mobile, large tap targets, the weekly calendar reflows to a day‑list on narrow screens.
- **Calendar**: 7‑col grid on desktop → single‑day or agenda list on mobile.
- **Modals**: become bottom sheets / full‑screen on mobile; large forms (24‑field report) become full‑page routes or drawers.
- **RTL**: every interaction (drawers, dropdowns, calendar direction, table alignment, chevrons) must mirror for Arabic. (Legacy never exercised RTL — this is a new requirement; see [09](09-design-system-direction.md) and [12](12-open-decisions.md).)
