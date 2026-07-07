/* Spec 025 — TEACHER LIBRARY (sara's teaching resources). A display-only shelf of
 * the authored teaching materials (TEACHER_PREVIEW.materials tm1/tm2/tm3): each card
 * carries the file type icon, an authored type chip, an authored publish-status chip,
 * and the authored linked-course label. Adding a new resource and pulling one down are
 * both honest backendRequired gates (no fake upload/download/open/delete/cloud-sync).
 * Display-only; NO computed values; ZERO figure-bearing/flagged vocabulary anywhere
 * (copy AND comments — the standing teacher hard rule); zero body anchors. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHead, secHead, gateNote } from '../components/portal-page.js';
import { chip } from '../components/ui.js';
import { TEACHER_PREVIEW } from '../fixtures/portal.js';

/* authored type label per file-type icon (display-only classification, no scale) */
const TYPE_KEY_BY_ICON = {
  'file-text': 'prt.tch.pg.library.typeDoc',
  play: 'prt.tch.pg.library.typeVideo',
  materials: 'prt.tch.pg.library.typeSlides',
};

function resourceCard(m) {
  const typeKey = TYPE_KEY_BY_ICON[m.typeIcon] || 'prt.tch.pg.library.typeDoc';
  return `<div class="pt-card">
    <div class="pt-card-row">
      <span class="pt-time">${icon(m.typeIcon, 'ico')}</span>
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(m.titleKey))}</div>
        <div class="pt-card-sub">${esc(t('prt.tch.pg.library.course1'))}</div>
      </div>
      ${chip({ labelKey: 'prt.tch.pg.library.statusPublished', tone: 'completed', icon: 'check-circle' })}
    </div>
    <div class="pt-tags">
      ${chip({ labelKey: typeKey, tone: 'neutral', icon: m.typeIcon })}
    </div>
  </div>`;
}

export function renderTeacherLibrary() {
  return `
    ${pageHead('prt.tch.pg.library.title', 'prt.tch.pg.library.sub')}

    <section class="pt-section">
      ${secHead('materials', 'prt.tch.pg.library.title', 'prt.tch.pg.library.resHint')}
      <div class="pt-cards">${TEACHER_PREVIEW.materials.map(resourceCard).join('')}</div>
    </section>

    ${gateNote('prt.tch.pg.library.uploadGate')}
    ${gateNote('prt.tch.pg.library.downloadGate')}

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.tch.noteT'))}</strong> — ${esc(t('prt.band.noteTch'))}</span></div>
  `;
}
