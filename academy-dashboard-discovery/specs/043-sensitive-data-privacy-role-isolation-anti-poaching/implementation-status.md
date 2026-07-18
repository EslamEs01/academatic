# Implementation Status — Spec 043 (Sensitive Data Privacy, Role Isolation & Anti-Poaching)

**Branch**: `feature/012-role-portal-foundation` · **Accepted baseline HEAD**:
`830446ba7a61d4616dbb29124a58730761bac95a`. **Ponytail**: lite. **Executor**: root coordinator. One writer per
file; `tests/smoke/run.cjs` + `teacher.js` root-owned. **No commit/push** — an external host/IDE writer exists
outside this sandbox, is not identifiable here, and is not invoked by this run.

Per-task evidence (command · exit code · measured result) is recorded below as tasks complete.

## T001 — accepted committed lineage and narrow status-file supersession

- `feature/012-role-portal-foundation` at
  `830446ba7a61d4616dbb29124a58730761bac95a`; `git status --porcelain` was empty and `git diff --check` passed.
- Required ancestry is linear: `e474ad8ca70c` → `690186eef42c` →
  `3e87c162fcca2d7be4d1fc0b16f62bd48b9bd4c3` → `830446ba7a61d4616dbb29124a58730761bac95a`.
- `690186e` committed the Codex bootstrap and Claude partial Spec-043 implementation. `3e87c162` committed only
  trailing-whitespace normalization in the three SpecKit skill files. `830446ba` committed only the matching
  three-hash manifest-integrity update; all nine manifest hashes match their current files.
- No application bytes changed during either hygiene correction. The external writer is outside the sandbox and
  not identifiable; no Git-writing operation was invoked here.
- The five required historical commits (`9694527`, `a185494`, `cd56aa0`, `48a344b`, `3b6a5a3`) are ancestors.
  The original T001 premise barring a pre-existing `implementation-status.md` is narrowly superseded because that
  tracked status file arrived in `690186e`; its prior notes remain evidence only, not task-completion evidence.
- Baseline validation: `npm run build` exit 0 with 115 HTML and no tracked change; baseline smoke exit 0 (114
  page loads); baseline a11y exit 0 (`critical=0 serious=0`).

---

## Targeted Visual Grounding (root, images opened AS images — mandatory before edits)

Opened the exact images (not filenames/summaries) for all 3 changed surfaces + the legacy defects:

### Surface 1 — Student profile (child-view)
- **Current** `app/screenshots/student-profile__ar__light__desktop.png` — CONFIRMED: header «عرض الابن» (child-view);
  guardian block «وليّ الأمر: أبو سلمان الغامدي · المدينة: الرياض» (name + city only, **no contact** — matrix DENY);
  bottom shows **exactly 3 gate cards**: «حفظ بيانات الملف» (save) · «تغيير الصورة» (photo) · **«تغيير كلمة المرور»
  (password change)** — each an honest «يتطلب الخادم» gate. **The password card is the removal target (3→2).**
- **Legacy** `output/roles/family/screenshots/student-profile-edit-full.png` — CONFIRMED the defect: the FAMILY login's
  "profile" edits the **child** identity (First/Last name, e-mail) + a **Change-Password card (Old/New/Confirm)**.
  The guardian owns the child; there is no student login → a child-view password gate implies a non-existent account.
- **Legacy defect refused**: the child password/account affordance. **Current host reused**: `student-profile.js`
  fixture-mapped `plannedCard` renderer (0-diff). **Planned change**: remove `passwordChange` fixture entry +
  correct the header comment three→two. **Omitted**: nothing new; an affordance is deleted, not added.
- **Expected AR/EN/light/dark/mobile**: 2 gate cards (photo/save), no password affordance, no `type=password`.

### Surface 2 — Staff RBAC preview
- **Current** `app/screenshots/staff__ar__light__desktop__sp031-staff-rbac.png` — CONFIRMED the display-only host
  «الفريق والصلاحيات» with subtitle «دليل الطاقم والصلاحيات — عرض فقط: كل إجراء يحتاج ربط الخادم». The `st-perm`
  RBAC drawer (permDrawer) renders `PERM_GROUPS` generically.
- **Legacy** `output/roles/admin/screenshots/management-admins-permission-6-full.png` (+ `-7`) — CONFIRMED the
  170/170 matrix: the **Families** group holds **Show Parent Phone** + **Show Parent Email** (the ONLY two named
  PII-gating permissions); pay rows (**Show Salaries Page · Show Teacher Rate · Show Student Rate**) and **no
  Login-as row** (impersonation ungovernable).
- **Legacy defect refused**: a 170-checkbox all-granted editor + real enforcement. **Current host reused**: the
  `permDrawer`/`st-perm` display-only preview. **Planned change**: +1 `PERM_GROUPS` group of 5 deny-by-default
  parent-contact rows. **Omitted**: any value slot/toggle/working grant; teacher never reaches these keys.
- **Expected AR/EN/light/dark/mobile**: 5 "not allowed" rows under a Parent-Contacts group; no input/toggle.

### Surface 3 — Teacher capability/notification policy
- **Current** `app/screenshots/teacher__ar__light__desktop.png` — CONFIRMED «تفاصيل المعلّم» is already **pay-free +
  contact-free**: overview «نظرة عامة» shows المواد/الحالة/التوفّر/الحِمل/الدورات/المجموعات/الطلاب — no salary,
  no contact, no country. The overview panel is the host for the `trn-policy` trigger (beside the availability
  opener pattern).
- **Legacy** `output/roles/admin/screenshots/management-teachers-1-full.png` — CONFIRMED the defects to REFUSE:
  **Left Students / Acquired Students** attribution tables, **Address: Giza Governorate, Egypt** (country/locality),
  **Hour Rate: 120 EGP** (pay), **Compensations + Salary tabs**, **Login as**, live `chat.whatsapp.com/…` invite URL,
  phone `201278910727`. The **Settings** tab holds teacher capabilities (`can_chat/can_see_library/can_edit_schedule/
  can_edit_class`) and the notification matrix carries a **salary_\* row** that MUST be excluded (pay-free).
- **Legacy** `output/roles/teacher/screenshots/teacher-studentslist-full.png` — CONFIRMED the **Country column (VUT)
  visible to the teacher** (A-02 anti-poaching defect; correctly dropped in the current app).
- **Legacy defect refused**: Left/Acquired attribution, country/locality, pay/Hour-Rate/Salary, the salary_\*
  notification row, contact, live invite. **Current host reused**: `teacher.js` `availabilityDrawer`/`previewTemplate`
  pattern + generic `data-drawer` dispatch. **Planned change**: structure-only `TEACHER_CAPABILITY_POLICY` +
  `capabilityPolicyDrawer('trn-policy')` (academic + non-pay notification rows) + one overview trigger.
- **Sensitive fields deliberately omitted**: salary/rate/currency/figure, guardian/student contact, country/locality,
  lead entitlement, Left/Acquired, any value slot/toggle/enforcement claim.
- **Expected AR/EN/light/dark/mobile**: academic + communication subheads, structure rows only, trailing honest
  backendRequired gate; PAY28 green on `teacher.html`.

**Raw vocabulary anchors** (raw records, from the specify/plan grounding): parent-contact = `parent-phone`/
`parent-email`; capabilities = `can_chat`/`can_see_library`/`can_edit_schedule`/`can_edit_class`; notifications =
`coursesUpdate`/`classReminders`/`classUpdates` × `whatsapp`/`email`, `salary_*` EXCLUDED.
