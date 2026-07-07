/* Spec 019 — STUDENT MATERIALS (st1). Compact: learning files grouped by course with
 * type chips, and the honest download/open gate (the re-homed matDownload). NO
 * marketing hero (the legacy library anti-pattern), NO fake file links, NO filter
 * theater. Zero body anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, chip } from '../components/ui.js';
import { courseOf } from '../fixtures/courses.js';
import { pageHead, plannedCard } from '../components/portal-page.js';
import { STUDENT_PAGES, PORTAL_PLANNED } from '../fixtures/portal.js';

const courseName = (id) => t(courseOf(id).titleKey);
const downloadGate = () => PORTAL_PLANNED.student.find((p) => p.id === 'matDownload');

function matCard(m) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: m.typeIcon, tone: 'sky' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(m.titleKey))}</div>
      </div>
      ${chip({ labelKey: m.typeKey, tone: 'neutral', icon: m.typeIcon })}
    </div>
  </div>`;
}

function group(g) {
  return `<section class="pt-section">
    <div class="pt-sec-head"><h2 class="pt-sec-title">${icon('curricula', 'ico')}${esc(courseName(g.courseId))}</h2></div>
    ${g.items.length
      ? `<div class="pt-cards">${g.items.map(matCard).join('')}</div>`
      : `<div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.stu.pg.mat.empty'))}</span></div>`}
  </section>`;
}

export function renderStudentMaterials() {
  return `
    ${pageHead('prt.stu.pg.mat.title', 'prt.stu.pg.mat.sub')}

    ${STUDENT_PAGES.materials.groups.map(group).join('')}

    <section class="pt-section">
      <div class="pt-cards">${plannedCard(downloadGate())}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.stu.noteT'))}</strong> — ${esc(t('prt.band.noteStu'))}</span></div>
  `;
}
