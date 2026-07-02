/* Spec 012 — STUDENT portal foundation (st1's page). Friendly, encouraging,
 * today-first, card-based, ZERO tables. Deep student dashboard = Spec 013.
 * Every number is an authored fixture literal (display-only). */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { STUDENT_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const me = () => STUDENTS.rows.find((s) => s.id === PORTAL_PERSONAS.student);
/* st1's group (grp1) sessions today — real fixture rows, friendly card form */
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === 'sara').slice(0, 2);

function sessionCard(s) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time tabular">${esc(s.time)}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.titleKey))}</div>
        <div class="pt-card-sub">${esc(t('prt.stu.nextWith'))} ${esc(t(s.trainer.nameKey))} · ${esc(t(s.roomKey))}</div>
      </div>
      ${medallion({ icon: 'sessions', tone: 'sky' })}
    </div>
  </div>`;
}

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
  </div>`;
}

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

export function renderStudentPortal() {
  const s = me();
  const sessions = mySessions();
  const next = sessions[sessions.length - 1];
  return `
    <section class="pt-hero">
      <h1 class="pt-hero-hi">${esc(t('prt.shell.greet'))} ${esc(t(s.nameKey))} 🌟</h1>
      <p class="pt-hero-sub">${esc(t('prt.stu.heroSub'))}</p>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('sessions', 'ico')}${esc(t('prt.stu.todayTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.stu.todayHint'))}</span>
      </div>
      <div class="pt-cards">${sessions.map(sessionCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head"><h2 class="pt-sec-title">${icon('clock', 'ico')}${esc(t('prt.stu.nextTitle'))}</h2></div>
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
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('curricula', 'ico')}${esc(t('prt.stu.coursesTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.stu.coursesHint'))}</span>
      </div>
      <div class="pt-cards">${STUDENT_PREVIEW.courses.map(courseCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('trending-up', 'ico')}${esc(t('prt.stu.progTitle'))}</h2>
        <span class="pt-sec-hint">${esc(t('prt.stu.progHint'))}</span>
      </div>
      <div class="pt-card">
        <div class="pt-gauge">
          <span class="pt-gauge-num tabular">${num(STUDENT_PREVIEW.overallProgress)}${pctSign()}</span>
          <div style="flex:1">
            <div class="pt-card-sub" style="margin-bottom:6px">${esc(t('prt.stu.progOverall'))}</div>
            <div class="pt-bar"><span style="width:${STUDENT_PREVIEW.overallProgress}%"></span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      <div class="pt-sec-head">
        <h2 class="pt-sec-title">${icon('sparkles', 'ico')}${esc(t('prt.stu.achTitle'))} <span class="pt-role-chip" style="font-size:10.5px">${esc(t('prt.stu.achNew'))}</span></h2>
      </div>
      <p class="pt-sec-hint">${esc(t('prt.stu.achHint'))}</p>
      <div class="pt-cards pt-cards-3">${STUDENT_PREVIEW.achievements.map(achCard).join('')}</div>
    </section>

    <section class="pt-section">
      <div class="pt-cards pt-cards-3">${PORTAL_PLANNED.student.map(plannedCard).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.stu.noteD'))}</span></div>
  `;
}
