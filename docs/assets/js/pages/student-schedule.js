/* Spec 019 — STUDENT SCHEDULE (st1). A compact page: today + next cards, then the
 * week as day-grouped agenda cards (never an hour×day grid, never a table), truthful
 * rest-day empties, and ONE honest live/join gate. Display-only; the page body
 * contributes ZERO anchors (the sidebar owns navigation). */
import { t, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { statusChip } from '../components/status-chip.js';
import { pageHead, secHead, gateNote } from '../components/portal-page.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';

const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === 'sara').slice(0, 2);
const myWeek = () => SCHEDULE_WEEK.map((d) => ({ ...d, blocks: d.blocks.filter((b) => b.trainer && b.trainer.id === 'sara') }));

function sessCard(s) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(s.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.titleKey))}</div>
        <div class="pt-card-sub">${esc(t('prt.stu.nextWith'))} ${esc(t(s.trainer.nameKey))} · ${esc(t(s.roomKey))}</div>
      </div>
      ${statusChip(s.statusId)}
    </div>
  </div>`;
}

function weekBlock(b) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(b.start)}–${esc(b.end)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(b.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(b.trainer.nameKey))} · ${esc(t(b.roomKey))}</div>
      </div>
      ${statusChip(b.statusId)}
    </div>
  </div>`;
}

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

export function renderStudentSchedule() {
  const sessions = mySessions();
  const next = sessions[sessions.length - 1];
  return `
    ${pageHead('prt.stu.pg.sched.title', 'prt.stu.pg.sched.sub')}

    <section class="pt-section">
      ${secHead('sessions', 'prt.stu.todayTitle', 'prt.stu.todayHint')}
      <div class="pt-now">
        <div class="pt-now-col">${sessions.map(sessCard).join('')}</div>
        <div class="pt-now-col">
          <div class="pt-card" style="border-color:var(--pt-accent)">
            <div class="pt-card-row">
              <span class="pt-time tabular">${esc(next.time)}</span>
              <div style="flex:1;min-width:0">
                <div class="pt-card-title">${esc(t('prt.band.nowNext'))}: ${esc(t(next.titleKey))}</div>
                <div class="pt-card-sub">${esc(t('prt.stu.nextWith'))} ${esc(t(next.trainer.nameKey))} · ${esc(t('prt.stu.nextRoom'))} ${esc(t(next.roomKey))}</div>
              </div>
              ${statusChip(next.statusId)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.stu.weekTitle', 'prt.stu.weekHint')}
      <div class="pt-week">${myWeek().map(weekDay).join('')}</div>
    </section>

    ${gateNote('prt.stu.pg.sched.liveGate')}

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.stu.nextSoon'))}</span></div>
  `;
}
