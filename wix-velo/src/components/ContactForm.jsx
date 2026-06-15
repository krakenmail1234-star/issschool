import { useState } from "react";
import { SITE_CONFIG } from "../config";
import { CTA, t } from "../i18n/translations";
import { useLanguage } from "../context/LanguageContext";
import CtaButton from "./CtaButton";
import "./ContactForm.css";

const TOPICS_LV = [
  "Bezmaksas konsultācija",
  "Korporatīvās apmācības",
  "Individuālās apmācības / mentorings",
  "Cits jautājums",
];

const TOPICS_EN = [
  "Free consultation",
  "Corporate training",
  "Individual training / mentoring",
  "Other question",
];

const TOPICS_RU = [
  "Бесплатная консультация",
  "Корпоративное обучение",
  "Индивидуальное обучение / менторство",
  "Другой вопрос",
];

const LABELS = {
  lv: { name: "Vārds", email: "E-pasts", topic: "Tēma", message: "Ziņa", choose: "Izvēlies" },
  en: { name: "Name", email: "Email", topic: "Topic", message: "Message", choose: "Choose" },
  ru: { name: "Имя", email: "E-mail", topic: "Тема", message: "Сообщение", choose: "Выберите" },
};

const FINEPRINT = {
  lv: "Pēc noklusējuma atveras e‑pasta klients (mailto). Vēlāk var pieslēgt servera risinājumu, nemainot lapas izkārtojumu.",
  en: "By default this opens your email client (mailto). A server solution can be added later without changing the layout.",
  ru: "По умолчанию открывается почтовый клиент (mailto). Позже можно подключить серверное решение без изменения вёрстки.",
};

export default function ContactForm({ showSecondary = true }) {
  const { lang } = useLanguage();
  const labels = LABELS[lang] || LABELS.lv;
  const topics = lang === "en" ? TOPICS_EN : lang === "ru" ? TOPICS_RU : TOPICS_LV;
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `${SITE_CONFIG.company.emailSubjectPrefix}${form.topic || "Kontakts"}`,
    );
    const body = encodeURIComponent(
      `Vārds: ${form.name}\nE-pasts: ${form.email}\nTēma: ${form.topic}\n\n${form.message}`,
    );
    window.location.href = `mailto:${SITE_CONFIG.company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form card" onSubmit={handleSubmit}>
      <label>
        {labels.name}
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <label>
        {labels.email}
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </label>
      <label>
        {labels.topic}
        <select required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          <option value="" disabled>
            {labels.choose}
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </label>
      <label>
        {labels.message}
        <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </label>
      <div className="contact-form__actions">
        <button type="submit" className="button">
          {t(CTA.send_message, lang)}
        </button>
        {showSecondary && (
          <CtaButton to="/programma" variant="ghost">
            {t({ lv: "Programma", en: "Programs", ru: "Программы" }, lang)}
          </CtaButton>
        )}
      </div>
      <p className="contact-form__fineprint">{FINEPRINT[lang] || FINEPRINT.lv}</p>
    </form>
  );
}
