/* Spec 034 — Tasks (Control Center). A DISPLAY-ONLY team task board grounded in
 * the legacy `management-tickets` surface (KPI row + status columns + a per-staff
 * summary table). The legacy board/create form was JS-driven and not captured, so
 * the create-task + add-section forms are authored with safe fields derived from the
 * captured columns (name/status/priority/assignee/due/section) — NO money field.
 *
 * Everything renders from the authored control-center fixtures. The board is
 * display-only: columns carry an honest tally of authored rows, priority/status are
 * authored labels (NOT computed), and there is NO drag, NO move engine, NO chart, and
 * NO computed metric — the staff "Average" is an authored literal (good/fair). The two
 * write paths (New task · Add section) open form drawers whose Save final is an honest
 * backendRequired gate; they never persist, never move a card, never fake a success. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHeader, summaryCards } from '../components/page-header.js';
import { button, chip } from '../components/ui.js';
import { formDrawer } from '../components/preview-drawer.js';
import { field, optsFrom } from '../components/form-field.js';
import {
  TASK_KPIS, TASKS, TASK_STATUSES, TASK_STATUS_ORDER,
  TASK_PRIORITIES, TASK_SECTIONS, STAFF_TASK_ROWS,
} from '../fixtures/control-center.js';

/* the two write triggers — open a form drawer (the Save final inside is the gate) */
const newTaskBtn = () =>
  button({ labelKey: 'task.add', variant: 'primary', size: 'sm', icon: 'plus', attrs: 'data-drawer="task-new"' });
const addSectionBtn = () =>
  button({ labelKey: 'task.addSection', variant: 'secondary', size: 'sm', icon: 'layers', attrs: 'data-drawer="task-section"' });

/* authored priority → labeled chip (icon + text) */
function priorityChip(id) {
  const p = TASK_PRIORITIES[id] || TASK_PRIORITIES.low;
  return chip({ labelKey: p.labelKey, tone: p.tone, icon: p.icon });
}

/* one display-only task card: title + priority chip + due chip + assignee line.
 * NO drag handle, NO data attribute that implies a working move. */
function taskCard(task) {
  return `<article class="card p-3">
    <h4 class="text-[13px] font-bold text-ink" style="line-height:1.35">${esc(t(task.titleKey))}</h4>
    <div class="mt-2 flex flex-wrap items-center gap-1.5">
      ${priorityChip(task.priorityId)}
      ${chip({ label: `${t('task.board.due')}: ${t(task.dueKey)}`, tone: 'neutral', icon: 'calendar' })}
    </div>
    <div class="mt-2 inline-flex items-center gap-1.5 text-[12px]" style="color:var(--c-ink-3)">
      ${icon('user', 'ico ico-sm')}
      <span><span class="font-medium">${esc(t('task.board.assignee'))}:</span> ${esc(t(task.assigneeKey))}</span>
    </div>
  </article>`;
}

/* one board column for a status: header (label + honest tally) + its task cards */
function boardColumn(statusId) {
  const s = TASK_STATUSES[statusId] || {};
  const items = TASKS.filter((x) => x.statusId === statusId);
  const cards = items.length
    ? items.map(taskCard).join('')
    : `<p class="text-[12px]" style="color:var(--c-ink-3)">${esc(t('task.empty.msg'))}</p>`;
  return `<div class="cc-board-col">
    <div class="flex items-center justify-between gap-2">
      <span class="inline-flex items-center gap-1.5 text-[13px] font-bold text-ink">
        ${icon(s.icon || 'clock', 'ico ico-sm')}<span>${esc(t(s.labelKey))}</span>
      </span>
      <span class="badge badge-count tabular">${num(items.length)}</span>
    </div>
    ${cards}
  </div>`;
}

/* the display-only status board (one column per status, in canonical order) */
function board() {
  return `<section class="mt-6">
    <div class="mb-3"><h2 class="section-title">${esc(t('task.board.title'))}</h2></div>
    <div class="cc-board">${TASK_STATUS_ORDER.map(boardColumn).join('')}</div>
  </section>`;
}

/* per-staff summary table — authored counts; "Average" is an authored literal, NOT computed */
function staffTable() {
  const head = `<tr>
    <th>${t('task.staffTable.name')}</th>
    <th>${t('task.staffTable.total')}</th>
    <th>${t('task.staffTable.pending')}</th>
    <th>${t('task.staffTable.overdue')}</th>
    <th>${t('task.staffTable.completed')}</th>
    <th>${t('task.staffTable.average')}</th>
  </tr>`;
  const rows = STAFF_TASK_ROWS.map((r) => `<tr data-row>
    <td><span class="font-bold text-ink">${esc(t(r.nameKey))}</span></td>
    <td class="tabular">${num(r.total)}</td>
    <td class="tabular">${num(r.pending)}</td>
    <td class="tabular">${num(r.overdue)}</td>
    <td class="tabular">${num(r.completed)}</td>
    <td>${esc(t(r.average))}</td>
  </tr>`).join('');
  return `<section class="mt-8">
    <div class="mb-3"><h2 class="section-title">${esc(t('task.staffTable.title'))}</h2></div>
    <section class="card overflow-hidden"><div class="overflow-x-auto" tabindex="0" role="region" aria-label="${esc(t('task.staffTable.title'))}"><table class="tbl">
      <thead>${head}</thead><tbody id="task-staff-rows">${rows}</tbody>
    </table></div></section>
  </section>`;
}

/* Create/Edit-task form drawer — INERT fields + ONE backendRequired Save final.
 * Assignee/status/priority/section selects are derived from the authored fixtures. */
function taskFormDrawer() {
  const assigneeOpts = STAFF_TASK_ROWS.map((r, i) => ({ value: r.nameKey, labelKey: r.nameKey, selected: i === 0 }));
  const statusOpts = TASK_STATUS_ORDER.map((id, i) => ({ value: id, labelKey: TASK_STATUSES[id].labelKey, selected: i === 0 }));
  const priorityOpts = Object.keys(TASK_PRIORITIES).map((id, i) => ({ value: id, labelKey: TASK_PRIORITIES[id].labelKey, selected: i === 0 }));
  const fields = [
    field({ labelKey: 'task.form.name', name: 'task-name', full: true }),
    field({ labelKey: 'task.form.desc', name: 'task-desc', type: 'textarea', full: true }),
    field({ labelKey: 'task.form.assignee', name: 'task-assignee', type: 'select', options: assigneeOpts }),
    field({ labelKey: 'task.form.status', name: 'task-status', type: 'select', options: statusOpts }),
    field({ labelKey: 'task.form.priority', name: 'task-priority', type: 'select', options: priorityOpts }),
    field({ labelKey: 'task.form.due', name: 'task-due' }),
    field({ labelKey: 'task.form.section', name: 'task-section', type: 'select', options: optsFrom(TASK_SECTIONS, 'task.sec') }),
  ].join('');
  return formDrawer('task-new', {
    titleKey: 'task.form.title', headIcon: 'tasks', fields,
    ctaKey: 'task.form.save', reasonKey: 'task.reason.backend',
  });
}

/* Add-section form drawer — one field + ONE backendRequired Save final */
function sectionFormDrawer() {
  return formDrawer('task-section', {
    titleKey: 'task.sectionForm.title', headIcon: 'layers',
    fields: field({ labelKey: 'task.sectionForm.name', name: 'task-section-name', full: true }),
    ctaKey: 'task.sectionForm.save', reasonKey: 'task.reason.backend',
  });
}

export function renderTasks() {
  return `
    ${pageHeader({
      titleKey: 'task.title',
      subKey: 'task.sub',
      secondary: addSectionBtn(),
      primary: newTaskBtn(),
      summaryHTML: summaryCards(TASK_KPIS),
    })}
    ${board()}
    ${staffTable()}
    ${taskFormDrawer()}
    ${sectionFormDrawer()}
  `;
}
