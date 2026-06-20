# 02 — All Pages Expanded Inventory (every page)

> Machine-rendered from **all 339 page JSONs** (`02-all-pages-expanded-inventory.json`). One block per page, grouped role → module. Structured facts are authoritative (extracted, not sampled). Interpretive notes (purpose, UX) are layered by the MD-reading workflow into the v2 docs. Global chrome modals (Add shortcuts / Recent Searches / untitled) are omitted per page for signal.


# ===== ROLE: admin (300 pages) =====


## admin · Assignments / Homework (1 pages)

### `management-tickets` — Tasks
- route: `/management/tickets`  ·  modules: Assignments / Homework
- sections/headings: Tasks, 0, Total:, 0, Completed, 0, Pending, 0, Inprogres, 0, Overdue, Staff Members, Name, Total:
- cards/KPIs: Tasks, 0, 0, 0, 0, 0, Staff Members
- table (0 rows): Name, Total:, Pending, Overdue, Completed, Average
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/public-advertisement, GET /management/public-holiday
- screenshot: `output/roles/admin/screenshots/management-tickets-full.png`


## admin · Certificates (3 pages)

### `management-certificate-requests` — Certificate Requests
- route: `/management/certificate-requests`  ·  modules: Certificates
- sections/headings: Certificate Requests
- cards/KPIs: Certificate Requests
- table (1 rows): #, Student Name, Course Name, Teacher Name, Description, Date, Action
- modal: **Approve** [modal/static] fields: YYYY-MM-DD, Write notes: date,notes and etc
- buttons: 13 (mutating 4, submit 1, nav 3, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-certificate-requests-full.png`

### `management-pdf` — Pdf
- route: `/management/pdf`  ·  modules: Certificates
- sections/headings: Certificate Templates
- cards/KPIs: Certificate Templates
- table (1 rows): #, Certificate Name, Background, Certificates, Action
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/chat, GET /management/class-feedback
- screenshot: `output/roles/admin/screenshots/management-pdf-full.png`

### `management-pdf-create` — Pdf Create
- route: `/management/pdf/create`  ·  modules: Certificates
- sections/headings: Certificate Designer, Student Name
- cards/KPIs: Certificate Designer, Student Name
- form `post /management/pdf` fields: json_data, name, background, textAlign, textAlign, textAlign, textAlign
- buttons: 10 (mutating 3, submit 1, nav 3, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-pdf-create-full.png`


## admin · Classes / Live Sessions (8 pages)

### `management-class-feedback` — Class Feedback
- route: `/management/class-feedback`  ·  modules: Classes / Live Sessions
- sections/headings: List of Teachers, 1, المعلم محمد صادق صادق, 0, 0
- cards/KPIs: Teachers, List of Teachers
- table (1 rows): #, Teacher Name, Percentage, session count
- form `get /management/class-feedback` fields: teachers[], date_range, user_id
- filters: user_id
- buttons: 12 (mutating 2, submit 1, nav 3, open_ui 6)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/family/feedback-categories
- screenshot: `output/roles/admin/screenshots/management-class-feedback-full.png`

### `management-class-feedback-feedback` — Class Feedback Feedback
- route: `/management/class-feedback/feedback`  ·  modules: Classes / Live Sessions
- cards/KPIs: Teachers
- form `get /management/class-feedback/feedback` fields: teacher_id, student_id, user_id, date_range
- filters: teacher_id, student_id, user_id
- buttons: 10 (mutating 2, submit 1, nav 3, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-class-feedback-feedback-full.png`

### `management-group-index` — Groups
- route: `/management/group/index`  ·  modules: Classes / Live Sessions, Dashboard / Home
- table (0 rows): #, Start Date, Group Name, Teacher Name, Teacher rate, Student rate, Schedule, Status, Options
- modal: **Details** [modal/static]
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/group/index, GET /management/home
- screenshot: `output/roles/admin/screenshots/management-group-index-full.png`

### `management-groups-create` — Groups Create
- route: `/management/groups/create`  ·  modules: Classes / Live Sessions
- sections/headings: Create Group Create group sessions betwe
- cards/KPIs: Create Group Create group sessions between one teacher and many students
- form `post /management/groups` fields: name, start_date, teacher, t_hour_rate, students[], s_hour_rate, course_id, suggested_total_hours, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value], schedule[1][time], schedule[1][duration], schedule[2][value], schedule[2][time], schedule[2][duration], schedule[3][value]
- filters: teacher, students[], course_id, schedule[0][duration], schedule[1][duration], schedule[2][duration], schedule[3][duration], schedule[4][duration], schedule[5][duration], schedule[6][duration]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-groups-create-full.png`

### `management-salary-class-report` — Salary Class Report
- route: `/management/salary-class-report`  ·  modules: Classes / Live Sessions, Wallet / Finance, Reports / Analytics
- sections/headings: Salary Class Report
- cards/KPIs: Salary Class Report
- form `get /management/update-result` fields: date_range, filter, teacher_id
- filters: filter, teacher_id
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-salary-class-report-full.png`

### `management-schedule-sessions-response` — Schedule Sessions Response
- route: `/management/schedule-sessions-response`  ·  modules: Classes / Live Sessions, Timetable / Schedule, Exams / Quizzes
- table (1 rows): Student, Parent, Course Name, Schedule, Status, Requests
- table (0 rows): #, Teacher Name
- table (0 rows): #, Teacher Name, Message from teacher, Options
- modal: **Teachers You Sent** [modal/static]
- modal: **Accepted Teachers** [modal/static]
- buttons: 12 (mutating 2, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-schedule-sessions-response-full.png`

### `management-session-class-room-mq-3` — Session Class Room Mq 3
- route: `/management/session-class-room/{enc}/{id}`  ·  modules: Classes / Live Sessions
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 64 (mutating 18, submit 3, nav 12, open_ui 31)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-session-class-room-mq-3-full.png`

### `management-sessions-analysis` — Sessions Analysis
- route: `/management/sessions_analysis`  ·  modules: Classes / Live Sessions
- sections/headings: Filter Classes, Regular Classes, 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0 (00:00), 0, Trial Classes
- cards/KPIs: Filter Classes, Regular Classes, Trial Classes, Helpers
- form `get /management/sessions_analysis` fields: date_range, from_time, to_time, teacher_id, student_id, type
- filters: teacher_id, student_id, type
- buttons: 9 (mutating 2, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/sessions_analysis, POST /management/chat/loadMoreChats
- screenshot: `output/roles/admin/screenshots/management-sessions-analysis-full.png`


## admin · Content / Materials / Library (4 pages)

### `management-library` — Library
- route: `/management/library`  ·  modules: Content / Materials / Library
- table (1 rows): #, Book Name, Category, Published at, Views, Downloads, Status, View, Actions
- table (1 rows): Category name, Total of material, Action
- form `get ` fields: filter
- form `post /management/library` fields: name, type_id, cat_id
- form `post /management/library` fields: name, type_id, type, category_id, file, thumbnail
- modal: **Category Details** [modal/static+opened] fields: name
- modal: **Details** [modal/static]
- modal: **Add Material** [modal/static+opened] fields: name, type, category_id, file, thumbnail
- filters: filter, type, category_id
- buttons: 18 (mutating 6, submit 1, nav 2, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/chat, GET /management/class-feedback
- screenshot: `output/roles/admin/screenshots/management-library-full.png`

### `management-materials` — Courses List
- route: `/management/materials`  ·  modules: Content / Materials / Library
- cards/KPIs: arabic
- table (1 rows): #, Name, name_ar, Settings
- form `post /management/materials/{id}` fields: (no named fields)
- form `post /management/materials/{id}` fields: (no named fields)
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/chat, GET /management/class-feedback
- screenshot: `output/roles/admin/screenshots/management-materials-full.png`

### `management-materials-1-edit` — Edit Courses
- route: `/management/materials/{id}/edit`  ·  modules: Content / Materials / Library
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/materials/{id}` fields: name, name_ar
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-materials-1-edit-full.png`

### `management-materials-create` — Create Courses
- route: `/management/materials/create`  ·  modules: Content / Materials / Library
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/materials` fields: name, name_ar
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-materials-create-full.png`


## admin · Courses (21 pages)

### `management-courses` — Courses
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses, Schedule Cancel Classes
- table (2 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 34 (mutating 7, submit 1, nav 4, open_ui 22)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT
- screenshot: `output/roles/admin/screenshots/management-courses-full.png`

### `management-courses-1` — Courses 1
- route: `/management/courses/{id}`  ·  modules: Courses
- sections/headings: Current Course Details, Course History, #, Class Date & Time Student, Teacher Name, Duration Price, Course Details, Status, Actions, 1, Friday, 19th-06-2026 11:00 AM, المعلم محمد صادق صادق (03:00 AM) Friday,, 60 min (120), Show Details
- cards/KPIs: Current Course Details, Course History, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (13 rows): Serial Number, Eg91718
- table (5 rows): #, Class Date & Time Studen, Teacher Name, Duration Price, Course Details, Status, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Course History** [modal/static]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static]
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static+opened]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, Hour, Minute, duration, credit, teacher, accounting_statement
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by, invoice, status, duration, credit, teacher, accounting_statement
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- ⚠ unsafe-skipped: Admin Cancel Show Details
- buttons: 83 (mutating 22, submit 3, nav 3, open_ui 55)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-1-full.png`

### `management-courses-1-create` — Courses 1 Create
- route: `/management/courses/{id}/create`  ·  modules: Courses
- sections/headings: Basic, Schedule, Additional Settings, Hour Rate, Cancellation Limits
- cards/KPIs: Basic, Schedule, Additional Settings
- form `post /management/courses/{id}/store` fields: material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], family_hour_rate_type, family_hour_rate_type, family_hour_rate, teacher_hour_rate_type, teacher_hour_rate_type, teacher_hour_rate, student_cancel, teacher_cancel
- filters: material_id, teacher_id, schedule[0][value], schedule[0][duration], student_cancel, teacher_cancel
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-1-create-full.png`

### `management-courses-1-create-free` — Courses 1 Create Free
- route: `/management/courses/{id}/create_free`  ·  modules: Courses
- sections/headings: Basic, Schedule, Additional Settings, Hour Rate, Cancellation Limits
- cards/KPIs: Basic, Schedule, Additional Settings
- form `post /management/courses/{id}/store_free` fields: material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], teacher_hour_rate_type, teacher_hour_rate_type, teacher_hour_rate, student_cancel, teacher_cancel
- filters: material_id, teacher_id, schedule[0][value], schedule[0][duration], student_cancel, teacher_cancel
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-1-create-free-full.png`

### `management-courses-1-edit` — Courses 1 Edit
- route: `/management/courses/{id}/edit`  ·  modules: Courses
- sections/headings: Basic, Schedule, Additional Settings, Hour Rate, Course Edit Type, Cancellation Limits
- cards/KPIs: Basic, Schedule, Additional Settings
- table (5 rows): #, Day, Date, Time Student Timezone, Duration, Status
- form `post /management/courses/{id}/update` fields: material_id, teacher_id, start_date, delete_old_sessions, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value], schedule[1][time], schedule[1][duration], schedule[2][value], schedule[2][time], schedule[2][duration], family_hour_rate_type, family_hour_rate_type, family_hour_rate, teacher_hour_rate_type, teacher_hour_rate_type
- filters: material_id, teacher_id, schedule[0][value], schedule[0][duration], schedule[1][value], schedule[1][duration], schedule[2][value], schedule[2][duration], student_cancel, teacher_cancel
- buttons: 13 (mutating 7, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-1-edit-full.png`

### `management-courses-2-create` — Courses 2 Create
- route: `/management/courses/{id}/create`  ·  modules: Courses
- sections/headings: Basic, Schedule, Additional Settings, Hour Rate, Cancellation Limits
- cards/KPIs: Basic, Schedule, Additional Settings
- form `post /management/courses/{id}/store` fields: material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], family_hour_rate_type, family_hour_rate_type, family_hour_rate, teacher_hour_rate_type, teacher_hour_rate_type, teacher_hour_rate, student_cancel, teacher_cancel
- filters: material_id, teacher_id, schedule[0][value], schedule[0][duration], student_cancel, teacher_cancel
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-2-create-full.png`

### `management-courses-2-create-free` — Courses 2 Create Free
- route: `/management/courses/{id}/create_free`  ·  modules: Courses
- sections/headings: Basic, Schedule, Additional Settings, Hour Rate, Cancellation Limits
- cards/KPIs: Basic, Schedule, Additional Settings
- form `post /management/courses/{id}/store_free` fields: material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], teacher_hour_rate_type, teacher_hour_rate_type, teacher_hour_rate, student_cancel, teacher_cancel
- filters: material_id, teacher_id, schedule[0][value], schedule[0][duration], student_cancel, teacher_cancel
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-2-create-free-full.png`

### `management-courses-create-new-copy-1` — Courses Create New Copy 1
- route: `/management/courses/create_new_copy/{id}`  ·  modules: Courses
- sections/headings: Basic, Schedule, Additional Settings, Hour Rate, Course Edit Type, Cancellation Limits
- cards/KPIs: Basic, Schedule, Additional Settings
- table (5 rows): #, Day, Date, Time Student Timezone, Duration, Status
- form `post /management/courses/{id}/store` fields: material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value], schedule[1][time], schedule[1][duration], schedule[2][value], schedule[2][time], schedule[2][duration], family_hour_rate_type, family_hour_rate_type, family_hour_rate, teacher_hour_rate_type, teacher_hour_rate_type, teacher_hour_rate
- filters: material_id, teacher_id, schedule[0][value], schedule[0][duration], schedule[1][value], schedule[1][duration], schedule[2][value], schedule[2][duration], student_cancel, teacher_cancel
- buttons: 13 (mutating 7, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-create-new-copy-1-full.png`

### `management-courses-status-0-0` — Courses Status 0 0
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-status-0-0-full.png`

### `management-courses-status-0-1` — Courses Status 0 1
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-status-0-1-full.png`

### `management-courses-status-0-2` — Courses Status 0 2
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses, Schedule Cancel Classes
- table (2 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 34 (mutating 7, submit 1, nav 4, open_ui 22)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-status-0-2-full.png`

### `management-courses-status-0-3` — Courses Status 0 3
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-status-0-3-full.png`

### `management-courses-status-0-4` — Courses Status 0 4
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-status-0-4-full.png`

### `management-courses-status-0-5` — Courses Status 0 5
- route: `/management/courses`  ·  modules: Courses
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-status-0-5-full.png`

### `management-courses-type-no-invoices` — Courses Type No Invoices
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses, Schedule Cancel Classes
- table (2 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 34 (mutating 7, submit 1, nav 4, open_ui 22)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-full.png`

### `management-courses-type-no-invoices-status-0-0` — Courses Type No Invoices Status 0 0
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-status-0-0-full.png`

### `management-courses-type-no-invoices-status-0-1` — Courses Type No Invoices Status 0 1
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-status-0-1-full.png`

### `management-courses-type-no-invoices-status-0-2` — Courses Type No Invoices Status 0 2
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses, Schedule Cancel Classes
- table (2 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 34 (mutating 7, submit 1, nav 4, open_ui 22)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-status-0-2-full.png`

### `management-courses-type-no-invoices-status-0-3` — Courses Type No Invoices Status 0 3
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-status-0-3-full.png`

### `management-courses-type-no-invoices-status-0-4` — Courses Type No Invoices Status 0 4
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-status-0-4-full.png`

### `management-courses-type-no-invoices-status-0-5` — Courses Type No Invoices Status 0 5
- route: `/management/courses`  ·  modules: Courses, Payments / Invoices
- sections/headings: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- cards/KPIs: 0 (0%), 1 (100%), 0 (0%), 0 (0%), 0 (0%), 0 (0%), List of Courses
- table (1 rows): #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `get /management/courses` fields: type, type, type, type, type, type, type, name, date_range, has_invoice, status[], status[], status[], status[], status[], status[], status[], status[]
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- filters: name, has_invoice, invoice, status, duration, credit, teacher, accounting_statement
- buttons: 26 (mutating 5, submit 1, nav 4, open_ui 16)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courses-type-no-invoices-status-0-5-full.png`


## admin · Dashboard / Home (21 pages)

### `management-banks` — Banks List
- route: `/management/banks`  ·  modules: Dashboard / Home
- table (1 rows): #, Bank Name, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/chat, GET /management/class-feedback
- screenshot: `output/roles/admin/screenshots/management-banks-full.png`

### `management-banks-create` — Create Bank
- route: `/management/banks/create`  ·  modules: Dashboard / Home
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/banks` fields: name
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-banks-create-full.png`

### `management-courseclasses-1` — Courseclasses 1
- route: `/management/courseclasses/{id}`  ·  modules: Dashboard / Home
- sections/headings: Student Enter At, Teacher Enter At, Remind Teacher At, Timeline
- cards/KPIs: Class Information, Files, TimeTable, Class Recording, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date
- table (3 rows): #, Account, Link
- table (0 rows): #, Added by, Level, Text, Status, Created at
- table (2 rows): Category, Percentage
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Direct Links for Sessions** [modal/static+opened]
- modal: **Total Queues** [modal/static+opened]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 55 (mutating 18, submit 1, nav 2, open_ui 34)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courseclasses-1-full.png`

### `management-courseclasses-2` — Courseclasses 2
- route: `/management/courseclasses/{id}`  ·  modules: Dashboard / Home
- sections/headings: Student Enter At, Teacher Enter At, Remind Teacher At, Timeline
- cards/KPIs: Class Information, Files, TimeTable, Class Recording, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date
- table (3 rows): #, Account, Link
- table (0 rows): #, Added by, Level, Text, Status, Created at
- table (2 rows): Category, Percentage
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Direct Links for Sessions** [modal/static+opened]
- modal: **Total Queues** [modal/static+opened]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 54 (mutating 17, submit 1, nav 2, open_ui 34)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courseclasses-2-full.png`

### `management-courseclasses-3` — Courseclasses 3
- route: `/management/courseclasses/{id}`  ·  modules: Dashboard / Home
- sections/headings: Student Enter At, Teacher Enter At, Remind Teacher At, Timeline
- cards/KPIs: Class Information, Files, TimeTable, Class Recording, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date
- table (3 rows): #, Account, Link
- table (0 rows): #, Added by, Level, Text, Status, Created at
- table (2 rows): Category, Percentage
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Direct Links for Sessions** [modal/static+opened]
- modal: **Total Queues** [modal/static+opened]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 53 (mutating 17, submit 1, nav 2, open_ui 33)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courseclasses-3-full.png`

### `management-courseclasses-4` — Courseclasses 4
- route: `/management/courseclasses/{id}`  ·  modules: Dashboard / Home
- sections/headings: Student Enter At, Teacher Enter At, Remind Teacher At, Timeline
- cards/KPIs: Class Information, Files, TimeTable, Class Recording, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date
- table (3 rows): #, Account, Link
- table (0 rows): #, Added by, Level, Text, Status, Created at
- table (2 rows): Category, Percentage
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Direct Links for Sessions** [modal/static+opened]
- modal: **Total Queues** [modal/static+opened]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 53 (mutating 17, submit 1, nav 2, open_ui 33)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courseclasses-4-full.png`

### `management-courseclasses-5` — Courseclasses 5
- route: `/management/courseclasses/{id}`  ·  modules: Dashboard / Home
- sections/headings: Student Enter At, Teacher Enter At, Remind Teacher At, Timeline
- cards/KPIs: Class Information, Files, TimeTable, Class Recording, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date
- table (3 rows): #, Account, Link
- table (0 rows): #, Added by, Level, Text, Status, Created at
- table (2 rows): Category, Percentage
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Direct Links for Sessions** [modal/static+opened]
- modal: **Total Queues** [modal/static+opened]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 53 (mutating 17, submit 1, nav 2, open_ui 33)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courseclasses-5-full.png`

### `management-courseclasses-6` — Courseclasses 6
- route: `/management/courseclasses/{id}`  ·  modules: Dashboard / Home
- sections/headings: Student Enter At, Teacher Enter At, Remind Teacher At, Timeline
- cards/KPIs: Class Information, Files, TimeTable, Class Recording, Timeline, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date
- table (3 rows): #, Account, Link
- table (0 rows): #, Added by, Level, Text, Status, Created at
- table (2 rows): Category, Percentage
- form `post /management/courseClasses/{id}` fields: course_id, session_id
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Direct Links for Sessions** [modal/static+opened]
- modal: **Total Queues** [modal/static+opened]
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 53 (mutating 17, submit 1, nav 2, open_ui 33)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-courseclasses-6-full.png`

### `management-family-feedback-categories-create` — messages.Create Feedback Categories
- route: `/management/family/feedback-categories/create`  ·  modules: Dashboard / Home, Parents / Guardians / Families, Messages / Notifications
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/family/feedback-categories` fields: name, status, description
- filters: status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-family-feedback-categories-create-full.png`

### `management-home` — Home
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 66 (mutating 20, submit 3, nav 12, open_ui 31)
- app endpoints touched: GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home
- screenshot: `output/roles/admin/screenshots/management-home-full.png`

### `management-home-helper-1` — Home Helper 1
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: helper, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static+opened] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 60 (mutating 18, submit 3, nav 10, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-helper-1-full.png`

### `management-home-status` — Home Status
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 66 (mutating 20, submit 3, nav 12, open_ui 31)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-status-full.png`

### `management-home-status-1` — Home Status 1
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: status, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static+opened] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 60 (mutating 18, submit 3, nav 10, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-status-1-full.png`

### `management-home-status-2-10` — Home Status 2 10
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: status, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 66 (mutating 20, submit 3, nav 12, open_ui 31)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-status-2-10-full.png`

### `management-home-status-3-4` — Home Status 3 4
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: status, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static+opened] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 60 (mutating 18, submit 3, nav 10, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-status-3-4-full.png`

### `management-home-status-5-6-7` — Home Status 5 6 7
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: status, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static+opened] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 60 (mutating 18, submit 3, nav 10, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-status-5-6-7-full.png`

### `management-home-status-8` — Home Status 8
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: status, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static+opened] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 60 (mutating 18, submit 3, nav 10, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-status-8-full.png`

### `management-home-trial-0` — Home Trial 0
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: trial, date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 66 (mutating 20, submit 3, nav 12, open_ui 31)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-home-trial-0-full.png`

### `management-new-requests-create` — Create New Request
- route: `/management/new-requests/create`  ·  modules: Dashboard / Home
- sections/headings: Main information, Additional information
- cards/KPIs: Main information
- form `post /management/new-requests` fields: first_name, last_name, email, phone, friends_number, classes_Duration, hear_from, classes_count, gender, age, parent_age, language, timezone, trial_date, trial_time, coupone_code, country_id, course_name
- filters: gender, country_id
- buttons: 11 (mutating 4, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-new-requests-create-full.png`

### `management-total-queues` — Total Queues
- route: `/management/total-queues`  ·  modules: Dashboard / Home
- sections/headings: Total Queues
- cards/KPIs: Total Queues
- table (0 rows): #, Added by, Level, Text, Class, Status, Created at, Action
- form `get ` fields: level, status
- filters: level, status
- buttons: 9 (mutating 2, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-total-queues-full.png`

### `teacher-home` — Teacher Home
- route: `/teacher/home`  ·  modules: Dashboard / Home, Teachers, Classes / Live Sessions
- sections/headings: Total Classes, 1, Sessions Pending, 0, Attend Sessions, 0, Waiting & Running, 1 & 0, Cancel Sessions, 0, Sessions Absent, 0, Trials Sessions, 1
- cards/KPIs: Total Classes, Filter Classes, Classes Of 2026-06-20, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (1 rows): #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions
- table (2 rows): Category, Percentage
- form `get /management/home` fields: date_range, from_time, to_time, teacher_id, family_id, student_id, type
- form `post /management/export-aa` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `get /management/home` fields: timeType, groupByTime
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- form `post /` fields: class_id, class_type, course_type, absent_by, note, sendMessage, sendMessage, sendMessage, message, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/courseClasses/edit-class` fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- form `post /` fields: session_id, teacher_id, duration, cancel_by, note, sendMessage, makupclass, add_to_credit, cancelTzType, cancelTzType, date, time
- form `post /management/class-feedback` fields: class_id, feedback_note, feedback_files[]
- modal: **Settings** [modal/static] fields: timeType, groupByTime
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, Hour, Minute, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time, Hour, Minute
- modal: **Add Feedback** [modal/static] fields: feedback_note, feedback_files[]
- filters: teacher_id, family_id, student_id, type, timeType, level, remark, absent_by, duration, teacher_id, accounting_statement, cancel_by
- tabs: No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit, Auto Make-up class, Using Student Timezone Using Teacher Tim
- buttons: 66 (mutating 20, submit 3, nav 12, open_ui 31)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/teacher-home-full.png`


## admin · General / Unknown (12 pages)

### `management-courseclasses-default-member-course-details-1` — Courseclasses Default Member Course Details 1
- route: `/management/courseclasses/default-member-course-details/{id}`  ·  modules: General / Unknown
- sections/headings: defaultCourse_details, Timeline
- cards/KPIs: defaultCourse_details, Timeline
- table (4 rows): Student Name, محمد احمد, Parent name, abdo ahmed
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- form `post /management/courses/{id}/delete` fields: (no named fields)
- modal: **Student Timetable** [modal/static+opened]
- buttons: 11 (mutating 2, submit 1, nav 2, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-courseclasses-default-member-course-details-1-full.png`

### `management-export-course` — Export Course — **HTTP 500, ERROR**
- route: `/management/export-course`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-export-course-full.png`

### `management-families-feedback-family-1` — Families Feedback Family 1 — **HTTP 500, ERROR**
- route: `/management/families/feedback/family/{id}`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-family-1-full.png`

### `management-heads` — Heads
- route: `/management/heads`  ·  modules: General / Unknown
- table (1 rows): #, Name, Status, Actions
- form `post /management/heads` fields: name, status
- form `post ` fields: name, status
- modal: **Add Head** [modal/static+opened] fields: name, status
- modal: **Edit** [modal/static] fields: name, status
- filters: status, status
- buttons: 15 (mutating 5, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-heads-full.png`

### `management-new-requests-requests-date-range-2026-06-01-to-2026-06-30` — New Requests Requests Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/requests`  ·  modules: General / Unknown
- cards/KPIs: 0 Trials Completed, Trials Overdue for Scheduling Requires Action, Upcoming Trials Not Confirmed Urgent, Scheduling Efficiency Improved, Total New Requests Total number of new trial requests received, Missed Trials, Fastest Scheduling, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/requests` fields: date_range
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 20 (mutating 7, submit 1, nav 2, open_ui 10)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-requests-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-scheduled-trials-index-status-3-4-date-2026-06-01-to-202` — New Requests Scheduled Trials Index Status 3 4 Date 2026 06 01 To 202 — **HTTP 500, ERROR**
- route: `/management/new-requests/scheduled-trials/index`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-new-requests-scheduled-trials-index-status-3-4-date-2026-06-01-to-202-full.png`

### `management-new-requests-scheduled-trials-index-status-5-7-6-date-2026-06-01-to-2` — New Requests Scheduled Trials Index Status 5 7 6 Date 2026 06 01 To 2 — **HTTP 500, ERROR**
- route: `/management/new-requests/scheduled-trials/index`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-new-requests-scheduled-trials-index-status-5-7-6-date-2026-06-01-to-2-full.png`

### `management-scheduled-actions` — Scheduled Actions
- route: `/management/scheduled-actions`  ·  modules: General / Unknown
- sections/headings: Scheduled Actions
- cards/KPIs: Scheduled Actions
- table (1 rows): #, Action Type, Target, Scheduled Date, Status, Created by, Executed At, Result, Note, Settings
- form `get ` fields: action_type, status
- filters: action_type, status
- buttons: 11 (mutating 3, submit 1, nav 3, open_ui 4)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/public-advertisement, GET /management/public-holiday
- screenshot: `output/roles/admin/screenshots/management-scheduled-actions-full.png`

### `management-scheduled-actions-create` — Scheduled Actions Create
- route: `/management/scheduled-actions/create`  ·  modules: General / Unknown
- sections/headings: Scheduled Action Details
- cards/KPIs: Scheduled Action Details
- form `post /management/scheduled-actions` fields: action_type, scheduled_date, target_id, family_target_id, returned_at, student_target_id, returned_at, cancel_classes_student_id, criteria[teacher_id], criteria[material_id], criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], activate_family_target_id, activate_student_target_id
- filters: action_type, family_target_id, student_target_id, cancel_classes_student_id, criteria[teacher_id], criteria[material_id], activate_family_target_id, activate_student_target_id
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-scheduled-actions-create-full.png`

### `management-settings-customisation-message-builder` — Gateway Timeout — **HTTP 504, ERROR**
- route: `/management/settings/customisation/message-builder`  ·  modules: General / Unknown
- sections/headings: Gateway Timeout
- buttons: 0 (mutating 0, submit 0, nav 0, open_ui 0)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-customisation-message-builder-full.png`

### `management-teachers-1-monthly-classes` — Teachers 1 Monthly Classes — **HTTP 500, ERROR**
- route: `/management/teachers/{id}/monthly-classes`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-monthly-classes-full.png`

### `management-time-convertor` — World Time Zone Converter
- route: `/management/time-convertor`  ·  modules: General / Unknown
- sections/headings: World Time Zone Converter
- cards/KPIs: Changes
- table (2 rows): Time Zone, Affected Accounts, Next Change Date, Current Offset (UTC), Upcoming Offset (UTC), Offset System
- modal: **Add Location** [modal/static] fields: Search cities or timezones...
- tabs: Time Zone Changes, Time Zone, Changes, World Time Zone Converter Compare times , World Time Zone Converter Compare times , Changes 2 Time Zone Affected Accounts Ne
- buttons: 22 (mutating 3, submit 11, nav 2, open_ui 6)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/sessions_analysis, GET /management/time-convertor
- screenshot: `output/roles/admin/screenshots/management-time-convertor-full.png`


## admin · Messages / Notifications (3 pages)

### `management-chat` — Chat
- route: `/management/chat`  ·  modules: Messages / Notifications
- sections/headings: Eslam Essam, You, Open chat from the list
- cards/KPIs: Eslam Essam
- form `get ` fields: (no named fields)
- form `get ` fields: (no named fields)
- form `get ` fields: (no named fields)
- form `post ` fields: admin_id, name, bio, image, staff[], teachers[], students[]
- form `post ` fields: staffMember[], teachersMember[], studentsMembers[]
- modal: **Chats** [offcanvas/static] fields: Search Contact
- modal: **Create Group** [modal/static+opened] fields: name, bio, image, staff[], teachers[], students[]
- modal: **Add Member** [modal/static] fields: staffMember[], teachersMember[], studentsMembers[]
- filters: staff[], teachers[], students[], staffMember[], teachersMember[], studentsMembers[]
- buttons: 29 (mutating 10, submit 6, nav 2, open_ui 11)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/profile/show, POST /management/chat/loadMoreChats
- screenshot: `output/roles/admin/screenshots/management-chat-full.png`

### `management-public-advertisement` — Public Advertisement
- route: `/management/public-advertisement`  ·  modules: Messages / Notifications, Students, Teachers
- sections/headings: Public Advertisement & Notification, List of Teachers, List of Students
- cards/KPIs: Public Advertisement & Notification, List of Teachers, List of Students
- table (1 rows): #, Select All, Teacher Name
- table (1 rows): #, Select All, Student Name
- form `post /management/public-advertisement-submit` fields: type[], type[], private, message, media[], expire_at, category_selected[], student_category_selected[], country_id, hours, language
- filters: category_selected[], student_category_selected[], country_id, hours, language
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/public-advertisement, GET /management/public-holiday
- screenshot: `output/roles/admin/screenshots/management-public-advertisement-full.png`

### `management-settings-notification` — Settings Notification
- route: `/management/settings/notification`  ·  modules: Messages / Notifications
- sections/headings: System Notifications
- cards/KPIs: System Notifications
- form `post /management/settings/notification/update` fields: system_notifications, appnotifiy, course_updates, teacher_course_updates, teacher_course_updates_statuses[], teacher_course_updates_statuses[], student_course_updates, student_course_updates_statuses[], student_course_updates_statuses[], student_course_updates_statuses[], class_updates, teacher_class_updates_type, teacher_class_update_statuses[], teacher_class_update_statuses[], teacher_class_update_statuses[], teacher_class_update_statuses[], teacher_class_update_statuses[], teacher_class_update_statuses[]
- filters: teacher_course_updates, student_course_updates, teacher_class_updates_type, student_class_updates_type, teacher_reminder_type, student_reminder_type, invoice, invoice_reminder, salaries, family_status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-notification-full.png`


## admin · Parents / Guardians / Families (30 pages)

### `management-categories-families` — Categories Families
- route: `/management/categories/families`  ·  modules: Parents / Guardians / Families
- sections/headings: Families Categories
- cards/KPIs: Families Categories
- table (2 rows): #, Name, Description, Status, Count, Settings
- form `post /management/categories/families/{id}/delete` fields: (no named fields)
- form `post /management/categories/families/{id}/delete` fields: (no named fields)
- form `post /management/categories/families/{id}/delete` fields: (no named fields)
- form `post /management/categories/families/{id}/delete` fields: (no named fields)
- buttons: 13 (mutating 3, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/home, GET /management/new-requests
- screenshot: `output/roles/admin/screenshots/management-categories-families-full.png`

### `management-categories-families-2-assign` — Categories Families 2 Assign
- route: `/management/categories/families/{id}/assign`  ·  modules: Parents / Guardians / Families
- sections/headings: Choose Families
- cards/KPIs: Choose Families
- form `post /management/categories/families/{id}/assign-family` fields: member_id[]
- filters: member_id[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-categories-families-2-assign-full.png`

### `management-categories-families-2-edit` — Categories Families 2 Edit
- route: `/management/categories/families/{id}/edit`  ·  modules: Parents / Guardians / Families
- sections/headings: Category Details
- cards/KPIs: Category Details
- form `post /management/categories/families/{id}/update` fields: name, status, description
- filters: status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-categories-families-2-edit-full.png`

### `management-categories-families-3-assign` — Categories Families 3 Assign
- route: `/management/categories/families/{id}/assign`  ·  modules: Parents / Guardians / Families
- sections/headings: Choose Families
- cards/KPIs: Choose Families
- form `post /management/categories/families/{id}/assign-family` fields: member_id[]
- filters: member_id[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-categories-families-3-assign-full.png`

### `management-categories-families-3-edit` — Categories Families 3 Edit
- route: `/management/categories/families/{id}/edit`  ·  modules: Parents / Guardians / Families
- sections/headings: Category Details
- cards/KPIs: Category Details
- form `post /management/categories/families/{id}/update` fields: name, status, description
- filters: status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-categories-families-3-edit-full.png`

### `management-categories-families-create` — Categories Families Create
- route: `/management/categories/families/create`  ·  modules: Parents / Guardians / Families
- sections/headings: Category Details
- cards/KPIs: Category Details
- form `post /management/categories/families/store` fields: name, status, description
- filters: status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-categories-families-create-full.png`

### `management-families` — Families
- route: `/management/families`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Active Families, abdo ahmed, الطالبة لمار حسن
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Families
- table (2 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 31 (mutating 6, submit 1, nav 2, open_ui 22)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/families, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/public-advertisement
- screenshot: `output/roles/admin/screenshots/management-families-full.png`

### `management-families-1` — Families 1
- route: `/management/families/{id}`  ·  modules: Parents / Guardians / Families
- sections/headings: abdo ahmed, Active, Family Members
- cards/KPIs: abdo ahmed, Family Members, Billings & Invoices, Deleted Invoices, Invoice Adjustments, Credits, Update Location, Preferences, Capabilities, Profile Notifications, Profile Activity, Student Feedback
- table (1 rows): Student, Status, Teacher Name, course details, Subscription, Options
- table (1 rows): Payment Id, Payment Date, Due Date, Amount, Status, Actions
- table (1 rows): Biller Name, Serial, Amount, Status, Actions
- table (1 rows): #, value, invoices_count, Type, invoices, Note, Actions
- table (1 rows): session, Student, Teacher, Duration, Actions
- table (7 rows): Categorization, WhatsApp, E-mail
- table (1 rows): #, Meeting Date, Meeting Time, Meeting Manager, Family Members, Status, Action
- form `post /management/families/{id}/deactivate` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- form `post /management/families/{id}/invoice-adjustments/{id}` fields: (no named fields)
- form `post /management/families/{id}/invoice-adjustments/{id}` fields: (no named fields)
- form `post /management/families/{id}/invoice-adjustments` fields: type, amount, count, note
- form `post /management/families/{id}/location/update` fields: country_id, city_id, type, timezone, timezone_diff
- form `post /management/families/{id}/preferences/update` fields: language, auto_add_credit_to_invoice, pw_reset_method, whatsapp_private, renew_unpaid_courses, send_invoice, stop_after
- form `post /management/families/{id}/capabilities/update` fields: can_chat, can_see_library, id
- form `post /management/families/{id}/store-notifications` fields: invoice_by_whatsapp, invoice_by_whatsapp, invoice_by_email, invoice_by_email, invoice_reminders_by_whatsapp, invoice_reminders_by_whatsapp, invoice_reminders_by_email, invoice_reminders_by_email, class_reminders_by_whatsapp, class_reminders_by_whatsapp, class_reminders_by_email, class_reminders_by_email, class_updates_by_whatsapp, class_updates_by_whatsapp, class_updates_by_email, class_updates_by_email, course_updates_by_whatsapp, course_updates_by_whatsapp
- modal: **Details** [modal/static]
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- modal: **Details** [modal/static]
- modal: **Suspended Family** [modal/static+opened] fields: date, schedule_return, note
- modal: **Schedule Stop Family** [modal/static+opened] fields: scheduled_date, returned_at, schedule_auto_return, note
- modal: **Stop Family** [modal/static+opened] fields: note
- modal: **Activate** [modal/static]
- filters: currancy, getway, type, country_id, city_id, timezone, language, auto_add_credit_to_invoice, pw_reset_method, whatsapp_private, renew_unpaid_courses, send_invoice, can_chat, can_see_library
- tabs: Children Billing Invoice Adjustments 1 C, Children, Billing, Invoice Adjustments 1, Credits, Profile Activity, Student Feedback, Settings, Family Members Add New Child Student Sta, Family Members Add New Child Student Sta, Billings & Invoices Create Invoice Payme, Invoice Adjustments Add New Adjustment #, Credits 00:00 (0) session Student Teache, Update Location Student Country* Choose 
- buttons: 62 (mutating 23, submit 3, nav 3, open_ui 33)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-1-full.png`

### `management-families-1-edit` — Families 1 Edit
- route: `/management/families/{id}/edit`  ·  modules: Parents / Guardians / Families
- sections/headings: Main information, Payment information, Courses information
- cards/KPIs: Main information
- form `post /management/families/{id}` fields: send_info, first_name, last_name, user_name, first_name_ar, last_name_ar, password, member_id[], emails, phones, birth_date, join_at, gender, status, group_name, is_recurring, auto_invoice, is_post_payment
- filters: member_id[], gender, status, is_recurring, auto_invoice, is_post_payment, payment_method, currency, cost_type
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-1-edit-full.png`

### `management-families-2` — Families 2
- route: `/management/families/{id}`  ·  modules: Parents / Guardians / Families
- sections/headings: الطالبة لمار حسن, Active, Family Members
- cards/KPIs: الطالبة لمار حسن, Family Members, Billings & Invoices, Deleted Invoices, Invoice Adjustments, Credits, Update Location, Preferences, Capabilities, Profile Notifications, Profile Activity, Student Feedback
- table (1 rows): Student, Status, Teacher Name, course details, Subscription, Options
- table (1 rows): Payment Id, Payment Date, Due Date, Amount, Status, Actions
- table (1 rows): Biller Name, Serial, Amount, Status, Actions
- table (1 rows): #, value, invoices_count, Type, invoices, Note, Actions
- table (1 rows): session, Student, Teacher, Duration, Actions
- table (7 rows): Categorization, WhatsApp, E-mail
- table (1 rows): #, Meeting Date, Meeting Time, Meeting Manager, Family Members, Status, Action
- form `post /management/families/{id}/deactivate` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- form `post /management/families/{id}/invoice-adjustments` fields: type, amount, count, note
- form `post /management/families/{id}/location/update` fields: country_id, city_id, type, timezone, timezone_diff
- form `post /management/families/{id}/preferences/update` fields: language, auto_add_credit_to_invoice, pw_reset_method, whatsapp_private, renew_unpaid_courses, send_invoice, stop_after
- form `post /management/families/{id}/capabilities/update` fields: can_chat, can_see_library, id
- form `post /management/families/{id}/store-notifications` fields: invoice_by_whatsapp, invoice_by_whatsapp, invoice_by_email, invoice_by_email, invoice_reminders_by_whatsapp, invoice_reminders_by_whatsapp, invoice_reminders_by_email, invoice_reminders_by_email, class_reminders_by_whatsapp, class_reminders_by_whatsapp, class_reminders_by_email, class_reminders_by_email, class_updates_by_whatsapp, class_updates_by_whatsapp, class_updates_by_email, class_updates_by_email, course_updates_by_whatsapp, course_updates_by_whatsapp
- form `post /management/families/{id}/suspend` fields: date, schedule_return, note
- form `post /management/scheduled-actions` fields: action_type, target_id, back, scheduled_date, returned_at, schedule_auto_return, note
- modal: **Details** [modal/static]
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- modal: **Details** [modal/static]
- modal: **Suspended Family** [modal/static+opened] fields: date, schedule_return, note
- modal: **Schedule Stop Family** [modal/static+opened] fields: scheduled_date, returned_at, schedule_auto_return, note
- modal: **Stop Family** [modal/static+opened] fields: note
- modal: **Activate** [modal/static]
- filters: currancy, getway, type, country_id, city_id, timezone, language, auto_add_credit_to_invoice, pw_reset_method, whatsapp_private, renew_unpaid_courses, send_invoice, can_chat, can_see_library
- tabs: Children Billing Invoice Adjustments Cre, Children, Billing, Invoice Adjustments, Credits, Profile Activity, Student Feedback, Settings, Family Members Add New Child Student Sta, Family Members Add New Child Student Sta, Billings & Invoices Create Invoice Payme, Invoice Adjustments Add New Adjustment #, Credits 00:00 (0) session Student Teache, Update Location Student Country* Choose 
- buttons: 58 (mutating 19, submit 3, nav 3, open_ui 33)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-2-full.png`

### `management-families-2-edit` — Families 2 Edit
- route: `/management/families/{id}/edit`  ·  modules: Parents / Guardians / Families
- sections/headings: Main information, Payment information, Courses information
- cards/KPIs: Main information
- form `post /management/families/{id}` fields: send_info, first_name, last_name, user_name, first_name_ar, last_name_ar, password, member_id[], emails, phones, birth_date, join_at, gender, status, group_name, is_recurring, auto_invoice, is_post_payment
- filters: member_id[], gender, status, is_recurring, auto_invoice, is_post_payment, payment_method, currency, cost_type
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-2-edit-full.png`

### `management-families-create` — Families Create
- route: `/management/families/create`  ·  modules: Parents / Guardians / Families
- sections/headings: Main information, Location information, Payment information, Courses information
- cards/KPIs: Main information
- form `post /management/families` fields: send_info, first_name, last_name, user_name, first_name_ar, last_name_ar, password, member_id[], emails, phones, birth_date, join_at, gender, status, group_name, country_id, city_id, timezone
- filters: member_id[], gender, status, country_id, city_id, timezone, is_recurring, auto_invoice, is_post_payment, payment_method, currency, cost_type
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show
- screenshot: `output/roles/admin/screenshots/management-families-create-full.png`

### `management-families-feedback` — Families Feedback
- route: `/management/families/feedback`  ·  modules: Parents / Guardians / Families
- sections/headings: Student Feedback
- cards/KPIs: Student Feedback
- table (1 rows): #, Parents, Manager, Meeting Date, Meeting Time, Meeting Manager, Status, Actions
- table (6 rows): Student:
- form `get /management/families/feedback` fields: date
- form `post ` fields: date
- form `post ` fields: feedback
- form `post ` fields: student_id, curriculum, expected, level, achievements
- form `post ` fields: (no named fields)
- modal: **Edit** [modal/static] fields: date
- modal: **Add Notes** [modal/static] fields: feedback
- modal: **Add Report —** [modal/static] fields: curriculum, expected, level, achievements
- buttons: 21 (mutating 6, submit 1, nav 3, open_ui 11)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/get-helper-data, GET /management/group/index
- screenshot: `output/roles/admin/screenshots/management-families-feedback-full.png`

### `management-families-feedback-family-2` — Families Feedback Family 2
- route: `/management/families/feedback/family/{id}`  ·  modules: Parents / Guardians / Families
- sections/headings: الطالبة لمار حسن, Family Members, Student Feedback
- cards/KPIs: الطالبة لمار حسن, Student Feedback
- table (3 rows): Manager, —
- table (1 rows): Student, Teacher
- form `post ` fields: date
- modal: **Edit** [modal/static] fields: date
- buttons: 13 (mutating 3, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-family-2-full.png`

### `management-families-feedback-students` — Families Feedback Students
- route: `/management/families/feedback/students`  ·  modules: Parents / Guardians / Families, Students
- sections/headings: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents, abdo ahmed, الطالبة لمار حسن
- cards/KPIs: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- table (2 rows): #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions
- form `get /management/families/feedback/students` fields: search
- form `post /management/families/feedback` fields: family_id, date, user_id
- filters: user_id
- buttons: 19 (mutating 5, submit 1, nav 3, open_ui 10)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-families-feedback-students-full.png`

### `management-families-feedback-students-status-active` — Families Feedback Students Status Active
- route: `/management/families/feedback/students`  ·  modules: Parents / Guardians / Families, Students
- sections/headings: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents, abdo ahmed, الطالبة لمار حسن
- cards/KPIs: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- table (2 rows): #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions
- form `get /management/families/feedback/students` fields: status, search
- form `post /management/families/feedback` fields: family_id, date, user_id
- filters: user_id
- buttons: 19 (mutating 5, submit 1, nav 3, open_ui 10)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-students-status-active-full.png`

### `management-families-feedback-students-status-inactive` — Families Feedback Students Status Inactive
- route: `/management/families/feedback/students`  ·  modules: Parents / Guardians / Families, Students
- sections/headings: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- cards/KPIs: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- table (1 rows): #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions
- form `get /management/families/feedback/students` fields: status, search
- form `post /management/families/feedback` fields: family_id, date, user_id
- filters: user_id
- buttons: 13 (mutating 3, submit 1, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-students-status-inactive-full.png`

### `management-families-feedback-students-status-incomplete` — Families Feedback Students Status Incomplete
- route: `/management/families/feedback/students`  ·  modules: Parents / Guardians / Families, Students
- sections/headings: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- cards/KPIs: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- table (1 rows): #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions
- form `get /management/families/feedback/students` fields: status, search
- form `post /management/families/feedback` fields: family_id, date, user_id
- filters: user_id
- buttons: 13 (mutating 3, submit 1, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-students-status-incomplete-full.png`

### `management-families-feedback-students-status-suspended` — Families Feedback Students Status Suspended
- route: `/management/families/feedback/students`  ·  modules: Parents / Guardians / Families, Students
- sections/headings: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- cards/KPIs: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- table (1 rows): #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions
- form `get /management/families/feedback/students` fields: status, search
- form `post /management/families/feedback` fields: family_id, date, user_id
- filters: user_id
- buttons: 13 (mutating 3, submit 1, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-students-status-suspended-full.png`

### `management-families-feedback-students-status-trial` — Families Feedback Students Status Trial
- route: `/management/families/feedback/students`  ·  modules: Parents / Guardians / Families, Students
- sections/headings: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- cards/KPIs: 0 (0%), 0 (0%), 0 (0%), 2 (100%), 0 (0%), Parents
- table (1 rows): #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions
- form `get /management/families/feedback/students` fields: status, search
- form `post /management/families/feedback` fields: family_id, date, user_id
- filters: user_id
- buttons: 13 (mutating 3, submit 1, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-feedback-students-status-trial-full.png`

### `management-families-index-filter-payment-methods-0-1` — Families Index Filter Payment Methods 0 1
- route: `/management/families/index/filter`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Active Families, abdo ahmed, الطالبة لمار حسن
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Families
- table (2 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 31 (mutating 6, submit 1, nav 2, open_ui 22)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-families-index-filter-payment-methods-0-1-full.png`

### `management-families-status-active` — Families Status Active
- route: `/management/families/status/active`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Active Families, abdo ahmed, الطالبة لمار حسن
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Families
- table (2 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/families/{id}` fields: (no named fields)
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 31 (mutating 6, submit 1, nav 2, open_ui 22)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-active-full.png`

### `management-families-status-deleted` — Families Status Deleted
- route: `/management/families/status/deleted`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Deleted Families
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Families
- table (0 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 27 (mutating 6, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-deleted-full.png`

### `management-families-status-inactive` — Families Status Inactive
- route: `/management/families/status/inactive`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, messages.Inactive Families
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Families
- table (0 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 27 (mutating 6, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-inactive-full.png`

### `management-families-status-incomplete` — Families Status Incomplete
- route: `/management/families/status/incomplete`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Incomplete Families
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Families
- table (0 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 27 (mutating 6, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-incomplete-full.png`

### `management-families-status-stopped` — Families Status Stopped
- route: `/management/families/status/stopped`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, messages.Stopped Families
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Stopped Families
- table (0 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 27 (mutating 6, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-stopped-full.png`

### `management-families-status-suspended` — Families Status Suspended
- route: `/management/families/status/suspended`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Suspended Families
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Suspended Families
- table (0 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 27 (mutating 6, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-suspended-full.png`

### `management-families-status-trial` — Families Status Trial
- route: `/management/families/status/trial`  ·  modules: Parents / Guardians / Families
- sections/headings: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filter, Trial Families
- cards/KPIs: 0 (0 %), 0 (0 %), 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Trial Families
- table (0 rows): #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions
- form `get /management/families/index/filter` fields: hour_rate_operator, hour_rate, children_no_operator, children_no, is_post[], is_post[], cost_type[], cost_type[], course_types[], course_types[], course_types[], course_types[], payment_methods[], currency[], currency[], currency[], currency[], currency[]
- form `post /management/update-returning` fields: id, returned_at, note
- modal: **Update Suspension** [modal/static] fields: returned_at, note
- filters: returned_at
- buttons: 27 (mutating 6, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-families-status-trial-full.png`

### `management-family-feedback-categories` — Family Feedback Categories
- route: `/management/family/feedback-categories`  ·  modules: Parents / Guardians / Families
- sections/headings: Feedback Categories
- cards/KPIs: Feedback Categories
- table (1 rows): #, Name, Description, Status, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/family/feedback-categories, GET /management/get-helper-data
- screenshot: `output/roles/admin/screenshots/management-family-feedback-categories-full.png`

### `management-settings-integrations-whatsapp-families-insights` — Settings Integrations Whatsapp Families Insights
- route: `/management/settings/integrations/whatsapp/families/insights`  ·  modules: Parents / Guardians / Families, Reports / Analytics, Settings
- sections/headings: Names of Null groups, abdo ahmed, الطالبة لمار حسن
- cards/KPIs: Names of Null groups
- table (2 rows): #, Family name, Phone number, Group Name, Status
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-whatsapp-families-insights-full.png`


## admin · Payments / Invoices (44 pages)

### `management-accounting-transaction-invoices` — Accounting Transaction Invoices
- route: `/management/accounting/transaction/invoices`  ·  modules: Payments / Invoices
- sections/headings: Filters, Transaction
- cards/KPIs: Filters
- table (0 rows): #, Serial, Invoice Date, Total Net Price, Total Additions, Discount Value, Fees Value, Other Effects, Final Total Price, Paid At, Family
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting/transaction/invoices` fields: family_id, date
- modal: **Currency Rates** [modal/static]
- filters: family_id
- tabs: Sessions invoices Salary
- buttons: 16 (mutating 3, submit 1, nav 2, open_ui 10)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks
- screenshot: `output/roles/admin/screenshots/management-accounting-transaction-invoices-full.png`

### `management-accounting-transaction-salary` — Accounting Transaction Salary
- route: `/management/accounting/transaction/salary`  ·  modules: Payments / Invoices, Wallet / Finance
- sections/headings: Filters, Transaction
- cards/KPIs: Filters
- table (0 rows): #, Month, Teachers Total Salary, Staff Total Salary
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting/transaction/salary` fields: date
- modal: **Currency Rates** [modal/static+opened]
- tabs: Sessions invoices Salary
- buttons: 17 (mutating 3, submit 2, nav 2, open_ui 10)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-accounting-transaction-salary-full.png`

### `management-accounting-transaction-session` — Accounting Transaction Session
- route: `/management/accounting/transaction/session`  ·  modules: Payments / Invoices, Wallet / Finance
- sections/headings: 0, 0, 0, Teacher, 0.00 EUR, Student, 0.00 EUR, Total Profit, 0.00 EUR, Filters, Transaction
- cards/KPIs: 0
- table (1 rows): #, Student Name, Family, Teacher Name, Admin Date, Duration, Student, Teacher, Profit, Status
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting/transaction/session` fields: filter, date, teacher_id, student_id, family_id, duration
- modal: **Currency Rates** [modal/static+opened]
- filters: teacher_id, student_id, family_id, duration
- tabs: Sessions invoices Salary
- buttons: 17 (mutating 3, submit 1, nav 2, open_ui 11)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-accounting-transaction-session-full.png`

### `management-accounting-transaction-session-status-attend` — Accounting Transaction Session Status Attend
- route: `/management/accounting/transaction/session`  ·  modules: Payments / Invoices, Wallet / Finance
- sections/headings: 0, 0, 0, Teacher, 0.00 EUR, Student, 0.00 EUR, Total Profit, 0.00 EUR, Filters, Transaction
- cards/KPIs: 0
- table (1 rows): #, Student Name, Family, Teacher Name, Admin Date, Duration, Student, Teacher, Profit, Status
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting/transaction/session` fields: filter, date, teacher_id, student_id, family_id, duration
- modal: **Currency Rates** [modal/static+opened]
- filters: teacher_id, student_id, family_id, duration
- tabs: Sessions invoices Salary
- buttons: 17 (mutating 3, submit 1, nav 2, open_ui 11)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-accounting-transaction-session-status-attend-full.png`

### `management-accounting-transaction-session-status-student-absent` — Accounting Transaction Session Status Student Absent
- route: `/management/accounting/transaction/session`  ·  modules: Payments / Invoices, Wallet / Finance
- sections/headings: 0, 0, 0, Teacher, 0.00 EUR, Student, 0.00 EUR, Total Profit, 0.00 EUR, Filters, Transaction
- cards/KPIs: 0
- table (1 rows): #, Student Name, Family, Teacher Name, Admin Date, Duration, Student, Teacher, Profit, Status
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting/transaction/session` fields: filter, date, teacher_id, student_id, family_id, duration
- modal: **Currency Rates** [modal/static+opened]
- filters: teacher_id, student_id, family_id, duration
- tabs: Sessions invoices Salary
- buttons: 17 (mutating 3, submit 1, nav 2, open_ui 11)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-accounting-transaction-session-status-student-absent-full.png`

### `management-accounting-transaction-session-status-teacher-absent` — Accounting Transaction Session Status Teacher Absent
- route: `/management/accounting/transaction/session`  ·  modules: Payments / Invoices, Wallet / Finance
- sections/headings: 0, 0, 0, Teacher, 0.00 EUR, Student, 0.00 EUR, Total Profit, 0.00 EUR, Filters, Transaction
- cards/KPIs: 0
- table (1 rows): #, Student Name, Family, Teacher Name, Admin Date, Duration, Student, Teacher, Profit, Status
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting/transaction/session` fields: filter, date, teacher_id, student_id, family_id, duration
- modal: **Currency Rates** [modal/static+opened]
- filters: teacher_id, student_id, family_id, duration
- tabs: Sessions invoices Salary
- buttons: 17 (mutating 3, submit 1, nav 2, open_ui 11)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-accounting-transaction-session-status-teacher-absent-full.png`

### `management-analysis-invoices` — Analysis Invoices
- route: `/management/analysis-invoices`  ·  modules: Payments / Invoices
- sections/headings: invoices, Total Before Discount, 0.00 AED, Total After Discount, 0.00 AED, Discount, 0.00 AED, Paid, 0.00 AED, UnPaid, 0.00 AED, Overdue, 0.00 AED, Total Invoices by Month
- cards/KPIs: invoices, Total Before Discount, Total After Discount, Discount, Paid, UnPaid, Overdue, Total Invoices by Month, Cumulative Total of Invoices by Date, Families
- table (1 rows): #, Family name, Paid, Due, Overdue
- form `get /management/analysis-invoices` fields: status[], status[], status[], date
- tabs: Profit and Losses invoices
- buttons: 13 (mutating 2, submit 1, nav 2, open_ui 8)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create
- screenshot: `output/roles/admin/screenshots/management-analysis-invoices-full.png`

### `management-downlaod` — Downlaod
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-downlaod-full.png`

### `management-downlaod-date-2026-06-01-to-2026-06-30` — Downlaod Date 2026 06 01 To 2026 06 30
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-date-2026-06-01-to-2026-06-30-full.png`

### `management-downlaod-date-2026-06-01-to-2026-06-30-date-type-date-payment-status` — Downlaod Date 2026 06 01 To 2026 06 30 Date Type Date Payment Status
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-date-2026-06-01-to-2026-06-30-date-type-date-payment-status-full.png`

### `management-downlaod-date-2026-06-01-to-2026-06-30-date-type-due-date-status-unpa` — Downlaod Date 2026 06 01 To 2026 06 30 Date Type Due Date Status Unpa
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-date-2026-06-01-to-2026-06-30-date-type-due-date-status-unpa-full.png`

### `management-downlaod-status-all` — Downlaod Status All
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-status-all-full.png`

### `management-downlaod-status-paid` — Downlaod Status Paid
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-status-paid-full.png`

### `management-downlaod-status-softdelete` — Downlaod Status Softdelete
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-status-softdelete-full.png`

### `management-downlaod-status-unpaid` — Downlaod Status Unpaid
- route: `/management/downlaod`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 15 (mutating 4, submit 1, nav 4, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-downlaod-status-unpaid-full.png`

### `management-invoices` — Invoices
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: All Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-full.png`

### `management-invoices-create-parent-invoice-1` — Invoices Create Parent Invoice 1
- route: `/management/invoices/create-parent-invoice/{id}`  ·  modules: Payments / Invoices
- sections/headings: Invoice To:, Bill To:, Courses, Discount Options
- cards/KPIs: Invoice To:
- table (3 rows): Total Due:, EUR 30.90
- table (2 rows): Start Date, Serial, Item, Student, Price
- form `post /management/invoices` fields: redirect_to, serial, due_date, family_id, course_id[], price, discount, fees, additional, adjustment_type, adjustment_value, adjustment_count, note, paymentMethod, sendMessage
- filters: adjustment_type, paymentMethod
- buttons: 12 (mutating 6, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-create-parent-invoice-1-full.png`

### `management-invoices-create-parent-invoice-2` — Invoices Create Parent Invoice 2
- route: `/management/invoices/create-parent-invoice/{id}`  ·  modules: Payments / Invoices
- sections/headings: Invoice To:, Bill To:, Courses, Discount Options
- cards/KPIs: Invoice To:
- table (3 rows): Total Due:, GBP 0.00
- table (1 rows): Start Date, Serial, Item, Student, Price
- form `post /management/invoices` fields: redirect_to, serial, due_date, family_id, price, discount, fees, additional, adjustment_type, adjustment_value, adjustment_count, note, paymentMethod, sendMessage
- filters: adjustment_type, paymentMethod
- buttons: 11 (mutating 5, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-create-parent-invoice-2-full.png`

### `management-invoices-date-2026-06-01-to-2026-06-30` — Invoices Date 2026 06 01 To 2026 06 30
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: All Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families
- screenshot: `output/roles/admin/screenshots/management-invoices-date-2026-06-01-to-2026-06-30-full.png`

### `management-invoices-date-2026-06-01-to-2026-06-30-status-paid-date-type-date-pay` — Invoices Date 2026 06 01 To 2026 06 30 Status Paid Date Type Date Pay
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Paid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families
- screenshot: `output/roles/admin/screenshots/management-invoices-date-2026-06-01-to-2026-06-30-status-paid-date-type-date-pay-full.png`

### `management-invoices-date-2026-06-01-to-2026-06-30-status-unpaid-date-type-due-da` — Invoices Date 2026 06 01 To 2026 06 30 Status Unpaid Date Type Due Da
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Unpaid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families
- screenshot: `output/roles/admin/screenshots/management-invoices-date-2026-06-01-to-2026-06-30-status-unpaid-date-type-due-da-full.png`

### `management-invoices-status-all` — Invoices Status All
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: All Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-invoices-status-all-full.png`

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type` — Invoices Status All Date 2026 06 01 To 2026 06 30 Date Type
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: All Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-full.png`

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-date-paym` — Invoices Status All Date 2026 06 01 To 2026 06 30 Date Type Date Paym
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: All Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-date-paym-full.png`

### `management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-due-date` — Invoices Status All Date 2026 06 01 To 2026 06 30 Date Type Due Date
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: All Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-all-date-2026-06-01-to-2026-06-30-date-type-due-date-full.png`

### `management-invoices-status-paid` — Invoices Status Paid
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Paid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-invoices-status-paid-full.png`

### `management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type` — Invoices Status Paid Date 2026 06 01 To 2026 06 30 Date Type
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Paid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type-full.png`

### `management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type-due-date` — Invoices Status Paid Date 2026 06 01 To 2026 06 30 Date Type Due Date
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Paid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-paid-date-2026-06-01-to-2026-06-30-date-type-due-date-full.png`

### `management-invoices-status-softdelete` — Invoices Status Softdelete
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-invoices-status-softdelete-full.png`

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type` — Invoices Status Softdelete Date 2026 06 01 To 2026 06 30 Date Type
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-full.png`

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-da` — Invoices Status Softdelete Date 2026 06 01 To 2026 06 30 Date Type Da
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-da-full.png`

### `management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-du` — Invoices Status Softdelete Date 2026 06 01 To 2026 06 30 Date Type Du
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Deleted Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-softdelete-date-2026-06-01-to-2026-06-30-date-type-du-full.png`

### `management-invoices-status-unpaid` — Invoices Status Unpaid
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Unpaid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-invoices-status-unpaid-full.png`

### `management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type` — Invoices Status Unpaid Date 2026 06 01 To 2026 06 30 Date Type
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Unpaid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type-full.png`

### `management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type-date-p` — Invoices Status Unpaid Date 2026 06 01 To 2026 06 30 Date Type Date P
- route: `/management/invoices`  ·  modules: Payments / Invoices
- sections/headings: Unpaid Invoices, all invoices, 0, unpaid invoices, 0, paid invoices, 0, Deleted Invoices, 0, Filter
- cards/KPIs: all invoices, unpaid invoices, paid invoices, Deleted Invoices, Filter
- table (1 rows): #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions
- form `get /management/invoices` fields: status, date, date_type, currency, gateway
- form `post /management/accountant/store-transaction` fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway
- modal: **New Transaction** [modal/static] fields: transaction_id, date_payment, basic, additional, taxes, total, currancy, getway
- filters: date_type, currency, gateway, date_payment, currancy, getway
- buttons: 14 (mutating 4, submit 1, nav 4, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-invoices-status-unpaid-date-2026-06-01-to-2026-06-30-date-type-date-p-full.png`

### `management-monthly-invoices` — monthly invoice list
- route: `/management/monthly-invoices`  ·  modules: Payments / Invoices
- sections/headings: Filter, Monthly Invoices
- cards/KPIs: Filter, Monthly Invoices
- table (1 rows): #, Parent, Status
- form `get ` fields: date
- buttons: 9 (mutating 2, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-monthly-invoices-full.png`

### `management-settings-payments-1-edit` — Settings Payments 1 Edit
- route: `/management/settings/payments/{id}/edit`  ·  modules: Payments / Invoices, Settings
- sections/headings: Edit — Custom
- cards/KPIs: Edit — Custom
- form `post /management/settings/payments/{id}` fields: payment_method, name, key1
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-1-edit-full.png`

### `management-settings-payments-create-payment-method-1` — Settings Payments Create Payment Method 1
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — Paypal
- cards/KPIs: Add Payment — Paypal
- form `post /management/settings/payments` fields: payment_method, name, key1, key2, xpay_url, xpay_url
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-1-full.png`

### `management-settings-payments-create-payment-method-2` — Settings Payments Create Payment Method 2
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — Stripe
- cards/KPIs: Add Payment — Stripe
- form `post /management/settings/payments` fields: payment_method, name, key1, key2
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-2-full.png`

### `management-settings-payments-create-payment-method-3` — Settings Payments Create Payment Method 3
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — Custom
- cards/KPIs: Add Payment — Custom
- form `post /management/settings/payments` fields: payment_method, name, key1
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-3-full.png`

### `management-settings-payments-create-payment-method-4` — Settings Payments Create Payment Method 4
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — XPay
- cards/KPIs: Add Payment — XPay
- form `post /management/settings/payments` fields: payment_method, name, key1, key2, key3, xpay_url, xpay_url, xpay_method[], xpay_method[], xpay_method[], xpay_method[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-4-full.png`

### `management-settings-payments-create-payment-method-5` — Settings Payments Create Payment Method 5
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — mollie
- cards/KPIs: Add Payment — mollie
- form `post /management/settings/payments` fields: payment_method, name, key1
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-5-full.png`

### `management-settings-payments-create-payment-method-6` — Settings Payments Create Payment Method 6
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — Payoneer
- cards/KPIs: Add Payment — Payoneer
- form `post /management/settings/payments` fields: payment_method, name, key1, key2, xpay_url, xpay_url
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-6-full.png`

### `management-settings-payments-create-payment-method-7` — Settings Payments Create Payment Method 7
- route: `/management/settings/payments/create`  ·  modules: Payments / Invoices, Settings
- sections/headings: Add Payment — Paymob
- cards/KPIs: Add Payment — Paymob
- form `post /management/settings/payments` fields: payment_method, name, key1, key2, key3, key4, settings[api_key], xpay_url, xpay_url, xpay_url, xpay_url
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-payments-create-payment-method-7-full.png`


## admin · Profile / Account (4 pages)

### `management-profile-edit` — Profile Edit
- route: `/management/profile/edit`  ·  modules: Profile / Account
- cards/KPIs: Name
- form `post /management/profile/edit` fields: onlineImage, image, name, email, username, password
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-profile-edit-full.png`

### `management-profile-show` — Profile Show
- route: `/management/profile/show`  ·  modules: Profile / Account
- sections/headings: Eslam Essam
- cards/KPIs: Eslam Essam
- form `get /management/profile/show` fields: name, email, username, password
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/profile/show
- screenshot: `output/roles/admin/screenshots/management-profile-show-full.png`

### `management-settings-security-data` — Settings Security Data
- route: `/management/settings/security/data`  ·  modules: Profile / Account, Settings
- sections/headings: Backup Settings, Import Data, Upload teachers, Upload families, Upload children, Upload families
- cards/KPIs: Backup Settings, Import Data
- table (10 rows): Column Name, Format / Example
- table (15 rows): Column Name, Format / Example
- table (7 rows): Column Name, Format / Example
- table (7 rows): Column Name, Format / Example
- table (27 rows): Country Code, Country Name
- form `post /management/settings/security/data/import` fields: type, file
- form `post /management/settings/security/data/import` fields: type, file
- form `post /management/settings/security/data/import` fields: type, file
- form `post /management/settings/security/data/import` fields: type, file
- modal: **Country List** [modal/static]
- buttons: 26 (mutating 4, submit 5, nav 6, open_ui 11)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-security-data-full.png`

### `management-settings-security-policy` — Settings Security Policy
- route: `/management/settings/security/policy`  ·  modules: Profile / Account, Settings
- sections/headings: Family Policy, Teacher Policy
- cards/KPIs: Family Policy
- buttons: 35 (mutating 3, submit 1, nav 2, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-security-policy-full.png`


## admin · Reports / Analytics (11 pages)

### `management-forms` — Forms
- route: `/management/forms`  ·  modules: Reports / Analytics
- sections/headings: Forms
- table (1 rows): #, Form Title, Questions, Responses, Default, Status, Created at, Actions
- form `post /management/forms/colors/update` fields: form_id
- modal: **schema color** [modal/static]
- buttons: 13 (mutating 4, submit 1, nav 3, open_ui 5)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/family/feedback-categories
- screenshot: `output/roles/admin/screenshots/management-forms-full.png`

### `management-forms-create` — Forms Create
- route: `/management/forms/create`  ·  modules: Reports / Analytics
- sections/headings: Add
- cards/KPIs: Add
- form `post /management/forms` fields: form_name, day, fields[1][label], fields[1][type], fields[1][options][], fields[1][is_required], fields[1][is_required]
- filters: day, fields[1][type]
- buttons: 13 (mutating 7, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-forms-create-full.png`

### `management-new-requests` — New Requests
- route: `/management/new-requests`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Duplicated, Converted, Male Teachers Requested, Avg. Scheduling Time, Total Teachers, Fastest Scheduling
- form `get /management/new-requests` fields: date_range, status
- buttons: 10 (mutating 3, submit 1, nav 3, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, POST /management/chat/loadMoreChats
- screenshot: `output/roles/admin/screenshots/management-new-requests-full.png`

### `management-new-requests-filter-contacting-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Contacting Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/contacting`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/CONTACTING` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-contacting-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-filter-duplicat-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Duplicat Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/duplicat`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/DUPLICAT` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-duplicat-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-filter-no-response-date-range-2026-06-01-to-2026-06-30` — New Requests Filter No Response Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/no_response`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/NO_RESPONSE` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-no-response-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-filter-pending-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Pending Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/pending`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/PENDING` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-pending-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-filter-qualified-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Qualified Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/qualified`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/QUALIFIED` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-qualified-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-filter-trial-missed-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Trial Missed Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/trial_missed`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/TRIAL_MISSED` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-trial-missed-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-filter-trial-taken-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Trial Taken Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/trial_taken`  ·  modules: Reports / Analytics
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/TRIAL_TAKEN` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-trial-taken-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-teacher-feedback-feedback-teacher-id-1-year-2026` — Teacher Feedback Feedback Teacher Id 1 Year 2026
- route: `/management/teacher-feedback/feedback`  ·  modules: Reports / Analytics, Teachers
- cards/KPIs: Teachers
- form `get /management/teacher-feedback/feedback` fields: teacher_id, year
- filters: teacher_id
- buttons: 10 (mutating 2, submit 1, nav 3, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teacher-feedback-feedback-teacher-id-1-year-2026-full.png`


## admin · Roles / Permissions (2 pages)

### `management-admins-permission-6` — Admins Permission 6
- route: `/management/admins/permission/{id}`  ·  modules: Roles / Permissions, Teachers
- sections/headings: Set Permissions for staff member
- cards/KPIs: Set Permissions for staff member 170/170 permissions selected
- form `post /management/admins/permission/store` fields: userID, permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[]
- buttons: 29 (mutating 3, submit 1, nav 2, open_ui 23)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/create, GET /management/admins/permission/{id}, GET /management/all/teachers/timetable, GET /management/analysis-course
- screenshot: `output/roles/admin/screenshots/management-admins-permission-6-full.png`

### `management-admins-permission-7` — Admins Permission 7
- route: `/management/admins/permission/{id}`  ·  modules: Roles / Permissions, Teachers
- sections/headings: Set Permissions for staff member
- cards/KPIs: Set Permissions for staff member 170/170 permissions selected
- form `post /management/admins/permission/store` fields: userID, permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[], permisions[]
- buttons: 29 (mutating 3, submit 1, nav 2, open_ui 23)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-admins-permission-7-full.png`


## admin · Settings (15 pages)

### `management-settings-customisation-personalisation` — Settings Customisation Personalisation
- route: `/management/settings/customisation/personalisation`  ·  modules: Settings
- sections/headings: Personalisation
- cards/KPIs: Personalisation
- form `post /management/settings/customisation/personalisation` fields: color_scheme, secondary_color_scheme, theme, theme, theme, container_layout, container_layout, sidebar_type, sidebar_type, card_style, card_style, class_statuses_colors[pending], class_statuses_colors[waiting], class_statuses_colors[teacher-absent], class_statuses_colors[student-absent], class_statuses_colors[teacher-cancel], class_statuses_colors[student-cancel], class_statuses_colors[admin-cancel]
- buttons: 14 (mutating 3, submit 4, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-customisation-personalisation-full.png`

### `management-settings-general` — Settings General
- route: `/management/settings/general`  ·  modules: Settings
- sections/headings: General, Location
- cards/KPIs: General, Hour Rates, Courses, Accessibility
- form `post /management/settings/general/update` fields: company_name, company_name_ar, domain, email_info, phone, whatsapp, logo, country_id, city, timezone, address
- form `post /management/settings/general/teachers/update` fields: settings_data[1], salary_period_type, salary_period_day, applayFins, fin[10]
- form `post /management/settings/general/courses-classes/update` fields: new_course_status, renew, stop_after, send_plan_report, send_plan_report, teacher_cancel_enable, student_cancel_enable, auto_makeup, auto_add_makeup_to_credit, auto_add_no_makeup_to_credit, classes_not_closed, classes_not_closed_hours, teacher_cancel_before_class, student_cancel_before_class, teacher_absent_student, rate_student_absent, show_enter_btn, teacher_can_edit_class
- form `post /management/settings/general/accessibility/update` fields: tfa, otp
- filters: country_id, city, timezone, salary_period_type, salary_period_day, new_course_status, renew, auto_makeup, classes_not_closed, teacher_can_edit_class
- tabs: General Teachers Courses & Classes Acces, General, Teachers, Courses & Classes, Accessibility, General Company Name Arabic Company Name, General Company Name Arabic Company Name, Hour Rates Control how teachers performa, Courses Control courses behaviours & set, Accessibility Define the accessibility s
- buttons: 21 (mutating 9, submit 1, nav 2, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-general-full.png`

### `management-settings-integrations` — Settings Integrations
- route: `/management/settings/integrations`  ·  modules: Settings
- sections/headings: Integrations, Payments (incoming), Stripe, Paypal, Mollie, Xpay, Payoneer, Paymob, Custom, Payouts (outgoing), Paymob Payout, Payoneer Payout, Communications, Whatsapp (Free)
- cards/KPIs: Integrations, Stripe, Paypal, Mollie, Xpay, Payoneer, Paymob, Custom, Paymob Payout, Payoneer Payout, Whatsapp (Free), Email
- buttons: 19 (mutating 2, submit 1, nav 13, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests, GET /management/chat
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-full.png`

### `management-settings-integrations-1-configure` — Settings Integrations 1 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Whatsapp (Free)
- cards/KPIs: Whatsapp (Free), WhatsApp Setup Wizard, Caution, Free Whatsapp Status
- filters: send_group
- tabs: current step: 1 Phone number, 2 Pairing Code, 3 Finishing Setup, 4 Success!
- buttons: 22 (mutating 6, submit 2, nav 4, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-1-configure-full.png`

### `management-settings-integrations-10-configure` — Settings Integrations 10 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Custom, Custom
- cards/KPIs: Custom, Custom
- table (1 rows): #, Name, Number Of Family, Key 1, Key 2, Settings
- form `post /management/settings/payments/{id}` fields: (no named fields)
- buttons: 10 (mutating 3, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-10-configure-full.png`

### `management-settings-integrations-11-configure` — Settings Integrations 11 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Email
- cards/KPIs: Email, Active
- table (1 rows): #, Email Address, Default, Status, Settings
- form `post /management/settings/email-accounts` fields: smtp_host, smtp_port, smtp_encryption, email_address, smtp_username, smtp_password, is_active, is_active, is_default, is_default
- form `post /management/settings/email-accounts/settings` fields: smtp_host, smtp_port, smtp_encryption
- filters: smtp_encryption
- tabs: Accounts Add Account Mail Settings, Accounts, Add Account, Mail Settings, Add Email Account # Email Address Defaul, Add Email Account # Email Address Defaul, Email Address * SMTP Username * SMTP Pas, SMTP Host * SMTP Port * SMTP Encryption 
- ⚠ unsafe-skipped: Add Account
- buttons: 15 (mutating 6, submit 1, nav 2, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-11-configure-full.png`

### `management-settings-integrations-2-configure` — Settings Integrations 2 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Stripe, Stripe
- cards/KPIs: Stripe, Stripe
- table (1 rows): #, Name, Number Of Family, Key 1, Key 2, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-2-configure-full.png`

### `management-settings-integrations-3-configure` — Settings Integrations 3 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Paypal, Paypal
- cards/KPIs: Paypal, Paypal
- table (1 rows): #, Name, Number Of Family, Client ID, Client Secret, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-3-configure-full.png`

### `management-settings-integrations-4-configure` — Settings Integrations 4 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Mollie, mollie
- cards/KPIs: Mollie, mollie
- table (1 rows): #, Name, Number Of Family, Key 1, Key 2, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-4-configure-full.png`

### `management-settings-integrations-5-configure` — Settings Integrations 5 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Xpay, XPay
- cards/KPIs: Xpay, XPay
- table (1 rows): #, Name, Number Of Family, Key 1, Key 2, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-5-configure-full.png`

### `management-settings-integrations-6-configure` — Settings Integrations 6 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Payoneer, Payoneer
- cards/KPIs: Payoneer, Payoneer
- table (1 rows): #, Name, Number Of Family, Key 1, Key 2, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-6-configure-full.png`

### `management-settings-integrations-7-configure` — Settings Integrations 7 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Paymob, Paymob
- cards/KPIs: Paymob, Paymob
- table (1 rows): #, Name, Number Of Family, Key 1, Key 2, Settings
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-7-configure-full.png`

### `management-settings-integrations-8-configure` — Settings Integrations 8 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Paymob Payout provider
- cards/KPIs: Webhook URL
- form `post /management/payout-providers/{id}` fields: mode, is_active, key1, key2, key3, key4
- filters: mode
- buttons: 10 (mutating 3, submit 1, nav 3, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-8-configure-full.png`

### `management-settings-integrations-9-configure` — Settings Integrations 9 Configure
- route: `/management/settings/integrations/{id}/configure`  ·  modules: Settings
- sections/headings: Payoneer Payout provider
- cards/KPIs: Webhook URL
- form `post /management/payout-providers/{id}` fields: mode, is_active, key1, key2, key3
- filters: mode
- buttons: 10 (mutating 3, submit 1, nav 3, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-9-configure-full.png`

### `management-settings-security-data-backup-send` — Settings Security Data Backup Send
- route: `/management/settings/security/data/backup/send`  ·  modules: Settings, Profile / Account, Reports / Analytics
- sections/headings: Email
- cards/KPIs: Email, Active
- table (1 rows): #, Email Address, Default, Status, Settings
- form `post /management/settings/email-accounts` fields: smtp_host, smtp_port, smtp_encryption, email_address, smtp_username, smtp_password, is_active, is_active, is_default, is_default
- form `post /management/settings/email-accounts/settings` fields: smtp_host, smtp_port, smtp_encryption
- filters: smtp_encryption
- tabs: Accounts Add Account Mail Settings, Accounts, Add Account, Mail Settings, Add Email Account # Email Address Defaul, Add Email Account # Email Address Defaul, Email Address * SMTP Username * SMTP Pas, SMTP Host * SMTP Port * SMTP Encryption 
- ⚠ unsafe-skipped: Add Account
- buttons: 16 (mutating 6, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-settings-security-data-backup-send-full.png`


## admin · Students (19 pages)

### `management-analysis-course` — Analysis Course
- route: `/management/analysis-course`  ·  modules: Students, Courses
- sections/headings: Course Statistics, All students has course, 1, Total Number of Teachers per Course, 1, Number of Students per Course, Number of Students & Teachers per Course, Number of Students & Teachers per Studen
- cards/KPIs: Course Statistics, Select date range..., Choose course, All students has course, Total Number of Teachers per Course, Number of Students per Course, Number of Students & Teachers per Course, Number of Students & Teachers per Student Language
- tabs: General Student Statistics Course Statis
- buttons: 12 (mutating 3, submit 1, nav 2, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families
- screenshot: `output/roles/admin/screenshots/management-analysis-course-full.png`

### `management-analysis-student` — Analysis Student
- route: `/management/analysis-student`  ·  modules: Students
- sections/headings: Student Statistics, All students has course, 2, Students with Courses, 1, Students with Trial, 1, Stopped Students, 0, Students without Courses, 1, Students Per Month, Students by Age Group, Students by Language
- cards/KPIs: Student Statistics, All students has course, Students with Courses, Students with Trial, Stopped Students, Students without Courses, Students Per Month, Students by Age Group, Students by Language, Students by Status, Students by Gender, Students by Country, Students by Country — Map
- tabs: General Student Statistics Course Statis
- buttons: 12 (mutating 2, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback
- screenshot: `output/roles/admin/screenshots/management-analysis-student-full.png`

### `management-forms-students` — Forms Students
- route: `/management/forms/students`  ·  modules: Students
- sections/headings: List of Students, List of Students
- cards/KPIs: List of Students, List of Students
- table (0 rows): #, Student Name, Parent name, Teacher, has report
- form `get /management/forms/students` fields: teacher_id, student_id, has_report
- form `get ` fields: (no named fields)
- form `post /teacher/student-progress` fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus, homework_completion, homework_completion, homework_completion, homework_completion, punctuality, punctuality, punctuality, punctuality
- modal: **Student Timetable** [modal/static]
- modal: **Send Report** [modal/static] fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus
- filters: teacher_id, student_id, has_report, month
- buttons: 13 (mutating 3, submit 1, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-forms-students-full.png`

### `management-student` — Student
- route: `/management/student`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Students
- table (2 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- buttons: 12 (mutating 2, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show
- screenshot: `output/roles/admin/screenshots/management-student-full.png`

### `management-student-1` — Student 1
- route: `/management/student/{id}`  ·  modules: Students
- sections/headings: محمد احمد abdo ahmed, List of Courses
- cards/KPIs: محمد احمد abdo ahmed, List of Courses, List of Courses, المعلم محمد صادق صادق, List of Trials, Family Members, Total Report, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message
- table (1 rows): Serial, Start Date, Teacher, Material, Total Hours, Status, Certificates, Actions
- table (0 rows): #, certificate, Options
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- table (1 rows): Date & Time (Student tim, Teacher Name, Course Name/Dur, Status, History, Settings
- table (0 rows): Student, Status, Teacher Name, course details, Subscription, Options
- table (1 rows): #, Month, Teacher Name, Course Name, View, Delete, Edit, Approve
- form `post /management/upload-certificate` fields: fileInput, student_id, course_id
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/courses/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, criteria[teacher_id], criteria[material_id], scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- form `post /management/upload-certificate` fields: fileInput, student_id, course_id
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Schedule Cancel Classes** [modal/static] fields: scheduled_date, criteria[cancel_type], criteria[cancel_type], criteria[cancel_type], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], note
- modal: **Certificate Details** [modal/static]
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- modal: **Schedule Stop Student** [modal/static] fields: scheduled_date, returned_at, schedule_auto_return, note
- modal: **Stop Student** [modal/static] fields: note
- modal: **Suspend Student** [modal/static] fields: date, schedule_return, note
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, teacher, accounting_statement
- modal: **Certificate Information** [modal/static] fields: student_name, teacher_name, description, date_certificate, pdfcertificat_id
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time
- filters: invoice, status, duration, credit, teacher, accounting_statement, duration, teacher, accounting_statement, pdfcertificat_id, level, remark, absent_by, duration
- tabs: Courses Trials Siblings monthly plan, Courses, Trials, Siblings, monthly plan, List of Courses Serial Start Date Teache, List of Courses Serial Start Date Teache, List of Trials Date & Time (Student time, Family Members Add Sibling Student Statu, Total Report # Month Teacher Name Course, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S
- buttons: 99 (mutating 34, submit 1, nav 3, open_ui 61)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-1-full.png`

### `management-student-1-create` — Student 1 Create
- route: `/management/student/{id}/create`  ·  modules: Students
- sections/headings: Student Information
- cards/KPIs: Student Information
- form `post /management/student/{id}/store` fields: name, name_ar, language, gender, birth_date, teacher_note, admin_note, hasTrial, material, teacher_id, duration, accounting_statement, date, time
- filters: language, gender, material, teacher_id, duration, accounting_statement
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-student-1-create-full.png`

### `management-student-1-edit` — Student 1 Edit
- route: `/management/student/{id}/edit`  ·  modules: Students
- sections/headings: Student Information
- cards/KPIs: Student Information
- form `post /management/student/{id}/update` fields: name, name_ar, language, gender, birth_date, teacher_note, admin_note
- filters: language, gender
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-1-edit-full.png`

### `management-student-1-trial-create` — Student 1 Trial Create
- route: `/management/student/{id}/trial/create`  ·  modules: Students
- sections/headings: Trial
- cards/KPIs: Trial
- form `post /management/student/{id}/trial/store` fields: student_id, studies_ages, studies_ages, studies_ages, material_id, duration, accounting_statement, date, time, teacher_id
- filters: student_id, material_id, duration, accounting_statement, teacher_id
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-student-1-trial-create-full.png`

### `management-student-2` — Student 2
- route: `/management/student/{id}`  ·  modules: Students
- sections/headings: منار حسن الطالبة لمار حسن
- cards/KPIs: منار حسن الطالبة لمار حسن, Family Members, Total Report, Mark as attend (no class details will send), Mark as attend (with class details), Class Remark *, Teacher, Student(s), Don't send, Send Default Message, Send Custom Message, Date, Send Notification, Send Notification
- table (0 rows): #, certificate, Options
- table (1 rows): Student, Teacher, Duration, Week Days, Time, Week Days, Time
- table (0 rows): Student, Status, Teacher Name, course details, Subscription, Options
- table (1 rows): #, Month, Teacher Name, Course Name, View, Delete, Edit, Approve
- form `post /management/management/members/invoice` fields: course_id, invoice
- form `post /management/courses/{id}/update_status` fields: course_id, status
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, credit, teacher, accounting_statement
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/scheduled-actions` fields: action_type, target_id, back, scheduled_date, returned_at, schedule_auto_return, note
- form `post /management/student/{id}/stop` fields: note
- form `post /management/student/{id}/stop` fields: date, schedule_return, note
- form `post /management/courseClasses/add-classes` fields: course_id, date, time, duration, teacher, accounting_statement
- form `post /management/create-certificate` fields: teacher_id, student_id, course_id, student_name, teacher_name, description, date_certificate, pdfcertificat_id
- form `post /` fields: class_id, level, text
- form `post /` fields: class_id, markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- form `post /` fields: class_id, wa_message, send_teacher, send_student
- modal: **Certificate Details** [modal/static]
- modal: **All Invoice For This Parent** [modal/static] fields: invoice
- modal: **Student Timetable** [modal/static]
- modal: **Change Course Status** [modal/static] fields: status
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, credit, teacher, accounting_statement
- modal: **Schedule Stop Student** [modal/static] fields: scheduled_date, returned_at, schedule_auto_return, note
- modal: **Stop Student** [modal/static] fields: note
- modal: **Suspend Student** [modal/static] fields: date, schedule_return, note
- modal: **Add Lesson Student Timezone** [modal/static] fields: date, time, duration, teacher, accounting_statement
- modal: **Certificate Information** [modal/static] fields: student_name, teacher_name, description, date_certificate, pdfcertificat_id
- modal: **Add Quick Queue** [modal/static] fields: level, text
- modal: **Mark as attend** [modal/static] fields: markAsAttend, markAsAttend, remark, summary, homework, notes, images[]
- modal: **Send Whatsapp Message** [modal/static] fields: wa_message, send_teacher, send_student
- modal: **Mark As Absent** [modal/static] fields: absent_by, note, sendMessage, sendMessage, sendMessage, message, add_to_credit, cancelTzType, cancelTzType, date
- modal: **Edit Class** [modal/static] fields: date, time, sendMessage, duration, teacher_id, accounting_statement
- modal: **Cancel Class** [modal/static] fields: cancel_by, note, sendMessage, add_to_credit, cancelTzType, cancelTzType, date, time
- modal: **Add Feedback** [modal/static]
- modal: **Approve** [modal/static] fields: YYYY-MM-DD, Write notes: date,notes and etc
- filters: invoice, status, duration, credit, teacher, accounting_statement, duration, teacher, accounting_statement, pdfcertificat_id, level, remark, absent_by, duration
- tabs: Courses Trials Siblings monthly plan, Courses, Trials, Siblings, monthly plan, Certificate Details # certificate Option, Certificate Details # certificate Option, Family Members Add Sibling Student Statu, Total Report # Month Teacher Name Course, No Make-up, Auto Make-up class, Reschedule class to another time, Add to Credit Auto Make-up class Using S, Add to Credit
- buttons: 87 (mutating 30, submit 1, nav 3, open_ui 53)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-2-full.png`

### `management-student-2-create` — Student 2 Create
- route: `/management/student/{id}/create`  ·  modules: Students
- sections/headings: Student Information
- cards/KPIs: Student Information
- form `post /management/student/{id}/store` fields: name, name_ar, language, gender, birth_date, teacher_note, admin_note, hasTrial, material, teacher_id, duration, accounting_statement, date, time
- filters: language, gender, material, teacher_id, duration, accounting_statement
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-student-2-create-full.png`

### `management-student-2-edit` — Student 2 Edit
- route: `/management/student/{id}/edit`  ·  modules: Students
- sections/headings: Student Information
- cards/KPIs: Student Information
- form `post /management/student/{id}/update` fields: name, name_ar, language, gender, birth_date, teacher_note, admin_note
- filters: language, gender
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-2-edit-full.png`

### `management-student-2-trial-create` — Student 2 Trial Create
- route: `/management/student/{id}/trial/create`  ·  modules: Students
- sections/headings: Trial
- cards/KPIs: Trial
- form `post /management/student/{id}/trial/store` fields: student_id, studies_ages, studies_ages, studies_ages, material_id, duration, accounting_statement, date, time, teacher_id
- filters: student_id, material_id, duration, accounting_statement, teacher_id
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-student-2-trial-create-full.png`

### `management-student-status-0` — Student Status 0
- route: `/management/student/status/{id}`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Students
- table (0 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-0-full.png`

### `management-student-status-1` — Student Status 1
- route: `/management/student/status/{id}`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Inactive Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Inactive Students
- table (0 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-1-full.png`

### `management-student-status-2` — Student Status 2
- route: `/management/student/status/{id}`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Trial Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Trial Students
- table (0 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-2-full.png`

### `management-student-status-3` — Student Status 3
- route: `/management/student/status/{id}`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Students
- table (2 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- form `post /management/student/{id}/delete` fields: (no named fields)
- form `post /management/student/{id}/delete` fields: (no named fields)
- buttons: 12 (mutating 2, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-3-full.png`

### `management-student-status-4` — Student Status 4
- route: `/management/student/status/{id}`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Suspended Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Suspended Students
- table (0 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-4-full.png`

### `management-student-status-6` — Student Status 6
- route: `/management/student/status/{id}`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Stopped Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Stopped Students
- table (0 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-6-full.png`

### `management-student-status-softdelete` — Student Status Softdelete
- route: `/management/student/status/softdelete`  ·  modules: Students
- sections/headings: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Students, #, Student Name, Parent name, Timezone, Whatsapp Group, Language
- cards/KPIs: 2 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Students
- table (0 rows): #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-student-status-softdelete-full.png`


## admin · Teachers (88 pages)

### `management-admins` — Admins
- route: `/management/admins`  ·  modules: Teachers
- sections/headings: Staff Members, Eslam Essam, mohamed
- cards/KPIs: Staff Members
- table (2 rows): Name, User Name, Phone number, Role, Actions
- form `post /management/admins/{id}` fields: (no named fields)
- form `post /management/admins/{id}` fields: (no named fields)
- form `post /management/admins/{id}` fields: (no named fields)
- form `post /management/admins/{id}` fields: (no named fields)
- buttons: 13 (mutating 3, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-admins-full.png`

### `management-admins-6-edit` — Edit
- route: `/management/admins/{id}/edit`  ·  modules: Teachers, Dashboard / Home
- form `post /management/admins/{id}` fields: name, email, username, phone, password, salary, currency, role, status, enable
- filters: currency, role, status, enable
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/permission/{id}, GET /management/admins/{id}/edit
- screenshot: `output/roles/admin/screenshots/management-admins-6-edit-full.png`

### `management-admins-7-edit` — Edit
- route: `/management/admins/{id}/edit`  ·  modules: Teachers, Dashboard / Home
- form `post /management/admins/{id}` fields: name, email, username, phone, password, salary, currency, role, status, enable
- filters: currency, role, status, enable
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-admins-7-edit-full.png`

### `management-admins-appear-6` — Admins Appear 6
- route: `/management/admins/appear/{id}`  ·  modules: Teachers
- sections/headings: All Activity
- cards/KPIs: All Activity
- form `get /management/admins/appear/{id}` fields: action
- form `get /management/admins/appear/{id}` fields: type, action
- buttons: 18 (mutating 2, submit 1, nav 2, open_ui 13)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/create, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses
- screenshot: `output/roles/admin/screenshots/management-admins-appear-6-full.png`

### `management-admins-appear-7` — Admins Appear 7
- route: `/management/admins/appear/{id}`  ·  modules: Teachers
- sections/headings: All Activity
- cards/KPIs: All Activity
- form `get /management/admins/appear/{id}` fields: action
- form `get /management/admins/appear/{id}` fields: type, action
- buttons: 23 (mutating 2, submit 1, nav 2, open_ui 18)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-admins-appear-7-full.png`

### `management-admins-categories-6` — Admins
- route: `/management/admins/categories/{id}`  ·  modules: Teachers, Dashboard / Home
- cards/KPIs: المشرفه حسناء
- form `post /management/admins/categories/{id}` fields: categories[], categories[], categories[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/permission/{id}, GET /management/all/teachers/timetable
- screenshot: `output/roles/admin/screenshots/management-admins-categories-6-full.png`

### `management-admins-categories-7` — Admins
- route: `/management/admins/categories/{id}`  ·  modules: Teachers, Dashboard / Home
- cards/KPIs: المشرفه حسناء
- form `post /management/admins/categories/{id}` fields: categories[], categories[], categories[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-admins-categories-7-full.png`

### `management-admins-create` — Create
- route: `/management/admins/create`  ·  modules: Teachers, Dashboard / Home
- form `post /management/admins` fields: name, email, username, phone, password, salary, currency, role, status, enable
- filters: currency, role, status, enable
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/create, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices
- screenshot: `output/roles/admin/screenshots/management-admins-create-full.png`

### `management-admins-duplicate-6` — Create
- route: `/management/admins/duplicate/{id}`  ·  modules: Teachers, Dashboard / Home
- form `post /management/admins` fields: source_id, name, email, username, phone, password, salary, currency, role, status, enable
- filters: currency, role, status, enable
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-admins-duplicate-6-full.png`

### `management-admins-duplicate-7` — Create
- route: `/management/admins/duplicate/{id}`  ·  modules: Teachers, Dashboard / Home
- form `post /management/admins` fields: source_id, name, email, username, phone, password, salary, currency, role, status, enable
- filters: currency, role, status, enable
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-admins-duplicate-7-full.png`

### `management-all-teachers-timetable` — All Teachers Timetable
- route: `/management/all/teachers/timetable`  ·  modules: Teachers, Timetable / Schedule
- cards/KPIs: Teachers, 12 AM
- buttons: 16 (mutating 3, submit 1, nav 4, open_ui 8)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/profile/show
- screenshot: `output/roles/admin/screenshots/management-all-teachers-timetable-full.png`

### `management-class-feedback-feedback-teacher-id-1-date-range-2026-06-01-to-2026-06` — Class Feedback Feedback Teacher Id 1 Date Range 2026 06 01 To 2026 06
- route: `/management/class-feedback/feedback`  ·  modules: Teachers, Classes / Live Sessions
- sections/headings: محمد احمد, محمد احمد, محمد احمد, محمد احمد, محمد احمد, محمد احمد
- cards/KPIs: Teachers, محمد احمد, محمد احمد, محمد احمد, محمد احمد, محمد احمد, محمد احمد
- form `get /management/class-feedback/feedback` fields: teacher_id, student_id, user_id, date_range
- filters: teacher_id, student_id, user_id
- buttons: 11 (mutating 3, submit 1, nav 3, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-class-feedback-feedback-teacher-id-1-date-range-2026-06-01-to-2026-06-full.png`

### `management-new-requests-filter-teacher-date-range-2026-06-01-to-2026-06-30` — New Requests Filter Teacher Date Range 2026 06 01 To 2026 06 30
- route: `/management/new-requests/filter/teacher`  ·  modules: Teachers
- sections/headings: New Requests Statistics
- cards/KPIs: New Requests Statistics, Parent, Parent Age, E-mail, Phone number, Gender, Request Date, Course Name, Trial Date, Trial Time, Teacher gender, Number of Classes Per Week, Class Duration, Country
- table (0 rows): #, Date, Parent name, E-mail, Phone number, Status, Actions
- table (1 rows): Name, Age
- table (1 rows): #, Date, Users, All Notes
- form `get /management/new-requests/filter/TEACHER` fields: date_range, status
- form `post ` fields: note
- form `post ` fields: status
- modal: **New Requests** [modal/static]
- modal: **Notes List** [modal/static]
- modal: **Add Notes** [modal/static] fields: note
- modal: **Change Status** [modal/static] fields: status
- filters: status
- buttons: 21 (mutating 8, submit 1, nav 3, open_ui 9)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-filter-teacher-date-range-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-scheduled-trials-completed-date-2026-06-01-to-2026-06-30` — New Requests Scheduled Trials Completed Date 2026 06 01 To 2026 06 30
- route: `/management/new-requests/scheduled-trials/completed`  ·  modules: Teachers
- sections/headings: Trials This Week, Trials This Month, Top Performing Teacher, Recent Trials, Top Teachers This Week
- cards/KPIs: 0 Trials Completed, Trials This Week, Recent Trials, Top Teachers This Week, 👩‍🏫 Teacher Feedback
- table (0 rows): Teacher, Date, Duration, Status, Actions
- table (0 rows): Rank, Teacher, Trials
- form `get /management/new-requests/scheduled-trials/completed` fields: date
- form `get ` fields: class_id, rating, content, source
- form `get ` fields: content
- modal: **Teacher Report** [modal/static]
- filters: source
- buttons: 20 (mutating 8, submit 3, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-new-requests-scheduled-trials-completed-date-2026-06-01-to-2026-06-30-full.png`

### `management-new-requests-scheduled-trials-completed-status-8-date-2026-06-01-to-2` — New Requests Scheduled Trials Completed Status 8 Date 2026 06 01 To 2
- route: `/management/new-requests/scheduled-trials/completed`  ·  modules: Teachers
- sections/headings: Trials This Week, Trials This Month, Top Performing Teacher, Recent Trials, Top Teachers This Week
- cards/KPIs: 0 Trials Completed, Trials This Week, Recent Trials, Top Teachers This Week, 👩‍🏫 Teacher Feedback
- table (0 rows): Teacher, Date, Duration, Status, Actions
- table (0 rows): Rank, Teacher, Trials
- form `get /management/new-requests/scheduled-trials/completed` fields: date
- form `get ` fields: class_id, rating, content, source
- form `get ` fields: content
- modal: **Teacher Report** [modal/static]
- filters: source
- buttons: 20 (mutating 8, submit 3, nav 3, open_ui 6)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-new-requests-scheduled-trials-completed-status-8-date-2026-06-01-to-2-full.png`

### `management-public-holiday` — Public Holiday
- route: `/management/public-holiday`  ·  modules: Teachers
- sections/headings: Public Holiday Teacher Timezone Set publ, List of Teachers
- cards/KPIs: Public Holiday Teacher Timezone Set public holiday for all teachers or part of t, List of Teachers
- table (1 rows): #, Select All, Teacher Name
- form `post /management/public-holiday-submit` fields: from_date, from_time, to_date, to_time, category_selected[]
- filters: category_selected[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/chat, GET /management/courseClasses/{id}, GET /management/get-helper-data, GET /management/home, GET /management/new-requests, GET /management/new-requests/filter/DUPLICAT, GET /management/profile/show, GET /management/public-holiday, GET /management/sessions_analysis
- screenshot: `output/roles/admin/screenshots/management-public-holiday-full.png`

### `management-settings-integrations-whatsapp-teachers-insights` — Settings Integrations Whatsapp Teachers Insights
- route: `/management/settings/integrations/whatsapp/teachers/insights`  ·  modules: Teachers, Reports / Analytics, Settings
- sections/headings: Names of Null groups, المعلم محمد صادق صادق
- cards/KPIs: Names of Null groups
- table (1 rows): #, Family name, Phone number, Group Name, Status
- buttons: 8 (mutating 2, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-settings-integrations-whatsapp-teachers-insights-full.png`

### `management-teacher-categories` — Teacher Categories
- route: `/management/teacher-categories`  ·  modules: Teachers
- sections/headings: Teacher Categories
- cards/KPIs: Teacher Categories
- table (1 rows): #, Name, Description, Status, Settings
- form `post /management/teacher-categories/{id}` fields: (no named fields)
- form `post /management/teacher-categories/{id}` fields: (no named fields)
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/get-helper-data, GET /management/group/index
- screenshot: `output/roles/admin/screenshots/management-teacher-categories-full.png`

### `management-teacher-categories-1-create-members` — Add Teacher Category Members
- route: `/management/teacher-categories/{id}/create-members`  ·  modules: Teachers
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/teacher-categories/{id}/store-members` fields: member_id[]
- filters: member_id[]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teacher-categories-1-create-members-full.png`

### `management-teacher-categories-1-edit` — Edit Teacher Categories
- route: `/management/teacher-categories/{id}/edit`  ·  modules: Teachers
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/teacher-categories/{id}` fields: name, status, description
- filters: status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teacher-categories-1-edit-full.png`

### `management-teacher-categories-create` — Create Teacher Categories
- route: `/management/teacher-categories/create`  ·  modules: Teachers
- sections/headings: Main information
- cards/KPIs: Main information
- form `post /management/teacher-categories` fields: name, status, description
- filters: status
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teacher-categories-create-full.png`

### `management-teacher-feedback` — Teacher Feedback
- route: `/management/teacher-feedback`  ·  modules: Teachers, Reports / Analytics
- sections/headings: List of Teachers, 1, المعلم محمد صادق صادق, 0
- cards/KPIs: Teachers, List of Teachers
- table (1 rows): #, Teacher Name, Percentage, Note, Action
- table (1 rows): Category, Percentage
- form `get /management/teacher-feedback` fields: teachers[], date_month, date_year
- form `post /management/teacher-feedback/category` fields: category_id, name, description, status
- form `post /management/teacher-feedback` fields: date, teacher_id, feedback_note
- modal: **Add Feedback** [modal/static+opened] fields: name, description, status
- modal: **Deactive Categories** [modal/static+opened]
- modal: **Add Feedback** [modal/static] fields: feedback_note
- filters: date_month, status
- buttons: 23 (mutating 6, submit 1, nav 3, open_ui 13)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/family/feedback-categories
- screenshot: `output/roles/admin/screenshots/management-teacher-feedback-full.png`

### `management-teachers` — Teachers
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/get-helper-data, GET /management/group/index
- screenshot: `output/roles/admin/screenshots/management-teachers-full.png`

### `management-teachers-1` — Teachers 1
- route: `/management/teachers/{id}`  ·  modules: Teachers
- sections/headings: T., المعلم محمد صادق صادق, Active, List of Students, Left Students, Acquired Students
- cards/KPIs: T., List of Students, Left Students, Acquired Students, Monthly Classes, Type, محمد احمد abdo ahmed, 12 AM, Compensations, Class Deductions, Update Location, Preferences, Capabilities, Profile Notifications
- table (1 rows): Student Name, Status, Course Name, Course Status, Subscription
- table (1 rows): Student Name, Status, Course Name, Course Status, Teacher
- table (1 rows): Student Name, Status, Course Name, Course Status, Teacher
- table (6 rows): Date & Time, Student, Course & Duration, Paid, Status
- table (2 rows): Month, Year, Amount, Type, Action
- table (1 rows): Date, Amount, Type, Action
- table (1 rows): Date, Fixed, Classes, Hours, Fine, Gift, Total:, Status, Actions
- table (4 rows): Categorization, WhatsApp, E-mail
- form `get /management/teacher-on-vacation/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/deactivate` fields: fragment_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `get /management/teachers/{id}` fields: type, date_range
- form `post /management/teachers/{id}/compensations/{id}` fields: redirect_to
- form `post /management/teachers/{id}/compensations/{id}` fields: redirect_to
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/compensations/{id}` fields: redirect_to
- form `post /management/teachers/{id}/compensations/{id}` fields: (no named fields)
- form `post /management/teachers/{id}/location/update` fields: country_id, city_id, type, timezone, timezone_diff
- form `post /management/teachers/{id}/preferences/update` fields: language, pw_reset_method, whatsapp_private
- modal: **Details** [modal/static]
- filters: type, country_id, city_id, timezone, language, pw_reset_method, whatsapp_private, can_chat, can_see_library, can_edit_schedule, can_edit_class
- tabs: Home Monthly Classes Schedule Compensati, Home, Monthly Classes, Schedule, Compensations, Salary, Settings, Activity, List of Students Student Name Status Cou, List of Students Student Name Status Cou, Monthly Classes Type All session Trial G, Sat 20 Sun 21 Mon 22 Tue 23 Wed 24 Thu 2, Compensations Add Month Year Amount Type, Date Fixed Classes Hours Fine Gift Total
- buttons: 56 (mutating 20, submit 2, nav 5, open_ui 29)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/certificate-requests
- screenshot: `output/roles/admin/screenshots/management-teachers-1-full.png`

### `management-teachers-1-compensations-1` — Teachers 1 Compensations 1
- route: `/management/teachers/{id}/compensations/{id}`  ·  modules: Teachers
- sections/headings: Compensation, Timeline
- cards/KPIs: Compensation, Timeline
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-1-full.png`

### `management-teachers-1-compensations-1-edit` — Teachers 1 Compensations 1 Edit
- route: `/management/teachers/{id}/compensations/{id}/edit`  ·  modules: Teachers
- sections/headings: Edit Compensation
- cards/KPIs: Edit Compensation
- form `post /management/teachers/{id}/compensations/{id}` fields: type, amount, month, year, description, redirect_to
- filters: type, month, year
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-1-edit-full.png`

### `management-teachers-1-compensations-2` — Teachers 1 Compensations 2
- route: `/management/teachers/{id}/compensations/{id}`  ·  modules: Teachers
- sections/headings: Compensation, Timeline
- cards/KPIs: Compensation, Timeline
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-2-full.png`

### `management-teachers-1-compensations-2-edit` — Teachers 1 Compensations 2 Edit
- route: `/management/teachers/{id}/compensations/{id}/edit`  ·  modules: Teachers
- sections/headings: Edit Compensation
- cards/KPIs: Edit Compensation
- form `post /management/teachers/{id}/compensations/{id}` fields: type, amount, month, year, description, redirect_to
- filters: type, month, year
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-2-edit-full.png`

### `management-teachers-1-compensations-3` — Teachers 1 Compensations 3
- route: `/management/teachers/{id}/compensations/{id}`  ·  modules: Teachers
- sections/headings: Compensation, Timeline
- cards/KPIs: Compensation, Timeline
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-3-full.png`

### `management-teachers-1-compensations-3-edit` — Teachers 1 Compensations 3 Edit
- route: `/management/teachers/{id}/compensations/{id}/edit`  ·  modules: Teachers
- sections/headings: Edit Compensation
- cards/KPIs: Edit Compensation
- form `post /management/teachers/{id}/compensations/{id}` fields: type, amount, month, year, description, redirect_to
- filters: type, month, year
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-3-edit-full.png`

### `management-teachers-1-compensations-create` — Teachers 1 Compensations Create
- route: `/management/teachers/{id}/compensations/create`  ·  modules: Teachers
- sections/headings: Add Compensation
- cards/KPIs: Add Compensation
- form `post /management/teachers/{id}/compensations` fields: type, amount, month, year, description, redirect_to
- filters: type, month, year
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-1-compensations-create-full.png`

### `management-teachers-1-edit` — Teachers 1 Edit
- route: `/management/teachers/{id}/edit`  ·  modules: Teachers
- sections/headings: Main information, Salary information, Zoom information, Additional information, Payout details
- cards/KPIs: Main information
- form `post /management/teachers/{id}` fields: send_info, first_name, last_name, first_name_ar, last_name_ar, email, password, user_name, national_id, phone, alt_phone, member_id[], birth_date, gender, status, group_name, currency, fixed_salary
- filters: member_id[], gender, status, currency, course_id[], payout_method, paymob_issuer, paymob_bank_code
- buttons: 10 (mutating 4, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-1-edit-full.png`

### `management-teachers-create` — Teachers Create
- route: `/management/teachers/create`  ·  modules: Teachers
- sections/headings: Main information, Location information, Salary information, Zoom information, Additional information, Payout details
- cards/KPIs: Main information
- form `post /management/teachers` fields: send_info, first_name, last_name, first_name_ar, last_name_ar, email, password, user_name, national_id, phone, alt_phone, member_id[], birth_date, gender, status, group_name, country_id, city_id
- filters: member_id[], gender, status, country_id, city_id, timezone, currency, course_id[], payout_method, paymob_issuer, paymob_bank_code
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/get-helper-data, GET /management/group/index
- screenshot: `output/roles/admin/screenshots/management-teachers-create-full.png`

### `management-teachers-details` — Teachers Details
- route: `/management/teachers_details`  ·  modules: Teachers
- sections/headings: Teachers, المعلم محمد صادق صادق
- cards/KPIs: Teachers
- table (1 rows): #, Teacher Name, Cancel, Absent, Attend
- form `get /management/teachers_details` fields: date_range, sort_by
- form `post /management/teachers/{id}` fields: (no named fields)
- buttons: 10 (mutating 3, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/families/feedback, GET /management/get-helper-data, GET /management/group/index
- screenshot: `output/roles/admin/screenshots/management-teachers-details-full.png`

### `management-teachers-scope-active` — Teachers Scope Active
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-full.png`

### `management-teachers-scope-active-sort-by-country-sort-direction-asc-page-1` — Teachers Scope Active Sort By Country Sort Direction Asc Page 1
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-country-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1` — Teachers Scope Active Sort By Created At Sort Direction Asc Page 1
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-created-at-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-active-sort-by-first-name-sort-direction-desc-page-1` — Teachers Scope Active Sort By First Name Sort Direction Desc Page 1
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-first-name-sort-direction-desc-page-1-full.png`

### `management-teachers-scope-active-sort-by-phone-sort-direction-asc-page-1` — Teachers Scope Active Sort By Phone Sort Direction Asc Page 1
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-phone-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-active-sort-by-status-sort-direction-asc-page-1` — Teachers Scope Active Sort By Status Sort Direction Asc Page 1
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-status-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-active-sort-by-students-count-sort-direction-asc-page` — Teachers Scope Active Sort By Students Count Sort Direction Asc Page
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-students-count-sort-direction-asc-page-full.png`

### `management-teachers-scope-active-sort-by-total-hours-sum-sort-direction-asc-page` — Teachers Scope Active Sort By Total Hours Sum Sort Direction Asc Page
- route: `/management/teachers/scope/active`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-active-sort-by-total-hours-sum-sort-direction-asc-page-full.png`

### `management-teachers-scope-deleted` — Teachers Scope Deleted
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-full.png`

### `management-teachers-scope-deleted-sort-by-country-sort-direction-asc-page-1` — Teachers Scope Deleted Sort By Country Sort Direction Asc Page 1
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-country-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-deleted-sort-by-created-at-sort-direction-asc-page-1` — Teachers Scope Deleted Sort By Created At Sort Direction Asc Page 1
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-created-at-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-deleted-sort-by-first-name-sort-direction-desc-page-1` — Teachers Scope Deleted Sort By First Name Sort Direction Desc Page 1
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-first-name-sort-direction-desc-page-1-full.png`

### `management-teachers-scope-deleted-sort-by-phone-sort-direction-asc-page-1` — Teachers Scope Deleted Sort By Phone Sort Direction Asc Page 1
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-phone-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-deleted-sort-by-status-sort-direction-asc-page-1` — Teachers Scope Deleted Sort By Status Sort Direction Asc Page 1
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-status-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-deleted-sort-by-students-count-sort-direction-asc-page` — Teachers Scope Deleted Sort By Students Count Sort Direction Asc Page
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-students-count-sort-direction-asc-page-full.png`

### `management-teachers-scope-deleted-sort-by-total-hours-sum-sort-direction-asc-pag` — Teachers Scope Deleted Sort By Total Hours Sum Sort Direction Asc Pag
- route: `/management/teachers/scope/deleted`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Deleted Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Deleted Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-deleted-sort-by-total-hours-sum-sort-direction-asc-pag-full.png`

### `management-teachers-scope-inactive` — Teachers Scope Inactive
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-full.png`

### `management-teachers-scope-inactive-sort-by-country-sort-direction-asc-page-1` — Teachers Scope Inactive Sort By Country Sort Direction Asc Page 1
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-country-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-inactive-sort-by-created-at-sort-direction-asc-page-1` — Teachers Scope Inactive Sort By Created At Sort Direction Asc Page 1
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-created-at-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-inactive-sort-by-first-name-sort-direction-desc-page-1` — Teachers Scope Inactive Sort By First Name Sort Direction Desc Page 1
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-first-name-sort-direction-desc-page-1-full.png`

### `management-teachers-scope-inactive-sort-by-phone-sort-direction-asc-page-1` — Teachers Scope Inactive Sort By Phone Sort Direction Asc Page 1
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-phone-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-inactive-sort-by-status-sort-direction-asc-page-1` — Teachers Scope Inactive Sort By Status Sort Direction Asc Page 1
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-status-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-inactive-sort-by-students-count-sort-direction-asc-pag` — Teachers Scope Inactive Sort By Students Count Sort Direction Asc Pag
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-students-count-sort-direction-asc-pag-full.png`

### `management-teachers-scope-inactive-sort-by-total-hours-sum-sort-direction-asc-pa` — Teachers Scope Inactive Sort By Total Hours Sum Sort Direction Asc Pa
- route: `/management/teachers/scope/inactive`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, messages.Inactive Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), messages.Inactive Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-inactive-sort-by-total-hours-sum-sort-direction-asc-pa-full.png`

### `management-teachers-scope-incomplete` — Teachers Scope Incomplete
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-full.png`

### `management-teachers-scope-incomplete-sort-by-country-sort-direction-asc-page-1` — Teachers Scope Incomplete Sort By Country Sort Direction Asc Page 1
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-country-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-incomplete-sort-by-created-at-sort-direction-asc-page` — Teachers Scope Incomplete Sort By Created At Sort Direction Asc Page
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-created-at-sort-direction-asc-page-full.png`

### `management-teachers-scope-incomplete-sort-by-first-name-sort-direction-desc-page` — Teachers Scope Incomplete Sort By First Name Sort Direction Desc Page
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-first-name-sort-direction-desc-page-full.png`

### `management-teachers-scope-incomplete-sort-by-phone-sort-direction-asc-page-1` — Teachers Scope Incomplete Sort By Phone Sort Direction Asc Page 1
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-phone-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-incomplete-sort-by-status-sort-direction-asc-page-1` — Teachers Scope Incomplete Sort By Status Sort Direction Asc Page 1
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-status-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-incomplete-sort-by-students-count-sort-direction-asc-p` — Teachers Scope Incomplete Sort By Students Count Sort Direction Asc P
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-students-count-sort-direction-asc-p-full.png`

### `management-teachers-scope-incomplete-sort-by-total-hours-sum-sort-direction-asc` — Teachers Scope Incomplete Sort By Total Hours Sum Sort Direction Asc
- route: `/management/teachers/scope/incomplete`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Incomplete Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Incomplete Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-incomplete-sort-by-total-hours-sum-sort-direction-asc-full.png`

### `management-teachers-scope-unconfirmed` — Teachers Scope Unconfirmed
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-full.png`

### `management-teachers-scope-unconfirmed-sort-by-country-sort-direction-asc-page-1` — Teachers Scope Unconfirmed Sort By Country Sort Direction Asc Page 1
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-country-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-unconfirmed-sort-by-created-at-sort-direction-asc-page` — Teachers Scope Unconfirmed Sort By Created At Sort Direction Asc Page
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-created-at-sort-direction-asc-page-full.png`

### `management-teachers-scope-unconfirmed-sort-by-first-name-sort-direction-desc-pag` — Teachers Scope Unconfirmed Sort By First Name Sort Direction Desc Pag
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-first-name-sort-direction-desc-pag-full.png`

### `management-teachers-scope-unconfirmed-sort-by-phone-sort-direction-asc-page-1` — Teachers Scope Unconfirmed Sort By Phone Sort Direction Asc Page 1
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-phone-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-unconfirmed-sort-by-status-sort-direction-asc-page-1` — Teachers Scope Unconfirmed Sort By Status Sort Direction Asc Page 1
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-status-sort-direction-asc-page-1-full.png`

### `management-teachers-scope-unconfirmed-sort-by-students-count-sort-direction-asc` — Teachers Scope Unconfirmed Sort By Students Count Sort Direction Asc
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-students-count-sort-direction-asc-full.png`

### `management-teachers-scope-unconfirmed-sort-by-total-hours-sum-sort-direction-asc` — Teachers Scope Unconfirmed Sort By Total Hours Sum Sort Direction Asc
- route: `/management/teachers/scope/unconfirmed`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Unconfirmed Teachers, No Teachers Found
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Unconfirmed Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- filters: material_id, category_id
- buttons: 11 (mutating 3, submit 1, nav 2, open_ui 5)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-scope-unconfirmed-sort-by-total-hours-sum-sort-direction-asc-full.png`

### `management-teachers-sort-by-country-sort-direction-asc-page-1` — Teachers Sort By Country Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-country-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-country-sort-direction-desc-page-1` — Teachers Sort By Country Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-country-sort-direction-desc-page-1-full.png`

### `management-teachers-sort-by-created-at-sort-direction-asc-page-1` — Teachers Sort By Created At Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-created-at-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-created-at-sort-direction-desc-page-1` — Teachers Sort By Created At Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-created-at-sort-direction-desc-page-1-full.png`

### `management-teachers-sort-by-first-name-sort-direction-asc-page-1` — Teachers Sort By First Name Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-first-name-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-first-name-sort-direction-desc-page-1` — Teachers Sort By First Name Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-first-name-sort-direction-desc-page-1-full.png`

### `management-teachers-sort-by-phone-sort-direction-asc-page-1` — Teachers Sort By Phone Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-phone-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-phone-sort-direction-desc-page-1` — Teachers Sort By Phone Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-phone-sort-direction-desc-page-1-full.png`

### `management-teachers-sort-by-status-sort-direction-asc-page-1` — Teachers Sort By Status Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-status-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-status-sort-direction-desc-page-1` — Teachers Sort By Status Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-status-sort-direction-desc-page-1-full.png`

### `management-teachers-sort-by-students-count-sort-direction-asc-page-1` — Teachers Sort By Students Count Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-students-count-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-students-count-sort-direction-desc-page-1` — Teachers Sort By Students Count Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-students-count-sort-direction-desc-page-1-full.png`

### `management-teachers-sort-by-total-hours-sum-sort-direction-asc-page-1` — Teachers Sort By Total Hours Sum Sort Direction Asc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/banks, GET /management/categories/families, GET /management/categories/families/create
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-total-hours-sum-sort-direction-asc-page-1-full.png`

### `management-teachers-sort-by-total-hours-sum-sort-direction-desc-page-1` — Teachers Sort By Total Hours Sum Sort Direction Desc Page 1
- route: `/management/teachers`  ·  modules: Teachers
- sections/headings: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Filters, Active Teachers, المعلم محمد صادق صادق
- cards/KPIs: 1 (100 %), 0 (0 %), 0 (0 %), 0 (0 %), 0 (0 %), Active Teachers
- table (1 rows): #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings
- form `get /management/teachers` fields: sort_by, sort_direction, page, material_id, category_id
- form `post /management/teachers/{id}` fields: (no named fields)
- form `post /management/teachers/{id}` fields: (no named fields)
- filters: material_id, category_id
- buttons: 15 (mutating 3, submit 1, nav 4, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-teachers-sort-by-total-hours-sum-sort-direction-desc-page-1-full.png`


## admin · Timetable / Schedule (4 pages)

### `management-request-schedule-1-1` — Request Schedule 1 1
- route: `/management/request-schedule/{id}/{id}`  ·  modules: Timetable / Schedule
- sections/headings: Request Schedule Send a request for a gr, List of Teachers
- cards/KPIs: Request Schedule Send a request for a group of teachers based on a specific time, List of Teachers
- table (1 rows): #, Select All, Teacher Name
- form `post /management/store-request-schedule` fields: parent_id, student_id, request_type, request_type, family_id, student_id, course_id, duration, accounting_statement, date, time, course_id, total_hours, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value]
- filters: course_id, duration, accounting_statement, course_id, schedule[0][duration], schedule[1][duration], schedule[2][duration], schedule[3][duration], schedule[4][duration], schedule[5][duration], schedule[6][duration]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-request-schedule-1-1-full.png`

### `management-request-schedule-2-2` — Request Schedule 2 2
- route: `/management/request-schedule/{id}/{id}`  ·  modules: Timetable / Schedule
- sections/headings: Request Schedule Send a request for a gr, List of Teachers
- cards/KPIs: Request Schedule Send a request for a group of teachers based on a specific time, List of Teachers
- table (1 rows): #, Select All, Teacher Name
- form `post /management/store-request-schedule` fields: parent_id, student_id, request_type, request_type, family_id, student_id, course_id, duration, accounting_statement, date, time, course_id, total_hours, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value]
- filters: course_id, duration, accounting_statement, course_id, schedule[0][duration], schedule[1][duration], schedule[2][duration], schedule[3][duration], schedule[4][duration], schedule[5][duration], schedule[6][duration]
- buttons: 9 (mutating 3, submit 1, nav 2, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-request-schedule-2-2-full.png`

### `management-schedule-trials-response` — Schedule Trials Response
- route: `/management/schedule-trials-response`  ·  modules: Timetable / Schedule, Exams / Quizzes
- table (1 rows): Student, Parent, Course Name, Date, Time, Duration, Status, Requests
- table (0 rows): #, Teacher Name
- table (0 rows): #, Teacher Name, Message from teacher, Options
- modal: **Teachers You Sent** [modal/static]
- modal: **Accepted Teachers** [modal/static]
- buttons: 12 (mutating 2, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/group/index, GET /management/home
- screenshot: `output/roles/admin/screenshots/management-schedule-trials-response-full.png`

### `management-search-schedule` — Search Schedule
- route: `/management/search-schedule`  ·  modules: Timetable / Schedule
- sections/headings: Search Schedule Teacher Timezone
- cards/KPIs: Search Schedule Teacher Timezone
- form `post /management/search-available-teacher` fields: from, to, category_selected[], filter_by_available, filter_by_courses
- filters: category_selected[]
- buttons: 9 (mutating 2, submit 2, nav 2, open_ui 3)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/categories/families, GET /management/chat, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families, GET /management/families/create, GET /management/get-helper-data, GET /management/group/index, GET /management/home
- screenshot: `output/roles/admin/screenshots/management-search-schedule-full.png`


## admin · Wallet / Finance (10 pages)

### `management-accounting` — Accounting
- route: `/management/accounting`  ·  modules: Wallet / Finance
- sections/headings: Accounting, Total:, 0.00 AED, UnPaid, 0.00 AED, Paid, 0.00 AED, Teachers Salaries, 0.00 AED, Staff Salaries, 0.00 AED, Expenses Income, 0.00 AED, Expenses Outcome
- cards/KPIs: Accounting, Total:, UnPaid, Paid, Teachers Salaries, Staff Salaries, Expenses Income, Expenses Outcome, Total Income, Total Expenses, Net Income, Net Income, invoices, Teachers Salaries
- table (16 rows): Currency, Code, Rate
- form `get /management/accounting` fields: date
- modal: **Currency Rates** [modal/static+opened]
- buttons: 16 (mutating 3, submit 1, nav 2, open_ui 10)
- app endpoints touched: GET /management/accounting, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses
- screenshot: `output/roles/admin/screenshots/management-accounting-full.png`

### `management-analysis-expenses` — Analysis Expenses
- route: `/management/analysis-expenses`  ·  modules: Wallet / Finance
- sections/headings: Cumulative Total of Net Profit and Reven, Expected Net Profit, EUR 0.00, Actual Net Profit, EUR 0.00, Expected Revenue, EUR 0.00, Actual Revenue, EUR 0.00, Expected Teachers Salaries, EUR 540.00, Teachers Salaries till now, EUR 997.00, Staff Salaries
- cards/KPIs: Expected Net Profit, Actual Net Profit, Expected Revenue, Actual Revenue, Expected Teachers Salaries, Teachers Salaries till now, Staff Salaries, Expenses, Financial Data Table (Monthly), Cumulative Expected Profits, Revenues, and Expenses, Cumulative Actual Profits, Revenues, and Expenses, Financial Data Table (Monthly)
- table (12 rows): Month, Expected Revenue, Actual Revenue, Expected Net Profit, Actual Net Profit, Teachers Salaries, Staff Salaries, Expenses, Total Expenses
- tabs: Profit and Losses invoices
- buttons: 9 (mutating 2, submit 1, nav 2, open_ui 4)
- app endpoints touched: GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}, GET /management/courses, GET /management/families
- screenshot: `output/roles/admin/screenshots/management-analysis-expenses-full.png`

### `management-expense` — Expense
- route: `/management/expense`  ·  modules: Wallet / Finance
- table (1 rows): #, Name of Income or Outcom, Value, Currency, Description, Date, Reason, Name of Executor, Transaction Type, Actions
- form `post /management/expense` fields: head_id, user_id, is_income, description, reason, amount, currency, date
- form `post ` fields: name, writer_id, is_income, description, reason, amount, currency, date
- modal: **Expense Details** [modal/static+opened] fields: head_id, user_id, is_income, description, reason, amount, currency, date
- modal: **Expense Edit** [modal/static] fields: name, writer_id, is_income, description, reason, amount, currency, date
- filters: head_id, user_id, is_income, currency, name, writer_id, is_income, currency
- buttons: 16 (mutating 5, submit 1, nav 3, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-expense-full.png`

### `management-payout-providers` — Payout Providers
- route: `/management/payout-providers`  ·  modules: Wallet / Finance
- sections/headings: Payout providers
- table (2 rows): Method, Mode, Active, Webhook URL
- buttons: 10 (mutating 2, submit 1, nav 4, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-payout-providers-full.png`

### `management-payout-providers-6-edit` — Payout Providers 6 Edit
- route: `/management/payout-providers/{id}/edit`  ·  modules: Wallet / Finance
- sections/headings: Payoneer Payout provider
- cards/KPIs: Webhook URL
- form `post /management/payout-providers/{id}` fields: mode, is_active, key1, key2, key3
- filters: mode
- buttons: 10 (mutating 3, submit 1, nav 3, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-payout-providers-6-edit-full.png`

### `management-payout-providers-7-edit` — Payout Providers 7 Edit
- route: `/management/payout-providers/{id}/edit`  ·  modules: Wallet / Finance
- sections/headings: Paymob Payout provider
- cards/KPIs: Webhook URL
- form `post /management/payout-providers/{id}` fields: mode, is_active, key1, key2, key3, key4
- filters: mode
- buttons: 10 (mutating 3, submit 1, nav 3, open_ui 3)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/admins/appear/{id}, GET /management/admins/categories/{id}, GET /management/admins/create, GET /management/admins/duplicate/{id}, GET /management/admins/permission/{id}
- screenshot: `output/roles/admin/screenshots/management-payout-providers-7-edit-full.png`

### `management-payouts` — Payouts
- route: `/management/payouts`  ·  modules: Wallet / Finance
- sections/headings: Payouts June 2026, Pending approval, 0, Pending, 0, Successful, 0, Failed, 0, Rejected, 0, Returned, 0, Filter
- cards/KPIs: Pending approval, Pending, Successful, Failed, Rejected, Returned, Filter
- table (1 rows): #, Teacher, Amount, Method, Status, Month, Requested at
- form `get ` fields: month_name, year, status
- form `post /management/payouts/approve` fields: (no named fields)
- filters: month_name, status
- buttons: 11 (mutating 3, submit 1, nav 3, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-payouts-full.png`

### `management-payouts-all-1` — Payouts All 1
- route: `/management/payouts`  ·  modules: Wallet / Finance
- sections/headings: Payouts, Pending approval, 0, Pending, 0, Successful, 0, Failed, 0, Rejected, 0, Returned, 0, Filter
- cards/KPIs: Pending approval, Pending, Successful, Failed, Rejected, Returned, Filter
- table (1 rows): #, Teacher, Amount, Method, Status, Month, Requested at
- form `get ` fields: month_name, year, status
- form `post /management/payouts/approve` fields: (no named fields)
- filters: month_name, status
- buttons: 11 (mutating 3, submit 1, nav 3, open_ui 4)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/invoices, GET /management/accounting/transaction/salary, GET /management/accounting/transaction/session, GET /management/admins, GET /management/all/teachers/timetable, GET /management/analysis-course, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student
- screenshot: `output/roles/admin/screenshots/management-payouts-all-1-full.png`

### `management-salaries` — Salaries
- route: `/management/salaries`  ·  modules: Wallet / Finance
- sections/headings: Teachers Salaries, Attended, 0, Student Absent, 0, Teacher Absent, 0, Fixed, 0, Fine / Gift, Total: (EUR), 0, Filter
- cards/KPIs: Attended, Student Absent, Teacher Absent, Fixed, Fine / Gift, Total: (EUR), Filter, Select All Teachers
- table (1 rows): #, Teacher Name, Cash Number, Fixed, plus, minus, Fine, Gift, Hour Rate, Total:, Total: (EUR), Salary Type, Status, Actions
- table (7 rows): Name, Hours, Hour Rate
- form `post /management/payouts` fields: (no named fields)
- form `post /management/salaries` fields: month, date_range, generateteacher, allteachers, teachers[]
- modal: **Teacher Salary** [modal/static]
- modal: **Salary** [modal/static]
- modal: **Salary Month** [modal/static+opened] fields: month, date_range, generateteacher, allteachers, teachers[]
- filters: month
- buttons: 21 (mutating 4, submit 2, nav 3, open_ui 12)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-salaries-full.png`

### `management-staff-salaries` — Staff Salaries
- route: `/management/staff-salaries`  ·  modules: Wallet / Finance, Teachers
- sections/headings: Staff Salaries, Filter
- cards/KPIs: Filter, Select All Staff
- table (1 rows): #, Name, Cash Number, Fine, Gift, Total:, Total: (EUR), Status, Actions
- form `post /management/staff-salaries` fields: month, date_range, generatestaff, allstaff, staff_members[], staff_members[], staff_members[]
- modal: **Generate salaries** [modal/static+opened] fields: month, date_range, generatestaff, allstaff, staff_members[], staff_members[], staff_members[]
- filters: month
- buttons: 14 (mutating 4, submit 1, nav 2, open_ui 7)
- app endpoints touched: GET /management/accounting, GET /management/accounting/transaction/session, GET /management/all/teachers/timetable, GET /management/analysis-expenses, GET /management/analysis-invoices, GET /management/analysis-student, GET /management/categories/families, GET /management/chat, GET /management/class-feedback, GET /management/courseClasses/{id}
- screenshot: `output/roles/admin/screenshots/management-staff-salaries-full.png`


# ===== ROLE: teacher (26 pages) =====


## teacher · Assignments / Homework (1 pages)

### `teacher-tickets` — Tasks
- route: `/teacher/tickets`  ·  modules: Assignments / Homework, Teachers
- sections/headings: Tasks, 0, Total:, 0, Completed, 0, Pending, 0, Inprogres, 0, Overdue, Staff Members, Name, Total:
- cards/KPIs: Tasks, 0, 0, 0, 0, 0, Staff Members
- table (0 rows): Name, Total:, Pending, Overdue, Completed, Average
- buttons: 6 (mutating 2, submit 1, nav 1, open_ui 2)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/studentslist, GET /teacher/teacher-history/1-, GET /teacher/tickets, GET /teacher/timetable, POST /teacher/chat/loadMoreChats
- screenshot: `output/roles/teacher/screenshots/teacher-tickets-full.png`


## teacher · Classes / Live Sessions (4 pages)

### `teacher-course-history-1-class` — Teacher Course History 1 Class
- route: `/teacher/course-history/{id}/class`  ·  modules: Classes / Live Sessions, Teachers, Courses
- sections/headings: Class History Trial
- cards/KPIs: Class History Trial
- modal: **Details** [modal/static]
- buttons: 8 (mutating 2, submit 1, nav 1, open_ui 4)
- app endpoints touched: GET /management/home, GET /management/student/{id}, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/course-history/{id}/class, GET /teacher/home, GET /teacher/library, GET /teacher/main/index.html, GET /teacher/monthly-plans, GET /teacher/monthly-plans/{enc}/show
- screenshot: `output/roles/teacher/screenshots/teacher-course-history-1-class-full.png`

### `teacher-course-history-2-class` — Teacher Course History 2 Class
- route: `/teacher/course-history/{id}/class`  ·  modules: Classes / Live Sessions, Teachers, Courses
- sections/headings: Class History Sessions
- cards/KPIs: Class History Sessions
- modal: **Details** [modal/static]
- buttons: 8 (mutating 2, submit 1, nav 1, open_ui 4)
- app endpoints touched: GET /management/home, GET /management/student/{id}, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/course-history/{id}/class, GET /teacher/home, GET /teacher/library, GET /teacher/main/index.html, GET /teacher/monthly-plans, GET /teacher/monthly-plans/{enc}/show
- screenshot: `output/roles/teacher/screenshots/teacher-course-history-2-class-full.png`

### `teacher-salary-class-report` — Teacher Salary Class Report
- route: `/teacher/salary-class-report`  ·  modules: Classes / Live Sessions, Wallet / Finance, Reports / Analytics
- sections/headings: Salary Class Report
- cards/KPIs: Salary Class Report
- form `get /teacher/update-result` fields: date_range, filter
- filters: filter
- buttons: 7 (mutating 3, submit 1, nav 1, open_ui 2)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/salary, GET /teacher/salary-class-report, GET /teacher/students, GET /teacher/studentslist, GET /teacher/teacher-history/1-
- screenshot: `output/roles/teacher/screenshots/teacher-salary-class-report-full.png`

### `teacher-session-class-room-mq-2` — Teacher Session Class Room Mq 2
- route: `/teacher/session-class-room/{enc}/{id}`  ·  modules: Classes / Live Sessions, Teachers
- sections/headings: 04:30, 04:30, المعلم محمد صادق صادق, 00:00, 0%, Your Salary, 997.00 EGP, Today's Classes, #, Class Time, Student Name, Course Name, Class Status, History
- cards/KPIs: 04:30, Today's Classes
- table (1 rows): #, Class Time, Student Name, Course Name, Class Status, History, Action
- form `get ` fields: date
- form `post ` fields: class_id, family_id, type, type, date, time
- form `post /teacher/classes-end` fields: class_id, remark, summary, homework, notes, images[]
- form `post /teacher/classes-absent` fields: class_id, video, notes
- form `post /teacher/edit-class` fields: session_id, parent_id, teacher_id, date, time, sendMessage, duration
- modal: **Request Cancel** [modal/static] fields: type, type, date, Month, Year, time, Hour, Minute
- modal: **End class** [modal/static+opened] fields: remark, summary, homework, notes, images[]
- modal: **Mark class as absent** [modal/static] fields: video, notes
- modal: **Edit Class** [modal/static] fields: date, Month, Year, time, Hour, Minute, sendMessage, duration
- filters: remark, duration
- buttons: 27 (mutating 6, submit 1, nav 5, open_ui 15)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary, GET /teacher/salary-class-report
- screenshot: `output/roles/teacher/screenshots/teacher-session-class-room-mq-2-full.png`


## teacher · Content / Materials / Library (1 pages)

### `teacher-library` — Teacher Library
- route: `/teacher/library`  ·  modules: Content / Materials / Library, Teachers
- sections/headings: Education and talents All in one place., All Categories
- cards/KPIs: Education and talents All in one place., All Categories
- form `get ` fields: query, filter
- filters: query, filter
- buttons: 6 (mutating 2, submit 1, nav 1, open_ui 2)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/studentslist, GET /teacher/teacher-history/1-, GET /teacher/timetable, POST /teacher/chat/loadMoreChats, POST /teacher/get-schedual
- screenshot: `output/roles/teacher/screenshots/teacher-library-full.png`


## teacher · Dashboard / Home (2 pages)

### `management-home` — Home
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: 04:30, 04:30, المعلم محمد صادق صادق, 00:00, 0%, Your Salary, 997.00 EGP, Today's Classes, #, Class Time, Student Name, Course Name, Class Status, History
- cards/KPIs: 04:30, Today's Classes
- table (1 rows): #, Class Time, Student Name, Course Name, Class Status, History, Action
- form `get ` fields: date
- form `post ` fields: class_id, family_id, type, type, date, time
- form `post /teacher/classes-end` fields: class_id, remark, summary, homework, notes, images[]
- form `post /teacher/classes-absent` fields: class_id, video, notes
- form `post /teacher/edit-class` fields: session_id, parent_id, teacher_id, date, time, sendMessage, duration
- modal: **Request Cancel** [modal/static] fields: type, type, date, Month, Year, time, Hour, Minute
- modal: **End class** [modal/static+opened] fields: remark, summary, homework, notes, images[]
- modal: **Mark class as absent** [modal/static] fields: video, notes
- modal: **Edit Class** [modal/static] fields: date, Month, Year, time, Hour, Minute, sendMessage, duration
- filters: remark, duration
- buttons: 27 (mutating 6, submit 1, nav 5, open_ui 15)
- app endpoints touched: GET /management/home, GET /teacher/course-history/{id}, GET /teacher/home
- screenshot: `output/roles/teacher/screenshots/management-home-full.png`

### `teacher-home` — Teacher Home
- route: `/teacher/home`  ·  modules: Dashboard / Home, Teachers
- sections/headings: 04:30, 04:30, المعلم محمد صادق صادق, 00:00, 0%, Your Salary, 997.00 EGP, Today's Classes, #, Class Time, Student Name, Course Name, Class Status, History
- cards/KPIs: 04:30, Today's Classes
- table (1 rows): #, Class Time, Student Name, Course Name, Class Status, History, Action
- form `get ` fields: date
- form `post ` fields: class_id, family_id, type, type, date, time
- form `post /teacher/classes-end` fields: class_id, remark, summary, homework, notes, images[]
- form `post /teacher/classes-absent` fields: class_id, video, notes
- form `post /teacher/edit-class` fields: session_id, parent_id, teacher_id, date, time, sendMessage, duration
- modal: **Request Cancel** [modal/static] fields: type, type, date, Month, Year, time, Hour, Minute
- modal: **End class** [modal/static+opened] fields: remark, summary, homework, notes, images[]
- modal: **Mark class as absent** [modal/static] fields: video, notes
- modal: **Edit Class** [modal/static] fields: date, Month, Year, time, Hour, Minute, sendMessage, duration
- filters: remark, duration
- buttons: 27 (mutating 6, submit 1, nav 5, open_ui 15)
- app endpoints touched: GET /management/home, GET /teacher/course-history/{id}, GET /teacher/home
- screenshot: `output/roles/teacher/screenshots/teacher-home-full.png`


## teacher · General / Unknown (5 pages)

### `main-index-html` — Opps!!! — **HTTP 404, ERROR**
- route: `/main/index.html`  ·  modules: General / Unknown
- sections/headings: Opps!!!, This page you are looking for could not 
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/salary, GET /teacher/salary-class-report, GET /teacher/students, GET /teacher/studentslist, GET /teacher/teacher-history/1-
- screenshot: `output/roles/teacher/screenshots/main-index-html-full.png`

### `teacher-course-history-main-index-html` — Opps!!! — **HTTP 404, ERROR**
- route: `/teacher/course-history/main/index.html`  ·  modules: General / Unknown
- sections/headings: Opps!!!, This page you are looking for could not 
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /management/student/{id}, GET /teacher/chat, GET /teacher/course-history/main/index.html, GET /teacher/course-history/{id}, GET /teacher/course-history/{id}/class, GET /teacher/home, GET /teacher/library, GET /teacher/main/index.html, GET /teacher/monthly-plans
- screenshot: `output/roles/teacher/screenshots/teacher-course-history-main-index-html-full.png`

### `teacher-main-index-html` — Opps!!! — **HTTP 404, ERROR**
- route: `/teacher/main/index.html`  ·  modules: General / Unknown
- sections/headings: Opps!!!, This page you are looking for could not 
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /management/student/{id}, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/main/index.html, GET /teacher/monthly-plans, GET /teacher/monthly-plans/{enc}/show, GET /teacher/profile
- screenshot: `output/roles/teacher/screenshots/teacher-main-index-html-full.png`

### `teacher-monthly-plans-main-index-html` — Opps!!! — **HTTP 404, ERROR**
- route: `/teacher/monthly-plans/main/index.html`  ·  modules: General / Unknown
- sections/headings: Opps!!!, This page you are looking for could not 
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /management/student/{id}, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/course-history/{id}/class, GET /teacher/home, GET /teacher/library, GET /teacher/main/index.html, GET /teacher/monthly-plans, GET /teacher/monthly-plans/main/index.html
- screenshot: `output/roles/teacher/screenshots/teacher-monthly-plans-main-index-html-full.png`

### `teacher-profile` — Teacher Profile — **HTTP 500, ERROR**
- route: `/teacher/profile`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary, GET /teacher/salary-class-report
- screenshot: `output/roles/teacher/screenshots/teacher-profile-full.png`


## teacher · Messages / Notifications (1 pages)

### `teacher-chat` — Teacher Chat
- route: `/teacher/chat`  ·  modules: Messages / Notifications, Teachers
- sections/headings: المعلم محمد صادق صادق, You, Open chat from the list
- cards/KPIs: المعلم محمد صادق صادق
- form `get ` fields: (no named fields)
- form `get ` fields: (no named fields)
- form `get ` fields: (no named fields)
- modal: **Chats** [offcanvas/static] fields: Search Contact
- buttons: 12 (mutating 2, submit 2, nav 1, open_ui 7)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, POST /teacher/chat/loadMoreChats
- screenshot: `output/roles/teacher/screenshots/teacher-chat-full.png`


## teacher · Profile / Account (1 pages)

### `teacher-profile-edit` — Teacher Profile Edit
- route: `/teacher/profile-edit`  ·  modules: Profile / Account, Teachers
- sections/headings: Change Password
- cards/KPIs: First Name, Change Password
- form `post /teacher/profile-edit` fields: onlineImage, image, first_name, last_name, email
- form `post /teacher/update-teacher-password` fields: old_password, new_password, confirm_password
- buttons: 9 (mutating 4, submit 1, nav 1, open_ui 3)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/profile-edit, GET /teacher/salary, GET /teacher/salary-class-report, GET /teacher/students
- screenshot: `output/roles/teacher/screenshots/teacher-profile-edit-full.png`


## teacher · Students (4 pages)

### `management-student-1` — Student 1
- route: `/management/student/{id}`  ·  modules: Students, Dashboard / Home
- sections/headings: 04:30, 04:30, المعلم محمد صادق صادق, 00:00, 0%, Your Salary, 997.00 EGP, Today's Classes, #, Class Time, Student Name, Course Name, Class Status, History
- cards/KPIs: 04:30, Today's Classes
- table (1 rows): #, Class Time, Student Name, Course Name, Class Status, History, Action
- form `get ` fields: date
- form `post ` fields: class_id, family_id, type, type, date, time
- form `post /teacher/classes-end` fields: class_id, remark, summary, homework, notes, images[]
- form `post /teacher/classes-absent` fields: class_id, video, notes
- form `post /teacher/edit-class` fields: session_id, parent_id, teacher_id, date, time, sendMessage, duration
- modal: **Request Cancel** [modal/static] fields: type, type, date, Month, Year, time, Hour, Minute
- modal: **End class** [modal/static+opened] fields: remark, summary, homework, notes, images[]
- modal: **Mark class as absent** [modal/static] fields: video, notes
- modal: **Edit Class** [modal/static] fields: date, Month, Year, time, Hour, Minute, sendMessage, duration
- filters: remark, duration
- buttons: 27 (mutating 6, submit 1, nav 5, open_ui 15)
- app endpoints touched: GET /management/home, GET /management/student/{id}, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/monthly-plans/{enc}/show, GET /teacher/profile, GET /teacher/profile-edit
- screenshot: `output/roles/teacher/screenshots/management-student-1-full.png`

### `teacher-students` — Teacher Students
- route: `/teacher/students`  ·  modules: Students, Teachers
- sections/headings: List of Students
- cards/KPIs: List of Students
- table (0 rows): #, Student Name, Country, Report For Student
- form `get ` fields: (no named fields)
- form `post /teacher/student-progress` fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus, homework_completion, homework_completion, homework_completion, homework_completion, punctuality, punctuality, punctuality, punctuality
- modal: **Student Timetable** [modal/static]
- modal: **Send Report** [modal/static] fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus
- filters: month
- buttons: 9 (mutating 3, submit 1, nav 1, open_ui 4)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/students, GET /teacher/studentslist, GET /teacher/teacher-history/1-, GET /teacher/tickets, GET /teacher/timetable
- screenshot: `output/roles/teacher/screenshots/teacher-students-full.png`

### `teacher-studentslist` — Teacher Studentslist
- route: `/teacher/studentslist`  ·  modules: Students, Teachers
- sections/headings: List of Students
- cards/KPIs: List of Students
- table (1 rows): #, Student Name, Country, Course Name, History, Schedule, Report For Student, all plans, certificate
- form `get ` fields: (no named fields)
- form `post /teacher/student-progress` fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus, homework_completion, homework_completion, homework_completion, homework_completion, punctuality, punctuality, punctuality, punctuality
- form `post /teacher/certificate-request` fields: course_id, description, date_certificate
- modal: **Student Timetable** [modal/static+opened]
- modal: **Send Report** [modal/static+opened] fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus
- modal: **Request Certificate** [modal/static+opened] fields: description, date_certificate
- filters: month
- buttons: 19 (mutating 4, submit 1, nav 3, open_ui 11)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/studentslist, GET /teacher/teacher-history/1-, GET /teacher/timetable, POST /teacher/chat/loadMoreChats, POST /teacher/get-schedual
- screenshot: `output/roles/teacher/screenshots/teacher-studentslist-full.png`

### `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student` — Teacher Update Result Date Range 2026 06 01 To 2026 06 30 Filter Student
- route: `/teacher/update-result`  ·  modules: Students, Classes / Live Sessions, Wallet / Finance
- sections/headings: Salary Class Report, Report By Student 2026-06-01 - 2026-06-3
- cards/KPIs: Salary Class Report, Report By Student 2026-06-01 - 2026-06-30
- table (3 rows): #, Student Name, Pending, Attended, Absent, Cancel, Paid Duration, Price, session, Trial, Student, Teacher, Student, Teacher
- form `get /teacher/update-result` fields: date_range, filter
- filters: filter
- buttons: 7 (mutating 3, submit 1, nav 1, open_ui 2)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary, GET /teacher/salary-class-report
- screenshot: `output/roles/teacher/screenshots/teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student-full.png`


## teacher · Teachers (5 pages)

### `teacher-course-history-1` — Teacher Course History 1
- route: `/teacher/course-history/{id}`  ·  modules: Teachers, Courses, Dashboard / Home
- sections/headings: Classes History Details of محمد احمد
- cards/KPIs: Classes History Details of محمد احمد
- table (2 rows): Class Date & Time, Teacher Name, Show
- modal: **Student Details** [modal/static]
- buttons: 13 (mutating 2, submit 3, nav 4, open_ui 4)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary, GET /teacher/salary-class-report
- screenshot: `output/roles/teacher/screenshots/teacher-course-history-1-full.png`

### `teacher-monthly-plans` — Teacher Monthly Plans
- route: `/teacher/monthly-plans`  ·  modules: Teachers, Students
- sections/headings: List of Students
- cards/KPIs: List of Students
- table (0 rows): #, Student Name, Course Name, History, Schedule, Report For Student, all plans, monthly plan
- form `get ` fields: (no named fields)
- form `post /teacher/student-progress` fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus, homework_completion, homework_completion, homework_completion, homework_completion, punctuality, punctuality, punctuality, punctuality
- modal: **Student Timetable** [modal/static]
- modal: **Send Report** [modal/static] fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus
- filters: month
- buttons: 9 (mutating 3, submit 1, nav 1, open_ui 4)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/salary, GET /teacher/salary-class-report, GET /teacher/students, GET /teacher/studentslist
- screenshot: `output/roles/teacher/screenshots/teacher-monthly-plans-full.png`

### `teacher-monthly-plans-mq-show` — Teacher Monthly Plans Mq Show
- route: `/teacher/monthly-plans/{enc}/show`  ·  modules: Teachers
- sections/headings: Total Report
- cards/KPIs: Total Report
- table (0 rows): #, Month, Parent name, Student Name, Course Name, View, Approve
- form `get ` fields: (no named fields)
- form `post /teacher/student-progress` fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus, homework_completion, homework_completion, homework_completion, homework_completion, punctuality, punctuality, punctuality, punctuality
- modal: **Student Timetable** [modal/static]
- modal: **Send Report** [modal/static] fields: month, achievements, learning_progress, learning_progress, learning_progress, learning_progress, focus, focus, focus, focus
- filters: month
- buttons: 9 (mutating 3, submit 1, nav 1, open_ui 4)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/monthly-plans/{enc}/show, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary
- screenshot: `output/roles/teacher/screenshots/teacher-monthly-plans-mq-show-full.png`

### `teacher-teacher-history-1` — Teacher Teacher History 1
- route: `/teacher/teacher-history/1-`  ·  modules: Teachers
- sections/headings: Classes History Details of محمد احمد
- cards/KPIs: Classes History Details of محمد احمد
- table (2 rows): Class Date & Time, Teacher Name, Show
- modal: **Student Details** [modal/static]
- buttons: 13 (mutating 2, submit 3, nav 4, open_ui 4)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary, GET /teacher/salary-class-report
- screenshot: `output/roles/teacher/screenshots/teacher-teacher-history-1-full.png`

### `teacher-teacher-history-1-d861d6e` — Teacher Teacher History 1 D861d6e
- route: `/teacher/teacher-history/{id}`  ·  modules: Teachers
- sections/headings: Classes History Details of محمد احمد
- cards/KPIs: Classes History Details of محمد احمد
- table (2 rows): Class Date & Time, Teacher Name, Show
- modal: **Student Details** [modal/static]
- buttons: 13 (mutating 2, submit 3, nav 4, open_ui 4)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/monthly-plans, GET /teacher/monthly-plans/{enc}/show, GET /teacher/profile, GET /teacher/profile-edit, GET /teacher/salary
- screenshot: `output/roles/teacher/screenshots/teacher-teacher-history-1-d861d6e-full.png`


## teacher · Timetable / Schedule (1 pages)

### `teacher-timetable` — Teacher Timetable
- route: `/teacher/timetable`  ·  modules: Timetable / Schedule
- cards/KPIs: 12 AM
- form `post /teacher/timetable` fields: course_id
- buttons: 19 (mutating 7, submit 1, nav 1, open_ui 10)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/timetable, POST /teacher/chat/loadMoreChats
- screenshot: `output/roles/teacher/screenshots/teacher-timetable-full.png`


## teacher · Wallet / Finance (1 pages)

### `teacher-salary` — Teacher Salary
- route: `/teacher/salary`  ·  modules: Wallet / Finance
- sections/headings: Salary
- cards/KPIs: Salary
- table (0 rows): #, Fixed, Attended, Student Absent, Teacher Absent, Trials Attended, Trials Student Absent, Trials Teacher Absent, Fine, Gift, Hour Rate, Total:, Status
- buttons: 6 (mutating 2, submit 1, nav 1, open_ui 2)
- app endpoints touched: GET /management/home, GET /teacher/chat, GET /teacher/course-history/{id}, GET /teacher/home, GET /teacher/library, GET /teacher/salary, GET /teacher/students, GET /teacher/studentslist, GET /teacher/teacher-history/1-, GET /teacher/tickets
- screenshot: `output/roles/teacher/screenshots/teacher-salary-full.png`


# ===== ROLE: family (13 pages) =====


## family · Classes / Live Sessions (1 pages)

### `student-today-sessions` — Student Today Sessions
- route: `/student/today-sessions`  ·  modules: Classes / Live Sessions, Students
- sections/headings: Today's Classes
- cards/KPIs: Today's Classes
- table (0 rows): Class Date, Class Time, Student Name, Teacher Name, Course Name, Subscription, Class Status, History, Files
- form `get ` fields: date
- form `post ` fields: class_id, teacher_id, type, type, date, time
- form `post /student/upload-files` fields: session_id, files[], audio
- modal: **Request Cancel** [modal/static] fields: type, type, date, time, Hour, Minute
- modal: **Upload File:** [modal/static] fields: files[]
- buttons: 10 (mutating 1, submit 2, nav 1, open_ui 6)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/library, GET /student/nullvendor/css/rtl/core.css, GET /student/profile, GET /student/profile-edit, GET /student/request-trial, GET /student/student-history-fillter
- screenshot: `output/roles/family/screenshots/student-today-sessions-full.png`


## family · Content / Materials / Library (1 pages)

### `student-library` — Student Library
- route: `/student/library`  ·  modules: Content / Materials / Library, Students
- sections/headings: Education, talents, and career opportuni, All Categories
- cards/KPIs: Education, talents, and career opportunities. All in one place., All Categories
- form `get ` fields: query, filter
- filters: query, filter
- buttons: 3 (mutating 0, submit 1, nav 1, open_ui 1)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/library, GET /student/nullvendor/css/rtl/core.css, GET /student/student-history-fillter, GET /student/studentslist, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-library-full.png`


## family · Dashboard / Home (2 pages)

### `management-home` — Home
- route: `/management/home`  ·  modules: Dashboard / Home
- sections/headings: 0, 0, 0, الطالبة لمار حسن 👋🏻, Time Spendings, 0/0 H, Today's Classes, Your Teachers
- cards/KPIs: 0, Today's Classes, Your Teachers
- table (1 rows): No Teachers
- buttons: 4 (mutating 0, submit 1, nav 3, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/home, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/management-home-full.png`

### `student-home` — Student Home
- route: `/student/home`  ·  modules: Dashboard / Home, Students
- sections/headings: 0, 0, 0, الطالبة لمار حسن 👋🏻, Time Spendings, 0/0 H, Today's Classes, Your Teachers
- cards/KPIs: 0, Today's Classes, Your Teachers
- table (1 rows): No Teachers
- buttons: 4 (mutating 0, submit 1, nav 3, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/home, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-home-full.png`


## family · General / Unknown (2 pages)

### `main-index-html` — Opps!!! — **HTTP 404, ERROR**
- route: `/main/index.html`  ·  modules: General / Unknown
- sections/headings: Opps!!!, This page you are looking for could not 
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/library, GET /student/nullvendor/css/rtl/core.css, GET /student/student-history-fillter, GET /student/studentslist, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/main-index-html-full.png`

### `student-profile` — Student Profile — **HTTP 500, ERROR**
- route: `/student/profile`  ·  modules: General / Unknown
- sections/headings: Something went wrong, try again later
- buttons: 1 (mutating 0, submit 0, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/library, GET /student/nullvendor/css/rtl/core.css, GET /student/profile, GET /student/profile-edit, GET /student/student-history-fillter, GET /student/studentslist
- screenshot: `output/roles/family/screenshots/student-profile-full.png`


## family · Payments / Invoices (1 pages)

### `student-billing` — Student Billing
- route: `/student/billing`  ·  modules: Payments / Invoices
- sections/headings: Billing Details
- cards/KPIs: Billing Details
- table (0 rows): #, Serial No, Month-Year, Due Date, Course, Amount, Status
- buttons: 2 (mutating 0, submit 1, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/home, GET /student/student-history-fillter, GET /student/studentslist, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-billing-full.png`


## family · Profile / Account (1 pages)

### `student-profile-edit` — Student Profile Edit
- route: `/student/profile-edit`  ·  modules: Profile / Account, Students
- sections/headings: Change Password
- cards/KPIs: First Name, Change Password
- form `post /student/profile-edit` fields: onlineImage, image, first_name, last_name, email
- form `post /student/update-password` fields: old_password, new_password, confirm_password
- buttons: 5 (mutating 2, submit 1, nav 1, open_ui 1)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/library, GET /student/nullvendor/css/rtl/core.css, GET /student/profile-edit, GET /student/student-history-fillter, GET /student/studentslist, GET /student/timetable
- screenshot: `output/roles/family/screenshots/student-profile-edit-full.png`


## family · Students (4 pages)

### `student-feedbacks` — Student Feedbacks
- route: `/student/feedbacks`  ·  modules: Students
- sections/headings: Student Feedback
- cards/KPIs: Student Feedback
- table (1 rows): #, Meeting Date, Meeting Time, Meeting Manager, Family Members, Action
- buttons: 2 (mutating 0, submit 1, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/student-history-fillter, GET /student/studentslist, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-feedbacks-full.png`

### `student-request-trial` — Student Request Trial
- route: `/student/request-trial`  ·  modules: Students
- sections/headings: Request Trial, Student Details, Trial Info
- cards/KPIs: Request Trial
- form `post /student/request-trial` fields: request_type, request_type, name, age, language, gender, student_id, date, time, duration, course
- filters: language, gender, student_id, duration, course
- tabs: current step: 1 Student Details, 2 Trial Info
- buttons: 3 (mutating 1, submit 1, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/billing, GET /student/feedbacks, GET /student/home, GET /student/library, GET /student/nullvendor/css/rtl/core.css, GET /student/profile, GET /student/profile-edit, GET /student/request-trial, GET /student/student-history-fillter
- screenshot: `output/roles/family/screenshots/student-request-trial-full.png`

### `student-student-history-fillter-2` — Student Student History Fillter 2
- route: `/student/student-history-fillter`  ·  modules: Students, Dashboard / Home, Classes / Live Sessions
- sections/headings: History of : All Student
- cards/KPIs: History of : All Student
- table (0 rows): Class Date & Time, Teacher Name, Show
- form `get /student/student-history-fillter` fields: filter
- modal: **Student Details** [modal/static]
- modal: **Student Details** [modal/static]
- filters: filter
- buttons: 7 (mutating 1, submit 1, nav 1, open_ui 4)
- app endpoints touched: GET /management/home, GET /student/home, GET /student/student-history-fillter, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-student-history-fillter-2-full.png`

### `student-studentslist` — Student Studentslist
- route: `/student/studentslist`  ·  modules: Students, Courses, Payments / Invoices
- sections/headings: All Account Subscriptions
- cards/KPIs: All Account Subscriptions
- table (1 rows): #, Student Name, Status, Teacher Name, Course Name, Subscription, History, Feedback About Course
- form `get ` fields: student
- form `post /student/feedback` fields: student_name, teacher_name, teacher_rating, class_interactive, see_hear, like_teacher, complain, additional_comment
- modal: **Feedback about your teacher** [modal/static] fields: see_hear, like_teacher, complain, additional_comment
- filters: student, see_hear
- buttons: 3 (mutating 1, submit 1, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/home, GET /student/student-history-fillter, GET /student/studentslist, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-studentslist-full.png`


## family · Timetable / Schedule (1 pages)

### `student-timetable` — Student Timetable
- route: `/student/timetable`  ·  modules: Timetable / Schedule
- table (0 rows): #, Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday, Friday
- buttons: 2 (mutating 0, submit 1, nav 1, open_ui 0)
- app endpoints touched: GET /management/home, GET /student/home, GET /student/timetable, GET /student/today-sessions
- screenshot: `output/roles/family/screenshots/student-timetable-full.png`

