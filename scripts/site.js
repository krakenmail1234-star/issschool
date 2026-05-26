(() => {
  const config = {
    discordInviteUrl: "https://discord.com/invite/REPLACE_ME",
    contactEmail: "info@intelektaskola.lv",
    contactSubjectPrefix: "Intelekta Skola — ",
  };

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const year = qs("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  qsa("[data-contact-email]").forEach((el) => {
    el.textContent = config.contactEmail;
  });

  const discordLink = qs("[data-discord-link]");
  if (discordLink) {
    discordLink.setAttribute("href", config.discordInviteUrl);
    /* Same-tab navigation; invite URL is static config (replace in config). */
  }

  const header = qs("[data-elevates]");
  const setHeaderElevated = () => {
    if (!header) return;
    header.setAttribute("data-elevated", window.scrollY > 4 ? "true" : "false");
  };
  setHeaderElevated();
  window.addEventListener("scroll", setHeaderElevated, { passive: true });

  const menuBtn = qs("[data-menu-button]");
  const mobileMenu = qs("[data-mobile-menu]");
  const closeMobileMenu = () => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "false");
    mobileMenu.hidden = true;
  };
  const openMobileMenu = () => {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.setAttribute("aria-expanded", "true");
    mobileMenu.hidden = false;
  };
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      if (expanded) closeMobileMenu();
      else openMobileMenu();
    });

    qsa("a[href]", mobileMenu).forEach((a) => {
      a.addEventListener("click", () => closeMobileMenu());
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  const markActiveNav = () => {
    const file = (window.location.pathname.split("/").pop() || "index.html").replace(/\.html$/i, "");
    const page = file === "index" ? "" : file;
    qsa("[data-nav]").forEach((el) => {
      el.classList.toggle("is-active", (el.getAttribute("data-nav") || "") === page);
    });
  };
  markActiveNav();

  // --- i18n (ENG / LAT / RUS) ---
  const I18N = {
    en: {
      nav_program: "Programs",
      nav_discord: "Community",
      nav_faq: "FAQ",
      nav_services: "Services",
      nav_contact: "Contact",
      cta_join_discord: "Community",
      cta_contact: "Contact",
      cta_explore: "Explore",
      cta_program: "Programs",
      nav_privacy: "Privacy",
      hero_cta_primary: "Book a free consultation",
      hero_cta_secondary: "View programs",

      cookie_banner_text:
        "We store your language choice locally and use essential cookies only as needed for the site to work. See our privacy notice for details.",
      cookie_accept: "Accept",
      cookie_essential: "Essential only",
      cookie_privacy_link: "Privacy policy",

      skip_to_content: "Skip to content",
      footer_tagline: "Professional AI skills training.",
      faq_chip_support: "Support",
      contact_chip_sla: "24–48h",
      aria_label_language: "Language",
      aria_nav_primary: "Primary navigation",
      aria_brand_home: "Intelekta Skola home",
      aria_open_menu: "Open menu",
      meta_title_home: "Intelekta Skola — AI skills training | ChatGPT, Claude, Cursor",
      meta_desc_home:
        "Professional AI training for teams and individuals: ChatGPT, Claude, Cursor, GitHub Copilot, productivity, automation, and safe adoption.",
      meta_title_program: "Programs — Intelekta Skola",
      meta_desc_program: "Six core training themes: prompting, models, productivity, marketing, automation, and AI security.",
      meta_title_services: "Services — Intelekta Skola",
      meta_desc_services: "Corporate AI transformation, workshops, industry programs, and 1:1 mentoring.",
      meta_title_privacy: "Privacy — Intelekta Skola",
      meta_desc_privacy: "Privacy and cookies notice for Intelekta Skola.",
      meta_title_discord: "Community — Intelekta Skola",
      meta_desc_discord: "Post-training materials, recordings, and alumni community access.",
      meta_title_faq: "FAQ — Intelekta Skola",
      meta_desc_faq: "Beginner-friendly AI training, languages, on-site options, and prerequisites.",
      meta_title_contact: "Contact — Intelekta Skola",
      meta_desc_contact: "Book a free consultation or ask about corporate and individual AI training.",

      privacy_title: "Privacy & cookies",
      privacy_intro:
        "This site is an education-focused demo. We do not run accounts, payments, or analytics trackers in this static build.",
      privacy_cookies:
        "The cookie banner records your choice in local storage (accepted / essential-only). Language selection is stored the same way. No third-party ad cookies are set by this template.",

      reviews_h2: "What people say",
      reviews_sub: "Representative feedback — replace with verified testimonials when you publish real reviews.",
      review_1_quote:
        "The clearest market education I’ve taken. The frameworks finally made risk and execution feel actionable.",
      review_1_name: "A.K.",
      review_1_role: "Independent trader",
      review_2_quote:
        "Structured, calm, no hype. The review loops changed how I journal and how I size positions.",
      review_2_name: "M.R.",
      review_2_role: "Part-time swing trader",
      review_3_quote:
        "Mentorship gave me a weekly rhythm I could sustain. I treat learning like engineering now — not gambling.",
      review_3_name: "L.S.",
      review_3_role: "Career switcher",

      home_badge: "Markets education, engineered for clarity",
      home_h1a: "Learn financial markets with a",
      home_h1b: "futuristic",
      home_h1c: "edge.",
      home_lead:
        "Structured learning for trading fundamentals and market mechanics, weekly market briefings, and ongoing support.",
      home_stat1_k: "Focus",
      home_stat1_v: "FX · Indices · Crypto",
      home_stat2_k: "Format",
      home_stat2_v: "Lessons · Briefings · Support",
      home_stat3_k: "Cadence",
      home_stat3_v: "Weekly reviews",
      home_pulse_title: "Market Pulse",
      home_pulse_tag: "Live framework",
      home_tag_trend: "trend",
      home_tag_structure: "structure",
      home_tag_range: "range",
      home_tag_volatility: "volatility",
      home_tag_risk: "risk",
      home_tag_liquidity: "liquidity",
      home_disclaimer: "Not financial advice · Education only",
      home_program_h2: "A program built like a system",
      home_program_sublead: "Progressive modules, practical frameworks, and clean mental models.",
      home_prog_card1_title: "Market mechanics",
      home_prog_card1_text:
        "Order flow concepts, liquidity, sessions, volatility, and why price moves — explained clearly with examples.",
      home_prog_card1_li1: "Structure, regimes, and narrative",
      home_prog_card1_li2: "Risk thinking and execution hygiene",
      home_prog_card1_li3: "Review loops and journaling",
      home_prog_card2_title: "Playbooks",
      home_prog_card2_text: "Repeatable setups and decision trees — so you know what to do, and when not to.",
      home_prog_card2_li1: "Entry/exit protocols",
      home_prog_card2_li2: "Conditions checklist",
      home_prog_card2_li3: "Post-trade debrief",
      home_prog_card3_title: "Support layer",
      home_prog_card3_text:
        "Feedback, review, and guidance tailored to your stage — from foundations to refinement.",
      home_prog_card3_li1: "1:1 reviews (optional)",
      home_prog_card3_li2: "Actionable improvements",
      home_prog_card3_li3: "Accountability cadence",

      topic_consult: "Free consultation",
      topic_corporate: "Corporate training",
      topic_individual: "Individual training / mentoring",
      topic_other: "Other question",

      contact_badge: "Contact",
      contact_h1: "Let’s talk about your AI goals.",
      contact_lead: "Send a message for a free diagnostic call or a tailored training proposal.",
      contact_chip_response: "Response",
      contact_email_label: "Email",
      contact_copy_email: "Copy email",
      contact_discord_label: "Discord",
      contact_discord_note: "Invite link in Discord page",
      contact_form_name: "Name",
      contact_form_email: "Email",
      contact_form_topic: "Topic",
      contact_form_choose: "Choose one",
      contact_form_message: "Message",
      contact_form_send: "Send message",
      contact_form_fineprint:
        "Default behavior opens your email client (mailto). Replace it with a backend endpoint later without changing the page layout.",
      contact_quicklinks: "Contact details",
      contact_boundary_title: "Note",
      contact_boundary_text: "Guiding prices; final quotes after the intro conversation. Replace placeholder contacts on the site.",

      discord_open_invite: "Open Discord invite",
      discord_badge: "Discord",
      discord_h1: "Community, not noise.",
      discord_lead: "Briefings, frameworks, Q&A, and a culture of clean execution.",
      discord_chip_discord_first: "Discord-first",
      discord_chip_structured: "Structured",
      discord_card_line: "Weekly overviews · Live Q&A · Reviews",
      discord_card_note: "Replace invite URL in `scripts/site.js`",
      discord_panel_title: "What you’ll find",
      discord_li1: "Weekly overviews and watchlists",
      discord_li2: "Live Q&A sessions",
      discord_li3: "Trade review structure",
      discord_li4: "Resources + templates",
      discord_ask_question: "Ask a question",
      discord_fineprint: "Default button uses the link set in `scripts/site.js`.",
      discord_quote: "A systems room: rules, reviews, and calm progress.",
      discord_byline: "— Community ethos",
      discord_mini_k1: "Signal-to-noise",
      discord_mini_v1: "High",
      discord_mini_k2: "Cadence",
      discord_mini_v2: "Weekly",
      discord_mini_k3: "Support",
      discord_mini_v3: "Ongoing",

      mentorship_lead: "For leaders and specialists who want habits, templates, and accountability with AI.",
      mentorship_chip: "Support",
      mentorship_chip_optional: "Flexible",
      mentorship_card_line: "Goals · Practice · Review",
      mentorship_card_note: "Packages from 1–3 months · As agreed",
      mentorship_block1_title: "Skill sprint",
      mentorship_block1_text: "Short intensive blocks to embed daily AI habits in email, docs, and meetings.",
      mentorship_pill_journals: "Checklists",
      mentorship_pill_rules: "Guardrails",
      mentorship_pill_execution: "Practice",
      mentorship_block2_title: "Roadmap",
      mentorship_block2_text: "Week-by-week milestones so progress is visible for you and stakeholders.",
      mentorship_pill_weekly_goals: "Weekly goals",
      mentorship_pill_feedback: "Feedback",
      mentorship_pill_iteration: "Iteration",
      mentorship_block3_title: "Governance",
      mentorship_block3_text: "Data boundaries, verification routines, and responsible use policies for teams.",
      mentorship_pill_risk_model: "Data use",
      mentorship_pill_regimes: "Compliance",
      mentorship_pill_boundaries: "Ethics",
      mentorship_callout_title: "Interested in a mentoring package?",
      mentorship_callout_text: "Use the contact form — we’ll suggest duration and focus after the diagnostic call.",

      faq_badge: "FAQ",
      faq_h1: "Quick answers. No fluff.",
      faq_lead: "Common questions about AI training, prerequisites, language, and on-site delivery.",
      faq_chip_clear: "Clear",
      faq_card_education_first: "Education-first",
      faq_card_unique_question: "If you have a unique question, contact us.",
      faq_q1: "Are trainings suitable for beginners?",
      faq_a1: "Yes. Programs are tailored from zero to advanced, depending on your team.",
      faq_q2: "Do I need programming skills?",
      faq_a2: "No — except when we train developers on Cursor and GitHub Copilot.",
      faq_q3: "What language are sessions in?",
      faq_a3: "Primarily Latvian, with English terminology as standard in the AI field.",
      faq_q4: "Can we do on-site training?",
      faq_a4: "Yes — in Riga, other Latvian cities, or at your office.",
      faq_callout_title: "Still unsure what you need?",
      faq_callout_text: "Send a short message with your goals and current stage.",

      about_h1: "Expert-level AI training with real-world application.",
      about_lead:
        "Replace [Your Name] on the site: certified AI practitioner and trainer with broad experience integrating AI into business. Modern tools are not just chatbots — they help with code, data, content, processes, and strategy.",
      about_chip_philosophy: "Focus",
      about_chip_system_first: "Outcomes",
      about_noise: "Buzzwords ↓",
      about_clarity: "Clarity ↑",
      about_frameworks: "Practice · Templates · Follow-up",
      about_mission_title: "Mission",
      about_mission_text:
        "Deliver measurable time savings, higher quality work, and a confident team using AI responsibly.",
      about_values_title: "What we value",
      about_values_1: "Concrete outcomes over hype",
      about_values_2: "Security and ethics by design",
      about_values_3: "Practice you can repeat next Monday",
      about_who_title: "Who it’s for",
      about_who_text:
        "Companies adopting AI across departments, and professionals who want modern workplace skills for 2026–2027.",
      about_callout_title: "See the full curriculum",
      about_callout_text: "Open the Programs page for the six core themes in detail.",
      about_callout_cta: "View programs",

      services_badge: "Services",
      services_h1: "Corporate workshops, team programs, and 1:1 mentoring.",
      services_lead:
        "From a half-day productivity sprint to a multi-month transformation — aligned to Latvian organisations and compliance realities.",
      services_chip_stack: "Formats",
      services_chip_modular: "Tailored",
      services_stack_1: "Workshops",
      services_stack_2: "Programs",
      services_stack_3: "Mentoring",
      services_core_h2: "Core offerings",
      services_core_sublead: "Same quality bar — choose depth and duration.",
      services_card1_title: "Corporate AI transformation",
      services_card1_text: "4–16 hour programs: leadership literacy, productivity labs, and industry-specific tracks.",
      services_card1_li1: "Marketing · Sales · IT · Legal · Finance · HR",
      services_card1_li2: "Templates and playbooks for daily work",
      services_card1_li3: "Optional developer track (Cursor / Copilot)",
      services_card1_link: "See programs →",
      services_card2_title: "Individual training",
      services_card2_text: "Personalised 1:1 sessions (2–10 hours) focused on your tools and workflows.",
      services_card2_li1: "Beginner-friendly onboarding",
      services_card2_li2: "Advanced prompting and workflows",
      services_card2_li3: "Riga, other cities, or remote",
      services_card2_link: "Program themes →",
      services_card3_text: "1–3 month packages with checkpoints, materials, and follow-up consultations.",
      services_card3_li1: "Habit building with AI",
      services_card3_li2: "Accountability and reviews",
      services_card3_li3: "Closed alumni community (as agreed)",
      services_how_h2: "How engagements run",
      services_how_sublead: "Free diagnostic → tailored curriculum → interactive practice → post-training support.",
      services_step1_title: "Diagnostic call",
      services_step1_text: "20–30 minutes to map goals, level, and constraints.",
      services_step2_title: "Design",
      services_step2_text: "Curriculum and exercises matched to your industry and tools.",
      services_step3_title: "Deliver",
      services_step3_text: "Hands-on sessions with real tasks from your work.",
      services_step4_title: "Support",
      services_step4_text: "Recordings, materials, and optional community or extra consultations.",
      services_callout_title: "Want a quote?",
      services_callout_text: "Guiding prices are on the homepage; final proposals after the intro conversation.",

      program_badge: "Programs",
      program_h1: "Six practical themes — from prompts to governance.",
      program_lead: "A structured path covering prompting, model choice, productivity, content, automation, and safe AI use.",
      program_chip_modules: "Themes",
      program_chip_structured: "Hands-on",
      program_card_loop: "Diagnose → Design → Practice → Support",
      program_card_stack: "Prompting · Models · Productivity · Safety",
      program_card1_title: "Prompting & models",
      program_card1_text:
        "Clear prompting, advanced techniques, and practical comparisons of ChatGPT, Claude, Cursor, Copilot, Grok, Gemini.",
      program_card1_li1: "Quality outputs and verification habits",
      program_card1_li2: "When to use which model",
      program_card1_li3: "Strengths, limits, and demos",
      program_card2_title: "Productivity & content",
      program_card2_text: "Everyday work: email, meetings, research, marketing copy, SEO-oriented workflows.",
      program_card2_li1: "Documents, decks, and meeting notes",
      program_card2_li2: "Research and summarisation",
      program_card2_li3: "Content and campaign drafts with guardrails",
      program_card3_title: "Automation & safety",
      program_card3_text: "Lightweight automation, coding assistance for teams who need it, and corporate data ethics.",
      program_card3_li1: "No-code/low-code automations",
      program_card3_li2: "Developer track: Cursor & Copilot",
      program_card3_li3: "GDPR-aware practices and hallucination control",
      program_callout_title: "Not sure where to start?",
      program_callout_text: "Book a free 20–30 minute diagnostic call and we’ll propose a tailored plan.",
    },
    lv: {
      nav_program: "Programma",
      nav_discord: "Kopiena",
      nav_faq: "BUJ",
      nav_services: "Pakalpojumi",
      nav_contact: "Kontakti",
      cta_join_discord: "Kopiena",
      cta_contact: "Kontakti",
      cta_explore: "Apskatīt",
      cta_program: "Programma",
      nav_privacy: "Privātums",
      hero_cta_primary: "Pieteikties bezmaksas konsultācijai",
      hero_cta_secondary: "Skatīt programmas",

      cookie_banner_text:
        "Mēs saglabājam valodas izvēli lokāli un izmantojam tikai nepieciešamās sīkdatnes, lai lapa darbotos. Sīkāk — privātuma paziņojumā.",
      cookie_accept: "Pieņemt",
      cookie_essential: "Tikai nepieciešamās",
      cookie_privacy_link: "Privātuma politika",

      skip_to_content: "Pāriet uz saturu",
      footer_tagline: "AI prasmju apmācības.",
      faq_chip_support: "Atbalsts",
      contact_chip_sla: "24–48 h",
      aria_label_language: "Valoda",
      aria_nav_primary: "Galvenā navigācija",
      aria_brand_home: "Intelekta Skola sākumlapa",
      aria_open_menu: "Atvērt izvēlni",
      meta_title_home: "Intelekta Skola — AI prasmju apmācības | ChatGPT, Claude, Cursor",
      meta_desc_home:
        "Profesionālas MI apmācības uzņēmumiem un privātpersonām: ChatGPT, Claude, Cursor, Copilot, ikdiena, automatizācija, produktivitāte.",
      meta_title_program: "Programma — Intelekta Skola",
      meta_desc_program: "Sešas apmācību tēmas: prompti, modeļi, produktivitāte, saturs, automatizācija, drošība.",
      meta_title_services: "Pakalpojumi — Intelekta Skola",
      meta_desc_services: "Korporatīvās programmas, darbnīcas, nozaru moduļi un individuālais mentorings.",
      meta_title_privacy: "Privātums — Intelekta Skola",
      meta_desc_privacy: "Privātuma un sīkdatņu paziņojums Intelekta Skola vietnē.",
      meta_title_discord: "Kopiena — Intelekta Skola",
      meta_desc_discord: "Pēcapmācību materiāli, ieraksti un slēgtā kopiena pēc vienošanās.",
      meta_title_faq: "BUJ — Intelekta Skola",
      meta_desc_faq: "BUJ par AI apmācībām: iesācējiem, programmēšanu, valodu un klātieni.",
      meta_title_contact: "Kontakti — Intelekta Skola",
      meta_desc_contact: "Piesakies bezmaksas konsultācijai vai jautā par korporatīvajām un individuālajām programmām.",

      privacy_title: "Privātums un sīkdatnes",
      privacy_intro:
        "Šī ir izglītības fokusa demonstrācija. Statiskajā versijā nav lietotāju kontu, maksājumu ne trekeru.",
      privacy_cookies:
        "Sīkdatņu josla saglabā izvēli lokālajā krātuvē (pieņemts / tikai nepieciešamās). Valodas izvēle tiek saglabāta tāpat. Šī veidne neiestata trešo pušu reklāmu sīkdatnes.",

      reviews_h2: "Ko saka cilvēki",
      reviews_sub: "Ilgustrāda atgriezeniskā saite — publicējot īstas atsauksmes, nomainiet pret verificētiem citātiem.",
      review_1_quote:
        "Skaidrākā tirgus izglītība, ko esmu gājis. Ietvari beidzot padarīja risku un izpildi praktiski lietojamus.",
      review_1_name: "A.K.",
      review_1_role: "Neatkarīgs treideris",
      review_2_quote:
        "Strukturēti, mierīgi, bez hype. Analīzes cikli mainīja manu žurnālu un pozīciju lielumu.",
      review_2_name: "M.R.",
      review_2_role: "Daļas laika swing treideris",
      review_3_quote:
        "Mentorings deva nedēļas ritmu, ko varu noturēt. Mācības tagad uztveru kā inženieriju — ne azartu.",
      review_3_name: "L.S.",
      review_3_role: "Karjeras maiņa",

      home_badge: "Finanšu tirgu izglītība ar skaidru struktūru",
      home_h1a: "Apgūsti finanšu tirgus ar",
      home_h1b: "futūristisku",
      home_h1c: "pieeju.",
      home_lead:
        "Strukturēta mācīšanās tirdzniecības pamatos un tirgus mehānikā, nedēļas tirgus kopsavilkumi un fokusēts mentorings.",
      home_stat1_k: "Fokuss",
      home_stat1_v: "FX · Indeksi · Kripto",
      home_stat2_k: "Formāts",
      home_stat2_v: "Nodarbības · Kopsavilkumi · Atbalsts",
      home_stat3_k: "Ritms",
      home_stat3_v: "Nedēļas analīzes",
      home_pulse_title: "Tirgus pulss",
      home_pulse_tag: "Dzīvs ietvars",
      home_tag_trend: "trends",
      home_tag_structure: "struktūra",
      home_tag_range: "diapazons",
      home_tag_volatility: "volatilitāte",
      home_tag_risk: "risks",
      home_tag_liquidity: "likviditāte",
      home_disclaimer: "Nav investīciju padoms · Tikai izglītība",
      home_program_h2: "Programma, kas uzbūvēta kā sistēma",
      home_program_sublead: "Pakāpeniski moduļi, praktiski ietvari un skaidras domāšanas modeļi.",
      home_prog_card1_title: "Tirgus mehānika",
      home_prog_card1_text:
        "Order flow, likviditāte, sesijas, volatilitāte un cenas kustības iemesli — skaidri ar piemēriem.",
      home_prog_card1_li1: "Struktūra, režīmi un konteksts",
      home_prog_card1_li2: "Domāšana par risku un tīru izpildi",
      home_prog_card1_li3: "Analīze un žurnāls",
      home_prog_card2_title: "Playbooki",
      home_prog_card2_text:
        "Atkārtojami iestatījumi un lēmumu koki — lai zinātu, ko darīt un kad neielēkt.",
      home_prog_card2_li1: "Ieejas/izejas protokoli",
      home_prog_card2_li2: "Nosacījumu čeklists",
      home_prog_card2_li3: "Apskate pēc darījuma",
      home_prog_card3_title: "Atbalsta slānis",
      home_prog_card3_text:
        "Atsauksmes, analīze un vadība atbilstoši tavam līmenim — no pamatiem līdz smalkai kalibrācijai.",
      home_prog_card3_li1: "1:1 analīzes (pēc izvēles)",
      home_prog_card3_li2: "Konkrēti uzlabojumi",
      home_prog_card3_li3: "Atbildības ritms",

      topic_consult: "Bezmaksas konsultācija",
      topic_corporate: "Korporatīvās apmācības",
      topic_individual: "Individuālās apmācības / mentorings",
      topic_other: "Cits jautājums",

      contact_badge: "Kontakti",
      contact_h1: "Sazināmies par jūsu AI mērķiem.",
      contact_lead: "Uzraksti ziņu — piesakies bezmaksas diagnostikas sarunai vai pieprasi individuālu piedāvājumu.",
      contact_chip_response: "Atbilde",
      contact_email_label: "E-pasts",
      contact_copy_email: "Kopēt e‑pastu",
      contact_discord_label: "Discord",
      contact_discord_note: "Ielūguma saite ir Discord lapā",
      contact_form_name: "Vārds",
      contact_form_email: "E-pasts",
      contact_form_topic: "Tēma",
      contact_form_choose: "Izvēlies",
      contact_form_message: "Ziņa",
      contact_form_send: "Sūtīt ziņu",
      contact_form_fineprint:
        "Pēc noklusējuma atveras e‑pasta klients (mailto). Vēlāk var pieslēgt servera risinājumu, nemainot lapas izkārtojumu.",
      contact_quicklinks: "Kontaktinformācija",
      contact_boundary_title: "Piezīme",
      contact_boundary_text: "Cenas ir orientējošas; galīgo piedāvājumu sagatavoju pēc ievada sarunas. Aizvieto kontaktus vietnē.",

      discord_open_invite: "Atvērt Discord ielūgumu",
      discord_badge: "Discord",
      discord_h1: "Kopiena, nevis troksnis.",
      discord_lead: "Pārskati, ietvari, jautājumi–atbildes un kultūra ar tīru izpildi.",
      discord_chip_discord_first: "Discord‑pirmais",
      discord_chip_structured: "Strukturēti",
      discord_card_line: "Nedēļas pārskati · Live Q&A · Analīzes",
      discord_card_note: "Ielūguma saiti nomaini `scripts/site.js`",
      discord_panel_title: "Ko tu atradīsi",
      discord_li1: "Nedēļas pārskatus un watchlistus",
      discord_li2: "Live Q&A sesijas",
      discord_li3: "Tirdzniecības analīzes struktūru",
      discord_li4: "Resursus un veidnes",
      discord_ask_question: "Uzdot jautājumu",
      discord_fineprint: "Poga izmanto saiti, kas iestatīta `scripts/site.js`.",
      discord_quote: "Sistēmu telpa: noteikumi, analīzes un mierīgs progress.",
      discord_byline: "— Kopienas vērtības",
      discord_mini_k1: "Signāls/troksnis",
      discord_mini_v1: "Augsts",
      discord_mini_k2: "Ritms",
      discord_mini_v2: "Nedēļā",
      discord_mini_k3: "Atbalsts",
      discord_mini_v3: "Pastāvīgs",

      mentorship_lead: "Vadītājiem un speciālistiem, kuri vēlas ieradumus, veidnes un atbildību strādājot ar AI.",
      mentorship_chip: "Atbalsts",
      mentorship_chip_optional: "Elastīgi",
      mentorship_card_line: "Mērķi · Prakse · Apskate",
      mentorship_card_note: "Paketes 1–3 mēneši · Pēc vienošanās",
      mentorship_block1_title: "Prasmju sprints",
      mentorship_block1_text: "Īsi intensīvi bloki, lai iedzīvinātu AI ikdienā e-pastos, dokumentos un sapulcēs.",
      mentorship_pill_journals: "Čeklistes",
      mentorship_pill_rules: "Robežas",
      mentorship_pill_execution: "Prakse",
      mentorship_block2_title: "Ceļa karte",
      mentorship_block2_text: "Nedēļu plāns ar atskaites punktiem, lai progress būtu redzams tev un vadībai.",
      mentorship_pill_weekly_goals: "Nedēļas mērķi",
      mentorship_pill_feedback: "Atgriezeniskā saite",
      mentorship_pill_iteration: "Iterācija",
      mentorship_block3_title: "Pārvaldība",
      mentorship_block3_text: "Datu robežas, verificēšanas rutīnas un atbildīgas lietošanas politikas komandām.",
      mentorship_pill_risk_model: "Datu lietojums",
      mentorship_pill_regimes: "Atbilstība",
      mentorship_pill_boundaries: "Ētika",
      mentorship_callout_title: "Interesē mentoringa pakete?",
      mentorship_callout_text: "Lieto kontaktu formu — pēc diagnostikas ieteikšu ilgumu un fokusu.",

      faq_badge: "BUJ",
      faq_h1: "Ātras atbildes. Bez liekvārdības.",
      faq_lead: "Jautājumi par apmācību līmeni, prasībām, valodu un klātienes formātu.",
      faq_chip_clear: "Skaidri",
      faq_card_education_first: "Izglītība pirmajā vietā",
      faq_card_unique_question: "Ja jautājums ir specifisks, uzraksti mums.",
      faq_q1: "Vai apmācības ir piemērotas iesācējiem?",
      faq_a1: "Jā. Programmas tiek veidotas atbilstoši dalībnieku līmenim – no nulles līdz advanced.",
      faq_q2: "Vai ir nepieciešamas programmēšanas zināšanas?",
      faq_a2: "Nē, izņemot gadījumos, kad apmācām programmētājus ar Cursor un Copilot.",
      faq_q3: "Kādā valodā notiek apmācības?",
      faq_a3: "Galvenokārt latviešu valodā, ar angļu terminoloģiju (kas ir standarts AI jomā).",
      faq_q4: "Vai varam saņemt apmācības klātienē?",
      faq_a4: "Jā – Rīgā, citās Latvijas pilsētās vai jūsu birojā.",
      faq_callout_title: "Nezini, ar ko sākt?",
      faq_callout_text: "Uzraksti īsi par mērķi un pašreizējo līmeni — ieteiksim nākamo soli.",

      about_h1: "Eksperta līmeņa AI apmācības ar reālu pielietojumu.",
      about_lead:
        "Aizvieto [Tavs Vārds] vietnē: sertificēts AI praktiķis un apmācītājs ar pieredzi MI integrācijā uzņēmumos. Mūsdienu rīki nav tikai «čatboti» — tie palīdz kodam, datiem, saturam, procesiem un stratēģijai.",
      about_chip_philosophy: "Fokuss",
      about_chip_system_first: "Rezultāts",
      about_noise: "Hype ↓",
      about_clarity: "Skaidrība ↑",
      about_frameworks: "Prakse · Veidnes · Atbalsts",
      about_mission_title: "Misija",
      about_mission_text:
        "Konkrēts laika ietaupījums, augstāka kvalitāte un pārliecināta komanda, kas lieto AI atbildīgi.",
      about_values_title: "Ko mēs vērtējam",
      about_values_1: "Konkrēti iznākumi, nevis modes vārds",
      about_values_2: "Drošība un ētika no paša sākuma",
      about_values_3: "Prakse, ko var atkārtot pirmdien",
      about_who_title: "Kam tas ir domāts",
      about_who_text:
        "Uzņēmumi, kas ievieš AI dažādās struktūrvienībās, un speciālisti, kuri vēlas mūsdienīgas darba tirgus prasmes 2026.–2027. gadam.",
      about_callout_title: "Pilns satura pārskats",
      about_callout_text: "Atver programmas lapu — tur detalizēti aprakstītas sešas galvenās tēmas.",
      about_callout_cta: "Skatīt programmas",

      services_badge: "Pakalpojumi",
      services_h1: "Korporatīvās darbnīcas, programmas un 1:1 mentorings.",
      services_lead:
        "No pusdienas produktivitātes līdz vairāku mēnešu transformācijai — pielāgots Latvijas uzņēmumiem un atbilstības prasībām.",
      services_chip_stack: "Formāti",
      services_chip_modular: "Pielāgots",
      services_stack_1: "Darbnīcas",
      services_stack_2: "Programmas",
      services_stack_3: "Mentorings",
      services_core_h2: "Pamatpiedāvājums",
      services_core_sublead: "Viena kvalitātes līnija — izvēlies dziļumu un ilgumu.",
      services_card1_title: "Korporatīvā MI transformācija",
      services_card1_text: "4–16 stundu programmas: vadības «literatūra», produktivitātes laboratorijas, nozaru moduļi.",
      services_card1_li1: "Mārketings · Pārdošana · IT · Juristi · Finanses · HR",
      services_card1_li2: "Veidnes un playbooks ikdienai",
      services_card1_li3: "Pēc vajadzības — izstrādātāju trase (Cursor / Copilot)",
      services_card1_link: "Skatīt programmas →",
      services_card2_title: "Individuālās apmācības",
      services_card2_text: "Personalizētas 1:1 sesijas (2–10 stundas) ar fokusu uz taviem rīkiem un uzdevumiem.",
      services_card2_li1: "Draudzīgs starts iesācējiem",
      services_card2_li2: "Pieredzējušiem — prompti un procesi",
      services_card2_li3: "Rīga, citas pilsētas vai attālināti",
      services_card2_link: "Apmācību tēmas →",
      services_card3_text: "1–3 mēneši ar kontrolpunktiem, materiāliem un papildu konsultācijām.",
      services_card3_li1: "Ieradumi strādāt ar AI",
      services_card3_li2: "Atskaites un atgriezeniskā saite",
      services_card3_li3: "Slēgta alumni kopiena (pēc vienošanās)",
      services_how_h2: "Kā norit sadarbība",
      services_how_sublead: "Bezmaksas diagnostika → programma → praktiskas nodarbības → pēcapmācību atbalsts.",
      services_step1_title: "Diagnostikas saruna",
      services_step1_text: "20–30 minūtes, lai noskaidrotu mērķus, līmeni un ierobežojumus.",
      services_step2_title: "Izstrāde",
      services_step2_text: "Saturs un uzdevumi pielāgoti nozarei un rīkiem.",
      services_step3_title: "Nodarbības",
      services_step3_text: "Rokas uz klaviatūras — ar reāliem uzdevumiem no jūsu darba.",
      services_step4_title: "Atbalsts",
      services_step4_text: "Ieraksti, materiāli un pēc vienošanās — kopiena vai papildu konsultācijas.",
      services_callout_title: "Vajadzīgs piedāvājums?",
      services_callout_text: "Orientējošās cenas ir sākumlapā; galīgo piedāvājumu sagatavoju pēc ievada sarunas.",

      program_badge: "Programma",
      program_h1: "Sešas praktiskas tēmas — no promptiem līdz pārvaldībai.",
      program_lead: "Strukturēts ceļš: prompti, modeļi, produktivitāte, saturs, automatizācija un drošs AI.",
      program_chip_modules: "Tēmas",
      program_chip_structured: "Praktiski",
      program_card_loop: "Diagnostika → Plāns → Prakse → Atbalsts",
      program_card_stack: "Prompti · Modeļi · Produktivitāte · Drošība",
      program_card1_title: "Prompti un modeļi",
      program_card1_text:
        "Skaidra komunikācija ar AI, advanced tehnikas un ChatGPT, Claude, Cursor, Copilot, Grok, Gemini salīdzinājums.",
      program_card1_li1: "Kvalitatīvi rezultāti un verificēšana",
      program_card1_li2: "Kuru modeli kad izmantot",
      program_card1_li3: "Stiprās/vājās puses un demonstrācijas",
      program_card2_title: "Produktivitāte un saturs",
      program_card2_text: "Ikdiena: e-pasti, sapulces, pētniecība, mārketinga teksti un SEO orientēti procesi.",
      program_card2_li1: "Dokumenti, prezentācijas, protokoli",
      program_card2_li2: "Pētniecība un kopsavilkumi",
      program_card2_li3: "Satura melnraksti ar robežām",
      program_card3_title: "Automatizācija un drošība",
      program_card3_text: "Vienkāršas automatizācijas, izstrādes atbalsts komandām, kas to vajag, un GDPR konteksts.",
      program_card3_li1: "Automatizācijas bez dziļas programmēšanas",
      program_card3_li2: "Izstrādātājiem: Cursor un Copilot",
      program_card3_li3: "Datu aizsardzība un halucināciju mazināšana",
      program_callout_title: "Nezini, kur sākt?",
      program_callout_text: "Piesakies bezmaksas 20–30 min diagnostikas sarunai — ieteikšu piemērotu programmu.",
    },
    ru: {
      nav_program: "Программы",
      nav_discord: "Сообщество",
      nav_faq: "FAQ",
      nav_services: "Услуги",
      nav_contact: "Контакты",
      cta_join_discord: "Сообщество",
      cta_contact: "Контакты",
      cta_explore: "Смотреть",
      cta_program: "Программы",
      nav_privacy: "Конфиденциальность",
      hero_cta_primary: "Записаться на бесплатную консультацию",
      hero_cta_secondary: "Смотреть программы",

      cookie_banner_text:
        "Мы сохраняем выбор языка локально и используем только необходимые cookie для работы сайта. Подробности — в политике конфиденциальности.",
      cookie_accept: "Принять",
      cookie_essential: "Только необходимые",
      cookie_privacy_link: "Политика конфиденциальности",

      skip_to_content: "Перейти к содержимому",
      footer_tagline: "Обучение навыкам ИИ.",
      faq_chip_support: "Поддержка",
      contact_chip_sla: "24–48 ч",
      aria_label_language: "Язык",
      aria_nav_primary: "Основная навигация",
      aria_brand_home: "Главная Intelekta Skola",
      aria_open_menu: "Открыть меню",
      meta_title_home: "Intelekta Skola — обучение навыкам ИИ | ChatGPT, Claude, Cursor",
      meta_desc_home:
        "Корпоративное и индивидуальное обучение ИИ: ChatGPT, Claude, Cursor, Copilot, продуктивность и безопасность.",
      meta_title_program: "Программы — Intelekta Skola",
      meta_desc_program: "Шесть тем: промпты, модели, продуктивность, контент, автоматизация и безопасность ИИ.",
      meta_title_services: "Услуги — Intelekta Skola",
      meta_desc_services: "Корпоративные программы, воркшопы, отраслевые модули и индивидуальный менторинг.",
      meta_title_privacy: "Конфиденциальность — Intelekta Skola",
      meta_desc_privacy: "Уведомление о конфиденциальности и cookie для Intelekta Skola.",
      meta_title_discord: "Сообщество — Intelekta Skola",
      meta_desc_discord: "Материалы после обучения, записи и закрытое сообщество по договорённости.",
      meta_title_faq: "FAQ — Intelekta Skola",
      meta_desc_faq: "Вопросы об уровне подготовки, языке, очном формате и навыках программирования.",
      meta_title_contact: "Контакты — Intelekta Skola",
      meta_desc_contact: "Бесплатная диагностическая встреча и коммерческие предложения по обучению ИИ.",

      privacy_title: "Конфиденциальность и cookie",
      privacy_intro:
        "Это демонстрационный образовательный сайт. В статической сборке нет учётных записей, оплат и аналитических трекеров.",
      privacy_cookies:
        "Баннер cookie сохраняет выбор в локальном хранилище (принято / только необходимые). Язык сохраняется так же. Шаблон не ставит рекламные cookie третьих сторон.",

      reviews_h2: "Что говорят люди",
      reviews_sub: "Примеры отзывов — замените на проверенные цитаты при публикации реальных рекомендаций.",
      review_1_quote:
        "Самое ясное обучение по рынкам, которое я проходил. Фреймворки наконец сделали риск и исполнение практичными.",
      review_1_name: "А.К.",
      review_1_role: "Независимый трейдер",
      review_2_quote:
        "Структурно, спокойно, без хайпа. Циклы разбора изменили журнал и подход к размеру позиции.",
      review_2_name: "М.Р.",
      review_2_role: "Парт-тайм свинг-трейдер",
      review_3_quote:
        "Наставничество дало недельный ритм, который я могу держать. Обучение теперь как инженерия — не азарт.",
      review_3_name: "Л.С.",
      review_3_role: "Смена карьеры",

      home_badge: "Обучение рынкам — со структурой и ясностью",
      home_h1a: "Изучайте финансовые рынки с",
      home_h1b: "футуристичным",
      home_h1c: "подходом.",
      home_lead:
        "Структурированное обучение основам трейдинга и механике рынка, еженедельные рыночные брифинги и фокусное наставничество.",
      home_stat1_k: "Фокус",
      home_stat1_v: "FX · Индексы · Крипто",
      home_stat2_k: "Формат",
      home_stat2_v: "Уроки · Брифинги · Наставничество",
      home_stat3_k: "Ритм",
      home_stat3_v: "Еженедельные разборы",
      home_pulse_title: "Пульс рынка",
      home_pulse_tag: "Живой фреймворк",
      home_tag_trend: "тренд",
      home_tag_structure: "структура",
      home_tag_range: "диапазон",
      home_tag_volatility: "волатильность",
      home_tag_risk: "риск",
      home_tag_liquidity: "ликвидность",
      home_disclaimer: "Не финансовый совет · Только образование",
      home_program_h2: "Программа, построенная как система",
      home_program_sublead: "Пошаговые модули, практичные фреймворки и чистые модели мышления.",
      home_prog_card1_title: "Механика рынка",
      home_prog_card1_text:
        "Концепции потока заявок, ликвидность, сессии, волатильность и причины движения цены — понятно и с примерами.",
      home_prog_card1_li1: "Структура, режимы и контекст",
      home_prog_card1_li2: "Мышление о риске и гигиена исполнения",
      home_prog_card1_li3: "Циклы разбора и журнал",
      home_prog_card2_title: "Плейбуки",
      home_prog_card2_text:
        "Повторяемые сетапы и деревья решений — чтобы знать, что делать и когда не входить.",
      home_prog_card2_li1: "Протоколы входа/выхода",
      home_prog_card2_li2: "Чек‑лист условий",
      home_prog_card2_li3: "Разбор после сделки",
      home_prog_card3_title: "Слой наставничества",
      home_prog_card3_text:
        "Обратная связь, разбор и сопровождение под ваш этап — от базы до тонкой настройки.",
      home_prog_card3_li1: "Разборы 1:1 (опционально)",
      home_prog_card3_li2: "Практичные улучшения",
      home_prog_card3_li3: "Ритм ответственности",

      topic_consult: "Бесплатная консультация",
      topic_corporate: "Корпоративное обучение",
      topic_individual: "Индивидуальное обучение / менторинг",
      topic_other: "Другой вопрос",

      contact_badge: "Контакты",
      contact_h1: "Обсудим ваши цели в ИИ.",
      contact_lead: "Напишите сообщение — бесплатная диагностика или индивидуальное предложение.",
      contact_chip_response: "Ответ",
      contact_email_label: "Почта",
      contact_copy_email: "Скопировать email",
      contact_discord_label: "Discord",
      contact_discord_note: "Ссылка-приглашение на странице Discord",
      contact_form_name: "Имя",
      contact_form_email: "Email",
      contact_form_topic: "Тема",
      contact_form_choose: "Выберите",
      contact_form_message: "Сообщение",
      contact_form_send: "Отправить",
      contact_form_fineprint:
        "По умолчанию откроется почтовый клиент (mailto). Позже можно подключить серверную отправку, не меняя макет страницы.",
      contact_quicklinks: "Контакты",
      contact_boundary_title: "Примечание",
      contact_boundary_text: "Ориентировочные цены; итоговое предложение после вводной беседы. Замените контакты на сайте.",

      discord_open_invite: "Открыть приглашение",
      discord_badge: "Discord",
      discord_h1: "Сообщество, а не шум.",
      discord_lead: "Обзоры, фреймворки, Q&A и культура чистого исполнения.",
      discord_chip_discord_first: "Discord‑сначала",
      discord_chip_structured: "Структурно",
      discord_card_line: "Еженедельные обзоры · Live Q&A · Разборы",
      discord_card_note: "Замените ссылку в `scripts/site.js`",
      discord_panel_title: "Что внутри",
      discord_li1: "Еженедельные обзоры и watchlist",
      discord_li2: "Сессии Live Q&A",
      discord_li3: "Структура разбора сделок",
      discord_li4: "Ресурсы и шаблоны",
      discord_ask_question: "Задать вопрос",
      discord_fineprint: "Кнопка использует ссылку из `scripts/site.js`.",
      discord_quote: "Комната систем: правила, разборы и спокойный прогресс.",
      discord_byline: "— Этос сообщества",
      discord_mini_k1: "Сигнал/шум",
      discord_mini_v1: "Высокий",
      discord_mini_k2: "Ритм",
      discord_mini_v2: "Еженедельно",
      discord_mini_k3: "Поддержка",
      discord_mini_v3: "Постоянно",

      mentorship_lead: "Для руководителей и специалистов, которым нужны привычки, шаблоны и ответственность в работе с ИИ.",
      mentorship_chip: "Менторинг",
      mentorship_chip_optional: "Гибко",
      mentorship_card_line: "Цели · Практика · Разбор",
      mentorship_card_note: "Пакеты 1–3 месяца · По договорённости",
      mentorship_block1_title: "Спринт навыков",
      mentorship_block1_text: "Короткие интенсивы, чтобы закрепить ИИ в почте, документах и встречах.",
      mentorship_pill_journals: "Чек-листы",
      mentorship_pill_rules: "Ограничения",
      mentorship_pill_execution: "Практика",
      mentorship_block2_title: "Дорожная карта",
      mentorship_block2_text: "Недельный план с вехами, чтобы прогресс был виден вам и руководству.",
      mentorship_pill_weekly_goals: "Цели недели",
      mentorship_pill_feedback: "Обратная связь",
      mentorship_pill_iteration: "Итерации",
      mentorship_block3_title: "Управление",
      mentorship_block3_text: "Границы данных, проверка результатов и политики ответственного использования.",
      mentorship_pill_risk_model: "Данные",
      mentorship_pill_regimes: "Соответствие",
      mentorship_pill_boundaries: "Этика",
      mentorship_callout_title: "Интересует пакет менторинга?",
      mentorship_callout_text: "Напишите через форму контактов — после диагностики предложу длительность и фокус.",

      faq_badge: "FAQ",
      faq_h1: "Коротко и по делу.",
      faq_lead: "Вопросы об уровне подготовки, программировании, языке и очном формате.",
      faq_chip_clear: "Понятно",
      faq_card_education_first: "Сначала — обучение",
      faq_card_unique_question: "Если вопрос нестандартный — напишите нам.",
      faq_q1: "Подходит ли обучение новичкам?",
      faq_a1: "Да. Программы подстраиваются под уровень — от нуля до продвинутого.",
      faq_q2: "Нужны ли навыки программирования?",
      faq_a2: "Нет — кроме случаев обучения разработчиков Cursor и GitHub Copilot.",
      faq_q3: "На каком языке проходят занятия?",
      faq_a3: "В основном на латышском, с английской терминологией как стандартом в ИИ.",
      faq_q4: "Можно ли очно?",
      faq_a4: "Да — в Риге, других городах Латвии или в вашем офисе.",
      faq_callout_title: "Не уверены, что вам нужно?",
      faq_callout_text: "Напишите коротко о цели и текущем уровне — подскажем следующий шаг.",

      about_h1: "Экспертное обучение ИИ с практическим применением.",
      about_lead:
        "Замените [Ваше имя] на сайте: практик и тренер по ИИ с опытом внедрения в бизнес. Современные инструменты — это не только чат-боты: код, данные, контент, процессы и стратегия.",
      about_chip_philosophy: "Фокус",
      about_chip_system_first: "Результат",
      about_noise: "Хайп ↓",
      about_clarity: "Ясность ↑",
      about_frameworks: "Практика · Шаблоны · Поддержка",
      about_mission_title: "Миссия",
      about_mission_text:
        "Измеримая экономия времени, качество работы и уверенная команда, которая использует ИИ ответственно.",
      about_values_title: "Принципы",
      about_values_1: "Конкретика, а не мода",
      about_values_2: "Безопасность и этика с первого дня",
      about_values_3: "Практика, которую можно повторить в понедельник",
      about_who_title: "Кому подойдёт",
      about_who_text:
        "Компаниям, внедряющим ИИ в подразделениях, и специалистам, которым нужны актуальные навыки 2026–2027 годов.",
      about_callout_title: "Полный обзор тем",
      about_callout_text: "Откройте страницу программ — там шесть ключевых направлений подробно.",
      about_callout_cta: "Смотреть программы",

      services_badge: "Услуги",
      services_h1: "Корпоративные воркшопы, программы и индивидуальный менторинг.",
      services_lead:
        "От полудня про продуктивность до много месяцев трансформации — с учётом латвийских организаций и требований соответствия.",
      services_chip_stack: "Форматы",
      services_chip_modular: "Под задачу",
      services_stack_1: "Воркшопы",
      services_stack_2: "Программы",
      services_stack_3: "Менторинг",
      services_core_h2: "Основные направления",
      services_core_sublead: "Одна планка качества — выбирайте глубину и длительность.",
      services_card1_title: "Корпоративная трансформация ИИ",
      services_card1_text: "Программы 4–16 часов: грамотность руководства, лаборатории продуктивности, отраслевые треки.",
      services_card1_li1: "Маркетинг · Продажи · IT · Юристы · Финансы · HR",
      services_card1_li2: "Шаблоны и playbooks на каждый день",
      services_card1_li3: "По запросу — трек для разработчиков (Cursor / Copilot)",
      services_card1_link: "Смотреть программы →",
      services_card2_title: "Индивидуальное обучение",
      services_card2_text: "Персональные сессии 1:1 (2–10 часов) под ваши инструменты и задачи.",
      services_card2_li1: "Мягкий старт для новичков",
      services_card2_li2: "Продвинутым — промпты и процессы",
      services_card2_li3: "Рига, другие города или онлайн",
      services_card2_link: "Темы программы →",
      services_card3_text: "1–3 месяца с контрольными точками, материалами и дополнительными консультациями.",
      services_card3_li1: "Привычки работы с ИИ",
      services_card3_li2: "Отчётность и обратная связь",
      services_card3_li3: "Закрытое сообщество выпускников (по договорённости)",
      services_how_h2: "Как проходит сотрудничество",
      services_how_sublead: "Бесплатная диагностика → программа → практика → поддержка после обучения.",
      services_step1_title: "Диагностика",
      services_step1_text: "20–30 минут: цели, уровень, ограничения.",
      services_step2_title: "Проектирование",
      services_step2_text: "Содержание и упражнения под отрасль и инструменты.",
      services_step3_title: "Занятия",
      services_step3_text: "Руки на клавиатуре — на реальных задачах из вашей работы.",
      services_step4_title: "Поддержка",
      services_step4_text: "Записи, материалы и по договорённости — сообщество или доп. консультации.",
      services_callout_title: "Нужно коммерческое предложение?",
      services_callout_text: "Ориентиры по ценам на главной; итог — после вводной беседы.",

      program_badge: "Программы",
      program_h1: "Шесть практических тем — от промптов до управления рисками.",
      program_lead: "Структура: промпты, модели, продуктивность, контент, автоматизация и безопасный ИИ.",
      program_chip_modules: "Темы",
      program_chip_structured: "Практика",
      program_card_loop: "Диагностика → План → Практика → Поддержка",
      program_card_stack: "Промпты · Модели · Продуктивность · Безопасность",
      program_card1_title: "Промпты и модели",
      program_card1_text:
        "Чёткие запросы к ИИ, продвинутые приёмы и сравнение ChatGPT, Claude, Cursor, Copilot, Grok, Gemini.",
      program_card1_li1: "Качество ответов и проверка",
      program_card1_li2: "Какую модель когда брать",
      program_card1_li3: "Сильные/слабые стороны и демо",
      program_card2_title: "Продуктивность и контент",
      program_card2_text: "Почта, встречи, исследования, маркетинговые тексты и SEO-ориентированные процессы.",
      program_card2_li1: "Документы, презентации, протоколы",
      program_card2_li2: "Исследование и конспекты",
      program_card2_li3: "Черновики контента с ограничениями",
      program_card3_title: "Автоматизация и безопасность",
      program_card3_text: "Простые автоматизации, поддержка разработчиков и контекст GDPR.",
      program_card3_li1: "Автоматизация без глубокого кода",
      program_card3_li2: "Для разработчиков: Cursor и Copilot",
      program_card3_li3: "Защита данных и снижение галлюцинаций",
      program_callout_title: "Не знаете, с чего начать?",
      program_callout_text: "Запишитесь на бесплатную диагностику 20–30 минут — предложу подходящую программу.",
    },
  };

  const contactForm = qs("#contactForm");
  if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const topic = String(formData.get("topic") || "").trim();
      const message = String(formData.get("message") || "").trim();

      const currentLang = localStorage.getItem("lang") || "lv";
      const dict = I18N[currentLang] || I18N.en;
      const topicLabel = (dict[`topic_${topic}`] || topic || "Message").trim();

      const subject = `${config.contactSubjectPrefix}${topicLabel || "Message"}`.trim();
      const bodyLines = [
        `${dict.contact_form_name}: ${name}`,
        `${dict.contact_form_email}: ${email}`,
        `${dict.contact_form_topic}: ${topicLabel}`,
        "",
        message,
      ];
      const mailto = `mailto:${encodeURIComponent(config.contactEmail)}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      window.location.href = mailto;
    });
  }

  const supportedLangs = ["en", "lv", "ru"];
  const getInitialLang = () => {
    const saved = localStorage.getItem("lang");
    if (saved && supportedLangs.includes(saved)) return saved;
    return "lv";
  };

  const applyLang = (lang) => {
    const dict = I18N[lang] || I18N.en;
    document.documentElement.lang = lang === "lv" ? "lv" : lang === "ru" ? "ru" : "en";

    qsa("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
    });

    qsa("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      const val = dict[key];
      if (typeof val === "string") el.setAttribute("aria-label", val);
    });

    const body = document.body;
    if (body) {
      const titleKey = body.getAttribute("data-doc-title");
      if (titleKey && typeof dict[titleKey] === "string") document.title = dict[titleKey];
      const descKey = body.getAttribute("data-doc-desc");
      if (descKey && typeof dict[descKey] === "string") {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", dict[descKey]);
      }
    }

    qsa("[data-lang-select]").forEach((sel) => {
      if (sel instanceof HTMLSelectElement) sel.value = lang;
    });
  };

  const lang = getInitialLang();
  applyLang(lang);

  qsa("[data-lang-select]").forEach((sel) => {
    if (!(sel instanceof HTMLSelectElement)) return;
    sel.addEventListener("change", () => {
      const next = sel.value;
      if (!supportedLangs.includes(next)) return;
      localStorage.setItem("lang", next);
      applyLang(next);
    });
  });

  // Copy email helper
  qsa("[data-copy-email]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const emailEl = qs("[data-contact-email]");
      const email = emailEl ? emailEl.textContent || "" : config.contactEmail;
      try {
        await navigator.clipboard.writeText(email.trim());
        btn.setAttribute("data-copied", "true");
        setTimeout(() => btn.removeAttribute("data-copied"), 900);
      } catch {
        // fallback: do nothing
      }
    });
  });

  const COOKIE_CONSENT_KEY = "cookie_consent";

  const initCookieConsent = () => {
    if (localStorage.getItem(COOKIE_CONSENT_KEY)) return;

    const bar = document.createElement("div");
    bar.className = "cookie-consent";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-live", "polite");

    const inner = document.createElement("div");
    inner.className = "cookie-consent__inner";

    const text = document.createElement("p");
    text.className = "cookie-consent__text";
    text.setAttribute("data-i18n", "cookie_banner_text");

    const actions = document.createElement("div");
    actions.className = "cookie-consent__actions";

    const accept = document.createElement("button");
    accept.type = "button";
    accept.className = "button cookie-consent__btn";
    accept.setAttribute("data-i18n", "cookie_accept");
    accept.addEventListener("click", () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      bar.remove();
    });

    const essential = document.createElement("button");
    essential.type = "button";
    essential.className = "button button--ghost cookie-consent__btn";
    essential.setAttribute("data-i18n", "cookie_essential");
    essential.addEventListener("click", () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
      bar.remove();
    });

    const privacy = document.createElement("a");
    privacy.className = "cookie-consent__privacy link";
    privacy.href = document.body?.getAttribute("data-privacy-href") || "./privacy.html";
    privacy.setAttribute("data-i18n", "cookie_privacy_link");

    actions.appendChild(accept);
    actions.appendChild(essential);
    inner.appendChild(text);
    inner.appendChild(actions);
    inner.appendChild(privacy);
    bar.appendChild(inner);
    document.body.appendChild(bar);
    applyLang(lang);
  };

  initCookieConsent();
})();
