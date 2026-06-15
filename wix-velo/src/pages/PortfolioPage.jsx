import { useState } from "react";
import Seo from "../components/Seo";
import SectionIntro from "../components/SectionIntro";
import CtaButton from "../components/CtaButton";
import { SITE_CONFIG } from "../config";
import { SEO, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

const PROJECTS = [
  {
    title: "Korporatīvās AI apmācības",
    text: "Vairāku sesiju programma profesionālo pakalpojumu komandai: prompting, dokumentu plūsmas un droša ieviešana.",
  },
  {
    title: "Produktivitātes sprints",
    text: "Praktiski darbnīcu cikli ar ChatGPT, Claude un iekšējām veidnēm mārketingam un operācijām.",
  },
  {
    title: "Automatizācijas pilots",
    text: "Viegla automatizācijas plānošana ar pārskatīšanas cikliem — no rutīnas uz izmērāmu ietaupījumu nedēļā.",
  },
];

export default function PortfolioPage() {
  const { lang } = useLanguage();
  const seo = SEO.portfolio[lang] || SEO.portfolio.lv;
  const images = SITE_CONFIG.portfolioImages;
  const [slide, setSlide] = useState(0);

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <SectionIntro
          badge="Portfolio"
          title="Portfolio"
          lead="Izvēlēti projekti un sadarbības — no korporatīvām apmācībām līdz praktiskai AI ieviešanai komandās."
        />

        <div className="section__head">
          <h2 className="h2">Darbu piemēri</h2>
          <p className="sublead">Daži vizuāli piemēri no paveiktā.</p>
        </div>

        <div className="card gallery">
          <div className="gallery__viewport">
            <img src={images[slide]} alt="" onError={(e) => { e.currentTarget.src = SITE_CONFIG.heroImageUrl; }} />
          </div>
          <div className="gallery__controls">
            <button type="button" className="button button--ghost" onClick={() => setSlide((s) => (s === 0 ? images.length - 1 : s - 1))}>
              ‹
            </button>
            <span>
              {slide + 1} / {images.length}
            </span>
            <button type="button" className="button button--ghost" onClick={() => setSlide((s) => (s + 1) % images.length)}>
              ›
            </button>
          </div>
        </div>

        <div className="grid-3" style={{ marginTop: "2rem" }}>
          {PROJECTS.map((p) => (
            <article key={p.title} className="card">
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>

        <div className="callout">
          <h3>Vēlaties līdzīgu rezultātu?</h3>
          <p>Pastāstiet par komandu un mērķiem — piedāvāsim pielāgotu plānu.</p>
          <CtaButton to="/kontakti">{t(CTA.contact, lang)}</CtaButton>
        </div>
      </div>
    </div>
  );
}
