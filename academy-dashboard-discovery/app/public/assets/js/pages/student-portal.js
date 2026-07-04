/* Spec 018 — STUDENT HOME, reworked into a COMPACT admin-like dashboard (the 7-band
 * recipe: compact header · 4-KPI row · now band · homework-snapshot core · week+history
 * preview · quick-links · one-line note). The endless 13-section portal is gone; the
 * displaced detail (achievements/celebration/full week/materials/full history/profile)
 * is RETAINED in fixtures/locales and re-rendered by Spec 019's internal pages. Every
 * number is an authored fixture literal (display-only) — NO computed score/rank, NO
 * engine, NO fake live/join/upload/submit. The page body contributes ZERO anchors. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { courseOf } from '../fixtures/courses.js';
import { STUDENT_PREVIEW, COMPACT_HOME, PORTAL_PLANNED, PORTAL_PERSONAS, ROLE_NAV } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const me = () => STUDENTS.rows.find((s) => s.id === PORTAL_PERSONAS.student);
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === 'sara').slice(0, 2);
const myWeek = () => SCHEDULE_WEEK
  .map((d) => ({ ...d, blocks: d.blocks.filter((b) => b.trainer.id === 'sara') }))
  .filter((d) => d.blocks.length > 0);
const planned = (id) => PORTAL_PLANNED.student.find((p) => p.id === id);
const courseName = (id) => t(courseOf(id).titleKey);

/* ── shared compact-home primitives (duplicated per page by the Spec-018 file scope:
 * no new shared render module is permitted; kept byte-identical across the 3 homes) ── */
function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}
function kpiCard(k, tone) {
  const pct = k.format === 'percent' ? pctSign() : '';
  return `<div class="pt-kpi">
    <div class="pt-kpi-top">${medallion({ icon: k.icon, tone, size: 'sm' })}<span class="pt-gauge-num tabular">${num(k.value)}${pct}</span></div>
    <div class="pt-kpi-label">${esc(t(k.labelKey))}</div>
  </div>`;
}
function kpiRow(kpis, tone) { return `<div class="pt-kpi-row">${kpis.map((k) => kpiCard(k, tone)).join('')}</div>`; }
/* Spec 019 — status-aware: an `implemented` destination becomes a REAL link (the six
 * student pages now exist — a «قريبًا» pill over a live page would lie); `planned` keeps
 * the honest non-anchor tile. Family/teacher homes keep their own all-planned copies. */
function quickTiles(role) {
  const en = getLang() === 'en';
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) => e.status === 'implemented'
    ? `<a class="pt-qtile" href="${e.page}${en ? '.en' : ''}.html">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span></a>`
    : `<div class="pt-qtile is-planned">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span><span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
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

/* ── now band: today's sessions (fixture literals) ─────────────────────────── */
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

/* ── role-core band: homework snapshot (top-2 display-only cards) ───────────── */
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

export function renderStudentPortal() {
  const s = me();
  const sessions = mySessions();
  const next = sessions[sessions.length - 1];
  const week = myWeek();

  return `
    <div class="pt-home-head">
      <h1 class="pt-home-hi">${esc(t('prt.shell.greet'))} ${esc(t(s.nameKey))} 🌟</h1>
      <p class="pt-home-status">${esc(t('prt.band.stuStatus'))}</p>
    </div>

    <section class="pt-section">
      ${secHead('trending-up', 'prt.band.overview', 'prt.band.overviewHint')}
      ${kpiRow(COMPACT_HOME.student.kpis, 'sky')}
    </section>

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
            <div class="pt-note" style="padding:10px 12px">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.stu.nextSoon'))}</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('tasks', 'prt.band.stuCore', 'prt.band.stuCoreHint')}
      <div class="pt-cards">${STUDENT_PREVIEW.homework.slice(0, 2).map(homeworkCard).join('')}</div>
      <div class="pt-cards">${plannedCard(planned('hwSubmit'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.band.stuPreview', 'prt.band.stuPreviewHint')}
      <div class="pt-card">
        <div class="pt-tags">${week.map((d) => `<span class="pt-tag${d.isToday ? ' is-accent' : ''}">${esc(t(d.nameKey))} · <span class="tabular">${num(d.blocks.length)}</span></span>`).join('')}</div>
        <div class="pt-card-sub">${esc(t('prt.stu.weekHint'))}</div>
      </div>
      <div class="pt-cards">${plannedCard(planned('fullHistory'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('grid', 'prt.band.quickTitle', 'prt.band.quickHint')}
      ${quickTiles('student')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
