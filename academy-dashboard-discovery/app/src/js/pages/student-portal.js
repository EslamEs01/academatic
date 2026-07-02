/* Spec 013 — STUDENT DASHBOARD (st1's learning home). Deepens the Spec-012
 * foundation into the full one-page dashboard: today-first, card-based, ZERO
 * tables, warm/encouraging (bright-not-childish). Every number is an authored
 * fixture literal (display-only) — NO computed score/rank, NO engine, NO fake
 * live join / upload / submit / chat / download. The page body contributes zero
 * anchors; the only links are the shell's skip + hub-switch. Deep siblings:
 * Family = Spec 014 · Teacher = Spec 015 · Communications = Spec 016. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { outcomeChip } from '../components/outcome-status.js';
import { STUDENTS } from '../fixtures/students.js';
import { FAMILIES } from '../fixtures/families.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { courseOf } from '../fixtures/courses.js';
import { STUDENT_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const me = () => STUDENTS.rows.find((s) => s.id === PORTAL_PERSONAS.student);
/* st1 ∈ grp1 (math, sara) — sara is the established grp1 proxy across the portal */
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === 'sara').slice(0, 2);
const myWeek = () => SCHEDULE_WEEK
  .map((d) => ({ ...d, blocks: d.blocks.filter((b) => b.trainer.id === 'sara') }))
  .filter((d) => d.blocks.length > 0);
const planned = (id) => PORTAL_PLANNED.student.find((p) => p.id === id);
const courseName = (id) => t(courseOf(id).titleKey);

/* ── section: today's learning ─────────────────────────────────────────── */
function sessionCard(s) {
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

/* ── section: my week (agenda-style day groups; never a grid) ───────────── */
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
    ${d.blocks.map(weekBlock).join('')}
  </div>`;
}

/* ── section: my courses ───────────────────────────────────────────────── */
function courseCard(c) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: c.subjectIcon, tone: 'sky' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(c.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(c.levelKey))}</div>
      </div>
    </div>
    <div class="pt-gauge">
      <div class="pt-bar"><span style="width:${c.pct}%"></span></div>
      <span class="tabular" style="font-weight:700;color:var(--pt-accent-ink)">${num(c.pct)}${pctSign()}</span>
    </div>
    <div class="pt-card-sub">${esc(t(c.nextStepKey))}</div>
  </div>`;
}

/* ── section: homework & materials (display-only cards) ────────────────── */
function homeworkCard(h) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'tasks', tone: 'sky' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(h.titleKey))}</div>
        <div class="pt-card-sub">${esc(courseName(h.courseId))}</div>
      </div>
    </div>
    <div class="pt-tags">
      <span class="pt-tag is-accent">${icon('clock', 'ico ico-sm')}${esc(t(h.dueKey))}</span>
      <span class="pt-tag">${esc(t(h.stateKey))}</span>
    </div>
  </div>`;
}
function materialCard(m) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: m.typeIcon, tone: 'sky' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(m.titleKey))}</div>
        <div class="pt-card-sub">${esc(courseName(m.courseId))}</div>
      </div>
    </div>
  </div>`;
}

/* ── section: attendance trio ──────────────────────────────────────────── */
function statTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}

/* ── section: achievements + celebration ───────────────────────────────── */
function achCard(a) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: a.icon, tone: 'amber' })}
      <div>
        <div class="pt-card-title">${esc(t(a.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(a.descKey))}</div>
      </div>
    </div>
  </div>`;
}
function celebCard(c) {
  return `<div class="pt-card pt-celeb">
    <div class="pt-card-row">
      ${medallion({ icon: c.icon, tone: 'amber' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(c.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(c.descKey))}</div>
      </div>
    </div>
  </div>`;
}

/* ── section: recent sessions (F6 feedback shape) ──────────────────────── */
function feedbackCard(h) {
  // the first record resolves the REAL out1 outcome row (st1 · math · sara · attended)
  if (h.outcomeId) {
    const o = OUTCOME_BY_ID[h.outcomeId];
    return `<div class="pt-card">
      <div class="pt-card-row">
        ${medallion({ icon: 'clipboard-check', tone: 'success' })}
        <div style="flex:1;min-width:0">
          <div class="pt-card-title">${esc(courseName('c1'))} — ${esc(t(o.trainer.nameKey))}</div>
          <div class="pt-card-sub">${esc(t('prt.stu.hist.daySun'))}</div>
        </div>
        ${outcomeChip(o.outcomeId)}
      </div>
      <p class="pt-card-sub">${esc(t(o.feedbackKey))}</p>
    </div>`;
  }
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'clipboard-check', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(courseName(h.courseId))} — ${esc(t(h.teacherKey))}</div>
        <div class="pt-card-sub">${esc(t(h.dayKey))}</div>
      </div>
    </div>
    <p class="pt-card-sub">${esc(t(h.summaryKey))}</p>
    <p class="pt-card-sub">${esc(t(h.homeworkKey))}</p>
    ${h.hasAttachment ? `<span class="pt-attach">${icon('file-text', 'ico ico-sm')}${esc(t('prt.stu.histAttach'))}</span>` : ''}
  </div>`;
}

/* ── planned/backend-gated mini-card (never an anchor; labeled chip) ────── */
function plannedCard(p) {
  return `<div class="pt-card pt-planned">
    <div class="pt-card-row">
      ${medallion({ icon: p.icon, tone: 'muted' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(p.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(p.descKey))}</div>
      </div>
    </div>
    ${availabilityChip(p.availability)}
  </div>`;
}

function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}

export function renderStudentPortal() {
  const s = me();
  const sessions = mySessions();
  const next = sessions[sessions.length - 1];
  const week = myWeek();
  const att = STUDENT_PREVIEW.attendance;
  const fam = FAMILIES.rows.find((f) => f.id === s.familyId);

  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.shell.greet'))} ${esc(t(s.nameKey))} 🌟</h1>
      <p class="pt-hero-sub">${esc(t('prt.stu.heroSub'))}</p>
      <p class="pt-hero-sub" style="margin-top:8px;font-weight:600;color:var(--pt-accent-ink)">${icon('sparkles', 'ico ico-sm')} ${esc(t('prt.stu.heroHint'))}</p>
    </section>

    <section class="pt-section">
      ${secHead('sessions', 'prt.stu.todayTitle', 'prt.stu.todayHint')}
      <div class="pt-cards">${sessions.map(sessionCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clock', 'prt.stu.nextTitle')}
      <div class="pt-card">
        <div class="pt-card-row">
          <span class="pt-time tabular">${esc(next.time)}</span>
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(next.titleKey))}</div>
            <div class="pt-card-sub">${esc(t('prt.stu.nextWith'))} ${esc(t(next.trainer.nameKey))} · ${esc(t('prt.stu.nextRoom'))} ${esc(t(next.roomKey))}</div>
          </div>
        </div>
        <div class="pt-note" style="padding:10px 12px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.stu.nextSoon'))}</span></div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.stu.weekTitle', 'prt.stu.weekHint')}
      <div class="pt-week">
        ${week.map(weekDay).join('')}
        <div class="pt-day">
          <div class="pt-day-head"><span class="pt-day-name">${esc(t('prt.stu.weekFri'))}</span></div>
          <div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.stu.weekFriNote'))}</span></div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('curricula', 'prt.stu.coursesTitle', 'prt.stu.coursesHint')}
      <div class="pt-cards">${STUDENT_PREVIEW.courses.map(courseCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('tasks', 'prt.stu.hwTitle', 'prt.stu.hwHint')}
      <div class="pt-cards">${STUDENT_PREVIEW.homework.map(homeworkCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('hwSubmit'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('materials', 'prt.stu.matTitle', 'prt.stu.matHint')}
      <div class="pt-cards">${STUDENT_PREVIEW.materials.map(materialCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('matDownload'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('trending-up', 'prt.stu.progTitle', 'prt.stu.progHint')}
      <div class="pt-card">
        <div class="pt-gauge">
          <span class="pt-gauge-num tabular">${num(STUDENT_PREVIEW.overallProgress)}${pctSign()}</span>
          <div style="flex:1">
            <div class="pt-card-sub" style="margin-bottom:6px">${esc(t('prt.stu.progOverall'))}</div>
            <div class="pt-bar"><span style="width:${STUDENT_PREVIEW.overallProgress}%"></span></div>
          </div>
        </div>
      </div>
      <div class="pt-cards pt-cards-3">
        ${statTile('check-circle', 'success', att.attended, 'prt.stu.att.attended')}
        ${statTile('clock', 'sky', att.upcoming, 'prt.stu.att.upcoming')}
        ${statTile('sparkles', 'amber', att.streakDays, 'prt.stu.att.streak')}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('sparkles', 'prt.stu.achTitle', 'prt.stu.achHint', ` <span class="pt-role-chip" style="font-size:10.5px">${esc(t('prt.stu.achNew'))}</span>`)}
      <div class="pt-cards pt-cards-3">${STUDENT_PREVIEW.achievements.map(achCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('award', 'prt.stu.celebTitle', 'prt.stu.celebHint', ` <span class="pt-celeb-label">${esc(t('prt.stu.celebLabel'))}</span>`)}
      <div class="pt-cards pt-cards-3">${STUDENT_PREVIEW.celebration.map(celebCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.stu.histTitle', 'prt.stu.histHint')}
      <div class="pt-cards">${STUDENT_PREVIEW.history.map(feedbackCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('fullHistory'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('user', 'prt.stu.profTitle')}
      <div class="pt-card">
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.stu.profLevel'))}</span><span class="pt-prof-v">${esc(t(s.levelKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.stu.profCourse'))}</span><span class="pt-prof-v">${esc(t(s.subjectKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.stu.profFamily'))}</span><span class="pt-prof-v">${esc(t(fam.guardian.nameKey))}</span></div>
        <div class="pt-note" style="padding:10px 12px;margin-top:4px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.stu.profEditNote'))}</span></div>
      </div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.stu.noteD'))}</span></div>
  `;
}
