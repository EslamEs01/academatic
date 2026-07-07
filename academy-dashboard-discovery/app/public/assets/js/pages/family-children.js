/* Spec 020 — FAMILY CHILDREN (fam1's directory). The legacy "All Account
 * Subscriptions" idea rebuilt: one rich card per child (identity · course/group/
 * teacher · lifecycle chip · subscription label · authored progress + hint) with
 * the REAL drill-down into the child file. Display-only; the body's only anchors
 * are the five `family-child(.en).html#child=stX` links; zero forms. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion, avatar } from '../components/ui.js';
import { familyStatusChip } from '../components/family-status.js';
import { pageHead, secHead } from '../components/portal-page.js';
import { STUDENT_BY_ID, GROUP_BY_ID } from '../fixtures/students.js';
import { FAMILY_PREVIEW, FAMILY_PAGES, CHILD_ORDER } from '../fixtures/portal.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');
const enSuffix = () => (getLang() === 'en' ? '.en' : '');

function childCard(row) {
  const s = STUDENT_BY_ID[row.childId];
  const e0 = s.enrollments[0];
  const groupKey = s.groupIds && s.groupIds.length ? GROUP_BY_ID[s.groupIds[0]].nameKey : null;
  const href = `family-child${enSuffix()}.html#child=${s.id}`;
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${avatar({ nameKey: s.nameKey, accent: s.accent, size: 'sm' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(s.nameKey))}</div>
        <div class="pt-card-sub">${esc(t(s.levelKey))} · ${esc(t(s.subjectKey))}</div>
      </div>
      ${familyStatusChip(s.statusId)}
    </div>
    <div class="pt-card-sub">${esc(t(e0.courseTitleKey))}${groupKey ? ` · ${esc(t(groupKey))}` : ''} · ${esc(t(e0.teacherNameKey))}</div>
    <div class="pt-gauge">
      <div class="pt-bar"><span style="width:${s.progress}%"></span></div>
      <span class="tabular pt-card-sub" style="font-weight:700">${num(s.progress)}${pctSign()}</span>
    </div>
    <div class="pt-card-sub">${esc(t(FAMILY_PREVIEW.kidHints[s.id]))}</div>
    <div class="pt-tags"><span class="pt-tag">${icon('certificates', 'ico ico-sm')}${esc(t('prt.fam.pg.kids.subLabel'))}: ${esc(t(row.subscriptionKey))}</span></div>
    <a class="pt-drill" href="${href}">${icon('user', 'ico ico-sm')}<span>${esc(t('prt.band.openChild'))}</span></a>
  </div>`;
}

export function renderFamilyChildren() {
  const rows = FAMILY_PAGES.children;
  return `
    ${pageHead('prt.fam.pg.kids.title', 'prt.fam.pg.kids.sub')}

    <section class="pt-section">
      ${secHead('families', 'prt.fam.kidsTitle', 'prt.fam.kidsHint', ` <span class="pt-role-chip" style="font-size:11px">${num(rows.length)}</span>`)}
      <div class="pt-card pt-stat">
        <div class="pt-card-row">${medallion({ icon: 'families', tone: 'primary' })}<span class="pt-gauge-num tabular">${num(rows.length)}</span></div>
        <div class="pt-stat-label">${esc(t('prt.fam.pg.kids.countHint'))}</div>
      </div>
      <div class="pt-cards">${CHILD_ORDER.map((id) => childCard(rows.find((r) => r.childId === id))).join('')}</div>
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
