/* Students page — admin directory (table), ENRICHED for Spec 004 with the real
 * family relationship: a family link/chip per row (→ family.html), a family
 * filter facet, and a "view profile" link to the student academic profile
 * (→ student.html). Quick-peek drawer kept. NOT a student dashboard/portal. */
import { STUDENTS } from '../fixtures/students.js';
import { FAMILIES, familyOf } from '../fixtures/families.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { dataTable, tableFooter } from '../components/data-table.js';
import { avatar, button } from '../components/ui.js';
import { progressBar } from '../components/sparkline.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';
import { FAMILY_STATUS, familyStatusChip } from '../components/family-status.js';

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
    </div></td>
  </tr>`;
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
  return `
    ${pageHeader({ titleKey: 'stu.title', subKey: 'stu.sub', primary: button({ labelKey: 'stu.add', variant: 'primary', icon: 'plus', attrs: 'data-demo-action' }), summaryHTML: summary })}
    ${filters}
    ${table}
    ${noResults()}
    ${rows.map(preview).join('')}
  `;
}
