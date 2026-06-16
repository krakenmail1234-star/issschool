// AI Gatavības Tests — readiness quiz (LV / EN / RU).
// 6 questions, each option 0..3 points. Score normalised to 0..100.

const UI = {
  lv: { allTools: '← Visi rīki', enroll: 'Pieteikties', badge: 'Bezmaksas tests · 6 jautājumi · ~1 min',
    lead: 'Atbildi uz 6 jautājumiem un uzzini, cik gatavs tavs uzņēmums ir mākslīgajam intelektam — un ar kuriem rīkiem sākt.',
    qLabel: 'Jautājums', no100: 'no 100', recosHeading: 'Tev ieteicamie pirmie soļi', planBtn: 'Saņemt personīgu plānu →', retryBtn: 'Pārstartēt testu',
    back: '← Atpakaļ', pickHint: 'Izvēlies atbildi, lai turpinātu' },
  en: { allTools: '← All tools', enroll: 'Enroll', badge: 'Free test · 6 questions · ~1 min',
    lead: 'Answer 6 questions and find out how ready your business is for AI — and which tools to start with.',
    qLabel: 'Question', no100: 'out of 100', recosHeading: 'Recommended first steps', planBtn: 'Get a personal plan →', retryBtn: 'Restart test',
    back: '← Back', pickHint: 'Choose an answer to continue' },
  ru: { allTools: '← Все инструменты', enroll: 'Записаться', badge: 'Бесплатный тест · 6 вопросов · ~1 мин',
    lead: 'Ответьте на 6 вопросов и узнайте, насколько ваш бизнес готов к ИИ — и с каких инструментов начать.',
    qLabel: 'Вопрос', no100: 'из 100', recosHeading: 'Рекомендуемые первые шаги', planBtn: 'Получить личный план →', retryBtn: 'Пройти заново',
    back: '← Назад', pickHint: 'Выберите ответ, чтобы продолжить' },
};

const QUESTIONS = [
  { q: { lv: 'Cik bieži tava komanda jau izmanto AI rīkus (ChatGPT, Claude u.c.)?', en: 'How often does your team already use AI tools (ChatGPT, Claude, etc.)?', ru: 'Как часто ваша команда уже использует ИИ-инструменты (ChatGPT, Claude и др.)?' },
    options: [
      { t: { lv: 'Vēl nemaz', en: 'Not at all yet', ru: 'Пока совсем нет' }, p: 0 },
      { t: { lv: 'Daži cilvēki, neregulāri', en: 'A few people, occasionally', ru: 'Несколько человек, нерегулярно' }, p: 1 },
      { t: { lv: 'Regulāri, bet bez sistēmas', en: 'Regularly, but without a system', ru: 'Регулярно, но без системы' }, p: 2 },
      { t: { lv: 'Ikdienā, ar iekšējām vadlīnijām', en: 'Daily, with internal guidelines', ru: 'Ежедневно, с внутренними правилами' }, p: 3 },
    ] },
  { q: { lv: 'Cik daudz no jūsu darba ir atkārtojoši, teksta vai datu uzdevumi?', en: 'How much of your work is repetitive text or data tasks?', ru: 'Какая доля вашей работы — повторяющиеся задачи с текстом или данными?' },
    options: [
      { t: { lv: 'Ļoti maz', en: 'Very little', ru: 'Очень мало' }, p: 0 },
      { t: { lv: 'Apmēram ceturtā daļa', en: 'About a quarter', ru: 'Примерно четверть' }, p: 1 },
      { t: { lv: 'Apmēram puse', en: 'About half', ru: 'Примерно половина' }, p: 2 },
      { t: { lv: 'Lielākā daļa', en: 'Most of it', ru: 'Большая часть' }, p: 3 },
    ] },
  { q: { lv: 'Vai jūsu procesi un dati ir dokumentēti / sakārtoti?', en: 'Are your processes and data documented / organised?', ru: 'Документированы ли и упорядочены ваши процессы и данные?' },
    options: [
      { t: { lv: 'Lielākoties cilvēku galvās', en: 'Mostly in people\'s heads', ru: 'В основном в головах людей' }, p: 0 },
      { t: { lv: 'Daļēji pierakstīti', en: 'Partly written down', ru: 'Частично записаны' }, p: 1 },
      { t: { lv: 'Galvenie procesi dokumentēti', en: 'Key processes documented', ru: 'Ключевые процессы документированы' }, p: 2 },
      { t: { lv: 'Labi strukturēti un pieejami', en: 'Well structured and accessible', ru: 'Хорошо структурированы и доступны' }, p: 3 },
    ] },
  { q: { lv: 'Kāda ir vadības attieksme pret AI ieviešanu?', en: 'What is leadership\'s attitude to adopting AI?', ru: 'Как руководство относится к внедрению ИИ?' },
    options: [
      { t: { lv: 'Skeptiska / nezināma', en: 'Sceptical / unknown', ru: 'Скептическое / неизвестно' }, p: 0 },
      { t: { lv: 'Atvērta, bet bez budžeta', en: 'Open, but no budget', ru: 'Открытое, но без бюджета' }, p: 1 },
      { t: { lv: 'Atbalsta, gatava ieguldīt', en: 'Supportive, ready to invest', ru: 'Поддерживает, готово вкладываться' }, p: 2 },
      { t: { lv: 'Tā ir stratēģiska prioritāte', en: 'It\'s a strategic priority', ru: 'Это стратегический приоритет' }, p: 3 },
    ] },
  { q: { lv: 'Cik droši jūtaties par datu drošību un konfidencialitāti, lietojot AI?', en: 'How confident are you about data security and privacy when using AI?', ru: 'Насколько вы уверены в безопасности и конфиденциальности данных при использовании ИИ?' },
    options: [
      { t: { lv: 'Nav skaidrības, tāpēc izvairāmies', en: 'No clarity, so we avoid it', ru: 'Нет ясности, поэтому избегаем' }, p: 0 },
      { t: { lv: 'Mazliet uztrauc', en: 'A little worried', ru: 'Немного беспокоит' }, p: 1 },
      { t: { lv: 'Saprotam pamatprincipus', en: 'We understand the basics', ru: 'Понимаем основные принципы' }, p: 2 },
      { t: { lv: 'Ir skaidras vadlīnijas un rīki', en: 'We have clear guidelines and tools', ru: 'Есть чёткие правила и инструменты' }, p: 3 },
    ] },
  { q: { lv: 'Vai komandai ir laiks un vēlme apgūt jaunus rīkus?', en: 'Does the team have the time and willingness to learn new tools?', ru: 'Есть ли у команды время и желание осваивать новые инструменты?' },
    options: [
      { t: { lv: 'Gandrīz nav', en: 'Hardly any', ru: 'Почти нет' }, p: 0 },
      { t: { lv: 'Daži entuziasti', en: 'A few enthusiasts', ru: 'Несколько энтузиастов' }, p: 1 },
      { t: { lv: 'Lielākā daļa ir atvērti', en: 'Most are open to it', ru: 'Большинство открыты' }, p: 2 },
      { t: { lv: 'Aktīvi gaida apmācības', en: 'Actively waiting for training', ru: 'Активно ждут обучения' }, p: 3 },
    ] },
];

const TIERS = [
  { min: 0, max: 39, badgeClass: 'bg-brand/20 text-brandlt',
    badge: { lv: 'Sākuma punkts', en: 'Starting point', ru: 'Стартовая точка' },
    title: { lv: 'Liels neizmantots potenciāls', en: 'A lot of untapped potential', ru: 'Большой неиспользованный потенциал' },
    text: { lv: 'Tu vēl tikai sāc, un tieši tāpēc ieguvums var būt vislielākais. Sāksim ar pamatiem un ātrām uzvarām.', en: 'You\'re just starting — and that\'s exactly why the gains can be biggest. Let\'s begin with the basics and quick wins.', ru: 'Вы только начинаете — и именно поэтому выгода может быть наибольшей. Начнём с основ и быстрых побед.' },
    recos: { lv: ['Ievada darbnīca komandai: ko AI var un ko nevar', 'Izvēlēties 1–2 ikdienas uzdevumus pirmajiem eksperimentiem', 'Vienkāršas drošības vadlīnijas, ko lietot uzreiz'], en: ['Intro workshop for the team: what AI can and can\'t do', 'Pick 1–2 everyday tasks for first experiments', 'Simple security guidelines to use right away'], ru: ['Вводный воркшоп для команды: что ИИ может и чего нет', 'Выбрать 1–2 ежедневные задачи для первых экспериментов', 'Простые правила безопасности для немедленного применения'] } },
  { min: 40, max: 69, badgeClass: 'bg-electric/20 text-electric',
    badge: { lv: 'Augošs', en: 'Growing', ru: 'Развивающийся' },
    title: { lv: 'Pamati ir — laiks sistēmai', en: 'Foundations are there — time for a system', ru: 'Основа есть — пора систематизировать' },
    text: { lv: 'Jūs jau lietojat AI, bet bez vienotas pieejas. Ar struktūru un veidnēm rezultāts kļūs paredzams un mērāms.', en: 'You already use AI, but without a unified approach. With structure and templates, results become predictable and measurable.', ru: 'Вы уже используете ИИ, но без единого подхода. Со структурой и шаблонами результат станет предсказуемым и измеримым.' },
    recos: { lv: ['Praktiskās promptu veidnes biežākajiem uzdevumiem', 'Procesu kartēšana: kur AI dod lielāko ietaupījumu', 'Komandas apmācība ar reāliem jūsu piemēriem'], en: ['Practical prompt templates for common tasks', 'Process mapping: where AI saves the most', 'Team training with your real examples'], ru: ['Практические шаблоны промптов для частых задач', 'Картирование процессов: где ИИ экономит больше всего', 'Обучение команды на ваших реальных примерах'] } },
  { min: 70, max: 100, badgeClass: 'bg-good/25 text-emerald-300',
    badge: { lv: 'Gatavs paātrināt', en: 'Ready to accelerate', ru: 'Готовы ускоряться' },
    title: { lv: 'Gatavs nākamajam līmenim', en: 'Ready for the next level', ru: 'Готовы к следующему уровню' },
    text: { lv: 'Lieliski! Pamati ir stipri. Tagad fokuss uz automatizāciju, padziļinātām prasmēm un mērāmu ROI.', en: 'Excellent! The foundations are strong. Now focus on automation, advanced skills and measurable ROI.', ru: 'Отлично! Основа крепкая. Теперь фокус на автоматизации, продвинутых навыках и измеримом ROI.' },
    recos: { lv: ['Vieglas automatizācijas izstrāde atkārtotiem procesiem', 'Padziļinātas prompting un modeļu izvēles apmācības', 'Pārvaldība: drošība, kvalitātes kontrole, ROI mērīšana'], en: ['Lightweight automation for repetitive processes', 'Advanced prompting and model-selection training', 'Governance: security, quality control, ROI measurement'], ru: ['Лёгкая автоматизация повторяющихся процессов', 'Продвинутое обучение промптингу и выбору моделей', 'Управление: безопасность, контроль качества, измерение ROI'] } },
];

const $ = (s, r = document) => r.querySelector(s);
const T = (o, l) => (o && (o[l] || o.lv)) || '';
let lang = (function () { var l = localStorage.getItem('is_lang') || 'lv'; return ['lv', 'en', 'ru'].indexOf(l) >= 0 ? l : 'lv'; })();
let current = 0;
const answers = new Array(QUESTIONS.length).fill(null);
const maxPerQ = 3;

function renderQuestion() {
  const q = QUESTIONS[current];
  $('#qNum').textContent = current + 1;
  $('#qTotal').textContent = QUESTIONS.length;
  const pct = Math.round((current / QUESTIONS.length) * 100);
  $('#qPct').textContent = pct + '%';
  $('#progressBar').style.width = pct + '%';

  $('#quizCard').classList.remove('animate-pop');
  void $('#quizCard').offsetWidth;
  $('#quizCard').classList.add('animate-pop');

  $('#quizCard').innerHTML = `
    <h2 class="text-xl font-bold leading-snug md:text-2xl">${T(q.q, lang)}</h2>
    <div class="mt-5 space-y-3">
      ${q.options.map((o, i) => `
        <button type="button" data-opt="${i}"
          class="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-brand hover:bg-white/10 hover:shadow-depth ${answers[current] === i ? 'border-brand ring-2 ring-brand' : ''}">
          <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/20 text-sm font-bold text-muted group-hover:border-brand group-hover:text-electric">${String.fromCharCode(65 + i)}</span>
          <span class="flex-1">${T(o.t, lang)}</span>
          <span class="text-electric opacity-0 transition group-hover:opacity-100">→</span>
        </button>`).join('')}
    </div>
    <div class="mt-5 flex justify-between">
      <button type="button" id="backBtn" class="rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:text-white ${current === 0 ? 'invisible' : ''}">${UI[lang].back}</button>
      <span class="text-xs text-muted self-center">${UI[lang].pickHint}</span>
    </div>`;

  $('#quizCard').querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => choose(Number(b.dataset.opt))));
  const back = $('#backBtn');
  if (back) back.addEventListener('click', () => { if (current > 0) { current--; renderQuestion(); } });
}

function choose(i) {
  answers[current] = i;
  setTimeout(() => {
    if (current < QUESTIONS.length - 1) { current++; renderQuestion(); }
    else showResult();
  }, 180);
  renderQuestion();
}

function showResult() {
  const total = answers.reduce((sum, a, qi) => sum + (a == null ? 0 : QUESTIONS[qi].options[a].p), 0);
  const score = Math.round((total / (QUESTIONS.length * maxPerQ)) * 100);
  const tier = TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0];

  $('#qPct').textContent = '100%';
  $('#progressBar').style.width = '100%';
  $('#qNum').textContent = QUESTIONS.length;
  $('#quizCard').classList.add('hidden');
  $('#progressWrap').classList.add('hidden');
  const rs = $('#resultSection');
  rs.classList.remove('hidden');

  const circ = 2 * Math.PI * 52;
  const setGauge = () => ($('#gaugeRing').style.strokeDashoffset = circ * (1 - score / 100));
  if (document.hidden) setGauge(); else requestAnimationFrame(setGauge);

  const el = $('#scoreOut');
  if (document.hidden) el.textContent = score;
  else {
    const start = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - start) / 1100);
      el.textContent = Math.round(score * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  $('#tierBadge').textContent = T(tier.badge, lang);
  $('#tierBadge').className = 'mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold ' + tier.badgeClass;
  $('#tierTitle').textContent = T(tier.title, lang);
  $('#tierText').textContent = T(tier.text, lang);
  $('#recoList').innerHTML = T(tier.recos, lang).map((r) => `<li class="flex items-start gap-2 text-sm text-white/90"><span class="mt-0.5 text-electric">✓</span><span>${r}</span></li>`).join('');

  rs.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function reset() {
  current = 0;
  answers.fill(null);
  $('#resultSection').classList.add('hidden');
  $('#quizCard').classList.remove('hidden');
  $('#progressWrap').classList.remove('hidden');
  $('#gaugeRing').style.strokeDashoffset = 326.7;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = UI[lang][el.getAttribute('data-i18n')];
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('.langseg [data-lang]').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
  // re-render whichever view is visible
  if ($('#resultSection').classList.contains('hidden')) renderQuestion();
}

document.querySelectorAll('.langseg [data-lang]').forEach((b) =>
  b.addEventListener('click', () => { lang = b.dataset.lang; localStorage.setItem('is_lang', lang); applyLang(); })
);

document.querySelectorAll('.tilt').forEach((el) => {
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 5).toFixed(2)}deg)`;
  });
  el.addEventListener('pointerleave', () => (el.style.transform = ''));
});

$('#retryBtn').addEventListener('click', reset);
$('#year').textContent = new Date().getFullYear();
applyLang();
