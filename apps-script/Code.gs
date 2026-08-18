/** Intelekta Skola form backend. Deploy as info@intelektaskola.lv. */

var NOTIFY_TO = 'info@intelektaskola.lv';
var BRAND = 'Intelekta Skola';
var SITE = 'https://www.intelektaskola.lv';

// Configure ONE delivery method before deploying the web app.
// For Drive, copy the ID from: drive.google.com/file/d/FILE_ID/view
var PRESENTATION_FILE_ID = '';
var PRESENTATION_URL = 'https://www.intelektaskola.lv/assets/bezmaksas-ai-celvedis.pptx';

function doPost(e) {
  try {
    var data = parseRequest_(e);
    var type = ['contact', 'apply', 'guide'].indexOf(String(data.type)) >= 0 ? String(data.type) : 'contact';
    var name = clean_(data.name, 120);
    var surname = clean_(data.surname, 120);
    var email = clean_(data.email, 200);
    var message = clean_(data.message, 5000);
    var fullName = (name + ' ' + surname).trim();

    if (!isEmail_(email)) return json_({ ok: false, error: 'Invalid email address.' });
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
    else sendContactConfirmation_(email, name);

    return json_({ ok: true, confirmationSent: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

function sendPresentation_(email, name) {
  if (!PRESENTATION_FILE_ID && !PRESENTATION_URL) {
    throw new Error('Configure PRESENTATION_FILE_ID or PRESENTATION_URL before deploying.');
  }

  var hello = name ? ('Sveiki, ' + name + '!') : 'Sveiki!';
  var text = hello + '\n\n' +
    'Paldies par interesi! Jūsu prezentācija “Bezmaksas ceļvedis darbībai ar MI” ir gatava.' +
    (PRESENTATION_FILE_ID ? '\n\nPrezentācija ir pievienota šim e-pastam.' : '') +
    (PRESENTATION_URL ? '\n\nAtvērt prezentāciju: ' + PRESENTATION_URL : '') + '\n\n' +
    'Ar cieņu,\n' + BRAND + '\n' + NOTIFY_TO + '\n' + SITE;
  var options = {
    name: BRAND,
    replyTo: NOTIFY_TO,
    htmlBody: emailHtml_(hello, 'Paldies par interesi! Jūsu bezmaksas AI prezentācija ir gatava.', PRESENTATION_URL)
  };
  if (PRESENTATION_FILE_ID) options.attachments = [DriveApp.getFileById(PRESENTATION_FILE_ID).getBlob()];
  GmailApp.sendEmail(email, 'Jūsu bezmaksas AI prezentācija — ' + BRAND, text, options);
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

function notificationSubject_(type, who) {
  if (type === 'guide') return 'Jauns AI prezentācijas pieprasījums — ' + who;
  if (type === 'apply') return 'Jauns pieteikums apmācībām — ' + who;
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
