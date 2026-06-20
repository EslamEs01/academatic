# 05 — Distinct Interaction Catalog

> Deduplicated from **all 339 page JSONs** (`_build/aggregates.json`). The crawler instance‑counted 1,373 modals / 551 dropdown opens etc.; collapsed here to the **distinct** set. Each modal: title, roles, kind/source, dominant fields, buttons, danger flag, and how many pages embed it. Global chrome (Add shortcuts / Recent Searches / logout / search) is listed once and excluded from per‑module counts.

**Distinct counts:** 66 modals · 141 form‑actions · 104 table shapes · 195 app endpoints.

**Interaction types exercised (safe, read‑only):** dropdown_or_menu=551, modal_or_dialog=47, accordion_expand=104, navigation=59, no_visible_change=11, inline_state_change=5, tab_change=8.

**Button safety classes (all pages):** mutating=1541, navigation=956, open_ui=2715, submit=393, logout=1.

## A. Global chrome (build once, exclude from module counts)

| Modal/Control | Instances | Note |
|---|--:|---|
| (untitled) | 343 | repeated on nearly every page |
| Add shortcuts | 315 | repeated on nearly every page |
| Recent Searches | 294 | repeated on nearly every page |
| Global search / Notifications / Logout | per page | top‑bar chrome |

## B. Distinct functional modals/dialogs (deduped)

| Modal | Roles | Kind/Source | Pages | Danger | Key fields | Buttons |
|---|---|---|--:|:--:|---|---|
| **New Transaction** | admin | modal·static | 28 | ⚠ | transaction_id, date_payment, basic, additional, taxes, total, currancy, getway | Close, Submit, Cancel |
| **Edit Class** | admin/teacher | modal·static | 21 | ⚠ | date, time, sendMessage, duration, Hour, Minute, teacher_id, accounting_statement | Close, Save changes, Send Notification |
| **Student Timetable** | admin/teacher | modal·static/static+opened | 23 | view | — | Close |
| **Add Feedback** | admin | modal·static/static+opened | 21 | ⚠ | feedback_note, feedback_files[], name, description, status | Close, Save changes, Save |
| **Add Quick Queue** | admin | modal·static | 20 | ⚠ | level, text | Close, Save changes |
| **Mark as attend** | admin | modal·static | 20 | ⚠ | markAsAttend, remark, summary, homework, notes, images[] | Close, Mark as attend (no class detai, Mark as attend (with class det, Save changes |
| **Send Whatsapp Message** | admin | modal·static | 20 | ⚠ | wa_message, send_teacher, send_student | Close, Teacher, Student(s), Save changes |
| **Mark As Absent** | admin | modal·static | 20 | ⚠ | sendMessage, cancelTzType, absent_by, note, message, add_to_credit, date, time | Close, Don't send, Send Default Message, Send Custom Message, No Make-up |
| **Cancel Class** | admin | modal·static | 20 | ⚠ | cancelTzType, cancel_by, note, sendMessage, add_to_credit, date, time, Hour | Close, Send Notification, No Make-up, Auto Make-up class, Reschedule class to another ti |
| **Add Lesson Student Timezone** | admin | modal·static | 17 | ⚠ | date, time, duration, teacher, accounting_statement, credit, Hour, Minute | Close, Submit |
| **All Invoice For This Parent** | admin | modal·static | 17 | ⚠ | invoice | Close, Submit |
| **Change Course Status** | admin | modal·static | 17 | ⚠ | status | Close, Submit |
| **Schedule Cancel Classes** | admin | modal·static | 6 | ⚠ | criteria[cancel_type], scheduled_date, criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note | Close, Submit |
| **Settings** | admin | modal·static/static+opened | 11 | ⚠ | timeType, groupByTime | Close, Save changes |
| **Add Notes** | admin | modal·static | 10 | ⚠ | note, feedback | Save, Cancel, Close |
| **Update Suspension** | admin | modal·static | 9 | ⚠ | returned_at, note | Close, Submit |
| **Details** | admin/teacher | modal·static | 7 | view | — | Close |
| **New Requests** | admin | modal·static | 9 | ⚠ | — | Close |
| **Notes List** | admin | modal·static | 9 | view | — | Close |
| **Change Status** | admin | modal·static | 9 | ⚠ | status | Cancel, update status |
| **Currency Rates** | admin | modal·static/static+opened | 7 | ⚠ | — | Close, Save |
| **Direct Links for Sessions** | admin | modal·static+opened | 6 | view | — | Close |
| **Total Queues** | admin | modal·static+opened | 6 | view | — | Close |
| **Send Report** | admin/teacher | modal·static/static+opened | 5 | ⚠ | learning_progress, focus, homework_completion, punctuality, rescheduled_sessions, month, achievements, additional_support | Submit |
| **Request Cancel** | family/teacher | modal·static | 5 | ⚠ | type, date, time, Hour, Minute, Month, Year | Close, Send |
| **Student Details** | family/teacher | modal·static | 4 | view | — | Close |
| **End class** | teacher | modal·static+opened | 4 | ⚠ | remark, summary, homework, notes, images[] | Close, Submit |
| **Mark class as absent** | teacher | modal·static | 4 | ⚠ | video, notes | Close, Submit |
| **Approve** | admin | modal·static | 3 | ⚠ | YYYY-MM-DD, Write notes: date,notes and etc | Close, Preview, Cancel, Approve |
| **Edit** | admin | modal·static | 3 | ⚠ | date, name, status | Close, Save, Save changes |
| **Chats** | admin/teacher | offcanvas·static | 2 | view | Search Contact | Close |
| **Suspended Family** | admin | modal·static+opened | 2 | ⚠ | date, schedule_return, note | Close, Submit |
| **Schedule Stop Family** | admin | modal·static+opened | 2 | ⚠ | scheduled_date, returned_at, schedule_auto_return, note | Close, Submit |
| **Stop Family** | admin | modal·static+opened | 2 | ⚠ | note | Close, Submit |
| **Activate** | admin | modal·static | 2 | view | — | Close, Activate |
| **Teacher Report** | admin | modal·static | 2 | view | — | Close |
| **Teachers You Sent** | admin | modal·static | 2 | view | — | Close |
| **Accepted Teachers** | admin | modal·static | 2 | view | — | Close |
| **Certificate Details** | admin | modal·static | 2 | view | — | Close |
| **Schedule Stop Student** | admin | modal·static | 2 | ⚠ | scheduled_date, returned_at, schedule_auto_return, note | Close, Submit |
| **Stop Student** | admin | modal·static | 2 | ⚠ | note | Close, Submit |
| **Suspend Student** | admin | modal·static | 2 | ⚠ | date, schedule_return, note | Close, Submit |
| **Certificate Information** | admin | modal·static | 2 | ⚠ | student_name, teacher_name, description, date_certificate, pdfcertificat_id | Close, Submit |
| **Create Group** | admin | modal·static+opened | 1 | ⚠ | name, bio, image, staff[], teachers[], students[] | Close, Submit |
| **Add Member** | admin | modal·static | 1 | ⚠ | staffMember[], teachersMember[], studentsMembers[] | Close, Submit |
| **Course History** | admin | modal·static | 1 | view | — | Close |
| **Expense Details** | admin | modal·static+opened | 1 | ⚠ | head_id, user_id, is_income, description, reason, amount, currency, date | Close, Save changes |
| **Expense Edit** | admin | modal·static | 1 | ⚠ | name, writer_id, is_income, description, reason, amount, currency, date | Close, Save changes |
| **Add Report —** | admin | modal·static | 1 | ⚠ | curriculum, expected, level, achievements | Close, Save |
| **schema color** | admin | modal·static | 1 | ⚠ | — | Close, Save |
| **Add Head** | admin | modal·static+opened | 1 | ⚠ | name, status | Close, Save changes |
| **Category Details** | admin | modal·static+opened | 1 | ⚠ | name | Close, Edit, Save changes |
| **Add Material** | admin | modal·static+opened | 1 | ⚠ | name, type, category_id, file, thumbnail | Close, Save changes |
| **Teacher Salary** | admin | modal·static | 1 | view | — | Close |
| **Salary** | admin | modal·static | 1 | view | — | Close, Download |
| **Salary Month** | admin | modal·static+opened | 1 | ⚠ | month, date_range, generateteacher, allteachers, teachers[] | Close, Submit |
| **Country List** | admin | modal·static | 1 | view | — | Close, Copy |
| **Generate salaries** | admin | modal·static+opened | 1 | ⚠ | staff_members[], month, date_range, generatestaff, allstaff | Close, Submit |
| **Deactive Categories** | admin | modal·static+opened | 1 | view | — | Close |
| **Add Location** | admin | modal·static | 1 | ⚠ | Search cities or timezones... | Close, All Regions, Americas, Europe, Asia |
| **Request Certificate** | teacher | modal·static+opened | 1 | ⚠ | description, date_certificate | Close, Submit |
| **Feedback about your teacher** | family | modal·static | 1 | ⚠ | see_hear, like_teacher, complain, additional_comment | Submit |
| **Upload File:** | family | modal·static | 1 | view | files[] | Close, Start, Upload |

## C. Dropdowns / tabs / filters / accordions

- **Dropdowns/menus:** 551 opens exercised; primarily per‑row action menus + top‑bar menus (profile/lang/notifications) + searchable select2 controls.
- **Tabs (distinct labels, top):** Auto Make-up class (80), No Make-up (40), Reschedule class to another time (40), Add to Credit Auto Make-up class Using S (40), Add to Credit (40), Using Student Timezone Using Teacher Tim (40), Sessions invoices Salary (6), Family Members Add New Child Student Sta (4), Add Email Account # Email Address Defaul (4), Settings (3), General Student Statistics Course Statis (2), Profit and Losses invoices (2), Children (2), Billing (2), Credits (2), Profile Activity (2), Student Feedback (2), Billings & Invoices Create Invoice Payme (2), Invoice Adjustments Add New Adjustment # (2), Credits 00:00 (0) session Student Teache (2), Update Location Student Country* Choose  (2), Student Feedback Show More # Meeting Dat (2), General Company Name Arabic Company Name (2), Accounts Add Account Mail Settings (2).
- **Filters (distinct field names, top):** `Month` (278), `material_id` (63), `category_id` (56), `duration` (54), `teacher_id` (51), `status` (49), `accounting_statement` (45), `currency` (38), `currancy` (28), `getway` (28), `date_type` (26), `gateway` (26), `date_payment` (26), `remark` (24), `student_id` (22), `level` (21), `absent_by` (20), `cancel_by` (20), `teacher` (20), `type` (20), `invoice` (18), `Search` (18), `credit` (17), `family_id` (16), `name` (15), `has_invoice` (14), `gender` (11), `month` (11), `timeType` (11), `user_id` (10).
- **Accordions:** 104 expands exercised (filter panels, detail sections).

## D. Status vocabulary (badges, deduped — drives the status‑color map)

| Badge/Status | Count |
|---|--:|
| 5 new | 326 |
| 0 New | 305 |
| 1 New | 294 |
| Pre | 294 |
| 1 | 294 |
| Active | 51 |
| Teacher Timezone | 22 |
| New | 21 |
| Using Student Timezone | 20 |
| Using Teacher Timezone | 20 |
| Student Timezone | 19 |
| Active & unpaid | 18 |
| Waiting | 18 |
| Inactive | 17 |
| According to the teacher | 17 |
| Stopped | 14 |
| Suspended | 14 |
| Indebted | 14 |
| Completed | 14 |
| Free | 14 |
| Teacher | 13 |
| 0 | 13 |
| 2026-06-20 | 11 |
| Pending | 10 |
| 2 | 10 |
| (3.00 Fine) | 10 |
| Trial | 9 |
| Admin Cancel | 9 |
| Student | 9 |
| 4 | 9 |
| 16 | 9 |
| Update Suspension | 9 |
| AED | 7 |
| AUD | 7 |
| CAD | 7 |
| EGP | 7 |
| EUR | 7 |
| GBP | 7 |
| KWD | 7 |
| MAD | 7 |
| PKR | 7 |
| QAR | 7 |
| RUB | 7 |
| RWF | 7 |
| SAR | 7 |
| TRY | 7 |
| USD | 7 |
| YER | 7 |
| Paid | 7 |
| Sessions | 6 |
| Change Status | 6 |
| Schedule Cancel Classes | 6 |
| Monthly | 6 |
| Show Course | 5 |
| 60 min | 5 |
| Not added | 5 |
| 0.00% | 4 |
| T Difference (Localtime): +08:00 | 4 |
| messages.3 | 4 |
| June 2026 | 4 |

## E. Dangerous / mutating actions (must be confirmed; never auto‑fired)

Top button texts the crawler classified UNSAFE and refused to trigger:

| Action label | Occurrences |
|---|--:|
| Save | 345 |
| See All Notifications | 326 |
| Add shortcuts | 315 |
| Submit | 212 |
| Save changes | 178 |
| Cancel | 57 |
| Add Teacher | 55 |
| Add to Credit | 40 |
| Send Notification | 40 |
| Mark as attend (no class details will se | 20 |
| Don't send | 20 |
| Send Default Message | 20 |
| Send Custom Message | 20 |
| Create | 18 |
| Update | 16 |
| Delete | 14 |
| Delete Fine | 13 |
| Remove | 13 |
| Edit | 13 |
| Add | 12 |
| Payment Methods 1 | 9 |
| update status | 9 |
| Send | 7 |
| Add Payment | 7 |
| Add Schedule | 6 |
| Show Details | 6 |
| × | 5 |
| Add Course | 5 |
| Upload | 5 |
| remove tag | 4 |
| Add Meeting Date | 4 |
| Save Family Feedback | 4 |
| Edit course | 3 |
| Approve | 3 |
| Send Reset Password | 3 |
| Create category | 2 |
| Confirm | 2 |
| Suspend | 2 |
| Add New Child | 2 |
| Create Invoice | 2 |
| Add New Adjustment | 2 |
| Activate | 2 |
| Add Item | 2 |
| Submit Invoice | 2 |
| Download Report | 2 |
| Add /Edit Family Feedback | 2 |
| Edit Feedback | 2 |
| Approve selected (0) | 2 |
| Send Request | 2 |
| Add Account | 2 |

