# 11 — Interactions & States (v2)

> Confirms v1 ([../frontend-planning/06-interactions-and-states.md](../frontend-planning/06-interactions-and-states.md)) and grounds it in the verified catalog ([05](05-distinct-interaction-catalog.md)) + visual review ([03](03-screenshot-review.md)). Adds status‑gating rules and the new interaction patterns the exhaustive read surfaced.

## Verified interaction inventory
- **66 distinct modals** (deduped from 1,373) — 63 functional + 3 global chrome. Full table in [05 §B](05-distinct-interaction-catalog.md).
- **Interaction types exercised (safe):** dropdown/menu 551 · accordion 104 · navigation 59 · modal/dialog 47 · tab 8 · inline 5.
- **Button safety (all pages):** open_ui 2,715 · mutating 1,541 · navigation 956 · submit 393 · logout 1. The crawler **refused 3 unsafe controls** (real logout + 2× student suspend) — the rebuild mirrors this safety taxonomy.

## Status‑gated action sets (new emphasis)
The SessionActionPanel must show **only the actions valid for the current status** (verified from the session detail pages):
- **Pending / Waiting** → Attend, Cancel, Absent, Edit, Queue, Reminder.
- **Attended** → Reverse, Feedback, WhatsApp.
- **Cancelled / Absent** → Reverse, Make‑up/Reschedule view.
Likewise account actions: Inactive families show **Re‑activate**; Deleted scopes show restore context; scoped lists hide irrelevant sorts (sorting by status on a single‑scope list is meaningless).

## Distinct modal families (→ owning spec)
Session lifecycle (Attend/Absent/Cancel/Edit/Reschedule/Make‑up/Queue/WhatsApp/Feedback, + Direct Links/Timetable/Details views) → S005 · Scheduling (Schedule‑Cancel bulk, Add Lesson, Availability, Add Location) → S005 · People (Suspend/Stop/Schedule‑Stop/Activate, Update Suspension, Change Status, Add Notes/Notes List, Lead Detail, Feedback‑about‑teacher, Send Report, Request/Approve Certificate) → S003/S006/S009 · Finance (New Transaction, Invoice Adjustment, Generate Salary, Currency Rates, Salary slip) → S007 · Comms/content (Create Group/Add Member, Add Material/Category, Broadcast, Upload+voice) → S008/S004/S010. Global chrome (Add Shortcuts, Recent Searches, Notifications, logout, search) → S001.

## Dropdowns / tabs / filters / accordions
- **Row‑action menus** replace the 3–6 colored per‑row pills (seen in screenshots) — grouped safe vs **Danger Zone**, status‑gated, disabled when N/A.
- **Tabs** (detail pages up to 8) → ARIA tablist + **lazy panel loading** (legacy eager‑loads → 300–380 KB pages).
- **Filters** → persistent **FilterBar** with active‑filter chips + Reset (legacy hides them); filter/sort/page in the URL (collapses the 178 variant routes).
- **Sort** → **clickable column headers with asc/desc chevrons** (legacy used separate URL links).

## Safe vs dangerous (must‑confirm; never auto‑fire)
Catalogued in [05 §E](05-distinct-interaction-catalog.md). Dangerous classes: destructive (delete/force‑delete/suspend/stop/deactivate, **Public Holiday** bulk, Schedule‑Cancel bulk, logout), financial (generate salary, request/approve/execute payout, record payment, create/submit invoice, edit FX, expense, save gateway keys), communication (broadcast — with **Preview‑Recipients** count, send WhatsApp/notification, reset password), session writes, config writes (settings, permissions — **confirm diff‑vs‑replace**, CSV import, policy). Each gets a confirm dialog; destructive ones name the entity and use danger styling.

## Empty states (verified — design all)
Confirmed empty in test data: forms, certificate templates, certificate requests, tickets (KPIs 0), most finance ledgers, banks, heads, groups, several teacher/family lists, billing, today‑sessions, timetables. Each gets a purpose‑built EmptyState **inside** the container, distinguishing **"none yet"** vs **"no match for filter"**, with a primary CTA.

## Error states (verified — design proper versions)
| State | Legacy | Rebuild |
|---|---|---|
| 404 | `main/index.html` ×5 (nav bug) | real 404; fix nav to absolute paths; remove "Dashboard 1" |
| 500 | 7 pages (incl. 2 profiles + **4 newly‑found admin**) | friendly 500 + retry + **contextual back‑link to role home (not /login)** |
| 504 | message‑builder | timeout/retry |
| export‑failed | 2 endpoints | proper download UX + failure toast |
| broken asset | logo 404 everywhere | avatar/logo fallbacks |

## Loading states
Skeletons for tables/cards/tab‑content (legacy showed bare "Loading…"; class‑feedback fired ~344 XHRs); button spinners on submit; optimistic UI where safe; explicit retry on fetch failure; **autosave drafts** on long forms (24‑field report).

## Responsive & RTL
Admin dense (sticky‑col h‑scroll tables, tabs→scrollable, filters→drawer); teacher/family **mobile‑first** (card lists, bottom‑sheet modals, big tap targets, calendar→agenda). **RTL mirrors** drawers/dropdowns/chevrons/calendar/table alignment; numbers/times/currency/charts stay LTR. (RTL is a fresh requirement — never exercised in the English‑only crawl.)
