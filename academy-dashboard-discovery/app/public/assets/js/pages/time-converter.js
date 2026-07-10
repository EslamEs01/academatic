/* Spec 034 — Time Converter (Control Center).
 *
 * A REAL, fully client-side world-clock tool grounded in the legacy
 * `management-time-convertor` surface. Two tabs: "Time zones" (a live converter —
 * pick a source zone + a target zone + a date + a wall-clock time, and the result
 * card shows the same instant expressed in the target zone) and "Changes" (a
 * display-only board of authored daylight-saving switch-over rows).
 *
 * The conversion runs ENTIRELY in the browser via the shared init in enhance.js
 * (native Intl.DateTimeFormat with an IANA time zone) — NO backend, NO network,
 * NO account counts, NO computed metric. This module renders ONLY the static
 * markup carrying the data-tc-* hooks that init reads; it adds no script and no
 * side effects. Because there is no write path here, there is NO backend gate —
 * this page is a working tool, not a form to be submitted. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { pageHeader } from '../components/page-header.js';
import { tabs } from '../components/tabs.js';
import { TIMEZONES, TZ_QUICK, TZ_CHANGES } from '../fixtures/control-center.js';

/* sensible defaults: source = first authored zone, target = first common zone
 * that differs from it (so the tool shows a meaningful conversion once a date +
 * time are entered). Robust to fixture reordering. */
const SRC_DEFAULT = (TIMEZONES[0] || {}).id;
const TGT_DEFAULT = TZ_QUICK.find((id) => id !== SRC_DEFAULT) || (TIMEZONES[1] || {}).id || SRC_DEFAULT;

/* id → authored zone label (locale key), for the quick chips */
const zoneLabel = (id) => {
  const z = TIMEZONES.find((zz) => zz.id === id);
  return z ? t(z.labelKey) : id;
};

/* the shared <option> list for both zone selects (value = IANA id) */
const zoneOptions = (selectedId) => TIMEZONES.map((z) =>
  `<option value="${esc(z.id)}"${z.id === selectedId ? ' selected' : ''}>${esc(t(z.labelKey))}</option>`,
).join('');

/* a hand-rolled labeled <select> carrying an exact data-tc-* hook. field() cannot
 * attach the hook the enhance.js converter reads, so we build it inline but reuse
 * the shared .field / .select-wrap / .select-input tokens for identical styling. */
function zoneSelect({ name, hook, labelKey, selectedId }) {
  const id = `f-${name}`;
  return `<div class="field">
    <label class="field-label" for="${id}">${esc(t(labelKey))}</label>
    <span class="select-wrap">
      <select id="${id}" name="${esc(name)}" class="select-input" ${hook}>${zoneOptions(selectedId)}</select>
      ${icon('chevron-down', 'sel-chev ico')}
    </span>
  </div>`;
}

/* a hand-rolled labeled date/time input carrying its data-tc-* hook (native
 * date/time pickers — allowed; the converter reads their .value) */
function dtField({ name, hook, labelKey, type }) {
  const id = `f-${name}`;
  return `<div class="field">
    <label class="field-label" for="${id}">${esc(t(labelKey))}</label>
    <input id="${id}" name="${esc(name)}" type="${type}" class="input" ${hook} />
  </div>`;
}

/* common-zone quick chips — clicking one sets the target zone (init toggles
 * .is-active + recomputes). Each MUST live inside [data-time-converter]. */
function quickChips() {
  const chips = TZ_QUICK.map((id) => {
    const active = id === TGT_DEFAULT ? ' is-active' : '';
    return `<button type="button" class="chip tone-neutral${active}" data-tc-quick="${esc(id)}">${icon('clock', 'ico ico-sm')}<span>${esc(zoneLabel(id))}</span></button>`;
  }).join('');
  return `<div class="mt-4">
    <div class="field-label mb-1.5">${esc(t('tz.quick.title'))}</div>
    <div class="flex flex-wrap gap-2">${chips}</div>
  </div>`;
}

/* business/night reading aid — pure legend, no interaction */
function legend() {
  return `<div class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12.5px]" style="color:var(--c-ink-3)">
    <span class="inline-flex items-center gap-1.5">${icon('sun', 'ico ico-sm')}<span>${esc(t('tz.legend.business'))}</span></span>
    <span class="inline-flex items-center gap-1.5">${icon('moon', 'ico ico-sm')}<span>${esc(t('tz.legend.night'))}</span></span>
  </div>`;
}

/* the live converter panel — the [data-time-converter] root the init binds to */
function converterPanel() {
  return `<div data-time-converter class="mt-4">
    <div class="cc-tz-grid">
      <div class="card p-4">
        <div class="wiz-grid">
          ${zoneSelect({ name: 'tcSource', hook: 'data-tc-source', labelKey: 'tz.field.source', selectedId: SRC_DEFAULT })}
          ${zoneSelect({ name: 'tcTarget', hook: 'data-tc-target', labelKey: 'tz.field.target', selectedId: TGT_DEFAULT })}
          ${dtField({ name: 'tcDate', hook: 'data-tc-date', labelKey: 'tz.field.date', type: 'date' })}
          ${dtField({ name: 'tcTime', hook: 'data-tc-time', labelKey: 'tz.field.time', type: 'time' })}
        </div>
      </div>
      <div class="card p-4">
        <div class="flex items-center gap-2 mb-2">
          <span class="medallion m-soft tone-primary">${icon('globe', 'ico')}</span>
          <h3 class="section-title">${esc(t('tz.out.title'))}</h3>
        </div>
        <div class="cc-tz-out" data-tc-output data-tc-hint="${esc(t('tz.out.hint'))}"></div>
        ${legend()}
      </div>
    </div>
    ${quickChips()}
  </div>`;
}

/* one authored daylight-saving change row (display-only; no account counts) */
function changeRow(c) {
  return `<tr data-row>
    <td><span class="font-bold text-ink inline-flex items-center gap-1.5">${icon('map-pin', 'ico ico-sm')}${esc(t(c.zoneKey))}</span></td>
    <td><span class="tabular" style="color:var(--c-ink-2)">${esc(t(c.nextKey))}</span></td>
    <td><span class="tabular">${esc(t(c.curKey))}</span></td>
    <td><span class="tabular">${esc(t(c.upKey))}</span></td>
  </tr>`;
}

/* the Changes board — an authored, display-only DST table */
function changesPanel() {
  return `<div class="mt-4">
    <h3 class="section-title mb-3">${esc(t('tz.changes.title'))}</h3>
    <section class="card overflow-hidden"><div class="overflow-x-auto"><table class="tbl">
      <thead><tr>
        <th>${esc(t('tz.changes.zone'))}</th>
        <th>${esc(t('tz.changes.next'))}</th>
        <th>${esc(t('tz.changes.cur'))}</th>
        <th>${esc(t('tz.changes.up'))}</th>
      </tr></thead>
      <tbody>${TZ_CHANGES.map(changeRow).join('')}</tbody>
    </table></div></section>
  </div>`;
}

export function renderTimeConverter() {
  return `
    ${pageHeader({ titleKey: 'tz.title', subKey: 'tz.sub' })}
    ${tabs({
      group: 'timeconv',
      items: [
        { id: 'zone', labelKey: 'tz.tab.zone', icon: 'clock' },
        { id: 'changes', labelKey: 'tz.tab.changes', icon: 'calendar' },
      ],
      panels: { zone: converterPanel(), changes: changesPanel() },
    })}
  `;
}
