/**
 * Intelekta Skola — form backend (Google Apps Script web app).
 *
 * Receives form submissions from the website and:
 *   1. Emails every submission to info@intelektaskola.lv
 *   2. For AI-guide signups (type === 'guide'), sends the visitor an automatic
 *      "thank you for signing up" email.
 *
 * Deploy under the info@intelektaskola.lv Google account so mail is sent from it.
 * See apps-script/README.md for step-by-step deployment.
 */

var NOTIFY_TO = 'info@intelektaskola.lv';
var BRAND = 'Intelekta Skola';
var SITE = 'https://intelektaskola.lv';

function doPost(e) {
  try {
    var data = {};
    try {
      data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    } catch (parseErr) {
      data = (e && e.parameter) || {};
    }

    var type = String(data.type || 'contact');
    var name = String(data.name || '').trim();
    var surname = String(data.surname || '').trim();
    var email = String(data.email || '').trim();
    var message = String(data.message || '').trim();
    var fullName = (name + ' ' + surname).trim();

    // basic email sanity check
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // 1) Notify the business
    var subject;
    if (type === 'guide') subject = 'Jauns AI ceļveža pieprasījums — ' + (fullName || email || 'nezināms');
    else if (type === 'apply') subject = 'Jauns pieteikums apmācībām — ' + (fullName || email || 'nezināms');
    else subject = 'Jauns kontaktpieprasījums — ' + (fullName || email || 'nezināms');
    var body =
      'Tips: ' + type + '\n' +
      'Vārds: ' + name + '\n' +
      (surname ? ('Uzvārds: ' + surname + '\n') : '') +
      'E-pasts: ' + email + '\n' +
      (message ? ('\nZiņa:\n' + message + '\n') : '') +
      '\n— Nosūtīts no ' + SITE;
    MailApp.sendEmail({
      to: NOTIFY_TO,
      subject: subject,
      body: body,
      replyTo: emailOk ? email : NOTIFY_TO,
      name: BRAND + ' (vietne)',
    });

    // 2) Autoresponder for AI-guide signups
    if (type === 'guide' && emailOk) {
      var hello = name ? ('Sveiki, ' + name + '!') : 'Sveiki!';
      MailApp.sendEmail({
        to: email,
        name: BRAND,
        replyTo: NOTIFY_TO,
        subject: 'Paldies, ka pieteicies AI ceļvedim! — ' + BRAND,
        body:
          hello + '\n\n' +
          'Paldies, ka pieteicies bezmaksas AI ceļvedim "5 AI darbplūsmas, kas ietaupa stundas katru nedēļu".\n\n' +
          'Mēs to nosūtīsim tev tuvākajā laikā uz šo e-pasta adresi. Tikmēr vari izmēģināt mūsu bezmaksas rīkus: ' + SITE + '/tools/\n\n' +
          'Ja ir kāds jautājums, vienkārši atbildi uz šo vēstuli.\n\n' +
          'Ar cieņu,\n' + BRAND + '\n' + NOTIFY_TO + '\n' + SITE,
      });
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Lets you open the web-app URL in a browser to confirm it's live.
function doGet() {
  return ContentService
    .createTextOutput('Intelekta Skola form endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
