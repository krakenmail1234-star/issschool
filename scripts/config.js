/* Intelekta Skola — site config + form sender.
 *
 * formEndpoint: paste the Google Apps Script web-app URL here after deploying
 * apps-script/Code.gs (see apps-script/README.md). When set, contact + guide
 * forms send real emails to info@intelektaskola.lv and the guide popup triggers
 * an automatic "thank you" reply to the visitor.
 *
 * If left blank, forms gracefully fall back to opening the visitor's email
 * client (mailto:), so the site still works before the endpoint is configured.
 */
window.IS_CONFIG = {
  formEndpoint: '', // e.g. 'https://script.google.com/macros/s/AKfyc.../exec'
};

// Sends a form payload to the configured endpoint.
// Returns a Promise<boolean>: true if it was POSTed, false if no endpoint set.
window.ISsendForm = function (payload) {
  var ep = (window.IS_CONFIG && window.IS_CONFIG.formEndpoint) || '';
  if (!ep) return Promise.resolve(false);
  // text/plain keeps this a "simple" CORS request (no preflight); no-cors lets
  // the browser POST cross-origin to Apps Script without a CORS error.
  return fetch(ep, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  }).then(function () { return true; }).catch(function () { return false; });
};
