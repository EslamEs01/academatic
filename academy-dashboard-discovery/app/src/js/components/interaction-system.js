import { t } from '../i18n.js';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EDITABLE = 'input:not([type="hidden"]):not([disabled]):not([readonly]), select:not([disabled]), textarea:not([disabled]):not([readonly])';
const ANIMATION_MS = 220;

let active = null;
let pageSession = null;
let closingOverlay = null;
let closingTimer = null;

function visibleFocusable(surface) {
  return Array.from(surface.querySelectorAll(FOCUSABLE)).filter((element) => {
    if (element.closest('[inert], [aria-hidden="true"]')) return false;
    const style = getComputedStyle(element);
    return style.visibility !== 'hidden' && style.display !== 'none' && element.getClientRects().length > 0;
  });
}

function editableSnapshot(surface) {
  return JSON.stringify(Array.from(surface.querySelectorAll(EDITABLE)).map((field) => ({
    name: field.name || field.id || '',
    type: field.type || field.tagName.toLowerCase(),
    value: field.type === 'checkbox' || field.type === 'radio' ? Boolean(field.checked) : field.value,
  })));
}

function updateDirty() {
  if (!active) return;
  active.dirty = editableSnapshot(active.surface) !== active.initialSnapshot;
  active.surface.toggleAttribute('data-interaction-dirty', active.dirty);
}

function emitError(code, target, message) {
  const detail = { code, target: target || '', message };
  console.error(`[interaction:${code}] ${message}`);
  document.dispatchEvent(new CustomEvent('interaction:error', { detail }));
}

export function reportInteractionError(code, target, message) {
  emitError(code, target, message);
}

function lockBackground(overlay) {
  const scrollRegion = document.querySelector('.page-scroll');
  const locked = {
    windowX: window.scrollX,
    windowY: window.scrollY,
    region: scrollRegion,
    regionTop: scrollRegion ? scrollRegion.scrollTop : 0,
    regionPaddingInlineEnd: scrollRegion ? scrollRegion.style.paddingInlineEnd : '',
    background: [],
  };
  const compensation = Math.max(0, window.innerWidth - document.documentElement.clientWidth);
  const regionCompensation = scrollRegion ? Math.max(0, scrollRegion.offsetWidth - scrollRegion.clientWidth) : 0;
  document.documentElement.style.setProperty('--interaction-scrollbar-compensation', `${compensation}px`);
  if (scrollRegion && regionCompensation) scrollRegion.style.paddingInlineEnd = `${regionCompensation}px`;
  document.documentElement.setAttribute('data-interaction-locked', '');
  document.body.setAttribute('data-interaction-locked', '');
  for (const child of Array.from(document.body.children)) {
    if (child === overlay) continue;
    locked.background.push({ child, inert: child.inert, ariaHidden: child.getAttribute('aria-hidden') });
    child.inert = true;
    child.setAttribute('aria-hidden', 'true');
  }
  return locked;
}

function unlockBackground(locked) {
  if (!locked) return;
  for (const { child, inert, ariaHidden } of locked.background) {
    child.inert = inert;
    if (ariaHidden == null) child.removeAttribute('aria-hidden');
    else child.setAttribute('aria-hidden', ariaHidden);
  }
  document.documentElement.removeAttribute('data-interaction-locked');
  document.body.removeAttribute('data-interaction-locked');
  document.documentElement.style.removeProperty('--interaction-scrollbar-compensation');
  if (locked.region) {
    locked.region.style.paddingInlineEnd = locked.regionPaddingInlineEnd;
    locked.region.scrollTop = locked.regionTop;
  }
  window.scrollTo(locked.windowX, locked.windowY);
}

function setViewportHeight() {
  const height = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  document.documentElement.style.setProperty('--interaction-viewport-height', `${Math.round(height)}px`);
}

function addViewportListener() {
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', setViewportHeight);
}

function removeViewportListener() {
  window.removeEventListener('resize', setViewportHeight);
  if (window.visualViewport) window.visualViewport.removeEventListener('resize', setViewportHeight);
  document.documentElement.style.removeProperty('--interaction-viewport-height');
}

function restoreCard() {
  if (!active || !active.discardPanel) return;
  const focus = active.discardFocus;
  active.card.inert = false;
  active.card.removeAttribute('aria-hidden');
  active.discardPanel.remove();
  active.discardPanel = null;
  active.discardFocus = null;
  if (focus && focus.isConnected) focus.focus();
}

function removeClosingOverlay() {
  if (closingTimer) window.clearTimeout(closingTimer);
  if (closingOverlay) closingOverlay.remove();
  closingOverlay = null;
  closingTimer = null;
}

function teardownInteraction(focusTarget) {
  if (!active) return;
  const closing = active;
  active = null;
  document.removeEventListener('keydown', closing.onKey);
  document.removeEventListener('click', closing.onNavigation, true);
  closing.overlay.removeEventListener('click', closing.onOverlayClick);
  closing.surface.removeEventListener('input', onEditableChange);
  closing.surface.removeEventListener('change', onEditableChange);
  removeViewportListener();
  unlockBackground(closing.locked);
  closing.overlay.classList.remove('is-open');
  closing.surface.classList.remove('is-open');
  removeClosingOverlay();
  closingOverlay = closing.overlay;
  closingTimer = window.setTimeout(removeClosingOverlay, ANIMATION_MS);
  if (focusTarget && focusTarget.isConnected) focusTarget.focus({ preventScroll: true });
}

function showDiscard(pending) {
  if (!active) return false;
  if (active.discardPanel) {
    if (pending) active.pending = pending;
    return true;
  }
  active.pending = pending || null;
  active.discardFocus = document.activeElement;
  active.card.inert = true;
  active.card.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('section');
  panel.className = 'interaction-discard';
  panel.setAttribute('data-interaction-discard-state', '');
  panel.setAttribute('role', 'alertdialog');
  panel.setAttribute('aria-labelledby', 'interaction-discard-title');
  panel.innerHTML = `<h2 id="interaction-discard-title" class="interaction-discard-title">${t('interaction.discardTitle')}</h2>
    <p>${t('interaction.discardMessage')}</p>
    <div class="interaction-discard-actions">
      <button type="button" class="btn btn-secondary btn-sm" data-interaction-continue>${t('interaction.continueEditing')}</button>
      <button type="button" class="btn btn-danger btn-sm" data-interaction-discard>${t('interaction.discardChanges')}</button>
    </div>`;
  active.discardPanel = panel;
  active.surface.appendChild(panel);
  panel.querySelector('[data-interaction-continue]').focus();
  return true;
}

export function closeInteraction() {
  if (!active) return true;
  if (active.operationLocked) return false;
  updateDirty();
  if (active.dirty) {
    showDiscard();
    return false;
  }
  teardownInteraction(active.rootTrigger);
  return true;
}

export function guardInteractionNavigation(callback) {
  if (active) {
    updateDirty();
    if (active.dirty) { showDiscard(callback); return false; }
  }
  if (pageSession) {
    updatePageDirty();
    if (pageSession.dirty) { showPageDiscard(callback); return false; }
  }
  callback();
  return true;
}

function clearValidation(surface) {
  surface.querySelectorAll('[data-interaction-field-error]').forEach((node) => node.remove());
  surface.querySelectorAll('[aria-invalid="true"]').forEach((field) => {
    field.removeAttribute('aria-invalid');
    const original = field.getAttribute('data-interaction-original-describedby');
    if (original) field.setAttribute('aria-describedby', original);
    else field.removeAttribute('aria-describedby');
    field.removeAttribute('data-interaction-original-describedby');
  });
  const summary = surface.querySelector('[data-interaction-error-summary]');
  if (summary) { summary.hidden = true; summary.textContent = ''; }
}

function clearFieldIssue(field) {
  if (field.getAttribute('aria-invalid') !== 'true' || !field.checkValidity()) return;
  const describedBy = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
  for (const id of describedBy) {
    const message = document.getElementById(id);
    if (message && message.hasAttribute('data-interaction-field-error')) message.remove();
  }
  const original = field.getAttribute('data-interaction-original-describedby');
  if (original) field.setAttribute('aria-describedby', original);
  else field.removeAttribute('aria-describedby');
  field.removeAttribute('data-interaction-original-describedby');
  field.removeAttribute('aria-invalid');
  const validationRoot = field.closest('[data-interaction-surface], [data-wizard]');
  if (validationRoot && !validationRoot.querySelector('[aria-invalid="true"]')) {
    const summary = validationRoot.querySelector('[data-interaction-error-summary]');
    if (summary) { summary.hidden = true; summary.textContent = ''; }
  }
}

function onEditableChange(event) {
  if (event.target.matches('input, select, textarea')) clearFieldIssue(event.target);
  updateDirty();
}

function validate(surface) {
  clearValidation(surface);
  const fields = Array.from(surface.querySelectorAll('input, select, textarea'));
  const invalid = fields.filter((field) => !field.checkValidity());
  if (!invalid.length) return true;
  const hiddenStep = invalid[0].closest('[data-step][hidden]');
  if (hiddenStep) {
    const stepId = hiddenStep.getAttribute('data-step');
    const stepControl = surface.querySelector(`[data-step-go="${CSS.escape(stepId)}"]`);
    if (!stepControl) {
      emitError('missing-step-control', stepId, `Invalid hidden step ${stepId} has no required navigation control`);
      return false;
    }
    stepControl.click();
  }
  const summary = surface.querySelector('[data-interaction-error-summary]');
  for (const [index, field] of invalid.entries()) {
    const id = `${field.id || 'interaction-field'}-error-${index}`;
    const error = document.createElement('p');
    error.id = id;
    error.className = 'field-error';
    error.setAttribute('data-interaction-field-error', '');
    error.setAttribute('role', 'alert');
    error.textContent = field.validationMessage || t('interaction.validationError');
    field.setAttribute('aria-invalid', 'true');
    const describedBy = field.getAttribute('aria-describedby') || '';
    field.setAttribute('data-interaction-original-describedby', describedBy);
    field.setAttribute('aria-describedby', `${describedBy} ${id}`.trim());
    const fieldWrap = field.closest('.field') || field.parentElement;
    fieldWrap.appendChild(error);
  }
  if (summary) {
    summary.hidden = false;
    summary.textContent = t('interaction.validationSummary');
    summary.focus();
  } else invalid[0].focus();
  return false;
}

function showBackendRequired(surface, trigger) {
  if (!validate(surface)) return;
  const reasonKey = trigger.getAttribute('data-reason-key');
  if (!reasonKey) return emitError('missing-backend-reason', active && active.target, 'Terminal action lacks an explicit backend-required reason key');
  const region = surface.querySelector('[data-interaction-operation-region]');
  if (!region) return emitError('missing-operation-region', active && active.target, 'Form surface lacks data-interaction-operation-region');
  let backendState = region.querySelector('[data-interaction-backend-state]');
  if (!backendState) {
    backendState = document.createElement('p');
    backendState.className = 'interaction-operation-note';
    backendState.setAttribute('data-interaction-backend-state', '');
    backendState.setAttribute('role', 'status');
    backendState.setAttribute('aria-live', 'polite');
    region.appendChild(backendState);
  }
  backendState.textContent = trigger.getAttribute('title') || t(reasonKey);
}

function focusInitial(state) {
  const { surface, family } = state;
  let target = null;
  if (family === 'confirmation') target = surface.querySelector('[data-interaction-cancel]');
  else if (family === 'simple-form' || family === 'long-form') target = surface.querySelector('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])');
  if (!target) target = surface.querySelector('[data-interaction-heading]');
  if (!target) target = visibleFocusable(surface)[0];
  if (!target) { surface.tabIndex = -1; target = surface; }
  target.focus({ preventScroll: false });
}

function configureSurface(state, options) {
  const { surface } = state;
  const presentation = options.presentation || 'modal';
  const compatibilityClass = presentation === 'drawer' ? 'drawer sheet' : presentation === 'sidebar' ? 'drawer' : 'modal';
  surface.className = `interaction-surface interaction-${presentation} ${compatibilityClass}`;
  state.overlay.className = `interaction-overlay ${presentation === 'modal' ? 'modal-scrim' : 'scrim'}`;
  surface.setAttribute('data-interaction-surface', '');
  surface.setAttribute('data-interaction-family', options.family);
  if (options.target) surface.setAttribute('data-interaction-target', options.target);
  else surface.removeAttribute('data-interaction-target');
  surface.setAttribute('role', 'dialog');
  surface.setAttribute('aria-modal', 'true');
  surface.replaceChildren(options.content);
  state.card = surface.querySelector('.interaction-card') || surface.firstElementChild;
  if (!state.card) throw new Error('Interaction content must provide one root card');
  const heading = surface.querySelector('[data-interaction-heading]');
  const description = surface.querySelector('[data-interaction-description]');
  if (heading && heading.id) surface.setAttribute('aria-labelledby', heading.id);
  else if (options.label) surface.setAttribute('aria-label', options.label);
  else emitError('missing-accessible-name', options.target, 'Modal-grade surface lacks an accessible name');
  if (description && description.id) surface.setAttribute('aria-describedby', description.id);
  else surface.removeAttribute('aria-describedby');
  state.family = options.family;
  state.target = options.target || '';
  state.initialSnapshot = editableSnapshot(surface);
  state.dirty = false;
  state.surface.removeAttribute('data-interaction-dirty');
  state.discardPanel = null;
  state.pending = null;
  window.requestAnimationFrame(() => focusInitial(state));
}

function onKeydown(event) {
  if (!active) return;
  if (event.key === 'Escape') {
    event.preventDefault();
    closeInteraction('escape');
    return;
  }
  if (event.key !== 'Tab') return;
  const focusables = visibleFocusable(active.surface);
  if (!focusables.length) { event.preventDefault(); active.surface.focus(); return; }
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && (document.activeElement === first || !active.surface.contains(document.activeElement))) {
    event.preventDefault(); last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || !active.surface.contains(document.activeElement))) {
    event.preventDefault(); first.focus();
  }
}

function onOverlayClick(event) {
  if (!active) return;
  const continueButton = event.target.closest('[data-interaction-continue]');
  if (continueButton) { restoreCard(); return; }
  const discardButton = event.target.closest('[data-interaction-discard]');
  if (discardButton) {
    const pending = active.pending;
    const focusTarget = active.rootTrigger;
    active.dirty = false;
    teardownInteraction(pending ? null : focusTarget);
    if (pending) pending();
    return;
  }
  const submit = event.target.closest('[data-interaction-submit]');
  if (submit) { event.preventDefault(); showBackendRequired(active.surface, submit); return; }
  const confirm = event.target.closest('[data-interaction-confirm]');
  if (confirm) {
    const callback = active.onConfirm;
    const focusTarget = active.rootTrigger;
    teardownInteraction(focusTarget);
    if (callback) callback();
    return;
  }
  if (event.target === active.overlay || event.target.closest('[data-interaction-close], [data-interaction-cancel], [data-sheet-close]')) {
    event.preventDefault();
    closeInteraction();
  }
}

function onNavigation(event) {
  if (!active || !active.dirty || event.defaultPrevented) return;
  const anchor = event.target.closest && event.target.closest('a[href]');
  if (!anchor || anchor.hasAttribute('download') || anchor.target === '_blank') return;
  event.preventDefault();
  const href = anchor.href;
  showDiscard(() => { location.href = href; });
}

export function openInteraction(options) {
  if (!options || !options.family || !options.content) throw new Error('openInteraction requires family and content');
  if (active) {
    const transitionOptions = options.trigger && active.surface.contains(options.trigger)
      ? { ...options, trigger: active.rootTrigger }
      : options;
    updateDirty();
    if (active.dirty) {
      showDiscard(() => openInteraction(transitionOptions));
      return active.surface;
    }
    active.onConfirm = transitionOptions.onConfirm || null;
    configureSurface(active, transitionOptions);
    return active.surface;
  }

  removeClosingOverlay();
  const overlay = document.createElement('div');
  overlay.className = 'interaction-overlay';
  overlay.setAttribute('data-interaction-overlay', '');
  const surface = document.createElement('section');
  overlay.appendChild(surface);
  document.body.appendChild(overlay);
  const state = {
    overlay,
    surface,
    card: null,
    family: options.family,
    target: options.target || '',
    rootTrigger: options.trigger || document.activeElement,
    onConfirm: options.onConfirm || null,
    operationLocked: false,
    dirty: false,
    initialSnapshot: '[]',
    discardPanel: null,
    discardFocus: null,
    pending: null,
    locked: null,
    onKey: onKeydown,
    onOverlayClick,
    onNavigation,
  };
  active = state;
  configureSurface(state, options);
  state.locked = lockBackground(overlay);
  overlay.addEventListener('click', onOverlayClick);
  surface.addEventListener('input', onEditableChange);
  surface.addEventListener('change', onEditableChange);
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('click', onNavigation, true);
  addViewportListener();
  window.requestAnimationFrame(() => {
    overlay.classList.add('is-open');
    surface.classList.add('is-open');
  });
  return surface;
}

export function openTemplateInteraction(template, trigger) {
  if (!template) { emitError('missing-target', '', 'Required interaction template is missing'); return; }
  const family = template.getAttribute('data-interaction-family');
  const presentation = template.getAttribute('data-interaction-presentation');
  const target = template.getAttribute('data-preview') || '';
  if (!family || !presentation) { emitError('missing-classification', target, `Target ${target} lacks explicit family/presentation metadata`); return; }
  return openInteraction({ family, presentation, target, trigger, content: template.content.cloneNode(true) });
}

function textElement(tag, className, text, attributes = {}) {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = text;
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  return element;
}

export function openConfirmation({ trigger, title, message, confirmLabel, danger = false, onConfirm }) {
  const card = document.createElement('div');
  card.className = 'interaction-card';
  const header = document.createElement('header');
  header.className = 'interaction-header';
  const titleId = `interaction-confirm-title-${Date.now()}`;
  header.appendChild(textElement('h2', 'interaction-title', title, { id: titleId, 'data-interaction-heading': '', tabindex: '-1' }));
  const content = document.createElement('div');
  content.className = 'interaction-content';
  const descriptionId = `${titleId}-description`;
  content.appendChild(textElement('p', 'interaction-description', message, { id: descriptionId, 'data-interaction-description': '' }));
  const footer = document.createElement('footer');
  footer.className = 'interaction-footer';
  const cancel = textElement('button', 'btn btn-secondary btn-sm', t('common.cancel'), { type: 'button', 'data-interaction-cancel': '' });
  const confirm = textElement('button', `btn ${danger ? 'btn-danger' : 'btn-primary'} btn-sm`, confirmLabel, { type: 'button', 'data-interaction-confirm': '' });
  footer.append(cancel, confirm);
  card.append(header, content, footer);
  return openInteraction({ family: 'confirmation', presentation: 'modal', target: 'confirm', trigger, content: card, onConfirm });
}

export function openInformational({ trigger, title, message }) {
  const card = document.createElement('div');
  card.className = 'interaction-card';
  const titleId = `interaction-info-title-${Date.now()}`;
  const header = document.createElement('header');
  header.className = 'interaction-header';
  header.appendChild(textElement('h2', 'interaction-title', title, { id: titleId, 'data-interaction-heading': '', tabindex: '-1' }));
  const content = document.createElement('div');
  content.className = 'interaction-content';
  content.appendChild(textElement('p', 'interaction-description', message, { id: `${titleId}-description`, 'data-interaction-description': '' }));
  const footer = document.createElement('footer');
  footer.className = 'interaction-footer';
  footer.appendChild(textElement('button', 'btn btn-primary btn-sm', t('common.close'), { type: 'button', 'data-interaction-close': '' }));
  card.append(header, content, footer);
  return openInteraction({ family: 'informational', presentation: 'modal', target: 'informational', trigger, content: card });
}

export function openSidebarInteraction(node, trigger) {
  const card = document.createElement('div');
  card.className = 'interaction-card interaction-sidebar-card';
  const header = document.createElement('header');
  header.className = 'interaction-header';
  const title = trigger.getAttribute('aria-label') || t('common.close');
  const titleId = 'interaction-sidebar-title';
  header.appendChild(textElement('h2', 'interaction-title', title, { id: titleId, 'data-interaction-heading': '', tabindex: '-1' }));
  header.appendChild(textElement('button', 'icon-btn', t('common.close'), { type: 'button', 'aria-label': t('common.close'), 'data-interaction-close': '' }));
  const content = document.createElement('div');
  content.className = 'interaction-content';
  content.appendChild(node);
  card.append(header, content);
  return openInteraction({ family: 'sidebar', presentation: 'sidebar', target: 'mobile-sidebar', trigger, content: card, label: title });
}

export function hasActiveInteraction() {
  return Boolean(active);
}

function updatePageDirty() {
  if (!pageSession) return;
  pageSession.dirty = editableSnapshot(pageSession.root) !== pageSession.initialSnapshot;
  pageSession.root.toggleAttribute('data-interaction-dirty', pageSession.dirty);
}

function removePageDiscard() {
  if (!pageSession || !pageSession.discardPanel) return;
  pageSession.discardPanel.remove();
  pageSession.discardPanel = null;
  pageSession.pending = null;
}

function createPageDiscardPanel() {
  const panel = document.createElement('section');
  panel.className = 'page-interaction-discard';
  panel.setAttribute('data-page-discard-state', '');
  panel.setAttribute('role', 'alert');
  panel.innerHTML = `<h2 class="interaction-discard-title">${t('interaction.discardTitle')}</h2>
    <p>${t('interaction.discardMessage')}</p>
    <div class="interaction-discard-actions">
      <button type="button" class="btn btn-secondary btn-sm" data-page-continue>${t('interaction.continueEditing')}</button>
      <button type="button" class="btn btn-danger btn-sm" data-page-discard>${t('interaction.discardChanges')}</button>
    </div>`;
  panel.addEventListener('click', (event) => {
    if (event.target.closest('[data-page-continue]')) { removePageDiscard(); return; }
    if (!event.target.closest('[data-page-discard]')) return;
    const pending = pageSession.pending;
    pageSession.dirty = false;
    pageSession.root.removeAttribute('data-interaction-dirty');
    removePageDiscard();
    if (pending) pending();
  });
  return panel;
}

function showPageDiscard(pending) {
  if (!pageSession) return;
  pageSession.pending = pending || null;
  if (!pageSession.discardPanel) {
    pageSession.discardPanel = createPageDiscardPanel();
    pageSession.root.prepend(pageSession.discardPanel);
  }
  pageSession.discardPanel.querySelector('[data-page-continue]').focus();
}

function onPageInput(event) {
  if (event.target.matches('input, select, textarea')) clearFieldIssue(event.target);
  updatePageDirty();
}

function onPageNavigation(event) {
  if (!pageSession || !pageSession.dirty || event.defaultPrevented) return;
  const anchor = event.target.closest && event.target.closest('a[href]');
  if (!anchor || anchor.hasAttribute('download') || anchor.target === '_blank' || anchor.getAttribute('href') === '#') return;
  event.preventDefault();
  showPageDiscard(() => { location.href = anchor.href; });
}

function onPageAction(event) {
  const submit = event.target.closest('[data-modal-trigger][data-modal-note-key]');
  if (!submit || !pageSession.root.contains(submit)) return;
  if (!validate(pageSession.root)) {
    event.preventDefault();
    event.stopPropagation();
  }
}

export function registerPageFormSession(root) {
  if (!root) throw new Error('registerPageFormSession requires a root element');
  if (pageSession) {
    pageSession.root.removeEventListener('input', onPageInput);
    pageSession.root.removeEventListener('change', onPageInput);
    pageSession.root.removeEventListener('click', onPageAction);
    document.removeEventListener('click', onPageNavigation, true);
    if (pageSession.discardPanel) pageSession.discardPanel.remove();
  }
  pageSession = {
    root,
    initialSnapshot: editableSnapshot(root),
    dirty: false,
    discardPanel: null,
    pending: null,
  };
  root.addEventListener('input', onPageInput);
  root.addEventListener('change', onPageInput);
  root.addEventListener('click', onPageAction);
  document.addEventListener('click', onPageNavigation, true);
}

window.addEventListener('beforeunload', (event) => {
  if (active) updateDirty();
  if (pageSession) updatePageDirty();
  if (!active?.dirty && !pageSession?.dirty) return;
  event.preventDefault();
  event.returnValue = '';
});
