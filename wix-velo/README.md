# Intelekta Skola — Wix Velo Implementation

Complete reference implementation for the [VELO developer brief](../wix-export/VELO-DEVELOPER-PROMPT.md).

**Fixes vs. typical Wix AI output:** light palette (`#fff9f0` background), correct Latvian slugs, Stripe in new tab, mailto contact form, 10-item FAQ, mobile menu ≤1060px.

## Local preview (React)

```bash
cd wix-velo
npm install
npm run dev
```

Build static export:

```bash
npm run build
npm run preview
```

## Wix Editor setup

### 1. Pages & slugs

| Page | Slug |
|------|------|
| Sākums | `/` |
| Programma | `/programma` |
| Pakalpojumi | `/pakalpojumi` |
| Portfolio | `/portfolio` |
| BUJ | `/buj` |
| Kontakti | `/kontakti` |
| Privātums | `/privatums` |
| Kopiena (optional) | `/kopiena` |

Set SEO title + description per page from the brief (or `src/i18n/translations.js` → `SEO`).

### 2. Design tokens (Site Design)

| Token | Value |
|-------|-------|
| Background | `#fff9f0` |
| Panels | `#ffffff` |
| Text | `#1a2332` |
| Muted | `#3d4a5c` |
| Primary | `#e85d04` |
| Secondary | `#0ea5e9` |
| Font | Lexend |

### 3. Velo public files

Copy into Wix **Public** tab:

- `public/config.js`
- `public/faqData.js`

### 4. Page code

Copy handlers from `velo/`:

- `velo/masterPage.js` → **masterPage.js**
- `velo/pages/buj.js` → BUJ page code (bind `#faqRepeater`)
- `velo/pages/pakalpojumi.js` → Stripe button handlers
- `velo/pages/kontakti.js` → form submit (mailto fallback)

### 5. Element IDs (suggested)

**masterPage:** `#footerYear`, `#footerEmail`

**BUJ:** `#faqRepeater` with `#faqQuestion`, `#faqAnswer` in item template

**Pakalpojumi:** `#btnBuyTraining`, `#btnBuyAutomation`, `#btnBuyIntegration`

**Kontakti:** Wix Form fields `name`, `email`, `topic`, `message`

### 6. Assets

Upload to Media Manager:

- Logo: https://i.imgur.com/bsQTVXQ.png
- `assets/work/work-01.png`, `work-02.png` (from parent repo when available)

### 7. Multilingual

Option A: **Wix Multilingual** — translate menu + page content (LV default).

Option B: **Velo i18n** — use `src/i18n/translations.js` patterns; store language in `localStorage` / `wix-storage`.

### 8. React components (`src/`)

If using Wix custom elements or exporting from this repo:

- `src/components/` — Header, Footer, ContactForm, FaqAccordion, CookieBanner
- `src/pages/` — one file per page with brief content

Use this folder as the source of truth when Wix AI credits run out or the preview theme drifts (e.g. dark mode).

## Checklist

- [x] 7 core pages + optional Kopiena
- [x] Sticky header, hamburger ≤1060px
- [x] Footer with company block + social
- [x] LV / EN / RU nav + CTAs
- [x] Contact form → mailto with subject prefix
- [x] 3 Stripe products on Pakalpojumi
- [x] FAQ accordion (10 items)
- [x] Portfolio gallery (2 images)
- [x] SEO metadata per page
- [x] Cookie banner + Privātums copy
