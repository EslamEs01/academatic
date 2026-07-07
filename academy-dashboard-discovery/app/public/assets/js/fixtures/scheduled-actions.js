/* Spec 026 — Scheduled Actions (admin ops automation queue).
 *
 * DISPLAY-ONLY authored queue of future lifecycle actions (suspend / activate /
 * cancel-classes) with an optional auto-return date. There is NO scheduler engine,
 * NO backend, NO persistence and NO computed score/rank/percentile — every row is
 * an authored fixture and the summary is a plain roll-up (row filters, like
 * GROUP_SUMMARY). display-only authored counts (no monetary values).
 *
 * Grounded in `management-scheduled-actions.md` (+create): action_type ∈
 * {Stop Family, Stop Student, Cancel Classes, Activate Family, Activate Student};
 * the legacy "Returned date" field = auto-return (blank ⇒ a full stop). Every
 * display string is an i18n key (`sca.*`) so the AR and EN builds both resolve. */

const a = (r) => ({ autoReturn: false, ...r });

export const SCHEDULED_ACTIONS = [
  a({ id: 'sca1', typeKey: 'stopStudent',     targetLabel: 'sca.target.salman',    scheduledDateLabel: 'sca.date.jul12', returnedAtLabel: 'sca.ret.jul26', autoReturn: true, statusKey: 'upcoming' }),
  a({ id: 'sca2', typeKey: 'stopFamily',      targetLabel: 'sca.target.famRashid', scheduledDateLabel: 'sca.date.jul15', returnedAtLabel: 'sca.ret.none',                    statusKey: 'queued' }),
  a({ id: 'sca3', typeKey: 'cancelClasses',   targetLabel: 'sca.target.groupMath', scheduledDateLabel: 'sca.date.jul18', returnedAtLabel: 'sca.ret.na',                      statusKey: 'queued' }),
  a({ id: 'sca4', typeKey: 'activateFamily',  targetLabel: 'sca.target.famSalem',  scheduledDateLabel: 'sca.date.jul20', returnedAtLabel: 'sca.ret.na',                      statusKey: 'upcoming' }),
  a({ id: 'sca5', typeKey: 'activateStudent', targetLabel: 'sca.target.omar',      scheduledDateLabel: 'sca.date.jul24', returnedAtLabel: 'sca.ret.na',                      statusKey: 'queued' }),
  a({ id: 'sca6', typeKey: 'stopStudent',     targetLabel: 'sca.target.lina',      scheduledDateLabel: 'sca.date.jul28', returnedAtLabel: 'sca.ret.aug09', autoReturn: true, statusKey: 'cancelled' }),
];

/* display-only roll-up — plain row counts, NOT a computed score/rank/percentile */
export const SCHEDULED_ACTIONS_SUMMARY = {
  total: SCHEDULED_ACTIONS.length,
  queued: SCHEDULED_ACTIONS.filter((r) => r.statusKey === 'queued').length,
  upcoming: SCHEDULED_ACTIONS.filter((r) => r.statusKey === 'upcoming').length,
  autoReturn: SCHEDULED_ACTIONS.filter((r) => r.autoReturn).length,
};

/* Django-parity alias (the template iterates `scheduled_actions`). */
export const SCHEDULED_ACTION_ROWS = SCHEDULED_ACTIONS;
