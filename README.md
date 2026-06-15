# Intelekta Skola — website

Static, blue/white/black dark site for an AI education business (Latvian by default,
with EN / RU language switch). No build step — plain HTML + Tailwind (CDN) + vanilla JS.

## Structure

```
index.html              Landing page (hero, courses, free tools, why, roadmap, contact, CTA)
program.html            Courses / program detail
contact.html            Contact + company info + form
privacy.html            Privacy & cookies
assets/
  logo-is.svg           Logo + favicon (used everywhere)
styles/
  aurora.css            Shared blue dark theme (glass, glow, reveal, fields, buttons)
scripts/
  ai-home.js            Landing logic: i18n (LV/EN/RU), Three.js hero, reveals, free-guide modal
  icons.js              Shared professional SVG icon set (isIcon())
  pages.js              Shared i18n + form handling for the standalone pages
tools/
  index.html            Free-tools hub
  prompt-darbnica/      Prompt workshop (index.html + app.js)
  laika-kalkulators/    Time / ROI calculator
  ai-gatavibas-tests/   AI readiness quiz
```

## Run locally

```bash
python -m http.server 5179
# open http://localhost:5179/index.html
```

## Language

Latvian is the default. The header has an LV / EN / RU switch; the choice is stored in
`localStorage` (`is_lang`) and shared across all pages. Landing copy lives in `scripts/ai-home.js`;
standalone-page copy lives inline in each page as `window.PAGE_I18N`.

## Payments

Stripe payment links are wired into the "Pieteikties / Enroll" buttons.

## Theming

All pages share `styles/aurora.css`. Brand colour is electric blue (`--brand #3b82f6`,
`--electric #60a5fa`) on near-black (`--bg #05070d`). To restyle, edit the CSS variables there.
