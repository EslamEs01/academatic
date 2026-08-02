'use strict';

process.env.PORT = process.env.SPEC044_PORT || '4194';
const { chromium } = require('playwright');
const { server, PORT } = require('../../scripts/serve.cjs');
const { BACKEND_REQUIRED, MUTATION_GUARDS } = require('./expected.cjs');

const BASE = `http://127.0.0.1:${PORT}`;
const requestedGuard = (() => {
  const index = process.argv.indexOf('--guard');
  return index >= 0 ? process.argv[index + 1] : null;
})();

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

async function waitForServer() {
  let lastError;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${BASE}/dashboard.html`);
      if (response.ok) return;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error(`server unavailable at ${BASE}: ${lastError && lastError.message}`);
}

async function must(page, selector, label = selector) {
  const locator = page.locator(selector);
  const count = await locator.count();
  invariant(count > 0, `required selector missing: ${label} (${selector})`);
  return locator.first();
}

async function mustVisible(page, selector, label = selector) {
  const locator = page.locator(`${selector}:visible`);
  const count = await locator.count();
  invariant(count > 0, `required visible selector missing: ${label} (${selector})`);
  return locator.first();
}

async function goto(page, file, viewport) {
  if (viewport) await page.setViewportSize(viewport);
  const response = await page.goto(`${BASE}/${file}`, { waitUntil: 'networkidle' });
  invariant(response && response.ok(), `failed to load ${file}: ${response && response.status()}`);
}

async function openForm(page, file = 'reports.html', target = 'fb-create', viewport) {
  await goto(page, file, viewport);
  const opener = await mustVisible(page, `[data-drawer="${target}"]`, `${file} ${target} opener`);
  await opener.click();
  const surface = await mustVisible(page, `.interaction-surface[data-interaction-target="${target}"]`, `${target} shared surface`);
  return { opener, surface };
}

async function openConfirm(page, file = 'teacher.html') {
  await goto(page, file);
  const opener = await mustVisible(page, '[data-confirm]', `${file} confirmation opener`);
  await opener.click();
  const surface = await mustVisible(page, '.interaction-surface[data-interaction-family="confirmation"]', 'shared confirmation surface');
  return { opener, surface };
}

async function closeFrom(surface) {
  const control = surface.locator('[data-interaction-cancel], [data-interaction-close]').first();
  invariant(await control.count() > 0, 'required close/cancel control missing from interaction surface');
  await control.click();
}

async function activeTag(page) {
  return page.evaluate(() => {
    const element = document.activeElement;
    return element ? `${element.tagName.toLowerCase()}#${element.id || ''}.${element.className || ''}` : '<none>';
  });
}

const scenarios = [
  {
    id: 'M44-01', name: MUTATION_GUARDS['M44-01'],
    run: async (page) => {
      await goto(page, 'reports.html');
      await mustVisible(page, '[data-drawer="fb-create"]', 'required report feedback opener');
      await goto(page, 'teacher.html');
      await mustVisible(page, '[data-confirm]', 'required confirmation opener');
      await goto(page, 'dashboard.html', { width: 390, height: 844 });
      await mustVisible(page, '[data-action="open-drawer"]', 'required mobile-sidebar opener');
    },
  },
  {
    id: 'M44-02', name: MUTATION_GUARDS['M44-02'],
    run: async (page) => {
      const { surface } = await openForm(page);
      invariant(await surface.getAttribute('data-interaction-target') === 'fb-create', 'opener did not reach exact fb-create target');
    },
  },
  {
    id: 'M44-03', name: MUTATION_GUARDS['M44-03'],
    run: async (page) => {
      const { surface } = await openConfirm(page);
      invariant(await surface.getAttribute('role') === 'dialog', 'confirmation lacks role=dialog');
      invariant(await surface.getAttribute('aria-modal') === 'true', 'confirmation lacks aria-modal=true');
      const label = await surface.getAttribute('aria-labelledby');
      invariant(Boolean(label) && await page.locator(`#${label}`).count() === 1, 'confirmation lacks one valid accessible name reference');
    },
  },
  {
    id: 'M44-04', name: MUTATION_GUARDS['M44-04'],
    run: async (page) => {
      const { surface } = await openConfirm(page);
      const cancel = await mustVisible(page, '.interaction-surface [data-interaction-cancel]', 'safe initial confirmation action');
      invariant(await cancel.evaluate((node) => node === document.activeElement), `unsafe initial focus: ${await activeTag(page)}`);
      const focusables = surface.locator('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const count = await focusables.count();
      invariant(count >= 2, 'confirmation needs at least two focusable actions');
      await focusables.last().focus();
      await page.keyboard.press('Tab');
      invariant(await focusables.first().evaluate((node) => node === document.activeElement), 'Tab did not wrap to first surface control');
      await focusables.first().focus();
      await page.keyboard.press('Shift+Tab');
      invariant(await focusables.last().evaluate((node) => node === document.activeElement), 'Shift+Tab did not wrap to last surface control');
      const background = await must(page, '#page-body', 'background page body');
      invariant(await background.evaluate((node) => Boolean(node.closest('[inert], [aria-hidden="true"]'))), 'background remains interactive while modal-grade surface is open');
    },
  },
  {
    id: 'M44-05', name: MUTATION_GUARDS['M44-05'],
    run: async (page) => {
      const { opener, surface } = await openConfirm(page);
      await closeFrom(surface);
      await page.waitForTimeout(350);
      invariant(await opener.evaluate((node) => node === document.activeElement), `focus was not restored to the exact opener: ${await activeTag(page)}`);
    },
  },
  {
    id: 'M44-06', name: MUTATION_GUARDS['M44-06'],
    run: async (page) => {
      await openConfirm(page);
      await page.keyboard.press('Escape');
      await page.waitForTimeout(250);
      invariant(await page.locator('.interaction-surface:visible').count() === 0, 'safe Escape did not close confirmation');
      await openConfirm(page);
      const overlay = await mustVisible(page, '.interaction-overlay', 'shared confirmation overlay');
      await overlay.click({ position: { x: 2, y: 2 } });
      await page.waitForTimeout(250);
      invariant(await page.locator('.interaction-surface:visible').count() === 0, 'safe overlay click did not close confirmation');
    },
  },
  {
    id: 'M44-07', name: MUTATION_GUARDS['M44-07'],
    run: async (page) => {
      const { surface } = await openForm(page);
      const input = await mustVisible(page, '.interaction-surface input:not([type="hidden"]), .interaction-surface textarea', 'editable text form control');
      const original = await input.inputValue();
      await input.fill(`${original} changed`);
      await page.keyboard.press('Escape');
      invariant(await surface.isVisible(), 'dirty surface closed without warning');
      const warning = await mustVisible(page, '.interaction-surface [data-interaction-discard-state]', 'in-surface discard warning');
      invariant(await page.locator('.interaction-overlay:visible').count() === 1, 'dirty warning created multiple overlays');
      const continueButton = warning.locator('[data-interaction-continue]').first();
      invariant(await continueButton.count() === 1, 'continue-editing action missing');
      await continueButton.click();
      invariant(await input.inputValue() === `${original} changed`, 'canceling discard erased user data');
      const leaked = await page.evaluate((sentinel) => {
        const storage = `${localStorage.length ? JSON.stringify(localStorage) : ''}${sessionStorage.length ? JSON.stringify(sessionStorage) : ''}`;
        return location.href.includes(sentinel) || document.documentElement.outerHTML.includes(`value="${sentinel}"`) || storage.includes(sentinel);
      }, `${original} changed`);
      invariant(!leaked, 'dirty value leaked to URL, serialized attributes, or web storage');
    },
  },
  {
    id: 'M44-08', name: MUTATION_GUARDS['M44-08'],
    run: async (page) => {
      await openForm(page);
      await page.locator('[data-confirm]').first().evaluate((node) => node.click());
      await page.waitForTimeout(100);
      invariant(await page.locator('.interaction-overlay:visible').count() === 1, 'more than one modal-grade overlay became active');
      invariant(await page.locator('.interaction-surface:visible').count() === 1, 'more than one focus-trapped surface became active');
    },
  },
  {
    id: 'M44-09', name: MUTATION_GUARDS['M44-09'],
    run: async (page) => {
      await goto(page, 'reports.html', { width: 390, height: 480 });
      await page.evaluate(() => window.scrollTo(0, 320));
      const before = await page.evaluate(() => window.scrollY);
      invariant(before > 0, 'scroll-restoration scenario did not establish a non-zero baseline');
      const opener = await mustVisible(page, '[data-action="open-drawer"]', 'fixed mobile/sidebar opener');
      await opener.click();
      const surface = await mustVisible(page, '.interaction-surface');
      invariant(await page.evaluate(() => document.body.hasAttribute('data-interaction-locked')), 'body was not locked while surface was open');
      await closeFrom(surface);
      await page.waitForTimeout(350);
      const after = await page.evaluate(() => window.scrollY);
      invariant(after === before, `scroll position changed across close: ${before} -> ${after}`);
    },
  },
  {
    id: 'M44-10', name: MUTATION_GUARDS['M44-10'],
    run: async (page) => {
      const { surface } = await openForm(page, 'students.html', 'stu-add', { width: 390, height: 844 });
      const rect = await surface.boundingBox();
      invariant(rect && rect.x >= -0.5 && rect.y >= -0.5 && rect.width <= 390.5 && rect.height <= 844.5, `390px surface escapes viewport: ${JSON.stringify(rect)}`);
      invariant(rect.width >= 389, `390px form is not full-screen width: ${rect.width}`);
      invariant(await surface.evaluate((node) => node.scrollWidth <= node.clientWidth), '390px interaction surface creates horizontal overflow');
      invariant(await page.evaluate(() => getComputedStyle(document.body).overflow === 'hidden'), '390px background horizontal overflow is not locked');
      invariant(await page.evaluate(() => document.documentElement.hasAttribute('data-interaction-locked') && getComputedStyle(document.documentElement).overflowX === 'hidden'), 'modal-grade surface did not lock root horizontal overflow');
      invariant(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), 'locked background widens the 390px root viewport');
    },
  },
  {
    id: 'mobile-keyboard', name: 'layout.mobile-keyboard-viewport',
    run: async (page) => {
      const { surface } = await openForm(page, 'students.html', 'stu-add', { width: 390, height: 480 });
      const field = surface.locator('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])').last();
      invariant(await field.count() === 1, 'keyboard-sensitive surface lacks a final editable field');
      await field.focus();
      await field.evaluate((node) => node.scrollIntoView({ block: 'nearest' }));
      const fieldRect = await field.boundingBox();
      const footerRect = await surface.locator('.interaction-footer').boundingBox();
      invariant(fieldRect && footerRect, 'keyboard-sensitive field/footer geometry is unavailable');
      invariant(fieldRect.y >= -0.5 && fieldRect.y + fieldRect.height <= footerRect.y + 0.5, `focused field is hidden behind the stable footer: field=${JSON.stringify(fieldRect)} footer=${JSON.stringify(footerRect)}`);
      invariant(footerRect.y + footerRect.height <= 480.5, `keyboard-sensitive primary action is off-screen: ${JSON.stringify(footerRect)}`);
    },
  },
  {
    id: 'form-focus', name: 'interaction.form-purposeful-focus',
    run: async (page) => {
      const { surface } = await openForm(page);
      const firstMeaningful = surface.locator('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])').first();
      invariant(await firstMeaningful.count() === 1, 'form lacks a declared meaningful initial-focus target');
      invariant(await firstMeaningful.evaluate((node) => node === document.activeElement), `form initial focus is not purposeful: ${await activeTag(page)}`);
    },
  },
  {
    id: 'validation', name: 'interaction.accessible-validation-preserves-data',
    run: async (page) => {
      const { surface } = await openForm(page);
      const input = await mustVisible(page, '.interaction-surface input:not([type="hidden"]), .interaction-surface textarea', 'validation probe field');
      const original = await input.inputValue();
      await input.evaluate((node) => node.setCustomValidity('Spec 044 validation probe'));
      await (await mustVisible(page, '.interaction-surface [data-interaction-submit]', 'validation submit action')).click();
      invariant(await input.inputValue() === original, 'validation failure erased invalid value');
      invariant(await input.getAttribute('aria-invalid') === 'true', 'invalid field lacks aria-invalid=true');
      const description = await input.getAttribute('aria-describedby');
      invariant(Boolean(description) && await page.locator(`#${description}:visible`).count() === 1, 'invalid field lacks one visible aria-describedby message');
      const summary = surface.locator('[data-interaction-error-summary]').first();
      const focused = await input.evaluate((node) => node === document.activeElement)
        || (await summary.count() === 1 && await summary.evaluate((node) => node === document.activeElement));
      invariant(focused, 'validation did not focus the invalid field or error summary');
      await input.evaluate((node) => node.setCustomValidity(''));
      await input.fill(`${original} corrected`);
      invariant(await input.getAttribute('aria-invalid') === null, 'corrected field retained stale aria-invalid state');
      invariant(await summary.isHidden(), 'correcting the final invalid field left a stale error summary');
    },
  },
  {
    id: 'generic', name: 'interaction.generic-modal-shared-host',
    run: async (page) => {
      await goto(page, 'add-family.html');
      const tabs = page.locator('[data-step-go]');
      invariant(await tabs.count() > 0, 'wizard step controls missing');
      await tabs.last().click();
      const opener = await mustVisible(page, '[data-modal-trigger]', 'generic backend-required modal opener');
      await opener.click();
      const surface = await mustVisible(page, '.interaction-surface[data-interaction-family="informational"]', 'generic shared modal surface');
      invariant(await surface.getAttribute('role') === 'dialog' && await surface.getAttribute('aria-modal') === 'true', 'generic modal lacks shared modal semantics');
      invariant(!/saved|success|تم الحفظ|نجاح/i.test(await surface.textContent()), 'generic backend-required modal claims false success');
    },
  },
  {
    id: 'M44-11', name: MUTATION_GUARDS['M44-11'],
    run: async (page) => {
      const { surface } = await openForm(page, 'leads.html', 'lead-new', { width: 390, height: 844 });
      await mustVisible(page, '.interaction-surface .interaction-header', 'stable header');
      const content = await mustVisible(page, '.interaction-surface .interaction-content', 'scrollable content');
      const footer = await mustVisible(page, '.interaction-surface .interaction-footer', 'stable action footer');
      invariant((await content.evaluate((node) => getComputedStyle(node).overflowY)) === 'auto', 'long-form content is not independently scrollable');
      const rect = await footer.boundingBox();
      invariant(rect && rect.y + rect.height <= 844.5, 'primary action footer is off-screen');
    },
  },
  {
    id: 'M44-12', name: MUTATION_GUARDS['M44-12'],
    run: async (page) => {
      const { surface } = await openForm(page);
      const input = await mustVisible(page, '.interaction-surface input, .interaction-surface textarea, .interaction-surface select');
      const preserved = await input.inputValue();
      const submit = await mustVisible(page, '.interaction-surface [data-interaction-submit]', 'truthful terminal action');
      await submit.click();
      const state = await mustVisible(page, '.interaction-surface [data-interaction-backend-state]', 'in-surface backend-required state');
      invariant((await state.textContent()).includes(BACKEND_REQUIRED.ar), 'Arabic backend-required state is not truthful/exact');
      invariant(await input.inputValue() === preserved, 'backend-required state erased form input');
      invariant(!/تم الحفظ|نجاح|saved|success/i.test(await state.textContent()), 'backend-required state contains false success wording');
      invariant(await page.locator('.interaction-surface [aria-busy="true"]').count() === 0, 'fake loading state appears without real asynchronous work');
    },
  },
  {
    id: 'M44-13', name: MUTATION_GUARDS['M44-13'],
    run: async (page) => {
      for (const [file, expected] of [['reports.html', BACKEND_REQUIRED.ar], ['reports.en.html', BACKEND_REQUIRED.en]]) {
        const { surface } = await openForm(page, file, 'fb-create');
        await (await mustVisible(page, '.interaction-surface [data-interaction-submit]')).click();
        const state = await mustVisible(page, '.interaction-surface [data-interaction-backend-state]');
        invariant((await state.textContent()).includes(expected), `${file} missing exact backend-required locale copy`);
      }
    },
  },
  {
    id: 'M44-14', name: MUTATION_GUARDS['M44-14'],
    run: async (page) => {
      await goto(page, 'reports.html');
      await page.evaluate(() => {
        window.__spec044Error = null;
        document.addEventListener('interaction:error', (event) => { window.__spec044Error = event.detail; }, { once: true });
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.dataset.drawer = 'spec044-missing-target';
        document.body.appendChild(trigger);
        trigger.click();
      });
      await page.waitForTimeout(50);
      const error = await page.evaluate(() => window.__spec044Error);
      invariant(error && error.code === 'missing-target' && error.target === 'spec044-missing-target', 'missing required target was swallowed instead of emitting exact interaction:error');
    },
  },
  {
    id: 'M44-15', name: MUTATION_GUARDS['M44-15'],
    run: async (page) => {
      await goto(page, 'attendance.html');
      const duplicates = await page.evaluate(() => {
        const ids = ['f-fbAdd-category', 'f-fbAdd-remark', 'f-fbAdd-note'];
        const roots = [];
        const visit = (root) => { roots.push(root); for (const template of root.querySelectorAll('template')) visit(template.content); };
        visit(document);
        return ids.flatMap((id) => {
          const count = roots.reduce((total, root) => total + root.querySelectorAll(`[id="${id}"]`).length, 0);
          return count > 1 ? [`${id}×${count}`] : [];
        });
      });
      invariant(duplicates.length === 0, `recursive duplicate IDs remain: ${duplicates.join(', ')}`);
    },
  },
  {
    id: 'dropdown', name: 'interaction.dropdown-non-modal',
    run: async (page) => {
      await goto(page, 'dashboard.html');
      const opener = await mustVisible(page, '[data-action="profile-menu"]', 'profile menu opener');
      await opener.click();
      const menu = await mustVisible(page, '[role="menu"]', 'profile dropdown');
      invariant(!await menu.getAttribute('aria-modal'), 'dropdown incorrectly uses aria-modal');
      const items = menu.locator('[role="menuitem"], button, a');
      invariant(await items.count() > 1, 'dropdown lacks keyboard items');
      await page.keyboard.press('End');
      invariant(await items.last().evaluate((node) => node === document.activeElement), 'End did not move to last menu item');
      await page.keyboard.press('Home');
      invariant(await items.first().evaluate((node) => node === document.activeElement), 'Home did not move to first menu item');
      await page.keyboard.press('Escape');
      invariant(await opener.evaluate((node) => node === document.activeElement), 'dropdown Escape did not restore logical opener focus');
    },
  },
  {
    id: 'sidebar', name: 'interaction.mobile-sidebar-modal-grade',
    run: async (page) => {
      await goto(page, 'dashboard.html', { width: 390, height: 844 });
      const opener = await mustVisible(page, '[data-action="open-drawer"]', 'mobile sidebar opener');
      await opener.click();
      const surface = await mustVisible(page, '.interaction-surface[data-interaction-family="sidebar"]', 'shared mobile sidebar surface');
      invariant(await surface.getAttribute('aria-modal') === 'true', 'mobile sidebar is not modal-grade');
      await page.keyboard.press('Escape');
      invariant(await opener.evaluate((node) => node === document.activeElement), 'mobile sidebar did not restore opener focus');
    },
  },
  {
    id: 'wizard', name: 'interaction.wizard-state-preservation',
    run: async (page) => {
      await goto(page, 'add-family.html');
      const wizard = await must(page, '[data-wizard]', 'dedicated-page wizard');
      const input = wizard.locator('input, textarea, select').first();
      invariant(await input.count() === 1, 'wizard has no editable control');
      const original = await input.inputValue();
      await input.fill(`${original} spec044`);
      await (await mustVisible(page, '[data-step-next]', 'wizard next action')).click();
      await (await mustVisible(page, '[data-step-prev]', 'wizard previous action')).click();
      invariant(await input.inputValue() === `${original} spec044`, 'wizard step navigation erased entered value');
      const departure = await mustVisible(page, '.sidebar a[href="families.html"]', 'wizard departure link');
      const currentUrl = page.url();
      await departure.click();
      invariant(page.url() === currentUrl, 'dirty dedicated page navigated without warning');
      const discard = await mustVisible(page, '[data-page-discard-state]', 'dedicated-page inline discard warning');
      await discard.locator('[data-page-continue]').click();
      invariant(await input.inputValue() === `${original} spec044`, 'canceling dedicated-page discard erased data');

      const hiddenCandidate = wizard.locator('[data-step][hidden] input:not([type="hidden"]), [data-step][hidden] textarea, [data-step][hidden] select').first();
      invariant(await hiddenCandidate.count() === 1, 'wizard has no hidden-step validation target');
      const hiddenId = await hiddenCandidate.getAttribute('id');
      invariant(Boolean(hiddenId), 'hidden-step validation target lacks a stable ID');
      const hiddenInput = page.locator(`#${hiddenId}`);
      const hiddenValue = await hiddenInput.inputValue();
      await hiddenInput.evaluate((node) => node.setCustomValidity('Spec 044 hidden-step validation'));
      const tabs = wizard.locator('[data-step-go]');
      await tabs.last().click();
      await (await mustVisible(page, '[data-modal-trigger][data-modal-note-key]', 'wizard terminal action')).click();
      invariant(await page.locator('.interaction-overlay:visible').count() === 0, 'wizard opened terminal state while hidden validation error remained');
      invariant(await hiddenInput.getAttribute('aria-invalid') === 'true', 'hidden-step invalid field was not surfaced');
      invariant(await hiddenInput.inputValue() === hiddenValue, 'hidden-step validation erased data');
      invariant(await hiddenInput.evaluate((node) => !node.closest('[data-step]').hidden), 'wizard did not reveal the step containing the invalid field');
      await hiddenInput.evaluate((node) => node.setCustomValidity(''));
      await hiddenInput.fill(`${hiddenValue} reviewed`);
      await tabs.last().click();
      await (await mustVisible(page, '[data-modal-trigger][data-modal-note-key]', 'wizard truthful terminal action')).click();
      const terminal = await mustVisible(page, '.interaction-surface[data-interaction-family="informational"]', 'wizard backend-required state');
      invariant((await terminal.textContent()).includes(BACKEND_REQUIRED.ar), 'wizard terminal state is not the exact truthful backend-required copy');
    },
  },
];

async function main() {
  await waitForServer();
  const selected = requestedGuard
    ? scenarios.filter((scenario) => scenario.id === requestedGuard || scenario.name === requestedGuard)
    : scenarios;
  invariant(selected.length > 0, `unknown guard selection: ${requestedGuard}`);
  const browser = await chromium.launch({ headless: true });
  const failures = [];
  let passed = 0;
  try {
    for (const scenario of selected) {
      const page = await browser.newPage();
      const consoleErrors = [];
      const pageErrors = [];
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('pageerror', (error) => pageErrors.push(error.message));
      try {
        await scenario.run(page);
        invariant(pageErrors.length === 0, `page errors: ${pageErrors.join(' | ')}`);
        if (scenario.id !== 'M44-14') invariant(consoleErrors.length === 0, `console errors: ${consoleErrors.join(' | ')}`);
        passed += 1;
        console.log(`PASS ${scenario.id} ${scenario.name}`);
      } catch (error) {
        failures.push({ scenario, error });
        console.error(`FAIL ${scenario.id} ${scenario.name}: ${error.message}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  console.log(`Spec 044 interaction guards: ${passed}/${selected.length} PASS, ${failures.length} RED`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(`FAIL interaction.runner: ${error && error.stack ? error.stack : error}`);
  process.exitCode = 1;
}).finally(() => {
  server.close();
});
