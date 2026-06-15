# Images, links & buttons reference

Copy this when setting up media, buttons, and external links in Wix.

---

## Logo & favicon

| Asset | Source |
|-------|--------|
| Logo / favicon | https://i.imgur.com/bsQTVXQ.png |
| Local copy | `assets/` folder in project (if present) |

Upload to Wix **Media Manager** and use on header + browser icon (Settings → Website → Favicon).

---

## Portfolio images

Upload from your computer:

| File | Use on |
|------|--------|
| `assets/work/work-01.png` | Portfolio gallery slide 1 |
| `assets/work/work-02.png` | Portfolio gallery slide 2 |

---

## Stripe payment links

Use as **Button → Web address** on Pakalpojumi page:

| Product | Button label | URL |
|---------|--------------|-----|
| AI Apmācības (150 EUR) | Iegādāties | https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00 |
| AI Automatizācijas (150 EUR) | Iegādāties | https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00 |
| AI Integrācija / Web (400 EUR) | Rezervēt | https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00 |

Open links in **new tab** if you prefer users to stay on your site.

---

## Contact

| Type | Value |
|------|-------|
| Email | info@intelektaskola.lv |
| Phone | +371 20771001 |
| Phone | +371 20771002 |
| Phone | +371 20771003 |
| Company | SIA Intelekta Skola |
| Registration | Reģ. Nr.: 40203747500 · reģ. datums: 19.05.2026 |

---

## Social media

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/intelektaskola |
| Instagram | https://www.instagram.com/intelektaskola/ |
| LinkedIn | https://www.linkedin.com/company/intelektaskola |

**Wix:** Add Social Bar in footer or use social icons linked to these URLs.

---

## Internal page links (Wix menu)

When building menu, link to Wix pages — not `.html` files:

| Label | Wix page |
|-------|----------|
| Sākums | Home |
| Programma | Programma |
| Pakalpojumi | Pakalpojumi |
| Portfolio | Portfolio |
| BUJ | BUJ |
| Kontakti | Kontakti |
| Privātums | Privātums |

---

## Primary CTA buttons (used across site)

| Button text (LV) | Links to |
|------------------|----------|
| Pieteikties apmācībām | Kontakti |
| Pieteikties bezmaksas konsultācijai | Kontakti |
| Skatīt programmas | Programma |
| Kontakti | Kontakti |
| Iegādāties | Stripe URL (see above) |
| Rezervēt | Stripe URL (see above) |
| Sūtīt ziņu | Form submit |

---

## Multilingual (optional)

If you enable **Wix Multilingual**, translate menu labels:

| LV | EN | RU |
|----|----|-----|
| Programma | Programs | Программы |
| Pakalpojumi | Services | Услуги |
| Portfolio | Portfolio | Портфолио |
| BUJ | FAQ | FAQ |
| Kontakti | Contact | Контакты |
| Privātums | Privacy | Конфиденциальность |

Full EN/RU copy for dynamic strings lives in `scripts/site.js` in the main project (search `I18N`).
