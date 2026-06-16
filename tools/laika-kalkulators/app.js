// AI Laika Kalkulators — time/ROI saver (LV / EN / RU).
// Language follows the shared 'is_lang' choice; switch in the header.

const UI = {
  lv: {
    allTools: '← Visi rīki', badge: 'Bezmaksas rīks · Cik tu ietaupi ar AI',
    lead: 'Atzīmē rutīnas uzdevumus, kas patērē tavu nedēļu. Mēs parādīsim, cik stundu un eiro tava komanda var ietaupīt mēnesī, kad AI paveic daļu darba.',
    step1: 'Tavi nedēļas uzdevumi', rateLabel: 'Vidējā darba stundas izmaksa', rateHint: 'Iekļauj algu + nodokļus + pieskaitāmās izmaksas. Vidēji 20–40 €/h Latvijā.', peopleLabel: 'Cilvēki, kas dara šos darbus',
    step2: 'Tavs ietaupījums', savedTime: 'Ietaupītais laiks mēnesī', moneyMonth: 'Naudas vērtība mēnesī', daysLabel: 'pilnas dienas / gadā', yearLabel: 'gadā', before: 'Pirms', afterAI: 'Pēc AI', pctLabel: '% mazāk rutīnas laika',
    ctaBtn: 'Pārvērst šo ietaupījumu realitātē →', emptyHint: 'Atzīmē vismaz vienu uzdevumu augstāk.',
    disclaimer: '* Aprēķins ir orientējošs un balstīts uz tipiskiem AI laika ietaupījumiem katram uzdevumu veidam. Reālais rezultāts atkarīgs no procesiem un apmācības — tieši ar to mēs palīdzam.',
    hoursPerWeek: 'Stundas nedēļā (uz cilvēku)',
  },
  en: {
    allTools: '← All tools', badge: 'Free tool · How much you save with AI',
    lead: 'Tick the routine tasks that eat your week. We\'ll show how many hours and euros your team can save per month when AI does part of the work.',
    step1: 'Your weekly tasks', rateLabel: 'Average cost of a work hour', rateHint: 'Include salary + taxes + overhead. Typically €20–40/h in Latvia.', peopleLabel: 'People doing this work',
    step2: 'Your saving', savedTime: 'Time saved per month', moneyMonth: 'Money value per month', daysLabel: 'full days / year', yearLabel: 'per year', before: 'Before', afterAI: 'After AI', pctLabel: '% less routine time',
    ctaBtn: 'Turn this saving into reality →', emptyHint: 'Tick at least one task above.',
    disclaimer: '* This is an estimate based on typical AI time savings per task type. Real results depend on processes and training — which is exactly what we help with.',
    hoursPerWeek: 'Hours per week (per person)',
  },
  ru: {
    allTools: '← Все инструменты', badge: 'Бесплатный инструмент · Сколько вы экономите с ИИ',
    lead: 'Отметьте рутинные задачи, съедающие вашу неделю. Мы покажем, сколько часов и евро ваша команда может экономить в месяц, когда ИИ берёт часть работы.',
    step1: 'Ваши недельные задачи', rateLabel: 'Средняя стоимость рабочего часа', rateHint: 'Учтите зарплату + налоги + накладные. Обычно 20–40 €/ч в Латвии.', peopleLabel: 'Люди, выполняющие эту работу',
    step2: 'Ваша экономия', savedTime: 'Сэкономленное время в месяц', moneyMonth: 'Денежная ценность в месяц', daysLabel: 'полных дней / год', yearLabel: 'в год', before: 'До', afterAI: 'После ИИ', pctLabel: '% меньше рутины',
    ctaBtn: 'Превратить экономию в реальность →', emptyHint: 'Отметьте хотя бы одну задачу выше.',
    disclaimer: '* Это ориентировочный расчёт на основе типичной экономии времени с ИИ по каждому типу задач. Реальный результат зависит от процессов и обучения — именно с этим мы помогаем.',
    hoursPerWeek: 'Часов в неделю (на человека)',
  },
};

// Each task: typical hours/week + how much AI realistically removes (save).
const TASKS = [
  { id: 'email', icon: 'mail', name: { lv: 'E-pasti un sarakste', en: 'Emails & correspondence', ru: 'Письма и переписка' }, hint: { lv: 'rakstīšana, atbildes, kopsavilkumi', en: 'writing, replies, summaries', ru: 'написание, ответы, резюме' }, defH: 6, save: 0.5 },
  { id: 'reports', icon: 'chart', name: { lv: 'Atskaites un dokumenti', en: 'Reports & documents', ru: 'Отчёты и документы' }, hint: { lv: 'sagatavošana, formatēšana', en: 'drafting, formatting', ru: 'подготовка, форматирование' }, defH: 4, save: 0.45 },
  { id: 'support', icon: 'chat', name: { lv: 'Klientu atbildes', en: 'Customer replies', ru: 'Ответы клиентам' }, hint: { lv: 'jautājumi, sūdzības, BUJ', en: 'questions, complaints, FAQ', ru: 'вопросы, жалобы, FAQ' }, defH: 5, save: 0.55 },
  { id: 'content', icon: 'pen', name: { lv: 'Satura veidošana', en: 'Content creation', ru: 'Создание контента' }, hint: { lv: 'soc. tīkli, mārketings, teksti', en: 'social, marketing, copy', ru: 'соцсети, маркетинг, тексты' }, defH: 4, save: 0.6 },
  { id: 'meetings', icon: 'notes', name: { lv: 'Sapulču pieraksti', en: 'Meeting notes', ru: 'Заметки встреч' }, hint: { lv: 'protokoli, uzdevumi', en: 'minutes, action items', ru: 'протоколы, задачи' }, defH: 2, save: 0.65 },
  { id: 'research', icon: 'search', name: { lv: 'Izpēte un apkopošana', en: 'Research & summarising', ru: 'Исследование и сводки' }, hint: { lv: 'informācijas meklēšana', en: 'finding information', ru: 'поиск информации' }, defH: 3, save: 0.5 },
  { id: 'data', icon: 'folder', name: { lv: 'Datu ievade / kārtošana', en: 'Data entry / sorting', ru: 'Ввод / сортировка данных' }, hint: { lv: 'tabulas, kopēšana', en: 'tables, copying', ru: 'таблицы, копирование' }, defH: 3, save: 0.45 },
  { id: 'planning', icon: 'calendar', name: { lv: 'Plānošana un koordinācija', en: 'Planning & coordination', ru: 'Планирование и координация' }, hint: { lv: 'grafiki, uzdevumu sadale', en: 'schedules, task assignment', ru: 'графики, распределение задач' }, defH: 2, save: 0.35 },
];

const $ = (s, r = document) => r.querySelector(s);
const T = (o, l) => (o && (o[l] || o.lv)) || '';
let lang = (function () { var l = localStorage.getItem('is_lang') || 'lv'; return ['lv', 'en', 'ru'].indexOf(l) >= 0 ? l : 'lv'; })();
const state = {};
TASKS.forEach((t) => (state[t.id] = { on: t.id === 'email' || t.id === 'support', hours: t.defH }));

function renderTasks() {
  const list = $('#taskList');
  list.innerHTML = TASKS.map((t) => {
    const s = state[t.id];
    return `
    <div data-task="${t.id}" class="task glass rounded-2xl p-4 transition ${s.on ? 'task-on' : ''}">
      <div class="flex items-center gap-3">
        <button type="button" data-toggle="${t.id}" class="grid h-11 w-11 shrink-0 place-items-center rounded-xl transition ${s.on ? 'bg-gradient-to-br from-brand to-electric text-white' : 'bg-white/5 text-electric'}">${isIcon(t.icon, 'h-6 w-6')}</button>
        <div class="min-w-0 flex-1">
          <div class="font-bold leading-tight">${T(t.name, lang)}</div>
          <div class="truncate text-xs text-muted">${T(t.hint, lang)}</div>
        </div>
        <label class="flex cursor-pointer items-center">
          <input type="checkbox" data-check="${t.id}" ${s.on ? 'checked' : ''} class="peer sr-only" />
          <span class="relative h-6 w-11 rounded-full bg-white/15 transition peer-checked:bg-brand after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"></span>
        </label>
      </div>
      <div data-slider-wrap="${t.id}" class="mt-3 ${s.on ? '' : 'hidden'}">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted">${UI[lang].hoursPerWeek}</span>
          <span class="font-bold text-electric"><span data-hours-label="${t.id}">${s.hours}</span> h</span>
        </div>
        <input type="range" data-hours="${t.id}" min="1" max="20" step="1" value="${s.hours}" class="mt-2 w-full" />
      </div>
    </div>`;
  }).join('');

  list.querySelectorAll('[data-toggle]').forEach((b) => b.addEventListener('click', () => toggleTask(b.dataset.toggle)));
  list.querySelectorAll('[data-check]').forEach((c) => c.addEventListener('change', () => toggleTask(c.dataset.check)));
  list.querySelectorAll('[data-hours]').forEach((r) =>
    r.addEventListener('input', () => {
      state[r.dataset.hours].hours = Number(r.value);
      $(`[data-hours-label="${r.dataset.hours}"]`).textContent = r.value;
      compute();
    })
  );
}

function toggleTask(id) { state[id].on = !state[id].on; renderTasks(); compute(); }

function animateNumber(el, to, fmt = (n) => Math.round(n).toLocaleString('lv-LV')) {
  const from = Number(el.dataset.v || 0);
  el.dataset.v = to;
  if (document.hidden) { el.textContent = fmt(to); return; }
  const start = performance.now();
  const dur = 600;
  function step(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function compute() {
  const rate = Number($('#rate').value);
  const people = Number($('#people').value);
  $('#rateVal').textContent = rate;
  $('#peopleVal').textContent = people;
  let savedPerWeekPerPerson = 0, totalRoutinePerPerson = 0;
  TASKS.forEach((t) => {
    const s = state[t.id];
    if (!s.on) return;
    totalRoutinePerPerson += s.hours;
    savedPerWeekPerPerson += s.hours * t.save;
  });
  const savedWeek = savedPerWeekPerPerson * people;
  const savedMonth = savedWeek * 4.33;
  const moneyMonth = savedMonth * rate;
  const moneyYear = moneyMonth * 12;
  const daysYear = (savedWeek * 52) / 8;
  const pct = totalRoutinePerPerson > 0 ? Math.round((savedPerWeekPerPerson / totalRoutinePerPerson) * 100) : 0;
  animateNumber($('#hoursOut'), savedMonth);
  animateNumber($('#moneyOut'), moneyMonth);
  animateNumber($('#yearOut'), moneyYear);
  animateNumber($('#daysOut'), daysYear);
  $('#pctOut').textContent = pct;
  $('#saveBar').style.width = pct + '%';
  $('#emptyHint').style.display = TASKS.some((t) => state[t.id].on) ? 'none' : 'block';
}

function attachTilt() {
  const el = $('#resultCard');
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;
  });
  el.addEventListener('pointerleave', () => (el.style.transform = ''));
}

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const v = UI[lang][el.getAttribute('data-i18n')];
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('.langseg [data-lang]').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
  renderTasks();
  compute();
}

document.querySelectorAll('.langseg [data-lang]').forEach((b) =>
  b.addEventListener('click', () => { lang = b.dataset.lang; localStorage.setItem('is_lang', lang); applyLang(); })
);

$('#rate').addEventListener('input', compute);
$('#people').addEventListener('input', compute);
$('#year').textContent = new Date().getFullYear();

attachTilt();
applyLang();
