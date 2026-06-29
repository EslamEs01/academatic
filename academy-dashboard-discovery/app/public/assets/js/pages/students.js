/* Students page — admin directory (table). NOT a student dashboard/portal. */
import { STUDENTS, STUDENT_STATUS } from '../fixtures/students.js';
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { dataTable, tableFooter } from '../components/data-table.js';
import { avatar, chip, button } from '../components/ui.js';
import { progressBar } from '../components/sparkline.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const progressTone = (p) => (p >= 70 ? 'success' : p >= 40 ? 'sky' : 'amber');

function row(s) {
  const st = STUDENT_STATUS[s.statusId];
  const search = `${t(s.nameKey)} ${t(s.levelKey)}`;
  return `<tr ${facetAttrs({ status: s.statusId, subject: s.subject, search })}>
    <td><div class="flex items-center gap-2.5">${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <span class="font-bold text-[13px] text-ink">${t(s.nameKey)}</span></div></td>
    <td>${chip({ labelKey: st.labelKey, tone: st.tone })}</td>
    <td><span class="text-[13px]" style="color:var(--c-ink-2)">${t(s.levelKey)}</span></td>
    <td><div class="flex items-center gap-2" style="min-width:120px">${progressBar(s.progress, progressTone(s.progress))}
      <span class="text-[12px] tabular" style="color:var(--c-ink-3)">${num(s.progress)}%</span></div></td>
    <td><span class="tabular text-[13px]">${num(s.enrolled)}</span></td>
    <td class="text-end"><button type="button" class="icon-btn" data-drawer="${s.id}" aria-label="${t('dir.viewProfile')}">${icon('chevronEnd', 'ico')}</button></td>
  </tr>`;
}

function preview(s) {
  const st = STUDENT_STATUS[s.statusId];
  const body = `
    <div class="flex items-center gap-3 mb-4">${avatar({ nameKey: s.nameKey, accent: s.accent })}
      <div><div class="font-bold text-ink">${t(s.nameKey)}</div>${chip({ labelKey: st.labelKey, tone: st.tone })}</div></div>
    ${sheetRow(t('stu.col.level'), t(s.levelKey))}
    ${sheetRow(t('stu.col.progress'), `<span class="tabular">${num(s.progress)}%</span>`)}
    ${sheetRow(t('stu.courses'), `<span class="tabular">${num(s.enrolled)}</span>`)}
    ${sheetRow(t('stu.guardian'), t('data.stud.' + s.guardian))}
    ${sheetRow(t('stu.contact'), `<span dir="ltr">${t('data.stud.contactA')}</span>`)}`;
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
      { name: 'status', labelKey: 'stu.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(STUDENT_STATUS).map((v) => ({ value: v, labelKey: STUDENT_STATUS[v].labelKey }))] },
      { name: 'subject', labelKey: 'stu.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
    ],
  });
  const head = [
    { label: t('stu.col.name') }, { label: t('stu.col.status') }, { label: t('stu.col.level') },
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
