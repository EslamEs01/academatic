/* Spec 019 — shared COMPACT-page primitives for the role internal pages (portal
 * namespace only). Consumed by the six new student pages (schedule/homework/materials/
 * progress/history/profile); Specs 020/021 reuse it for family/teacher internals. The
 * logic is byte-equal to the Spec-018 home helpers — this module exists so the six new
 * modules do NOT each re-copy them (the drift the 018 clean-code review flagged). The
 * 018 home modules keep their own copies (their built output must stay byte-identical).
 * Display-only; NO computed values; comments carry zero figure-bearing/flagged tokens. */
import { t, num, getLang } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from './ui.js';
import { availabilityChip } from './report-status.js';

const pctSign = () => (getLang() === 'en' ? '%' : '٪');

/* compact page header — title + one-line purpose (the internal-page analogue of the
 * home's greeting head; same `.pt-home-head` rhythm, never the tall hero). */
export function pageHead(titleKey, subKey) {
  return `<div class="pt-home-head">
    <h1 class="pt-home-hi">${esc(t(titleKey))}</h1>
    ${subKey ? `<p class="pt-home-status">${esc(t(subKey))}</p>` : ''}
  </div>`;
}

export function secHead(icn, titleKey, hintKey, extra = '') {
  return `<div class="pt-sec-head">
    <h2 class="pt-sec-title">${icon(icn, 'ico')}${esc(t(titleKey))}${extra}</h2>
    ${hintKey ? `<span class="pt-sec-hint">${esc(t(hintKey))}</span>` : ''}
  </div>`;
}

export function kpiCard(k, tone) {
  const pct = k.format === 'percent' ? pctSign() : '';
  return `<div class="pt-kpi">
    <div class="pt-kpi-top">${medallion({ icon: k.icon, tone, size: 'sm' })}<span class="pt-gauge-num tabular">${num(k.value)}${pct}</span></div>
    <div class="pt-kpi-label">${esc(t(k.labelKey))}</div>
  </div>`;
}

export function kpiRow(kpis, tone) { return `<div class="pt-kpi-row">${kpis.map((k) => kpiCard(k, tone)).join('')}</div>`; }

/* planned / backend-gated mini-card (never an anchor; carries a labeled availability chip) */
export function plannedCard(p) {
  return `<div class="pt-card pt-planned">
    <div class="pt-card-row">
      ${medallion({ icon: p.icon, tone: 'muted' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(p.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(p.descKey))}</div>
      </div>
    </div>
    ${availabilityChip(p.availability)}
  </div>`;
}

/* an honestly-gated capability sentence (non-anchor; the labeled backendRequired chip + one line) */
export function gateNote(msgKey) {
  return `<div class="pt-note" style="padding:10px 12px">${availabilityChip('backendRequired')}<span>${esc(t(msgKey))}</span></div>`;
}
