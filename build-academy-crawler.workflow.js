export const meta = {
  name: 'build-academy-crawler',
  description: 'Build the Academy Dashboard Discovery Crawler (Node + Playwright) from scratch',
  phases: [
    { title: 'Foundation', detail: 'config, libs, boilerplate, docs' },
    { title: 'Engine', detail: 'extractors, explorer, crawler, audit, report' },
  ],
}

const ROOT = '/media/mekky/work/backend/dashboard-intelligence-crawler/academy-dashboard-discovery'

// ---------------------------------------------------------------------------
// SHARED CONTRACT — single source of truth handed to EVERY agent.
// All files must honor these interfaces exactly so the modules interoperate.
// (No backticks or dollar-brace sequences inside this text.)
// ---------------------------------------------------------------------------
const CONTRACT = [
'================ ACADEMY DASHBOARD DISCOVERY CRAWLER — SHARED CONTRACT ================',
'',
'PROJECT PURPOSE (read carefully):',
'  A DISCOVERY / DOCUMENTATION crawler. It is NOT for cloning proprietary code or copying',
'  the design pixel-perfect. It logs into an academy admin dashboard (Playwright), navigates',
'  read-only, and produces structured reports + snapshots + LLM-ready docs so a NEW, original,',
'  improved frontend can later be built with spec-kit. NEVER mutate data on the target site.',
'',
'TARGET PLATFORM (defaults; all overridable via .env.crawler):',
'  ACADEMY_BASE_URL        = https://academatic.online',
'  ACADEMY_LOGIN_URL       = https://academatic.online/login',
'  ACADEMY_ADMIN_START_URL = https://academatic.online/management/home',
'',
'ABSOLUTE PROJECT ROOT (write every file here, using the Write tool with ABSOLUTE paths):',
'  ' + ROOT,
'',
'HARD RULES:',
'  - Module system: CommonJS ONLY. Use require(...) / module.exports. No ESM, no import/export.',
'    package.json must NOT contain "type":"module".',
'  - Allowed dependencies ONLY (all free, no paid/AI APIs): playwright ^1.49, dotenv ^16.4,',
'    cheerio ^1.0.0. Everything else must be Node builtins (fs, path, url, child_process, readline).',
'  - Credentials come ONLY from .env.crawler (loaded by dotenv). NEVER hardcode credentials.',
'    NEVER print or log a password (not even masked length). Redact anything that could be one.',
'  - Production-quality, complete code. NO TODO, NO placeholders, NO stubs, NO fake/sample output.',
'    Do not silently swallow errors — log them clearly and continue where the spec says to be resilient.',
'  - Each function = one responsibility. Modular, readable, robust selectors, Arabic + RTL aware.',
'  - Read-only crawling: never fill forms, never submit, never click mutating/destructive controls.',
'  - All file writes go through lib/fs-utils where practical (it ensures parent dirs).',
'',
'====================== MODULE INTERFACES (exact exports) ======================',
'',
'lib/config.js  -> module.exports = { PROJECT_ROOT, OUTPUT_DIR, loadEnv, getGlobalConfig, loadRoles, getRole }',
'  PROJECT_ROOT = path.resolve(__dirname, "..")   (the project folder)',
'  OUTPUT_DIR   = path.join(PROJECT_ROOT, "output")',
'  loadEnv()                -> dotenv.config({ path: path.join(PROJECT_ROOT, ".env.crawler") }); idempotent; safe if file missing.',
'  getGlobalConfig()        -> reads process.env with defaults and returns:',
'      { baseUrl, loginUrl, adminStartUrl, headless, slowMode, pageDelayMs, clickDelayMs,',
'        maxPagesPerRole, maxSafeClicksPerPage, retryFailedPages, viewport:{width:1440,height:900} }',
'      headless = (process.env.CRAWLER_HEADLESS === "true")   // default headed (false)',
'      slowMode = (process.env.CRAWLER_SLOW_MODE !== "false")',
'      pageDelayMs/clickDelayMs/maxPagesPerRole/maxSafeClicksPerPage = parseInt with the .env.example defaults',
'      retryFailedPages = (process.env.CRAWLER_RETRY_FAILED_PAGES !== "false")',
'  loadRoles()              -> reads roles.config.json, returns the .roles array (raw objects).',
'  getRole(roleKey)         -> returns a resolved role object or throws a clear Error if key unknown:',
'      { key, label, usernameEnv, passwordEnv, username, password, hasCredentials,',
'        loginUrl, startUrls:[absolute...], authStateFile:absolute, outputDir:absolute }',
'      username = process.env[usernameEnv]; password = process.env[passwordEnv] (NEVER logged).',
'      hasCredentials = Boolean(username && password).',
'      startUrls resolved to absolute against baseUrl. authStateFile/outputDir resolved absolute under PROJECT_ROOT.',
'',
'lib/logger.js  -> module.exports = { createLogger, redact }',
'  createLogger(scope?) -> { info, success, warn, error, debug, step }  // each takes (msg, ...extra)',
'      timestamped + colorized via raw ANSI (no chalk). error(msg, err?) prints err.message + stack.',
'      debug only prints when process.env.CRAWLER_DEBUG === "true". scope shown as a [scope] prefix.',
'  redact(value) -> string  // masks anything that looks secret; used defensively before logging.',
'',
'lib/fs-utils.js -> module.exports = { ensureDir, writeJson, readJson, writeText, readText, exists, slugify, listFiles, relativePath }',
'  ensureDir(dir)->dir (recursive). writeJson(file,obj,pretty=true) ensures parent + writes 2-space JSON.',
'  readJson(file)->parsed|null (null on missing/parse error). writeText(file,text) ensures parent + writes utf8.',
'  readText(file)->string|null. exists(p)->bool. listFiles(dir,ext?)->[absolute paths] (non-recursive, [] if absent).',
'  slugify(str,maxLen=80)->filesystem-safe ascii slug: lowercase, non [a-z0-9] -> "-", collapse/trim "-",',
'      fallback "page" when empty. relativePath(from,to)->posix-style relative path for offline links.',
'',
'lib/url-utils.js -> module.exports = { resolveUrl, getPathname, isSameOrigin, isInternal, normalizeRoute, routeToSlug, classifyUrlTarget, isUnsupportedFile, stripVolatileParams }',
'  resolveUrl(base,href)->absolute string|null (invalid->null). getPathname(url)->pathname|"".',
'  isSameOrigin(url,baseUrl)->bool. isInternal(url,baseUrl)-> http(s) AND same origin.',
'  normalizeRoute(url)-> canonical key: lowercase origin+pathname, drop hash, drop trailing slash (except root),',
'      drop volatile query params (token,_,t,ts,timestamp,cache,v,rand,nonce,sid,session,sessionid,jsessionid,',
'      utm_*,fbclid,gclid), keep remaining query params sorted by key. Used for dedupe.',
'  routeToSlug(url)-> slug from pathname (+ meaningful query) via slugify; root -> "home".',
'  classifyUrlTarget(url,baseUrl)-> one of: "internal","external","unsupported_file","anchor","mailto_tel","javascript".',
'      anchor = empty/"#"/pure same-page hash; mailto_tel = mailto:/tel:; javascript = javascript: scheme.',
'  isUnsupportedFile(url)->bool for download/asset extensions: pdf zip rar 7z gz doc docx xls xlsx ppt pptx',
'      csv png jpg jpeg gif svg webp bmp ico mp4 mp3 wav avi mov woff woff2 ttf otf eot exe dmg apk pkg.',
'  stripVolatileParams(url)->string (same volatile list as normalizeRoute).',
'',
'lib/safety.js -> module.exports = { UNSAFE_EN, UNSAFE_AR, SAFE_HINTS_EN, SAFE_HINTS_AR, normalizeText, containsUnsafe, classifyAction, isUnsafeUrl }',
'  UNSAFE_EN (use EXACTLY these): logout, log out, sign out, signout, delete, remove, destroy, archive, cancel,',
'      pay, payment, checkout, submit, save, send, email, message, confirm, approve, reject, block, suspend,',
'      disable, enable, update, edit, create, add.',
'  UNSAFE_AR (use EXACTLY these): تسجيل خروج, خروج, حذف, مسح, إزالة, أرشفة, إلغاء, دفع, سداد, إرسال, حفظ,',
'      تأكيد, موافقة, رفض, تعطيل, تفعيل, تعديل, إنشاء, إضافة.',
'  SAFE_HINTS_EN: open, view, show, details, detail, more, menu, filter, filters, tab, expand, collapse,',
'      preview, info, profile, notifications, search, sort, page, next, prev, previous, accordion, dropdown.',
'  SAFE_HINTS_AR: عرض, تفاصيل, المزيد, قائمة, فلتر, تصفية, بحث, التالي, السابق, ملف, إشعارات, عرض التفاصيل, طي, توسيع.',
'  normalizeText(str)-> lowercase, trim, collapse whitespace, strip Arabic diacritics (U+064B..U+065F),',
'      strip tatweel (U+0640), normalize alef variants (أإآ->ا) and (ى->ي, ة->ه) for robust matching.',
'  containsUnsafe(text)-> { unsafe:bool, matched:[strings] } using whole-word-ish matching on normalized text',
'      for EN and substring for AR. "add" only flags when standing alone as an action word.',
'  classifyAction({text,ariaLabel,title,role,tagName,type,href})-> { safe:bool, reason:string,',
'      category:"navigation"|"open_ui"|"mutating"|"logout"|"submit"|"unknown" }.',
'      Rules: type==="submit" OR tagName==="form-submit" -> {safe:false,category:"submit"}.',
'      href/text matching logout/sign out -> {safe:false,category:"logout"}. containsUnsafe(any label) -> mutating.',
'      Otherwise safe; category "navigation" if it has an internal href, else "open_ui".',
'  isUnsafeUrl(url)-> bool (path/query contains logout, signout, sign-out, /delete, /remove, /destroy, /pay).',
'',
'lib/wait-utils.js -> module.exports = { gotoCalm, waitForContent, waitForSpinnersGone, slowScrollToBottom, scrollToTop, settle, dismissOverlay }',
'  All best-effort: wrap waits in try/catch and never throw on timeout EXCEPT gotoCalm rethrows real nav errors.',
'  gotoCalm(page,url,{timeout=45000,pageDelayMs})-> page.goto(url,{waitUntil:"domcontentloaded",timeout}); then',
'      waitForContent, waitForSpinnersGone, settle(pageDelayMs). Returns the Playwright response (or null).',
'  waitForContent(page)-> wait body visible + a main-content selector among main,[role=main],#app,#root,.content,',
'      .main-content,.page-content (first that exists) becomes visible; short timeout; fallback to body.',
'  waitForSpinnersGone(page,timeout=8000)-> wait until common loaders are hidden/detached: [class*=spinner],',
'      [class*=loading],[class*=loader],[class*=skeleton],[aria-busy=true],.spinner,.loading. Best-effort.',
'  slowScrollToBottom(page,{step=500,delay=250})-> incremental window scroll to bottom to trigger lazy content.',
'  scrollToTop(page)-> window.scrollTo(0,0). settle(page,ms)-> guarded page.waitForTimeout(ms>0?ms:0).',
'  dismissOverlay(page)-> try Escape, then click a visible [class*=backdrop]/[class*=overlay]/close button;',
'      return true if an open dialog/modal/drawer is no longer visible. Best-effort, never throw.',
'',
'lib/page-classifier.js -> module.exports = { MODULES, classifyModules }',
'  MODULES (canonical, EXACT strings, this order): "Dashboard / Home","Students","Teachers",',
'      "Parents / Guardians / Families","Courses","Subjects","Classes / Live Sessions","Timetable / Schedule",',
'      "Attendance","Assignments / Homework","Exams / Quizzes","Certificates","Payments / Invoices",',
'      "Wallet / Finance","Reports / Analytics","Messages / Notifications","Content / Materials / Library",',
'      "Settings","Roles / Permissions","Profile / Account","General / Unknown".',
'  classifyModules({url,route,title,headings,sidebarActiveText,bodyText})-> string[] (>=1). Match EN+AR keyword',
'      lists against pathname segments + title + headings + active sidebar text (highest weight). If nothing',
'      matches return ["General / Unknown"]. Provide thorough Arabic keywords (طلاب,معلمين,اولياء امور,كورسات,',
'      مواد,حصص,جدول,حضور,واجبات,امتحانات,شهادات,فواتير,محفظة,تقارير,رسائل,محتوى,اعدادات,صلاحيات,حساب,الرئيسية).',
'',
'lib/dom-extractor.js -> module.exports = { extractStaticData }',
'  async extractStaticData(page,{baseUrl})-> a PARTIAL PageRecord with these keys (see schema below):',
'    title, lang, dir, isRTL, headings, breadcrumbs, sidebarLinks, headerLinks, footerLinks, internalLinks,',
'    externalLinks, paginationLinks, buttons, forms, labels, tables, cards, badges, filters, tabs,',
'    dropdownTriggers, visibleText, domSummary, discoveredHrefs.',
'  Gather raw descriptors INSIDE page.evaluate (no Node modules available in-page). Anchor hrefs come from',
'  element.href (already absolute). After evaluate, on the Node side, run safety.classifyAction over each button/',
'  link to attach a .safety field, and use url-utils to mark internal vs external. Region detection: sidebar =',
'  aside,nav[class*=side],[class*=sidebar],[class*=side-menu],[class*=drawer] nav; header = header,[class*=topbar],',
'  [class*=navbar],[class*=app-bar]; footer = footer,[class*=footer]. Everything else = "main".',
'  NEVER capture password input values. Tables: {caption,headers:[],sampleRows:[up to 5 arrays of cell text],',
'  rowCount,columnCount}. Cards/KPIs: [class*=card],[class*=widget],[class*=kpi],[class*=stat],[class*=tile],',
'  [class*=metric] -> {title,value,text}. Badges: [class*=badge],[class*=status],[class*=tag],[class*=chip].',
'  Filters: select, [class*=filter], [role=combobox], input[type=search], input[type=date]. Tabs: [role=tab],',
'  [class*=tab]:not([class*=table]) -> {text,selected,href}. dropdownTriggers: [aria-haspopup],[data-toggle*=drop],',
'  [class*=dropdown-toggle],[class*=menu-trigger]. domSummary: {counts:{links,buttons,forms,inputs,selects,',
'  tables,images,headings}, topTags:[{tag,count}]}. visibleText = document.body.innerText (full; caller writes it).',
'  Be defensive: every list defaults to [] and never throws if a selector matches nothing.',
'',
'lib/token-extractor.js -> module.exports = { extractDesignTokens }',
'  async extractDesignTokens(page)-> design tokens via page.evaluate over a BOUNDED sample of elements',
'  (e.g. body, headings, a sample of buttons/links/cards/tables/inputs; cap ~400 elements for perf).',
'  Returns: { textColors, backgroundColors, borderColors, fonts, fontSizes, fontWeights, borderRadius,',
'  shadows, spacing, buttonStyles, cardStyles, tableStyles }. Each *color/font/size list = [{value,count}]',
'  de-duplicated and frequency-sorted, capped to top ~40. buttonStyles/cardStyles/tableStyles = small arrays of',
'  representative computed-style objects {background,color,border,borderRadius,padding,fontSize,fontWeight}.',
'',
'lib/interaction-explorer.js -> module.exports = { exploreInteractions }',
'  async exploreInteractions(page, ctx)-> { interactions:[], modals:[], safeSkipped:[], unsafeSkipped:[], failed:[] }',
'  ctx = { record, role, baseUrl, config, logger, takeScreenshot, normalize:{normalizeRoute} }',
'    takeScreenshot(nameNoExt,{fullPage})-> async, saves a screenshot and returns its RELATIVE path (string).',
'  Behavior: collect SAFE candidate triggers (dropdownTriggers, tabs, accordion toggles [data-toggle*=collapse]/',
'  [class*=accordion] [class*=header], filter openers, profile/notification/menu buttons, popover triggers,',
'  "view/details" links). For EACH candidate (re-query by index from a fresh locator list each loop to avoid stale',
'  handles; dedupe by normalizeText(text)+tag; cap at config.maxSafeClicksPerPage):',
'    1) Build descriptor {text,ariaLabel,title,role,tagName,type,href}; classifyAction. If unsafe -> push to',
'       unsafeSkipped {text,reason,category} and continue. NEVER click unsafe controls.',
'    2) Record beforeUrl. settle(clickDelayMs). Click inside try/catch (timeout-bounded).',
'    3) Determine result by comparing before/after: URL changed -> type "navigation" (record before/after, screenshot,',
'       then page.goBack + waitForContent to restore). A visible dialog appeared ([role=dialog],[aria-modal=true],',
'       .modal,.drawer,.offcanvas,[class*=modal]:visible) -> "modal_or_dialog": capture {title,buttons:[text],',
'       fields:[name/label],text(trimmed),screenshot}; push to modals; then close via Escape/dismissOverlay (handle',
'       modals that do NOT close with Escape by clicking a close/backdrop). aria-expanded toggled or new menu visible',
'       -> "dropdown_or_menu". Selected tab changed -> "tab_change". Accordion region expanded -> "accordion_expand".',
'       DOM changed but none of the above -> "inline_state_change". Nothing changed -> "no_visible_change".',
'       Exception -> push to failed {text,error} and type "failed".',
'    4) Every performed interaction pushes {index,type,triggerText,triggerSelectorHint,beforeUrl,afterUrl,',
'       screenshot,notes}. Always restore: close menus/modals, scrollToTop, settle(clickDelayMs).',
'  Safe internal navigations discovered here are returned so the crawler can enqueue them (do NOT deep-crawl here).',
'  One failing click NEVER stops the loop.',
'',
'lib/html-sanitizer.js -> module.exports = { sanitizeHtml }',
'  sanitizeHtml(rawHtml,{pageUrl,baseUrl,localPageResolver})-> string, using cheerio. Rules:',
'    - Remove all <script> and <noscript>. Remove every on* inline handler attribute. Remove <base>.',
'    - Neutralize forms: action="#", method="get", add data-disabled-form="true"; convert submit buttons/inputs',
'      to type="button" and add disabled. Strip javascript: hrefs.',
'    - Rewrite every <a href>: resolve absolute. If internal & localPageResolver(abs) returns {exists:true,localHref}',
'      -> href=localHref. Else href="#" and (for missing internal) data-missing-local-page="true".',
'      ALWAYS set data-original-href to the absolute URL and rel="noopener noreferrer". External links also become',
'      href="#" so a local snapshot can NEVER navigate back to the live platform.',
'    - Leave <img> and <link rel=stylesheet> src/href intact for layout fidelity but add referrerpolicy="no-referrer"',
'      to <img> (note in README this is a known limitation: assets/CSS are remote; screenshots are the offline visual).',
'    - Insert at the very top of <body> a visible banner div (inline style: full-width amber bar, dark text):',
'      "Offline UI reference snapshot — not connected to live platform."',
'    - localPageResolver is provided by the caller: (absoluteUrl) => ({ exists:bool, localHref:string }).',
'',
'lib/report-writer.js -> module.exports = { writePageRecord, buildPageMarkdown, writeRoleMap, buildRoleMapMarkdown }',
'  writePageRecord(record, role)-> writes role.outputDir/pages/<record.slug>.json (full record) and .md (human).',
'  buildPageMarkdown(record)-> markdown: title, url, normalizedRoute, modules, lang/dir, discoveryStatus, headings,',
'      buttons(+safety), forms/fields, tables/columns, cards/KPIs, filters, tabs, modals, interactions (type+screenshot),',
'      safeSkipped, unsafeSkipped, failed, discovered links, and a "## Rebuild notes" section (neutral UX observations).',
'  writeRoleMap(role, records, routeGraph, summary)-> writes role.outputDir/role-map.json (structured) and role-map.md,',
'      plus role.outputDir/network/endpoints.json. buildRoleMapMarkdown(...) returns that markdown.',
'',
'lib/role-comparator.js -> module.exports = { loadAllRoleData, compareRolePair, buildSharedUnique, buildPermissionMatrix, buildComponentInventory, buildInteractionInventory }',
'  loadAllRoleData(roleKeys)-> { [key]: { role, records:[fullPageRecords], roleMap, summary } } reading',
'      output/roles/<key>/role-map.json and pages/*.json (skip roles with no output; never throw).',
'  compareRolePair(aData,bData)-> { shared:[route], onlyA:[route], onlyB:[route],',
'      sameRouteDifferentUI:[{route, differences:{buttons,forms,tables,modals}}] }.',
'  buildSharedUnique(allData)-> { routes:[{route,title,modules,roles:[keys]}], sharedAll:[], unique:{key:[routes]} }.',
'  buildPermissionMatrix(allData)-> per MODULE per role: {pages,buttons,forms,modals,tables} counts + presence.',
'  buildComponentInventory(allData)/buildInteractionInventory(allData)-> aggregate component/interaction tallies.',
'  Return DATA (plain objects/arrays). coverage-audit.js renders the markdown.',
'',
'====================== PageRecord SCHEMA (canonical) ======================',
'A page JSON (output/roles/<role>/pages/<slug>.json) has exactly this shape:',
'{',
'  role, url, normalizedRoute, slug, title, lang, dir, isRTL,',
'  modules: [string],                 // from page-classifier',
'  discoveryStatus: "visited",        // one of the end-states (see below)',
'  discoveredFrom: { route, via },    // via = sidebar|header|footer|breadcrumb|card|table|dropdown|pagination|tab|link|start',
'  capturedAt: ISO string,            // new Date().toISOString() is fine in Node files',
'  screenshots: { full: relPath, interactions: [relPath] },',
'  html: { rawFile, sanitizedFile, textFile },   // relative paths under the role outputDir',
'  headings: [{level:1..6, text}],',
'  breadcrumbs: [string],',
'  sidebarLinks: [{text,href,internal}], headerLinks:[...], footerLinks:[...],',
'  internalLinks: [{text,href,area}], externalLinks:[{text,href}], paginationLinks:[{text,href}],',
'  buttons: [{text,ariaLabel,title,tagName,type,role,href,safety:{safe,reason,category}}],',
'  forms: [{action,method,id,name,fields:[{tag,type,name,id,label,placeholder,required,options:[{value,text}]}],submitButtons:[text]}],',
'  labels: [string],',
'  tables: [{caption,headers:[string],sampleRows:[[string]],rowCount,columnCount}],',
'  cards: [{title,value,text}], badges:[string], filters:[{type,label,name}], tabs:[{text,selected,href}],',
'  dropdownTriggers: [{text,ariaLabel}],',
'  interactions: [{index,type,triggerText,triggerSelectorHint,beforeUrl,afterUrl,screenshot,notes}],',
'  modals: [{title,triggerText,buttons:[string],fields:[string],text,screenshot}],',
'  safeSkipped: [{text,reason}], unsafeSkipped:[{text,reason,category}], failed:[{text,error}],',
'  network: { endpoints: [{method,url,resourceType,status}] },   // metadata only, NEVER response bodies',
'  designTokens: { ... as token-extractor returns ... },',
'  domSummary: { counts:{...}, topTags:[{tag,count}] }',
'}',
'',
'DISCOVERY END-STATES (every discovered URL must resolve to exactly one, recorded in the route graph):',
'  visited | skipped_safe_reason | skipped_unsafe_reason | failed_with_error |',
'  duplicate_of_normalized_route | login_redirect | external_url | unsupported_file',
'',
'====================== OUTPUT LAYOUT ======================',
'output/roles/<role>/pages/<slug>.json + <slug>.md',
'output/roles/<role>/screenshots/<slug>-full.png + <slug>-interaction-001.png ...',
'output/roles/<role>/html/raw/<slug>.html',
'output/roles/<role>/html/sanitized/<slug>.html',
'output/roles/<role>/text/<slug>.txt',
'output/roles/<role>/network/endpoints.json',
'output/roles/<role>/role-map.json + role-map.md',
'output/combined/<all the audit + report files>',
'',
'roles.config.json SHAPE:',
'{ "roles": [ {key,label,usernameEnv,passwordEnv,loginUrl,startUrls:[...],authStateFile,outputDir}, ... ],',
'  "supportedFutureRoles": ["student","manager","director","staff","guardian"],',
'  "futureRoleTemplate": { ...same fields with empty values and a comment field } }',
'  Active roles: admin, teacher, family. crawl-all-roles iterates config.roles (so adding a future role = add an entry).',
'',
'WRITING INSTRUCTIONS:',
'  - Use the Write tool to create EXACTLY the file(s) assigned to you, at the absolute path given.',
'  - You MAY use Read to inspect already-written sibling files (the lib/ foundation) to match interfaces precisely.',
'  - Return a one-line confirmation of what you wrote. Do not write any file outside your assignment.',
'================================================================================',
].join('\n')

function buildPrompt(spec) {
  return CONTRACT +
    '\n\n========================= YOUR ASSIGNMENT =========================\n' +
    'Write this file (absolute path): ' + spec.path + '\n\n' +
    spec.spec +
    '\n\nWrite the COMPLETE, production-quality file now with the Write tool. No placeholders.'
}

// ---------------------------------------------------------------------------
// FOUNDATION PHASE — config, libs, boilerplate, docs (written first).
// ---------------------------------------------------------------------------
const FOUNDATION = [
  {
    path: ROOT + '/package.json', model: 'sonnet', effort: 'low', label: 'package.json',
    spec: 'A complete package.json. name "academy-dashboard-discovery", version "1.0.0", private true, description, ' +
      'license "MIT", engines node>=18, "main":"crawl-all-roles.js" (NO "type":"module"). dependencies: playwright ^1.49.0, ' +
      'dotenv ^16.4.5, cheerio ^1.0.0. scripts EXACTLY: "save-auth:admin":"node save-auth.js admin", ' +
      '"save-auth:teacher":"node save-auth.js teacher","save-auth:family":"node save-auth.js family",' +
      '"crawl:admin":"node crawl-role.js admin","crawl:teacher":"node crawl-role.js teacher","crawl:family":"node crawl-role.js family",' +
      '"crawl:all":"node crawl-all-roles.js","audit":"node coverage-audit.js","report":"node build-report.js",' +
      '"full":"node crawl-all-roles.js && node coverage-audit.js && node build-report.js", and a "postinstall":"playwright install chromium" is OPTIONAL — instead add a helper "install:browser":"playwright install chromium". Keep JSON valid.',
  },
  {
    path: ROOT + '/.gitignore', model: 'sonnet', effort: 'low', label: '.gitignore',
    spec: 'Exactly these ignore entries (one per line), plus a short comment header: .env.crawler ; auth-state-*.json ; ' +
      'output/ ; *.har ; storage-state.json ; node_modules/ ; and also *.log and .DS_Store. Make sure .env.crawler.example, ' +
      'roles.config.json and output/.gitkeep are NOT ignored (do not add negations unless needed; the listed patterns already allow them).',
  },
  {
    path: ROOT + '/.env.crawler.example', model: 'sonnet', effort: 'low', label: '.env.crawler.example',
    spec: 'Exactly this content (keep blank credential values, keep the comments minimal):\n' +
      'ACADEMY_BASE_URL=https://academatic.online\nACADEMY_LOGIN_URL=https://academatic.online/login\n' +
      'ACADEMY_ADMIN_START_URL=https://academatic.online/management/home\n\nADMIN_USERNAME=\nADMIN_PASSWORD=\n\n' +
      'TEACHER_USERNAME=\nTEACHER_PASSWORD=\n\nFAMILY_USERNAME=\nFAMILY_PASSWORD=\n\nCRAWLER_HEADLESS=false\n' +
      'CRAWLER_SLOW_MODE=true\nCRAWLER_PAGE_DELAY_MS=2500\nCRAWLER_CLICK_DELAY_MS=1200\nCRAWLER_MAX_PAGES_PER_ROLE=300\n' +
      'CRAWLER_MAX_SAFE_CLICKS_PER_PAGE=120\nCRAWLER_RETRY_FAILED_PAGES=true\n' +
      'Add a leading comment block explaining: copy to .env.crawler, never commit it, fill credentials per role.',
  },
  {
    path: ROOT + '/roles.config.json', model: 'sonnet', effort: 'low', label: 'roles.config.json',
    spec: 'Valid JSON following the roles.config.json SHAPE in the contract. roles array with admin (label "Administrator", ' +
      'usernameEnv ADMIN_USERNAME, passwordEnv ADMIN_PASSWORD, loginUrl https://academatic.online/login, startUrls ' +
      '["https://academatic.online/management/home"], authStateFile "auth-state-admin.json", outputDir "output/roles/admin"), ' +
      'teacher (TEACHER_* , startUrls ["https://academatic.online/management/home"] or a teacher dashboard if unknown use the same start, ' +
      'authStateFile "auth-state-teacher.json", outputDir "output/roles/teacher"), family (FAMILY_*, startUrls ' +
      '["https://academatic.online/management/home"], authStateFile "auth-state-family.json", outputDir "output/roles/family"). ' +
      'Add "supportedFutureRoles":["student","manager","director","staff","guardian"] and a "futureRoleTemplate" object showing ' +
      'every field with empty/placeholder values plus a "_comment" describing how to add a role. JSON must parse.',
  },
  {
    path: ROOT + '/lib/logger.js', model: 'sonnet', effort: 'medium', label: 'lib/logger.js',
    spec: 'Implement createLogger + redact exactly per contract. Raw ANSI colors (info cyan, success green, warn yellow, ' +
      'error red, debug gray, step magenta). Timestamp as HH:MM:SS. error(msg,err) prints err.message then err.stack on a new ' +
      'line if present. debug gated on CRAWLER_DEBUG==="true". redact masks values that look like secrets (long tokens, or any ' +
      'string passed when the caller hints it is a password) -> return "***". Keep it dependency-free.',
  },
  {
    path: ROOT + '/lib/fs-utils.js', model: 'sonnet', effort: 'medium', label: 'lib/fs-utils.js',
    spec: 'Implement ensureDir, writeJson, readJson, writeText, readText, exists, slugify, listFiles, relativePath exactly per ' +
      'contract using fs + path only. writeJson/writeText must ensureDir(path.dirname(file)) first. slugify handles unicode by ' +
      'stripping to ascii [a-z0-9-]; if the result is empty return "page". relativePath uses path.relative then replaces backslashes ' +
      'with "/". readJson/readText return null (not throw) on ENOENT or parse errors.',
  },
  {
    path: ROOT + '/lib/url-utils.js', model: 'sonnet', effort: 'medium', label: 'lib/url-utils.js',
    spec: 'Implement resolveUrl, getPathname, isSameOrigin, isInternal, normalizeRoute, routeToSlug, classifyUrlTarget, ' +
      'isUnsupportedFile, stripVolatileParams exactly per contract, using the global URL class. Be defensive: any malformed URL ' +
      'returns null / "external" / "" rather than throwing. normalizeRoute and stripVolatileParams share one VOLATILE_PARAMS set ' +
      '(also drop any key starting with "utm_"). routeToSlug requires lib/fs-utils slugify (require it).',
  },
  {
    path: ROOT + '/lib/safety.js', model: 'opus', effort: 'high', label: 'lib/safety.js',
    spec: 'Implement the full safety module per contract. This is SAFETY-CRITICAL: a false "safe" could mutate live data, so be ' +
      'conservative — when in doubt, classify as UNSAFE. UNSAFE_EN / UNSAFE_AR EXACTLY as listed in the contract. normalizeText must ' +
      'handle Arabic diacritics, tatweel, and alef/ya/ta-marbuta normalization. containsUnsafe: for EN keywords use word-boundary ' +
      'matching on normalized text (so "address" does not match "add"); the bare word "add" only flags as a standalone token. For AR ' +
      'use normalized substring matching. classifyAction returns the exact shape; treat type==="submit", any form-submit button, ' +
      'logout/sign-out text or href, and any unsafe keyword as unsafe with the right category. isUnsafeUrl per contract. Export ' +
      'UNSAFE_EN, UNSAFE_AR, SAFE_HINTS_EN, SAFE_HINTS_AR, normalizeText, containsUnsafe, classifyAction, isUnsafeUrl.',
  },
  {
    path: ROOT + '/lib/wait-utils.js', model: 'sonnet', effort: 'medium', label: 'lib/wait-utils.js',
    spec: 'Implement gotoCalm, waitForContent, waitForSpinnersGone, slowScrollToBottom, scrollToTop, settle, dismissOverlay exactly ' +
      'per contract using Playwright page APIs. All waits best-effort (try/catch, short timeouts, never throw on timeout) except ' +
      'gotoCalm rethrows genuine navigation failures so the crawler can record failed_with_error. slowScrollToBottom uses ' +
      'page.evaluate loop or repeated mouse wheel; return to a known state. dismissOverlay tries Escape then close/backdrop clicks.',
  },
  {
    path: ROOT + '/lib/page-classifier.js', model: 'sonnet', effort: 'medium', label: 'lib/page-classifier.js',
    spec: 'Implement MODULES (exact canonical array) and classifyModules per contract. Build a keyword map: each module -> {en:[...],' +
      'ar:[...]}. Score by matching pathname segments, title, headings text, and (weighted higher) sidebarActiveText. Return all ' +
      'modules whose score>0, sorted by score desc; if none, return ["General / Unknown"]. Include rich Arabic synonyms. A page may ' +
      'map to multiple modules. Keep matching case-insensitive and Arabic-normalized (you may require lib/safety normalizeText).',
  },
  {
    path: ROOT + '/README.md', model: 'sonnet', effort: 'medium', label: 'README.md',
    spec: 'A thorough README with these numbered sections in order: 1) Project purpose (discovery/documentation, NOT cloning; for ' +
      'later original spec-kit rebuild). 2) Safety & legal notes (read-only, never mutates, never commits secrets, respect target ' +
      'ToS / use only with authorization). 3) Install commands (npm install; then npx playwright install chromium). 4) How to create ' +
      '.env.crawler (cp .env.crawler.example .env.crawler; fill creds; never commit). 5) Save auth per role (npm run save-auth:admin ' +
      'etc., manual login flow, press Enter). 6) Crawl each role (npm run crawl:admin/teacher/family). 7) Crawl all roles ' +
      '(npm run crawl:all). 8) Run audit (npm run audit). 9) Open report (npm run report then open output/combined/report.html). ' +
      '10) Add a new role (edit roles.config.json + add *_USERNAME/*_PASSWORD to .env.crawler + save-auth). 11) Troubleshoot login/' +
      'session expiry (re-run save-auth, headed mode, login_redirect detection). 12) Avoid committing sensitive files (.gitignore ' +
      'covers .env.crawler, auth-state-*.json, output/). 13) Recommended workflow before frontend rebuild (save auth -> crawl -> ' +
      'audit -> report -> review missing-coverage -> re-run failed -> only then spec-kit). Also include a "npm scripts" reference ' +
      'table and an "Offline snapshots" note (CSS/images remote; screenshots are the offline visual truth). Markdown, no external CDN.',
  },
  {
    path: ROOT + '/claude-analysis-prompt.md', model: 'sonnet', effort: 'medium', label: 'claude-analysis-prompt.md',
    spec: 'A prompt document instructing Claude/Codex how to read the crawler output (output/combined/* and output/roles/*) and later ' +
      'produce spec-kit-ready documentation. It MUST explicitly state: do NOT copy proprietary code; do NOT copy brand identity, ' +
      'logos, assets, or exact private wording; use crawler output as product/UX REFERENCE only. Then the ordered deliverables: ' +
      '(1) product/module map, (2) page inventory, (3) permission matrix, (4) component inventory, (5) page-by-page requirements, ' +
      '(6) improved original frontend rebuild plan. End with: do NOT implement until discovery is reviewed/approved. Point to the ' +
      'exact files to read (academy-system-map.md, page-inventory.md, role-permission-matrix.md, component-inventory.md, ' +
      'interaction-inventory.md, llm-context.md, speckit-discovery.md, report.html).',
  },
]

// ---------------------------------------------------------------------------
// ENGINE PHASE — extractors, explorer, sanitizer, writers, entry scripts.
// ---------------------------------------------------------------------------
const ENGINE = [
  {
    path: ROOT + '/lib/dom-extractor.js', model: 'opus', effort: 'high', label: 'lib/dom-extractor.js',
    spec: 'Implement extractStaticData exactly per contract and the PageRecord schema. Do the heavy DOM reading in ONE page.evaluate ' +
      'that returns raw plain-data descriptors (no functions, no DOM nodes). In-page: detect region (sidebar/header/footer/main) for ' +
      'each link/button by climbing ancestors; collect anchors via element.href (absolute) + textContent; collect buttons; forms with ' +
      'fields (NEVER read password values); tables (caption, headers, up to 5 sample rows, rowCount, columnCount); cards/KPIs; badges; ' +
      'filters; tabs; dropdownTriggers; breadcrumbs; headings; labels; domSummary counts + topTags; lang/dir; visibleText=body.innerText. ' +
      'On the Node side: require lib/url-utils and lib/safety; split links into sidebarLinks/headerLinks/footerLinks/internalLinks/' +
      'externalLinks/paginationLinks (pagination = links whose text is a number or next/prev/التالي/السابق or inside [class*=pagination]); ' +
      'attach safety to each button via classifyAction; compute isRTL (dir==="rtl" || lang starts "ar" || majority Arabic chars). ' +
      'Return the partial PageRecord object. Defensive throughout (no throw on empty selectors).',
  },
  {
    path: ROOT + '/lib/token-extractor.js', model: 'opus', effort: 'high', label: 'lib/token-extractor.js',
    spec: 'Implement extractDesignTokens exactly per contract. One page.evaluate that samples a bounded set of elements (body, all ' +
      'headings, up to ~80 buttons, ~80 links, ~60 cards, tables, ~40 inputs; hard-cap total ~400) and reads getComputedStyle for ' +
      'color, backgroundColor, borderColor, fontFamily, fontSize, fontWeight, borderRadius, boxShadow, padding/margin (spacing). ' +
      'Aggregate into frequency maps, return [{value,count}] arrays sorted desc and capped to top 40, skipping empty/transparent/none. ' +
      'buttonStyles/cardStyles/tableStyles = up to ~12 representative computed-style snapshots each. Pure, bounded, never throws.',
  },
  {
    path: ROOT + '/lib/interaction-explorer.js', model: 'opus', effort: 'high', label: 'lib/interaction-explorer.js',
    spec: 'Implement exploreInteractions exactly per contract. This is the most delicate module — it must be CALM and SAFE. Require ' +
      'lib/safety and lib/wait-utils. Collect safe candidate triggers, dedupe by normalizeText(text)+tagName, cap at ' +
      'config.maxSafeClicksPerPage. Re-query candidates by index from a fresh Playwright locator list on each iteration to avoid stale ' +
      'element handles. For each: classifyAction; skip+record unsafe (NEVER click); else record beforeUrl, settle(clickDelayMs), click ' +
      'with a bounded timeout inside try/catch. Diff before/after to set interaction type (navigation/modal_or_dialog/dropdown_or_menu/' +
      'tab_change/accordion_expand/inline_state_change/no_visible_change/failed) per contract. On modal: capture {title,buttons,fields,' +
      'text,screenshot} then close (Escape -> dismissOverlay -> click close/backdrop; handle modals that ignore Escape). On navigation: ' +
      'screenshot then page.goBack + waitForContent. ALWAYS restore state, scrollToTop, settle between clicks. Use ctx.takeScreenshot for ' +
      'every interaction screenshot. Return {interactions,modals,safeSkipped,unsafeSkipped,failed}. One failure never stops the loop.',
  },
  {
    path: ROOT + '/lib/html-sanitizer.js', model: 'opus', effort: 'high', label: 'lib/html-sanitizer.js',
    spec: 'Implement sanitizeHtml exactly per contract using cheerio (require("cheerio")). Remove script/noscript/base, strip all on* ' +
      'attributes, neutralize forms (action="#", method="get", submit->type=button+disabled, data-disabled-form). Rewrite every <a>: ' +
      'resolve absolute (require lib/url-utils resolveUrl); internal+exists -> local href via localPageResolver; internal-missing -> ' +
      'href="#" + data-missing-local-page="true"; external -> href="#"; always set data-original-href + rel="noopener noreferrer". Add ' +
      'referrerpolicy="no-referrer" to <img>. Inject the offline banner div at top of <body> with the EXACT text "Offline UI reference ' +
      'snapshot — not connected to live platform." and an inline amber style. Return the serialized HTML string. Never throw on weird HTML.',
  },
  {
    path: ROOT + '/lib/report-writer.js', model: 'sonnet', effort: 'medium', label: 'lib/report-writer.js',
    spec: 'Implement writePageRecord, buildPageMarkdown, writeRoleMap, buildRoleMapMarkdown exactly per contract. Require lib/fs-utils. ' +
      'writePageRecord writes pages/<slug>.json (the full record, pretty) and pages/<slug>.md (buildPageMarkdown). buildPageMarkdown ' +
      'renders all the sections listed in the contract including a "## Rebuild notes" section with neutral UX observations derived from ' +
      'the record (e.g. counts of buttons/forms/tables, RTL note, module list) — observations only, never proprietary copy. writeRoleMap ' +
      'writes role-map.json (records summaries + routeGraph + summary), role-map.md (buildRoleMapMarkdown), and network/endpoints.json. ' +
      'Keep role-map.json reasonably sized: include per-page {slug,url,route,title,modules,discoveryStatus,counts} not the full record.',
  },
  {
    path: ROOT + '/lib/role-comparator.js', model: 'opus', effort: 'high', label: 'lib/role-comparator.js',
    spec: 'Implement loadAllRoleData, compareRolePair, buildSharedUnique, buildPermissionMatrix, buildComponentInventory, ' +
      'buildInteractionInventory exactly per contract. Require lib/fs-utils + lib/config. loadAllRoleData reads each role outputDir: ' +
      'role-map.json + every pages/*.json (full records); skip roles with no output, never throw. compareRolePair keys pages by ' +
      'normalizedRoute. sameRouteDifferentUI compares button/form/table/modal counts and the set of visible button texts between the two ' +
      'roles for the same route. buildPermissionMatrix aggregates per MODULE per role. buildComponentInventory tallies component types ' +
      '(buttons, forms, tables, cards, filters, tabs, modals) across all roles. buildInteractionInventory tallies interaction types. ' +
      'Return plain data objects only.',
  },
  {
    path: ROOT + '/save-auth.js', model: 'sonnet', effort: 'high', label: 'save-auth.js',
    spec: 'Entry script: node save-auth.js <role>. Require lib/config + lib/logger + playwright (chromium) + readline. Steps: loadEnv; ' +
      'getRole(role) (error+exit(1) if role missing/unknown). Launch chromium headless:false ALWAYS (manual login), with a real viewport. ' +
      'newContext, newPage, goto role.loginUrl (waitUntil domcontentloaded). Attempt autofill: find username field via ' +
      'input[type=email],input[name*=user i],input[name*=email i],input[id*=user i],#username,#email,input[name=login]; password via ' +
      'input[type=password]; if both present AND role.hasCredentials, fill them (NEVER log the password — use redact) and click a submit ' +
      'control (button[type=submit], input[type=submit], button:has-text variants) then wait for navigation best-effort. If autofill not ' +
      'possible, print clear manual-login instructions. Then readline prompt: "Log in in the browser, then press ENTER here to save the ' +
      'session..." and await Enter. After Enter: VALIDATE — if the current URL still looks like the login page (contains /login) or a ' +
      'password field is still visible, print a clear error "Still on the login page — session NOT saved" and exit(1) WITHOUT saving. ' +
      'Otherwise context.storageState({ path: role.authStateFile }), log success with the path only (no secrets), close browser, exit(0). ' +
      'Wrap everything; on error log clearly and exit(1). Never print passwords anywhere.',
  },
  {
    path: ROOT + '/crawl-role.js', model: 'opus', effort: 'xhigh', label: 'crawl-role.js',
    spec: 'THE ORCHESTRATOR. Entry: node crawl-role.js <role>. Require lib/config, lib/logger, lib/fs-utils, lib/url-utils, ' +
      'lib/wait-utils, lib/page-classifier, lib/dom-extractor, lib/token-extractor, lib/interaction-explorer, lib/html-sanitizer, ' +
      'lib/report-writer, and playwright chromium. Flow: loadEnv; cfg=getGlobalConfig(); role=getRole(roleKey); if role.authStateFile ' +
      'missing -> error "run save-auth first" + exit(1). Launch chromium (headless per cfg), context with storageState: ' +
      'role.authStateFile, viewport cfg.viewport, ignoreHTTPSErrors:true. Network capture: context.on("requestfinished")/page.on(' +
      '"response") collecting UNIQUE {method,url,resourceType,status} for same-origin requests — metadata ONLY, NEVER bodies. ' +
      'Queue-based BFS over same-origin URLs: queue seeded with role.startUrls (via:"start"); visited keyed by normalizeRoute; ' +
      'routeGraph maps route -> {url,title,modules,status,discoveredFrom,discovers:[]}. Stop when queue empty or visited >= ' +
      'cfg.maxPagesPerRole. Per URL: classifyUrlTarget (record external_url/unsupported_file/anchor/mailto/js end-states and skip ' +
      'non-internal); if normalizeRoute already visited -> record duplicate_of_normalized_route and skip. gotoCalm(page,url,cfg). ' +
      'Detect login redirect/session expiry: if landed URL contains /login or a password field is visible -> mark login_redirect, warn; ' +
      'track consecutive login redirects and ABORT the run with a clear "session expired, re-run save-auth" message if it happens ' +
      'repeatedly (e.g. 3x). On success: waitForContent, waitForSpinnersGone, slowScrollToBottom, scrollToTop; extractStaticData; ' +
      'extractDesignTokens; classifyModules; full-page screenshot to screenshots/<slug>-full.png; write html/raw/<slug>.html (page.content) ' +
      'and text/<slug>.txt (visibleText). exploreInteractions with a takeScreenshot helper that saves screenshots/<slug>-interaction-NNN.png. ' +
      'Assemble the full PageRecord (discoveryStatus "visited", capturedAt new Date().toISOString(), network endpoints filtered to this ' +
      'page-ish or the global unique set, designTokens, domSummary). writePageRecord. Mark visited; record in routeGraph. ENQUEUE ' +
      'discovered internal links (sidebar/header/footer/breadcrumb/cards/table action links/dropdown links/pagination/tabs-that-change-' +
      'route/internalLinks + safe navigations returned by the explorer) with proper via + discoveredFrom, deduped by normalizeRoute. ' +
      'On nav failure: if cfg.retryFailedPages push to a retry list; record failed_with_error{message}; never crash. After BFS: retry ' +
      'failed pages ONCE with longer waits. PHASE 2: build a route->localSanitizedFile map from all captured pages and write ' +
      'html/sanitized/<slug>.html for every page via sanitizeHtml (localPageResolver checks that map; relative href from sanitized dir to ' +
      'the target sanitized file). Write network/endpoints.json (unique). Build a summary {counts by end-state, modules covered, totals ' +
      'of buttons/forms/tables/modals/interactions, unreachable explanation: failed pages + why, skipped with reasons}. writeRoleMap. ' +
      'Print a clear human summary INCLUDING what it could not reach and why. Wrap per-page work in try/catch (one page never kills the ' +
      'run); close browser in finally; exit code reflects fatal-only errors.',
  },
  {
    path: ROOT + '/crawl-all-roles.js', model: 'sonnet', effort: 'medium', label: 'crawl-all-roles.js',
    spec: 'Entry: node crawl-all-roles.js. Require lib/config + lib/logger + child_process. loadEnv; roles = loadRoles(). Order: crawl ' +
      'admin, then teacher, then family, then any other roles present in config.roles. For each, run "node crawl-role.js <key>" via ' +
      'child_process.spawnSync with stdio:"inherit" (so the upgraded pipeline re-crawls admin even if old output exists). CONTINUE if one ' +
      'role fails (capture exit code, log, move on). At the end print a final summary table: role -> status (ok/failed/skipped-no-auth) + ' +
      'page count (read output/roles/<key>/role-map.json if present). Skip a role gracefully if its auth-state file is missing (note it). ' +
      'Export a crawlRole(key) helper. Exit 0 unless every role failed.',
  },
  {
    path: ROOT + '/coverage-audit.js', model: 'opus', effort: 'high', label: 'coverage-audit.js',
    spec: 'Entry: node coverage-audit.js. Require lib/config, lib/logger, lib/fs-utils, lib/role-comparator. loadEnv; keys = ' +
      'loadRoles().map(r=>r.key); data = loadAllRoleData(keys). Create output/combined/ and generate ALL of these (real content, never ' +
      'fake): academy-system-map.json (master structured: roles, modules->pages, routeGraph per role, components, interactions, ' +
      'comparisons) + academy-system-map.md; page-inventory.md (every page across roles: role,url,route,title,modules,status,counts); ' +
      'route-graph.md (per role: how each route was discovered, parent->children); role-permission-matrix.md (buildPermissionMatrix: ' +
      'module x role with page/button/form/modal/table presence+counts); shared-unique-pages.md (buildSharedUnique + the three pairwise ' +
      'compareRolePair: admin-vs-teacher, admin-vs-family, teacher-vs-family, including sameRouteDifferentUI); component-inventory.md ' +
      '(buildComponentInventory); interaction-inventory.md (buildInteractionInventory); modal-inventory.md (all modals per role/page); ' +
      'form-inventory.md (all forms+fields per role/page); table-inventory.md (all tables+headers per role/page); button-coverage.md ' +
      '(buttons per role with safety category breakdown, and which were exercised as interactions vs skipped); missing-coverage.md ' +
      '(pages classified General/Unknown, failed pages, login redirects, modules with zero pages, roles not crawled — explain what could ' +
      'not be reached and why); failed-pages.md; skipped-actions.md (safe + unsafe skipped across roles with reasons); ' +
      'design-token-summary.md (aggregate designTokens across pages/roles: top colors, fonts, sizes, radius, shadows, button/card/table ' +
      'styles); llm-context.md (compact, LLM-ready overview of the whole system for later analysis); speckit-discovery.md (spec-kit ' +
      'oriented discovery: product map, modules, roles/permissions, page list, components, open questions). The audit MUST compare admin ' +
      'vs teacher vs family (shared pages, unique pages, same route different UI by role, same module different permissions, buttons/forms/' +
      'modals/tables available per role). Handle missing roles gracefully and note them; never crash on absent data.',
  },
  {
    path: ROOT + '/build-report.js', model: 'opus', effort: 'high', label: 'build-report.js',
    spec: 'Entry: node build-report.js. Require lib/config, lib/logger, lib/fs-utils, lib/role-comparator. loadEnv; data = ' +
      'loadAllRoleData(loadRoles().map(r=>r.key)). Generate output/combined/report.html: a SINGLE self-contained file, NO external CDN ' +
      '(inline CSS + inline vanilla JS). Embed a trimmed JSON dataset in a <script type="application/json"> (per page: role,title,url,' +
      'normalizedRoute,modules,dir/isRTL,discoveryStatus, screenshots.full, html.sanitizedFile, headings, buttons(+safety), forms/fields, ' +
      'tables/columns, cards/KPIs, filters, tabs, modals, interactions(type+screenshot), unsafeSkipped, failed, discovered links counts, ' +
      'rebuild notes; OMIT the huge visibleText). Layout: left SIDEBAR listing roles -> pages (grouped, collapsible) with a search/filter ' +
      'box (filter by role, module, page title, url); MAIN area for the selected page: screenshot on the LEFT (img with relative src like ' +
      '../roles/<role>/screenshots/<slug>-full.png), structured report on the RIGHT (all the fields above), interaction screenshots BELOW. ' +
      'Include a link to the local sanitized HTML (relative). Must work offline via file:// (compute relative paths from output/combined/ ' +
      'to ../roles/...). Handle missing images/pages gracefully (alt text / "no screenshot"). Clean, readable, RTL-aware styling. Use ' +
      'fs-utils.relativePath for link computation. The HTML must be valid and open standalone.',
  },
]

// ---------------------------------------------------------------------------
// RUN
// ---------------------------------------------------------------------------
phase('Foundation')
log('Writing ' + FOUNDATION.length + ' foundation files (config, libs, boilerplate, docs)...')
const foundationResults = await parallel(FOUNDATION.map(spec => () =>
  agent(buildPrompt(spec), {
    label: spec.label,
    phase: 'Foundation',
    model: spec.model,
    effort: spec.effort,
    agentType: 'general-purpose',
  })
))
log('Foundation done: ' + foundationResults.filter(Boolean).length + '/' + FOUNDATION.length + ' agents reported success.')

phase('Engine')
log('Writing ' + ENGINE.length + ' engine files (extractors, explorer, crawler, audit, report)...')
const engineResults = await parallel(ENGINE.map(spec => () =>
  agent(buildPrompt(spec), {
    label: spec.label,
    phase: 'Engine',
    model: spec.model,
    effort: spec.effort,
    agentType: 'general-purpose',
  })
))
log('Engine done: ' + engineResults.filter(Boolean).length + '/' + ENGINE.length + ' agents reported success.')

return {
  foundation: FOUNDATION.map((s, i) => ({ file: s.path, model: s.model, ok: Boolean(foundationResults[i]) })),
  engine: ENGINE.map((s, i) => ({ file: s.path, model: s.model, ok: Boolean(engineResults[i]) })),
}
