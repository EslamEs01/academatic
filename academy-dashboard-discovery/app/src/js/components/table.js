/* Sessions module: header + integrated filter/action toolbar + modern table.
 * Row actions use a kebab menu (never a row of colored pill buttons). */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, button, avatar } from './ui.js';
import { statusChip } from './status-chip.js';
import { formDrawer } from './preview-drawer.js';
import { field, optsFrom } from './form-field.js';
import { DURATION_OPTS } from '../fixtures/form-options.js';
import { COURSES } from '../fixtures/courses.js';
import { TEACHERS } from '../fixtures/teachers.js';

/* Spec 032 (FC-01/02/03) — the ONE shared "New session" form drawer. Baked once
 * per host page (sessions.html + dashboard.html); every New-session trigger
 * opens it via data-drawer="sess-new". Fields are INERT (see the must-omit
 * contract) — options come from existing fixtures; the only final is the
 * formDrawer backendRequired Save gate. */
export function sessionFormDrawer() {
  const courseOpts = COURSES.rows.map((c, i) => ({ value: c.id, labelKey: c.titleKey, selected: i === 0 }));
  const teacherOpts = TEACHERS.rows.map((x, i) => ({ value: x.id, labelKey: x.nameKey, selected: i === 0 }));
  const fields = [
    field({ labelKey: 'sess.form.course', name: 'sessNew-course', type: 'select', options: courseOpts, full: true }),
    field({ labelKey: 'sess.form.teacher', name: 'sessNew-teacher', type: 'select', options: teacherOpts }),
    field({ labelKey: 'sess.form.date', name: 'sessNew-date', placeholderKey: 'sess.form.datePh' }),
    field({ labelKey: 'sess.form.time', name: 'sessNew-time', placeholderKey: 'sess.form.timePh' }),
    field({ labelKey: 'sess.form.duration', name: 'sessNew-duration', type: 'select', options: DURATION_OPTS }),
    field({ labelKey: 'sess.form.fromCredit', name: 'sessNew-fromCredit', type: 'select', options: optsFrom(['package', 'extra', 'trial'], 'sess.form.credit') }),
    field({ labelKey: 'sess.fStatus', name: 'sessNew-status', type: 'select', options: optsFrom(['upcoming', 'live', 'completed', 'cancelled'], 'status') }),
  ].join('');
  return formDrawer('sess-new', { titleKey: 'sess.newSession', headIcon: 'plus', fields });
}

/* Spec 026 (DU-20) — the dashboard "Today's Sessions" toolbar is a COMPACT overview, not the
 * full sessions manager. The former Apply/Clear/select controls only imitated a filter (no
 * data-filter-form wiring) → removed. New session opens the shared sess-new form drawer
 * (Spec 032 FC-02: fields + backendRequired Save gate); the real, working filter lives on
 * sessions.html, reached by a real "view all" link. */
function toolbar() {
  const sessHref = getLang() === 'en' ? 'sessions.en.html' : 'sessions.html';
  return `<div class="flex flex-wrap items-center gap-2.5 mb-4">
    <div class="flex items-center gap-2.5">
      ${button({ labelKey: 'sessions.newSession', variant: 'primary', icon: 'plus', size: 'sm', attrs: 'data-drawer="sess-new"' })}
    </div>
    <div class="flex flex-wrap items-center gap-2.5 ms-auto">
      <a href="${esc(sessHref)}" class="btn btn-secondary btn-sm">${icon('sessions', 'ico ico-sm')}<span>${t('dash.viewAllSessions')}</span></a>
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
