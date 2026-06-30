# Contract: Teacher Actions (honest, no engine)

**Status**: Binding · Defines every teacher action across `teachers.html` / `teacher.html` / `teacher-performance.html` as one of four honest kinds — reusing the existing `data-demo-action` / `data-confirm` / `data-disabled-reason` / `data-toast` hooks. No new action hook; nothing mutates real data; no finance action exists. References FR-014 / FR-015; data-model §15.

---

## 1. Purpose & honest scope (no engine)

The legacy teacher pages carried 56 buttons mixing real mutation, impersonation, and finance. Spec 007 reproduces only the **academic, admin-facing** actions, each honest: a **demo toast**, a **confirm → demo toast**, a **disabled-with-reason**, or a **real in-scope link**. No teacher/assignment/notification/attendance/salary mutation; no "Deactivate / Delete / Login-as-Teacher / Send-Reset-Password / Generate-salary / Payout".

## 2. The four honest kinds (binding)

| Kind | Hook(s) | Behavior |
|---|---|---|
| **demo** | `data-demo-action` + `data-toast="<key>"` | a demo toast; no mutation |
| **confirm → demo** | `data-confirm` + `-title`/`-msg`/`-cta`/`-toast` (+`-danger` if destructive) | confirm modal → demo toast on confirm |
| **disabled-with-reason** | `data-disabled-reason` + `data-reason-key="<key>"` | visibly disabled; reason on hover/focus |
| **real link** | `<a href>` | navigates to a baked in-scope page |

## 3. Action matrix (binding — exact)

`teacherActions()` (`components/teacher-actions.js`) emits these; the same `key | kind | hook/target | labelKey` set is reused on the card, banner, and board:

| key | kind | hook / target | labelKey (AR / EN) |
|---|---|---|---|
| `addTeacher` | demo | `data-demo-action` `data-toast="trn.action.add.toast"` | إضافة معلّم / Add teacher |
| `editTeacher` | demo | `data-demo-action` `data-toast="trn.action.edit.toast"` | تعديل / Edit |
| `messageTeacher` | demo | `data-demo-action` `data-toast="trn.action.message.toast"` | مراسلة المعلّم / Message teacher |
| `addNote` | demo | `data-demo-action` `data-toast="trn.action.note.toast"` | إضافة ملاحظة متابعة / Add follow-up note |
| `notifyFamily` | confirm → demo | `data-confirm` `-title="trn.action.notify.title"` `-msg="trn.action.notify.msg"` `-cta="trn.action.notify.cta"` `-toast="trn.action.notify.toast"` | تنبيه ولي الأمر / Notify family |
| `assignCourse` | disabled-with-reason | `data-disabled-reason` `data-reason-key="trn.reason.assign"` | إسناد دورة / Assign course |
| `assignGroup` | disabled-with-reason | `data-disabled-reason` `data-reason-key="trn.reason.assign"` | إسناد مجموعة / Assign group |
| `exportSummary` | disabled-with-reason | `data-disabled-reason` `data-reason-key="trn.reason.export"` | طباعة/تصدير الملخّص / Print·export summary |
| `openTimetable` | real link | `<a href="./schedule.html#view=timetable">` | عرض الجدول / Open timetable |
| `viewAttendance` | real link | `<a href="./attendance.html">` | عرض الحضور / View attendance |

`notifyFamily` is the destructive-ish confirm (it would "send") — confirm → demo toast, **no real notification**. (It is the frame-#8 confirm capture.)

## 4. Reason keys (binding list)

| key | AR | EN |
|---|---|---|
| `trn.reason.assign` | الإسناد يتطلّب وحدة الإسناد — خارج النطاق الحالي | Assigning requires the assignment module — out of current scope |
| `trn.reason.export` | التصدير يتطلّب الخدمة الخلفية — خارج النطاق الحالي | Export requires the backend — out of current scope |

(No `trn.reason.salary` exists — finance is omitted entirely, not disabled-with-reason, except where a menu would otherwise dead-end, in which case `trn.reason.finance` "finance is out of current scope" MAY be used.)

## 5. Status-gating

Actions do not change by `statusId` in this spec (no lifecycle engine). An `inactive` teacher still shows the same honest actions (all demo/disabled/link). No action is conditionally enabled by a computed state.

## 6. Real in-scope links

`openTimetable` → `schedule.html#view=timetable`; `viewAttendance` → `attendance.html`; "View profile/course/group/student" + family chip are navigation (covered by the page contracts). All language-aware.

## 7. MUST NOT (binding boundary)

No real save/create/edit/assign/notify/mark/mutate; no salary/payroll/compensation/payout action; no deactivate/delete/login-as/reset-password; no dead control; no new action `data-*` hook.

## 8. `data-*` hooks (reuse only)

`data-demo-action`, `data-toast`, `data-confirm` (+`-title|-msg|-cta|-toast|-danger`), `data-disabled-reason`, `data-reason-key`. Wired by the existing `enhance.js` delegated-click engine. No new hook.

## 9. Banner + row-menu + board parity & no dead control

The banner actions, the card preview actions, and the board row actions draw from the **same** `teacherActions()` set, so behavior is consistent. Every emitted control resolves to one of the four kinds — there is no control without a handler.

## 10. States / responsive / a11y

Disabled controls show the reason on hover + focus (keyboard-reachable); toasts are announced; the confirm modal traps focus + returns it; all labels are icon+text (no raw key); RTL/LTR + dark correct.

## 11. Static-HTML-first & Django

Action markup is baked; behavior is `enhance.js`. **Django**: the buttons render statically; `data-*` hooks carry into the templates unchanged; no server action is wired in this spec.

## 12. Enforcement & cross-references

- **Smoke**: every teacher action button matches one of the four kinds (a `data-demo-action`+`data-toast`, OR a `data-confirm`+title/msg/cta/toast, OR a `data-disabled-reason`+`data-reason-key`, OR a real `<a href>` to a baked page); **zero** dead controls; **zero** salary/finance action; the `notifyFamily` confirm opens a modal → demo toast; no raw `trn.*` key.
- **Screenshots**: frame #8 (`teacher__ar__light__desktop__confirm.png`) — the Notify-family confirm modal.
- Binds to `teacher-profile-contract.md` (§13), `teachers-page-contract.md` (§9), `teacher-performance-contract.md` (the board actions), and the Spec 006 `../../006-courses-groups-learning-paths/contracts/course-group-actions-contract.md` + the Spec 005 `gatedActions` honesty model. **MUST NOT** introduce a real mutation, a finance action, an impersonation action, or a new action hook.

**Acceptance (binding):**
1. **Given** any teacher action, **When** triggered, **Then** it produces a demo toast / confirm→toast / disabled-with-reason / real link — never a real save/assign/notify/mutation.
2. **Given** the action set, **When** audited, **Then** no salary/payroll/deactivate/login-as/delete action exists, and there are zero dead controls.
3. **Given** Notify family, **When** clicked, **Then** a confirm modal opens and confirming shows a demo toast with no real notification.
