/* The ONE canonical session-outcome drawer (Spec 005, R35). A SUPERSET of the
 * Spec 003 appointment drawer: the shared `appointmentRows(item)` + an outcome
 * section (Outcome chip + who-absent/who-cancelled attribution + make-up/credit
 * DISPLAY hint + follow-up + feedback) + a status-gated DEMO action cluster.
 * Opened by the EXISTING data-drawer → openSheet engine over a baked
 * <template data-preview>. Used by attendance.html + sessions.html; degrades to
 * the plain appointment view when there is no recorded outcome. NO new engine,
 * NO persistence, NO mutation, NO finance/credit. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { previewTemplate, sheetRow } from './preview-drawer.js';
import { appointmentRows } from './appointment-details.js';
import { outcomeChip } from './outcome-status.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');
const flag = (ic, labelKey) => `<span class="attention-flag">${icon(ic, 'ico ico-sm')}<span>${t(labelKey)}</span></span>`;
/* outcomes where attendance was actually taken — present/capacity is meaningful only here
 * (NOT for cancelled/rescheduled/upcoming/live, where "0 / N attended" would mislead) */
const OCCURRED = new Set(['attended', 'studentAbsent', 'teacherAbsent']);

/* a session has a "recorded outcome" worth a section unless it's a bare upcoming/live */
function isRecorded(i) {
  if (!i.outcomeId) return false;
  if ((i.outcomeId === 'upcoming' || i.outcomeId === 'live') && !i.attribution && !i.makeup && !i.followUp && !i.feedbackKey) return false;
  return true;
}

/** the outcome section (only when a recorded outcome exists) */
export function outcomeSection(i) {
  if (!isRecorded(i)) return '';
  const out = [`<div class="sheet-row" style="border-top:1px solid var(--c-line);margin-top:8px;padding-top:12px"><span class="k">${t('att.outcome')}</span><span class="v">${outcomeChip(i.outcomeId)}</span></div>`];
  if (OCCURRED.has(i.outcomeId) && i.present != null && i.capacity != null)
    out.push(sheetRow(t('att.present'), `<span class="tabular">${num(i.present)} / ${num(i.capacity)}</span>`));
  if (i.studentHref && i.studentNameKey) out.push(sheetRow(t('att.student'), `<a href="${esc(i.studentHref)}" class="link-more">${t(i.studentNameKey)}</a>`));
  if (i.attribution) out.push(sheetRow('', flag(i.attribution.absentBy ? 'user-x' : 'x-circle', i.attribution.labelKey)));
  if (i.makeup) out.push(sheetRow('', flag('rotate-cw', i.makeup.labelKey)));
  if (i.rescheduleHint) out.push(sheetRow(t('att.newTime'), `<span dir="ltr">${t(i.rescheduleHint)}</span>`));
  if (i.followUp) out.push(sheetRow('', flag('alert-triangle', i.followUp.labelKey)));
  if (i.feedbackKey) out.push(sheetRow(t('att.feedback'), t(i.feedbackKey)));
  return out.join('');
}

const demoBtn = (labelKey, ic, toastKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-demo-action data-toast="${esc(t(toastKey))}"` });
const confirmBtn = (labelKey, ic, base, danger = true) => confirmAction({ labelKey, variant: danger ? 'danger' : 'secondary', icon: ic, danger, titleKey: `${base}Title`, msgKey: `${base}Msg`, confirmKey: `${base}Cta`, toastKey: `${base}Toast` });

/** the status-gated, DEMO-only action cluster (per outcome-actions-contract) */
export function gatedActions(i) {
  const o = i.outcomeId;
  const A = [];
  if (o === 'upcoming' || o === 'live') {
    A.push(demoBtn('att.act.attend', 'check-circle', 'att.act.attendToast'));
    A.push(confirmBtn('att.act.studentAbsent', 'user-x', 'att.act.studentAbsent'));
    A.push(confirmBtn('att.act.teacherAbsent', 'user-x', 'att.act.teacherAbsent'));
    A.push(confirmBtn('att.act.cancel', 'x-circle', 'att.act.cancel'));
    A.push(confirmBtn('att.act.reschedule', 'calendar-clock', 'att.act.reschedule', false));
  } else if (o === 'attended') {
    A.push(demoBtn('att.act.feedback', 'file-text', 'att.act.feedbackToast'));
    A.push(demoBtn('att.act.notify', 'bell', 'att.act.notifyToast'));
    A.push(demoBtn('att.act.reverse', 'rotate-cw', 'att.act.reverseToast'));
  } else if (o === 'studentAbsent' || o === 'teacherAbsent' || o === 'cancelled') {
    A.push(confirmBtn('att.act.reschedule', 'calendar-clock', 'att.act.reschedule', false));
    A.push(demoBtn('att.act.notify', 'bell', 'att.act.notifyToast'));
    A.push(demoBtn('att.act.reverse', 'rotate-cw', 'att.act.reverseToast'));
    A.push(button({ labelKey: 'att.act.addToCredit', variant: 'secondary', size: 'sm', icon: 'wallet', disabled: true, reasonKey: 'att.reason.finance' }));
  } else if (o === 'rescheduled') {
    A.push(demoBtn('att.act.notify', 'bell', 'att.act.notifyToast'));
    A.push(demoBtn('att.act.reverse', 'rotate-cw', 'att.act.reverseToast'));
  }
  A.push(`<a href="${schedHref()}" class="btn btn-secondary btn-sm">${icon('schedule', 'ico ico-sm')}<span>${t('att.viewInSchedule')}</span></a>`);
  return `<div class="flex flex-wrap gap-2 mt-5">${A.join('')}</div>`;
}

/** the canonical outcome drawer — superset of appointmentRows + outcome section + actions */
export function outcomeTemplate(item) {
  const i = item || {};
  return previewTemplate(i.id, {
    title: t(i.titleKey), headIcon: 'clipboard-check', tone: 'primary',
    bodyHTML: appointmentRows(i) + outcomeSection(i) + gatedActions(i),
  });
}
