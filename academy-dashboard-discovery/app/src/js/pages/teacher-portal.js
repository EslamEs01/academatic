/* Spec 018 → Spec 022 — TEACHER HOME (sara's daily cockpit), reworked into a LIVING
 * teaching cockpit: a teal identity hero (teacher + day context) · a living day rail
 * (today's classes with room/roster/status stops) · the follow-up board (REAL outcome
 * rows) · the outcome WORKFLOW as a prepare → attend → record → review flow strip
 * (the record step is the honest gate) · a guided gate panel · the performance link ·
 * quick links. All display-only; NO computed score/rank, NO engine, and — the standing
 * hard rule — ZERO figure-bearing or flagged vocabulary anywhere (copy AND
 * comments; the extended token set). The page body anchors: the Teacher's own
 * reports page + the seven real quick-tile links (Spec 045 FR-012/FR-013). */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { statusChip } from '../components/status-chip.js';
import { outcomeChip } from '../components/outcome-status.js';
import { TEACHERS } from '../fixtures/teachers.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { TEACHER_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS, ROLE_NAV, LIVING_HOME } from '../fixtures/portal.js';
import { idHero, dayRail, flowStrip, guidePanel } from '../components/portal-page.js';

const me = () => TEACHERS.rows.find((x) => x.id === PORTAL_PERSONAS.teacher);
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === PORTAL_PERSONAS.teacher).slice(0, 3);
const planned = (id) => PORTAL_PLANNED.teacher.find((p) => p.id === id);

function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}
/* Spec 045 (FR-012) — status-aware quick tiles, the exact proven Spec 019/020
 * pattern: an `implemented` destination (all seven Teacher pages exist) renders
 * as a REAL link with the honest pt-lift hover affordance; the is-planned
 * branch stays for any future non-implemented entry. */
function quickTiles(role) {
  const en = getLang() === 'en';
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) => e.status === 'implemented'
    ? `<a class="pt-qtile pt-lift" href="${e.page}${en ? '.en' : ''}.html">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span></a>`
    : `<div class="pt-qtile is-planned">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span><span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
}

/* ── living day rail: today's schedule (authored roster counts — fixture literals) ── */
function railStops(sessions) {
  return sessions.map((r) => ({
    time: r.time,
    state: r.statusId === 'live' ? 'now' : 'next',
    tag: `<span class="pt-stop-tag">${icon('students', 'ico ico-sm')}<span class="tabular">${num(r.present)}</span>/<span class="tabular">${num(r.capacity)}</span></span>`,
    chip: statusChip(r.statusId),
    title: esc(t(r.titleKey)),
    sub: esc(t(r.roomKey)),
  }));
}

/* ── follow-up board: REAL outcome rows, gentle priority framing ───────────── */
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
  const perfHref = getLang() === 'en' ? 'teacher-reports.en.html' : 'teacher-reports.html';
  const lv = LIVING_HOME.teacher;

  return `
    ${idHero({ nameKey: tr.nameKey, accent: 'teal', tone: 'teal', emoji: lv.hero.emoji, subKey: lv.hero.subKey, counters: lv.hero.counters })}

    <section class="pt-section">
      ${secHead('schedule', 'prt.tch.todayTitle', 'prt.tch.todayHint', ` <span class="pt-role-chip" style="font-size:11px">${num(sessions.length)}</span>`)}
      ${dayRail(railStops(sessions))}
    </section>

    <section class="pt-section td-focus">
      ${secHead('alert-triangle', 'prt.band.tchCore', 'prt.band.tchCoreHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.followUps.map(followUpCard).join('')}</div>
      <div class="pt-note" style="padding:10px 12px">${icon('check-circle', 'ico ico-sm')}<span>${esc(t('prt.tch.fuReassure'))}</span></div>
    </section>

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.band.tchPreview', 'prt.band.tchPreviewHint')}
      ${flowStrip(lv.flow)}
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
      <div class="pt-cards">${guidePanel(planned('outcomeSave'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('grid', 'prt.band.quickTitle', 'prt.band.quickHint')}
      ${quickTiles('teacher')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
