/* Spec 019 — STUDENT HISTORY (st1). Compact: display-only period chips, then the
 * session-record list (the REAL out1 outcome first, then the F6 record shape: course ·
 * teacher · date · labeled outcome/summary · homework note). Filters are display-only
 * chips (no dead filters); zero body anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { outcomeChip } from '../components/outcome-status.js';
import { pageHead, secHead } from '../components/portal-page.js';
import { courseOf } from '../fixtures/courses.js';
import { OUTCOME_BY_ID } from '../fixtures/attendance.js';
import { STUDENT_PAGES } from '../fixtures/portal.js';

const courseName = (id) => t(courseOf(id).titleKey);

function historyCard(h) {
  if (h.outcomeId) {
    const o = OUTCOME_BY_ID[h.outcomeId];
    return `<div class="pt-card">
      <div class="pt-card-row">
        ${medallion({ icon: 'clipboard-check', tone: 'success' })}
        <div style="flex:1;min-width:0">
          <div class="pt-card-title">${esc(courseName('c1'))} — ${esc(t(o.trainer.nameKey))}</div>
          <div class="pt-card-sub">${esc(t('prt.stu.hist.daySun'))}</div>
        </div>
        ${outcomeChip(o.outcomeId)}
      </div>
      <p class="pt-card-sub">${esc(t(o.feedbackKey))}</p>
    </div>`;
  }
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'clipboard-check', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(courseName(h.courseId))} — ${esc(t(h.teacherKey))}</div>
        <div class="pt-card-sub">${esc(t(h.dayKey))}</div>
      </div>
    </div>
    <p class="pt-card-sub">${esc(t(h.summaryKey))}</p>
    <p class="pt-card-sub">${esc(t(h.homeworkKey))}</p>
    ${h.hasAttachment ? `<span class="pt-attach">${icon('file-text', 'ico ico-sm')}${esc(t('prt.stu.histAttach'))}</span>` : ''}
  </div>`;
}

export function renderStudentHistory() {
  const periods = ['prt.stu.pg.hist.pAll', 'prt.stu.pg.hist.pMonth', 'prt.stu.pg.hist.pPrev'];
  return `
    ${pageHead('prt.stu.pg.hist.title', 'prt.stu.pg.hist.sub')}

    <section class="pt-section">
      ${secHead('clipboard-check', 'prt.stu.histTitle', 'prt.stu.histHint')}
      <div class="pt-tags">${periods.map((k, i) => `<span class="pt-tag${i === 0 ? ' is-accent' : ''}">${esc(t(k))}</span>`).join('')}</div>
      <div class="pt-cards">${STUDENT_PAGES.history.records.map(historyCard).join('')}</div>
      <div class="pt-note" style="padding:10px 12px">${icon('sparkles', 'ico ico-sm')}<span>${esc(t('prt.stu.pg.hist.empty'))}</span></div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
