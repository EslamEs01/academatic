/* Generic accessible content-tabs builder — emits static baked markup only.
 * enhance.js takes over at runtime: toggles [data-tabpanel] visibility on tab
 * click, persists the active view in localStorage['academy.schedView.<group>'],
 * and syncs the URL hash #view=<id> so deep-linking and back-navigation work.
 * Keyboard: arrow keys cycle tabs (roving tabindex); Home/End jump to ends. */

import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

/**
 * @param {{ group: string, items: Array<{id:string, labelKey:string, icon?:string}>,
 *           panels: Record<string,string>, ariaKey?: string }} opts
 * @returns {string} HTML string — Node-safe, no DOM APIs used.
 */
export function tabs({ group, items, panels, ariaKey = 'tt.tablistAria' }) {
  const g = esc(group);

  const tabButtons = items.map((it, i) => {
    const id = esc(it.id);
    const active = i === 0;
    return `<button class="tab${active ? ' is-active' : ''}" role="tab" id="tab-${g}-${id}" data-tab="${id}" aria-controls="tabpanel-${g}-${id}" aria-selected="${active ? 'true' : 'false'}" tabindex="${active ? '0' : '-1'}">${it.icon ? icon(it.icon, 'ico ico-sm') : ''}<span>${t(it.labelKey)}</span></button>`;
  }).join('\n      ');

  const tabPanels = items.map((it, i) => {
    const id = esc(it.id);
    return `<section class="tabpanel" role="tabpanel" id="tabpanel-${g}-${id}" data-tabpanel="${id}" aria-labelledby="tab-${g}-${id}"${i === 0 ? '' : ' hidden'}>${panels[it.id] || ''}</section>`;
  }).join('\n    ');

  return `<div class="tabs-wrap" data-tabs="${g}">
    <div class="tabs" role="tablist" aria-label="${t(ariaKey)}">
      ${tabButtons}
    </div>
    ${tabPanels}
  </div>`;
}
