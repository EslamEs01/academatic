/* Curricula page — course overview card grid. No course builder, no CRUD. */
import { CURRICULA, COURSE_STATUS } from '../fixtures/curricula.js';
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { medallion, chip, button } from '../components/ui.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const LEVELS = ['foundation', 'l1', 'l2', 'l3', 'advanced'];

function card(c) {
  const st = COURSE_STATUS[c.statusId];
  const lvl = c.levelKey.split('.').pop();
  return `<div class="dir-card is-hoverable" ${facetAttrs({ subject: c.subject, level: lvl, status: c.statusId, search: t(c.titleKey) })}>
    <div class="flex items-start justify-between">${medallion({ icon: c.icon, tone: c.accent, variant: 'soft' })}${chip({ labelKey: st.labelKey, tone: st.tone })}</div>
    <div><h3 class="font-bold text-ink text-[14.5px]">${t(c.titleKey)}</h3>
      <p class="text-[12.5px]" style="color:var(--c-ink-3)">${t(c.subjectKey)} · ${t(c.levelKey)}</p></div>
    <div class="flex items-center gap-4 text-[12px]" style="color:var(--c-ink-3)">
      <span><b class="text-ink tabular">${num(c.enrolled)}</b> ${t('cur.counts.enrolled')}</span>
      <span><b class="text-ink tabular">${num(c.sessions)}</b> ${t('cur.counts.sessions')}</span></div>
    <button type="button" class="btn btn-secondary btn-sm w-full" data-drawer="${c.id}">${icon('curricula', 'ico ico-sm')}<span>${t('dir.viewDetails')}</span></button>
  </div>`;
}

function preview(c) {
  const st = COURSE_STATUS[c.statusId];
  const levels = c.levels.map((l) => `<div class="sheet-row"><span class="k">${t(l.labelKey)}</span><span class="v">${icon('check-circle', 'ico ico-sm')}</span></div>`).join('');
  const body = `
    <div class="flex items-center gap-3 mb-4">${medallion({ icon: c.icon, tone: c.accent, variant: 'soft' })}
      <div><div class="font-bold text-ink">${t(c.titleKey)}</div>${chip({ labelKey: st.labelKey, tone: st.tone })}</div></div>
    ${sheetRow(t('cur.fSubject'), t(c.subjectKey))}
    ${sheetRow(t('cur.counts.enrolled'), `<span class="tabular">${num(c.enrolled)}</span>`)}
    ${sheetRow(t('cur.counts.sessions'), `<span class="tabular">${num(c.sessions)}</span>`)}
    <div class="text-[12px] font-bold mt-4 mb-1" style="color:var(--c-ink-3)">${t('cur.levels')}</div>
    ${levels}`;
  return previewTemplate(c.id, { title: t('cur.detailsTitle'), headIcon: c.icon, tone: c.accent, bodyHTML: body });
}

export function renderCurricula() {
  const rows = CURRICULA.rows;
  const active = rows.filter((r) => r.statusId === 'active').length;
  const summary = summaryCards([
    { icon: 'curricula', tone: 'primary', value: num(rows.length), labelKey: 'cur.sum.total' },
    { icon: 'check-circle', tone: 'success', value: num(active), labelKey: 'cur.sum.active' },
    { icon: 'graduation-cap', tone: 'sky', value: num(LEVELS.length), labelKey: 'cur.sum.levels' },
  ], { cols: 'grid-cols-1 sm:grid-cols-3' });
  const filters = filterBar({
    targetId: 'curricula-grid', searchKey: 'cur.searchPh',
    selects: [
      { name: 'subject', labelKey: 'cur.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
      { name: 'level', labelKey: 'cur.fLevel', options: [{ value: 'all', labelKey: 'filter.all' }, ...LEVELS.map((v) => ({ value: v, labelKey: 'data.crs.lvl.' + v }))] },
      { name: 'status', labelKey: 'cur.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(COURSE_STATUS).map((v) => ({ value: v, labelKey: COURSE_STATUS[v].labelKey }))] },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'cur.title', subKey: 'cur.sub', primary: button({ labelKey: 'cur.add', variant: 'primary', icon: 'plus', attrs: 'data-demo-action' }), summaryHTML: summary })}
    ${filters}
    ${cardGrid(rows.map(card), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'curricula-grid' })}
    ${noResults()}
    ${rows.map(preview).join('')}
  `;
}
