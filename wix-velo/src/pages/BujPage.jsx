import Seo from "../components/Seo";
import SectionIntro from "../components/SectionIntro";
import FaqAccordion from "../components/FaqAccordion";
import CtaButton from "../components/CtaButton";
import { SEO, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function BujPage() {
  const { lang } = useLanguage();
  const seo = SEO.buj[lang] || SEO.buj.lv;

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <SectionIntro
          badge="BUJ"
          title="Ātras atbildes. Bez liekvārdības."
          lead="Jautājumi par apmācību līmeni, prasībām, valodu un klātienes formātu."
        />
        <FaqAccordion />
        <div className="callout">
          <h3>Nezini, ar ko sākt?</h3>
          <p>Uzraksti īsi par mērķi un pašreizējo līmeni — ieteiksim nākamo soli.</p>
          <CtaButton to="/kontakti">{t(CTA.contact, lang)}</CtaButton>
        </div>
      </div>
    </div>
  );
}
