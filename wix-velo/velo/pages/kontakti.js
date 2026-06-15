import { SITE_CONFIG } from "public/config";

export function contactForm_submit(event) {
  const fields = event.fields || {};
  const name = fields.name?.value || "";
  const email = fields.email?.value || "";
  const topic = fields.topic?.value || "";
  const message = fields.message?.value || "";

  const subject = encodeURIComponent(`${SITE_CONFIG.company.emailSubjectPrefix}${topic || "Kontakts"}`);
  const body = encodeURIComponent(`Vārds: ${name}\nE-pasts: ${email}\nTēma: ${topic}\n\n${message}`);
  const mailto = `mailto:${SITE_CONFIG.company.email}?subject=${subject}&body=${body}`;

  // @ts-ignore
  window.location.href = mailto;
}
