# 12 — Data & API Surface (v2, planning)

> Planning‑level entity model + API recommendations. The **exhaustive, machine‑extracted** route/endpoint/field/table lists live in [06-complete-data-surface.md](06-complete-data-surface.md) (195 GET routes, 109 mutation endpoints, 104 table shapes, all from the 339 JSONs). This doc turns that into an entity model and the data‑layer plan for the rebuild. **Inferred** unless marked observed; field names are legacy hints, not a contract.

## Entity model (inferred from forms/tables/modals across all pages)
```
Family (account/biller) 1───* Student 1───* Course(Enrollment) 1───* Session ──* AttendanceRecord
  identity/auth · location/TZ · billing(course_type,hour_rate,fees,currency,cost_type)            │
  ├─ preferences · capabilities · NotificationPrefs(7 types × WhatsApp/Email)                      ├─ Queue · Feedback · Timeline · Files
  ├─* Invoice 1─* InvoiceLine · *─Transaction · *─InvoiceAdjustment · *─Credit                     └─ makeup{auto|reschedule|no|add_to_credit} · TZ{student|teacher}
  ├─* FeedbackMeeting/Report · m:n FamilyCategory
Student: name,name_ar,language(10),gender,birth_date,notes ; statuses(7) ; *─Trial,MonthlyProgressReport,Certificate
Course: material_id,teacher_id,schedule[day,time,duration],family_rate,teacher_rate,cancel_limits ; types(4) ; statuses(8)
Session: date,time,duration,teacher_id,accounting_statement,status(11),remark,summary,homework,images
Teacher: identity,location/TZ,salary{type,fixed,hour_rate,fine},Zoom(8 fields),payout(paymob/payoneer),level[],age[],capabilities ; *─Compensation,Salary,Availability ; m:n TeacherCategory
Staff: name,email,role(4),salary,currency,2fa ; 1─PermissionSet(~170) · CategoryScope · ActivityLog
Lead: ~18 fields + geo/device + notes ; 9 stages → converts to Family/Student+Trial
Finance: Invoice·Transaction·InvoiceAdjustment·Credit·Expense·ExpenseHead·Salary·Payout·PayoutProvider·Bank·CurrencyRate(16,AED base)
Content: Material(name,name_ar) · LibraryItem(type,category,file,thumbnail,views,downloads) · LibraryCategory
Comms: ChatGroup·Message · Broadcast · NotificationSetting(~47: event×role×channel) · CertificateTemplate·CertificateRequest
Config: Setting(general/integration/notification/customisation/security) · ScheduledAction · Form/FormField/FormResponse
```
Full field lists per entity are in [v1 07-data-and-api-surface.md](../frontend-planning/07-data-and-api-surface.md) §1 and corroborated by [06](06-complete-data-surface.md) §B.

## Observed surface (verified)
- **195 distinct GET routes** (network log) grouped by domain in [06 §A](06-complete-data-surface.md). Confirms the route map of the whole app.
- **109 distinct mutation endpoints** (form actions, POST/PUT/DELETE) in [06 §B] — these are exactly where the new frontend will write (e.g. `POST /management/accountant/store-transaction`, `POST /management/courseClasses/edit-class`, `POST /management/scheduled-actions`, `POST /management/families/{id}`, `POST /teacher/classes-end`, `POST /student/feedback`).
- **104 distinct table column‑sets** ([06 §C]) = the read models for lists/details.
- **Reference enums** ([06 §D]) observed in option lists.

## Data‑layer plan for the rebuild (native JS, no SPA)
Since the legacy is server‑rendered HTML with **no clean JSON API observed**, the new frontend needs a defined data layer. Recommendation (confirm with backend — [17](17-open-decisions-v2.md) C1):
1. **A REST (or GraphQL) JSON API** behind the same routes, returning `{data,meta:{page,total,facets}}` for lists and nested records for details.
2. **A thin fetch/client module** (native JS) per resource: `list(params)`, `get(id)`, `create/update/remove`, with URL‑synced filter/sort/page params (collapses the ~178 legacy route variants into stateful pages).
3. **Auth + permission set** fetched at login (role + ~170 flags + category scope) → drives `can()` gating.
4. **Lookups** cached client‑side: countries(254), cities, currencies(16), timezones(IANA), durations, materials, teachers, students, categories.
5. **Real‑time channel** (WS/SSE) for chat, live session status, notifications (legacy used Livewire/`broadcasting/auth` — observed; confirm mechanism).
6. **File flows:** multipart upload (avatars, library, CSV import, family files+voice), streamed download/export (2 legacy exports failed — design proper endpoints), PDF generation (salary slips, certificates).

## Improvements over legacy data UX
- **Server‑driven everything reflected in the URL** (shareable/bookmarkable filtered views).
- **Optimistic UI + skeletons** instead of full‑page reloads / "Loading…" text (legacy class‑feedback page fired ~344 XHRs).
- **One status vocabulary** ([05 §D]) → consistent badges/filters across modules.
- **Multi‑currency** with explicit base‑equivalent + point‑in‑time FX (confirm timing).
- **Typed validation** mirroring server rules; accessible error messaging.

## Still required from backend / owner (see [17](17-open-decisions-v2.md))
API contract & auth · real‑time mechanism · file/export/PDF flows · payment‑gateway flows · permission semantics · FX timing · certificate `json_data` format · CSV import shapes. **No endpoints invented here** — [06](06-complete-data-surface.md) lists only what was observed.
