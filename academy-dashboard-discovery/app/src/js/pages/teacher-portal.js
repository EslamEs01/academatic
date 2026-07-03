/* Spec 015 — TEACHER DASHBOARD (sara's daily cockpit). Organized, calm,
 * today-first: schedule, students, follow-ups, and the session-recording flow.
 * All authored/fixture display-only content — NO computed score/rank (sara's
 * numeric rating/util stay display-suppressed; worded signals only), NO engine,
 * NO money-like figure or vocabulary anywhere (copy and comments — the standing
 * hard rule), no fake live/save/upload affordance. The page body contributes
 * EXACTLY ONE anchor: the sanctioned labeled admin performance link.
 * Messages/notifications = Spec 016. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar, chip } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { outcomeChip } from '../components/outcome-status.js';
import { teacherStatusChip } from '../components/teacher-status.js';
import { familyStatusChip } from '../components/family-status.js';
import { TEACHERS, TEACHER_AVAIL } from '../fixtures/teachers.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { COURSE_BY_ID } from '../fixtures/courses.js';
import { studentsOfTeacher } from '../fixtures/teacher-links.js';
import { TEACHER_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS } from '../fixtures/portal.js';

const me = () => TEACHERS.rows.find((x) => x.id === PORTAL_PERSONAS.teacher);
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === PORTAL_PERSONAS.teacher);
/* sara's week, day-grouped (agenda cards, never a grid); WED/THU stay genuinely empty */
const myWeek = () => SCHEDULE_WEEK
  .map((d) => ({ day: d, blocks: d.blocks.filter((b) => b.trainer && b.trainer.id === PORTAL_PERSONAS.teacher) }))
  .filter((g) => g.blocks.length);
const planned = (id) => PORTAL_PLANNED.teacher.find((p) => p.id === id);

function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}

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

/* an honestly-gated capability sentence (non-anchor, zero controls) — the labeled
 * availability chip + one calm line (amendment A2: the T4/T5 visible gates) */
function gateNote(msgKey) {
  return `<div class="pt-note" style="padding:10px 12px">${availabilityChip('backendRequired')}<span>${esc(t(msgKey))}</span></div>`;
}

function lineList(keys) {
  return `<div class="pt-lines">${keys.map((k) => `<div class="pt-line">${icon('check-circle', 'ico ico-sm')}<span>${esc(t(k))}</span></div>`).join('')}</div>`;
}

/* ── section: today's schedule (authored student counts — fixture literals) ── */
function sessCard(r) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(r.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(r.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(r.roomKey))} · <span class="tabular">${num(r.present)}</span> ${esc(t('prt.tch.stuOf'))} <span class="tabular">${num(r.capacity)}</span> ${esc(t('prt.tch.stuUnit'))}</div>
      </div>
      ${statusChip(r.statusId)}
    </div>
  </div>`;
}

/* ── section: follow-up board (REAL outcome rows, gentle framing) ─────────── */
function followUpCard(f) {
  const o = OUTCOME_BY_ID[f.outcomeId];
  const s = STUDENT_BY_ID[o.studentId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(f.framingKey))}</div>
      </div>
      ${outcomeChip(o.outcomeId)}
    </div>
    ${o.feedbackKey ? `<p class="pt-card-sub">${esc(t(o.feedbackKey))}</p>` : ''}
  </div>`;
}

/* ── section: my students (display-only roster; worded notes, no numbers) ─── */
function rosterCard(s) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t('data.grp.math'))} · ${esc(t('data.crs.math.title'))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>
    <div class="pt-card-sub">${esc(t(TEACHER_PREVIEW.studentNotes[s.id]))}</div>
  </div>`;
}

function flowStep(n, tKey, dKey, ic) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: ic, tone: 'teal' })}
      <div>
        <div class="pt-card-title"><span class="tabular" style="color:var(--pt-accent-ink)">${num(n)}.</span> ${esc(t(tKey))}</div>
        <div class="pt-card-sub">${esc(t(dKey))}</div>
      </div>
    </div>
  </div>`;
}

/* ── section: recent sessions (the T20/T21 slice — REAL outcome refs) ─────── */
function historyCard(h) {
  const o = OUTCOME_BY_ID[h.outcomeId];
  const s = STUDENT_BY_ID[o.studentId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'clipboard-check', tone: 'teal' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))} — ${esc(t(o.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(o.dateKey))}</div>
      </div>
      ${outcomeChip(o.outcomeId)}
    </div>
    ${o.feedbackKey ? `<p class="pt-card-sub">${esc(t(o.feedbackKey))}</p>` : ''}
    <p class="pt-card-sub">${esc(t(h.homeworkKey))}</p>
  </div>`;
}

/* ── section: homework & tasks (authored prep cards) ──────────────────────── */
function taskCard(k) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: k.icon, tone: 'teal' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(k.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(k.subKey))}</div>
      </div>
    </div>
    <div class="pt-tags"><span class="pt-tag is-accent">${icon('clock', 'ico ico-sm')}${esc(t(k.dueKey))}</span></div>
  </div>`;
}

/* ── section: materials & library (display-only; course-associated) ───────── */
function materialCard(m) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: m.typeIcon, tone: 'teal' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(m.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(COURSE_BY_ID[m.courseId].titleKey))}</div>
      </div>
    </div>
  </div>`;
}

/* ── section: timetable (the 013 day-group agenda pattern) ────────────────── */
function dayGroup(g) {
  return `<div class="pt-day">
    <div class="pt-day-head"><span class="pt-day-name">${esc(t(g.day.nameKey))}</span></div>
    <div class="pt-cards">${g.blocks.map((b) => `<div class="pt-card">
      <div class="pt-card-row">
        <span class="pt-time tabular">${esc(b.start)}–${esc(b.end)}</span>
        <div style="flex:1;min-width:0">
          <div class="pt-card-title">${esc(t(b.titleKey))}</div>
          <div class="pt-card-sub">${esc(t(b.roomKey))}</div>
        </div>
        ${statusChip(b.statusId)}
      </div>
    </div>`).join('')}</div>
  </div>`;
}

export function renderTeacherPortal() {
  const tr = me();
  const sessions = mySessions();
  const nx = sessions[sessions.length - 1];
  const students = studentsOfTeacher(PORTAL_PERSONAS.teacher).slice(0, 4);
  const perfHref = getLang() === 'en' ? 'teacher-performance.en.html' : 'teacher-performance.html';
  const avail = TEACHER_AVAIL[tr.avail];
  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.shell.greet'))} ${esc(t(tr.nameKey))} 👋</h1>
      <p class="pt-hero-sub">${esc(t('prt.tch.heroSub'))}</p>
      <p class="pt-hero-sub" style="margin-top:8px;font-weight:600;color:var(--pt-accent-ink)">${icon('sparkles', 'ico ico-sm')} ${esc(t('prt.tch.heroHint'))}</p>
    </section>

    <section class="pt-section">
      ${secHead('schedule', 'prt.tch.todayTitle', 'prt.tch.todayHint', ` <span class="pt-role-chip" style="font-size:11px">${num(sessions.length)}</span>`)}
      <div class="pt-cards">${sessions.map(sessCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('play', 'prt.tch.nextTitle')}
      <div class="pt-card">
        <div class="pt-card-row">
          <span class="pt-time tabular">${esc(nx.time)}</span>
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(nx.titleKey))}</div>
            <div class="pt-card-sub">${esc(t(nx.levelKey))} · ${esc(t(nx.roomKey))}</div>
          </div>
          ${statusChip(nx.statusId)}
        </div>
        <div class="pt-tags"><span class="pt-tag is-accent">${icon('students', 'ico ico-sm')}${esc(t('data.grp.math'))}</span></div>
        <p class="pt-card-sub">${esc(t('prt.tch.nextPrep'))}</p>
        <div class="pt-note" style="padding:10px 12px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.tch.nextNote'))}</span></div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('alert-triangle', 'prt.tch.fuTitle', 'prt.tch.fuHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.followUps.map(followUpCard).join('')}</div>
      <div class="pt-note" style="padding:10px 12px">${icon('check-circle', 'ico ico-sm')}<span>${esc(t('prt.tch.fuReassure'))}</span></div>
    </section>

    <section class="pt-section">
      ${secHead('students', 'prt.tch.stuTitle', 'prt.tch.stuHint')}
      <div class="pt-cards">${students.map(rosterCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.tch.flowTitle', 'prt.tch.flowHint')}
      <div class="pt-cards">${[
        flowStep(1, 'prt.tch.flow1', 'prt.tch.flow1d', 'user-check'),
        flowStep(2, 'prt.tch.flow2', 'prt.tch.flow2d', 'sparkles'),
        flowStep(3, 'prt.tch.flow3', 'prt.tch.flow3d', 'file-text'),
        flowStep(4, 'prt.tch.flow4', 'prt.tch.flow4d', 'tasks'),
        flowStep(5, 'prt.tch.flow5', 'prt.tch.flow5d', 'materials'),
      ].join('')}</div>
      ${gateNote('prt.tch.absentGate')}
      <div class="pt-cards">${plannedCard(planned('outcomeSave'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.tch.histTitle', 'prt.tch.histHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.history.map(historyCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('tasks', 'prt.tch.tasksTitle', 'prt.tch.tasksHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.tasks.map(taskCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('taskManage'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('materials', 'prt.tch.matTitle', 'prt.tch.matHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.materials.map(materialCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('matUpload'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.tch.ttTitle', 'prt.tch.ttHint')}
      <div class="pt-week">${myWeek().map(dayGroup).join('')}</div>
      <div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.tch.ttFree'))}</span></div>
      <div class="pt-cards">${plannedCard(planned('availabilityEdit'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('reports', 'prt.tch.rubricTitle', 'prt.tch.rubricHint')}
      <div class="pt-card">
        ${lineList(TEACHER_PREVIEW.rubricKeys)}
        <div class="pt-card-chip">${availabilityChip('backendRequired')}</div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('certificates', 'prt.tch.reqTitle', 'prt.tch.reqHint')}
      <div class="pt-cards">
        <div class="pt-card">
          <div class="pt-card-row">
            ${medallion({ icon: 'certificates', tone: 'teal' })}
            <div style="flex:1;min-width:0">
              <div class="pt-card-title">${esc(t('prt.tch.certT'))}</div>
              <div class="pt-card-sub">${esc(t('prt.tch.certNote'))}</div>
            </div>
          </div>
          ${lineList(TEACHER_PREVIEW.certKeys)}
          <div class="pt-card-chip">${availabilityChip('backendRequired')}</div>
        </div>
        <div class="pt-card">
          <div class="pt-card-row">
            ${medallion({ icon: 'trending-up', tone: 'teal' })}
            <div style="flex:1;min-width:0">
              <div class="pt-card-title">${esc(t('prt.tch.perfTitle'))}</div>
              <p class="pt-card-sub">${esc(t('prt.tch.perfDesc'))}</p>
            </div>
            <a class="btn btn-secondary btn-sm" href="${perfHref}">${icon('trending-up', 'ico ico-sm')}<span>${esc(t('prt.tch.perfOpen'))}</span></a>
          </div>
        </div>
      </div>
      ${gateNote('prt.tch.cancelGate')}
    </section>

    <section class="pt-section">
      ${secHead('user', 'prt.tch.acctTitle')}
      <div class="pt-card">
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.tch.acct.name'))}</span><span class="pt-prof-v">${esc(t(tr.nameKey))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.tch.acct.subject'))}</span><span class="pt-prof-v">${esc(t(tr.subjectsKeys[0]))}</span></div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.tch.acct.status'))}</span>${teacherStatusChip(tr.statusId)}</div>
        <div class="pt-prof-row"><span class="pt-prof-k">${esc(t('prt.tch.acct.avail'))}</span>${chip({ labelKey: avail.labelKey, tone: avail.tone, icon: 'check-circle' })}</div>
        <div class="pt-note" style="padding:10px 12px;margin-top:4px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.tch.acctEditNote'))}</span></div>
      </div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.tch.noteD'))}</span></div>
  `;
}
