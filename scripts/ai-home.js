/* Intelekta Skola — premium AI landing (blue/white/black).
 * Latvian by default, with EN / RU language switch.
 * Vanilla JS reproducing the requested Framer-Motion behaviour:
 *   reveal: opacity 0->1, y 24->0, 0.8s, ease [0.25,0,0,1]
 *   cards:  whileHover translateY(-8px) scale(1.02) + perspective tilt
 *   roadmap: gold/blue line drawn on scroll
 *   hero:   Three.js blue particle field, mouse parallax + scroll scrub
 * Plus: free-guide email-capture modal on first visit.
 */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STRIPE_MAIN = 'https://buy.stripe.com/3cI14m6Y3ahgbiS0vP2ZO01';
  const STRIPE_INDIVIDUAL = 'https://buy.stripe.com/9B6bJ0gyD610dr00vP2ZO00';
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- translations ---------- */
  const T = {
    lv: {
      nav: { courses: 'Kursi', tools: 'Bezmaksas rīki', why: 'Kāpēc mēs', roadmap: 'Ceļa karte', contact: 'Kontakti', enroll: 'Pieteikties' },
      hero: {
        badge: 'AI izglītība · ieviesta praksē',
        title1: 'Apgūsti mākslīgo intelektu, kas',
        title2: 'patiešām virza tavu biznesu.',
        sub: 'Praktiskas, uz darbību vērstas apmācības ChatGPT, promptu inženierijā, automatizācijā un reālā AI ieviešanā — profesionāļiem, komandām un zinātkārajiem.',
        cta1: 'Pieteikties tagad', cta2: 'Apskatīt kursus',
      },
      courses: {
        label: 'Kursi', head1: 'Programmas reālam', head2: 'AI darbam.',
        items: [
          { title: 'AI ieviešana', desc: 'Uzzini, kā uzņēmumi ievieš AI sistēmas, darba plūsmas un produktivitātes risinājumus.', cta: 'Pieteikties' },
          { title: 'ChatGPT un LLM meistarība', desc: 'Praktiska AI lietošana, prompti, darba plūsmas un padziļinātas ChatGPT tehnikas.', cta: 'Pieteikties' },
          { title: 'AI automatizācija sociālajiem tīkliem', desc: 'Automatizē satura veidošanu, plānošanu un publicēšanu ar mūsdienu AI rīkiem.', cta: 'Pieteikties' },
          { title: 'Individuālais AI kurss', desc: 'Personalizētas individuālas apmācības, pielāgotas taviem mērķiem un profesijai.', cta: 'Pieteikt 1:1', badge: 'Personīgākais' },
          { title: 'Promptu inženierija', desc: 'Apgūsti strukturētu promptu veidošanu biznesam, radošumam un automatizācijai.', cta: 'Pieteikties' },
        ],
      },
      tools: {
        label: 'Mācies darot', head: 'Bezmaksas AI mācību rīki',
        sub: 'Izmēģini metodes pirms pieteikšanās. Bez reģistrācijas. Veidojusi Intelekta Skola.',
        live: 'Pieejams', soon: 'Drīzumā', open: 'Atvērt rīku', comingSoon: 'Drīzumā',
        items: [
          { title: 'AI zināšanu tests', desc: 'Pārbaudi savas AI zināšanas.' },
          { title: 'Promptu ģenerators', desc: 'Izveido profesionālus promptus.' },
          { title: 'Promptu uzlabotājs', desc: 'Uzlabo vājus promptus uzreiz.' },
          { title: 'AI gatavības novērtējums', desc: 'Novērtē gatavību AI ieviešanai.' },
          { title: 'ChatGPT pielietojumu meklētājs', desc: 'Atklāj praktiskus biznesa pielietojumus.' },
          { title: 'AI laika un ROI kalkulators', desc: 'Redzi, cik stundu un eiro AI ietaupa.' },
        ],
      },
      why: {
        label: 'Kāpēc Intelekta Skola', head1: 'Radīts praktiskai', head2: 'AI meistarībai.',
        items: [
          { title: 'Reāla ieviešana', desc: 'Katra koncepcija pārvēršas darba plūsmā, ko vari ieviest jau tajā pašā nedēļā.' },
          { title: 'Mācīšanās darot', desc: 'Tu veido, raksti promptus un automatizē dzīvē — ne tikai skaties slaidus.' },
          { title: 'Uz biznesu vērstas prasmes', desc: 'Saistītas ar ieņēmumiem, ietaupīto laiku un reāliem rezultātiem.' },
          { title: 'Automatizācijas domāšana', desc: 'Izveido vienreiz, ļauj AI atkārtot — saturā, operācijās un atbalstā.' },
          { title: 'Individuāls mentorings', desc: 'Personīgs atbalsts, pielāgots tavai lomai un mērķiem.' },
          { title: 'Nākotnei droša programma', desc: 'Pastāvīgi atjaunināta, modeļiem un rīkiem attīstoties.' },
        ],
      },
      roadmap: {
        label: 'Ceļa karte', head: 'Tava mācību ceļa karte',
        items: [
          { title: 'Pamati', desc: 'Kā mūsdienu AI domā un kur tas palīdz.' },
          { title: 'ChatGPT meistarība', desc: 'Ikdienas brīvība ar valodas modeļiem.' },
          { title: 'Promptu inženierija', desc: 'Strukturēti, atkārtojami rezultāti.' },
          { title: 'Automatizācija', desc: 'Novērs atkārtoto darbu.' },
          { title: 'AI ieviešana', desc: 'Ievies AI visā uzņēmumā.' },
        ],
      },
      company: {
        title: 'Uzņēmums', addrLabel: 'Juridiskā adrese', addrCity: 'Lielvārde, Ogres novads', addrZip: 'LV-5071, Latvija',
        rows: [
          { k: 'Reģ. numurs', v: '40203747500' },
          { k: 'Reģistrēts', v: '19.05.2026' },
          { k: 'PVN numurs', v: 'LV40203747500' },
          { k: 'PVN statuss', v: 'Aktīvs', good: true },
        ],
      },
      contact: {
        label: 'Kontakti', head1: 'Sāc savu', head2: 'AI ceļu',
        name: 'Vārds', email: 'E-pasts', message: 'Ziņa', send: 'Sūtīt ziņu',
        namePh: 'Tavs vārds', emailPh: 'tu@uznemums.lv', messagePh: 'Ko vēlies apgūt vai ieviest?',
        note: 'Atver tavu e-pasta klientu ar adresi info@intelektaskola.lv.', subject: 'AI apmācību pieprasījums',
      },
      final: { label: 'Gatavs nākotnei?', head1: 'Nākamā desmitgade', head2: 'pieder AI.', sub: 'Apgūsti praktiskas mākslīgā intelekta prasmes ar Intelekta Skolu.', cta: 'Pieteikties tagad' },
      footer: { program: 'Programma', privacy: 'Privātums' },
      guide: {
        badge: 'Bezmaksas dāvana', title: 'Saņem bezmaksas AI ceļvedi',
        sub: '“5 AI darbplūsmas, kas ietaupa stundas katru nedēļu” — praktisks ceļvedis latviešu valodā. Ievadi e-pastu, un nosūtīsim to tev.',
        namePh: 'Tavs vārds', emailPh: 'E-pasta adrese', button: 'Saņemt ceļvedi', skip: 'Varbūt vēlāk',
        privacy: 'Bez surogātpasta. Atrakstīšanās jebkurā laikā.', subject: 'Bezmaksas AI ceļveža pieprasījums',
        success: 'Paldies! Atveram tavu e-pasta klientu, lai pabeigtu pieprasījumu.',
      },
    },

    en: {
      nav: { courses: 'Courses', tools: 'Free tools', why: 'Why us', roadmap: 'Roadmap', contact: 'Contact', enroll: 'Enroll' },
      hero: {
        badge: 'AI Education · Implemented',
        title1: 'Master the AI that actually',
        title2: 'moves your business.',
        sub: 'Practical, hands-on training in ChatGPT, prompt engineering, automation and real-world AI implementation — for professionals, teams and the genuinely curious.',
        cta1: 'Enroll Today', cta2: 'Explore courses',
      },
      courses: {
        label: 'Courses', head1: 'Programs built for', head2: 'real-world AI.',
        items: [
          { title: 'AI Implementation', desc: 'Learn how businesses deploy AI systems, workflows and productivity solutions.', cta: 'Enroll' },
          { title: 'ChatGPT & LLM Mastery', desc: 'Practical AI usage, prompting, workflows and advanced ChatGPT techniques.', cta: 'Enroll' },
          { title: 'AI Automation for Social Media', desc: 'Automate content generation, planning and publishing using modern AI tools.', cta: 'Enroll' },
          { title: 'AI Individual Course', desc: 'Personalized one-on-one learning tailored to your goals and profession.', cta: 'Book 1:1', badge: 'Most personal' },
          { title: 'Prompt Engineering', desc: 'Master structured prompting for business, creativity and automation.', cta: 'Enroll' },
        ],
      },
      tools: {
        label: 'Practice What You Learn', head: 'Free AI Learning Tools',
        sub: 'Try the methods before you enrol. No sign-up. Built by Intelekta Skola.',
        live: 'Live', soon: 'Soon', open: 'Open tool', comingSoon: 'Coming soon',
        items: [
          { title: 'AI Knowledge Quiz', desc: 'Test your AI knowledge.' },
          { title: 'Prompt Generator', desc: 'Generate professional prompts.' },
          { title: 'Prompt Improver', desc: 'Improve weak prompts instantly.' },
          { title: 'AI Readiness Assessment', desc: 'Evaluate AI adoption readiness.' },
          { title: 'ChatGPT Use Case Finder', desc: 'Discover practical business use cases.' },
          { title: 'AI Time & ROI Calculator', desc: 'See the hours and euros AI saves you.' },
        ],
      },
      why: {
        label: 'Why Intelekta Skola', head1: 'Built for', head2: 'practical AI mastery.',
        items: [
          { title: 'Real-world implementation', desc: 'Every concept lands as a workflow you can ship the same week.' },
          { title: 'Hands-on learning', desc: 'You build, prompt and automate live — not just watch slides.' },
          { title: 'Business-focused skills', desc: 'Tied to revenue, time saved and real operational outcomes.' },
          { title: 'Automation-first mindset', desc: 'Design once, let AI repeat it — across content, ops and support.' },
          { title: 'Individual mentoring', desc: 'One-on-one guidance tailored to your role and goals.' },
          { title: 'Future-proof curriculum', desc: 'Continuously updated as models and tools evolve.' },
        ],
      },
      roadmap: {
        label: 'Roadmap', head: 'Your learning roadmap',
        items: [
          { title: 'Foundations', desc: 'How modern AI thinks, and where it helps.' },
          { title: 'ChatGPT Mastery', desc: 'Daily fluency with LLMs.' },
          { title: 'Prompt Engineering', desc: 'Structured, repeatable results.' },
          { title: 'Automation', desc: 'Remove the repetitive work.' },
          { title: 'AI Implementation', desc: 'Deploy across the business.' },
        ],
      },
      company: {
        title: 'Company', addrLabel: 'Legal address', addrCity: 'Lielvārde, Ogres novads', addrZip: 'LV-5071, Latvia',
        rows: [
          { k: 'Reg. number', v: '40203747500' },
          { k: 'Registered', v: '19.05.2026' },
          { k: 'VAT number', v: 'LV40203747500' },
          { k: 'VAT status', v: 'Active', good: true },
        ],
      },
      contact: {
        label: 'Contact', head1: 'Start Your', head2: 'AI Journey',
        name: 'Name', email: 'Email', message: 'Message', send: 'Send message',
        namePh: 'Your name', emailPh: 'you@company.com', messagePh: 'What would you like to learn or implement?',
        note: 'Opens your email client addressed to info@intelektaskola.lv.', subject: 'AI training enquiry',
      },
      final: { label: 'Ready For The Future?', head1: 'The next decade', head2: 'belongs to AI.', sub: 'Learn practical artificial intelligence skills with Intelekta Skola.', cta: 'Enroll Today' },
      footer: { program: 'Program', privacy: 'Privacy' },
      guide: {
        badge: 'Free gift', title: 'Get the free AI guide',
        sub: '“5 AI workflows that save hours every week” — a practical guide. Enter your email and we will send it to you.',
        namePh: 'Your name', emailPh: 'Email address', button: 'Send me the guide', skip: 'Maybe later',
        privacy: 'No spam. Unsubscribe anytime.', subject: 'Free AI guide request',
        success: 'Thank you! Opening your email client to complete the request.',
      },
    },

    ru: {
      nav: { courses: 'Курсы', tools: 'Бесплатные инструменты', why: 'Почему мы', roadmap: 'Дорожная карта', contact: 'Контакты', enroll: 'Записаться' },
      hero: {
        badge: 'Обучение ИИ · с внедрением',
        title1: 'Освойте искусственный интеллект,',
        title2: 'который реально двигает бизнес.',
        sub: 'Практическое обучение ChatGPT, промпт-инженерии, автоматизации и реальному внедрению ИИ — для специалистов, команд и всех любознательных.',
        cta1: 'Записаться сейчас', cta2: 'Смотреть курсы',
      },
      courses: {
        label: 'Курсы', head1: 'Программы для', head2: 'реального ИИ.',
        items: [
          { title: 'Внедрение ИИ', desc: 'Узнайте, как компании внедряют ИИ-системы, процессы и решения для продуктивности.', cta: 'Записаться' },
          { title: 'Мастерство ChatGPT и LLM', desc: 'Практическое использование ИИ, промпты, процессы и продвинутые техники ChatGPT.', cta: 'Записаться' },
          { title: 'Автоматизация соцсетей с ИИ', desc: 'Автоматизируйте создание контента, планирование и публикацию современными ИИ-инструментами.', cta: 'Записаться' },
          { title: 'Индивидуальный курс по ИИ', desc: 'Персональное обучение один на один под ваши цели и профессию.', cta: 'Записаться 1:1', badge: 'Самый личный' },
          { title: 'Промпт-инженерия', desc: 'Освойте структурированные промпты для бизнеса, творчества и автоматизации.', cta: 'Записаться' },
        ],
      },
      tools: {
        label: 'Практикуйте изученное', head: 'Бесплатные ИИ-инструменты',
        sub: 'Попробуйте методы до записи. Без регистрации. Создано Intelekta Skola.',
        live: 'Доступно', soon: 'Скоро', open: 'Открыть инструмент', comingSoon: 'Скоро',
        items: [
          { title: 'Тест знаний об ИИ', desc: 'Проверьте свои знания об ИИ.' },
          { title: 'Генератор промптов', desc: 'Создавайте профессиональные промпты.' },
          { title: 'Улучшение промптов', desc: 'Мгновенно улучшайте слабые промпты.' },
          { title: 'Оценка готовности к ИИ', desc: 'Оцените готовность к внедрению ИИ.' },
          { title: 'Поиск сценариев ChatGPT', desc: 'Найдите практические бизнес-сценарии.' },
          { title: 'Калькулятор времени и ROI', desc: 'Сколько часов и евро экономит ИИ.' },
        ],
      },
      why: {
        label: 'Почему Intelekta Skola', head1: 'Создано для', head2: 'практического мастерства ИИ.',
        items: [
          { title: 'Реальное внедрение', desc: 'Каждая идея превращается в процесс, который можно внедрить уже на этой неделе.' },
          { title: 'Обучение на практике', desc: 'Вы создаёте, пишете промпты и автоматизируете вживую — не просто смотрите слайды.' },
          { title: 'Навыки для бизнеса', desc: 'Связаны с доходом, сэкономленным временем и реальными результатами.' },
          { title: 'Мышление автоматизации', desc: 'Настройте один раз — пусть ИИ повторяет: контент, операции, поддержка.' },
          { title: 'Индивидуальное наставничество', desc: 'Персональная поддержка под вашу роль и цели.' },
          { title: 'Программа на будущее', desc: 'Постоянно обновляется по мере развития моделей и инструментов.' },
        ],
      },
      roadmap: {
        label: 'Дорожная карта', head: 'Ваша дорожная карта обучения',
        items: [
          { title: 'Основы', desc: 'Как думает современный ИИ и где он помогает.' },
          { title: 'Мастерство ChatGPT', desc: 'Уверенная ежедневная работа с LLM.' },
          { title: 'Промпт-инженерия', desc: 'Структурные, повторяемые результаты.' },
          { title: 'Автоматизация', desc: 'Уберите повторяющуюся работу.' },
          { title: 'Внедрение ИИ', desc: 'Внедрите ИИ во всю компанию.' },
        ],
      },
      company: {
        title: 'Компания', addrLabel: 'Юридический адрес', addrCity: 'Lielvārde, Ogres novads', addrZip: 'LV-5071, Латвия',
        rows: [
          { k: 'Рег. номер', v: '40203747500' },
          { k: 'Зарегистрировано', v: '19.05.2026' },
          { k: 'Номер НДС', v: 'LV40203747500' },
          { k: 'Статус НДС', v: 'Активен', good: true },
        ],
      },
      contact: {
        label: 'Контакты', head1: 'Начните свой', head2: 'путь в ИИ',
        name: 'Имя', email: 'Эл. почта', message: 'Сообщение', send: 'Отправить',
        namePh: 'Ваше имя', emailPh: 'you@company.com', messagePh: 'Что хотите изучить или внедрить?',
        note: 'Откроет ваш почтовый клиент с адресом info@intelektaskola.lv.', subject: 'Запрос об обучении ИИ',
      },
      final: { label: 'Готовы к будущему?', head1: 'Следующее десятилетие', head2: 'принадлежит ИИ.', sub: 'Осваивайте практические навыки искусственного интеллекта с Intelekta Skola.', cta: 'Записаться сейчас' },
      footer: { program: 'Программа', privacy: 'Конфиденциальность' },
      guide: {
        badge: 'Бесплатный подарок', title: 'Получите бесплатный гид по ИИ',
        sub: '«5 ИИ-процессов, которые экономят часы каждую неделю» — практический гид. Введите эл. почту, и мы пришлём его.',
        namePh: 'Ваше имя', emailPh: 'Адрес эл. почты', button: 'Прислать гид', skip: 'Может, позже',
        privacy: 'Без спама. Отписка в любой момент.', subject: 'Запрос бесплатного гида по ИИ',
        success: 'Спасибо! Открываем почтовый клиент для завершения запроса.',
      },
    },
  };

  /* ---------- icons ---------- */
  const I = {
    rocket: '<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 11a8 8 0 0 1 8-8c2 0 3 1 3 3a8 8 0 0 1-8 8l-3-3z"/><circle cx="14" cy="9" r="1.3"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-5A8 8 0 1 1 21 12z"/>',
    bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5z"/>',
    wand: '<path d="M4 20 14 10"/><path d="M15 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>',
    hands: '<path d="M4 13l4 4 8-8"/><path d="M3 8a9 9 0 0 1 18 0"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    mentor: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M17 6l4 2-4 2"/>',
    infinity: '<path d="M7 12a3 3 0 1 0 0 .1M17 12a3 3 0 1 1 0 .1"/><path d="M9 12c1.5-2.5 4.5-2.5 6 0s-4.5 2.5-6 0"/>',
  };
  const icon = (k, cls = 'h-6 w-6') =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="${cls}">${I[k] || ''}</svg>`;

  // language-independent config per card (icons, links, flags)
  const COURSE_META = [
    { icon: 'rocket', href: STRIPE_MAIN },
    { icon: 'chat', href: STRIPE_MAIN },
    { icon: 'bolt', href: STRIPE_MAIN },
    { icon: 'user', href: STRIPE_INDIVIDUAL, featured: true },
    { icon: 'sparkle', href: STRIPE_MAIN },
  ];
  const TOOL_META = [
    { icon: 'target', href: null },
    { icon: 'wand', href: './prompt-darbnica/index.html', live: true },
    { icon: 'sparkle', href: null },
    { icon: 'gauge', href: './ai-gatavibas-tests/index.html', live: true },
    { icon: 'compass', href: null },
    { icon: 'bolt', href: './laika-kalkulators/index.html', live: true },
  ];
  const WHY_ICONS = ['rocket', 'hands', 'briefcase', 'gear', 'mentor', 'infinity'];

  /* ---------- build static DOM once (with data-i18n paths) ---------- */
  $('#courseGrid').innerHTML = COURSE_META.map(
    (m, i) => `
    <article class="reveal glass glow-hover rounded-3xl p-7 ${m.featured ? 'ring-1 ring-brand/40' : ''}" style="transition-delay:${i * 0.06}s" data-tilt>
      <div class="mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-electric">${icon(m.icon)}</div>
      ${m.featured ? `<div class="mb-2 inline-block rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-electric" data-i18n="courses.items.${i}.badge"></div>` : ''}
      <h3 class="text-xl font-bold" data-i18n="courses.items.${i}.title"></h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400" data-i18n="courses.items.${i}.desc"></p>
      <a href="${m.href}" target="_blank" rel="noopener" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-electric hover:text-brandlt">
        <span data-i18n="courses.items.${i}.cta"></span> <span aria-hidden="true">→</span>
      </a>
    </article>`
  ).join('');

  $('#toolGrid').innerHTML = TOOL_META.map(
    (m, i) => `
    <a ${m.href ? `href="${m.href}"` : 'role="button" aria-disabled="true"'} class="reveal glass ${m.href ? 'glow-hover' : 'opacity-70'} block rounded-3xl p-7" style="transition-delay:${i * 0.06}s" data-tilt>
      <div class="mb-5 flex items-center justify-between">
        <span class="inline-grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-electric">${icon(m.icon)}</span>
        ${m.live
          ? '<span class="rounded-full bg-emerald-400/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300" data-i18n="tools.live"></span>'
          : '<span class="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400" data-i18n="tools.soon"></span>'}
      </div>
      <h3 class="text-xl font-bold" data-i18n="tools.items.${i}.title"></h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400" data-i18n="tools.items.${i}.desc"></p>
      <div class="mt-6 inline-flex items-center gap-2 text-sm font-bold ${m.href ? 'text-electric' : 'text-zinc-500'}" data-i18n="${m.href ? 'tools.open' : 'tools.comingSoon'}"></div>
    </a>`
  ).join('');

  $('#whyGrid').innerHTML = WHY_ICONS.map(
    (ic, i) => `
    <div class="reveal glass glow-hover rounded-3xl p-6" style="transition-delay:${i * 0.05}s" data-tilt>
      <div class="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-electric">${icon(ic, 'h-5 w-5')}</div>
      <h3 class="text-lg font-bold" data-i18n="why.items.${i}.title"></h3>
      <p class="mt-2 text-sm leading-relaxed text-zinc-400" data-i18n="why.items.${i}.desc"></p>
    </div>`
  ).join('');

  $('#roadList').innerHTML = T.lv.roadmap.items.map(
    (_, i) => `
    <li class="road-node relative" style="transition-delay:${i * 0.14}s">
      <div class="flex items-center gap-4 md:flex-col md:text-center">
        <div class="grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl glass glow text-lg font-extrabold text-electric">0${i + 1}</div>
        <div>
          <h3 class="text-base font-bold md:mt-4" data-i18n="roadmap.items.${i}.title"></h3>
          <p class="mt-1 text-sm text-zinc-400" data-i18n="roadmap.items.${i}.desc"></p>
        </div>
      </div>
    </li>`
  ).join('');

  $('#companyGrid').innerHTML = T.lv.company.rows.map(
    (_, i) => `
    <div class="rounded-2xl bg-white/[.03] p-4 hairline">
      <div class="text-xs uppercase tracking-wider text-zinc-500" data-i18n="company.rows.${i}.k"></div>
      <div class="mt-1 font-semibold" data-i18n-html="company.rows.${i}.v"></div>
    </div>`
  ).join('');

  $('#year').textContent = new Date().getFullYear();

  /* ---------- translate: fill every [data-i18n] / [data-i18n-ph] ---------- */
  const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

  function translate(lang) {
    const dict = T[lang] || T.lv;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const v = get(dict, el.getAttribute('data-i18n'));
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const path = el.getAttribute('data-i18n-html');
      const v = get(dict, path);
      const row = get(dict, path.replace(/\.v$/, ''));
      if (typeof v === 'string') el.innerHTML = (row && row.good ? '<span class="text-emerald-300">● </span>' : '') + v;
      el.classList.toggle('text-emerald-300', !!(row && row.good));
      el.classList.toggle('text-zinc-100', !(row && row.good));
    });
    document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
      const v = get(dict, el.getAttribute('data-i18n-ph'));
      if (typeof v === 'string') el.setAttribute('placeholder', v);
    });
    // active state on switch
    document.querySelectorAll('.langseg [data-lang]').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
  }

  /* ---------- language switch ---------- */
  let lang = localStorage.getItem('is_lang') || 'lv';
  if (!T[lang]) lang = 'lv';
  document.querySelectorAll('.langseg [data-lang]').forEach((b) =>
    b.addEventListener('click', () => {
      lang = b.dataset.lang;
      localStorage.setItem('is_lang', lang);
      translate(lang);
    })
  );
  translate(lang);

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const road = $('.road');
  if (reduce || document.hidden || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
    if (road) road.classList.add('drawn');
  } else {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
    if (road) {
      const rio = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { road.classList.add('drawn'); rio.disconnect(); } }),
        { threshold: 0.25 }
      );
      rio.observe(road);
    }
  }

  /* ---------- perspective tilt + parallax ---------- */
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg) translateY(-8px) scale(1.02)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
    const layers = document.querySelectorAll('[data-parallax]');
    window.addEventListener('pointermove', (e) => {
      const cx = e.clientX / window.innerWidth - 0.5;
      const cy = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        const s = parseFloat(l.getAttribute('data-parallax')) || 0.05;
        l.style.transform = `translate3d(${(-cx * s * 100).toFixed(1)}px, ${(-cy * s * 100).toFixed(1)}px, 0)`;
      });
    }, { passive: true });
  }

  /* ---------- contact form -> mailto ---------- */
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const d = T[lang].contact;
    const name = $('#cfName').value.trim();
    const email = $('#cfEmail').value.trim();
    const msg = $('#cfMsg').value.trim();
    const subject = encodeURIComponent(`${d.subject} — ${name || 'Web'}`);
    const body = encodeURIComponent(`${d.name}: ${name}\n${d.email}: ${email}\n\n${msg}`);
    window.location.href = `mailto:info@intelektaskola.lv?subject=${subject}&body=${body}`;
  });

  /* ---------- free-guide modal (first visit) ---------- */
  (function guide() {
    const modal = $('#guideModal');
    const open = () => { modal.classList.add('is-open'); };
    const close = () => { modal.classList.remove('is-open'); localStorage.setItem('is_guide_seen', '1'); };
    $('#guideClose').addEventListener('click', close);
    $('#guideSkip').addEventListener('click', close);
    $('#guideBackdrop').addEventListener('click', close);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('is-open')) close(); });
    $('#guideForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const d = T[lang].guide;
      const name = $('#guideName').value.trim();
      const email = $('#guideEmail').value.trim();
      $('#guideSuccess').classList.remove('hidden');
      localStorage.setItem('is_guide_seen', '1');
      const subject = encodeURIComponent(d.subject);
      const body = encodeURIComponent(`${name}\n${email}`);
      setTimeout(() => { window.location.href = `mailto:info@intelektaskola.lv?subject=${subject}&body=${body}`; }, 600);
      setTimeout(close, 2600);
    });
    if (!localStorage.getItem('is_guide_seen')) {
      setTimeout(open, reduce ? 200 : 1300);
    }
  })();

  /* ---------- Three.js hero: blue particle field ---------- */
  (function hero() {
    const canvas = $('#hero-canvas');
    if (!canvas || typeof THREE === 'undefined' || reduce) {
      if (canvas) canvas.style.background = 'radial-gradient(60rem 40rem at 50% 0%, rgba(59,130,246,.16), transparent 60%)';
      return;
    }
    let w = canvas.clientWidth, h = canvas.clientHeight;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h, false);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
    camera.position.z = 22;

    const COUNT = window.innerWidth < 768 ? 900 : 1800;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const c = document.createElement('canvas'); c.width = c.height = 64;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(191,219,254,1)');
    g.addColorStop(0.4, 'rgba(59,130,246,.7)');
    g.addColorStop(1, 'rgba(59,130,246,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);

    const mat = new THREE.PointsMaterial({ size: 0.5, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.9 });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    let mx = 0, my = 0, scrollN = 0;
    window.addEventListener('pointermove', (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; }, { passive: true });
    window.addEventListener('scroll', () => { scrollN = window.scrollY / window.innerHeight; }, { passive: true });
    window.addEventListener('resize', () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    });

    const clock = new THREE.Clock();
    let raf;
    function loop() {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.04 + scrollN * 0.8;
      points.rotation.x = Math.sin(t * 0.1) * 0.05 + scrollN * 0.3;
      camera.position.x += (mx * 6 - camera.position.x) * 0.04;
      camera.position.y += (-my * 4 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
    const vio = new IntersectionObserver((en) => {
      en.forEach((e) => { if (e.isIntersecting) { if (!raf) loop(); } else { cancelAnimationFrame(raf); raf = null; } });
    }, { threshold: 0.01 });
    vio.observe($('#top'));
  })();
})();
