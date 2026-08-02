/* Entity preview content lives in the STATIC HTML as hidden <template> blocks
 * (so it's pre-rendered + Django-ready). A trigger with data-drawer="<id>"
 * opens its classified shared surface; enhance.js clones the matching template into it. */
import { t } from '../i18n.js';
import { icon } from '../icons.js';
import { esc } from '../dom.js';
import { medallion } from './ui.js';

const LONG_FORM_TARGETS = new Set([
  'crs-add', 'crs-edit', 'grp-add', 'grp-edit', 'fam-child', 'fam-edit',
  'sess-new', 'task-new', 'stu-edit', 'stu-add', 'form-create', 'trn-edit', 'lead-new',
]);
const SIMPLE_FORM_TARGETS = new Set([
  'bank-add', 'cert-tpl', 'fam-cat', 'fam-note', 'stu-note', 'task-section', 'trn-note',
  'head-add', 'lib-cats', 'mat-add', 'mat-edit', 'lib-item', 'msg-member', 'rep-fbcat',
  'cert-create', 'fb-create', 'msg-group', 'staff-add', 'staff-edit', 'staff-dup',
]);

function isMappedFormTarget(id) {
  return LONG_FORM_TARGETS.has(id) || SIMPLE_FORM_TARGETS.has(id)
    || /^integ-[a-z0-9-]+$/.test(id) || /^lead-l[1-8]$/.test(id) || /^fb-add(?:-[a-z0-9-]+)?$/.test(id);
}

function formPresentation(id) {
  if (LONG_FORM_TARGETS.has(id)) return 'drawer';
  if (isMappedFormTarget(id)) return 'modal';
  throw new Error(`Spec 044: missing explicit form presentation for ${id}`);
}

function interactionClassification(id, bodyHTML, explicitFamily, explicitPresentation) {
  if (explicitFamily || explicitPresentation) {
    if (!explicitFamily || !['modal', 'drawer'].includes(explicitPresentation)) throw new Error(`Spec 044: incomplete interaction classification for ${id}`);
    return { family: explicitFamily, presentation: explicitPresentation };
  }
  const directBody = bodyHTML.replace(/<template\b[\s\S]*?<\/template>/gi, '');
  const hasFields = /<(?:input|select|textarea)\b/i.test(directBody);
  const mapped = isMappedFormTarget(id);
  if (hasFields || mapped) {
    const presentation = formPresentation(id);
    return { family: presentation === 'modal' ? 'simple-form' : 'long-form', presentation };
  }
  return { family: 'details', presentation: 'drawer' };
}

export function previewTemplate(id, { titleKey, title, headIcon = 'inbox', tone = 'primary', bodyHTML = '', footerHTML = '', interactionFamily, presentation } = {}) {
  const classification = interactionClassification(id, bodyHTML, interactionFamily, presentation);
  const titleId = `interaction-title-${id}`;
  const summaryId = `interaction-errors-${id}`;
  return `<template data-preview="${esc(id)}" data-interaction-family="${classification.family}" data-interaction-presentation="${classification.presentation}">
    <div class="interaction-card sheet-card">
      <header class="interaction-header sheet-head">
        <div class="flex items-center gap-2.5">
          ${medallion({ icon: headIcon, tone, variant: 'soft', size: 'sm' })}
          <h2 id="${esc(titleId)}" class="interaction-title text-[15px] font-bold text-ink" data-interaction-heading tabindex="-1">${titleKey ? t(titleKey) : esc(title)}</h2>
        </div>
        <button type="button" class="icon-btn" data-sheet-close data-interaction-close aria-label="${esc(t('common.close'))}">${icon('x', 'ico')}</button>
      </header>
      <div class="interaction-content sheet-body">
        <div id="${esc(summaryId)}" class="interaction-error-summary" data-interaction-error-summary role="alert" tabindex="-1" hidden></div>
${bodyHTML.trim()}
        <div class="interaction-operation" data-interaction-operation-region></div>
      </div>
${footerHTML ? `       <footer class="interaction-footer">${footerHTML}</footer>\n` : ''}     </div>
  </template>`;
}

export function sheetRow(label, value) {
  return `<div class="sheet-row"><span class="k">${label}</span><span class="v">${value}</span></div>`;
}

/* Form fields remain frontend-only. The terminal action validates authored
 * constraints, then shows the truthful backend-required state without saving. */
export function formDrawer(id, { titleKey, headIcon = 'edit', tone = 'primary', fields = '', ctaKey = 'common.save', reasonKey = 'common.backendRequiredNote' } = {}) {
  const presentation = formPresentation(id);
  const bodyHTML = `<div class="wiz-grid">${fields}</div>`;
  const footerHTML = `<button type="button" class="btn btn-primary btn-sm" data-interaction-submit data-reason-key="${esc(reasonKey)}" title="${esc(t(reasonKey))}">${icon('check', 'ico')}<span>${t(ctaKey)}</span></button>`;
  return previewTemplate(id, {
    titleKey, headIcon, tone, bodyHTML, footerHTML,
    interactionFamily: presentation === 'modal' ? 'simple-form' : 'long-form',
    presentation,
  });
}
