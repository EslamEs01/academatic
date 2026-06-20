# 06 — Complete Data & API Surface

> Built from **all 339 page JSONs** + the 3 role `network/endpoints.json`. Two sources: (1) **observed GET routes** captured in the network log; (2) **form‑action endpoints** (POST/PUT/DELETE) read from every form's `action`. The legacy is server‑rendered (no clean JSON API observed) — these are route/endpoint **observations**, plus **inferred** entity fields. Field names are legacy DOM `name`s (hints, not a contract). Do not treat as a final API.

**Distinct app endpoints (GET, observed in network):** 195  ·  **Distinct form‑action endpoints (mutations):** 109.

## A. Observed GET routes (grouped)

### Certificates (3)
- `GET /management/certificate-requests`  [admin]
- `GET /management/pdf`  [admin]
- `GET /management/pdf/create`  [admin]

### Content (4)
- `GET /management/library`  [admin]
- `GET /management/materials`  [admin]
- `GET /management/materials/create`  [admin]
- `GET /management/materials/{id}/edit`  [admin]

### Courses (6)
- `GET /management/courses`  [admin]
- `GET /management/courses/create_new_copy/{id}`  [admin]
- `GET /management/courses/{id}`  [admin]
- `GET /management/courses/{id}/create`  [admin]
- `GET /management/courses/{id}/create_free`  [admin]
- `GET /management/courses/{id}/edit`  [admin]

### Dashboard (1)
- `GET /management/home`  [admin/family/teacher]

### Families (21)
- `GET /management/categories/families`  [admin]
- `GET /management/categories/families/create`  [admin]
- `GET /management/categories/families/{id}/assign`  [admin]
- `GET /management/categories/families/{id}/edit`  [admin]
- `GET /management/families`  [admin]
- `GET /management/families/create`  [admin]
- `GET /management/families/feedback`  [admin]
- `GET /management/families/feedback/family/{id}`  [admin]
- `GET /management/families/feedback/students`  [admin]
- `GET /management/families/index/filter`  [admin]
- `GET /management/families/status/Active`  [admin]
- `GET /management/families/status/Deleted`  [admin]
- `GET /management/families/status/Inactive`  [admin]
- `GET /management/families/status/Incomplete`  [admin]
- `GET /management/families/status/Stopped`  [admin]
- `GET /management/families/status/Suspended`  [admin]
- `GET /management/families/status/Trial`  [admin]
- `GET /management/families/{id}`  [admin]
- `GET /management/families/{id}/edit`  [admin]
- `GET /management/family/feedback-categories`  [admin]
- `GET /management/family/feedback-categories/create`  [admin]

### Family portal (12)
- `GET /student/billing`  [family]
- `GET /student/feedbacks`  [family]
- `GET /student/home`  [family]
- `GET /student/library`  [family]
- `GET /student/nullvendor/css/rtl/core.css`  [family]
- `GET /student/profile`  [family]
- `GET /student/profile-edit`  [family]
- `GET /student/request-trial`  [family]
- `GET /student/student-history-fillter`  [family]
- `GET /student/studentslist`  [family]
- `GET /student/timetable`  [family]
- `GET /student/today-sessions`  [family]

### Finance·Accounting (4)
- `GET /management/accounting`  [admin]
- `GET /management/accounting/transaction/invoices`  [admin]
- `GET /management/accounting/transaction/salary`  [admin]
- `GET /management/accounting/transaction/session`  [admin]

### Finance·Banks (2)
- `GET /management/banks`  [admin]
- `GET /management/banks/create`  [admin]

### Finance·Expenses (2)
- `GET /management/expense`  [admin]
- `GET /management/heads`  [admin]

### Finance·Invoices (3)
- `GET /management/invoices`  [admin]
- `GET /management/invoices/create-parent-invoice/{id}`  [admin]
- `GET /management/invoicesexportData`  [admin]

### Finance·Payouts (3)
- `GET /management/payout-providers`  [admin]
- `GET /management/payout-providers/{id}/edit`  [admin]
- `GET /management/payouts`  [admin]

### Finance·Salaries (3)
- `GET /management/salaries`  [admin]
- `GET /management/salary-class-report`  [admin]
- `GET /management/staff-salaries`  [admin]

### Leads/CRM (13)
- `GET /management/new-requests`  [admin]
- `GET /management/new-requests/create`  [admin]
- `GET /management/new-requests/filter/CONTACTING`  [admin]
- `GET /management/new-requests/filter/DUPLICAT`  [admin]
- `GET /management/new-requests/filter/NO_RESPONSE`  [admin]
- `GET /management/new-requests/filter/PENDING`  [admin]
- `GET /management/new-requests/filter/QUALIFIED`  [admin]
- `GET /management/new-requests/filter/TEACHER`  [admin]
- `GET /management/new-requests/filter/TRIAL_MISSED`  [admin]
- `GET /management/new-requests/filter/TRIAL_TAKEN`  [admin]
- `GET /management/new-requests/requests`  [admin]
- `GET /management/new-requests/scheduled-trials/completed`  [admin]
- `GET /management/new-requests/scheduled-trials/index`  [admin]

### Messages (3)
- `GET /management/chat`  [admin]
- `POST /management/chat/loadMoreChats`  [admin]
- `GET /management/public-advertisement`  [admin]

### Other/Utility (16)
- `GET /`  [admin/teacher]
- `POST /broadcasting/auth`  [admin]
- `GET /fonts/Inter/Inter-Italic.ttf`  [admin/teacher]
- `GET /fonts/Inter/Inter-Variable.ttf`  [admin/family/teacher]
- `GET /livewire/livewire.min.js`  [admin/teacher]
- `GET /login`  [admin/family/teacher]
- `GET /main/index.html`  [family/teacher]
- `GET /management/downlaod`  [admin]
- `GET /management/export-course`  [admin]
- `GET /management/get-course-schedule/{id}`  [admin]
- `GET /management/get-course-schedules/{id}`  [admin]
- `GET /management/get-helper-data`  [admin]
- `GET /management/monthly-invoices`  [admin]
- `GET /management/total-queues`  [admin]
- `GET /socket.io`  [family]
- `GET /socket.io/`  [family]

### Profile (2)
- `GET /management/profile/edit`  [admin]
- `GET /management/profile/show`  [admin]

### Reports (9)
- `GET /management/analysis-course`  [admin]
- `GET /management/analysis-expenses`  [admin]
- `GET /management/analysis-invoices`  [admin]
- `GET /management/analysis-student`  [admin]
- `GET /management/class-feedback`  [admin]
- `GET /management/class-feedback/feedback`  [admin]
- `GET /management/sessions_analysis`  [admin]
- `GET /management/teacher-feedback`  [admin]
- `GET /management/teacher-feedback/feedback`  [admin]

### Reports·Forms (3)
- `GET /management/forms`  [admin]
- `GET /management/forms/create`  [admin]
- `GET /management/forms/students`  [admin]

### Sessions (4)
- `GET /management/courseClasses/default-member-course-details/{id}`  [admin]
- `GET /management/courseClasses/export-class/{id}`  [admin]
- `GET /management/courseClasses/{id}`  [admin]
- `GET /management/session-class-room/{enc}/{id}`  [admin]

### Sessions/Groups (2)
- `GET /management/group/index`  [admin]
- `GET /management/groups/create`  [admin]

### Settings (13)
- `GET /management/settings/customisation/message-builder`  [admin]
- `GET /management/settings/customisation/personalisation`  [admin]
- `GET /management/settings/general`  [admin]
- `GET /management/settings/integrations`  [admin]
- `GET /management/settings/integrations/whatsapp/families/insights`  [admin]
- `GET /management/settings/integrations/whatsapp/teachers/insights`  [admin]
- `GET /management/settings/integrations/{id}/configure`  [admin]
- `GET /management/settings/notification`  [admin]
- `GET /management/settings/payments/create`  [admin]
- `GET /management/settings/payments/{id}/edit`  [admin]
- `GET /management/settings/security/data`  [admin]
- `GET /management/settings/security/data/backup/send`  [admin]
- `GET /management/settings/security/policy`  [admin]

### Staff/RBAC (7)
- `GET /management/admins`  [admin]
- `GET /management/admins/appear/{id}`  [admin]
- `GET /management/admins/categories/{id}`  [admin]
- `GET /management/admins/create`  [admin]
- `GET /management/admins/duplicate/{id}`  [admin]
- `GET /management/admins/permission/{id}`  [admin]
- `GET /management/admins/{id}/edit`  [admin]

### Students (7)
- `GET /management/student`  [admin]
- `GET /management/student/status/SoftDelete`  [admin]
- `GET /management/student/status/{id}`  [admin]
- `GET /management/student/{id}`  [admin/teacher]
- `GET /management/student/{id}/create`  [admin]
- `GET /management/student/{id}/edit`  [admin]
- `GET /management/student/{id}/trial/create`  [admin]

### Tasks (1)
- `GET /management/tickets`  [admin]

### Teacher portal (24)
- `GET /teacher/chat`  [teacher]
- `POST /teacher/chat/loadMoreChats`  [teacher]
- `GET /teacher/course-history/main/index.html`  [teacher]
- `GET /teacher/course-history/{id}`  [teacher]
- `GET /teacher/course-history/{id}/class`  [teacher]
- `POST /teacher/get-schedual`  [teacher]
- `GET /teacher/home`  [admin/teacher]
- `GET /teacher/library`  [teacher]
- `GET /teacher/main/index.html`  [teacher]
- `GET /teacher/monthly-plans`  [teacher]
- `GET /teacher/monthly-plans/main/index.html`  [teacher]
- `GET /teacher/monthly-plans/{enc}/show`  [teacher]
- `GET /teacher/profile`  [teacher]
- `GET /teacher/profile-edit`  [teacher]
- `GET /teacher/salary`  [teacher]
- `GET /teacher/salary-class-report`  [teacher]
- `GET /teacher/session-class-room/{enc}/{id}`  [teacher]
- `GET /teacher/students`  [teacher]
- `GET /teacher/studentslist`  [teacher]
- `GET /teacher/teacher-history/1-`  [teacher]
- `GET /teacher/teacher-history/{id}`  [teacher]
- `GET /teacher/tickets`  [teacher]
- `GET /teacher/timetable`  [teacher]
- `GET /teacher/update-result`  [teacher]

### Teachers (19)
- `GET /management/public-holiday`  [admin]
- `GET /management/teacher-categories`  [admin]
- `GET /management/teacher-categories/create`  [admin]
- `GET /management/teacher-categories/{id}/create-members`  [admin]
- `GET /management/teacher-categories/{id}/edit`  [admin]
- `GET /management/teachers`  [admin]
- `GET /management/teachers/create`  [admin]
- `GET /management/teachers/scope/Active`  [admin]
- `GET /management/teachers/scope/Deleted`  [admin]
- `GET /management/teachers/scope/Inactive`  [admin]
- `GET /management/teachers/scope/Incomplete`  [admin]
- `GET /management/teachers/scope/Unconfirmed`  [admin]
- `GET /management/teachers/{id}`  [admin]
- `GET /management/teachers/{id}/compensations/create`  [admin]
- `GET /management/teachers/{id}/compensations/{id}`  [admin]
- `GET /management/teachers/{id}/compensations/{id}/edit`  [admin]
- `GET /management/teachers/{id}/edit`  [admin]
- `GET /management/teachers/{id}/monthly-classes`  [admin]
- `GET /management/teachers_details`  [admin]

### Timetable (7)
- `GET /management/all/teachers/timetable`  [admin]
- `GET /management/request-schedule/{id}/{id}`  [admin]
- `GET /management/schedule-sessions-response`  [admin]
- `GET /management/schedule-trials-response`  [admin]
- `GET /management/scheduled-actions`  [admin]
- `GET /management/scheduled-actions/create`  [admin]
- `GET /management/search-schedule`  [admin]

### Tools (1)
- `GET /management/time-convertor`  [admin]

## B. Mutation endpoints (from form actions — POST/PUT/DELETE)

> These are where the new frontend will POST. Each lists the top field names (legacy `name`s).

### Certificates
- `POST /management/pdf` ×1 [admin] — fields: textAlign, json_data, name, background

### Content
- `POST /management/materials/{id}` ×3 [admin] — fields: name, name_ar
- `POST /management/library` ×2 [admin] — fields: name, type_id, cat_id, type, category_id, file, thumbnail
- `POST /management/materials` ×1 [admin] — fields: name, name_ar

### Courses
- `POST /management/courses/{id}/update_status` ×17 [admin] — fields: course_id, status
- `POST /management/courses/{id}/delete` ×12 [admin] — fields: (no named fields)
- `POST /management/courses/{id}/store` ×3 [admin] — fields: family_hour_rate_type, teacher_hour_rate_type, material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], family_hour_rate, teacher_hour_rate, student_cancel, teacher_cancel, schedule[1][value], schedule[1][time]
- `POST /management/courses/{id}/store_free` ×2 [admin] — fields: teacher_hour_rate_type, material_id, teacher_id, start_date, schedule[0][value], schedule[0][time], schedule[0][duration], teacher_hour_rate, student_cancel, teacher_cancel
- `POST /management/courses/{id}/update` ×1 [admin] — fields: family_hour_rate_type, teacher_hour_rate_type, material_id, teacher_id, start_date, delete_old_sessions, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value], schedule[1][time], schedule[1][duration], schedule[2][value], schedule[2][time]

### Families
- `POST /management/families/{id}` ×16 [admin] — fields: course_type, send_info, first_name, last_name, user_name, first_name_ar, last_name_ar, password, member_id[], emails, phones, birth_date, join_at, gender
- `GET/POST /management/families/feedback` ×7 [admin] — fields: date, family_id, user_id
- `POST /management/categories/families/{id}/delete` ×4 [admin] — fields: (no named fields)
- `POST /management/categories/families/{id}/assign-family` ×2 [admin] — fields: member_id[]
- `POST /management/categories/families/{id}/update` ×2 [admin] — fields: name, status, description
- `POST /management/families/{id}/deactivate` ×2 [admin] — fields: (no named fields)
- `POST /management/families/{id}/invoice-adjustments/{id}` ×2 [admin] — fields: (no named fields)
- `POST /management/families/{id}/invoice-adjustments` ×2 [admin] — fields: type, amount, count, note
- `POST /management/families/{id}/location/update` ×2 [admin] — fields: country_id, city_id, type, timezone, timezone_diff
- `POST /management/families/{id}/preferences/update` ×2 [admin] — fields: language, auto_add_credit_to_invoice, pw_reset_method, whatsapp_private, renew_unpaid_courses, send_invoice, stop_after
- `POST /management/families/{id}/capabilities/update` ×2 [admin] — fields: can_chat, can_see_library, id
- `POST /management/families/{id}/store-notifications` ×2 [admin] — fields: invoice_by_whatsapp, invoice_by_email, invoice_reminders_by_whatsapp, invoice_reminders_by_email, class_reminders_by_whatsapp, class_reminders_by_email, class_updates_by_whatsapp, class_updates_by_email, course_updates_by_whatsapp, course_updates_by_email, certificate_by_whatsapp, certificate_by_email, family_status_by_whatsapp, family_status_by_email
- `POST /management/families/{id}/suspend` ×2 [admin] — fields: date, schedule_return, note
- `POST /management/families/{id}/stop` ×2 [admin] — fields: note
- `POST /management/families/{id}/activate` ×2 [admin] — fields: (no named fields)
- `POST /management/categories/families/store` ×1 [admin] — fields: name, status, description
- `POST /management/families` ×1 [admin] — fields: course_type, send_info, first_name, last_name, user_name, first_name_ar, last_name_ar, password, member_id[], emails, phones, birth_date, join_at, gender
- `POST /management/family/feedback-categories` ×1 [admin] — fields: name, status, description

### Family portal
- `POST /student/logout` ×11 [family] — fields: id
- `POST /student/profile-edit` ×1 [family] — fields: onlineImage, image, first_name, last_name, email
- `POST /student/update-password` ×1 [family] — fields: old_password, new_password, confirm_password
- `POST /student/request-trial` ×1 [family] — fields: request_type, name, age, language, gender, student_id, date, time, duration, course
- `POST /student/feedback` ×1 [family] — fields: student_name, teacher_name, teacher_rating, class_interactive, see_hear, like_teacher, complain, additional_comment
- `POST /student/upload-files` ×1 [family] — fields: session_id, files[], audio

### Finance·Banks
- `POST /management/banks` ×1 [admin] — fields: name

### Finance·Expenses
- `POST /management/expense` ×1 [admin] — fields: head_id, user_id, is_income, description, reason, amount, currency, date
- `POST /management/heads` ×1 [admin] — fields: name, status

### Finance·Invoices
- `GET/POST /management/invoices` ×28 [admin] — fields: status, date, date_type, currency, gateway, redirect_to, serial, due_date, family_id, price, discount, fees, additional, adjustment_type
- `POST /management/accountant/store-transaction` ×28 [admin] — fields: transaction_id, date_payment, invoiceID, basic, additional, taxes, total, currancy, getway

### Finance·Payouts
- `POST /management/payout-providers/{id}` ×4 [admin] — fields: mode, is_active, key1, key2, key3, key4
- `POST /management/payouts/approve` ×2 [admin] — fields: (no named fields)
- `POST /management/payouts` ×1 [admin] — fields: (no named fields)

### Finance·Salaries
- `POST /management/salaries` ×1 [admin] — fields: month, date_range, generateteacher, allteachers, teachers[]
- `POST /management/staff-salaries` ×1 [admin] — fields: staff_members[], month, date_range, generatestaff, allstaff

### Leads/CRM
- `GET/POST /management/new-requests` ×2 [admin] — fields: date_range, status, first_name, last_name, email, phone, friends_number, classes_Duration, hear_from, classes_count, gender, age, parent_age, language

### Messages
- `POST /management/public-advertisement-submit` ×1 [admin] — fields: type[], private, message, media[], expire_at, category_selected[], student_category_selected[], country_id, hours, language

### Other/Utility
- `POST /management/logout` ×294 [admin] — fields: id
- `POST /management/shortcuts` ×294 [admin] — fields: shortcut_title, shortcut_link
- `POST /` ×100 [admin] — fields: class_id, sendMessage, cancelTzType, markAsAttend, note, makupclass, add_to_credit, date, time, level, text, remark, summary, homework
- `POST /management/management/members/invoice` ×17 [admin] — fields: course_id, invoice
- `POST /management/export-aa` ×11 [admin] — fields: (no named fields)
- `POST /management/update-returning` ×9 [admin] — fields: id, returned_at, note
- `POST /management/store-request-schedule` ×2 [admin] — fields: student_id, request_type, course_id, parent_id, family_id, duration, accounting_statement, date, time, total_hours, start_date, schedule[0][value], schedule[0][time], schedule[0][duration]
- `POST /management/upload-certificate` ×2 [admin] — fields: fileInput, student_id, course_id
- `POST /management/create-certificate` ×2 [admin] — fields: teacher_id, student_id, course_id, student_name, teacher_name, description, date_certificate, pdfcertificat_id
- `POST /management/search-available-teacher` ×1 [admin] — fields: from, to, category_selected[], filter_by_available, filter_by_courses

### Profile
- `POST /management/profile/edit` ×1 [admin] — fields: onlineImage, image, name, email, username, password

### Reports
- `GET/POST /management/class-feedback` ×21 [admin] — fields: class_id, feedback_note, feedback_files[], teachers[], date_range, user_id
- `GET/POST /management/teacher-feedback` ×2 [admin] — fields: teachers[], date_month, date_year, date, teacher_id, feedback_note
- `POST /management/teacher-feedback/category` ×1 [admin] — fields: category_id, name, description, status

### Reports·Forms
- `POST /management/forms/colors/update` ×1 [admin] — fields: form_id
- `POST /management/forms` ×1 [admin] — fields: fields[1][is_required], form_name, day, fields[1][label], fields[1][type], fields[1][options][]

### Sessions
- `POST /management/courseClasses/edit-class` ×20 [admin] — fields: session_id, family_id, date, time, sendMessage, duration, teacher_id, accounting_statement
- `POST /management/courseClasses/add-classes` ×19 [admin] — fields: course_id, date, time, duration, teacher, accounting_statement, credit
- `POST /management/courseClasses/{id}` ×15 [admin] — fields: course_id, session_id

### Sessions/Groups
- `POST /management/groups` ×1 [admin] — fields: name, start_date, teacher, t_hour_rate, students[], s_hour_rate, course_id, suggested_total_hours, schedule[0][value], schedule[0][time], schedule[0][duration], schedule[1][value], schedule[1][time], schedule[1][duration]

### Settings
- `POST /management/settings/payments` ×7 [admin] — fields: xpay_url, payment_method, name, key1, key2, xpay_method[], key3, key4, settings[api_key]
- `POST /management/settings/security/data/import` ×4 [admin] — fields: type, file
- `POST /management/settings/payments/{id}` ×2 [admin] — fields: payment_method, name, key1
- `POST /management/settings/email-accounts` ×2 [admin] — fields: is_active, is_default, smtp_host, smtp_port, smtp_encryption, email_address, smtp_username, smtp_password
- `POST /management/settings/email-accounts/settings` ×2 [admin] — fields: smtp_host, smtp_port, smtp_encryption
- `POST /management/settings/customisation/personalisation` ×1 [admin] — fields: theme, container_layout, sidebar_type, card_style, color_scheme, secondary_color_scheme, class_statuses_colors[pending], class_statuses_colors[waiting], class_statuses_colors[teacher-absent], class_statuses_colors[student-absent], class_statuses_colors[teacher-cancel], class_statuses_colors[student-cancel], class_statuses_colors[admin-cancel], class_statuses_colors[attend]
- `POST /management/settings/general/update` ×1 [admin] — fields: company_name, company_name_ar, domain, email_info, phone, whatsapp, logo, country_id, city, timezone, address
- `POST /management/settings/general/teachers/update` ×1 [admin] — fields: settings_data[1], salary_period_type, salary_period_day, applayFins, fin[10]
- `POST /management/settings/general/courses-classes/update` ×1 [admin] — fields: send_plan_report, new_course_status, renew, stop_after, teacher_cancel_enable, student_cancel_enable, auto_makeup, auto_add_makeup_to_credit, auto_add_no_makeup_to_credit, classes_not_closed, classes_not_closed_hours, teacher_cancel_before_class, student_cancel_before_class, teacher_absent_student
- `POST /management/settings/general/accessibility/update` ×1 [admin] — fields: tfa, otp
- `POST /management/settings/notification/update` ×1 [admin] — fields: teacher_class_update_statuses[], student_class_update_statuses[], student_course_updates_statuses[], teacher_course_updates_statuses[], system_notifications, appnotifiy, course_updates, teacher_course_updates, student_course_updates, class_updates, teacher_class_updates_type, student_class_updates_type, class_reminder, teacher_reminder_type

### Staff/RBAC
- `POST /management/admins/{id}` ×6 [admin] — fields: name, email, username, phone, password, salary, currency, role, status, enable
- `POST /management/admins` ×3 [admin] — fields: name, email, username, phone, password, salary, currency, role, status, enable, source_id
- `POST /management/admins/categories/{id}` ×2 [admin] — fields: categories[]
- `POST /management/admins/permission/store` ×2 [admin] — fields: permisions[], userID

### Students
- `POST /management/student/{id}/delete` ×10 [admin] — fields: (no named fields)
- `POST /management/student/{id}/stop` ×4 [admin] — fields: note, date, schedule_return
- `POST /management/student/{id}/store` ×2 [admin] — fields: name, name_ar, language, gender, birth_date, teacher_note, admin_note, hasTrial, material, teacher_id, duration, accounting_statement, date, time
- `POST /management/student/{id}/update` ×2 [admin] — fields: name, name_ar, language, gender, birth_date, teacher_note, admin_note
- `POST /management/student/{id}/trial/store` ×2 [admin] — fields: studies_ages, student_id, material_id, duration, accounting_statement, date, time, teacher_id

### Teacher portal
- `POST /teacher/logout` ×21 [teacher] — fields: id
- `POST /teacher/shortcuts` ×21 [teacher] — fields: shortcut_title, shortcut_link
- `POST /teacher/student-progress` ×5 [admin/teacher] — fields: learning_progress, focus, homework_completion, punctuality, rescheduled_sessions, month, achievements, additional_support, learning_objectives, student_id, course_id, teacher_id, course_name, action
- `POST /teacher/classes-end` ×4 [teacher] — fields: class_id, remark, summary, homework, notes, images[]
- `POST /teacher/classes-absent` ×4 [teacher] — fields: class_id, video, notes
- `POST /teacher/edit-class` ×4 [teacher] — fields: session_id, parent_id, teacher_id, date, time, sendMessage, duration
- `POST /teacher/profile-edit` ×1 [teacher] — fields: onlineImage, image, first_name, last_name, email
- `POST /teacher/update-teacher-password` ×1 [teacher] — fields: old_password, new_password, confirm_password
- `POST /teacher/certificate-request` ×1 [teacher] — fields: course_id, description, date_certificate
- `POST /teacher/timetable` ×1 [teacher] — fields: course_id

### Teachers
- `GET/POST /management/teachers` ×56 [admin] — fields: material_id, category_id, sort_by, sort_direction, page, level[], age_student[], salary_type, send_info, first_name, last_name, first_name_ar, last_name_ar, email
- `GET/POST /management/teachers/{id}` ×50 [admin] — fields: level[], age_student[], salary_type, type, date_range, send_info, first_name, last_name, first_name_ar, last_name_ar, email, password, user_name, national_id
- `POST /management/teachers/{id}/compensations/{id}` ×22 [admin] — fields: redirect_to, type, amount, month, year, description
- `POST /management/teacher-categories/{id}` ×3 [admin] — fields: name, status, description
- `POST /management/public-holiday-submit` ×1 [admin] — fields: from_date, from_time, to_date, to_time, category_selected[]
- `POST /management/teacher-categories/{id}/store-members` ×1 [admin] — fields: member_id[]
- `POST /management/teacher-categories` ×1 [admin] — fields: name, status, description
- `POST /management/teachers/{id}/deactivate` ×1 [admin] — fields: fragment_id
- `POST /management/teachers/{id}/location/update` ×1 [admin] — fields: country_id, city_id, type, timezone, timezone_diff
- `POST /management/teachers/{id}/preferences/update` ×1 [admin] — fields: language, pw_reset_method, whatsapp_private
- `POST /management/teachers/{id}/capabilities/update` ×1 [admin] — fields: can_chat, can_see_library, can_edit_schedule, can_edit_class, id
- `POST /management/teacher/teacher-notifications/{id}` ×1 [admin] — fields: course_updates_by_whatsapp, course_updates_by_email, class_reminders_by_whatsapp, class_reminders_by_email, class_updates_by_whatsapp, class_updates_by_email, salary_by_whatsapp, salary_by_email
- `POST /management/teachers/{id}/compensations` ×1 [admin] — fields: type, amount, month, year, description, redirect_to

### Timetable
- `POST /management/scheduled-actions` ×16 [admin] — fields: criteria[cancel_type], action_type, target_id, scheduled_date, note, back, criteria[teacher_id], criteria[material_id], criteria[reschedule_date], criteria[reschedule_time], criteria[add_to_credit], returned_at, schedule_auto_return, family_target_id

## C. Distinct table shapes (entity list/detail columns)

> 104 distinct column‑sets across the app. Top shapes by reuse:

| ×pages | Roles | Columns |
|--:|---|---|
| 55 | admin | #, Teacher Name, Status, All students has course, Total Hours, Phone number, Schedule, Country, Created at, Settings |
| 26 | admin | #, Ordered Number, Due Date, Parent, Payment Date, Payment Id, Total Price, Total: (AED), Status, Actions |
| 18 | admin | Category, Percentage |
| 18 | admin | Student, Teacher, Duration, Week Days, Time, Week Days, Time |
| 14 | admin | #, Student Name, Teacher Name, Date, Total Hours, Status, Invoice, Price, Actions |
| 11 | admin | #, Class Time, Student/Group Name, Teacher Name, Course Details, Left hours, Class Status, Actions |
| 9 | admin | #, Family name, Phone number, Join Date, User Name, Course Type, No. Children, Country, Hour Rate, Total Hours, Returned date, Actions |
| 9 | admin | #, Date, Parent name, E-mail, Phone number, Status, Actions |
| 9 | admin | Name, Age |
| 9 | admin | #, Date, Users, All Notes |
| 8 | admin | #, Student Name, Parent name, Timezone, Whatsapp Group, Language, Gender, Age |
| 7 | admin | Currency, Code, Rate |
| 6 | admin | #, Account, Link |
| 6 | admin | #, Added by, Level, Text, Status, Created at |
| 6 | admin | #, Name, Status, Last Feedback, Next Meeting, Meeting Manager, Actions |
| 6 | admin | #, Name, Number Of Family, Key 1, Key 2, Settings |
| 4 | admin | #, Student Name, Family, Teacher Name, Admin Date, Duration, Student, Teacher, Profit, Status |
| 4 | admin | Student, Status, Teacher Name, course details, Subscription, Options |
| 4 | admin | #, Select All, Teacher Name |
| 4 | admin | Column Name, Format / Example |
| 4 | teacher | #, Class Time, Student Name, Course Name, Class Status, History, Action |
| 4 | family/teacher | Class Date & Time, Teacher Name, Show |
| 3 | admin | Categorization, WhatsApp, E-mail |
| 2 | admin | #, Day, Date, Time Student Timezone, Duration, Status |
| 2 | admin | Payment Id, Payment Date, Due Date, Amount, Status, Actions |
| 2 | admin | Biller Name, Serial, Amount, Status, Actions |
| 2 | admin | #, value, invoices_count, Type, invoices, Note, Actions |
| 2 | admin | session, Student, Teacher, Duration, Actions |
| 2 | admin | #, Meeting Date, Meeting Time, Meeting Manager, Family Members, Status, Action |
| 2 | admin | #, Name, Description, Status, Settings |
| 2 | admin | Start Date, Serial, Item, Student, Price |
| 2 | admin | Teacher, Date, Duration, Status, Actions |
| 2 | admin | Rank, Teacher, Trials |
| 2 | admin | #, Teacher, Amount, Method, Status, Month, Requested at |
| 2 | admin | #, Teacher Name |
| 2 | admin | #, Teacher Name, Message from teacher, Options |
| 2 | admin | #, Email Address, Default, Status, Settings |
| 2 | admin | #, Family name, Phone number, Group Name, Status |
| 2 | admin | #, certificate, Options |
| 2 | admin | #, Month, Teacher Name, Course Name, View, Delete, Edit, Approve |
| 2 | admin | Student Name, Status, Course Name, Course Status, Teacher |
| 2 | admin/teacher | Name, Total:, Pending, Overdue, Completed, Average |
| 2 | family | No Teachers |
| 1 | admin | #, Serial, Invoice Date, Total Net Price, Total Additions, Discount Value, Fees Value, Other Effects, Final Total Price, Paid At, Family |
| 1 | admin | #, Month, Teachers Total Salary, Staff Total Salary |
| 1 | admin | Name, User Name, Phone number, Role, Actions |
| 1 | admin | Month, Expected Revenue, Actual Revenue, Expected Net Profit, Actual Net Profit, Teachers Salaries, Staff Salaries, Expenses, Total Expenses |
| 1 | admin | #, Family name, Paid, Due, Overdue |
| 1 | admin | #, Bank Name, Settings |
| 1 | admin | #, Name, Description, Status, Count, Settings |
| 1 | admin | #, Student Name, Course Name, Teacher Name, Description, Date, Action |
| 1 | admin | #, Teacher Name, Percentage, session count |
| 1 | admin | Student Name, محمد احمد, Parent name, abdo ahmed |
| 1 | admin | Serial Number, Eg91718 |
| 1 | admin | #, Class Date & Time Student, Teacher Name, Duration Price, Course Details, Status, Actions |
| 1 | admin | #, Name of Income or Outcome, Value, Currency, Description, Date, Reason, Name of Executor, Transaction Type, Actions |
| 1 | admin | #, Parents, Manager, Meeting Date, Meeting Time, Meeting Manager, Status, Actions |
| 1 | admin | Student: |
| 1 | admin | Manager, — |
| 1 | admin | Student, Teacher |

## D. Reference enums (observed in option lists / fields)

- **Currencies (16):** AED(base), AUD, CAD, EGP, EUR, GBP, KWD, MAD, PKR, QAR, RUB, RWF, SAR, TRY, USD, YER.
- **Languages (10):** Arabic, English, French, German, Italian, Portuguese, Russian, Spanish, Turkish, Urdu.
- **Durations (min):** 10,15,20,25,30,40,45,50,60,75,80,90,120,150,180.
- **Age groups:** Children (1–10), Teens (11–20), Adults (>20).
- **Accounting statement:** According to teacher / Paid / Paid if continue / Free.
- **Class remark:** Excellent / Very Good / Good / Acceptable / Needs Improvement.
- **Session statuses (11):** Pending, Waiting, Running, Attended, Student Absent, Teacher Absent, Student Cancel, Teacher Cancel, Admin Cancel, Reschedule, Make‑up.
- **Course types (4):** Monthly Subscription, Hours per Course, Hours Subscription, Number Session.
- **Family/Student statuses (7):** On Trial, Incomplete, Active, Stopped/Stop, Suspended, Inactive, Deleted.
- **Payout statuses (8):** Pending approval, Approved, Rejected, Successful, Failed, Pending, Returned, Unknown.
- **Staff roles (4):** Manager, Accountant, Supervisor, Support.

## E. Honesty: observed vs inferred

- **Observed:** the GET routes (network log), the form action URLs + field `name`s, table columns, badge/status strings, option enums.
- **Inferred:** entity field semantics, required/validation rules, relationships, the *JSON API contract* (none was observed — pages are server‑rendered HTML), real‑time/upload/export/PDF/payment internals.
- **Do not invent endpoints.** Anything not in A/B above is a *need*, not a discovered API. Confirm with backend (see open decisions).
