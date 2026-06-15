import Seo from "../components/Seo";
import SectionIntro from "../components/SectionIntro";
import CtaButton from "../components/CtaButton";
import { SEO, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function ProgrammaPage() {
  const { lang } = useLanguage();
  const seo = SEO.programma[lang] || SEO.programma.lv;

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <SectionIntro
          badge="Programma"
          title="Sešas praktiskas tēmas — no promptiem līdz pārvaldībai."
          lead="Strukturēts ceļš: prompti, modeļi, produktivitāte, saturs, automatizācija un drošs AI."
        />
        <div className="grid-3" style={{ marginTop: "2rem" }}>
          {CARDS.map((c) => (
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
        <div className="callout">
          <h3>Nezini, kur sākt?</h3>
          <p>Piesakies bezmaksas 20–30 min diagnostikas sarunai — ieteikšu piemērotu programmu.</p>
          <CtaButton to="/kontakti">{t(CTA.contact, lang)}</CtaButton>
        </div>
      </div>
    </div>
  );
}

const CARDS = [
  {
    title: "Prompti un modeļi",
    text: "Skaidra komunikācija ar AI, advanced tehnikas un ChatGPT, Claude, Cursor, Copilot, Grok, Gemini salīdzinājums.",
    items: ["Kvalitatīvi rezultāti un verificēšana", "Kuru modeli kad izmantot", "Stiprās/vājās puses un demonstrācijas"],
  },
  {
    title: "Produktivitāte un saturs",
    text: "Ikdiena: e-pasti, sapulces, pētniecība, mārketinga teksti un SEO orientēti procesi.",
    items: ["Dokumenti, prezentācijas, protokoli", "Pētniecība un kopsavilkumi", "Satura melnraksti ar robežām"],
  },
  {
    title: "Automatizācija un drošība",
    text: "Vienkāršas automatizācijas, izstrādes atbalsts komandām, kas to vajag, un GDPR konteksts.",
    items: ["Automatizācijas bez dziļas programmēšanas", "Izstrādātājiem: Cursor un Copilot", "Datu aizsardzība un halucināciju mazināšana"],
  },
];
