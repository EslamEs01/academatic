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

const modalBtn = (labelKey, ic) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-modal-trigger data-modal-title-key="${esc(labelKey)}" data-modal-note-key="common.backendRequiredNote"` });
const drawerBtn = (labelKey, ic, drawerId) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-drawer="${esc(drawerId)}"` });
const demo = (labelKey, ic, toastKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-demo-action data-toast="${esc(t(toastKey))}"` });
const off = (labelKey, ic, reasonKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, disabled: true, reasonKey });
const link = (labelKey, ic, href) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, href });
/* status-lifecycle confirm helper — keyBase → keyBaseTitle/Msg/Cta/Toast (Spec 028) */
const confirmLife = (labelKey, ic, keyBase, danger = false) => confirmAction({ labelKey, icon: ic, size: 'sm', variant: danger ? 'danger' : 'secondary', danger, titleKey: `${keyBase}Title`, msgKey: `${keyBase}Msg`, confirmKey: `${keyBase}Cta`, toastKey: `${keyBase}Toast` });

/** the teachers-page header primary action (demo add) */
export function addTeacherAction() {
  return button({ labelKey: 'trn.act.add', variant: 'secondary', size: 'sm', icon: 'user-plus', attrs: 'data-modal-trigger data-modal-title-key="trn.act.add" data-modal-note-key="common.backendRequiredNote"' });
}

/** the teacher profile banner action cluster (demo edit/message · confirm notify · disabled assign/export · real links) */
/** the teacher profile banner action cluster (Spec 007 + Spec 028): edit/note modals · notify
 * confirm · message gate (→026/future) · assign-course/group display-only picker drawers (baked
 * by pages/teacher.js) · on-vacation/deactivate confirms + delete confirm-danger · reset-password/
 * login-as future-backend gates · real timetable/attendance links · print gate (→029). NO teacher
 * CRUD / status / assignment / schedule persistence, NO pay figure. */
export function teacherActions(_i = {}, { schedHref, attHref } = {}) {
  return `<div class="flex flex-wrap gap-2">`
    + modalBtn('trn.act.edit', 'edit')
    + demo('trn.act.message', 'mail', 'trn.act.messageToast')
    + confirmAction({ labelKey: 'trn.act.notify', icon: 'message-circle', size: 'sm', titleKey: 'trn.act.notifyTitle', msgKey: 'trn.act.notifyMsg', confirmKey: 'trn.act.notifyCta', toastKey: 'trn.act.notifyToast' })
    + modalBtn('trn.act.note', 'file-text')
    + drawerBtn('trn.act.assignCourse', 'curricula', 'trn-assign-course')
    + drawerBtn('trn.act.assignGroup', 'students', 'trn-assign-group')
    + confirmLife('trn.act.vacation', 'moon', 'trn.act.vacation')
    + confirmLife('trn.act.deactivate', 'pause-circle', 'trn.act.deactivate')
    + confirmLife('trn.act.del', 'x-circle', 'trn.act.del', true)
    + off('trn.act.resetPassword', 'settings', 'trn.reason.resetPassword')
    + off('trn.act.loginAs', 'log-out', 'trn.reason.loginAs')
    + (schedHref ? link('trn.act.openTimetable', 'schedule', schedHref) : '')
    + (attHref ? link('trn.act.viewAttendance', 'clipboard-check', attHref) : '')
    + off('trn.act.print', 'file-text', 'trn.reason.export')
    + `</div>`;
}
