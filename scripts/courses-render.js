/* Intelekta Skola — renders course cards (and their Course schema.org markup)
 * on program.html. Tries the Sanity Studio "course" content first (same CMS
 * the homepage uses — see studio-intelektask/schemaTypes/course.ts) and falls
 * back to the bundled defaults in scripts/courses.js if the CMS has no entries
 * yet or is unreachable. Re-renders on language switch.
 */
(function () {
  var ICONS = {
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 11a8 8 0 0 1 8-8c2 0 3 1 3 3a8 8 0 0 1-8 8l-3-3z"/><circle cx="14" cy="9" r="1.3"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5z"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    megaphone: '<path d="M3 11v2a1 1 0 0 0 1 1h2l9 5V5L6 10H4a1 1 0 0 0-1 1z"/><path d="M18 8a4 4 0 0 1 0 8"/>',
    pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  };
  var DEFAULT_ICON = ICONS.target;
  var ORG_ID = 'https://www.intelektaskola.lv/#org';
  var PAGE_URL = 'https://www.intelektaskola.lv/program.html';
  var SANITY = { projectId: 'eanw34a4', dataset: 'production', apiVersion: '2023-01-01' };

  var liveCourses = null; // courses loaded from Sanity, if any

  function lang() {
    var l = localStorage.getItem('is_lang') || 'lv';
    return window.PAGE_I18N && window.PAGE_I18N[l] ? l : 'lv';
  }

  function pick(field, l) {
    return (field && (field[l] || field.lv)) || '';
  }

  function activeCourses() {
    return liveCourses || window.COURSES || [];
  }

  function cardHTML(c) {
    var l = lang();
    var badge = c.badge
      ? '<div class="mb-2 inline-block rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-electric">' + pick(c.badge, l) + '</div>'
      : '';
    var ring = c.featured ? ' ring-1 ring-brand/40' : '';
    return (
      '<article class="glass glow-hover rounded-3xl p-7' + ring + '" data-generated-course>' +
      '<div class="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-electric"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">' +
      (ICONS[c.icon] || DEFAULT_ICON) +
      '</svg></div>' +
      badge +
      '<h2 class="text-xl font-bold">' + pick(c.title, l) + '</h2>' +
      '<p class="mt-2 text-sm leading-relaxed text-zinc-400">' + pick(c.desc, l) + '</p>' +
      '<a href="' + c.stripeUrl + '" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric hover:text-brandlt">' +
      pick(c.cta, l) + ' →</a>' +
      '</article>'
    );
  }

  function renderCards() {
    var grid = document.getElementById('coursesGrid');
    var courses = activeCourses();
    if (!grid || !courses.length) return;
    grid.querySelectorAll('[data-generated-course]').forEach(function (n) { n.remove(); });
    grid.insertAdjacentHTML('afterbegin', courses.map(cardHTML).join(''));
  }

  function renderSchema() {
    var courses = activeCourses();
    if (!courses.length) return;
    var old = document.getElementById('coursesSchema');
    if (old) old.remove();
    var graph = [{ '@type': 'Organization', '@id': ORG_ID, name: 'SIA Intelekta Skola', url: 'https://www.intelektaskola.lv/', email: 'info@intelektaskola.lv', logo: 'https://www.intelektaskola.lv/assets/logo-is.svg' }];
    courses.forEach(function (c) {
      graph.push({
        '@type': 'Course',
        '@id': PAGE_URL + '#course-' + c.id,
        name: pick(c.title, 'lv'),
        description: pick(c.desc, 'lv'),
        provider: { '@id': ORG_ID },
        url: PAGE_URL,
        inLanguage: 'lv',
      });
    });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.id = 'coursesSchema';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(s);
  }

  function renderAll() {
    renderCards();
    renderSchema();
  }

  function loadCMSCourses() {
    var groq = '*[_type=="course"]|order(order asc){_id,order,icon,stripeUrl,featured,titleLv,titleEn,titleRu,descLv,descEn,descRu,ctaLv,ctaEn,ctaRu,badgeLv,badgeEn,badgeRu}';
    var url = 'https://' + SANITY.projectId + '.apicdn.sanity.io/v' + SANITY.apiVersion + '/data/query/' + SANITY.dataset + '?query=' + encodeURIComponent(groq);
    fetch(url)
      .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
      .then(function (j) {
        var items = j && j.result;
        if (!Array.isArray(items) || !items.length) return; // no CMS content yet -> keep bundled defaults
        liveCourses = items.map(function (c, i) {
          return {
            id: c._id || ('cms-' + i),
            stripeUrl: c.stripeUrl,
            icon: c.icon,
            featured: !!c.featured,
            title: { lv: c.titleLv || '', en: c.titleEn || c.titleLv || '', ru: c.titleRu || c.titleLv || '' },
            desc: { lv: c.descLv || '', en: c.descEn || c.descLv || '', ru: c.descRu || c.descLv || '' },
            cta: { lv: c.ctaLv || 'Pieteikties', en: c.ctaEn || 'Enroll', ru: c.ctaRu || 'Записаться' },
            badge: (c.badgeLv || c.badgeEn || c.badgeRu) ? { lv: c.badgeLv || '', en: c.badgeEn || '', ru: c.badgeRu || '' } : null,
          };
        });
        renderAll();
      })
      .catch(function () { /* offline / CORS / private dataset -> keep bundled defaults silently */ });
  }

  document.querySelectorAll('.langseg [data-lang]').forEach(function (b) {
    b.addEventListener('click', renderCards);
  });

  renderAll();
  loadCMSCourses();
})();
