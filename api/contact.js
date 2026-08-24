/**
 * Intelekta Skola — form backend (Vercel Serverless Function, Node runtime).
 *
 * Handles every website form (contact, course application "apply", and the
 * free-guide popup) through one endpoint. For each submission it:
 *   1. Sends an internal NOTIFICATION email to info@intelektaskola.lv.
 *   2. Sends the visitor a formal Latvian CONFIRMATION (auto-reply).
 *
 * Email is sent through Resend (https://resend.com) via its REST API, so this
 * file has ZERO npm dependencies — it uses Node 18+'s built-in global fetch.
 * That keeps the static site completely build-less.
 *
 * Security: the Resend API key lives only in the RESEND_API_KEY environment
 * variable (server-side). It is never shipped to the browser.
 *
 * Demo / dry-run: if RESEND_API_KEY is not set, emails are logged to the
 * function console instead of being sent, and the endpoint still returns
 * { ok: true }. This lets us demo the full flow before a key is configured.
 *
 * Required Vercel environment variables (see api/README.md):
 *   RESEND_API_KEY   re_xxx... (server-side secret)
 *   MAIL_FROM        e.g. "Intelekta Skola <info@intelektaskola.lv>"
 *   NOTIFY_TO        e.g. "info@intelektaskola.lv"   (optional, defaults below)
 */

'use strict';

const BRAND = 'Intelekta Skola';
const SITE = 'https://intelektaskola.lv';
const NOTIFY_TO = process.env.NOTIFY_TO || 'info@intelektaskola.lv';
const MAIL_FROM = process.env.MAIL_FROM || 'Intelekta Skola <info@intelektaskola.lv>';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX = { name: 120, surname: 120, phone: 80, interest: 160, email: 200, message: 5000 };

/* ------------------------------ helpers ------------------------------ */

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

// Escape user input before placing it inside HTML email bodies.
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function clamp(s, n) {
  return String(s == null ? '' : s).trim().slice(0, n);
}

// Read + parse the JSON body, working both on Vercel (req.body pre-parsed)
// and on a raw Node http server (used by the local demo shim).
async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (_) { return {}; }
  }
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) return {};
  try { return JSON.parse(raw); } catch (_) { return {}; }
}

// Single Resend call.
// - With a key: sends via Resend.
// - No key + ALLOW_DRYRUN=1 (local demo): logs the email instead of sending.
// - No key in production: throws, so the handler returns 502 and the frontend
//   falls back to mailto: — visitor messages are never silently lost.
async function sendEmail(opts) {
  if (!RESEND_API_KEY) {
    if (process.env.ALLOW_DRYRUN !== '1') {
      throw new Error('RESEND_API_KEY is not configured');
    }
    console.log('\n──────── [DRY-RUN EMAIL] ────────');
    console.log('From:    ' + MAIL_FROM);
    console.log('To:      ' + opts.to);
    console.log('Reply-To:' + (opts.replyTo || '(none)'));
    console.log('Subject: ' + opts.subject);
    console.log('---- text ----');
    console.log(opts.text);
    console.log('─────────────────────────────────\n');
    return { id: 'dry-run', dryRun: true };
  }
  const payload = {
    from: MAIL_FROM,
    to: [opts.to],
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  };
  if (opts.replyTo) payload.reply_to = [opts.replyTo];

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + RESEND_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const detail = await r.text().catch(function () { return ''; });
    throw new Error('Resend ' + r.status + ': ' + detail);
  }
  return r.json();
}

/* ------------------------------ email content ------------------------------ */

function notifySubject(type, who) {
  if (type === 'guide') return 'Jauns AI ceļveža pieprasījums — ' + who;
  if (type === 'apply') return 'Jauns pieteikums apmācībām — ' + who;
  return 'Jauns kontaktpieprasījums — ' + who;
}

function notifyEmail(d) {
  const rows = [
    ['Tips', d.type],
    ['Vārds', d.name],
    d.surname ? ['Uzvārds', d.surname] : null,
    d.phone ? ['Tālrunis', d.phone] : null,
    ['E-pasts', d.email],
    d.interest ? ['Interesē', d.interest] : null,
    d.lang ? ['Valoda', d.lang] : null,
    d.message ? ['Ziņa', d.message] : null,
  ].filter(Boolean);

  const text = rows.map(function (r) { return r[0] + ': ' + r[1]; }).join('\n') +
    '\n\n— Nosūtīts no ' + SITE;

  const html =
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0a0f1c;line-height:1.6">' +
    '<h2 style="margin:0 0 12px">' + esc(notifySubject(d.type, d.who)) + '</h2>' +
    '<table cellpadding="0" cellspacing="0" style="border-collapse:collapse">' +
    rows.map(function (r) {
      return '<tr>' +
        '<td style="padding:4px 14px 4px 0;color:#64748b;vertical-align:top;white-space:nowrap">' + esc(r[0]) + '</td>' +
        '<td style="padding:4px 0;white-space:pre-wrap">' + esc(r[1]) + '</td>' +
        '</tr>';
    }).join('') +
    '</table>' +
    '<p style="margin-top:18px;color:#94a3b8;font-size:12px">Nosūtīts no <a href="' + SITE + '">' + SITE + '</a></p>' +
    '</div>';

  return { text: text, html: html };
}

// Formal Latvian auto-reply to the visitor.
function confirmationEmail(d) {
  const hello = d.name ? ('Labdien, ' + d.name + '!') : 'Labdien!';

  if (d.type === 'guide') {
    const subject = 'Paldies, ka pieteicies AI ceļvedim — ' + BRAND;
    const text =
      hello + '\n\n' +
      'Paldies, ka pieteicāties bezmaksas AI ceļvedim. Mēs to nosūtīsim Jums tuvākajā laikā uz šo e-pasta adresi.\n\n' +
      'Tikmēr aicinām izmēģināt mūsu bezmaksas rīkus: ' + SITE + '/tools/\n\n' +
      'Ar cieņu,\n' + BRAND + ' komanda\n' + NOTIFY_TO;
    return { subject: subject, text: text, html: wrapHtml(hello, [
      'Paldies, ka pieteicāties bezmaksas AI ceļvedim. Mēs to nosūtīsim Jums tuvākajā laikā uz šo e-pasta adresi.',
      'Tikmēr aicinām izmēģināt mūsu bezmaksas rīkus: <a href="' + SITE + '/tools/">' + SITE + '/tools/</a>',
    ]) };
  }

  // contact + apply: the formal confirmation requested by the business.
  const subject = 'Paldies, ka sazinājāties ar Intelekta Skolu';
  const paras = [
    'Paldies, ka sazinājāties ar Intelekta Skolu.',
    'Esam saņēmuši Jūsu pieteikumu un tuvākajā laikā ar Jums sazināsimies, lai sniegtu papildu informāciju par mūsu praktiskajām mākslīgā intelekta apmācībām, tostarp ChatGPT lietošanu, promptu inženieriju, automatizāciju un reālu AI risinājumu ieviešanu biznesā.',
    'Intelekta Skola palīdz profesionāļiem, komandām un uzņēmumiem apgūt mākslīgo intelektu tā, lai tas sniegtu praktisku un izmērāmu vērtību ikdienas darbā.',
  ];
  const text =
    hello + '\n\n' +
    paras.join('\n\n') + '\n\n' +
    'Ar cieņu,\n' + BRAND + ' komanda\n' + NOTIFY_TO;
  return { subject: subject, text: text, html: wrapHtml(hello, paras) };
}

function wrapHtml(hello, paras) {
  return '' +
    '<div style="background:#05070d;padding:28px 0;font-family:Arial,Helvetica,sans-serif">' +
    '<div style="max-width:560px;margin:0 auto;background:#0a0f1c;border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden">' +
    '<div style="padding:24px 28px 0">' +
    '<div style="font-size:18px;font-weight:800;color:#fff">Intelekta <span style="color:#60a5fa">Skola</span></div>' +
    '</div>' +
    '<div style="padding:18px 28px 28px;color:#cbd5e1;font-size:15px;line-height:1.7">' +
    '<p style="margin:0 0 14px;color:#fff;font-weight:600">' + esc(hello) + '</p>' +
    paras.map(function (p) { return '<p style="margin:0 0 14px">' + p + '</p>'; }).join('') +
    '<p style="margin:22px 0 0;color:#94a3b8">Ar cieņu,<br><strong style="color:#e2e8f0">Intelekta Skola komanda</strong><br>' +
    '<a href="mailto:' + NOTIFY_TO + '" style="color:#60a5fa;text-decoration:none">' + NOTIFY_TO + '</a></p>' +
    '</div>' +
    '<div style="padding:14px 28px;border-top:1px solid rgba(255,255,255,.06);color:#64748b;font-size:12px">' +
    '© ' + new Date().getFullYear() + ' SIA Intelekta Skola · <a href="' + SITE + '" style="color:#64748b">intelektaskola.lv</a>' +
    '</div></div></div>';
}

/* ------------------------------ handler ------------------------------ */

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  }

  let data;
  try {
    data = await readBody(req);
  } catch (_) {
    return sendJson(res, 400, { ok: false, error: 'Invalid body' });
  }

  // --- Spam protection #1: honeypot. Bots fill the hidden "company" field. ---
  if (clamp(data.company, 200)) {
    // Pretend success so bots get no signal.
    return sendJson(res, 200, { ok: true });
  }

  // --- Spam protection #2: time-on-page. Submissions faster than ~1.2s after
  //     the page loaded are almost certainly automated. `ts` is sent by the
  //     frontend as milliseconds since the form's page loaded. ---
  const ts = Number(data.ts);
  if (Number.isFinite(ts) && ts > 0 && ts < 1200) {
    return sendJson(res, 200, { ok: true });
  }

  const type = ['contact', 'apply', 'guide'].indexOf(String(data.type)) >= 0 ? String(data.type) : 'contact';
  const name = clamp(data.name, MAX.name);
  const surname = clamp(data.surname, MAX.surname);
  const phone = clamp(data.phone, MAX.phone);
  const interest = clamp(data.interest, MAX.interest);
  const email = clamp(data.email, MAX.email);
  const message = clamp(data.message, MAX.message);
  const lang = clamp(data.lang, 8);

  // --- Validation ---
  if (!EMAIL_RE.test(email)) {
    return sendJson(res, 422, { ok: false, error: 'Lūdzu, norādiet derīgu e-pasta adresi.' });
  }
  if (!name) {
    return sendJson(res, 422, { ok: false, error: 'Lūdzu, norādiet vārdu.' });
  }
  if (type !== 'guide' && !message) {
    return sendJson(res, 422, { ok: false, error: 'Lūdzu, ierakstiet ziņu.' });
  }

  const fullName = (name + ' ' + surname).trim();
  const who = fullName || email;

  const notify = notifyEmail({ type: type, name: name, surname: surname, phone: phone, email: email, interest: interest, message: message, lang: lang, who: who });
  const confirm = confirmationEmail({ type: type, name: name });

  // 1) Internal notification (critical). replyTo = visitor so staff can reply
  //    directly. If this fails, return 502 so the frontend falls back to
  //    mailto: and the lead is never lost.
  try {
    await sendEmail({
      to: NOTIFY_TO,
      replyTo: email,
      subject: notifySubject(type, who),
      text: notify.text,
      html: notify.html,
    });
  } catch (err) {
    console.error('[api/contact] notification failed:', err && err.message ? err.message : err);
    return sendJson(res, 502, { ok: false, error: 'E-pasta nosūtīšana neizdevās.' });
  }

  // 2) Formal Latvian confirmation to the visitor (best-effort). A failure here
  //    — e.g. the Resend domain is not yet verified, so non-account recipients
  //    are rejected — must NOT fail the submission: the business is already
  //    notified and the visitor should still see success.
  let confirmationSent = true;
  try {
    await sendEmail({
      to: email,
      replyTo: NOTIFY_TO,
      subject: confirm.subject,
      text: confirm.text,
      html: confirm.html,
    });
  } catch (err) {
    confirmationSent = false;
    console.error('[api/contact] confirmation failed (non-fatal):', err && err.message ? err.message : err);
  }

  return sendJson(res, 200, { ok: true, dryRun: !RESEND_API_KEY, confirmationSent: confirmationSent });
};
