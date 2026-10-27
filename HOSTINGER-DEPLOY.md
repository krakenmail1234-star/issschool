# Deploying to Hostinger

This site is **plain static HTML** (no build, no PHP, no database).
It is **not** a WordPress theme or plugin — do **not** upload it through
WordPress (Appearance → Themes / Plugins). Put the files directly into the
website folder (`public_html`) instead.

Forms work on any host: they post to Google Apps Script (`scripts/config.js`),
not to `api/contact.js` (that file is only for Vercel and is blocked on Hostinger).

---

## ⚠️ First: WordPress already in `public_html`?

If the domain currently runs WordPress, you must choose:

- **Replace WordPress with this site** → back up, then empty `public_html`
  (hPanel → Websites → *Manage* → Files → File Manager; or remove WordPress via
  hPanel → WordPress → Overview → ⋯ → Uninstall). Then use Option A or B below.
- **Keep WordPress and add this site beside it** → create a subdomain
  (e.g. `ai.intelektaskola.lv`, hPanel → Domains → Subdomains) and deploy into
  its folder. All links in the site are relative, so it also works in a subfolder.

Hostinger **Git deploy refuses a non-empty folder** — that is the usual
"why can't I deploy" error when WordPress is still there.

---

## Option A — File Manager (fastest, no Git)

1. On your PC run in PowerShell (repo root): `.\deploy\make-hostinger-zip.ps1`.
   It builds `hostinger-upload.zip` containing ONLY the public site.
2. hPanel → **File Manager** → open `public_html` (empty).
3. **Upload** `hostinger-upload.zip` → right-click → **Extract** → into `public_html`.
4. Make sure `index.html` and `.htaccess` sit directly in `public_html`
   (not in `public_html/hostinger-upload/`). Delete the zip.
5. Open https://www.intelektaskola.lv — done.

## Option B — Git (auto-update on every push)

1. hPanel → **Advanced → Git** →
   - Repository: `https://github.com/krakenmail1234-star/issschool.git`
   - Branch: `main`
   - Install path: **leave empty** (= `public_html`, must be empty)
2. **Create**, then **Deploy**.
3. Optional auto-deploy: click **Auto Deployment**, copy the webhook URL, add it in
   GitHub → Repo → Settings → Webhooks. Every push to `main` (including the weekly
   blog updates) then goes live automatically.

The whole repo is copied to the server, but `.htaccess` blocks the dev-only
parts (`wix-velo/`, `wix-export/`, `apps-script/`, `api/`, `deploy/`, `.agents/`,
`.claude/`, `*.md`, `docker-compose.yml`, …) with **403**.

---

## What `.htaccess` does

- Forces **HTTPS** and redirects `intelektaskola.lv` → `www.intelektaskola.lv`
  (matches the canonical URLs and sitemap).
- Clean URLs: `/par-mums` serves `par-mums.html` (old `.html` links still work).
- Blocks repo/dev files, disables directory listing.
- Gzip, browser caching, basic security headers.

## After going live

- SSL: hPanel → Security → SSL → make sure the certificate is active for both
  `intelektaskola.lv` and `www.intelektaskola.lv`.
- DNS: if the domain still points to Vercel, change the A/CNAME records to Hostinger
  (or switch nameservers to Hostinger).
- Google Search Console → submit `https://www.intelektaskola.lv/sitemap.xml`.
- Submit each form once (contact, apply, free guide) and check info@intelektaskola.lv.
