import Seo from "../components/Seo";
import CtaButton from "../components/CtaButton";
import ContactForm from "../components/ContactForm";
import { SITE_CONFIG } from "../config";
import { SEO, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import "./HomePage.css";

export default function HomePage() {
  const { lang } = useLanguage();
  const seo = SEO.home[lang] || SEO.home.lv;

  return (
    <>
      <Seo title={seo.title} description={seo.description} />

      <section className="hero section">
        <div className="container hero__inner">
          <div className="hero__copy">
            <div className="badge">
              <span className="badge__dot" aria-hidden="true" />
              <span>AI · ML · LLM</span>
            </div>
            <h1 className="h1">
              <span className="text-gradient">Intelekta Skola</span>
            </h1>
            <p className="lead" style={{ fontWeight: 600, color: "var(--text)" }}>
              Stratēģiska pieeja mākslīgā intelekta apguvei un ieviešanai
            </p>
            <p className="lead">
              Intelekta Skola nodrošina strukturētas un praktiski orientētas apmācības mākslīgā intelekta (AI),
              mašīnmācīšanās (ML) un lielo valodu modeļu (LLM) izmantošanā. Mūsu pieeja balstās uz reālu pielietojumu —
              koncentrējoties uz to, kā šīs tehnoloģijas integrēt ikdienas darbā un biznesa procesos.
            </p>
            <p className="lead">Mūsu mērķis ir ne tikai sniegt zināšanas, bet arī nodrošināt spēju tās efektīvi pielietot.</p>
            <div className="hero__cta">
              <CtaButton to="/kontakti">{t(CTA.apply_training, lang)}</CtaButton>
              <CtaButton to="/programma" variant="ghost">
                {t(CTA.hero_secondary, lang)}
              </CtaButton>
            </div>
            <div className="tagline-row">
              <span>Praktiskas prasmes</span>
              <span>Reāli biznesa scenāriji</span>
              <span>Izmērāms efekts</span>
            </div>
            <div className="hero__stats">
              <div>
                <div className="stat__label">Fokuss</div>
                <div className="stat__value">AI · ML · LLM</div>
              </div>
              <div>
                <div className="stat__label">Pieeja</div>
                <div className="stat__value">Struktūra · Prakse · Integrācija</div>
              </div>
              <div>
                <div className="stat__label">Auditorija</div>
                <div className="stat__value">Uzņēmumi · Komandas · Individuāli</div>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <img src={SITE_CONFIG.heroImageUrl} alt="" className="hero__image" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="h2">Pakalpojumi</h2>
            <p className="sublead">Četras savstarpēji papildinošas jomas — no pamatiem līdz korporatīvai ieviešanai.</p>
          </div>
          <div className="theme-grid">
            {SERVICES.map((s) => (
              <article key={s.title} className="card theme-item">
                <h3>{s.title}</h3>
                <p>{s.intro}</p>
                {s.blocks?.map((b) => (
                  <div key={b.label}>
                    <p>
                      <strong>{b.label}</strong>
                    </p>
                    <ul>
                      {b.items.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((li) => (
                      <li key={li}>{li}</li>
                    ))}
                  </ul>
                )}
                {s.outro && <p>{s.outro}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="h2">Metodoloģija</h2>
            <p className="sublead">Mācību process balstās uz četriem galvenajiem principiem:</p>
          </div>
          <div className="grid-2 grid-4">
            {METHODOLOGY.map((m) => (
              <article key={m.title} className="card">
                <div className="badge">{m.n}</div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="h2">Piedāvājuma struktūra</h2>
          <div className="grid-3" style={{ marginTop: "1.5rem" }}>
            {OFFERS.map((o) => (
              <article key={o.title} className="card">
                <span className="badge">{o.pill}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <p>
                  <strong>Ietver:</strong> {o.includes}
                </p>
                <p>
                  <strong>Rezultāts:</strong> {o.result}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container callout">
          <h2 className="h2">Aicinājums uz darbību</h2>
          <p>
            Mākslīgais intelekts kļūst par būtisku darba un biznesa sastāvdaļu. Savlaicīga tā apguve nodrošina
            konkurences priekšrocības. Piesakieties apmācībām un uzsāciet strukturētu darbu ar mākslīgo intelektu jau šodien.
          </p>
          <CtaButton to="/kontakti">{t(CTA.apply_training, lang)}</CtaButton>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2 className="h2">Kontakti</h2>
            <p className="sublead">
              Uzrakstiet mums — par pamata, profesionālo vai korporatīvo programmu, kā arī par individuālu konsultāciju.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

const SERVICES = [
  {
    title: "Mākslīgā intelekta apmācības",
    intro: "Strukturētas mācību programmas dažādiem sagatavotības līmeņiem.",
    blocks: [
      {
        label: "Iesācēju līmenis:",
        items: ["mākslīgā intelekta pamati", "praktiska darbība ar LLM rīkiem", "darba procesu optimizācija ar AI"],
      },
      {
        label: "Vidējais līmenis:",
        items: ["padziļināta LLM izmantošana", "efektīva pieprasījumu veidošana", "darba automatizācija"],
      },
      {
        label: "Uzlabotais līmenis:",
        items: ["AI risinājumu izstrādes principi", "integrācijas ar esošām sistēmām", "datu izmantošana un analīze"],
      },
    ],
  },
  {
    title: "Lielo valodu modeļu (LLM) praktiska izmantošana",
    intro: "Apmācību fokusā ir efektīva komunikācija ar AI sistēmām un to pielietojums:",
    list: [
      "strukturēta pieeja prompt engineering",
      "dažādu AI rīku salīdzināšana un izvēle",
      "automatizētu risinājumu izveide",
      "satura, analītikas un klientu komunikācijas optimizācija",
    ],
    outro: "Dalībnieki apgūst, kā iegūt prognozējamu un kvalitatīvu rezultātu no AI sistēmām.",
  },
  {
    title: "AI ieviešana uzņēmumos",
    intro: "Mēs piedāvājam pilna cikla atbalstu uzņēmumiem.",
    blocks: [
      { label: "Situācijas analīze:", items: ["esošo procesu izvērtēšana", "automatizācijas potenciāla identificēšana"] },
      { label: "Risinājumu izstrāde:", items: ["piemērotāko AI rīku izvēle", "pielāgotu risinājumu izveide"] },
      { label: "Ieviešana un apmācība:", items: ["darbinieku apmācība", "praktiska integrācija ikdienas darbā"] },
    ],
    outro: "Rezultātā uzņēmumi iegūst strukturētu un izmērāmu efektivitātes pieaugumu.",
  },
  {
    title: "AI izmantošana ikdienas darbā",
    intro: "Programmas ietver arī individuālu prasmju attīstību:",
    list: [
      "ikdienas uzdevumu automatizācija",
      "informācijas apstrādes paātrināšana",
      "lēmumu pieņemšanas atbalsts",
      "personīgās produktivitātes paaugstināšana",
    ],
    outro: "Mērķis ir panākt būtisku laika ietaupījumu un darba kvalitātes uzlabošanos.",
  },
];

const METHODOLOGY = [
  { n: "1", title: "Konceptu izpratne", text: "Dalībnieki iegūst skaidru izpratni par AI darbības principiem." },
  { n: "2", title: "Rīku apguve", text: "Tiek apgūta praktiska darbība ar aktuālajiem AI risinājumiem." },
  { n: "3", title: "Praktiska pielietošana", text: "Reāli uzdevumi un scenāriji nodrošina tūlītēju zināšanu pielietojumu." },
  { n: "4", title: "Integrācija", text: "Dalībnieki iemācās integrēt AI savā ikdienas darbā vai uzņēmuma procesos." },
];

const OFFERS = [
  {
    pill: "Iesācējiem",
    title: "Pamata programma",
    desc: "Piemērota iesācējiem bez iepriekšējas pieredzes.",
    includes: "AI pamatus; darbu ar LLM rīkiem; praktiskus uzdevumus",
    result: "spēja patstāvīgi izmantot AI ikdienas uzdevumos.",
  },
  {
    pill: "Padziļināti",
    title: "Profesionālā programma",
    desc: "Paredzēta lietotājiem ar sākotnējām zināšanām.",
    includes: "padziļinātu LLM izmantošanu; procesu automatizāciju; biznesa pielietojumus",
    result: "būtiska produktivitātes paaugstināšana un efektīvāka darba organizācija.",
  },
  {
    pill: "Uzņēmumiem",
    title: "Korporatīvie risinājumi",
    desc: "Individuāli pielāgoti uzņēmumiem.",
    includes: "procesu analīzi; AI ieviešanas stratēģiju; komandas apmācību",
    result: "strukturēta AI integrācija un izmērāms darbības uzlabojums.",
  },
];
