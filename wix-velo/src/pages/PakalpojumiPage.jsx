import Seo from "../components/Seo";
import SectionIntro from "../components/SectionIntro";
import CtaButton from "../components/CtaButton";
import { SITE_CONFIG } from "../config";
import { SEO, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

const PRODUCTS = [
  {
    id: "training",
    name: "AI Apmācības",
    price: "150 EUR",
    subtitle: "Ievadlekcija",
    ctaKey: "buy_training",
    bullets: ["AI pamati + praktiska lietošana", "Prompti, darba plūsmas, šabloni", "Jautājumi un atbildes"],
  },
  {
    id: "automation",
    name: "AI Automatizācijas",
    price: "150 EUR",
    subtitle: "Boti, Aģenti",
    ctaKey: "buy_automation",
    bullets: ["Procesu automatizācija", "Čatboti / aģenti konkrētiem uzdevumiem", "Drošības un kvalitātes pārbaudes"],
  },
  {
    id: "integration",
    name: "AI Integrācija / Web izstrāde",
    price: "400 EUR",
    subtitle: null,
    ctaKey: "buy_integration",
    bullets: ["Integrācijas ar esošām sistēmām", "Web risinājums + AI funkcionalitāte", "Nodevums + īsa apmācība"],
  },
];

export default function PakalpojumiPage() {
  const { lang } = useLanguage();
  const seo = SEO.pakalpojumi[lang] || SEO.pakalpojumi.lv;

  const openStripe = (id) => {
    const url = SITE_CONFIG.stripe[id];
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <SectionIntro
          badge="Pakalpojumi"
          title="Mūsu pakalpojumi"
          lead="Piedāvājam trīs pielāgotas paketes — individuālas apmācības, digitālā transformācija un mārketinga integrācijas ar AI risinājumiem."
        />

        <div className="grid-3" style={{ marginTop: "2rem" }}>
          {CORE.map((c) => (
            <article key={c.title} className="card">
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul>
                {c.items.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="section__head" style={{ marginTop: "3rem" }}>
          <h2 className="h2">Pakalpojumi un cenas</h2>
          <p className="sublead">Ātrs starts vai konkrēta ieviešana. Pirkums notiek caur Stripe.</p>
        </div>

        <div className="grid-3">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="card">
              <h3>{p.name}</h3>
              <p>
                <strong>{p.price}</strong>
                {p.subtitle ? ` · ${p.subtitle}` : ""}
              </p>
              <ul>
                {p.bullets.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <button type="button" className="button" onClick={() => openStripe(p.id)}>
                {t(CTA[p.ctaKey], lang)}
              </button>
            </article>
          ))}
        </div>

        <div className="callout">
          <h3>Vajadzīgs piedāvājums?</h3>
          <p>Orientējošās cenas ir sākumlapā; galīgo piedāvājumu sagatavoju pēc ievada sarunas.</p>
          <CtaButton to="/kontakti">{t(CTA.contact, lang)}</CtaButton>
        </div>
      </div>
    </div>
  );
}

const CORE = [
  {
    title: "Individuālas AI apmācības un mentoringa programma",
    text: "Apgūsti mākslīgo intelektu savā tempā ar personīgu atbalstu. Neatkarīgi no tā, vai esi iesācējs vai pieredzējis lietotājs, mūsu individuālās nodarbības ir pielāgotas tieši tev.",
    items: [
      "Personalizētas apmācību sesijas (2–10 stundas)",
      "Praktiskas nodarbības ar tavām datu kopām",
      "Iespēja izvēlēties ilgtermiņa mentoringa programmu (1–3 mēneši)",
    ],
  },
  {
    title: "Digitālā transformācija: mājaslapas, čatboti un automatizācija",
    text: "Paplašini savu biznesu ar inteliģentiem un automatizētiem risinājumiem.",
    items: ["Pielāgoti AI risinājumi", "Čatboti pēc zīmola balss", "Automatizēti procesi"],
  },
  {
    title: "Mārketinga un AI integrācijas pakete",
    text: "Pacel savu mārketingu nākamajā līmenī ar AI instrumentiem.",
    items: ["Esošo mārketinga procesu analīze", "Apmācības komandai", "Stratēģisks plāns AI ieviešanai"],
  },
];
