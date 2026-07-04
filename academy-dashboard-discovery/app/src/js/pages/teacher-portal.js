/* Spec 018 — TEACHER HOME (sara's daily cockpit), reworked into a COMPACT admin-like
 * dashboard (the 7-band recipe: compact header · 4-KPI row · now band · follow-up-board
 * core · recording-flow+performance preview · quick-links · one-line note). The endless
 * 14-section portal is gone; the displaced detail (roster/history/tasks/materials/timetable/
 * rubric/requests/account) is RETAINED in fixtures/locales and re-rendered by Spec 021.
 * All display-only; NO computed score/rank, NO engine, and — the standing hard rule — zero
 * figure-bearing or flagged vocabulary anywhere (copy AND comments; the extended token set).
 * The page body contributes EXACTLY ONE anchor: the sanctioned admin performance link. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { availabilityChip } from '../components/report-status.js';
import { statusChip } from '../components/status-chip.js';
import { outcomeChip } from '../components/outcome-status.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { TEACHER_PREVIEW, COMPACT_HOME, PORTAL_PLANNED, PORTAL_PERSONAS, ROLE_NAV } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const me = () => TEACHERS.rows.find((x) => x.id === PORTAL_PERSONAS.teacher);
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === PORTAL_PERSONAS.teacher).slice(0, 3);
const planned = (id) => PORTAL_PLANNED.teacher.find((p) => p.id === id);

/* ── shared compact-home primitives (duplicated per page by the Spec-018 file scope:
 * no new shared render module is permitted; kept byte-identical across the 3 homes) ── */
function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}
function kpiCard(k, tone) {
  const pct = k.format === 'percent' ? (getLang() === 'en' ? '%' : '٪') : '';
  return `<div class="pt-kpi">
    <div class="pt-kpi-top">${medallion({ icon: k.icon, tone, size: 'sm' })}<span class="pt-gauge-num tabular">${num(k.value)}${pct}</span></div>
    <div class="pt-kpi-label">${esc(t(k.labelKey))}</div>
  </div>`;
}
function kpiRow(kpis, tone) { return `<div class="pt-kpi-row">${kpis.map((k) => kpiCard(k, tone)).join('')}</div>`; }
function quickTiles(role) {
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) =>
    `<div class="pt-qtile is-planned">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span><span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
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
function lineList(keys) {
  return `<div class="pt-lines">${keys.map((k) => `<div class="pt-line">${icon('check-circle', 'ico ico-sm')}<span>${esc(t(k))}</span></div>`).join('')}</div>`;
}

/* ── now band: today's schedule (authored student counts — fixture literals) ── */
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

/* ── role-core band: follow-up board (REAL outcome rows, gentle framing) ────── */
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

export function renderTeacherPortal() {
  const tr = me();
  const sessions = mySessions();
  const nx = sessions[sessions.length - 1];
  const perfHref = getLang() === 'en' ? 'teacher-performance.en.html' : 'teacher-performance.html';

  return `
    <div class="pt-home-head">
      <h1 class="pt-home-hi">${esc(t('prt.shell.greet'))} ${esc(t(tr.nameKey))} 👋</h1>
      <p class="pt-home-status">${esc(t('prt.band.tchStatus'))}</p>
    </div>

    <section class="pt-section">
      ${secHead('trending-up', 'prt.band.overview', 'prt.band.overviewHint')}
      ${kpiRow(COMPACT_HOME.teacher.kpis, 'teal')}
    </section>

    <section class="pt-section">
      ${secHead('schedule', 'prt.tch.todayTitle', 'prt.tch.todayHint', ` <span class="pt-role-chip" style="font-size:11px">${num(sessions.length)}</span>`)}
      <div class="pt-now">
        <div class="pt-now-col">${sessions.map(sessCard).join('')}</div>
        <div class="pt-now-col">
          <div class="pt-card" style="border-color:var(--pt-accent)">
            <div class="pt-card-row">
              <span class="pt-time tabular">${esc(nx.time)}</span>
              <div style="flex:1;min-width:0">
                <div class="pt-card-title">${esc(t('prt.band.nowNext'))}: ${esc(t(nx.titleKey))}</div>
                <div class="pt-card-sub">${esc(t(nx.levelKey))} · ${esc(t(nx.roomKey))}</div>
              </div>
              ${statusChip(nx.statusId)}
            </div>
            <p class="pt-card-sub">${esc(t('prt.tch.nextPrep'))}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-section">
      ${secHead('alert-triangle', 'prt.band.tchCore', 'prt.band.tchCoreHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.followUps.map(followUpCard).join('')}</div>
      <div class="pt-note" style="padding:10px 12px">${icon('check-circle', 'ico ico-sm')}<span>${esc(t('prt.tch.fuReassure'))}</span></div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.band.tchPreview', 'prt.band.tchPreviewHint')}
      <div class="pt-cards">
        <div class="pt-card">
          <div class="pt-card-row">
            ${medallion({ icon: 'clipboard-check', tone: 'teal' })}
            <div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t('prt.tch.flowTitle'))}</div></div>
          </div>
          ${lineList(['prt.tch.flow1', 'prt.tch.flow2', 'prt.tch.flow3', 'prt.tch.flow4', 'prt.tch.flow5'])}
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
      <div class="pt-cards">${plannedCard(planned('outcomeSave'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('grid', 'prt.band.quickTitle', 'prt.band.quickHint')}
      ${quickTiles('teacher')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
