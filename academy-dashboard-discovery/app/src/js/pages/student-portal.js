/* Spec 018 → Spec 022 — the CHILD-VIEW HOME (Salman = st1, a fam1 child), reworked
 * into a LIVING dashboard: a sky identity hero (child + day context) · a living day
 * rail (today's sessions) · the homework snapshot · a week/history preview · quick
 * links. Reframed from a primary Student role to the child's own view inside the
 * family journey (Spec 021 DEC-002/003/005 — the shell identity is relabelled at the
 * locale layer; this body is preserved in meaning). Every number is an authored
 * fixture literal (display-only) — NO computed score/rank, NO engine, NO fake live/
 * join/upload/submit. The page body contributes exactly the six quick-link anchors. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { statusChip } from '../components/status-chip.js';
import { STUDENTS } from '../fixtures/students.js';
import { SESSIONS_FULL } from '../fixtures/sessions.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { courseOf } from '../fixtures/courses.js';
import { STUDENT_PREVIEW, PORTAL_PLANNED, PORTAL_PERSONAS, ROLE_NAV, LIVING_HOME } from '../fixtures/portal.js';
import { idHero, dayRail, guidePanel } from '../components/portal-page.js';

const me = () => STUDENTS.rows.find((s) => s.id === PORTAL_PERSONAS.student);
const mySessions = () => SESSIONS_FULL.rows.filter((r) => r.trainer.id === 'sara').slice(0, 2);
const myWeek = () => SCHEDULE_WEEK
  .map((d) => ({ ...d, blocks: d.blocks.filter((b) => b.trainer.id === 'sara') }))
  .filter((d) => d.blocks.length > 0);
const planned = (id) => PORTAL_PLANNED.student.find((p) => p.id === id);
const courseName = (id) => t(courseOf(id).titleKey);

function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}
/* Spec 019 — status-aware quick tiles: an `implemented` destination is a REAL link
 * (all six child pages exist); pt-lift is the honest hover affordance. */
function quickTiles(role) {
  const en = getLang() === 'en';
  return `<div class="pt-qtiles">${ROLE_NAV[role].filter((e) => e.id !== 'home').map((e) => e.status === 'implemented'
    ? `<a class="pt-qtile pt-lift" href="${e.page}${en ? '.en' : ''}.html">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span></a>`
    : `<div class="pt-qtile is-planned">${icon(e.icon, 'ico ico-sm')}<span>${esc(t(e.labelKey))}</span><span class="pt-qtile-soon">${esc(t('prt.nav.soon'))}</span></div>`).join('')}</div>`;
}

/* ── living day rail: today's sessions (fixture literals) ─────────────────── */
function railStops(sessions) {
  return sessions.map((s) => ({
    time: s.time,
    state: s.statusId === 'live' ? 'now' : 'next',
    chip: statusChip(s.statusId),
    title: esc(t(s.titleKey)),
    sub: `${esc(t('prt.stu.nextWith'))} ${esc(t(s.trainer.nameKey))} · ${esc(t(s.roomKey))}`,
  }));
}

/* ── homework snapshot (top-2 display-only cards) ───────────────────────────── */
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
  const week = myWeek();
  const lv = LIVING_HOME.student;

  return `
    ${idHero({ nameKey: s.nameKey, accent: 'sky', tone: 'sky', emoji: lv.hero.emoji, subKey: lv.hero.subKey, counters: lv.hero.counters })}

    <section class="pt-section">
      ${secHead('sessions', 'prt.stu.todayTitle', 'prt.stu.todayHint')}
      ${dayRail(railStops(sessions))}
    </section>

    <section class="pt-section">
      ${secHead('tasks', 'prt.band.stuCore', 'prt.band.stuCoreHint')}
      <div class="pt-cards">${STUDENT_PREVIEW.homework.slice(0, 2).map(homeworkCard).join('')}</div>
      <div class="pt-cards">${guidePanel(planned('hwSubmit'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.band.stuPreview', 'prt.band.stuPreviewHint')}
      <div class="pt-card pt-cele">
        <div class="pt-tags">${week.map((d) => `<span class="pt-tag${d.isToday ? ' is-accent' : ''}">${esc(t(d.nameKey))} · <span class="tabular">${num(d.blocks.length)}</span></span>`).join('')}</div>
        <div class="pt-card-sub">${esc(t('prt.stu.weekHint'))}</div>
      </div>
      <div class="pt-cards">${guidePanel(planned('fullHistory'))}</div>
    </section>

    <section class="pt-section">
      ${secHead('grid', 'prt.band.quickTitle', 'prt.band.quickHint')}
      ${quickTiles('student')}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
