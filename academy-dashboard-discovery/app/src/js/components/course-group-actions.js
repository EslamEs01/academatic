/* Shared, honest course/group action clusters (Spec 006 + Spec 027, R51). Every action is
 * one of: an honest backendRequired MODAL (data-modal-trigger + title/note keys, for
 * Edit / Create-group) · a display-only candidate-list DRAWER picker (data-drawer → a baked
 * <template> whose final Add is a backendRequired gate, for Add-students) · confirm→
 * backendRequired (confirmAction, for Remove) · disabled-with-reason gate (assign-teacher →
 * 028, print → 029, group move) · a real in-scope link (href). NO action saves / creates /
 * enrols / assigns / removes / mutates anything — reuses the existing hooks only, no new
 * runtime hook. `addStudents` is status-gated: the picker drawer normally, but
 * disabled-with-reason on a `full` group (grp.reason.full). */
import { esc } from '../dom.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';

const modalBtn = (labelKey, ic) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-modal-trigger data-modal-title-key="${esc(labelKey)}" data-modal-note-key="common.backendRequiredNote"` });
const drawerBtn = (labelKey, ic, drawerId) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-drawer="${esc(drawerId)}"` });
const off = (labelKey, ic, reasonKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, disabled: true, reasonKey });
const link = (labelKey, ic, href) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, href });

/** the course profile banner action cluster (edit modal / add-students picker / create-group
 * modal / disabled assign+export gates / real links). The `crs-enroll` picker template is
 * baked by pages/course.js. */
export function courseActions(_i, { schedHref, attHref } = {}) {
  return `<div class="flex flex-wrap gap-2">`
    + modalBtn('crs.act.edit', 'edit')
    + drawerBtn('crs.act.assignTeacher', 'user-check', 'crs-assign-teacher')
    + drawerBtn('crs.act.addStudents', 'user-plus', 'crs-enroll')
    + modalBtn('crs.act.createGroup', 'plus')
    + (schedHref ? link('crs.viewInSchedule', 'schedule', schedHref) : '')
    + (attHref ? link('crs.viewAttendance', 'clipboard-check', attHref) : '')
    + off('crs.act.print', 'file-text', 'crs.reason.export')
    + `</div>`;
}

/** the group profile banner action cluster (edit modal / status-gated add-students picker /
 * confirm remove / move gate / disabled assign+export gates / real links). The `grp-assign`
 * picker template is baked by pages/group.js. */
export function groupActions(i = {}, { schedHref, attHref } = {}) {
  const addStudents = i.statusId === 'full'
    ? off('grp.act.addStudents', 'user-plus', 'grp.reason.full')
    : drawerBtn('grp.act.addStudents', 'user-plus', 'grp-assign');
  return `<div class="flex flex-wrap gap-2">`
    + modalBtn('grp.act.edit', 'edit')
    + addStudents
    + confirmAction({ labelKey: 'grp.act.removeStudent', variant: 'danger', icon: 'user-x', danger: true, size: 'sm', titleKey: 'grp.act.removeTitle', msgKey: 'grp.act.removeMsg', confirmKey: 'grp.act.removeCta', toastKey: 'grp.act.removeToast' })
    + off('grp.act.move', 'arrow-left', 'grp.reason.move')
    + drawerBtn('grp.act.assignTeacher', 'user-check', 'grp-assign-teacher')
    + (schedHref ? link('grp.viewInSchedule', 'schedule', schedHref) : '')
    + (attHref ? link('grp.viewAttendance', 'clipboard-check', attHref) : '')
    + off('grp.act.print', 'file-text', 'grp.reason.export')
    + `</div>`;
}
