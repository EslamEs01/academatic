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

/* Spec 032 — form-bearing drawer (Option B): the baked template body is a
 * .wiz-grid of INERT field() controls + ONE clickable data-disabled-reason
 * Save final (backendRequired). Wraps previewTemplate — no new hook, no
 * storage key, no persistence; the final mutates nothing. */
export function formDrawer(id, { titleKey, headIcon = 'edit', tone = 'primary', fields = '', ctaKey = 'common.save', reasonKey = 'common.backendRequiredNote' } = {}) {
  const bodyHTML = `<div class="wiz-grid">${fields}</div>
    <div class="flex items-center justify-end gap-2.5 mt-4">
      <button type="button" class="btn btn-primary btn-sm" aria-disabled="true" data-disabled-reason data-reason-key="${esc(reasonKey)}" title="${esc(t(reasonKey))}">${icon('check', 'ico')}<span>${t(ctaKey)}</span></button>
    </div>`;
  return previewTemplate(id, { titleKey, headIcon, tone, bodyHTML });
}
