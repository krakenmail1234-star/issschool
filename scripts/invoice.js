/* Intelekta Skola — invoice payment option for fixed-price Stripe products. */
(function () {
  'use strict';

  var PRODUCTS = {
    'https://buy.stripe.com/3cI14m6Y3ahgbiS0vP2ZO01': { id: 'ai-ieviesana', name: 'AI ieviešanas ceļvedis', price: '20,00 EUR' },
    'https://buy.stripe.com/14A7sKfuz0GGcmW0vP2ZO04': { id: 'chatgpt-llm-meistariba', name: 'ChatGPT un LLM meistarība', price: '500,00 EUR' },
    'https://buy.stripe.com/eVq14mbejdts9aKfqJ2ZO03': { id: 'ai-automatizacija', name: 'AI automatizācija sociālajiem tīkliem (1 mēnesis)', price: '236,88 EUR' },
    'https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00': { id: 'individualais-ai-kurss', name: 'Individuālais AI kurss', price: '150,00 EUR' },
    'https://buy.stripe.com/7sY8wOdmrdtsaeOemF2ZO02': { id: 'prompt-inzenierija', name: 'Promptu inženierija', price: '159,00 EUR' }
  };

  var COPY = {
    lv: {
      stripe: 'Maksāt ar karti', invoice: 'Saņemt rēķinu', merchant: 'PAY', merchantSoon: 'Tiešais PAY maksājums būs pieejams, kad tiks pievienota tirgotāja saite.', title: 'Saņemt rēķinu e-pastā', intro: 'Aizpildi rēķina saņēmēja datus. Rēķins ar bankas rekvizītiem un unikālu maksājuma mērķi tiks nosūtīts uz tavu e-pastu.',
      recipient: 'Rēķina saņēmējs', recipientPh: 'Vārds, uzvārds vai uzņēmuma nosaukums', email: 'E-pasts', reg: 'Reģistrācijas numurs', vat: 'PVN numurs', address: 'Juridiskā vai deklarētā adrese', addressPh: 'Iela, pilsēta, pasta indekss, valsts',
      optional: 'nav obligāts', send: 'Izveidot un nosūtīt rēķinu', cancel: 'Atcelt', sending: 'Veidojam rēķinu…', sent: 'Rēķins ir izveidots un nosūtīts uz norādīto e-pastu.', error: 'Rēķinu neizdevās nosūtīt. Raksti info@intelektaskola.lv.', note: 'Rēķina numurs tiek piešķirts automātiski formātā INV_ONLINE#numurs/mēnesis/gads.'
    },
    en: {
      stripe: 'Pay by card', invoice: 'Request invoice', merchant: 'PAY', merchantSoon: 'Direct PAY checkout will be enabled when the merchant link is available.', title: 'Receive an invoice by email', intro: 'Enter the billing details. An invoice with bank details and a unique payment reference will be emailed to you.',
      recipient: 'Invoice recipient', recipientPh: 'Full name or legal company name', email: 'Email', reg: 'Registration number', vat: 'VAT number', address: 'Legal or declared address', addressPh: 'Street, city, postal code, country',
      optional: 'optional', send: 'Create and email invoice', cancel: 'Cancel', sending: 'Creating invoice…', sent: 'The invoice has been created and sent to the email provided.', error: 'The invoice could not be sent. Email info@intelektaskola.lv.', note: 'Invoice numbers are assigned automatically as INV_ONLINE#number/month/year.'
    },
    ru: {
      stripe: 'Оплатить картой', invoice: 'Получить счёт', merchant: 'PAY', merchantSoon: 'Прямая оплата PAY станет доступна после добавления ссылки продавца.', title: 'Получить счёт по электронной почте', intro: 'Укажите данные получателя. Счёт с банковскими реквизитами и уникальным назначением платежа будет отправлен на вашу почту.',
      recipient: 'Получатель счёта', recipientPh: 'Имя и фамилия или название компании', email: 'Эл. почта', reg: 'Регистрационный номер', vat: 'Номер НДС', address: 'Юридический или декларированный адрес', addressPh: 'Улица, город, индекс, страна',
      optional: 'необязательно', send: 'Создать и отправить счёт', cancel: 'Отмена', sending: 'Создаём счёт…', sent: 'Счёт создан и отправлен на указанный адрес.', error: 'Не удалось отправить счёт. Напишите info@intelektaskola.lv.', note: 'Номер присваивается автоматически: INV_ONLINE#номер/месяц/год.'
    }
  };

  var selectedProduct = null;
  var modal = null;

  function language() {
    var value = localStorage.getItem('is_lang') || document.documentElement.lang || 'lv';
    return COPY[value] ? value : 'lv';
  }

  function text() { return COPY[language()]; }

  function field(label, name, type, placeholder, required, extra) {
    return '<label style="display:block"><span style="display:block;margin-bottom:6px;font-size:13px;font-weight:700;color:#d4d4d8">' + label + (extra ? ' <span style="font-weight:400;color:#71717a">(' + extra + ')</span>' : '') + '</span>' +
      '<input name="' + name + '" type="' + type + '" ' + (required ? 'required ' : '') + 'placeholder="' + placeholder + '" style="box-sizing:border-box;width:100%;border:1px solid rgba(255,255,255,.14);border-radius:12px;background:#0e231b;color:#fff;padding:12px 14px;outline:none"></label>';
  }

  function ensureModal() {
    if (modal) return modal;
    var d = text();
    var wrap = document.createElement('div');
    wrap.id = 'invoiceModal';
    wrap.hidden = true;
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'invoiceTitle');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:10000;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(2,10,7,.82);backdrop-filter:blur(8px)';
    wrap.innerHTML = '<div style="width:min(100%,620px);max-height:92vh;overflow:auto;border:1px solid rgba(255,255,255,.14);border-radius:24px;background:#081712;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.5)">' +
      '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px"><div><div style="font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#5CFFB0">INTELEKTA SKOLA</div><h2 id="invoiceTitle" style="margin:8px 0 0;font-size:26px;color:#fff">' + d.title + '</h2></div><button type="button" data-invoice-close aria-label="Close" style="border:0;background:transparent;color:#a1a1aa;font-size:28px;cursor:pointer">×</button></div>' +
      '<p data-invoice-intro style="color:#a1a1aa;line-height:1.55">' + d.intro + '</p>' +
      '<div data-invoice-product style="margin:18px 0;padding:14px;border-radius:14px;background:rgba(31,157,99,.13);color:#d1fae5"></div>' +
      '<form id="invoiceForm"><div aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden"><label>Company<input class="js-hp" type="text" name="company" tabindex="-1" autocomplete="off"></label></div>' +
      '<div style="display:grid;gap:14px">' +
      field(d.recipient, 'billingName', 'text', d.recipientPh, true, '') +
      field(d.email, 'email', 'email', 'name@example.com', true, '') +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px">' + field(d.reg, 'billingRegNumber', 'text', '', false, d.optional) + field(d.vat, 'billingVatNumber', 'text', 'LV…', false, d.optional) + '</div>' +
      field(d.address, 'billingAddress', 'text', d.addressPh, true, '') +
      '<p data-invoice-note style="margin:0;font-size:12px;color:#71717a">' + d.note + '</p><div data-invoice-status role="status" style="display:none;padding:12px;border-radius:12px"></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end"><button type="button" data-invoice-close style="border:1px solid rgba(255,255,255,.14);border-radius:999px;background:transparent;color:#d4d4d8;padding:11px 18px;font-weight:700;cursor:pointer">' + d.cancel + '</button><button type="submit" style="border:0;border-radius:999px;background:linear-gradient(135deg,#1f9d63,#5CFFB0);color:#052014;padding:11px 20px;font-weight:800;cursor:pointer">' + d.send + '</button></div>' +
      '</div></form></div>';
    document.body.appendChild(wrap);
    modal = wrap;
    wrap.querySelectorAll('[data-invoice-close]').forEach(function (button) { button.addEventListener('click', closeModal); });
    wrap.addEventListener('click', function (event) { if (event.target === wrap) closeModal(); });
    wrap.querySelector('#invoiceForm').addEventListener('submit', submitInvoice);
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !wrap.hidden) closeModal(); });
    return wrap;
  }

  function refreshModalCopy() {
    if (modal) { modal.remove(); modal = null; }
    return ensureModal();
  }

  function openModal(product) {
    selectedProduct = product;
    var box = refreshModalCopy();
    box.querySelector('[data-invoice-product]').innerHTML = '<strong>' + product.name + '</strong><br><span style="font-size:14px">' + product.price + ' (PVN iekļauts)</span>';
    box.hidden = false;
    box.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    setTimeout(function () { box.querySelector('[name="billingName"]').focus(); }, 0);
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function decoratePayments() {
    var d = text();
    document.querySelectorAll('a[href*="buy.stripe.com"]').forEach(function (stripe) {
      if (stripe.dataset.invoiceReady) return;
      var product = PRODUCTS[stripe.href.replace(/\/$/, '')];
      if (!product) return;
      stripe.dataset.invoiceReady = 'true';
      stripe.setAttribute('aria-label', d.stripe + ' — ' + product.name);
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'mt-6 ml-3 inline-flex items-center gap-2 rounded-full border border-brand/50 px-5 py-2.5 text-sm font-bold text-electric transition hover:bg-brand/10';
      button.textContent = d.invoice;
      button.setAttribute('aria-label', d.invoice + ' — ' + product.name);
      button.addEventListener('click', function () { openModal(product); });
      stripe.insertAdjacentElement('afterend', button);
      var merchant = document.createElement('button');
      merchant.type = 'button';
      merchant.disabled = true;
      merchant.className = 'mt-6 ml-3 inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold text-zinc-500 opacity-60';
      merchant.textContent = d.merchant;
      merchant.title = d.merchantSoon;
      merchant.setAttribute('aria-label', d.merchant + ' — ' + d.merchantSoon + ' — ' + product.name);
      button.insertAdjacentElement('afterend', merchant);
    });
  }

  function submitInvoice(event) {
    event.preventDefault();
    if (!selectedProduct || typeof window.ISsendForm !== 'function') return;
    var form = event.currentTarget;
    var data = new FormData(form);
    var status = modal.querySelector('[data-invoice-status]');
    var submit = form.querySelector('[type="submit"]');
    var d = text();
    submit.disabled = true;
    submit.textContent = d.sending;
    status.style.display = 'none';
    window.ISsendForm({
      type: 'invoice',
      productId: selectedProduct.id,
      name: String(data.get('billingName') || ''),
      email: String(data.get('email') || ''),
      billingName: String(data.get('billingName') || ''),
      billingRegNumber: String(data.get('billingRegNumber') || ''),
      billingVatNumber: String(data.get('billingVatNumber') || ''),
      billingAddress: String(data.get('billingAddress') || '')
    }).then(function (sent) {
      status.style.display = 'block';
      status.style.background = sent ? 'rgba(16,185,129,.14)' : 'rgba(239,68,68,.14)';
      status.style.color = sent ? '#a7f3d0' : '#fecaca';
      status.textContent = sent ? d.sent : d.error;
      if (sent) form.reset();
    }).catch(function () {
      status.style.display = 'block';
      status.style.background = 'rgba(239,68,68,.14)';
      status.style.color = '#fecaca';
      status.textContent = d.error;
    }).finally(function () {
      submit.disabled = false;
      submit.textContent = d.send;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.IS_CONFIG || window.IS_CONFIG.invoiceEnabled !== true) return;
    decoratePayments();
    new MutationObserver(decoratePayments).observe(document.body, { childList: true, subtree: true });
  });
})();
