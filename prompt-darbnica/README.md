# Promptu Darbnīca — interactive prompt builder

A standalone lead-magnet tool for intelektaskola.lv. A visiting business owner picks
an everyday business scenario, fills in a few fields, and instantly gets a polished,
copy-ready AI prompt (for ChatGPT / Claude) plus a before/after example.

## Run

It's a static page. From the repo root:

```bash
python -m http.server 5179
# open http://localhost:5179/prompt-darbnica/index.html
```

## Files

- `index.html` — page shell, Tailwind (via CDN) config, brand styles, 3D scene markup.
- `app.js` — scenario data + prompt templates, form builder, 3D tilt, flip card, copy.

## Design

- Brand palette from the main site (`--accent #e85d04`, `--sky #0ea5e9`, cream bg, Lexend).
- 3D depth: pointer-tracked tilt on cards, a perspective flip card (prompt ↔ example),
  glassmorphism panels, floating blurred gradient blobs.

## Add / edit scenarios

Edit the `SCENARIOS` array in `app.js`. Each entry has `fields` (the form), a
`prompt(values)` builder, and an `example` (before/after). No build step needed.

## Note

Tailwind is loaded from the CDN for a zero-build demo (it prints a console notice).
For production, swap to the Tailwind CLI/PostCSS build to ship tree-shaken CSS.

## Link it from the site

Add to the nav in `index.html` (and partials), e.g.:

```html
<a class="nav__link" href="./prompt-darbnica/index.html">Promptu Darbnīca</a>
```
