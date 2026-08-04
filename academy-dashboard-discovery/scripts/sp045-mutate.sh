#!/usr/bin/env bash
# Spec 045 mutation helper — copy the app surface to a fresh isolated /tmp dir.
# Prints the copy path on the last line. node_modules is symlinked (not mutation surface).
# Caller applies ONE verified textual mutation, builds, runs the owning guard, then `rm -rf` the copy.
set -euo pipefail
ID="${1:?mutation id e.g. M45-10}"
APP="/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery/app"
COPY="/tmp/sp045-mut-${ID}-$$"
rm -rf "$COPY" 2>/dev/null || true
mkdir -p "$COPY"
cp -a "$APP"/{src,scripts,tests,public,tailwind.config.js,postcss.config.js,package.json,package-lock.json} "$COPY/"
ln -s "$APP/node_modules" "$COPY/node_modules"
echo "$COPY"
