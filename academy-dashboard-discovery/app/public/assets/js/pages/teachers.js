/* Teachers page — admin directory (card grid). NOT a teacher dashboard/portal. */
import { TEACHERS, TEACHER_AVAIL } from '../fixtures/teachers.js';
import { t, num } from '../i18n.js';
import { facetAttrs } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { cardGrid } from '../components/card-grid.js';
import { directoryCard, statMini } from '../components/directory-card.js';
import { avatar, chip } from '../components/ui.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];

function card(tr) {
  const av = TEACHER_AVAIL[tr.avail];
  const tags = tr.subjectsKeys.map((k) => `<span class="chip tone-neutral">${t(k)}</span>`).join('');
  const stats = statMini(`${num(tr.util)}%`, 'trn.perf.utilization') + statMini(num(tr.sessions), 'trn.perf.sessions') + statMini(tr.rating.toFixed(1), 'trn.perf.rating');
  const search = `${t(tr.nameKey)} ${tr.subjectsKeys.map((k) => t(k)).join(' ')}`;
  return directoryCard({
    rootAttrs: facetAttrs({ availability: tr.avail, subject: tr.primary, search }),
    avatarHTML: avatar({ nameKey: tr.nameKey, accent: tr.accent }),
    name: t(tr.nameKey), subtitle: tr.subjectsKeys.map((k) => t(k)).join(' · '),
    statusHTML: chip({ labelKey: av.labelKey, tone: av.tone }),
    tagsHTML: tags, statsHTML: stats, drawerId: tr.id,
  });
}

function preview(tr) {
  const av = TEACHER_AVAIL[tr.avail];
  const body = `
    <div class="flex items-center gap-3 mb-4">${avatar({ nameKey: tr.nameKey, accent: tr.accent })}
      <div><div class="font-bold text-ink">${t(tr.nameKey)}</div>${chip({ labelKey: av.labelKey, tone: av.tone })}</div></div>
    <p class="text-[13px] mb-4" style="color:var(--c-ink-2)">${t(tr.bioKey)}</p>
    ${sheetRow(t('trn.subjects'), tr.subjectsKeys.map((k) => t(k)).join(' · '))}
    ${sheetRow(t('trn.perf.utilization'), `<span class="tabular">${num(tr.util)}%</span>`)}
    ${sheetRow(t('trn.perf.sessions'), `<span class="tabular">${num(tr.sessions)}</span>`)}
    ${sheetRow(t('trn.perf.hours'), `<span class="tabular">${num(tr.hours)}</span>`)}
    ${sheetRow(t('trn.perf.rating'), `<span class="tabular">${tr.rating.toFixed(1)}</span>`)}`;
  return previewTemplate(tr.id, { title: t('trn.detailsTitle'), headIcon: 'trainers', tone: 'primary', bodyHTML: body });
}

export function renderTeachers() {
  const rows = TEACHERS.rows;
  const available = rows.filter((r) => r.avail === 'available').length;
  const avgUtil = Math.round(rows.reduce((a, r) => a + r.util, 0) / rows.length);
  const summary = summaryCards([
    { icon: 'trainers', tone: 'primary', value: num(rows.length), labelKey: 'trn.sum.total' },
    { icon: 'check-circle', tone: 'success', value: num(available), labelKey: 'trn.sum.available' },
    { icon: 'trending-up', tone: 'teal', value: `${num(avgUtil)}%`, labelKey: 'trn.sum.util' },
  ], { cols: 'grid-cols-1 sm:grid-cols-3' });
  const filters = filterBar({
    targetId: 'teachers-grid', searchKey: 'trn.searchPh',
    selects: [
      { name: 'availability', labelKey: 'trn.fAvail', options: [{ value: 'all', labelKey: 'filter.all' }, ...Object.keys(TEACHER_AVAIL).map((v) => ({ value: v, labelKey: TEACHER_AVAIL[v].labelKey }))] },
      { name: 'subject', labelKey: 'trn.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
    ],
  });
  return `
    ${pageHeader({ titleKey: 'trn.title', subKey: 'trn.sub', summaryHTML: summary })}
    ${filters}
    ${cardGrid(rows.map(card), { cols: 'sm:grid-cols-2 xl:grid-cols-3', id: 'teachers-grid' })}
    ${noResults()}
    ${rows.map(preview).join('')}
  `;
}
