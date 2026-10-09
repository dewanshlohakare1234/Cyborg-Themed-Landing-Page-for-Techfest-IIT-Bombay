/* =====================================================
   NEXUS-7 | JavaScript — Animations & Interactions
   ===================================================== */

(function () {
  'use strict';

  /* ---------- PARTICLE CANVAS ---------- */
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let raf;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * canvas.width;
      this.y  = init ? Math.random() * canvas.height : canvas.height + 5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.6 + 0.2);
      this.size   = Math.random() * 1.5 + 0.3;
      this.life   = 1;
      this.decay  = Math.random() * 0.003 + 0.001;
      this.color  = Math.random() > 0.6 ? '#00ffff' : Math.random() > 0.5 ? '#ff0044' : '#39ff14';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < -5) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.life * 0.7;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles(count) {
    particles = Array.from({ length: count }, () => new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    raf = requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  initParticles(90);
  animateParticles();
  window.addEventListener('resize', () => { resizeCanvas(); });

  /* ---------- NAVBAR ---------- */
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 60
      ? 'rgba(3, 7, 15, 0.97)'
      : 'rgba(3, 7, 15, 0.88)';
  }, { passive: true });

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections  = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => {
          a.classList.toggle(
            'nav-link--active',
            a.getAttribute('href') === '#' + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));

  /* ---------- TYPING EFFECT ---------- */
  const typedEl = document.querySelector('.typed-word');
  if (typedEl) {
    const words = ['fuses', 'merges', 'syncs', 'bonds', 'links'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];
      if (!deleting) {
        typedEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; setTimeout(type, 1600); return; }
      } else {
        typedEl.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, deleting ? 60 : 90);
    }
    setTimeout(type, 600);
  }

  /* ---------- ANIMATED COUNTERS ---------- */
  function animateCounter(el, target, decimals = 0) {
    const duration = 2000;
    const start    = performance.now();
    function step(now) {
      const p   = Math.min((now - start) / duration, 1);
      const val = target * easeOut(p);
      el.textContent = decimals ? val.toFixed(1) : Math.floor(val);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  const counterEls = document.querySelectorAll('.counter-val');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counterEls.forEach(el => {
      const target   = parseFloat(el.dataset.target);
      const decimals = target % 1 !== 0 ? 1 : 0;
      animateCounter(el, target, decimals);
    });
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealTargets = [
    ...document.querySelectorAll('.feat-card'),
    ...document.querySelectorAll('.stat-card'),
    ...document.querySelectorAll('.timeline-item'),
    ...document.querySelectorAll('.pillar'),
    ...document.querySelectorAll('.section-header'),
  ];
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- HERO IN-VIEW → START COUNTERS ---------- */
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { startCounters(); heroObs.disconnect(); }
    }, { threshold: 0.3 });
    heroObs.observe(heroSection);
  }

  /* ---------- PILLAR BAR ANIMATE ---------- */
  const pillarBars = document.querySelectorAll('.pillar-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.dataset.width;
        entry.target.style.width = w + '%';
        barObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  pillarBars.forEach(b => barObs.observe(b));

  /* ---------- RING PROGRESS ANIMATE ---------- */
  const rings = document.querySelectorAll('.ring-progress');
  const CIRC  = 2 * Math.PI * 42; // r=42 → ~263.9

  const ringObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pct    = parseFloat(entry.target.dataset.pct);
        const offset = CIRC * (1 - pct / 100);
        entry.target.style.strokeDashoffset = offset;
        ringObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  rings.forEach(r => ringObs.observe(r));

  /* ---------- FORM SUBMIT ---------- */
  const form = document.querySelector('.sync-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const span = btn.querySelector('.btn-inner');
      span.textContent = '✓ TRANSMISSION RECEIVED';
      btn.disabled = true;
      btn.style.borderColor = 'var(--neon)';
      btn.style.color = 'var(--neon)';
      setTimeout(() => {
        span.innerHTML = '<span class="btn-icon">◈</span> TRANSMIT REQUEST';
        btn.disabled = false;
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  }

  /* ---------- EYE FOLLOW CURSOR (DESKTOP) ---------- */
  const pupil = document.querySelector('.eye-pupil');
  if (pupil && window.matchMedia('(pointer: fine)').matches) {
    const eyeIris = document.querySelector('.eye-iris');
    document.addEventListener('mousemove', e => {
      if (!eyeIris) return;
      const rect   = eyeIris.getBoundingClientRect();
      const cx     = rect.left + rect.width / 2;
      const cy     = rect.top  + rect.height / 2;
      const angle  = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist   = Math.min(8, Math.hypot(e.clientX - cx, e.clientY - cy) * 0.1);
      const px     = Math.cos(angle) * dist;
      const py     = Math.sin(angle) * dist;
      pupil.style.transform = `translate(${px}px, ${py}px)`;
    }, { passive: true });
  }

  /* ---------- GLITCH KEYBOARD SHORTCUT (Easter Egg) ---------- */
  let easterSeq = '';
  document.addEventListener('keydown', e => {
    easterSeq += e.key.toLowerCase();
    if (easterSeq.length > 6) easterSeq = easterSeq.slice(-6);
    if (easterSeq.includes('nexus7')) {
      document.body.style.filter = 'hue-rotate(180deg)';
      setTimeout(() => { document.body.style.filter = ''; }, 800);
      easterSeq = '';
    }
  });

})();
