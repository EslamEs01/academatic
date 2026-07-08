/* Spec 029 — Feedback review + Forms/surveys, FOLDED into reports.html (no new page).
 *
 * Two display-only sections composed entirely from the CLOSED data-* hook set + existing
 * primitives (filterBar · previewTemplate/sheetRow · card-grid · confirmAction · chip):
 *   - feedbackSection(): authored FEEDBACK rows (teacher/class/family/student) with a real
 *     static type/status filter, a read-only detail drawer per row (Approve/Delete = confirm
 *     backendRequired finals), a Create-feedback modal, and a Manage-categories drawer.
 *   - formsSection(): authored FORMS list (question/response counts are literals — NO
 *     aggregation), a Create-form modal, a read-only detail drawer per form, and a real
 *     deep-link to the existing student Evaluation tab (the monthly progress form).
 * no plotting visuals, no computed proportion / numeric mark / ordering, no persistence, no money figure. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { button, chip } from './ui.js';
import { previewTemplate, sheetRow } from './preview-drawer.js';
import { confirmAction } from './confirm-modal.js';
import { filterBar } from './filter-bar.js';
import { cardGrid } from './card-grid.js';
import { noResults } from './states.js';
import {
  FEEDBACK, FEEDBACK_CATEGORIES, FORMS, FB_TYPES,
  FB_REMARK_TONE, FB_STATUS, FORM_STATUS,
} from '../fixtures/report-feedback.js';

const REMARK_ICON = { excellent: 'sparkles', good: 'check-circle', sometimes: 'clock', rarely: 'alert-triangle' };
const studentEvalHref = () => (getLang() === 'en' ? 'student.en.html#view=evaluation' : 'student.html#view=evaluation');

/* categorical remark pill (reuses .rating-pill tone-* CSS) — icon + label, NEVER a number */
function remarkPill(remarkId) {
  const tone = FB_REMARK_TONE[remarkId] || 'good';
  return `<span class="rating-pill tone-${tone}">${icon(REMARK_ICON[tone] || 'check-circle', 'ico')}<span>${t('rep.fb.rmk.' + remarkId)}</span></span>`;
}
const fbStatusChip = (id) => chip({ labelKey: 'rep.fb.st.' + id, tone: FB_STATUS[id].tone, icon: FB_STATUS[id].icon });
const fbTypeChip = (type) => chip({ labelKey: 'rep.fb.type.' + type, tone: 'neutral', icon: 'inbox' });
const formStatusChip = (id) => chip({ labelKey: 'rep.form.st.' + id, tone: FORM_STATUS[id].tone, icon: FORM_STATUS[id].icon });

/* ── one feedback row (facet-filterable) ──────────────────────────────── */
function feedbackRow(f) {
  const search = `${t(f.subjectKey)} ${t(f.categoryKey)} ${t('rep.fb.type.' + f.type)}`;
  return `<div class="card p-3.5" ${facetAttrs({ type: f.type, status: f.statusId, search })}>
    <div class="flex items-center justify-between gap-2 mb-2">
      <div class="font-bold text-ink text-[13.5px]">${t(f.subjectKey)}</div>
      ${fbStatusChip(f.statusId)}
    </div>
    <div class="flex flex-wrap items-center gap-1.5 mb-2.5">
      ${fbTypeChip(f.type)}${chip({ labelKey: f.categoryKey, tone: 'upcoming', icon: 'filter' })}${remarkPill(f.remarkId)}
    </div>
    <div class="flex items-center justify-between gap-2">
      <span class="text-[12px]" style="color:var(--c-ink-3)">${t(f.dateKey)}</span>
      ${button({ labelKey: 'rep.fb.view', variant: 'ghost', size: 'sm', icon: 'search', attrs: `data-drawer="rep-fb-${esc(f.id)}"` })}
    </div>
  </div>`;
}

/* read-only detail drawer + Approve/Delete confirm finals (backendRequired) */
function feedbackDrawer(f) {
  const approve = confirmAction({
    labelKey: 'rep.fb.approve', icon: 'check-circle', variant: 'primary', size: 'sm',
    titleKey: 'rep.fb.approveTitle', msgKey: 'common.backendRequiredNote', confirmKey: 'rep.fb.approveCta', toastKey: 'rep.fb.approveToast',
  });
  const del = confirmAction({
    labelKey: 'rep.fb.del', icon: 'x-circle', variant: 'danger', size: 'sm', danger: true,
    titleKey: 'rep.fb.delTitle', msgKey: 'common.backendRequiredNote', confirmKey: 'rep.fb.delCta', toastKey: 'rep.fb.delToast',
  });
  const body = `
    ${sheetRow(t('rep.fb.lbl.subject'), esc(t(f.subjectKey)))}
    ${sheetRow(t('rep.fb.lbl.category'), esc(t(f.categoryKey)))}
    ${sheetRow(t('rep.fb.lbl.remark'), remarkPill(f.remarkId))}
    ${sheetRow(t('rep.fb.lbl.status'), fbStatusChip(f.statusId))}
    ${sheetRow(t('rep.fb.lbl.date'), esc(t(f.dateKey)))}
    <div class="info-card mt-3">
      <div class="ic-title">${icon('message-square', 'ico')}<span>${t('rep.fb.lbl.note')}</span></div>
      <p class="narrative">${esc(t(f.noteKey))}</p>
    </div>
    <div class="flex flex-wrap items-center gap-2 mt-4">${approve}${del}</div>`;
  return previewTemplate('rep-fb-' + f.id, { titleKey: 'rep.fb.detailTitle', headIcon: 'inbox', tone: 'primary', bodyHTML: body });
}

/* Manage-categories drawer — list + Create-category modal + assign-members backendRequired gate.
 * Mirrors teachers.js categoriesDrawer(); the nav item stays planned/folded (no page). */
function categoriesDrawer() {
  const rows = FEEDBACK_CATEGORIES
    .map((c) => sheetRow(t(c.nameKey), `${t('rep.fbcat.members', { n: num(c.count) })}`))
    .join('');
  const body = `<p class="text-[12.5px] mb-3" style="color:var(--c-ink-3)">${t('rep.fbcat.hint')}</p>
    ${rows}
    <div class="flex flex-wrap gap-2 mt-4">
      ${button({ labelKey: 'rep.fbcat.createTitle', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-modal-trigger data-modal-title-key="rep.fbcat.createTitle" data-modal-note-key="common.backendRequiredNote"' })}
      <button type="button" class="btn btn-primary btn-sm" data-disabled-reason data-reason-key="rep.fbcat.assignReason" aria-disabled="true" title="${esc(t('rep.fbcat.assignReason'))}">${icon('user-check', 'ico ico-sm')}<span>${t('rep.fbcat.assign')}</span></button>
    </div>`;
  return previewTemplate('rep-fbcat', { titleKey: 'rep.fbcat.title', headIcon: 'filter', tone: 'primary', bodyHTML: body });
}

export function feedbackSection() {
  const filters = filterBar({
    targetId: 'reports-feedback-grid', searchKey: 'rep.fb.search',
    selects: [
      { name: 'type', labelKey: 'rep.fb.filterType', options: [{ value: '', labelKey: 'rep.fb.allTypes' }, ...FB_TYPES.map((v) => ({ value: v, labelKey: 'rep.fb.type.' + v }))] },
      { name: 'status', labelKey: 'rep.fb.filterStatus', options: [{ value: '', labelKey: 'rep.fb.allStatus' }, ...['open', 'reviewed', 'resolved'].map((v) => ({ value: v, labelKey: 'rep.fb.st.' + v }))] },
    ],
  });
  const header = `<div class="flex flex-wrap items-start justify-between gap-3 mb-3">
    <div>
      <h2 class="section-title">${esc(t('rep.fb.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.fb.sub'))}</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      ${button({ labelKey: 'rep.fbcat.manage', variant: 'ghost', size: 'sm', icon: 'filter', attrs: 'data-drawer="rep-fbcat"' })}
      ${button({ labelKey: 'rep.fb.create', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-modal-trigger data-modal-title-key="rep.fb.createTitle" data-modal-note-key="common.backendRequiredNote"' })}
    </div>
  </div>`;
  return `<section class="mt-8" id="reports-feedback">
    ${header}
    ${filters}
    ${cardGrid(FEEDBACK.map(feedbackRow), { cols: 'sm:grid-cols-2 lg:grid-cols-3', id: 'reports-feedback-grid' })}
    ${noResults()}
    ${FEEDBACK.map(feedbackDrawer).join('')}
    ${categoriesDrawer()}
  </section>`;
}

/* ── one form row + its read-only drawer ──────────────────────────────── */
function formRow(fm) {
  const badge = fm.isDefault ? `<span class="chip tone-upcoming">${icon('star', 'ico')}<span>${t('rep.form.default')}</span></span>` : '';
  return `<div class="card p-3.5" ${facetAttrs({ status: fm.statusId, search: t(fm.titleKey) })}>
    <div class="flex items-center justify-between gap-2 mb-2">
      <div class="font-bold text-ink text-[13.5px]">${t(fm.titleKey)}</div>
      ${formStatusChip(fm.statusId)}
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-2.5 text-[12.5px]" style="color:var(--c-ink-2)">
      <span><b class="tabular text-ink">${num(fm.questions)}</b> ${esc(t('rep.form.questions'))}</span>
      <span><b class="tabular text-ink">${num(fm.responses)}</b> ${esc(t('rep.form.responses'))}</span>
      ${badge}
    </div>
    <div class="flex items-center justify-end">
      ${button({ labelKey: 'rep.form.view', variant: 'ghost', size: 'sm', icon: 'search', attrs: `data-drawer="rep-form-${esc(fm.id)}"` })}
    </div>
  </div>`;
}

function formDrawer(fm) {
  const body = `
    ${sheetRow(t('rep.form.lbl.questions'), `<span class="tabular">${num(fm.questions)}</span>`)}
    ${sheetRow(t('rep.form.lbl.responses'), `<span class="tabular">${num(fm.responses)}</span>`)}
    ${sheetRow(t('rep.form.lbl.status'), formStatusChip(fm.statusId))}
    ${sheetRow(t('rep.form.lbl.created'), esc(t(fm.createdKey)))}
    ${fm.isDefault ? `<p class="text-[12.5px] mt-3" style="color:var(--c-ink-3)">${esc(t('rep.form.progressHint'))}</p>
      <a href="${esc(studentEvalHref())}" class="link-more mt-1 inline-flex">${esc(t('rep.form.progressLink'))} ${icon('arrow-left', 'ico ico-sm')}</a>` : ''}`;
  return previewTemplate('rep-form-' + fm.id, { titleKey: 'rep.form.detailTitle', headIcon: 'clipboard-check', tone: 'primary', bodyHTML: body });
}

export function formsSection() {
  const header = `<div class="flex flex-wrap items-start justify-between gap-3 mb-3">
    <div>
      <h2 class="section-title">${esc(t('rep.form.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('rep.form.sub'))}</p>
    </div>
    ${button({ labelKey: 'rep.form.create', variant: 'secondary', size: 'sm', icon: 'plus', attrs: 'data-modal-trigger data-modal-title-key="rep.form.createTitle" data-modal-note-key="common.backendRequiredNote"' })}
  </div>`;
  // the monthly student progress form is the EXISTING student Evaluation tab — a real deep-link,
  // never a duplicate form engine (Spec 029 R-D).
  const progress = `<div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px]" style="color:var(--c-ink-3)">
    <span>${esc(t('rep.form.progressHint'))}</span>
    <a href="${esc(studentEvalHref())}" class="link-more">${esc(t('rep.form.progressLink'))} ${icon('arrow-left', 'ico ico-sm')}</a>
  </div>`;
  return `<section class="mt-8" id="reports-forms">
    ${header}
    ${cardGrid(FORMS.map(formRow), { cols: 'sm:grid-cols-2 lg:grid-cols-3', id: 'reports-forms-grid' })}
    ${progress}
    ${FORMS.map(formDrawer).join('')}
  </section>`;
}
