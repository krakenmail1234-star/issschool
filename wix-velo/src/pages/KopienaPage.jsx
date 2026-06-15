import Seo from "../components/Seo";
import SectionIntro from "../components/SectionIntro";
import CtaButton from "../components/CtaButton";
import { SITE_CONFIG } from "../config";
import { SEO, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function KopienaPage() {
  const { lang } = useLanguage();
  const seo = SEO.kopiena[lang] || SEO.kopiena.lv;

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <SectionIntro
          badge="Discord"
          title="Kopiena, nevis troksnis."
          lead="Pārskati, ietvari, jautājumi–atbildes un kultūra ar tīru izpildi."
        />
        <ul>
          <li>Nedēļas pārskatus un watchlistus</li>
          <li>Live Q&A sesijas</li>
          <li>Tirdzniecības analīzes struktūru</li>
          <li>Resursus un veidnes</li>
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.5rem" }}>
          <CtaButton href={SITE_CONFIG.discordInvite} external>
            Atvērt Discord ielūgumu
          </CtaButton>
          <CtaButton to="/kontakti" variant="ghost">
            {t({ lv: "Uzdot jautājumu", en: "Ask a question", ru: "Задать вопрос" }, lang)}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
