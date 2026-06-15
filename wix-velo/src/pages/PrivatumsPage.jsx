import Seo from "../components/Seo";
import { SEO } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";

export default function PrivatumsPage() {
  const { lang } = useLanguage();
  const seo = SEO.privatums[lang] || SEO.privatums.lv;

  return (
    <div className="section">
      <div className="container">
        <Seo title={seo.title} description={seo.description} />
        <h1 className="h1">Privātums un sīkdatnes</h1>
        <p className="lead" style={{ fontWeight: 600, color: "var(--text)" }}>
          Šī ir izglītības fokusa demonstrācija. Statiskajā versijā nav lietotāju kontu, maksājumu ne trekeru.
        </p>
        <p className="lead">
          Sīkdatņu josla saglabā izvēli lokālajā krātuvē (pieņemts / tikai nepieciešamās). Valodas izvēle tiek saglabāta
          tāpat. Šī veidne neiestata trešo pušu reklāmu sīkdatnes.
        </p>
      </div>
    </div>
  );
}
