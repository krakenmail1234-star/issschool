// AI Gatavības Tests — readiness quiz for Intelekta Skola.
// 6 questions, each option carries points (0..max). Score normalised to 0..100.

const QUESTIONS = [
  {
    q: 'Cik bieži tava komanda jau izmanto AI rīkus (ChatGPT, Claude u.c.)?',
    options: [
      { t: 'Vēl nemaz', p: 0 },
      { t: 'Daži cilvēki, neregulāri', p: 1 },
      { t: 'Regulāri, bet bez sistēmas', p: 2 },
      { t: 'Ikdienā, ar iekšējām vadlīnijām', p: 3 },
    ],
  },
  {
    q: 'Cik daudz no jūsu darba ir atkārtojoši, teksta vai datu uzdevumi?',
    options: [
      { t: 'Ļoti maz', p: 0 },
      { t: 'Apmēram ceturtā daļa', p: 1 },
      { t: 'Apmēram puse', p: 2 },
      { t: 'Lielākā daļa', p: 3 },
    ],
  },
  {
    q: 'Vai jūsu procesi un dati ir dokumentēti / sakārtoti?',
    options: [
      { t: 'Lielākoties cilvēku galvās', p: 0 },
      { t: 'Daļēji pierakstīti', p: 1 },
      { t: 'Galvenie procesi dokumentēti', p: 2 },
      { t: 'Labi strukturēti un pieejami', p: 3 },
    ],
  },
  {
    q: 'Kāda ir vadības attieksme pret AI ieviešanu?',
    options: [
      { t: 'Skeptiska / nezināma', p: 0 },
      { t: 'Atvērta, bet bez budžeta', p: 1 },
      { t: 'Atbalsta, gatava ieguldīt', p: 2 },
      { t: 'Tā ir stratēģiska prioritāte', p: 3 },
    ],
  },
  {
    q: 'Cik droši jūtaties par datu drošību un konfidencialitāti, lietojot AI?',
    options: [
      { t: 'Nav skaidrības, tāpēc izvairāmies', p: 0 },
      { t: 'Mazliet uztrauc', p: 1 },
      { t: 'Saprotam pamatprincipus', p: 2 },
      { t: 'Ir skaidras vadlīnijas un rīki', p: 3 },
    ],
  },
  {
    q: 'Vai komandai ir laiks un vēlme apgūt jaunus rīkus?',
    options: [
      { t: 'Gandrīz nav', p: 0 },
      { t: 'Daži entuziasti', p: 1 },
      { t: 'Lielākā daļa ir atvērti', p: 2 },
      { t: 'Aktīvi gaida apmācības', p: 3 },
    ],
  },
];

const TIERS = [
  {
    min: 0,
    max: 39,
    badge: 'Sākuma punkts',
    badgeClass: 'bg-brand/20 text-brandlt',
    title: 'Liels neizmantots potenciāls',
    text: 'Tu vēl tikai sāc, un tieši tāpēc ieguvums var būt vislielākais. Sāksim ar pamatiem un ātrām uzvarām.',
    recos: [
      'Ievada darbnīca komandai: ko AI var un ko nevar',
      'Izvēlēties 1–2 ikdienas uzdevumus pirmajiem eksperimentiem',
      'Vienkāršas drošības vadlīnijas, ko lietot uzreiz',
    ],
  },
  {
    min: 40,
    max: 69,
    badge: 'Augošs',
    badgeClass: 'bg-electric/20 text-electric',
    title: 'Pamati ir — laiks sistēmai',
    text: 'Jūs jau lietojat AI, bet bez vienotas pieejas. Ar struktūru un veidnēm rezultāts kļūs paredzams un mērāms.',
    recos: [
      'Praktiskās promptu veidnes biežākajiem uzdevumiem',
      'Procesu kartēšana: kur AI dod lielāko ietaupījumu',
      'Komandas apmācība ar reāliem jūsu piemēriem',
    ],
  },
  {
    min: 70,
    max: 100,
    badge: 'Gatavs paātrināt',
    badgeClass: 'bg-good/25 text-emerald-300',
    title: 'Gatavs nākamajam līmenim',
    text: 'Lieliski! Pamati ir stipri. Tagad fokuss uz automatizāciju, padziļinātām prasmēm un mērāmu ROI.',
    recos: [
      'Vieglas automatizācijas izstrāde atkārtotiem procesiem',
      'Padziļinātas prompting un modeļu izvēles apmācības',
      'Pārvaldība: drošība, kvalitātes kontrole, ROI mērīšana',
    ],
  },
];

const $ = (s, r = document) => r.querySelector(s);
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
  void $('#quizCard').offsetWidth; // restart animation
  $('#quizCard').classList.add('animate-pop');

  $('#quizCard').innerHTML = `
    <h2 class="text-xl font-bold leading-snug md:text-2xl">${q.q}</h2>
    <div class="mt-5 space-y-3">
      ${q.options
        .map(
          (o, i) => `
        <button type="button" data-opt="${i}"
          class="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left font-semibold text-zinc-100 transition hover:-translate-y-0.5 hover:border-brand hover:bg-white/10 hover:shadow-depth ${answers[current] === i ? 'border-brand ring-2 ring-brand' : ''}">
          <span class="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/20 text-sm font-bold text-muted group-hover:border-brand group-hover:text-electric">${String.fromCharCode(65 + i)}</span>
          <span class="flex-1">${o.t}</span>
          <span class="text-electric opacity-0 transition group-hover:opacity-100">→</span>
        </button>`
        )
        .join('')}
    </div>
    <div class="mt-5 flex justify-between">
      <button type="button" id="backBtn" class="rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:text-white ${current === 0 ? 'invisible' : ''}">← Atpakaļ</button>
      <span class="text-xs text-muted self-center">Izvēlies atbildi, lai turpinātu</span>
    </div>`;

  $('#quizCard')
    .querySelectorAll('[data-opt]')
    .forEach((b) => b.addEventListener('click', () => choose(Number(b.dataset.opt))));
  const back = $('#backBtn');
  if (back) back.addEventListener('click', () => { if (current > 0) { current--; renderQuestion(); } });
}

function choose(i) {
  answers[current] = i;
  // brief delay so the selection highlight is visible
  setTimeout(() => {
    if (current < QUESTIONS.length - 1) {
      current++;
      renderQuestion();
    } else {
      showResult();
    }
  }, 180);
  renderQuestion();
}

function showResult() {
  const total = answers.reduce((sum, a, qi) => sum + (a == null ? 0 : QUESTIONS[qi].options[a].p), 0);
  const maxTotal = QUESTIONS.length * maxPerQ;
  const score = Math.round((total / maxTotal) * 100);
  const tier = TIERS.find((t) => score >= t.min && score <= t.max) || TIERS[0];

  // finish progress
  $('#qPct').textContent = '100%';
  $('#progressBar').style.width = '100%';
  $('#qNum').textContent = QUESTIONS.length;

  $('#quizCard').classList.add('hidden');
  $('#progressWrap').classList.add('hidden');
  const rs = $('#resultSection');
  rs.classList.remove('hidden');

  // gauge animation
  const circ = 2 * Math.PI * 52; // 326.7
  const setGauge = () => ($('#gaugeRing').style.strokeDashoffset = circ * (1 - score / 100));
  // rAF lets the CSS transition animate; if backgrounded, set it directly.
  if (document.hidden) setGauge();
  else requestAnimationFrame(setGauge);

  // count up score (skip animation if tab is backgrounded — rAF won't fire)
  const el = $('#scoreOut');
  if (document.hidden) {
    el.textContent = score;
  } else {
    const start = performance.now();
    (function step(now) {
      const p = Math.min(1, (now - start) / 1100);
      el.textContent = Math.round(score * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  $('#tierBadge').textContent = tier.badge;
  $('#tierBadge').className = 'mb-2 inline-block rounded-full px-3 py-1 text-xs font-bold ' + tier.badgeClass;
  $('#tierTitle').textContent = tier.title;
  $('#tierText').textContent = tier.text;
  $('#recoList').innerHTML = tier.recos
    .map(
      (r) => `<li class="flex items-start gap-2 text-sm text-white/90"><span class="mt-0.5 text-sun">✓</span><span>${r}</span></li>`
    )
    .join('');

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

// 3D tilt on cards
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
renderQuestion();
