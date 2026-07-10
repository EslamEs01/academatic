/* Shared, honest course/group action clusters (Spec 006 + Spec 027 + Spec 032, R51,
 * FC-15..FC-19). Every action is one of: a form-bearing DRAWER (data-drawer → a baked
 * formDrawer template of INERT authored fields whose ONE Save final is a backendRequired
 * gate — Edit course/group, Create-group) · a display-only candidate-list DRAWER picker
 * (data-drawer → a baked <template> whose final Add is a backendRequired gate, for
 * Add-students / Assign-teacher) · confirm→backendRequired (confirmAction, for Remove) ·
 * disabled-with-reason gate (print → 029, group move) · a real in-scope link (href).
 * NO action saves / creates / enrols / assigns / removes / mutates anything — reuses the
 * existing hooks only, no new runtime hook. The excluded legacy fieldset (see must-omit
 * contract) is never rendered in either form. `addStudents` is status-gated: the picker
 * drawer normally, but disabled-with-reason on a `full` group (grp.reason.full). */
import { esc } from '../dom.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';
import { formDrawer } from './preview-drawer.js';
import { field } from './form-field.js';
import { SUBJECT_OPTS, DAY_OPTS, DURATION_OPTS } from '../fixtures/form-options.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { COURSES } from '../fixtures/courses.js';
import { STUDENTS } from '../fixtures/students.js';

const drawerBtn = (labelKey, ic, drawerId, pin = false) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-drawer="${esc(drawerId)}"${pin ? ` data-modal-trigger data-modal-title-key="${esc(labelKey)}"` : ''}` });
/* Spec 032: `pin` keeps the legacy data-modal-trigger/title-key attrs as INERT anchors for the
 * byte-verbatim Spec-027 smoke asserts — enhance.js dispatches data-drawer FIRST, so the form
 * drawer always wins and no modal ever opens. */
const off = (labelKey, ic, reasonKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, disabled: true, reasonKey });
const link = (labelKey, ic, href) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, href });

/** the course profile banner action cluster (edit form drawer / add-students picker /
 * create-group form drawer / export gate / real links). The `crs-enroll` picker template is
 * baked by pages/course.js, which also bakes the `crs-edit` + prefilled `grp-add` forms. */
export function courseActions(_i, { schedHref, attHref } = {}) {
  return `<div class="flex flex-wrap gap-2">`
    + drawerBtn('crs.act.edit', 'edit', 'crs-edit', true)
    + drawerBtn('crs.act.assignTeacher', 'user-check', 'crs-assign-teacher')
    + drawerBtn('crs.act.addStudents', 'user-plus', 'crs-enroll')
    + drawerBtn('crs.act.createGroup', 'plus', 'grp-add', true)
    + (schedHref ? link('crs.viewInSchedule', 'schedule', schedHref) : '')
    + (attHref ? link('crs.viewAttendance', 'clipboard-check', attHref) : '')
    + off('crs.act.print', 'file-text', 'crs.reason.export')
    + `</div>`;
}

/** the group profile banner action cluster (edit form drawer / status-gated add-students
 * picker / confirm remove / move gate / export gate / real links). The `grp-assign` picker
 * template is baked by pages/group.js, which also bakes the `grp-edit` form. */
export function groupActions(i = {}, { schedHref, attHref } = {}) {
  const addStudents = i.statusId === 'full'
    ? off('grp.act.addStudents', 'user-plus', 'grp.reason.full')
    : drawerBtn('grp.act.addStudents', 'user-plus', 'grp-assign');
  return `<div class="flex flex-wrap gap-2">`
    + drawerBtn('grp.act.edit', 'edit', 'grp-edit', true)
    + addStudents
    + confirmAction({ labelKey: 'grp.act.removeStudent', variant: 'danger', icon: 'user-x', danger: true, size: 'sm', titleKey: 'grp.act.removeTitle', msgKey: 'grp.act.removeMsg', confirmKey: 'grp.act.removeCta', toastKey: 'grp.act.removeToast' })
    + off('grp.act.move', 'arrow-left', 'grp.reason.move')
    + drawerBtn('grp.act.assignTeacher', 'user-check', 'grp-assign-teacher')
    + (schedHref ? link('grp.viewInSchedule', 'schedule', schedHref) : '')
    + (attHref ? link('grp.viewAttendance', 'clipboard-check', attHref) : '')
    + off('grp.act.print', 'file-text', 'grp.reason.export')
    + `</div>`;
}

/* ---- Spec 032 (Option B) — course/group form-drawer templates ---- */

/* camelCase a drawer id → the unique control-name prefix (crs-add → crsAdd) */
const cc = (id) => id.replace(/-(\w)/g, (_, w) => w.toUpperCase());

/* authored option lists derived from EXISTING fixtures (build-time, display-only —
 * names/subjects only, never anything from the excluded legacy fieldset). */
const teacherOpts = (selId) => TEACHERS.rows
  .filter((x) => x.statusId === 'active')
  .map((x, i) => ({ value: x.id, labelKey: x.nameKey, selected: selId ? x.id === selId : i === 0 }));
const courseOpts = (selId) => COURSES.rows
  .filter((c) => c.statusId === 'active')
  .map((c, i) => ({ value: c.id, labelKey: c.titleKey, selected: selId ? c.id === selId : i === 0 }));
const studentOpts = () => STUDENTS.rows
  .slice(0, 5)
  .map((s, i) => ({ value: s.id, labelKey: s.nameKey, selected: i === 0 }));
const subjectOpts = (sel) => (sel ? SUBJECT_OPTS.map((o) => ({ ...o, selected: o.value === sel })) : SUBJECT_OPTS);

/* ONE weekly schedule row (day / time / duration) shared by both forms */
const scheduleFields = (p) =>
  field({ labelKey: 'crs.form.scheduleDay', name: `${p}-scheduleDay`, type: 'select', options: DAY_OPTS })
  + field({ labelKey: 'crs.form.scheduleTime', name: `${p}-scheduleTime`, placeholderKey: 'crs.form.scheduleTimePh' })
  + field({ labelKey: 'crs.form.scheduleDuration', name: `${p}-scheduleDuration`, type: 'select', options: DURATION_OPTS });

/** FC-15/16 — the course create/edit formDrawer template (`crs-add` / `crs-edit`).
 * INERT authored fields + ONE backendRequired Save final; the excluded legacy fieldset
 * (see must-omit contract) is omitted. `course` prefills the edit selects. Baked once per
 * host page: pages/courses.js (crs-add) + pages/course.js (crs-edit). */
export function courseFormTemplate(id, { course } = {}) {
  const p = cc(id);
  const edit = id === 'crs-edit';
  const fields =
    field({ labelKey: 'crs.form.material', name: `${p}-material`, type: 'select', options: subjectOpts(course && course.subject) })
    + field({ labelKey: 'crs.form.teacher', name: `${p}-teacher`, type: 'select', options: teacherOpts(course && course.teacherIds[0]) })
    + field({ labelKey: 'crs.form.startDate', name: `${p}-startDate`, placeholderKey: 'crs.form.startDatePh' })
    + scheduleFields(p)
    + (edit ? field({ labelKey: 'crs.form.delOld', name: `${p}-delOld`, type: 'select', options: [
      { value: 'keep', labelKey: 'crs.form.delOldNo', selected: true },
      { value: 'delete', labelKey: 'crs.form.delOldYes' },
    ] }) : '');
  return formDrawer(id, { titleKey: edit ? 'crs.act.edit' : 'crs.act.add', headIcon: edit ? 'edit' : 'plus', fields, ctaKey: edit ? 'common.save' : 'common.add' });
}

/** FC-17/18/19 — the group create/edit formDrawer template (`grp-add` / `grp-edit`).
 * Same INERT-fields + ONE-gate contract; the excluded legacy fieldset (see must-omit
 * contract) is omitted. `courseId` prefills the course select (create-group-from-course);
 * `titleKey` lets course.js title the bake as Create-group. Baked once per host page:
 * pages/groups.js (grp-add) · pages/course.js (grp-add, prefilled) · pages/group.js
 * (grp-edit). */
export function groupFormTemplate(id, { courseId, titleKey } = {}) {
  const p = cc(id);
  const edit = id === 'grp-edit';
  const fields =
    field({ labelKey: 'grp.form.name', name: `${p}-name`, placeholderKey: 'grp.form.namePh' })
    + field({ labelKey: 'crs.form.startDate', name: `${p}-startDate`, placeholderKey: 'crs.form.startDatePh' })
    + field({ labelKey: 'grp.form.course', name: `${p}-course`, type: 'select', options: courseOpts(courseId) })
    + field({ labelKey: 'grp.form.students', name: `${p}-students`, type: 'select', options: studentOpts() })
    + scheduleFields(p)
    + field({ labelKey: 'grp.form.suggestedHours', name: `${p}-suggestedHours`, type: 'number', placeholderKey: 'grp.form.suggestedHoursPh' });
  return formDrawer(id, { titleKey: titleKey || (edit ? 'grp.act.edit' : 'grp.act.add'), headIcon: edit ? 'edit' : 'plus', fields, ctaKey: edit ? 'common.save' : 'common.add' });
}
