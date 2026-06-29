/* Hand-rolled weekly timetable grid (days × cropped working hours). NO calendar
 * library. Block placement — grid-row span + overlap sub-columns — is computed
 * HERE at BUILD time and baked as CSS custom properties; runtime JS never lays
 * it out. Source order is corner → axis → guides → (per day: head then its
 * blocks), so the SAME markup reflows to a stacked agenda on mobile via CSS. */
import { t } from '../i18n.js';
import { esc } from '../dom.js';
import { timeBlock } from './time-block.js';

const toMin = (hhmm) => { const [h, m] = String(hhmm).split(':').map(Number); return h * 60 + (m || 0); };

export function timetableGrid(days, { gridAria = 'tt.gridAria' } = {}) {
  const all = days.flatMap((d) => d.blocks || []);
  if (!all.length) return `<div class="timetable-scroll"><div class="agenda-empty">${t('tt.emptyWeek')}</div></div>`;

  // cropped axis: floor(min start hour) .. ceil(max end hour), 30-min slots
  const startM = Math.floor(Math.min(...all.map((b) => toMin(b.start))) / 60) * 60;
  const endM = Math.ceil(Math.max(...all.map((b) => toMin(b.end))) / 60) * 60;
  const slots = Math.max(2, Math.round((endM - startM) / 30));
  const rowOf = (m) => Math.round((m - startM) / 30) + 2; // +2: row 1 is the day-header row

  // axis hour labels (column 1)
  let axis = '';
  for (let m = startM; m <= endM; m += 60) {
    axis += `<div class="tt-axis-label tabular" style="grid-row:${rowOf(m)}">${String(m / 60).padStart(2, '0')}:00</div>`;
  }

  let guides = '';
  let body = ''; // per-day: head immediately followed by its blocks (mobile source order)
  days.forEach((d, di) => {
    const col = di + 2; // +2: column 1 is the axis
    guides += `<div class="tt-colguide ${d.isToday ? 'is-today' : ''}" style="--col:${col}"></div>`;
    body += `<div class="tt-day-head ${d.isToday ? 'is-today' : ''}" style="--col:${col}" data-day="${esc(d.dayId)}">
      <span class="d-name">${t(d.nameKey)}</span><span class="d-date">${d.dateText || ''}</span></div>`;

    const blocks = [...(d.blocks || [])].sort((a, b) => toMin(a.start) - toMin(b.start));
    if (!blocks.length) return; // empty day: keep its header, render no blocks
    // greedy overlap lanes within the day
    const laneEnd = [];
    const laneOf = blocks.map((b) => {
      const s = toMin(b.start), e = toMin(b.end);
      let lane = laneEnd.findIndex((end) => end <= s);
      if (lane === -1) { lane = laneEnd.length; laneEnd.push(e); } else laneEnd[lane] = e;
      return lane;
    });
    const cols = Math.max(1, laneEnd.length);
    body += blocks.map((b, idx) => {
      const r1 = rowOf(toMin(b.start));
      const r2 = Math.max(r1 + 1, rowOf(toMin(b.end))); // never collapse a block to a zero-height row
      return timeBlock(b, { col, r1, r2, cols, colidx: laneOf[idx] });
    }).join('');
  });

  return `<div class="timetable-scroll"><div class="timetable" aria-label="${esc(t(gridAria))}" style="--days:${days.length};--slots:${slots}">
    <div class="tt-corner"></div>
    ${axis}${guides}${body}
  </div></div>`;
}
