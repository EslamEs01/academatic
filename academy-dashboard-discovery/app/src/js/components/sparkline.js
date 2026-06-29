/* Hand-rolled mini visuals — inline SVG/CSS only, NO chart library.
 * tone maps to the accent token via stroke="var(--c-<tone>)". */

const TONE_VAR = {
  amber: 'var(--c-amber)', success: 'var(--c-success)', teal: 'var(--c-teal)',
  primary: 'var(--c-primary)', sky: 'var(--c-sky)', coral: 'var(--c-coral)',
};

/** smooth-ish line sparkline with a soft area fill */
export function sparkline(values, tone = 'primary', { w = 120, h = 36 } = {}) {
  const color = TONE_VAR[tone] || TONE_VAR.primary;
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const pad = 3;
  const step = (w - pad * 2) / (values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (v - min) / span);
    return [x, y];
  });
  const line = pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `M${pts[0][0].toFixed(1)},${h} L${line.replace(/ /g, ' L')} L${pts[pts.length - 1][0].toFixed(1)},${h} Z`;
  const gid = `sg-${tone}-${Math.round(values[values.length - 1])}`;
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none" aria-hidden="true">
    <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#${gid})" />
    <polyline points="${line}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/** thin progress bar */
export function progressBar(percent, tone = 'success') {
  const color = TONE_VAR[tone] || TONE_VAR.success;
  const p = Math.max(0, Math.min(100, percent));
  return `<div class="progress-track" role="img" aria-hidden="true"><div class="progress-fill" style="width:${p}%;background:${color}"></div></div>`;
}

/** circular progress ring (attendance) */
export function ring(percent, tone = 'success', { size = 64, stroke = 7 } = {}) {
  const color = TONE_VAR[tone] || TONE_VAR.success;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(100, percent));
  const off = c * (1 - p / 100);
  const cx = size / 2;
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" class="att-ring">
    <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="var(--c-surface-2)" stroke-width="${stroke}"/>
    <circle cx="${cx}" cy="${cx}" r="${r}" fill="none" stroke="${color}" stroke-width="${stroke}" stroke-linecap="round"
      stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}" transform="rotate(-90 ${cx} ${cx})"/>
  </svg>`;
}
