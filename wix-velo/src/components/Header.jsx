import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SITE_CONFIG } from "../config";
import { NAV, CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import CtaButton from "./CtaButton";
import "./Header.css";

const NAV_ITEMS = [
  { key: "programma", path: "/programma" },
  { key: "pakalpojumi", path: "/pakalpojumi" },
  { key: "portfolio", path: "/portfolio" },
  { key: "buj", path: "/buj" },
  { key: "kontakti", path: "/kontakti" },
];

export default function Header() {
  const { lang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 1061px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  return (
    <header className={`topbar ${elevated ? "is-elevated" : ""}`}>
      <div className="container topbar__inner">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <img className="brand__logo" src={SITE_CONFIG.logoUrl} alt="" width={36} height={36} />
          <span className="brand__text">{SITE_CONFIG.brandName.toUpperCase()}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV_ITEMS.map(({ key, path }) => (
            <NavLink
              key={key}
              className={({ isActive }) => `nav__link ${isActive ? "is-active" : ""}`}
              to={path}
              onClick={() => setMenuOpen(false)}
            >
              {t(NAV[key], lang)}
            </NavLink>
          ))}
        </nav>

        <div className="topbar__actions">
          <LanguageSwitcher />
          <CtaButton to="/kontakti">{t(CTA.contact, lang)}</CtaButton>
          <button
            type="button"
            className="iconbtn"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="iconbtn__bars" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobilemenu">
          <div className="container mobilemenu__inner">
            <LanguageSwitcher className="mobilemenu__lang" />
            {NAV_ITEMS.map(({ key, path }) => (
              <Link key={key} className="mobilemenu__link" to={path} onClick={() => setMenuOpen(false)}>
                {t(NAV[key], lang)}
              </Link>
            ))}
            <div className="mobilemenu__cta">
              <CtaButton to="/kontakti">{t(CTA.hero_primary, lang)}</CtaButton>
              <CtaButton to="/programma" variant="ghost">
                {t(CTA.hero_secondary, lang)}
              </CtaButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
