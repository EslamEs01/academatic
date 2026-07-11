/* Students page — admin directory (table), ENRICHED for Spec 004 with the real
 * family relationship: a family link/chip per row (→ family.html), a family
 * filter facet, and a "view profile" link to the student academic profile
 * (→ student.html). Quick-peek drawer kept. NOT a student dashboard/portal. */
import { STUDENTS } from '../fixtures/students.js';
import { FAMILIES, familyOf } from '../fixtures/families.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc, facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { dataTable, tableFooter } from '../components/data-table.js';
import { avatar, button, chip } from '../components/ui.js';
import { tabs } from '../components/tabs.js';
import { progressBar } from '../components/sparkline.js';
import { previewTemplate, sheetRow, formDrawer } from '../components/preview-drawer.js';
import { field } from '../components/form-field.js';
import { GENDER_OPTS, LANGUAGE_OPTS, SUBJECT_OPTS, DURATION_OPTS } from '../fixtures/form-options.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { noResults } from '../components/states.js';
import { FAMILY_STATUS, familyStatusChip } from '../components/family-status.js';
import { stuEditDrawer } from './student.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const progressTone = (p) => (p >= 70 ? 'success' : p >= 40 ? 'sky' : 'amber');
const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');

function familyChip(s) {
  const fam = familyOf(s.familyId);
  if (!fam) return '';
  return `<a href="${familyHref()}" class="chip tone-neutral" style="text-decoration:none">${icon('families', 'ico')}<span>${t(fam.guardian.nameKey)}</span></a>`;
}

function row(s) {
  const fam = familyOf(s.familyId);
  const search = `${t(s.nameKey)} ${t(s.levelKey)} ${fam ? t(fam.guardian.nameKey) : ''}`;
  return `<tr ${facetAttrs({ status: s.statusId, subject: s.subject, family: s.familyId, search })}>
    <td><div class="flex items-center gap-2.5">${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <span class="font-bold text-[13px] text-ink">${t(s.nameKey)}</span></div></td>
    <td>${familyChip(s)}</td>
    <td>${familyStatusChip(s.statusId)}</td>
    <td><span class="text-[13px]" style="color:var(--c-ink-2)">${t(s.levelKey)}</span></td>
    <td><div class="flex items-center gap-2" style="min-width:120px">${progressBar(s.progress, progressTone(s.progress))}
      <span class="text-[12px] tabular" style="color:var(--c-ink-3)">${num(s.progress)}%</span></div></td>
    <td><span class="tabular text-[13px]">${num(s.enrolled)}</span></td>
    <td class="text-end"><div class="flex items-center justify-end gap-1">
      <a href="${studentHref()}" class="icon-btn" aria-label="${t('stu.viewProfile')}">${icon('user', 'ico')}</a>
      <button type="button" class="icon-btn" data-drawer="${s.id}" aria-label="${t('dir.viewDetails')}">${icon('chevronEnd', 'ico')}</button>
      <button type="button" class="icon-btn" data-row-menu="${esc(s.id)}" data-row-menu-kind="student" aria-haspopup="menu" aria-label="${esc(t('stu.rowMenu'))}">${icon('ellipsis', 'ico')}</button>
    </div></td>
  </tr>`;
}

/* Spec 032 (FC-14) — the Add-student form drawer: the core child fields plus the
 * authored trial block (subject / teacher / duration selects — fixture-derived).
 * INERT fields + the ONE formDrawer backendRequired final; nothing persists. */
function stuAddDrawer() {
  const famOpts = FAMILIES.rows.map((f, i) => ({ value: f.id, labelKey: f.guardian.nameKey, selected: i === 0 }));
  const teacherOpts = TEACHERS.rows.map((x, i) => ({ value: x.id, labelKey: x.nameKey, selected: i === 0 }));
  const fields = [
    field({ labelKey: 'sp.form.name', name: 'stuAdd-name' }),
    field({ labelKey: 'sp.form.nameAr', name: 'stuAdd-nameAr' }),
    field({ labelKey: 'sp.form.language', name: 'stuAdd-language', type: 'select', options: LANGUAGE_OPTS }),
    field({ labelKey: 'sp.form.gender', name: 'stuAdd-gender', type: 'select', options: GENDER_OPTS }),
    field({ labelKey: 'sp.form.birthDate', name: 'stuAdd-birthDate', placeholderKey: 'sp.form.birthDatePh' }),
    field({ labelKey: 'stu.col.family', name: 'stuAdd-family', type: 'select', options: famOpts }),
    field({ labelKey: 'sp.form.trialMaterial', name: 'stuAdd-trialMaterial', type: 'select', options: SUBJECT_OPTS }),
    field({ labelKey: 'sp.form.trialTeacher', name: 'stuAdd-trialTeacher', type: 'select', options: teacherOpts }),
    field({ labelKey: 'sp.form.trialDuration', name: 'stuAdd-trialDuration', type: 'select', options: DURATION_OPTS }),
  ].join('');
  return formDrawer('stu-add', { titleKey: 'stu.add', headIcon: 'plus', fields, ctaKey: 'common.add' });
}

function preview(s) {
  const fam = familyOf(s.familyId);
  const body = `
    <div class="flex items-center gap-3 mb-4">${avatar({ nameKey: s.nameKey, accent: s.accent })}
      <div><div class="font-bold text-ink">${t(s.nameKey)}</div>${familyStatusChip(s.statusId)}</div></div>
    ${sheetRow(t('stu.col.family'), `<a href="${familyHref()}" class="link-more">${fam ? t(fam.guardian.nameKey) : ''}</a>`)}
    ${sheetRow(t('stu.col.level'), t(s.levelKey))}
    ${sheetRow(t('stu.col.progress'), `<span class="tabular">${num(s.progress)}%</span>`)}
    ${sheetRow(t('stu.courses'), `<span class="tabular">${num(s.enrolled)}</span>`)}
    <a href="${studentHref()}" class="btn btn-primary btn-sm w-full" style="margin-top:14px">${icon('user', 'ico ico-sm')}<span>${t('stu.viewProfile')}</span></a>`;
  return previewTemplate(s.id, { title: t('stu.detailsTitle'), headIcon: 'students', tone: 'primary', bodyHTML: body });
}

export function renderStudents() {
  const rows = STUDENTS.rows;
  const active = rows.filter((r) => r.statusId === 'active').length;
  const trial = rows.filter((r) => r.statusId === 'trial').length;
  const summary = summaryCards([
    { icon: 'students', tone: 'primary', value: num(rows.length), labelKey: 'stu.sum.total' },
    { icon: 'check-circle', tone: 'success', value: num(active), labelKey: 'stu.sum.active' },
    { icon: 'sparkles', tone: 'sky', value: num(trial), labelKey: 'stu.sum.trial' },
  ], { cols: 'grid-cols-1 sm:grid-cols-3' });
  const filters = filterBar({
    targetId: 'students-table', searchKey: 'stu.searchPh',
    selects: [
      { name: 'family', labelKey: 'stu.fFamily', options: [{ value: 'all', labelKey: 'stu.allFamilies' }, ...FAMILIES.rows.map((f) => ({ value: f.id, labelKey: f.guardian.nameKey }))] },
      { name: 'status', labelKey: 'stu.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(FAMILY_STATUS).map((v) => ({ value: v, labelKey: FAMILY_STATUS[v].labelKey }))] },
      { name: 'subject', labelKey: 'stu.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
    ],
  });
  const head = [
    { label: t('stu.col.name') }, { label: t('stu.col.family') }, { label: t('stu.col.status') }, { label: t('stu.col.level') },
    { label: t('stu.col.progress') }, { label: t('stu.col.courses') }, { label: `<span class="sr-only">${t('dir.viewProfile')}</span>`, end: true },
  ];
  const table = dataTable({ id: 'students-table', head, rows: rows.map(row), footerHTML: tableFooter({ shown: rows.length, total: rows.length }) });

  /* Spec 037 — the existing directory (filters + table) becomes the Directory tab;
   * cross-student Results + Evaluation display boards are added as tabs
   * (students.html#view=results / #view=evaluation). Single filterBar stays in
   * Directory only. Per-student rows deep-link to the existing student.html tabs. */
  const directory = `
    ${filters}
    ${table}
    ${noResults()}
  `;
  return `
    ${pageHeader({ titleKey: 'stu.title', subKey: 'stu.sub', primary: button({ labelKey: 'stu.add', variant: 'primary', icon: 'plus', attrs: 'data-drawer="stu-add"' }), summaryHTML: summary })}
    ${tabs({
      group: 'students',
      ariaKey: 'stu.title',
      items: [
        { id: 'directory', labelKey: 'stu.vtab.directory', icon: 'students' },
        { id: 'results', labelKey: 'stu.vtab.results', icon: 'trending-up' },
        { id: 'evaluation', labelKey: 'stu.vtab.evaluation', icon: 'sparkles' },
      ],
      panels: { directory, results: resultsPanel(rows), evaluation: evaluationPanel(rows) },
    })}
    ${rows.map(preview).join('')}
    ${stuAddDrawer()}
    ${stuEditDrawer()}
  `;
}

/* Spec 037 — cross-student Results board (students.html#view=results). Per student:
 * name + family + level + AUTHORED certificate-count literal + lifecycle status chip
 * + a deep-link to the existing single-student Results tab. NO computed
 * score/rank/GPA/percentage/average — no derivation, no cross-student aggregation. */
function resultRow(s) {
  const fam = familyOf(s.familyId);
  const certs = (s.results && s.results.certificates) ? s.results.certificates.length : 0;
  const meta = `${fam ? esc(t(fam.guardian.nameKey)) : ''} · ${esc(t(s.levelKey))}`;
  return `<div class="brd-row">
    <div class="brd-main flex items-center gap-2.5">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div class="min-w-0">
        <div class="font-bold text-[13px] text-ink truncate">${t(s.nameKey)}</div>
        <div class="text-[12px] truncate" style="color:var(--c-ink-3)">${meta}</div>
      </div>
    </div>
    <span class="text-[12px] tabular" style="color:var(--c-ink-2)">${num(certs)} ${esc(t('stu.resBoard.certs'))}</span>
    ${familyStatusChip(s.statusId)}
    <a href="${studentHref()}#view=results" class="btn btn-secondary btn-sm brd-link">${icon('trending-up', 'ico ico-sm')}<span>${t('stu.resBoard.view')}</span></a>
  </div>`;
}
function resultsPanel(rows) {
  const body = rows.length ? rows.map(resultRow).join('') : `<div class="empty-row">${t('stu.resBoard.none')}</div>`;
  return `<section class="mt-4">
    <div class="mb-4"><h2 class="section-title">${esc(t('stu.resBoard.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('stu.resBoard.sub'))}</p></div>
    <div class="brd-rows">${body}</div>
  </section>`;
}

/* Spec 037 — cross-student Evaluation board (students.html#view=evaluation). Per
 * student: name + level + AUTHORED categorical approved/pending chip + month + a
 * deep-link to the existing single-student Evaluation tab. NO computed rubric
 * total/score/rank/rating math. */
function evalRow(s) {
  const ev = s.evaluation;
  const statusChip = ev && ev.approved
    ? chip({ labelKey: 'eval.approved', tone: 'completed', icon: 'check-circle' })
    : chip({ labelKey: 'eval.pending', tone: 'amber', icon: 'clock' });
  const meta = `${esc(t(s.levelKey))}${ev ? ' · ' + esc(t(ev.monthKey)) : ''}`;
  return `<div class="brd-row">
    <div class="brd-main flex items-center gap-2.5">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div class="min-w-0">
        <div class="font-bold text-[13px] text-ink truncate">${t(s.nameKey)}</div>
        <div class="text-[12px] truncate" style="color:var(--c-ink-3)">${meta}</div>
      </div>
    </div>
    ${statusChip}
    <a href="${studentHref()}#view=evaluation" class="btn btn-secondary btn-sm brd-link">${icon('sparkles', 'ico ico-sm')}<span>${t('stu.evalBoard.view')}</span></a>
  </div>`;
}
function evaluationPanel(rows) {
  const body = rows.length ? rows.map(evalRow).join('') : `<div class="empty-row">${t('stu.evalBoard.none')}</div>`;
  return `<section class="mt-4">
    <div class="mb-4"><h2 class="section-title">${esc(t('stu.evalBoard.title'))}</h2>
      <p class="text-[12.5px] mt-0.5" style="color:var(--c-ink-3)">${esc(t('stu.evalBoard.sub'))}</p></div>
    <div class="brd-rows">${body}</div>
  </section>`;
}
