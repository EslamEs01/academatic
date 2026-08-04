'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { BASELINE, FINAL, BACKEND_REQUIRED } = require('./expected.cjs');

const APP_ROOT = path.resolve(__dirname, '../..');
const PUBLIC_DIR = path.join(APP_ROOT, 'public');
const SOURCE_DIR = path.join(APP_ROOT, 'src/js');
const BASELINE_MODE = process.argv.includes('--baseline');
const MENU_ACTIONS = ['profile-menu', 'command-palette', 'apps-grid', 'quick-actions', 'notifications', 'theme-menu', 'lang-menu'];

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

function walkFiles(dir, predicate, out = []) {
  if (!fs.existsSync(dir)) throw new Error(`inventory.parser: missing expected source directory ${dir}`);
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, predicate, out);
    else if (entry.isFile() && predicate(full)) out.push(full);
  }
  return out;
}

function localeFor(file) {
  if (file === 'index.html') return 'redirect';
  return file.endsWith('.en.html') ? 'en' : 'ar';
}

function routeFor(file) {
  return file.replace(/\.en\.html$/, '').replace(/\.html$/, '');
}

async function inspectPage(page, file, html) {
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  return page.evaluate(({ file, menuActions, backendKey, knownDuplicateIds }) => {
    const roots = [];
    const templates = [];

    function visit(root, depth) {
      roots.push(root);
      for (const template of root.querySelectorAll('template')) {
        if (template.getRootNode() !== root) continue;
        if (template.hasAttribute('data-preview')) templates.push({ template, depth });
        visit(template.content, depth + 1);
      }
    }
    visit(document, 0);

    const all = (selector) => roots.flatMap((root) => [...root.querySelectorAll(selector)]);
    const attrs = (selector, name) => all(selector).map((node) => node.getAttribute(name));
    const targetRecords = templates.map(({ template, depth }) => {
      const clone = template.content.cloneNode(true);
      clone.querySelectorAll('template').forEach((nested) => nested.remove());
      const hasControls = Boolean(clone.querySelector('input, select, textarea'));
      return {
        id: template.getAttribute('data-preview'),
        depth,
        hasControls,
        family: template.getAttribute('data-interaction-family'),
        presentation: template.getAttribute('data-interaction-presentation'),
      };
    });

    const duplicateIdRecords = [];
    for (const id of knownDuplicateIds) {
      const count = all(`[id="${CSS.escape(id)}"]`).length;
      if (count > 1) duplicateIdRecords.push({ id, count });
    }

    const staticTargets = attrs('[data-drawer]', 'data-drawer');
    const targetIds = new Set(targetRecords.map((record) => record.id));
    const unresolvedStaticTargets = staticTargets.filter((id) => !id || !targetIds.has(id));
    const duplicateTargetIds = [...new Set(targetRecords.map((record) => record.id)
      .filter((id, index, ids) => id && ids.indexOf(id) !== index))];

    return {
      file,
      pageBodyCount: document.querySelectorAll('#page-body').length,
      targetRecords,
      staticDrawerTriggers: staticTargets.length,
      unresolvedStaticTargets,
      duplicateTargetIds,
      dynamicRowMenuTriggers: all('[data-row-menu]').length,
      confirmations: all('[data-confirm]').length,
      destructiveConfirmations: all('[data-confirm-danger="1"], .btn-danger[data-confirm], .btn-ghost[data-confirm]').length,
      genericModalTriggers: all('[data-modal-trigger]').length,
      shellGlobalMenus: menuActions.reduce((count, action) => count + all(`[data-action="${action}"]`).length, 0),
      mobileSidebarOpeners: all('[data-action="open-drawer"]').length,
      dedicatedPageWizards: all('[data-wizard]').length,
      backendRequiredInstances: all(`[data-reason-key="${backendKey}"], [data-modal-note-key="${backendKey}"]`).length,
      duplicateIdRecords,
    };
  }, { file, menuActions: MENU_ACTIONS, backendKey: BACKEND_REQUIRED.key, knownDuplicateIds: BASELINE.knownDuplicateFieldIds });
}

function sum(records, field) {
  return records.reduce((total, record) => total + record[field], 0);
}

function summarize(records) {
  const product = records.filter((record) => record.locale !== 'redirect');
  const targetRecords = product.flatMap((record) => record.targetRecords);
  const forms = targetRecords.filter((target) => target.hasControls);
  const details = targetRecords.filter((target) => !target.hasControls);
  const byLocale = Object.fromEntries(['ar', 'en'].map((locale) => {
    const localized = product.filter((record) => record.locale === locale);
    const targets = localized.flatMap((record) => record.targetRecords);
    const localizedForms = targets.filter((target) => target.hasControls);
    return [locale, {
      routes: new Set(localized.map((record) => record.route)).size,
      targets: targets.length,
      forms: localizedForms.length,
      topLevelForms: localizedForms.filter((target) => target.depth === 0).length,
      nestedForms: localizedForms.filter((target) => target.depth > 0).length,
      details: targets.filter((target) => !target.hasControls).length,
      staticDrawerTriggers: sum(localized, 'staticDrawerTriggers'),
      dynamicRowMenuTriggers: sum(localized, 'dynamicRowMenuTriggers'),
      confirmations: sum(localized, 'confirmations'),
      destructiveConfirmations: sum(localized, 'destructiveConfirmations'),
      genericModalTriggers: sum(localized, 'genericModalTriggers'),
      shellGlobalMenus: sum(localized, 'shellGlobalMenus'),
      menus: sum(localized, 'shellGlobalMenus') + sum(localized, 'dynamicRowMenuTriggers'),
      mobileSidebarOpeners: sum(localized, 'mobileSidebarOpeners'),
      dedicatedPageWizards: sum(localized, 'dedicatedPageWizards'),
      backendRequiredInstances: sum(localized, 'backendRequiredInstances'),
      duplicateIdRecords: localized.reduce((count, record) => count + record.duplicateIdRecords.length, 0),
      duplicateTargetRecords: localized.reduce((count, record) => count + record.duplicateTargetIds.length, 0),
    }];
  }));
  return { product, targetRecords, forms, details, byLocale };
}

function verifyBaseline(records, summary, authoredConsumers, failures) {
  const htmlFiles = records.length;
  const bodies = records.reduce((count, record) => count + record.pageBodyCount, 0);
  const bodyExceptions = records.filter((record) => record.pageBodyCount === 0).map((record) => record.file);
  const invalidBodies = records.filter((record) => record.pageBodyCount > 1);
  assert(htmlFiles === BASELINE.htmlFiles, `inventory.pages: expected ${BASELINE.htmlFiles}, observed ${htmlFiles}`, failures);
  assert(bodies === BASELINE.pageBodies, `inventory.page-bodies: expected ${BASELINE.pageBodies}, observed ${bodies}`, failures);
  assert(JSON.stringify(bodyExceptions) === JSON.stringify(BASELINE.redirectNoBody), `inventory.page-body-exceptions: expected ${BASELINE.redirectNoBody.join(',')}, observed ${bodyExceptions.join(',')}`, failures);
  assert(invalidBodies.length === 0, `inventory.duplicate-page-body: ${invalidBodies.map((record) => `${record.file}:${record.pageBodyCount}`).join(', ')}`, failures);

  const routeKeys = summary.product.map((record) => `${record.locale}:${record.route}`);
  assert(new Set(routeKeys).size === routeKeys.length, 'inventory.duplicate-page-record: duplicate locale/route record detected', failures);
  for (const locale of ['ar', 'en']) {
    const value = summary.byLocale[locale];
    const expected = BASELINE;
    const checks = {
      routes: expected.routesPerLocale,
      targets: expected.drawerTargetsPerLocale,
      forms: expected.formTargetsPerLocale,
      topLevelForms: expected.topLevelFormTargetsPerLocale,
      nestedForms: expected.nestedFormTargetsPerLocale,
      details: expected.detailTargetsPerLocale,
      staticDrawerTriggers: expected.staticDrawerTriggersPerLocale,
      dynamicRowMenuTriggers: expected.dynamicRowMenuTriggersPerLocale,
      confirmations: expected.confirmationsPerLocale,
      destructiveConfirmations: expected.destructiveConfirmationsPerLocale,
      genericModalTriggers: expected.genericModalTriggersPerLocale,
      shellGlobalMenus: expected.shellGlobalMenusPerLocale,
      menus: expected.menusPerLocale,
      mobileSidebarOpeners: expected.mobileSidebarOpenersPerLocale,
      dedicatedPageWizards: expected.dedicatedPageWizardsPerLocale,
      backendRequiredInstances: expected.backendRequiredLocalizedInstancesByLocale[locale],
      duplicateIdRecords: BASELINE_MODE ? expected.knownDuplicateIdRecordsByLocale[locale] : FINAL.duplicateIdRecords,
      duplicateTargetRecords: BASELINE_MODE ? expected.knownDuplicateTargetRecordsByLocale[locale] : FINAL.duplicateTargetRecords,
    };
    for (const [field, wanted] of Object.entries(checks)) {
      assert(value[field] === wanted, `inventory.${locale}.${field}: expected ${wanted}, observed ${value[field]}`, failures);
    }
  }

  const unresolved = summary.product.flatMap((record) => record.unresolvedStaticTargets.map((id) => `${record.file}:${id || '<empty>'}`));
  assert(unresolved.length === 0, `inventory.opener-target: unresolved ${unresolved.join(', ')}`, failures);
  assert(authoredConsumers.length === BASELINE.backendRequiredAuthoredConsumers, `inventory.backend-authored-consumers: expected ${BASELINE.backendRequiredAuthoredConsumers}, observed ${authoredConsumers.length}: ${authoredConsumers.join(', ')}`, failures);
  const generatedPages = summary.product.filter((record) => record.backendRequiredInstances > 0);
  assert(generatedPages.length === BASELINE.backendRequiredGeneratedPages, `inventory.backend-generated-pages: expected ${BASELINE.backendRequiredGeneratedPages}, observed ${generatedPages.length}`, failures);
  assert(sum(summary.product, 'backendRequiredInstances') === BASELINE.backendRequiredLocalizedInstances, `inventory.backend-localized-instances: expected ${BASELINE.backendRequiredLocalizedInstances}, observed ${sum(summary.product, 'backendRequiredInstances')}`, failures);
}

function verifyFinal(summary, failures) {
  const duplicateIds = summary.product.flatMap((record) => record.duplicateIdRecords.map(({ id, count }) => `${record.file}:${id}×${count}`));
  assert(duplicateIds.length === FINAL.duplicateIdRecords, `inventory.recursive-duplicate-id: expected ${FINAL.duplicateIdRecords}, observed ${duplicateIds.length}: ${duplicateIds.slice(0, 20).join(', ')}`, failures);
  const duplicateTargets = summary.product.flatMap((record) => record.duplicateTargetIds.map((id) => `${record.file}:${id}`));
  assert(duplicateTargets.length === FINAL.duplicateTargetRecords, `inventory.duplicate-target-id: expected ${FINAL.duplicateTargetRecords}, observed ${duplicateTargets.length}: ${duplicateTargets.join(', ')}`, failures);
  const missingFamily = summary.product.flatMap((record) => record.targetRecords.filter((target) => !target.family).map((target) => `${record.file}:${target.id}`));
  assert(missingFamily.length === 0, `inventory.explicit-family: ${missingFamily.length} targets lack data-interaction-family; first ${missingFamily.slice(0, 10).join(', ')}`, failures);
  const invalidPresentation = summary.product.flatMap((record) => record.targetRecords.filter((target) => target.hasControls && !['modal', 'drawer'].includes(target.presentation)).map((target) => `${record.file}:${target.id}=${target.presentation || '<missing>'}`));
  assert(invalidPresentation.length === 0, `inventory.explicit-form-presentation: ${invalidPresentation.length} form targets lack modal/drawer presentation; first ${invalidPresentation.slice(0, 10).join(', ')}`, failures);
}

async function main() {
  const failures = [];
  if (!fs.existsSync(PUBLIC_DIR)) throw new Error(`inventory.parser: missing generated directory ${PUBLIC_DIR}`);
  const htmlFiles = fs.readdirSync(PUBLIC_DIR).filter((file) => file.endsWith('.html')).sort();
  if (!htmlFiles.length) throw new Error('inventory.parser: no generated HTML files found');
  const sourceFiles = walkFiles(SOURCE_DIR, (file) => file.endsWith('.js'));
  const authoredConsumers = sourceFiles.filter((file) => fs.readFileSync(file, 'utf8').includes(BACKEND_REQUIRED.key)).map((file) => path.relative(APP_ROOT, file)).sort();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const records = [];
  try {
    for (const file of htmlFiles) {
      const html = fs.readFileSync(path.join(PUBLIC_DIR, file), 'utf8');
      if (!html.trim()) throw new Error(`inventory.parser: empty generated file ${file}`);
      const record = await inspectPage(page, file, html);
      records.push({ ...record, locale: localeFor(file), route: routeFor(file) });
    }
  } finally {
    await browser.close();
  }

  const summary = summarize(records);
  verifyBaseline(records, summary, authoredConsumers, failures);
  if (!BASELINE_MODE) verifyFinal(summary, failures);
  if (failures.length) {
    for (const failure of failures) console.error(`FAIL ${failure}`);
    console.error(`Spec 044 inventory ${BASELINE_MODE ? 'baseline' : 'final'}: ${failures.length} failure(s)`);
    process.exitCode = 1;
    return;
  }
  console.log(`Spec 044 inventory ${BASELINE_MODE ? 'baseline' : 'final'}: PASS`);
  console.log(`HTML=${records.length} bodies=${BASELINE.pageBodies} routes=${summary.byLocale.ar.routes}+${summary.byLocale.en.routes}`);
  console.log(`per-locale targets=${summary.byLocale.ar.targets} forms=${summary.byLocale.ar.forms} details=${summary.byLocale.ar.details} confirmations=${summary.byLocale.ar.confirmations} menus=${summary.byLocale.ar.menus}`);
  console.log(`backend authored=${authoredConsumers.length} generated-pages=${summary.product.filter((record) => record.backendRequiredInstances > 0).length} localized-instances=${sum(summary.product, 'backendRequiredInstances')}`);
}

main().catch((error) => {
  console.error(`FAIL inventory.parser: ${error && error.stack ? error.stack : error}`);
  process.exitCode = 1;
});
