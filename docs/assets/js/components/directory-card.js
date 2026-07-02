/* Directory card (trainers; adaptable). Caller passes pre-built inner HTML +
 * the facet attrs (from facetAttrs) so the card is filterable + opens a preview. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';

export function statMini(value, labelKey) {
  return `<div class="stat-mini"><div class="v">${value}</div><div class="l">${t(labelKey)}</div></div>`;
}

export function directoryCard({ rootAttrs = '', avatarHTML = '', name = '', subtitle = '', statusHTML = '', tagsHTML = '', statsHTML = '', drawerId, ctaHref, ctaKey = 'dir.viewProfile', ctaIcon = 'user', previewKey = 'dir.preview' } = {}) {
  // primary CTA: a real profile link when ctaHref is given, else the preview drawer button
  const cta = ctaHref
    ? `<a href="${esc(ctaHref)}" class="btn btn-secondary btn-sm w-full">${icon(ctaIcon, 'ico ico-sm')}<span>${t(ctaKey)}</span></a>`
    : `<button type="button" class="btn btn-secondary btn-sm w-full" data-drawer="${esc(drawerId)}">${icon(ctaIcon, 'ico ico-sm')}<span>${t(ctaKey)}</span></button>`;
  // when there is a profile link AND a preview drawer, offer the drawer as a secondary action
  const preview = (ctaHref && drawerId)
    ? `<button type="button" class="btn btn-ghost btn-sm w-full" data-drawer="${esc(drawerId)}">${icon('user', 'ico ico-sm')}<span>${t(previewKey)}</span></button>`
    : '';
  return `<div class="dir-card is-hoverable" ${rootAttrs}>
    <div class="flex items-start gap-3">
      ${avatarHTML}
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h3 class="font-bold text-ink text-[14px] truncate">${name}</h3>${statusHTML}
        </div>
        ${subtitle ? `<p class="text-[12px] truncate" style="color:var(--c-ink-3)">${subtitle}</p>` : ''}
      </div>
    </div>
    ${tagsHTML ? `<div class="flex flex-wrap gap-1.5">${tagsHTML}</div>` : ''}
    ${statsHTML ? `<div class="grid grid-cols-3 gap-2">${statsHTML}</div>` : ''}
    ${cta}
    ${preview}
  </div>`;
}
