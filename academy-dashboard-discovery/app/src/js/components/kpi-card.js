/* KPI/stat card — medallion + trend pill + large tabular value + label + mini visual. */
import { t, num } from '../i18n.js';
import { medallion, trendPill } from './ui.js';
import { sparkline, progressBar } from './sparkline.js';

function formatValue(k) {
  if (k.format === 'percent') return `${num(k.value)}%`;
  return num(k.value);
}

export function kpiCard(k) {
  const unit = k.unitKey ? ` <span class="text-[14px] font-bold" style="color:var(--c-ink-2)">${t(k.unitKey)}</span>` : '';
  const mini = k.sparkKind === 'progress'
    ? `<div class="pt-1">${progressBar(k.value, k.tone)}</div>`
    : `<div class="-mx-1 -mb-1 pt-1">${sparkline(k.spark, k.tone)}</div>`;
  return `<div class="kpi tone-${k.tone}">
    <div class="kpi-glow"></div>
    <div class="flex items-start justify-between mb-3">
      ${trendPill({ dir: k.trendDirection, pct: k.trendPercent })}
      ${medallion({ icon: k.icon, tone: k.tone, variant: 'soft' })}
    </div>
    <div class="kpi-value">${formatValue(k)}${unit}</div>
    <div class="kpi-label mb-2.5">${t(k.labelKey)}</div>
    ${mini}
  </div>`;
}

export function kpiRow(kpis) {
  return `<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
    ${kpis.map(kpiCard).join('')}
  </div>`;
}
