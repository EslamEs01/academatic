/* Spec 019 — STUDENT HOMEWORK (st1). Compact: a KPI trio, then homework grouped by
 * state (pending / in-progress / reviewed), due + state chips, teacher-note lines on
 * reviewed items, and the honest submit/upload gate (the re-homed hwSubmit). Zero
 * forms, zero body anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, chip } from '../components/ui.js';
import { courseOf } from '../fixtures/courses.js';
import { pageHead, secHead, kpiRow, plannedCard } from '../components/portal-page.js';
import { STUDENT_PAGES, PORTAL_PLANNED } from '../fixtures/portal.js';

const courseName = (id) => t(courseOf(id).titleKey);
const STATE = {
  pending: { tone: 'amber', labelKey: 'prt.stu.pg.hw.stPending', icon: 'clock' },
  inProgress: { tone: 'upcoming', labelKey: 'prt.stu.pg.hw.stInProgress', icon: 'clock' },
  reviewed: { tone: 'completed', labelKey: 'prt.stu.pg.hw.stReviewed', icon: 'check-circle' },
};
const submitGate = () => PORTAL_PLANNED.student.find((p) => p.id === 'hwSubmit');

function hwCard(h) {
  const st = STATE[h.stateId];
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'tasks', tone: 'sky' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(h.titleKey))}</div>
        <div class="pt-card-sub">${esc(courseName(h.courseId))}</div>
      </div>
      ${chip({ labelKey: st.labelKey, tone: st.tone, icon: st.icon })}
    </div>
    <div class="pt-tags">
      <span class="pt-tag is-accent">${icon('clock', 'ico ico-sm')}${esc(t(h.dueKey))}</span>
    </div>
    ${h.noteKey ? `<p class="pt-card-sub"><strong>${esc(t('prt.stu.pg.hw.noteLabel'))}:</strong> ${esc(t(h.noteKey))}</p>` : ''}
  </div>`;
}

function stateSection(icn, titleKey, stateId) {
  const rows = STUDENT_PAGES.homework.records.filter((h) => h.stateId === stateId);
  return `<section class="pt-section">
    ${secHead(icn, titleKey)}
    ${rows.length
      ? `<div class="pt-cards">${rows.map(hwCard).join('')}</div>`
      : `<div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.stu.pg.hw.empty'))}</span></div>`}
  </section>`;
}

export function renderStudentHomework() {
  return `
    ${pageHead('prt.stu.pg.hw.title', 'prt.stu.pg.hw.sub')}

    <section class="pt-section">
      ${secHead('trending-up', 'prt.band.overview', 'prt.band.overviewHint')}
      ${kpiRow(STUDENT_PAGES.homework.kpis, 'sky')}
    </section>

    ${stateSection('clock', 'prt.stu.pg.hw.secPending', 'pending')}
    ${stateSection('tasks', 'prt.stu.pg.hw.secProgress', 'inProgress')}
    ${stateSection('check-circle', 'prt.stu.pg.hw.secReviewed', 'reviewed')}

    <section class="pt-section">
      <div class="pt-cards">${plannedCard(submitGate())}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
