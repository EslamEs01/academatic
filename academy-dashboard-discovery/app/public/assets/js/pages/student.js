/* Student academic profile (Spec 004, US5/US6/US7/US8) — the "real academy
 * platform" centerpiece: a baked, tabbed PAGE (NOT a portal). Banner (student +
 * family link + lifecycle status + level + overall progress) over the Spec 003
 * tabs widget: Overview / Courses / Timetable / Results / Evaluation / Family /
 * Notes. Timetable reuses scheduleAgenda + the shared appointment drawer + a
 * deep-link to schedule.html#view=timetable. Results/Evaluation are FIXTURE-ONLY
 * (no gradebook, no workflow). One representative student is baked (Django → student/<id>). */
import { STUDENTS, STUDENT_BY_ID, studentsOfFamily, GROUP_BY_ID } from '../fixtures/students.js';
import { familyOf } from '../fixtures/families.js';
import { SCHEDULE_WEEK } from '../fixtures/schedule.js';
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { avatar, chip, button } from '../components/ui.js';
import { profileBanner } from '../components/profile-banner.js';
import { familyStatusChip } from '../components/family-status.js';
import { tabs } from '../components/tabs.js';
import { sheetRow } from '../components/preview-drawer.js';
import { scheduleAgenda } from '../components/schedule-agenda.js';
import { appointmentTemplate } from '../components/appointment-details.js';
import { attentionFlag } from '../components/attention-flag.js';
import { progressBar } from '../components/sparkline.js';
import { resultSummary } from '../components/result-summary.js';
import { evaluationRubric } from '../components/evaluation-rubric.js';

const BLOCK_BY_ID = {};
SCHEDULE_WEEK.forEach((d) => d.blocks.forEach((b) => { BLOCK_BY_ID[b.id] = { ...b, dayNameKey: d.nameKey }; }));

const ptone = (p) => (p >= 70 ? 'success' : p >= 40 ? 'sky' : 'amber');
const schedHref = () => (getLang() === 'en' ? 'schedule.en.html#view=timetable' : 'schedule.html#view=timetable');
const familyHref = () => (getLang() === 'en' ? 'family.en.html' : 'family.html');
const studentHref = () => (getLang() === 'en' ? 'student.en.html' : 'student.html');

const COURSE_STATUS = {
  active: { tone: 'live', icon: 'play', labelKey: 'sp.courseStatus.active' },
  completed: { tone: 'completed', icon: 'check-circle', labelKey: 'sp.courseStatus.completed' },
  paused: { tone: 'amber', icon: 'pause-circle', labelKey: 'sp.courseStatus.paused' },
};
const courseStatusChip = (id) => { const s = COURSE_STATUS[id] || COURSE_STATUS.active; return chip({ labelKey: s.labelKey, tone: s.tone, icon: s.icon }); };

function apptItem(b, st, fam) {
  return {
    id: b.id, titleKey: b.titleKey, statusId: b.statusId, start: b.start, end: b.end,
    trainer: b.trainer, students: b.students, familyKey: fam ? fam.guardian.nameKey : undefined,
    subjectKey: `data.subj.${b.subject}`, levelKey: b.levelKey, roomKey: b.roomKey,
    roomLinkKey: b.roomLinkKey, attention: b.attention, dateKey: b.dayNameKey,
  };
}

function familyLinkChip(fam) {
  return `<a href="${familyHref()}" class="chip tone-neutral" style="text-decoration:none">${icon('families', 'ico')}<span>${esc(t(fam.guardian.nameKey))}</span></a>`;
}

function siblingRow(c) {
  return `<a href="${studentHref()}" class="people-row">
    ${avatar({ nameKey: c.nameKey, accent: c.accent, size: 'sm' })}
    <div class="min-w-0 flex-1">
      <div class="font-bold text-[13.5px] text-ink truncate">${t(c.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t(c.levelKey)} · ${num(c.progress)}%</div>
    </div>
    ${familyStatusChip(c.statusId)}${icon('chevronEnd', 'ico')}
  </a>`;
}

/* ---- tab panels ---- */
function overviewPanel(st, fam, blocks) {
  const facts = `<div class="info-card">
    <div class="ic-title">${icon('user', 'ico')}<span>${t('sp.ov.title')}</span></div>
    ${sheetRow(t('sp.ov.status'), familyStatusChip(st.statusId))}
    ${sheetRow(t('sp.ov.level'), t(st.levelKey))}
    ${sheetRow(t('sp.ov.subject'), t(st.subjectKey))}
    ${sheetRow(t('sp.ov.family'), `<a href="${familyHref()}" class="link-more">${esc(t(fam.guardian.nameKey))}</a>`)}
    ${sheetRow(t('sp.ov.joined'), t('data.stud.joined'))}
  </div>`;
  const progress = `<div class="info-card">
    <div class="flex items-center justify-between gap-3 mb-2.5">
      <div class="ic-title" style="margin-bottom:0">${icon('trending-up', 'ico')}<span>${t('sp.kpi.progress')}</span></div>
      <span class="font-bold tabular text-ink" style="font-size:18px">${num(st.progress)}%</span>
    </div>
    ${progressBar(st.progress, ptone(st.progress))}
    <div class="flex flex-wrap items-center gap-2 mt-4">
      <button type="button" class="btn btn-secondary btn-sm" data-tab="results">${icon('trending-up', 'ico ico-sm')}<span>${t('sp.tab.results')}</span></button>
      <button type="button" class="btn btn-secondary btn-sm" data-tab="evaluation">${icon('sparkles', 'ico ico-sm')}<span>${t('sp.tab.evaluation')}</span></button>
    </div>
  </div>`;
  const attn = st.attention
    ? `<div class="info-card" style="margin-top:16px"><div class="ic-title">${icon('alert-triangle', 'ico')}<span>${t('sp.ov.attentionTitle')}</span></div>${attentionFlag(st.attention)}</div>`
    : '';
  return `<div class="grid gap-4 sm:grid-cols-2">${facts}${progress}</div>${attn}`;
}

function coursesPanel(st) {
  if (!st.enrollments || !st.enrollments.length) return `<div class="empty-row">${t('sp.courses.none')}</div>`;
  const cards = st.enrollments.map((e) => {
    const tags = [
      e.groupId ? chip({ labelKey: GROUP_BY_ID[e.groupId] && GROUP_BY_ID[e.groupId].nameKey, tone: 'neutral', icon: 'students' }) : '',
      e.certificateKey ? chip({ labelKey: 'sp.courses.cert', tone: 'completed', icon: 'award' }) : '',
    ].join('');
    return `<div class="course-card">
      <div class="cc-head">
        <div class="min-w-0">
          <h3 class="font-bold text-ink text-[14px] truncate">${t(e.courseTitleKey)}</h3>
          <div class="flex items-center gap-2 mt-1">${avatar({ nameKey: e.teacherNameKey, accent: e.accent, size: 'sm' })}<span class="text-[12px] truncate" style="color:var(--c-ink-3)">${t(e.teacherNameKey)}</span></div>
        </div>
        ${courseStatusChip(e.statusId)}
      </div>
      <div class="flex items-center gap-2">${progressBar(e.progress, ptone(e.progress))}<span class="text-[12px] tabular" style="color:var(--c-ink-3)">${num(e.progress)}%</span></div>
      ${tags ? `<div class="flex flex-wrap gap-1.5">${tags}</div>` : ''}
    </div>`;
  }).join('');
  const add = button({ labelKey: 'common.add', variant: 'secondary', size: 'sm', icon: 'plus', disabled: true, reasonKey: 'set.reason.backend' });
  return `<div class="grid gap-4 sm:grid-cols-2 mb-4">${cards}</div>${add}`;
}

function timetablePanel(blocks) {
  const link = `<a href="${schedHref()}" class="link-more">${t('sp.timetable.viewInSchedule')} ${icon('arrow-left', 'ico ico-sm')}</a>`;
  const body = blocks.length ? scheduleAgenda(blocks) : `<div class="empty-row">${t('sp.timetable.none')}</div>`;
  return `<div class="flex items-center justify-between gap-3 mb-3"><h2 class="section-title">${t('sp.timetable.title')}</h2>${link}</div>${body}`;
}

function familyPanel(st, fam, siblings) {
  const famCard = `<a href="${familyHref()}" class="people-row" style="padding:14px">
    ${avatar({ nameKey: fam.guardian.nameKey, accent: fam.guardian.accent })}
    <div class="min-w-0 flex-1">
      <div class="font-bold text-[14px] text-ink truncate">${t(fam.guardian.nameKey)}</div>
      <div class="text-[12px]" style="color:var(--c-ink-3)">${t('sp.family.guardian')} · <span dir="ltr">${t(fam.guardian.contact.phoneKey)}</span></div>
    </div>
    ${familyStatusChip(fam.statusId)}${icon('chevronEnd', 'ico')}
  </a>`;
  const sibs = siblings.length ? siblings.map(siblingRow).join('') : `<div class="empty-row">${t('sp.family.noSiblings')}</div>`;
  return `
    <div class="mb-5">${famCard}</div>
    <h3 class="section-title mb-3">${t('sp.family.siblings')}</h3>
    ${sibs}`;
}

function notesPanel(st) {
  return `<div class="info-card">
    <div class="ic-title">${icon('file-text', 'ico')}<span>${t('sp.notes.title')}</span></div>
    <p class="narrative">${t(st.notesKey)}</p>
    <div class="mt-4">${button({ labelKey: 'common.add', variant: 'secondary', size: 'sm', icon: 'edit', attrs: `data-demo-action data-toast="${esc(t('sp.act.editToast'))}"` })}</div>
  </div>`;
}

export function renderStudent() {
  const st = STUDENT_BY_ID.st1 || STUDENTS.rows[0];
  const fam = familyOf(st.familyId);
  const siblings = studentsOfFamily(st.familyId).filter((s) => s.id !== st.id);
  const blocks = [...new Set(st.upcomingSessionIds)].map((id) => BLOCK_BY_ID[id]).filter(Boolean);
  const certs = (st.results && st.results.certificates) ? st.results.certificates.length : 0;

  const banner = profileBanner({
    avatarHTML: avatar({ nameKey: st.nameKey, accent: st.accent }),
    name: t(st.nameKey),
    statusHTML: familyStatusChip(st.statusId),
    metaHTML: familyLinkChip(fam)
      + chip({ labelKey: undefined, label: t(st.levelKey), tone: 'neutral', icon: 'graduation-cap' })
      + `<span class="flex items-center gap-2" style="flex-basis:100%;max-width:280px;margin-top:4px"><span style="flex:1">${progressBar(st.progress, ptone(st.progress))}</span><span class="text-[12px] font-bold tabular" style="color:var(--c-ink-2)">${num(st.progress)}%</span></span>`,
    kpis: [
      { value: t(st.levelKey), labelKey: 'sp.kpi.level' },
      { value: num(st.enrollments.length), labelKey: 'sp.kpi.courses' },
      { value: num(certs), labelKey: 'res.certificates' },
      { value: num(blocks.length), labelKey: 'fam.kpi.sessions' },
    ],
    actionsHTML:
      button({ labelKey: 'sp.act.message', variant: 'secondary', size: 'sm', icon: 'message-circle', attrs: `data-demo-action data-toast="${esc(t('sp.act.messageToast'))}"` })
      + button({ labelKey: 'sp.act.edit', variant: 'secondary', size: 'sm', icon: 'edit', attrs: `data-demo-action data-toast="${esc(t('sp.act.editToast'))}"` }),
  });

  const views = tabs({
    group: 'student', ariaKey: 'sp.profileTitle',
    items: [
      { id: 'overview', labelKey: 'sp.tab.overview', icon: 'user' },
      { id: 'courses', labelKey: 'sp.tab.courses', icon: 'book-open' },
      { id: 'timetable', labelKey: 'sp.tab.timetable', icon: 'schedule' },
      { id: 'results', labelKey: 'sp.tab.results', icon: 'trending-up' },
      { id: 'evaluation', labelKey: 'sp.tab.evaluation', icon: 'sparkles' },
      { id: 'family', labelKey: 'sp.tab.family', icon: 'families' },
      { id: 'notes', labelKey: 'sp.tab.notes', icon: 'file-text' },
    ],
    panels: {
      overview: overviewPanel(st, fam, blocks),
      courses: coursesPanel(st),
      timetable: timetablePanel(blocks),
      results: resultSummary(st.results),
      evaluation: evaluationRubric(st.evaluation),
      family: familyPanel(st, fam, siblings),
      notes: notesPanel(st),
    },
  });

  const templates = blocks.map((b) => appointmentTemplate(apptItem(b, st, fam))).join('');

  return `${banner}${views}${templates}`;
}
