/* Spec 020 — FAMILY REQUESTS (fam1). The guardian's request world as honest
 * preview cards: trial (new/existing child — step 2 stays gated, the recorded
 * legacy gap), follow-up meetings (truthful empty), teacher feedback (the four
 * question lines), cancel/reschedule (options + caution). Every submit path is a
 * labeled backendRequired gate. Display-only; zero forms; zero body anchors. */
import { t, num } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from '../components/ui.js';
import { pageHead, secHead, plannedCard, gateNote } from '../components/portal-page.js';
import { FAMILY_PAGES, PORTAL_PLANNED } from '../fixtures/portal.js';

const R = 'prt.fam.pg.req';
const meetingGate = () => PORTAL_PLANNED.family.find((p) => p.id === 'meetingRequest');

function statTile(icn, tone, value, labelKey) {
  return `<div class="pt-card pt-stat">
    <div class="pt-card-row">${medallion({ icon: icn, tone })}<span class="pt-gauge-num tabular">${num(value)}</span></div>
    <div class="pt-stat-label">${esc(t(labelKey))}</div>
  </div>`;
}

function lineList(keys) {
  return `<div class="pt-lines">${keys.map((k) => `<div class="pt-line">${icon('check-circle', 'ico ico-sm')}<span>${esc(t(k))}</span></div>`).join('')}</div>`;
}

function typeCard(icn, titleKey, bodyHTML) {
  return `<div class="pt-card">
    <div class="pt-card-row">
      ${medallion({ icon: icn, tone: 'primary' })}
      <div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t(titleKey))}</div></div>
    </div>
    ${bodyHTML}
    ${gateNote(`${R}.gate`)}
  </div>`;
}

export function renderFamilyRequests() {
  const c = FAMILY_PAGES.requests.counts;
  return `
    ${pageHead(`${R}.title`, `${R}.sub`)}

    <section class="pt-section">
      ${secHead('help', 'prt.fam.reqTitle', 'prt.fam.reqHint')}
      <div class="pt-cards pt-cards-3">
        ${statTile('help', 'primary', c.types, `${R}.kTypes`)}
        ${statTile('clipboard-check', 'success', c.open, `${R}.kOpen`)}
      </div>
    </section>

    <section class="pt-section">
      ${secHead('families', 'prt.fam.req.trialT')}
      ${typeCard('families', 'prt.fam.req.trialT',
        `<div class="pt-tiles"><div class="pt-tile"><div class="pt-tile-t">${esc(t('prt.fam.req.trialNew'))}</div></div><div class="pt-tile"><div class="pt-tile-t">${esc(t('prt.fam.req.trialExisting'))}</div></div></div>`)}
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.fam.req.meetingsT')}
      <div class="pt-card">
        <div class="pt-card-row">${medallion({ icon: 'calendar', tone: 'primary' })}<div style="flex:1;min-width:0"><div class="pt-card-title">${esc(t('prt.fam.req.meetingsT'))}</div></div></div>
        <div class="pt-empty">${icon('sparkles', 'ico')}<span class="pt-empty-title">${esc(t('prt.fam.req.meetingsEmpty'))}</span></div>
      </div>
      <div class="pt-cards">${plannedCard(meetingGate())}</div>
    </section>

    <section class="pt-section">
      ${secHead('message-circle', 'prt.fam.req.feedbackT')}
      ${typeCard('message-circle', 'prt.fam.req.feedbackT',
        lineList(['prt.fam.req.fbQ1', 'prt.fam.req.fbQ2', 'prt.fam.req.fbQ3', 'prt.fam.req.fbQ4']))}
    </section>

    <section class="pt-section">
      ${secHead('calendar', 'prt.fam.req.cancelT')}
      ${typeCard('calendar', 'prt.fam.req.cancelT',
        `${lineList(['prt.fam.req.cancelOpt1', 'prt.fam.req.cancelOpt2'])}<div class="pt-note" style="padding:10px 12px;margin-top:8px">${icon('alert-triangle', 'ico ico-sm')}<span>${esc(t('prt.fam.req.cancelCaution'))}</span></div>`)}
    </section>

    <div class="pt-note">${icon('help', 'ico ico-sm')}<span><strong>${esc(t('prt.fam.noteT'))}</strong> — ${esc(t('prt.band.noteFam'))}</span></div>
  `;
}
