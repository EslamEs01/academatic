/* Spec 031 — Materials (subject catalog) + Books/Library (media catalog) fixtures.
 * Display-only authored data. `views`/`downloads`/`count` are authored LITERALS (never
 * computed/summed). NO file/thumbnail/URL field, NO upload, NO download link — the
 * upload/download/publish/delete actions are backendRequired gates in the page. */

/* Materials = bilingual subject catalog (name + name_ar), no files. */
export const SUBJECTS = [
  { id: 'sub1', nameKey: 'adm.lib.subj.arabic',  nameArKey: 'adm.lib.subj.arabicAr' },
  { id: 'sub2', nameKey: 'adm.lib.subj.english', nameArKey: 'adm.lib.subj.englishAr' },
  { id: 'sub3', nameKey: 'adm.lib.subj.math',    nameArKey: 'adm.lib.subj.mathAr' },
  { id: 'sub4', nameKey: 'adm.lib.subj.science', nameArKey: 'adm.lib.subj.scienceAr' },
  { id: 'sub5', nameKey: 'adm.lib.subj.quran',   nameArKey: 'adm.lib.subj.quranAr' },
  { id: 'sub6', nameKey: 'adm.lib.subj.coding',  nameArKey: 'adm.lib.subj.codingAr' },
];

/* media type → { tone (styled), icon (sprite id) } */
export const BOOK_TYPES = {
  file:  { tone: 'neutral',   icon: 'file-text',      labelKey: 'adm.lib.type.file' },
  video: { tone: 'upcoming',  icon: 'play',           labelKey: 'adm.lib.type.video' },
  image: { tone: 'completed', icon: 'award',          labelKey: 'adm.lib.type.image' },
  audio: { tone: 'amber',     icon: 'message-circle', labelKey: 'adm.lib.type.audio' },
  link:  { tone: 'neutral',   icon: 'globe',          labelKey: 'adm.lib.type.link' },
};

export const BOOK_STATUS = {
  published: { tone: 'completed', icon: 'check-circle', labelKey: 'adm.lib.st.published' },
  draft:     { tone: 'amber',     icon: 'clock',        labelKey: 'adm.lib.st.draft' },
  archived:  { tone: 'neutral',   icon: 'x-circle',     labelKey: 'adm.lib.st.archived' },
};

/* Books/library media rows. views/downloads are authored count literals. */
export const BOOKS = [
  { id: 'bk1', nameKey: 'adm.lib.book.b1', typeId: 'file',  categoryKey: 'adm.lib.cat.arabic',  publishedKey: 'adm.lib.pub.recent', views: 128, downloads: 44, statusId: 'published' },
  { id: 'bk2', nameKey: 'adm.lib.book.b2', typeId: 'video', categoryKey: 'adm.lib.cat.science', publishedKey: 'adm.lib.pub.recent', views: 96,  downloads: 12, statusId: 'published' },
  { id: 'bk3', nameKey: 'adm.lib.book.b3', typeId: 'image', categoryKey: 'adm.lib.cat.math',    publishedKey: 'adm.lib.pub.month',  views: 54,  downloads: 8,  statusId: 'draft' },
  { id: 'bk4', nameKey: 'adm.lib.book.b4', typeId: 'audio', categoryKey: 'adm.lib.cat.quran',   publishedKey: 'adm.lib.pub.month',  views: 210, downloads: 71, statusId: 'published' },
  { id: 'bk5', nameKey: 'adm.lib.book.b5', typeId: 'link',  categoryKey: 'adm.lib.cat.coding',  publishedKey: 'adm.lib.pub.older',  views: 33,  downloads: 0,  statusId: 'archived' },
  { id: 'bk6', nameKey: 'adm.lib.book.b6', typeId: 'file',  categoryKey: 'adm.lib.cat.english', publishedKey: 'adm.lib.pub.older',  views: 77,  downloads: 19, statusId: 'draft' },
];

/* library categories — name + authored count literal. */
export const BOOK_CATEGORIES = [
  { id: 'lc1', nameKey: 'adm.lib.cat.arabic',  count: 6 },
  { id: 'lc2', nameKey: 'adm.lib.cat.english', count: 4 },
  { id: 'lc3', nameKey: 'adm.lib.cat.math',    count: 3 },
  { id: 'lc4', nameKey: 'adm.lib.cat.science', count: 5 },
  { id: 'lc5', nameKey: 'adm.lib.cat.quran',   count: 8 },
  { id: 'lc6', nameKey: 'adm.lib.cat.coding',  count: 2 },
];
