'use strict';

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ACCEPTED_BASELINE = '7d2397b110f8d3311402d02f93719395b7d46e68';
const APP = path.resolve(__dirname, '../..');
const PROJECT = path.resolve(APP, '..');
const GIT_ROOT = execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: PROJECT, encoding: 'utf8' }).trim();
const GIT_PREFIX = path.relative(GIT_ROOT, APP).split(path.sep).join('/');

function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

function git(args) {
  return execFileSync('git', args, { cwd: GIT_ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
}

function historical(relative) {
  return git(['show', `${ACCEPTED_BASELINE}:${GIT_PREFIX}/${relative}`]);
}

function digest(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function extractPageBody(html, label) {
  const openingPattern = /<([a-z][\w:-]*)\b[^>]*\bid\s*=\s*(["'])page-body\2[^>]*>/gi;
  const openings = Array.from(html.matchAll(openingPattern));
  invariant(openings.length === 1, `${label}: expected exactly one #page-body, got ${openings.length}`);
  const opening = openings[0];
  const tag = opening[1].toLowerCase();
  const start = opening.index;
  const scanner = /<!--[\s\S]*?-->|<\/?([a-z][\w:-]*)\b[^>]*>/gi;
  scanner.lastIndex = start + opening[0].length;
  let depth = 1;
  for (let token = scanner.exec(html); token; token = scanner.exec(html)) {
    if (!token[1] || token[1].toLowerCase() !== tag) continue;
    if (token[0].startsWith('</')) depth -= 1;
    else if (!token[0].endsWith('/>')) depth += 1;
    if (depth === 0) return html.slice(start, scanner.lastIndex);
  }
  throw new Error(`${label}: parser could not find the matching </${tag}> for #page-body`);
}

function matrixCount(source, declaration, label) {
  const start = source.indexOf(declaration);
  invariant(start >= 0, `${label}: matrix declaration is missing`);
  const end = source.indexOf('\n];', start);
  invariant(end > start, `${label}: matrix terminator is missing`);
  return (source.slice(start, end).match(/^\s*\{\s*page:/gm) || []).length;
}

function scenarioCount(source) {
  const start = source.indexOf('const scenarios = [');
  invariant(start >= 0, 'interaction runner: scenarios declaration is missing');
  const end = source.indexOf('\n];', start);
  invariant(end > start, 'interaction runner: scenarios terminator is missing');
  return (source.slice(start, end).match(/^\s*id:/gm) || []).length;
}

function changedWorkingPaths(scope) {
  const tracked = git(['diff', '--name-only', ACCEPTED_BASELINE, '--', `${GIT_PREFIX}/${scope}`]).trim().split('\n').filter(Boolean);
  const untracked = git(['ls-files', '--others', '--exclude-standard', '--', `${GIT_PREFIX}/${scope}`]).trim().split('\n').filter(Boolean);
  return Array.from(new Set([...tracked, ...untracked])).sort();
}

function main() {
  const publicDir = path.join(APP, 'public');
  const currentFiles = fs.readdirSync(publicDir).filter((name) => name.endsWith('.html')).sort();
  const historicalFiles = git(['ls-tree', '-r', '--name-only', ACCEPTED_BASELINE, `${GIT_PREFIX}/public`])
    .trim().split('\n').filter((name) => name.endsWith('.html')).map((name) => path.basename(name)).sort();
  invariant(currentFiles.length === 115, `current HTML count must be 115, got ${currentFiles.length}`);
  invariant(historicalFiles.length === 115, `historical HTML count must be 115, got ${historicalFiles.length}`);
  invariant(JSON.stringify(currentFiles) === JSON.stringify(historicalFiles), 'HTML path inventory changed unexpectedly');

  const changedFiles = [];
  const changedBodies = [];
  const unchangedBodies = [];
  for (const file of currentFiles) {
    const relative = `public/${file}`;
    const current = fs.readFileSync(path.join(APP, relative), 'utf8');
    const before = historical(relative);
    if (digest(current) !== digest(before)) changedFiles.push(file);
    if (file === 'index.html') {
      invariant(!/\bid\s*=\s*(["'])page-body\1/i.test(current), 'current index.html unexpectedly has #page-body');
      invariant(!/\bid\s*=\s*(["'])page-body\1/i.test(before), 'historical index.html unexpectedly has #page-body');
      continue;
    }
    const currentBody = extractPageBody(current, `current ${file}`);
    const beforeBody = extractPageBody(before, `historical ${file}`);
    (digest(currentBody) === digest(beforeBody) ? unchangedBodies : changedBodies).push(file);
  }
  invariant(changedBodies.length + unchangedBodies.length === 114, 'page-body accounting does not total 114');

  const sourceFiles = changedWorkingPaths('src');
  const generatedFiles = changedWorkingPaths('public');
  const testFiles = changedWorkingPaths('tests');
  const currentA11y = fs.readFileSync(path.join(APP, 'tests/a11y/run.cjs'), 'utf8');
  const beforeA11y = historical('tests/a11y/run.cjs');
  const currentShots = fs.readFileSync(path.join(APP, 'tests/screenshots/capture.cjs'), 'utf8');
  const beforeShots = historical('tests/screenshots/capture.cjs');
  const currentInteractions = fs.readFileSync(path.join(APP, 'tests/interaction/run.cjs'), 'utf8');

  const report = {
    baseline: ACCEPTED_BASELINE,
    html: { total: currentFiles.length, changedFiles: changedFiles.length, changedPaths: changedFiles },
    pageBodies: { total: 114, changed: changedBodies.length, unchanged: unchangedBodies.length, changedPaths: changedBodies },
    pages: { added: 0, removed: 0 },
    sourceFiles,
    generatedFiles,
    testFiles,
    testMatrices: {
      smoke: { before: 114, after: 114 },
      accessibility: { before: matrixCount(beforeA11y, 'const MATRIX = [', 'historical a11y'), after: matrixCount(currentA11y, 'const MATRIX = [', 'current a11y') },
      screenshots: { before: matrixCount(beforeShots, 'const MATRIX = [', 'historical screenshots'), after: matrixCount(currentShots, 'const MATRIX = [', 'current screenshots') },
      interaction: { before: 0, after: scenarioCount(currentInteractions) },
    },
  };
  console.log(JSON.stringify(report, null, 2));
}

try {
  main();
} catch (error) {
  console.error(`IMPACT FAILED: ${error && error.stack ? error.stack : error}`);
  process.exitCode = 1;
}
