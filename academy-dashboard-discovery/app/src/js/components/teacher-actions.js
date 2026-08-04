/* Spec 007 — shared, honest teacher action clusters. Every action is one of:
 *   demo toast (data-demo-action + data-toast) · confirm→demo toast (confirmAction) ·
 *   disabled-with-reason (button disabled + reasonKey) · a real in-scope link (href).
 * NO action saves / creates / assigns / messages / notifies / mutates anything, and the
 * excluded legacy fieldset (see must-omit contract) never renders. Reuses the existing hooks
 * only — no new runtime hook. */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { icon } from '../icons.js';
import { button } from './ui.js';
import { confirmAction } from './confirm-modal.js';
import { formDrawer } from './preview-drawer.js';
import { field } from './form-field.js';
import { FORM_STATUS_OPTS, SUBJECT_OPTS, LEVEL_OPTS } from '../fixtures/form-options.js';
import { COURSES } from '../fixtures/courses.js';

const drawerBtn = (labelKey, ic, drawerId, pin = false) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-drawer="${esc(drawerId)}"${pin ? ` data-modal-trigger data-modal-title-key="${esc(labelKey)}"` : ''}` });
/* Spec 032: `pin` keeps the legacy data-modal-trigger/title-key attrs as INERT anchors for the
 * byte-verbatim Spec-028 smoke asserts — enhance.js dispatches data-drawer FIRST, so the form
 * drawer always wins and no modal ever opens. */
const demo = (labelKey, ic, toastKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, attrs: `data-demo-action data-toast="${esc(t(toastKey))}"` });
const off = (labelKey, ic, reasonKey) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, disabled: true, reasonKey });
const link = (labelKey, ic, href) => button({ labelKey, variant: 'secondary', size: 'sm', icon: ic, href });
/* status-lifecycle confirm helper — keyBase → keyBaseTitle/Msg/Cta/Toast (Spec 028) */
const confirmLife = (labelKey, ic, keyBase, danger = false) => confirmAction({ labelKey, icon: ic, size: 'sm', variant: danger ? 'danger' : 'secondary', danger, titleKey: `${keyBase}Title`, msgKey: `${keyBase}Msg`, confirmKey: `${keyBase}Cta`, toastKey: `${keyBase}Toast` });

/* Spec 041 — D-1 (declared wall supersession W-2).
 * `addTeacherAction()` is REMOVED. It rendered the teachers-page header primary that opened the
 * `trn-add` drawer. Under the MOVE architecture the Add-Teacher form is a real TAB PANEL reached
 * directly from the sidebar (`teachers.html#view=add`) and from the tablist, so a header button that
 * opens a drawer is both redundant and dishonest. It could not be converted: `selectTab()` requires
 * the control to sit INSIDE the `[data-tabs]` wrap, and a same-page `href="#view=add"` anchor would
 * not switch the tab because there is NO hashchange listener. The CAPABILITY is not deleted — it
 * moved (zero-deletion protects capabilities, not symbols). */

/* ---- Spec 032 (Option B) — form-bearing teacher drawers ----
 * Baked <template data-preview> forms of INERT field() controls; the single
 * primary Save final is a clickable data-disabled-reason backendRequired gate.
 * The excluded legacy fieldset (see must-omit contract) is OMITTED entirely;
 * the CV/attachments upload stays a gate. No persistence, no mutation. */
const courseOpts = () => COURSES.rows
  .filter((c) => c.statusId === 'active')
  .map((c, i) => ({ value: c.id, labelKey: c.titleKey, selected: i === 0 }));

/* upload stays a gate — btn-secondary honest inline gate (never a file control) */
const cvGate = () => `<div class="field field-full"><span class="field-label">${t('trn.form.cv')}</span>
    <button type="button" class="btn btn-secondary btn-sm" aria-disabled="true" data-disabled-reason data-reason-key="trn.form.cvReason" title="${esc(t('trn.form.cvReason'))}">${icon('file-text', 'ico ico-sm')}<span>${t('trn.form.cvGate')}</span></button></div>`;

/* Spec 041 — D-1: EXPORTED so the `#view=add` tab panel and the `trn-edit` drawer share ONE
 * definition of the field body. Output and signature are unchanged: 13 field() controls when
 * withGeo=true (firstName · lastName · firstNameAr · lastNameAr · email · phone · status · subjects
 * · level · courses · city · country · notes) plus the CV upload GATE, which is emitted INSIDE this
 * function. There is exactly one definition — never a tab copy and a drawer copy. */
export function teacherFields(p, withGeo = false) {
  const geo = withGeo
    ? field({ labelKey: 'trn.form.city', name: `${p}-city` })
      + field({ labelKey: 'trn.form.country', name: `${p}-country` })
    : '';
  return field({ labelKey: 'trn.form.firstName', name: `${p}-firstName` })
    + field({ labelKey: 'trn.form.lastName', name: `${p}-lastName` })
    + field({ labelKey: 'trn.form.firstNameAr', name: `${p}-firstNameAr` })
    + field({ labelKey: 'trn.form.lastNameAr', name: `${p}-lastNameAr` })
    + field({ labelKey: 'trn.form.email', name: `${p}-email`, placeholderKey: 'trn.form.emailPh' })
    + field({ labelKey: 'trn.form.phone', name: `${p}-phone`, placeholderKey: 'trn.form.phonePh' })
    + field({ labelKey: 'trn.fStatus', name: `${p}-status`, type: 'select', options: FORM_STATUS_OPTS })
    + field({ labelKey: 'trn.subjects', name: `${p}-subjects`, type: 'select', options: SUBJECT_OPTS })
    + field({ labelKey: 'trn.form.level', name: `${p}-level`, type: 'select', options: LEVEL_OPTS })
    + field({ labelKey: 'trn.form.courses', name: `${p}-courses`, type: 'select', options: courseOpts() })
    + geo
    + field({ labelKey: 'trn.tab.notes', name: `${p}-notes`, type: 'textarea', placeholderKey: 'trn.form.notesPh', full: true })
    + cvGate();
}

/** trn-edit — Edit teacher form drawer (baked on teachers.html [kebab host] + teacher.html) */
export function teacherEditDrawer() {
  return formDrawer('trn-edit', { titleKey: 'trn.form.editTitle', headIcon: 'edit', fields: teacherFields('trnEdit') });
}

/* Spec 041 — D-1: `teacherAddDrawer()` became `teacherAddPanel()`.
 * The Add-Teacher form is no longer a `trn-add` <template data-preview> drawer: it is the BODY of the
 * `#view=add` tab panel, rendered directly on a fresh load — no drawer, no second click.
 * The drawer form could NOT be kept alongside the tab: `field()` emits id="f-<name>", and a
 * <template> becomes live DOM the moment enhance.js clones it into the sheet, so a tab copy + a
 * drawer copy would collide on `f-trnAdd-*`. Hence MOVE, never duplicate — and hence the old symbol
 * is repurposed rather than left callable: a dead-but-callable formDrawer('trn-add', …) would
 * re-arm exactly the duplicate-id collision the MOVE exists to prevent.
 * The guarantee is unchanged: the same 13 field() controls, the same CV upload GATE, and EXACTLY ONE
 * primary backendRequired Save. Nothing persists, nothing mutates. */
export function teacherAddPanel() {
  return `<div class="wiz-grid">${teacherFields('trnAdd', true)}</div>
    <div class="flex items-center justify-end gap-2.5 mt-4">
      <button type="button" class="btn btn-primary btn-sm" aria-disabled="true" data-disabled-reason data-reason-key="common.backendRequiredNote" title="${esc(t('common.backendRequiredNote'))}">${icon('check', 'ico')}<span>${t('common.add')}</span></button>
    </div>`;
}

/** trn-note — Add follow-up note form drawer (baked on teacher.html) */
export function teacherNoteDrawer() {
  return formDrawer('trn-note', {
    titleKey: 'trn.act.note', headIcon: 'file-text',
    fields: field({ labelKey: 'trn.form.note', name: 'trnNote-note', type: 'textarea', placeholderKey: 'trn.form.notesPh', full: true }),
  });
}

/** the teacher profile banner action cluster (Spec 007 + Spec 028 + Spec 032): edit/note FORM
 * drawers (trn-edit/trn-note, baked by the host pages) · notify confirm · message gate
 * (→026/future) · assign-course/group display-only picker drawers (baked by pages/teacher.js) ·
 * on-vacation/deactivate confirms + delete confirm-danger · reset-access/login-as
 * future-backend gates · real timetable/attendance links · print gate (→029). NO teacher
 * CRUD / status / assignment / schedule persistence, NO excluded legacy field. */
/* Spec 045 — T048 (FR-036): the SAME fourteen actions, now PRIORITISED and given a real 390px
 * transformation. Two changes, no capability added or removed:
 *   1. the wrapper adopts the additive `td-actions` class. On desktop it is behaviourally
 *      identical to the previous `flex flex-wrap gap-2` (same flex, same wrap, same 8px gap);
 *      at ≤560px it becomes a two-column grid so the cluster stops rendering as the ragged
 *      seven-row waterfall the 390px evidence shows, and every action stays visible and unclipped.
 *   2. the emission order is grouped by intent instead of arbitrary: daily work → assignment →
 *      communication → real navigation → lifecycle → destructive → currently-unavailable gates.
 *      Previously the two disabled future-backend gates sat BETWEEN the destructive delete and the
 *      two working navigation links, so a reader could not tell available from unavailable.
 * Order carries no protected assertion — the Spec-028/032 smoke asserts test PRESENCE
 * (edit/note modal triggers, assign pickers, availability drawer, confirm count, pay-free), never
 * sequence — so this is a composition change only. */
export function teacherActions(_i = {}, { schedHref, attHref } = {}) {
  return `<div class="td-actions">`
    /* daily work */
    + drawerBtn('trn.act.edit', 'edit', 'trn-edit', true)
    + drawerBtn('trn.act.note', 'file-text', 'trn-note', true)
    /* assignment pickers (display-only, backendRequired final) */
    + drawerBtn('trn.act.assignCourse', 'curricula', 'trn-assign-course')
    + drawerBtn('trn.act.assignGroup', 'students', 'trn-assign-group')
    /* communication */
    + demo('trn.act.message', 'mail', 'trn.act.messageToast')
    + confirmAction({ labelKey: 'trn.act.notify', icon: 'message-circle', size: 'sm', titleKey: 'trn.act.notifyTitle', msgKey: 'trn.act.notifyMsg', confirmKey: 'trn.act.notifyCta', toastKey: 'trn.act.notifyToast' })
    /* real navigation into existing routes */
    + (schedHref ? link('trn.act.openTimetable', 'schedule', schedHref) : '')
    + (attHref ? link('trn.act.viewAttendance', 'clipboard-check', attHref) : '')
    /* status lifecycle, then the destructive one */
    + confirmLife('trn.act.vacation', 'moon', 'trn.act.vacation')
    + confirmLife('trn.act.deactivate', 'pause-circle', 'trn.act.deactivate')
    + confirmLife('trn.act.del', 'x-circle', 'trn.act.del', true)
    /* honestly unavailable — grouped last so available actions are not interleaved with gates */
    + off('trn.act.resetPassword', 'settings', 'trn.reason.resetPassword')
    + off('trn.act.loginAs', 'log-out', 'trn.reason.loginAs')
    + off('trn.act.print', 'file-text', 'trn.reason.export')
    + `</div>`;
}
