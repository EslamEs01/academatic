# Notification Routing Matrix (Spec 040)

The complete **event × recipient × channel** map. **47 configuration fields**, 28 distinct names — from the raw legacy form record, not from the screenshot.

## Channels (one enum, all 10 selects)

| Value | Channel | Depends on an integration? | Backend-required to deliver? |
|---|---|---|---|
| 0 | Off | — | — |
| 1 | As profile (defer to the recipient's preference) | — | ✔ |
| 3 | **WhatsApp** | **✔ WhatsApp integration** | ✔ |
| 4 | **E-mail** | **✔ email/SMTP integration** | ✔ |
| 5 | Private | — | ✔ |

*(Value `2` does not exist in the legacy enum. Recorded as-is; not invented.)*

**No channel may claim delivery.** Selecting WhatsApp or E-mail must state that delivery requires that integration **and** the backend.

## The matrix

| Section | Master toggle | Recipient | Channel select | Per-event controls | Numeric |
|---|---|---|---|---|---|
| **System** | `system_notifications` ✓ | — | — | — | — |
| **In-app** | `appnotifiy` *(disabled in legacy)* | — | — | — | — |
| **Course updates** | `course_updates` ✓ | **Teacher** | `teacher_course_updates` | `teacher_course_updates_statuses[]` — **Create**, **Edit** ✓ | — |
| | | **Family** | `student_course_updates` | `student_course_updates_statuses[]` — **Create**, **Edit** ✓, **Status** | — |
| **Class updates** | `class_updates` ✓ | **Teacher** | `teacher_class_updates_type` | `teacher_class_update_statuses[]` — **9, all on**: Waiting · Running · Cancel · Absent · **Teacher Absent** · Auto Makeup · Reject · Cancel request · Approve | — |
| | | **Family** | `student_class_updates_type` | `student_class_update_statuses[]` — **9, all on**: Waiting · Running · Cancel · Absent · **End class** · Auto Makeup · Reject · Cancel request · Approve | — |
| **Class reminders** | `class_reminder` ✓ | **Teacher** | `teacher_reminder_type` | `teacher_daily_class_reminder` ✓ · `teacher_delay_reminder` ✓ *(“Late 3 Minutes” — label unclear, UNKNOWN)* · `teacher_reminder` ✓ | `hours_to_reminder_teacher` = 2 |
| | | **Family** | `student_reminder_type` | `student_send_reschedule_reminders` ✓ · **`teacher_send_manual_reminder`** ✓ *(legacy bug: teacher-named field inside the family block — renamed honestly)* · `student_reminder` ✓ | `hours_to_reminder_student` = 2 |
| **Invoice** | — | *(implicit: family)* | `invoice` = Private | — | — |
| **Invoice reminder** | — | *(implicit: family)* | `invoice_reminder` = Private | — | `invoice_reminder_days` = 3 |
| **Salaries** | — | **Teacher** | `salaries` = WhatsApp | — | — |
| **Family status** | — | **Family** | `family_status` = Off | — | — |

## The class-event asymmetry (preserve it — it is real)

| Event | Teacher | Family |
|---|---|---|
| Waiting (1) | ✔ | ✔ |
| Running (2) | ✔ | ✔ |
| Cancel (3) | ✔ | ✔ |
| Absent (4) | ✔ | ✔ |
| **End class (5)** | — | **✔** |
| **Teacher Absent (6)** | **✔** | — |
| Auto Makeup (7) | ✔ | ✔ |
| Reject (8) | ✔ | ✔ |
| Cancel request (9) | ✔ | ✔ |
| Approve (10) | ✔ | ✔ |

Nine events each; the fifth differs by recipient. Neither set has both.

## Control census (47)

| Kind | Count |
|---|---|
| Section / master toggles | 5 (`system_notifications`, `appnotifiy`, `course_updates`, `class_updates`, `class_reminder`) |
| Channel selects | 10 |
| Event checkboxes | 23 (2 + 3 course; 9 + 9 class) |
| Reminder toggles | 6 |
| Numerics | 3 (`hours_to_reminder_teacher`, `hours_to_reminder_student`, `invoice_reminder_days`) |
| **Total** | **47** |

## Rules

1. **All 47 render.** Reducing this to a handful of generic toggles is an explicit defect.
2. **State is icon + text.** Legacy chips show a ✓ with no visible off-state — colour/glyph alone. Not reproduced.
3. **Pay-free**: the `salaries` row routes a salary *event*. It carries **no amount, rate or currency** — the teacher pay-free law is unchanged.
4. **Recipient honesty**: legacy names every family field `student_*`, labels them "Family", tells the family the event goes "to the student", and drops a `teacher_`-named toggle into the family block. The rebuild uses one correct recipient vocabulary throughout.
5. **Save** is a single `data-disabled-reason` gate. Nothing is persisted; nothing is sent.
6. **Private / group behaviour**: legacy's WhatsApp integration carries a `send_group` (Private / Group) control with a `group_name`. That is **integration configuration**, not notification routing, and it stays behind the WhatsApp pairing gate. The `Private` channel value here is recorded as-is.
7. No notification preference for teacher/family/student roles is administered from any non-admin surface.
