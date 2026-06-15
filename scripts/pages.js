/* Intelekta Skola — shared i18n + helpers for standalone pages
 * (privacy, contact, program). Each page defines window.PAGE_I18N = { lv, en, ru }
 * with data-i18n paths, then includes this script.
 * Reuses the 'is_lang' localStorage key so the language choice is shared with the homepage.
 */
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var get = function (o, p) { return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o); };
  var T = window.PAGE_I18N || {};
  var lang = localStorage.getItem('is_lang') || 'lv';
  if (!T[lang]) lang = 'lv';

  function translate(l) {
    var d = T[l] || T.lv || {};
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var v = get(d, el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = get(d, el.getAttribute('data-i18n-ph'));
      if (typeof v === 'string') el.setAttribute('placeholder', v);
    });
    document.querySelectorAll('.langseg [data-lang]').forEach(function (b) {
      b.classList.toggle('is-active', b.dataset.lang === l);
    });
  }

  document.querySelectorAll('.langseg [data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang;
      localStorage.setItem('is_lang', lang);
      translate(lang);
    });
  });

  var y = $('#year');
  if (y) y.textContent = new Date().getFullYear();

  // contact form -> mailto (if present)
  var f = $('#contactForm');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = $('#cfName').value.trim();
      var email = $('#cfEmail').value.trim();
      var msg = $('#cfMsg').value.trim();
      var subject = encodeURIComponent('Intelekta Skola — ' + (name || 'Web'));
      var body = encodeURIComponent(name + '\n' + email + '\n\n' + msg);
      window.location.href = 'mailto:info@intelektaskola.lv?subject=' + subject + '&body=' + body;
    });
  }

  translate(lang);
})();
