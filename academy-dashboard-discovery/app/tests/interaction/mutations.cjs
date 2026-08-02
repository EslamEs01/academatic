'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const { MUTATION_GUARDS } = require('./expected.cjs');

const PRIMARY_APP = path.resolve(__dirname, '../..');
const TEMP_PREFIX = 'academatic-spec044-mutation-';
const COPY_ENTRIES = [
  'src', 'public', 'scripts', 'tests',
  'package.json', 'package-lock.json', 'postcss.config.js', 'tailwind.config.js',
];
const PRIMARY_TARGETS = [
  'src/js/components/interaction-system.js',
  'src/js/components/outcome-details.js',
  'src/styles/app.css',
  'public/reports.html',
  'public/reports.en.html',
];

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function digest(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function replaceExact(app, relative, before, after) {
  const file = path.join(app, relative);
  const source = fs.readFileSync(file, 'utf8');
  const count = source.split(before).length - 1;
  invariant(count === 1, `${relative}: mutation anchor count must be 1, got ${count}`);
  fs.writeFileSync(file, source.replace(before, after));
}

function replaceRegex(app, relative, expression, replacement) {
  const file = path.join(app, relative);
  const source = fs.readFileSync(file, 'utf8');
  const matches = source.match(new RegExp(expression.source, expression.flags.includes('g') ? expression.flags : `${expression.flags}g`)) || [];
  invariant(matches.length === 1, `${relative}: regex mutation anchor count must be 1, got ${matches.length}`);
  fs.writeFileSync(file, source.replace(expression, replacement));
}

function run(command, args, cwd, timeout = 120000) {
  return spawnSync(command, args, {
    cwd,
    env: { ...process.env, SPEC044_PORT: '4294' },
    encoding: 'utf8',
    timeout,
    maxBuffer: 16 * 1024 * 1024,
  });
}

function createIsolatedCopy(id) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), `${TEMP_PREFIX}${id}-`));
  const app = path.join(root, 'app');
  fs.mkdirSync(app);
  for (const entry of COPY_ENTRIES) fs.cpSync(path.join(PRIMARY_APP, entry), path.join(app, entry), { recursive: true });
  fs.symlinkSync(path.join(PRIMARY_APP, 'node_modules'), path.join(app, 'node_modules'), 'dir');
  return { root, app };
}

const mutations = [
  {
    id: 'M44-01', error: 'required report feedback opener',
    mutate: (app) => replaceExact(app, 'public/reports.html', 'data-drawer="fb-create"', 'data-spec044-removed-drawer="fb-create"'),
  },
  {
    id: 'M44-02', error: 'fb-create shared surface',
    mutate: (app) => replaceExact(app, 'public/reports.html', 'data-preview="fb-create"', 'data-preview="fb-create-mutated"'),
  },
  {
    id: 'M44-03', error: 'confirmation lacks role=dialog',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js', "surface.setAttribute('role', 'dialog');", "surface.removeAttribute('role');"),
  },
  {
    id: 'M44-04', error: 'Tab did not wrap to first surface control',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js', "if (event.key !== 'Tab') return;", "if (event.key === 'Tab') { event.preventDefault(); active.surface.querySelector('[data-interaction-heading]').focus(); return; }"),
  },
  {
    id: 'M44-05', error: 'focus was not restored to the exact opener',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js', 'if (focusTarget && focusTarget.isConnected) focusTarget.focus({ preventScroll: true });', 'void focusTarget;'),
  },
  {
    id: 'M44-06', error: 'safe Escape did not close confirmation',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js', "if (event.key === 'Escape') {", "if (event.key === 'Spec044RemovedEscape') {"),
  },
  {
    id: 'M44-07', error: 'in-surface discard warning',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js',
      'export function closeInteraction() {\n  if (!active) return true;\n  if (active.operationLocked) return false;\n  updateDirty();\n  if (active.dirty) {',
      'export function closeInteraction() {\n  if (!active) return true;\n  if (active.operationLocked) return false;\n  updateDirty();\n  if (false && active.dirty) {'),
  },
  {
    id: 'M44-08', error: 'more than one modal-grade overlay became active',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js',
      "export function openInteraction(options) {\n  if (!options || !options.family || !options.content) throw new Error('openInteraction requires family and content');\n  if (active) {",
      "export function openInteraction(options) {\n  if (!options || !options.family || !options.content) throw new Error('openInteraction requires family and content');\n  if (false && active) {"),
  },
  {
    id: 'M44-09', error: 'scroll position changed across close',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js', 'window.scrollTo(locked.windowX, locked.windowY);', 'window.scrollTo(0, 0);'),
  },
  {
    id: 'M44-10', error: '390px form is not full-screen width', build: true,
    mutate: (app) => replaceExact(app, 'src/styles/app.css', 'width: 100vw; max-width: none;', 'width: calc(100vw - 40px); max-width: none;'),
  },
  {
    id: 'M44-11', error: 'stable action footer', build: true,
    mutate: (app) => replaceExact(app, 'src/styles/app.css', '.interaction-footer {\n    display: flex;', '.interaction-footer {\n    display: none;'),
  },
  {
    id: 'M44-12', error: 'Arabic backend-required state is not truthful/exact',
    mutate: (app) => replaceRegex(app, 'public/reports.html',
      /(<template data-preview="fb-create"[\s\S]*?<button[^>]*data-interaction-submit[^>]*title=")[^"]+("[^>]*>)/,
      '$1تم الحفظ بنجاح$2'),
  },
  {
    id: 'M44-13', error: 'reports.en.html missing exact backend-required locale copy',
    mutate: (app) => replaceRegex(app, 'public/reports.en.html',
      /(<template data-preview="fb-create"[\s\S]*?<button[^>]*data-interaction-submit[^>]*title=")[^"]+("[^>]*>)/,
      '$1This localized message is missing.$2'),
  },
  {
    id: 'M44-14', error: 'missing required target was swallowed',
    mutate: (app) => replaceExact(app, 'public/assets/js/components/interaction-system.js', "document.dispatchEvent(new CustomEvent('interaction:error', { detail }));", 'void detail;'),
  },
  {
    id: 'M44-15', error: 'recursive duplicate IDs remain', build: true,
    mutate: (app) => replaceExact(app, 'src/js/components/outcome-details.js', '`fbAdd-${outcomeId}`', "'fbAdd'"),
  },
];

function main() {
  const primaryBefore = Object.fromEntries(PRIMARY_TARGETS.map((relative) => [relative, digest(path.join(PRIMARY_APP, relative))]));
  const results = [];
  for (const mutation of mutations) {
    const copy = createIsolatedCopy(mutation.id);
    try {
      mutation.mutate(copy.app);
      if (mutation.build) {
        const build = run('npm', ['run', 'build'], copy.app, 180000);
        invariant(build.status === 0, `${mutation.id}: isolated build failed: ${(build.stderr || build.stdout).slice(-1200)}`);
      }
      const result = run('node', ['tests/interaction/run.cjs', '--guard', mutation.id], copy.app);
      const output = `${result.stdout || ''}\n${result.stderr || ''}`;
      invariant(result.status !== 0, `${mutation.id}: mutation unexpectedly stayed GREEN`);
      invariant(!result.error, `${mutation.id}: runner infrastructure error: ${result.error && result.error.message}`);
      invariant(output.includes(`FAIL ${mutation.id} ${MUTATION_GUARDS[mutation.id]}:`), `${mutation.id}: expected named guard did not fail`);
      invariant(output.includes(mutation.error), `${mutation.id}: RED was not caused by the intended assertion: ${output.slice(-1200)}`);
      invariant(output.includes('0/1 PASS, 1 RED'), `${mutation.id}: selected guard result was not exactly one RED`);
      invariant(!/SyntaxError|ERR_MODULE_NOT_FOUND|server unavailable|could not extract|MODULE_NOT_FOUND/.test(output), `${mutation.id}: unrelated infrastructure/load failure contaminated RED`);
      results.push(`${mutation.id} ${MUTATION_GUARDS[mutation.id]} — exact RED`);
      console.log(`RED ${mutation.id} ${MUTATION_GUARDS[mutation.id]} — intended assertion`);
    } finally {
      fs.rmSync(copy.root, { recursive: true, force: false });
    }
  }

  for (const [relative, before] of Object.entries(primaryBefore)) {
    invariant(digest(path.join(PRIMARY_APP, relative)) === before, `primary mutation residue changed ${relative}`);
  }
  const residue = fs.readdirSync(os.tmpdir()).filter((name) => name.startsWith(TEMP_PREFIX));
  invariant(residue.length === 0, `isolated mutation residue remains: ${residue.join(', ')}`);
  console.log(`Spec 044 mutations: ${results.length}/${mutations.length} exact RED · residue=0`);
}

try {
  main();
} catch (error) {
  console.error(`MUTATION FAILED: ${error && error.stack ? error.stack : error}`);
  process.exitCode = 1;
}
