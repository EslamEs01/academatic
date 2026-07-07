/* Spec 019 — STUDENT PROGRESS (st1). Compact: a KPI band, per-course progress bars,
 * the attendance trio, the RE-HOMED achievements + celebration (the RETAINED Spec-013
 * fixtures render again — unordered recognition, never a ranking), and teacher-signal
 * lines. Authored literals only — NO charts, NO computed score/rank/leaderboard. Zero
 * body anchors. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { pageHead, secHead, kpiRow } from '../components/portal-page.js';
import { STUDENT_PREVIEW, COMPACT_HOME, STUDENT_PAGES } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');

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

function statTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}

function achCard(a) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: a.icon, tone: 'amber' })}
      <div><div class="pt-card-title">${esc(t(a.titleKey))}</div><div class="pt-card-sub">${esc(t(a.descKey))}</div></div>
    </div>
  </div>`;
}

function celebCard(c) {
  return `<div class="pt-card pt-celeb">
    <div class="pt-card-row">
      ${medallion({ icon: c.icon, tone: 'amber' })}
      <div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t(c.titleKey))}</div><div class="pt-card-sub">${esc(t(c.descKey))}</div></div>
    </div>
  </div>`;
}

function lineList(keys) {
  return `<div class="pt-lines">${keys.map((k) => `<div class="pt-line">${icon('check-circle', 'ico ico-sm')}<span>${esc(t(k))}</span></div>`).join('')}</div>`;
}

export function renderStudentProgress() {
  const att = STUDENT_PREVIEW.attendance;
  return `
    ${pageHead('prt.stu.pg.prog.title', 'prt.stu.pg.prog.sub')}

    <section class="pt-section">
      ${secHead('trending-up', 'prt.band.overview', 'prt.band.overviewHint')}
      ${kpiRow(COMPACT_HOME.student.kpis, 'sky')}
    </section>

    <section class="pt-section">
      ${secHead('curricula', 'prt.stu.pg.prog.coursesTitle')}
      <div class="pt-cards">${STUDENT_PREVIEW.courses.map(courseCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.stu.pg.prog.attTitle')}
      <div class="pt-cards pt-cards-3">
        ${statTile('check-circle', 'success', att.attended, 'prt.stu.att.attended')}
        ${statTile('clock', 'sky', att.upcoming, 'prt.stu.att.upcoming')}
        ${statTile('sparkles', 'amber', att.streakDays, 'prt.stu.att.streak')}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('sparkles', 'prt.stu.pg.prog.achTitle')}
      <div class="pt-cards pt-cards-3">${STUDENT_PREVIEW.achievements.map(achCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('award', 'prt.stu.pg.prog.celebTitle')}
      <div class="pt-cards pt-cards-3">${STUDENT_PREVIEW.celebration.map(celebCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('message-circle', 'prt.stu.pg.prog.sigTitle')}
      <div class="pt-card">${lineList(STUDENT_PAGES.progress.signals)}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
