import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COOKIE, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import "./CookieBanner.css";

const STORAGE_KEY = "is_cookie_consent";

export default function CookieBanner() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const save = (value) => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite">
      <p>{t(COOKIE.text, lang)}</p>
      <div className="cookie-banner__actions">
        <button type="button" className="button" onClick={() => save("accepted")}>
          {t(COOKIE.accept, lang)}
        </button>
        <button type="button" className="button button--ghost" onClick={() => save("essential")}>
          {t(COOKIE.essential, lang)}
        </button>
        <Link className="cookie-banner__link" to="/privatums">
          {t(COOKIE.privacy, lang)}
        </Link>
      </div>
    </div>
  );
}
