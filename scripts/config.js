/* Intelekta Skola — site config + form sender.
 *
 * Forms (contact, course application, free-guide popup) all submit through
 * window.ISsendForm(payload). Production currently posts to Google Apps Script,
 * which emails info@intelektaskola.lv, sends visitor confirmations, and creates
 * numbered invoice-payment emails. apiEndpoint remains available as an optional
 * Vercel serverless alternative.
 *
 * If the request fails (or no endpoint is reachable), each form gracefully
 * falls back to opening the visitor's email client (mailto:), so nothing breaks.
 */
window.IS_CONFIG = {
  // Gmail/Google Apps Script is the active production form backend.
  apiEndpoint: '',
  formEndpoint: 'https://script.google.com/macros/s/AKfycbziRv9loxU1mDhmR4TTgLcfpLLn6JdYTLfvwJzvawVmV_ZQHHtFOYYIYPcl557g-K-r/exec',
  // Enable only after the matching invoice-capable Apps Script version is deployed.
  invoiceEnabled: true,
};

// Timestamp the page load so the backend can reject instant (bot) submissions.
window.IS_FORM_T0 = Date.now();

// Capture the honeypot value from whichever form is being submitted.
// Runs in the capture phase, before each form's own submit handler.
document.addEventListener(
  'submit',
  function (e) {
    var hp = e.target && e.target.querySelector ? e.target.querySelector('.js-hp') : null;
    window.__IS_HP = hp ? hp.value : '';
  },
  true
);

// Sends a form payload to the backend.
// Returns a Promise<boolean>: true if accepted, false to trigger mailto fallback.
window.ISsendForm = function (payload) {
  var cfg = window.IS_CONFIG || {};
  var api = cfg.apiEndpoint || '';
  var body = {};
  for (var k in payload) if (Object.prototype.hasOwnProperty.call(payload, k)) body[k] = payload[k];
  body.company = window.__IS_HP || ''; // honeypot
  body.ts = window.IS_FORM_T0 ? Date.now() - window.IS_FORM_T0 : 0;

  if (api) {
    return fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(function (r) { return r.ok; })
      .catch(function () { return false; });
  }

  // Google Apps Script endpoint (no-cors, so delivery is confirmed by email).
  var ep = cfg.formEndpoint || '';
  if (!ep) return Promise.resolve(false);
  return fetch(ep, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body),
  })
    .then(function () { return true; })
    .catch(function () { return false; });
};
