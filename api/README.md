# Email backend — Vercel Serverless Function (`/api/contact`)

The website's forms (contact form, course application "Pieteikties" modal, and the
free‑guide popup) all POST to **`/api/contact`**, a Vercel serverless function.
For every submission it:

1. Sends an **internal notification** to `info@intelektaskola.lv` (Reply‑To = the
   visitor, so staff can reply directly).
2. Sends the visitor a **formal Latvian confirmation** (auto‑reply).

Email is delivered through **[Resend](https://resend.com)** via its REST API. The
function has **zero npm dependencies** (it uses Node's built‑in `fetch`), so the
static site stays completely build‑less. The API key lives only in a server‑side
environment variable and is never exposed to the browser.

---

## 1. Create a Resend account & verify the domain

1. Sign up at <https://resend.com> (free tier ≈ 3,000 emails/month, 100/day).
2. **Domains → Add Domain →** `intelektaskola.lv`.
3. Add the DNS records Resend shows you (SPF, DKIM, and the MX/`send` records) at
   your domain registrar. Verification usually completes within minutes.
4. Once the domain is **Verified**, you can send *from* `info@intelektaskola.lv`.
5. **API Keys → Create API Key** (Sending access). Copy it — it looks like
   `re_xxxxxxxxxxxxxxxxxxxxxxxxx`. You will paste it into Vercel below.

> Until the domain is verified you can still test by setting
> `MAIL_FROM="Intelekta Skola <onboarding@resend.dev>"`, but Resend will then
> only deliver to **your own** Resend account email. Use a verified domain for
> real visitor confirmations.

---

## 2. Set environment variables in Vercel

Vercel dashboard → your project **intelektskola** → **Settings → Environment
Variables**. Add these for **Production** (and Preview, if you want previews to
send mail):

| Name             | Value                                            | Notes                              |
| ---------------- | ------------------------------------------------ | ---------------------------------- |
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxxxxxxxxxxx`                    | **Secret.** Server‑side only.      |
| `MAIL_FROM`      | `Intelekta Skola <info@intelektaskola.lv>`       | Must be on the verified domain.    |
| `NOTIFY_TO`      | `info@intelektaskola.lv`                         | Optional — this is the default.    |

After adding/changing variables, **redeploy** so they take effect (Deployments →
⋯ → Redeploy, or just push a commit).

> **Local CLI testing:** add the same keys to `.env.local` (already git‑ignored)
> and run `vercel dev`. To test the flow **without** sending real email, set
> `ALLOW_DRYRUN=1` and leave `RESEND_API_KEY` unset — the function then logs the
> emails to the console and returns `{ ok: true }` instead of sending.
>
> ⚠️ **Production safety:** in production (no `ALLOW_DRYRUN`), if `RESEND_API_KEY`
> is missing the function returns `502`, and the site automatically falls back to
> opening the visitor's email client (`mailto:`). So deploying before the key is
> set never silently drops a visitor's message — it just behaves like the old
> mailto flow until you add the key.

---

## 3. How it's wired (no further code changes needed)

- **`api/contact.js`** — the serverless function (validation, spam checks, sends
  both emails).
- **`scripts/config.js`** — defines `window.ISsendForm(payload)`, which every
  form already calls. It POSTs JSON to `apiEndpoint` (`/api/contact`). If the
  request fails, each form gracefully falls back to opening the visitor's email
  client (`mailto:`), so nothing ever breaks.

`payload.type` is one of `contact`, `apply`, or `guide`, which selects the
notification subject and confirmation wording.

---

## 4. Validation & spam protection

Built in:

- **Honeypot** — a hidden `company` field. If a bot fills it, the API returns
  success but sends nothing.
- **Time‑on‑page** — submissions faster than 1.2 s after page load are treated as
  bots (silently dropped).
- **Server‑side validation** — email format, required name, required message
  (for contact/apply); inputs are length‑clamped and HTML‑escaped in email bodies.
- **Method/Reply‑To hardening** — only `POST` is accepted; notification Reply‑To
  is the visitor so replies go to the right place.

Recommended upgrades (optional, when volume grows):

- **Cloudflare Turnstile** or **Google reCAPTCHA v3** — add a token to the form
  and verify it server‑side in `api/contact.js` before sending.
- **Rate limiting** — e.g. Vercel KV / Upstash Redis to cap submissions per IP
  per minute (`req.headers['x-forwarded-for']`).
- **DMARC** — add a `_dmarc` TXT record to improve deliverability/anti‑spoofing.

---

## 5. Going live (checklist)

- [ ] Resend domain `intelektaskola.lv` verified (SPF + DKIM green).
- [ ] `RESEND_API_KEY`, `MAIL_FROM`, `NOTIFY_TO` set in Vercel (Production).
- [ ] Redeploy.
- [ ] Submit the live contact form once — confirm the notification arrives at
      `info@intelektaskola.lv` **and** the visitor address receives the Latvian
      confirmation.
