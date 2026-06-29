/* Sessions module: header + integrated filter/action toolbar + modern table.
 * Row actions use a kebab menu (never a row of colored pill buttons). */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, button, avatar } from './ui.js';
import { statusChip } from './status-chip.js';

function selectBtn(labelKey, leadIcon) {
  const lead = leadIcon ? icon(leadIcon, 'ico ico-sm') + ' ' : '';
  return `<button type="button" class="select-btn gap-2">
    <span class="inline-flex items-center gap-1.5">${lead}<span>${t(labelKey)}</span></span>
    ${icon('chevron-down', 'chev')}
  </button>`;
}

function toolbar() {
  return `<div class="flex flex-wrap items-center gap-2.5 mb-4">
    <div class="flex items-center gap-2.5">
      ${button({ labelKey: 'sessions.newSession', variant: 'primary', icon: 'plus', size: 'sm', attrs: 'data-action="new-session"' })}
      <button type="button" class="chip tone-upcoming" data-action="clear-filter" style="height:32px">
        <span>${t('sessions.filterActive')}</span> ${icon('x', 'ico')}
      </button>
    </div>
    <div class="flex flex-wrap items-center gap-2.5 ms-auto">
      <div class="input-wrap" style="min-width:190px">
        ${icon('search', 'lead-ico')}
        <input class="input" type="search" placeholder="${esc(t('sessions.searchPlaceholder'))}" aria-label="${esc(t('sessions.searchPlaceholder'))}" />
      </div>
      ${selectBtn('sessions.subjectLabel')}
      ${selectBtn('sessions.dateValue', 'calendar')}
      ${selectBtn('sessions.anytime', 'clock')}
      ${button({ labelKey: 'sessions.apply', variant: 'dark', size: 'sm', attrs: 'data-action="apply-filter"' })}
    </div>
  </div>`;
}

function row(s) {
  const students = s.present == null
    ? `<span class="tabular" style="color:var(--c-ink-3)">—</span>`
    : `<span class="tabular">${num(s.present)} / ${num(s.capacity)}</span>`;
  return `<tr>
    <td>
      <div class="font-bold tabular text-ink">${esc(s.time)}</div>
      <div class="micro" style="color:var(--c-ink-3)">${t('sessions.duration', { n: num(s.durationMin) })}</div>
    </td>
    <td>
      <div class="font-bold text-ink">${t(s.titleKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(s.levelKey)}</div>
    </td>
    <td>
      <div class="flex items-center gap-2.5">
        ${avatar({ nameKey: s.trainer.nameKey, accent: s.trainer.accent, size: 'sm' })}
        <span class="font-medium text-[13px] text-ink">${t(s.trainer.nameKey)}</span>
      </div>
    </td>
    <td><span class="text-[13px]" style="color:var(--c-ink-2)">${t(s.roomKey)}</span></td>
    <td>${students}</td>
    <td>${statusChip(s.statusId)}</td>
    <td class="text-end">
      <button type="button" class="icon-btn" data-row-menu="${esc(s.id)}" aria-label="${esc(t('sessions.rowMenu'))}" aria-haspopup="menu">
        ${icon('ellipsis', 'ico')}
      </button>
    </td>
  </tr>`;
}

function pagination(data) {
  const shown = Math.min(data.pageSize, data.rows.length);
  return `<div class="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
    <span class="text-[12.5px]" style="color:var(--c-ink-3)">
      ${t('sessions.pagination', { shown: num(shown), total: num(data.total) })}
    </span>
    <div class="flex items-center gap-1.5" role="navigation" aria-label="pagination">
      <button type="button" class="pager">${num(3)}</button>
      <button type="button" class="pager">${num(2)}</button>
      <button type="button" class="pager is-current" aria-current="page">${num(1)}</button>
    </div>
  </div>`;
}

export function sessionsModule(data) {
  return `<section class="card overflow-hidden">
    <div class="flex items-center justify-between gap-3 p-4 pb-3">
      <div class="flex items-center gap-3">
        ${medallion({ icon: 'sessions', tone: 'primary', variant: 'soft', size: 'sm' })}
        <div>
          <h2 class="text-[15.5px] font-bold text-ink">${t('sessions.title')}</h2>
          <p class="text-[12px]" style="color:var(--c-ink-3)">${t('sessions.meta', { count: num(data.total), updated: t(data.lastUpdatedKey) })}</p>
        </div>
      </div>
    </div>
    <div class="px-4">${toolbar()}</div>
    <div class="overflow-x-auto">
      <table class="tbl">
        <thead><tr>
          <th>${t('sessions.col.time')}</th>
          <th>${t('sessions.col.session')}</th>
          <th>${t('sessions.col.trainer')}</th>
          <th>${t('sessions.col.room')}</th>
          <th>${t('sessions.col.students')}</th>
          <th>${t('sessions.col.status')}</th>
          <th class="text-end"><span class="sr-only">${t('sessions.rowMenu')}</span></th>
        </tr></thead>
        <tbody>${data.rows.map(row).join('')}</tbody>
      </table>
    </div>
    <div class="border-t" style="border-color:var(--c-line)">${pagination(data)}</div>
  </section>`;
}
