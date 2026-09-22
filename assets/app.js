/* smshovan.com · interactions
   1. living graph in the hero   2. scroll effects   3. publication database */
(function () {
  "use strict";
  var doc = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ================= theme ================= */
  function currentTheme() {
    var t = doc.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  $("#theme").addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    doc.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    readColors();
  });

  /* ================= nav ================= */
  var nav = $("#nav"), menuBtn = $("#menu-btn"), lastY = 0, bar = $("#progress");
  menuBtn.addEventListener("click", function () {
    var o = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", o ? "true" : "false");
  });
  $$("#menu a").forEach(function (a) { a.addEventListener("click", function () { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); }); });

  /* ================= split words ================= */
  var wi = 0;
  function splitNode(node) {
    $$("*", node).length; // noop to keep linter quiet
    Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
      if (ch.nodeType === 3) {
        var parts = ch.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
        parts.forEach(function (p) {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
          var w = document.createElement("span"); w.className = "w";
          var inner = document.createElement("span"); inner.textContent = p; inner.style.setProperty("--i", wi++);
          w.appendChild(inner); frag.appendChild(w);
        });
        ch.parentNode.replaceChild(frag, ch);
      } else if (ch.nodeType === 1) splitNode(ch);
    });
  }
  $$(".split").forEach(function (el) { wi = 0; splitNode(el); });

  /* ================= reveal on view ================= */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -10% 0px" }) : null;
  $$(".split,.fade").forEach(function (el) { io ? io.observe(el) : el.classList.add("in"); });

  // run SVG animations only when visible
  if ("IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("run", e.isIntersecting); }); });
    $$(".viz").forEach(function (v) { vio.observe(v); });
  } else $$(".viz").forEach(function (v) { v.classList.add("run"); });

  // section spy
  var links = $$('#menu a[href^="#"]');
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id); }); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var t = $(l.getAttribute("href")); if (t) spy.observe(t); });
  }

  /* ================= count up ================= */
  function countUp(el) {
    var to = +el.getAttribute("data-count"), pre = el.getAttribute("data-prefix") || "", suf = el.getAttribute("data-suffix") || "";
    if (reduce) { el.textContent = pre + to + suf; return; }
    var t0 = null, dur = 1600;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = pre + Math.round(to * e) + suf;
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = $("#numbers");
  if (nums && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { $$("[data-count]", nums).forEach(countUp); cio.disconnect(); }
    }, { threshold: .4 });
    cio.observe(nums);
  } else if (nums) $$("[data-count]", nums).forEach(countUp);

  /* ================= scroll-linked effects ================= */
  var scrub = $("#scrub"), words = [];
  if (scrub) {
    (function wrap(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          var frag = document.createDocumentFragment(), sig = ch.parentNode.tagName === "EM";
          ch.textContent.split(/(\s+)/).forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(" ")); return; }
            var s = document.createElement("span"); s.className = "sw" + (sig ? " sig" : ""); s.textContent = p; frag.appendChild(s); words.push(s);
          });
          ch.parentNode.replaceChild(frag, ch);
        } else if (ch.nodeType === 1) wrap(ch);
      });
    })(scrub);
    // unwrap <em> so sig words keep their own styling
    $$("em", scrub).forEach(function (em) { while (em.firstChild) em.parentNode.insertBefore(em.firstChild, em); em.remove(); });
  }
  var exp = $("#exp"), jobs = $$(".job"), rail = exp && $(".rail", exp);
  var ticking = false;
  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    // nav
    nav.classList.toggle("solid", y > 40);
    if (!nav.classList.contains("open")) nav.classList.toggle("hide", y > 200 && y > lastY + 4);
    if (y < lastY - 4) nav.classList.remove("hide");
    lastY = y;
    // progress
    var max = doc.scrollHeight - vh; bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    // scrub text
    if (scrub && words.length) {
      var r = scrub.getBoundingClientRect();
      var p = reduce ? 1 : Math.min(1, Math.max(0, (vh * .85 - r.top) / (r.height + vh * .35)));
      var on = Math.round(p * words.length);
      for (var i = 0; i < words.length; i++) words[i].classList.toggle("on", i < on);
    }
    // experience rail
    if (exp) {
      var er = exp.getBoundingClientRect();
      var ep = Math.min(1, Math.max(0, (vh * .6 - er.top) / er.height));
      rail.style.setProperty("--p", ep);
      var line = er.top + ep * er.height;
      jobs.forEach(function (j) { j.classList.toggle("lit", j.getBoundingClientRect().top + 44 <= line + 1); });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ================= living graph ================= */
  var cv = $("#graph"), ctx = cv.getContext("2d");
  var W = 0, H = 0, DPR = 1, nodes = [], adj = [], edges = [], fx = [], batch = 0, running = true;
  var mouse = { x: -1e4, y: -1e4 }, colors = {};
  function readColors() {
    var cs = getComputedStyle(doc);
    colors.ink = cs.getPropertyValue("--node").trim() || "#16150f";
    colors.sig = cs.getPropertyValue("--signal").trim() || "#ff4f1f";
  }
  readColors();
  if (window.matchMedia) window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", readColors);

  function key(a, b) { return a < b ? a + "-" + b : b + "-" + a; }
  var edgeSet = {};
  function addEdge(a, b, born) {
    var k = key(a, b); if (edgeSet[k] || a === b) return false;
    var e = { a: a, b: b, born: born || 0, dying: 0 }; edgeSet[k] = e; edges.push(e);
    adj[a].push(b); adj[b].push(a); return e;
  }
  function removeEdge(e, t) {
    e.dying = t; delete edgeSet[key(e.a, e.b)];
    adj[e.a] = adj[e.a].filter(function (x) { return x !== e.b; });
    adj[e.b] = adj[e.b].filter(function (x) { return x !== e.a; });
  }

  function build() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = Math.round(Math.max(34, Math.min(110, W * H / 15000)));
    var minD = Math.sqrt(W * H / n) * .55;
    nodes = []; adj = []; edges = []; edgeSet = {}; fx = [];
    var tries = 0;
    while (nodes.length < n && tries < n * 60) {
      tries++;
      var x = 20 + Math.random() * (W - 40), y = 70 + Math.random() * (H - 90);
      var ok = true;
      for (var i = 0; i < nodes.length; i++) { var dx = nodes[i].x - x, dy = nodes[i].y - y; if (dx * dx + dy * dy < minD * minD) { ok = false; break; } }
      if (!ok) continue;
      nodes.push({ x: x, y: y, bx: x, by: y, ph: Math.random() * 6.28, sp: .2 + Math.random() * .3, r: 1.6 + Math.random() * 1.6, hit: -1e9, depth: 0, ox: 0, oy: 0 });
      adj.push([]);
    }
    nodes.forEach(function (a, i) {
      var d = nodes.map(function (b, j) { return { j: j, d: (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y) }; }).sort(function (p, q) { return p.d - q.d; });
      var k = 2 + (Math.random() < .35 ? 1 : 0);
      for (var m = 1; m <= k && m < d.length; m++) addEdge(i, d[m].j, -1e9);
    });
  }

  function nearest(x, y, skip) {
    var best = -1, bd = 1e18;
    for (var i = 0; i < nodes.length; i++) { if (skip && skip.indexOf(i) >= 0) continue; var dx = nodes[i].x - x, dy = nodes[i].y - y, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; } }
    return best;
  }

  function touch(seeds, t) {
    // BFS up to depth 2 from the endpoints of the change
    var seen = {}, q = [], count = 0;
    seeds.forEach(function (s) { seen[s] = 0; q.push(s); });
    while (q.length) {
      var u = q.shift(), d = seen[u];
      nodes[u].hit = t + d * 170; nodes[u].depth = d; count++;
      if (d < 2) adj[u].forEach(function (v) { if (seen[v] === undefined) { seen[v] = d + 1; q.push(v); } });
    }
    return count;
  }

  function pad(n) { return ("00" + n).slice(-3); }
  function report(change, touched) {
    $("#tk-batch").textContent = "batch " + pad(batch % 1000);
    $("#tk-change").textContent = change;
    $("#tk-touch").textContent = touched + " of " + nodes.length + " vertices touched";
  }

  function update(t, forced) {
    batch++;
    var u, v, e, touched, change;
    if (forced) { u = forced[0]; v = forced[1]; }
    else u = Math.floor(Math.random() * nodes.length);
    var existing = forced ? edgeSet[key(u, v)] : null;
    var del = !forced && adj[u].length > 2 && Math.random() < .45;
    if (del || existing) {
      if (!existing) { v = adj[u][Math.floor(Math.random() * adj[u].length)]; existing = edgeSet[key(u, v)]; }
      removeEdge(existing, t); change = "1 edge deleted";
    } else {
      if (!forced) {
        var cand = nodes.map(function (b, j) { return { j: j, d: (nodes[u].x - b.x) * (nodes[u].x - b.x) + (nodes[u].y - b.y) * (nodes[u].y - b.y) }; })
          .sort(function (p, q) { return p.d - q.d; }).slice(1, 7).filter(function (c) { return !edgeSet[key(u, c.j)]; });
        if (!cand.length) return;
        v = cand[Math.floor(Math.random() * cand.length)].j;
      }
      e = addEdge(u, v, t); change = "1 edge inserted";
    }
    touched = touch([u, v], t);
    report(change, touched);
  }

  var last = 0, nextAt = 900, visible = true;
  function frame(t) {
    if (!running) return;
    requestAnimationFrame(frame);
    if (!visible) return;
    if (t > nextAt) { update(t); nextAt = t + (reduce ? 3200 : 1500 + Math.random() * 900); }
    ctx.clearRect(0, 0, W, H);
    var i, n;
    // positions
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      var dxm = n.bx - mouse.x, dym = n.by - mouse.y, dm = Math.sqrt(dxm * dxm + dym * dym), push = 0;
      if (dm < 130) push = (1 - dm / 130) * 26;
      var tx = reduce ? 0 : Math.sin(t * .0004 * n.sp + n.ph) * 7 + (dm ? dxm / dm * push : 0);
      var ty = reduce ? 0 : Math.cos(t * .00035 * n.sp + n.ph * 1.3) * 7 + (dm ? dym / dm * push : 0);
      n.ox += (tx - n.ox) * .08; n.oy += (ty - n.oy) * .08;
      n.x = n.bx + n.ox; n.y = n.by + n.oy;
    }
    function fade(y) { return Math.max(.18, Math.min(1, 1.35 - (y / H) * 1.25)); }
    // edges
    ctx.lineWidth = 1;
    for (i = edges.length - 1; i >= 0; i--) {
      var e = edges[i], a = nodes[e.a], b = nodes[e.b], age = t - e.born;
      var al = fade((a.y + b.y) / 2);
      if (e.dying) {
        var dk = (t - e.dying) / 900;
        if (dk >= 1) { edges.splice(i, 1); continue; }
        ctx.strokeStyle = colors.sig; ctx.globalAlpha = (1 - dk) * .9 * al;
        ctx.setLineDash([4, 5]);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); ctx.setLineDash([]);
        continue;
      }
      if (age < 1800) {
        var g = Math.min(1, age / 450), ge = 1 - Math.pow(1 - g, 3);
        ctx.strokeStyle = colors.sig; ctx.globalAlpha = al * (age < 1000 ? .95 : .95 * (1 - (age - 1000) / 800)) ;
        ctx.lineWidth = 1.6;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(a.x + (b.x - a.x) * ge, a.y + (b.y - a.y) * ge); ctx.stroke();
        ctx.lineWidth = 1;
      }
      ctx.strokeStyle = colors.ink; ctx.globalAlpha = .16 * al * Math.min(1, age / 1200);
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    // nodes
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      var al2 = fade(n.y), h = t - n.hit, lit = h >= 0 && h < 1700;
      if (lit) {
        var k = h / 1700, pulse = 1 - k;
        ctx.globalAlpha = al2 * pulse * .35; ctx.fillStyle = colors.sig;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 4 + k * 16 * (n.depth === 0 ? 1.4 : 1), 0, 6.283); ctx.fill();
        ctx.globalAlpha = Math.max(al2, .6); ctx.fillStyle = colors.sig;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (n.depth === 0 ? 2.4 : 1.2) * pulse + .4, 0, 6.283); ctx.fill();
      } else {
        ctx.globalAlpha = .75 * al2; ctx.fillStyle = colors.ink;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, 6.283); ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  build();
  var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(function () { if (Math.abs(cv.clientWidth - W) > 40 || Math.abs(cv.clientHeight - H) > 120) build(); }, 200); });
  cv.addEventListener("pointermove", function (ev) { var r = cv.getBoundingClientRect(); mouse.x = ev.clientX - r.left; mouse.y = ev.clientY - r.top; });
  cv.addEventListener("pointerleave", function () { mouse.x = mouse.y = -1e4; });
  cv.addEventListener("click", function (ev) {
    var r = cv.getBoundingClientRect(), x = ev.clientX - r.left, y = ev.clientY - r.top;
    var a = nearest(x, y), b = nearest(x, y, [a]);
    update(performance.now(), [a, b]); nextAt = performance.now() + 1800;
  });
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(cv);
  document.addEventListener("visibilitychange", function () { visible = !document.hidden; });
  requestAnimationFrame(frame);

  /* ================= publications ================= */
  function parseBib(src) {
    var out = [], i = 0, n = src.length;
    while (i < n) {
      var at = src.indexOf("@", i); if (at < 0) break;
      var brace = src.indexOf("{", at); if (brace < 0) break;
      var type = src.slice(at + 1, brace).trim().toLowerCase(), depth = 1, j = brace + 1;
      while (j < n && depth > 0) { if (src[j] === "{") depth++; else if (src[j] === "}") depth--; j++; }
      var body = src.slice(brace + 1, j - 1), comma = body.indexOf(",");
      var entry = { type: type, key: body.slice(0, comma).trim(), fields: {}, raw: src.slice(at, j) };
      var rest = body.slice(comma + 1), k = 0;
      while (k < rest.length) {
        var eq = rest.indexOf("=", k); if (eq < 0) break;
        var name = rest.slice(k, eq).replace(/[\s,]/g, "").toLowerCase(), m = eq + 1, val = "";
        while (/\s/.test(rest[m])) m++;
        if (rest[m] === "{") { var d = 1, s = m + 1; m++; while (m < rest.length && d > 0) { if (rest[m] === "{") d++; else if (rest[m] === "}") d--; m++; } val = rest.slice(s, m - 1); }
        else if (rest[m] === '"') { var e2 = rest.indexOf('"', m + 1); val = rest.slice(m + 1, e2); m = e2 + 1; }
        else { var e3 = rest.indexOf(",", m); if (e3 < 0) e3 = rest.length; val = rest.slice(m, e3).trim(); m = e3; }
        entry.fields[name] = val.replace(/\s+/g, " ").trim(); k = m;
      }
      out.push(entry); i = j;
    }
    return out;
  }
  function clean(s) { return (s || "").replace(/\\&/g, "&").replace(/[{}]/g, "").replace(/--/g, "–").trim(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function authors(str) {
    return clean(str).split(/\s+and\s+/).map(function (a) {
      var p = a.split(","), nm = p.length > 1 ? p[1].trim() + " " + p[0].trim() : a.trim();
      return /shovan/i.test(nm) ? '<span class="me">' + esc(nm) + "</span>" : esc(nm);
    }).join(", ");
  }
  var VENUES = [[/Knowledge and Data Engineering/i, "TKDE"], [/Parallel and Distributed Systems/i, "TPDS"], [/International Conference on Supercomputing/i, "ICS"],
    [/Parallel and Distributed Processing Symposium/i, "IPDPS"], [/IA3|SC26/i, "SC26 · IA³"], [/SC'23/i, "SC'23"], [/Distributed Computing and Networking/i, "ICDCN"],
    [/Mobility, Sensing and Networking/i, "MSN"], [/Scientific Reports/i, "Sci. Rep."], [/Molecular omics/i, "Mol. Omics"], [/Cognitive Computation/i, "Cogn. Comput."],
    [/^Genes$/i, "Genes"], [/Informatics in Medicine/i, "IMU"], [/ICCIT/i, "ICCIT"], [/TENSYMP/i, "TENSYMP"], [/ICECTE/i, "ICECTE"], [/\(ECCE\)/i, "ECCE"],
    [/ICICT4SD/i, "ICICT4SD"], [/IJCACI/i, "IJCACI"], [/computing advancements/i, "ICCA"]];
  var FLAGSHIP = /TKDE|TPDS|ICS|IPDPS|SC/;
  function classify(e) {
    var f = e.fields, venue = clean(f.journal || f.booktitle || (e.type === "phdthesis" ? "PhD dissertation, " + clean(f.school) : "")), kind, short = "";
    if (e.type === "phdthesis") kind = "Thesis";
    else if (/workshop/i.test(venue)) kind = "Workshop";
    else if (e.type === "article" && f.journal) kind = "Journal";
    else if (e.type === "inproceedings") kind = "Conference";
    else kind = "Manuscript";
    for (var i = 0; i < VENUES.length; i++) if (VENUES[i][0].test(venue)) { short = VENUES[i][1]; break; }
    var extra = [];
    if (f.volume) extra.push("vol. " + f.volume + (f.number ? "(" + f.number + ")" : ""));
    if (f.pages) extra.push("pp. " + clean(f.pages));
    return { venue: venue, kind: kind, short: short, extra: extra.join(", ") };
  }
  var CUSTOM = /^\s*(topic|selected|code|url|eprint|archiveprefix)\s*=.*$/gim;
  function bibtexFor(e) { return e.raw.replace(CUSTOM, "").replace(/\n\s*\n/g, "\n").replace(/,\s*\n\}/, "\n}"); }

  var entries = parseBib(window.PUBLICATIONS_BIB || "").map(function (e) {
    var c = classify(e), f = e.fields;
    return { e: e, key: e.key, title: clean(f.title), authorsHtml: authors(f.author), authorsText: clean(f.author), year: parseInt(f.year, 10) || 0,
      topic: (f.topic || "other").toLowerCase(), selected: /true/i.test(f.selected || ""), url: f.url || (f.eprint ? "https://arxiv.org/abs/" + f.eprint : ""),
      code: f.code || "", note: clean(f.note), venue: c.venue, kind: c.kind, short: c.short, extra: c.extra };
  });
  var rank = { Journal: 0, Conference: 1, Workshop: 2, Thesis: 3, Manuscript: 4 };
  entries.sort(function (a, b) { return b.year - a.year || rank[a.kind] - rank[b.kind] || a.title.localeCompare(b.title); });
  var papers = entries.filter(function (x) { return x.kind !== "Thesis"; });
  if (papers.length) $("#n-pubs").setAttribute("data-count", papers.length);
  var ne = $("#n-early"); if (ne) ne.textContent = papers.filter(function (x) { return x.topic !== "hpc"; }).length;

  var state = { view: "selected", topic: "all", type: "all", q: "" };
  var list = $("#pub-list"), countEl = $("#pub-count");
  function match(x) {
    if (state.view === "selected" && !x.selected) return false;
    if (state.topic !== "all" && x.topic !== state.topic) return false;
    if (state.type !== "all" && x.kind !== state.type) return false;
    if (state.q) {
      var hay = (x.title + " " + x.authorsText + " " + x.venue + " " + x.short + " " + x.year).toLowerCase();
      return state.q.toLowerCase().split(/\s+/).every(function (w) { return !w || hay.indexOf(w) >= 0; });
    }
    return true;
  }
  function item(x, i) {
    var tag = x.short ? '<span class="venue-tag' + (FLAGSHIP.test(x.short) ? "" : " soft") + '">' + esc(x.short) + "</span>" : "";
    var kind = '<span class="kind">' + esc(x.kind) + (x.note ? ' · <span class="acc">' + esc(x.note) + "</span>" : "") + "</span>";
    var acts = "";
    if (x.url) acts += '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">Paper</a>';
    if (x.code) acts += '<a href="' + esc(x.code) + '" target="_blank" rel="noopener">Code</a>';
    acts += '<button type="button" data-bib="' + esc(x.key) + '" aria-expanded="false">BibTeX</button>';
    var venue = x.venue ? '<p class="p-venue">' + esc(x.venue) + (x.extra ? ", " + esc(x.extra) : "") + "</p>" : "";
    return '<li class="p fade in" style="--d:' + Math.min(i, 8) * 40 + 'ms"><div><h4 class="p-title">' + esc(x.title) + '</h4><p class="p-auth">' + x.authorsHtml + "</p>" + venue +
      '</div><div class="p-side">' + tag + kind + '<div class="acts">' + acts + "</div></div></li>";
  }
  function render() {
    var shown = entries.filter(match);
    countEl.textContent = shown.length + " of " + entries.length + " shown";
    if (!shown.length) { list.innerHTML = '<p class="empty">Nothing matches. Try another filter.</p>'; return; }
    var html = "", yr = null, idx = 0;
    shown.forEach(function (x) {
      if (x.year !== yr) { if (yr !== null) html += "</ol></div>"; yr = x.year; html += '<div class="year-block"><h3>' + (yr || "n.d.") + '</h3><ol class="plist">'; }
      html += item(x, idx++);
    });
    list.innerHTML = html + "</ol></div>";
    if (!reduce) $$(".p", list).forEach(function (p) { p.classList.remove("in"); void p.offsetWidth; requestAnimationFrame(function () { p.classList.add("in"); }); });
  }
  list.addEventListener("click", function (ev) {
    var b = ev.target.closest("button[data-bib]"); if (!b) return;
    var li = b.closest(".p"), pre = $("pre.bib", li);
    if (pre) { pre.remove(); b.textContent = "BibTeX"; b.setAttribute("aria-expanded", "false"); return; }
    var x = entries.filter(function (y) { return y.key === b.getAttribute("data-bib"); })[0], text = bibtexFor(x.e);
    pre = document.createElement("pre"); pre.className = "bib"; pre.textContent = text; li.appendChild(pre);
    b.setAttribute("aria-expanded", "true"); b.textContent = "Hide";
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { b.textContent = "Copied"; }, function () {});
  });
  function setGroup(g, v) {
    state[g] = v;
    $$('[data-group="' + g + '"] .tab').forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-v") === v ? "true" : "false"); });
  }
  $$(".tabs").forEach(function (grp) {
    var g = grp.getAttribute("data-group");
    $$(".tab", grp).forEach(function (b) {
      b.addEventListener("click", function () {
        setGroup(g, b.getAttribute("data-v"));
        if (g !== "view" && b.getAttribute("data-v") !== "all") setGroup("view", "all");
        render();
      });
    });
  });
  var qt, qi = $("#pub-q");
  qi.addEventListener("input", function () { clearTimeout(qt); qt = setTimeout(function () { state.q = qi.value.trim(); if (state.q) setGroup("view", "all"); render(); }, 140); });
  render();
  $("#yr").textContent = new Date().getFullYear();
})();
