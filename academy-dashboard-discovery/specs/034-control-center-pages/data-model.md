# Data Model — Spec 034 (fixtures + per-page field specs)

All data is **authored display-only** in `fixtures/control-center.js` (no PII/pay/secret/computed values). Forms are **INERT** (`field()` controls, no persistence). **[OMIT]** = never rendered; **[GATE]** = inline `data-disabled-reason` (no control). Every write final = one `data-disabled-reason`/`data-confirm` gate. Options from authored fixtures / `optsFrom`.

## Fixtures (`fixtures/control-center.js`)
| Export | Shape (authored) | Notes |
|---|---|---|
| `MESSAGES` | conversations: `{ id, nameKey, roleKey, unread(int), lastTimeKey, bubbles:[{ mineBool, textKey, timeKey }] }` | authored threads; no delivery |
| `LEAD_KPIS` | `[{ icon, tone, labelKey, value }]` | authored literals (Converted/Pending/Completed-Trials…); **no arithmetic** |
| `LEADS` | `{ id, dateKey, parentNameKey, email, phone, statusId, sourceId, notes:[{dateKey,userKey,textKey}], students:[{nameKey,age}] }` | authored rows |
| `LEAD_STATUSES` | 9 ids: duplicated/pending/contacting/no_response/qualified/scheduled/trial_taken/trial_missed/teacher | filter + Change-Status options |
| `TASK_KPIS` | `[{labelKey,value}]` (Total/Completed/Pending/Inprogress/Overdue) | authored literals |
| `TASKS` | `{ id, titleKey, descKey, assigneeKey, statusId, priorityId, dueKey, sectionId }` | board cards |
| `STAFF_TASK_ROWS` | `{ nameKey, total, pending, overdue, completed, average }` | authored; "average" = literal |
| `ANNOUNCEMENTS` | `{ id, msgKey, audienceKey, channelId, statusId, expireKey }` | authored list |
| `TIMEZONES` | `[{ id:'Africa/Cairo', labelKey, region }]` | IANA ids for native `Intl`; curated subset |
| `TZ_CHANGES` | `{ zoneKey, nextChangeKey, currentOffsetKey, upcomingOffsetKey }` | authored DST board (display-only) |

## Page forms / drawers
| Drawer/form id | Fields (type) | OMIT | GATE | Source |
|---|---|---|---|---|
| `msg-compose` (inline) | message(textarea) | — | attachment | management-chat |
| `msg-group` | name·bio·staff(select)·teachers(select)·students(select) | — | image (upload) | chat create-group-form |
| `msg-member` | staff(select)·teachers(select)·students(select) | — | — | chat addMemberForm |
| `msg-<id>` (thread) | read-only bubbles (sheet) | — | — | chat thread |
| `lead-<id>` (detail) | notes-log(sheetRows) + Add-Notes + Change-Status | — | — | new-requests filter pages |
| `lead-note` (in detail) | note(textarea) | — | — | noteForm |
| `lead-status` (in detail) | status(select, 9) | — | — | change-status |
| `lead-new` | firstName·lastName·email·phone·friendsNumber·classesDuration·hearFrom·classesCount·gender(select)·age·parentAge·language·timezone(select)·trialDate·trialTime·couponCode·country(select)·courseName·note(textarea) | money/price | — | new-requests-create |
| `task-new`/`task-edit` | title·description(textarea)·assignee(select)·status(select)·priority(select)·dueDate·section(select) | — | — | tickets (authored, gap) |
| `task-section` | name | — | — | tickets "Add Section" |
| `ann-compose` (inline) | message(textarea)·channels(checkbox: advertisement/whatsapp)·private(checkbox)·expireAt(date)·teacherCategory(select)·studentCategory(select)·country(select)·hours(select)·language(select) | — | media (upload) | public-advertisement |
| `tz-converter` (inline) | sourceZone(select)·targetZone(select)·date·time → **live output** | — | — (NO gate) | time-convertor |

## Invariants (enforced by smoke)
- Every create/edit/compose surface renders **≥1 visible input/select/textarea** before its gate (Spec-032 rule); **0 field-less create/edit modal**.
- Every write final = exactly one `data-disabled-reason` (or `data-confirm`) gate; **no row/card/note/message/announcement added or mutated**; **no status/read-state flip**.
- **0** `input[type="password"]` · **0** `input[type="file"]` · **0** credential-named control · **0** money/price figure · **0** computed Total · **0** `<canvas>`/`.pdf`/`window.open`/`blob:` in any of the 5 bodies.
- **timeConverter**: the output updates on control change (native `Intl`); **0 external request**; **NO gate** on the conversion.
- All labels/placeholders/options mirrored AR/EN; 0 raw keys.
