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
import { medallion, avatar } from './ui.js';
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

/* ─────────────────────────────────────────────────────────────────────────────
 * Spec 022 — the LIVING primitives (ADDITIVE; the six exports above stay byte-
 * identical). Shared by the reworked hub + role homes. All display-only, no new
 * hooks/storage keys, every number via num() (Arabic-Indic on Arabic pages). The
 * CSS (.pt-idhero/.pt-rail/.pt-story/.pt-flow/.pt-guide) carries the motion, all
 * of it quarantined behind prefers-reduced-motion: no-preference. */

/* role identity hero — a page-wide gradient band (avatar + greeting + role identity
 * counters, each with a one-line story). Replaces the plain head + KPI overview. */
function heroStat(c) {
  const pct = c.format === 'percent' ? pctSign() : '';
  return `<div class="pt-idhero-stat">
    <div class="pt-idhero-stat-top">${medallion({ icon: c.icon, tone: c.tone, size: 'sm' })}<span class="pt-idhero-stat-num tabular">${num(c.value)}${pct}</span></div>
    <div class="pt-idhero-stat-label">${esc(t(c.labelKey))}</div>
    <div class="pt-idhero-stat-story">${esc(t(c.storyKey))}</div>
  </div>`;
}
export function idHero({ nameKey, accent, tone, emoji, subKey, counters }) {
  return `<section class="pt-idhero">
    <div class="pt-idhero-top">
      ${avatar({ nameKey, accent })}
      <div style="flex:1;min-width:0">
        <h1 class="pt-idhero-hi">${esc(t('prt.shell.greet'))} ${esc(t(nameKey))}${emoji ? ` ${emoji}` : ''}</h1>
        <p class="pt-idhero-sub">${esc(t(subKey))}</p>
      </div>
    </div>
    <div class="pt-idhero-stats">${counters.map((c) => heroStat({ ...c, tone })).join('')}</div>
  </section>`;
}

/* living day rail — today as now / next / done stops. Each stop is pre-built HTML
 * from the caller (title/sub/tag/chip) so the rail stays content-agnostic. */
function stopCard(s) {
  const cls = s.state === 'now' ? ' is-now' : s.state === 'next' ? ' is-next' : s.state === 'done' ? ' is-done' : '';
  return `<div class="pt-stop${cls}">
    <span class="pt-stop-dot"></span>
    <div class="pt-stop-main">
      <div class="pt-stop-row"><span class="pt-stop-time tabular">${esc(s.time)}</span>${s.tag || ''}${s.chip || ''}</div>
      <div class="pt-stop-title">${s.title}</div>
      ${s.sub ? `<div class="pt-stop-sub">${s.sub}</div>` : ''}
    </div>
  </div>`;
}
export function dayRail(stops) { return `<div class="pt-rail">${stops.map(stopCard).join('')}</div>`; }

/* status story rows — a number/status that tells a story (icon + title + one line).
 * Display-only; the medallion tone is the caller's (never color-only — icon + text). */
export function storyRow(stories) {
  const toneMap = { completed: 'success', neutral: 'muted' };
  return stories.map((s) => `<div class="pt-story">
    ${medallion({ icon: s.icon, tone: toneMap[s.tone] || s.tone })}
    <div class="pt-story-main">
      <div class="pt-story-title">${esc(t(s.titleKey))}</div>
      <div class="pt-story-sub">${esc(t(s.subKey))}</div>
    </div>
  </div>`).join('');
}

/* workflow flow strip — a numbered prepare → … → review sequence; a gated step
 * carries the dashed treatment (the honest availability note lives beside it). */
export function flowStrip(steps) {
  return `<div class="pt-flow">${steps.map((s, i) => `<div class="pt-flow-step${s.gated ? ' is-gated' : ''}">
    <div class="pt-flow-head"><span class="pt-flow-num tabular">${num(i + 1)}</span>${icon(s.icon, 'ico ico-sm')}</div>
    <div class="pt-flow-title">${esc(t(s.titleKey))}</div>
    <div class="pt-flow-sub">${esc(t(s.subKey))}</div>
  </div>`).join('')}</div>`;
}

/* guided gate panel — a visual upgrade of plannedCard: same .pt-planned + labeled
 * availability chip (so it stays a non-anchor honest gate), plus one line that
 * explains what happens when the server is live. NEVER interactive. */
export function guidePanel(p) {
  return `<div class="pt-card pt-planned pt-guide">
    <div class="pt-card-row">
      ${medallion({ icon: p.icon, tone: 'muted' })}
      <div style="flex:1;min-width:0">
        <div class="pt-card-title">${esc(t(p.titleKey))}</div>
        <div class="pt-card-sub">${esc(t(p.descKey))}</div>
      </div>
    </div>
    <div class="pt-guide-line">${icon('help', 'ico ico-sm')}<span>${esc(t('prt.lv.guideWhenLive'))}</span></div>
    ${availabilityChip(p.availability)}
  </div>`;
}
