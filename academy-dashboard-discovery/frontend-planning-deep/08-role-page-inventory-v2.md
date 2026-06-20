# 08 — Role × Page Inventory (v2, template‑level, exhaustive)

> Every captured page collapses into a **route template**; this lists all templates (variants folded in), with exact structural counts from the verified extraction and the spec each maps to. Per‑page detail is in [02](02-all-pages-expanded-inventory.md); coverage proof in [19](19-spec-coverage-map.md). Counts exclude global chrome (logout/search/shortcuts/Recent Searches).

**339 captured pages → 178 route templates** (admin 145, teacher 22, family 11). 'var' = how many captured pages share this template (query‑param variants).


## admin · Assignments / Homework

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/tickets` | `management-tickets` | 1 | S006 | 0 | 0 | 0 | 1 | 5 | 0 |  |

## admin · Certificates

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/certificate-requests` | `management-certificate-requests` | 1 | S006 | 0 | 0 | 1 | 1 | 3 | 0 |  |
| `/management/pdf` | `management-pdf` | 1 | S006 | 0 | 0 | 0 | 1 | 0 | 0 |  |
| `/management/pdf/create` | `management-pdf-create` | 1 | S006 | 1 | 18 | 0 | 0 | 1 | 0 |  |

## admin · Classes / Live Sessions

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/class-feedback` | `management-class-feedback` | 1 | S002 | 1 | 3 | 0 | 1 | 3 | 0 |  |
| `/management/class-feedback/feedback` | `management-class-feedback-feedback` | 2 | S002 | 1 | 4 | 0 | 0 | 8 | 0 | 1 variants |
| `/management/group/index` | `management-group-index` | 1 | S005 | 0 | 0 | 0 | 2 | 0 | 0 |  |
| `/management/groups/create` | `management-groups-create` | 1 | S005 | 1 | 45 | 0 | 0 | 12 | 0 |  |
| `/management/salary-class-report` | `management-salary-class-report` | 1 | S007 | 1 | 3 | 0 | 0 | 5 | 0 |  |
| `/management/schedule-sessions-response` | `management-schedule-sessions-response` | 1 | S005 | 0 | 0 | 2 | 3 | 0 | 0 |  |
| `/management/session-class-room/{enc}/{id}` | `management-session-class-room-mq-3` | 1 | S005 | 5 | 30 | 7 | 2 | 20 | 14 |  |
| `/management/sessions_analysis` | `management-sessions-analysis` | 1 | S002 | 1 | 10 | 0 | 0 | 7 | 0 |  |

## admin · Content / Materials / Library

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/library` | `management-library` | 1 | S004 | 3 | 12 | 2 | 2 | 3 | 0 |  |
| `/management/materials` | `management-materials` | 1 | S004 | 2 | 4 | 0 | 1 | 0 | 0 |  |
| `/management/materials/{id}/edit` | `management-materials-1-edit` | 1 | S004 | 1 | 4 | 0 | 0 | 0 | 0 |  |
| `/management/materials/create` | `management-materials-create` | 1 | S004 | 1 | 3 | 0 | 0 | 0 | 0 |  |

## admin · Courses

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/courses` | `management-courses` | 14 | S004 | 8 | 64 | 6 | 2 | 16 | 0 | 13 variants |
| `/management/courses/{id}` | `management-courses-1` | 1 | S004 | 17 | 85 | 13 | 3 | 19 | 14 |  |
| `/management/courses/{id}/create` | `management-courses-1-create` | 2 | S004 | 1 | 17 | 0 | 0 | 10 | 0 | 1 variants |
| `/management/courses/{id}/create_free` | `management-courses-1-create-free` | 2 | S004 | 1 | 14 | 0 | 0 | 10 | 0 | 1 variants |
| `/management/courses/{id}/edit` | `management-courses-1-edit` | 1 | S004 | 1 | 31 | 0 | 1 | 16 | 0 |  |
| `/management/courses/create_new_copy/{id}` | `management-courses-create-new-copy-1` | 1 | S004 | 1 | 29 | 0 | 1 | 16 | 0 |  |

## admin · Dashboard / Home

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/banks` | `management-banks` | 1 | S007 | 0 | 0 | 0 | 1 | 0 | 0 |  |
| `/management/banks/create` | `management-banks-create` | 1 | S007 | 1 | 2 | 0 | 0 | 0 | 0 |  |
| `/management/courseclasses/{id}` | `management-courseclasses-1` | 6 | S005 | 3 | 17 | 9 | 3 | 10 | 14 | 5 variants |
| `/management/family/feedback-categories/create` | `management-family-feedback-categories-create` | 1 | S003 | 1 | 4 | 0 | 0 | 1 | 0 |  |
| `/management/home` | `management-home` | 11 | S010 | 7 | 34 | 7 | 2 | 20 | 14 | 10 variants |
| `/management/new-requests/create` | `management-new-requests-create` | 1 | S003 | 1 | 22 | 0 | 0 | 2 | 0 |  |
| `/management/total-queues` | `management-total-queues` | 1 | S002 | 1 | 2 | 0 | 1 | 2 | 0 |  |
| `/teacher/home` | `teacher-home` | 2 | S009 | 7 | 34 | 7 | 2 | 20 | 14 | 1 variants |

## admin · General / Unknown

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/courseclasses/default-member-course-details/{id}` | `management-courseclasses-default-member-course-details-1` | 1 | S005 | 1 | 2 | 1 | 2 | 0 | 0 |  |
| `/management/export-course` | `management-export-course` | 1 | S011 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 500 |
| `/management/families/feedback/family/{id}` | `management-families-feedback-family-1` | 2 | S003 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 500, 1 variants |
| `/management/heads` | `management-heads` | 1 | S007 | 2 | 7 | 2 | 1 | 2 | 0 |  |
| `/management/new-requests/requests` | `management-new-requests-requests-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 5 | 3 | 3 | 5 | 0 |  |
| `/management/new-requests/scheduled-trials/index` | `management-new-requests-scheduled-trials-index-status-3-4-date-2026-06-01-to-202` | 2 | S002 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 500, 1 variants |
| `/management/scheduled-actions` | `management-scheduled-actions` | 1 | S011 | 1 | 2 | 0 | 1 | 3 | 0 |  |
| `/management/scheduled-actions/create` | `management-scheduled-actions-create` | 1 | S011 | 1 | 20 | 0 | 0 | 19 | 0 |  |
| `/management/settings/customisation/message-builder` | `management-settings-customisation-message-builder` | 1 | S011 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 504 |
| `/management/teachers/{id}/monthly-classes` | `management-teachers-1-monthly-classes` | 1 | S004 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 500 |
| `/management/time-convertor` | `management-time-convertor` | 1 | S011 | 0 | 0 | 1 | 1 | 2 | 6 |  |

## admin · Messages / Notifications

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/chat` | `management-chat` | 1 | S008 | 5 | 15 | 3 | 0 | 6 | 0 |  |
| `/management/public-advertisement` | `management-public-advertisement` | 1 | S008 | 1 | 16 | 0 | 2 | 8 | 0 |  |
| `/management/settings/notification` | `management-settings-notification` | 1 | S011 | 1 | 48 | 0 | 0 | 10 | 0 |  |

## admin · Parents / Guardians / Families

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/categories/families` | `management-categories-families` | 1 | S003 | 4 | 8 | 0 | 1 | 0 | 0 |  |
| `/management/categories/families/{id}/assign` | `management-categories-families-2-assign` | 2 | S003 | 1 | 3 | 0 | 0 | 2 | 0 | 1 variants |
| `/management/categories/families/{id}/edit` | `management-categories-families-2-edit` | 2 | S003 | 1 | 5 | 0 | 0 | 1 | 0 | 1 variants |
| `/management/categories/families/create` | `management-categories-families-create` | 1 | S003 | 1 | 4 | 0 | 0 | 1 | 0 |  |
| `/management/families` | `management-families` | 1 | S003 | 6 | 44 | 1 | 1 | 48 | 0 |  |
| `/management/families/{id}` | `management-families-1` | 2 | S003 | 16 | 93 | 5 | 7 | 20 | 16 | 1 variants |
| `/management/families/{id}/edit` | `management-families-1-edit` | 2 | S003 | 1 | 34 | 0 | 0 | 14 | 0 | 1 variants |
| `/management/families/create` | `management-families-create` | 1 | S003 | 1 | 37 | 0 | 0 | 17 | 0 |  |
| `/management/families/feedback` | `management-families-feedback` | 1 | S003 | 5 | 14 | 3 | 2 | 2 | 0 |  |
| `/management/families/feedback/students` | `management-families-feedback-students` | 6 | S003 | 2 | 5 | 0 | 1 | 2 | 0 | 5 variants |
| `/management/families/index/filter` | `management-families-index-filter-payment-methods-0-1` | 1 | S003 | 6 | 44 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/active` | `management-families-status-active` | 1 | S003 | 6 | 44 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/deleted` | `management-families-status-deleted` | 1 | S003 | 2 | 36 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/inactive` | `management-families-status-inactive` | 1 | S003 | 2 | 36 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/incomplete` | `management-families-status-incomplete` | 1 | S003 | 2 | 36 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/stopped` | `management-families-status-stopped` | 1 | S003 | 2 | 36 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/suspended` | `management-families-status-suspended` | 1 | S003 | 2 | 36 | 1 | 1 | 48 | 0 |  |
| `/management/families/status/trial` | `management-families-status-trial` | 1 | S003 | 2 | 36 | 1 | 1 | 48 | 0 |  |
| `/management/family/feedback-categories` | `management-family-feedback-categories` | 1 | S003 | 0 | 0 | 0 | 1 | 0 | 0 |  |
| `/management/settings/integrations/whatsapp/families/insights` | `management-settings-integrations-whatsapp-families-insights` | 1 | S011 | 0 | 0 | 0 | 1 | 0 | 0 |  |

## admin · Payments / Invoices

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/accounting/transaction/invoices` | `management-accounting-transaction-invoices` | 1 | S007 | 1 | 2 | 1 | 2 | 3 | 1 |  |
| `/management/accounting/transaction/salary` | `management-accounting-transaction-salary` | 1 | S007 | 1 | 1 | 1 | 2 | 2 | 1 |  |
| `/management/accounting/transaction/session` | `management-accounting-transaction-session` | 4 | S007 | 1 | 6 | 1 | 2 | 7 | 1 | 3 variants |
| `/management/analysis-invoices` | `management-analysis-invoices` | 1 | S002 | 1 | 4 | 0 | 1 | 2 | 1 |  |
| `/management/downlaod` | `management-downlaod` | 8 | S007 | 2 | 15 | 1 | 1 | 8 | 0 | 7 variants |
| `/management/invoices` | `management-invoices` | 18 | S007 | 2 | 15 | 1 | 1 | 8 | 0 | 17 variants |
| `/management/invoices/create-parent-invoice/{id}` | `management-invoices-create-parent-invoice-1` | 2 | S007 | 1 | 18 | 0 | 2 | 5 | 0 | 1 variants |
| `/management/monthly-invoices` | `management-monthly-invoices` | 1 | S007 | 1 | 1 | 0 | 1 | 1 | 0 |  |
| `/management/settings/payments/{id}/edit` | `management-settings-payments-1-edit` | 1 | S007 | 1 | 5 | 0 | 0 | 0 | 0 |  |
| `/management/settings/payments/create` | `management-settings-payments-create-payment-method-1` | 7 | S007 | 1 | 7 | 0 | 0 | 0 | 0 | 6 variants |

## admin · Profile / Account

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/profile/edit` | `management-profile-edit` | 1 | S011 | 1 | 7 | 0 | 0 | 0 | 0 |  |
| `/management/profile/show` | `management-profile-show` | 1 | S011 | 1 | 4 | 0 | 0 | 0 | 0 |  |
| `/management/settings/security/data` | `management-settings-security-data` | 1 | S011 | 4 | 12 | 1 | 5 | 1 | 0 |  |
| `/management/settings/security/policy` | `management-settings-security-policy` | 1 | S011 | 0 | 0 | 0 | 0 | 2 | 0 |  |

## admin · Reports / Analytics

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/forms` | `management-forms` | 1 | S006 | 1 | 2 | 1 | 1 | 0 | 0 |  |
| `/management/forms/create` | `management-forms-create` | 1 | S006 | 1 | 8 | 0 | 0 | 2 | 0 |  |
| `/management/new-requests` | `management-new-requests` | 1 | S003 | 1 | 2 | 0 | 0 | 1 | 0 |  |
| `/management/new-requests/filter/contacting` | `management-new-requests-filter-contacting-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/filter/duplicat` | `management-new-requests-filter-duplicat-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/filter/no_response` | `management-new-requests-filter-no-response-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/filter/pending` | `management-new-requests-filter-pending-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/filter/qualified` | `management-new-requests-filter-qualified-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/filter/trial_missed` | `management-new-requests-filter-trial-missed-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/filter/trial_taken` | `management-new-requests-filter-trial-taken-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/teacher-feedback/feedback` | `management-teacher-feedback-feedback-teacher-id-1-year-2026` | 1 | S002 | 1 | 2 | 0 | 0 | 3 | 0 |  |

## admin · Roles / Permissions

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/admins/permission/{id}` | `management-admins-permission-6` | 2 | S004 | 1 | 173 | 0 | 0 | 0 | 0 | 1 variants |

## admin · Settings

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/settings/customisation/personalisation` | `management-settings-customisation-personalisation` | 1 | S011 | 1 | 37 | 0 | 0 | 0 | 0 |  |
| `/management/settings/general` | `management-settings-general` | 1 | S011 | 4 | 49 | 0 | 0 | 10 | 10 |  |
| `/management/settings/integrations` | `management-settings-integrations` | 1 | S011 | 0 | 0 | 0 | 0 | 0 | 0 |  |
| `/management/settings/integrations/{id}/configure` | `management-settings-integrations-1-configure` | 11 | S011 | 0 | 0 | 0 | 0 | 1 | 4 | 10 variants |
| `/management/settings/security/data/backup/send` | `management-settings-security-data-backup-send` | 1 | S011 | 2 | 15 | 0 | 1 | 1 | 8 |  |

## admin · Students

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/analysis-course` | `management-analysis-course` | 1 | S002 | 0 | 0 | 0 | 0 | 3 | 1 |  |
| `/management/analysis-student` | `management-analysis-student` | 1 | S002 | 0 | 0 | 0 | 0 | 1 | 1 |  |
| `/management/forms/students` | `management-forms-students` | 1 | S006 | 3 | 33 | 2 | 1 | 4 | 0 |  |
| `/management/student` | `management-student` | 1 | S003 | 2 | 4 | 0 | 1 | 1 | 0 |  |
| `/management/student/{id}` | `management-student-1` | 3 | S009 | 19 | 103 | 20 | 6 | 35 | 24 | 2 variants |
| `/management/student/{id}/create` | `management-student-1-create` | 2 | S003 | 1 | 15 | 0 | 0 | 8 | 0 | 1 variants |
| `/management/student/{id}/edit` | `management-student-1-edit` | 2 | S003 | 1 | 9 | 0 | 0 | 3 | 0 | 1 variants |
| `/management/student/{id}/trial/create` | `management-student-1-trial-create` | 2 | S003 | 1 | 12 | 0 | 0 | 8 | 0 | 1 variants |
| `/management/student/status/{id}` | `management-student-status-0` | 6 | S003 | 0 | 0 | 0 | 1 | 1 | 0 | 5 variants |
| `/management/student/status/softdelete` | `management-student-status-softdelete` | 1 | S003 | 0 | 0 | 0 | 1 | 1 | 0 |  |

## admin · Teachers

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/admins` | `management-admins` | 1 | S004 | 4 | 8 | 0 | 1 | 0 | 0 |  |
| `/management/admins/{id}/edit` | `management-admins-6-edit` | 2 | S004 | 1 | 12 | 0 | 0 | 4 | 0 | 1 variants |
| `/management/admins/appear/{id}` | `management-admins-appear-6` | 2 | S004 | 2 | 3 | 0 | 0 | 0 | 0 | 1 variants |
| `/management/admins/categories/{id}` | `management-admins-categories-6` | 2 | S004 | 1 | 4 | 0 | 0 | 0 | 0 | 1 variants |
| `/management/admins/create` | `management-admins-create` | 1 | S004 | 1 | 11 | 0 | 0 | 4 | 0 |  |
| `/management/admins/duplicate/{id}` | `management-admins-duplicate-6` | 2 | S004 | 1 | 12 | 0 | 0 | 4 | 0 | 1 variants |
| `/management/all/teachers/timetable` | `management-all-teachers-timetable` | 1 | S005 | 0 | 0 | 0 | 0 | 0 | 0 |  |
| `/management/new-requests/filter/teacher` | `management-new-requests-filter-teacher-date-range-2026-06-01-to-2026-06-30` | 1 | S002 | 3 | 6 | 3 | 3 | 2 | 0 |  |
| `/management/new-requests/scheduled-trials/completed` | `management-new-requests-scheduled-trials-completed-date-2026-06-01-to-2026-06-30` | 2 | S002 | 3 | 6 | 1 | 2 | 5 | 0 | 1 variants |
| `/management/public-holiday` | `management-public-holiday` | 1 | S004 | 1 | 12 | 0 | 1 | 4 | 0 |  |
| `/management/settings/integrations/whatsapp/teachers/insights` | `management-settings-integrations-whatsapp-teachers-insights` | 1 | S011 | 0 | 0 | 0 | 1 | 0 | 0 |  |
| `/management/teacher-categories` | `management-teacher-categories` | 1 | S004 | 2 | 4 | 0 | 1 | 0 | 0 |  |
| `/management/teacher-categories/{id}/create-members` | `management-teacher-categories-1-create-members` | 1 | S004 | 1 | 3 | 0 | 0 | 2 | 0 |  |
| `/management/teacher-categories/{id}/edit` | `management-teacher-categories-1-edit` | 1 | S004 | 1 | 5 | 0 | 0 | 1 | 0 |  |
| `/management/teacher-categories/create` | `management-teacher-categories-create` | 1 | S004 | 1 | 4 | 0 | 0 | 1 | 0 |  |
| `/management/teacher-feedback` | `management-teacher-feedback` | 1 | S002 | 3 | 12 | 3 | 2 | 3 | 0 |  |
| `/management/teachers` | `management-teachers` | 15 | S004 | 3 | 6 | 0 | 1 | 2 | 0 | 14 variants |
| `/management/teachers/{id}` | `management-teachers-1` | 1 | S004 | 14 | 56 | 0 | 8 | 16 | 16 |  |
| `/management/teachers/{id}/compensations/{id}` | `management-teachers-1-compensations-1` | 3 | S004 | 0 | 0 | 0 | 0 | 0 | 0 | 2 variants |
| `/management/teachers/{id}/compensations/{id}/edit` | `management-teachers-1-compensations-1-edit` | 3 | S004 | 1 | 8 | 0 | 0 | 3 | 0 | 2 variants |
| `/management/teachers/{id}/compensations/create` | `management-teachers-1-compensations-create` | 1 | S004 | 1 | 7 | 0 | 0 | 3 | 0 |  |
| `/management/teachers/{id}/edit` | `management-teachers-1-edit` | 1 | S004 | 1 | 54 | 0 | 0 | 11 | 0 |  |
| `/management/teachers/create` | `management-teachers-create` | 1 | S004 | 1 | 57 | 0 | 0 | 15 | 0 |  |
| `/management/teachers_details` | `management-teachers-details` | 1 | S004 | 2 | 4 | 0 | 1 | 1 | 0 |  |
| `/management/teachers/scope/active` | `management-teachers-scope-active` | 8 | S004 | 3 | 6 | 0 | 1 | 2 | 0 | 7 variants |
| `/management/teachers/scope/deleted` | `management-teachers-scope-deleted` | 8 | S004 | 1 | 2 | 0 | 1 | 2 | 0 | 7 variants |
| `/management/teachers/scope/inactive` | `management-teachers-scope-inactive` | 8 | S004 | 1 | 2 | 0 | 1 | 2 | 0 | 7 variants |
| `/management/teachers/scope/incomplete` | `management-teachers-scope-incomplete` | 8 | S004 | 1 | 2 | 0 | 1 | 2 | 0 | 7 variants |
| `/management/teachers/scope/unconfirmed` | `management-teachers-scope-unconfirmed` | 8 | S004 | 1 | 2 | 0 | 1 | 2 | 0 | 7 variants |

## admin · Timetable / Schedule

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/request-schedule/{id}/{id}` | `management-request-schedule-1-1` | 2 | S005 | 1 | 57 | 0 | 1 | 17 | 0 | 1 variants |
| `/management/schedule-trials-response` | `management-schedule-trials-response` | 1 | S005 | 0 | 0 | 2 | 3 | 0 | 0 |  |
| `/management/search-schedule` | `management-search-schedule` | 1 | S005 | 1 | 11 | 0 | 0 | 2 | 0 |  |

## admin · Wallet / Finance

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/management/accounting` | `management-accounting` | 1 | S007 | 1 | 1 | 1 | 1 | 2 | 0 |  |
| `/management/analysis-expenses` | `management-analysis-expenses` | 1 | S002 | 0 | 0 | 0 | 1 | 3 | 1 |  |
| `/management/expense` | `management-expense` | 1 | S007 | 2 | 19 | 2 | 1 | 10 | 0 |  |
| `/management/payout-providers` | `management-payout-providers` | 1 | S007 | 0 | 0 | 0 | 1 | 0 | 0 |  |
| `/management/payout-providers/{id}/edit` | `management-payout-providers-6-edit` | 2 | S007 | 1 | 8 | 0 | 0 | 1 | 0 | 1 variants |
| `/management/payouts` | `management-payouts` | 2 | S007 | 2 | 4 | 0 | 1 | 3 | 0 | 1 variants |
| `/management/salaries` | `management-salaries` | 1 | S007 | 2 | 7 | 3 | 2 | 4 | 0 |  |
| `/management/staff-salaries` | `management-staff-salaries` | 1 | S007 | 1 | 8 | 1 | 1 | 4 | 0 |  |

## teacher · Assignments / Homework

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/tickets` | `teacher-tickets` | 1 | S009 | 0 | 0 | 0 | 1 | 5 | 0 |  |

## teacher · Classes / Live Sessions

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/course-history/{id}/class` | `teacher-course-history-1-class` | 2 | S009 | 0 | 0 | 0 | 0 | 0 | 0 | 1 variants |
| `/teacher/salary-class-report` | `teacher-salary-class-report` | 1 | S009 | 1 | 2 | 0 | 0 | 2 | 0 |  |
| `/teacher/session-class-room/{enc}/{id}` | `teacher-session-class-room-mq-2` | 1 | S009 | 5 | 37 | 4 | 1 | 5 | 0 |  |

## teacher · Content / Materials / Library

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/library` | `teacher-library` | 1 | S009 | 1 | 2 | 0 | 0 | 3 | 0 |  |

## teacher · General / Unknown

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/main/index.html` | `main-index-html` | 2 | S010 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 404, 1 variants |
| `/teacher/course-history/main/index.html` | `teacher-course-history-main-index-html` | 1 | S009 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 404 |
| `/teacher/main/index.html` | `teacher-main-index-html` | 1 | S009 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 404 |
| `/teacher/monthly-plans/main/index.html` | `teacher-monthly-plans-main-index-html` | 1 | S009 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 404 |
| `/teacher/profile` | `teacher-profile` | 1 | S009 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 500 |

## teacher · Messages / Notifications

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/chat` | `teacher-chat` | 1 | S009 | 3 | 3 | 1 | 0 | 0 | 0 |  |

## teacher · Profile / Account

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/profile-edit` | `teacher-profile-edit` | 1 | S009 | 2 | 10 | 0 | 0 | 0 | 0 |  |

## teacher · Students

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/students` | `teacher-students` | 1 | S009 | 2 | 30 | 2 | 1 | 1 | 0 |  |
| `/teacher/studentslist` | `teacher-studentslist` | 1 | S009 | 3 | 36 | 3 | 1 | 2 | 0 |  |
| `/teacher/update-result` | `teacher-update-result-date-range-2026-06-01-to-2026-06-30-filter-student` | 1 | S009 | 1 | 2 | 0 | 1 | 2 | 0 |  |

## teacher · Teachers

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/course-history/{id}` | `teacher-course-history-1` | 1 | S009 | 0 | 0 | 1 | 1 | 0 | 0 |  |
| `/teacher/monthly-plans` | `teacher-monthly-plans` | 1 | S009 | 2 | 30 | 2 | 1 | 1 | 0 |  |
| `/teacher/monthly-plans/{enc}/show` | `teacher-monthly-plans-mq-show` | 1 | S009 | 2 | 30 | 2 | 1 | 1 | 0 |  |
| `/teacher/teacher-history/1-` | `teacher-teacher-history-1` | 1 | S009 | 0 | 0 | 1 | 1 | 0 | 0 |  |
| `/teacher/teacher-history/{id}` | `teacher-teacher-history-1-d861d6e` | 1 | S009 | 0 | 0 | 1 | 1 | 0 | 0 |  |

## teacher · Timetable / Schedule

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/timetable` | `teacher-timetable` | 1 | S009 | 1 | 2 | 0 | 0 | 3 | 0 |  |

## teacher · Wallet / Finance

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/teacher/salary` | `teacher-salary` | 1 | S009 | 0 | 0 | 0 | 1 | 0 | 0 |  |

## family · Classes / Live Sessions

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/today-sessions` | `student-today-sessions` | 1 | S010 | 3 | 14 | 2 | 1 | 2 | 0 |  |

## family · Content / Materials / Library

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/library` | `student-library` | 1 | S010 | 1 | 2 | 0 | 0 | 3 | 0 |  |

## family · Dashboard / Home

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/home` | `student-home` | 1 | S010 | 0 | 0 | 0 | 1 | 0 | 0 |  |

## family · General / Unknown

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/profile` | `student-profile` | 1 | S010 | 0 | 0 | 0 | 0 | 0 | 0 | HTTP 500 |

## family · Payments / Invoices

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/billing` | `student-billing` | 1 | S010 | 0 | 0 | 0 | 1 | 0 | 0 |  |

## family · Profile / Account

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/profile-edit` | `student-profile-edit` | 1 | S010 | 2 | 10 | 0 | 0 | 0 | 0 |  |

## family · Students

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/feedbacks` | `student-feedbacks` | 1 | S010 | 0 | 0 | 0 | 1 | 0 | 0 |  |
| `/student/request-trial` | `student-request-trial` | 1 | S010 | 1 | 12 | 0 | 0 | 6 | 2 |  |
| `/student/student-history-fillter` | `student-student-history-fillter-2` | 1 | S010 | 1 | 1 | 2 | 1 | 1 | 0 |  |
| `/student/studentslist` | `student-studentslist` | 1 | S010 | 2 | 10 | 1 | 1 | 2 | 0 |  |

## family · Timetable / Schedule

| Template (route) | rep. slug | var | spec | forms | flds | modals | tbl | filt | tab | flags |
|---|---|--:|:--:|--:|--:|--:|--:|--:|--:|---|
| `/student/timetable` | `student-timetable` | 1 | S010 | 0 | 0 | 0 | 1 | 0 | 0 |  |
