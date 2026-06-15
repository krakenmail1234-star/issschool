import Seo from "../components/Seo";
import SectionIntro from "../components/SectionIntro";
import ContactForm from "../components/ContactForm";
import { SITE_CONFIG } from "../config";
import { SEO } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function KontaktiPage() {
  const { lang } = useLanguage();
  const seo = SEO.kontakti[lang] || SEO.kontakti.lv;

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <SectionIntro
          badge="Kontakti"
          title="Sazināmies par jūsu AI mērķiem."
          lead="Uzraksti ziņu — piesakies bezmaksas diagnostikas sarunai vai pieprasi individuālu piedāvājumu."
        />
        <div className="grid-2" style={{ alignItems: "start" }}>
          <ContactForm showSecondary={false} />
          <aside className="card">
            <h3>{SITE_CONFIG.company.legalName}</h3>
            <p>
              Reģ. Nr.: {SITE_CONFIG.company.regNumber} · reģ. datums: {SITE_CONFIG.company.regDate}
            </p>
            <p>
              E-pasts: <a href={`mailto:${SITE_CONFIG.company.email}`}>{SITE_CONFIG.company.email}</a>
            </p>
            <p>Tel: {SITE_CONFIG.company.phones.join(", ")}</p>
            <p>
              <strong>Atbilde:</strong> 24–48 h
            </p>
            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1rem 0" }} />
            <p>
              <strong>Piezīme:</strong> Cenas ir orientējošas; galīgo piedāvājumu sagatavoju pēc ievada sarunas.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
