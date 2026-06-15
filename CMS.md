# CMS — editable homepage courses (Sanity)

The homepage **course cards** can be edited from your Sanity studio
(project `eanw34a4`, dataset `production`) — no code changes needed. The website
reads courses via Sanity's public API and **falls back to the built-in default
courses** if none exist or the API isn't reachable, so the site never breaks.

## One-time setup

### 1. Add the schema to the studio
Already done in `studio-intelektask/schemaTypes/`:
- `course.ts` — the trilingual course type
- `index.ts` — registers it

Run the studio locally to confirm:
```bash
cd studio-intelektask
npm install
npm run dev      # opens http://localhost:3333
```

### 2. Make the dataset readable from the browser
In **https://www.sanity.io/manage** → project `eanw34a4`:
- **API → Datasets:** make `production` **Public** (so visitors can read published courses), **or** keep it private and use a read token (not covered here).
- **API → CORS origins:** add your website's address(es) with credentials **off**, e.g.
  `http://localhost:5179`, and your live domain `https://intelektaskola.lv`.

### 3. Add courses
In the studio, create **Course (homepage card)** documents:
- `order` controls the position; `icon` picks an icon; `stripeUrl` is the enroll link; `featured` highlights one card.
- Fill `titleLv/En/Ru`, `descLv/En/Ru`, `ctaLv/En/Ru`, optional `badgeLv/En/Ru`.
- **Publish.** Within a minute they replace the default cards on the homepage, in all three languages.

> Tip: recreate the 5 current courses first (AI ieviešana, ChatGPT un LLM meistarība,
> AI automatizācija sociālajiem tīkliem, Individuālais AI kurss, Promptu inženierija)
> so nothing visually changes — then edit freely.

## Where it's wired
- Front-end loader: `scripts/ai-home.js` → `loadCMSCourses()` (GROQ query, graceful fallback).
- If you later want the **hero/section text** editable too, we add a `siteSettings`
  singleton the same way.
