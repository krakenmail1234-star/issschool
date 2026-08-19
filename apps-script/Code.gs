/** Intelekta Skola form backend. Deploy as info@intelektaskola.lv. */

var NOTIFY_TO = 'info@intelektaskola.lv';
var BRAND = 'Intelekta Skola';
var SITE = 'https://www.intelektaskola.lv';
var SELLER_NAME = 'SIA Intelekta Skola';
var SELLER_REG = '40203747500';
var SELLER_VAT = 'LV40203747500';
var SELLER_ADDRESS = 'Akmeņu iela 21B, Rīga, LV-1048, Latvija';
var BANK_NAME = 'SWEDBANK AS';
var BANK_ACCOUNT = 'LV57HABA0551065347794';
var BANK_BIC = 'HABALV22';
var VAT_RATE = 0.21;
var INVOICE_TIMEZONE = 'Europe/Riga';
var PRODUCTS = {
  'ai-ieviesana': { name: 'AI ieviešanas ceļvedis', gross: 20.00 },
  'chatgpt-llm-meistariba': { name: 'ChatGPT un LLM meistarība', gross: 500.00 },
  'ai-automatizacija': { name: 'AI automatizācija sociālajiem tīkliem (1 mēnesis)', gross: 236.88 },
  'individualais-ai-kurss': { name: 'Individuālais AI kurss', gross: 150.00 },
  'prompt-inzenierija': { name: 'Promptu inženierija', gross: 159.00 }
};

// Configure ONE delivery method before deploying the web app.
// For Drive, copy the ID from: drive.google.com/file/d/FILE_ID/view
var PRESENTATION_FILE_ID = '';
var PRESENTATION_URL = 'https://www.intelektaskola.lv/assets/bezmaksas-ai-celvedis.pdf';

function doPost(e) {
  try {
    var data = parseRequest_(e);
    var type = ['contact', 'apply', 'guide', 'invoice', 'web'].indexOf(String(data.type)) >= 0 ? String(data.type) : 'contact';
    var name = clean_(data.name, 120);
    var surname = clean_(data.surname, 120);
    var email = clean_(data.email, 200);
    var message = clean_(data.message, 5000);
    var fullName = (name + ' ' + surname).trim();

    // Honeypot: silently accept automated submissions without sending email.
    if (clean_(data.company, 200)) return json_({ ok: true });
    if (!isEmail_(email)) return json_({ ok: false, error: 'Invalid email address.' });
    if (type === 'invoice') return createInvoice_(data, email);
    if (type !== 'guide' && !message) return json_({ ok: false, error: 'A message is required.' });

    // Every valid form, including "Pieteikties kursam", notifies the school.
    GmailApp.sendEmail(
      NOTIFY_TO,
      notificationSubject_(type, fullName || email),
      notificationBody_(type, name, surname, email, message),
      { name: BRAND + ' (vietne)', replyTo: email }
    );

    // Gmail sends an automatic response to the person who completed the form.
    if (type === 'guide') sendPresentation_(email, name);
    else if (type === 'apply') sendApplicationConfirmation_(email, name);
    else if (type === 'web') sendWebConfirmation_(email, name);
    else sendContactConfirmation_(email, name);

    return json_({ ok: true, confirmationSent: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

function createInvoice_(data, email) {
  var productId = clean_(data.productId, 100);
  var product = PRODUCTS[productId];
  var buyerName = clean_(data.billingName, 200);
  var buyerReg = clean_(data.billingRegNumber, 80);
  var buyerVat = clean_(data.billingVatNumber, 80);
  var buyerAddress = clean_(data.billingAddress, 300);

  if (!product) return json_({ ok: false, error: 'Unknown product.' });
  if (!buyerName || !buyerAddress) return json_({ ok: false, error: 'Billing name and address are required.' });

  var invoice = nextInvoice_();
  var net = roundMoney_(product.gross / (1 + VAT_RATE));
  var vat = roundMoney_(product.gross - net);
  var details = {
    reference: invoice.reference,
    sequence: invoice.sequence,
    date: Utilities.formatDate(new Date(), INVOICE_TIMEZONE, 'dd.MM.yyyy'),
    product: product,
    net: net,
    vat: vat,
    buyerName: buyerName,
    buyerReg: buyerReg,
    buyerVat: buyerVat,
    buyerAddress: buyerAddress,
    email: email
  };

  GmailApp.sendEmail(
    email,
    'Rēķins apmaksai ' + details.reference + ' — ' + BRAND,
    invoiceText_(details),
    { name: BRAND, replyTo: NOTIFY_TO, htmlBody: invoiceHtml_(details) }
  );
  GmailApp.sendEmail(
    NOTIFY_TO,
    'Izveidots rēķins ' + details.reference + ' — ' + buyerName,
    invoiceAdminText_(details),
    { name: BRAND + ' (vietne)', replyTo: email }
  );

  return json_({ ok: true, invoiceReference: details.reference, invoiceSequence: details.sequence });
}

function nextInvoice_() {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var now = new Date();
    var year = Utilities.formatDate(now, INVOICE_TIMEZONE, 'yyyy');
    var month = String(Number(Utilities.formatDate(now, INVOICE_TIMEZONE, 'M')));
    var key = 'INVOICE_COUNT_' + year + '_' + month;
    var props = PropertiesService.getScriptProperties();
    var sequence = Number(props.getProperty(key) || '0') + 1;
    var total = Number(props.getProperty('INVOICE_TOTAL') || '0') + 1;
    props.setProperties((function () {
      var values = { INVOICE_TOTAL: String(total), LAST_INVOICE_REFERENCE: 'INV_ONLINE#' + sequence + '/' + month + '/' + year };
      values[key] = String(sequence);
      return values;
    })());
    return { reference: 'INV_ONLINE#' + sequence + '/' + month + '/' + year, sequence: sequence, total: total };
  } finally {
    lock.releaseLock();
  }
}

// Run this function manually in Apps Script to see private invoice statistics.
function getInvoiceStats() {
  var props = PropertiesService.getScriptProperties().getProperties();
  var months = {};
  Object.keys(props).filter(function (key) { return key.indexOf('INVOICE_COUNT_') === 0; }).sort().forEach(function (key) {
    months[key.replace('INVOICE_COUNT_', '')] = Number(props[key]);
  });
  var result = { total: Number(props.INVOICE_TOTAL || '0'), lastReference: props.LAST_INVOICE_REFERENCE || '', byMonth: months };
  console.log(JSON.stringify(result));
  return result;
}

function invoiceText_(d) {
  return 'RĒĶINS APMAKSAI\n\nNumurs: ' + d.reference + '\nDatums: ' + d.date + '\n\n' +
    'Pakalpojuma sniedzējs:\n' + SELLER_NAME + '\nReģ. nr.: ' + SELLER_REG + '\nPVN nr.: ' + SELLER_VAT + '\n' + SELLER_ADDRESS + '\n\n' +
    'Rēķina saņēmējs:\n' + d.buyerName + '\n' + (d.buyerReg ? 'Reģ. nr.: ' + d.buyerReg + '\n' : '') +
    (d.buyerVat ? 'PVN nr.: ' + d.buyerVat + '\n' : '') + d.buyerAddress + '\n\n' +
    'Pakalpojums: ' + d.product.name + '\nSumma bez PVN: ' + formatMoney_(d.net) + '\nPVN 21%: ' + formatMoney_(d.vat) +
    '\nKopā apmaksai: ' + formatMoney_(d.product.gross) + '\n\n' +
    'Saņēmējs: ' + SELLER_NAME + '\nBanka: ' + BANK_NAME + '\nIBAN: ' + BANK_ACCOUNT + '\nBIC/SWIFT: ' + BANK_BIC +
    '\nMaksājuma mērķis: ' + d.reference + '\n\nPaldies!\n' + BRAND;
}

function invoiceAdminText_(d) {
  return invoiceText_(d) + '\n\nKlienta e-pasts: ' + d.email + '\nAutomātiskais kārtas numurs šajā mēnesī: ' + d.sequence;
}

function invoiceHtml_(d) {
  var buyerExtra = (d.buyerReg ? '<br>Reģ. nr.: ' + escapeHtml_(d.buyerReg) : '') +
    (d.buyerVat ? '<br>PVN nr.: ' + escapeHtml_(d.buyerVat) : '');
  return '<div style="font-family:Arial,sans-serif;max-width:720px;margin:auto;color:#111827;line-height:1.55">' +
    '<h1 style="color:#0f5c39;margin-bottom:4px">Rēķins apmaksai</h1><p style="margin-top:0"><strong>' + escapeHtml_(d.reference) + '</strong><br>Datums: ' + d.date + '</p>' +
    '<table style="width:100%;border-collapse:collapse;margin:24px 0"><tr><td style="width:50%;vertical-align:top;padding:14px;border:1px solid #d1d5db"><strong>Pakalpojuma sniedzējs</strong><br>' + SELLER_NAME + '<br>Reģ. nr.: ' + SELLER_REG + '<br>PVN nr.: ' + SELLER_VAT + '<br>' + SELLER_ADDRESS + '</td>' +
    '<td style="width:50%;vertical-align:top;padding:14px;border:1px solid #d1d5db"><strong>Rēķina saņēmējs</strong><br>' + escapeHtml_(d.buyerName) + buyerExtra + '<br>' + escapeHtml_(d.buyerAddress) + '</td></tr></table>' +
    '<table style="width:100%;border-collapse:collapse"><tr style="background:#ecfdf5"><th style="text-align:left;padding:10px;border:1px solid #d1d5db">Pakalpojums</th><th style="text-align:right;padding:10px;border:1px solid #d1d5db">Summa</th></tr>' +
    '<tr><td style="padding:10px;border:1px solid #d1d5db">' + escapeHtml_(d.product.name) + '</td><td style="text-align:right;padding:10px;border:1px solid #d1d5db">' + formatMoney_(d.net) + '</td></tr>' +
    '<tr><td style="text-align:right;padding:8px;border:1px solid #d1d5db">PVN 21%</td><td style="text-align:right;padding:8px;border:1px solid #d1d5db">' + formatMoney_(d.vat) + '</td></tr>' +
    '<tr><td style="text-align:right;padding:10px;border:1px solid #d1d5db"><strong>Kopā apmaksai</strong></td><td style="text-align:right;padding:10px;border:1px solid #d1d5db"><strong>' + formatMoney_(d.product.gross) + '</strong></td></tr></table>' +
    '<div style="margin-top:24px;padding:16px;background:#f3f4f6;border-radius:12px"><strong>Apmaksas rekvizīti</strong><br>Saņēmējs: ' + SELLER_NAME + '<br>Banka: ' + BANK_NAME + '<br>IBAN: <strong>' + BANK_ACCOUNT + '</strong><br>BIC/SWIFT: ' + BANK_BIC + '<br>Maksājuma mērķis: <strong>' + escapeHtml_(d.reference) + '</strong></div>' +
    '<p>Jautājumu gadījumā rakstiet <a href="mailto:' + NOTIFY_TO + '">' + NOTIFY_TO + '</a>.</p></div>';
}

function roundMoney_(value) { return Math.round(value * 100) / 100; }
function formatMoney_(value) { return Number(value).toFixed(2).replace('.', ',') + ' EUR'; }

function sendPresentation_(email, name) {
  if (!PRESENTATION_FILE_ID && !PRESENTATION_URL) {
    throw new Error('Configure PRESENTATION_FILE_ID or PRESENTATION_URL before deploying.');
  }

  var text = 'Labdien!\n\n' +
    'Paldies par Jūsu interesi par mākslīgā intelekta iespējām.\n\n' +
    'Nosūtām Jums bezmaksas ceļvedi par mākslīgā intelekta izmantošanu, kurā apkopota praktiska informācija un ieteikumi, kas var palīdzēt labāk izprast MI sniegtās iespējas un tā pielietojumu ikdienā.\n\n' +
    'Ja ceļveža iepazīšanas laikā rodas jautājumi vai vēlaties uzzināt, kā mākslīgo intelektu un dažādus MI rīkus iespējams izmantot tieši Jūsu ikdienas darbā, ar prieku palīdzēsim.\n\n' +
    'Droši rakstiet mums, aprakstot savas vajadzības vai uzdevumus, kurus vēlētos atvieglot ar mākslīgā intelekta palīdzību, un mēs ieteiksim piemērotākos risinājumus.\n\n' +
    'Ar cieņu,\n' + BRAND + '\n' + NOTIFY_TO + '\n' + SITE;
  var options = {
    name: BRAND,
    replyTo: NOTIFY_TO,
    htmlBody: guideEmailHtml_(),
    attachments: [presentationBlob_()]
  };
  GmailApp.sendEmail(email, 'Jūsu bezmaksas ceļvedis par mākslīgo intelektu — ' + BRAND, text, options);
}

function presentationBlob_() {
  var blob;
  if (PRESENTATION_FILE_ID) {
    blob = DriveApp.getFileById(PRESENTATION_FILE_ID).getBlob();
  } else {
    var response = UrlFetchApp.fetch(PRESENTATION_URL, { followRedirects: true, muteHttpExceptions: true });
    if (response.getResponseCode() < 200 || response.getResponseCode() >= 300) {
      throw new Error('Could not download the guide attachment. HTTP ' + response.getResponseCode());
    }
    blob = response.getBlob();
  }
  return blob.setName('bezmaksas-ai-celvedis.pdf');
}

function guideEmailHtml_() {
  return '<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;color:#111827;line-height:1.65">' +
    '<h2 style="color:#2563eb">' + BRAND + '</h2>' +
    '<p><strong>Labdien!</strong></p>' +
    '<p>Paldies par Jūsu interesi par mākslīgā intelekta iespējām.</p>' +
    '<p>Nosūtām Jums bezmaksas ceļvedi par mākslīgā intelekta izmantošanu, kurā apkopota praktiska informācija un ieteikumi, kas var palīdzēt labāk izprast MI sniegtās iespējas un tā pielietojumu ikdienā.</p>' +
    '<p>Ja ceļveža iepazīšanas laikā rodas jautājumi vai vēlaties uzzināt, kā mākslīgo intelektu un dažādus MI rīkus iespējams izmantot tieši Jūsu ikdienas darbā, ar prieku palīdzēsim.</p>' +
    '<p>Droši rakstiet mums, aprakstot savas vajadzības vai uzdevumus, kurus vēlētos atvieglot ar mākslīgā intelekta palīdzību, un mēs ieteiksim piemērotākos risinājumus.</p>' +
    '<p>Ceļvedis ir pievienots šim e-pastam PDF formātā.</p>' +
    '<p>Ar cieņu,<br><strong>' + BRAND + '</strong><br><a href="mailto:' + NOTIFY_TO + '">' + NOTIFY_TO + '</a><br><a href="' + SITE + '">' + SITE + '</a></p></div>';
}

function sendApplicationConfirmation_(email, name) {
  var hello = name ? ('Labdien, ' + name + '!') : 'Labdien!';
  var message = 'Paldies! Esam saņēmuši Jūsu pieteikumu apmācībām. Drīzumā sazināsimies ar Jums par piemērotāko kursu un nākamajiem soļiem.';
  GmailApp.sendEmail(email, 'Jūsu pieteikums ir saņemts — ' + BRAND,
    hello + '\n\n' + message + '\n\nAr cieņu,\n' + BRAND + '\n' + NOTIFY_TO + '\n' + SITE,
    { name: BRAND, replyTo: NOTIFY_TO, htmlBody: emailHtml_(hello, message, '') });
}

function sendContactConfirmation_(email, name) {
  var hello = name ? ('Labdien, ' + name + '!') : 'Labdien!';
  var message = 'Paldies, ka sazinājāties ar Intelekta Skolu. Esam saņēmuši Jūsu ziņu un drīzumā atbildēsim.';
  GmailApp.sendEmail(email, 'Jūsu ziņa ir saņemta — ' + BRAND,
    hello + '\n\n' + message + '\n\nAr cieņu,\n' + BRAND + '\n' + NOTIFY_TO + '\n' + SITE,
    { name: BRAND, replyTo: NOTIFY_TO, htmlBody: emailHtml_(hello, message, '') });
}

function sendWebConfirmation_(email, name) {
  var hello = name ? ('Labdien, ' + name + '!') : 'Labdien!';
  var message = 'Paldies! Esam saņēmuši Jūsu WEB risinājuma pieteikumu. Izvērtēsim norādīto mājaslapas mērķi, veidu, funkcijas, platformu, budžetu un termiņu, un sazināsimies ar Jums par piemērotāko risinājumu un izmaksām.';
  GmailApp.sendEmail(email, 'Jūsu WEB risinājuma pieteikums ir saņemts — ' + BRAND,
    hello + '\n\n' + message + '\n\nAr cieņu,\n' + BRAND + '\n' + NOTIFY_TO + '\n' + SITE,
    { name: BRAND, replyTo: NOTIFY_TO, htmlBody: emailHtml_(hello, message, '') });
}

function notificationSubject_(type, who) {
  if (type === 'guide') return 'Jauns AI prezentācijas pieprasījums — ' + who;
  if (type === 'apply') return 'Jauns pieteikums apmācībām — ' + who;
  if (type === 'web') return 'Jauns WEB risinājuma pieteikums — ' + who;
  return 'Jauns kontaktpieprasījums — ' + who;
}

function notificationBody_(type, name, surname, email, message) {
  return 'Tips: ' + type + '\nVārds: ' + name + '\n' +
    (surname ? ('Uzvārds: ' + surname + '\n') : '') + 'E-pasts: ' + email + '\n' +
    (message ? ('\nZiņa:\n' + message + '\n') : '') + '\n— Nosūtīts no ' + SITE;
}

function emailHtml_(hello, message, url) {
  var link = url ? '<p><a href="' + escapeHtml_(url) + '" style="display:inline-block;padding:12px 20px;border-radius:999px;background:#2563eb;color:#fff;text-decoration:none;font-weight:700">Atvērt prezentāciju</a></p>' : '';
  return '<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#111827;line-height:1.65">' +
    '<h2 style="color:#2563eb">' + BRAND + '</h2><p><strong>' + escapeHtml_(hello) + '</strong></p>' +
    '<p>' + escapeHtml_(message) + '</p>' + link + '<p>Ar cieņu,<br><strong>' + BRAND + '</strong><br>' +
    '<a href="mailto:' + NOTIFY_TO + '">' + NOTIFY_TO + '</a></p></div>';
}

function parseRequest_(e) {
  try { return JSON.parse((e && e.postData && e.postData.contents) || '{}'); }
  catch (err) { return (e && e.parameter) || {}; }
}
function clean_(value, maxLength) { return String(value || '').trim().slice(0, maxLength); }
function isEmail_(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function escapeHtml_(value) {
  return String(value || '').replace(/[&<>"']/g, function (character) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character];
  });
}
function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() {
  return json_({ ok: true, service: 'Intelekta Skola form endpoint', sender: NOTIFY_TO,
    presentationConfigured: Boolean(PRESENTATION_FILE_ID || PRESENTATION_URL) });
}
