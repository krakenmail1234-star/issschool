import { useState } from "react";
import { FAQ_ITEMS_LV } from "../data/faqData";
import "./FaqAccordion.css";

export default function FaqAccordion({ items = FAQ_ITEMS_LV }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-list">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="faq-item__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              {item.q}
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className="faq-item__a">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}
