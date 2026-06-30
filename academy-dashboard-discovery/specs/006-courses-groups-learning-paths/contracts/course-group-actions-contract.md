# Contract: Course / Group Action Honesty Matrix (status-gated, demo-only)

**Status**: Binding · the honest, DEMO-ONLY course/group action set rendered on the course/group **profile banners** (`course.html` / `group.html`) and mirrored by the directory **row/card kebabs** (`courses.html` / `groups.html`). It realizes the academy's course/group management affordances (add/edit course+group, assign teacher, add/remove students, open timetable, view attendance, print/export summary) as honest **demo toast / confirm→demo toast / disabled-with-reason / real in-scope link** controls, **status-gated** by the group's `statusId`. **No real save, create, enroll, assign, remove, schedule, mutate, notify, or finance** (R51, FR-019/FR-020, data-model #15/#16). Reuses the existing four action hooks — **NO new action hook**.

## 1. Purpose & honest scope (no engine)

- Give the admin the genuinely useful course/group affordances — the right action for the entity's state — while making it unmistakable that **nothing is saved**.
- Every action MUST be exactly one of **four honest kinds** and MUST satisfy the no-dead-button rule (IP8): a **demo toast**, a **confirmation modal → demo toast** (destructive), a **disabled-with-reason** control, or a **real in-scope `<a>` link** (navigation only — never a write).
- No action writes data; no id mutates state; no action navigates to a real *resource* (it may navigate to an in-scope baked *page*).
- Every user-facing string MUST be an i18n key resolved at build time (the `crs.act.*` / `grp.act.*` labels+toasts and `crs.reason.*` / `grp.reason.*` reasons); **no raw i18n key** ever renders.
- This mirrors the Spec 005 `gatedActions` honesty model exactly; it introduces **no new hook, no new modal, no new toast channel, no new disabled mechanism**.

## 2. The four honest kinds (binding)

| kind | hook(s) | behavior |
|---|---|---|
| **demo** | `data-demo-action` + `data-toast` | clearly-labeled demo toast ("…— demo only, nothing saved"); no write |
| **confirm → demo** (destructive) | `data-confirm` + `-title` / `-msg` / `-cta` / `-toast` / `-danger` | `openConfirm` modal → on confirm, a demo toast; storage unchanged |
| **disabled-with-reason** | `data-disabled-reason` + `data-reason-key` (+ `aria-disabled="true"` + visible reason/title) | visibly disabled; clicking surfaces the reason toast; never silently dead |
| **real link** | a plain `<a href>` to an in-scope baked page or the canonical drawer | navigation only; no mutation |

Demo controls render as calm `btn btn-secondary btn-sm` (icon + label); confirm controls use the danger framing (`-danger` → coral medallion + `btn-danger`); disabled controls are visibly disabled with a stated reason; links are calm buttons/links. **Every control carries an icon + label — never icon/color-only.**

## 3. CourseAction matrix (binding — exact, data-model #15)

Rendered on the `course.html` banner action cluster + the `courses.html` card kebab.

| action `key` | `kind` | hook(s) / target | label key (AR / EN) |
|---|---|---|---|
| **add** (add course) | demo | `data-demo-action` + `data-toast="crs.act.addToast"` | إضافة دورة / Add course |
| **edit** (edit course) | demo | `data-demo-action` + `data-toast="crs.act.editToast"` | تعديل / Edit |
| **assignTeacher** | disabled-with-reason | `data-disabled-reason` + `data-reason-key="crs.reason.assign"` | تعيين معلم / Assign teacher |
| **addStudents** | disabled-with-reason | `data-disabled-reason` + `data-reason-key="crs.reason.enroll"` | إضافة طلاب / Add students |
| **openTimetable** | real link | `<a href="schedule.html#view=timetable">` (`.en` variant) | الجدول / Open timetable |
| **viewAttendance** | real link | `<a href="attendance.html">` (`.en` variant) | الحضور / View attendance |
| **printSummary** | disabled-with-reason | `data-disabled-reason` + `data-reason-key="crs.reason.export"` | طباعة الملخص / Print summary |
| **archive** (archive course) | confirm → demo (danger) | `data-confirm` + `-title="crs.act.archiveTitle"` / `-msg` / `-cta` / `-toast` / `-danger` | أرشفة / Archive |

- Course-level **addStudents** is **disabled-with-reason** (`crs.reason.enroll`) because enrolling a student into a subject offering is a real enrollment engine — out of scope. (This differs from the group roster `addStudents`, §4.)

## 4. GroupAction matrix (binding — exact, data-model #16)

Rendered on the `group.html` banner action cluster + the `groups.html` row kebab.

| action `key` | `kind` | hook(s) / target | label key (AR / EN) |
|---|---|---|---|
| **add** (add group) | demo | `data-demo-action` + `data-toast="grp.act.addToast"` | إضافة مجموعة / Add group |
| **edit** (edit group) | demo | `data-demo-action` + `data-toast="grp.act.editToast"` | تعديل / Edit |
| **assignTeacher** | disabled-with-reason | `data-disabled-reason` + `data-reason-key="grp.reason.assign"` | تعيين معلم / Assign teacher |
| **addStudents** | demo **(gated)** | `data-demo-action` + `data-toast="grp.act.addStudentsToast"` — **disabled-with-reason `grp.reason.full` when `statusId==='full'`** (§5) | إضافة طلاب / Add students |
| **removeStudent** | confirm → demo (danger) | `data-confirm` + `-title="grp.act.removeStudentTitle"` / `-msg` / `-cta` / `-toast` / `-danger` | إزالة طالب / Remove student |
| **openTimetable** | real link | `<a href="schedule.html#view=timetable">` (`.en` variant) | الجدول / Open timetable |
| **viewAttendance** | real link | `<a href="attendance.html">` (`.en` variant) | الحضور / View attendance |
| **printSummary** | disabled-with-reason | `data-disabled-reason` + `data-reason-key="grp.reason.export"` | طباعة الملخص / Print summary |

- Group-level **addStudents** is a **demo toast** (adding to a cohort roster is demoable) — **except** it flips to **disabled-with-reason** when the group is `full` (§5). **removeStudent** is the destructive confirm→demo (danger) — confirming removes nothing.

## 5. Status-gating by `statusId` (binding — like Spec 005 gatedActions)

`gatedGroupActions(group)` MUST render the action set sensibly for the group's `statusId`, baked at build time from `group.statusId` (runtime JS does NOT compute or mutate the gate):

| `statusId` | roster-mutating actions |
|---|---|
| **active** / **trial** | `addStudents` = **demo toast**; `removeStudent` = **confirm→demo (danger)** |
| **full** | `addStudents` = **disabled-with-reason** (`grp.reason.full` = "the group is full — changing capacity needs the backend"); `removeStudent` = **confirm→demo (danger)** |
| **completed** / **paused** | roster-mutating actions (`addStudents` / `removeStudent`) **SHOULD be disabled-with-reason or absent** (a finished/paused cohort is not edited); view/edit/timetable/attendance/print remain |

- The non-roster actions (`add`, `edit`, `assignTeacher`, `openTimetable`, `viewAttendance`, `printSummary`) render regardless of status (each keeps its own kind from §4).
- The gate MUST be **pre-rendered** into the baked banner/kebab for that group's status — an action MUST NOT appear in a kind it is not gated to (e.g. no enabled `addStudents` demo on a `full` group).
- Course actions (§3) are **not** status-gated by this rule (the course's `addStudents` is always disabled-with-reason); only the group roster actions gate on `statusId`.

## 6. Reason keys (binding list)

Disabled-with-reason controls MUST carry these exact keys (mirrored AR/EN; resolved at build time; never raw):

| reason key | meaning (EN gist) |
|---|---|
| `crs.reason.assign` | assigning a teacher needs the assignment engine — out of scope |
| `crs.reason.enroll` | enrolling students needs the enrollment engine — out of scope |
| `crs.reason.export` | printing/exporting the summary needs the backend — out of scope |
| `grp.reason.assign` | assigning a teacher needs the assignment engine — out of scope |
| `grp.reason.full` | the group is full — changing capacity needs the backend — out of scope |
| `grp.reason.export` | printing/exporting the summary needs the backend — out of scope |

(The Learning-Path curriculum/certificate gate `crs.reason.curriculum` / `crs.reason.export` is owned by `learning-path-contract.md` §9.)

## 7. Real in-scope links (binding — never demo, never dead)

- **openTimetable** → `schedule.html#view=timetable` (`.en` variant) — the Spec 003 timetable view (R48/US7).
- **viewAttendance** → `attendance.html` (`.en` variant) — the Spec 005 attendance board (R48/US8).
- The profile **cross-navigation** links — course banner/Groups tab → `group.html`, Students tab → `student.html`, Teachers tab → the teacher preview; group banner/Course tab → `course.html`, Students tab → `student.html`, family chip → `family.html` — are **real in-scope `<a>` links**, never demo and never dead (SC-003).
- These links MUST resolve to a real baked in-scope page (or the canonical drawer); a link to a non-existent page is a dead-link failure.

## 8. MUST NOT (binding boundary)

The action set MUST NOT:
- perform a **real save / create** of a course or group;
- **enroll / assign / remove / add** a student, teacher, or schedule into any roster or relationship for real;
- perform a **real reschedule** or write a timetable change;
- **mutate** a course/group `statusId`, roster, count, or capacity in the DOM, `localStorage`, or anywhere;
- send a **real notification** (WhatsApp / SMS / email / push);
- run a **real export / print / PDF** backend or touch **finance / credit / salary**;
- introduce a **new action hook**, a new runtime engine, a runtime form/select, or any JS-generated id/class;
- leave any **dead control** — every button demos, confirms→demos, navigates (real link), or is disabled-with-reason.

All four behaviors reuse the existing `enhance.js` branches (`data-demo-action`, `data-confirm`→`openConfirm`, `data-disabled-reason`, `data-toast`) and the existing `<a>` navigation, unchanged.

## 9. `data-*` hooks (exact, reuse only — no invention)

- `data-demo-action` + `data-toast` — add/edit course+group, group `addStudents` (when not gated).
- `data-confirm` + `data-confirm-title` / `-msg` / `-cta` / `-toast` / `-danger` — course `archive`, group `removeStudent` → `openConfirm` → demo toast.
- `data-disabled-reason` + `data-reason-key` — `assignTeacher`, course `addStudents`, `printSummary`, group `addStudents` when `full`.
- plain `<a href>` — `openTimetable`, `viewAttendance`, and all cross-profile navigation.
- These are the SAME four action hooks + the SAME navigation already wired in `enhance.js`. **Spec 006 introduces NO new action hook; no JS-generated ids/classes; no per-action bespoke JS.** Confirm controls reuse `confirmAction({ … })`; demo/disabled controls reuse the `ui` `button({ …, attrs })` markup with the existing `data-*` attributes.

## 10. Banner + row-menu parity & no dead control (binding)

- The PRIMARY surface for the action cluster is the **profile banner** (`course.html` / `group.html`), reusing the Spec 004 `profileBanner` `actionsHTML`.
- The directory **row/card kebab** (`courses.html` / `groups.html`) MUST be honest: its "view" item is the real `<a href="course.html">` / `<a href="group.html">`; any inline quick-action it offers MUST be one of the SAME four kinds, carry the SAME hooks, and respect the SAME `statusId` gating — never a dead control, never a different action vocabulary.
- No control on a banner, card, or kebab is a bare `<button>` with no behavior; every one demos, confirms→demos, navigates, or is disabled-with-reason (IP8/IP9).

## 11. States, responsive, a11y

- The cluster MUST wrap (`flex flex-wrap gap-2`) and reflow without horizontal overflow; on mobile it stacks under the banner / inside the kebab menu.
- Confirm modals are centered, scrim-dismissable, Esc-closable, focus the confirm CTA, and return focus on close (the existing `openConfirm` behavior).
- Destructive (confirm) actions use the danger framing (`-danger`); demo actions use the calm secondary button; disabled actions are visibly disabled with `aria-disabled="true"` + a stated reason.
- Every control is keyboard operable with visible focus; ≥44px targets; icon + label (never icon/color-only); WCAG AA; axe critical = 0; Light/Dark/System via tokens.

## 12. Static-HTML-first & Django mapping

- The full action cluster (incl. the disabled-with-reason and the `full`-gated state) MUST be BAKED into the static `public/*.html` (courses/course/groups/group, ar + en) — real markup, relative `./assets/` paths, no `<div id="app">`, no JS-built actions, zero external/CDN requests.
- **Django**: actions render from the course/group context inside the profile/banner partials; the per-status gate → `{% if group.status == "full" %}…disabled…{% else %}…demo…{% endif %}` (or a gating template tag) emitting the SAME `data-*` attributes server-side; the confirm copy / toast / reason keys → context strings. The action behavior is reproduced 1:1 by the same hooks — no server-side mutation, no real endpoint. No surface forks the action markup.

## 13. Enforcement, acceptance & cross-references

- **Smoke** (R55): on `course.html` / `group.html`, **add/edit** fire a demo toast and nothing persists; **archive** (course) / **removeStudent** (group) open the confirmation modal and confirming shows a demo toast (no roster/status change); **assignTeacher** / course **addStudents** / **printSummary** are `aria-disabled` and surface their reason key; on a **`full`** group, **addStudents** is disabled-with-reason (`grp.reason.full`) while on an `active`/`trial` group it is a demo toast; **openTimetable** / **viewAttendance** are real `<a>` links to `schedule.html#view=timetable` / `attendance.html`; **no dead control** anywhere; **no raw i18n key**; **zero external requests**; no `localStorage`/DOM status/roster/count mutation.
- **Screenshots** (screenshot-acceptance): a course/group action **confirmation modal** (e.g. archive / remove-student) AR-RTL light desktop, and a `full`-group banner showing the disabled-with-reason **Add students** — a real save, a dead control, or a missing disabled-reason on a `full` group is a screenshot failure condition.

**Acceptance (binding):**
1. **Given** an "Add course/group" or "Edit" control, **When** clicked, **Then** a demo toast appears and nothing is saved. *(FR-019, US6 AS-1)*
2. **Given** "Archive course" / "Remove student", **When** clicked, **Then** a confirmation modal opens and confirming shows a demo toast — no real archive/removal. *(FR-019, US6 AS-1)*
3. **Given** "Assign teacher" / course "Add students" / "Print summary", **When** clicked, **Then** the control is disabled with a visible reason (its reason key). *(FR-019, US6 AS-2)*
4. **Given** a `full` group, **When** the admin opens "Add students", **Then** it is disabled-with-reason (`grp.reason.full`); on an `active`/`trial` group the same action is a demo toast. *(FR-019/FR-020, data-model #16, spec edge case)*
5. **Given** any course/group action, **When** triggered, **Then** no real save/create/enroll/assign/remove/schedule/mutate/notify/finance occurs and there is no dead control. *(FR-020, SC-004)*

- Binds to: `course-profile-contract.md` / `group-profile-contract.md` (the hosting banners), `courses-page-contract.md` / `groups-page-contract.md` (the row/card kebabs), `course-group-status-contract.md` (the `statusId` the gate keys off, incl. `full`), `learning-path-contract.md` (the curriculum/certificate disabled-with-reason), the Spec 005 `../../005-attendance-session-outcomes/contracts/outcome-actions-contract.md` (the `gatedActions` honesty precedent), the Spec 003 `../../003-timetable-scheduling/contracts/appointment-details-contract.md` (the demo/confirm/disabled precedent), `../../002-admin-core-operations/contracts/interaction-patterns-contract.md` (IP8/IP9), `static-html-django-ready-contract.md`, and `scope-guard.md` (the no-persistence / no-engine / no-finance rules, in force).
