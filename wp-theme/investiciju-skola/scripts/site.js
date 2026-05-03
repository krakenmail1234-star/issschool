(() => {
  const config = {
    discordInviteUrl: "https://discord.com/invite/REPLACE_ME",
    contactEmail: "hello@example.com",
    contactSubjectPrefix: "Investiciju Skola — ",
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

    qsa("a[href^=\"#\"]", mobileMenu).forEach((a) => {
      a.addEventListener("click", () => closeMobileMenu());
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMobileMenu();
    });
  }

  // --- i18n (ENG / LAT / RUS) ---
  const I18N = {
    en: {
      nav_program: "Program",
      nav_discord: "Discord",
      nav_mentorship: "Mentorship",
      nav_faq: "FAQ",
      nav_about: "About",
      nav_services: "Services",
      nav_contact: "Contact",
      cta_join_discord: "Join Discord",
      cta_contact: "Contact",
      cta_explore: "Explore",
      cta_program: "Program",
      nav_privacy: "Privacy",
      hero_cta_primary: "Explore the program",
      hero_cta_secondary: "See services",

      cookie_banner_text:
        "We store your language choice locally and use essential cookies only as needed for the site to work. See our privacy notice for details.",
      cookie_accept: "Accept",
      cookie_essential: "Essential only",
      cookie_privacy_link: "Privacy policy",

      skip_to_content: "Skip to content",
      footer_tagline: "Education & mentorship.",
      faq_chip_support: "Support",
      contact_chip_sla: "24–48h",
      aria_label_language: "Language",
      aria_nav_primary: "Primary navigation",
      aria_brand_home: "Investiciju Skola home",
      aria_open_menu: "Open menu",
      meta_title_home: "Investiciju Skola — Learn Financial Markets",
      meta_desc_home:
        "Financial markets education: structured lessons, weekly market briefings, and mentorship.",
      meta_title_program: "Program — Investiciju Skola",
      meta_desc_program: "Program: market mechanics, playbooks, and mentorship layer.",
      meta_title_about: "About — Investiciju Skola",
      meta_desc_about: "About Investiciju Skola: a system-first approach to learning financial markets.",
      meta_title_services: "Services — Investiciju Skola",
      meta_desc_services: "Services: lessons, market overviews, and mentorship offerings.",
      meta_title_privacy: "Privacy — Investiciju Skola",
      meta_desc_privacy: "Privacy and cookies notice for Investiciju Skola.",
      meta_title_discord: "Discord — Investiciju Skola",
      meta_desc_discord: "Discord community: briefings, Q&A, and a culture of clean execution.",
      meta_title_mentorship: "Mentorship — Investiciju Skola",
      meta_desc_mentorship: "Mentorship: structured feedback, reviews, and a clear iteration plan.",
      meta_title_faq: "FAQ — Investiciju Skola",
      meta_desc_faq: "Frequently asked questions about the program, community, and mentorship.",
      meta_title_contact: "Contact — Investiciju Skola",
      meta_desc_contact: "Contact Investiciju Skola for program questions, overviews, or mentorship.",

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
        "Structured learning for trading fundamentals and market mechanics, weekly market briefings, and focused mentorship.",
      home_stat1_k: "Focus",
      home_stat1_v: "FX · Indices · Crypto",
      home_stat2_k: "Format",
      home_stat2_v: "Lessons · Briefings · Mentorship",
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
      home_prog_card3_title: "Mentorship layer",
      home_prog_card3_text:
        "Feedback, review, and guidance tailored to your stage — from foundations to refinement.",
      home_prog_card3_li1: "1:1 reviews (optional)",
      home_prog_card3_li2: "Actionable improvements",
      home_prog_card3_li3: "Accountability cadence",

      topic_program: "Program questions",
      topic_discord: "Discord access",
      topic_mentorship: "Mentorship",
      topic_overview: "Program overview",

      contact_badge: "Contact",
      contact_h1: "Let’s talk.",
      contact_lead: "Send a message and we’ll get you the right next step: education, overviews, or mentorship.",
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
      contact_quicklinks: "Quick links",
      contact_boundary_title: "Boundary",
      contact_boundary_text: "Education only — no guaranteed results, no promised signals.",

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

      mentorship_badge: "Mentorship",
      mentorship_h1: "Feedback that becomes progress.",
      mentorship_lead: "A focused layer for traders who want reviews, clarity, and a plan.",
      mentorship_chip: "Mentorship",
      mentorship_chip_optional: "Optional",
      mentorship_card_line: "Review · Roadmap · Calibration",
      mentorship_card_note: "Education only · No promised results",
      mentorship_block1_title: "Review",
      mentorship_block1_text: "We diagnose your process, identify leaks, and design the next iteration.",
      mentorship_pill_journals: "Journals",
      mentorship_pill_rules: "Rules",
      mentorship_pill_execution: "Execution",
      mentorship_block2_title: "Roadmap",
      mentorship_block2_text: "A simple weekly plan with milestones, so progress is visible and repeatable.",
      mentorship_pill_weekly_goals: "Weekly goals",
      mentorship_pill_feedback: "Feedback",
      mentorship_pill_iteration: "Iteration",
      mentorship_block3_title: "Calibration",
      mentorship_block3_text: "Align your risk, expectations, and conditions — and remove chaos from decision-making.",
      mentorship_pill_risk_model: "Risk model",
      mentorship_pill_regimes: "Regimes",
      mentorship_pill_boundaries: "Boundaries",
      mentorship_callout_title: "Ready for a structured next step?",
      mentorship_callout_text: "Use the contact page to request a quick intro call.",

      faq_badge: "FAQ",
      faq_h1: "Quick answers. No fluff.",
      faq_lead: "A few common questions about the program, community, and mentorship.",
      faq_chip_clear: "Clear",
      faq_card_education_first: "Education-first",
      faq_card_unique_question: "If you have a unique question, contact us.",
      faq_q1: "Is this financial advice?",
      faq_a1: "No. This is educational content and mentorship around process and frameworks.",
      faq_q2: "Do you cover beginners?",
      faq_a2: "Yes — we start with clean foundations, then build toward execution and review loops.",
      faq_q3: "What instruments do you focus on?",
      faq_a3: "FX majors, indices, and crypto — with overviews that emphasize behavior and drivers.",
      faq_q4: "How do I join the Discord?",
      faq_a4:
        "Use the Discord page and click the invite button. The invite URL is configured in the site settings file (`scripts/site.js`).",
      faq_callout_title: "Still unsure what you need?",
      faq_callout_text: "Send a short message with your goals and current stage.",

      about_badge: "About",
      about_h1: "We teach markets like engineering.",
      about_lead:
        "Less randomness. More structure. A calm, repeatable approach to learning how markets behave and how to build a process you can trust.",
      about_chip_philosophy: "Philosophy",
      about_chip_system_first: "System-first",
      about_noise: "Noise ↓",
      about_clarity: "Clarity ↑",
      about_frameworks: "Frameworks · Reviews · Discipline",
      about_mission_title: "Mission",
      about_mission_text:
        "Help traders and market learners develop robust mental models and a process that survives variance.",
      about_values_title: "What we value",
      about_values_1: "Process over outcome",
      about_values_2: "Clear rules over improvisation",
      about_values_3: "Review loops over ego",
      about_who_title: "Who it’s for",
      about_who_text:
        "Beginners who want clarity and intermediate traders who want structure, feedback, and an accountable iteration plan.",
      about_callout_title: "Want to see how the program is structured?",
      about_callout_text: "Head back to the landing page and scroll through the modules.",
      about_callout_cta: "View the program",

      services_badge: "Services",
      services_h1: "Choose the layer you need.",
      services_lead:
        "Start with fundamentals, add structured market overviews, then plug in mentorship when you want fast feedback and iteration.",
      services_chip_stack: "Offering stack",
      services_chip_modular: "Modular",
      services_stack_1: "Lessons",
      services_stack_2: "Overviews",
      services_stack_3: "Mentorship",
      services_core_h2: "Core offerings",
      services_core_sublead: "Same framework, different intensity.",
      services_card1_title: "Education",
      services_card1_text: "Structured modules that build your mental model of markets and execution.",
      services_card1_li1: "Market mechanics",
      services_card1_li2: "Risk and process",
      services_card1_li3: "Review loops",
      services_card1_link: "See program →",
      services_card2_title: "Market overviews",
      services_card2_text: "Weekly narrative + instrument notes, so you’re trading a map — not a mood.",
      services_card2_li1: "Watchlists and drivers",
      services_card2_li2: "Session timing",
      services_card2_li3: "Regime notes",
      services_card2_link: "Program modules →",
      services_card3_title: "Mentorship",
      services_card3_text: "Actionable reviews and a plan that turns mistakes into upgrades.",
      services_card3_li1: "Process diagnosis",
      services_card3_li2: "Rules refinement",
      services_card3_li3: "Accountability",
      services_card3_link: "Mentorship details →",
      services_how_h2: "How we work",
      services_how_sublead: "A clean loop: learn → apply → review → iterate.",
      services_step1_title: "Assess",
      services_step1_text: "Where you are now — skill, process, and constraints.",
      services_step2_title: "Design",
      services_step2_text: "A simple plan with rules and conditions that fit your stage.",
      services_step3_title: "Execute",
      services_step3_text: "Repeat the protocol with a calm cadence.",
      services_step4_title: "Review",
      services_step4_text: "Tight feedback cycles that convert variance into learning.",
      services_callout_title: "Want a recommendation?",
      services_callout_text: "Send your goals and current stage — we’ll suggest the right layer.",

      program_badge: "Program",
      program_h1: "A program built like a system.",
      program_lead: "Progressive modules, practical frameworks, and clean mental models.",
      program_chip_modules: "Modules",
      program_chip_structured: "Structured",
      program_card_loop: "Learn → Apply → Review → Iterate",
      program_card_stack: "Mechanics · Playbooks · Mentorship",
      program_card1_title: "Market mechanics",
      program_card1_text:
        "Order flow concepts, liquidity, sessions, volatility, and why price moves — explained clearly.",
      program_card1_li1: "Structure, regimes, and narrative",
      program_card1_li2: "Risk thinking and execution hygiene",
      program_card1_li3: "Review loops and journaling",
      program_card2_title: "Playbooks",
      program_card2_text: "Repeatable setups and decision trees — so you know what to do, and when not to.",
      program_card2_li1: "Entry/exit protocols",
      program_card2_li2: "Conditions checklist",
      program_card2_li3: "Post-trade debrief",
      program_card3_title: "Mentorship layer",
      program_card3_text: "Feedback, review, and guidance tailored to your stage — from foundations to refinement.",
      program_card3_li1: "1:1 reviews (optional)",
      program_card3_li2: "Actionable improvements",
      program_card3_li3: "Accountability cadence",
      program_callout_title: "Want a recommended path?",
      program_callout_text: "Send your current stage and goals — we’ll suggest the right starting point.",
    },
    lv: {
      nav_program: "Programma",
      nav_discord: "Discord",
      nav_mentorship: "Mentorings",
      nav_faq: "BUJ",
      nav_about: "Par mums",
      nav_services: "Pakalpojumi",
      nav_contact: "Kontakti",
      cta_join_discord: "Pievienoties Discord",
      cta_contact: "Kontakti",
      cta_explore: "Apskatīt",
      cta_program: "Programma",
      nav_privacy: "Privātums",
      hero_cta_primary: "Apskatīt programmu",
      hero_cta_secondary: "Skatīt pakalpojumus",

      cookie_banner_text:
        "Mēs saglabājam valodas izvēli lokāli un izmantojam tikai nepieciešamās sīkdatnes, lai lapa darbotos. Sīkāk — privātuma paziņojumā.",
      cookie_accept: "Pieņemt",
      cookie_essential: "Tikai nepieciešamās",
      cookie_privacy_link: "Privātuma politika",

      skip_to_content: "Pāriet uz saturu",
      footer_tagline: "Izglītība un mentorings.",
      faq_chip_support: "Atbalsts",
      contact_chip_sla: "24–48 h",
      aria_label_language: "Valoda",
      aria_nav_primary: "Galvenā navigācija",
      aria_brand_home: "Investiciju Skola sākumlapa",
      aria_open_menu: "Atvērt izvēlni",
      meta_title_home: "Investiciju Skola — finanšu tirgu izglītība",
      meta_desc_home:
        "Finanšu tirgu izglītība: strukturētas nodarbības, nedēļas tirgus pārskati un mentorings.",
      meta_title_program: "Programma — Investiciju Skola",
      meta_desc_program: "Programma: tirgus mehānika, playbooki un mentoringa slānis.",
      meta_title_about: "Par mums — Investiciju Skola",
      meta_desc_about: "Par Investiciju Skola: sistēmvirzienu pieeja finanšu tirgu apguvei.",
      meta_title_services: "Pakalpojumi — Investiciju Skola",
      meta_desc_services: "Pakalpojumi: nodarbības, tirgus pārskati un mentoringa piedāvājums.",
      meta_title_privacy: "Privātums — Investiciju Skola",
      meta_desc_privacy: "Privātuma un sīkdatņu paziņojums Investiciju Skola vietnē.",
      meta_title_discord: "Discord — Investiciju Skola",
      meta_desc_discord: "Discord kopiena: pārskati, jautājumi–atbildes un kultūra ar disciplinētu izpildi.",
      meta_title_mentorship: "Mentorings — Investiciju Skola",
      meta_desc_mentorship: "Mentorings: strukturēta atgriezeniskā saite, analīzes un skaidrs iterācijas plāns.",
      meta_title_faq: "BUJ — Investiciju Skola",
      meta_desc_faq: "Biežāk uzdotie jautājumi par programmu, kopienu un mentoringu.",
      meta_title_contact: "Kontakti — Investiciju Skola",
      meta_desc_contact: "Sazinies ar Investiciju Skola par programmu, pārskatiem vai mentoringu.",

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
      home_stat2_v: "Nodarbības · Kopsavilkumi · Mentorings",
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
      home_prog_card3_title: "Mentoringa slānis",
      home_prog_card3_text:
        "Atsauksmes, analīze un vadība atbilstoši tavam līmenim — no pamatiem līdz smalkai kalibrācijai.",
      home_prog_card3_li1: "1:1 analīzes (pēc izvēles)",
      home_prog_card3_li2: "Konkrēti uzlabojumi",
      home_prog_card3_li3: "Atbildības ritms",

      topic_program: "Jautājumi par programmu",
      topic_discord: "Discord piekļuve",
      topic_mentorship: "Mentorings",
      topic_overview: "Programmas pārskats",

      contact_badge: "Kontakti",
      contact_h1: "Sazināmies.",
      contact_lead: "Uzraksti ziņu, un mēs ieteiksim nākamo soli: izglītību, pārskatus vai mentoringu.",
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
      contact_quicklinks: "Ātrās saites",
      contact_boundary_title: "Robežas",
      contact_boundary_text: "Tikai izglītība — bez garantijām un bez solītiem signāliem.",

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

      mentorship_badge: "Mentorings",
      mentorship_h1: "Atgriezeniskā saite, kas pārtop progresā.",
      mentorship_lead: "Fokusēts slānis tirgotājiem, kuri grib analīzes, skaidrību un plānu.",
      mentorship_chip: "Mentorings",
      mentorship_chip_optional: "Pēc izvēles",
      mentorship_card_line: "Analīze · Ceļa karte · Kalibrācija",
      mentorship_card_note: "Tikai izglītība · Bez solītiem rezultātiem",
      mentorship_block1_title: "Analīze",
      mentorship_block1_text: "Diagnosticējam tavu procesu, atrodam noplūdes un izstrādājam nākamo iterāciju.",
      mentorship_pill_journals: "Žurnāli",
      mentorship_pill_rules: "Noteikumi",
      mentorship_pill_execution: "Izpilde",
      mentorship_block2_title: "Ceļa karte",
      mentorship_block2_text: "Vienkāršs nedēļas plāns ar atskaites punktiem, lai progress būtu redzams un atkārtojams.",
      mentorship_pill_weekly_goals: "Nedēļas mērķi",
      mentorship_pill_feedback: "Atgriezeniskā saite",
      mentorship_pill_iteration: "Iterācija",
      mentorship_block3_title: "Kalibrācija",
      mentorship_block3_text: "Saskaņojam risku, gaidas un nosacījumus, lai lēmumos nebūtu haosa.",
      mentorship_pill_risk_model: "Riska modelis",
      mentorship_pill_regimes: "Režīmi",
      mentorship_pill_boundaries: "Robežas",
      mentorship_callout_title: "Gatavs strukturētam nākamajam solim?",
      mentorship_callout_text: "Atver kontaktu lapu un piesaki īsu ievadsarunu.",

      faq_badge: "BUJ",
      faq_h1: "Ātras atbildes. Bez liekvārdības.",
      faq_lead: "Biežākie jautājumi par programmu, kopienu un mentoringu.",
      faq_chip_clear: "Skaidri",
      faq_card_education_first: "Izglītība pirmajā vietā",
      faq_card_unique_question: "Ja jautājums ir specifisks, uzraksti mums.",
      faq_q1: "Vai šī ir finanšu konsultācija?",
      faq_a1: "Nē. Šeit ir izglītojošs saturs un mentoru atbalsts par procesu un pieeju.",
      faq_q2: "Vai tas der iesācējiem?",
      faq_a2: "Jā — sākam ar stabilu pamatu un pakāpeniski nonākam līdz izpildei un regulārai analīzei.",
      faq_q3: "Kādiem instrumentiem pievēršaties?",
      faq_a3: "Valūtu pāriem (FX), indeksiem un kripto — ar pārskatiem par uzvedību, virzītājiem un režīmiem.",
      faq_q4: "Kā pievienoties Discord?",
      faq_a4:
        "Atver Discord lapu un nospied ielūguma pogu. Ielūguma saite ir iestatāma vietnes konfigurācijas failā (`scripts/site.js`).",
      faq_callout_title: "Nezini, ar ko sākt?",
      faq_callout_text: "Uzraksti īsi par mērķi un pašreizējo līmeni — ieteiksim nākamo soli.",

      about_badge: "Par mums",
      about_h1: "Mēs mācam tirgus kā inženieriju.",
      about_lead:
        "Mazāk nejaušības. Vairāk struktūras. Mierīga, atkārtojama pieeja, lai saprastu tirgu uzvedību un izveidotu procesu, kuram vari uzticēties.",
      about_chip_philosophy: "Filozofija",
      about_chip_system_first: "Sistēma vispirms",
      about_noise: "Troksnis ↓",
      about_clarity: "Skaidrība ↑",
      about_frameworks: "Ietvari · Analīze · Disciplīna",
      about_mission_title: "Misija",
      about_mission_text:
        "Palīdzēt tirgotājiem un tirgu interesentiem izveidot stabilus domāšanas modeļus un procesu, kas iztur nejaušību.",
      about_values_title: "Ko mēs vērtējam",
      about_values_1: "Process svarīgāks par rezultātu",
      about_values_2: "Skaidri noteikumi svarīgāki par improvizāciju",
      about_values_3: "Regulāra analīze svarīgāka par ego",
      about_who_title: "Kam tas ir domāts",
      about_who_text:
        "Iesācējiem, kuri vēlas skaidrību, un vidēja līmeņa tirgotājiem, kuri vēlas struktūru, atgriezenisko saiti un atbildīgu attīstības plānu.",
      about_callout_title: "Vēlies redzēt programmas struktūru?",
      about_callout_text: "Atver programmas lapu un apskati moduļus.",
      about_callout_cta: "Skatīt programmu",

      services_badge: "Pakalpojumi",
      services_h1: "Izvēlies sev vajadzīgo līmeni.",
      services_lead:
        "Sāc ar pamatiem, pievieno strukturētus tirgus pārskatus un pieslēdz mentoringu, kad gribi ātru atgriezenisko saiti un iterāciju.",
      services_chip_stack: "Piedāvājuma līmeņi",
      services_chip_modular: "Modulāri",
      services_stack_1: "Nodarbības",
      services_stack_2: "Pārskati",
      services_stack_3: "Mentorings",
      services_core_h2: "Pamatpiedāvājums",
      services_core_sublead: "Tas pats ietvars, atšķirīga intensitāte.",
      services_card1_title: "Izglītība",
      services_card1_text: "Strukturēti moduļi, kas veido tavu tirgu un izpildes domāšanu.",
      services_card1_li1: "Tirgus mehānika",
      services_card1_li2: "Risks un process",
      services_card1_li3: "Analīzes cikli",
      services_card1_link: "Skatīt programmu →",
      services_card2_title: "Tirgus pārskati",
      services_card2_text: "Nedēļas naratīvs + instrumentu piezīmes, lai tu tirgotu karti — nevis noskaņojumu.",
      services_card2_li1: "Watchlisti un virzītāji",
      services_card2_li2: "Sesiju laiks",
      services_card2_li3: "Režīmu piezīmes",
      services_card2_link: "Programmas moduļi →",
      services_card3_title: "Mentorings",
      services_card3_text: "Praktiskas analīzes un plāns, kas kļūdas pārvērš uzlabojumos.",
      services_card3_li1: "Procesa diagnostika",
      services_card3_li2: "Noteikumu uzlabošana",
      services_card3_li3: "Atbildība",
      services_card3_link: "Mentoringa detaļas →",
      services_how_h2: "Kā mēs strādājam",
      services_how_sublead: "Tīrs cikls: mācies → pielieto → analizē → uzlabo.",
      services_step1_title: "Novērtē",
      services_step1_text: "Kur tu esi šobrīd — prasmes, process un ierobežojumi.",
      services_step2_title: "Izstrādā",
      services_step2_text: "Vienkāršs plāns ar noteikumiem un nosacījumiem, kas atbilst tavam līmenim.",
      services_step3_title: "Izpildi",
      services_step3_text: "Atkārto protokolu mierīgā ritmā.",
      services_step4_title: "Analizē",
      services_step4_text: "Īsi atgriezeniskās saites cikli, kas pārvērš nejaušību mācībās.",
      services_callout_title: "Vēlies ieteikumu?",
      services_callout_text: "Atsūti mērķi un pašreizējo līmeni — ieteiksim pareizo līmeni.",

      program_badge: "Programma",
      program_h1: "Programma veidota kā sistēma.",
      program_lead: "Pakāpeniski moduļi, praktiski ietvari un skaidri domāšanas modeļi.",
      program_chip_modules: "Moduļi",
      program_chip_structured: "Strukturēti",
      program_card_loop: "Mācies → Pielieto → Analizē → Uzlabo",
      program_card_stack: "Mehānika · Playbooki · Mentorings",
      program_card1_title: "Tirgus mehānika",
      program_card1_text:
        "Order flow idejas, likviditāte, sesijas, volatilitāte un kāpēc cena kustas — izskaidrots saprotami.",
      program_card1_li1: "Struktūra, režīmi un naratīvs",
      program_card1_li2: "Riska domāšana un izpildes higiēna",
      program_card1_li3: "Analīze un žurnāls",
      program_card2_title: "Playbooki",
      program_card2_text: "Atkārtojami setupi un lēmumu koki — lai zinātu, ko darīt un kad atturēties.",
      program_card2_li1: "Ieejas/izejas protokoli",
      program_card2_li2: "Nosacījumu saraksts",
      program_card2_li3: "Pēctirdzniecības debrief",
      program_card3_title: "Mentoringa slānis",
      program_card3_text: "Atgriezeniskā saite un analīze, pielāgota tavam līmenim — no pamatiem līdz refinēšanai.",
      program_card3_li1: "1:1 analīzes (pēc izvēles)",
      program_card3_li2: "Konkrēti uzlabojumi",
      program_card3_li3: "Atbildības ritms",
      program_callout_title: "Vēlies ieteiktu ceļu?",
      program_callout_text: "Atsūti savu līmeni un mērķi — ieteiksim labāko startu.",
    },
    ru: {
      nav_program: "Программа",
      nav_discord: "Discord",
      nav_mentorship: "Наставничество",
      nav_faq: "FAQ",
      nav_about: "О нас",
      nav_services: "Услуги",
      nav_contact: "Контакты",
      cta_join_discord: "В Discord",
      cta_contact: "Контакты",
      cta_explore: "Открыть",
      cta_program: "Программа",
      nav_privacy: "Конфиденциальность",
      hero_cta_primary: "Открыть программу",
      hero_cta_secondary: "Смотреть услуги",

      cookie_banner_text:
        "Мы сохраняем выбор языка локально и используем только необходимые cookie для работы сайта. Подробности — в политике конфиденциальности.",
      cookie_accept: "Принять",
      cookie_essential: "Только необходимые",
      cookie_privacy_link: "Политика конфиденциальности",

      skip_to_content: "Перейти к содержимому",
      footer_tagline: "Обучение и наставничество.",
      faq_chip_support: "Поддержка",
      contact_chip_sla: "24–48 ч",
      aria_label_language: "Язык",
      aria_nav_primary: "Основная навигация",
      aria_brand_home: "Главная Investiciju Skola",
      aria_open_menu: "Открыть меню",
      meta_title_home: "Investiciju Skola — обучение финансовым рынкам",
      meta_desc_home:
        "Обучение финансовым рынкам: структурированные уроки, еженедельные брифинги и наставничество.",
      meta_title_program: "Программа — Investiciju Skola",
      meta_desc_program: "Программа: механика рынка, плейбуки и слой наставничества.",
      meta_title_about: "О нас — Investiciju Skola",
      meta_desc_about: "О Investiciju Skola: системный подход к изучению финансовых рынков.",
      meta_title_services: "Услуги — Investiciju Skola",
      meta_desc_services: "Услуги: уроки, рыночные обзоры и наставничество.",
      meta_title_privacy: "Конфиденциальность — Investiciju Skola",
      meta_desc_privacy: "Уведомление о конфиденциальности и cookie для Investiciju Skola.",
      meta_title_discord: "Discord — Investiciju Skola",
      meta_desc_discord: "Сообщество Discord: брифинги, Q&A и культура дисциплинированного исполнения.",
      meta_title_mentorship: "Наставничество — Investiciju Skola",
      meta_desc_mentorship: "Наставничество: структурная обратная связь, разборы и понятный план итераций.",
      meta_title_faq: "FAQ — Investiciju Skola",
      meta_desc_faq: "Частые вопросы о программе, сообществе и наставничестве.",
      meta_title_contact: "Контакты — Investiciju Skola",
      meta_desc_contact: "Свяжитесь с Investiciju Skola по вопросам программы, обзоров или наставничества.",

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

      topic_program: "Вопросы по программе",
      topic_discord: "Доступ в Discord",
      topic_mentorship: "Наставничество",
      topic_overview: "Обзор программы",

      contact_badge: "Контакты",
      contact_h1: "Свяжемся.",
      contact_lead: "Напишите сообщение — и мы подскажем следующий шаг: обучение, обзоры или наставничество.",
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
      contact_quicklinks: "Быстрые ссылки",
      contact_boundary_title: "Граница",
      contact_boundary_text: "Только обучение — без гарантий и без обещанных сигналов.",

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

      mentorship_badge: "Наставничество",
      mentorship_h1: "Обратная связь, которая превращается в прогресс.",
      mentorship_lead: "Фокусный уровень для трейдеров, которым нужны разборы, ясность и план.",
      mentorship_chip: "Наставничество",
      mentorship_chip_optional: "По желанию",
      mentorship_card_line: "Разбор · Дорожная карта · Калибровка",
      mentorship_card_note: "Только обучение · Без обещаний результата",
      mentorship_block1_title: "Разбор",
      mentorship_block1_text: "Диагностируем ваш процесс, находим утечки и проектируем следующую итерацию.",
      mentorship_pill_journals: "Журналы",
      mentorship_pill_rules: "Правила",
      mentorship_pill_execution: "Исполнение",
      mentorship_block2_title: "Дорожная карта",
      mentorship_block2_text: "Простой недельный план с вехами, чтобы прогресс был видимым и повторяемым.",
      mentorship_pill_weekly_goals: "Цели недели",
      mentorship_pill_feedback: "Обратная связь",
      mentorship_pill_iteration: "Итерации",
      mentorship_block3_title: "Калибровка",
      mentorship_block3_text: "Согласуем риск, ожидания и условия — чтобы убрать хаос из решений.",
      mentorship_pill_risk_model: "Риск-модель",
      mentorship_pill_regimes: "Режимы",
      mentorship_pill_boundaries: "Границы",
      mentorship_callout_title: "Готовы к структурированному следующему шагу?",
      mentorship_callout_text: "Откройте страницу контактов и запросите короткий вводный созвон.",

      faq_badge: "FAQ",
      faq_h1: "Коротко и по делу.",
      faq_lead: "Частые вопросы о программе, сообществе и наставничестве.",
      faq_chip_clear: "Понятно",
      faq_card_education_first: "Сначала — обучение",
      faq_card_unique_question: "Если вопрос нестандартный — напишите нам.",
      faq_q1: "Это финансовая рекомендация?",
      faq_a1: "Нет. Это образовательные материалы и наставничество о процессе и рабочих подходах.",
      faq_q2: "Подходит ли новичкам?",
      faq_a2: "Да — начинаем с базовых принципов и постепенно переходим к исполнению и циклам разбора.",
      faq_q3: "На каких инструментах вы фокусируетесь?",
      faq_a3: "FX, индексы и крипто — с обзорами, где важны поведение инструмента, драйверы и режимы.",
      faq_q4: "Как попасть в Discord?",
      faq_a4:
        "Откройте страницу Discord и нажмите кнопку приглашения. Ссылка задаётся в файле настроек сайта (`scripts/site.js`).",
      faq_callout_title: "Не уверены, что вам нужно?",
      faq_callout_text: "Напишите коротко о цели и текущем уровне — подскажем следующий шаг.",

      about_badge: "О нас",
      about_h1: "Мы учим рынки как инженерной дисциплине.",
      about_lead:
        "Меньше случайности. Больше структуры. Спокойный, повторяемый подход к пониманию поведения рынка и построению процесса, которому можно доверять.",
      about_chip_philosophy: "Подход",
      about_chip_system_first: "Система прежде всего",
      about_noise: "Шум ↓",
      about_clarity: "Ясность ↑",
      about_frameworks: "Фреймворки · Разбор · Дисциплина",
      about_mission_title: "Миссия",
      about_mission_text:
        "Помочь трейдерам и изучающим рынки выстроить прочные модели мышления и процесс, устойчивый к вариативности.",
      about_values_title: "Наши принципы",
      about_values_1: "Процесс важнее результата",
      about_values_2: "Чёткие правила важнее импровизации",
      about_values_3: "Циклы разбора важнее эго",
      about_who_title: "Кому подойдёт",
      about_who_text:
        "Новичкам, которым нужна ясность, и трейдерам среднего уровня, которым нужна структура, обратная связь и план итераций.",
      about_callout_title: "Хотите увидеть структуру программы?",
      about_callout_text: "Откройте страницу программы и посмотрите модули.",
      about_callout_cta: "Открыть программу",

      services_badge: "Услуги",
      services_h1: "Выберите нужный уровень.",
      services_lead:
        "Начните с базиса, добавьте структурированные обзоры рынка и подключите наставничество, когда нужна быстрая обратная связь и итерации.",
      services_chip_stack: "Стек услуг",
      services_chip_modular: "Модульно",
      services_stack_1: "Уроки",
      services_stack_2: "Обзоры",
      services_stack_3: "Наставничество",
      services_core_h2: "Основные направления",
      services_core_sublead: "Один фреймворк — разная глубина.",
      services_card1_title: "Обучение",
      services_card1_text: "Структурированные модули, которые формируют понимание рынка и исполнение.",
      services_card1_li1: "Механика рынка",
      services_card1_li2: "Риск и процесс",
      services_card1_li3: "Циклы разбора",
      services_card1_link: "Смотреть программу →",
      services_card2_title: "Обзоры рынка",
      services_card2_text: "Еженедельный контекст + заметки по инструментам, чтобы вы торговали по карте, а не по эмоциям.",
      services_card2_li1: "Watchlist и драйверы",
      services_card2_li2: "Тайминг сессий",
      services_card2_li3: "Заметки по режимам",
      services_card2_link: "Модули программы →",
      services_card3_title: "Наставничество",
      services_card3_text: "Практические разборы и план, который превращает ошибки в улучшения.",
      services_card3_li1: "Диагностика процесса",
      services_card3_li2: "Настройка правил",
      services_card3_li3: "Ответственность",
      services_card3_link: "Детали наставничества →",
      services_how_h2: "Как мы работаем",
      services_how_sublead: "Чистый цикл: учитесь → применяете → разбираете → улучшаете.",
      services_step1_title: "Оценка",
      services_step1_text: "Где вы сейчас — навыки, процесс и ограничения.",
      services_step2_title: "План",
      services_step2_text: "Простой план с правилами и условиями под ваш уровень.",
      services_step3_title: "Исполнение",
      services_step3_text: "Повторяйте протокол в спокойном ритме.",
      services_step4_title: "Разбор",
      services_step4_text: "Короткие циклы обратной связи, которые превращают вариативность в обучение.",
      services_callout_title: "Нужна рекомендация?",
      services_callout_text: "Напишите цель и текущий уровень — подскажем подходящий формат.",

      program_badge: "Программа",
      program_h1: "Программа, построенная как система.",
      program_lead: "Пошаговые модули, практичные фреймворки и чистые модели мышления.",
      program_chip_modules: "Модули",
      program_chip_structured: "Структурно",
      program_card_loop: "Учитесь → Применяете → Разбираете → Улучшаете",
      program_card_stack: "Механика · Плейбуки · Наставничество",
      program_card1_title: "Механика рынка",
      program_card1_text:
        "Order flow, ликвидность, сессии, волатильность и причины движения цены — ясно и с примерами.",
      program_card1_li1: "Структура, режимы и контекст",
      program_card1_li2: "Мышление о риске и чистое исполнение",
      program_card1_li3: "Разбор и журнал",
      program_card2_title: "Плейбуки",
      program_card2_text: "Повторяемые сетапы и дерево решений — чтобы знать, что делать и когда не входить.",
      program_card2_li1: "Протоколы входа/выхода",
      program_card2_li2: "Чек-лист условий",
      program_card2_li3: "Разбор после сделки",
      program_card3_title: "Слой наставничества",
      program_card3_text: "Обратная связь и разбор под ваш уровень — от базы до тонкой настройки.",
      program_card3_li1: "Разбор 1:1 (по желанию)",
      program_card3_li2: "Практичные улучшения",
      program_card3_li3: "Ритм ответственности",
      program_callout_title: "Нужна рекомендованная траектория?",
      program_callout_text: "Напишите ваш уровень и цель — подскажем лучший старт.",
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

      const currentLang = localStorage.getItem("lang") || "en";
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
    return "en";
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
