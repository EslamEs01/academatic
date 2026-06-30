/* Shared, honest course/group action clusters (Spec 006, R51). Every action is one of:
 *   demo toast (data-demo-action + data-toast) · confirm→demo toast (confirmAction) ·
 *   disabled-with-reason (button disabled + reasonKey) · a real in-scope link (href).
 * NO action saves / creates / enrols / assigns / removes / mutates anything. Reuses the
 * existing hooks only — no new runtime hook. `addStudents` is status-gated: a demo toast
 * normally, but disabled-with-reason on a `full` group (grp.reason.full). */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

const demo = (labelKey, ic, toastKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-demo-action data-toast="${esc(t(toastKey))}"` });
const off = (labelKey, ic, reasonKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, disabled: true, reasonKey });
const link = (labelKey, ic, href) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, href });

/** the course profile banner action cluster (demo edit / disabled assign+enrol+export / real links) */
export function courseActions(_i, { schedHref, attHref } = {}) {
  return `<div class="flex flex-wrap gap-2">`
    + demo('crs.act.edit', 'edit', 'crs.act.editToast')
    + off('crs.act.assignTeacher', 'user-check', 'crs.reason.assign')
    + off('crs.act.addStudents', 'user-plus', 'crs.reason.enroll')
    + (schedHref ? link('crs.viewInSchedule', 'schedule', schedHref) : '')
    + (attHref ? link('crs.viewAttendance', 'clipboard-check', attHref) : '')
    + off('crs.act.print', 'file-text', 'crs.reason.export')
    + `</div>`;
}

/** the group profile banner action cluster (demo edit / status-gated add / confirm remove / links) */
export function groupActions(i = {}, { schedHref, attHref } = {}) {
  const addStudents = i.statusId === 'full'
    ? off('grp.act.addStudents', 'user-plus', 'grp.reason.full')
    : demo('grp.act.addStudents', 'user-plus', 'grp.act.addStudentsToast');
  return `<div class="flex flex-wrap gap-2">`
    + demo('grp.act.edit', 'edit', 'grp.act.editToast')
    + addStudents
    + confirmAction({ labelKey: 'grp.act.removeStudent', variant: 'danger', icon: 'user-x', danger: true, size: 'sm', titleKey: 'grp.act.removeTitle', msgKey: 'grp.act.removeMsg', confirmKey: 'grp.act.removeCta', toastKey: 'grp.act.removeToast' })
    + off('grp.act.assignTeacher', 'user-check', 'grp.reason.assign')
    + (schedHref ? link('grp.viewInSchedule', 'schedule', schedHref) : '')
    + (attHref ? link('grp.viewAttendance', 'clipboard-check', attHref) : '')
    + off('grp.act.print', 'file-text', 'grp.reason.export')
    + `</div>`;
}
