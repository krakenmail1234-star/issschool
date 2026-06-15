import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "lv", setLang: () => {} });

const STORAGE_KEY = "is_lang";

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "lv";
    return localStorage.getItem(STORAGE_KEY) || "lv";
  });

  const setLang = (next) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
