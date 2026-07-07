/* Spec 020 — FAMILY PROGRESS (fam1). The guardian's per-child learning view: the
 * family summary trio (the RETAINED 014 register re-rendered), five per-child cards
 * (authored bar + attendance hint + signal) each with the REAL drill-down into the
 * child file, and the RETAINED teacher notes re-homed. Zero charts/rank/comparison;
 * the body's only anchors are the five child links. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { pageHead, secHead } from '../components/portal-page.js';
import { STUDENT_BY_ID } from '../fixtures/students.js';
import { FAMILY_PREVIEW, CHILD_PROFILE, CHILD_ORDER } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const enSuffix = () => (getLang() === 'en' ? '.en' : '');
const childName = (id) => t(STUDENT_BY_ID[id].nameKey);

function statTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}

function childCard(id) {
  const s = STUDENT_BY_ID[id];
  const att = CHILD_PROFILE[id].attendance;
  const href = `family-child${enSuffix()}.html#child=${id}`;
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(FAMILY_PREVIEW.kidHints[id]))}</div>
      </div>
    </div>
    <div class="pt-gauge">
      <div class="pt-bar"><span style="width:${s.progress}%"></span></div>
      <span class="tabular pt-card-sub" style="font-weight:700">${num(s.progress)}${pctSign()}</span>
    </div>
    <div class="pt-tags">
      <span class="pt-tag">${icon('check-circle', 'ico ico-sm')}${esc(t('prt.child.att.attended'))} <span class="tabular">${num(att.attended)}</span></span>
      <span class="pt-tag">${icon('clock', 'ico ico-sm')}${esc(t('prt.child.att.upcoming'))} <span class="tabular">${num(att.upcoming)}</span></span>
    </div>
    <a class="pt-drill" href="${href}">${icon('user', 'ico ico-sm')}<span>${esc(t('prt.fam.pg.prog.openFile'))}</span></a>
  </div>`;
}

function noteCard(n) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: 'message-circle', tone: 'primary' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(childName(n.studentId))} — ${esc(t(n.teacherKey))}</div>
        <p class="pt-card-sub">${esc(t(n.noteKey))}</p>
      </div>
    </div>
  </div>`;
}

export function renderFamilyProgress() {
  const att = FAMILY_PREVIEW.attendance;
  return `
    ${pageHead('prt.fam.pg.prog.title', 'prt.fam.pg.prog.sub')}

    <section class="pt-section">
      ${secHead('trending-up', 'prt.fam.pg.prog.famTitle', 'prt.fam.progHint')}
      <div class="pt-cards pt-cards-3">
        ${statTile('check-circle', 'success', att.attended, 'prt.fam.att.attended')}
        ${statTile('clock', 'sky', att.upcoming, 'prt.fam.att.upcoming')}
        ${statTile('alert-triangle', 'amber', att.followUp, 'prt.fam.att.followUp')}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('families', 'prt.fam.pg.prog.kidsTitle', 'prt.fam.kidsHint')}
      <div class="pt-cards">${CHILD_ORDER.map(childCard).join('')}</div>
    </section>

    <section class="pt-section">
      ${secHead('message-circle', 'prt.fam.notesTitle', 'prt.fam.notesHint')}
      <div class="pt-cards">${FAMILY_PREVIEW.teacherNotes.map(noteCard).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
