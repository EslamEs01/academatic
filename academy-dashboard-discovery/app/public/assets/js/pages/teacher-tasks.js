/* Spec 025 — TEACHER TASKS (the teacher's prep / review board). A display-only board
 * drawn from TEACHER_PREVIEW.tasks (tk1/tk2/tk3): each card carries the authored
 * title + context line + an authored due chip + an authored priority/status tag
 * (NO computed ordering, NO ticket pie, NO "average"). A monthly-plan preview row
 * (T11) sits below. The only capability — mark complete / assign a task — is an
 * honest backendRequired gate (gateNote), never a fake toggle. Zero body anchors.
 * Display-only; NO engine; and — the standing teacher hard rule — ZERO
 * figure-bearing or flagged vocabulary anywhere (copy AND comments). */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHead, secHead, gateNote } from '../components/portal-page.js';
import { medallion } from '../components/ui.js';
import { TEACHER_PREVIEW } from '../fixtures/portal.js';

/* authored priority/status label per task id (worded signals — no numbers, no order math) */
const STATUS_BY_TASK = {
  tk1: 'prt.tch.pg.tasks.statusPrep',
  tk2: 'prt.tch.pg.tasks.statusReview',
  tk3: 'prt.tch.pg.tasks.statusOpen',
};

function taskCard(tk) {
  const statusKey = STATUS_BY_TASK[tk.id] || 'prt.tch.pg.tasks.statusOpen';
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: tk.icon, tone: 'teal' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(tk.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(tk.subKey))}</div>
      </div>
      <span class="pt-tag">${esc(t(statusKey))}</span>
    </div>
    <div class="pt-tags">
      <span class="pt-tag is-accent">${icon('calendar', 'ico ico-sm')}${esc(t(tk.dueKey))}</span>
    </div>
  </div>`;
}

function planRow() {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'reports', tone: 'teal' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t('prt.tch.pg.tasks.planTitle'))}</div>
        <div class="pt-card-sub">${esc(t('prt.tch.pg.tasks.planDesc'))}</div>
      </div>
    </div>
  </div>`;
}

export function renderTeacherTasks() {
  return `
    ${pageHead('prt.tch.pg.tasks.title', 'prt.tch.pg.tasks.sub')}

    <section class="pt-section">
      ${secHead('tasks', 'prt.tch.pg.tasks.title', 'prt.tch.pg.tasks.boardHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.tasks.map(taskCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.tch.pg.tasks.planTitle', 'prt.tch.pg.tasks.boardHint')}
      ${planRow()}
    </section>

    ${gateNote('prt.tch.pg.tasks.completeGate')}

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
