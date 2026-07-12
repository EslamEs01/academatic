/* Spec 040 — Notification routing matrix (authored, display-only).
 *
 * The legacy `/management/settings/notification` form carries 47 configuration
 * fields / 28 distinct names / 9 groups. ALL 47 are reproduced here: 0 omitted,
 * 0 invented. Rendered as 13 field() (10 channel selects + 3 numerics) + 34
 * data-toggle LOCAL PREVIEWS (5 masters + 29 event toggles).
 *
 * Honesty laws upheld here:
 *  - NOTHING routes, sends, queues or persists. Toggling is a visual preview;
 *    each section owns ONE backendRequired gated Save.
 *  - The channel enum is the legacy one, byte-exact: 0/1/3/4/5. VALUE `2` DOES
 *    NOT EXIST in legacy and must never be invented.
 *  - The `salaries` row is a NOTIFICATION CATEGORY ONLY (`ntf-salEventsCh`) — it
 *    routes an event and carries ZERO figure: no amount, rate, fine, payout,
 *    period or currency. Teacher pay-free law.
 *  - DOM naming law (smoke:1174 `credInputs` + smoke:92 OMIT regex): no name/id
 *    may contain pass|secret|api|key|token|webhook|card|cvv — and defensively no
 *    `salary` either, hence `salaries` -> `ntf-salEventsCh`.
 *
 * Recorded legacy anomalies (NOT reproduced as behaviour):
 *  - `appnotifiy` (sic) ships DISABLED with no stated reason -> reason UNKNOWN,
 *    so we attach the honest generic backendRequired reason, not an invented cause.
 *  - `teacher_send_manual_reminder` is a teacher-named field sitting inside the
 *    FAMILY block. Recipient = family (its block). The legacy name is not a DOM name.
 *  - "Late 3 Minutes" (`teacher_delay_reminder`): label rendered verbatim; its
 *    trigger semantics are UNKNOWN -> no help text is invented.
 *  - Legacy renders channel 3 as "whats App" (typo). The VALUE is preserved; the
 *    LABEL is corrected.
 *  - Class-status asymmetry is real and is LAW, not a bug to "fix": the teacher set
 *    carries Teacher-absent (code 6), the family set carries End-class (code 5).
 *    Neither set has both. Codes stay metadata — never rendered to the user.
 */

/* The one channel enum — shared by all 10 selects, no per-select subsetting. */
export const CHANNEL_VALUES = [
  { value: '0', labelKey: 'adm.set.notif.ch.off' },
  { value: '1', labelKey: 'adm.set.notif.ch.asProfile' },
  { value: '3', labelKey: 'adm.set.notif.ch.whatsapp', dep: 'whatsapp' },
  { value: '4', labelKey: 'adm.set.notif.ch.email', dep: 'email' },
  { value: '5', labelKey: 'adm.set.notif.ch.private' },
];

/* field(type:'select') wants {value, labelKey, selected} — mark the authored default. */
export const chanOpts = (def) => CHANNEL_VALUES.map((o) => ({ ...o, selected: o.value === def }));

/* Class-update statuses. `code` is legacy metadata, never rendered. */
const CLS_TEACHER = [
  { id: 'cls-t-waiting', code: 1, labelKey: 'adm.set.notif.ev.cls.waiting', on: true },
  { id: 'cls-t-running', code: 2, labelKey: 'adm.set.notif.ev.cls.running', on: true },
  { id: 'cls-t-cancel', code: 3, labelKey: 'adm.set.notif.ev.cls.cancel', on: true },
  { id: 'cls-t-absent', code: 4, labelKey: 'adm.set.notif.ev.cls.absent', on: true },
  { id: 'cls-t-teacherAbsent', code: 6, labelKey: 'adm.set.notif.ev.cls.teacherAbsent', on: true },
  { id: 'cls-t-autoMakeup', code: 7, labelKey: 'adm.set.notif.ev.cls.autoMakeup', on: true },
  { id: 'cls-t-reject', code: 8, labelKey: 'adm.set.notif.ev.cls.reject', on: true },
  { id: 'cls-t-cancelRequest', code: 9, labelKey: 'adm.set.notif.ev.cls.cancelRequest', on: true },
  { id: 'cls-t-approve', code: 10, labelKey: 'adm.set.notif.ev.cls.approve', on: true },
];
const CLS_FAMILY = [
  { id: 'cls-f-waiting', code: 1, labelKey: 'adm.set.notif.ev.cls.waiting', on: true },
  { id: 'cls-f-running', code: 2, labelKey: 'adm.set.notif.ev.cls.running', on: true },
  { id: 'cls-f-cancel', code: 3, labelKey: 'adm.set.notif.ev.cls.cancel', on: true },
  { id: 'cls-f-absent', code: 4, labelKey: 'adm.set.notif.ev.cls.absent', on: true },
  { id: 'cls-f-endClass', code: 5, labelKey: 'adm.set.notif.ev.cls.endClass', on: true },
  { id: 'cls-f-autoMakeup', code: 7, labelKey: 'adm.set.notif.ev.cls.autoMakeup', on: true },
  { id: 'cls-f-reject', code: 8, labelKey: 'adm.set.notif.ev.cls.reject', on: true },
  { id: 'cls-f-cancelRequest', code: 9, labelKey: 'adm.set.notif.ev.cls.cancelRequest', on: true },
  { id: 'cls-f-approve', code: 10, labelKey: 'adm.set.notif.ev.cls.approve', on: true },
];

/* 7 rendered sections over the 9 evidenced legacy groups (S1 folds System+In-app;
 * S5 folds Invoice+Invoice-reminder — adjacent, same-subject; every control still renders). */
export const NOTIF_SECTIONS = [
  {
    id: 'system', titleKey: 'adm.set.notif.sec.system', icon: 'bell', accent: 'sky',
    masters: [
      { id: 'ntf-system', labelKey: 'adm.set.notif.m.system', on: true },
      // legacy ships this disabled with NO stated reason -> UNKNOWN; honest generic reason only.
      { id: 'ntf-inApp', labelKey: 'adm.set.notif.m.inApp', disabled: true, reasonKey: 'adm.set.notif.m.inAppReason' },
    ],
    blocks: [],
  },
  {
    id: 'course', titleKey: 'adm.set.notif.sec.course', icon: 'courses', accent: 'primary',
    masters: [{ id: 'ntf-courseMaster', labelKey: 'adm.set.notif.m.course', on: true }],
    blocks: [
      {
        recipientKey: 'adm.set.notif.rec.teacher',
        channel: { name: 'ntf-crsTeacherCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        events: [
          { id: 'crs-t-create', labelKey: 'adm.set.notif.ev.crs.create', on: false },
          { id: 'crs-t-edit', labelKey: 'adm.set.notif.ev.crs.edit', on: true },
        ],
      },
      {
        recipientKey: 'adm.set.notif.rec.family',
        channel: { name: 'ntf-crsFamilyCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        events: [
          { id: 'crs-f-create', labelKey: 'adm.set.notif.ev.crs.create', on: false },
          { id: 'crs-f-edit', labelKey: 'adm.set.notif.ev.crs.edit', on: true },
          // the asymmetry is real: only the family set carries Status.
          { id: 'crs-f-status', labelKey: 'adm.set.notif.ev.crs.status', on: false },
        ],
      },
    ],
  },
  {
    id: 'class', titleKey: 'adm.set.notif.sec.class', icon: 'sessions', accent: 'teal',
    masters: [{ id: 'ntf-classMaster', labelKey: 'adm.set.notif.m.class', on: true }],
    blocks: [
      {
        recipientKey: 'adm.set.notif.rec.teacher',
        channel: { name: 'ntf-clsTeacherCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        events: CLS_TEACHER,
      },
      {
        recipientKey: 'adm.set.notif.rec.family',
        channel: { name: 'ntf-clsFamilyCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        events: CLS_FAMILY,
      },
    ],
  },
  {
    id: 'reminders', titleKey: 'adm.set.notif.sec.reminders', icon: 'clock', accent: 'amber',
    masters: [{ id: 'ntf-reminderMaster', labelKey: 'adm.set.notif.m.reminder', on: true }],
    blocks: [
      {
        recipientKey: 'adm.set.notif.rec.teacher',
        channel: { name: 'ntf-remTeacherCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        numbers: [{ name: 'ntf-remTeacherHours', labelKey: 'adm.set.notif.f.hoursBefore', value: '2' }],
        events: [
          { id: 'rem-t-daily', labelKey: 'adm.set.notif.ev.rem.daily', on: true },
          // "Late 3 Minutes" — label verbatim; trigger semantics UNKNOWN, no help invented.
          { id: 'rem-t-late3', labelKey: 'adm.set.notif.ev.rem.late3', on: true },
          { id: 'rem-t-before', labelKey: 'adm.set.notif.ev.rem.beforeSession', on: true },
        ],
      },
      {
        recipientKey: 'adm.set.notif.rec.family',
        channel: { name: 'ntf-remFamilyCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        numbers: [{ name: 'ntf-remFamilyHours', labelKey: 'adm.set.notif.f.hoursBefore', value: '2' }],
        events: [
          { id: 'rem-f-reschedule', labelKey: 'adm.set.notif.ev.rem.reschedule', on: true },
          // legacy `teacher_send_manual_reminder` sits in the FAMILY block (naming bug).
          // Recipient = family (its block); the legacy name is not reproduced as a DOM name.
          { id: 'rem-f-manual', labelKey: 'adm.set.notif.ev.rem.manual', on: true },
          { id: 'rem-f-before', labelKey: 'adm.set.notif.ev.rem.beforeSession', on: true },
        ],
      },
    ],
  },
  {
    id: 'invoices', titleKey: 'adm.set.notif.sec.invoices', icon: 'wallet', accent: 'violet',
    masters: [],
    blocks: [
      {
        // legacy has NO recipient control for invoice events — the recipient is implicit.
        // Rendered under Invoices addressed to the family; no teacher/staff recipient is invented.
        recipientKey: 'adm.set.notif.rec.family',
        channel: { name: 'ntf-invoiceCh', labelKey: 'adm.set.notif.f.invoiceCh', def: '5' },
        extraChannels: [{ name: 'ntf-invoiceReminderCh', labelKey: 'adm.set.notif.f.invoiceReminderCh', def: '5' }],
        numbers: [{ name: 'ntf-invoiceReminderDays', labelKey: 'adm.set.notif.f.reminderDays', value: '3' }],
        events: [],
      },
    ],
  },
  {
    id: 'salary', titleKey: 'adm.set.notif.sec.salary', icon: 'bell', accent: 'neutral',
    masters: [],
    blocks: [
      {
        recipientKey: 'adm.set.notif.rec.teacher',
        // ROUTING ONLY. Zero figure: no amount, rate, fine, payout, period, currency.
        channel: { name: 'ntf-salEventsCh', labelKey: 'adm.set.notif.f.channel', def: '3' },
        events: [],
      },
    ],
  },
  {
    id: 'familyStatus', titleKey: 'adm.set.notif.sec.familyStatus', icon: 'families', accent: 'primary',
    masters: [],
    blocks: [
      {
        recipientKey: 'adm.set.notif.rec.family',
        channel: { name: 'ntf-familyStatusCh', labelKey: 'adm.set.notif.f.channel', def: '0' },
        events: [],
      },
    ],
  },
];
