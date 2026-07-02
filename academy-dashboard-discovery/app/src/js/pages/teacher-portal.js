/* Spec 012 — TEACHER portal foundation (sara's page). Organized, respectful,
 * today-first: schedule, students, and the session-outcome flow preview.
 * Deep teacher dashboard = Spec 015. Display-only; the next-session affordance
 * is honestly demo (no live integration). */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { studentsOfTeacher } from '../fixtures/teacher-links.js';
import { PORTAL_PLANNED, PORTAL_PERSONAS } from '../fixtures/portal.js';

const me = () => TEACHERS.rows.find((x) => x.id === PORTAL_PERSONAS.teacher);
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === PORTAL_PERSONAS.teacher);

function sessCard(r) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(r.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(r.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(r.levelKey))} · ${esc(t(r.roomKey))}</div>
      </div>
      ${medallion({ icon: 'sessions', tone: 'teal' })}
    </div>
  </div>`;
}

function studentCard(s) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(s.levelKey))}</div>
      </div>
    </div>
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

export function renderTeacherPortal() {
  const tr = me();
  const sessions = mySessions();
  const next = sessions.find((r) => r.statusId === 'upcoming') || sessions[0];
  const students = studentsOfTeacher(PORTAL_PERSONAS.teacher).slice(0, 4);
  const perfHref = getLang() === 'en' ? 'teacher-performance.en.html' : 'teacher-performance.html';
  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.shell.greet'))} ${esc(t(tr.nameKey))} 👋</h1>
      <p class="pt-hero-sub">${esc(t('prt.tch.heroSub'))}</p>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('schedule', 'ico')}${esc(t('prt.tch.todayTitle'))} <span class="pt-role-chip" style="font-size:11px">${num(sessions.length)}</span></h2>
        <span class="pt-sec-hint">${esc(t('prt.tch.todayHint'))}</span>
      </div>
      <div class="pt-cards">${sessions.map(sessCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head"><h2 class="pt-sec-title">${icon('play', 'ico')}${esc(t('prt.tch.nextTitle'))}</h2></div>
      <div class="pt-card">
        <div class="pt-card-row">
          <span class="pt-time tabular">${esc(next.time)}</span>
          <div style="flex:1;min-width:0">
            <div class="pt-card-title">${esc(t(next.titleKey))}</div>
            <div class="pt-card-sub">${esc(t(next.levelKey))} · ${esc(t(next.roomKey))}</div>
          </div>
        </div>
        <div class="pt-note" style="padding:10px 12px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.tch.nextNote'))}</span></div>
      </div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('students', 'ico')}${esc(t('prt.tch.stuTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.tch.stuHint'))}</span>
      </div>
      <div class="pt-cards">${students.map(studentCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('clipboard-check', 'ico')}${esc(t('prt.tch.flowTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.tch.flowHint'))}</span>
      </div>
      <div class="pt-cards">${[
        flowStep(1, 'prt.tch.flow1', 'prt.tch.flow1d', 'user-check'),
        flowStep(2, 'prt.tch.flow2', 'prt.tch.flow2d', 'sparkles'),
        flowStep(3, 'prt.tch.flow3', 'prt.tch.flow3d', 'file-text'),
        flowStep(4, 'prt.tch.flow4', 'prt.tch.flow4d', 'message-circle'),
      ].join('')}</div>
    </section>

    <section class="pt-section">
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
    </section>

    <section class="pt-section">
      <div class="pt-cards">${PORTAL_PLANNED.teacher.map(plannedCard).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.tch.noteD'))}</span></div>
  `;
}
