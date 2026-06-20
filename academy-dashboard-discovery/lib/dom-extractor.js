"use strict";

/**
 * lib/dom-extractor.js
 *
 * Static DOM extraction for the read-only Academy Dashboard Discovery Crawler.
 *
 * extractStaticData(page, { baseUrl }) returns a PARTIAL PageRecord built from a
 * single page.evaluate() pass that gathers raw plain-data descriptors (no DOM
 * nodes, no functions), then a Node-side enrichment pass that:
 *   - splits links into sidebar/header/footer/internal/external/pagination buckets
 *   - attaches a safety classification to every button via safety.classifyAction
 *   - computes lang/dir/isRTL
 *
 * SAFETY: password input values are NEVER read or returned. The extractor is
 * read-only and purely observational.
 *
 * CommonJS only. No ESM. In-page code must be self-contained (no Node modules).
 */

const urlUtils = require("./url-utils");
const safety = require("./safety");

// ---------------------------------------------------------------------------
// In-page extraction function.
//
// Everything inside collectInPage runs in the browser context, so it may only
// use browser globals (document, window, Element, ...). It returns plain JSON-
// serialisable data. It must be defensive: a failing selector never throws.
// ---------------------------------------------------------------------------

/* istanbul ignore next - executed in the browser, not under Node coverage */
function collectInPage() {
  // -- small, self-contained helpers (no closures over Node scope) --------

  function txt(el) {
    if (!el) return "";
    var t = el.textContent || "";
    return t.replace(/\s+/g, " ").trim();
  }

  function attr(el, name) {
    if (!el || !el.getAttribute) return "";
    var v = el.getAttribute(name);
    return v === null || v === undefined ? "" : String(v);
  }

  function isVisible(el) {
    if (!el || el.nodeType !== 1) return false;
    try {
      var style = window.getComputedStyle(el);
      if (!style) return true;
      if (style.display === "none") return false;
      if (style.visibility === "hidden" || style.visibility === "collapse") return false;
      if (parseFloat(style.opacity || "1") === 0) return false;
      var rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        // Allow zero-size elements that are still in flow (some triggers); but
        // hidden offscreen collapsed elements typically have 0x0 + no client rects.
        if (!el.getClientRects || el.getClientRects().length === 0) return false;
      }
      return true;
    } catch (e) {
      return true;
    }
  }

  function matchesAny(el, selectors) {
    if (!el || !el.matches) return false;
    for (var i = 0; i < selectors.length; i += 1) {
      try {
        if (el.matches(selectors[i])) return true;
      } catch (e) {
        /* invalid selector — ignore */
      }
    }
    return false;
  }

  // Climb ancestors to decide which page region an element belongs to.
  function detectRegion(el) {
    var sidebarSel = [
      "aside",
      "nav[class*=side]",
      "[class*=sidebar]",
      "[class*=side-menu]",
      "[class*=drawer] nav",
    ];
    var headerSel = [
      "header",
      "[class*=topbar]",
      "[class*=navbar]",
      "[class*=app-bar]",
    ];
    var footerSel = ["footer", "[class*=footer]"];

    var node = el;
    var depth = 0;
    while (node && node.nodeType === 1 && depth < 40) {
      if (matchesAny(node, sidebarSel)) return "sidebar";
      if (matchesAny(node, footerSel)) return "footer";
      if (matchesAny(node, headerSel)) return "header";
      node = node.parentElement;
      depth += 1;
    }
    return "main";
  }

  function lowerTag(el) {
    return el && el.tagName ? el.tagName.toLowerCase() : "";
  }

  // Accessible-ish label for a control.
  function controlText(el) {
    var t = txt(el);
    if (t) return t;
    var aria = attr(el, "aria-label");
    if (aria) return aria.replace(/\s+/g, " ").trim();
    var title = attr(el, "title");
    if (title) return title.replace(/\s+/g, " ").trim();
    var val = el && typeof el.value === "string" ? el.value : "";
    return val.replace(/\s+/g, " ").trim();
  }

  // ---------------------------------------------------------------------
  // Document-level metadata.
  // ---------------------------------------------------------------------
  var docEl = document.documentElement || {};
  var lang = attr(docEl, "lang") || "";
  var dir =
    attr(docEl, "dir") ||
    (document.body ? attr(document.body, "dir") : "") ||
    "";
  var title = (document.title || "").replace(/\s+/g, " ").trim();

  // ---------------------------------------------------------------------
  // Headings.
  // ---------------------------------------------------------------------
  var headings = [];
  try {
    // Scope to the main content area so the shared top-bar/sidebar chrome
    // (user name, "Notifications", "Shortcuts", brand) does not pollute page
    // headings — that chrome repeats identically on every page and wrecks both
    // module classification and the derived page name.
    // The shared top-bar/sidebar/notification chrome (user name, "Notifications",
    // "Shortcuts", brand) is rendered as HIDDEN modal/offcanvas/dropdown panels
    // that repeat identically on every page. Left in, it dominates module
    // classification and the derived page name. The reliable discriminator
    // (verified against the live DOM): real content headings are VISIBLE and not
    // inside chrome/modal/dropdown containers; the chrome headings are hidden.
    var CHROME_SEL =
      "header, nav, aside, footer, [class*=topbar], [class*=navbar], [class*=app-bar], " +
      "[class*=sidebar], [class*=side-menu], [class*=side-nav], [role=navigation], [role=banner]";
    var MODAL_SEL =
      ".modal, [role=dialog], [class*=modal], .offcanvas, [class*=offcanvas], " +
      ".dropdown-menu, [class*=dropdown], [class*=popover], [class*=tooltip], [class*=toast]";
    var isElVisible = function (el) {
      try {
        if (!el.getClientRects || el.getClientRects().length === 0) return false;
        var st = window.getComputedStyle(el);
        return (
          st && st.display !== "none" && st.visibility !== "hidden" && parseFloat(st.opacity || "1") > 0
        );
      } catch (eVis) {
        return true;
      }
    };
    var hNodes = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    for (var hi = 0; hi < hNodes.length; hi += 1) {
      var hEl = hNodes[hi];
      var hText = txt(hEl);
      if (!hText) continue;
      try {
        if (hEl.closest && (hEl.closest(CHROME_SEL) || hEl.closest(MODAL_SEL))) continue;
      } catch (eChrome) {
        /* ignore */
      }
      if (!isElVisible(hEl)) continue;
      var level = parseInt(lowerTag(hEl).slice(1), 10);
      if (!(level >= 1 && level <= 6)) level = 1;
      headings.push({ level: level, text: hText });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Breadcrumbs.
  // ---------------------------------------------------------------------
  var breadcrumbs = [];
  try {
    var crumbContainers = document.querySelectorAll(
      "[class*=breadcrumb], [aria-label*=readcrumb], nav[aria-label*=readcrumb], ol[class*=breadcrumb]"
    );
    var seenCrumb = false;
    for (var ci = 0; ci < crumbContainers.length && !seenCrumb; ci += 1) {
      var container = crumbContainers[ci];
      var items = container.querySelectorAll("li, a, span");
      var collected = [];
      for (var ii = 0; ii < items.length; ii += 1) {
        var cText = txt(items[ii]);
        if (cText && collected.indexOf(cText) === -1) collected.push(cText);
      }
      if (collected.length === 0) {
        var whole = txt(container);
        if (whole) collected.push(whole);
      }
      if (collected.length > 0) {
        breadcrumbs = collected;
        seenCrumb = true;
      }
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Anchors / links. element.href is already absolute.
  // ---------------------------------------------------------------------
  var links = [];
  try {
    var aNodes = document.querySelectorAll("a[href]");
    for (var ai = 0; ai < aNodes.length; ai += 1) {
      var a = aNodes[ai];
      // element.href yields the resolved absolute URL for http(s); for
      // javascript:/mailto:/tel: it returns the scheme form, which is fine.
      var hrefAbs = "";
      try {
        hrefAbs = a.href || "";
      } catch (e) {
        hrefAbs = attr(a, "href");
      }
      var rawHref = attr(a, "href");
      var region = detectRegion(a);
      var inPagination = false;
      var pNode = a;
      var pDepth = 0;
      while (pNode && pNode.nodeType === 1 && pDepth < 12) {
        var cls = (pNode.className && pNode.className.baseVal !== undefined)
          ? pNode.className.baseVal
          : (pNode.className || "");
        if (typeof cls === "string" && cls.toLowerCase().indexOf("pagination") !== -1) {
          inPagination = true;
          break;
        }
        var roleAttr = attr(pNode, "role").toLowerCase();
        if (roleAttr === "navigation" && attr(pNode, "aria-label").toLowerCase().indexOf("pag") !== -1) {
          inPagination = true;
          break;
        }
        pNode = pNode.parentElement;
        pDepth += 1;
      }
      links.push({
        text: txt(a),
        ariaLabel: attr(a, "aria-label"),
        title: attr(a, "title"),
        href: hrefAbs,
        rawHref: rawHref,
        region: region,
        role: attr(a, "role"),
        inPagination: inPagination,
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Buttons (and button-like controls).
  // ---------------------------------------------------------------------
  var buttons = [];
  try {
    var bNodes = document.querySelectorAll(
      'button, [role=button], input[type=button], input[type=submit], input[type=reset], a[class*=btn], a[class*=button]'
    );
    var seenButtons = [];
    for (var bi = 0; bi < bNodes.length; bi += 1) {
      var b = bNodes[bi];
      if (seenButtons.indexOf(b) !== -1) continue;
      seenButtons.push(b);
      var bHref = "";
      if (lowerTag(b) === "a") {
        try {
          bHref = b.href || "";
        } catch (e) {
          bHref = attr(b, "href");
        }
      }
      var bType = "";
      if (typeof b.type === "string") bType = b.type;
      else bType = attr(b, "type");
      buttons.push({
        text: controlText(b),
        ariaLabel: attr(b, "aria-label"),
        title: attr(b, "title"),
        tagName: lowerTag(b),
        type: (bType || "").toLowerCase(),
        role: attr(b, "role"),
        href: bHref,
        insideForm: b.closest ? !!b.closest("form") : false,
        formMethod: (function () {
          var f = b.closest ? b.closest("form") : null;
          return f ? String(f.method || "get").toLowerCase() : "";
        })(),
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Forms (+ fields). NEVER read password values.
  // ---------------------------------------------------------------------
  var forms = [];
  try {
    var fNodes = document.querySelectorAll("form");
    for (var fi = 0; fi < fNodes.length; fi += 1) {
      var form = fNodes[fi];
      var fields = [];
      var submitButtons = [];

      var controls = form.querySelectorAll("input, select, textarea");
      for (var fci = 0; fci < controls.length; fci += 1) {
        var ctrl = controls[fci];
        var ctrlTag = lowerTag(ctrl);
        var ctrlType = (ctrl.type || attr(ctrl, "type") || "").toLowerCase();

        // Submit-like inputs go to submitButtons, not fields.
        if (ctrlTag === "input" && (ctrlType === "submit" || ctrlType === "button" || ctrlType === "reset" || ctrlType === "image")) {
          if (ctrlType === "submit" || ctrlType === "image") {
            var sVal = (ctrl.value || attr(ctrl, "value") || "").trim();
            submitButtons.push(sVal || "Submit");
          }
          continue;
        }

        // Resolve an associated label.
        var labelText = "";
        var ctrlId = attr(ctrl, "id");
        if (ctrlId) {
          try {
            var lbl = document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(ctrlId) : ctrlId) + '"]');
            if (lbl) labelText = txt(lbl);
          } catch (e) {
            /* ignore invalid id */
          }
        }
        if (!labelText) {
          var parentLabel = ctrl.closest ? ctrl.closest("label") : null;
          if (parentLabel) labelText = txt(parentLabel);
        }
        if (!labelText) labelText = attr(ctrl, "aria-label");
        if (!labelText) {
          // Sibling-label fallback: many Bootstrap fields put an unassociated
          // <label> next to the control inside a form-group wrapper.
          var grp = ctrl.closest
            ? ctrl.closest(
                ".mb-3, .mb-2, .form-group, .form-floating, [class*=form-group], [class*=field], [class*=input-group]"
              )
            : null;
          if (grp) {
            var grpLabel = grp.querySelector("label");
            if (grpLabel) labelText = txt(grpLabel);
          }
        }

        // Options for select elements.
        var options = [];
        if (ctrlTag === "select" && ctrl.options) {
          for (var oi = 0; oi < ctrl.options.length && oi < 50; oi += 1) {
            var opt = ctrl.options[oi];
            options.push({
              value: opt.value === undefined ? "" : String(opt.value),
              text: txt(opt),
            });
          }
        }

        fields.push({
          tag: ctrlTag,
          type: ctrlType,
          name: attr(ctrl, "name"),
          id: ctrlId,
          label: labelText,
          placeholder: attr(ctrl, "placeholder"),
          required: !!(ctrl.required || attr(ctrl, "required") || attr(ctrl, "aria-required") === "true"),
          options: options,
          // NOTE: deliberately NO value field — never capture user/password input.
        });
      }

      // Also catch submit buttons declared as <button type=submit> or default.
      var btnNodes = form.querySelectorAll("button");
      for (var bni = 0; bni < btnNodes.length; bni += 1) {
        var fbtn = btnNodes[bni];
        var fbType = (fbtn.type || attr(fbtn, "type") || "submit").toLowerCase();
        if (fbType === "submit") {
          var btnText = controlText(fbtn);
          submitButtons.push(btnText || "Submit");
        }
      }

      forms.push({
        action: attr(form, "action"),
        method: (attr(form, "method") || "get").toLowerCase(),
        id: attr(form, "id"),
        name: attr(form, "name"),
        fields: fields,
        submitButtons: submitButtons,
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Standalone labels (text content of <label> elements).
  // ---------------------------------------------------------------------
  var labels = [];
  try {
    var lNodes = document.querySelectorAll("label");
    for (var li = 0; li < lNodes.length; li += 1) {
      var lText = txt(lNodes[li]);
      if (lText && labels.indexOf(lText) === -1) labels.push(lText);
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Tables.
  // ---------------------------------------------------------------------
  var tables = [];
  try {
    var tNodes = document.querySelectorAll("table");
    for (var ti = 0; ti < tNodes.length; ti += 1) {
      var table = tNodes[ti];

      var caption = "";
      var capEl = table.querySelector("caption");
      if (capEl) caption = txt(capEl);

      // Headers: prefer thead th, else first row th/td.
      var headers = [];
      var headerCells = table.querySelectorAll("thead th, thead td");
      if (!headerCells || headerCells.length === 0) {
        var firstRow = table.querySelector("tr");
        if (firstRow) headerCells = firstRow.querySelectorAll("th, td");
      }
      if (headerCells) {
        for (var hci = 0; hci < headerCells.length; hci += 1) {
          headers.push(txt(headerCells[hci]));
        }
      }

      // Body rows.
      var bodyRows = table.querySelectorAll("tbody tr");
      if (!bodyRows || bodyRows.length === 0) {
        // Fall back to all rows except the first (header) row.
        var allRows = table.querySelectorAll("tr");
        var fallback = [];
        for (var ari = 1; ari < allRows.length; ari += 1) fallback.push(allRows[ari]);
        bodyRows = fallback;
      }

      var rowCount = bodyRows.length;
      var sampleRows = [];
      for (var bri = 0; bri < bodyRows.length && sampleRows.length < 5; bri += 1) {
        var cells = bodyRows[bri].querySelectorAll("td, th");
        var rowVals = [];
        for (var cci = 0; cci < cells.length; cci += 1) {
          rowVals.push(txt(cells[cci]));
        }
        if (rowVals.length > 0) sampleRows.push(rowVals);
      }

      var columnCount = headers.length;
      if (columnCount === 0 && sampleRows.length > 0) {
        columnCount = sampleRows[0].length;
      }

      tables.push({
        caption: caption,
        headers: headers,
        sampleRows: sampleRows,
        rowCount: rowCount,
        columnCount: columnCount,
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Cards / KPIs / widgets.
  // ---------------------------------------------------------------------
  var cards = [];
  try {
    var cardNodes = document.querySelectorAll(
      "[class*=card], [class*=widget], [class*=kpi], [class*=stat], [class*=tile], [class*=metric]"
    );
    var seenCards = [];
    for (var cdi = 0; cdi < cardNodes.length && cards.length < 120; cdi += 1) {
      var card = cardNodes[cdi];
      if (seenCards.indexOf(card) !== -1) continue;
      seenCards.push(card);

      // Skip cards nested inside an already-recorded card to limit noise.
      var nestedInRecorded = false;
      for (var sci = 0; sci < seenCards.length - 1; sci += 1) {
        if (seenCards[sci].contains && seenCards[sci].contains(card)) {
          nestedInRecorded = true;
          break;
        }
      }
      if (nestedInRecorded) continue;

      var cardTitleEl = card.querySelector(
        "[class*=title], [class*=label], [class*=heading], h1, h2, h3, h4, h5, h6"
      );
      var cardValueEl = card.querySelector(
        "[class*=value], [class*=number], [class*=count], [class*=amount], [class*=metric-value]"
      );
      var cardTitle = cardTitleEl ? txt(cardTitleEl) : "";
      var cardValue = cardValueEl ? txt(cardValueEl) : "";
      var cardText = txt(card);
      if (!cardTitle && !cardValue && !cardText) continue;
      cards.push({
        title: cardTitle,
        value: cardValue,
        text: cardText.length > 400 ? cardText.slice(0, 400) : cardText,
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Badges / status chips / tags.
  // ---------------------------------------------------------------------
  var badges = [];
  try {
    var badgeNodes = document.querySelectorAll(
      "[class*=badge], [class*=status], [class*=tag], [class*=chip]"
    );
    for (var bgi = 0; bgi < badgeNodes.length && badges.length < 200; bgi += 1) {
      var bText = txt(badgeNodes[bgi]);
      if (bText && bText.length <= 80 && badges.indexOf(bText) === -1) {
        badges.push(bText);
      }
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Filters: select, [class*=filter], [role=combobox], search/date inputs.
  // ---------------------------------------------------------------------
  var filters = [];
  try {
    var filterNodes = document.querySelectorAll(
      "select, [class*=filter], [role=combobox], input[type=search], input[type=date]"
    );
    var seenFilters = [];
    for (var fli = 0; fli < filterNodes.length && filters.length < 120; fli += 1) {
      var fl = filterNodes[fli];
      if (seenFilters.indexOf(fl) !== -1) continue;
      seenFilters.push(fl);
      var flTag = lowerTag(fl);
      var flType = (fl.type || attr(fl, "type") || "").toLowerCase();
      var flLabel = attr(fl, "aria-label") || attr(fl, "placeholder") || attr(fl, "title") || "";
      if (!flLabel) {
        var flId = attr(fl, "id");
        if (flId) {
          try {
            var flLbl = document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(flId) : flId) + '"]');
            if (flLbl) flLabel = txt(flLbl);
          } catch (e) {
            /* ignore */
          }
        }
      }
      var ftype = flTag === "select" ? "select" : (flType || (flTag === "input" ? "text" : flTag));
      filters.push({
        type: ftype,
        label: flLabel,
        name: attr(fl, "name"),
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Tabs: [role=tab], [class*=tab] (but not table-related).
  // ---------------------------------------------------------------------
  var tabs = [];
  try {
    var tabNodes = document.querySelectorAll('[role=tab], [class*=tab]:not([class*=table])');
    var seenTabs = [];
    for (var tabi = 0; tabi < tabNodes.length && tabs.length < 80; tabi += 1) {
      var tab = tabNodes[tabi];
      if (seenTabs.indexOf(tab) !== -1) continue;
      seenTabs.push(tab);
      var tabText = controlText(tab);
      if (!tabText) continue;
      var selected =
        attr(tab, "aria-selected") === "true" ||
        attr(tab, "aria-current") === "true" ||
        attr(tab, "aria-current") === "page" ||
        (typeof tab.className === "string" && /\b(active|selected|current)\b/i.test(tab.className));
      var tabHref = "";
      if (lowerTag(tab) === "a") {
        try {
          tabHref = tab.href || "";
        } catch (e) {
          tabHref = attr(tab, "href");
        }
      }
      tabs.push({ text: tabText, selected: !!selected, href: tabHref });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Dropdown triggers.
  // ---------------------------------------------------------------------
  var dropdownTriggers = [];
  try {
    var ddNodes = document.querySelectorAll(
      "[aria-haspopup], [data-toggle*=drop], [class*=dropdown-toggle], [class*=menu-trigger]"
    );
    var seenDd = [];
    for (var ddi = 0; ddi < ddNodes.length && dropdownTriggers.length < 100; ddi += 1) {
      var dd = ddNodes[ddi];
      if (seenDd.indexOf(dd) !== -1) continue;
      seenDd.push(dd);
      dropdownTriggers.push({
        text: controlText(dd),
        ariaLabel: attr(dd, "aria-label"),
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // domSummary: counts + topTags.
  // ---------------------------------------------------------------------
  var counts = {
    links: 0,
    buttons: 0,
    forms: 0,
    inputs: 0,
    selects: 0,
    tables: 0,
    images: 0,
    headings: 0,
  };
  var topTags = [];
  try {
    counts.links = document.querySelectorAll("a[href]").length;
    counts.buttons = document.querySelectorAll('button, [role=button], input[type=button], input[type=submit]').length;
    counts.forms = document.querySelectorAll("form").length;
    counts.inputs = document.querySelectorAll("input, textarea").length;
    counts.selects = document.querySelectorAll("select").length;
    counts.tables = document.querySelectorAll("table").length;
    counts.images = document.querySelectorAll("img").length;
    counts.headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6").length;

    var tagCounts = {};
    var all = document.getElementsByTagName("*");
    var limit = all.length;
    for (var tai = 0; tai < limit; tai += 1) {
      var tg = all[tai].tagName ? all[tai].tagName.toLowerCase() : "";
      if (!tg) continue;
      tagCounts[tg] = (tagCounts[tg] || 0) + 1;
    }
    var tagList = [];
    for (var key in tagCounts) {
      if (Object.prototype.hasOwnProperty.call(tagCounts, key)) {
        tagList.push({ tag: key, count: tagCounts[key] });
      }
    }
    tagList.sort(function (a, b) {
      return b.count - a.count;
    });
    topTags = tagList.slice(0, 20);
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Modal / dialog / offcanvas DEFINITIONS.
  // Bootstrap modals are pre-rendered (usually hidden) in the DOM, so we can
  // document every dialog's structure statically — title, fields, buttons —
  // WITHOUT clicking anything. NEVER read input values (no password capture).
  // ---------------------------------------------------------------------
  var modals = [];
  try {
    var modalNodes = document.querySelectorAll(
      ".modal, [role=dialog], [aria-modal=true], .offcanvas, [class*=offcanvas]"
    );
    var seenModals = [];
    for (var mdi = 0; mdi < modalNodes.length && modals.length < 50; mdi += 1) {
      var md = modalNodes[mdi];
      if (seenModals.indexOf(md) !== -1) continue;
      // Skip a modal nested inside an already-recorded one.
      var nestedM = false;
      for (var nmi = 0; nmi < seenModals.length; nmi += 1) {
        if (seenModals[nmi].contains && seenModals[nmi].contains(md)) {
          nestedM = true;
          break;
        }
      }
      seenModals.push(md);
      if (nestedM) continue;

      var mTitleEl = md.querySelector(
        ".modal-title, .offcanvas-title, [class*=modal-title], [class*=offcanvas-title], h1, h2, h3, h4, h5"
      );
      var mTitle = mTitleEl ? txt(mTitleEl) : "";

      var mFields = [];
      var mCtrls = md.querySelectorAll("input, select, textarea");
      for (var mci = 0; mci < mCtrls.length && mFields.length < 40; mci += 1) {
        var mc = mCtrls[mci];
        var mcType = (mc.type || attr(mc, "type") || "").toLowerCase();
        if (mcType === "hidden" || mcType === "submit" || mcType === "button" || mcType === "reset") continue;
        var mLabel = "";
        var mcId = attr(mc, "id");
        if (mcId) {
          try {
            var mlbl = document.querySelector('label[for="' + (window.CSS && CSS.escape ? CSS.escape(mcId) : mcId) + '"]');
            if (mlbl) mLabel = txt(mlbl);
          } catch (e) {
            /* ignore */
          }
        }
        if (!mLabel) {
          var mpl = mc.closest ? mc.closest("label") : null;
          if (mpl) mLabel = txt(mpl);
        }
        if (!mLabel) mLabel = attr(mc, "aria-label") || attr(mc, "placeholder");
        mFields.push({
          tag: lowerTag(mc),
          type: mcType,
          name: attr(mc, "name"),
          label: mLabel,
          required: !!(mc.required || attr(mc, "required") || attr(mc, "aria-required") === "true"),
          // NOTE: deliberately NO value field — never capture user/password input.
        });
      }

      var mButtons = [];
      var mBtnNodes = md.querySelectorAll("button, [role=button], a[class*=btn], input[type=submit]");
      for (var mbi = 0; mbi < mBtnNodes.length && mButtons.length < 20; mbi += 1) {
        var mbt = controlText(mBtnNodes[mbi]);
        if (mbt && mButtons.indexOf(mbt) === -1) mButtons.push(mbt);
      }

      var mKind = /offcanvas/i.test(md.className || "") ? "offcanvas" : "modal";
      modals.push({
        id: attr(md, "id"),
        kind: mKind,
        title: mTitle,
        triggerText: "",
        fields: mFields,
        buttons: mButtons,
        text: txt(md).slice(0, 400),
        screenshot: "",
        source: "static",
      });
    }
  } catch (e) {
    /* ignore */
  }

  // ---------------------------------------------------------------------
  // Visible text (full body innerText; caller writes it to a file).
  // ---------------------------------------------------------------------
  var visibleText = "";
  try {
    visibleText = document.body ? (document.body.innerText || "") : "";
  } catch (e) {
    visibleText = "";
  }

  // Active sidebar item — a strong, page-specific module signal. Scoped to the
  // sidebar nav so we capture the ONE highlighted current item, not the whole
  // menu (concatenating every nav label made every page match every module).
  var sidebarActiveText = "";
  try {
    var navRoot = document.querySelector(
      "aside, [class*=sidebar], [class*=side-menu], [class*=side-nav], nav[class*=side]"
    );
    if (navRoot) {
      var actEl =
        navRoot.querySelector("[aria-current]") ||
        navRoot.querySelector("li.active > a, a.active, .active > a") ||
        navRoot.querySelector(".active, [class*=active], [class*=current], [class*=selected]");
      if (actEl) sidebarActiveText = (actEl.textContent || "").replace(/\s+/g, " ").trim().slice(0, 120);
    }
  } catch (eSide) {
    /* ignore */
  }

  return {
    lang: lang,
    dir: dir,
    title: title,
    sidebarActiveText: sidebarActiveText,
    headings: headings,
    breadcrumbs: breadcrumbs,
    links: links,
    buttons: buttons,
    forms: forms,
    labels: labels,
    tables: tables,
    cards: cards,
    badges: badges,
    filters: filters,
    tabs: tabs,
    dropdownTriggers: dropdownTriggers,
    modals: modals,
    domSummary: { counts: counts, topTags: topTags },
    visibleText: visibleText,
  };
}

// ---------------------------------------------------------------------------
// Node-side helpers.
// ---------------------------------------------------------------------------

// Tokens that mark a link as pagination by its (normalized) text.
const PAGINATION_TEXT = new Set([
  "next",
  "prev",
  "previous",
  "first",
  "last",
  "التالي",
  "السابق",
  "الاول",
  "الأول",
  "الاخير",
  "الأخير",
  "»",
  "«",
  "›",
  "‹",
]);

/**
 * Decide whether a link is a pagination link, based on container membership
 * (computed in-page) or its text being a page number / next / prev token.
 *
 * @param {Object} link
 * @returns {boolean}
 */
function isPaginationLink(link) {
  if (link && link.inPagination) return true;
  const raw = (link && link.text ? String(link.text) : "").trim();
  if (!raw) return false;
  // Pure number (page index).
  if (/^[0-9]{1,4}$/.test(raw)) return true;
  const lower = raw.toLowerCase();
  if (PAGINATION_TEXT.has(lower)) return true;
  // Arabic tokens are not lowercased; check original too.
  if (PAGINATION_TEXT.has(raw)) return true;
  return false;
}

/**
 * Detect whether a string is predominantly Arabic, to help compute isRTL when
 * dir/lang are absent.
 *
 * @param {string} text
 * @returns {boolean}
 */
function isMajorityArabic(text) {
  if (!text || typeof text !== "string") return false;
  const arabic = text.match(/[؀-ۿݐ-ݿࢠ-ࣿ]/g);
  const letters = text.match(/[A-Za-z؀-ۿݐ-ݿࢠ-ࣿ]/g);
  if (!letters || letters.length === 0) return false;
  const arabicCount = arabic ? arabic.length : 0;
  return arabicCount / letters.length > 0.5;
}

/**
 * extractStaticData
 *
 * Run the single in-page evaluate, then enrich on the Node side:
 *   - bucket links into sidebar/header/footer/internal/external/pagination
 *   - attach safety classification to each button
 *   - compute lang/dir/isRTL
 *
 * @param {import('playwright').Page} page
 * @param {{baseUrl:string}} opts
 * @returns {Promise<Object>} partial PageRecord
 */
async function extractStaticData(page, opts) {
  const baseUrl = (opts && opts.baseUrl) || "";

  // Defensive default in case page.evaluate fails entirely.
  let raw;
  try {
    raw = await page.evaluate(collectInPage);
  } catch (err) {
    raw = null;
  }
  if (!raw || typeof raw !== "object") {
    raw = {
      lang: "",
      dir: "",
      title: "",
      headings: [],
      breadcrumbs: [],
      links: [],
      buttons: [],
      forms: [],
      labels: [],
      tables: [],
      cards: [],
      badges: [],
      filters: [],
      tabs: [],
      dropdownTriggers: [],
      domSummary: { counts: {}, topTags: [] },
      visibleText: "",
    };
  }

  // ----- lang / dir / isRTL ------------------------------------------------
  const lang = typeof raw.lang === "string" ? raw.lang.trim() : "";
  const dir = typeof raw.dir === "string" ? raw.dir.trim().toLowerCase() : "";
  const isRTL =
    dir === "rtl" ||
    (lang && lang.toLowerCase().startsWith("ar")) ||
    isMajorityArabic(raw.visibleText || "") ||
    isMajorityArabic(raw.title || "");

  // ----- Link bucketing ----------------------------------------------------
  const sidebarLinks = [];
  const headerLinks = [];
  const footerLinks = [];
  const internalLinks = [];
  const externalLinks = [];
  const paginationLinks = [];
  const discoveredHrefs = [];
  const seenHref = new Set();

  const rawLinks = Array.isArray(raw.links) ? raw.links : [];
  for (const link of rawLinks) {
    if (!link || typeof link !== "object") continue;
    const href = typeof link.href === "string" ? link.href : "";
    const text = typeof link.text === "string" ? link.text : "";
    const region = link.region || "main";

    const target = urlUtils.classifyUrlTarget(href, baseUrl);
    const internal = target === "internal";

    // Region buckets (text + href + internal flag).
    const regionEntry = { text: text, href: href, internal: internal };
    if (region === "sidebar") sidebarLinks.push(regionEntry);
    else if (region === "header") headerLinks.push(regionEntry);
    else if (region === "footer") footerLinks.push(regionEntry);

    // Pagination bucket.
    if (isPaginationLink(link)) {
      paginationLinks.push({ text: text, href: href });
    }

    // Internal / external content buckets.
    if (internal) {
      internalLinks.push({ text: text, href: href, area: region });
      if (href && !seenHref.has(href)) {
        seenHref.add(href);
        discoveredHrefs.push(href);
      }
    } else if (target === "external") {
      externalLinks.push({ text: text, href: href });
    }
    // anchor / mailto_tel / javascript / unsupported_file are intentionally
    // not enqueued as crawl targets here (caller handles end-states).
  }

  // ----- Buttons + safety --------------------------------------------------
  const buttons = [];
  const rawButtons = Array.isArray(raw.buttons) ? raw.buttons : [];
  for (const b of rawButtons) {
    if (!b || typeof b !== "object") continue;
    const desc = {
      text: b.text || "",
      ariaLabel: b.ariaLabel || "",
      title: b.title || "",
      role: b.role || "",
      tagName: b.tagName || "",
      type: b.type || "",
      href: b.href || "",
      insideForm: b.insideForm === true,
      formMethod: b.formMethod || "",
    };
    let safetyResult;
    try {
      safetyResult = safety.classifyAction(desc);
    } catch (err) {
      safetyResult = {
        safe: false,
        reason: "Classification error: " + (err && err.message ? err.message : "unknown"),
        category: "unknown",
      };
    }
    buttons.push({
      text: desc.text,
      ariaLabel: desc.ariaLabel,
      title: desc.title,
      tagName: desc.tagName,
      type: desc.type,
      role: desc.role,
      href: desc.href,
      safety: {
        safe: safetyResult.safe,
        reason: safetyResult.reason,
        category: safetyResult.category,
      },
    });
  }

  // ----- Assemble partial PageRecord --------------------------------------
  return {
    title: raw.title || "",
    sidebarActiveText: typeof raw.sidebarActiveText === "string" ? raw.sidebarActiveText : "",
    lang: lang,
    dir: dir,
    isRTL: !!isRTL,
    headings: Array.isArray(raw.headings) ? raw.headings : [],
    breadcrumbs: Array.isArray(raw.breadcrumbs) ? raw.breadcrumbs : [],
    sidebarLinks: sidebarLinks,
    headerLinks: headerLinks,
    footerLinks: footerLinks,
    internalLinks: internalLinks,
    externalLinks: externalLinks,
    paginationLinks: paginationLinks,
    buttons: buttons,
    forms: Array.isArray(raw.forms) ? raw.forms : [],
    labels: Array.isArray(raw.labels) ? raw.labels : [],
    tables: Array.isArray(raw.tables) ? raw.tables : [],
    cards: Array.isArray(raw.cards) ? raw.cards : [],
    badges: Array.isArray(raw.badges) ? raw.badges : [],
    filters: Array.isArray(raw.filters) ? raw.filters : [],
    tabs: Array.isArray(raw.tabs) ? raw.tabs : [],
    dropdownTriggers: Array.isArray(raw.dropdownTriggers) ? raw.dropdownTriggers : [],
    modals: Array.isArray(raw.modals) ? raw.modals : [],
    visibleText: typeof raw.visibleText === "string" ? raw.visibleText : "",
    domSummary:
      raw.domSummary && typeof raw.domSummary === "object"
        ? {
            counts:
              raw.domSummary.counts && typeof raw.domSummary.counts === "object"
                ? raw.domSummary.counts
                : {},
            topTags: Array.isArray(raw.domSummary.topTags) ? raw.domSummary.topTags : [],
          }
        : { counts: {}, topTags: [] },
    discoveredHrefs: discoveredHrefs,
  };
}

module.exports = { extractStaticData };
