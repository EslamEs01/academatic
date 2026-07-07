/* Spec 020 — FAMILY MATERIALS (fam1). The children's learning files grouped by
 * CHILD (the guardian's mental model — the legacy category dropdown replaced by
 * name groups; the marketing hero killed). The RETAINED 014 items re-referenced +
 * the two NEW items so all five children are covered. Honest download gate.
 * Display-only; zero body anchors; zero fake file links. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, chip } from '../components/ui.js';
import { pageHead, plannedCard } from '../components/portal-page.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { FAMILY_PREVIEW, FAMILY_PAGES, PORTAL_PLANNED, CHILD_ORDER } from '../fixtures/portal.js';

const downloadGate = () => PORTAL_PLANNED.family.find((p) => p.id === 'matDownload');
/* the retained 014 rows (typeKey added at render time by icon) + the two new rows */
const TYPE_BY_ICON = { 'file-text': 'prt.stu.pg.mat.tPdf', play: 'prt.stu.pg.mat.tVideo', materials: 'prt.stu.pg.mat.tSheet' };
const allItems = () => [
  ...FAMILY_PREVIEW.materials.map((m) => ({ ...m, typeKey: TYPE_BY_ICON[m.typeIcon] })),
  ...FAMILY_PAGES.materials.extra,
];

function matCard(m) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: m.typeIcon, tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(m.titleKey))}</div>
      </div>
      ${chip({ labelKey: m.typeKey, tone: 'neutral', icon: m.typeIcon })}
    </div>
  </div>`;
}

function childGroup(childId) {
  const s = STUDENT_BY_ID[childId];
  const items = allItems().filter((m) => m.childId === childId);
  return `<section class="pt-section">
    <div class="pt-sec-head"><h2 class="pt-sec-title">${icon('families', 'ico')}${esc(t(s.nameKey))}</h2></div>
    ${items.length
      ? `<div class="pt-cards">${items.map(matCard).join('')}</div>`
      : `<div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.fam.pg.mat.empty'))}</span></div>`}
  </section>`;
}

export function renderFamilyMaterials() {
  return `
    ${pageHead('prt.fam.pg.mat.title', 'prt.fam.pg.mat.sub')}

    ${CHILD_ORDER.map(childGroup).join('')}

    <section class="pt-section">
      <div class="pt-cards">${plannedCard(downloadGate())}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
