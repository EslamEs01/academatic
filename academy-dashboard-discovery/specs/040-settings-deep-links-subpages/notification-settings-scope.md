# Notification Settings — Scope (Spec 040)

**Nav id** `settingsNotifications` · **Route** `settings.html#view=notifications` · **Surface** the existing `notifications` tab · **Count impact** 0

Legacy: `/management/settings/notification` — **one form, 47 configuration fields** (48 with `_token`), **28 distinct names**, one `Save changes`. No tabs, no tables, no modals. The current app renders **6 matrix rows and 0 fields**.

## The channel enum (authoritative, from raw HTML)

All **10** channel selects share one option set:

| Value | Label | Notes |
|---|---|---|
| `0` | Off | |
| `1` | As profile | defer to the recipient's own preference |
| `3` | WhatsApp | *(legacy renders "whats App" — typo not reproduced)* · **depends on the WhatsApp integration** |
| `4` | E-mail | **depends on the email/SMTP integration** |
| `5` | Private | |

Value `2` is absent from the enum. Recorded as-is.

## The complete 47-field inventory

### Master toggles (4)
`system_notifications` ✓ · `appnotifiy` *(sic — **disabled** in legacy)* · `course_updates` ✓ · `class_updates` ✓
Plus `class_reminder` ✓ (the reminders section master) — **5 section-level toggles in total**.

### Course notifications (2 selects + 5 event checkboxes)
| Field | Recipient | Type | Default |
|---|---|---|---|
| `teacher_course_updates` | Teacher | channel select | 3 (WhatsApp) |
| `teacher_course_updates_statuses[]` | Teacher | checkbox ×2 — **Create**, **Edit** ✓ | Edit on |
| `student_course_updates` | **Family** | channel select | 3 |
| `student_course_updates_statuses[]` | **Family** | checkbox ×3 — **Create**, **Edit** ✓, **Status** | Edit on |

### Class notifications (2 selects + 18 event checkboxes) — **asymmetric by design**
| Field | Recipient | Events |
|---|---|---|
| `teacher_class_updates_type` | Teacher | channel select (=3) |
| `teacher_class_update_statuses[]` | Teacher | **9, all checked**: Waiting(1) · Running(2) · Cancel(3) · Absent(4) · **Teacher Absent(6)** · Auto Makeup(7) · Reject(8) · Cancel request(9) · Approve(10) |
| `student_class_updates_type` | **Family** | channel select (=3) |
| `student_class_update_statuses[]` | **Family** | **9, all checked**: Waiting(1) · Running(2) · Cancel(3) · Absent(4) · **End class(5)** · Auto Makeup(7) · Reject(8) · Cancel request(9) · Approve(10) |

The asymmetry is real and must be preserved: the teacher set carries **Teacher Absent (6)**; the family set carries **End class (5)**. Neither has both.

### Reminders (2 selects + 2 numerics + 6 toggles)
| Field | Recipient | Type |
|---|---|---|
| `teacher_reminder_type` | Teacher | channel select (=3) |
| `hours_to_reminder_teacher` | Teacher | number (=2) — hours before the session |
| `teacher_daily_class_reminder` ✓ | Teacher | toggle — daily reminder |
| `teacher_delay_reminder` ✓ | Teacher | toggle — "Late 3 Minutes" *(label unclear — UNKNOWN)* |
| `teacher_reminder` ✓ | Teacher | toggle — reminder before the session |
| `student_reminder_type` | **Family** | channel select (=3) |
| `hours_to_reminder_student` | **Family** | number (=2) |
| `student_send_reschedule_reminders` ✓ | **Family** | toggle |
| **`teacher_send_manual_reminder`** ✓ | **Family block — but teacher-named** | toggle — **legacy bug**; the rebuild names it for its real recipient |
| `student_reminder` ✓ | **Family** | toggle |

### Invoice, salary and family status (4 selects + 1 numeric)
| Field | Type | Default | Note |
|---|---|---|---|
| `invoice` | channel select | 5 (Private) | |
| `invoice_reminder` | channel select | 5 (Private) | |
| `invoice_reminder_days` | number | 3 | days between reminders |
| `salaries` | channel select | 3 | **routing only — no figure, no amount, no rate.** A salary *event* may be routed; a salary *number* may never appear |
| `family_status` | channel select | 0 (Off) | account creation/deletion events |

## Shape

**6 sections × 2 recipients × 10 channel selects × 23 event checkboxes × 6 reminder toggles × 3 numerics × 5 section toggles.** Legacy renders it as label rows + switches — **there is no `<table>`**. The rebuild uses the same row-based shape (it survives 390px and RTL far better than a grid).

## Rules for Spec 040

1. **Completeness**: all 47 controls render. Reducing the matrix to "a few generic toggles" is an explicit defect.
2. **Honesty**: nothing claims a notification will be or has been sent. Save is one `data-disabled-reason` gate.
3. **Integration dependency**: selecting WhatsApp or E-mail must state that delivery requires that integration **and** the backend. It must not imply the channel is live.
4. **Icon + text**: legacy event chips show a ✓ with **no visible off-state** — colour/glyph alone. Every control must convey its state with **icon + text**.
5. **Pay-free**: the `salaries` row is routing only. Zero currency, rate or amount tokens anywhere in this tab.
6. **Recipient honesty**: legacy names the family fields `student_*` and labels them "Family", and puts a `teacher_`-named toggle inside the family block. The rebuild uses one consistent, correct recipient vocabulary (teacher / family) — and the family course-event help must not say "to the student".
7. **Naming**: `appnotifiy`, "whats App" and similar typos are not reproduced.

## Field accounting

47 evidenced → **47 rendered** (as inert controls with one gated Save) · 0 omitted · 0 invented.
