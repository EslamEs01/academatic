/* Sessions page — premium operations view. Reuses Spec 001 table/chips/tiles. */
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { facetAttrs } from '../dom.js';
import { pageHeader } from '../components/page-header.js';
import { filterBar } from '../components/filter-bar.js';
import { dataTable, tableFooter } from '../components/data-table.js';
import { statusChip } from '../components/status-chip.js';
import { statusTile } from '../components/status-tile.js';
import { previewTemplate, sheetRow } from '../components/preview-drawer.js';
import { noResults } from '../components/states.js';
import { button, avatar } from '../components/ui.js';

const SUBJECTS = ['math', 'arabic', 'programming', 'physics', 'english', 'science'];
const STATUSES = ['live', 'upcoming', 'completed', 'cancelled'];

function summary(rows) {
  const counts = { cancelled: 0, upcoming: 0, live: 0, completed: 0 };
  rows.forEach((s) => { counts[s.statusId] = (counts[s.statusId] || 0) + 1; });
  return `<div class="grid-status">${['cancelled', 'upcoming', 'live', 'completed']
    .map((id) => statusTile({ statusId: id, count: counts[id] })).join('')}</div>`;
}

function row(s) {
  const search = `${t(s.titleKey)} ${t(s.trainer.nameKey)} ${t(s.roomKey)} ${t(s.subjectKey)}`;
  const students = s.present == null
    ? `<span class="tabular" style="color:var(--c-ink-3)">—</span>`
    : `<span class="tabular">${num(s.present)} / ${num(s.capacity)}</span>`;
  return `<tr ${facetAttrs({ status: s.statusId, subject: s.subject, search })}>
    <td><div class="font-bold tabular text-ink">${s.time}</div>
      <div class="micro" style="color:var(--c-ink-3)">${t('sessions.duration', { n: num(s.durationMin) })}</div></td>
    <td><div class="font-bold text-ink">${t(s.titleKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(s.levelKey)}</div></td>
    <td><div class="flex items-center gap-2.5">${avatar({ nameKey: s.trainer.nameKey, accent: s.trainer.accent, size: 'sm' })}
      <span class="font-medium text-[13px] text-ink">${t(s.trainer.nameKey)}</span></div></td>
    <td><span class="text-[13px]" style="color:var(--c-ink-2)">${t(s.roomKey)}</span></td>
    <td>${students}</td>
    <td>${statusChip(s.statusId)}</td>
    <td class="text-end"><button type="button" class="icon-btn" data-row-menu="${s.id}" aria-label="${t('sessions.rowMenu')}" aria-haspopup="menu">${icon('ellipsis', 'ico')}</button></td>
  </tr>`;
}

function preview(s) {
  const students = s.present == null ? '—' : `${num(s.present)} / ${num(s.capacity)}`;
  const body = `
    <div class="mb-3">${statusChip(s.statusId)}</div>
    ${sheetRow(t('sessions.col.time'), `<span class="tabular">${s.time} · ${t('sessions.duration', { n: num(s.durationMin) })}</span>`)}
    ${sheetRow(t('sessions.col.trainer'), t(s.trainer.nameKey))}
    ${sheetRow(t('sess.colSubject'), t(s.subjectKey))}
    ${sheetRow(t('sessions.col.room'), t(s.roomKey))}
    ${sheetRow(t('sessions.col.students'), `<span class="tabular">${students}</span>`)}
    <p class="text-[12.5px] mt-4" style="color:var(--c-ink-3)">${t('sess.note')}</p>`;
  return previewTemplate(s.id, { title: t(s.titleKey), headIcon: 'sessions', tone: 'primary', bodyHTML: body });
}

export function renderSessions() {
  const data = SESSIONS_FULL;
  const head = [
    { label: t('sessions.col.time') }, { label: t('sessions.col.session') }, { label: t('sessions.col.trainer') },
    { label: t('sessions.col.room') }, { label: t('sessions.col.students') }, { label: t('sessions.col.status') },
    { label: `<span class="sr-only">${t('sessions.rowMenu')}</span>`, end: true },
  ];
  const filters = filterBar({
    targetId: 'sessions-table', searchKey: 'sess.searchPh',
    selects: [
      { name: 'status', labelKey: 'sess.fStatus', options: [{ value: 'all', labelKey: 'filter.all' }, ...STATUSES.map((v) => ({ value: v, labelKey: 'status.' + v }))] },
      { name: 'subject', labelKey: 'sess.fSubject', options: [{ value: 'all', labelKey: 'filter.all' }, ...SUBJECTS.map((v) => ({ value: v, labelKey: 'data.subj.' + v }))] },
    ],
  });
  const table = dataTable({
    id: 'sessions-table', head, rows: data.rows.map(row),
    footerHTML: tableFooter({ shown: data.rows.length, total: data.total }),
  });
  return `
    ${pageHeader({ titleKey: 'sess.title', subKey: 'sess.sub', primary: button({ labelKey: 'sess.newSession', variant: 'primary', icon: 'plus', attrs: 'data-demo-action' }), summaryHTML: summary(data.rows) })}
    ${filters}
    ${table}
    ${noResults()}
    ${data.rows.map(preview).join('')}
  `;
}
