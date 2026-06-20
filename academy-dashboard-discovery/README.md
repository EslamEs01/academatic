# Academy Dashboard Discovery Crawler

A read-only, discovery-oriented crawler for the Academatic admin dashboard. It logs in via Playwright, navigates the dashboard as each configured role, and produces structured JSON records, Markdown reports, sanitized HTML snapshots, full-page screenshots, and LLM-ready documentation. The output is used to inform the design and architecture of a **new, original frontend** built from scratch with a spec-kit. It does **not** clone the existing frontend.

---

## Table of Contents

1. [Project Purpose](#1-project-purpose)
2. [Safety and Legal Notes](#2-safety-and-legal-notes)
3. [Install Dependencies](#3-install-dependencies)
4. [Create the .env.crawler File](#4-create-the-envcrawler-file)
5. [Save Auth State Per Role](#5-save-auth-state-per-role)
6. [Crawl a Single Role](#6-crawl-a-single-role)
7. [Crawl All Roles](#7-crawl-all-roles)
8. [Run the Coverage Audit](#8-run-the-coverage-audit)
9. [Open the Combined Report](#9-open-the-combined-report)
10. [Add a New Role](#10-add-a-new-role)
11. [Troubleshoot Login and Session Expiry](#11-troubleshoot-login-and-session-expiry)
12. [Sensitive Files and .gitignore](#12-sensitive-files-and-gitignore)
13. [Recommended Workflow Before Frontend Rebuild](#13-recommended-workflow-before-frontend-rebuild)
14. [npm Scripts Reference](#14-npm-scripts-reference)
15. [Offline Snapshots Note](#15-offline-snapshots-note)

---

## 1. Project Purpose

This project is a **discovery and documentation tool**, not a cloning tool.

Goals:
- Navigate the Academatic dashboard as different user roles (admin, teacher, family/guardian).
- Record every reachable page: its URL, title, headings, navigation structure, forms, tables, cards, modals, interactive elements, and design tokens.
- Produce structured JSON page records and human-readable Markdown reports.
- Capture full-page screenshots and sanitized HTML snapshots for offline review.
- Collect a cross-role permission matrix: which modules/pages/buttons/forms each role can see.
- Generate a combined audit and HTML report that surfaces coverage gaps.

The output feeds a **spec-kit** phase where a **new, original, improved frontend** is designed and built independently. Nothing in this project copies proprietary code, templates, or designs pixel-for-pixel.

---

## 2. Safety and Legal Notes

- **Read-only.** The crawler never fills forms with real data, never submits, never clicks mutating or destructive controls (delete, save, send, approve, reject, pay, etc.). Every control is classified before touching it; unsafe controls are recorded but skipped.
- **Never mutates target data.** No records are created, modified, or deleted on the target platform.
- **Credentials are never hardcoded, printed, or logged.** All credentials live only in `.env.crawler` on your local machine. The code redacts any value that could be a password before logging.
- **Use only with explicit authorization.** Run this crawler only against a platform you own or have written permission to audit. Unauthorized automated access may violate the platform's Terms of Service or applicable law. You are solely responsible for obtaining the necessary authorization before running this tool.
- **No response bodies are captured.** Only network metadata (method, URL, resource type, HTTP status) is recorded; no API response payloads.
- **Respect robots.txt and rate limits.** The crawler uses configurable delays (`CRAWLER_PAGE_DELAY_MS`, `CRAWLER_CLICK_DELAY_MS`) and runs a single browser session. Do not set delays to zero in production runs.

---

## 3. Install Dependencies

Requires **Node.js >= 18**.

```bash
# Install npm packages (playwright, dotenv, cheerio)
npm install

# Install the Chromium browser used by Playwright
npx playwright install chromium
```

> If `npx playwright install chromium` is slow, you can also run the alias: `npm run install:browser`.

---

## 4. Create the .env.crawler File

All runtime configuration — including credentials — lives in `.env.crawler` in the project root (`academy-dashboard-discovery/`). This file is **never committed to version control**.

```bash
cp .env.crawler.example .env.crawler
```

Then open `.env.crawler` in your editor and fill in the values:

```dotenv
# ── Target URLs (defaults shown; override only if the platform changes) ──────
ACADEMY_BASE_URL=https://academatic.online
ACADEMY_LOGIN_URL=https://academatic.online/login
ACADEMY_ADMIN_START_URL=https://academatic.online/management/home

# ── Role credentials ─────────────────────────────────────────────────────────
ADMIN_USERNAME=your_admin_email_or_username
ADMIN_PASSWORD=your_admin_password

TEACHER_USERNAME=your_teacher_email_or_username
TEACHER_PASSWORD=your_teacher_password

FAMILY_USERNAME=your_family_email_or_username
FAMILY_PASSWORD=your_family_password

# ── Crawler behaviour ─────────────────────────────────────────────────────────
# CRAWLER_HEADLESS=true          # run without a visible browser window (default: false = headed)
# CRAWLER_SLOW_MODE=true         # add delays between actions for stability (default: true)
# CRAWLER_PAGE_DELAY_MS=1500     # ms to wait after each page load
# CRAWLER_CLICK_DELAY_MS=600     # ms to wait between interactive clicks
# CRAWLER_MAX_PAGES_PER_ROLE=120 # hard cap on pages visited per role
# CRAWLER_MAX_SAFE_CLICKS_PER_PAGE=12  # max safe UI interactions explored per page
# CRAWLER_RETRY_FAILED_PAGES=true      # retry pages that failed on first visit
# CRAWLER_DEBUG=false            # verbose debug logging
```

**Never commit this file.** It is listed in `.gitignore` together with `auth-state-*.json` and the `output/` directory.

---

## 5. Save Auth State Per Role

The crawler uses Playwright's storage-state persistence so it does not have to log in on every page. You must capture an auth state once per role before crawling.

The `save-auth` script opens a headed browser, navigates to the login page, and waits for you to complete the login manually (supports 2FA, captchas, SSO, or any other interactive flow). When you see the dashboard, press **Enter** in the terminal.

```bash
# Save admin session
npm run save-auth:admin

# Save teacher session
npm run save-auth:teacher

# Save family / guardian session
npm run save-auth:family
```

What happens:
1. A Chromium browser window opens at the login URL for the role.
2. The terminal prints: `Browser open. Log in manually, then press Enter here...`
3. Log in with the account for that role. Complete any 2FA or verification steps.
4. Once you can see the dashboard home page, switch back to the terminal and press **Enter**.
5. The session (cookies + localStorage) is saved to `auth-state-<role>.json` in the project root.

The saved auth file is valid until the session expires on the server side. When it expires, re-run `save-auth` for that role (see section 11).

---

## 6. Crawl a Single Role

Once the auth state is saved, run the crawler for a specific role:

```bash
npm run crawl:admin
npm run crawl:teacher
npm run crawl:family
```

Each command:
- Restores the saved browser session for that role.
- Starts from the role's configured `startUrls` (see `roles.config.json`).
- Discovers new internal URLs from every page (sidebar, header, footer, breadcrumbs, cards, tables, dropdowns, pagination).
- Visits each URL once (deduplicated by normalized route), up to `CRAWLER_MAX_PAGES_PER_ROLE`.
- For each page: extracts DOM structure, design tokens, network endpoints, and explores safe UI interactions.
- Writes page records, screenshots, raw/sanitized HTML, and plain-text files under `output/roles/<role>/`.
- Writes a `role-map.json` and `role-map.md` summary when done.

Progress is printed to the console. Errors on individual pages are logged and the crawler continues.

---

## 7. Crawl All Roles

To run all configured roles sequentially in a single command:

```bash
npm run crawl:all
```

This is equivalent to running `crawl:admin`, `crawl:teacher`, and `crawl:family` one after another. Roles are processed in the order they appear in `roles.config.json`. Each role uses its own saved auth state.

You can also run everything end-to-end (crawl + audit + report) with:

```bash
npm run full
```

---

## 8. Run the Coverage Audit

After crawling at least one role, generate the cross-role coverage audit:

```bash
npm run audit
```

This reads all `output/roles/*/role-map.json` and `pages/*.json` files and writes to `output/combined/`:

- `coverage-audit.json` — structured data: shared routes, role-unique routes, permission matrix per module, component inventory, interaction inventory.
- `coverage-audit.md` — human-readable Markdown version of the above.
- `missing-coverage.json` — list of routes/modules that appear in some roles but not others, flagged for follow-up.

Review `missing-coverage.json` to find pages that may need a re-crawl or manual inspection.

---

## 9. Open the Combined Report

Build the single-file HTML report:

```bash
npm run report
```

Then open the output in your browser:

```
output/combined/report.html
```

The report is a self-contained HTML file (no external CDN dependencies). It contains:
- Per-role page inventory with module classification.
- Cross-role permission matrix.
- Component and interaction inventories.
- Links to individual page Markdown files and screenshots.
- Coverage gaps and recommended follow-up actions.

> **Note:** Because the HTML snapshots reference remote CSS and images (see section 15), the visual preview inside the report may look unstyled. Use the screenshots (`output/roles/<role>/screenshots/`) as the authoritative offline visual reference.

---

## 10. Add a New Role

To crawl an additional role (e.g., `student`, `manager`, or any custom role):

**Step 1.** Open `roles.config.json` and add a new entry to the `"roles"` array. Use the `futureRoleTemplate` as a guide:

```jsonc
{
  "key": "student",
  "label": "Student",
  "usernameEnv": "STUDENT_USERNAME",
  "passwordEnv": "STUDENT_PASSWORD",
  "loginUrl": "https://academatic.online/login",
  "startUrls": ["https://academatic.online/management/home"],
  "authStateFile": "auth-state-student.json",
  "outputDir": "output/roles/student"
}
```

**Step 2.** Add the credentials to `.env.crawler`:

```dotenv
STUDENT_USERNAME=your_student_username
STUDENT_PASSWORD=your_student_password
```

**Step 3.** Add convenience npm scripts to `package.json` (optional but recommended):

```json
"save-auth:student": "node save-auth.js student",
"crawl:student": "node crawl-role.js student"
```

**Step 4.** Save the auth state:

```bash
node save-auth.js student
```

**Step 5.** Crawl:

```bash
node crawl-role.js student
```

The new role's output will appear under `output/roles/student/` and will be included in the next `npm run audit` run automatically.

---

## 11. Troubleshoot Login and Session Expiry

**Symptom: Pages are recorded with `discoveryStatus: "login_redirect"`**

The crawler detected that navigating to a page redirected back to the login page, meaning the saved session has expired.

Fix: Re-run `save-auth` for the affected role:

```bash
npm run save-auth:admin   # or teacher / family
```

Then re-run the crawl. Previously failed or redirected pages will be retried if `CRAWLER_RETRY_FAILED_PAGES=true` (the default).

**Symptom: The browser closes before you finish logging in during save-auth**

The script waits for you to press Enter in the terminal. Take as long as needed — there is no timeout during the manual login step.

**Symptom: The login page has a CAPTCHA or SSO redirect**

`save-auth` handles this naturally because login is fully manual. Complete any SSO or CAPTCHA flow in the headed browser window, wait until you reach the dashboard home, then press Enter.

**Symptom: The crawler skips many pages or the page delay is too short**

Increase the delays in `.env.crawler`:

```dotenv
CRAWLER_PAGE_DELAY_MS=2500
CRAWLER_CLICK_DELAY_MS=1000
```

**Symptom: You need to see exactly what the browser is doing**

Run in headed (non-headless) mode with slow motion:

```dotenv
CRAWLER_HEADLESS=false
CRAWLER_SLOW_MODE=true
```

**Enable verbose logging:**

```dotenv
CRAWLER_DEBUG=true
```

---

## 12. Sensitive Files and .gitignore

The following files and directories are excluded from version control by `.gitignore`:

| Pattern | Reason |
|---|---|
| `.env.crawler` | Contains credentials — never commit. |
| `auth-state-*.json` | Contains live browser session cookies — treat as credentials. |
| `output/` | Can be large (screenshots, HTML); regenerated by running the crawler. |
| `node_modules/` | Standard npm exclusion. |

**Never commit** `.env.crawler` or `auth-state-*.json` to any repository, public or private. If you accidentally commit either file, rotate the credentials immediately and purge the file from git history.

If you need to share output artifacts with a teammate, transfer the `output/` directory out-of-band (e.g., a shared drive or archive), not via git.

---

## 13. Recommended Workflow Before Frontend Rebuild

Follow these steps in order to produce a complete, reliable discovery dataset before starting the spec-kit / frontend rebuild:

1. **Install and configure**
   - `npm install && npx playwright install chromium`
   - `cp .env.crawler.example .env.crawler` and fill credentials.

2. **Save auth state for every role**
   - `npm run save-auth:admin`
   - `npm run save-auth:teacher`
   - `npm run save-auth:family`

3. **Crawl all roles**
   - `npm run crawl:all`
   - Review console output for errors and `login_redirect` warnings.

4. **Run the audit**
   - `npm run audit`
   - Open `output/combined/missing-coverage.json` and `coverage-audit.md`.

5. **Build and open the report**
   - `npm run report`
   - Open `output/combined/report.html` in a browser.
   - Review the permission matrix and component inventory.

6. **Address coverage gaps**
   - If `missing-coverage.json` lists routes that were missed, check whether the session expired or the pages require a different navigation path.
   - Re-run `save-auth` and the relevant `crawl:<role>` command to fill gaps.
   - Re-run `npm run audit && npm run report` after each re-crawl.

7. **Iterate until coverage is satisfactory**
   - A satisfactory baseline: all primary sidebar/nav items visited for each role, permission matrix populated for all MODULES, no large unexplained gaps.

8. **Hand off to spec-kit**
   - Share `output/combined/report.html`, `output/combined/coverage-audit.md`, and the per-role `role-map.md` files with the design/frontend team.
   - Use screenshots in `output/roles/*/screenshots/` as the visual reference.
   - The JSON page records in `output/roles/*/pages/*.json` are machine-readable and can be fed directly into an LLM for spec generation.

---

## 14. npm Scripts Reference

| Script | Command | Description |
|---|---|---|
| `npm run save-auth:admin` | `node save-auth.js admin` | Open headed browser, log in manually as admin, save session. |
| `npm run save-auth:teacher` | `node save-auth.js teacher` | Same for teacher role. |
| `npm run save-auth:family` | `node save-auth.js family` | Same for family/guardian role. |
| `npm run crawl:admin` | `node crawl-role.js admin` | Crawl dashboard as admin. |
| `npm run crawl:teacher` | `node crawl-role.js teacher` | Crawl dashboard as teacher. |
| `npm run crawl:family` | `node crawl-role.js family` | Crawl dashboard as family/guardian. |
| `npm run crawl:all` | `node crawl-all-roles.js` | Crawl all roles sequentially. |
| `npm run audit` | `node coverage-audit.js` | Generate cross-role coverage audit to `output/combined/`. |
| `npm run report` | `node build-report.js` | Build `output/combined/report.html`. |
| `npm run full` | `crawl:all && audit && report` | Run all three phases end-to-end. |
| `npm run install:browser` | `playwright install chromium` | Install the Chromium browser for Playwright. |

---

## 15. Offline Snapshots Note

The sanitized HTML files saved under `output/roles/<role>/html/sanitized/` are **read-only, offline UI reference snapshots**. They are not intended to be functional pages.

**Known limitation:** The sanitized HTML retains original `<img src>` and `<link rel="stylesheet" href>` attributes pointing to the live platform's servers. This means:

- **Images and CSS are loaded from the remote server** when you open a snapshot in a browser. If the server is unavailable or the session has expired, the snapshot will appear unstyled or without images.
- Every `<img>` has `referrerpolicy="no-referrer"` added to minimize information leakage.
- All `<a href>` links are rewritten: internal links point to local snapshot files where they exist; all other links (external, missing, or unknown) are set to `href="#"` so a snapshot can **never navigate back to the live platform**.
- Forms are neutralized: action set to `#`, submit buttons disabled, `data-disabled-form="true"` added.
- A visible amber banner is injected at the top of every snapshot body: `"Offline UI reference snapshot — not connected to live platform."`

**The screenshots** (`output/roles/<role>/screenshots/<slug>-full.png`) are the authoritative offline visual record. They capture the actual rendered appearance of each page at the time of crawling, independent of any remote resources.
