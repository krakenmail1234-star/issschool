/* Intelekta Skola — WEB solution quote request.
 * Sends a structured project brief to info@intelektaskola.lv through the
 * shared Apps Script form endpoint. This form never starts a payment flow.
 */
(function () {
  var form = document.getElementById('webRequestForm');
  if (!form) return;

  var STATUS = {
    lv: { sending: 'Nosūta…', success: 'Paldies! Pieteikums ir nosūtīts uz info@intelektaskola.lv. Drīzumā sazināsimies ar Jums.', error: 'Automātiska nosūtīšana neizdevās. Tiks atvērta e-pasta programma.' },
    en: { sending: 'Sending…', success: 'Thank you! Your request has been sent to info@intelektaskola.lv. We will contact you shortly.', error: 'Automatic delivery failed. Your email application will open.' },
    ru: { sending: 'Отправка…', success: 'Спасибо! Заявка отправлена на info@intelektaskola.lv. Мы скоро свяжемся с Вами.', error: 'Автоматическая отправка не удалась. Откроется почтовая программа.' },
  };
  var TYPE = {
    display: 'Uzņēmuma / reprezentācijas mājaslapa',
    shop: 'Interneta veikals',
    onepage: 'Vienas lapas mājaslapa',
    catalog: 'Pakalpojumu vai produktu katalogs',
    redesign: 'Esošās mājaslapas pārstrāde',
    other: 'Cits risinājums',
  };
  var PLATFORM = {
    recommend: 'Nepieciešams ieteikums',
    wix: 'Wix',
    wordpress: 'WordPress',
    shopify: 'Shopify',
    custom: 'Individuāli izstrādāts risinājums / hostings',
  };
  var FEATURE = {
    languages: 'Vairākas valodas',
    payments: 'Tiešsaistes maksājumi',
    booking: 'Rezervācijas / pieraksts',
    blog: 'Blogs / jaunumi',
    crm: 'Formas / CRM integrācija',
    ai: 'AI čatbots vai automatizācija',
  };

  function value(id) {
    var element = document.getElementById(id);
    return element ? element.value.trim() : '';
  }
  function language() {
    var lang = localStorage.getItem('is_lang') || 'lv';
    return STATUS[lang] ? lang : 'lv';
  }
  function showStatus(text, ok) {
    var status = document.getElementById('wrStatus');
    status.textContent = text;
    status.className = 'rounded-xl p-3 text-center text-sm font-semibold ' +
      (ok ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border border-amber-400/30 bg-amber-400/10 text-amber-200');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var lang = language();
    var copy = STATUS[lang];
    var button = document.getElementById('wrSubmit');
    var originalLabel = button.textContent;
    var features = Array.from(form.querySelectorAll('input[name="wrFeatures"]:checked'))
      .map(function (checkbox) { return FEATURE[checkbox.value] || checkbox.value; });
    var type = value('wrType');
    var platform = value('wrPlatform');
    var message = [
      'WEB RISINĀJUMA PIETEIKUMS',
      '',
      'Mājaslapas mērķis:', value('wrPurpose'),
      '',
      'Mājaslapas veids: ' + (TYPE[type] || type),
      'Vēlamā platforma: ' + (PLATFORM[platform] || platform),
      'Nepieciešamās iespējas: ' + (features.length ? features.join(', ') : 'Nav norādītas'),
      'Plānotais budžets: ' + value('wrBudget'),
      'Vēlamais termiņš: ' + (value('wrDeadline') || 'Nav norādīts'),
      '',
      'Papildu informācija:', value('wrNotes') || 'Nav norādīta',
    ].join('\n');

    button.disabled = true;
    button.textContent = copy.sending;
    var sender = window.ISsendForm || function () { return Promise.resolve(false); };
    function openEmailFallback() {
      showStatus(copy.error, false);
      var subject = encodeURIComponent('WEB risinājuma pieteikums — ' + value('wrName') + ' ' + value('wrSurname'));
      var body = encodeURIComponent('E-pasts: ' + value('wrEmail') + '\n\n' + message);
      window.location.href = 'mailto:info@intelektaskola.lv?subject=' + subject + '&body=' + body;
    }
    sender({
      type: 'web',
      name: value('wrName'),
      surname: value('wrSurname'),
      email: value('wrEmail'),
      company: value('wrCompany'),
      message: message,
      lang: lang,
    }).then(function (sent) {
      if (sent) {
        form.reset();
        showStatus(copy.success, true);
      } else {
        openEmailFallback();
      }
    }).catch(function () {
      openEmailFallback();
    }).finally(function () {
      button.disabled = false;
      button.textContent = originalLabel;
    });
  });
})();
