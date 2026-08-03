/* Spec 025 — TEACHER SCHEDULE (sara). An internal teaching-schedule page: today's
 * classes as a LIVING day rail (time · roster count · room/subject · status stop) +
 * a next-class card with a "what to prepare" hint + the week as day-grouped agenda
 * cards (SAT-first, truthful rest-day empties). The live-room affordance and the
 * availability edit are HONEST backendRequired gates — never a working join, never a
 * fake attendance write, never camera/mic. Display-only; no grid clone; zero body
 * anchors; and — the standing teacher hard rule — ZERO figure-bearing or flagged
 * vocabulary anywhere (copy AND comments). */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { statusChip } from '../components/status-chip.js';
import { pageHead, secHead, gateNote, dayRail } from '../components/portal-page.js';
import { PORTAL_PERSONAS } from '../fixtures/portal.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';

/* sara's classes today (authored fixture rows) */
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === PORTAL_PERSONAS.teacher).slice(0, 3);
/* sara's week — the same trainer filter over the schedule grid (no clone, agenda only) */
const myWeek = () => SCHEDULE_WEEK.map((d) => ({ ...d, blocks: d.blocks.filter((b) => b.trainer && b.trainer.id === PORTAL_PERSONAS.teacher) }));

/* a roster-count stop tag (authored present/capacity literals — never computed) */
function rosterTag(r) {
  const seen = r.present == null ? '—' : `<span class="tabular">${num(r.present)}</span>`;
  return `<span class="pt-stop-tag">${icon('students', 'ico ico-sm')}${seen}/<span class="tabular">${num(r.capacity)}</span></span>`;
}

/* today's classes as living now/next/done stops */
function railStops(sessions) {
  return sessions.map((r) => ({
    time: r.time,
    state: r.statusId === 'live' ? 'now' : r.statusId === 'completed' ? 'done' : 'next',
    tag: rosterTag(r),
    chip: statusChip(r.statusId),
    title: esc(t(r.titleKey)),
    sub: `${esc(t(r.roomKey))} · ${esc(t(r.subjectKey))}`,
  }));
}

/* one agenda card inside a day group */
function weekBlock(b) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(b.start)}–${esc(b.end)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(b.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(b.roomKey))} · ${esc(t(`data.subj.${b.subject}`))}</div>
      </div>
      ${statusChip(b.statusId)}
    </div>
  </div>`;
}

/* a day group — cards when sara teaches, an honest rest-day empty otherwise */
function weekDay(d) {
  return `<div class="pt-day">
    <div class="pt-day-head">
      <span class="pt-day-name">${esc(t(d.nameKey))}</span>
      ${d.isToday ? `<span class="pt-today-chip">${esc(t('prt.stu.weekToday'))}</span>` : ''}
    </div>
    ${d.blocks.length
      ? `<div class="pt-cards">${d.blocks.map(weekBlock).join('')}</div>`
      : `<div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.stu.weekFriNote'))}</span></div>`}
  </div>`;
}

export function renderTeacherSchedule() {
  const today = mySessions();
  const next = today.find((r) => r.statusId === 'upcoming') || today[today.length - 1];

  return `
    ${pageHead('prt.tch.pg.sched.title', 'prt.tch.pg.sched.sub')}

    <section class="pt-section td-focus">
      ${secHead('schedule', 'prt.tch.todayTitle', 'prt.tch.todayHint')}
      ${dayRail(railStops(today))}
      ${next ? `<div class="pt-card" style="border-color:var(--pt-accent)">
        <div class="pt-card-row">
          <span class="pt-time tabular">${esc(next.time)}</span>
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t('prt.tch.pg.sched.nextLabel'))}: ${esc(t(next.titleKey))}</div>
            <div class="pt-card-sub">${esc(t(next.roomKey))} · ${esc(t(next.subjectKey))}</div>
          </div>
          ${statusChip(next.statusId)}
        </div>
        <div class="pt-note" style="padding:10px 12px">${icon('clipboard-check', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.pg.sched.prepTitle'))}</strong> — ${esc(t('prt.tch.pg.sched.prepHint'))}</span></div>
      </div>` : ''}
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.stu.weekTitle', 'prt.tch.pg.sched.weekHint')}
      <div class="pt-week">${myWeek().map(weekDay).join('')}</div>
    </section>

    <div class="td-gates">
      ${gateNote('prt.tch.pg.sched.liveGate')}
      ${gateNote('prt.tch.pg.sched.availGate')}
    </div>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
