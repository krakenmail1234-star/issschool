/* Intelekta Skola — "Pieteikties" application modal.
 * Any element with [data-apply] opens a form (name, surname, email, message).
 * Submitting emails info@intelektaskola.lv via the Apps Script endpoint
 * (window.ISsendForm), with a mailto fallback when no endpoint is configured.
 * Trilingual: reads the shared 'is_lang' language choice.
 */
(function () {
  var T = {
    lv: { title: 'Pieteikties apmācībām', sub: 'Atstāj savu kontaktinformāciju un īsu ziņu — sazināsimies ar tevi.', name: 'Vārds', surname: 'Uzvārds', email: 'E-pasts', message: 'Ziņa', send: 'Nosūtīt pieteikumu', sending: 'Sūta…', namePh: 'Tavs vārds', surnamePh: 'Tavs uzvārds', emailPh: 'tu@uznemums.lv', messagePh: 'Par ko vēlies pieteikties?', success: 'Paldies! Tavs pieteikums ir nosūtīts. Sazināsimies ar tevi drīzumā.' },
    en: { title: 'Apply for training', sub: 'Leave your contact details and a short message — we will get back to you.', name: 'Name', surname: 'Surname', email: 'Email', message: 'Message', send: 'Send application', sending: 'Sending…', namePh: 'Your name', surnamePh: 'Your surname', emailPh: 'you@company.com', messagePh: 'What would you like to apply for?', success: 'Thank you! Your application has been sent. We will be in touch soon.' },
    ru: { title: 'Записаться на обучение', sub: 'Оставьте контактные данные и короткое сообщение — мы свяжемся с вами.', name: 'Имя', surname: 'Фамилия', email: 'Эл. почта', message: 'Сообщение', send: 'Отправить заявку', sending: 'Отправка…', namePh: 'Ваше имя', surnamePh: 'Ваша фамилия', emailPh: 'you@company.com', messagePh: 'На что хотите записаться?', success: 'Спасибо! Ваша заявка отправлена. Мы скоро свяжемся с вами.' },
  };
  var WEB = {
    lv: { title: 'WEB risinājuma pieteikums', sub: 'Apraksti vēlamo mājaslapu vai esošās vietnes uzlabojumus — sagatavosim izmaksu piedāvājumu.', messagePh: 'Platforma, lapu skaits, valodas, funkcijas un vēlamais termiņš', send: 'Saņemt izmaksu piedāvājumu', success: 'Paldies! WEB risinājuma pieteikums ir nosūtīts. Sazināsimies, lai precizētu apjomu un cenu.' },
    en: { title: 'WEB solution enquiry', sub: 'Describe the website you need or improvements to your existing site — we will prepare a quote.', messagePh: 'Platform, number of pages, languages, features and preferred deadline', send: 'Request a quote', success: 'Thank you! Your WEB solution enquiry has been sent. We will contact you to confirm scope and pricing.' },
    ru: { title: 'Заявка на WEB-решение', sub: 'Опишите нужный сайт или улучшения существующего — мы подготовим расчёт стоимости.', messagePh: 'Платформа, количество страниц, языки, функции и желаемый срок', send: 'Получить расчёт', success: 'Спасибо! Заявка на WEB-решение отправлена. Мы свяжемся с вами для уточнения объёма и цены.' },
  };
  var currentContext = '';
  function lang() { var l = localStorage.getItem('is_lang') || 'lv'; return T[l] ? l : 'lv'; }

  // Build modal once
  var modal = document.createElement('div');
  modal.id = 'applyModal';
  modal.className = 'fixed inset-0 z-[120] hidden items-center justify-center p-5';
  modal.innerHTML =
    '<div data-apply-backdrop class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>' +
    '<div class="relative w-full max-w-lg rounded-3xl glass-strong glass p-7 shadow-2xl sm:p-8">' +
      '<button type="button" data-apply-close aria-label="Close" class="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white">✕</button>' +
      '<div class="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-brand/30 blur-[70px]"></div>' +
      '<div class="relative">' +
        '<h3 data-a="title" class="text-2xl font-extrabold leading-tight sm:text-3xl"></h3>' +
        '<p data-a="sub" class="mt-2 text-sm text-zinc-300"></p>' +
        '<form id="applyForm" class="mt-5 space-y-3">' +
          '<div aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden">' +
            '<label>Company<input class="js-hp" type="text" name="company" tabindex="-1" autocomplete="off" /></label>' +
          '</div>' +
          '<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">' +
            '<label class="block"><span data-a="name" class="mb-1 block text-sm font-semibold text-zinc-200"></span><input id="apName" required type="text" class="field w-full rounded-xl px-4 py-3" /></label>' +
            '<label class="block"><span data-a="surname" class="mb-1 block text-sm font-semibold text-zinc-200"></span><input id="apSurname" required type="text" class="field w-full rounded-xl px-4 py-3" /></label>' +
          '</div>' +
          '<label class="block"><span data-a="email" class="mb-1 block text-sm font-semibold text-zinc-200"></span><input id="apEmail" required type="email" class="field w-full rounded-xl px-4 py-3" /></label>' +
          '<label class="block"><span data-a="message" class="mb-1 block text-sm font-semibold text-zinc-200"></span><textarea id="apMsg" required rows="4" class="field w-full resize-none rounded-xl px-4 py-3"></textarea></label>' +
          '<button type="submit" id="apSend" class="btn-glow btn-primary w-full rounded-full px-6 py-3.5 font-bold transition hover:brightness-110"></button>' +
        '</form>' +
        '<p id="applySuccess" class="mt-4 hidden rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-center text-sm font-semibold text-emerald-300"></p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);

  var $ = function (s) { return modal.querySelector(s); };
  function fill() {
    var activeLang = lang();
    var d = Object.assign({}, T[activeLang], currentContext === 'web' ? WEB[activeLang] : {});
    modal.querySelectorAll('[data-a]').forEach(function (el) { el.textContent = d[el.getAttribute('data-a')]; });
    $('#apName').placeholder = d.namePh; $('#apSurname').placeholder = d.surnamePh;
    $('#apEmail').placeholder = d.emailPh; $('#apMsg').placeholder = d.messagePh;
    $('#apSend').textContent = d.send;
  }
  function open(trigger) { currentContext = trigger && trigger.dataset ? (trigger.dataset.applyContext || '') : ''; fill(); $('#applySuccess').classList.add('hidden'); modal.classList.add('is-open'); modal.style.display = 'flex'; }
  function close() { modal.classList.remove('is-open'); modal.style.display = 'none'; }

  $('[data-apply-close]').addEventListener('click', close);
  $('[data-apply-backdrop]').addEventListener('click', close);
  window.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  // Wire every [data-apply] trigger
  document.querySelectorAll('[data-apply]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); open(el); });
  });

  $('#applyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var activeLang = lang();
    var d = Object.assign({}, T[activeLang], currentContext === 'web' ? WEB[activeLang] : {});
    var name = $('#apName').value.trim();
    var surname = $('#apSurname').value.trim();
    var email = $('#apEmail').value.trim();
    var message = $('#apMsg').value.trim();
    var btn = $('#apSend'); btn.disabled = true; btn.textContent = d.sending;
    var sender = window.ISsendForm || function () { return Promise.resolve(false); };
    var isWeb = currentContext === 'web';
    var outboundMessage = isWeb ? 'WEB risinājuma pieteikums\n\n' + message : message;
    sender({ type: isWeb ? 'contact' : 'apply', name: name, surname: surname, email: email, message: outboundMessage }).then(function (sent) {
      if (sent) {
        $('#applyForm').reset();
        $('#applySuccess').textContent = d.success;
        $('#applySuccess').classList.remove('hidden');
        btn.disabled = false; btn.textContent = d.send;
        setTimeout(close, 2600);
      } else {
        var subject = encodeURIComponent((isWeb ? 'WEB risinājuma pieteikums — ' : 'Pieteikums apmācībām — ') + (name + ' ' + surname).trim());
        var body = encodeURIComponent(d.name + ': ' + name + '\n' + d.surname + ': ' + surname + '\n' + d.email + ': ' + email + '\n\n' + message);
        window.location.href = 'mailto:info@intelektaskola.lv?subject=' + subject + '&body=' + body;
        btn.disabled = false; btn.textContent = d.send;
      }
    });
  });

  // expose for manual triggers if needed
  window.ISopenApply = open;
})();
