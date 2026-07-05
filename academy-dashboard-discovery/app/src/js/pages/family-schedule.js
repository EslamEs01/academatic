/* Spec 020 — FAMILY SCHEDULE (fam1). Today across the children (every session
 * CHILD-TAGGED — the legacy Student-Name column, reborn as a name tag) + the next
 * card + the week as day-grouped agenda cards with child tags. Truthful rest-day
 * empties; ONE honest live/join gate. Display-only; zero tables; zero body anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { statusChip } from '../components/status-chip.js';
import { pageHead, secHead, gateNote } from '../components/portal-page.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { FAMILY_PREVIEW } from '../fixtures/portal.js';

/* the family's sessions today — the established sara/khalid family proxy (014/018) */
const todaySessions = () => SESSIONS_FULL.rows.filter((r) => ['sara', 'khalid'].includes(r.trainer.id)).slice(0, 3);
/* the family's week — the same trainer proxy over the schedule grid */
const myWeek = () => SCHEDULE_WEEK.map((d) => ({ ...d, blocks: d.blocks.filter((b) => b.trainer && ['sara', 'khalid'].includes(b.trainer.id)) }));

function childTag(sessionId) {
  const childId = FAMILY_PREVIEW.todayChildren[sessionId];
  if (!childId) return '';
  return `<span class="pt-tag is-accent">${icon('families', 'ico ico-sm')}${esc(t(STUDENT_BY_ID[childId].nameKey))}</span>`;
}

function sessCard(r) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(r.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(r.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(r.trainer.nameKey))} · ${esc(t(r.roomKey))}</div>
      </div>
      ${statusChip(r.statusId)}
    </div>
    ${childTag(r.id) ? `<div class="pt-tags">${childTag(r.id)}</div>` : ''}
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

export function renderFamilySchedule() {
  const today = todaySessions();
  const next = today.find((r) => r.statusId === 'upcoming') || today[today.length - 1];
  return `
    ${pageHead('prt.fam.pg.sched.title', 'prt.fam.pg.sched.sub')}

    <section class="pt-section">
      ${secHead('sessions', 'prt.fam.todayTitle', 'prt.fam.todayHint')}
      <div class="pt-now">
        <div class="pt-now-col">${today.map(sessCard).join('')}</div>
        <div class="pt-now-col">
          <div class="pt-card" style="border-color:var(--pt-accent)">
            <div class="pt-card-row">
              <span class="pt-time tabular">${esc(next.time)}</span>
              <div style="flex:1;min-width:0">
                <div class="pt-card-title">${esc(t('prt.band.nowNext'))}: ${esc(t(next.titleKey))}</div>
                <div class="pt-card-sub">${esc(t(next.trainer.nameKey))} · ${esc(t(next.roomKey))}</div>
              </div>
              ${statusChip(next.statusId)}
            </div>
            ${childTag(next.id) ? `<div class="pt-tags">${childTag(next.id)}</div>` : ''}
          </div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.stu.weekTitle', 'prt.fam.pg.sched.sub')}
      <div class="pt-week">${myWeek().map(weekDay).join('')}</div>
    </section>

    ${gateNote('prt.fam.pg.sched.liveGate')}

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
