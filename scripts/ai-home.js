/* Intelekta Skola — premium AI landing.
 * Vanilla JS reproducing the requested Framer-Motion behaviour:
 *   reveal: opacity 0->1, y 24->0, 0.8s, ease [0.25,0,0,1]   (CSS .reveal)
 *   cards:  whileHover translateY(-8px) scale(1.02)          (CSS .glow-hover)
 *   roadmap: draw connecting line on scroll                   (CSS .road.drawn)
 *   hero:   Three.js particle field with mouse parallax + scroll scrub
 *   3D:     mouse parallax layers, floating particles, gold glow, perspective tilt
 */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STRIPE_MAIN = 'https://buy.stripe.com/3cI14m6Y3ahgbiS0vP2ZO01';
  const STRIPE_INDIVIDUAL = 'https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00';
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- icons (inline, gold stroke) ---------- */
  const I = {
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 11a8 8 0 0 1 8-8c2 0 3 1 3 3a8 8 0 0 1-8 8l-3-3z"/><circle cx="14" cy="9" r="1.3"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5z"/>',
    wand: '<path d="M4 20 14 10"/><path d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>',
    hands: '<path d="M4 13l4 4 8-8"/><path d="M3 8a9 9 0 0 1 18 0"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    mentor: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M17 6l4 2-4 2"/>',
    infinity: '<path d="M7 12a3 3 0 1 0 0 .1M17 12a3 3 0 1 1 0 .1"/><path d="M9 12c1.5-2.5 4.5-2.5 6 0s-4.5 2.5-6 0"/>',
  };
  const icon = (k, cls = 'h-6 w-6') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${cls}">${I[k] || ''}</svg>`;

  /* ---------- data ---------- */
  const COURSES = [
    { icon: 'rocket', title: 'AI Implementation', desc: 'Learn how businesses deploy AI systems, workflows and productivity solutions.', cta: 'Enroll', href: STRIPE_MAIN },
    { icon: 'chat', title: 'ChatGPT & LLM Mastery', desc: 'Practical AI usage, prompting, workflows and advanced ChatGPT techniques.', cta: 'Enroll', href: STRIPE_MAIN },
    { icon: 'bolt', title: 'AI Automation for Social Media', desc: 'Automate content generation, planning and publishing using modern AI tools.', cta: 'Enroll', href: STRIPE_MAIN },
    { icon: 'user', title: 'AI Individual Course', desc: 'Personalized one-on-one learning tailored to your goals and profession.', cta: 'Book 1:1', href: STRIPE_INDIVIDUAL, featured: true },
    { icon: 'sparkle', title: 'Prompt Engineering', desc: 'Master structured prompting for business, creativity and automation.', cta: 'Enroll', href: STRIPE_MAIN },
  ];

  const TOOLS = [
    { icon: 'target', title: 'AI Knowledge Quiz', desc: 'Test your AI knowledge.', href: null },
    { icon: 'wand', title: 'Prompt Generator', desc: 'Generate professional prompts.', href: './prompt-darbnica/index.html', live: true },
    { icon: 'sparkle', title: 'Prompt Improver', desc: 'Improve weak prompts instantly.', href: null },
    { icon: 'gauge', title: 'AI Readiness Assessment', desc: 'Evaluate AI adoption readiness.', href: './ai-gatavibas-tests/index.html', live: true },
    { icon: 'compass', title: 'ChatGPT Use Case Finder', desc: 'Discover practical business use cases.', href: null },
    { icon: 'bolt', title: 'AI Time & ROI Calculator', desc: 'See the hours and euros AI saves you.', href: './laika-kalkulators/index.html', live: true },
  ];

  const WHY = [
    { icon: 'rocket', title: 'Real-world implementation', desc: 'Every concept lands as a workflow you can ship the same week.' },
    { icon: 'hands', title: 'Hands-on learning', desc: 'You build, prompt and automate live — not just watch slides.' },
    { icon: 'briefcase', title: 'Business-focused skills', desc: 'Tied to revenue, time saved and real operational outcomes.' },
    { icon: 'gear', title: 'Automation-first mindset', desc: 'Design once, let AI repeat it — across content, ops and support.' },
    { icon: 'mentor', title: 'Individual mentoring', desc: 'One-on-one guidance tailored to your role and goals.' },
    { icon: 'infinity', title: 'Future-proof curriculum', desc: 'Continuously updated as models and tools evolve.' },
  ];

  const ROADMAP = [
    { n: '01', title: 'Foundations', desc: 'How modern AI thinks, and where it helps.' },
    { n: '02', title: 'ChatGPT Mastery', desc: 'Daily fluency with LLMs.' },
    { n: '03', title: 'Prompt Engineering', desc: 'Structured, repeatable results.' },
    { n: '04', title: 'Automation', desc: 'Remove the repetitive work.' },
    { n: '05', title: 'AI Implementation', desc: 'Deploy across the business.' },
  ];

  const COMPANY = [
    { k: 'Reg. number', v: '40203747500' },
    { k: 'Registered', v: '19.05.2026' },
    { k: 'VAT number', v: 'LV40203747500' },
    { k: 'VAT status', v: 'Active', good: true },
  ];

  /* ---------- render ---------- */
  $('#courseGrid').innerHTML = COURSES.map(
    (c, i) => `
    <article class="reveal glass glow-hover rounded-3xl p-7 ${c.featured ? 'ring-1 ring-gold/40' : ''}" style="transition-delay:${i * 0.06}s" data-tilt>
      <div class="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">${icon(c.icon)}</div>
      ${c.featured ? '<div class="mb-2 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-gold">Most personal</div>' : ''}
      <h3 class="text-xl font-bold">${c.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400">${c.desc}</p>
      <a href="${c.href}" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-goldlt">
        ${c.cta} <span aria-hidden="true">→</span>
      </a>
    </article>`
  ).join('');

  $('#toolGrid').innerHTML = TOOLS.map(
    (t, i) => `
    <a ${t.href ? `href="${t.href}"` : 'role="button" aria-disabled="true"'} class="reveal glass ${t.href ? 'glow-hover' : 'opacity-70'} block rounded-3xl p-7" style="transition-delay:${i * 0.06}s" data-tilt>
      <div class="mb-5 flex items-center justify-between">
        <span class="inline-grid h-12 w-12 place-items-center rounded-2xl bg-gold/10 text-gold">${icon(t.icon)}</span>
        ${t.live ? '<span class="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">Live</span>' : '<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">Soon</span>'}
      </div>
      <h3 class="text-xl font-bold">${t.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400">${t.desc}</p>
      <div class="mt-6 inline-flex items-center gap-2 text-sm font-bold ${t.href ? 'text-gold' : 'text-zinc-500'}">
        ${t.href ? 'Open tool <span aria-hidden="true">→</span>' : 'Coming soon'}
      </div>
    </a>`
  ).join('');

  $('#whyGrid').innerHTML = WHY.map(
    (w, i) => `
    <div class="reveal glass glow-hover rounded-3xl p-6" style="transition-delay:${i * 0.05}s" data-tilt>
      <div class="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold">${icon(w.icon, 'h-5 w-5')}</div>
      <h3 class="text-lg font-bold">${w.title}</h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400">${w.desc}</p>
    </div>`
  ).join('');

  $('#roadList').innerHTML = ROADMAP.map(
    (r, i) => `
    <li class="road-node relative" style="transition-delay:${i * 0.14}s">
      <div class="flex items-center gap-4 md:flex-col md:text-center">
        <div class="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl glass glow text-lg font-extrabold text-gold">${r.n}</div>
        <div>
          <h3 class="text-base font-bold md:mt-4">${r.title}</h3>
          <p class="mt-1 text-sm text-zinc-400">${r.desc}</p>
        </div>
      </div>
    </li>`
  ).join('');

  $('#companyGrid').innerHTML = COMPANY.map(
    (c) => `
    <div class="rounded-2xl bg-white/[.03] p-4 hairline">
      <div class="text-xs uppercase tracking-wider text-zinc-500">${c.k}</div>
      <div class="mt-1 font-semibold ${c.good ? 'text-emerald-300' : 'text-zinc-100'}">${c.good ? '● ' : ''}${c.v}</div>
    </div>`
  ).join('');

  $('#year').textContent = new Date().getFullYear();

  /* ---------- reveal on scroll (Framer-style) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const road = $('.road');
  // If motion is reduced, IO is unavailable, or the tab loads backgrounded
  // (IO/rAF won't fire when hidden), show everything immediately so content
  // is never stuck invisible.
  if (reduce || document.hidden || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
    if (road) road.classList.add('drawn');
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    // roadmap line draw
    if (road) {
      const rio = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { road.classList.add('drawn'); rio.disconnect(); } }),
        { threshold: 0.25 }
      );
      rio.observe(road);
    }
  }

  /* ---------- perspective tilt on hover (subtle rotation) ---------- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.style.transformStyle = 'preserve-3d';
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-8px) scale(1.02)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- mouse parallax layers ---------- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    const layers = document.querySelectorAll('[data-parallax]');
    window.addEventListener('pointermove', (e) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        const s = parseFloat(l.getAttribute('data-parallax')) || 0.05;
        l.style.transform = `translate3d(${(-cx * s * 100).toFixed(1)}px, ${(-cy * s * 100).toFixed(1)}px, 0)`;
      });
    }, { passive: true });
  }

  /* ---------- contact form -> mailto ---------- */
  const form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = $('#cfName').value.trim();
      const email = $('#cfEmail').value.trim();
      const msg = $('#cfMsg').value.trim();
      const subject = encodeURIComponent(`AI training enquiry — ${name || 'Website'}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
      window.location.href = `mailto:info@intelektaskola.lv?subject=${subject}&body=${body}`;
    });
  }

  /* ---------- Three.js hero: floating AI particle field ---------- */
  (function hero() {
    const canvas = $('#hero-canvas');
    if (!canvas || typeof THREE === 'undefined' || reduce) {
      if (canvas) canvas.style.background = 'radial-gradient(60rem 40rem at 50% 0%, rgba(233,201,107,.12), transparent 60%)';
      return;
    }
    let w = canvas.clientWidth, h = canvas.clientHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 22;

    // particle field
    const COUNT = window.innerWidth < 768 ? 900 : 1800;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // soft round gold sprite
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(246,230,176,1)');
    g.addColorStop(0.4, 'rgba(233,201,107,.7)');
    g.addColorStop(1, 'rgba(233,201,107,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);

    const mat = new THREE.PointsMaterial({ size: 0.5, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let mx = 0, my = 0, scrollN = 0;
    window.addEventListener('pointermove', (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; }, { passive: true });
    // scroll "scrub": hero rotation tied to page scroll
    window.addEventListener('scroll', () => { scrollN = window.scrollY / window.innerHeight; }, { passive: true });

    function resize() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);

    const clock = new THREE.Clock();
    let raf;
    function loop() {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04 + scrollN * 0.8;
      points.rotation.x = Math.sin(t * 0.1) * 0.05 + scrollN * 0.3;
      // ease camera toward mouse (parallax / layered depth)
      camera.position.x += (mx * 6 - camera.position.x) * 0.04;
      camera.position.y += (-my * 4 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop(); // start immediately (visible users); rAF is a no-op while tab hidden
    // pause when hero off-screen to save cycles
    const hero = $('#top');
    const vio = new IntersectionObserver((en) => {
      en.forEach((e) => {
        if (e.isIntersecting) { if (!raf) loop(); }
        else { cancelAnimationFrame(raf); raf = null; }
      });
    }, { threshold: 0.01 });
    vio.observe(hero);
  })();
})();
