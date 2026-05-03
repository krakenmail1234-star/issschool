# Investiciju Skola — Static Site

School for learning trading, forex, and more. Modern, minimal front-end for a financial markets education + Discord + mentorship website.

## Pages

- `index.html` (landing)
- `program.html`
- `discord.html`
- `mentorship.html`
- `faq.html`
- `about.html`
- `services.html`
- `contact.html`

Navigation links to About/Services/Contacts are set to open in a **new tab** and the pages share the **same CSS**.
Program/Discord/Mentorship/FAQ are also separate pages (no scrolling sections required).

## Run locally

Any simple static server works.

### Option 1: VS Code / Cursor “Live Server”

Open `index.html` and start Live Server.

### Option 2: Node (http-server)

```bash
npx http-server -p 5173 .
```

Then open `http://localhost:5173`.

### Option 3: Python

```bash
python -m http.server 5173
```

## Theme options (3 styles)

The site uses:

- Shared layout + components: `styles/base.css`
- Active theme tokens: `styles/theme.css`

To switch the look, copy one of these into `styles/theme.css`:

- `styles/themes/theme-neon-grid.css`
- `styles/themes/theme-quantum-slate.css`

Default theme is the minimal modern theme in `styles/theme.css`.

## Customize content

- Discord invite: edit `discordInviteUrl` in `scripts/site.js`
- Contact email: edit `contactEmail` in `scripts/site.js`
