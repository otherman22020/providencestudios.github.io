/* =============================================
   ONI BOOT SEQUENCE — JAVASCRIPT
   OFFICE OF NAVAL INTELLIGENCE // SECTION THREE
   ============================================= */

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────
  // Set your access passcode here (or leave blank to skip auth)
  const PASSCODE = 'ONI-ALPHA';
  const SKIP_BOOT = sessionStorage.getItem('oni_authenticated');

  const output   = document.getElementById('console-output');
  const authBlock = document.getElementById('auth-block');
  const authInput  = document.getElementById('auth-input');
  const authError  = document.getElementById('auth-error');
  const bootScreen = document.getElementById('boot-screen');
  const mainSite   = document.getElementById('main-site');

  // ── BOOT SEQUENCE LINES ──────────────────────
  const bootLines = [
    { text: '═══════════════════════════════════════════════════════', cls: 'dim', delay: 0 },
    { text: 'UNSC OFFICE OF NAVAL INTELLIGENCE — SECURE TERMINAL', cls: 'head', delay: 60 },
    { text: 'SECTION THREE // CLASSIFIED // EYES ONLY', cls: 'head', delay: 60 },
    { text: '═══════════════════════════════════════════════════════', cls: 'dim', delay: 60 },
    { text: '', delay: 120 },
    { text: 'Initializing secure boot sequence...', delay: 80 },
    { text: 'BIOS: ONI-MACH v4.1.9 [CLASSIFIED]', cls: 'dim', delay: 60 },
    { text: 'CPU: QUANTUM-X64 @ 4.8THz — ONLINE', delay: 40 },
    { text: 'MEM: 128TB REDUNDANT — OK', cls: 'ok', delay: 40 },
    { text: 'STORAGE: ENCRYPTED ARRAY — MOUNTED', cls: 'ok', delay: 40 },
    { text: '', delay: 80 },
    { text: 'Loading kernel... NAVINT-KERNEL 9.2.1', delay: 60 },
    { text: '  [CORE] NavInt_Core_Module ........ LOADED', cls: 'ok', delay: 40 },
    { text: '  [CORE] QuantumCrypt_Module ........ LOADED', cls: 'ok', delay: 40 },
    { text: '  [CORE] SentinelAI_Monitor ........ LOADED', cls: 'ok', delay: 40 },
    { text: '  [CORE] NetworkSurveillance ....... LOADED', cls: 'ok', delay: 40 },
    { text: '  [SEC]  ThreatResponse_Layer ....... ACTIVE', cls: 'ok', delay: 40 },
    { text: '  [WARN] Legacy_Protocol_Shim ...... DEGRADED', cls: 'warn', delay: 40 },
    { text: '', delay: 80 },
    { text: 'Establishing encrypted uplink...', delay: 80 },
    { text: '  RELAY NODE 1 [REACH-7]  .......... TIMEOUT', cls: 'warn', delay: 60 },
    { text: '  RELAY NODE 2 [EARTH-ALPHA] ........ OK', cls: 'ok', delay: 60 },
    { text: '  RELAY NODE 3 [ARGENT-MOON] ........ OK', cls: 'ok', delay: 60 },
    { text: '  Routing via NODE 2 — latency: 140ms', cls: 'dim', delay: 40 },
    { text: '', delay: 80 },
    { text: 'Verifying ONI Section Three credentials...', delay: 80 },
    { text: '  RSA-8192 CERTIFICATE .............. VALID', cls: 'ok', delay: 50 },
    { text: '  QUANTUM SIGNATURE ................. VALID', cls: 'ok', delay: 50 },
    { text: '  RETINAL HASH (STORED) ............. MATCH', cls: 'ok', delay: 50 },
    { text: '', delay: 80 },
    { text: 'Loading CELL ALPHA-7 data store...', delay: 80 },
    { text: '  Document index .................... INDEXED', cls: 'ok', delay: 40 },
    { text: '  Personnel roster .................. LOADED', cls: 'ok', delay: 40 },
    { text: '  Operations board .................. LOADED', cls: 'ok', delay: 40 },
    { text: '  DIRECTIVE FEED .................... SYNCED', cls: 'ok', delay: 40 },
    { text: '', delay: 80 },
    { text: '⚠  THIS TERMINAL IS MONITORED AT ALL TIMES  ⚠', cls: 'warn', delay: 60 },
    { text: '⚠  ALL ACTIONS LOGGED AND ATTRIBUTED TO USER ⚠', cls: 'warn', delay: 60 },
    { text: '', delay: 80 },
    { text: '═══════════════════════════════════════════════════════', cls: 'dim', delay: 60 },
    { text: 'SYSTEM READY', cls: 'bright', delay: 100 },
    { text: '═══════════════════════════════════════════════════════', cls: 'dim', delay: 60 },
    { text: '', delay: 100 },
  ];

  // ── HELPERS ──────────────────────────────────
  function appendLine(text, cls) {
    const span = document.createElement('span');
    span.className = 'line' + (cls ? ' ' + cls : '');
    span.textContent = text === '' ? '\u00A0' : text;
    output.appendChild(span);
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  async function typewriter(text, cls, charDelay = 12) {
    const span = document.createElement('span');
    span.className = 'line' + (cls ? ' ' + cls : '');
    output.appendChild(span);
    for (const ch of text) {
      span.textContent += ch;
      await sleep(charDelay);
    }
    if (text === '') span.textContent = '\u00A0';
    output.parentElement.scrollTop = output.parentElement.scrollHeight;
  }

  // ── BOOT RUNNER ──────────────────────────────
  async function runBoot() {
    for (const line of bootLines) {
      await sleep(line.delay || 40);
      if (line.type === 'type') {
        await typewriter(line.text, line.cls);
      } else {
        appendLine(line.text, line.cls);
      }
    }
    // Show auth block
    await sleep(200);
    showAuth();
  }

  // ── AUTH ─────────────────────────────────────
  function showAuth() {
    authBlock.style.display = 'block';
    authInput.focus();
    authInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        checkAuth(authInput.value);
      }
    });
  }

  function checkAuth(value) {
    // If no passcode set, allow through
    if (!PASSCODE || value.trim().toUpperCase() === PASSCODE.toUpperCase()) {
      sessionStorage.setItem('oni_authenticated', '1');
      authError.style.display = 'none';
      authBlock.style.display = 'none';
      appendLine('ACCESS GRANTED — WELCOME, OPERATIVE', 'ok');
      appendLine('Launching ONI CELL ALPHA-7 interface...', 'dim');
      setTimeout(launchSite, 800);
    } else {
      authInput.value = '';
      authError.style.display = 'block';
      authError.style.animation = 'none';
      void authError.offsetWidth;
      authError.style.animation = 'shake 0.3s ease';
      appendLine('  [SEC] AUTH FAILURE — attempt logged and reported', 'err');
    }
  }

  function launchSite() {
    bootScreen.classList.add('fade-out');
    setTimeout(() => {
      bootScreen.style.display = 'none';
      mainSite.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      startClock();
      setLastSync();
      highlightNav();
    }, 800);
  }

  // ── SKIP BOOT (already authenticated this session) ──
  function skipToSite() {
    bootScreen.style.display = 'none';
    mainSite.style.display = 'flex';
    startClock();
    setLastSync();
    highlightNav();
  }

  // ── CLOCK ─────────────────────────────────────
  function startClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    function tick() {
      const now = new Date();
      el.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    }
    tick();
    setInterval(tick, 1000);
  }

  function setLastSync() {
    const el = document.getElementById('last-sync');
    if (el) el.textContent = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
  }

  // ── NAV HIGHLIGHT ─────────────────────────────
  function highlightNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  }

  // ── INIT ─────────────────────────────────────
  if (SKIP_BOOT) {
    skipToSite();
  } else {
    runBoot();
  }

})();
