import { useLanguage } from "../context/LanguageContext";
import "./LanguageSwitcher.css";

export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      {["lv", "en", "ru"].map((code) => (
        <button
          key={code}
          type="button"
          className={`lang-switch__btn ${lang === code ? "is-active" : ""}`}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
