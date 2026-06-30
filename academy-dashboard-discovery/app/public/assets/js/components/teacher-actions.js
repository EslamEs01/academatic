/* Spec 007 — shared, honest teacher action clusters. Every action is one of:
 *   demo toast (data-demo-action + data-toast) · confirm→demo toast (confirmAction) ·
 *   disabled-with-reason (button disabled + reasonKey) · a real in-scope link (href).
 * NO action saves / creates / assigns / messages / notifies / mutates anything, and there
 * is no pay/finance/deactivate/login-as action. Reuses the existing hooks
 * only — no new runtime hook. */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

const demo = (labelKey, ic, toastKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-demo-action data-toast="${esc(t(toastKey))}"` });
const off = (labelKey, ic, reasonKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, disabled: true, reasonKey });
const link = (labelKey, ic, href) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, href });

/** the teachers-page header primary action (demo add) */
export function addTeacherAction() {
  return demo('trn.act.add', 'user-plus', 'trn.act.addToast');
}

/** the teacher profile banner action cluster (demo edit/message · confirm notify · disabled assign/export · real links) */
export function teacherActions(_i = {}, { schedHref, attHref } = {}) {
  return `<div class="flex flex-wrap gap-2">`
    + demo('trn.act.edit', 'edit', 'trn.act.editToast')
    + demo('trn.act.message', 'mail', 'trn.act.messageToast')
    + confirmAction({ labelKey: 'trn.act.notify', icon: 'message-circle', size: 'sm', titleKey: 'trn.act.notifyTitle', msgKey: 'trn.act.notifyMsg', confirmKey: 'trn.act.notifyCta', toastKey: 'trn.act.notifyToast' })
    + demo('trn.act.note', 'file-text', 'trn.act.noteToast')
    + off('trn.act.assignCourse', 'curricula', 'trn.reason.assign')
    + off('trn.act.assignGroup', 'students', 'trn.reason.assign')
    + (schedHref ? link('trn.act.openTimetable', 'schedule', schedHref) : '')
    + (attHref ? link('trn.act.viewAttendance', 'clipboard-check', attHref) : '')
    + off('trn.act.print', 'file-text', 'trn.reason.export')
    + `</div>`;
}
