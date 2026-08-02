# Contract 4 — Teacher Capability/Notification Policy Preview (outcome C, C02-04/C02-05) — executable

Translates the specify FR-008a decision (`../rbac-and-capability-model-decision-register.md` §"C02-04/C02-05
deliverable") into the exact registry + drawer + trigger + census + mutation. Host: the existing teacher admin
page (`teacher.js`, namespace `trn.*`). **No new component, no new page, no new hook, no new namespace.**

## The exact edits

### 1. Fixture: `src/js/fixtures/teacher-management.js` → new `TEACHER_CAPABILITY_POLICY` (structure-only)
```js
export const TEACHER_CAPABILITY_POLICY = {
  academic: [
    { k: 'chat',         status: /* authored categorical label key */ },
    { k: 'library',      status: … },
    { k: 'editSchedule', status: … },
    { k: 'editClass',    status: … },
  ],
  comm: [
    { k: 'coursesUpdate', channels: ['whatsapp', 'email'] },
    { k: 'classReminders', channels: ['whatsapp', 'email'] },
    { k: 'classUpdates',  channels: ['whatsapp', 'email'] },
    // NO salary row — pay-free (legacy salary_by_whatsapp/salary_by_email EXCLUDED)
  ],
};
```
Display-only; `status`/`channels` are authored categorical labels, never a toggle, never a figure.

### 2. Page: `src/js/pages/teacher.js`
- Add `capabilityPolicyDrawer()` mirroring `availabilityDrawer()` (`teacher.js:131-137`): a
  `previewTemplate('trn-policy', { titleKey:'trn.policy.title', headIcon:'lock', tone:'violet', bodyHTML })`
  where `bodyHTML` = an **Academic capabilities** subhead (`trn.policy.academicTitle`) + 4 `sheetRow()` rows
  (`trn.policy.cap.<k>` label + authored status) + a **Communication & Notifications** subhead
  (`trn.policy.commTitle`) + the 3 non-pay notification rows (`sheetRow` with channel labels) + the structure-only
  note (`trn.policy.note`) + a trailing `data-disabled-reason` gate (inline, mirroring the availability gate).
- Append `capabilityPolicyDrawer()` to the `pickers` const (`teacher.js:193-196`).
- Add a `data-drawer="trn-policy"` trigger button inside the overview tab panel (beside the availability opener,
  ~`teacher.js:185`). Generic dispatch via `openSheet` (`enhance.js:441/589`) — no new hook.

### 3. Locale: `src/locales/ar.trn.js` + `src/locales/en.trn.js` — new `trn.policy.*` block
`title` · `academicTitle` · `commTitle` · `cap.{chat,library,editSchedule,editClass}` · the notification event +
`ch.{whatsapp,email}` labels · `granted`/`notGranted` (local twins) · `note` (structure-only, enforcement +
delivery are backend) · `open`/`reason` for the gate. Bilingual, mirrored. **`trn.*` is already registered
(`i18n.js` 0-diff).**

## Invariants (STOP if any cannot hold)

- **Academic separated from communication** (two labelled subheads).
- **Structure-only / read-only** — no working toggle, no fake save/delivery/authorization. Display rows only.
- **No parent/guardian contact capability; no locality/lead entitlement** — the preview never renders a contact
  or country row.
- **`salary_*` row EXCLUDED; no pay figure/currency/teacher-rate/student-rate/salary/payout token** — PAY28
  stays green on `teacher.html`.
- Honest FUTURE_BACKEND wording for real authz + notification delivery.
- **Existing host only** — no new 044 component. If planning ever proved a new 044 host unavoidable, 043 still
  freezes the interface + implements the registry + census, leaving only presentation to 044 (never
  unimplemented) — but the current `availabilityDrawer` precedent suffices, so this branch does not trigger.

## Guard — the teacher-policy census (exact, not vague)

A new smoke assertion scoped to `teacher.html`/`.en` (guarded `if (page === 'teacher')`), asserting the built
teacher body: (a) contains 0 pay token (PAY28 on the page body = 0, already enforced sitewide by PAY28); (b) the
`trn-policy` template renders 0 `<input>`/value slot / 0 toggle; (c) renders the academic + communication
subheads and the 4 capability rows; (d) renders 0 `salary`/`راتب` token in the policy template; (e) renders 0
guardian-contact token. Insertion sibling: the teacher-portal pay block (`smoke:2096-2100`) + a page-scoped
`if (page === 'teacher')` census.

## Mutation — MUT-TP (named, not vague)

On an isolated copy: add a Salary row (or any pay token / a value `<input>`) to `TEACHER_CAPABILITY_POLICY` /
`capabilityPolicyDrawer` → build → run smoke → the teacher-policy census RED (pay token found / value slot found).
Restore → GREEN, residue 0. (Because PAY28 is sitewide, a salary token would ALSO trip PAY28 on `teacher.html` —
double coverage.)

## Downstream

**Spec 045 PRESERVES** the policy preview and adds page-local coverage when it redesigns teacher pages; **051**
consumes the `can_chat` model; **053** delivers channels. 043 owns the preview now.
