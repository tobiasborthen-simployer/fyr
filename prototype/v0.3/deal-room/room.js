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
  if (!id) return;

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
    '@media(max-width:600px){.fyr-notice{flex-direction:column;align-items:stretch}}';
  document.head.appendChild(css);

  function gate(html) { var g = document.createElement('div'); g.className = 'fyr-gate'; g.innerHTML = '<div class="fyr-box">' + html + '</div>'; document.body.appendChild(g); return g; }
  if (!room) { gate('<h2>This room isn\'t available</h2><p>The link may be old. Ask your contact at Simployer for a new one.</p>'); return; }

  /* 1. Restore the rep's saved room */
  if (room.html) {
    if (room.html.main && $('.main')) $('.main').innerHTML = room.html.main;
    if (room.html.navFor && $('.nav-for')) $('.nav-for').innerHTML = room.html.navFor;
    if (room.html.rep && $('.repcard')) $('.repcard').innerHTML = room.html.rep;
  }
  (room.hidden || []).forEach(function (h) {
    var el = document.getElementById(h); if (el) el.style.display = 'none';
    var a = document.querySelector('.nav a[href="#' + h + '"]'); if (a) a.parentElement.style.display = 'none';
  });
  document.title = 'Simployer and ' + room.company;
  if (edit) return;
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
