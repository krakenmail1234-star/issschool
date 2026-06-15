# Wix Velo Developer Brief — Intelekta Skola

**Copy everything below this line and paste it as your prompt/instructions for a Wix Velo developer (or Wix AI / Velo coding assistant).**

---

## PROJECT OVERVIEW

Build a multilingual marketing website for **Intelekta Skola** — a Latvian AI training company offering corporate and individual courses in ChatGPT, Claude, Cursor, GitHub Copilot, automation, and safe AI adoption.

- **Primary language:** Latvian (LV)
- **Secondary languages:** English (EN), Russian (RU) — use Wix Multilingual or Velo i18n
- **Domain (target):** intelektaskola.lv
- **Business email:** info@intelektaskola.lv
- **Payments:** Stripe Payment Links (no custom checkout — open external URLs)
- **Contact:** Wix Form → email to info@intelektaskola.lv (or Wix Inbox/CRM)
- **Reference:** Static HTML prototype exists in repo folder `wix-export/` with per-page `.md` content files

---

## VEL0 IMPLEMENTATION REQUIREMENTS

1. **Pages:** Create all pages listed in Site Map with correct slugs and SEO metadata.
2. **Header:** Sticky header, logo left, centered nav (desktop), hamburger menu (mobile ≤1060px) with full nav + language selector inside mobile menu.
3. **Footer:** Sticky at bottom on short pages; company info left, nav links right, social icons.
4. **Multilingual:** LV default; translate all UI strings and page content for EN and RU (see Navigation + key CTA translations).
5. **Stripe buttons:** `wixLocation.to()` or `window.open()` to Stripe URLs — open in new tab.
6. **Contact form:** Fields below; on submit send to info@intelektaskola.lv with subject prefix `Intelekta Skola — `.
7. **FAQ page:** Use repeater or FAQ element bound to FAQ dataset (10 items).
8. **Portfolio:** Pro Gallery / slideshow with 2 images (work-01.png, work-02.png).
9. **Cookie banner:** Optional; text provided below; link to Privātums page.
10. **Font:** Lexend (Google Fonts) or closest Wix match.
11. **Colors (design tokens):**
    - Background: `#fff9f0`
    - Panel/cards: `#ffffff`
    - Text: `#1a2332`
    - Muted text: `#3d4a5c`
    - Primary accent (buttons): `#e85d04`
    - Secondary accent: `#0ea5e9`
    - Border: `rgba(180, 100, 30, 0.2)`

---

## GLOBAL CONFIG (use in `public/config.js` or Velo constants)

```javascript
export const SITE_CONFIG = {
  brandName: "Intelekta Skola",
  tagline: "AI prasmju apmācības.",
  company: {
    legalName: "SIA Intelekta Skola",
    regNumber: "40203747500",
    regDate: "19.05.2026",
    email: "info@intelektaskola.lv",
    phones: ["+371 20771001", "+371 20771002", "+371 20771003"],
    emailSubjectPrefix: "Intelekta Skola — ",
  },
  logoUrl: "https://i.imgur.com/bsQTVXQ.png",
  social: {
    facebook: "https://www.facebook.com/intelektaskola",
    instagram: "https://www.instagram.com/intelektaskola/",
    linkedin: "https://www.linkedin.com/company/intelektaskola",
  },
  stripe: {
    training: "https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00",
    automation: "https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00",
    integration: "https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00",
  },
  discordInvite: "https://discord.com/invite/REPLACE_ME", // optional Kopiena page
};
```

---

## SITE MAP & SEO

| Page (LV) | Slug | SEO Title (LV) | SEO Description (LV) |
|-----------|------|----------------|----------------------|
| Sākums (Home) | `/` or `/home` | Intelekta Skola — stratēģiska pieeja AI, ML un LLM apguvei | Intelekta Skola: strukturētas, praktiski orientētas apmācības mākslīgajā intelektā, mašīnmācīšanās un lielo valodu modeļos. Ikdiena, bizness, izmērāmi rezultāti. |
| Programma | `/programma` | Programma — Intelekta Skola | Sešas apmācību tēmas: prompti, modeļi, produktivitāte, saturs, automatizācija, drošība. |
| Pakalpojumi | `/pakalpojumi` | Pakalpojumi — Intelekta Skola | Korporatīvās programmas, darbnīcas, nozaru moduļi un individuālais mentorings. |
| Portfolio | `/portfolio` | Portfolio — Intelekta Skola | Izvēlēti Intelekta Skola projekti AI apmācībās un ieviešanā. |
| BUJ | `/buj` | BUJ — Intelekta Skola | BUJ par AI apmācībām: iesācējiem, programmēšanu, valodu un klātieni. |
| Kontakti | `/kontakti` | Kontakti — Intelekta Skola | Piesakies bezmaksas konsultācijai vai jautā par korporatīvajām un individuālajām programmām. |
| Privātums | `/privatums` | Privātums — Intelekta Skola | Privātuma un sīkdatņu paziņojums Intelekta Skola vietnē. |
| Kopiena (optional) | `/kopiena` | Kopiena — Intelekta Skola | Pēcapmācību materiāli, ieraksti un slēgtā kopiena pēc vienošanās. |

---

## NAVIGATION

### Header menu (LV / EN / RU)

| LV | EN | RU | Internal page |
|----|----|-----|---------------|
| Programma | Programs | Программы | Programma |
| Pakalpojumi | Services | Услуги | Pakalpojumi |
| Portfolio | Portfolio | Портфолио | Portfolio |
| BUJ | FAQ | FAQ | BUJ |
| Kontakti | Contact | Контакты | Kontakti |

**Header CTA button:** Kontakti / Contact / Контакты → Kontakti page

### Footer nav links

Programma · Pakalpojumi · Portfolio · BUJ · Privātums · Kontakti

### Footer contact block (all pages)

```
Intelekta Skola
© [dynamic year] · AI prasmju apmācības.

SIA Intelekta Skola
Reģ. Nr.: 40203747500 · reģ. datums: 19.05.2026
Email: info@intelektaskola.lv
Tel: +371 20771001, +371 20771002, +371 20771003

Sekojiet mums
Facebook → https://www.facebook.com/intelektaskola
Instagram → https://www.instagram.com/intelektaskola/
LinkedIn → https://www.linkedin.com/company/intelektaskola
```

---

## PRODUCTS (Stripe — Pakalpojumi page)

| ID | Name (LV) | Price | Subtitle | Button (LV) | Stripe URL |
|----|-----------|-------|----------|-------------|------------|
| training | AI Apmācības | 150 EUR | Ievadlekcija | Iegādāties | https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00 |
| automation | AI Automatizācijas | 150 EUR | Boti, Aģenti | Iegādāties | https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00 |
| integration | AI Integrācija / Web izstrāde | 400 EUR | — | Rezervēt | https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00 |

### Product bullet points (LV)

**AI Apmācības (150 EUR · Ievadlekcija)**
- AI pamati + praktiska lietošana
- Prompti, darba plūsmas, šabloni
- Jautājumi un atbildes

**AI Automatizācijas (150 EUR · Boti, Aģenti)**
- Procesu automatizācija
- Čatboti / aģenti konkrētiem uzdevumiem
- Drošības un kvalitātes pārbaudes

**AI Integrācija / Web izstrāde (400 EUR)**
- Integrācijas ar esošām sistēmām
- Web risinājums + AI funkcionalitāte
- Nodevums + īsa apmācība

**Section intro above pricing cards:**
- Title: Pakalpojumi un cenas
- Subtitle: Ātrs starts vai konkrēta ieviešana. Pirkums notiek caur Stripe.

---

## CONTACT FORM (Kontakti page + optional on Home)

| Field | Type | Required | LV label |
|-------|------|----------|----------|
| name | text | yes | Vārds |
| email | email | yes | E-pasts |
| topic | dropdown | yes | Tēma |
| message | long text | yes | Ziņa |

**Topic dropdown options (LV):**
- Izvēlies (placeholder, disabled)
- Bezmaksas konsultācija
- Korporatīvās apmācības
- Individuālās apmācības / mentorings
- Cits jautājums

**Submit button:** Sūtīt ziņu  
**Secondary button:** Programma → Programma page  
**Fine print:** Pēc noklusējuma atveras e‑pasta klients (mailto). Vēlāk var pieslēgt servera risinājumu, nemainot lapas izkārtojumu.  
**Response SLA note:** 24–48 h

---

## FAQ DATA (BUJ page — 10 items, LV)

```javascript
export const FAQ_ITEMS_LV = [
  { q: "Vai apmācības ir piemērotas iesācējiem?", a: "Jā. Programmas tiek veidotas atbilstoši dalībnieku līmenim – no nulles līdz padziļinātam līmenim." },
  { q: "Vai ir nepieciešamas programmēšanas zināšanas?", a: "Nē, izņemot gadījumos, kad apmācām programmētājus ar Cursor un Copilot." },
  { q: "Kādā valodā notiek apmācības?", a: "Galvenokārt latviešu valodā, ar angļu terminoloģiju (kas ir standarts AI jomā)." },
  { q: "Vai varam saņemt apmācības klātienē?", a: "Jā – Rīgā, citās Latvijas pilsētās vai jūsu birojā." },
  { q: "Kā ilgi ilgst viena apmācība?", a: "Ievadlekcija parasti 1,5–2 stundas. Korporatīvās programmas tiek plānotas pēc jūsu mērķiem – no vienas dienas līdz vairākām nedēļām." },
  { q: "Kādus AI rīkus jūs apgūstat?", a: "ChatGPT, Claude, Cursor, GitHub Copilot un citus rīkus atbilstoši jūsu uzdevumiem – mārketings, dokumenti, automatizācija, izstrāde." },
  { q: "Kā notiek apmaksa?", a: "Pakalpojumus var iegādāties tiešsaistē caur Stripe. Korporatīvajiem projektiem sagatavojam individuālu piedāvājumu pēc sarunas." },
  { q: "Vai dati un konfidencialitāte ir nodrošināta?", a: "Jā. Apmācību laikā strādājam ar jūsu materiāliem droši; korporatīvajiem klientiem varam parakstīt NDA un lietot drošus rīkus." },
  { q: "Vai ir iespējama apmācība tikai vadībai?", a: "Jā. Piedāvājam īsas sesijas vadītājiem par AI stratēģiju, riskiem un ieviešanas prioritātēm bez tehniskām detaļām." },
  { q: "Kā pieteikties?", a: "Rakstiet uz info@intelektaskola.lv, izmantojiet kontaktu formu vai rezervējiet ievadlekciju caur Pakalpojumi lapu." },
];
```

**BUJ hero:**
- Badge: BUJ
- H1: Ātras atbildes. Bez liekvārdības.
- Lead: Jautājumi par apmācību līmeni, prasībām, valodu un klātienes formātu.

**BUJ CTA:**
- Title: Nezini, ar ko sākt?
- Text: Uzraksti īsi par mērķi un pašreizējo līmeni — ieteiksim nākamo soli.
- Button: Kontakti

---

## PAGE CONTENT — SĀKUMS (HOME)

### Hero
- Badge: `AI · ML · LLM`
- H1: `Intelekta Skola`
- Lead (bold): `Stratēģiska pieeja mākslīgā intelekta apguvei un ieviešanai`
- P1: `Intelekta Skola nodrošina strukturētas un praktiski orientētas apmācības mākslīgā intelekta (AI), mašīnmācīšanās (ML) un lielo valodu modeļu (LLM) izmantošanā. Mūsu pieeja balstās uz reālu pielietojumu — koncentrējoties uz to, kā šīs tehnoloģijas integrēt ikdienas darbā un biznesa procesos.`
- P2: `Mūsu mērķis ir ne tikai sniegt zināšanas, bet arī nodrošināt spēju tās efektīvi pielietot.`
- Button 1: `Pieteikties apmācībām` → Kontakti
- Button 2: `Skatīt programmas` → Programma
- Tags: `Praktiskas prasmes` · `Reāli biznesa scenāriji` · `Izmērāms efekts`
- Stats: Fokuss `AI · ML · LLM` | Pieeja `Struktūra · Prakse · Integrācija` | Auditorija `Uzņēmumi · Komandas · Individuāli`

### Section: Pakalpojumi
- H2: `Pakalpojumi`
- Subtitle: `Četras savstarpēji papildinošas jomas — no pamatiem līdz korporatīvai ieviešanai.`

**1. Mākslīgā intelekta apmācības**  
Strukturētas mācību programmas dažādiem sagatavotības līmeņiem.

*Iesācēju līmenis:*
- mākslīgā intelekta pamati
- praktiska darbība ar LLM rīkiem (piemēram, teksta ģenerēšana, analīze)
- darba procesu optimizācija ar AI

*Vidējais līmenis:*
- padziļināta LLM izmantošana
- efektīva pieprasījumu (prompt) veidošana
- darba automatizācija

*Uzlabotais līmenis:*
- AI risinājumu izstrādes principi
- integrācijas ar esošām sistēmām
- datu izmantošana un analīze

**2. Lielo valodu modeļu (LLM) praktiska izmantošana**  
Apmācību fokusā ir efektīva komunikācija ar AI sistēmām un to pielietojums:
- strukturēta pieeja prompt engineering
- dažādu AI rīku salīdzināšana un izvēle
- automatizētu risinājumu izveide
- satura, analītikas un klientu komunikācijas optimizācija

Dalībnieki apgūst, kā iegūt prognozējamu un kvalitatīvu rezultātu no AI sistēmām.

**3. AI ieviešana uzņēmumos**  
Mēs piedāvājam pilna cikla atbalstu uzņēmumiem.

*Situācijas analīze:* esošo procesu izvērtēšana; automatizācijas potenciāla identificēšana  
*Risinājumu izstrāde:* piemērotāko AI rīku izvēle; pielāgotu risinājumu izveide  
*Ieviešana un apmācība:* darbinieku apmācība; praktiska integrācija ikdienas darbā

Rezultātā uzņēmumi iegūst strukturētu un izmērāmu efektivitātes pieaugumu.

**4. AI izmantošana ikdienas darbā**  
Programmas ietver arī individuālu prasmju attīstību:
- ikdienas uzdevumu automatizācija
- informācijas apstrādes paātrināšana
- lēmumu pieņemšanas atbalsts
- personīgās produktivitātes paaugstināšana

Mērķis ir panākt būtisku laika ietaupījumu un darba kvalitātes uzlabošanos.

### Section: Metodoloģija
- H2: `Metodoloģija`
- Subtitle: `Mācību process balstās uz četriem galvenajiem principiem:`

| # | Title | Text |
|---|-------|------|
| 1 | Konceptu izpratne | Dalībnieki iegūst skaidru izpratni par AI darbības principiem. |
| 2 | Rīku apguve | Tiek apgūta praktiska darbība ar aktuālajiem AI risinājumiem. |
| 3 | Praktiska pielietošana | Reāli uzdevumi un scenāriji nodrošina tūlītēju zināšanu pielietojumu. |
| 4 | Integrācija | Dalībnieki iemācās integrēt AI savā ikdienas darbā vai uzņēmuma procesos. |

### Section: Piedāvājuma struktūra
- H2: `Piedāvājuma struktūra`

**Pamata programma** (pill: Iesācējiem)  
Piemērota iesācējiem bez iepriekšējas pieredzes.  
Ietver: AI pamatus; darbu ar LLM rīkiem; praktiskus uzdevumus  
Rezultāts: spēja patstāvīgi izmantot AI ikdienas uzdevumos.

**Profesionālā programma** (pill: Padziļināti)  
Paredzēta lietotājiem ar sākotnējām zināšanām.  
Ietver: padziļinātu LLM izmantošanu; procesu automatizāciju; biznesa pielietojumus  
Rezultāts: būtiska produktivitātes paaugstināšana un efektīvāka darba organizācija.

**Korporatīvie risinājumi** (pill: Uzņēmumiem)  
Individuāli pielāgoti uzņēmumiem.  
Ietver: procesu analīzi; AI ieviešanas stratēģiju; komandas apmācību  
Rezultāts: strukturēta AI integrācija un izmērāms darbības uzlabojums.

### Section: Aicinājums
- Title: `Aicinājums uz darbību`
- Text: `Mākslīgais intelekts kļūst par būtisku darba un biznesa sastāvdaļu. Savlaicīga tā apguve nodrošina konkurences priekšrocības. Piesakieties apmācībām un uzsāciet strukturētu darbu ar mākslīgo intelektu jau šodien.`
- Button: `Pieteikties apmācībām` → Kontakti

### Section: Kontakti (on home — optional duplicate)
- H2: `Kontakti`
- Subtitle: `Uzrakstiet mums — par pamata, profesionālo vai korporatīvo programmu, kā arī par individuālu konsultāciju.`
- (Same form as Kontakti page)

---

## PAGE CONTENT — PROGRAMMA

**Hero:**
- Badge: Programma
- H1: Sešas praktiskas tēmas — no promptiem līdz pārvaldībai.
- Lead: Strukturēts ceļš: prompti, modeļi, produktivitāte, saturs, automatizācija un drošs AI.

**Card 1 — Prompti un modeļi**  
Skaidra komunikācija ar AI, advanced tehnikas un ChatGPT, Claude, Cursor, Copilot, Grok, Gemini salīdzinājums.
- Kvalitatīvi rezultāti un verificēšana
- Kuru modeli kad izmantot
- Stiprās/vājās puses un demonstrācijas

**Card 2 — Produktivitāte un saturs**  
Ikdiena: e-pasti, sapulces, pētniecība, mārketinga teksti un SEO orientēti procesi.
- Dokumenti, prezentācijas, protokoli
- Pētniecība un kopsavilkumi
- Satura melnraksti ar robežām

**Card 3 — Automatizācija un drošība**  
Vienkāršas automatizācijas, izstrādes atbalsts komandām, kas to vajag, un GDPR konteksts.
- Automatizācijas bez dziļas programmēšanas
- Izstrādātājiem: Cursor un Copilot
- Datu aizsardzība un halucināciju mazināšana

**CTA:** Nezini, kur sākt? → Piesakies bezmaksas 20–30 min diagnostikas sarunai — ieteikšu piemērotu programmu. → Button: Kontakti

---

## PAGE CONTENT — PAKALPOJUMI

**Hero:**
- Badge: Pakalpojumi
- H1: Mūsu pakalpojumi
- Lead: Piedāvājam trīs pielāgotas paketes — individuālas apmācības, digitālā transformācija un mārketinga integrācijas ar AI risinājumiem.

**Core offering 1 — Individuālas AI apmācības un mentoringa programma**  
Apgūsti mākslīgo intelektu savā tempā ar personīgu atbalstu. Neatkarīgi no tā, vai esi iesācējs vai pieredzējis lietotājs, mūsu individuālās nodarbības ir pielāgotas tieši tev. Mēs ne tikai mācam teoriju, bet arī palīdzam praktiski pielietot AI rīkus, risinot tieši tavus uzdevumus un izaicinājumus.
- Personalizētas apmācību sesijas (2–10 stundas)
- Praktiskas nodarbības ar tavām datu kopām
- Iespēja izvēlēties ilgtermiņa mentoringa programmu (1–3 mēneši)

**Core offering 2 — Digitālā transformācija: mājaslapas, čatboti un automatizācija**  
Paplašini savu biznesu ar inteliģentiem un automatizētiem risinājumiem. Mēs izstrādājam modernas mājaslapas, integrējot AI balstītus čatbotus un pielāgotus tīmekļa robotus. No klientu atbalsta automatizācijas līdz iekšējo datu procesu optimizācijai — mēs radām rīkus, kas ietaupa laiku un uzlabo klientu pieredzi.
- Pielāgoti AI risinājumi
- Čatboti, kas atbilst tavai zīmola balss un zināšanu bāzei
- Automatizēti procesi, kas aizstāj manuālo darbu

**Core offering 3 — Mārketinga un AI integrācijas pakete**  
Pacel savu mārketingu nākamajā līmenī. Mēs palīdzam apvienot tradicionālo mārketingu ar moderniem AI rīkiem, ieviešot mārketinga automatizāciju, AI atbalstītu satura radīšanu un datu analīzi.
- Esošo mārketinga procesu analīze
- Apmācības komandai par AI rīkiem satura un sociālo tīklu pārvaldībā
- Stratēģisks plāns AI instrumentu ieviešanai

*(Then pricing section — see PRODUCTS above)*

**CTA:** Vajadzīgs piedāvājums? → Orientējošās cenas ir sākumlapā; galīgo piedāvājumu sagatavoju pēc ievada sarunas. → Kontakti

---

## PAGE CONTENT — PORTFOLIO

**Hero:**
- Badge: Portfolio
- H1: Portfolio
- Lead: Izvēlēti projekti un sadarbības — no korporatīvām apmācībām līdz praktiskai AI ieviešanai komandās.

**Gallery:**
- H2: Darbu piemēri
- Subtitle: Daži vizuāli piemēri no paveiktā.
- Images: `work-01.png`, `work-02.png` (upload to Wix Media)

**Optional project cards:**
1. **Korporatīvās AI apmācības** — Vairāku sesiju programma profesionālo pakalpojumu komandai: prompting, dokumentu plūsmas un droša ieviešana.
2. **Produktivitātes sprints** — Praktiski darbnīcu cikli ar ChatGPT, Claude un iekšējām veidnēm mārketingam un operācijām.
3. **Automatizācijas pilots** — Viegla automatizācijas plānošana ar pārskatīšanas cikliem — no rutīnas uz izmērāmu ietaupījumu nedēļā.

**CTA:** Vēlaties līdzīgu rezultātu? → Pastāstiet par komandu un mērķiem — piedāvāsim pielāgotu plānu. → Kontakti

---

## PAGE CONTENT — KONTAKTI

**Hero:**
- Badge: Kontakti
- H1: Sazināmies par jūsu AI mērķiem.
- Lead: Uzraksti ziņu — piesakies bezmaksas diagnostikas sarunai vai pieprasi individuālu piedāvājumu.

**Info card:**
- SIA Intelekta Skola
- Reģ. Nr.: 40203747500 · reģ. datums: 19.05.2026
- E-pasts: info@intelektaskola.lv
- Tel: +371 20771001, +371 20771002, +371 20771003
- Atbilde: 24–48 h

**Sidebar:**
- Kontaktinformācija + quick links to Programma, Pakalpojumi, Kontakti
- Piezīme: Cenas ir orientējošas; galīgo piedāvājumu sagatavoju pēc ievada sarunas.

---

## PAGE CONTENT — PRIVĀTUMS

- H1: Privātums un sīkdatnes
- Lead: Šī ir izglītības fokusa demonstrācija. Statiskajā versijā nav lietotāju kontu, maksājumu ne trekeru.
- Body: Sīkdatņu josla saglabā izvēli lokālajā krātuvē (pieņemts / tikai nepieciešamās). Valodas izvēle tiek saglabāta tāpat. Šī veidne neiestata trešo pušu reklāmu sīkdatnes.

**Cookie banner (if implemented):**
- Text: Mēs saglabājam valodas izvēli lokāli un izmantojam tikai nepieciešamās sīkdatnes, lai lapa darbotos. Sīkāk — privātuma paziņojumā.
- Buttons: Pieņemt · Tikai nepieciešamās · Privātuma politika → Privātums

---

## PAGE CONTENT — KOPIENA (optional, not in main nav)

- Badge: Discord
- H1: Kopiena, nevis troksnis.
- Lead: Pārskati, ietvari, jautājumi–atbildes un kultūra ar tīru izpildi.
- List: Nedēļas pārskatus un watchlistus; Live Q&A sesijas; Tirdzniecības analīzes struktūru; Resursus un veidnes
- Button: Atvērt Discord ielūgumu → `https://discord.com/invite/REPLACE_ME`
- Button: Uzdot jautājumu → Kontakti

---

## PRIMARY CTA STRINGS (LV / EN / RU)

| Key | LV | EN | RU |
|-----|----|----|-----|
| hero_cta_primary | Pieteikties bezmaksas konsultācijai | Book a free consultation | Записаться на бесплатную консультацию |
| hero_cta_secondary | Skatīt programmas | View programs | Смотреть программы |
| cta_contact | Kontakti | Contact | Контакты |
| services_buy_training | Iegādāties | Purchase | Купить |
| services_buy_automation | Iegādāties | Purchase | Купить |
| services_buy_integration | Rezervēt | Reserve | Забронировать |
| contact_form_send | Sūtīt ziņu | Send message | Отправить сообщение |

---

## ASSETS TO UPLOAD

| Asset | URL / path |
|-------|------------|
| Logo + favicon | https://i.imgur.com/bsQTVXQ.png |
| Portfolio image 1 | assets/work/work-01.png |
| Portfolio image 2 | assets/work/work-02.png |

---

## VEL0 CODE HINTS (optional)

```javascript
// masterPage.js — set footer year
import wixWindow from 'wix-window';
$w.onReady(() => {
  if ($w('#footerYear')) $w('#footerYear').text = String(new Date().getFullYear());
});

// Stripe button handler
export function btnBuyTraining_click() {
  wixLocation.to("https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00");
}

// FAQ repeater
import { FAQ_ITEMS_LV } from 'public/faqData';
$w.onReady(() => {
  $w('#faqRepeater').data = FAQ_ITEMS_LV.map((item, i) => ({ _id: String(i), ...item }));
});
```

---

## DELIVERABLES CHECKLIST

- [ ] 7 core pages (+ optional Kopiena) with correct slugs
- [ ] Responsive header with working mobile hamburger menu
- [ ] Footer on all pages with company info, social links, nav
- [ ] LV / EN / RU multilingual (at minimum nav + CTAs; ideally full page content)
- [ ] Contact form wired to info@intelektaskola.lv
- [ ] 3 Stripe product buttons on Pakalpojumi
- [ ] FAQ accordion with 10 items on BUJ
- [ ] Portfolio gallery with 2 images
- [ ] SEO title + description per page
- [ ] Logo + favicon from provided URL
- [ ] Cookie/privacy text on Privātums page

---

**End of Velo developer brief.**
