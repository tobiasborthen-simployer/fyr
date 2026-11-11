/* Fyr deal room (D-036), prototype.
   Opened as  deal-room/?room=<id>&r=<token>  it shows that rep's saved room to that person.
   ?edit=1 is the preview inside Fyr's editor: restore only, no notice, no tracking.
   Without ?room it is the plain example page with its template toggle.
   Prototype: rooms and events live in this browser's localStorage, shared with Fyr.
   In the app they are DealRoom, RoomPerson and RoomEvent records on the server (SPEC 4.12). */
(function () {
  'use strict';
  var ROOMS = 'fyr-v03-rooms', EVS = 'fyr-v03-room-events', CONSENT = 'fyr-v03-room-consent';
  var q = new URLSearchParams(location.search), id = q.get('room'), edit = q.get('edit') === '1', token = q.get('r');
  function read(k, d) { try { var v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? d : v; } catch (_) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} }
  function $(s) { return document.querySelector(s); }
  // Inside Fyr's editor the room hides its own menu: the studio's section strip is the one menu (D-038).
  // The room does this itself, so it holds even where Fyr can't reach into the frame. Preview shows it again, by message.
  if (edit) {
    var ed = document.createElement('style');
    ed.textContent = 'html:not(.fyr-preview) .nav,html:not(.fyr-preview) .navtoggle{display:none!important}html:not(.fyr-preview) .main{margin:0 auto}';
    document.head.appendChild(ed);
    window.addEventListener('message', function (e) { if (e.source === window.parent && e.data && e.data.fyr === 'preview') document.documentElement.classList.toggle('fyr-preview', !!e.data.on); });
  }
  // Condensed reading: a story's long text sits behind "Read the story", and the parts in both packages fold into one row
  // of the comparison table. Runs on the template and again after a saved room is restored, so rooms saved before this
  // change get it too. In Fyr's editor everything is open, so the rep can edit every word; Preview and the customer see it closed.
  function condense() {
    var m = $('.main'); if (!m) return;
    [].forEach.call(m.querySelectorAll('.story'), function (st) {
      if (st.querySelector('details.more')) return;
      var ps = [].filter.call(st.children, function (c) { return c.tagName === 'P' && !c.classList.contains('k') && !c.classList.contains('d4'); });
      if (!ps.length) return;
      var d = document.createElement('details'); d.className = 'more';
      d.innerHTML = '<summary contenteditable="false">Read the story</summary>';
      ps.forEach(function (p) { d.appendChild(p); });
      st.appendChild(d);
    });
    [].forEach.call(m.querySelectorAll('.cmp'), function (t) {
      if (t.querySelector('details.both')) return;
      var rows = [].slice.call(t.children), start = -1, run = [];
      for (var i = 0; i < rows.length; i++) {
        var r = rows[i], both = r.classList.contains('row') && !r.classList.contains('grp') && !r.classList.contains('hdr') && r.children.length === 3 && r.children[1].classList.contains('yes') && r.children[2].classList.contains('yes');
        if (both) { if (start < 0) start = i; run.push(r); } else if (run.length) break;
      }
      if (run.length < 3) return;
      var d = document.createElement('details'); d.className = 'both';
      d.innerHTML = '<summary class="row" contenteditable="false"><div>' + run.length + ' parts, in both packages <span class="tog"></span></div><div class="yes"></div><div class="yes"></div></summary>';
      t.insertBefore(d, run[0]);
      run.forEach(function (r) { d.appendChild(r); });
    });
    setOpen();
  }
  function setOpen() {
    var on = edit && !document.documentElement.classList.contains('fyr-preview');
    [].forEach.call(document.querySelectorAll('details.more, details.both'), function (d) { d.open = on; });
  }
  if (edit) new MutationObserver(setOpen).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  // Card grids balance their rows by the cards that are visible: 4 cards are 2 x 2, never 3 + 1; 9 are 3 x 3, never 4 + 4 + 1.
  // The most columns that fit (220 px each, 280 px for .two) sets the number of rows; the cards are then spread evenly over them.
  function balance() {
    [].forEach.call(document.querySelectorAll('.cards'), function (g) {
      var n = [].filter.call(g.children, function (c) { return c.style.display !== 'none' && getComputedStyle(c).display !== 'none'; }).length;
      var gap = parseFloat(getComputedStyle(g).columnGap) || 14, min = g.classList.contains('two') ? 280 : 220, w = g.clientWidth;
      if (!n || !w) return;
      var max = Math.max(1, Math.floor((w + gap) / (min + gap))), cols = Math.ceil(n / Math.ceil(n / max));
      var v = 'repeat(' + cols + ', minmax(0, 1fr))'; if (g.style.gridTemplateColumns !== v) g.style.gridTemplateColumns = v;
    });
  }
  var balTimer = 0; function balanceSoon() { clearTimeout(balTimer); balTimer = setTimeout(balance, 30); } // a timer, not requestAnimationFrame: frames don't run in a hidden tab or frame
  addEventListener('resize', balanceSoon);
  addEventListener('load', balanceSoon);
  new MutationObserver(function (ms) { if (ms.some(function (m) { return m.type === 'childList' || (m.target.parentElement && m.target.parentElement.classList.contains('cards')); })) balanceSoon(); })
    .observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class'] });
  balanceSoon();
  if (!id) { condense(); return; }

  var rooms = read(ROOMS, []), room = null;
  for (var i = 0; i < rooms.length; i++) if (rooms[i].id === id) room = rooms[i];

  var css = document.createElement('style');
  css.textContent = '.modes{display:none!important}' +
    '.fyr-gate{position:fixed;inset:0;z-index:90;background:rgba(31,27,46,.72);display:grid;place-items:center;padding:16px}' +
    '.fyr-box{background:#fff;border-radius:24px;padding:32px;max-width:460px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.35)}' +
    '.fyr-box h2{font-family:Fraunces,Georgia,serif;font-weight:400;font-size:28px;line-height:1.1;letter-spacing:-.015em;margin:0 0 10px;color:#1f1b2e}' +
    '.fyr-box p{margin:0 0 14px;color:#4a4458}' +
    '.fyr-box label{display:block;font-size:13px;font-weight:600;color:#1f1b2e;margin:12px 0 6px}' +
    '.fyr-box input[type=text],.fyr-box input[type=email]{width:100%;box-sizing:border-box;border:1px solid #ddd8cd;border-radius:12px;padding:12px 14px;font:inherit}' +
    '.fyr-box .tick{display:flex;gap:10px;align-items:flex-start;font-weight:400;color:#4a4458}' +
    '.fyr-box .err{color:#a8233f;font-size:13px;min-height:18px;margin:8px 0 0}' +
    '.fyr-box .row{display:flex;gap:8px;justify-content:flex-end;margin-top:18px}' +
    '.fyr-btn{height:48px;padding:0 22px;border-radius:12px;border:0;background:#2d0c69;color:#f6f2ff;font:600 15px "Hanken Grotesk",sans-serif;cursor:pointer}' +
    '.fyr-btn.line{background:transparent;color:#1f1b2e;box-shadow:inset 0 0 0 1px rgba(31,27,46,.24)}' +
    '.fyr-notice{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:80;width:min(640px,calc(100% - 32px));background:#1f1b2e;color:#cfc9da;border-radius:18px;padding:16px 18px;display:flex;gap:14px;align-items:center;box-shadow:0 20px 50px rgba(0,0,0,.3);font-size:14px;line-height:1.45}' +
    '.fyr-notice b{color:#f6f2ff}' +
    '.fyr-notice .fyr-btn{height:40px;padding:0 16px;font-size:14px;background:#f6f2ff;color:#2d0c69;flex:none}' +
    '.fyr-notice .fyr-btn.line{background:transparent;color:#cfc9da;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}' +
    '.fyr-signed{margin-top:22px;padding:16px 18px;border-radius:14px;background:rgba(246,242,255,.08);color:#f6f2ff;font-size:15px}' +
    '.fyr-player{background:rgba(23,20,31,.86)}' +
    '.fyr-vbox{position:relative;width:min(960px,100%)}' +
    '.fyr-vbox video{display:block;width:100%;max-height:80vh;border-radius:18px;background:#000;box-shadow:0 30px 80px rgba(0,0,0,.5)}' +
    '.fyr-x{position:absolute;top:-14px;right:-14px;width:40px;height:40px;border-radius:50%;border:0;background:#f6f2ff;color:#2d0c69;font:600 22px/1 "Hanken Grotesk",sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.3)}' +
    '@media(max-width:600px){.fyr-notice{flex-direction:column;align-items:stretch}.fyr-x{top:-52px;right:0}}';
  document.head.appendChild(css);

  function gate(html) { var g = document.createElement('div'); g.className = 'fyr-gate'; g.innerHTML = '<div class="fyr-box">' + html + '</div>'; document.body.appendChild(g); return g; }
  if (!room) { gate('<h2>This room isn\'t available</h2><p>The link may be old. Ask your contact at Simployer for a new one.</p>'); return; }

  /* 1. Restore the rep's saved room */
  if (room.html) {
    if (room.html.main && $('.main')) $('.main').innerHTML = room.html.main;
    if (room.html.navFor && $('.nav-for')) $('.nav-for').innerHTML = room.html.navFor;
    if (room.html.rep && $('.repcard')) $('.repcard').innerHTML = room.html.rep;
  }
  condense();
  (room.hidden || []).forEach(function (h) {
    var el = document.getElementById(h); if (el) el.style.display = 'none';
    var a = document.querySelector('.nav a[href="#' + h + '"]'); if (a) a.parentElement.style.display = 'none';
  });
  document.title = 'Simployer and ' + room.company;

  /* 1b. The welcome video (D-041). Prototype: Fyr's editor keeps the file in this browser's IndexedDB.
     In the app it is a Vercel Blob URL on the room. Without a video the card is hidden for the customer. */
  function vidGet(key, done) {
    try {
      var q = indexedDB.open('fyr-v03-media', 1);
      q.onupgradeneeded = function () { q.result.createObjectStore('videos'); };
      q.onsuccess = function () {
        var db = q.result, g;
        try { g = db.transaction('videos', 'readonly').objectStore('videos').get(key); } catch (_) { db.close(); return done(null); }
        g.onsuccess = function () { db.close(); done(g.result || null); };
        g.onerror = function () { db.close(); done(null); };
      };
      q.onerror = function () { done(null); };
    } catch (_) { done(null); }
  }
  function clock(s) { var t = Math.max(1, Math.round(s || 0)); return Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2); }
  function applyVideo() {
    var all = read(ROOMS, []), cur = room;
    for (var k = 0; k < all.length; k++) if (all[k].id === id) cur = all[k];
    var v = cur.video || null, card = $('.video'); room.video = v;
    if (!card) return;
    var meta = card.querySelector('b + span'), who = meta && meta.querySelector('.v');
    if (meta) {
      var txt = ' · ' + (v ? clock(v.secs) : edit ? 'no video yet' : '0:58'), last = meta.lastChild;
      if (last && last.nodeType === 3) last.nodeValue = txt; else meta.appendChild(document.createTextNode(txt));
    }
    card.setAttribute('aria-label', 'Play video message from ' + (who ? who.textContent : 'Simployer') + (v ? ', ' + clock(v.secs) : ''));
    card.style.display = v || edit || cur.example ? '' : 'none';
  }
  function playVideo() {
    if (!room.video) return;
    vidGet(room.video.key, function (blob) {
      if (!blob) {
        var g0 = gate('<h2>The video isn\'t in this browser</h2><p>In the prototype, a video stays in the browser it was uploaded in. Open the room there to watch it.</p><div class="row"><button class="fyr-btn" type="button" data-x>Close</button></div>');
        g0.querySelector('[data-x]').addEventListener('click', function () { g0.remove(); });
        return;
      }
      var u = URL.createObjectURL(blob), g = document.createElement('div');
      g.className = 'fyr-gate fyr-player';
      g.innerHTML = '<div class="fyr-vbox"><video controls autoplay playsinline></video><button class="fyr-x" type="button" aria-label="Close the video">×</button></div>';
      var vd = g.querySelector('video'); vd.src = u;
      function onKey(e) { if (e.key === 'Escape') close(); }
      function close() { vd.pause(); URL.revokeObjectURL(u); g.remove(); document.removeEventListener('keydown', onKey); }
      g.addEventListener('click', function (e) { if (e.target === g || e.target.closest('.fyr-x')) close(); });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(g); g.querySelector('.fyr-x').focus();
    });
  }
  // The customer clicks anywhere on the card. In Fyr's editor the text is editable, so only the play button plays.
  document.addEventListener('click', function (e) {
    if (!room.video || !e.target.closest('.video') || (edit && !e.target.closest('.play'))) return;
    playVideo();
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('video') && room.video) { e.preventDefault(); playVideo(); }
  });
  window.fyrRoomVideo = applyVideo; // Fyr's editor calls this after an upload or removal
  applyVideo();

  // The room is restored. Fyr's editor waits for this before it makes the text editable: on a slow connection this script
  // runs late, and setting up the template before the saved room replaces it left the room uneditable.
  document.documentElement.dataset.roomReady = '1';
  if (edit) { try { window.parent.postMessage({ fyr: 'room-ready', room: id }, '*'); } catch (_) {} return; }
  if (room.status === 'draft') { gate('<h2>This page isn\'t ready yet</h2><p>Simployer is still preparing it. You\'ll get a link when it\'s ready.</p>'); return; }

  var repFirst = String(room.rep || 'your contact').split(' ')[0];
  function save() {
    var all = read(ROOMS, []);
    for (var j = 0; j < all.length; j++) if (all[j].id === room.id) { all[j].people = room.people; all[j].status = room.status; all[j].signed = room.signed; }
    write(ROOMS, all);
  }
  function rtoken(n) { return (String(n).split(/[\s@.]+/)[0].toLowerCase().replace(/[^a-z]/g, '') || 'guest') + '-' + Math.random().toString(36).slice(2, 5); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

  /* 2. Signed state */
  function showSigned() {
    var sb = $('.signbox'); if (!sb || !room.signed) return;
    var btn = sb.querySelector('.btn'); if (btn) btn.remove();
    if (!sb.querySelector('.fyr-signed')) {
      var d = document.createElement('p'); d.className = 'fyr-signed';
      d.innerHTML = 'Signed by <b>' + esc(room.signed.name) + '</b>' + (room.signed.title ? ', ' + esc(room.signed.title) : '') + ', ' + new Date(room.signed.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) + '. A PDF receipt is on its way to you and ' + esc(repFirst) + '.';
      sb.appendChild(d);
    }
  }
  showSigned();

  /* 3. Who is reading */
  var person = null;
  (room.people || []).forEach(function (p) { if (p.token === token) person = p; });
  if (!person) {
    if (room.access === 'invited') { gate('<h2>This room is for invited people</h2><p>Ask ' + esc(repFirst) + ' at Simployer for your own link.</p>'); return; }
    var dom = String(room.email || '').split('@')[1] || '';
    var g = gate('<h2>' + esc(room.company) + ' and Simployer</h2><p>Someone shared this page with you. Enter your work email to open it.</p>' +
      '<form><label for="fyr-e">Work email</label><input id="fyr-e" type="email" required placeholder="name@' + esc(dom || 'company.com') + '"><label for="fyr-n">Your name</label><input id="fyr-n" type="text" required><p class="err" id="fyr-err"></p><div class="row"><button class="fyr-btn" type="submit">Open the page</button></div></form>');
    g.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var em = g.querySelector('#fyr-e').value.trim().toLowerCase(), nm = g.querySelector('#fyr-n').value.trim();
      if (dom && em.split('@')[1] !== dom) { g.querySelector('#fyr-err').textContent = 'Use your email at @' + dom + '.'; return; }
      person = { name: nm, email: em, role: '', token: rtoken(nm || em), by: 'forward', added: Date.now() };
      room.people = (room.people || []).concat([person]); save();
      history.replaceState(null, '', location.pathname + '?room=' + encodeURIComponent(room.id) + '&r=' + person.token);
      g.remove(); ask();
    });
    return;
  }
  ask();

  /* 4. The notice, then tracking */
  function ask() {
    var c = read(CONSENT, {});
    if (c[person.token] === true) return track();
    if (c[person.token] === false) return;
    var n = document.createElement('div'); n.className = 'fyr-notice';
    n.innerHTML = '<span><b>Simployer sees when this page is opened and which parts are read,</b> so ' + esc(repFirst) + ' can follow up. Nothing else is collected.</span><button class="fyr-btn line" data-c="0">No thanks</button><button class="fyr-btn" data-c="1">OK</button>';
    document.body.appendChild(n);
    n.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return;
      var all = read(CONSENT, {}); all[person.token] = b.dataset.c === '1'; write(CONSENT, all); n.remove();
      if (all[person.token]) { log({ type: 'consent' }); track(); }
    });
  }
  function log(e) {
    var all = read(EVS, []); e.room = room.id; e.token = person.token; e.at = Date.now(); all.push(e); write(EVS, all.slice(-5000));
  }
  function track() {
    log({ type: 'view' });
    var secs = ['s1', 's2', 's3', 's4', 's5', 's6', 's7'].map(function (s) { return document.getElementById(s); }).filter(Boolean);
    var vis = {}, reached = {}, time = {};
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var s = en.target.id; vis[s] = en.isIntersecting && en.intersectionRatio > 0.05;
        if (vis[s] && !reached[s] && en.target.style.display !== 'none') { reached[s] = true; log({ type: 'section', sec: s }); }
      });
    }, { threshold: [0, 0.06, 0.25] });
    secs.forEach(function (s) { io.observe(s); });
    setInterval(function () { if (document.visibilityState !== 'visible') return; Object.keys(vis).forEach(function (s) { if (vis[s]) time[s] = (time[s] || 0) + 1; }); }, 1000);
    function flush() { Object.keys(time).forEach(function (s) { if (time[s]) log({ type: 'time', sec: s, secs: time[s] }); }); time = {}; }
    setInterval(flush, 8000);
    addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    document.addEventListener('click', function (e) {
      if (e.target.closest('.video')) log({ type: 'click', what: 'video' });
      var a = e.target.closest('a.textlink'); if (a) log({ type: 'click', what: 'trust' });
      var sm = e.target.closest('details.more > summary');
      if (sm && !sm.parentElement.open) { var k = sm.parentElement.parentElement.querySelector('.k'); log({ type: 'click', what: 'story', story: k ? k.textContent.split('·')[0].trim() : '' }); }
    });
  }

  /* 5. Review and sign: name, title and a tick */
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.signbox .btn'); if (!b) return;
    e.preventDefault();
    if (read(CONSENT, {})[person && person.token] === true) log({ type: 'click', what: 'sign' });
    var g = gate('<h2>Sign the agreement</h2><p>' + esc(room.company) + ' and Simployer, as set out on this page.</p><form>' +
      '<label for="fyr-sn">Full name</label><input id="fyr-sn" type="text" required value="' + esc(person ? person.name : '') + '">' +
      '<label for="fyr-st">Title</label><input id="fyr-st" type="text" value="' + esc(person ? person.role : '') + '">' +
      '<label class="tick"><input type="checkbox" required> I accept the agreement above on behalf of ' + esc(room.company) + '.</label>' +
      '<div class="row"><button class="fyr-btn line" type="button" data-x>Not now</button><button class="fyr-btn" type="submit">Sign</button></div></form>');
    g.querySelector('[data-x]').addEventListener('click', function () { g.remove(); });
    g.querySelector('form').addEventListener('submit', function (ev) {
      ev.preventDefault();
      room.status = 'signed'; room.signed = { name: g.querySelector('#fyr-sn').value.trim(), title: g.querySelector('#fyr-st').value.trim(), at: Date.now(), token: person ? person.token : '' };
      save(); if (person) log({ type: 'sign' }); g.remove(); showSigned();
    });
  });
})();
