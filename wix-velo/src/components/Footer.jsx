import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config";
import { NAV, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

const FOOTER_LINKS = ["programma", "pakalpojumi", "portfolio", "buj", "privatums", "kontakti"];

export default function Footer() {
  const { lang } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>{SITE_CONFIG.brandName}</strong>
          <p>
            © {year} · {SITE_CONFIG.tagline}
          </p>
          <p>{SITE_CONFIG.company.legalName}</p>
          <p>
            Reģ. Nr.: {SITE_CONFIG.company.regNumber} · reģ. datums: {SITE_CONFIG.company.regDate}
          </p>
          <p>
            Email:{" "}
            <a href={`mailto:${SITE_CONFIG.company.email}`}>{SITE_CONFIG.company.email}</a>
          </p>
          <p>Tel: {SITE_CONFIG.company.phones.join(", ")}</p>
          <p className="footer__social-label">{t({ lv: "Sekojiet mums", en: "Follow us", ru: "Следите за нами" }, lang)}</p>
          <div className="footer__social">
            <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          {FOOTER_LINKS.map((key) => (
            <Link key={key} to={`/${key === "home" ? "" : key}`}>
              {t(NAV[key], lang)}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
