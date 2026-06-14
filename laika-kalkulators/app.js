// AI Laika Kalkulators — time/ROI saver for Intelekta Skola.
// Standalone, no dependencies.

// Each task: typical hours/week spent + how much AI realistically removes (saveRate).
const TASKS = [
  { id: 'email', icon: '✉️', name: 'E-pasti un sarakste', hint: 'rakstīšana, atbildes, kopsavilkumi', defH: 6, save: 0.5 },
  { id: 'reports', icon: '📊', name: 'Atskaites un dokumenti', hint: 'sagatavošana, formatēšana', defH: 4, save: 0.45 },
  { id: 'support', icon: '💬', name: 'Klientu atbildes', hint: 'jautājumi, sūdzības, FAQ', defH: 5, save: 0.55 },
  { id: 'content', icon: '✍️', name: 'Satura veidošana', hint: 'soc. tīkli, mārketings, teksti', defH: 4, save: 0.6 },
  { id: 'meetings', icon: '📝', name: 'Sapulču pieraksti', hint: 'protokoli, uzdevumi', defH: 2, save: 0.65 },
  { id: 'research', icon: '🔎', name: 'Izpēte un apkopošana', hint: 'informācijas meklēšana', defH: 3, save: 0.5 },
  { id: 'data', icon: '🗂️', name: 'Datu ievade / kārtošana', hint: 'tabulas, kopēšana', defH: 3, save: 0.45 },
  { id: 'planning', icon: '📅', name: 'Plānošana un koordinācija', hint: 'grafiki, uzdevumu sadale', defH: 2, save: 0.35 },
];

const $ = (s, r = document) => r.querySelector(s);
const state = {}; // id -> { on, hours }

TASKS.forEach((t) => (state[t.id] = { on: t.id === 'email' || t.id === 'support', hours: t.defH }));

function renderTasks() {
  const list = $('#taskList');
  list.innerHTML = TASKS.map((t) => {
    const s = state[t.id];
    return `
    <div data-task="${t.id}" class="task glass rounded-2xl border border-white/60 p-4 transition ${s.on ? 'task-on' : 'shadow-glass'}">
      <div class="flex items-center gap-3">
        <button type="button" data-toggle="${t.id}" class="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-2xl transition ${s.on ? 'bg-gradient-to-br from-accent to-sky' : 'bg-black/5'}">${t.icon}</button>
        <div class="min-w-0 flex-1">
          <div class="font-bold leading-tight">${t.name}</div>
          <div class="truncate text-xs text-muted">${t.hint}</div>
        </div>
        <label class="flex cursor-pointer items-center">
          <input type="checkbox" data-check="${t.id}" ${s.on ? 'checked' : ''} class="peer sr-only" />
          <span class="relative h-6 w-11 rounded-full bg-black/15 transition peer-checked:bg-accent after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5"></span>
        </label>
      </div>
      <div data-slider-wrap="${t.id}" class="mt-3 ${s.on ? '' : 'hidden'}">
        <div class="flex items-center justify-between text-sm">
          <span class="text-muted">Stundas nedēļā (uz cilvēku)</span>
          <span class="font-bold text-accent"><span data-hours-label="${t.id}">${s.hours}</span> h</span>
        </div>
        <input type="range" data-hours="${t.id}" min="1" max="20" step="1" value="${s.hours}" class="mt-2 w-full" />
      </div>
    </div>`;
  }).join('');

  // wire events
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

function toggleTask(id) {
  state[id].on = !state[id].on;
  renderTasks();
  compute();
}

// Animated count-up between previous and next value
function animateNumber(el, to, fmt = (n) => Math.round(n).toLocaleString('lv-LV')) {
  const from = Number(el.dataset.v || 0);
  el.dataset.v = to;
  // If the tab is backgrounded, rAF won't fire — show the final value directly.
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

  let savedPerWeekPerPerson = 0; // hours
  let totalRoutinePerPerson = 0;
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
  const daysYear = (savedWeek * 52) / 8; // 8h workday
  const pct = totalRoutinePerPerson > 0 ? Math.round((savedPerWeekPerPerson / totalRoutinePerPerson) * 100) : 0;

  animateNumber($('#hoursOut'), savedMonth);
  animateNumber($('#moneyOut'), moneyMonth);
  animateNumber($('#yearOut'), moneyYear);
  animateNumber($('#daysOut'), daysYear);
  $('#pctOut').textContent = pct;
  $('#saveBar').style.width = pct + '%';

  const any = TASKS.some((t) => state[t.id].on);
  $('#emptyHint').style.display = any ? 'none' : 'block';
}

// 3D tilt on the result card
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

$('#rate').addEventListener('input', compute);
$('#people').addEventListener('input', compute);
$('#year').textContent = new Date().getFullYear();

renderTasks();
attachTilt();
compute();
