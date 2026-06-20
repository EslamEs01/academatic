"use strict";

/**
 * lib/page-classifier.js
 *
 * Classifies a crawled page into one or more canonical academy dashboard modules
 * by scoring keyword matches against pathname segments, title, headings, and
 * (higher-weighted) sidebarActiveText.
 *
 * Exports: { MODULES, classifyModules }
 */

// ---------------------------------------------------------------------------
// Dependency: reuse safety.js normalizeText for Arabic-aware normalization.
// We require it lazily inside functions to avoid circular-dep issues at load time.
// ---------------------------------------------------------------------------

let _normalizeText = null;
function normalizeText(str) {
  if (!_normalizeText) {
    try {
      // safety.js lives in the same lib/ directory
      _normalizeText = require("./safety").normalizeText;
    } catch (_) {
      // Fallback: basic lowercase + trim if safety not yet available
      _normalizeText = (s) => (s || "").toLowerCase().trim().replace(/\s+/g, " ");
    }
  }
  return _normalizeText(str || "");
}

// ---------------------------------------------------------------------------
// MODULES — canonical ordered list (exact strings, exact order)
// ---------------------------------------------------------------------------
const MODULES = [
  "Dashboard / Home",
  "Students",
  "Teachers",
  "Parents / Guardians / Families",
  "Courses",
  "Subjects",
  "Classes / Live Sessions",
  "Timetable / Schedule",
  "Attendance",
  "Assignments / Homework",
  "Exams / Quizzes",
  "Certificates",
  "Payments / Invoices",
  "Wallet / Finance",
  "Reports / Analytics",
  "Messages / Notifications",
  "Content / Materials / Library",
  "Settings",
  "Roles / Permissions",
  "Profile / Account",
  "General / Unknown",
];

// ---------------------------------------------------------------------------
// Keyword map: each module -> { en: [...], ar: [...] }
// English keywords are lowercase and will be matched as substrings in path
// segments and normalized text. Arabic keywords are normalized substrings.
// ---------------------------------------------------------------------------
const KEYWORD_MAP = {
  "Dashboard / Home": {
    en: [
      "dashboard",
      "home",
      "overview",
      "summary",
      "welcome",
      "main",
      "index",
      "management/home",
      "admin/home",
      "start",
      "landing",
      "analytics-home",
    ],
    ar: [
      "الرئيسية",
      "لوحة التحكم",
      "لوحة القيادة",
      "الصفحة الرئيسية",
      "نظرة عامة",
      "ملخص",
      "البداية",
      "رئيسية",
      "اهلا",
      "مرحبا",
      "البيانات",
    ],
  },
  Students: {
    en: [
      "student",
      "students",
      "learner",
      "learners",
      "pupil",
      "pupils",
      "enrollment",
      "enrolment",
      "registrant",
      "registrants",
      "student-list",
      "student-detail",
      "student-profile",
    ],
    ar: [
      "طلاب",
      "طالب",
      "الطلاب",
      "طلبه",
      "طلبة",
      "المتعلمين",
      "المتعلم",
      "تسجيل الطلاب",
      "قائمة الطلاب",
      "ملف الطالب",
      "بيانات الطلاب",
      "تفاصيل الطالب",
    ],
  },
  Teachers: {
    en: [
      "teacher",
      "teachers",
      "instructor",
      "instructors",
      "educator",
      "educators",
      "tutor",
      "tutors",
      "staff",
      "faculty",
      "trainer",
      "trainers",
    ],
    ar: [
      "معلمين",
      "معلم",
      "المعلمين",
      "مدرسين",
      "مدرس",
      "المدرسين",
      "استاذ",
      "اساتذه",
      "اساتذة",
      "الاساتذة",
      "مدربين",
      "مدرب",
      "الهيئة التدريسية",
      "كادر التدريس",
    ],
  },
  "Parents / Guardians / Families": {
    en: [
      "parent",
      "parents",
      "guardian",
      "guardians",
      "family",
      "families",
      "relative",
      "relatives",
      "wali",
      "ولي",
    ],
    ar: [
      "اولياء امور",
      "ولي امر",
      "اولياء",
      "والدين",
      "عائلات",
      "عائلة",
      "الاسرة",
      "الأسر",
      "اهل الطالب",
      "الوالدين",
      "ذوي الطلاب",
      "الاولياء",
      "اسر",
    ],
  },
  Courses: {
    en: [
      "course",
      "courses",
      "curriculum",
      "program",
      "programs",
      "programme",
      "programmes",
      "training",
      "module",
      "modules",
      "course-list",
      "course-detail",
    ],
    ar: [
      "كورس",
      "كورسات",
      "دورة",
      "دورات",
      "المناهج",
      "منهج",
      "برنامج",
      "برامج",
      "الكورسات",
      "البرامج التدريبية",
      "قائمة الكورسات",
      "تفاصيل الكورس",
      "الدورات التدريبية",
    ],
  },
  Subjects: {
    en: [
      "subject",
      "subjects",
      "topic",
      "topics",
      "discipline",
      "disciplines",
      "field",
      "fields",
      "lesson",
      "lessons",
    ],
    ar: [
      "مادة",
      "مواد",
      "المواد",
      "موضوع",
      "مواضيع",
      "المواد الدراسية",
      "درس",
      "دروس",
      "الدروس",
      "المقررات",
      "مقرر",
    ],
  },
  "Classes / Live Sessions": {
    en: [
      "class",
      "classes",
      "session",
      "sessions",
      "live",
      "live-class",
      "live-session",
      "classroom",
      "classrooms",
      "group",
      "groups",
      "lecture",
      "lectures",
      "webinar",
      "webinars",
      "meeting",
      "meetings",
      "zoom",
    ],
    ar: [
      "حصة",
      "حصص",
      "الحصص",
      "جلسة",
      "جلسات",
      "فصل",
      "فصول",
      "فصل دراسي",
      "بث مباشر",
      "لايف",
      "درس مباشر",
      "اجتماع",
      "اجتماعات",
      "لقاء",
      "لقاءات",
      "فيديو مباشر",
    ],
  },
  "Timetable / Schedule": {
    en: [
      "timetable",
      "timetables",
      "schedule",
      "schedules",
      "calendar",
      "calendars",
      "agenda",
      "planner",
      "time-table",
      "weekly",
      "daily",
      "slot",
      "slots",
    ],
    ar: [
      "جدول",
      "جداول",
      "الجدول",
      "جدول الحصص",
      "جدول الدراسة",
      "جدول الدروس",
      "الجدول الدراسي",
      "تقويم",
      "روزنامة",
      "مواعيد",
      "موعد",
      "الخطة الدراسية",
      "جدول اسبوعي",
    ],
  },
  Attendance: {
    en: [
      "attendance",
      "attendances",
      "absent",
      "absences",
      "presence",
      "check-in",
      "checkin",
      "roll-call",
      "rollcall",
      "leave",
      "leaves",
    ],
    ar: [
      "حضور",
      "الحضور",
      "غياب",
      "الغياب",
      "سجل الحضور",
      "تسجيل الحضور",
      "كشف الحضور",
      "الحضور والغياب",
      "الغيابات",
      "انصراف",
    ],
  },
  "Assignments / Homework": {
    en: [
      "assignment",
      "assignments",
      "homework",
      "task",
      "tasks",
      "project",
      "projects",
      "exercise",
      "exercises",
      "submission",
      "submissions",
      "deliverable",
      "deliverables",
    ],
    ar: [
      "واجب",
      "واجبات",
      "الواجبات",
      "تكليف",
      "تكليفات",
      "مهمة",
      "مهام",
      "المهام",
      "مشروع",
      "مشاريع",
      "تسليم",
      "الاعمال",
      "عمل منزلي",
      "الانشطة",
      "نشاط",
    ],
  },
  "Exams / Quizzes": {
    en: [
      "exam",
      "exams",
      "quiz",
      "quizzes",
      "test",
      "tests",
      "assessment",
      "assessments",
      "evaluation",
      "evaluations",
      "examination",
      "examinations",
      "grade",
      "grades",
      "result",
      "results",
      "score",
      "scores",
    ],
    ar: [
      "امتحان",
      "امتحانات",
      "الامتحانات",
      "اختبار",
      "اختبارات",
      "الاختبارات",
      "كويز",
      "اسئلة",
      "درجات",
      "النتائج",
      "نتيجة",
      "تقييم",
      "تقييمات",
      "التقييم",
      "علامات",
      "ملاحظات الاداء",
      "اداء الطلاب",
    ],
  },
  Certificates: {
    en: [
      "certificate",
      "certificates",
      "certification",
      "certifications",
      "diploma",
      "diplomas",
      "credential",
      "credentials",
      "award",
      "awards",
      "badge",
      "badges",
    ],
    ar: [
      "شهادة",
      "شهادات",
      "الشهادات",
      "دبلوم",
      "توثيق",
      "وثيقة",
      "وثائق",
      "اعتماد",
      "جائزة",
      "جوائز",
      "انجاز",
      "انجازات",
    ],
  },
  "Payments / Invoices": {
    en: [
      "payment",
      "payments",
      "invoice",
      "invoices",
      "billing",
      "bill",
      "bills",
      "fee",
      "fees",
      "tuition",
      "subscription",
      "subscriptions",
      "receipt",
      "receipts",
      "charge",
      "charges",
      "order",
      "orders",
      "transaction",
      "transactions",
    ],
    ar: [
      "فاتورة",
      "فواتير",
      "الفواتير",
      "دفع",
      "مدفوعات",
      "رسوم",
      "الرسوم",
      "مصروفات",
      "اشتراك",
      "اشتراكات",
      "ايصال",
      "وصل",
      "سداد",
      "معاملات مالية",
      "طلبات الدفع",
      "الطلبات المالية",
    ],
  },
  "Wallet / Finance": {
    en: [
      "wallet",
      "wallets",
      "finance",
      "finances",
      "financial",
      "balance",
      "balances",
      "account-balance",
      "credit",
      "credits",
      "debit",
      "debits",
      "fund",
      "funds",
      "treasury",
      "ledger",
      "salary",
      "salaries",
      "payroll",
      "payout",
      "payouts",
      "earnings",
      "wage",
      "wages",
      "accounting",
      "expense",
      "expenses",
      "revenue",
      "profit",
    ],
    ar: [
      "محفظة",
      "المحفظة",
      "الرصيد",
      "رصيد",
      "المالية",
      "شؤون مالية",
      "ماليات",
      "خزينة",
      "حساب مالي",
      "ائتمان",
      "رصيد مالي",
      "الحسابات المالية",
      "راتب",
      "رواتب",
      "الرواتب",
      "مصروفات",
      "مصاريف",
      "ايرادات",
      "ارباح",
      "محاسبة",
    ],
  },
  "Reports / Analytics": {
    en: [
      "report",
      "reports",
      "analytic",
      "analytics",
      "statistic",
      "statistics",
      "stat",
      "stats",
      "insight",
      "insights",
      "metric",
      "metrics",
      "chart",
      "charts",
      "graph",
      "graphs",
      "kpi",
      "performance",
      "trend",
      "trends",
      "data",
      "export",
    ],
    ar: [
      "تقرير",
      "تقارير",
      "الاحصائيات",
      "احصائيات",
      "احصاء",
      "تحليل",
      "تحليلات",
      "البيانات",
      "الادوات التحليلية",
      "رسم بياني",
      "مؤشرات",
      "مؤشر",
      "اداء",
      "ملخص الاداء",
      "التقارير",
      "نظرة احصائية",
    ],
  },
  "Messages / Notifications": {
    en: [
      "message",
      "messages",
      "notification",
      "notifications",
      "inbox",
      "outbox",
      "chat",
      "chats",
      "announcement",
      "announcements",
      "alert",
      "alerts",
      "email",
      "emails",
      "sms",
      "communication",
      "broadcast",
    ],
    ar: [
      "رسالة",
      "رسائل",
      "الرسائل",
      "اشعار",
      "اشعارات",
      "الاشعارات",
      "محادثة",
      "محادثات",
      "اعلان",
      "اعلانات",
      "تنبيه",
      "تنبيهات",
      "صندوق البريد",
      "التواصل",
      "المراسلات",
      "نشرة",
    ],
  },
  "Content / Materials / Library": {
    en: [
      "content",
      "contents",
      "material",
      "materials",
      "library",
      "libraries",
      "resource",
      "resources",
      "file",
      "files",
      "document",
      "documents",
      "media",
      "video",
      "videos",
      "upload",
      "uploads",
      "attachment",
      "attachments",
      "storage",
    ],
    ar: [
      "محتوى",
      "المحتوى",
      "مواد",
      "مكتبة",
      "المكتبة",
      "ملف",
      "ملفات",
      "الملفات",
      "موارد",
      "وثيقة",
      "وثائق",
      "مقاطع فيديو",
      "فيديو",
      "مقاطع",
      "الموارد التعليمية",
      "مرفقات",
      "رفع الملفات",
      "محتويات",
    ],
  },
  Settings: {
    en: [
      "setting",
      "settings",
      "configuration",
      "configurations",
      "config",
      "preference",
      "preferences",
      "option",
      "options",
      "general-settings",
      "system-settings",
      "site-settings",
      "admin-settings",
      "setup",
    ],
    ar: [
      "اعدادات",
      "الاعدادات",
      "إعداد",
      "إعدادات",
      "تهيئة",
      "تخصيص",
      "الخيارات",
      "خيارات",
      "ضبط",
      "ضبط النظام",
      "إعدادات النظام",
      "اعدادات الموقع",
      "اعدادات عامة",
    ],
  },
  "Roles / Permissions": {
    en: [
      "role",
      "roles",
      "permission",
      "permissions",
      "access",
      "access-control",
      "acl",
      "privilege",
      "privileges",
      "authorization",
      "authority",
      "user-role",
      "admin-role",
    ],
    ar: [
      "دور",
      "ادوار",
      "الادوار",
      "صلاحيات",
      "صلاحية",
      "الصلاحيات",
      "اذونات",
      "اذن",
      "الاذونات",
      "تحكم في الوصول",
      "مجموعات المستخدمين",
      "مستويات الوصول",
      "التحكم بالصلاحيات",
    ],
  },
  "Profile / Account": {
    en: [
      "profile",
      "profiles",
      "account",
      "accounts",
      "my-account",
      "my-profile",
      "user-profile",
      "personal",
      "personal-info",
      "user-info",
      "edit-profile",
      "security",
      "password",
      "change-password",
    ],
    ar: [
      "حساب",
      "الحساب",
      "ملف شخصي",
      "الملف الشخصي",
      "بياناتي",
      "بيانات المستخدم",
      "معلومات المستخدم",
      "حسابي",
      "تعديل الملف",
      "الاعدادات الشخصية",
      "كلمة المرور",
      "الامان",
      "تغيير كلمة المرور",
    ],
  },
};

// ---------------------------------------------------------------------------
// Weights for different text sources
// ---------------------------------------------------------------------------
const WEIGHTS = {
  url: 10,               // pathname segments — the canonical, most reliable signal
  sidebarActiveText: 8,  // the ONE highlighted sidebar item for THIS page (page-specific)
  breadcrumbs: 5,        // breadcrumb trail is page-specific
  headings: 3,           // visible main-content h1/h2/h3 (chrome excluded by extractor)
  title: 1,             // page <title> (often a generic brand string — low trust)
};
// NOTE: full body text is intentionally NOT scored. The shared sidebar lists
// every module on every page, so body text made every page match every module
// (16-17 of 21). Classification now relies on page-specific signals only.

// ---------------------------------------------------------------------------
// Internal: extract text tokens from a string for matching
// Splits on common separators so "student-list" yields ["student", "list"]
// ---------------------------------------------------------------------------
function tokenize(str) {
  if (!str) return [];
  const norm = normalizeText(str);
  // Split on whitespace, /, -, _, . for URL-like strings
  return norm.split(/[\s/\-_.]+/).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Internal: check if a normalized (Arabic-aware) string contains a keyword.
// For English: whole-word-ish match via word boundary approximation.
// For Arabic: substring match.
// ---------------------------------------------------------------------------
function matchesKeyword(normalizedText, keyword, isArabic) {
  if (!normalizedText || !keyword) return false;
  const normKw = normalizeText(keyword);
  if (isArabic) {
    return normalizedText.includes(normKw);
  }
  // English: require the keyword to appear as a whole word or segment
  // We check: substring exists AND surrounded by non-alphanumeric or at boundaries
  const idx = normalizedText.indexOf(normKw);
  if (idx === -1) return false;
  const before = idx === 0 ? "" : normalizedText[idx - 1];
  const after = idx + normKw.length >= normalizedText.length ? "" : normalizedText[idx + normKw.length];
  const boundaryBefore = !before || /[^a-z0-9]/.test(before);
  const boundaryAfter = !after || /[^a-z0-9]/.test(after);
  // Allow if surrounded by boundaries OR the full text is the keyword
  return boundaryBefore && boundaryAfter;
}

// ---------------------------------------------------------------------------
// Internal: score a single text string against a module's keyword lists.
// Returns a numeric score (0 if no matches).
// ---------------------------------------------------------------------------
function scoreText(text, keywords) {
  if (!text || !text.trim()) return 0;
  const norm = normalizeText(text);
  let score = 0;

  for (const kw of keywords.en) {
    if (matchesKeyword(norm, kw, false)) {
      // Longer keywords are more specific — weight by length
      score += 1 + Math.floor(kw.length / 4);
    }
  }
  for (const kw of keywords.ar) {
    if (matchesKeyword(norm, kw, true)) {
      score += 1 + Math.floor(kw.length / 4);
    }
  }
  return score;
}

// ---------------------------------------------------------------------------
// Public: classifyModules
// ---------------------------------------------------------------------------
/**
 * Classify a page into one or more canonical module names.
 *
 * @param {object} opts
 * @param {string} [opts.url]               - Absolute URL of the page
 * @param {string} [opts.route]             - normalizedRoute key
 * @param {string} [opts.title]             - Page <title> text
 * @param {Array} [opts.headings]           - Array of heading strings or {level,text}
 * @param {Array} [opts.breadcrumbs]        - Array of breadcrumb strings or {text}
 * @param {string} [opts.sidebarActiveText] - Text of the active sidebar link/item
 * @returns {string[]} - Matched module names (score desc), thresholded + capped; never empty.
 */
function classifyModules({ url = "", route = "", title = "", headings = [], breadcrumbs = [], sidebarActiveText = "" } = {}) {
  // Build a combined URL string from both url and route for pathname matching.
  const urlText = [url, route].filter(Boolean).join(" ");
  // Headings / breadcrumbs may be strings or objects — reduce to plain text.
  const toText = (v) => (typeof v === "string" ? v : v && typeof v === "object" ? v.text || "" : "");
  const headingText = (Array.isArray(headings) ? headings : []).map(toText).filter(Boolean).join(" ");
  const breadcrumbText = (Array.isArray(breadcrumbs) ? breadcrumbs : []).map(toText).filter(Boolean).join(" ");

  const scores = {}; // moduleName -> total score

  for (const moduleName of MODULES) {
    if (moduleName === "General / Unknown") continue; // handled at end
    const keywords = KEYWORD_MAP[moduleName];
    if (!keywords) continue;

    let total = 0;
    if (sidebarActiveText) total += WEIGHTS.sidebarActiveText * scoreText(sidebarActiveText, keywords);
    if (urlText) total += WEIGHTS.url * scoreText(urlText, keywords);
    if (breadcrumbText) total += WEIGHTS.breadcrumbs * scoreText(breadcrumbText, keywords);
    if (headingText) total += WEIGHTS.headings * scoreText(headingText, keywords);
    if (title) total += WEIGHTS.title * scoreText(title, keywords);

    if (total > 0) scores[moduleName] = total;
  }

  const matched = Object.keys(scores);
  if (matched.length === 0) {
    return ["General / Unknown"];
  }

  // Sort by score descending; stable tie-break by canonical MODULES order.
  matched.sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (diff !== 0) return diff;
    return MODULES.indexOf(a) - MODULES.indexOf(b);
  });

  // Keep only strong matches: at least half the top score, and cap to 3 so a
  // page is labelled by what it IS, not by every keyword that happens to appear.
  const topScore = scores[matched[0]];
  const threshold = topScore * 0.5;
  const kept = matched.filter((m) => scores[m] >= threshold).slice(0, 3);

  return kept.length ? kept : ["General / Unknown"];
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------
module.exports = { MODULES, classifyModules };
