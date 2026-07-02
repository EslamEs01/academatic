/* Shared profile banner (Spec 004) — reused by family.html + student.html.
 * Avatar + name + lifecycle status chip + meta (family link / category) + KPIs
 * (statMini) + an actions slot. Pure markup; composes existing `ui` atoms. */
import { esc } from '../dom.js';
import { statMini } from './directory-card.js';

/**
 * @param {{ avatarHTML:string, name:string, statusHTML?:string, metaHTML?:string,
 *   kpis?:Array<{value:string,labelKey:string}>, actionsHTML?:string }} o
 */
export function profileBanner({ avatarHTML = '', name = '', statusHTML = '', metaHTML = '', kpis = [], actionsHTML = '' } = {}) {
  return `<section class="profile-banner">
    <div class="pb-top">
      <div class="pb-id">
        ${avatarHTML}
        <div class="min-w-0">
          <h1 class="pb-name truncate">${esc(name)}</h1>
          <div class="pb-meta">${statusHTML}${metaHTML}</div>
        </div>
      </div>
      ${actionsHTML ? `<div class="pb-actions">${actionsHTML}</div>` : ''}
    </div>
    ${kpis.length ? `<div class="pb-kpis">${kpis.map((k) => statMini(k.value, k.labelKey)).join('')}</div>` : ''}
  </section>`;
}
