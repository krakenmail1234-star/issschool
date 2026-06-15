// Promptu Darbnīca — interactive prompt builder for Latvian business owners.
// Standalone, no dependencies. Brand: Intelekta Skola.

/* ------------------------------------------------------------------ *
 * Scenario data
 *  - fields:   inputs shown in the builder
 *  - prompt:   builds the polished prompt from the field values
 *  - example:  { before, after } shown on the flip side
 * ------------------------------------------------------------------ */

const SCENARIOS = [
  {
    id: 'email',
    icon: 'mail',
    title: 'Klienta e-pasts',
    sub: 'Pārvērt īsu domu pieklājīgā, pārliecinošā e-pastā.',
    fields: [
      { id: 'recipient', label: 'Kam raksti?', type: 'text', placeholder: 'piem. potenciālais klients Jānis' },
      { id: 'points', label: 'Galvenās domas (katra jaunā rindā)', type: 'textarea', placeholder: 'Piedāvājam atlaidi\nVēlamies tikšanos nākamnedēļ' },
      { id: 'tone', label: 'Tonis', type: 'select', options: ['Profesionāls', 'Draudzīgs', 'Pārliecinošs', 'Atvainojošs'] },
    ],
    prompt: (v) => `Tu esi pieredzējis biznesa komunikācijas speciālists. Uzraksti latviešu valodā e-pastu šādam adresātam: ${v.recipient || '[adresāts]'}.

Tonis: ${v.tone}.
Galvenās domas, kas jāietver:
${bullets(v.points) || '- [tava doma]'}

Prasības:
- Skaidrs temata lauks (Subject).
- Personalizēts uzrunas teikums.
- Maks. 120 vārdi, īsi rindkopas.
- Beigās konkrēts aicinājums uz darbību (CTA).
- Pieklājīgs noslēgums ar parakstu [Tavs vārds, uzņēmums].`,
    example: {
      before: '“pajautāt klientam vai der otrdiena, atgādināt par piedāvājumu”',
      after: 'Temats: Tikšanās otrdien + jūsu piedāvājums\n\nLabdien, Jāni!\n\nVēlos pārliecināties, vai otrdiena plkst. 14:00 jums būtu ērts laiks īsai 20 min sarunai. Vēlreiz pievēršu uzmanību mūsu piedāvājumam — tas spēkā līdz piektdienai.\n\nVai apstiprināt otrdienu? Labprāt pielāgošos.\n\nAr cieņu,\n[Tavs vārds]',
    },
  },
  {
    id: 'summary',
    icon: 'notes',
    title: 'Sapulces kopsavilkums',
    sub: 'No haotiskām piezīmēm uz strukturētu kopsavilkumu ar uzdevumiem.',
    fields: [
      { id: 'notes', label: 'Ielīmē neapstrādātas piezīmes', type: 'textarea', placeholder: 'runājām par budžetu, Anna paņem dizainu, deadline 20. jūnijs...' },
    ],
    prompt: (v) => `Tu esi precīzs projektu vadības asistents. Apkopo šādas sapulces piezīmes skaidrā kopsavilkumā latviešu valodā.

Neapstrādātās piezīmes:
"""
${v.notes || '[ielīmē piezīmes]'}
"""

Atgriez šādā struktūrā:
1. **Galvenie lēmumi** — punktveidā.
2. **Uzdevumi** — tabula: Uzdevums | Atbildīgais | Termiņš.
3. **Atvērtie jautājumi** — kas vēl jāizlemj.
Esi konkrēts. Neizdomā informāciju, kuras nav piezīmēs.`,
    example: {
      before: '“runājām par budžetu, Anna paņem dizainu, deadline 20. jūnijs, vēl jāprecizē cena”',
      after: 'Galvenie lēmumi:\n• Apstiprināts budžeta virziens Q3.\n\nUzdevumi:\n| Dizaina makets | Anna | 20.06 |\n\nAtvērtie jautājumi:\n• Gala cena klientam — jāprecizē.',
    },
  },
  {
    id: 'offer',
    icon: 'briefcase',
    title: 'Piedāvājums klientam',
    sub: 'Sagatavo pārdošanas piedāvājumu, kas uzsver ieguvumu.',
    fields: [
      { id: 'product', label: 'Produkts / pakalpojums', type: 'text', placeholder: 'mājaslapas izstrāde' },
      { id: 'price', label: 'Cena / nosacījumi', type: 'text', placeholder: 'no 900 €, 3 nedēļas' },
      { id: 'benefit', label: 'Galvenais ieguvums klientam', type: 'text', placeholder: 'vairāk pieteikumu no mājaslapas' },
    ],
    prompt: (v) => `Tu esi B2B pārdošanas teksta autors. Uzraksti īsu, pārliecinošu piedāvājumu latviešu valodā.

Produkts/pakalpojums: ${v.product || '[produkts]'}
Cena/nosacījumi: ${v.price || '[cena]'}
Galvenais ieguvums klientam: ${v.benefit || '[ieguvums]'}

Struktūra:
- Virsraksts, kas uzrunā ieguvumu (nevis funkciju).
- 3 punkti “Ko jūs iegūstat”.
- Cena un termiņš skaidri.
- Riska mazinātājs (garantija / nesaistoša saruna).
- CTA viena teikuma garumā.
Tonis: pārliecinošs, bet bez liekas pārspīlēšanas.`,
    example: {
      before: '“piedāvāt mājaslapu par 900 eur”',
      after: 'Mājaslapa, kas atved klientus, nevis tikai izskatās labi\n\nKo jūs iegūstat:\n• Pieteikumu formu, kas pārvērš apmeklētājus zvanos\n• Ātru ielādi un mobilo versiju\n• Gatavu rezultātu 3 nedēļās\n\nIeguldījums: no 900 €. Sākam ar nesaistošu 20 min sarunu — bez maksas.',
    },
  },
  {
    id: 'social',
    icon: 'megaphone',
    title: 'Sociālo tīklu ieraksts',
    sub: 'Viena ideja → gatavs ieraksts ar āķi un aicinājumu.',
    fields: [
      { id: 'topic', label: 'Par ko ieraksts?', type: 'text', placeholder: 'jauns pakalpojums / akcija' },
      { id: 'platform', label: 'Platforma', type: 'select', options: ['Facebook', 'Instagram', 'LinkedIn'] },
      { id: 'goal', label: 'Mērķis', type: 'select', options: ['Vairāk pieteikumu', 'Atpazīstamība', 'Iesaiste (komentāri)'] },
    ],
    prompt: (v) => `Tu esi SMM speciālists. Uzraksti ${v.platform} ierakstu latviešu valodā.

Tēma: ${v.topic || '[tēma]'}
Mērķis: ${v.goal}

Prasības:
- Spēcīgs āķis pirmajā rindā (aptur skrollēšanu).
- 3–5 īsas rindkopas, viegli lasāmas.
- 1 skaidrs CTA.
- 3–5 atbilstoši hashtagi.
- Pielāgo garumu un toni ${v.platform} auditorijai.`,
    example: {
      before: '“pateikt ka ir jauns AI kurss uzņēmumiem”',
      after: 'Tava komanda joprojām raksta e-pastus ar rokām?\n\nMēs apmācām uzņēmumus izmantot AI ikdienas darbā — un ietaupīt stundas katru nedēļu.\n\nPieraksties bezmaksas konsultācijai — saite bio.\n\n#AI #bizness #produktivitāte',
    },
  },
  {
    id: 'complaint',
    icon: 'lifebuoy',
    title: 'Atbilde uz sūdzību',
    sub: 'Nomierini neapmierinātu klientu un saglabā attiecības.',
    fields: [
      { id: 'complaint', label: 'Klienta sūdzība', type: 'textarea', placeholder: 'pasūtījums kavējās 5 dienas un neviens neatbildēja' },
      { id: 'fix', label: 'Ko piedāvā kā risinājumu?', type: 'text', placeholder: 'atlaide nākamajam pasūtījumam + piegāde šodien' },
    ],
    prompt: (v) => `Tu esi pieredzējis klientu attiecību speciālists. Uzraksti empātisku atbildi latviešu valodā uz šo sūdzību.

Sūdzība:
"""
${v.complaint || '[sūdzība]'}
"""
Piedāvātais risinājums: ${v.fix || '[risinājums]'}

Prasības:
- Sāc ar patiesu atvainošanos un atzīsti problēmu.
- Neaizstāvies, neattaisno.
- Skaidri pasaki, ko darīsi (risinājums + termiņš).
- Noslēdz pozitīvi, atjauno uzticību.
- Tonis: silts, profesionāls, īss.`,
    example: {
      before: '“atvainoties par kavēšanos un piedāvāt atlaidi”',
      after: 'Labdien!\n\nVispirms — patiesi atvainojos par kavēšanos un to, ka nesaņēmāt atbildi. Tas neatbilst mūsu standartam.\n\nJūsu pasūtījumu nosūtām jau šodien, un nākamajam pasūtījumam piešķiram 15% atlaidi.\n\nPaldies par pacietību — labosim šo.',
    },
  },
  {
    id: 'job',
    icon: 'users',
    title: 'Darba sludinājums',
    sub: 'Pievelkošs sludinājums, kas piesaista īstos kandidātus.',
    fields: [
      { id: 'role', label: 'Amats', type: 'text', placeholder: 'pārdošanas vadītājs' },
      { id: 'company', label: 'Uzņēmums (īsi)', type: 'text', placeholder: 'augoša IT kompānija Rīgā' },
      { id: 'must', label: 'Svarīgākās prasības', type: 'text', placeholder: 'B2B pieredze, latviešu + angļu' },
    ],
    prompt: (v) => `Tu esi HR copywriter. Uzraksti darba sludinājumu latviešu valodā amatam: ${v.role || '[amats]'}.

Uzņēmums: ${v.company || '[uzņēmums]'}
Svarīgākās prasības: ${v.must || '[prasības]'}

Struktūra:
- Āķīgs virsraksts ar amatu.
- 2 teikumi par uzņēmumu un kāpēc te ir labi strādāt.
- “Tavi pienākumi” — 4 punkti.
- “Ko sagaidām” — 4 punkti.
- “Ko piedāvājam” — 3 punkti (konkrēti, ne klišejas).
- CTA pieteikties.
Tonis: cilvēcīgs, enerģisks, bez korporatīvām klišejām.`,
    example: {
      before: '“meklējam pārdošanas vadītāju ar pieredzi”',
      after: 'Pārdošanas vadītājs, kas mīl slēgt darījumus\n\nMēs esam augoša IT kompānija Rīgā...\n\nTavi pienākumi:\n• Vadīt B2B pārdošanas ciklu\n...\nKo piedāvājam:\n• Bonusu sistēma bez “griestiem”\n\nPieteikies — atbildam 3 dienu laikā!',
    },
  },
];

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

const $ = (sel, root = document) => root.querySelector(sel);

function bullets(text) {
  if (!text) return '';
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((l) => `- ${l}`)
    .join('\n');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

let activeScenario = null;

/* ------------------------------------------------------------------ *
 * Render scenario cards
 * ------------------------------------------------------------------ */

function renderScenarioGrid() {
  const grid = $('#scenarioGrid');
  grid.innerHTML = SCENARIOS.map(
    (s) => `
    <button data-id="${s.id}" type="button"
      class="group text-left rounded-3xl glass glow-hover p-5 focus:outline-none focus:ring-2 focus:ring-brand">
      <div>
        <div class="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-electric text-white shadow-depth">${isIcon(s.icon, 'h-7 w-7')}</div>
        <h3 class="text-lg font-bold leading-tight">${s.title}</h3>
        <p class="mt-1 text-sm text-muted">${s.sub}</p>
        <span class="mt-3 inline-flex items-center gap-1 text-sm font-bold text-electric opacity-0 transition group-hover:opacity-100">
          Izvēlēties →
        </span>
      </div>
    </button>`
  ).join('');

  grid.querySelectorAll('[data-id]').forEach((btn) => {
    btn.addEventListener('click', () => selectScenario(btn.dataset.id));
  });
  attachTilt();
}

/* ------------------------------------------------------------------ *
 * Build the form for a scenario
 * ------------------------------------------------------------------ */

function selectScenario(id) {
  activeScenario = SCENARIOS.find((s) => s.id === id);
  if (!activeScenario) return;

  // highlight selected card
  document.querySelectorAll('#scenarioGrid [data-id]').forEach((b) => {
    b.classList.toggle('ring-2', b.dataset.id === id);
    b.classList.toggle('ring-accent', b.dataset.id === id);
  });

  $('#builderIcon').innerHTML = isIcon(activeScenario.icon, 'h-6 w-6');
  $('#builderTitle').textContent = activeScenario.title;
  $('#builderSub').textContent = activeScenario.sub;

  const form = $('#builderForm');
  form.innerHTML = activeScenario.fields
    .map((f) => fieldHtml(f))
    .join('');

  // live update on input
  form.querySelectorAll('input, textarea, select').forEach((el) => {
    el.addEventListener('input', updateOutput);
  });

  $('#workbench').classList.remove('hidden');
  $('#workbench').classList.add('animate-pop');
  attachTilt();
  updateOutput();

  // bring the workbench into view
  $('#workbench').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function fieldHtml(f) {
  const base =
    'field w-full rounded-xl px-3 py-2.5 text-sm text-zinc-100 [&>option]:bg-ink2 [&>option]:text-zinc-100 transition';
  let control;
  if (f.type === 'textarea') {
    control = `<textarea id="f_${f.id}" rows="4" placeholder="${escapeHtml(f.placeholder || '')}" class="${base} resize-none"></textarea>`;
  } else if (f.type === 'select') {
    control = `<select id="f_${f.id}" class="${base}">${f.options
      .map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`)
      .join('')}</select>`;
  } else {
    control = `<input id="f_${f.id}" type="text" placeholder="${escapeHtml(f.placeholder || '')}" class="${base}" />`;
  }
  return `<label class="block"><span class="mb-1.5 block text-sm font-semibold text-zinc-100">${f.label}</span>${control}</label>`;
}

/* ------------------------------------------------------------------ *
 * Output: prompt + before/after
 * ------------------------------------------------------------------ */

function updateOutput() {
  if (!activeScenario) return;
  const values = {};
  activeScenario.fields.forEach((f) => {
    const el = $(`#f_${f.id}`);
    values[f.id] = el ? el.value : '';
  });

  $('#promptOut').textContent = activeScenario.prompt(values);
  $('#beforeOut').textContent = activeScenario.example.before;
  $('#afterOut').textContent = activeScenario.example.after;
}

/* ------------------------------------------------------------------ *
 * 3D tilt on pointer move
 * ------------------------------------------------------------------ */

function attachTilt() {
  document.querySelectorAll('.tilt').forEach((el) => {
    if (el.dataset.tiltReady) return;
    el.dataset.tiltReady = '1';

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const max = 8; // degrees
      el.style.transform = `rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}

/* ------------------------------------------------------------------ *
 * Flip + copy + misc
 * ------------------------------------------------------------------ */

function initControls() {
  $('#flipBtn').addEventListener('click', () => {
    const card = $('#flipCard');
    card.classList.toggle('is-flipped');
    $('#flipBtn').textContent = card.classList.contains('is-flipped') ? '↻ Skatīt promptu' : '↻ Skatīt piemēru';
  });

  $('#copyBtn').addEventListener('click', async () => {
    const text = $('#promptOut').textContent;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    showToast();
  });

  $('#year').textContent = new Date().getFullYear();
}

let toastTimer;
function showToast() {
  const t = $('#toast');
  t.style.opacity = '1';
  t.classList.remove('translate-y-4');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.style.opacity = '0';
    t.classList.add('translate-y-4');
  }, 1800);
}

/* ------------------------------------------------------------------ *
 * Boot
 * ------------------------------------------------------------------ */

renderScenarioGrid();
initControls();
