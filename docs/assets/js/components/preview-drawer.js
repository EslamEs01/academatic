/* Entity preview content lives in the STATIC HTML as hidden <template> blocks
 * (so it's pre-rendered + Django-ready). A trigger with data-drawer="<id>"
 * opens a right-side sheet; enhance.js clones the matching template into it. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from './ui.js';

export function previewTemplate(id, { titleKey, title, headIcon = 'inbox', tone = 'primary', bodyHTML = '' } = {}) {
  return `<template data-preview="${esc(id)}">
    <div class="sheet-card">
      <div class="sheet-head">
        <div class="flex items-center gap-2.5">
          ${medallion({ icon: headIcon, tone, variant: 'soft', size: 'sm' })}
          <h2 class="text-[15px] font-bold text-ink">${titleKey ? t(titleKey) : esc(title)}</h2>
        </div>
        <button type="button" class="icon-btn" data-sheet-close aria-label="${esc(t('common.close'))}">${icon('x', 'ico')}</button>
      </div>
      <div class="sheet-body">${bodyHTML}</div>
    </div>
  </template>`;
}

export function sheetRow(label, value) {
  return `<div class="sheet-row"><span class="k">${label}</span><span class="v">${value}</span></div>`;
}
